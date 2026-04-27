'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { useMemo, useState } from 'react';
import SkillsLazyMount from '@/components/skills-universe/SkillsLazyMount';
import {
  ALL_SKILLS,
  CATEGORY_COLORS,
  CATEGORY_LABELS_HE,
  GENERATED_SKILLS,
  SKILLS,
  type SkillCategory,
  type SkillNode,
} from '@/data/skills-universe';

const CATEGORIES: SkillCategory[] = [
  'frontend',
  'backend',
  'ai',
  'devops',
  'lang',
  'tools',
];

export default function SkillsUniversePage() {
  const [selected, setSelected] = useState<SkillNode | null>(null);

  // Group all skills by category for the accessible list. Memoized so the
  // grouped structure isn't recomputed on every selection change.
  const skillsByCategory = useMemo(() => {
    const map = new Map<SkillCategory, Array<{ skill: SkillNode; ring: 'core' | 'extended' }>>();
    for (const cat of CATEGORIES) map.set(cat, []);
    for (const s of SKILLS) {
      map.get(s.category)?.push({ skill: s, ring: 'core' });
    }
    for (const s of GENERATED_SKILLS) {
      map.get(s.category)?.push({ skill: s, ring: 'extended' });
    }
    return map;
  }, []);

  // Live-region message: announce the currently selected skill in Hebrew so
  // screen reader users get parity with the visual selection state of the canvas.
  const liveMessage = selected
    ? `${selected.label} — ${CATEGORY_LABELS_HE[selected.category]}${
        selected.id.startsWith('gen:') ? ' מהספרייה האישית' : ' מליבת הכישורים'
      }${selected.level ? ` · רמה ${selected.level} מתוך 5` : ''}`
    : '';

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
            const count = ALL_SKILLS.filter((s) => s.category === cat).length;
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

        {/*
         * Live region for selection announcements.
         * - aria-live="polite": waits for the user to be idle before announcing.
         * - aria-atomic="true": the entire region is re-read on each update.
         * - sr-only via clip + size 1: invisible to sighted users, available to AT.
         * Sits OUTSIDE the canvas so it is always present in the DOM,
         * regardless of whether the 3D scene has been mounted yet.
         */}
        <div
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
          // role=status is implicit for aria-live=polite, but adding it explicitly
          // helps older AT engines.
          role="status"
        >
          {liveMessage}
        </div>

        {/* The 3D canvas — lazy-mounted behind a poster + click to keep TBT low */}
        <SkillsLazyMount selected={selected} onSelect={setSelected} />

        {/*
         * Accessible keyboard alternative to the 3D canvas.
         * Collapsed by default — the browser handles open/close a11y of <details>.
         * Buttons inside are NOT rendered until the user expands, but in modern
         * browsers <details> children ARE in the DOM (just not displayed).
         * That's fine for SR users (they can still drill in), and the visual
         * cost is zero because they're inside a closed <details>.
         */}
        <details className="mx-auto mt-6 max-w-3xl rounded-xl border border-white/10 bg-white/5">
          <summary className="cursor-pointer select-none rounded-xl px-4 py-3 text-sm font-medium text-foreground/90 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
            רשימת כל הכישורים (נגיש למקלדת)
          </summary>
          <div className="border-t border-white/10 px-4 py-4">
            <p className="mb-4 text-xs text-muted-foreground/80">
              לחצו על כישור כדי לבחור אותו. הבחירה תוכרז ותוצג גם ב-3D למעלה.
            </p>
            <div className="space-y-5">
              {CATEGORIES.map((cat) => {
                const items = skillsByCategory.get(cat) ?? [];
                if (items.length === 0) return null;
                return (
                  <section key={cat} aria-labelledby={`a11y-cat-${cat}`}>
                    <h3
                      id={`a11y-cat-${cat}`}
                      className="mb-2 flex items-center gap-2 text-sm font-semibold"
                    >
                      <span
                        aria-hidden="true"
                        className="size-2.5 rounded-full"
                        style={{ backgroundColor: CATEGORY_COLORS[cat] }}
                      />
                      {CATEGORY_LABELS_HE[cat]}
                      <span className="text-xs font-normal text-muted-foreground">
                        ({items.length})
                      </span>
                    </h3>
                    <ul className="flex flex-wrap gap-1.5">
                      {items.map(({ skill, ring }) => {
                        const isSelected = selected?.id === skill.id;
                        const ringLabel =
                          ring === 'core' ? 'מליבת הכישורים' : 'מהספרייה האישית';
                        return (
                          <li key={skill.id}>
                            <button
                              type="button"
                              onClick={() => setSelected(skill)}
                              aria-label={`${skill.label} - ${CATEGORY_LABELS_HE[cat]} - ${ringLabel}`}
                              aria-pressed={isSelected}
                              className={[
                                'rounded-full border px-3 py-1 text-xs transition-opacity',
                                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                                isSelected
                                  ? 'border-primary bg-primary/15 font-medium text-foreground'
                                  : 'border-white/15 bg-white/5 text-foreground/85 hover:opacity-80',
                              ].join(' ')}
                            >
                              {skill.label}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                );
              })}
            </div>
          </div>
        </details>

        {/* Footer note */}
        <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-muted-foreground/70">
          {ALL_SKILLS.length} כישורים · {SKILLS.length} ליבה (פנימי) +{' '}
          {GENERATED_SKILLS.length} מהספרייה האישית (חיצוני) · גרור לסיבוב,
          גלגל לקירוב.
        </p>

        {/* CTA */}
        <section className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            רואים כישור שמתאים לפרויקט שלכם? אני אשמח לשמוע על מה שאתם בונים.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            רוצה לעבוד יחד? בוא נדבר
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </section>
      </main>
    </div>
  );
}
