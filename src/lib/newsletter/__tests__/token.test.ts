// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { signToken, verifyToken, TOKEN_TTL_MS } from '../token';
import { confirmOrigin } from '../origin';

const SECRET = 'a'.repeat(32) + 'secret-for-tests';
const input = {
  email: 'a@b.co',
  consentAt: new Date('2026-11-14T10:00:00Z'),
  sourcePath: '/',
  version: 'he-2026-11-12',
};
const T0 = new Date('2026-11-14T10:00:00Z');

describe('confirmation token', () => {
  it('round-trips the signed fields', () => {
    const r = verifyToken(signToken(input, SECRET, T0), SECRET, T0);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.payload).toMatchObject({ e: 'a@b.co', c: '2026-11-14T10:00:00.000Z', s: '/', v: 'he-2026-11-12' });
    }
  });

  it('RED ARM: expired token is refused', () => {
    const t = signToken(input, SECRET, T0);
    const late = new Date(T0.getTime() + TOKEN_TTL_MS + 1);
    expect(verifyToken(t, SECRET, late)).toEqual({ ok: false, reason: 'expired' });
    const justBefore = new Date(T0.getTime() + TOKEN_TTL_MS - 1000);
    expect(verifyToken(t, SECRET, justBefore).ok).toBe(true);
  });

  it('RED ARM: tampered payload is refused (e.g. swapping the address)', () => {
    const t = signToken(input, SECRET, T0);
    const [, sig] = t.split('.');
    const evil = Buffer.from(
      JSON.stringify({ e: 'victim@x.co', c: input.consentAt.toISOString(), s: '/', v: input.version, x: T0.getTime() + TOKEN_TTL_MS }),
    ).toString('base64url');
    expect(verifyToken(`${evil}.${sig}`, SECRET, T0)).toEqual({ ok: false, reason: 'invalid' });
  });

  it('RED ARM: tampered signature and a token signed with another secret are refused', () => {
    const t = signToken(input, SECRET, T0);
    const flipped = t.slice(0, -2) + (t.endsWith('AA') ? 'BB' : 'AA');
    expect(verifyToken(flipped, SECRET, T0).ok).toBe(false);
    expect(verifyToken(t, 'b'.repeat(40), T0).ok).toBe(false);
  });

  it('refuses garbage shapes without throwing', () => {
    for (const bad of [undefined, null, 5, '', 'x', 'a.b.c', '.', 'a.', '.b', 'x'.repeat(3000)]) {
      expect(verifyToken(bad, SECRET, T0).ok).toBe(false);
    }
  });

  it('refuses to sign or verify with a missing or short secret (fail closed)', () => {
    expect(() => signToken(input, undefined, T0)).toThrow();
    expect(() => signToken(input, 'short', T0)).toThrow();
    expect(() => verifyToken('x.y', '', T0)).toThrow();
  });
});

describe('confirmOrigin', () => {
  it('uses the production domain by default and ignores unknown configured origins', () => {
    expect(confirmOrigin({})).toBe('https://fullstack-eladjak.co.il');
    expect(confirmOrigin({ NEXT_PUBLIC_SITE_URL: 'https://evil.example' })).toBe('https://fullstack-eladjak.co.il');
    expect(confirmOrigin({ NEXT_PUBLIC_SITE_URL: 'https://www.fullstack-eladjak.co.il/' })).toBe('https://www.fullstack-eladjak.co.il');
  });
  it('uses this project preview host only for previews, and only for this project', () => {
    expect(confirmOrigin({ VERCEL_ENV: 'preview', VERCEL_URL: 'eladjak-website-git-x-team.vercel.app' })).toBe(
      'https://eladjak-website-git-x-team.vercel.app',
    );
    expect(confirmOrigin({ VERCEL_ENV: 'preview', VERCEL_URL: 'evil.vercel.app' })).toBe('https://fullstack-eladjak.co.il');
    expect(confirmOrigin({ VERCEL_ENV: 'production', VERCEL_URL: 'eladjak-website-abc.vercel.app' })).toBe(
      'https://fullstack-eladjak.co.il',
    );
  });
});
