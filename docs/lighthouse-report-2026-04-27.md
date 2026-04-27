# Lighthouse Audit Report - 2026-04-27

**Site**: https://fullstack-eladjak.co.il/
**Form factor**: Mobile (simulated 4G throttling)
**Tool**: Lighthouse 13.x via `npm` (locally installed)
**Run by**: Claude Code (executor agent)

---

## Score Summary (Mobile)

| URL | Perf | A11y | BP | SEO | LCP | CLS | TBT | FCP |
|-----|:----:|:----:|:--:|:---:|:---:|:---:|:---:|:---:|
| `/` (Home) | **68** | **73** | 89 | **82** | **5.2 s** | 0 | 400 ms | 1.3 s |
| `/guide/` | 75 | 100 | 96 | 100 | **7.9 s** | 0 | 50 ms | 1.5 s |
| `/guide/kami/` | 73 | 100 | 96 | 100 | **10.7 s** | 0 | 100 ms | 1.4 s |
| `/skills-universe/` | **52** | 98 | 96 | 100 | 8.3 s | 0 | **480 ms** | 3.3 s |
| `/methodology/` | 73 | 100 | 96 | 100 | 6.8 s | 0 | 30 ms | 1.6 s |

**Bold = below target (Perf < 80, A11y < 90, SEO < 90, LCP > 4s, TBT > 300ms).**

### Headline observations
- **CLS is 0 across all pages** - no layout-shift problem at all. Great.
- **LCP is the single biggest issue** — every page is 5-10s on simulated mobile 4G. Should be < 2.5s.
- **Home A11y/SEO drop (73/82)** is unique and caused by the `useMetaTags` client-side hook setting `<title>` and meta tags AFTER hydration (see "Concerns" below).
- **Skills-Universe FCP 3.3s** is the only page where even FCP is poor — heavy initial JS (TBT 480ms) suggests a large client component (likely 3D viz or canvas).

---

## Top 5 cross-site opportunities (sorted by impact)

| # | Issue | Where | Estimated savings |
|---|-------|-------|---|
| 1 | **Serve images in next-gen formats (WebP/AVIF)** | `/guide/kami/` | **1,137 KiB** |
| 2 | **Efficiently encode images** (compress JPEGs) | `/guide/kami/` | **920 KiB** |
| 3 | **Reduce unused JavaScript** | `/skills-universe/` | 146 KiB / 750 ms |
| 4 | **Properly size images** (responsive `sizes`) | `/guide/` | 107 KiB / 210 ms |
| 5 | **Preconnect to required origins** (avatars.githubusercontent.com) | All pages | 330–440 ms each |

Other notable per-page items:
- Home: `mainthread-work-breakdown 5.0s`, `unused-css-rules 16 KiB`, `legacy-javascript`, `modern-image-formats 498 KiB`
- Skills-Universe: `render-blocking-resources 300 ms`, `unused-css-rules 14 KiB`

---

## Quick wins implemented in this session

