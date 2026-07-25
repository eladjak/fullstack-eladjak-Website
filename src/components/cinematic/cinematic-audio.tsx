'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { CinematicAudioEngine } from './cinematic-audio-engine';

/**
 * CinematicAudio — the mute toggle + wiring for the layered audio bed.
 *
 * Behaviour (all hard rules from the brief):
 *  - Default = MUTED. Nothing plays until the user presses the toggle.
 *  - The AudioContext is created + resumed inside that first click/keydown
 *    (browser autoplay policy). We NEVER autoplay with sound.
 *  - Under prefers-reduced-motion the control is not rendered and no audio is
 *    ever armed — the experience stays silent + static.
 *  - The toggle is a real <button> with aria-pressed + aria-label, so it is
 *    keyboard-accessible and screen-reader-correct out of the box.
 *
 * It listens for the engine's `cj:scene` CustomEvent (dispatched by
 * CinematicJourney on the `.cj-root` node) to duck/layer per scene, and for
 * `cj:complete` to ring the one-time arrival chime at the end of the journey.
 */

export default function CinematicAudio() {
  const locale = useLocale();
  const lang: 'he' | 'en' = locale === 'en' ? 'en' : 'he';
  const engineRef = useRef<CinematicAudioEngine | null>(null);
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false); // true once we know reduced-motion
  const [muted, setMuted] = useState(true); // default OFF
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    setReady(true);
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // Wire the scene event to the engine. Attaches to the cinematic root once it
  // exists (it mounts client-side, possibly after this component).
  useEffect(() => {
    if (reduced) return;
    let detach: (() => void) | null = null;
    let raf = 0;

    const tryAttach = () => {
      const root = document.querySelector('.cj-root');
      if (!root) {
        raf = window.requestAnimationFrame(tryAttach);
        return;
      }
      const onScene = (e: Event) => {
        const detail = (e as CustomEvent<{ index: number }>).detail;
        engineRef.current?.onScene(detail.index);
      };
      const onComplete = () => {
        engineRef.current?.onComplete();
      };
      root.addEventListener('cj:scene', onScene as EventListener);
      root.addEventListener('cj:complete', onComplete);
      detach = () => {
        root.removeEventListener('cj:scene', onScene as EventListener);
        root.removeEventListener('cj:complete', onComplete);
      };
    };
    tryAttach();

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      detach?.();
    };
  }, [reduced]);

  // Dispose the engine on unmount (route change).
  useEffect(() => {
    return () => {
      engineRef.current?.dispose();
      engineRef.current = null;
    };
  }, []);

  const toggle = async () => {
    if (pending) return;
    // First press arms the engine INSIDE this user gesture (resume() allowed).
    if (!engineRef.current) {
      setPending(true);
      const engine = new CinematicAudioEngine();
      engineRef.current = engine;
      await engine.arm();
      engine.setMuted(false);
      setMuted(false);
      setPending(false);
      return;
    }
    const next = !muted;
    engineRef.current.setMuted(next);
    setMuted(next);
  };

  // Never render (and never arm) under reduced motion, and avoid an SSR/CSR flash
  // by waiting until we've measured the media query.
  if (!ready || reduced) return null;

  const label = muted
    ? lang === 'he'
      ? 'הפעל פסקול קולנועי'
      : 'Turn on cinematic sound'
    : lang === 'he'
      ? 'השתק פסקול'
      : 'Mute cinematic sound';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={!muted}
      aria-label={label}
      title={label}
      className="cj-audio-toggle fixed bottom-5 z-[60] flex size-11 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/85 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.6)] backdrop-blur-md transition-[transform,background-color,color,opacity] duration-200 hover:scale-105 hover:border-primary/40 hover:text-white hover:shadow-[0_0_20px_-2px_hsla(258,90%,66%,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ltr:right-5 rtl:left-5"
    >
      {/* Icon: speaker with waves when ON, muted speaker when OFF. */}
      {muted ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M11 5 6 9H2v6h4l5 4z" />
          <line x1="22" y1="9" x2="16" y2="15" />
          <line x1="16" y1="9" x2="22" y2="15" />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M11 5 6 9H2v6h4l5 4z" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )}
      <span className="sr-only">{label}</span>
    </button>
  );
}
