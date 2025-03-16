'use client';

import { useRef } from 'react';
import { Mesh, Color } from 'three';
import type { SpringValue } from '@react-spring/three';
import type { ThreeVector } from '@/types/three';

interface AnimatedMeshProps {
  color: string;
  hovered: boolean;
  spring: {
    position: SpringValue<ThreeVector>;
    rotation: SpringValue<ThreeVector>;
  };
}

export function useAnimatedMesh({ color, hovered, spring }: AnimatedMeshProps) {
  const meshRef = useRef<Mesh>(null);

  const materialProps = {
    color,
    roughness: 0.1,
    metalness: 0.9,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    emissive: new Color(hovered ? color : 'black'),
    emissiveIntensity: hovered ? 3 : 0
  };

  return {
    meshRef,
    materialProps,
    springProps: {
      position: spring.position as unknown as SpringValue<ThreeVector>,
      rotation: spring.rotation as unknown as SpringValue<ThreeVector>
    }
  };
}
