'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

/**
 * Hero Section Component
 * Lightweight CSS gradient background with conversion-focused copy
 */
export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section id="hero" className="relative w-full min-h-[75vh] flex items-center overflow-hidden">
      {/* Animated CSS gradient background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background animate-gradient bg-[length:200%_200%]" />

      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-background/40 dark:bg-background/60 z-[1]" />

      {/* Content */}
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start space-y-6 text-start max-w-3xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-cta/10 border border-cta/20 px-4 py-1.5 text-sm font-medium text-cta">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cta opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cta" />
              </span>
              {t('badge')}
            </span>
          </motion.div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl/none">
              {t('heading')}
            </h1>

            <motion.h2
              className="text-xl md:text-2xl font-medium text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t('title')}
            </motion.h2>

            <motion.p
              className="max-w-[600px] text-muted-foreground md:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {t('description')}
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cta px-8 py-3.5 text-sm font-medium text-cta-foreground shadow-lg shadow-cta/25 transition-all duration-200 hover:bg-cta/90 hover:shadow-xl hover:shadow-cta/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {t('contactCta')}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-border bg-background/50 backdrop-blur-sm px-8 py-3.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-accent/10 hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {t('viewProjects')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
