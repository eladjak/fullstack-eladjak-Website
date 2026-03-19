'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { type ReactNode } from 'react';

interface ScrollAnimateProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Reusable scroll-triggered fade-in-up animation wrapper.
 * Respects prefers-reduced-motion (IS 5568 / WCAG 2.3.3).
 * Content starts visible (opacity 0.85) and animates to full opacity on scroll.
 * Progressive enhancement: content is readable even without scroll trigger.
 */
export function ScrollAnimate({ children, className, delay = 0 }: ScrollAnimateProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
      viewport={{ once: true, margin: '-50px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
