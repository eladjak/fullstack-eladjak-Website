'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState } from 'react';

/**
 * SkillsLazyMount — perf-conscious wrapper around the heavy 3D <SkillsCanvas>.
 *
 * Why this exists:
 *  - The full 3D scene (three + react-three-fiber + drei + 420 spheres) is ~150KB
 *    gzipped and produces a TBT spike of ~480ms on mid-range devices, which sinks
 *    Lighthouse Performance to 52 and pushes LCP past 8s.
 *  - We defer mounting the canvas behind an explicit user click. Initial paint
 *    is just a static poster <Image>, so the page becomes interactive almost
 *    immediately. The 3D bundle is only fetched/parsed when the user opts in.
 *
 * Trade-off:
 *  - Visitors pay one click to see the universe. The poster + button are a
 *    clear affordance, and the explicit gesture also satisfies
 *    `prefers-reduced-motion` users (no animation starts without consent).
 */
const SkillsCanvas = dynamic(
  () => import('./SkillsCanvas'),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[70vh] min-h-[500px] w-full items-center justify-center rounded-2xl border border-white/10 bg-black text-white/60">
        טוען את היקום…
      </div>
    ),
  },
);

export default function SkillsLazyMount() {
  const [active, setActive] = useState(false);

  if (active) {
    return <SkillsCanvas />;
  }

  return (
    <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
      {/* Static poster — server-rendered, instant paint, zero JS. */}
      <Image
        src="/images/skills-universe-poster.jpg"
        alt="יקום הכישורים — הדמיה תלת-ממדית של כדורי טכנולוגיה צבעוניים בחלל עמוק"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 1024px"
        className="object-cover opacity-70"
      />

      {/* Subtle overlay so the CTA stays legible over any image. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60"
      />

      {/* Centered CTA — explicit user action loads the canvas bundle. */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="max-w-md text-pretty text-sm text-white/80 sm:text-base">
          הצצה תלת-ממדית למלוא הסטאק שאיתו אני בונה — 420 כישורים, פיזור פיבונאצ׳י,
          סיבוב חופשי. לחיצה אחת ואתם בפנים.
        </p>
        <button
          type="button"
          onClick={() => setActive(true)}
          className="rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground shadow-2xl transition-transform duration-200 hover:scale-105 focus-visible:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          aria-label="כנסו ליקום הכישורים — הדמיה תלת-ממדית של 420 כישורים"
        >
          כנסו ליקום הכישורים <span aria-hidden="true">⤳</span>
        </button>
      </div>
    </div>
  );
}
