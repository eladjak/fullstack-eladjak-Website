// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from '../route';
import { CONSENT_VERSION } from '@/lib/newsletter/consent';
import { verifyToken } from '@/lib/newsletter/token';

const SECRET = 'd'.repeat(40);
let ipCounter = 0;
function req(body: unknown) {
  ipCounter += 1;
  return new Request('http://localhost/api/newsletter/subscribe/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-real-ip': `10.0.0.${ipCounter}` },
    body: JSON.stringify(body),
  });
}
let n = 0;
const fresh = () => ({
  email: `Test${(n += 1)}@Example.com`,
  consent: true,
  consentVersion: CONSENT_VERSION,
  source: '/',
});

type Call = { method: string; url: string; body: Record<string, unknown> | undefined };
/** Resend stub: contact lookup + email send. Records every call. */
function stubResend(opts: { contact?: { status: number; json?: unknown }; send?: { status: number; json?: unknown } } = {}) {
  const calls: Call[] = [];
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url: string, init: RequestInit) => {
      const method = init.method ?? 'GET';
      calls.push({ method, url, body: init.body ? JSON.parse(String(init.body)) : undefined });
      if (url.endsWith('/emails')) {
        const s = opts.send ?? { status: 200, json: { id: 'em_1' } };
        return new Response(JSON.stringify(s.json ?? {}), { status: s.status });
      }
      const c = opts.contact ?? { status: 404, json: {} };
      return new Response(JSON.stringify(c.json ?? {}), { status: c.status });
    }),
  );
  return calls;
}

