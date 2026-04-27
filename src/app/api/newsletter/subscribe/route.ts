import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Simple, RFC-5322-compatible-ish email regex (server-side only — never trust client).
// Intentionally permissive: blocks the obvious garbage but doesn't try to be exhaustive.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// --- In-memory rate limiting (3 signups per IP per 15 minutes) ---
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count += 1;
  return true;
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW_MS);

export async function POST(request: Request) {
  try {
    // Rate-limit by IP
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() || 'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: 'too_many_requests' },
        { status: 429 }
      );
    }

    // Parse body (defensive — bad JSON should not 500)
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: 'invalid_body' },
        { status: 400 }
      );
    }

    const email = (body as { email?: unknown })?.email;

    // Server-side validation — don't trust the client
    if (typeof email !== 'string' || email.length > 254 || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { ok: false, error: 'invalid_email' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    // Dev-friendly: allow signups even without env vars configured.
    // Log it so dev/staging works locally without a real Resend account.
    if (!apiKey || !audienceId) {
      console.log(
        `[newsletter] signup attempted but Resend not configured (email=${normalizedEmail}, hasKey=${Boolean(
          apiKey
        )}, hasAudience=${Boolean(audienceId)})`
      );
      return NextResponse.json({ ok: true });
    }

    // Send to Resend Audiences API.
    // Wrap the SDK call (3rd party) in try/catch — but DO NOT expose error details to the client.
    try {
      const resend = new Resend(apiKey);
      const { error } = await resend.contacts.create({
        email: normalizedEmail,
        audienceId,
        unsubscribed: false,
      });

      if (error) {
        // Resend returned a structured error (e.g. duplicate, invalid). Log it but treat
        // duplicate/already-subscribed as success from the user's POV — don't punish them
        // for clicking twice.
        console.error('[newsletter] Resend error:', error);
        return NextResponse.json({ ok: true });
      }

      return NextResponse.json({ ok: true });
    } catch (resendError) {
      // Network / unexpected SDK error. Log internally, return generic ok=false to client.
      console.error('[newsletter] Resend SDK exception:', resendError);
      return NextResponse.json(
        { ok: false, error: 'subscribe_failed' },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error('[newsletter] unexpected error:', err);
    return NextResponse.json(
      { ok: false, error: 'internal_error' },
      { status: 500 }
    );
  }
}
