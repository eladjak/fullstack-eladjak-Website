# Portfolio Website - Active Context

## Last Updated: 2026-03-26

## Status: ChatFAQ component added to services page

## ChatFAQ Component (2026-03-26)
- Created `src/components/ui/chat-faq.tsx` — interactive chat-style FAQ
- 10 Q&A pairs added to `messages/en.json` and `messages/he.json` under `faq` key
- Added to `src/app/services/page.tsx` between Services Grid and Contact CTA
- Features: typing indicator (3 bouncing dots), Framer Motion message animations, follow-up chips, RTL support, `useReducedMotion`, screen reader live region, auto-scroll
- Design: glassmorphism card, violet/cyan gradient user bubbles, white/10 assistant bubbles
- Fixed stale-closure bug: `newAnsweredKeys` computed synchronously before setTimeout

## Previous: Live Project Preview feature added — projects page enhanced

## Session: 2026-03-26 — Live Project Preview + Tech Stack Filter

### Added
- `src/components/ui/project-preview-modal.tsx` — modal with iframe preview, device selector (desktop/tablet/mobile), URL bar, open-in-tab, Escape/click-outside to close, loading spinner, X-Frame-Options graceful fallback
- `src/app/projects/page.tsx` — tech stack filter bar (multi-select pills, frequency-sorted, AnimatePresence layout animation), "Live Preview" hover overlay on card image, "Live Preview" link in card footer, clickable tech tags filter to active pill
- `messages/en.json` + `messages/he.json` — added `livePreview`, `techFilter.*`, `preview.*` keys under `projectsPage`

### Design
- Filter pills: `bg-white/5 border-white/10` default, `border-purple-500/60 bg-purple-500/15 shadow-[0_0_8px_rgba(168,85,247,0.25)]` active
- Modal: `fixed inset-4 md:inset-8 bg-[#050810]/90 backdrop-blur-xl` — matches site tokens
- Device width transitions via inline CSSProperties (dynamic px values)
- Animations: 150-180ms max, transform+opacity only



## Per-Page SEO Metadata (2026-03-25)
- Created route-segment `layout.tsx` (server components) for all client-side pages
- Files: projects/layout.tsx, services/layout.tsx, contact/layout.tsx, about/layout.tsx, thanks/layout.tsx, claude-code/layout.tsx, blog/layout.tsx
- Each exports `metadata` with: title, description, keywords, canonical URL, openGraph, twitter cards
- Pattern: layout wraps client page transparently (`return children`)
- Build: clean (22 routes, TypeScript passes with zero errors)

## Changes Made:
1. **Hero Section** - Wired ProfileAvatar (GitHub avatar + rotating gradient border + status indicator) + FloatingTechIcons. Converted layout to flex row with avatar on right. Updated min-h to dvh.
2. **Hero i18n** - Updated heading/title/description to emphasize server-side focus, 26+ apps, AI tooling (he.json + en.json)
3. **StatsBar** - Updated stats to: 26+ apps, 50+ repos, 1000+ commits, 3 AI agents, 4+ years. Wired into homepage after HeroSection.
4. **h-screen -> h-dvh** - Fixed in: hero-section, layout.tsx, page.tsx, about/page.tsx, contact/page.tsx, error.tsx, not-found.tsx, services/page.tsx, thanks/page.tsx
5. **OG image** - Fixed layout.tsx to use GitHub avatar URL instead of missing og-image.png
6. **apple-touch-icon** - Fixed to use GitHub avatar URL
7. **Command Palette i18n** - "Search pages, actions..." -> "חיפוש דפים ופעולות...", "No results found." -> "לא נמצאו תוצאות"
8. **Blog date locale** - blog/[slug]/page.tsx now uses `toLocaleDateString('he-IL', {...})` instead of date-fns format
9. **About page** - Timeline updated with accurate dates from resume (2006-2008 army, 2011-2023 Omanut HaKesher, 2022 John Bryce, 2022-present dev)
10. **About subtitle** - Updated to server-side focus messaging
11. **Skills section stats** - Changed from 3+ years/20+ projects to 4+ years/26+ projects
12. **Claude Code page** - Migrated from eladjak-hub to /claude-code. Restyled with portfolio design tokens (primary/accent/card/border/muted). Added to footer nav.
13. **Hero background image** - Wired /images/hero-dev.jpg as subtle bg (opacity-15) behind gradient+overlay. z-index stack: image=0, gradient=z[1], overlay=z[2], content=z-10.
14. **Hub OG metadata** - Added openGraph.images, twitter card to eladjak-hub layout.tsx. Removed /claude-code route from hub (page deleted + subdomains updated to external link).

## Build Status: CLEAN (TypeScript + Next.js build pass - both projects 2026-03-22)

## E2E Tests Setup (2026-03-25)
- Installed @playwright/test v1.58.2 (Chromium browser already in npm cache)
- Created playwright.config.ts targeting live site https://fullstack-eladjak.co.il
- Created e2e/ directory with 5 test files: navigation.spec.ts, homepage.spec.ts, projects.spec.ts, blog.spec.ts, contact.spec.ts
- 60 tests total, ALL PASSING (60/60)
- Run command: `node node_modules/@playwright/test/cli.js test` (global `playwright` conflicts with local @playwright/test)
- IMPORTANT: Use `node node_modules/@playwright/test/cli.js test` not `npx playwright test`

## Mobile Responsiveness Fixes (2026-03-24)
1. **hero-section.tsx** - flex layout centers on mobile (`text-center md:text-start`, `items-center md:items-start`), h1 `text-2xl` on mobile, CTA buttons use `flex-wrap` + `justify-center md:justify-start`, avatar wrapped in `scale-75 sm:scale-90 md:scale-100`
2. **projects/page.tsx** - h1 starts at `text-2xl` on mobile (was `text-4xl`)
3. **stats-bar.tsx** - changed `grid-cols-2 md:grid-cols-5` (orphan 5th item) to `grid-cols-3 sm:grid-cols-5`, stat numbers `text-xl sm:text-2xl md:text-3xl`
4. **navigation.tsx** - already well-handled with mobile drawer, no changes needed
5. **tech-marquee.tsx** - already responsive, no changes needed
6. **footer.tsx** - already collapses to single column by default, no changes needed
