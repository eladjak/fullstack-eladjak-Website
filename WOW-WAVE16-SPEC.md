# WOW-2026 wave 16 — application spec (portfolio-website)

A shared CSS layer has ALREADY been added at the end of `src/styles/globals.css`
(search for `WOW-2026 LAYER`). Your job is only to APPLY its classes to markup
and to convert existing motion-diet violations. **Do not edit globals.css.**
**Do not touch payment/checkout logic** (`src/app/api/sumit/**`, any Cardcom /
Sumit call sites).

## The brand (never repaint)
Dark base + purple `--primary` `#8B5CF6` / `--accent` `#A78BFA` + amber `--cta`.
Never introduce a new colour, never convert a purple thing to another hue.

## Available classes

| class | what it does | where to apply |
|---|---|---|
| `wow-title` | draws a short brand accent rule under a heading as it enters view | section `<h2>`, and page-lead `<h1>` where the page has section structure |
| `wow-title--center` | accent bar centred at every breakpoint | add ALONGSIDE `wow-title` when the heading is centred at every breakpoint (`text-center` with no `md:text-start`) |
| `wow-title--center-sm` | bar centred on mobile, reading-start aligned from `md` | add ALONGSIDE `wow-title` when the heading is `text-center md:text-start` (or its wrapper is) |
| `wow-card` | hover/focus lift + brand glow (transform + pseudo-element opacity only) | grid/list card containers |
| `wow-media` | image settles from a hair over-scale as it enters view | `<Image>`/`<img>` that sits inside an `overflow-hidden` wrapper |
| `wow-press` | `:active { scale(.97) }` tactile press | CTA buttons and button-styled links |
| `wow-underline` | underline slides out from the reading-start edge on hover/focus | inline text links inside prose/paragraphs |
| `wow-icon` | ≤1.06 icon scale when its `wow-card`/`wow-press` ancestor is hovered/focused | a decorative icon inside a card or CTA |

## Heading rule (apply broadly — this is the signature of the wave)
Add `wow-title` (plus the correct centring variant) to every section-level
`<h2>`. Choose the variant by reading the heading's own alignment classes AND
its wrapper's:
- wrapper/heading `text-center` only → `wow-title wow-title--center`
- `text-center md:text-start` (or `md:text-right`/`md:text-left`) → `wow-title wow-title--center-sm`
- start-aligned at all breakpoints → `wow-title` alone

Skip `wow-title` on: headings inside cards, FAQ question headings, `sr-only`
headings, and any heading that already has a decorative rule/divider directly
beneath it (do not stack two).

## Card conversion rule (the important one)
Find card containers using the pattern
`transition-all … hover:shadow-… hover:border-…` (or `hover:-translate-y-*`).
These animate `box-shadow` and `border-color` on every frame — a hard motion-diet
violation. Convert:

1. Add `wow-card` to the container.
2. REMOVE from its className: `transition-all`, every `hover:shadow-*`,
   every `hover:border-*`, every `hover:-translate-y-*`, and `duration-*` that
   only existed for those.
3. KEEP the static `border-*`, `shadow-*`, `bg-*`, `rounded-*` classes exactly
   as they are — the resting look must not change.
4. If the container had `hover:bg-*` you may keep it, but never with
   `transition-colors` when the element also changes a border colour —
   `transition-colors` includes `border-color`, which is banned. Use an explicit
   list such as `transition-[color,background-color]`.
5. Put `wow-card` on the FOCUSABLE element itself wherever possible (the `<a>`,
   `<Link>` or `<button>`). The stylesheet covers three shapes — card is the
   focusable (`:focus-visible`), card CONTAINS the focusable
   (`:has(:focus-visible)`), and card is INSIDE the focusable
   (`a:focus-visible .wow-card`) — but shape 1 is the only one that is also
   correct semantically, so prefer it.
6. `wow-card` means "this whole card is clickable". Never put it on a purely
   informational card, and never on a card whose only interactive element is a
   small nested link — that is a false affordance and users will click dead
   space.
7. Never put `wow-media` and a `group-hover:scale-*` on the SAME element.
   `wow-media` is a scroll-timeline animation with `fill-mode: both`, and
   animation values outrank normal transforms, so the hover zoom would be
   permanently dead. Wrapper gets the settle, inner image gets the hover.

**Never add `wow-card` to an element that already has a framer-motion
`whileHover` transform** (double transform ownership). Leave those alone.

Also convert stray CTA patterns: replace `hover:scale-105` on buttons with
`wow-press` (press-down beats grow-on-hover and avoids fighting the lift).
Where a link already has `active:scale-[0.97]` hand-rolled, replace it with
`wow-press`.

## Hard rules (a reviewer will check these — no rationalising comments)
- Motion may only animate `transform` and `opacity`. Never width/height/top/
  left/margin/padding, never animated `box-shadow`, `border-color`,
  `letter-spacing`, or `gap` (`group-hover:gap-2.5` is a violation — drop it or
  translate the icon instead).
- Every hover response needs a `:focus-visible` equivalent. The wow classes
  give you this for free; if you hand-roll anything, add the twin.
- Decorative layers get `aria-hidden="true"` and `pointer-events-none`.
- RTL: use logical properties (`ms-*`/`me-*`/`ps-*`/`pe-*`, `inset-inline-*`,
  `start-*`/`end-*`). Never add a physical `border-radius` shorthand, `left-*`,
  `right-*`, `ml-*`, `mr-*`, `pl-*`, `pr-*` to anything you touch. This site is
  Hebrew-first — physical values mirror wrong.
- No contrast regressions; do not lighten text or darken a surface behind text.
- Do not add or change any user-visible string, and do not add a translation
  key. Zero MISSING_MESSAGE risk: `useTranslations` keys must stay untouched.
- Do not invent numbers. Count-ups only where a real number already renders.

## Verify before you report
Run from the repo root (this project uses **npm**, not bun — bun is broken on
this Windows box):
```
npx tsc --noEmit
```
Report the exact files+lines you changed and anything you deliberately skipped.
