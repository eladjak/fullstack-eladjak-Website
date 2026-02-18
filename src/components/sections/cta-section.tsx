'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Code2, Zap } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ScrollAnimate } from '@/components/ui/scroll-animate';

const featureIcons = [Code2, Sparkles, Zap] as const;
const featureKeys = ['cleanCode', 'aiIntegration', 'fastDelivery'] as const;

export default function CTASection() {
  const t = useTranslations('cta');

  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />

      <div className="container relative px-4 md:px-6">
        <ScrollAnimate>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              {t('title')}
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-lg">
              {t('subtitle')}
            </p>
          </div>
        </ScrollAnimate>

        <ScrollAnimate delay={0.1}>
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto mb-12">
            {featureKeys.map((key, index) => {
              const Icon = featureIcons[index]!;
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0.85, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut', delay: 0.05 + index * 0.03 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="relative p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm text-center hover:border-primary/30 transition-all duration-300">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {t(`features.${key}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(`features.${key}.description`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </ScrollAnimate>

        <ScrollAnimate delay={0.2}>
          <div className="text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {t('getInTouch')}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}
