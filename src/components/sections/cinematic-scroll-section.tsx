'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Volume2, VolumeX } from 'lucide-react';
import NetworkCanvas from '@/components/hero/NetworkCanvas';

/**
 * CinematicScrollSection — the decorative, aria-hidden cinematic hero layer.
 *
 * A scroll-pinned GSAP stage that scrubs a 4-beat sequence over an R3F agent
 * network (NetworkCanvas): one node → 12-agent fleet → living system w/ health
 * pulses → converge to the operator. It sits ABOVE the eager-SSR HeroSection as
 * a background layer, so it NEVER gates the real <h1>/<h2>/<p>/CTA text.
 *
 * Guardrails honored:
 *  - ScrollTrigger.register runs ONLY inside useGSAP (client), never module top.
 *  - gsap.matchMedia() reduce branch: no pin/scrub, static frame, audio off.
 *  - useGSAP auto-reverts on unmount → no leaked triggers across route changes.
 *  - transform/opacity only; a fixed min-height container reserves space (0 CLS).
 *  - Audio: muted/off by default, same-origin <audio> under /public/audio, a
 *    single soft SFX at beat 2, ambient hum only during the hero. Never autoplays
 *    with sound; forced off under prefers-reduced-motion.
 */

const HUB_URL = 'https://hub.eladjak.com/health';

interface Beat {
  key: 'beat1' | 'beat2' | 'beat3' | 'beat4';
  at: number; // scrub position (0-1) where this caption is centered
}
const BEATS: Beat[] = [
  { key: 'beat1', at: 0.08 },
  { key: 'beat2', at: 0.38 },
  { key: 'beat3', at: 0.62 },
  { key: 'beat4', at: 0.9 },
];

