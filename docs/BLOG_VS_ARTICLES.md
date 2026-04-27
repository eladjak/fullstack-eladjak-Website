# Blog vs. Articles — Split Recommendation

**Date:** 2026-04-27
**Status:** RECOMMEND DEFER (re-evaluate after writing 3+ short notes)

---

## TL;DR

Don't split `/blog` into `/blog` + `/articles` yet. Every existing post is already a long-form essay; a split today would leave `/blog` empty and confuse visitors. The right trigger is **content diversification, not content volume**: split when you have ≥3 short notes (<800 words) that would feel out of place next to your essays.

---

## Current state (as of 2026-04-27)

Audit of `content/blog/*.mdx` — body words excluding frontmatter:

| Post | Words | Class |
|------|-------|-------|
| `claude-code-productivity-tips.mdx` | 2976 | long-form essay |
| `supabase-for-fullstack-developers.mdx` | 2912 | long-form essay |
| `framer-motion-animations-guide.mdx` | 2854 | long-form essay |
| `building-with-nextjs-16.mdx` | 2118 | long-form essay |
| `building-ai-agent-network.mdx` | 2006 | long-form essay |
| `ai-in-web-development.mdx` | 1664 | long-form essay |
| `my-journey-to-fullstack.mdx` | 1430 | medium (essay-leaning) |
| **Average** | **2280** | — |
| **Short notes (<800w)** | **0** | — |

**Profile:** 6/7 posts are deep technical writeups or evergreen reference essays. The lone medium post (`my-journey-to-fullstack`) is a personal essay, not a casual note. Reading times average ~12 minutes. There are no quick takes, weeklog entries, link posts, or "thinking out loud" pieces.

---

## Why the split isn't useful YET

1. **`/blog` would be empty.** All current posts qualify as articles. A "blog" with zero posts and an "articles" page with seven is two routes for one bucket.
2. **No reader confusion to solve.** The split exists to set expectations: "casual notes here, deep essays there." When everything is already a deep essay, the existing `/blog` already sets that expectation.
3. **Zero migration cost today, real cost tomorrow.** Marking 7 existing posts requires touching every MDX file. Doing it later when you have a few notes lets you mark only the new ones (default = `note`, opt-in to `article`).
4. **SEO inertia.** `/blog/[slug]` URLs already rank in Google for "מפתח full-stack ישראל". Splitting now means a redirect strategy. Later, when both buckets exist organically, you can keep `/blog/[slug]` for everything and only add `/articles` as a filtered view (no redirects).

---

## Industry pattern read

| Site | Model | Their reason | Applies to Elad? |
|------|-------|-------------|-------------------|
| Paul Graham (paulgraham.com) | Essays only | All content is long-form by design | This is Elad's CURRENT shape |
| Patrick McKenzie (kalzumeus.com) | Essays + occasional shorter pieces | Essays carry the brand, notes add cadence | Future-Elad shape |
| Stratechery | Daily updates (paid) vs. weekly free articles | Monetization split | N/A |
| Pieter Levels (levels.io) | Notes (lifestream) + Articles + Twitter | High-volume daily noise | N/A — Elad doesn't lifestream on the site |
| Daniel Nehemiah (danielai.co.il) | Single content stream | Volume doesn't justify a split | This is Elad's CURRENT shape |

**Synthesis:** Sites split when volume + tonal range demands it. Single-stream works fine until a creator regularly publishes in two distinct voices. Elad's current voice is uniformly "deep essay" — closer to Paul Graham than to levels.io.

---

## When to reconsider (split trigger)

Implement the split when **all three** are true:

1. ✅ At least **3 short notes (<800 words)** exist or are planned (e.g., a "weeknotes" cadence, link posts, or Twitter-thread-style takes).
2. ✅ The short notes have a **distinct tone** (casual, conversational, time-sensitive) vs. the essays (evergreen, deep, structured).
3. ✅ A reader landing on `/blog` and seeing the mix would have to **scan past notes to find essays** (or vice-versa) — i.e., the split solves a real findability problem.

**Anti-trigger:** Don't split because "more options look better in nav." Empty buckets erode trust faster than long lists.

---

## How to enable the split when ready

When the trigger fires, this is the minimal-change implementation. Estimated effort: **30–45 minutes**.

### 1. Extend the frontmatter schema

`src/lib/mdx.ts` — add `type` to `MDXFrontmatter`:

