# Fullstack Portfolio - Design System

> **Site:** fullstack-eladjak.co.il
> **Purpose:** Developer portfolio for clients and employers
> **Tone:** Professional, technical, modern
> **Theme:** Dark-first with light mode support (Material Design 3 tokens)

---

## Color Palette

### Dark Mode (Primary)

| Role | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| Background | `#09090B` | `--background` | Page background (Zinc-950) |
| Foreground | `#FAFAFA` | `--foreground` | Primary text (Gray-50) |
| Card | `#111827` | `--card` | Card surfaces (Gray-900) |
| Card Text | `#F9FAFB` | `--card-foreground` | Text on cards |
| Primary | `#A78BFA` | `--primary` | Brand purple, links, highlights (Purple-400) |
| Primary Text | `#1F2937` | `--primary-foreground` | Text on primary surfaces |
| Secondary | `#8B5CF6` | `--secondary` | Supporting purple (Purple-600) |
| Accent | `#C4B5FD` | `--accent` | Tertiary highlight (Purple-300) |
| Muted | `#1F2937` | `--muted` | Subtle backgrounds (Gray-800) |
| Muted Text | `#D1D5DB` | `--muted-foreground` | Secondary text (Gray-300) |
| CTA | `#FBBF24` | `--cta` | Call-to-action buttons (Amber-400) |
| CTA Text | `#1F2937` | `--cta-foreground` | Text on CTA |
| Border | `#374151` | `--border` | Borders, dividers (Gray-700) |
| Ring | `#A78BFA` | `--ring` | Focus rings |
| Destructive | `#F87171` | `--destructive` | Error states (Red-400) |

### Light Mode

| Role | Hex | CSS Variable |
|------|-----|-------------|
| Background | `#FFFFFF` | `--background` |
| Foreground | `#1F2937` | `--foreground` |
| Card | `#FFFFFF` | `--card` |
| Primary | `#8B5CF6` | `--primary` (Purple-600) |
| Secondary | `#6D28D9` | `--secondary` (Purple-700) |
| Accent | `#A78BFA` | `--accent` (Purple-400) |
| Muted | `#F3F4F6` | `--muted` (Gray-100) |
| Muted Text | `#6B7280` | `--muted-foreground` (Gray-500) |
| CTA | `#F59E0B` | `--cta` (Amber-500) |
| Border | `#E5E7EB` | `--border` (Gray-200) |

### Chart Colors (Data Visualization)

| Token | Dark | Light |
|-------|------|-------|
| `--chart-1` | `#A78BFA` | `#8B5CF6` |
| `--chart-2` | `#8B5CF6` | `#6D28D9` |
| `--chart-3` | `#C4B5FD` | `#A78BFA` |
| `--chart-4` | `#DDD6FE` | `#DDD6FE` |
| `--chart-5` | `#4C1D95` | `#EDE9FE` |

---

## Typography

### Font Stack

| Context | Font | Variable | Fallback |
|---------|------|----------|----------|
| Primary (LTR) | Geist Sans | `--font-geist-sans` | system-ui, sans-serif |
| Hebrew Body | Assistant | `--font-assistant` | sans-serif |
| Hebrew Headings | Heebo | `--font-heebo` | sans-serif |

### Type Scale

| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| Hero H1 | `text-4xl` / `text-6xl` (lg) | 800 (extrabold) | 1.1 | Main hero title |
| Section H2 | `text-3xl` / `text-4xl` (lg) | 700 (bold) | 1.2 | Section headings |
| Card H3 | `text-xl` / `text-2xl` | 600 (semibold) | 1.3 | Card titles |
| Body | `text-base` (16px) | 400 (normal) | 1.6 | Paragraph text |
| Small / Caption | `text-sm` (14px) | 400 | 1.5 | Labels, metadata |
| Code | `text-sm` mono | 400 | 1.5 | Code snippets |

### RTL Rules
- `[dir="rtl"]` body uses `--font-assistant`
- `[dir="rtl"]` headings use `--font-heebo`
- LTR content uses Geist Sans
- HTML lang is `he`, dir is `rtl`

---

## Spacing

