'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, Stars } from '@react-three/drei';
import type { Mesh } from 'three';
import {
  CATEGORY_COLORS,
  CATEGORY_LABELS_HE,
  GENERATED_SKILLS,
  SKILLS,
  type SkillNode,
} from '@/data/skills-universe';

/**
 * Deterministic Fibonacci sphere distribution.
 * Returns evenly spaced points on a sphere of given radius — same input always
 * yields the same output, so positions don't jitter between renders.
 */
function fibonacciSphere(count: number, radius: number): Array<[number, number, number]> {
  const points: Array<[number, number, number]> = [];
  const phi = Math.PI * (Math.sqrt(5) - 1); // golden angle in radians

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / Math.max(1, count - 1)) * 2; // y goes from 1 to -1
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    points.push([x * radius, y * radius, z * radius]);
  }
  return points;
}

interface SkillSphereProps {
  skill: SkillNode;
  position: [number, number, number];
  isSelected: boolean;
  ring: 'core' | 'extended';
  onSelect: (skill: SkillNode) => void;
}

function SkillSphere({ skill, position, isSelected, ring, onSelect }: SkillSphereProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const baseColor = CATEGORY_COLORS[skill.category];

  // Core ring: brighter & larger (0.10–0.16 radius).
  // Extended ring: smaller & dimmer (0.06–0.10 radius).
  const baseRadius =
    ring === 'core'
      ? 0.10 + ((skill.level ?? 3) - 1) * 0.015
      : 0.06 + ((skill.level ?? 2) - 1) * 0.01;
  const baseEmissive = ring === 'core' ? 0.25 : 0.15;
  const baseOpacity = ring === 'core' ? 1 : 0.65;

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const target = hovered || isSelected ? 1.6 : 1;
    const current = meshRef.current.scale.x;
    const next = current + (target - current) * Math.min(1, delta * 8);
    meshRef.current.scale.set(next, next, next);
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          if (typeof document !== 'undefined') {
            document.body.style.cursor = 'pointer';
          }
        }}
        onPointerOut={() => {
          setHovered(false);
          if (typeof document !== 'undefined') {
            document.body.style.cursor = 'default';
          }
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(skill);
        }}
      >
        <sphereGeometry args={[baseRadius, ring === 'core' ? 24 : 14, ring === 'core' ? 24 : 14]} />
        <meshStandardMaterial
          color={baseColor}
          emissive={baseColor}
          emissiveIntensity={isSelected ? 0.8 : hovered ? 0.55 : baseEmissive}
          roughness={0.45}
          metalness={0.2}
          transparent={baseOpacity < 1}
          opacity={baseOpacity}
        />
      </mesh>
      {(hovered || isSelected) && (
        <Html
          center
          distanceFactor={10}
          style={{ pointerEvents: 'none' }}
          zIndexRange={[100, 0]}
        >
          <div
            dir="rtl"
            className="rounded-md border border-white/20 bg-black/80 px-2 py-1 text-xs font-medium text-white shadow-lg backdrop-blur-sm"
            style={{ whiteSpace: 'nowrap' }}
          >
            {skill.label}
          </div>
        </Html>
      )}
    </group>
  );
}

interface SceneProps {
  selectedId: string | null;
  onSelect: (skill: SkillNode) => void;
  reducedMotion: boolean;
}

function Scene({ selectedId, onSelect, reducedMotion }: SceneProps) {
  // Inner sphere: curated 107 skills (radius 5.3, brighter).
  const corePositions = useMemo(
    () => fibonacciSphere(SKILLS.length, 5.3),
    [],
  );
  // Outer sphere: generated 300+ skills (radius 8, dimmer).
  const extendedPositions = useMemo(
    () => fibonacciSphere(GENERATED_SKILLS.length, 8),
    [],
  );

  return (
    <>
      <ambientLight intensity={0.45} />
      <pointLight position={[10, 10, 10]} intensity={1.2} />
      <pointLight position={[-10, -10, -5]} intensity={0.6} color="#A855F7" />

      <Stars
        radius={70}
        depth={45}
        count={1500}
        factor={3}
        saturation={0}
        fade
        speed={reducedMotion ? 0 : 0.4}
      />

      {/* Core ring: curated skills */}
      {SKILLS.map((skill, i) => (
        <SkillSphere
          key={skill.id}
          skill={skill}
          position={corePositions[i]!}
          isSelected={selectedId === skill.id}
          ring="core"
          onSelect={onSelect}
        />
      ))}

      {/* Extended ring: generated skills */}
      {GENERATED_SKILLS.map((skill, i) => (
        <SkillSphere
          key={skill.id}
          skill={skill}
          position={extendedPositions[i]!}
          isSelected={selectedId === skill.id}
          ring="extended"
          onSelect={onSelect}
        />
      ))}

      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={6}
        maxDistance={28}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.35}
        rotateSpeed={0.6}
      />
    </>
  );
}

export default function SkillsCanvas() {
  const [selected, setSelected] = useState<SkillNode | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const isGenerated = selected ? selected.id.startsWith('gen:') : false;

  return (
    <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#000000']} />
        <Scene
          selectedId={selected?.id ?? null}
          onSelect={setSelected}
          reducedMotion={reducedMotion}
        />
      </Canvas>

      {/* Detail panel — bottom sheet on mobile, side panel from sm: up */}
      {selected && (
        <aside
          dir="rtl"
          className="absolute inset-x-0 bottom-0 max-h-[60%] overflow-y-auto rounded-t-2xl border border-white/15 border-b-0 bg-black/90 p-4 text-white shadow-2xl backdrop-blur-md sm:inset-x-auto sm:bottom-4 sm:start-4 sm:end-auto sm:max-w-sm sm:rounded-xl sm:border-b"
        >
          <div className="mb-2 flex items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold">{selected.label}</h3>
              <p className="text-xs text-white/60">
                {CATEGORY_LABELS_HE[selected.category]}
                {selected.level ? ` · רמה ${selected.level}/5` : ''}
                {isGenerated ? ' · מהספרייה האישית' : ' · ליבה'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="סגור פרטים"
              className="rounded-md border border-white/20 px-2 py-1 text-xs text-white/70 transition-opacity hover:opacity-80"
            >
              סגור
            </button>
          </div>
          {selected.description && (
            <p className="text-pretty text-sm leading-relaxed text-white/85">
              {selected.description}
            </p>
          )}
        </aside>
      )}
    </div>
  );
}
