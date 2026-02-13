'use client';

import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Torus, Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

/**
 * Floating Sphere component with proper cleanup
 */
function FloatingSphere({
  position,
  color,
  speed = 1
}: {
  position: [number, number, number];
  color: string;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Memoize position to prevent recreation
  const basePosition = useMemo(() => position, [position[0], position[1], position[2]]);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.001 * speed;
    meshRef.current.rotation.y += 0.002 * speed;
    meshRef.current.position.y = basePosition[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.2;
  });

  // Cleanup Three.js resources on unmount
  useEffect(() => {
    return () => {
      if (meshRef.current) {
        meshRef.current.geometry?.dispose();
        if (meshRef.current.material) {
          if (Array.isArray(meshRef.current.material)) {
            meshRef.current.material.forEach(m => m.dispose());
          } else {
            meshRef.current.material.dispose();
          }
        }
      }
    };
  }, []);

  return (
    <mesh ref={meshRef} position={basePosition}>
      <Sphere args={[1, 32]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </mesh>
  );
}

/**
 * Floating Torus component with proper cleanup
 */
function FloatingTorus({
  position,
  color,
  speed = 1
}: {
  position: [number, number, number];
  color: string;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Memoize position to prevent recreation
  const basePosition = useMemo(() => position, [position[0], position[1], position[2]]);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.001 * speed;
    meshRef.current.rotation.y += 0.002 * speed;
    meshRef.current.position.y = basePosition[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.2;
  });

  // Cleanup Three.js resources on unmount
  useEffect(() => {
    return () => {
      if (meshRef.current) {
        meshRef.current.geometry?.dispose();
        if (meshRef.current.material) {
          if (Array.isArray(meshRef.current.material)) {
            meshRef.current.material.forEach(m => m.dispose());
          } else {
            meshRef.current.material.dispose();
          }
        }
      }
    };
  }, []);

  return (
    <mesh ref={meshRef} position={basePosition}>
      <Torus args={[1, 0.4, 16, 32]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Torus>
    </mesh>
  );
}

/**
 * Floating Icosahedron component with proper cleanup
 */
function FloatingIcosahedron({
  position,
  color,
  speed = 1
}: {
  position: [number, number, number];
  color: string;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Memoize position to prevent recreation
  const basePosition = useMemo(() => position, [position[0], position[1], position[2]]);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.001 * speed;
    meshRef.current.rotation.y += 0.002 * speed;
    meshRef.current.position.y = basePosition[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.2;
  });

  // Cleanup Three.js resources on unmount
  useEffect(() => {
    return () => {
      if (meshRef.current) {
        meshRef.current.geometry?.dispose();
        if (meshRef.current.material) {
          if (Array.isArray(meshRef.current.material)) {
            meshRef.current.material.forEach(m => m.dispose());
          } else {
            meshRef.current.material.dispose();
          }
        }
      }
    };
  }, []);

  return (
    <mesh ref={meshRef} position={basePosition}>
      <Icosahedron args={[1, 0]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Icosahedron>
    </mesh>
  );
}

/**
 * Simple auto-rotation component (replaces OrbitControls for better performance)
 */
function AutoRotate() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Floating shapes */}
      <FloatingSphere
        position={[-3, 0, -2]}
        color="#8B5CF6"
        speed={0.8}
      />
      <FloatingTorus
        position={[3, 1, -3]}
        color="#A78BFA"
        speed={1.2}
      />
      <FloatingIcosahedron
        position={[0, -1.5, -1]}
        color="#C4B5FD"
        speed={1}
      />
      <FloatingSphere
        position={[2, -2, -4]}
        color="#6D28D9"
        speed={0.6}
      />
      <FloatingIcosahedron
        position={[-2.5, 2, -2.5]}
        color="#DDD6FE"
        speed={1.1}
      />
    </group>
  );
}

/**
 * Main 3D Scene component
 */
function Scene() {
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.5} />

      {/* Directional lights for depth */}
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#A78BFA" />

      {/* Point lights for highlights */}
      <pointLight position={[0, 0, 5]} intensity={1} color="#8B5CF6" />

      {/* Auto-rotating group with floating shapes */}
      <AutoRotate />

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom
          intensity={0.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>
    </>
  );
}

/**
 * Hero 3D Scene Canvas
 * Exported component with responsive configuration and proper cleanup
 */
export default function Hero3DScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{
          background: 'transparent',
        }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
