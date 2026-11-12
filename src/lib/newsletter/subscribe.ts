import { CONSENT_TEXT, CONSENT_VERSION, SIGNUP_SITE } from "./consent";

/**
 * Adds a confirmed-consent contact to a Resend segment (list).
 *
 * Talks to the Resend REST API directly with an injectable fetch, so the
 * failure paths (provider down, 5xx, bad key) can be tested. The caller only
 * reports success to the visitor when this returns `subscribed` or
 * `already_subscribed`, both of which mean Resend confirmed the contact.
 */

export type SubscribeOutcome =
  | { kind: "subscribed" }
  | { kind: "already_subscribed" }
  | { kind: "provider_error"; detail: string };

export interface SubscribeInput {
  email: string;
  sourcePath: string;
  now: Date;
}

export interface SubscribeDeps {
  apiKey: string;
  segmentId: string;
  fetchImpl?: typeof fetch;
  baseUrl?: string;
}

interface ResendContact {
  id: string;
  unsubscribed: boolean;
}

const TIMEOUT_MS = 8_000;

export function consentProperties(sourcePath: string, now: Date) {
  return {
    consent_at: now.toISOString(),
    consent_source: sourcePath,
    consent_text: CONSENT_TEXT,
    consent_version: CONSENT_VERSION,
    signup_site: SIGNUP_SITE,
  };
}

export async function subscribeContact(
  input: SubscribeInput,
  deps: SubscribeDeps,
): Promise<SubscribeOutcome> {
  const doFetch = deps.fetchImpl ?? fetch;
  const base = deps.baseUrl ?? "https://api.resend.com";
  const headers = {
    Authorization: `Bearer ${deps.apiKey}`,
    "Content-Type": "application/json",
  };

  interface CallResult {
    status: number;
    json: unknown;
    error?: string;
  }

  async function call(
    method: string,
    path: string,
    body?: unknown,
  ): Promise<CallResult> {
    try {
      const res = await doFetch(`${base}${path}`, {
        method,
        headers,
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: AbortSignal.timeout(TIMEOUT_MS),
        cache: "no-store",
      });
      const json: unknown = await res.json().catch((): null => null);
      return { status: res.status, json };
    } catch (e) {
      return {
        status: 0,
        json: null,
        error: e instanceof Error ? e.message : String(e),
      };
    }
  }

  const fail = (step: string, r: { status: number; error?: string }) =>
    ({
      kind: "provider_error",
      detail: `${step}: status ${r.status}${r.error ? ` (${r.error})` : ""}`,
    }) as const;

  const props = consentProperties(input.sourcePath, input.now);
  const emailPath = `/contacts/${encodeURIComponent(input.email)}`;

  // 1. Does the contact already exist?
  const existing = await call("GET", emailPath);

  if (existing.status === 404) {
    const created = await call("POST", "/contacts", {
      email: input.email,
      unsubscribed: false,
      properties: props,
      segments: [{ id: deps.segmentId }],
    });
    const id = (created.json as { id?: unknown } | null)?.id;
    if (
      created.status >= 200 &&
      created.status < 300 &&
      typeof id === "string"
    ) {
      return { kind: "subscribed" };
    }
    return fail("create", created);
  }

  if (existing.status !== 200) return fail("lookup", existing);

  const contact = existing.json as ResendContact | null;
  if (!contact || typeof contact.id !== "string")
    return fail("lookup-shape", existing);

  // 2. Already on this list and subscribed: keep the original consent record.
  const segs = await call("GET", `/contacts/${contact.id}/segments`);
  if (segs.status !== 200) return fail("segments", segs);
  const list =
    (segs.json as { data?: Array<{ id?: string }> } | null)?.data ?? [];
  const inSegment = list.some((s) => s.id === deps.segmentId);

  if (inSegment && contact.unsubscribed === false) {
    return { kind: "already_subscribed" };
  }

  // 3. Known contact, new explicit consent: record it and (re)subscribe.
  const updated = await call("PATCH", `/contacts/${contact.id}`, {
    unsubscribed: false,
    properties: props,
  });
  if (updated.status < 200 || updated.status >= 300)
    return fail("update", updated);

  if (!inSegment) {
    const added = await call(
      "POST",
      `/contacts/${contact.id}/segments/${deps.segmentId}`,
    );
    if (added.status < 200 || added.status >= 300)
      return fail("add-segment", added);
  }

  return { kind: "subscribed" };
}
