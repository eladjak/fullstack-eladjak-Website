// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from '../route';
import { signToken, TOKEN_TTL_MS } from '@/lib/newsletter/token';
import { CONSENT_VERSION } from '@/lib/newsletter/consent';

const SECRET = 'c'.repeat(40);
let ip = 0;
function req(body: unknown) {
  ip += 1;
  return new Request('http://localhost/api/newsletter/confirm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-real-ip': `10.1.0.${ip}` },
    body: JSON.stringify(body),
  });
}
const consentAt = new Date('2026-11-14T10:00:00Z');
const mk = (over: Partial<{ version: string }> = {}, at = new Date()) =>
  signToken({ email: 'a@b.co', consentAt, sourcePath: '/blog', version: over.version ?? CONSENT_VERSION }, SECRET, at);

type Call = { method: string; url: string; body: unknown };
function stubResend(route: (c: Call) => { status: number; json?: unknown }) {
  const calls: Call[] = [];
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url: string, init: RequestInit) => {
      const c = { method: init.method ?? 'GET', url, body: init.body ? JSON.parse(String(init.body)) : undefined };
      calls.push(c);
      const r = route(c);
      return new Response(r.json === undefined ? null : JSON.stringify(r.json), { status: r.status });
    }),
  );
  return calls;
}
const newContact = (c: Call) => (c.method === 'GET' ? { status: 404, json: {} } : { status: 201, json: { id: 'c1' } });

describe('POST /api/newsletter/confirm', () => {
  beforeEach(() => {
    vi.stubEnv('RESEND_API_KEY', 'k');
    vi.stubEnv('RESEND_SEGMENT_ID', 'seg');
    vi.stubEnv('NEWSLETTER_TOKEN_SECRET', SECRET);
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('subscribes with the ORIGINAL consent time and a confirmed_at, only for a valid token', async () => {
    const calls = stubResend(newContact);
    const res = await POST(req({ token: mk() }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, status: 'subscribed' });
    const create = calls.find((c) => c.method === 'POST');
    expect(create?.url).toMatch(/\/contacts$/);
    const props = (create?.body as { properties: Record<string, string> }).properties;
    expect(props.consent_at).toBe('2026-11-14T10:00:00.000Z');
    expect(props.consent_source).toBe('/blog');
    expect(Date.parse(props.confirmed_at)).toBeGreaterThan(Date.parse(props.consent_at));
  });

  it('RED ARM: an expired token writes nothing to Resend', async () => {
    const calls = stubResend(newContact);
    const old = new Date(Date.now() - TOKEN_TTL_MS - 60_000);
    const res = await POST(req({ token: mk({}, old) }));
    expect(res.status).toBe(410);
    expect((await res.json()).error).toBe('expired_token');
    expect(calls).toHaveLength(0);
  });

  it('RED ARM: a tampered token writes nothing to Resend', async () => {
    const calls = stubResend(newContact);
    const t = mk();
    const bad = t.slice(0, t.indexOf('.')) + '.' + 'A'.repeat(43);
    const res = await POST(req({ token: bad }));
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe('invalid_token');
    expect(calls).toHaveLength(0);
  });

  it('RED ARM: missing token / missing secret write nothing', async () => {
    const calls = stubResend(newContact);
    expect((await POST(req({}))).status).toBe(400);
    vi.stubEnv('NEWSLETTER_TOKEN_SECRET', '');
    const res = await POST(req({ token: mk() }));
    expect(res.status).toBe(503);
    expect(calls).toHaveLength(0);
  });

  it('a token for an older consent wording is refused', async () => {
    const calls = stubResend(newContact);
    const res = await POST(req({ token: mk({ version: 'old-version' }) }));
    expect(res.status).toBe(410);
    expect(calls).toHaveLength(0);
  });

  it('someone who removed themselves stays removed', async () => {
    const calls = stubResend(() => ({ status: 200, json: { id: 'c1', unsubscribed: true } }));
    const res = await POST(req({ token: mk() }));
    expect(res.status).toBe(409);
    expect(calls.every((c) => c.method === 'GET')).toBe(true);
  });

  it('already subscribed (token replayed) is a friendly 200, no second write of the record', async () => {
    const SEG = 'seg';
    vi.stubEnv('RESEND_SEGMENT_ID', '8c8ef0c8-4287-4af7-a1f5-5b9000ded213');
    const calls = stubResend((c) => {
      if (c.url.endsWith('/segments')) return { status: 200, json: { data: [{ id: '8c8ef0c8-4287-4af7-a1f5-5b9000ded213' }] } };
      return { status: 200, json: { id: 'bad62e1d-6e65-4ba1-a440-ea109bde253a', unsubscribed: false } };
    });
    void SEG;
    const res = await POST(req({ token: mk() }));
    expect(await res.json()).toEqual({ ok: true, status: 'already_subscribed' });
    expect(calls.every((c) => c.method === 'GET')).toBe(true);
  });

  it('RED ARM: provider failure is not reported as success', async () => {
    stubResend(() => ({ status: 500, json: {} }));
    const res = await POST(req({ token: mk() }));
    expect(res.status).toBe(502);
    expect((await res.json()).ok).toBe(false);
  });

  it('has no GET handler, so a link prefetch can never subscribe', async () => {
    const mod = await import('../route');
    expect((mod as Record<string, unknown>).GET).toBeUndefined();
  });
});
