import { NextResponse } from "next/server";
import { CONSENT_VERSION } from "@/lib/newsletter/consent";
import { subscribeContact } from "@/lib/newsletter/subscribe";

// Simple, RFC-5322-compatible-ish email regex (server-side only, never trust client).
// Intentionally permissive: blocks the obvious garbage but doesn't try to be exhaustive.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// --- In-memory rate limiting (3 signups per IP per 15 minutes) ---
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

// Bounded map size to prevent memory DoS via spoofed IPs.
const RATE_LIMIT_MAX_KEYS = 5_000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    // Opportunistic cleanup of stale entries on every touch, replaces the leaky setInterval.
    if (rateLimitMap.size > RATE_LIMIT_MAX_KEYS) {
      for (const [key, e] of rateLimitMap) {
        if (now > e.resetAt) rateLimitMap.delete(key);
      }
      // If still over cap after cleanup, drop oldest (FIFO via insertion order).
      while (rateLimitMap.size >= RATE_LIMIT_MAX_KEYS) {
        const oldest = rateLimitMap.keys().next().value;
        if (oldest === undefined) break;
        rateLimitMap.delete(oldest);
      }
    }
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count += 1;
  return true;
}

// Resolve client IP from Vercel-trusted headers first, falling back through
// the proxy chain. Validates the value looks IP-shaped + caps length to 45 chars
// (max IPv6) so a malicious oversized X-Forwarded-For can't be used as a
// rate-limit-bypass key.
function getClientIp(request: Request): string {
  const candidates = [
    request.headers.get("x-vercel-forwarded-for"),
    request.headers.get("x-real-ip"),
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
  ];
  for (const candidate of candidates) {
    if (!candidate) continue;
    const trimmed = candidate.trim();
    if (
      trimmed.length > 0 &&
      trimmed.length <= 45 &&
      /^[0-9a-fA-F:.%]+$/.test(trimmed)
    ) {
      return trimmed;
    }
  }
  return "unknown";
}

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

    if (!checkRateLimit(ip)) {
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
    const segmentId =
      process.env.RESEND_SEGMENT_ID ?? process.env.RESEND_AUDIENCE_ID;

    // Never claim success when nothing can be stored.
    if (!apiKey || !segmentId) {
      console.error(
        "[newsletter] Resend not configured; refusing to fake success",
      );
      return json({ ok: false, error: "not_configured" }, 503);
    }

    const outcome = await subscribeContact(
      {
        email: normalizedEmail,
        sourcePath: cleanSourcePath(body.source),
        now: new Date(),
      },
      { apiKey, segmentId },
    );

    if (outcome.kind === "previously_unsubscribed") {
      return json({ ok: false, error: "previously_unsubscribed" }, 409);
    }

    if (outcome.kind === "provider_error") {
      console.error("[newsletter] Resend failed:", outcome.detail);
      return json({ ok: false, error: "subscribe_failed" }, 502);
    }

    return json({ ok: true, status: outcome.kind });
  } catch {
    console.error("[newsletter] unexpected error (details withheld)");
    return json({ ok: false, error: "internal_error" }, 500);
  }
}
