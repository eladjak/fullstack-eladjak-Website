'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ScrollAnimate } from '@/components/ui/scroll-animate';

const recommendationKeys = ['rec1', 'rec2', 'rec3', 'rec4', 'rec5', 'rec6'] as const;

// Same six hues, two steps deeper. The initials are white at 14px bold, which
// is not "large text", so they need 4.5:1 — and white never reaches that on a
// 500-level amber, cyan, teal or rose. Deepening the stops keeps the palette
// and the rainbow-of-avatars idea intact while making the label legible.
const AVATAR_GRADIENTS = [
  'from-violet-700 to-purple-800',
  'from-blue-700 to-cyan-800',
  'from-amber-700 to-orange-800',
  'from-emerald-700 to-teal-800',
  'from-pink-700 to-rose-700',
  'from-indigo-700 to-violet-700',
] as const;

function RecommendationCard({ recKey, index, t }: { recKey: string; index: number; t: ReturnType<typeof useTranslations> }) {
  return (
    <div className="relative h-full min-h-[260px] rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 flex flex-col">
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
          alt="רקע מופשט המייצג המלצות וחוות דעת של לקוחות ושותפים"
          fill
          className="object-cover opacity-[0.06]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95" />
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <ScrollAnimate>
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3 text-xs font-semibold uppercase tracking-[0.28em]">
              {t('eyebrow')}
            </p>
            <div className="flex items-center justify-center gap-1 mb-4">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <h2 className="wow-title wow-title--center text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              {t('title')}
            </h2>
            <p className="mx-auto max-w-[600px] text-pretty text-muted-foreground md:text-lg leading-relaxed">
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
