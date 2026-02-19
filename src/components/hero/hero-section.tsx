'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Github } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { SplitText } from '@/components/ui/split-text';

// Dynamic import for 3D scene (client-side only, no SSR)
const Hero3DScene = dynamic(() => import('./hero-3d-scene'), {
  ssr: false,
  loading: () => <SceneFallback />,
});

/**
 * Loading fallback for 3D scene
 */
function SceneFallback() {
  return (
    <motion.div
      className="absolute inset-0 z-0"
      style={{
        background: 'linear-gradient(to right, var(--primary), var(--accent))',
        opacity: 0.1,
      }}
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 90, 0],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}

/**
 * Hero Section Component
 * Combines 3D background scene with text content and improved visual hierarchy
 */
export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section id="hero" className="relative w-full min-h-[90vh] flex items-center overflow-hidden">
      {/* 3D Background Scene with dynamic import (no SSR) */}
      <Hero3DScene />

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-background/60 dark:bg-background/80 -z-10" />

      {/* Decorative gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center space-y-6 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              {t('badge')}
            </span>
          </motion.div>

          <div className="space-y-4 max-w-4xl">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl/none">
              <SplitText
                text={t('greeting')}
                delay={0.3}
                staggerDelay={0.04}
              />{' '}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:150%_auto] animate-gradient drop-shadow-sm">
                <SplitText
                  text={t('name')}
                  delay={0.6}
                  staggerDelay={0.05}
                />
              </span>
            </h1>

            <motion.h2
              className="text-xl md:text-2xl font-medium text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {t('title')}
            </motion.h2>

            <motion.p
              className="mx-auto max-w-[700px] text-muted-foreground md:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {t('description')}
              <br className="hidden md:block" />
              <span className="text-primary font-medium">{t('resultsPhrase')}</span>
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {t('viewProjects')}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://github.com/eladjak"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-border bg-background/50 backdrop-blur-sm px-8 py-3.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-accent/10 hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2 text-muted-foreground/70"
            >
              <span className="text-xs uppercase tracking-widest font-semibold">{t('scroll')}</span>
              <div className="h-8 w-5 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1">
                <motion.div
                  animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="h-1.5 w-1.5 rounded-full bg-primary/70"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
