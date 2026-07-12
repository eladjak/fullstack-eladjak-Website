'use client';

import { useEffect, useRef } from 'react';

/**
 * CinematicJourney — the full-page cinematic scroll backdrop.
 *
 * A FIXED, full-viewport video layer that sits at z-0 BEHIND the entire page.
 * As the visitor scrolls the document, one continuous "camera flight" through a
 * dark cosmic world (6 pre-rendered legs) is scrubbed by scroll position — no
 * cuts, a single connected journey. The real SSR page content (Hero, sections,
 * FAQ) renders on top at a higher z-index and stays fully readable; a per-scene
 * scrim keeps text legible over any frame.
 *
 * WHY a fixed backdrop instead of a pinned GSAP stage:
 *  - The real content never leaves normal document flow → 0 layout risk, single
 *    H1 / JSON-LD / FAQ fallback all stay in SSR DOM untouched.
 *  - Scroll only drives video time; the camera genuinely moves. Text dwells
 *    because each section's min-height gives the matching leg a long scroll band.
 *
 * SEAM MODEL (scroll-world method, architecture A):
 *  - 6 legs, each a slow FORWARD flight into its arted scene (gpt-image-2 still
 *    → fal Seedance/Kling i2v). Consecutive legs share composition (dark space +
 *    centered rose glow), so a short cross-dissolve at each seam reads as one
 *    continuous flight with no pop.
 *  - Blob-seek: each clip is fetched as a Blob and played from an object URL, so
 *    it is always fully seekable regardless of HTTP byte-range support.
 *
 * GUARDRAILS:
 *  - Rendered client-only (ssr:false via the lazy mount) — bundle never touches
 *    SSR HTML or the LCP path. Poster stills paint instantly.
 *  - prefers-reduced-motion → NO video, NO scrub: a single static poster stays.
 *  - transform/opacity only; the layer is position:fixed so it causes 0 CLS.
 *  - Audio: NONE yet (silent). Scene markers below are the hook for a future
 *    layered audio bed (see AUDIO HOOK note).
 */

// ── Scene manifest ──────────────────────────────────────────────────────────
// One entry per leg, in flight order. `id` anchors the copy sections in the DOM
// (each real page section carries data-scene="<id>") so the engine can align the
// active leg to what the visitor is reading. `accent` future-proofs per-scene
// theming; the flight's colour comes from the clips themselves.
interface Scene {
  id: string;
  clip: string;
  clipMobile: string;
  still: string;
}

const BASE = '/videos/cinematic';
export const CINEMATIC_SCENES: Scene[] = [
  { id: 'approach', clip: `${BASE}/scene1.mp4`, clipMobile: `${BASE}/scene1-m.mp4`, still: `${BASE}/scene1.webp` },
  { id: 'core', clip: `${BASE}/scene2.mp4`, clipMobile: `${BASE}/scene2-m.mp4`, still: `${BASE}/scene2.webp` },
  { id: 'fleet', clip: `${BASE}/scene3.mp4`, clipMobile: `${BASE}/scene3-m.mp4`, still: `${BASE}/scene3.webp` },
  { id: 'projects', clip: `${BASE}/scene4.mp4`, clipMobile: `${BASE}/scene4-m.mp4`, still: `${BASE}/scene4.webp` },
  { id: 'trust', clip: `${BASE}/scene5.mp4`, clipMobile: `${BASE}/scene5-m.mp4`, still: `${BASE}/scene5.webp` },
  { id: 'gate', clip: `${BASE}/scene6.mp4`, clipMobile: `${BASE}/scene6-m.mp4`, still: `${BASE}/scene6.webp` },
];

// Fraction of the seam-band over which two neighbouring legs cross-dissolve.
const CROSSFADE = 0.14;

interface LegState {
  scene: Scene;
  el: HTMLDivElement;
  video: HTMLVideoElement | null;
  loading: boolean;
  ready: boolean;
  cur: number; // eased current time-fraction (0..1)
  target: number; // scroll-driven target time-fraction (0..1)
}