| Token | Value | Usage |
|-------|-------|-------|
| Section padding | `py-16` / `py-24` (lg) | Vertical section spacing |
| Container max-width | `max-w-7xl` (1280px) | Content container |
| Container padding | `px-4` / `px-6` (lg) | Horizontal page gutters |
| Card padding | `p-6` | Internal card padding |
| Card gap | `gap-6` / `gap-8` | Grid gaps between cards |
| Component gap | `gap-4` | Spacing between inline elements |
| Section header margin | `mb-8` / `mb-12` | Below section titles |

---

## Border Radius

| Token | Value | CSS Variable | Usage |
|-------|-------|-------------|-------|
| Large | `12px` | `--radius` (0.75rem) | Cards, dialogs |
| Medium | `10px` | `calc(var(--radius) - 2px)` | Buttons, inputs |
| Small | `8px` | `calc(var(--radius) - 4px)` | Badges, chips |
| Full | `9999px` | `rounded-full` | Avatars, pills |

---

## Shadows & Effects

### Elevation

| Level | Value | Usage |
|-------|-------|-------|
| None | `shadow-none` | Flat surfaces |
| Subtle | `shadow-sm` | Slight lift on hover |
| Card | `shadow-md` | Default card elevation |
| Elevated | `shadow-lg` | Popovers, dropdowns |
| Focus ring | `ring-2 ring-ring ring-offset-2` | Focus indicators |

### Selection
```css
::selection {
  background-color: var(--primary);    /* Purple highlight */
  color: var(--primary-foreground);
}
```

### Scrollbar (Dark)
```css
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--background); }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
```

---

## Animations

### Timing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--animation-fast` | `150ms` | Hover states, micro-interactions |
| `--animation-base` | `250ms` | Standard transitions |
| `--animation-slow` | `400ms` | Page transitions, reveals |

### Rules

1. **Feedback animations** must be <= 200ms (use `--animation-fast`)
2. **Only animate** `transform` and `opacity` -- never `width`, `height`, `top`, `left`
3. **Scroll-driven animations** use CSS `animation-timeline: view()` with `@supports` progressive enhancement
4. **Reduced motion** is respected via `prefers-reduced-motion: reduce` (all animations disabled)
5. **Accordion** uses `0.2s ease-out` for open/close
6. **Gradient animation** cycles at `4s ease infinite` (background hero)
7. **Marquee** runs at `30s linear infinite`, pauses on hover

### Scroll Animation Classes

| Class | Effect | Range |
|-------|--------|-------|
| `.scroll-fade` | Fade in + slide up 30px | entry 0% to cover 30% |
| `.scroll-scale` | Scale from 0.9 to 1 | entry 0% to cover 25% |
| `.scroll-slide-left` | Slide in from left 50px | entry 0% to cover 30% |
| `.scroll-slide-right` | Slide in from right 50px | entry 0% to cover 30% |
| `.scroll-reveal-bar` | Scale X from 0 to 1 | entry 0% to cover 40% |

### Framer Motion Conventions
- Use `whileInView` for scroll-triggered animations (not `useInView`)
- Default transition: `{ duration: 0.3, ease: "easeOut" }`
- Stagger children: `staggerChildren: 0.1`

---

## Component Patterns

### Cards

```tsx
{/* Standard project card */}
<div className="rounded-lg border border-border bg-card p-6 shadow-md
               transition-shadow duration-150 hover:shadow-lg">
  <h3 className="text-xl font-semibold text-card-foreground">Title</h3>
  <p className="mt-2 text-muted-foreground">Description</p>
</div>
```

- Background: `bg-card` (dark: `#111827`)
- Border: `border border-border`
- Radius: `rounded-lg` (12px)
- Padding: `p-6`
- Hover: subtle shadow increase, 150ms transition

### Buttons

```tsx
{/* Primary CTA */}
<button className="rounded-md bg-cta px-6 py-3 font-semibold text-cta-foreground
                   transition-opacity duration-150 hover:opacity-90">
  Contact Me
</button>

{/* Secondary / outline */}
<button className="rounded-md border border-primary px-6 py-3 font-semibold
                   text-primary transition-colors duration-150 hover:bg-primary/10">
  View Projects
</button>
```

- CTA buttons use amber (`--cta`) for warm contrast against purple theme
- Secondary buttons use outline style with primary purple
- All buttons: `rounded-md`, `px-6 py-3`, `font-semibold`

### Badges / Tech Tags

