'use client';

import dynamic from 'next/dynamic';

/**
 * CinematicJourneyMount — perf/SEO wrapper around the full-page cinematic backdrop.
 *
 * The heavy scroll-scrub engine + video blobs are `dynamic(..., { ssr:false })`
 * so nothing about them touches the SSR HTML or the LCP path — the eager-SSR
 * Hero text/JSON-LD/FAQ remain the crawlable, painted-first content. The loading
 * placeholder is a fixed dark layer with the first scene's poster, so mounting
 * the engine causes ZERO layout shift (it's position:fixed either way).
 */
const CinematicJourney = dynamic(() => import('./cinematic-journey'), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#05060a]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/videos/cinematic/scene1.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        decoding="async"
      />
    </div>
  ),
});

// The audio layer (mute toggle + Web-Audio bed) is also client-only: it must
// never touch SSR HTML, and it can only create an AudioContext in the browser.
const CinematicAudio = dynamic(() => import('./cinematic-audio'), { ssr: false });

export default function CinematicJourneyMount() {
  return (
    <>
      <CinematicJourney />
      <CinematicAudio />
    </>
  );
}
