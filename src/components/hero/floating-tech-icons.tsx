'use client';

import { motion } from 'framer-motion';
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
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            filter: 'drop-shadow(0 0 8px rgba(0, 0, 0, 0.3))',
          }}
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
