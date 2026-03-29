'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ScrollAnimate } from '@/components/ui/scroll-animate';

const recommendationKeys = ['rec1', 'rec2', 'rec3', 'rec4', 'rec5', 'rec6'] as const;

const AVATAR_GRADIENTS = [
  'from-violet-500 to-purple-600',
  'from-blue-500 to-cyan-500',
  'from-amber-500 to-orange-500',
  'from-emerald-500 to-teal-500',
  'from-pink-500 to-rose-500',
  'from-indigo-500 to-violet-500',
] as const;

function RecommendationCard({ recKey, index, t }: { recKey: string; index: number; t: ReturnType<typeof useTranslations> }) {
  return (
    <div className="relative h-full min-h-[260px] rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/5 flex flex-col">
      <div className={`absolute -top-2 -end-2 h-16 w-16 rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[index]} opacity-10 blur-xl`} />
      <Quote className="h-7 w-7 text-primary/20 mb-3 shrink-0" aria-hidden="true" />
      <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
        &ldquo;{t(`items.${recKey}.text`)}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-4 border-t border-border/50 mt-auto">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[index]} text-white text-sm font-bold`}>
          {t(`items.${recKey}.initials`)}
        </div>
        <div>
          <p className="text-sm font-semibold">{t(`items.${recKey}.name`)}</p>
          <p className="text-xs text-muted-foreground">{t(`items.${recKey}.role`)}</p>
        </div>
      </div>
    </div>
  );
}

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
          className="object-cover opacity-[0.06]"
          loading="lazy"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95" />
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

        {/* Mobile: scroll-snap carousel */}
        <div className="md:hidden -mx-4">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-4 scrollbar-hide">
            {recommendationKeys.map((key, index) => (
              <div key={key} className="snap-center shrink-0 w-[80vw]">
                <RecommendationCard recKey={key} index={index} t={t} />
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground/50 mt-2">← החליקו לעוד המלצות →</p>
        </div>

        {/* Desktop: grid */}
        <ScrollAnimate delay={0.1}>
          <div className="hidden md:grid grid-cols-3 gap-6 max-w-5xl mx-auto">
            {recommendationKeys.map((key, index) => (
              <motion.div
                key={key}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <RecommendationCard recKey={key} index={index} t={t} />
              </motion.div>
            ))}
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}
