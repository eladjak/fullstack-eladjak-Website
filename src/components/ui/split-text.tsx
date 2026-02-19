'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export function SplitText({
  text,
  className,
  delay = 0,
  staggerDelay = 0.03,
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const characters = text.split('');

  return (
    <span ref={ref} aria-label={text} className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          aria-hidden="true"
          style={{ display: 'inline-block' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 12,
            delay: delay + index * staggerDelay,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}
