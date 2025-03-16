'use client';

'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const Scene3D = dynamic(() => import('./project-3d-scene').then(mod => mod.Scene3D), {
  ssr: false
});

interface ProjectPreviewProps {
  technologies: string[] | null;
}

export function ProjectPreview({ technologies }: ProjectPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
    >
      <Canvas
        camera={{ position: [3, 2, 5], fov: 45 }}
        gl={{ antialias: true }}
      >
        <Scene3D technologies={technologies} />
        <OrbitControls 
          enableZoom={false}
          autoRotate
          autoRotateSpeed={4}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
        <EffectComposer>
          <Bloom
            intensity={1}
            luminanceThreshold={0.5}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>
    </motion.div>
  );
}
