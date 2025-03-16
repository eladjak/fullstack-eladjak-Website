'use client';

import { useFrame } from '@react-three/fiber';
import { Environment, Float, Text3D } from '@react-three/drei';
import { use3DInteraction } from '@/hooks/use3DInteraction';
import { AnimatedMesh } from './animated-mesh';
import type { ThreeVector } from '@/types/three';

interface Scene3DProps {
  technologies: string[] | null;
}

export function Scene3D({ technologies }: Scene3DProps) {
  const {
    hovered,
    setHovered,
    rotation,
    setRotation,
    spring
  } = use3DInteraction();

  const color = technologies?.includes('React') ? '#61dafb' : '#6d28d9';
  
  useFrame((state) => {
    const newRotation: ThreeVector = [
      Math.sin(state.clock.elapsedTime) * 0.1,
      state.clock.elapsedTime * 0.2,
      Math.cos(state.clock.elapsedTime) * 0.1
    ];
    setRotation(newRotation);
    spring.rotation.set(newRotation);
  });

  return (
    <>
      <Environment preset="warehouse" />
      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <Float
        speed={2}
        rotationIntensity={2.5}
        floatIntensity={4}
        floatingRange={[0, 0.8]}
      >
        <group rotation={rotation as [number, number, number]}>
          <AnimatedMesh
            color={color}
            hovered={hovered}
            spring={{
              position: spring.position as any,
              rotation: spring.rotation as any
            }}
            onHover={setHovered}
          />
          {technologies?.slice(0, 3).map((tech, i) => (
            <group key={tech} position={[1.5, 0.5 - i * 0.3, 0]}>
              <Text3D
                font="/fonts/helvetiker_regular.typeface.json"
                size={0.15}
                height={0.05}
                curveSegments={32}
                bevelEnabled
                bevelThickness={0.01}
                bevelSize={0.01}
                bevelOffset={0}
                bevelSegments={5}
              >
                {tech}
                <meshPhysicalMaterial
                  color={color}
                  metalness={0.8}
                  roughness={0.2}
                  clearcoat={1}
                  transmission={0.1}
                />
              </Text3D>
            </group>
          ))}
        </group>
      </Float>
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
    </>
  );
}
