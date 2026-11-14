import {
  createCipheriv,
  createDecipheriv,
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";

/**
 * Signed confirmation token for the double opt-in.
 *
 * Format: base64url(iv | ciphertext | gcm-tag) + "." + base64url(HMAC-SHA256
 * over the first part). Encrypt-then-MAC: the HMAC is checked (constant
 * time) before anything is decrypted or parsed. The payload is encrypted so
 * the address is not readable from the URL if that URL ends up in a log; the
 * token is still a bearer credential for 48 hours, like any confirm link.
 * Nothing is stored server-side: the token IS the pending signup.
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

// Separate keys for the MAC and the cipher, both derived from the one secret.
const subKey = (secret: string, label: string) =>
  createHmac("sha256", secret).update(label).digest();

function mac(part: string, secret: string): Buffer {
  return createHmac("sha256", subKey(secret, "newsletter-mac")).update(part).digest();
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
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", subKey(secret, "newsletter-enc"), iv);
  const ct = Buffer.concat([cipher.update(JSON.stringify(payload), "utf8"), cipher.final()]);
  const part = b64(Buffer.concat([iv, ct, cipher.getAuthTag()]));
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
  // Signature first, constant-time: nothing is decrypted or parsed until it
  // matches.
  const given = Buffer.from(sig, "base64url");
  const expected = mac(part, secret);
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return { ok: false, reason: "invalid" };
  }
  let p: Partial<ConfirmPayload>;
  try {
    const raw = Buffer.from(part, "base64url");
    if (raw.length < 12 + 16 + 1) return { ok: false, reason: "invalid" };
    const decipher = createDecipheriv(
      "aes-256-gcm",
      subKey(secret, "newsletter-enc"),
      raw.subarray(0, 12),
    );
    decipher.setAuthTag(raw.subarray(raw.length - 16));
    const plain = Buffer.concat([
      decipher.update(raw.subarray(12, raw.length - 16)),
      decipher.final(),
    ]);
    p = JSON.parse(plain.toString("utf8"));
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
