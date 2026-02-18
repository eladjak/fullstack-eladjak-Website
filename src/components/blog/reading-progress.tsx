'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * A thin progress bar fixed to the top of the viewport that indicates
 * reading progress through the current page.
 * Uses framer-motion's useScroll and useSpring for smooth animation.
 */
export function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-primary z-[60] origin-left"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
