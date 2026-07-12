'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { AGENT_NODES } from '@/data/agent-network';

/**
 * NetworkCanvas — the cinematic hero's R3F scene, forked from the SkillsCanvas
 * engine (Fibonacci distribution + instanced spheres) but re-cast as the
 * 12-agent fleet: named nodes orbiting a central "operator" core, connected by
 * lines, pulsing with live hub health.
 *
 * It is DECORATIVE (aria-hidden) — the real hero <h1>/<h2>/<p>/CTA live in the
 * SSR'd HeroSection above it and are never gated behind this mount.
 *
 * Driven by a single scroll `progress` (0→1) that the parent scrubs via GSAP:
 *   beat 1 (0.00–0.25)  one node
 *   beat 2 (0.25–0.50)  the 12-node network unfolds (labels appear)
 *   beat 3 (0.50–0.75)  living system — connection lines + health pulses
 *   beat 4 (0.75–1.00)  converge toward the operator core
 *
 * `healthRatio` (0–1, or null = unavailable) tints the pulse speed/intensity so
 * the network reads as ALIVE-right-now, degrading gracefully (never faking).
 */

function fibonacciSphere(count: number, radius: number): Array<[number, number, number]> {
  const points: Array<[number, number, number]> = [];
  const phi = Math.PI * (Math.sqrt(5) - 1);
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / Math.max(1, count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    points.push([Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius]);
  }
  return points;
}

interface SceneProps {
  progressRef: React.MutableRefObject<number>;
  healthRatio: number | null;
  reducedMotion: boolean;
  showLabels: boolean;
  lang: 'he' | 'en';
}

