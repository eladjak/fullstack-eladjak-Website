'use client';

import { animated } from '@react-spring/three';
import type { AnimatedMeshProps, AnimatedMeshElement } from '@/types/three-fiber';
import { useAnimatedMesh } from '@/hooks/use3D/useAnimatedMesh';
import { memo } from 'react';
import type { MeshPhysicalMaterialParameters, Mesh } from 'three';

const MeshGeometry = memo(() => (
  <boxGeometry args={[1, 1, 1]} />
));
MeshGeometry.displayName = 'MeshGeometry';

const MeshMaterial = memo(({ materialProps }: { materialProps: MeshPhysicalMaterialParameters }) => (
  <meshPhysicalMaterial {...materialProps} />
));
MeshMaterial.displayName = 'MeshMaterial';

const AnimatedMesh = animated('mesh') as React.ForwardRefExoticComponent<
  Mesh & React.RefAttributes<unknown>
>;

export function AnimatedMeshComponent({ color, hovered, spring, onHover }: AnimatedMeshProps) {
  const { meshRef, materialProps, springProps } = useAnimatedMesh({ color, hovered, spring });

  return (
    <AnimatedMesh
      ref={meshRef}
      {...springProps}
      onPointerEnter={() => onHover(true)}
      onPointerLeave={() => onHover(false)}
    >
      <MeshGeometry />
      <MeshMaterial materialProps={materialProps} />
    </AnimatedMesh>
  );
}

export { AnimatedMeshComponent as AnimatedMesh };
