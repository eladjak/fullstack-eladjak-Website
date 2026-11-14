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
  | { kind: "previously_unsubscribed" }
  | { kind: "provider_error"; detail: string };

export interface SubscribeInput {
  email: string;
  sourcePath: string;
  /** consent time (for the double opt-in: when the visitor submitted the form) */
  now: Date;
  /** set only by the confirm step: when the email link was clicked */
  confirmedAt?: Date;
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
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function consentProperties(
  sourcePath: string,
  now: Date,
  confirmedAt?: Date,
) {
  return {
    ...(confirmedAt ? { confirmed_at: confirmedAt.toISOString() } : {}),
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
        // A fixed category only: exception text can carry the URL (the email).
        error:
          e instanceof Error &&
          (e.name === "TimeoutError" || e.name === "AbortError")
            ? "timeout"
            : "network",
      };
    }
  }

  const fail = (step: string, r: { status: number; error?: string }) =>
    ({
      kind: "provider_error",
      detail: `${step}: status ${r.status}${r.error ? ` (${r.error})` : ""}`,
    }) as const;

  const props = consentProperties(
    input.sourcePath,
    input.now,
    input.confirmedAt,
  );
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
  // Someone who removed themselves stays removed: an unauthenticated form
  // must not flip a global opt-out back on (anyone can type any address).
  if (contact.unsubscribed !== false) {
    return { kind: "previously_unsubscribed" };
  }

  // Provider ids are UUIDs; anything else must not reach a URL path.
  if (!UUID.test(contact.id) || !UUID.test(deps.segmentId)) {
    return { kind: "provider_error", detail: "bad-id" };
  }
  const cid = encodeURIComponent(contact.id);
  const sid = encodeURIComponent(deps.segmentId);
  const segs = await call("GET", `/contacts/${cid}/segments`);
  if (segs.status !== 200) return fail("segments", segs);
  const list =
    (segs.json as { data?: Array<{ id?: string }> } | null)?.data ?? [];
  const inSegment = list.some((s) => s.id === deps.segmentId);

  if (inSegment) {
    return { kind: "already_subscribed" };
  }

  // 3. Known, subscribed contact joining this list: record this consent
  //    first, then add the membership. If the second step fails, a retry
  //    finds no membership and repeats both, so success always comes with
  //    a consent record.
  const updated = await call("PATCH", `/contacts/${cid}`, {
    properties: props,
  });
  if (updated.status < 200 || updated.status >= 300)
    return fail("update", updated);

  const added = await call("POST", `/contacts/${cid}/segments/${sid}`);
  if (added.status < 200 || added.status >= 300)
    return fail("add-segment", added);

  return { kind: "subscribed" };
}

/**
 * Read-only check used at submit time: is this address one that removed
 * itself? (We must not send it a sign-up mail on a stranger's say-so.)
 * Writes nothing.
 */
export async function isUnsubscribed(
  email: string,
  deps: { apiKey: string; fetchImpl?: typeof fetch; baseUrl?: string },
): Promise<{ kind: "yes" | "no" } | { kind: "error"; detail: string }> {
  const doFetch = deps.fetchImpl ?? fetch;
  try {
    const res = await doFetch(
      `${deps.baseUrl ?? "https://api.resend.com"}/contacts/${encodeURIComponent(email)}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${deps.apiKey}` },
        signal: AbortSignal.timeout(TIMEOUT_MS),
        cache: "no-store",
      },
    );
    if (res.status === 404) return { kind: "no" };
    if (res.status !== 200) return { kind: "error", detail: `lookup: status ${res.status}` };
    const c = (await res.json().catch((): null => null)) as ResendContact | null;
    if (!c || typeof c.unsubscribed !== "boolean") {
      return { kind: "error", detail: "lookup-shape" };
    }
    return { kind: c.unsubscribed ? "yes" : "no" };
  } catch {
    return { kind: "error", detail: "lookup: network" };
  }
}
