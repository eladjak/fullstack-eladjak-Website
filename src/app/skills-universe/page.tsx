'use client';

import dynamic from 'next/dynamic';
import {
  CATEGORY_COLORS,
  CATEGORY_LABELS_HE,
  SKILLS,
  type SkillCategory,
} from '@/data/skills-universe';

// Lazy-load three.js bundle on the client only — keeps initial JS small
// and avoids SSR mismatch from window/document access.
const SkillsCanvas = dynamic(
  () => import('@/components/skills-universe/SkillsCanvas'),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[70vh] min-h-[500px] w-full items-center justify-center rounded-2xl border border-white/10 bg-black text-white/60">
        טוען את היקום…
      </div>
    ),
  },
);

const CATEGORIES: SkillCategory[] = [
  'frontend',
  'backend',
  'ai',
  'devops',
  'lang',
  'tools',
];

export default function SkillsUniversePage() {
  return (
    <div dir="rtl" className="min-h-dvh bg-background">
      <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <header className="mb-8 text-center">
          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            יקום הכישורים
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            הדמיה תלת-ממדית של כל הכלים, השפות והפריימוורקים שאני עובד איתם.
            כל כדור הוא טכנולוגיה — צבע = קטגוריה, גודל = רמת שליטה.
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground/80">
            גרור לסיבוב · גלגל לקירוב · לחיצה על כדור = פרטים
          </p>
        </header>

        {/* Legend */}
        <ul
          aria-label="מקרא קטגוריות"
          className="mx-auto mb-6 flex max-w-3xl flex-wrap items-center justify-center gap-x-4 gap-y-2"
        >
          {CATEGORIES.map((cat) => {
            const count = SKILLS.filter((s) => s.category === cat).length;
            return (
              <li
                key={cat}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm"
              >
                <span
                  aria-hidden="true"
                  className="size-3 rounded-full"
                  style={{ backgroundColor: CATEGORY_COLORS[cat] }}
                />
                <span className="font-medium">{CATEGORY_LABELS_HE[cat]}</span>
                <span className="text-xs text-muted-foreground">({count})</span>
              </li>
            );
          })}
        </ul>

        {/* The 3D canvas */}
        <SkillsCanvas />

        {/* Footer note */}
        <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-muted-foreground/70">
          {SKILLS.length} כישורים · בנוי עם React Three Fiber + Drei.
          הסצנה מכבדת prefers-reduced-motion ומאטה את הסיבוב האוטומטי.
        </p>
      </main>
    </div>
  );
}
