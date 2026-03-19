'use client';

import { motion } from 'framer-motion';
import { Bot, Code2, GraduationCap, Presentation, MessageCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ScrollAnimate } from '@/components/ui/scroll-animate';

const services = [
  { key: 'aiAutomation', Icon: Bot, gradient: 'from-violet-500 to-purple-600' },
  { key: 'fullstack', Icon: Code2, gradient: 'from-blue-500 to-cyan-500' },
  { key: 'edtech', Icon: GraduationCap, gradient: 'from-emerald-500 to-teal-500' },
  { key: 'workshops', Icon: Presentation, gradient: 'from-amber-500 to-orange-500' },
  { key: 'whatsappAutomation', Icon: MessageCircle, gradient: 'from-green-500 to-emerald-600' },
] as const;

export default function ServicesPreviewSection() {
  const t = useTranslations('servicesPage');
  const tNav = useTranslations('nav');

  return (
    <section id="services" className="w-full py-16 md:py-24">
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

        <ScrollAnimate delay={0.1}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-w-6xl mx-auto mb-10">
            {services.map(({ key, Icon, gradient }, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0.85, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut', delay: 0.03 * index }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative p-5 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm text-center hover:border-primary/30 transition-all duration-300 h-full flex flex-col items-center">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white mb-3 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-sm font-semibold mb-1">
                    {t(`services.${key}.title`)}
                  </h3>
                  <p className="text-xs text-cta font-medium">
                    {t(`services.${key}.price`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollAnimate>

        <ScrollAnimate delay={0.2}>
          <div className="text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary/30 bg-background/50 backdrop-blur-sm px-6 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:bg-primary/10 hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {tNav('services')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}
