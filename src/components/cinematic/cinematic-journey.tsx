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

// Fraction of each anchor SEGMENT over which the outgoing leg dissolves into the
// incoming one. Larger = the swap happens over a longer, calmer stretch of the
// breathing zone (the camera glides between scenes rather than snapping).
const CROSSFADE = 0.32;

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

    // ── Anchor map ───────────────────────────────────────────────────────────
    // Instead of slicing the page into N EQUAL scroll bands (which drifts the
    // caption off its scene because DOM sections are unequal heights), we anchor
    // each scene to the real DOM element that carries data-cj-anchor="<sceneId>".
    // `sceneAt[i]` = the whole-page scroll fraction at which anchor i is centred
    // in the viewport. Scene i is FULLY shown at sceneAt[i]; the stretch between
    // sceneAt[i] and sceneAt[i+1] is the breathing zone where leg i crossfades
    // into leg i+1 and the camera keeps drifting.
    const captionEls = new Map<string, HTMLElement>();
    let sceneAt: number[] = [];

    function measureAnchors() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight || 1;
      const vh = window.innerHeight;
      const next: number[] = [];
      for (let i = 0; i < N; i++) {
        const id = CINEMATIC_SCENES[i]!.id;
        const anchor = root.ownerDocument?.querySelector<HTMLElement>(
          `[data-cj-anchor="${id}"]`,
        );
        if (anchor) {
          const rect = anchor.getBoundingClientRect();
          const centerY = rect.top + window.scrollY + rect.height / 2;
          next[i] = clamp((centerY - vh / 2) / max);
        } else {
          // Fallback to the uniform position if an anchor is missing.
          next[i] = N > 1 ? i / (N - 1) : 0;
        }
        // Cache the caption card for per-caption fade.
        const cap = root.ownerDocument?.querySelector<HTMLElement>(
          `[data-cj-anchor="${id}"] .cj-caption`,
        );
        if (cap) captionEls.set(id, cap);
      }
      // Enforce a strictly-increasing, well-separated sequence so the flight
      // always advances forward even if two anchors measure very close.
      const minGap = 0.02;
      for (let i = 1; i < N; i++) {
        if (next[i]! <= next[i - 1]! + minGap) next[i] = next[i - 1]! + minGap;
      }
      // First anchor pins to 0, last pins to 1 so the whole clip range is used.
      next[0] = 0;
      next[N - 1] = 1;
      for (let i = 1; i < N - 1; i++) next[i] = clamp(next[i]!);
      sceneAt = next;
    }

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

    // Global scroll → per-leg time, ANCHOR-DRIVEN. `p` is the whole-page scroll
    // fraction. We find which anchor segment [sceneAt[seg], sceneAt[seg+1]] `p`
    // falls in, and `frac` = how far through that segment. Scene `seg` holds its
    // frame at the segment start; as `frac` runs 0→1 the camera flies FORWARD out
    // of scene seg and INTO scene seg+1 (both currentTimes advance, crossfading
    // over a breathing dwell) — so alignment follows the real DOM, and there is a
    // quiet drift between captions.
    let ticking = false;
    function read() {
      const doc = document.documentElement;
      const max = (doc.scrollHeight - window.innerHeight) || 1;
      const p = clamp((window.scrollY || window.pageYOffset) / max); // 0..1 whole page

      // Locate the active anchor segment.
      let seg = 0;
      while (seg < N - 2 && p >= sceneAt[seg + 1]!) seg++;
      const a = sceneAt[seg]!;
      const b = sceneAt[seg + 1]!;
      const frac = clamp((p - a) / Math.max(b - a, 1e-4)); // 0..1 within segment
      // Continuous flight position across all legs (0..N-1).
      const flight = seg + frac;
      // Active scene = whichever anchor centre we're nearest — this is what the
      // caption + audio should reflect.
      const active = clamp(Math.round(flight), 0, N - 1);

      // Ease-in-out the crossfade so the swap between legs feels like a camera
      // move settling, not a linear wipe.
      const mix = smooth(frac);

      for (let i = 0; i < N; i++) {
        const leg = legs[i]!;

        // Each leg's own time-fraction. During its own held moment it sits near
        // the end of its forward push (so it reads as "arrived"); while flying
        // toward it, it eases 0→1. Leg i is the OUTGOING leg of segment i and the
        // INCOMING leg of segment i-1.
        let local: number;
        if (i < seg) local = 1; // already flown past
        else if (i > seg + 1) local = 0; // not yet reached
        else if (i === seg) local = mix; // outgoing: 0 (held) → 1 (flying out)
        else local = mix; // i === seg+1, incoming: 0 (arriving) → 1
        leg.target = clamp(local);

        // Opacity: the outgoing leg (seg) fades 1→0 across the breathing zone,
        // the incoming leg (seg+1) fades 0→1. Everyone else is hidden. A little
        // overlap keeps the dissolve smooth (no hard cut, no double-bright).
        let op = 0;
        if (i === seg) op = 1 - smooth((frac - (1 - CROSSFADE)) / CROSSFADE);
        else if (i === seg + 1) op = smooth((frac - (1 - CROSSFADE * 2)) / CROSSFADE);
        if (i === seg && frac < 1 - CROSSFADE) op = 1;
        leg.el.style.opacity = String(clamp(op));
        leg.el.style.zIndex = i === active ? '2' : '1';

        // Lazy-load clips for the active segment and its immediate neighbours.
        if (i >= seg - 1 && i <= seg + 2) loadClip(leg);

        // Poster Ken-Burns drift until the clip paints (keeps it alive, not flat).
        if (!leg.ready && !reduce) {
          const sc = 1.04 + leg.target * 0.1;
          const stillImg = leg.el.querySelector<HTMLElement>('.cj-still');
          if (stillImg) stillImg.style.transform = `scale(${sc.toFixed(3)})`;
        }
      }

      // ── Per-caption fade ──────────────────────────────────────────────────
      // Each caption is readable only while ITS band is near viewport centre, and
      // fully faded during the breathing gaps between scenes → never two on
      // screen at once. Driven by the caption band's own position, independent of
      // the flight, so alignment is exact.
      const vhalf = window.innerHeight / 2;
      captionEls.forEach((cap, id) => {
        const band = cap.parentElement; // the .cj-caption-band with min-height
        if (!band) return;
        const r = band.getBoundingClientRect();
        const bandCenter = r.top + r.height / 2;
        // Distance of the band centre from the viewport centre, normalised by a
        // "reveal window" (half the viewport). 0 = perfectly centred → full copy.
        const d = Math.abs(bandCenter - vhalf) / (window.innerHeight * 0.62);
        const v = reduce ? 1 : clamp(1 - d);
        cap.style.setProperty('--cj-cap', v.toFixed(3));
        void id;
      });

      // AUDIO HOOK: dispatch on active-scene change so the Web-Audio bed can
      // crossfade/duck stems per scene without touching this engine. `frac` and
      // `seg` are also handed over for finer per-segment ducking if wanted.
      if (active !== lastActive) {
        lastActive = active;
        root.dispatchEvent(
          new CustomEvent('cj:scene', {
            detail: { index: active, id: CINEMATIC_SCENES[active]!.id, seg, frac },
          }),
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

    // Reduced motion: paint the first poster, hold every caption fully visible,
    // and stop. No video, no scrub, no drift.
    if (reduce) {
      measureAnchors();
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
    const remeasure = () => {
      measureAnchors();
      read();
    };
    const onResize = () => {
      if (coarse && window.innerWidth === laidOutW) return;
      laidOutW = window.innerWidth;
      remeasure();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', remeasure);
    window.addEventListener('pointerdown', onFirstGesture, { once: true, passive: true });
    window.addEventListener('touchstart', onFirstGesture, { once: true, passive: true });
    window.addEventListener('load', remeasure);

    // Anchor positions depend on the full page having laid out (images, fonts,
    // below-fold sections). Measure now, again on the next frame, and once more
    // after web-fonts settle + all lazy sections mount. A ResizeObserver on the
    // document keeps `sceneAt` correct if content height changes later.
    measureAnchors();
    const ro = new ResizeObserver(() => remeasure());
    ro.observe(document.documentElement);
    const t1 = window.setTimeout(remeasure, 250);
    const t2 = window.setTimeout(remeasure, 1200);

    let rafId = requestAnimationFrame(raf);
    read();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', remeasure);
      window.removeEventListener('load', remeasure);
      ro.disconnect();
      window.clearTimeout(t1);
      window.clearTimeout(t2);
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
