'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const SCROLL_THRESHOLD = 300;

/**
 * Floating scroll-to-top button.
 * - Appears when the user has scrolled past SCROLL_THRESHOLD px.
 * - Fixed bottom-left (mirrors the WhatsApp FAB on bottom-right).
 * - z-40 so it sits below the WhatsApp FAB (z-50) and nav (z-50+).
 * - Respects prefers-reduced-motion.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Run once on mount in case the page is already scrolled
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'instant' : 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-to-top"
          onClick={handleClick}
          className="fixed bottom-6 start-6 z-40 rounded-full p-3 bg-card/60 backdrop-blur-sm border border-border/50 hover:border-primary/30 shadow-sm hover:shadow-primary/10 text-foreground/70 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Scroll to top"
          title="חזרה לראש העמוד"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
          whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
