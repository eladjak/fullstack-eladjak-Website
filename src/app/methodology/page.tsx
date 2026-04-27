'use client';

import { motion } from 'framer-motion';
import {
  Search,
  FileText,
  Code,
  Bug,
  Rocket,
  Heart,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ScrollAnimate } from '@/components/ui/scroll-animate';
import { CalBookingButton } from '@/components/widgets/CalBookingButton';

const phaseMeta = [
  { number: '01', icon: Search, gradient: 'from-blue-500 to-cyan-500' },
  { number: '02', icon: FileText, gradient: 'from-violet-500 to-purple-600' },
  { number: '03', icon: Code, gradient: 'from-emerald-500 to-teal-500' },
  { number: '04', icon: Bug, gradient: 'from-amber-500 to-orange-500' },
  { number: '05', icon: Rocket, gradient: 'from-pink-500 to-rose-500' },
  { number: '06', icon: Heart, gradient: 'from-red-500 to-pink-500' },
] as const;

const PRINCIPLES_COUNT = 4;

export default function MethodologyPage() {
  const t = useTranslations('methodology');
  const tCta = useTranslations('methodology.cta');

  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex-1">
        {/* Hero */}
        <section className="relative w-full pt-28 pb-16 md:pb-24 overflow-hidden">
          {/* Background image - using Next.js Image for optimization */}
          <Image
            src="/images/methodology-hero.jpg"
            alt=""
            aria-hidden="true"
            fill
            className="object-cover object-center z-0 opacity-30"
            priority
            sizes="100vw"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-background/60 dark:bg-background/75 z-[1] pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none z-[1]"
          />
          <div
            aria-hidden="true"
            className="absolute top-0 start-1/2 -translate-x-1/2 size-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none z-[1]"
          />

          <div className="container relative z-10 px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center space-y-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm font-medium text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                {t('badge')}
              </span>

              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-balance font-heebo">
                {t('titleLine1')}
                <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {t('titleLine2')}
                </span>
              </h1>

              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg leading-relaxed text-pretty">
                {t('subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Phases */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto space-y-8 md:space-y-10">
              {phaseMeta.map((phase, index) => {
                const Icon = phase.icon;
                const deliverableCount = (
                  t.raw(`phases.${index}.deliverables`) as string[]
                ).length;

                return (
                  <ScrollAnimate key={phase.number} delay={index * 0.05}>
                    <motion.article
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      viewport={{ once: true }}
                      className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 md:p-10 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/10"
                    >
                      <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                        {/* Icon + number column */}
                        <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-3 shrink-0">
                          <div
                            className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${phase.gradient} text-white shadow-lg shrink-0`}
                          >
                            <Icon className="h-8 w-8" />
                          </div>
                          <div className="text-4xl md:text-5xl font-bold text-muted-foreground/15 select-none tabular-nums font-heebo">
                            {phase.number}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-5 min-w-0">
                          <header className="space-y-2">
                            <h2 className="text-2xl md:text-3xl font-bold font-heebo text-balance">
                              {t(`phases.${index}.title`)}
                            </h2>
                            <p className="text-base text-foreground/70 leading-relaxed">
                              {t(`phases.${index}.subtitle`)}
                            </p>
                          </header>

                          <p className="text-muted-foreground leading-relaxed text-pretty">
                            {t(`phases.${index}.paragraph`)}
                          </p>

                          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
                            <div>
                              <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                                {t('deliverablesLabel')}
                              </h3>
                              <ul className="grid gap-2 sm:grid-cols-2">
                                {Array.from({ length: deliverableCount }).map(
                                  (_, dIndex) => (
                                    <li
                                      key={dIndex}
                                      className="flex items-start gap-2 text-sm text-muted-foreground"
                                    >
                                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                      <span className="leading-relaxed">
                                        {t(`phases.${index}.deliverables.${dIndex}`)}
                                      </span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>

                            <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-4 py-2 text-sm text-foreground/80 self-start md:self-end whitespace-nowrap">
                              <Clock className="h-4 w-4 text-primary" />
                              <span className="font-medium">
                                {t(`phases.${index}.duration`)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  </ScrollAnimate>
                );
              })}
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="w-full py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
          <div className="container relative px-4 md:px-6">
            <ScrollAnimate>
              <div className="text-center mb-12 max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4 font-heebo">
                  {t('principles.title')}
                </h2>
                <p className="text-muted-foreground md:text-lg text-pretty">
                  {t('principles.subtitle')}
                </p>
              </div>
            </ScrollAnimate>

            <div className="grid gap-5 md:grid-cols-2 max-w-4xl mx-auto">
              {Array.from({ length: PRINCIPLES_COUNT }).map((_, idx) => (
                <ScrollAnimate key={idx} delay={idx * 0.05}>
                  <div className="rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm p-6 hover:border-primary/30 transition-colors duration-300">
                    <h3 className="text-lg font-semibold mb-2 font-heebo">
                      {t(`principles.items.${idx}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
                      {t(`principles.items.${idx}.description`)}
                    </p>
                  </div>
                </ScrollAnimate>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-16 md:py-24 relative overflow-hidden">
          <div className="absolute top-1/2 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-2xl pointer-events-none" />

          <div className="container relative px-4 md:px-6">
            <ScrollAnimate>
              <div className="max-w-2xl mx-auto text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-heebo text-balance">
                  {tCta('title')}
                </h2>
                <p className="text-muted-foreground md:text-lg text-pretty">
                  {tCta('subtitle')}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  {/* Primary: Cal.com booking (with WhatsApp fallback inside the component) */}
                  <CalBookingButton
                    calLink="eladjak/30min"
                    label={tCta('bookCall')}
                    className="inline-flex items-center gap-2 rounded-full bg-cta px-8 py-4 text-base font-medium text-cta-foreground shadow-lg shadow-cta/25 hover:bg-cta/90 hover:shadow-xl hover:shadow-cta/30 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                  {/* Secondary CTAs */}
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-8 py-4 text-base font-medium text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {tCta('ctaPrimary')}
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-8 py-4 text-base font-medium text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {tCta('ctaSecondary')}
                  </Link>
                </div>
              </div>
            </ScrollAnimate>
          </div>
        </section>
      </main>
    </div>
  );
}
