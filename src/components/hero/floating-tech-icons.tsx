'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const techIcons = [
  { name: 'React', emoji: '⚛️', color: '#61DAFB' },
  { name: 'TypeScript', emoji: '📘', color: '#3178C6' },
  { name: 'Next.js', emoji: '▲', color: '#000000' },
  { name: 'Node.js', emoji: '🟢', color: '#339933' },
  { name: 'TailwindCSS', emoji: '🎨', color: '#06B6D4' },
  { name: 'AI', emoji: '🤖', color: '#FF6B6B' },
];

interface FloatingIcon {
  id: number;
  icon: typeof techIcons[0];
  x: number;
  y: number;
  duration: number;
  delay: number;
}

export function FloatingTechIcons() {
  const [icons, setIcons] = useState<FloatingIcon[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const generatedIcons = techIcons.map((icon, index) => ({
      id: index,
      icon,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 15 + Math.random() * 10,
      delay: index * 0.2,
    }));
    setIcons(generatedIcons);
  }, []);

  // Skip all animation under reduced-motion — also avoids Framer Motion overhead
  // competing with the cinematic rAF loop on every frame.
  if (prefersReducedMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
      {icons.map((item) => (
        <motion.div
          key={item.id}
          className="absolute text-4xl"
          initial={{
            x: `${item.x}%`,
            y: `${item.y}%`,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            x: [
              `${item.x}%`,
              `${(item.x + 20) % 100}%`,
              `${(item.x + 40) % 100}%`,
              `${item.x}%`,
            ],
            y: [
              `${item.y}%`,
              `${(item.y + 30) % 100}%`,
              `${(item.y + 10) % 100}%`,
              `${item.y}%`,
            ],
            opacity: [0, 0.6, 0.6, 0],
            scale: [0, 1, 1, 0],
            // Removed rotate — it forces a separate composite layer per icon
            // on top of the cinematic backdrop, adding 6 extra GPU layers to every frame.
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          // Removed filter drop-shadow — applies a filter pass on each icon element
          // every frame; replaced by CSS box-shadow on the span (paint-only, no filter).
        >
          <span
            className="block"
            style={{
              color: item.icon.color,
            }}
          >
            {item.icon.emoji}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
