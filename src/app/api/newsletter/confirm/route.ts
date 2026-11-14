import { NextResponse } from "next/server";
import { CONSENT_VERSION } from "@/lib/newsletter/consent";
import { subscribeContact } from "@/lib/newsletter/subscribe";
import { verifyToken } from "@/lib/newsletter/token";
import { createRateLimiter, getClientIp } from "@/lib/newsletter/rate-limit";

const limiter = createRateLimiter(10, 15 * 60 * 1000);
const MAX_BODY = 3_000;

const json = (body: Record<string, unknown>, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

/**
 * Step 2 of the double opt-in. Only POST changes anything: a GET (mail
 * scanners prefetch links) must never subscribe anyone, and there is no GET
 * handler here on purpose.
 */
export async function POST(request: Request) {
  try {
    if (!limiter(getClientIp(request))) {
      return json({ ok: false, error: "too_many_requests" }, 429);
    }
    if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY) {
      return json({ ok: false, error: "invalid_body" }, 413);
    }
    let token: unknown;
    try {
      const raw = await request.text();
      if (raw.length > MAX_BODY) throw new Error("too large");
      token = (JSON.parse(raw) as { token?: unknown }).token;
    } catch {
      return json({ ok: false, error: "invalid_body" }, 400);
    }

    const apiKey = process.env.RESEND_API_KEY;
    const segmentId =
      process.env.RESEND_SEGMENT_ID ?? process.env.RESEND_AUDIENCE_ID;
    const secret = process.env.NEWSLETTER_TOKEN_SECRET;
    if (!apiKey || !segmentId || !secret || secret.length < 32) {
      console.error("[newsletter] not configured; refusing to fake success");
      return json({ ok: false, error: "not_configured" }, 503);
    }

    const now = new Date();
    const v = verifyToken(token, secret, now);
    if (!v.ok) {
      return json(
        { ok: false, error: v.reason === "expired" ? "expired_token" : "invalid_token" },
        v.reason === "expired" ? 410 : 400,
      );
    }
    // The consent record must be for the wording we store; an older wording
    // means the person never saw today's text.
    if (v.payload.v !== CONSENT_VERSION) {
      return json({ ok: false, error: "expired_token" }, 410);
    }

    const outcome = await subscribeContact(
      {
        email: v.payload.e,
        sourcePath: v.payload.s,
        now: new Date(v.payload.c),
        confirmedAt: now,
      },
      { apiKey, segmentId },
    );

    if (outcome.kind === "previously_unsubscribed") {
      return json({ ok: false, error: "previously_unsubscribed" }, 409);
    }
    if (outcome.kind === "provider_error") {
      console.error("[newsletter] confirm failed:", outcome.detail);
      return json({ ok: false, error: "subscribe_failed" }, 502);
    }
    return json({ ok: true, status: outcome.kind });
  } catch {
    console.error("[newsletter] unexpected error (details withheld)");
    return json({ ok: false, error: "internal_error" }, 500);
  }
}