```typescript
export interface MDXFrontmatter {
  title: string;
  titleHe?: string;
  date: string;
  description: string;
  descriptionHe?: string;
  tags: string[];
  featured_image?: string;
  author?: string;
  published?: boolean;
  locale?: 'he' | 'en';
  /**
   * Content type. Defaults to 'note' (short, casual, time-sensitive).
   * Mark long-form essays (>1500 words, evergreen, deep) as 'article'.
   * `/articles` route filters to type === 'article'.
   * `/blog` shows everything (or only notes — see routing decision below).
   */
  type?: 'note' | 'article';
}
```

Add a helper:

```typescript
export function getMDXArticles(): MDXPost[] {
  return getAllMDXPosts().filter(p => p.frontmatter.type === 'article');
}

export function getMDXNotes(): MDXPost[] {
  return getAllMDXPosts().filter(p => (p.frontmatter.type ?? 'note') === 'note');
}
```

### 2. Mark existing posts as `article`

For each existing MDX file in `content/blog/`, add to frontmatter:

```yaml
type: 'article'
```

(All 7 current posts qualify. Future short posts can omit the field — default is `note`.)

### 3. Add the `/articles` route

Create `src/app/articles/page.tsx` — copy `src/app/blog/page.tsx` and:
- Change the fetch to a new endpoint `/api/articles/posts` (or filter client-side from `/api/blog/posts` by `type === 'article'`).
- Update the page heading translation key (e.g., `t('articles.title')`).
- Reuse the same Card grid + tag filter logic — no UX divergence.

Create `src/app/articles/[slug]/page.tsx` — likely a re-export of the blog `[slug]` page, since the article route would still resolve to the same MDX file. Alternatively, redirect `/articles/[slug]` → `/blog/[slug]` to keep canonical URLs and avoid duplicate content.

**Recommended URL strategy:**
- `/articles` = filtered index view (only `type === 'article'`)
- `/articles/[slug]` = 308 redirect to `/blog/[slug]` (canonical lives at `/blog`)
- This keeps SEO unchanged and avoids `next-sitemap` / `feed.xml` duplication.

### 4. Routing decision: what does `/blog` show?

Two valid options:

| Option | `/blog` shows | Pros | Cons |
|--------|--------------|------|------|
| **A. /blog = everything, /articles = filtered** | All posts (notes + articles) | Backward-compatible; existing links keep working | `/blog` and `/articles` overlap |
| **B. /blog = notes only, /articles = articles only** | Only `type === 'note'` | Clean separation | Breaks existing reader expectations |

**Recommendation: Option A.** `/blog` stays a "firehose"; `/articles` is the curated essays view. This matches Patrick McKenzie's model and avoids breaking inbound links.

### 5. Add the nav link

`src/components/ui/navigation.tsx` — insert between blog and about:

```typescript
const navItems = [
  { href: '/', label: t('home') },
  { href: '/services', label: t('services') },
  { href: '/projects', label: t('projects') },
  { href: '/guide', label: t('guides') },
  { href: '/skills-universe', label: t('skillsUniverse') },
  { href: '/blog', label: t('blog') },
  { href: '/articles', label: t('articles') },  // ← NEW
  { href: '/about', label: t('about') },
  { href: '/thanks', label: t('thanks') },
  { href: '/contact', label: t('contact') },
];
```

### 6. Add i18n keys

`messages/he.json` — under `nav`:
```json
"articles": "מאמרים"
```

`messages/en.json` — under `nav`:
```json
"articles": "Articles"
```

Plus an `articlesPage` block mirroring `blogPage` (title, subtitle, etc.).

### 7. Type-check

```bash
npx tsc --noEmit
```

(Project rule: npm not bun on Windows MSYS — see `CLAUDE.md`.)

---

## What NOT to do

- ❌ Don't move existing essays from `/blog/[slug]` to `/articles/[slug]`. URL stability matters for SEO and inbound links from WhatsApp/LinkedIn shares.
- ❌ Don't add the nav link before content exists in both buckets. Empty pages are worse than missing pages.
- ❌ Don't auto-classify by word count at runtime. Author intent (`type` field) beats heuristics — a 600-word piece can be a deep essay and a 1800-word piece can be a long ramble note.

---

## Re-evaluation checklist

Re-read this doc when:
- [ ] You publish your 3rd post under 800 words, OR
- [ ] You start a "weeknotes" / "what I shipped this week" cadence, OR
- [ ] An analytics pivot happens (e.g., short posts dramatically outperform long ones, or vice-versa, suggesting reader segmentation), OR
- [ ] 12 months pass since this doc was written (force a content-shape audit regardless).

When that happens: re-run the word-count audit, confirm the trigger conditions, then execute the 7-step implementation above.
