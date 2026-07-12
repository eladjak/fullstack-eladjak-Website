'use client';

import dynamic from 'next/dynamic';

/**
 * CinematicLazyMount — perf wrapper around the GSAP + R3F cinematic hero.
 *
 * Mirrors SkillsLazyMount: the heavy visual (GSAP ScrollTrigger + three.js
 * NetworkCanvas) is `dynamic(..., { ssr: false })` so its bundle + the
 * ScrollTrigger.register call never touch the SSR HTML or the LCP path — the
 * eager-SSR HeroSection remains the LCP element and stays visible to crawlers.
 *
 * The loading placeholder reserves the exact stage height (h-[70dvh] min-h-[420px])
 * so mounting the canvas causes ZERO cumulative layout shift.
 *
 * Unlike SkillsLazyMount, this auto-mounts (no click gate): it's a hero, so it
 * should animate as the user scrolls. Reduced-motion is handled INSIDE the
 * section via gsap.matchMedia (static frame, no pin/scrub, audio off).
 */
const CinematicScrollSection = dynamic(
  () => import('./cinematic-scroll-section'),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="relative z-0 flex h-[70dvh] min-h-[420px] w-full items-center justify-center overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background"
      >
        {/* Static poster frame: a single rose glow = the "one node" first beat. */}
        <div className="h-24 w-24 rounded-full bg-primary/40 blur-2xl" />
      </div>
    ),
  },
);

export default function CinematicLazyMount() {
  return <CinematicScrollSection />;
}