export default function CinematicScrollSection() {
  const t = useTranslations('hero.cinematic');
  const locale = useLocale();
  const lang: 'he' | 'en' = locale === 'en' ? 'en' : 'he';

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Scroll scrub (0→1), read by NetworkCanvas each frame via ref.
  const progressRef = useRef(0);
  // Per-caption opacity elements.
  const captionRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [healthRatio, setHealthRatio] = useState<number | null>(null);

  // ── Sound (muted/off by default) ──────────────────────────────────────────
  const [soundOn, setSoundOn] = useState(false);
  const ambientRef = useRef<HTMLAudioElement | null>(null);
  const sfxRef = useRef<HTMLAudioElement | null>(null);
  const sfxFiredRef = useRef(false);

  // ── Live hub health (drives node pulse; degrades gracefully, never fakes) ──
  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    fetch(HUB_URL, { signal: controller.signal, cache: 'no-store', headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('bad status'))))
      .then((json: unknown) => {
        if (!mounted) return;
        const d = json as Record<string, unknown>;
        let total: number | undefined;
        let healthy: number | undefined;
        const agents = d?.agents as Record<string, unknown> | undefined;
        if (agents && typeof agents.total === 'number') total = agents.total;
        if (agents && typeof agents.healthy === 'number') healthy = agents.healthy;
        if (typeof d?.total === 'number' && total === undefined) total = d.total;
        if (typeof d?.healthy === 'number' && healthy === undefined) healthy = d.healthy;
        if (Array.isArray(d?.services)) {
          const svc = d.services as Array<Record<string, unknown>>;
          total = total ?? svc.length;
          healthy =
            healthy ??
            svc.filter((s) => s.healthy === true || s.status === 'ok' || s.status === 'healthy' || s.status === 'up').length;
        }
        if (typeof total === 'number' && typeof healthy === 'number' && total > 0) {
          setHealthRatio(Math.max(0, Math.min(1, healthy / total)));
        } else {
          setHealthRatio(null); // reachable but unknown shape → honest "unavailable"
        }
      })
      .catch(() => {
        if (mounted) setHealthRatio(null);
      })
      .finally(() => clearTimeout(timeout));
    return () => {
      mounted = false;
      controller.abort();
      clearTimeout(timeout);
    };
  }, []);

  // Small-screen: hide labels for legibility.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 640px)');
    setShowLabels(!mq.matches);
    const handler = (e: MediaQueryListEvent) => setShowLabels(!e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // ── GSAP ScrollTrigger — registered client-side only, matchMedia-gated ─────
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();

      // Full motion branch.
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        setReducedMotion(false);

        const st = ScrollTrigger.create({
          trigger: rootRef.current,
          start: 'top top',
          end: '+=200%',
          pin: stageRef.current,
          scrub: 0.6,
          onUpdate: (self) => {
            progressRef.current = self.progress;
            // Cross-fade captions by proximity to their beat position.
            captionRefs.current.forEach((el, i) => {
              if (!el) return;
              const dist = Math.abs(self.progress - BEATS[i]!.at);
              const opacity = Math.max(0, 1 - dist / 0.14);
              el.style.opacity = String(opacity);
              el.style.transform = `translateY(${(1 - opacity) * 12}px)`;
            });
            // Single soft SFX when the network unfolds (beat 2), once.
            if (soundOn && !sfxFiredRef.current && self.progress > 0.3 && self.progress < 0.5) {
              sfxFiredRef.current = true;
              sfxRef.current?.play().catch(() => {});
            }
            // Ambient hum only while the hero is on screen; ducks out past it.
            if (soundOn && ambientRef.current) {
              ambientRef.current.volume = Math.max(0, 0.25 * (1 - self.progress * 0.6));
            }
          },
        });

        // Refresh once fonts/images settle so the pin-spacer measures correctly.
        const onLoad = () => ScrollTrigger.refresh();
        window.addEventListener('load', onLoad);

        return () => {
          window.removeEventListener('load', onLoad);
          st.kill();
        };
      });

      // Reduced-motion branch: static first frame, no pin/scrub, audio off.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        setReducedMotion(true);
        setSoundOn(false);
        progressRef.current = 1; // resolved/operator frame, static
        captionRefs.current.forEach((el, i) => {
          if (!el) return;
          el.style.opacity = i === BEATS.length - 1 ? '1' : '0';
          el.style.transform = 'none';
        });
      });
    },
    { scope: rootRef, dependencies: [soundOn] },
  );

  // ── Sound toggle ───────────────────────────────────────────────────────────
  const toggleSound = useCallback(() => {
    setSoundOn((prev) => {
      const next = !prev;
      const ambient = ambientRef.current;
      if (ambient) {
        if (next) {
          ambient.volume = 0.2;
          ambient.play().catch(() => {});
        } else {
          ambient.pause();
        }
      }
      if (!next) sfxFiredRef.current = false;
      return next;
    });
  }, []);

  return (
    // Root is NOT aria-hidden: it carries the interactive sound toggle + an
    // sr-only description. Only the decorative VISUAL stage is aria-hidden, so
    // no focusable element is ever hidden from assistive tech (WCAG 4.1.2).
    <div ref={rootRef} className="relative z-0 w-full">
      {/* Pinned stage — fixed min-height reserves space → 0 CLS. Decorative. */}
      <div
        ref={stageRef}
        aria-hidden="true"
        className="pointer-events-none relative flex h-[70dvh] min-h-[420px] w-full items-center justify-center overflow-hidden"
      >
        {/* R3F network — decorative background. */}
        <div className="absolute inset-0">
          <NetworkCanvas
            progressRef={progressRef}
            healthRatio={healthRatio}
            reducedMotion={reducedMotion}
            showLabels={showLabels}
            lang={lang}
          />
        </div>

        {/* Soft radial vignette so captions stay legible over the scene. */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.35)_100%)]" />

        {/* Beat captions (cross-faded by scroll). */}
        <div className="relative z-10 px-6 text-center" dir={lang === 'he' ? 'rtl' : 'ltr'}>
          {BEATS.map((b, i) => (
            <div
              key={b.key}
              ref={(el) => {
                captionRefs.current[i] = el;
              }}
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 will-change-[opacity,transform]"
              style={{ opacity: 0 }}
            >
              <p className="mx-auto max-w-2xl text-balance text-xl font-bold text-white drop-shadow-lg sm:text-3xl md:text-4xl">
                {t(b.key)}
              </p>
              {b.key === 'beat3' && (
                <p className="mt-3 text-sm font-medium text-white/70 tabular-nums">
                  {healthRatio !== null ? t('healthLive') : t('healthUnavailable')}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sound toggle — interactive, OUTSIDE the aria-hidden stage. Default OFF. */}
      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={soundOn}
        aria-label={soundOn ? t('soundOff') : t('soundOn')}
        className="absolute bottom-4 end-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/80 backdrop-blur-sm transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        {soundOn ? (
          <Volume2 className="h-5 w-5" aria-hidden="true" />
        ) : (
          <VolumeX className="h-5 w-5" aria-hidden="true" />
        )}
      </button>

      {/* Same-origin audio (never autoplays with sound). preload=none keeps it
          off the LCP/critical path until the user opts in. */}
      <audio ref={ambientRef} src="/audio/network-hum.wav" loop preload="none" />
      <audio ref={sfxRef} src="/audio/connect.wav" preload="none" />

      {/* Screen-reader description of the decorative sequence (not a heading —
          preserves the single H1 in HeroSection). */}
      <span className="sr-only">{t('regionLabel')}</span>
    </div>
  );
}
