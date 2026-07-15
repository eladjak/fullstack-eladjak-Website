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
 *    centered violet glow), so a short cross-dissolve at each seam reads as one
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

// Half-width (in flight-units, where 1 unit = one anchor→anchor leg) of the
// cross-dissolve centred on every seam. The outgoing leg fades out and the
// incoming leg fades in over the window [anchor - OVERLAP, anchor + OVERLAP], so
// the swap straddles the seam symmetrically and the two clips are frame-continuous
// through it — no hard cut, no double-bright flash. 0.5 = the fade spans the whole
// half-leg on each side (very gentle); smaller = a tighter, snappier dissolve.
const OVERLAP = 0.42;

// ── CAMERA INTENSITY — the single dial for the whole cinematic feel ──────────
// One master knob (0 = flat/static, 1 = the shipped film-grade look, >1 = even
// more dramatic). It scales EVERY camera move below in lockstep — the per-scene
// dolly (zoom-in / zoom-out), the depth parallax between video/still/scrim
// layers, the focus-pull blur on entering legs, and the seam bloom. To make the
// journey more (or less) cinematic, change ONLY this number. 1.0 is the tuned
// default; try 1.25 for "more film", 0.7 for "calmer".
const CAM_INTENSITY = 1;

// Per-scene dolly direction: +1 = the camera pushes IN (zoom-in) across the leg,
// −1 = it pulls OUT (zoom-out). Alternating in/out from scene to scene is what
// makes it read as a camera genuinely MOVING THROUGH space — plunging into the
// core, drifting back to reveal the fleet, diving into the projects, and so on —
// rather than one monotonous endless push. Length matches CINEMATIC_SCENES.
const DOLLY_DIR = [1, -1, 1, -1, 1, -1];

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
    // A soft, C1-continuous fade curve for the seam cross-dissolve. Unlike a hard
    // smoothstep applied per-segment (which forces the camera to a full stop at
    // every anchor → the "settle then jump" feel), we drive the flight with a
    // single continuous position and only shape OPACITY with this cosine ease, so
    // brightness never pops but the motion keeps gliding through the seam.
    const cosFade = (x: number) => 0.5 - 0.5 * Math.cos(clamp(x) * Math.PI);
    // Weighty, non-linear camera easing (easeInOutCubic). Feeding the leg's
    // within-fraction through this before it drives the dolly gives the camera
    // INERTIA — it accelerates into the scene and settles as it arrives, instead
    // of tracking scroll 1:1 (which felt mechanical/linear). Used only for the
    // camera transform, never for the opacity crossfade (that stays cosine so the
    // brightness math is untouched — no black-flash regression).
    const easeInOutCubic = (x: number) => {
      const t = clamp(x);
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
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
        // Mark ready; the rAF loop picks it up next frame and seeks to the eased
        // target — no explicit render call needed (the loop is always running).
        leg.ready = true;
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

    // ── Global eased scroll — the SINGLE source of truth ─────────────────────
    // `pRaw` is the raw whole-page scroll fraction (0..1), updated on every scroll
    // event. `pEased` is a critically-damped follower of it, advanced once per
    // frame in raf(). EVERYTHING downstream — flight position, per-leg time,
    // opacity crossfade, captions, audio — reads `pEased`, so the whole scene
    // moves as ONE eased quantity. This is the core of the "glide, don't jump"
    // fix: a jerky wheel/trackpad flick no longer maps 1:1 onto the visuals; it
    // decays smoothly into the flight. (Previously only per-leg currentTime was
    // damped while opacity + captions + segment selection read raw scroll, so the
    // three desynced and popped at seams.)
    let pRaw = 0;
    let pEased = 0;
    let primed = false; // snap pEased to pRaw on first read so we don't animate in

    function readScroll() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight || 1;
      pRaw = clamp((window.scrollY || window.pageYOffset) / max);
    }

    // Map an eased whole-page fraction to a CONTINUOUS flight position in [0, N-1].
    // We locate the anchor segment `p` sits in and add the within-segment fraction,
    // giving a single monotonic scalar `flight` that increases smoothly with scroll
    // and has NO discontinuity as it crosses an anchor.
    function flightFromP(p: number) {
      let seg = 0;
      while (seg < N - 2 && p >= sceneAt[seg + 1]!) seg++;
      const a = sceneAt[seg]!;
      const b = sceneAt[seg + 1]!;
      const frac = clamp((p - a) / Math.max(b - a, 1e-4));
      return seg + frac; // 0 .. N-1, continuous
    }

    // ── applyCamera — the per-leg cinematic camera pose ─────────────────────
    // Given a visible leg, its scene index, and `w` (the leg's own progress across
    // its band; clamped to 0..1 inside, so passing the raw base/next values keeps
    // the pair continuous through the seam), this sets a layered transform on the
    // leg that reads as a moving film camera:
    //
    //   • DOLLY (scale): a strong zoom that eases in/out per scene direction. The
    //     magnitude is CAM_INTENSITY-scaled; the phase uses easeInOutCubic so the
    //     move has weight (accelerate, settle) rather than a linear crawl.
    //   • PAN/TILT (translate): a slow vertical + horizontal drift that never
    //     stops, so even while the scrubbed video frame is held during a dwell the
    //     camera keeps breathing — no frozen snap between scenes.
    //   • FOCUS PULL (blur): a brief soft-focus as a leg ENTERS, snapping sharp as
    //     it arrives — the classic "rack focus" that makes footage feel alive.
    //   • DEPTH: the video layer scales a touch MORE than the still under it, so
    //     the two planes separate → parallax depth instead of a flat image.
    //
    // All transform/opacity/filter — GPU-composited, no layout. Mobile trims the
    // blur (cheapest to drop) and eases the magnitudes so it stays smooth on phones.
    function applyCamera(leg: LegState, sceneIdx: number, w: number, mobile: boolean) {
      const k = CAM_INTENSITY * (mobile ? 0.72 : 1);
      // `within` for THIS leg: how far it has travelled across its own band, 0..1.
      const within = clamp(w);
      const eased = easeInOutCubic(within);
      const dir = DOLLY_DIR[sceneIdx] ?? 1;

      // DOLLY. Base zoom 1.06 keeps the object-cover crop clean at the extremes.
      // A ±0.14 travel (×k) is a big, filmic push/pull — far more than the old
      // 0.03. Direction flips per scene so the camera dives in then drifts out.
      const zoom = 0.14 * k;
      const scaleLeg = 1.06 + (dir > 0 ? eased : 1 - eased) * zoom;

      // PAN + TILT. Slow, always-moving drift; a gentle horizontal component adds
      // a "steadicam" wander. Amounts are viewport-independent px.
      const tiltY = (eased - 0.5) * 26 * k * dir; // vertical dolly-tilt
      const panX = Math.sin(within * Math.PI) * 8 * k * dir; // subtle side wander

      leg.el.style.transform = `translate3d(${panX.toFixed(2)}px, ${tiltY.toFixed(2)}px, 0) scale(${scaleLeg.toFixed(4)})`;

      // FOCUS PULL: soft only in the first ~30% of a leg's entrance, then crisp.
      // Skipped on mobile (blur is the most expensive filter on low-end GPUs).
      const v = leg.video;
      if (!mobile) {
        const focus = clamp(1 - within / 0.32); // 1 at entry → 0 by 32% in
        const blur = focus * focus * 3 * CAM_INTENSITY; // px, eased to 0
        leg.el.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : '';
      }

      // DEPTH: the video plane scales slightly beyond the leg so it reads as the
      // far world moving faster than the graded foreground. Applied to the video
      // element itself (the still keeps the leg's own scale).
      if (v) {
        const depth = 1 + (dir > 0 ? eased : 1 - eased) * 0.05 * k;
        v.style.transform = `scale(${depth.toFixed(4)})`;
      }
    }

    // Render one frame from the current eased scroll. Pure function of `pEased`:
    // no reads of live scroll here, so the visuals can never race ahead of the
    // damped value (which is what caused the pops).
    let lastActive = -1;
    let completed = false;
    function render() {
      const flight = flightFromP(pEased); // continuous 0..N-1
      const active = clamp(Math.round(flight), 0, N - 1);

      // ── Per-leg time + zIndex + lazy-load + Ken-Burns (NOT opacity) ──────────
      // Opacity is owned entirely by the seam-dissolve block below, so exactly two
      // legs ever share a transition and their opacities sum to 1.
      for (let i = 0; i < N; i++) {
        const leg = legs[i]!;

        // Per-leg time: MONOTONE, never rewinds at a seam. Leg i plays its forward
        // push as the flight travels from anchor (i-1) to anchor i, i.e.
        // target = clamp(flight - (i-1)). Once the flight is at/past anchor i, leg
        // i HOLDS at 1 (arrived) — it is not reset to 0 when it later becomes the
        // "outgoing" leg of the next seam. Legs ahead sit at 0 (not yet reached).
        // This removes the currentTime snap-back that made the camera visibly
        // reverse/reset at every scene boundary — the #1 source of the "jump".
        leg.target = clamp(flight - (i - 1));
        leg.el.style.zIndex = i === active ? '2' : '1';

        if (i >= active - 2 && i <= active + 2) loadClip(leg);

        if (!leg.ready && !reduce) {
          // Ken-Burns drift on the still: scale tracks the eased leg time so the
          // poster keeps drifting smoothly (no snap) until the clip paints.
          const sc = 1.04 + clamp(leg.cur) * 0.1;
          const stillImg = leg.el.querySelector<HTMLElement>('.cj-still');
          if (stillImg) stillImg.style.transform = `scale(${sc.toFixed(3)})`;
        }
      }

      // ── Seam cross-dissolve (owns ALL leg opacity) ───────────────────────────
      // Only the two legs adjacent to the current flight position are ever visible;
      // everything else is 0. `base` = floor(flight), `within` = 0..1 across the
      // leg base→base+1. The dissolve runs over the LAST `OVERLAP` fraction of each
      // leg (from within = 1-OVERLAP up to the anchor at within = 1): before it the
      // base leg is solid (the scene "dwells"), inside it we cosine-blend base→next
      // so by the time the flight reaches the next anchor the next leg is fully
      // shown. It is continuous across the seam: at within→1⁻ f→1 (next leg solid),
      // and the instant `base` advances, within→0⁺ with f→0 on the new pair, and
      // the new base IS that same next leg still at full opacity. Opacities are
      // `1-f` and `f` so they always sum to 1 → the frame never darkens (no black
      // flash) and never double-brightens; cosFade is C1-continuous so brightness
      // has no velocity discontinuity through the transition.
      for (let i = 0; i < N; i++) {
        legs[i]!.el.style.opacity = '0';
        // Shed any lingering focus-pull blur on hidden legs so a leg re-enters
        // crisp and the compositor isn't holding an off-screen blur filter.
        if (legs[i]!.el.style.filter) legs[i]!.el.style.filter = '';
      }
      const base = clamp(Math.floor(flight), 0, N - 1);
      const nextLeg = clamp(base + 1, 0, N - 1);
      const within = flight - base; // 0..1 across leg base→base+1
      const seamStart = 1 - OVERLAP; // start dissolving toward the next leg here
      const f = within <= seamStart ? 0 : cosFade((within - seamStart) / OVERLAP);
      legs[base]!.el.style.opacity = String(clamp(1 - f));
      legs[nextLeg]!.el.style.opacity = String(clamp(f));

      // ── Cinematic camera: per-scene dolly + layered depth parallax ──────────
      // This is the heart of the "camera moving through space" feel. For each of
      // the two visible legs we compute a full camera pose from its own eased
      // within-fraction and its scene's dolly direction, then apply DIFFERENT
      // amounts of that pose to the layers inside the leg (video vs still vs
      // scrim) so foreground and background move at different rates — real depth,
      // not a flat pan. Everything scales by CAM_INTENSITY and is transform-only
      // (GPU compositing, zero layout thrash). The opacity crossfade above is
      // untouched, so the smooth seam dissolve does not regress.
      if (!reduce) {
        // Both visible legs get a camera pose from their OWN within-fraction. The
        // base leg is travelling across ITS band → within (0..1). The next leg is
        // still one band behind → its own progress is within − 1 (i.e. it sits in
        // the tail of its entrance while the base finishes), which we pass so the
        // pair's motion is continuous as `base` advances at the seam.
        applyCamera(legs[base]!, base, within, isMobile());
        applyCamera(legs[nextLeg]!, nextLeg, within - 1, isMobile());

        // Depth parallax on the shared scrim/vignette: it counter-drifts a hair
        // against the flight, so the "lens" (foreground grade) and the "world"
        // (background footage) separate — a subtle but unmistakable 3D read. Also
        // a gentle brand-purple bloom that swells at each seam (peaks mid-dissolve)
        // so passing a scene boundary feels like flying through a glow, not a cut.
        const scrim = root.querySelector<HTMLElement>('.cj-scrim');
        if (scrim) {
          const par = (within - 0.5) * 10 * CAM_INTENSITY; // px, counter to legs
          scrim.style.transform = `translate3d(0, ${(-par).toFixed(2)}px, 0) scale(1.02)`;
          // f (0..1) already measures how deep we are into the seam dissolve.
          const bloom = cosFade(f) * 0.5 * CAM_INTENSITY; // 0 mid-scene → up at seam
          scrim.style.setProperty('--cj-bloom', bloom.toFixed(3));
        }
      }

      // ── Per-caption fade (driven by eased flight, not raw scroll) ────────────
      // Each caption is readable only while ITS band is near viewport centre and
      // fully faded in the breathing gaps → never two captions on screen at once.
      // We still measure the band's live position (so alignment is exact to the
      // DOM) but smooth the resulting value so it can't flicker on a jerky wheel.
      const vhalf = window.innerHeight / 2;
      captionEls.forEach((cap, id) => {
        const band = cap.parentElement;
        if (!band) return;
        const r = band.getBoundingClientRect();
        const bandCenter = r.top + r.height / 2;
        const dist = Math.abs(bandCenter - vhalf) / (window.innerHeight * 0.62);
        const targetV = reduce ? 1 : clamp(1 - dist);
        const prev = parseFloat(cap.dataset.capv || String(targetV));
        // One-pole smoothing so the copy fades in/out like a slow reveal, never a
        // stutter tied to individual scroll deltas.
        const v = reduce ? 1 : prev + (targetV - prev) * 0.22;
        cap.dataset.capv = v.toFixed(3);
        cap.style.setProperty('--cj-cap', v.toFixed(3));
        void id;
      });

      // AUDIO HOOK: same contract as before — dispatch on active-scene change only.
      if (active !== lastActive) {
        lastActive = active;
        root.dispatchEvent(
          new CustomEvent('cj:scene', {
            detail: {
              index: active,
              id: CINEMATIC_SCENES[active]!.id,
              seg: base,
              frac: within,
            },
          }),
        );
      }

      // AUDIO HOOK 2: the journey COMPLETES when the eased flight fully arrives
      // at the last anchor (the gate/CTA). Fired once per mount — the audio
      // layer answers with a soft arrival chime (if the user has sound on).
      if (!completed && flight >= N - 1 - 0.02) {
        completed = true;
        root.dispatchEvent(new CustomEvent('cj:complete'));
      }
    }

    // rAF loop: (1) advance the eased scroll toward the raw target, (2) render one
    // frame from it, (3) ease each leg's currentTime toward its (monotone) target
    // and commit the seek. All motion flows from `pEased`, so nothing can jump.
    function raf() {
      readScroll();
      if (!primed) {
        pEased = pRaw;
        primed = true;
      }
      // Critically-damped follow. On desktop a gentler factor = a longer, smoother
      // glide; on touch a touch faster so it still feels responsive to a flick.
      const follow = reduce ? 1 : isMobile() ? 0.14 : 0.1;
      pEased += (pRaw - pEased) * follow;
      // Snap when essentially arrived so we don't idle-seek forever.
      if (Math.abs(pRaw - pEased) < 1e-4) pEased = pRaw;

      render();

      const eps = isMobile() ? 0.02 : 0.006;
      for (let i = 0; i < N; i++) {
        const leg = legs[i]!;
        const v = leg.video;
        // Ease the poster/still even before the clip is ready (used for Ken-Burns).
        leg.cur += (leg.target - leg.cur) * (reduce ? 1 : 0.22);
        if (!leg.ready || !v) continue;
        if (v.seeking) continue;
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

    // Reduced motion: paint the first poster, hold every caption fully visible
    // (the CSS media query forces --cj-cap:1), and stop. No video, no scrub, no
    // drift, no rAF loop.
    if (reduce) {
      measureAnchors();
      legs[0]!.el.style.opacity = '1';
      return () => {
        /* nothing spun up */
      };
    }

    // The rAF loop samples scroll itself and renders every frame, so we no longer
    // need a scroll handler to trigger renders — we just remeasure anchors when
    // the layout could have changed (resize / orientation / late content).
    let laidOutW = window.innerWidth;
    const remeasure = () => {
      measureAnchors();
    };
    const onResize = () => {
      if (coarse && window.innerWidth === laidOutW) return;
      laidOutW = window.innerWidth;
      remeasure();
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', remeasure);
    window.addEventListener('pointerdown', onFirstGesture, { once: true, passive: true });
    window.addEventListener('touchstart', onFirstGesture, { once: true, passive: true });
    window.addEventListener('load', remeasure);

    // Anchor positions depend on the full page having laid out (images, fonts,
    // below-fold sections). Measure now, again shortly after, and once more after
    // web-fonts settle + all lazy sections mount. A ResizeObserver on the document
    // keeps `sceneAt` correct if content height changes later.
    measureAnchors();
    const ro = new ResizeObserver(() => remeasure());
    ro.observe(document.documentElement);
    const t1 = window.setTimeout(remeasure, 250);
    const t2 = window.setTimeout(remeasure, 1200);

    // Prime the eased scroll to the current position so we don't animate in from 0.
    readScroll();
    pEased = pRaw;
    primed = true;
    let rafId = requestAnimationFrame(raf);

    return () => {
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
