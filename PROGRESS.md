# Full-Stack Portfolio Website - Progress

## 2026-07-13 — Cinematic journey: smooth transitions + audited project links + living-system guides (branch `feat/cinematic-journey`, commit `59210b0`, PREVIEW only)

**Three fixes from Elad, all verified on the preview deploy. NOT promoted to prod — preview only for Elad's review.**

- **FIX 1 — glide the scene transitions (the #1 ask).** Rewrote the scroll-scrub engine (`cinematic-journey.tsx`). Root cause of the "jumps": a per-leg `currentTime` snap-back (each incoming leg hit clip-end then was reset to 0 when it became the next segment's outgoing leg → the camera visibly reversed at every seam), plus only per-leg time was damped while opacity/captions/segment-selection read raw scroll (three quantities desynced → pops). New model: a SINGLE critically-damped eased scroll value (`pEased`) drives everything; per-leg time is MONOTONE (plays 0→1 then holds at 1, never rewinds); the seam cross-dissolve owns all opacity so exactly two legs are ever visible and their opacities sum to 1 (cosine-fade, C1-continuous → no black flash, no double-bright, no velocity discontinuity); + a subtle transform-only parallax keeps the camera drifting through breathing zones (no snap). CSS: `.cj-leg` gets `will-change: transform`. **Proof:** Playwright 25-frame slow scroll on desktop 1440 AND iPhone 13 AND the live preview — worst |opacitySum−1| = **0.000**, max **2** simultaneous legs, **0** popping frames; + a continuous slow-scroll video. Artifacts: `Documents/reports/cinematic-journey-2026-07-12/` (25 screenshots + `cinematic-slow-scroll.webm` + `transition-report.json`).
- **FIX 2 — project cards: real, live links only.** HEAD-checked every `live_url` (21) + `github_url` (17) on `/projects` and the homepage featured section — **ALL 200** to a real page. Aligned 2 inconsistencies to canonical live domains (featured omanut `*.vercel.app` → `ohlove.co.il`; ey-ai-kids now exposes live `sipurai.ai`). date-kirva's serialized Next.js `notFound` boundary was a false-404 positive — its root renders the real app, kept clickable. NDA projects (Triplus, Zehut) stay non-clickable by design (no dead anchor). Added LINK-AUDIT headers to both data files.
- **FIX 3 — guides reflect the July-2026 living system + link hygiene.** Updated the 3 remaining pattern guides HE+EN (`capability-ladder` gets a new "living network today" section; `aurora` orchestrator-brain + `ceo-loop` approvals updated) to name the 4 now-live layers: one network-wide LiteLLM gateway, shared memory-kernel, correctness layer in the output-guardian, deterministic approvals. Link-check across all guide bodies: all internal `/guide` links resolve; fixed **4 dead external links** — `oh-my-claudecode` repo 404 → author profile; private `elad-personal-agent` 404 → public `eladjak` profile + honest framing; redis streams docs → current `/latest` path; dead shellhacks systemd cheat-sheet → DigitalOcean systemd guide. `/guide` index + every guide route resolve 200.
- **Guardrails intact:** single SSR `<h1>`, 10 JSON-LD blocks, FAQPage fallback, audio + cinematic engine client-only (0 in SSR HTML), reduced-motion static.
- **Gates:** tsc 0 · lint 0 · check:facts 0 · `next build` 0 (100 static pages) · preview deploy Ready. **Preview:** `https://eladjak-website-hnxd6uuq4-eladjaks-projects.vercel.app`.
- **Next:** Elad reviews preview (transitions, links, guides) → then merge to main + `vercel --prod` if approved.

## 2026-07-10 — Site-wide agent-facts sync shipped to PROD (branch `feat/site-facts-refresh` → main, merge `da5b1c9`)

**Fixed the self-contradiction found in the 2026-07-10 staleness audit: 5 different agent counts (3/9/10/13 vs the truth-audited 12) + dead Hetzner presented as the network's core server. Preview verified → merged → prod Ready → live spot-checked.**
- **New `src/data/site-facts.ts`** — canonical `AGENT_COUNT = 12` (matches the /guide agent list), imported by: home meta ×3 (`page.tsx`), stats bar (was **3**), JSON-LD FAQ (was 9), `/claude-code` meta (was 10), chat-faq bot system prompt (was 13). JSON messages can't import TS — grep both `messages/*.json` when the number changes.
- **About (he+en):** 3-agent story → real fleet (קאמי, קיילי, בוקס, גארדאקס, ראנץ', סוליס + אורקל, מוח-תזמור, שומר-תוצר, שכבת-אוטונומיה); clear split from the 32 OMC sub-agents; DevOps Hetzner→Contabo.
- **FAQ (he+en, cascades to the lead-capture bot):** 13→12 agents on Contabo with named fleet; "14 guides"→32.
- **skills-universe:** dead "Hetzner VPS — the central VPS" node → "Contabo VPS (62GB) — התחיל על Hetzner".
- **Projects:** PDF Empire → `pdf.eladjak.com` + Sumit (was stale Vercel storefront + Stripe) + premium products in description · Zehut card: old NLP repo → current platform work (Next.js + Payload CMS + translations RBAC + campaign system) · **new Triplus B2B ops-engine card** (21 stages / 213 sub-steps, ERP adapter — no client-internal links) · pollr +next-intl.
- **Blog flagship post (20.3):** dated-artifact update note added (he+en, points to /guide) + dead VPS IPs removed from the architecture diagram.
- **llms.txt:** 13-agent/VPS → 12-agent/Contabo + full 32-guide list with taglines matched to the real guide data (was 14).
- **Behavior fix:** `featured-projects-section` `github_url` now optional + guarded (Zehut has no public repo).
- **Gates:** tsc 0 · `next build` ✓ · preview deploy success + string spot-checks · prod deploy success · live 200s on / /about /projects /claude-code /guide /blog/building-ai-agent-network /llms.txt /skills-universe · zero stale strings (grep sweep) · JSON-LD 5-schema bundle intact.
- **Untouched by design:** all 32 guides (truth-audited 7.7) + /guide index.

## 2026-07-07 — Guides TRUTH-FIX shipped to PROD (branch `fix/guides-truth` → main, commit `13f1058`)

**All factual inaccuracies from the truth-audit fixed across 27 guides (HE+EN, 60 files, both languages for every fix). Merged to main + deployed `--prod` (Ready), verified live.**
- **P0 global:** Hetzner CPX11/4.75€ story → Contabo (16 vCPU/62GB), framed as "started on Hetzner, today on Contabo"; generic provider examples kept.
- **P1 rewrites:** `docker` (hybrid: ~27 containers on ~10 compose stacks + ~45 systemd, Traefik+CF-Tunnel edge) · `adopter` (public t.me/s scraper, 4 channels, pseudo-embeddings, deleted MTProto/Telethon/500-posts, "pipeline being repaired" disclosed) · `nginx` (personal claims → past-tense/client work; real edge CF-Tunnel+Traefik; site on Vercel) · `postgres` (backs n8n/analytics; agent state = Qdrant/JSONL/SQLite; deleted "2M rows").
- **P2:** `box` (no CrewAI/Vision-OCR/encrypted-SQLite//coach/phase; Telegram interface; framed around live check-ins v2) · `ollama` (layer exists in code, NOT installed on server, runs on PC workstation; deleted 500/day) · `ufw` (iptables+Tailscale+fail2ban reality, UFW teaching kept).
- **P3:** kaylee (docker.sock removed→hardening story, :3500 webhook, cron attribution) · kami (Gemini-first STT, Sonnet 4.5, bridge=HTTP API) · systemd (deleted 4→1.5 score claim, 13→~45) · ceo-loop (magic-link=static token disclosed; WhatsApp+Telegram approve links) · output-guardian (Shabbat+cooldown) · aurora (bot count) · n8n (25→4, yt_to_blog_he) · cloudflare-tunnel (3 open ports, no nginx) · vercel (Edge Functions on Vercel Edge) · claude-code (OMC→code-yeongyu link, 17→22 MCP) · hermes (creative_visual/data_analysis) · ranch (state machine=direction) · crewai (as-needed, memory "being repaired") · dashboard (no Shuffle.js, proxy list, not always-on) · redis-streams (~5k/day, 17 groups, ~10MB, no Q2-2024) · aider (Gemini, aider-assist path, write-gate closed by design) · github-actions (CI only, Vercel Git-integration deploys) · delegator (Contabo, ~7,000 lines) · qdrant (17 collections/~9k points, API key NOT default) · understand-anything (Egonex-AI, 2 projects) · solis (3 responsibility areas) · sailaco/orchestration (soft alignments). Fixed 3 pre-existing self-links.
- **Gates:** tsc 0 · build ✓ · zero Hebrew in en/*.ts · no self-links. **Live verified:** /guide/ollama (workstation fact) · /guide/docker (10× Contabo, 0× 4.75€) · /en/guide/adopter ("currently four", 0× MTProto hero) — all 200.

## 2026-07-07 — Guides upgrade rollout (branch `feat/guide-ceo-loop`, PREVIEW only)

**Full guides upgrade per the approved audit — 4 guides updated, 2 new guides, new "pattern" category, 6 Gemini images. NOT merged to main; preview deploy only.**
- **Updated (HE+EN):** `autonomy` (new output-guardian section + auto-safe lane bullet [max 3/day, provenance auto_safe] + CEO Loop named as human wrapper) · `aurora` (new orchestrator-brain section: recognize→route→execute→verify, POST /ask, verified-artifact gate) · `kami` (per-chat memory Map by chatId + persisted per-chat files, channel visibility, anti-spam guard, 'דשבורד' text command) · `dashboard` (new one-front-door section: megadashboard tile strip + magic-link tokens + one address).
- **New guides (HE+EN, registered in both indexes, sitemap auto):** `output-guardian` ("ran ≠ produced", 3 truth levels, check types, real examples) · `capability-ladder` (5 rungs: routing→memory→tools→verify→model+fallback, honest ceiling: Claude-level OPERATION on scoped jobs, not raw IQ).
- **Category normalization:** `GuideCategory` extended with `"pattern"`. 9 untagged guides got explicit `"agent"` (box, claude-code, crewai, dashboard, kami, kaylee, adopter, delegator, hermes; en/qdrant got "infra"). 6 conceptual guides retagged `"pattern"` (orchestration, autonomy, ceo-loop, aurora, output-guardian, capability-ladder). Third "דפוסי-עבודה"/"Working Patterns" section added to /guide + /en/guide landing pages; JSON-LD + metadata category handle "pattern".
- **Images (Gemini nano-banana):** logos (PNG 512px) + heroes (JPG 1600w) for ceo-loop, output-guardian, capability-ladder — dark navy, no text, verified visually.
- **Gates:** `npx tsc --noEmit` exit 0 · `npm run build` exit 0 (100 static pages) · zero Hebrew in en/*.ts · zero self-links · proofread greps clean.
- **Next:** Elad reviews preview → merge to main + `vercel --prod`.

## 2026-07-06 — Real grounded knowledge bot LIVE in production (prod-push run)

**Merged `feat/real-knowledge-chat` → main (FF, commits `4386720` `e18c6ef` `9c8aac9`) and deployed to prod.**
- New server route `/api/chat-faq` (route.ts): free-text Gemini answers grounded in the site's real FAQ/knowledge (RAG-lite over `messages/he.json`), server-side `GEMINI_API_KEY` (never in browser), rate-limit 12/min, 500-char input cap, 12s timeout, gemini-3.5-flash + thinkingBudget:0. The existing baked FAQ chat UI now talks to a real LLM.
- Also included: 'Build Me a Quote' interactive estimator (`quote-builder.tsx`); trailing-slash on all client fetches (kills 308 hop under trailingSlash:true).

**Verification (live prod):** tsc 0 · `next build` green (route in manifest) · deploy Ready, aliased `https://fullstack-eladjak.co.il` · **POST `/api/chat-faq/` → HTTP 200 with real grounded Hebrew answers** (tested a pricing/delivery question + an out-of-FAQ React/Vue question — both answered contextually and steered to Elad's WhatsApp/contact, proving live LLM not baked). `GEMINI_API_KEY` confirmed present in Vercel Production.
- Safety: backup branch `backup/main-pre-prod-push-20260706`; pre-existing scratch files (CV/logo/PROGRESS drafts) were stashed for a clean merge then restored.

## 2026-06-12 — FAQ-chat SSR + homepage rollout + GEO 92→100 (Shabbat autonomous pilot)

**Shipped to prod (commits `d6048d2` + merge `fbe747f`, deploy 4e1d92ehu Ready):**
- `ChatFAQ` now SSR'd (removed `ssr:false`) on /services AND newly mounted on the homepage (interactive FAQ-chat = the modern FAQ, per the 27.5 vision; zero LLM calls — content baked from translations).
- New server-rendered `<details>` static Q&A fallback inside ChatFAQ: all **12** Q&As in initial HTML → FAQPage JSON-LD now has matching visible content (was: zero FAQ text in SSR HTML).
- Added 2 Q&As (`aiNetwork` — 13-agent network, `location` — Migdal HaEmek) covering the 2 site-wide JSON-LD entries that had no visible counterpart. HE+EN.
- 5 real external profile links (GitHub/LinkedIn/eladjak.com/HiTechKids/WhatsApp) in the static block → fixed the only failing geo-scan check (external links in main 0/8).
- `prefers-reduced-motion`: typing dots render static.

**Verification evidence:** tsc clean outside known-bad SkillsCanvas · Vercel preview beor895n5 Ready · preview+prod SSR HTML grep-verified (fallback label, both new answers, 5 links, FAQPage JSON-LD) · agent-browser on prod: chip click → user bubble + typed answer + 3 follow-up chips, 12 static dts · **geo-scan: 92/100 → 100/100** (was failing external-links).

**Notes:** preview URLs are SSO-protected (even via custom-domain alias) — verified via a Vercel automation-bypass secret (created, then regenerated to invalidate the session-exposed value; 1 fresh secret remains on the project for future CI). Branch `feat/faq-chat-ssr-geo` merged.
**Next (FAQ-chat initiative):** eladjak-hub already has a live LLM ChatBot (95/100 GEO) — optional follow-up there is only an SSR static-FAQ fallback audit, not the baked-in chat (would duplicate).

## 2026-05-29 — 5-lens review + quick-wins shipped + bundle-refactor BLOCKED

**Shipped to prod (commit `e43c9b1`, Vercel deploy 93ztzknnh Ready):**
- 5 forward `ArrowRight` CTA icons flipped for RTL (`rtl:-scale-x-100`): hero(x2), cta, featured-projects, services-preview, b2b-band
- nav hamburger toggles X/Menu per open state (matches aria-expanded)
- Deleted dead code: `design-tokens.ts` (0 importers), `services/client/ai-service.ts` + `content-moderation.ts` (phantom /api/ai/*, 0 importers)

**Review findings still open (from 5-lens workflow):**
- HIGH: homepage 7 below-fold sections use `dynamic(..., {ssr:false})` → invisible to AI/SEO crawlers (`home-page-client.tsx`). Drop `ssr:false`.
- HIGH: blog index + latest-posts fetch `/api/blog/posts` client-side (spinner-first, empty HTML). Render server-side.
- MED: contact/newsletter in-memory rate-limit won't aggregate across serverless instances.
- MED: 46 guide data files duplicated HE/EN; `AgentGuide.tsx` 1009 lines.

**Guide-bundle refactor — ATTEMPTED & REVERTED (council BLOCK):**
- Goal: stop `AgentGuide` (client) importing the full guide barrel (~1.4MB all-guides content) for menu+prev/next.
- Tried: pass lightweight `GuideNavItem[]` props from Server-Component pages; convert guide/[slug], en/guide/[slug], claude-code, en/claude-code to Server Components.
- **BLOCKER (council-of-future-greats, RSC lens):** `AgentGuideData` embeds `icon: LucideIcon` (function refs) in ~25+ fields → passing `guide` across the new server→client boundary throws "Functions cannot be passed directly to Client Components" at runtime on all 4 routes. Passes `tsc` (icons typed valid) but fails `next build`/render. On `main` it worked only because every page was `"use client"`.
- Also found: EN `qdrant.ts` lacks `category:"infra"` (HE has it) → would miscategorize in EN menu.
- **PROPER FIX (deferred, dedicated effort):** migrate `icon` from `LucideIcon` → string key + client-side lookup map (~44 guide files + AgentGuide icon rendering), making `guide` serializable; then the Server-Component split works and the bundle goal is genuinely met. Re-verify with `next build` + browser load + client-chunk inspection.
- Branch `refactor/guide-bundle` deleted (local+remote). main untouched.

**Local-build note:** `next build`/`tsc` fail LOCALLY (Windows) on `SkillsCanvas.tsx` `three` exports-resolution (R3F v9). Vercel (Linux) builds fine — all prod deploys Ready. Local verification = tsc filtered to "no errors outside SkillsCanvas" + Vercel preview deploy.

## 2026-05-28 — entry from deep-work session
**CV files refreshed live (1-page balanced format, locked).** Replaced `public/cv-elad-yaakobovitch.{html,pdf}` and `-he` with the new 1-page truthful versions (Israeli norm). Added `public/elad-personal-logo-preview.html` with the 3 EY concepts + `public/logo-concepts/` PNGs. Deployed to fullstack-eladjak.co.il. Source-of-truth: `~/Documents/CV/cv.canonical.json` + `_render-balanced.mjs`.

---


## Status: active
## Last Updated: 2026-04-27

## Session 2026-04-27 (Round 3) — Skills Universe 420 + 8 infra guides + MCP + B2B (commit 0c7228d)

### Major shipped
- **Skills Universe 107→420**: filesystem scan via `scripts/generate-skills.mjs` of `~/.claude/skills/` + `~/.claude/commands/`. Two concentric Fibonacci spheres (107 core + 313 outer). Idempotent generator wired as `prebuild` script. Symlink-safe walker.
- **8 new infra guides** (HE+EN = 16 files): postgres, nginx, cloudflare-tunnel, systemd, ufw, github-actions, redis-streams, vercel. Total guides: 14 → 22.
- **/api/mcp/skills** — agent-facing JSON capabilities endpoint with CORS *, force-static, cache headers. Lists 107 skills + 22 guides + 7 posts + 5 services + 13 agents.
- **AgentNetworkStatus footer widget** — polls hub.eladjak.com/health every 60s. Honest "לא זמין" fallback. Pauses on tab hidden.
- **CommandPalette extended** to search guides + blog.
- **CalBookingButton** with WhatsApp fallback.
- **/methodology** page — 6 phases of Elad's process (Hebrew RTL).
- **/services pillars layer** — Implementation/Consulting/Training tabs ADDED on top of existing 5 service cards (zero regression).
- **B2BBand on home** — additive section between ProcessSection and CTASection.
- **CSP fix**: added `https://hub.eladjak.com` to connect-src (status widget was silently blocked).
- **docs/BLOG_VS_ARTICLES.md** — decision doc on blog/articles split (deferred until 3+ short notes exist).

### Reviewer pass (3 agents in parallel: opus + 2 sonnet)
- 0 CRITICAL, 4 HIGH (CSP, honesty, untracked file, unused imports) — all fixed before commit
- Typo "pakage" → "חבילה" caught + fixed
- Symlink hardening added to generator
- delegator URL routed via hub (was misleading 37.27.31.1:3900)

### Verified
- `npx tsc --noEmit` exit 0 (after fixes)
- `npm run build` exit 0 — 29 routes, /methodology static, /skills-universe static, /api/mcp/skills dynamic
- Browser: 420 skills render with proper category counts, footer widget mounts, no new console errors

## Session 2026-04-27 (Round 2) — Nav v2 + Skills Universe link + Gemini blog images

### Shipped (commit 2e1a6a9)
- **Navigation v2**: sticky threshold 20→100px, motion.div wrapper with scale 1→0.96 + opacity 1→0.98 on scroll, 200ms easeOut, respects prefers-reduced-motion
- **Skills Universe nav link**: added between /guide and /blog (i18n he+en)
- **Skills Universe page polish**: mobile bottom-sheet for skill panel (sm:+ stays side panel), contact CTA below canvas
- **Gemini blog images**: agent-network.jpg (758KB) + claude-code-productivity.jpg (590KB) generated via Gemini 3.1 Flash FREE, frontmatter updated on 2 posts

## Session 2026-04-27 — AIO + Skills Universe + Hyperframes + Build-Server

### Shipped (4 parallel agents)
1. **AIO bundle** — `public/llms.txt` (llmstxt.org spec) + `public/ai.txt` + `robots.ts` rewrite (20 explicit AI crawler allows: GPTBot, ChatGPT-User, ClaudeBot, Claude-Web, PerplexityBot, Google-Extended, Applebot-Extended, cohere-ai, anthropic-ai, CCBot, OAI-SearchBot, Perplexity-User, GoogleOther, Applebot, Bytespider, FacebookBot, Meta-ExternalAgent, Amazonbot, DuckAssistBot, YouBot) + JSON-LD CollectionPage + ItemList of all 14 guides on /guide.
2. **Blog fixes** — opt-in `locale: 'he' | 'en'` frontmatter on MDXFrontmatter + `localeFilteredPosts` in /blog page + defensive runtime image-dedup map (gradient fallback if same featured_image used twice). Found: 2 posts use /projects/ screenshots instead of dedicated blog images (need Gemini regen later).
3. **Skills Universe** — `/skills-universe` 3D page. 38 skills × 6 categories (frontend/backend/AI/devops/lang/tools), Fibonacci-sphere layout, OrbitControls auto-rotate, Stars background, hover tooltips, click → side panel, respects prefers-reduced-motion. Uses three + @react-three/fiber + @react-three/drei (lazy-loaded, ~150KB on that route only). Added to sitemap.
4. **Build-Server + Hyperframes video** — `/guide` page reframed infra section as "🛠️ בנה את השרת שלך" with anchor + explanatory copy + count badge. Added `category: "infra"` to qdrant.ts (only one missing). Created `GuideVideo` component (HTML5 video, aspect-video, RTL aria-label) wired into AgentGuide.tsx. All 14 guides have populated `videoUrl` + matching mp4s in `public/videos/guides/`.

### Verified end-to-end
- `npx tsc --noEmit` → exit 0 across all 4 changes integrated
- Dev server (Next 16.2.1 Turbopack) ready in 637ms
- HTTP: /llms.txt 200, /ai.txt 200, /robots.txt 200, /guide 200, /skills-universe 200, /blog 200
- Browser: Skills Universe loads (39 skills counted across 6 categories), 3D canvas mounts dynamically, Hebrew title + legend render correctly
- HTML grep confirms: video tag with `src="/videos/guides/kami.mp4"` + `aria-label="וידאו הסבר על עוזר AI בוואטסאפ"` + `id="build-your-server"` anchor

### Pre-existing benign warnings
- next-themes hydration mismatch on `<html>` className/color-scheme — not from this session, not our code
- Chrome extension noise about message-channel — irrelevant

### Open follow-ups (deferred to next portfolio session)
- Gemini-generate dedicated blog images for `building-ai-agent-network` + `claude-code-productivity-tips` (currently reuse /projects/* screenshots)
- Add /skills-universe link to top navigation when ready to surface
- Phase 2 Deep i18n (branch: i18n-phase-2)
- Navigation v2 (sticky bar + chevrons + dropdown)
- English i18n integration for /en/guide routes

## Last Updated (legacy): 2026-04-10

## Current State
Demo project sprint completed. 3/5 projects LIVE and working (Crypto Tracker, Team Meetings, Hebrew Calendar). CRM auto-deploy from GitHub connected. VV needs babel dependency fix. Deep bugs fixed: TM blank page (wrong import), HC blank page (4 cascading bugs: missing ThemeProvider, Fade ref crash, infinite render loop, HDate rendering). Disk space critical (454GB drive, 1.7GB free - cleaned external node_modules).

## What Was Done

### Session 2026-04-10 (2) - Demo Projects & Crypto Tracker Deploy

#### Crypto Tracker Deployed to Vercel
- [x] Cloned repo, created Vercel serverless API routes (proxy to CoinGecko)
- [x] Replaced localhost:54187 with relative /api paths
- [x] Deployed: https://crypto-tracker-iota-mocha.vercel.app
- [x] Added live_url to portfolio projects page
- [x] Committed and pushed to GitHub

#### Customer CRM - Demo Mode (Angular)
- [x] Created `DemoModeInterceptor` - catches HTTP errors (status 0/504) and returns mock data
- [x] 7 demo customers + 8 demo tasks with Hebrew content
- [x] Full CRUD support in demo mode (add/edit/delete in-memory)
- [x] Registered in app.module.ts as first interceptor
- [x] Pushed to GitHub: eladjak/Custome-Mengment-Angular (master branch)
- [ ] Vercel auto-deploy pending (needs to rebuild from GitHub)

#### Vacation Vibe - Guest Login + Demo Mode (React/Redux)
- [x] Created `demo-mode.ts` service with mock user, token, and 8 vacation destinations
- [x] Added "כניסה כאורח (דמו)" guest login button to Login page
- [x] Modified axios interceptor to fall back to demo data on network errors
- [x] Pushed to GitHub: eladjak/Vacation-STUDENT_ID_Final (main branch)
- [ ] Vercel auto-deploy pending

#### Hebrew Calendar - Demo Events Fallback
- [x] Added 5 demo calendar events to useEvents hook
- [x] Events load automatically when API fails (no blank page)
- [x] Pushed to GitHub: eladjak/hebrew-gregorian-calendar (main branch)
- [x] Build passes locally

#### Team Meetings - Fixed Blank Page Bug
- [x] Root cause: `MEETING_STATUSES` imported from wrong file + `MeetingStatus` enum used as runtime value
- [x] Fixed import to use `types/meetings.ts` instead of `constants/meetings.ts`
- [x] Fixed `MEETING_STATUS_DISPLAY` to use string keys instead of undefined enum values
- [x] Clean npm install fixed corrupted @mui/icons-material
- [x] Pushed fix to GitHub

#### Hebrew Calendar - Fixed 3 Cascading Bugs (Blank Page)
- [x] Bug 1: Missing MUI ThemeProvider in App.js → `Cannot read 'hover' of undefined`
- [x] Bug 2: MUI Fade transition wrapping component without ref → `Cannot read 'scrollTop' of null`
- [x] Bug 3: Infinite re-render loop - inline `showMessage` callback changed every render → useCallback deps loop
- [x] Bug 4: HebrewCalendar component renders HDate objects as React children → defaulted to Gregorian view
- [x] Demo events load when API unavailable (5 sample events)
- [x] All fixes pushed to GitHub, verified working locally

#### Live Demo Status (Browser Verified)
| Project | URL | Status |
|---------|-----|--------|
| Crypto Tracker | crypto-tracker-iota-mocha.vercel.app | LIVE - Working |
| Customer CRM | customer-crm-tau.vercel.app | Pushed to main, awaiting Vercel rebuild |
| Vacation Vibe | vacation-vibe-pi.vercel.app | Pushed to main, awaiting Vercel rebuild |
| Hebrew Calendar | hebrew-calendar-eosin.vercel.app | Pushed fixes, verified locally, awaiting rebuild |
| Team Meetings | team-meetings.vercel.app | Pushed fix, awaiting rebuild |

---

### Session 2026-04-10 - Conversion, Deploy Fix, Project Expansion

#### Vercel Auto-Deploy Fixed (3 root causes)
- [x] Removed deleted `@/lib/supabase` import from sitemap.ts
- [x] Removed `packageManager: "pnpm@9.6.0"` from package.json
- [x] Deleted vercel.json (had reference to deleted cron route)
- [x] Vercel auto-deploy now works on git push!

#### Latest Blog Posts on Homepage
- [x] New `LatestPostsSection` component showing 3 most recent posts
- [x] Glassmorphism cards with title, description, date, reading time
- [x] Added between Featured Projects and Recommendations sections
- [x] Bilingual translations (EN + HE)

#### YouCanBookMe → Calendly CTA
- [x] Created `src/lib/config.ts` with BOOKING_URL config
- [x] CTA button opens external URL (new tab) or falls back to /contact
- [x] Set `NEXT_PUBLIC_BOOKING_URL=https://calendly.com/eladhiteclearning` on Vercel

#### Contact Form Activated
- [x] Set `WEB3FORMS_ACCESS_KEY` on Vercel — form now sends real emails!
- [x] Fallback chain: Resend > Web3Forms > mailto

#### Crypto Tracker Project Added
- [x] Added CoinGecko API crypto tracker to portfolio (jQuery/AJAX/Chart.js)
- [x] Bilingual translations, GitHub link

#### Deployment
- [x] Commits: afc3b4c (blog+CTA+deploy fix) + ece9580 (crypto project)
- [x] All deploying via Vercel auto-deploy (fixed!)

---

## NEXT SESSION TODO (CRITICAL - Project Demo Fixes)

### Priority 1: Make Demo Projects Work Without Login
The user's portfolio shows project links. Visitors MUST be able to click and USE each app immediately — no sign-up, no passwords.

**Projects that need demo/guest mode:**

1. **Customer CRM** (`customer-crm-tau.vercel.app`)
   - Stack: Angular + Node.js + Express + MongoDB + JWT Auth
   - Local repo: `/c/Users/eladj/projects/customer-crm`
   - Need: Guest login bypass OR demo credentials auto-filled
   - Need: Pre-populated demo data (5-10 fake customers with tasks)
   - Priority: HIGH (most impressive to employers)

2. **Vacation Vibe** (`vacation-vibe-pi.vercel.app`)
   - Stack: React + TypeScript + NestJS + TypeORM + Redux + MUI
   - Local repo: `/c/Users/eladj/projects/vacation-vibe`
   - Need: Guest access without login
   - Priority: HIGH

3. **Team Meetings** (`team-meetings.vercel.app`)
   - Stack: React + TypeScript + Vite + FullCalendar + MUI
   - Local repo: `/c/Users/eladj/projects/team-meetings`
   - Need: Verify works without auth, add sample meetings data
   - Priority: MEDIUM

4. **Hebrew Calendar** (`hebrew-calendar-eosin.vercel.app`)
   - Stack: React + FullCalendar + Hebrew Calendar API
   - Local repo: `/c/Users/eladj/projects/hebrew-calendar`
   - Need: Verify works, may just need visual polish
   - Priority: MEDIUM

5. **SipurAI** (`sipurai.ai`) — Uses Clerk, separate project
6. **HaDerech** (`haderech-next.vercel.app`) — Uses Clerk, separate project

### Priority 2: Visual Facelift for All Demo Projects
All 4 projects above need modern UI improvements. Current look is dated.

### Priority 3: Crypto Tracker
- GitHub repo: `eladjak/Jquery-AJAX---Cryptocurrency-API-Tracking-Application-Project`
- Need: Deploy to Vercel (static site, should be simple)
- Need: Generate screenshot for portfolio card
- No auth issues (pure client-side)

### Priority 4: Calendly Page Design
- URL: https://calendly.com/eladhiteclearning
- User wants it designed/customized to look better
- Need to explore Calendly's customization options via browser

### Approach for Each Project
For each project, work in its own repo:
1. `cd /c/Users/eladj/projects/PROJECT_NAME`
2. Understand current auth flow
3. Add guest/demo mode (skip login OR auto-fill demo credentials)
4. Add seed data where needed
5. Visual improvements (modern colors, spacing, typography)
6. Deploy to Vercel
7. Take screenshot for portfolio

---

### Session 2026-04-03 - Analytics, Social, Performance, Infrastructure

#### Disk Space Crisis & Cleanup
- [x] Diagnosed terminal crashes: disk was at 1.8GB free (killing processes)
- [x] Deleted 3 installed app installers (Obsidian, OBS, Discord) = +536MB
- [x] Cleaned Playwright browsers (+656MB) and npm cache
- [x] Extracted 4 OneDrive zips (254 photos) to eladjak-hub/public/images/onedrive-photos/
- [x] Deleted OneDrive zips from Downloads (+383MB)
- [x] Final: 1.8GB → 35.8GB free

#### Vercel Analytics + Speed Insights
- [x] Installed `@vercel/analytics` and `@vercel/speed-insights`
- [x] Added `<Analytics />` and `<SpeedInsights />` to client-layout.tsx

#### Blog Social Sharing
- [x] New `SocialShare` component: X, LinkedIn, WhatsApp, Copy Link buttons
- [x] Glassmorphism pill style (bg-white/5 backdrop-blur border-white/10)
- [x] Bilingual labels (EN + HE) via next-intl
- [x] Placed in blog post header after tags

#### RSS Feed
- [x] New route handler at `/feed.xml` with all blog posts
- [x] RSS 2.0 with Atom self-link, proper categories
- [x] Added RSS alternate link in layout metadata
- [x] 1-hour cache header

#### Contact Form Improvement
- [x] Added Web3Forms as fallback (Resend > Web3Forms > mailto)
- [x] Web3Forms try/catch silently falls through to mailto on failure
- [x] Updated .env.example with WEB3FORMS_ACCESS_KEY docs

#### Performance Optimization
- [x] Dynamic imports (ssr: false) for CommandPalette, ChatFAQ, ProjectPreviewModal
- [x] Added viewport export with themeColor (#050810)
- [x] Added image `sizes` to mentor avatars (56px) and about profile (128px)
- [x] Removed duplicate manual `<meta name="theme-color">` from head

#### Dead Code Cleanup (-3,918 lines)
- [x] Deleted unused hooks: useBlogPosts, useBlogQuery, usePostCache, useAnalytics, useCache, useRealtimeSubscription, useRealtimeUpdates
- [x] Deleted unused components: auth-dialog, blog-card, blog-generator, blog-post-grid, snippet-editor, notifications
- [x] Deleted unused libs: auth.tsx, blog-generator.ts, github/sync.ts, services/code-review.ts, services/openai.ts, supabase.ts, supabase.types.ts
- [x] Deleted unused types: blog.ts, realtime.ts
- [x] Deleted unused API routes: ai/generate-blog, ai/moderate-content, ai/review-code, cron/sync-github
- [x] Deleted entire supabase/ directory (config, functions, temp files)

#### Security
- [x] npm audit: 4 vulnerabilities → 0 (picomatch ReDoS/injection, yaml stack overflow)
- [x] Removed conflicting lockfiles (bun.lockb + pnpm-lock.yaml) — caused Vercel build failures

#### Vercel Deploy Fix
- [x] GitHub auto-deploy was failing (0ms builds = install failure from multiple lockfiles)
- [x] Fixed with `npx vercel --prod --force` (manual deploy works)
- [x] Set NEXT_PUBLIC_SITE_URL=https://fullstack-eladjak.co.il in Vercel env vars
- [x] Verified share buttons and RSS feed live on production

#### Commits
- [x] 63144fd: feat: analytics, social sharing, performance, contact fallback + dead code cleanup
- [x] 25f798a: fix: resolve all npm audit vulnerabilities (4 → 0)
- [x] 533f77c: fix: remove conflicting lockfiles (keep package-lock.json only)

### Session 2026-03-26 - Interactivity, Navigation, Project Images

#### Claude Code in Navigation
- [x] Added /claude-code link to top nav bar (between Projects and Blog)
- [x] Added `claudeCode` translation key to en.json and he.json

#### Project Images Fixed (14/14)
- [x] Real Playwright screenshots from 6 live sites (HaDerech, Portfolio, SipurAI, Omanut, Bayit BeSeder, HTML-to-PPTX)
- [x] Gemini AI mockups for 4 auth-gated sites (Hebrew Calendar, Team Meetings, Vacation Vibe, Customer CRM)
- [x] Kept existing Gemini images for 4 projects without live URLs (Ninja Keyboard, Voice Chat, ZehutAI, Kidushishi)
- [x] Unified naming: all *-screenshot.{png,jpg}, removed old mismatched files
- [x] Updated take-screenshots.mjs script for consistent naming

#### Interactive Chat FAQ (Services Page)
- [x] New `ChatFAQ` component: chat-style Q&A with typing animation
- [x] Clickable suggested questions → user bubble → typing dots → assistant response
- [x] Follow-up question suggestions after each answer
- [x] 10 bilingual Q&A pairs (services, pricing, tech stack, availability, process, AI, Hebrew/RTL, contact, timeline, support)
- [x] Glassmorphism design, RTL support, Framer Motion animations
- [x] Auto-scroll to latest message, mobile-first

#### Live Project Preview Modal
- [x] New `ProjectPreviewModal` component: iframe-based live site preview
- [x] Device frame selector: Desktop (1280px), Tablet (768px), Mobile (375px)
- [x] URL bar, open-in-new-tab button, loading spinner
- [x] Graceful fallback for X-Frame-Options blocked sites
- [x] AnimatePresence open/close, click-outside/Escape to close

#### Tech Stack Filter Bar (Projects Page)
- [x] Multi-select pill filters sorted by frequency across all projects
- [x] "All Tech" reset pill + active filter count summary
- [x] Combined filtering: category + tech stack (intersection logic)
- [x] Animated card reflow with Framer Motion LayoutGroup
- [x] Clicking tech badge on a card activates that tech filter
- [x] Empty state with "Clear all filters" link

#### Deployment
- [x] 2 commits pushed: d1fbe11 (nav + images) and e1654ce (interactive features)
- [x] Build passes clean, TypeScript clean, 22 routes

### Session 2026-03-25 - Content, Tests, SEO, UX

#### Claude Code Guide Expansion
- [x] Expanded from 502 to 709 lines - 5 new sections (CLAUDE.md, MCP, Skills/Hooks, Agents, Advanced)
- [x] Code examples in macOS-style terminal blocks
- [x] Hero banner with "המדריך המלא ל-Claude Code" + mini TOC
- [x] Author section at bottom with links to /contact and /services
- [x] Sticky TOC updated with new section IDs

#### E2E Tests (Playwright)
- [x] Playwright setup with 5 test suites (navigation, homepage, projects, blog, contact)
- [x] 60/60 tests passing against live site (fullstack-eladjak.co.il)
- [x] npm scripts: test:e2e, test:e2e:ui, test:e2e:headed, test:e2e:report

#### About/CV Update from Appliable
- [x] Skills, timeline, experience updated from appliable/profile/experience.md
- [x] AI Agent Network, OMC, Financial Manager as real experience entries
- [x] Differentiators: AI-native, prolific builder, Hebrew RTL, business background
- [x] "Seeking first full-time role" (honest)

#### CV Download
- [x] Created public/cv-elad-yaakobovitch.html - professional A4 print-optimized resume
- [x] Dark gradient header, 2-column layout, stats row, project spotlight
- [x] Download buttons in hero, about page, and footer

#### Technical Blog Posts (2 new)
- [x] "Building a Multi-Agent AI Network" (296 lines) - architecture, JSONL bridge, deployment
- [x] "10 Claude Code Tips That 10x'd My Productivity" (391 lines) - real tips with code
- [x] Both bilingual (EN + HE) with real code examples
- [x] Total blog posts: 7 (all bilingual)

#### UX Improvements
- [x] Scroll-to-top FAB - glassmorphism, RTL-aware (opposite WhatsApp FAB)
- [x] Reading progress bar already existed in blog posts (verified working)

#### SEO Per-Page
- [x] 7 route-segment layouts with unique meta/OG/canonical per page
- [x] Pages: projects, services, contact, about, thanks, claude-code, blog
- [x] Sitemap: added /claude-code, aligned priorities for all 9 pages + blog posts
- [x] Robots: removed AI bot blocks, single allow-all rule

#### Homepage Conversion
- [x] CTA heading: "בואו נבנה את הפרויקט הבא שלכם"
- [x] "Book a Call" button (links to /contact, ready for YouCanBookMe)
- [x] Trust signal: "26+ פרויקטים · 10 דמואים חיים · 60 טסטים ירוקים"
- [x] Availability nudge: "זמינות מיידית · תגובה תוך שעות"

#### Polish
- [x] 404 page: text-glow, icon halo, glassmorphism cards, hover lift
- [x] Build fix: added @alloc/quick-lru dependency

### Session 2026-03-23/24 - Dark-First Facelift + Content + Deploys

#### Sprint Status Check
- [x] Verified all 14 GitHub repo URLs return 200 OK
- [x] Verified all 7 live deployment URLs return 200 OK (including VacationVibe which was previously broken)
- [x] Confirmed all 14 project thumbnails exist in public/projects/ (11 Gemini-generated .jpg + 3 original .png)
- [x] Confirmed all 14 projects have `image` fields in code (projects page + featured section)
- [x] Build passes clean: 22 routes, TypeScript clean
- [x] Opened live site in browser - projects page renders perfectly with all thumbnails

#### Iteration Review
- [x] Generated comprehensive HTML review page: `docs/reviews/iteration-2026-03-23.html`
- [x] Review includes: sprint summary, 14 project cards, deployment status table, next steps, command guides
- [x] Auto-opened review in browser

#### Thanks Page Update (3 parallel agents)
- [x] Added 4 new people: Yuval Keshtcher, Alexander Kapit, Daniel Trabelsi, Ariel Eisen (PixMind)
- [x] Filled missing links: Gal Havkin (GitHub), Nadav Neve (LinkedIn + Twitter)
- [x] Added new link types: YouTube, Facebook, Instagram, Telegram
- [x] Translations HE+EN for all 4 new people

#### Project URLs Update
- [x] Bayit BeSeder: added `live_url: 'https://www.bayitbeseder.com'`
- [x] EY.AI Kids renamed to SipurAI (סיפוראי) in both languages

#### Blog Bilingual Content
- [x] All 5 blog posts now have full Hebrew translations appended
- [x] Hebrew sections use `<div dir="rtl" lang="he">` wrapper
- [x] Code blocks kept in English, prose translated naturally

#### Dark Mode Default
- [x] Changed ThemeProvider defaultTheme from "system" to "dark"

#### SipurAI Domain
- [x] Found domain: sipurai.ai (from project's vercel.json CSP headers)
- [x] Added `live_url: 'https://sipurai.ai'` to ey-ai-kids project entry

#### Visual Facelift (3 parallel agents)
- [x] CSS: deeper dark background (#050810), gradient mesh (purple/cyan radial spots)
- [x] CSS: glow-border + text-glow utility classes, translucent purple selection
- [x] Hero: stronger gradient overlay, text-glow heading, avatar glow orb, CTA scale hover
- [x] Projects: translucent cards (bg-card/60), purple glow shadow hover, interactive tech tags
- [x] Committed and pushed: `16a4e91`

#### Visual Facelift Phase 2 (3 agents - nav, skills+CTA, footer+about)
- [x] Nav: glassmorphism bg/70, purple-cyan logo gradient, bold active links
- [x] Skills: bg-card/60, stronger hover glow, text-glow stats
- [x] CTA: stronger ambient glow, translucent cards, scale hover button
- [x] Footer: glass bg-card/30, text-glow logo, interactive tech badges
- [x] About: text-glow heading, avatar glow, hover shadows on cards

#### Visual Facelift Phase 3 (3 agents - readability, pages, components)
- [x] Hero: stronger overlay bg/80, drop-shadow-lg heading, brighter text
- [x] Blog: text-glow, hover glow cards, interactive tag filters
- [x] Contact: text-glow, card hover, backdrop-blur form, scale CTA
- [x] Services: text-glow, card glow hover, scale CTA
- [x] Process: text-glow, hover border cards, step number glow
- [x] StatsBar: text-glow on counter numbers
- [x] TechMarquee: edge fade overlays (RTL-aware), hover:text-primary

#### Visual Facelift Phase 4 (4 agents - blog MDX, claude-code, thanks, FAB)
- [x] Blog [slug]: text-glow, MDX code/headings/blockquotes/links styled
- [x] Claude Code: sticky TOC pill bar, section hover, command pills
- [x] Thanks: card lift hover, avatar glow, social links scale
- [x] WhatsApp FAB: Hebrew tooltip, aria-label

#### SEO + Performance + Mobile (3 agents)
- [x] SEO: aria-hidden on decorative images, canonical URL verified
- [x] Perf: lazy load images (priority first 3), hero preload, deviceSizes
- [x] Mobile: hero centered, responsive text, CTA wrap, avatar scale, stats 3-col

#### Deployed Projects Facelift (3 agents - all pushed + auto-deployed)
- [x] HTML-to-PPTX: dark mode, split-screen, glassmorphism, gradient badges
- [x] Customer CRM: Angular Material dark theme, gradient cards, glass navbar
- [x] VacationVibe: MUI dark theme, frosted AppBar, vacation card glassmorphism
- [x] Team Meetings: MUI dark theme, calendar dark styling, gradient header, glow events
- [x] Hebrew Calendar: deployed to Vercel (hebrew-calendar-eosin.vercel.app), live_url added

#### Remaining for Next Session
- [ ] Mentor social links: waiting for WhatsApp responses
- [ ] More blog content (import real posts from meharoshelhadaf etc.)
- [ ] Calendly/Cal.com "Book a Call" CTA integration
- [ ] CV/Resume PDF download button
- [ ] E2E tests with Playwright
- [ ] Deploy more projects (Ninja Keyboard, ZehutAI demo)
- [ ] Verify all 5 project facelifts render correctly on Vercel

### Session 2026-03-22 - Major Upgrade (Resume-based + Component Wiring)
- [x] **Hero: ProfileAvatar** — real GitHub photo with rotating gradient border + status dot
- [x] **Hero: FloatingTechIcons** — animated floating tech emoji icons
- [x] **Hero: Background** — hero-dev.jpg Gemini image as subtle background
- [x] **StatsBar** — wired into homepage: 26+ apps, 50+ repos, 1000+ commits, 3 AI agents, 4+ years
- [x] **Hero content** — updated from resume: server-side focus, 26+ deployed apps
- [x] **Skills section** — 26+ projects, 4+ years (accurate per resume)
- [x] **About page** — experience years corrected to 4+ (John Bryce 2022)
- [x] **Command palette** — Hebrew placeholder ("חיפוש דפים ופעולות...")
- [x] **Blog dates** — toLocaleDateString('he-IL') for Hebrew date format
- [x] **h-screen → h-dvh** — 7 files updated for mobile viewport
- [x] **OG image** — Gemini purple gradient + typography (public/og-image.jpg)
- [x] **Apple touch icon** — Gemini EY monogram (public/apple-touch-icon.jpg)
- [x] **hero-dev.jpg** — Gemini futuristic dev workspace image
- [x] **/claude-code** — page migrated from hub with portfolio-matching design
- [x] **HE/EN translations** — hero, stats, about, skills, journey updated
- [x] Build: PASS (22+ pages)

### Session 2026-03-19 - Services Page + SEO + Accessibility + Final Quality Pass

#### Final Quality Pass (end of day)
- [x] Visited ALL pages on live site (home, about, projects, services, blog, contact, thanks)
- [x] Verified: no broken images, no placeholder text, no TODO content
- [x] Verified: RTL text correct on all pages
- [x] Verified: WhatsApp CTA works (wa.me/972525427474)
- [x] Verified: services page shows 5 services with professional pricing
- [x] Verified: contact form, email (eladhiteclearning@gmail.com), phone all correct
- [x] Verified: 14 projects with category filters on projects page
- [x] Verified: blog API returns 5 posts correctly
- [x] React Doctor: 83/100 "Great" (2 pattern-level warnings, no real bugs)
- [x] All project images use Next.js Image with fill, sizes, AVIF/WebP optimization
- [x] Fixed: services hero now uses Next.js Image (was CSS backgroundImage, unoptimized)
- [x] Fixed: WhatsApp FAB animation scale 0.5 (was 0, jarring pop-in)
- [x] Fixed: featured projects animation opacity 0 + y:20 (was barely-visible 0.85 + y:8)
- [x] Fixed: services card animations same improvement
- [x] Updated DESIGN.md with services page patterns and full page inventory

#### New Services Page (`/services`)
- [x] Created `src/app/services/page.tsx` with 5 services:
  1. AI Automation Solutions (from 5,000 NIS)
  2. Full-Stack Development (from 3,000 NIS)
  3. EdTech Solutions (contact for quote)
  4. AI & Development Workshops (from 2,000 NIS)
  5. WhatsApp Automation (from 3,500 NIS)
- [x] Each service has: icon, gradient color, description, price hint, 4 feature bullets
- [x] Hero section with Gemini-generated background image (Next.js Image optimized)
- [x] Contact CTA section with WhatsApp, email, phone cards
- [x] Full i18n (HE+EN) with professional Hebrew content

#### SEO Optimization
- [x] Hebrew meta description and keywords in layout.tsx
- [x] JSON-LD structured data: Person, WebSite, LocalBusiness schemas
- [x] hreflang tags (he-IL, x-default)
- [x] Geo targeting meta (IL, Migdal HaEmek)
- [x] OpenGraph and Twitter Card meta on all pages

#### Accessibility Fixes (IS 5568 / WCAG)
- [x] Skip-to-content link
- [x] Reduced motion support (prefers-reduced-motion + useReducedMotion)
- [x] focus-visible rings on all interactive elements
- [x] aria-label on icon-only links, aria-hidden on decorative icons

#### Project Images (11 total: 4 new Gemini + 7 wired)
- [x] All use Next.js Image with AVIF/WebP, proper sizes attribute

#### RTL Logical Properties
- [x] Uses start/end instead of left/right throughout

#### Homepage Improvements
- [x] Added `ServicesPreviewSection` between Skills and Featured Projects
- [x] Added WhatsApp CTA button to hero section
- [x] Hero now has 3 CTAs: Contact, View Projects, WhatsApp

#### Navigation & Site-Wide
- [x] "Services" in nav, footer, command palette, sitemap

#### Build Results
- 22 routes, TypeScript clean, multiple deploys

### Session 2026-03-10 - Portfolio Revival Sprint: Sessions 2-4 (Batch)

#### Portfolio Integration (3 new projects)
- [x] Added VacationVibe (React + NestJS vacation booking platform) to projects page
- [x] Added Team Meetings (React + Vite meeting management) to projects page
- [x] Added Customer CRM (Angular + Express + MongoDB) to projects page
- [x] Added bilingual translations (HE+EN) for all 3 projects
- [x] Updated Hebrew Calendar tech stack (added FullCalendar, Hebrew Calendar API, Google OAuth, i18n)
- [x] Updated GitHub repo descriptions for all 4 projects
- [x] Fixed .npmrc for legacy-peer-deps
- [x] Build passes (21 routes), TypeScript clean
- [x] Committed and pushed: `d85c398`
- [x] Portfolio now shows 14 projects total (was 11)

#### Project Deployments (in progress)
- [ ] Team Meetings: frontend built successfully, deploying to Vercel
- [ ] VacationVibe: client deps installed, building
- [ ] Customer CRM: Angular client setup, building

### Session 2026-03-09 - Portfolio Revival Sprint: Session 1 (HTML2PPTX)

#### HTML to PPTX Project Revival (`~/projects/html-to-pptx/`)
- [x] Explored archive at `~/archive/deprecated/WebTechPro_Html_To_pptx/`
- [x] Identified fundamental architecture flaw (client-side JSDOM import - Node.js only)
- [x] Cleaned ~30 dead files (unused components, services, duplicate API routes, conflicting templates)
- [x] Removed 15+ unused dependencies (puppeteer, sharp, ioredis, babel, officegen, pdf-lib, openai, anthropic SDK, supabase, react-query, etc.)
- [x] Rewrote core conversion to server-side API route (`POST /api/convert`)
- [x] Implemented: 5 color themes, smart slide detection, RTL auto-detection, code block rendering
- [x] Rewrote ConversionArea component (3 input tabs, theme selector, progress bar, blob download)
- [x] Rewrote layout (sticky nav, Heebo font) and page (hero, feature cards)
- [x] Fixed pptxgenjs API issues (`pres.slides` doesn't exist - used manual slideCount)
- [x] Removed `@tailwindcss/typography` (not in deps)
- [x] Built successfully, deployed to Vercel
- [x] Created GitHub repo: github.com/eladjak/html-to-pptx

#### Portfolio Integration
- [x] Added HTML2PPTX to `featured-projects-section.tsx` staticProjects array
- [x] Added HTML2PPTX to `projects/page.tsx` allProjects array (category: tools)
- [x] Added bilingual translations (HE+EN) in both `messages/en.json` and `messages/he.json`
- [x] Verified TypeScript clean, build passes (21 routes)
- [x] Committed and pushed to trigger Vercel deploy

#### Deployed URLs
- HTML2PPTX app: https://html-to-pptx-ten.vercel.app
- GitHub repo: https://github.com/eladjak/html-to-pptx

## Remaining Revival Sprint Sessions
- [x] Session 1: HTML2PPTX - rebuilt and deployed
- [x] Sessions 2-4: VacationVibe, Team Meetings, Customer CRM - added to portfolio, deploying
- [ ] Hebrew Calendar: upgrade from archive (advanced version with appointments, OAuth)
- [ ] Project screenshots/thumbnails for new projects

### Session 2026-02-24 - Nav fixes, cleanup, Thanks page, consistency pass

#### Fixes
- [x] Removed dead `testimonials` entry from SECTION_ANCHORS and useActiveSection hook
- [x] Fixed tech marquee seamless loop (single wrapper, -50% translate) + removed "Three.js"
- [x] Added Thanks page link to main nav, footer, sitemap, command palette
- [x] Mounted CommandPalette in navigation (was defined but never rendered)
- [x] Removed all Three.js references from project tech arrays and descriptions
- [x] Fixed "3D experiences" text in portfolio descriptions (both languages) → "smooth animations"
- [x] CTA section button changed from purple to amber (bg-cta) matching hero for conversion consistency
- [x] Fixed Three.js mention in testimonial text (both languages)
- [x] Deleted dead testimonials-section.tsx (unused component, -180 lines)

#### New: Thanks Page (`/thanks`)
- [x] Created `src/app/thanks/page.tsx` with 8 mentor cards
- [x] People: Yuval Avidani, Avitz, Noam Naumovski, Gal Havkin, Dr. Roey Tzezana, Dr. Roi Yozevitch, Nadav Neve, Guy Aga
- [x] Gradient avatar placeholders, social links, bilingual (HE+EN)
- [x] Added `thanksPage` translations to both message files

### Session 2026-02-23 - Production Critical Fixes + Conversion Improvements

#### Phase 1: Critical Production Fixes

**1.1 Remove Three.js, Replace Hero with CSS Gradient**
- [x] Deleted `hero-3d-scene.tsx`, `split-text.tsx`
- [x] Deleted unused Three.js hooks (`use3DInteraction.ts`, `useAnimatedMesh.ts`)
- [x] Deleted unused Three.js types (`three-fiber.ts`, `three.d.ts`)
- [x] Removed `three`, `@react-three/drei`, `@react-three/fiber`, `@react-three/postprocessing`, `@types/three`, `@use-gesture/react` from package.json
- [x] Hero now uses animated CSS gradient background (primary/accent colors)
- [x] Left-aligned text (`text-start`) for better readability
- [x] Reduced height from `min-h-[90vh]` to `min-h-[75vh]`
- [x] Single staggered fade-in animation instead of character-by-character SplitText

**1.2 Remove Fake Testimonials Section**
- [x] Removed `TestimonialsSection` import and usage from homepage
- [x] Homepage flow: Hero → TechMarquee → Skills → FeaturedProjects → Process → CTA

**1.3 Remove StatsBar**
- [x] Removed `StatsBar` import and usage from homepage
- [x] Removed "100% satisfaction" stat from Skills section (no proof)
- [x] Skills stats grid: 3 columns (3+ years, 20+ projects, 15+ technologies)

**1.4 Delete Dead Pages + Clean References**
- [x] Deleted `ai-tools/page.tsx`, `whiteboard/page.tsx` directories
- [x] Deleted `demo-playground.tsx`, `code-optimizer.tsx`
- [x] Removed AI Tools from footer, command palette, sitemap
- [x] Removed `aiToolsPage` and `aiPlayground` sections from both message files
- [x] Removed `aiTools`, `whiteboard` nav keys from messages
- [x] Updated blog post link (removed `/ai-tools` reference)
- [x] Cleaned unused `getAllMDXPosts` import from command palette
- [x] Cleaned unused `Code2` import from command palette
- [x] Removed empty `src/components/ai/` directory

**1.5 Create OG Image**
- [x] Created `opengraph-image.tsx` using Next.js ImageResponse API
- [x] Dynamic server-side generation (1200x630, branded purple gradient)
- [x] Shows: EY.dev logo, name, subtitle, tech stack pills, domain

**1.6 Fix Contact Page Grid**
- [x] Changed from `md:grid-cols-3` to `grid-cols-2 md:grid-cols-4` for 4 contact items

#### Phase 2: Conversion Improvements

**2.1 Rewrite Hero Copy**
- [x] EN heading: "I Build Web Apps That Grow Your Business"
- [x] HE heading: "אני בונה אפליקציות ווב שמצמיחות את העסק שלך"
- [x] Subtitle: "Full-Stack Developer | Next.js + AI Specialist | Israel"
- [x] Description: outcome-focused (attract customers, automate, scale)

**2.2 Add Warm Accent Color for CTAs**
- [x] Added `--cta` CSS variable: amber-500 (light) / amber-400 (dark)
- [x] Added `cta` color to Tailwind config
- [x] Applied to hero badge and primary CTA button

**2.3 Fix WhatsApp FAB Icon**
- [x] Replaced `MessageCircle` from lucide-react with actual WhatsApp SVG icon
- [x] Added green shadow glow (`shadow-green-600/30`)

**2.4 Improve ScrollAnimate Visibility**
- [x] Changed `opacity: 0.85` → `opacity: 0` (actually invisible initially)
- [x] Changed `y: 8` → `y: 24` (noticeable slide distance)
- [x] Changed `duration: 0.2s` → `0.5s` (smooth, visible animation)

**2.5 Contact Page Micro-Copy**
- [x] Added response time text: "I usually respond within a few hours"
- [x] Added Hebrew translation

**2.6 Update Site URL**
- [x] Verified `metadataBase` already uses `https://fullstack-eladjak.co.il`

#### Build Results
- 20 routes (down from 22)
- TypeScript: clean
- Three.js packages removed from dependencies
- OG image generated dynamically via edge runtime

## Known Issues (Next Session)
1. **Missing project images/graphics** — site lacks visual content, especially screenshots/graphics for the featured projects
2. **No real client testimonials** — testimonials data exists in JSON but section was removed from homepage (can restore when real ones come in)

## Next Steps
- Add project screenshots/thumbnails for all featured projects
- Add real graphics/illustrations throughout the site
- Scheduling integration (Calendly/Cal.com) - "Book a Call" CTA
- CV/resume download button
- Lighthouse performance audit
- Consider adding a blog post about the site build process

## Previous Sessions

### Session 2026-02-22 - Conversion Optimization & Cleanup

#### Agent-Driven Analysis (3 parallel agents)
- [x] UX/Conversion expert audit - identified site showcases skill but doesn't sell
- [x] Design critique - layout, hierarchy, CTA placement issues
- [x] Technical action plan - prioritized cleanup and conversion improvements

#### Navigation Cleanup (`src/components/ui/navigation.tsx`)
- [x] Removed NotificationsMenu, AuthDialog, CommandPalette imports and JSX
- [x] Removed AI Tools and Whiteboard nav links
- [x] Simplified to 5 core links: Home, Projects, Blog, About, Contact + ThemeToggle + Language

#### Hero Conversion Redesign (`src/components/hero/hero-section.tsx`)
- [x] Improved overlay: gradient `from-background/70 via-background/60 to-background/90` (dark variants too) + z-[1]
- [x] Added `drop-shadow-sm` to content for better readability
- [x] Primary CTA: "Let's Talk" → /contact (was "View Projects" → /projects)
- [x] Secondary CTA: "View My Work" → /projects (was GitHub external link)
- [x] Removed Github import from lucide-react

#### Hero Copy Updates (`messages/en.json` + `messages/he.json`)
- [x] Badge: "Available for Projects" / "זמין לפרויקטים"
- [x] Title: "Full-Stack Developer | AI-Powered Web Apps" / "מפתח Full-Stack | יישומי ווב מונעי AI"
- [x] Description: rewritten for conversion focus
- [x] Added `contactCta` key: "Let's Talk" / "בואו נדבר"

#### Contact Fixes (`src/app/contact/page.tsx`)
- [x] Email corrected: `elad@hiteclearning.co.il` → `eladhiteclearning@gmail.com` (all occurrences)
- [x] Added WhatsApp contact card (052-542-7474, links to wa.me/972525427474)
- [x] Added MessageCircle import from lucide-react

#### WhatsApp FAB (NEW: `src/components/ui/whatsapp-fab.tsx`)
- [x] Floating green WhatsApp button (fixed bottom-right, z-50)
- [x] Links to wa.me/972525427474 with pre-filled Hebrew message
- [x] Framer Motion entrance animation (scale from 0, 2s delay)
- [x] Integrated into `src/components/providers/client-layout.tsx` (site-wide)

#### Homepage Cleanup (`src/app/page.tsx`)
- [x] Removed broken Supabase blog query (always returned empty - MDX posts aren't in Supabase)
- [x] Removed unused imports (ArrowRight, Link, BlogCard, ScrollAnimate, useTranslations, useState, useEffect, supabase, BlogPost)
- [x] TestimonialsSection KEPT (user explicitly requested this)
- [x] Clean flow: Hero → TechMarquee → StatsBar → Skills → FeaturedProjects → Testimonials → Process → CTA

#### Footer Cleanup (`src/components/ui/footer.tsx`)
- [x] Removed Whiteboard from footerToolLinks
- [x] Updated email to `eladhiteclearning@gmail.com`

#### Build Verification
- [x] TypeScript check passes (`npx tsc --noEmit`)
- [x] Next.js build passes (22 routes generated)

### Session 2026-02-21 - CSS Scroll-Driven Animations

#### Native CSS Scroll Animations
- [x] Added CSS `@scroll-timeline` and `animation-timeline` animations in `globals.css`
- [x] Five animation types: fade-in, scale-in, slide-in-left, slide-in-right, reveal-bar
- [x] Progressive enhancement with `@supports` (graceful fallback for unsupported browsers)
- [x] Applied scroll-fade to SkillsSection categories, TechMarquee
- [x] Applied scroll-scale to FeaturedProjectsSection cards, SkillsSection stats
- [x] Applied alternating slide-left/slide-right to ProcessSection steps
- [x] Applied scroll-reveal-bar to About page timeline lines
- [x] Replaced Framer Motion animations with CSS for better performance
- [x] TypeScript check passes cleanly
- [x] Build passes successfully (22 routes generated)
- [x] Committed: `c71ba2b` - feat: add CSS scroll-driven animations

#### Benefits
- Native CSS performance (no JavaScript overhead)
- Smooth viewport-triggered reveals
- Modern visual polish with staggered effects
- Progressive enhancement ensures compatibility

### Session 2026-02-18 (Continuation) - ReactBits Components & Visual Polish

#### ReactBits-Inspired Components
- [x] `src/components/ui/split-text.tsx` - Character-by-character spring animation (framer-motion useInView, configurable delay/stagger)
- [x] `src/components/ui/tilted-card.tsx` - 3D perspective tilt on hover with glare overlay (pure CSS transforms, perspective(1000px))
- [x] Integrated SplitText into hero greeting + name for character-by-character reveal
- [x] Wrapped featured project cards with TiltedCard for 3D hover effect

#### Section Enhancements
- [x] Skills: Bento grid layout with varying card spans (lg:col-span-2, lg:row-span-2), gradient accents, decorative corner circles, rounded-2xl design
- [x] Testimonials: gradient accent line at card top, colored gradient avatars, amber star ratings, pipe separator for role|company, glassmorphic card
- [x] Process: New "How I Work" 4-step section (Discover, Plan & Design, Build & Iterate, Launch & Support) with gradient icon badges, step numbers, connecting line
- [x] Stats bar: gradient background band (from-primary/5 via-accent/5 to-primary/5), gradient text for counter values
- [x] About page: gradient hero background with decorative orbs, avatar with gradient ring + verified badge, gradient "Present" timeline node

#### New Components
- [x] `src/components/sections/process-section.tsx` - "How I Work" 4-step workflow section
- [x] `src/components/ui/tech-marquee.tsx` - Infinite scrolling tech banner (16 technologies, CSS keyframe animation, hover-to-pause)

#### CSS & Animations
- [x] Marquee animation keyframes in globals.css (30s linear infinite)
- [x] Hover-to-pause on marquee

#### Translations
- [x] Process section (EN+HE): title, subtitle, 4 steps with title+description

### Session 2026-02-18 (Latest) - Major UX Overhaul via Multi-Agent Analysis

#### New Components
- [x] `src/components/sections/stats-bar.tsx` - Animated counter stats bar (50+ repos, 1000+ commits, 12 projects, 5 blog posts, 3+ years) with IntersectionObserver trigger
- [x] `src/components/ui/command-palette.tsx` - Full command palette (Cmd+K/Ctrl+K) with fuzzy search, page navigation, theme toggle, language switch, GitHub link
- [x] `src/components/ui/spotlight.tsx` - Subtle spotlight glow following mouse cursor (pointer devices only, hidden on touch)

#### UX Fixes (Agent-Driven Analysis)
- [x] Hero gradient: slowed from 4s to 6s, reduced bg-size 200% to 150%, added drop-shadow
- [x] Hero typography: smoother responsive scale (3xl -> 4xl -> 5xl -> 6xl -> 7xl)
- [x] Nav links: increased contrast from 80% to 90% opacity + focus-visible ring
- [x] Navigation: glassmorphic backdrop-blur-xl with border on scroll
- [x] Testimonials: auto-advance 6s -> 9s, pause-on-hover, aria-live polite, 0.4s transition
- [x] Project cards: glassmorphic bg, hover elevation (-translate-y-1.5), primary-tinted shadow
- [x] Skills cards: glassmorphic bg, responsive gap, stronger hover (1.08 scale)
- [x] CTA: optimized blur effect (blur-2xl, smaller radius, pointer-events-none)
- [x] Scroll indicator: increased visibility (70% opacity, semibold text, primary color dot)
- [x] Theme-color meta: fixed from blue (#3b82f6) to purple (#8b5cf6)
- [x] Theme toggle: View Transitions API circular reveal + spring icon animations

#### CSS Improvements
- [x] Animation timing tokens (--animation-fast: 150ms, --animation-base: 250ms, --animation-slow: 400ms)
- [x] View Transition pseudo-element styles for theme switch
- [x] scroll-padding-top for fixed nav offset

#### Build Fixes
- [x] Whiteboard page: replaced broken tldraw imports with placeholder page
- [x] Clean node_modules reinstall to fix missing radix-ui/octokit sub-dependencies

#### Blog Enhancements (Previous session, committed this session)
- [x] Section navigation in navbar with active section highlighting (IntersectionObserver)
- [x] Reading progress bar on blog posts
- [x] Related posts section (tag-based matching, i18n)
- [x] Blog post nav links extracted as i18n client components

#### Translations
- [x] stats section (HE+EN): repos, commits, projects, blogPosts, yearsExp
- [x] nav section labels: skills, featuredProjects, testimonials
- [x] blogPage: relatedPosts



### Session 2026-02-18 (Late Night) - Agent Army: 5 Features in Parallel

#### Blog Content (3 New Posts)
- [x] `content/blog/building-with-nextjs-16.mdx` - App Router, RSC, Server Actions, Zod (5 code blocks)
- [x] `content/blog/supabase-for-fullstack-developers.mdx` - Auth, DB, Realtime, RLS, Storage (6 code blocks)
- [x] `content/blog/framer-motion-animations-guide.mdx` - Variants, scroll, gestures, AnimatePresence (5 code blocks)

#### AI Tools Page Enhancement
- [x] Rewrote `src/app/ai-tools/page.tsx` with 4 sections: Hero, 6 Tool Cards (Claude, OpenAI, LangChain, Supabase AI, Vercel AI SDK, Hugging Face), "How I Use AI" highlights, Interactive Demo (tabbed: Code Review, Smart Search, Content Generation)
- [x] Updated `messages/en.json` and `messages/he.json` with full aiToolsPage translations

#### Contact Form Email Backend
- [x] Updated `src/app/api/contact/route.ts` - Resend SDK, Zod validation, in-memory rate limiting (5 req/IP/15min), HTML escaping, professional email template
- [x] Mailto fallback when RESEND_API_KEY not set

#### Unit Tests (Vitest)
- [x] Created `vitest.config.ts` with React plugin, jsdom, path aliases
- [x] 26 tests across 4 files: scroll-animate (5), social-link (7), mdx (9), i18n (5)
- [x] All tests passing

#### Performance Optimizations
- [x] `next.config.js` - AVIF/WebP images, reactStrictMode, console removal in production
- [x] `src/app/layout.tsx` - Font display: 'swap' + preload for Heebo and Assistant
- [x] `src/components/hero/hero-section.tsx` - next/dynamic with ssr: false for 3D scene (~500KB saved)
- [x] `tsconfig.json` - Excluded test files from tsc (vitest handles own types)

#### Recovery Note
- Test agent accidentally damaged local repo via pnpm symlink issue
- Recovered by fresh clone from GitHub + manual restoration of surviving files
- All work verified and committed as single commit: 782032c

### Session 2026-02-18 (Night) - i18n Completion, Flag Icons, Page Transitions

#### AI Tools Page i18n
- [x] Added `aiToolsPage` translations to `messages/en.json` (title, subtitle, 4 card titles + descriptions)
- [x] Added `aiToolsPage` translations to `messages/he.json` (full Hebrew translations for all AI tools cards)
- [x] Updated `src/app/ai-tools/page.tsx` - Now uses `useTranslations('aiToolsPage')` for all text, ScrollAnimate on section header and cards

#### Language Toggle with Flag Icons
- [x] Replaced Globe icon with inline SVG flag icons in navigation (Israel flag for Hebrew, UK flag for English)
- [x] Both desktop dropdown and mobile menu show flag icons next to language names
- [x] Flags render as inline SVGs (no external dependencies, zero network requests)
- [x] Removed unused `Globe` import from lucide-react

#### Smooth Page Transitions
- [x] Created `src/components/ui/page-transition.tsx` - AnimatePresence + motion.div wrapper using `usePathname` as key
- [x] Created `src/components/providers/client-layout.tsx` - Client-side layout wrapper consolidating all providers (LocaleProvider, ThemeProvider, AuthProvider, Navigation, Footer, PageTransition)
- [x] Updated `src/app/layout.tsx` - Replaced inline provider tree with clean `ClientLayout` component
- [x] Page transitions use 200ms fade + 8px vertical slide (easeInOut)

### Session 2026-02-18 (Evening) - Projects Page Rewrite & Dead Code Cleanup

#### Dead Code Removal
- [x] Deleted `src/lib/translation.ts` - Old react-i18next setup, completely unused
- [x] Removed unused `sidebar` color config from `tailwind.config.ts` (CSS vars never defined, classes never used)
- [x] Removed placeholder `google-site-verification` from layout.tsx metadata

#### Projects Page Rewrite (`src/app/projects/page.tsx`)
- [x] Rewrote projects page from Supabase-dependent to static data (works without DB!)
- [x] Added 12 real projects: HaDerech, Portfolio, EY.AI Kids, Ninja Keyboard, Voice Chat, Omanut, Bayit BeSeder, ZehutAI, EduTech, Kidushishi, WhatsApp Automation, Hebrew Calendar
- [x] Added category filter buttons: All (12), Web Apps (5), AI & ML (3), Tools & Utils (4)
- [x] Full i18n support (Hebrew + English) with new `projectsPage` translations
- [x] Animated card grid with staggered entrance (framer-motion)
- [x] Same card design as featured-projects section (gradient headers, tech badges, GitHub/Live links)
- [x] RTL-compatible layout (uses `start`/`end` instead of `left`/`right`)
- [x] Accessible: focus-visible rings, aria-labels on links

#### Translation Additions
- [x] Added `projectsPage` section to `messages/en.json` with all 12 project titles + descriptions
- [x] Added `projectsPage` section to `messages/he.json` with all 12 project titles + descriptions in Hebrew

### Session 2026-02-18 - MDX Blog Infrastructure, SEO & Performance

#### Blog Infrastructure (MDX)
- [x] Installed `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `gray-matter`, `reading-time`, `next-mdx-remote`, `@types/mdx`, `@tailwindcss/typography`
- [x] Created `src/lib/mdx.ts` - MDX utility: getAllMDXPosts, getMDXPostBySlug, getAllMDXTags, getAllMDXSlugs with gray-matter frontmatter parsing and reading-time calculation
- [x] Created `content/blog/my-journey-to-fullstack.mdx` - Sample post about career journey (arts to full-stack), with code blocks, lists, blockquotes, links
- [x] Created `content/blog/ai-in-web-development.mdx` - Sample post about AI in web dev, with TypeScript code examples and practical tips
- [x] Both posts have bilingual frontmatter (title/titleHe, description/descriptionHe) with tags, date, featured_image, author
- [x] Created `src/components/blog/mdx-renderer.tsx` - Client-side Markdown-to-HTML renderer supporting headings, paragraphs, code blocks, inline code, bold/italic, links, lists, blockquotes, images, horizontal rules
- [x] Created `src/app/api/blog/posts/route.ts` - API route serving MDX post metadata (without raw content)
- [x] Rewrote `src/app/blog/page.tsx` - New blog listing page with card grid, featured images, tag filters, i18n support (Hebrew/English title/description), reading time, date formatting by locale
- [x] Rewrote `src/app/blog/[slug]/page.tsx` - Individual post page with MDX rendering, structured data (JSON-LD article), canonical URLs, back navigation, generateStaticParams for SSG
- [x] Added `blogPage` translations to `messages/en.json` and `messages/he.json` (title, subtitle, allPosts, noPosts, minRead, etc.)
- [x] Added `@tailwindcss/typography` plugin to `tailwind.config.ts` for prose styling

#### Performance & SEO
- [x] Updated `src/app/layout.tsx` - Added `metadataBase` for canonical URL resolution, added `alternates.canonical`, improved title template with `title.default` and `title.template`
- [x] Added Person JSON-LD structured data in layout head (alongside existing WebSite structured data)
- [x] Fixed `src/components/seo/structured-data.tsx` - Support multiple StructuredData instances with unique IDs (was using static "structured-data" id)
- [x] Blog post pages have full OpenGraph/Twitter meta with canonical URLs, article structured data
- [x] Updated `src/app/sitemap.ts` - Now includes MDX blog posts alongside Supabase posts, with fallback when DB unavailable
- [x] All images verified to have alt text
- [x] Below-fold images use `loading="lazy"` (blog cards, MDX images, comments, chat)
- [x] `next/font` already configured: GeistSans, Heebo, Assistant (no changes needed)

#### Final Polish
- [x] 404 page already has nice design with translations (FileQuestion icon, quick links grid, contact help section)
- [x] Dark mode works with new blog pages (prose-invert for article content, card/badge components use design tokens)
- [x] Responsive layout: blog grid 1col mobile -> 2col tablet -> 3col desktop
- [x] Cleaned up unused imports (ArrowRight, Tag, MDXPost type)

### Session 2026-02-17 - i18n, Scroll Animations, Contact Form, Responsiveness

#### i18n (Hebrew + English) with next-intl
- [x] Created `messages/he.json` - Full Hebrew translations for all sections (nav, hero, skills, projects, testimonials, CTA, footer, about, contact, error, 404)
- [x] Created `messages/en.json` - Full English translations matching all Hebrew keys
- [x] Created `src/i18n.ts` - Locale config (types, default locale, direction helper)
- [x] Created `src/components/providers/locale-provider.tsx` - Client-side NextIntlClientProvider with localStorage persistence and dynamic lang/dir switching
- [x] Updated `src/app/layout.tsx` - Wrapped app with LocaleProvider
- [x] Updated `src/components/ui/navigation.tsx` - Replaced react-i18next with next-intl, language switcher uses locale context, mobile menu slides from correct side based on RTL/LTR
- [x] Updated `src/components/hero/hero-section.tsx` - All text from translations
- [x] Updated `src/components/sections/skills-section.tsx` - Category titles and stats from translations
- [x] Updated `src/components/sections/featured-projects-section.tsx` - Project titles/descriptions from translations
- [x] Updated `src/components/sections/testimonials-section.tsx` - All testimonial content from translations
- [x] Updated `src/components/sections/cta-section.tsx` - Feature titles/descriptions from translations
- [x] Updated `src/components/ui/footer.tsx` - Navigation labels, section titles from translations
- [x] Updated `src/app/page.tsx` - Blog section text from translations
- [x] Updated `src/app/about/page.tsx` - All about content from translations (highlights, timeline, experience, traits, looking for)
- [x] Updated `src/app/contact/page.tsx` - All form labels, placeholders, validation messages, info cards from translations
- [x] Updated `src/app/not-found.tsx` - All 404 text from translations (added 'use client')
- [x] Updated `src/app/error.tsx` - All error text from translations

#### Scroll Animations with framer-motion
- [x] Created `src/components/ui/scroll-animate.tsx` - Reusable fade-in-up animation wrapper (200ms duration, easeOut, useInView with once:true)
- [x] Applied ScrollAnimate to all section headers and content blocks across: home page, skills, featured projects, testimonials, CTA, footer, about, contact
- [x] All animations are subtle (200ms, ease-out, 20px y-offset)

#### Contact Form Wired Up
- [x] Created `src/app/api/contact/route.ts` - POST endpoint with Zod validation, Resend API integration, mailto fallback when RESEND_API_KEY is not set
- [x] Updated `src/app/contact/page.tsx` - Form now calls `/api/contact` API, handles Resend success, mailto fallback, and error states. Zod validation with translated error messages. Success/error toasts.

#### Responsiveness
- [x] Mobile menu slides from correct side based on locale direction (RTL: left, LTR: right)
- [x] Used logical CSS properties (`ms-2`, `me-2`, `text-start`, `end-0`) instead of `ml`/`mr`/`text-left`/`right-0` for RTL/LTR compatibility
- [x] Grid layouts use responsive breakpoints: 1col (mobile) -> 2col (tablet) -> 3-4col (desktop)
- [x] All containers use `px-4 md:px-6` for mobile padding
- [x] Contact form maxes out at `max-w-2xl` for proper reading width on all screens

### Session 2026-02-15 - Major UI Overhaul & New Sections
- [x] **Footer Component** (`src/components/ui/footer.tsx`) - Full footer with navigation, social links, tech stack badges, brand section, and back-to-top button
- [x] **Featured Projects Section** (`src/components/sections/featured-projects-section.tsx`) - Static showcase of 6 real projects (HaDerech, Portfolio, EY.AI Kids, Omanut, EduTech, Hebrew Calendar) with gradient headers, tech badges, and GitHub/Live Demo links. Always visible even without Supabase data
- [x] **Testimonials Section** (`src/components/sections/testimonials-section.tsx`) - Auto-advancing carousel with slide animations, star ratings, avatar initials, dot navigation, and previous/next controls
- [x] **CTA Section** (`src/components/sections/cta-section.tsx`) - "Let's Build Something Amazing" call-to-action with feature cards (Clean Code, AI Integration, Fast Delivery) and decorative gradient background
- [x] **Hero Section Redesign** (`src/components/hero/hero-section.tsx`) - Full viewport height, "Open to Opportunities" animated badge with pulse indicator, gradient text animation on name, dual CTA buttons (View Projects + GitHub), scroll indicator mouse animation, decorative gradient orbs
- [x] **About Page Redesign** (`src/app/about/page.tsx`) - Added visual timeline for career journey (Arts -> Business -> Education -> Present), improved highlights with icon cards, "What Makes Me Unique" grid, styled "What I'm Looking For" callout box
- [x] **Navigation Branding** (`src/components/ui/navigation.tsx`) - Changed logo from "Portfolio" to "EY.dev" with gradient text
- [x] **CSS Enhancements** (`src/styles/globals.css`) - Added gradient animation keyframes, smooth scrolling, custom selection colors, custom scrollbar styling
- [x] **Tailwind Config** (`tailwind.config.ts`) - Added gradient animation keyframes and animation utility class
- [x] **Main Page Restructured** (`src/app/page.tsx`) - Replaced generic "Real-Time Collaboration" and "Let's Connect" sections with proper FeaturedProjectsSection, TestimonialsSection, and CTASection. Cleaned up unused imports. Blog posts section still shows when Supabase data exists
- [x] **Layout Updated** (`src/app/layout.tsx`) - Added Footer component to global layout
- [x] TypeScript check passes cleanly (`npx tsc --noEmit`)

### Session 2026-02-13 - Code Review & Fixes (Committed & Pushed)
- **Commit**: `3ce17ac` on `main` branch
- **Remote**: Pushed to `origin/main` (https://github.com/eladjak/fullstack-eladjak-Website)
- [x] Full codebase review (all pages, components, services, API routes)
- [x] TypeScript check passes cleanly (`npx tsc --noEmit`)
- [x] Fixed unused imports in `src/app/projects/page.tsx` (removed `useScroll`, `useTransform`, `ArrowRight`)
- [x] Fixed unused variables in `src/app/page.tsx` (removed `heroRef`, `heroInView` and `useInView` import)
- [x] Fixed unused import in `src/components/code/code-optimizer.tsx` (removed unused `reviewCode` import)
- [x] Fixed unused variable in `src/components/ui/navigation.tsx` (removed unused `i18n` destructure)
- [x] Fixed Next.js 16 async params in `src/app/blog/[slug]/page.tsx` (params must be awaited in Next.js 15+)
- [x] Fixed `src/lib/supabase.ts` - changed `throw new Error` to `console.warn` for missing env vars (prevents build crashes)
- [x] Fixed `src/components/ui/notifications.tsx` - replaced hardcoded colors with design tokens for dark mode support
- [x] Added `ui-avatars.com` to `next.config.js` remotePatterns (was missing, would cause Next.js Image errors)

## Architecture Overview
- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS with CSS custom properties (Material Design 3 color system) + @tailwindcss/typography
- **i18n**: next-intl with client-side provider, Hebrew (default) + English
- **Blog**: MDX files in `content/blog/` with gray-matter frontmatter + reading-time, SSG via generateStaticParams
- **Database**: Supabase (auth, realtime, storage)
- **Email**: Resend API (with mailto fallback)
- **AI Features**: OpenAI (code review, blog generation), Perspective API (content moderation)
- **3D**: Removed (was Three.js, saved ~1MB bundle)
- **Animations**: Framer Motion (scroll-triggered fade-in-up on all sections, smooth page transitions between routes)
- **State**: React hooks + Zustand
- **Fonts**: GeistSans + Heebo + Assistant (Hebrew support) via next/font
- **Theme**: Dark/Light mode via next-themes
- **Validation**: Zod (contact form)
- **SEO**: JSON-LD structured data (Person, WebSite, BlogPosting), canonical URLs, metadataBase, OpenGraph/Twitter meta

## Pages
- `/` - Home (Hero CSS gradient + conversion CTAs, TechMarquee, Skills, Featured Projects, Process, CTA)
- `/about` - About page with bio, career timeline, skills highlights, unique traits, experience details
- `/projects` - 12 projects with category filters (Web Apps, AI & ML, Tools & Utils)
- `/blog` - Blog listing with card grid, featured images, tag filters, i18n (Hebrew/English)
- `/blog/[slug]` - MDX blog post with rendered markdown, structured data, reading time (SSG)
- `/contact` - Contact form (Resend + mailto fallback), email, phone, WhatsApp, location cards
- `/thanks` - Gratitude page honoring 8 Israeli tech/AI mentors (bilingual)

## New Files (Session 2026-02-18)
- `content/blog/my-journey-to-fullstack.mdx` - Blog post: career journey
- `content/blog/ai-in-web-development.mdx` - Blog post: AI in web dev
- `src/lib/mdx.ts` - MDX utility functions (read, parse, sort)
- `src/components/blog/mdx-renderer.tsx` - Markdown-to-HTML client renderer
- `src/app/api/blog/posts/route.ts` - API route for MDX post metadata

## New Files (Session 2026-02-17)
- `messages/he.json` - Hebrew translations
- `messages/en.json` - English translations
- `src/i18n.ts` - Locale configuration
- `src/components/providers/locale-provider.tsx` - Client-side i18n provider
- `src/components/ui/scroll-animate.tsx` - Reusable scroll animation wrapper
- `src/app/api/contact/route.ts` - Contact form API endpoint

## Known Issues / TODOs
- [x] ~~Contact form `handleSubmit` simulates API call~~ - Now connected to Resend API with mailto fallback
- [x] ~~`i18n` / translation system imported in navigation but labels are hardcoded English~~ - Full i18n with next-intl
- [x] ~~Google verification code is placeholder in layout.tsx metadata~~ - Removed placeholder
- [x] ~~Sidebar CSS variables referenced in tailwind.config.ts but not defined in globals.css~~ - Removed unused sidebar config
- [x] ~~`src/lib/translation.ts` - Old react-i18next setup, now unused~~ - Deleted
- [x] ~~Projects page depended on Supabase (empty without DB)~~ - Rewritten with 12 static projects
- [ ] Blog meta tag generation calls `supabase.functions.invoke('generate-meta-tags')` which may not exist
- [ ] `code-optimizer.tsx` uses dummy data instead of actual AI review (API key dependent)
- [ ] Several `console.error` calls in catch blocks (acceptable for development)
- [ ] Consider adding real testimonials when available
- [ ] Deploy to Vercel / GitHub Pages

## Files Modified (Session 2026-02-17)
- `src/app/layout.tsx` - Added LocaleProvider wrapper
- `src/app/page.tsx` - Added i18n translations for blog section, ScrollAnimate wrappers
- `src/app/about/page.tsx` - Full i18n + ScrollAnimate on all sections
- `src/app/contact/page.tsx` - Full i18n + real API submission + ScrollAnimate
- `src/app/not-found.tsx` - i18n translations (added 'use client')
- `src/app/error.tsx` - i18n translations
- `src/components/hero/hero-section.tsx` - i18n translations
- `src/components/ui/navigation.tsx` - next-intl + locale context + RTL-aware mobile menu
- `src/components/ui/footer.tsx` - i18n translations + ScrollAnimate
- `src/components/sections/skills-section.tsx` - i18n translations + ScrollAnimate
- `src/components/sections/featured-projects-section.tsx` - i18n translations + ScrollAnimate
- `src/components/sections/testimonials-section.tsx` - i18n translations + ScrollAnimate
- `src/components/sections/cta-section.tsx` - i18n translations + ScrollAnimate

## Files Modified (Session 2026-02-18)
- `src/app/blog/page.tsx` - Rewrote: MDX-based blog listing with card grid, tag filters, i18n
- `src/app/blog/[slug]/page.tsx` - Rewrote: MDX post page with SSG, structured data, canonical URLs
- `src/app/layout.tsx` - Added metadataBase, canonical URLs, Person JSON-LD, title template
- `src/app/sitemap.ts` - Added MDX posts to sitemap
- `src/components/seo/structured-data.tsx` - Fixed unique ID support for multiple instances
- `tailwind.config.ts` - Added @tailwindcss/typography plugin
- `messages/en.json` - Added blogPage translations
- `messages/he.json` - Added blogPage translations
- `package.json` - Added MDX, gray-matter, reading-time, typography dependencies

## New Files (Session 2026-02-18 Night)
- `src/components/ui/page-transition.tsx` - Smooth page transition wrapper (framer-motion AnimatePresence)
- `src/components/providers/client-layout.tsx` - Client-side layout wrapper consolidating all providers + page transitions

## Files Modified (Session 2026-02-18 Night)
- `src/app/layout.tsx` - Simplified to use ClientLayout (server component stays clean)
- `src/app/ai-tools/page.tsx` - Full i18n with useTranslations + ScrollAnimate on cards
- `src/components/ui/navigation.tsx` - Flag icons (Israel/UK) replacing Globe icon for language toggle
- `messages/en.json` - Added aiToolsPage translations
- `messages/he.json` - Added aiToolsPage translations

## Next Steps (Improvement Plan - from Agent Analysis 2026-02-22)

### Priority 1 - Visual Facelift & Design
- [ ] Major visual facelift with Gemini Images API + Stitch MCP design
- [ ] Professional headshot / real photography (replace avatar placeholders)
- [x] ~~Skills section redesign~~ - COMPLETED (Session 2026-02-22 night) - Capabilities Framework with business outcomes
- [x] ~~Project descriptions rewrite~~ - COMPLETED (Session 2026-02-22 night) - All 12 projects focus on business value

### Priority 2 - Conversion & Lead Generation
- [ ] Scheduling integration (Calendly/Cal.com) - add "Book a Call" CTA
- [ ] CV/resume download button
- [ ] Micro-copy improvements throughout (trust signals, social proof)
- [ ] Contact form micro-copy enhancements

### Priority 3 - Content & Pages
- [x] ~~Separate "Thank You" page~~ - COMPLETED (Session 2026-02-24)
- [x] ~~AI Tools page~~ - DELETED (was fake content)
- [ ] Blog strategy - content management, social media integration, homepage visibility
- [ ] Real client testimonials when available

### Priority 4 - Technical & Infrastructure
- [x] ~~Domain setup~~ - COMPLETED (fullstack-eladjak.co.il live on Vercel)
- [x] ~~Deploy to production~~ - COMPLETED
- [ ] Lighthouse performance audit (Core Web Vitals, bundle size)
- [ ] E2E tests with Playwright for critical flows

### Completed
- [x] ~~CSS scroll-driven animations~~ - COMPLETED (Session 2026-02-21)
- [x] ~~Blog post images/thumbnails~~ - ALREADY DONE
- [x] ~~Navigation cleanup~~ - COMPLETED (Session 2026-02-22)
- [x] ~~Hero conversion redesign~~ - COMPLETED (Session 2026-02-22)
- [x] ~~Contact email fix + WhatsApp~~ - COMPLETED (Session 2026-02-22)
- [x] ~~WhatsApp FAB site-wide~~ - COMPLETED (Session 2026-02-22)
- [x] ~~Homepage broken blog query removed~~ - COMPLETED (Session 2026-02-22)
- [x] ~~Skills capabilities framework~~ - COMPLETED (Session 2026-02-22 night)
- [x] ~~Project descriptions business rewrite~~ - COMPLETED (Session 2026-02-22 night)

## Notes for Next Session
- **Domain**: Site should be at `fullstack-eladjak.co.il` (purchased domain, currently on Vercel)
- **Testimonials vs Thanks**: User wants SEPARATE concepts - "עדויות לקוח" (client testimonials) stays on homepage, "דף תודות" (thank you/acknowledgments page) is a new separate page for people like Kfir Guy from John Bryce
- **No real client testimonials yet** - keep current placeholder section, update when real ones available
- **AI Tools**: User wants combination approach - real working tools with actual value, not just demo cards
- All TypeScript errors resolved, build passes cleanly
- ALL pages have full i18n (home, about, contact, projects, blog, AI tools, error, 404)
- Contact form: Resend API when key set, mailto fallback otherwise
- WhatsApp: 052-542-7474 (international: 972525427474)
- Email: eladhiteclearning@gmail.com
- The `ENVIRONMENT_FALLBACK` warning during build is from next-intl SSG (pre-existing)

### 11.6.2026 — מעבר שיפורים רוחבי (Fable-5 sweep)
- דווח בלבד (package.json מלוכלך): tsc — 8 שגיאות three/Bundler = ארטיפקט Windows מתועד (עובר ב-Vercel) · audit: next HIGH + fast-uri/js-cookie/react-use HIGH (fix לא-major זמין) — לבצע next 16.2.9 + audit fix אחרי קומיט העבודה הפתוחה · סקריפט lint משתמש ב-eslint flat בלי תמיכת --no-warn-ignored.
