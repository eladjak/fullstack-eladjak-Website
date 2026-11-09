'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import styles from './theme-toggle.module.css';

/**
 * Moon/Sun orb toggle: edge-lit glass track, draggable thumb, sun<->moon morph.
 * Pure SVG + CSS (transform/opacity only). No WebGL, no canvas, no new deps.
 * Light = inline-start, Dark = inline-end (mirrors automatically in RTL).
 */

const TRACK = 64; // px, visual track width
const THUMB = 28; // px
const PAD = 4;
const TRAVEL = TRACK - THUMB - PAD * 2; // 28px

const LABELS: Record<string, { toDark: string; toLight: string }> = {
  he: { toDark: 'מעבר למצב כהה', toLight: 'מעבר למצב בהיר' },
  en: { toDark: 'Switch to dark mode', toLight: 'Switch to light mode' },
};

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState('he');
  const [rtl, setRtl] = useState(true);
  const [dragX, setDragX] = useState<number | null>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const btnRef = useRef<HTMLButtonElement>(null);
  const drag = useRef<{ startX: number; moved: boolean; id: number } | null>(null);

  useEffect(() => {
    setMounted(true);
    const root = document.documentElement;
    setLang(root.lang?.startsWith('en') ? 'en' : 'he');
    setRtl(root.dir === 'rtl');
  }, []);

  const isDark = resolvedTheme === 'dark';

  const apply = useCallback(
    (next: 'dark' | 'light') => {
      const btn = btnRef.current;
      const reduce =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const doc = document as Document & {
        startViewTransition?: (cb: () => void) => { ready: Promise<void> };
      };

      if (btn && !reduce && doc.startViewTransition) {
        const rect = btn.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        const endRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );
        const transition = doc.startViewTransition(() => setTheme(next));
        transition.ready
          .then(() => {
            document.documentElement.animate(
              {
                clipPath: [
                  `circle(0px at ${x}px ${y}px)`,
                  `circle(${endRadius}px at ${x}px ${y}px)`,
                ],
              },
              { duration: 450, easing: 'ease-out', pseudoElement: '::view-transition-new(root)' }
            );
          })
          .catch((): void => undefined);
        return;
      }
      setTheme(next);
    },
    [setTheme]
  );

  const toggle = useCallback(() => apply(isDark ? 'light' : 'dark'), [apply, isDark]);

  // Edge light follows the pointer (hover-capable devices only; CSS gates it)
  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const el = btnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--lx', `${((e.clientX - r.left) / r.width) * 100}%`);

    const d = drag.current;
    if (d && d.id === e.pointerId) {
      const dx = e.clientX - d.startX;
      if (Math.abs(dx) > 4) d.moved = true;
      if (d.moved) {
        // logical direction: dark is inline-end
        const logical = rtl ? -dx : dx;
        const base = isDark ? TRAVEL : 0;
        setDragX(Math.max(0, Math.min(TRAVEL, base + logical)));
      }
    }
  };

  const onDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    drag.current = { startX: e.clientX, moved: false, id: e.pointerId };
    btnRef.current?.setPointerCapture(e.pointerId);
  };

  const onUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    try {
      btnRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
    if (d.moved && dragX !== null) {
      const wantDark = dragX > TRAVEL / 2;
      setDragX(null);
      if (wantDark !== isDark) apply(wantDark ? 'dark' : 'light');
      // swallow the click that follows a drag
      const stop = (ev: Event) => ev.stopImmediatePropagation();
      btnRef.current?.addEventListener('click', stop, { capture: true, once: true });
      setTimeout(() => btnRef.current?.removeEventListener('click', stop, true), 0);
    } else {
      setDragX(null);
    }
  };

  const labels = LABELS[lang];
  const label = isDark ? labels.toLight : labels.toDark;

  if (!mounted) {
    // Same footprint as the live control: no layout shift on hydration
    return <span className={styles.placeholder} aria-hidden="true" />;
  }

  const travel = dragX ?? (isDark ? TRAVEL : 0);
  const progress = travel / TRAVEL; // 0 = sun, 1 = moon
  const sign = rtl ? -1 : 1;

  return (
    <button
      ref={btnRef}
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={label}
      title={label}
      onClick={toggle}
      onPointerMove={onMove}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      className={styles.btn}
      data-dragging={dragX !== null ? 'true' : undefined}
      data-theme-state={isDark ? 'dark' : 'light'}
      style={
        {
          '--p': progress,
          '--tx': `${travel * sign}px`,
        } as React.CSSProperties
      }
    >
      <span className={styles.track} aria-hidden="true">
        <span className={styles.edge} />
        <svg className={styles.star} viewBox="0 0 24 24" width="10" height="10">
          <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8z" fill="currentColor" />
        </svg>
        <span className={styles.thumb}>
          <svg viewBox="0 0 24 24" width="20" height="20" className={styles.orb}>
            <defs>
              <mask id="tt-moon-mask">
                <rect width="24" height="24" fill="#fff" />
                <circle className={styles.bite} cx="17" cy="8" r="6" fill="#000" />
              </mask>
            </defs>
            <g className={styles.rays} stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 1.5v2.5M12 20v2.5M1.5 12H4M20 12h2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8" />
            </g>
            <circle cx="12" cy="12" r="5.5" fill="currentColor" mask="url(#tt-moon-mask)" />
          </svg>
        </span>
      </span>
    </button>
  );
}
