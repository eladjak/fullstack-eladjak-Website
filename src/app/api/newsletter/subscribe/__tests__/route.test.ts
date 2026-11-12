// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from '../route';
import { CONSENT_VERSION } from '@/lib/newsletter/consent';

let ipCounter = 0;
function req(body: unknown) {
  ipCounter += 1;
  return new Request('http://localhost/api/newsletter/subscribe/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-real-ip': `10.0.0.${ipCounter}` },
    body: JSON.stringify(body),
  });
}
const good = { email: 'Test@Example.com', consent: true, consentVersion: CONSENT_VERSION, source: '/' };

describe('POST /api/newsletter/subscribe', () => {
  beforeEach(() => {
    vi.stubEnv('RESEND_API_KEY', 'k');
    vi.stubEnv('RESEND_SEGMENT_ID', 'seg');
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('returns subscribed only after the provider confirms', async () => {
    vi.stubGlobal('fetch', vi.fn(async (_u: string, init: RequestInit) =>
      new Response(JSON.stringify(init.method === 'POST' ? { id: 'c1' } : {}), { status: init.method === 'POST' ? 201 : 404 })));
    const res = await POST(req(good));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, status: 'subscribed' });
  });

  it('RED ARM: provider failure must NOT report success', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('{}', { status: 500 })));
    const res = await POST(req(good));
    const data = await res.json();
    expect(res.status).toBe(502);
    expect(data.ok).toBe(false);
  });

  it('RED ARM: missing configuration must NOT report success', async () => {
    vi.stubEnv('RESEND_API_KEY', '');
    const res = await POST(req(good));
    expect(res.status).toBe(503);
    expect((await res.json()).ok).toBe(false);
  });

  it('refuses without explicit consent', async () => {
    const res = await POST(req({ ...good, consent: false }));
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe('consent_required');
  });

  it('refuses consent given to an outdated wording', async () => {
    const res = await POST(req({ ...good, consentVersion: 'old' }));
    expect((await res.json()).error).toBe('consent_required');
  });

  it('honeypot: pretends success and calls no provider', async () => {
    const f = vi.fn();
    vi.stubGlobal('fetch', f);
    const res = await POST(req({ ...good, website: 'http://spam' }));
    expect(res.status).toBe(200);
    expect(f).not.toHaveBeenCalled();
  });

  it('rate limits after 3 attempts from the same address', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('{}', { status: 500 })));
    const mk = () => new Request('http://localhost/x', {
      method: 'POST', headers: { 'x-real-ip': '10.9.9.9' }, body: JSON.stringify({ email: 'bad' }) });
    for (let i = 0; i < 3; i++) await POST(mk());
    expect((await POST(mk())).status).toBe(429);
  });
});
