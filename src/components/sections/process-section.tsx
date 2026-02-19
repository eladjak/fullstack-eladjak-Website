'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Lightbulb, Code2, Rocket } from 'lucide-react';
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
    <section className="w-full py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <ScrollAnimate>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              {t('title')}
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              {t('subtitle')}
            </p>
          </div>
        </ScrollAnimate>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line */}
          <div className="absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent hidden lg:block" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stepKeys.map((key, index) => {
              const Icon = stepIcons[index]!;
              const gradient = stepGradients[index]!;
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  className="relative text-center group"
                >
                  {/* Step number */}
                  <div className="text-6xl font-bold text-muted-foreground/10 absolute -top-4 left-1/2 -translate-x-1/2 select-none">
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
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
