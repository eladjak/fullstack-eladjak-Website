# Phase 2 — Unified i18n refactor plan

**Status:** scaffolding committed (Sprint 7.7). Execution deferred to Sprint 7.8.
**Why:** the session that added Phase 1a stabilize was already saturated with urgent agent-infra work (Kaylee STT, Box upgrade, video polish). Phase 2 is architectural — it deserves a dedicated session with its own verification loop.

## Current state (Sprint 7.7)

Two parallel i18n mechanisms coexist:

### Main i18n (legacy, used by nav/footer/body of most pages)
- `src/i18n.ts` exports `locales = ['he','en']`, `defaultLocale = 'he'`, `messages` dict.
- `messages/he.json` + `messages/en.json` — structured JSON, used via `useTranslations()` from next-intl.
- `src/components/providers/locale-provider.tsx` — client context wrapping `NextIntlClientProvider`. Reads locale from `usePathname()` first (`/en/*` → en), falls back to `localStorage` for non-/en/ routes.
- `src/lib/locale-path.ts` — helpers: `getLocaleFromPath`, `stripLocalePrefix`, `hasEnglishRoute`, `toggleLocaleInPath`.
- **No middleware.** No `[locale]` route segment. Most pages serve at root URL regardless of language.

### Guide system (new, built in Sprint 7.6)
- Hebrew: `src/data/agent-guides/{slug}.ts` at `/guide/[slug]` + `/guide` + `/claude-code`.
- English: `src/data/agent-guides/en/{slug}.ts` at `/en/guide/[slug]` + `/en/guide` + `/en/claude-code`.
- `AgentGuide` component has own `locale` prop + internal `T` object for UI strings.

### Scaffolding committed (Sprint 7.7) — ready for Phase 2 execution
- `src/i18n/routing.ts` — `defineRouting({ locales, defaultLocale: 'he', localePrefix: 'as-needed', localeDetection: false })`.
- `src/i18n/request.ts` — `getRequestConfig` loading messages per locale.
- `src/i18n/navigation.ts` — `createNavigation(routing)` exposing locale-aware `Link` + `useRouter`.

## Goal

One canonical i18n — path-based for SEO correctness, with every major page locale-aware, hreflang working automatically, language switcher navigating across all pages, and the current stabilize logic retired cleanly.

## Architecture — chosen: Option B2

**`localePrefix: 'as-needed'` with `he` as default, `localeDetection: false`.**

Reasoning:
- **SEO preservation:** domain ranks Hebrew-first; any HE URL slip = loss of SERP signal. B2 keeps HE at root by contract (`localePrefix: 'as-needed'` + `defaultLocale: 'he'` = HE never prefixed; EN always `/en/...`).
- **Existing EN routes already match B2 shape** (`/en/guide/*`, `/en/claude-code`). Collapse is additive, not a rewrite.
- **`localeDetection: false`** is mandatory — we do NOT want the middleware auto-redirecting Israeli browsers with `Accept-Language: en-US` off the HE homepage.
- B1's advantage (one canonical tree) is real but not worth the URL churn for a 2-locale site where 90% of traffic is HE.

## Migration map

| Before | After |
|---|---|
| `src/app/page.tsx` (HE root) | `src/app/[locale]/page.tsx` (HE served at `/`, EN at `/en/`) |
| `src/app/guide/page.tsx` | `src/app/[locale]/guide/page.tsx` |
| `src/app/guide/[slug]/page.tsx` | `src/app/[locale]/guide/[slug]/page.tsx` |
| `src/app/claude-code/page.tsx` | `src/app/[locale]/claude-code/page.tsx` |
| `src/app/about/page.tsx`, `/projects/`, `/blog/`, `/blog/[slug]/`, `/contact/`, `/services/`, `/thanks/` | each moved to `src/app/[locale]/...` |
| `src/app/en/guide/page.tsx` | merged into `[locale]/guide/page.tsx` (branches on `locale`) |
| `src/app/en/guide/[slug]/page.tsx` | merged into `[locale]/guide/[slug]/page.tsx` |
| `src/app/en/claude-code/page.tsx` | merged into `[locale]/claude-code/page.tsx` |
| `src/app/en/` folder | deleted |
| `src/app/layout.tsx` (hardcoded `lang="he" dir="rtl"`) | minimal shell; `lang`/`dir` moves to `[locale]/layout.tsx` with server-side locale |
| `src/components/providers/locale-provider.tsx` | replaced by thin wrapper that reads from next-intl server context (no localStorage) |
| `src/lib/locale-path.ts` | deleted |
| `src/i18n.ts` | deleted |
| (none) | **new:** `src/middleware.ts` with `createMiddleware(routing)` |
| (none) | **new:** `src/app/[locale]/layout.tsx` |

