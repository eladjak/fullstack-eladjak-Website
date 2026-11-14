import { NextResponse } from "next/server";
import { CONSENT_VERSION } from "@/lib/newsletter/consent";
import { isUnsubscribed } from "@/lib/newsletter/subscribe";
import { signToken } from "@/lib/newsletter/token";
import { sendConfirmationEmail } from "@/lib/newsletter/confirm-mail";
import { confirmOrigin } from "@/lib/newsletter/origin";
import { createRateLimiter, getClientIp } from "@/lib/newsletter/rate-limit";

// Simple, RFC-5322-compatible-ish email regex (server-side only, never trust client).
// Intentionally permissive: blocks the obvious garbage but doesn't try to be exhaustive.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Abuse limits (also guard SENDING mail): 3 submits per IP per 15 minutes,
// and 2 confirmation mails per address per 15 minutes, so nobody can use the
// form to flood a third party's inbox.
const ipLimiter = createRateLimiter(3, 15 * 60 * 1000);
const emailLimiter = createRateLimiter(2, 15 * 60 * 1000);

// Reads at most `max` bytes from the stream, then stops (no unbounded buffering).
async function readCapped(request: Request, max: number): Promise<string> {
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > max) {
      await reader.cancel();
      throw new Error("too large");
    }
    chunks.push(value);
  }
  const all = new Uint8Array(total);
  let offset = 0;
  for (const c of chunks) {
    all.set(c, offset);
    offset += c.byteLength;
  }
  return new TextDecoder().decode(all);
}

// Source page: a site-relative path only, so nothing odd lands in the record.
function cleanSourcePath(value: unknown): string {
  if (typeof value !== "string") return "unknown";
  const v = value.trim();
  if (v.length === 0 || v.length > 200 || !/^\/[A-Za-z0-9\-._~/%]*$/.test(v))
    return "unknown";
  return v;
}

const json = (body: Record<string, unknown>, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);

    if (!ipLimiter(ip)) {
      return json({ ok: false, error: "too_many_requests" }, 429);
    }

    // Parse body (defensive, bad JSON should not 500)
    // Small bodies only: the form sends a few short fields.
    const MAX_BODY = 2_000;
    if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY) {
      return json({ ok: false, error: "invalid_body" }, 413);
    }
    let body: Record<string, unknown>;
    try {
      const raw = await readCapped(request, MAX_BODY);
      const parsed: unknown = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object")
        throw new Error("not an object");
      body = parsed as Record<string, unknown>;
    } catch {
      return json({ ok: false, error: "invalid_body" }, 400);
    }

    // Honeypot: a hidden field people never see; bots fill it. We store nothing
    // and say so honestly (an autofill could hit a real person, who then sees
    // an error and can retry, never a fake confirmation).
    if (typeof body.website === "string" && body.website.trim() !== "") {
      console.warn("[newsletter] honeypot triggered, nothing stored");
      return json({ ok: false, error: "rejected" }, 400);
    }

    const email = body.email;

    // Server-side validation, don't trust the client
    if (
      typeof email !== "string" ||
      email.length > 254 ||
      !EMAIL_REGEX.test(email.trim())
    ) {
      return json({ ok: false, error: "invalid_email" }, 400);
    }

    // Communications Law 30A: explicit consent, to the exact wording we show.
    if (body.consent !== true || body.consentVersion !== CONSENT_VERSION) {
      return json({ ok: false, error: "consent_required" }, 400);
    }

    const normalizedEmail = email.trim().toLowerCase();
    const apiKey = process.env.RESEND_API_KEY;
    const secret = process.env.NEWSLETTER_TOKEN_SECRET;

    // Never claim success when no mail can be sent.
    if (!apiKey || !secret || secret.length < 32) {
      console.error(
        "[newsletter] not configured; refusing to fake success",
      );
      return json({ ok: false, error: "not_configured" }, 503);
    }

    if (!emailLimiter(normalizedEmail)) {
      return json({ ok: false, error: "too_many_requests" }, 429);
    }

    // Double opt-in: nothing is written to the list here. A read-only look
    // first: someone who removed themselves is not mailed on a stranger's say-so.
    const state = await isUnsubscribed(normalizedEmail, { apiKey });
    if (state.kind === "error") {
      console.error("[newsletter] lookup failed:", state.detail);
      return json({ ok: false, error: "subscribe_failed" }, 502);
    }
    if (state.kind === "yes") {
      return json({ ok: false, error: "previously_unsubscribed" }, 409);
    }

    const now = new Date();
    const token = signToken(
      {
        email: normalizedEmail,
        consentAt: now,
        sourcePath: cleanSourcePath(body.source),
        version: CONSENT_VERSION,
      },
      secret,
      now,
    );
    const origin = confirmOrigin({
      VERCEL_ENV: process.env.VERCEL_ENV,
      VERCEL_URL: process.env.VERCEL_URL,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    });
    const sent = await sendConfirmationEmail(
      {
        to: normalizedEmail,
        link: `${origin}/newsletter/confirm?token=${token}`,
        contactUrl: `${origin}/contact`,
      },
      { apiKey },
    );

    if (sent.kind === "provider_error") {
      console.error("[newsletter] confirmation mail failed:", sent.detail);
      return json({ ok: false, error: "subscribe_failed" }, 502);
    }

    return json({ ok: true, status: "confirmation_sent" });
  } catch {
    console.error("[newsletter] unexpected error (details withheld)");
    return json({ ok: false, error: "internal_error" }, 500);
  }
}