describe('POST /api/newsletter/subscribe (double opt-in, step 1)', () => {
  beforeEach(() => {
    vi.stubEnv('RESEND_API_KEY', 'k');
    vi.stubEnv('RESEND_SEGMENT_ID', 'seg');
    vi.stubEnv('NEWSLETTER_TOKEN_SECRET', SECRET);
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('sends ONE confirmation mail and writes NOTHING to the list', async () => {
    const calls = stubResend();
    const body = fresh();
    const res = await POST(req(body));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, status: 'confirmation_sent' });
    // The only non-GET call is the mail itself: no contact created, no segment, no patch.
    const writes = calls.filter((c) => c.method !== 'GET');
    expect(writes).toHaveLength(1);
    expect(writes[0].url).toMatch(/\/emails$/);
    expect(calls.some((c) => /\/contacts(\/|$)/.test(c.url) && c.method !== 'GET')).toBe(false);
  });

  it('the mail carries a valid signed link to the allowed origin, addressed only to the signer', async () => {
    const calls = stubResend();
    const body = fresh();
    await POST(req(body));
    const mail = calls.find((c) => c.url.endsWith('/emails'))!.body as { to: string[]; html: string; subject: string; from: string };
    expect(mail.to).toEqual([body.email.toLowerCase()]);
    expect(mail.subject).not.toContain('פרסומת');
    expect(mail.from).toContain('delivery@eladjak.com');
    expect(mail.html).toContain('dir="rtl"');
    const m = mail.html.match(/https:\/\/fullstack-eladjak\.co\.il\/newsletter\/confirm\?token=([A-Za-z0-9_.-]+)/);
    expect(m).not.toBeNull();
    const v = verifyToken(m![1], SECRET, new Date());
    expect(v.ok && v.payload.e).toBe(body.email.toLowerCase());
  });

  it('RED ARM: success is reported only when Resend accepted the mail', async () => {
    stubResend({ send: { status: 500, json: {} } });
    const res = await POST(req(fresh()));
    expect(res.status).toBe(502);
    expect((await res.json()).ok).toBe(false);
  });

  it('RED ARM: a 200 from Resend without a message id is not success', async () => {
    stubResend({ send: { status: 200, json: {} } });
    expect((await POST(req(fresh()))).status).toBe(502);
  });

  it('RED ARM: contact lookup failure does not send and does not claim success', async () => {
    const calls = stubResend({ contact: { status: 500 } });
    const res = await POST(req(fresh()));
    expect(res.status).toBe(502);
    expect(calls.some((c) => c.url.endsWith('/emails'))).toBe(false);
  });

  it('someone who removed themselves is not mailed', async () => {
    const calls = stubResend({ contact: { status: 200, json: { id: 'c', unsubscribed: true } } });
    const res = await POST(req(fresh()));
    expect(res.status).toBe(409);
    expect((await res.json()).error).toBe('previously_unsubscribed');
    expect(calls.some((c) => c.url.endsWith('/emails'))).toBe(false);
  });

  it('RED ARM: missing configuration (key or token secret) must NOT report success', async () => {
    vi.stubEnv('RESEND_API_KEY', '');
    expect((await POST(req(fresh()))).status).toBe(503);
    vi.stubEnv('RESEND_API_KEY', 'k');
    vi.stubEnv('NEWSLETTER_TOKEN_SECRET', 'short');
    const res = await POST(req(fresh()));
    expect(res.status).toBe(503);
    expect((await res.json()).ok).toBe(false);
  });

  it('limits mails per address (no inbox flooding through the form)', async () => {
    const calls = stubResend();
    const same = fresh();
    const statuses: number[] = [];
    for (let i = 0; i < 4; i++) statuses.push((await POST(req(same))).status);
    expect(statuses).toEqual([200, 200, 429, 429]);
    expect(calls.filter((c) => c.url.endsWith('/emails'))).toHaveLength(2);
  });

  it('refuses without explicit consent', async () => {
    const res = await POST(req({ ...fresh(), consent: false }));
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe('consent_required');
  });

  it('refuses consent given to an outdated wording', async () => {
    const res = await POST(req({ ...fresh(), consentVersion: 'old' }));
    expect((await res.json()).error).toBe('consent_required');
  });

  it('honeypot: sends nothing and does NOT claim success', async () => {
    const f = vi.fn();
    vi.stubGlobal('fetch', f);
    const res = await POST(req({ ...fresh(), website: 'http://spam' }));
    expect(res.status).toBe(400);
    expect((await res.json()).ok).toBe(false);
    expect(f).not.toHaveBeenCalled();
  });

  it('refuses oversized bodies without calling the provider', async () => {
    const f = vi.fn();
    vi.stubGlobal('fetch', f);
    const res = await POST(req({ ...fresh(), pad: 'x'.repeat(5000) }));
    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(f).not.toHaveBeenCalled();
  });

  it('refuses an oversized streamed body even without content-length', async () => {
    const f = vi.fn();
    vi.stubGlobal('fetch', f);
    const big = new TextEncoder().encode(JSON.stringify({ ...fresh(), pad: 'x'.repeat(5000) }));
    const stream = new ReadableStream({ start(c) { c.enqueue(big); c.close(); } });
    const r = new Request('http://localhost/x', { method: 'POST', headers: { 'x-real-ip': '10.7.7.7' }, body: stream, duplex: 'half' } as RequestInit);
    expect((await POST(r)).status).toBe(400);
    expect(f).not.toHaveBeenCalled();
  });

  it('rate limits after 3 attempts from the same address', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('{}', { status: 500 })));
    const mk = () => new Request('http://localhost/x', {
      method: 'POST', headers: { 'x-real-ip': '10.9.9.9' }, body: JSON.stringify({ email: 'bad' }) });
    for (let i = 0; i < 3; i++) await POST(mk());
    expect((await POST(mk())).status).toBe(429);
  });

  it('never logs the email address', async () => {
    stubResend({ send: { status: 500, json: {} } });
    const errs = vi.spyOn(console, 'error').mockImplementation(() => {});
    const b = fresh();
    await POST(req(b));
    expect(JSON.stringify(errs.mock.calls)).not.toContain(b.email.toLowerCase());
  });
});
