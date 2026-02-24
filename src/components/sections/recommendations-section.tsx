'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ScrollAnimate } from '@/components/ui/scroll-animate';

const recommendationKeys = ['rec1', 'rec2', 'rec3'] as const;

const AVATAR_GRADIENTS = [
  'from-violet-500 to-purple-600',
  'from-blue-500 to-cyan-500',
  'from-amber-500 to-orange-500',
] as const;

export default function RecommendationsSection() {
  const t = useTranslations('recommendations');

  return (
    <section className="w-full py-16 md:py-24">
      <div className="container px-4 md:px-6">
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

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {recommendationKeys.map((key, index) => (
            <ScrollAnimate key={key} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="relative h-full rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/5"
              >
                <Quote className="h-8 w-8 text-primary/20 mb-4" aria-hidden="true" />
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  &ldquo;{t(`items.${key}.text`)}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[index]} text-white text-sm font-bold`}
                  >
                    {t(`items.${key}.initials`)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t(`items.${key}.name`)}</p>
                    <p className="text-xs text-muted-foreground">{t(`items.${key}.role`)}</p>
                  </div>
                </div>
              </motion.div>
            </ScrollAnimate>
          ))}
        </div>
      </div>
    </section>
  );
}
