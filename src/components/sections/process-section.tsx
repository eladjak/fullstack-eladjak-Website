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
          className="object-cover opacity-8"
          loading="lazy"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>
      <div className="container relative z-10 px-4 md:px-6">
        <ScrollAnimate>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-glow">
              {t('title')}
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              {t('subtitle')}
            </p>
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
                  {/* Step number */}
                  <div className="text-6xl font-bold text-muted-foreground/10 absolute -top-4 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 select-none shadow-sm shadow-primary/20">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Icon */}
                  <div className="relative mx-auto mb-5">
                    <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-7 w-7" />
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