```tsx
<span className="rounded-sm bg-primary/10 px-2 py-1 text-sm font-medium text-primary">
  React
</span>
```

- Small radius: `rounded-sm`
- Low-opacity primary background
- Primary text color

### Section Layout

```tsx
<section className="py-16 lg:py-24">
  <div className="mx-auto max-w-7xl px-4 lg:px-6">
    <h2 className="mb-8 text-3xl font-bold lg:text-4xl">Section Title</h2>
    {/* Content */}
  </div>
</section>
```

- Alternating background: some sections use `bg-muted` for visual rhythm
- Section headings are centered or start-aligned based on content

### Hero

- Full viewport height: `min-h-dvh`
- Animated gradient background (6s cycle)
- Floating tech icons around profile avatar
- Typewriter text effect for role titles
- Gradient text: purple-to-accent linear gradient with `background-clip: text`

### Navigation

- Sticky top: `sticky top-0 z-50`
- Background blur: `backdrop-blur-md bg-background/80`
- Border bottom: `border-b border-border`

---

## Accessibility (IS 5568 / WCAG AA)

| Requirement | Implementation |
|-------------|---------------|
| Focus indicator | `2px solid var(--ring)`, `outline-offset: 2px` |
| Reduced motion | All animations disabled via `prefers-reduced-motion` |
| Color contrast | Minimum 4.5:1 for normal text, 3:1 for large text |
| Scroll padding | `scroll-padding-top: 4rem` for fixed nav offset |
| Selection | High-contrast purple selection colors |
| RTL support | `dir="rtl"` with proper font switching |

---

## Dark Mode Implementation

- Uses `class` strategy (`darkMode: ["class"]`)
- Theme toggle with View Transitions API (circular reveal)
- CSS variables switch between `:root` (light) and `.dark` (dark)
- Default: dark mode

---

## File Structure

```
src/styles/globals.css    → All CSS variables, animations, scroll effects
tailwind.config.ts        → Color mappings, font family, keyframes, plugins
src/app/layout.tsx        → Font loading (GeistSans, Heebo, Assistant)
```

---

## Services Page Design

### Service Card Layout
- Full-width stacked cards with `rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm`
- Each card has a gradient icon container (`h-16 w-16 rounded-2xl bg-gradient-to-br`)
- Content: title + price badge row, description, 2-column feature checklist
- Feature items use `CheckCircle2` icons in primary color

### Service Gradients
| Service | Gradient |
|---------|----------|
| AI Automation | `from-violet-500 to-purple-600` |
| Full-Stack | `from-blue-500 to-cyan-500` |
| EdTech | `from-emerald-500 to-teal-500` |
| Workshops | `from-amber-500 to-orange-500` |
| WhatsApp | `from-green-500 to-emerald-600` |

### Pricing Badges
- `rounded-full bg-cta/10 border border-cta/20 px-3 py-1 text-sm text-cta`
- Shows "from X NIS" format or "contact for quote"

### Contact CTA Section
- 3-column grid: WhatsApp (green), Email (primary), Phone (primary)
- Each card: `rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm`
- Main CTA button: `rounded-full bg-cta px-8 py-4 shadow-lg shadow-cta/25`

---

## Pages (22 Routes)

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Home - Hero, Tech Marquee, Skills, Services Preview, Projects, Recommendations, Process, CTA |
| `/about` | Static | Bio, career timeline, skills, traits |
| `/projects` | Static | 14 projects with category filters (Web Apps, AI & ML, Tools) |
| `/services` | Static | 5 services with pricing, contact CTA |
| `/blog` | Dynamic | Blog listing from MDX files via API (5 posts) |
| `/blog/[slug]` | SSG | Individual blog posts from MDX |
| `/contact` | Static | Contact form + WhatsApp/email/phone cards |
| `/thanks` | Static | 8 mentor acknowledgments |

---

## Cross-Site Reference

This is the **developer portfolio** site. It uses a dark, technical aesthetic with purple as the brand color and amber for CTAs. The **eladjak Hub** (eladjak.com) is a separate site with a warm, artistic design -- see its own DESIGN.md.

- Shared: Heebo font for Hebrew, Elad's name and contact info
- Different: color scheme (dark purple vs warm gold), tone (technical vs creative)
- Hub links TO this site for development services
