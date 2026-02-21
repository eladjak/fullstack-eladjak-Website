'use client';

import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  Globe,
  BookOpen,
  Code,
  Coffee,
  Briefcase,
  GraduationCap,
  Palette,
  Rocket,
  Heart,
} from 'lucide-react';
import { SocialLink } from '@/components/ui/social-link';
import { ScrollAnimate } from '@/components/ui/scroll-animate';
import { useMetaTags } from '@/hooks/useMetaTags';
import { useTranslations } from 'next-intl';

const highlightIcons = [Code, BookOpen, Coffee];
const highlightKeys = ['technicalSkills', 'continuousLearning', 'problemSolving'] as const;

const timelineIcons = [Palette, Briefcase, GraduationCap, Rocket];
const timelineKeys = ['arts', 'business', 'education', 'present'] as const;

const traitKeys = ['maturity', 'selfLearning', 'creative', 'results'] as const;

export default function AboutPage() {
  const t = useTranslations('about');

  useMetaTags({
    title: "About Elad Ya'akobovitch | Full-Stack Developer",
    description:
      "Learn about my journey from arts and business to full-stack development. Combining technical expertise with creative vision.",
    image: 'https://avatars.githubusercontent.com/u/108827199?v=4',
    type: 'profile',
  });

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero */}
        <section className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-56 h-56 rounded-full bg-accent/5 blur-3xl" />

          <div className="container relative px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-8 text-center"
            >
              {/* Avatar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="relative">
                  <div className="h-28 w-28 rounded-full bg-gradient-to-br from-primary to-accent p-[3px]">
                    <div className="h-full w-full rounded-full bg-background flex items-center justify-center">
                      <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">EY</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-emerald-500 border-4 border-background flex items-center justify-center">
                    <span className="text-white text-xs">&#10003;</span>
                  </div>
                </div>
              </motion.div>

              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">{t('title')}</h1>
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{t('name')}</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  {t('subtitle')}
                </p>
              </div>

              {/* Highlights */}
              <div className="grid gap-6 md:grid-cols-3 max-w-4xl w-full">
                {highlightKeys.map((key, index) => {
                  const Icon = highlightIcons[index]!;
                  return (
                    <ScrollAnimate key={key} delay={index * 0.05}>
                      <div className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative flex flex-col items-center space-y-3 p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300">
                          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Icon className="h-6 w-6" />
                          </div>
                          <h3 className="text-lg font-semibold">
                            {t(`highlights.${key}.title`)}
                          </h3>
                          <p className="text-sm text-muted-foreground text-center">
                            {t(`highlights.${key}.description`)}
                          </p>
                        </div>
                      </div>
                    </ScrollAnimate>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="w-full py-16 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <ScrollAnimate>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
                  {t('journey.title')}
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-lg">
                  {t('journey.subtitle')}
                </p>
              </div>
            </ScrollAnimate>

            <div className="max-w-3xl mx-auto">
              {timelineKeys.map((key, index) => {
                const Icon = timelineIcons[index]!;
                const isLast = index === timelineKeys.length - 1;
                return (
                  <ScrollAnimate key={key} delay={index * 0.05}>
                    <div className="relative flex gap-6 pb-10 last:pb-0">
                      {/* Timeline line with gradient and scroll reveal */}
                      {!isLast && (
                        <div className="absolute left-6 top-14 w-px h-full bg-gradient-to-b from-primary/30 to-border/30 scroll-reveal-bar" />
                      )}

                      {/* Icon with gradient ring */}
                      <div className="relative flex-shrink-0">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-full ${isLast ? 'bg-gradient-to-br from-primary to-accent text-white' : 'bg-primary/10 border-2 border-primary/20 text-primary'}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-1">
                        <span className="text-xs font-medium uppercase tracking-wider text-primary">
                          {t(`journey.items.${key}.year`)}
                        </span>
                        <h3 className="text-lg font-semibold mt-1">
                          {t(`journey.items.${key}.title`)}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                          {t(`journey.items.${key}.description`)}
                        </p>
                      </div>
                    </div>
                  </ScrollAnimate>
                );
              })}
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <ScrollAnimate>
                <div>
                  <h2 className="text-2xl font-bold mb-4">{t('experience.title')}</h2>
                  <p className="text-muted-foreground mb-4">{t('experience.intro')}</p>
                  <ul className="text-muted-foreground mb-6 space-y-2 list-none">
                    {(['haderech', 'cms', 'edutech', 'tools'] as const).map((key) => (
                      <li key={key} className="flex gap-3">
                        <span className="text-primary font-bold">--</span>
                        <span dangerouslySetInnerHTML={{ __html: t.raw(`experience.${key}`) as string }} />
                      </li>
                    ))}
                  </ul>
                  <p
                    className="text-muted-foreground mb-6"
                    dangerouslySetInnerHTML={{ __html: t.raw('experience.expertise') as string }}
                  />
                  <p className="text-muted-foreground mb-8">{t('experience.beyond')}</p>
                </div>
              </ScrollAnimate>

              {/* What Makes Me Unique */}
              <ScrollAnimate>
                <div>
                  <h2 className="text-2xl font-bold mb-6">{t('unique.title')}</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {traitKeys.map((key, index) => (
                      <ScrollAnimate key={key} delay={index * 0.05}>
                        <div className="p-4 rounded-lg border border-border/50 bg-card/50 hover:border-primary/30 transition-colors duration-200">
                          <h3 className="font-semibold text-sm text-primary mb-1">
                            {t(`unique.traits.${key}.title`)}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {t(`unique.traits.${key}.description`)}
                          </p>
                        </div>
                      </ScrollAnimate>
                    ))}
                  </div>
                </div>
              </ScrollAnimate>

              {/* Looking For */}
              <ScrollAnimate>
                <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
                  <div className="flex items-start gap-4">
                    <Heart className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-2xl font-bold mb-3">{t('lookingFor.title')}</h2>
                      <p className="text-muted-foreground mb-3">{t('lookingFor.p1')}</p>
                      <p className="text-muted-foreground mb-3">{t('lookingFor.p2')}</p>
                      <p className="text-muted-foreground">{t('lookingFor.p3')}</p>
                    </div>
                  </div>
                </div>
              </ScrollAnimate>
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section className="w-full py-12 bg-muted/30">
          <div className="container px-4 md:px-6">
            <ScrollAnimate>
              <div className="flex flex-col items-center space-y-4">
                <h3 className="text-xl font-semibold">{t('connect')}</h3>
                <div className="flex gap-3">
                  <SocialLink href="https://github.com/eladjak" icon={Github} label="GitHub Profile" />
                  <SocialLink href="https://linkedin.com/in/eladjak" icon={Linkedin} label="LinkedIn Profile" />
                  <SocialLink href="mailto:elad@hiteclearning.co.il" icon={Mail} label="Send Email" />
                  <SocialLink href="https://fullstack-eladjak.co.il" icon={Globe} label="Portfolio Website" />
                </div>
              </div>
            </ScrollAnimate>
          </div>
        </section>
      </main>
    </div>
  );
}
