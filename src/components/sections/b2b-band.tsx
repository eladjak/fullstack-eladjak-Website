'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Brain, Code2, GraduationCap, Building2 } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ScrollAnimate } from '@/components/ui/scroll-animate';

/**
 * Subtle B2B-focused band aimed at organizations and dev teams.
 * Additive — sits as its own small section, doesn't replace the main CTA.
 * Content is i18n-driven; deliberately avoids fake stats ("100+ ארגונים" etc.).
 */
export default function B2BBand() {
  const t = useTranslations('b2bBand');

  const offerings = [
    { icon: Brain, key: 0 },
    { icon: Code2, key: 1 },
    { icon: GraduationCap, key: 2 },
  ] as const;

  return (
    <section
      aria-labelledby="b2b-band-heading"
      className="w-full py-12 md:py-16 relative overflow-hidden"
    >
      <div className="container px-4 md:px-6">
        <ScrollAnimate>
          <div className="max-w-5xl mx-auto rounded-2xl border border-border/50 bg-gradient-to-br from-card/60 via-card/40 to-accent/[0.04] backdrop-blur-sm p-6 md:p-8">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start lg:items-center">
              {/* Heading + intro */}
              <div className="flex items-start gap-4 lg:max-w-sm shrink-0">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-primary text-white shadow-md shrink-0">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">
                    {t('eyebrow')}
                  </p>
                  <h2
                    id="b2b-band-heading"
                    className="text-xl md:text-2xl font-bold font-heebo text-balance leading-tight"
                  >
                    {t('title')}
                  </h2>
                </div>
              </div>

              {/* Offerings list */}
              <ul className="grid gap-3 sm:grid-cols-3 flex-1 w-full">
                {offerings.map((o, idx) => {
                  const Icon = o.icon;
                  const label = t(`items.${o.key}.label`);
                  return (
                    <motion.li
                      key={label}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut', delay: idx * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 rounded-lg border border-border/40 bg-background/40 p-3"
                    >
                      <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold leading-tight">{label}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                          {t(`items.${o.key}.description`)}
                        </p>
                      </div>
                    </motion.li>
                  );
                })}
              </ul>

              {/* CTA */}
              <Link
                href="/methodology"
                className="inline-flex items-center gap-2 rounded-full bg-foreground/90 px-5 py-3 text-sm font-medium text-background hover:bg-foreground transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shrink-0 self-start lg:self-auto"
              >
                {t('cta')}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}