Stay at root: `layout.tsx` (minimal shell), `not-found.tsx`, `error.tsx`, `loading.tsx`, `sitemap.ts`, `robots.ts`, `feed.xml`, `opengraph-image.tsx`, `api/*`.

## Rollout (ordered commits)

### Step 2a — Create `[locale]` layout + move guide routes (1 commit)
- Create `src/app/[locale]/layout.tsx` (HTML shell with locale-aware `<html lang dir>`, wraps in `NextIntlClientProvider`).
- Add `generateStaticParams` exporting `[{locale:'he'},{locale:'en'}]`.
- Move `/guide/`, `/guide/[slug]/`, `/claude-code/` to `[locale]/`. Merge EN variants in.
- Delete `src/app/en/`.
- Add `src/middleware.ts` + wire `next.config.js` with `createNextIntlPlugin('./src/i18n/request.ts')`.
- Update `BlogPostLocalizedHeader` to optionally accept a `locale` prop (server-passed) — keep client fallback.
- **Do NOT move other pages yet** (about/projects/blog/services/contact/thanks). They continue to serve at root via explicit file. Middleware with `localePrefix: 'as-needed'` doesn't rewrite unmatched paths.
- Verify: `npm run build` clean. Smoke test: `/guide/ollama`, `/en/guide/ollama`, `/claude-code`, `/en/claude-code`, `/about`, `/`, `/blog/…` — all 200 with correct `<html lang>`.

### Step 2b — Move remaining pages to `[locale]` (1–2 commits)
- Move `/about`, `/projects`, `/blog/`, `/blog/[slug]`, `/services`, `/contact`, `/thanks`, root `/` (page.tsx) to `[locale]/`.
- Because most of these pages exist only in HE for now, the `[locale]` layout passes `locale` to the page; the page shows HE content regardless (until EN translations added later).
- Update all internal `<Link>` usages to use `@/i18n/navigation`'s locale-aware Link.

### Step 3 — Metadata + hreflang + sitemap (1 commit)
- Convert every `export const metadata` to `export async function generateMetadata({ params }): Promise<Metadata>` where locale matters.
- Each page's `alternates.languages`: `he-IL`: bare URL, `en-US`: `${SITE_URL}/en${path}`, `x-default`: HE URL.
- `src/app/sitemap.ts`: emit both HE and EN entries for every route that has both locales.

### Step 4 — Retire stabilize patch (1 commit)
- Delete `src/lib/locale-path.ts`.
- Delete `src/components/providers/locale-provider.tsx` — callers switch to `useLocale()` from next-intl directly.
- Switcher uses `useRouter().replace(pathname, { locale })` from `@/i18n/navigation`.
- Delete legacy `src/i18n.ts`.
- Verify: grep returns 0 hits for `locale-path`, `toggleLocaleInPath`, `LocaleProvider`, `portfolio-locale`.

## Risks & mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| HE URL changes break Google SERP | Low (B2) | High | Contract test verifies exact HE URLs unchanged |
| `trailingSlash: true` + middleware double-redirects | Medium | Medium | Test `/guide` and `/guide/` explicitly |
| `generateMetadata` param shape changes when under `[locale]` | Medium | Medium | Explicit cast + type test |
| `localeDetection: false` forgotten → users auto-redirected | Low | High | Explicit in routing.ts (already done) |
| `generateStaticParams` missing for `[locale]` → dynamic rendering | Medium | Low | Each `[locale]` layout exports `generateStaticParams` |

## Test plan (per step)

- `npm run build` — zero errors.
- `npx tsc --noEmit` — zero errors.
- Manual curl grid on the Vercel preview: every top-level route HE + EN (where EN exists).
- View-source: `<html lang="he" dir="rtl">` on HE, `<html lang="en" dir="ltr">` on EN.
- Language switcher: works on all pages, from `/guide/ollama` → `/en/guide/ollama`.
- Playwright `e2e/` runs pass (if exist).

## Estimated effort: 4–6 hours across 4–5 commits.

## Notes for Sprint 7.8

- **Start fresh session** with context capacity.
- Work on a **feature branch** (`i18n-phase-2`), not main.
- **Vercel preview deploys** per commit — inspect before merging.
- Keep `LocaleProvider` working until Step 4 (one step at a time).
- Before merging: full Playwright run if tests exist, plus manual smoke test.
