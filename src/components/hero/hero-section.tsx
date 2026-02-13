'use client';

import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Dynamic import for 3D scene (client-side only, no SSR)
const Hero3DScene = lazy(() => import('./hero-3d-scene'));

/**
 * Loading fallback for 3D scene
 */
function SceneFallback() {
  return (
    <motion.div
      className="absolute inset-0 z-0"
      style={{
        background: "linear-gradient(to right, var(--primary), var(--accent))",
        opacity: 0.1,
      }}
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 90, 0],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

/**
 * Hero Section Component
 * Combines 3D background scene with text content
 */
export default function HeroSection() {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
      {/* 3D Background Scene with Suspense */}
      <Suspense fallback={<SceneFallback />}>
        <Hero3DScene />
      </Suspense>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-background/60 dark:bg-background/80 -z-10" />

      {/* Content */}
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <motion.h1
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Elad Ya&apos;akobovitch
            </motion.h1>

            <motion.h2
              className="text-2xl font-semibold text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Full-Stack Developer
            </motion.h2>

            <motion.p
              className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Building modern web applications with Next.js, React, and TypeScript.
              Combining technical expertise with creative vision and business insight.
              Results-driven, not hours-driven.
            </motion.p>
          </div>

          <motion.div
            className="space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              View Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
