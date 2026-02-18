'use client';

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface ScrollAnimateProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Reusable scroll-triggered fade-in-up animation wrapper.
 * Content starts visible (opacity 0.85) and animates to full opacity on scroll.
 * Progressive enhancement: content is readable even without scroll trigger.
 */
export function ScrollAnimate({ children, className, delay = 0 }: ScrollAnimateProps) {
  return (
    <motion.div
      initial={{ opacity: 0.85, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut', delay }}
      viewport={{ once: true, margin: '-50px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
