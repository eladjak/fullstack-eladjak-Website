'use client';

import { useState } from 'react';
import { useSpring } from '@react-spring/three';
import type { ThreeVector } from '@/types/three';

export function use3DInteraction() {
  const [hovered, setHovered] = useState(false);
  const [rotation, setRotation] = useState<ThreeVector>([0, 0, 0]);

  const [spring] = useSpring(() => ({
    position: [0, 0, 0] as ThreeVector,
    rotation: [0, 0, 0] as ThreeVector,
    config: { mass: 1, tension: 170, friction: 26 }
  }));

  return {
    hovered,
    setHovered,
    rotation,
    setRotation,
    spring
  };
}
