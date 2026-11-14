import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Signed confirmation token for the double opt-in.
 *
 * Format: base64url(JSON payload) + "." + base64url(HMAC-SHA256 over the
 * first part). Nothing is stored server-side: the token IS the pending
 * signup, and only someone who received the email can present it.
 */

export const TOKEN_TTL_MS = 48 * 60 * 60 * 1000;
const MIN_SECRET_LENGTH = 32;

export interface ConfirmPayload {
  /** normalized email address */
  e: string;
  /** consent_at, ISO string: when the visitor ticked the box and submitted */
  c: string;
  /** source path of the page the form was on */
  s: string;
  /** consent wording version the visitor saw */
  v: string;
  /** expiry, epoch milliseconds */
  x: number;
}

export type VerifyResult =
  | { ok: true; payload: ConfirmPayload; reason?: undefined }
  | { ok: false; reason: "invalid" | "expired"; payload?: undefined };

const b64 = (buf: Buffer) => buf.toString("base64url");

function mac(part: string, secret: string): Buffer {
  return createHmac("sha256", secret).update(part).digest();
}

function assertSecret(secret: string | undefined): asserts secret is string {
  if (!secret || secret.length < MIN_SECRET_LENGTH) {
    throw new Error("token secret missing or too short");
  }
}

export function signToken(
  input: { email: string; consentAt: Date; sourcePath: string; version: string },
  secret: string | undefined,
  now: Date,
): string {
  assertSecret(secret);
  const payload: ConfirmPayload = {
    e: input.email,
    c: input.consentAt.toISOString(),
    s: input.sourcePath,
    v: input.version,
    x: now.getTime() + TOKEN_TTL_MS,
  };
  const part = b64(Buffer.from(JSON.stringify(payload), "utf8"));
  return `${part}.${b64(mac(part, secret))}`;
}

export function verifyToken(
  token: unknown,
  secret: string | undefined,
  now: Date,
): VerifyResult {
  assertSecret(secret);
  if (typeof token !== "string" || token.length > 2_000) {
    return { ok: false, reason: "invalid" };
  }
  const pieces = token.split(".");
  if (pieces.length !== 2 || !pieces[0] || !pieces[1]) {
    return { ok: false, reason: "invalid" };
  }
  const [part, sig] = pieces;
  // Signature first, constant-time: nothing from the payload is trusted
  // (not even parsed) until it matches.
  const given = Buffer.from(sig, "base64url");
  const expected = mac(part, secret);
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return { ok: false, reason: "invalid" };
  }
  let p: Partial<ConfirmPayload>;
  try {
    p = JSON.parse(Buffer.from(part, "base64url").toString("utf8"));
  } catch {
    return { ok: false, reason: "invalid" };
  }
  if (
    !p ||
    typeof p.e !== "string" ||
    typeof p.c !== "string" ||
    typeof p.s !== "string" ||
    typeof p.v !== "string" ||
    typeof p.x !== "number" ||
    Number.isNaN(Date.parse(p.c))
  ) {
    return { ok: false, reason: "invalid" };
  }
  if (now.getTime() >= p.x) return { ok: false, reason: "expired" };
  return { ok: true, payload: p as ConfirmPayload };
}