function Scene({ progressRef, healthRatio, reducedMotion, showLabels, lang }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const nodeRefs = useRef<Array<THREE.Mesh | null>>([]);
  const lineRefs = useRef<Array<THREE.LineSegments | null>>([]);

  const positions = useMemo(() => fibonacciSphere(AGENT_NODES.length, 4.2), []);

  // Precompute line geometries (node → core). Rebuilt only if positions change.
  const lineGeoms = useMemo(
    () =>
      positions.map((p) => {
        const g = new THREE.BufferGeometry();
        g.setAttribute(
          'position',
          new THREE.Float32BufferAttribute([0, 0, 0, p[0], p[1], p[2]], 3),
        );
        return g;
      }),
    [positions],
  );

  useFrame((state, delta) => {
    const p = progressRef.current;
    const t = state.clock.elapsedTime;

    // Gentle auto-rotation (frozen under reduced motion).
    if (groupRef.current && !reducedMotion) {
      groupRef.current.rotation.y += delta * 0.12;
    }

    // Beat-driven per-node reveal + convergence.
    // Nodes fade/scale in during beat 2 (0.25–0.55), then pull toward the core
    // during beat 4 (0.75–1.0).
    const revealStart = 0.22;
    const revealEnd = 0.55;
    const convergeStart = 0.75;

    // Health drives pulse intensity/speed; unavailable → slow neutral pulse.
    const healthy = healthRatio ?? 0.6;
    const pulseSpeed = reducedMotion ? 0 : 2 + healthy * 2;

    for (let i = 0; i < AGENT_NODES.length; i++) {
      const mesh = nodeRefs.current[i];
      if (!mesh) continue;

      // Stagger each node's reveal across the reveal window.
      const nodeReveal = revealStart + (i / AGENT_NODES.length) * (revealEnd - revealStart) * 0.6;
      const revealed = THREE.MathUtils.clamp(
        (p - nodeReveal) / 0.12,
        0,
        1,
      );

      // Convergence: lerp position toward the core in beat 4.
      const converge = THREE.MathUtils.clamp((p - convergeStart) / 0.25, 0, 1);
      const [bx, by, bz] = positions[i]!;
      const k = 1 - converge * 0.82;
      mesh.position.set(bx * k, by * k, bz * k);

      // Pulse scale (health-driven), gated by reveal.
      const pulse = reducedMotion ? 1 : 1 + Math.sin(t * pulseSpeed + i) * 0.14;
      const scale = revealed * (0.9 + pulse * 0.1) * (1 - converge * 0.5);
      mesh.scale.setScalar(Math.max(0.001, scale));

      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.opacity = revealed * (1 - converge * 0.4);
      mat.emissiveIntensity = 0.4 + revealed * (0.4 + healthy * 0.5);
    }

    // Connection lines appear in beat 3 (0.5–0.75), fade during convergence.
    const linesIn = THREE.MathUtils.clamp((p - 0.5) / 0.2, 0, 1);
    const linesConverge = THREE.MathUtils.clamp((p - convergeStart) / 0.25, 0, 1);
    for (let i = 0; i < lineRefs.current.length; i++) {
      const line = lineRefs.current[i];
      if (!line) continue;
      const mat = line.material as THREE.LineBasicMaterial;
      // Traveling pulse along the line via opacity flicker (cheap, no shader).
      const flicker = reducedMotion ? 1 : 0.55 + Math.sin(t * pulseSpeed + i * 0.7) * 0.35;
      mat.opacity = linesIn * flicker * (1 - linesConverge * 0.7) * (0.35 + healthy * 0.4);
      // Endpoint follows the (converging) node position.
      const mesh = nodeRefs.current[i];
      if (mesh) {
        const pos = line.geometry.getAttribute('position') as THREE.BufferAttribute;
        pos.setXYZ(1, mesh.position.x, mesh.position.y, mesh.position.z);
        pos.needsUpdate = true;
      }
    }

    // Core: grows in beat 1, brightens as everything converges (the "operator").
    if (coreRef.current) {
      const coreBase = 0.35 + THREE.MathUtils.clamp(p / 0.22, 0, 1) * 0.25;
      const corePulse = reducedMotion ? 0 : Math.sin(t * (pulseSpeed || 1)) * 0.05;
      const converge = THREE.MathUtils.clamp((p - convergeStart) / 0.25, 0, 1);
      coreRef.current.scale.setScalar(coreBase + corePulse + converge * 0.6);
      const cm = coreRef.current.material as THREE.MeshStandardMaterial;
      cm.emissiveIntensity = 0.7 + converge * 1.3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[8, 8, 8]} intensity={1.1} />
      <pointLight position={[-8, -6, -4]} intensity={0.6} color="#E11D74" />

      <group ref={groupRef}>
        {/* Operator core — the single node that becomes the operator. */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#E11D74"
            emissive="#E11D74"
            emissiveIntensity={0.8}
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>

        {/* Connection lines (node ↔ core). */}
        {lineGeoms.map((geom, i) => (
          <lineSegments
            key={`line-${AGENT_NODES[i]!.id}`}
            ref={(el) => {
              lineRefs.current[i] = el;
            }}
            geometry={geom}
          >
            <lineBasicMaterial
              color={AGENT_NODES[i]!.color}
              transparent
              opacity={0}
            />
          </lineSegments>
        ))}

        {/* Agent nodes. */}
        {AGENT_NODES.map((node, i) => (
          <group key={node.id} position={positions[i]!}>
            <mesh
              ref={(el) => {
                nodeRefs.current[i] = el;
              }}
              scale={0.001}
            >
              <sphereGeometry args={[0.34, 20, 20]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={0.4}
                roughness={0.4}
                metalness={0.2}
                transparent
                opacity={0}
              />
            </mesh>
            {showLabels && (
              <Html
                center
                distanceFactor={11}
                position={[0, 0.55, 0]}
                style={{ pointerEvents: 'none', userSelect: 'none' }}
                zIndexRange={[20, 0]}
              >
                <div
                  dir={lang === 'he' ? 'rtl' : 'ltr'}
                  className="whitespace-nowrap rounded-md border border-white/15 bg-black/70 px-2 py-0.5 text-[10px] font-medium text-white/90 shadow backdrop-blur-sm"
                >
                  {lang === 'he' ? node.label : node.labelEn}
                </div>
              </Html>
            )}
          </group>
        ))}
      </group>
    </>
  );
}

export interface NetworkCanvasProps {
  /** Scroll scrub 0→1, owned by the parent GSAP timeline (mutable ref). */
  progressRef: React.MutableRefObject<number>;
  /** Fraction of the fleet healthy (0–1), or null when the hub is unreachable. */
  healthRatio: number | null;
  reducedMotion: boolean;
  /** Show the per-node name labels (hidden on very small screens for legibility). */
  showLabels: boolean;
  lang: 'he' | 'en';
}

export default function NetworkCanvas({
  progressRef,
  healthRatio,
  reducedMotion,
  showLabels,
  lang,
}: NetworkCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 11], fov: 55 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
    >
      <Scene
        progressRef={progressRef}
        healthRatio={healthRatio}
        reducedMotion={reducedMotion}
        showLabels={showLabels}
        lang={lang}
      />
    </Canvas>
  );
}
