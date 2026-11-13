'use client';

import { useEffect } from 'react';

/**
 * Arms the scroll reveal for elements marked .lec-reveal / .lec-line that start
 * below the fold. One shared observer, reveal once, nothing when reduced motion.
 */
export function RevealRoot(): null {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>('.lec-reveal, .lec-line'));
    const fold = window.innerHeight * 0.92;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.rv = 'shown';
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    for (const el of els) {
      if (el.getBoundingClientRect().top > fold) {
        el.dataset.rv = 'hidden';
        io.observe(el);
      }
    }
    // Safety net: never leave content hidden (e.g. print, very fast jumps to #booking).
    const reveal = () => {
      for (const el of els) el.dataset.rv = 'shown';
    };
    window.addEventListener('beforeprint', reveal);
    window.addEventListener('hashchange', reveal);
    return () => {
      io.disconnect();
      window.removeEventListener('beforeprint', reveal);
      window.removeEventListener('hashchange', reveal);
    };
  }, []);
  return null;
}
