'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ScrollAnimate } from '@/components/ui/scroll-animate';
import { Carousel } from '@/components/ui/carousel';

const recommendationKeys = ['rec1', 'rec2', 'rec3', 'rec4', 'rec5', 'rec6'] as const;

const AVATAR_GRADIENTS = [
  'from-violet-500 to-purple-600',
  'from-blue-500 to-cyan-500',
  'from-amber-500 to-orange-500',
  'from-emerald-500 to-teal-500',
  'from-pink-500 to-rose-500',
  'from-indigo-500 to-violet-500',
] as const;

export default function RecommendationsSection() {
  const t = useTranslations('recommendations');

  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden">
      {/* Section illustration background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/section-testimonials.jpg"
          alt=""
          fill
          className="object-cover opacity-10"
          loading="lazy"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <ScrollAnimate>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-1 mb-4">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              {t('title')}
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-lg">
              {t('subtitle')}
            </p>
          </div>
        </ScrollAnimate>

        <ScrollAnimate delay={0.1}>
          <div className="max-w-5xl mx-auto px-6">
            <Carousel
              autoPlay={5000}
              showDots={true}
              showArrows={true}
              itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
              gap={24}
            >
              {recommendationKeys.map((key, index) => (
                <motion.div
                  key={key}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="relative h-full min-h-[280px] rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/5 flex flex-col"
                >
                  {/* Decorative gradient corner */}
                  <div className={`absolute -top-2 -end-2 h-16 w-16 rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[index]} opacity-10 blur-xl`} />

                  <Quote className="h-8 w-8 text-primary/20 mb-4 shrink-0" aria-hidden="true" />
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    &ldquo;{t(`items.${key}.text`)}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border/50 mt-auto">
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
              ))}
            </Carousel>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}