| File | Line(s) | Change |
|------|---------|--------|
| `src/components/hero/hero-section.tsx` | 22-30 | Added `sizes="100vw"` and `fetchPriority="high"` to hero `Image fill` background |
| `src/components/hero/profile-avatar.tsx` | 59-67 | Added `sizes="160px"` and `fetchPriority="high"` to avatar (high LCP candidate) |
| `src/components/sections/featured-projects-section.tsx` | 200 | Removed `priority` from project images (they're below the fold; were stealing bandwidth from the actual hero LCP) |
| `src/app/guide/page.tsx` | 217-220, 274-280, 304-305 | Added `eager` prop to `GuideCard`; first 3 cards now use `priority + fetchPriority="high"`, rest stay `loading="lazy"` (the actual LCP element on `/guide/` is the first card image) |
| `src/components/agent-guide/AgentGuide.tsx` | 363-370 | Added `sizes="100vw"` and `fetchPriority="high"` to per-guide hero bg image |
| `src/app/layout.tsx` | 117-120 | Added `<link rel="preconnect">` + `dns-prefetch` for `avatars.githubusercontent.com` (saves 330-440ms LCP across every page) |

**Why these specifically:**
- Lighthouse's `largest-contentful-paint-element` audit named the actual LCP element on each page. On `/guide/`, the LCP is the first guide card image (was `loading="lazy"`!). On `/guide/kami/`, it's the hero bg `<img>`. On Home, it's `hero-dev.jpg` (was already `priority` but missing `fetchPriority`).
- The Home page was preloading 3 below-the-fold project images with `priority: true` and competing with the actual hero — Lighthouse warned about this implicitly via LCP discovery.
- All edits are surgical — only added attributes, no logic changes. RTL is unaffected.

**Verification**: `npx tsc --noEmit` -> 0 errors.

---

## Concerns / red flags

1. **`useMetaTags` client hook on Home (`src/hooks/useMetaTags.ts`)**
   - Sets `document.title` and meta tags inside a `useEffect`, which means the SSR HTML lands without them. Lighthouse audits `document-title`, `html-has-lang` (lang IS in SSR though), `meta-description` against the pre-hydration DOM. On Home this scored 0 on `document-title` — explains the SEO drop to 82. Other pages use Next.js `metadata` export (server-rendered) and score 100/100 on SEO.
   - **Recommended fix** (out of scope for this audit): Convert `app/page.tsx` to use Next.js `generateMetadata`/`metadata` export instead of `useMetaTags`, and delete the hook. ~10 lines of work.

2. **Guide hero images are 600KB-1MB JPEGs** (`public/images/guides/guide-*-hero.jpg`)
   - Next.js Image pipeline serves AVIF/WebP at request time, but Lighthouse on `/guide/kami/` reports 1.1MB savings still possible from "modern-image-formats". Possible reasons: cache miss on first run, or the pipeline isn't transforming on the production CDN (Vercel edge cache may take time to warm). Worth checking once with `curl -H "Accept: image/avif"` against `/_next/image?url=...` to confirm.
   - **Quick win (out of scope)**: pre-generate WebP/AVIF copies and reference them directly, OR run a one-time `sharp`-based compression on the source JPEGs to drop them to ~150-200KB.

3. **Skills-Universe Perf 52** is the worst page
   - FCP 3.3s + TBT 480ms => heavy client JS rendering on first paint. The LCP element is a `<p>` (text), so this isn't an image issue — it's a JS execution issue. Likely the skills-universe 3D/canvas component (the page is a 907-skill latent-space visualization per `MEMORY.md`).
   - **Recommended fix (out of scope)**: dynamic-import the heavy viz with `loading.tsx` placeholder, or move it into an `<IntersectionObserver>` lazy boundary.

4. **GitHub avatar preconnect**
   - All pages reference `https://avatars.githubusercontent.com/u/108827199?v=4` for the avatar. Adding `<link rel="preconnect" href="https://avatars.githubusercontent.com" />` to `app/layout.tsx` saves 330-440ms across every page. **5-second fix.**

---

## Files saved

- `docs/lighthouse-home-mobile.json` (raw, 514KB)
- `docs/lighthouse-guide-mobile.json` (raw, 466KB)
- `docs/lighthouse-guide-kami-mobile.json` (raw, 466KB)
- `docs/lighthouse-skills-universe-mobile.json` (raw, 466KB)
- `docs/lighthouse-methodology-mobile.json` (raw, 466KB)
- `docs/extract-lighthouse.cjs`, `docs/extract-opps.cjs` (helper scripts for re-running the summary)

---

## What was NOT done (deferred)

- **Desktop audits** — only mobile was run within the budget. Desktop scores would be higher (less network throttling) but mobile is the failing dimension.
- **`useMetaTags` -> server metadata migration** — it's a real SEO regression on Home but is a 5-15 line refactor, not a 1-line attribute add. Out of scope.
- **Image pre-compression** to WebP/AVIF — the biggest single saving (~2MB across guide pages) but requires a build script.
- **Skills-Universe JS code-splitting** — biggest perf drag but requires understanding the viz architecture.

---

**Time elapsed**: ~25 minutes (10 min over budget — npm cache corruption forced a fresh local install of `lighthouse + chrome-launcher`, plus parallel runs failed due to Chrome instance collisions and had to be re-run sequentially).
