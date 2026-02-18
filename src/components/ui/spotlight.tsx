'use client';

import { useEffect, useRef } from 'react';

/**
 * Subtle spotlight glow that follows the mouse cursor.
 * Renders a radial gradient div positioned at the cursor.
 * Only visible on pointer devices (hidden on touch).
 */
export function SpotlightCursor() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spotRef.current;
    if (!el) return;

    // Check for touch-only device
    const mq = window.matchMedia('(pointer: fine)');
    if (!mq.matches) {
      el.style.display = 'none';
      return;
    }

    const handleMove = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      el.style.opacity = '1';
    };

    const handleLeave = () => {
      el.style.opacity = '0';
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <div
      ref={spotRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-30 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300"
      style={{
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, hsl(var(--primary) / 0.06) 0%, transparent 70%)',
        willChange: 'transform',
      }}
    />
  );
}
