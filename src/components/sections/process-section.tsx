'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Lightbulb, Code2, Rocket } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ScrollAnimate } from '@/components/ui/scroll-animate';

const stepIcons = [MessageSquare, Lightbulb, Code2, Rocket] as const;
const stepKeys = ['discover', 'plan', 'build', 'launch'] as const;
const stepGradients = [
  'from-blue-500 to-cyan-500',
  'from-violet-500 to-purple-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
] as const;

export default function ProcessSection() {
  const t = useTranslations('process');

  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Section illustration */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/section-process.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.06]"
          loading="lazy"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>
      <div className="container relative z-10 px-4 md:px-6">
        <ScrollAnimate>
          <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
            <div className="relative w-48 h-32 md:w-64 md:h-44 rounded-2xl overflow-hidden shrink-0 border border-border/30 shadow-lg shadow-primary/5">
              <Image
                src="/images/illustration-process.jpg"
                alt=""
                fill
                className="object-cover"
                loading="lazy"
                aria-hidden="true"
              />
            </div>
            <div className="text-center md:text-start flex-1">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-glow">
                {t('title')}
              </h2>
              <p className="mx-auto md:mx-0 max-w-[700px] text-muted-foreground md:text-lg">
                {t('subtitle')}
              </p>
            </div>
          </div>
        </ScrollAnimate>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line */}
          <div className="absolute top-24 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent hidden lg:block" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stepKeys.map((key, index) => {
              const Icon = stepIcons[index]!;
              const gradient = stepGradients[index]!;
              // Alternate between left and right slide animations
              const slideClass = index % 2 === 0 ? 'scroll-slide-left' : 'scroll-slide-right';
              return (
                <div
                  key={key}
                  className={`relative text-center group ${slideClass} rounded-2xl border border-transparent hover:border-primary/20 hover:shadow-md hover:shadow-primary/5 transition-all duration-300 p-4`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Step number + Icon combined */}
                  <div className="relative mx-auto mb-5">
                    <div className="text-5xl font-bold text-muted-foreground/10 select-none mb-2">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-2">
                    {t(`steps.${key}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(`steps.${key}.description`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
