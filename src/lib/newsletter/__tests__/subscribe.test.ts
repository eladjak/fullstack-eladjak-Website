// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';
import { subscribeContact } from '../subscribe';
import { CONSENT_TEXT, CONSENT_VERSION } from '../consent';

const SEG = '8c8ef0c8-4287-4af7-a1f5-5b9000ded213';
const C1 = 'bad62e1d-6e65-4ba1-a440-ea109bde253a';
const input = { email: 'a@b.co', sourcePath: '/he', now: new Date('2026-11-12T13:00:00Z') };

type Route = (method: string, url: string, body: unknown) => { status: number; json?: unknown } | Error;

function fakeFetch(route: Route) {
  const calls: Array<{ method: string; url: string; body: unknown }> = [];
  const impl = vi.fn(async (url: string, init: RequestInit) => {
    const method = init.method ?? 'GET';
    const body = init.body ? JSON.parse(String(init.body)) : undefined;
    calls.push({ method, url, body });
    const r = route(method, url, body);
    if (r instanceof Error) throw r;
    return new Response(r.json === undefined ? null : JSON.stringify(r.json), { status: r.status });
  });
  return { impl: impl as unknown as typeof fetch, calls };
}

const deps = (impl: typeof fetch) => ({ apiKey: 'k', segmentId: SEG, fetchImpl: impl, baseUrl: 'https://x' });

describe('subscribeContact', () => {
  it('creates a new contact with the consent record and the segment', async () => {
    const f = fakeFetch((m) => (m === 'GET' ? { status: 404, json: {} } : { status: 201, json: { id: 'c1' } }));
    const out = await subscribeContact(input, deps(f.impl));
    expect(out).toEqual({ kind: 'subscribed' });
    const create = f.calls.find((c) => c.method === 'POST');
    expect(create?.body).toMatchObject({
      email: 'a@b.co',
      unsubscribed: false,
      segments: [{ id: SEG }],
      properties: {
        consent_at: '2026-11-12T13:00:00.000Z',
        consent_source: '/he',
        consent_text: CONSENT_TEXT,
        consent_version: CONSENT_VERSION,
      },
    });
  });

  it('RED ARM: provider 5xx on create is an error, never success', async () => {
    const f = fakeFetch((m) => (m === 'GET' ? { status: 404 } : { status: 500, json: { message: 'boom' } }));
    const out = await subscribeContact(input, deps(f.impl));
    expect(out.kind).toBe('provider_error');
  });

  it('RED ARM: create answering 2xx without an id is an error', async () => {
    const f = fakeFetch((m) => (m === 'GET' ? { status: 404 } : { status: 200, json: {} }));
    expect((await subscribeContact(input, deps(f.impl))).kind).toBe('provider_error');
  });

  it('RED ARM: network failure is an error', async () => {
    const f = fakeFetch(() => new Error('ECONNRESET'));
    expect((await subscribeContact(input, deps(f.impl))).kind).toBe('provider_error');
  });

  it('RED ARM: bad key on lookup is an error', async () => {
    const f = fakeFetch(() => ({ status: 401, json: { message: 'bad key' } }));
    expect((await subscribeContact(input, deps(f.impl))).kind).toBe('provider_error');
  });

  it('already on the list: says so and keeps the original consent record', async () => {
    const f = fakeFetch((m, url) => {
      if (url.endsWith('/segments')) return { status: 200, json: { data: [{ id: SEG }] } };
      return { status: 200, json: { id: C1, unsubscribed: false } };
    });
    expect(await subscribeContact(input, deps(f.impl))).toEqual({ kind: 'already_subscribed' });
    expect(f.calls.some((c) => c.method !== 'GET')).toBe(false);
  });

  it('someone who opted out is NOT re-subscribed by the form', async () => {
    const f = fakeFetch((m, url) => {
      if (m === 'GET' && url.endsWith('/segments')) return { status: 200, json: { data: [] } };
      return { status: 200, json: { id: C1, unsubscribed: true } };
    });
    expect(await subscribeContact(input, deps(f.impl))).toEqual({ kind: 'previously_unsubscribed' });
    expect(f.calls.some((c) => c.method !== 'GET')).toBe(false);
  });

  it('known subscribed contact joins the list: consent first, then segment', async () => {
    const f = fakeFetch((m, url) => {
      if (m === 'GET' && url.endsWith('/segments')) return { status: 200, json: { data: [] } };
      if (m === 'GET') return { status: 200, json: { id: C1, unsubscribed: false } };
      return { status: 200, json: { id: 'c1' } };
    });
    expect(await subscribeContact(input, deps(f.impl))).toEqual({ kind: 'subscribed' });
    const writes = f.calls.filter((c) => c.method !== 'GET').map((c) => c.method);
    expect(writes).toEqual(['PATCH', 'POST']);
  });

  it('error details never carry the address', async () => {
    const f = fakeFetch(() => new Error('fetch failed for https://x/contacts/a%40b.co'));
    const out = await subscribeContact(input, deps(f.impl));
    expect(JSON.stringify(out)).not.toMatch(/a%40b|a@b/);
  });

  it('RED ARM: failing to add the segment is an error', async () => {
    const f = fakeFetch((m, url) => {
      if (m === 'GET' && url.endsWith('/segments')) return { status: 200, json: { data: [] } };
      if (m === 'GET') return { status: 200, json: { id: C1, unsubscribed: false } };
      if (m === 'POST') return { status: 500 };
      return { status: 200, json: { id: 'c1' } };
    });
    expect((await subscribeContact(input, deps(f.impl))).kind).toBe('provider_error');
  });

  it('RED ARM: a non-UUID id from the provider never reaches a URL path', async () => {
    const f = fakeFetch((m, url) => {
      if (url.includes('/segments')) return { status: 200, json: { data: [] } };
      return { status: 200, json: { id: '../../api-keys', unsubscribed: false } };
    });
    expect((await subscribeContact(input, deps(f.impl))).kind).toBe('provider_error');
    expect(f.calls.some((c) => c.url.includes('api-keys'))).toBe(false);
  });

  it('error details are fixed categories, even for a crafted exception name', async () => {
    const f = fakeFetch(() => Object.assign(new Error('x'), { name: 'a@b.co sk_live' }));
    const out = await subscribeContact(input, deps(f.impl));
    expect(JSON.stringify(out)).not.toMatch(/a@b|sk_live/);
  });
});
