'use client';

import type { CSSProperties } from 'react';

/**
 * Animated "EY.dev" logo wordmark.
 *
 * Per-letter colors are sampled from the original gradient
 * (purple-400 -> cyan-400 -> purple-400) so the static look is preserved
 * while each letter can be transformed independently
 * (background-clip:text breaks on transformed children).
 *
 * Animation rules (ui-skills): transform+opacity only, entrance <=600ms once,
 * hover feedback <=200ms, prefers-reduced-motion -> static, no layout shift.
 * Pure CSS, keyframes live in globals.css (.logo-anim).
 */
const LETTERS: ReadonlyArray<{ ch: string; color: string }> = [
  { ch: 'E', color: '#C084FC' },
  { ch: 'Y', color: '#81A4F6' },
  { ch: '.', color: '#42C3F1' },
  { ch: 'd', color: '#42C3F1' },
  { ch: 'e', color: '#81A4F6' },
  { ch: 'v', color: '#C084FC' },
];

export default function AnimatedLogo() {
  return (
    <>
      <span className="sr-only">EY.dev</span>
      <span className="logo-anim" aria-hidden="true">
        {LETTERS.map((letter, i) => (
          <span
            key={`${letter.ch}-${i}`}
            className="logo-anim__ch"
            style={{ '--i': i, color: letter.color } as CSSProperties}
          >
            {letter.ch}
          </span>
        ))}
      </span>
    </>
  );
}
