'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';

/**
 * Hero media for /lectures: an illustrated stage (poster) under a code-drawn
 * spotlight. When the opening film exists (`video` prop, decided at build time by
 * next.config.js checking public/videos/), it loads lazily over the poster:
 * muted autoplay with captions, a play/pause and a sound button, and a transcript.
 * Reduced motion: nothing loads or plays until the visitor presses play; the
 * poster stays as the still fallback.
 */

export interface HeroVideo {
  mp4: string;
  webm?: string;
  captions: string;
  captionsLang: string;
  captionsLabel: string;
}

export interface HeroMediaLabels {
  play: string;
  pause: string;
  soundOn: string;
  soundOff: string;
  filmLabel: string;
  transcript: string;
}

const ctrl =
  'inline-flex size-11 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition-transform duration-150 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none';

export function HeroMedia({
  poster,
  posterAlt,
  video,
  labels,
  transcript,
  slotNote,
}: {
  poster: string;
  posterAlt: string;
  video: HeroVideo | null;
  labels: HeroMediaLabels;
  /** Plain-text lines of what is said, shown under the film. */
  transcript: string[];
  /** Shown only in previews when no film exists yet. */
  slotNote: string | null;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const wantPlay = useRef(false);

  // Lazy: attach the source only when the frame is near the viewport, and only
  // when the visitor has not asked for reduced motion.
  useEffect(() => {
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    wantPlay.current = true;
    const el = boxRef.current;
    if (!el || !('IntersectionObserver' in window)) {
      setLoad(true);
      return;
    }
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [video]);

  useEffect(() => {
    const v = ref.current;
    if (!load || !v || !wantPlay.current) return;
    v.play().then(
      () => setPlaying(true),
      () => setPlaying(false),
    );
  }, [load]);

  const toggle = () => {
    if (!load) {
      wantPlay.current = true;
      setLoad(true);
      return;
    }
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );
    } else {
      v.pause();
    }
  };

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <div>
      <div ref={boxRef} className="lec-stage relative overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]">
        <div className="relative aspect-[3/2]">
          <Image src={poster} alt={posterAlt} fill priority sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
          {/* code-drawn spotlight: a soft warm pool that settles on the speaker once */}
          <span className="lec-spot pointer-events-none absolute inset-0" aria-hidden="true" />
          {video && load && (
            <video
              ref={ref}
              className="absolute inset-0 size-full object-cover"
              poster={poster}
              muted
              playsInline
              loop
              preload="metadata"
              aria-label={labels.filmLabel}
              onPause={() => setPlaying(false)}
              onPlay={() => setPlaying(true)}
            >
              {video.webm && <source src={video.webm} type="video/webm" />}
              <source src={video.mp4} type="video/mp4" />
              <track kind="captions" src={video.captions} srcLang={video.captionsLang} label={video.captionsLabel} default />
            </video>
          )}
        </div>
        {video && (
          <div className="absolute top-3 end-3 flex gap-2">
            {load && (
              <button type="button" onClick={toggleSound} aria-label={muted ? labels.soundOn : labels.soundOff} aria-pressed={!muted} className={ctrl}>
                {muted ? <VolumeX className="size-5" aria-hidden="true" /> : <Volume2 className="size-5" aria-hidden="true" />}
              </button>
            )}
            <button type="button" onClick={toggle} aria-label={playing ? labels.pause : labels.play} className={ctrl}>
              {playing ? <Pause className="size-5" aria-hidden="true" /> : <Play className="size-5" aria-hidden="true" />}
            </button>
          </div>
        )}
        {!video && slotNote && (
          <p className="absolute start-3 end-3 bottom-3 rounded-xl border border-dashed lec-cta-edge bg-black/65 px-3 py-2 text-sm font-medium text-white">
            {slotNote}
          </p>
        )}
      </div>
      {video && transcript.length > 0 && (
        <details className="mt-3 text-sm text-muted-foreground">
          <summary className="inline-flex min-h-11 cursor-pointer items-center font-medium hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
            {labels.transcript}
          </summary>
          <div className="mt-2 space-y-1 leading-[1.7]">
            {transcript.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