export default function CinematicJourney() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const smallMQ = window.matchMedia('(max-width: 860px)');
    const isMobile = () => coarse || smallMQ.matches;

    const N = CINEMATIC_SCENES.length;
    const legEls = Array.from(root.querySelectorAll<HTMLDivElement>('[data-leg]'));
    const legs: LegState[] = CINEMATIC_SCENES.map(
      (scene, i): LegState => ({
        scene,
        el: legEls[i]!,
        video: null,
        loading: false,
        ready: false,
        cur: 0,
        target: 0,
      }),
    );

    const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
    const smooth = (x: number) => {
      const c = clamp(x);
      return c * c * (3 - 2 * c);
    };

    // Under reduced motion we never load a video — the first poster stays put.
    //
    // We load each clip via a DIRECT same-origin URL (not a blob object URL).
    // Scroll-scrubbing needs the source to be seekable, which requires the host
    // to serve HTTP byte-range (206) requests — Next.js dev AND Vercel both do,
    // verified. A direct <source> is lighter than holding a full Blob in RAM and
    // sidesteps the browser "blob media URL safety" rejection. `media-src 'self'`
    // in the CSP already permits it.
    function loadClip(leg: LegState) {
      if (reduce || leg.loading || leg.video) return;
      leg.loading = true;
      const url = isMobile() && leg.scene.clipMobile ? leg.scene.clipMobile : leg.scene.clip;
      const v = document.createElement('video');
      v.className = 'cj-video';
      v.muted = true;
      v.playsInline = true;
      v.preload = 'auto';
      v.setAttribute('muted', '');
      v.setAttribute('playsinline', '');
      v.addEventListener('loadedmetadata', () => {
        leg.ready = true;
        read();
      });
      // Only reveal the video (hide the poster) once a real frame paints — iOS
      // keeps a seeked-but-never-played muted video blank otherwise.
      v.addEventListener(
        'seeked',
        () => {
          leg.el.classList.add('cj-has-clip');
        },
        { once: true },
      );
      v.addEventListener('loadeddata', () => {
        try {
          v.pause();
        } catch {
          /* noop */
        }
        if (userReady) primeVideo(v);
      });
      v.addEventListener('error', () => {
        // Leave the poster in place if a clip fails to load — never a black hole.
        leg.loading = false;
      });
      v.src = url;
      leg.el.appendChild(v);
      leg.video = v;
    }

    // Global scroll → per-leg time. The document is divided into N equal bands
    // by scroll fraction; band i scrubs leg i from 0→1. A crossfade at each seam
    // dissolves leg i's tail into leg i+1's head.
    let ticking = false;
    function read() {
      const doc = document.documentElement;
      const max = (doc.scrollHeight - window.innerHeight) || 1;
      const p = clamp((window.scrollY || window.pageYOffset) / max); // 0..1 whole page
      const bandF = p * N; // 0..N
      const active = clamp(Math.floor(bandF), 0, N - 1);

      for (let i = 0; i < N; i++) {
        const leg = legs[i]!;
        const local = clamp(bandF - i, 0, 1); // this leg's own 0..1 time
        leg.target = local;

        // Opacity: full while this band is active; cross-dissolve into the next
        // over the last CROSSFADE of the band and out of the previous over the
        // first CROSSFADE. Everything else 0.
        let op = 0;
        const dist = bandF - i; // <0 before, 0..1 during, >1 after
        if (dist >= -CROSSFADE && dist <= 1 + CROSSFADE) {
          if (dist < 0) op = smooth(1 + dist / CROSSFADE);
          else if (dist > 1) op = smooth(1 - (dist - 1) / CROSSFADE);
          else op = 1;
        }
        leg.el.style.opacity = String(op);
        leg.el.style.zIndex = i === active ? '2' : '1';

        // Lazy-load clips near the viewport band.
        if (dist > -1.4 && dist < 1.4) loadClip(leg);

        // Poster Ken-Burns drift until the clip paints (keeps it alive, not flat).
        if (!leg.ready && !reduce) {
          const sc = 1.04 + local * 0.1;
          const stillImg = leg.el.querySelector<HTMLElement>('.cj-still');
          if (stillImg) stillImg.style.transform = `scale(${sc.toFixed(3)})`;
        }
      }

      // AUDIO HOOK: `active` + `bandF` are exactly the signals a future audio bed
      // needs — dispatch a scene-change event here so a Web-Audio layer can
      // crossfade stems per scene without touching this engine.
      if (active !== lastActive) {
        lastActive = active;
        root.dispatchEvent(
          new CustomEvent('cj:scene', { detail: { index: active, id: CINEMATIC_SCENES[active]!.id } }),
        );
      }

      ticking = false;
    }

    let lastActive = -1;

    // rAF loop: ease each leg's currentTime toward its scroll target. Never queue
    // a seek while the decoder is still seeking (stops fast-flick pileups on phones).
    function raf() {
      const eps = isMobile() ? 0.02 : 0.008;
      for (let i = 0; i < N; i++) {
        const leg = legs[i]!;
        const v = leg.video;
        if (!leg.ready || !v) continue;
        if (v.seeking) continue;
        leg.cur += (leg.target - leg.cur) * (reduce ? 1 : 0.18);
        const dur = v.duration || 1;
        const t = clamp(leg.cur, 0, 0.999) * dur;
        if (Math.abs(v.currentTime - t) > eps) {
          try {
            v.currentTime = t;
          } catch {
            /* noop */
          }
        }
      }
      rafId = requestAnimationFrame(raf);
    }

    // iOS: a muted video needs a user gesture before it will decode/paint.
    let userReady = false;
    function primeVideo(v: HTMLVideoElement) {
      if (!isMobile()) return;
      try {
        const pr = v.play();
        if (pr && pr.then)
          pr.then(() => {
            try {
              v.pause();
            } catch {
              /* noop */
            }
          }).catch(() => {});
      } catch {
        /* noop */
      }
    }
    function onFirstGesture() {
      if (userReady) return;
      userReady = true;
      legs.forEach((l) => l.video && primeVideo(l.video));
    }

    // Reduced motion: paint the first poster and stop. No video, no scrub.
    if (reduce) {
      legs[0]!.el.style.opacity = '1';
      read();
      return () => {
        /* nothing spun up */
      };
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(read);
      }
    };
    // Ignore URL-bar-only height changes on touch (they'd yank the scrub).
    let laidOutW = window.innerWidth;
    const onResize = () => {
      if (coarse && window.innerWidth === laidOutW) return;
      laidOutW = window.innerWidth;
      read();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', read);
    window.addEventListener('pointerdown', onFirstGesture, { once: true, passive: true });
    window.addEventListener('touchstart', onFirstGesture, { once: true, passive: true });
    window.addEventListener('load', read);

    let rafId = requestAnimationFrame(raf);
    read();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', read);
      window.removeEventListener('load', read);
      cancelAnimationFrame(rafId);
      // Free the video elements on route change (direct src → no blob to revoke).
      legs.forEach((l) => {
        if (l.video) {
          try {
            l.video.removeAttribute('src');
            l.video.load();
          } catch {
            /* noop */
          }
          l.video.remove();
        }
      });
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="cj-root pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#05060a]"
    >
      {CINEMATIC_SCENES.map((scene, i) => (
        <div
          key={scene.id}
          data-leg={scene.id}
          className="cj-leg absolute inset-0"
          style={{ opacity: i === 0 ? 1 : 0 }}
        >
          {/* Poster paints instantly (LCP-safe); the video reveals over it once a
              real frame is decoded. object-cover fills the viewport. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={scene.still}
            alt=""
            className="cj-still absolute inset-0 h-full w-full object-cover"
            decoding="async"
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : 'auto'}
          />
        </div>
      ))}
      {/* Global darkening + vignette so overlaid page text stays legible over any
          frame. Kept subtle — the flight must still read as cinematic. */}
      <div className="cj-scrim pointer-events-none absolute inset-0" />
    </div>
  );
}
