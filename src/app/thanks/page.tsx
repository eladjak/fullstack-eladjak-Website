'use client';

import { motion } from 'framer-motion';
import { Globe, Twitter, Github, Linkedin, GraduationCap } from 'lucide-react';
import { ScrollAnimate } from '@/components/ui/scroll-animate';
import { useMetaTags } from '@/hooks/useMetaTags';
import { useTranslations } from 'next-intl';

const GRADIENT_COLORS = [
  'from-violet-500 to-purple-600',
  'from-blue-500 to-cyan-500',
  'from-emerald-500 to-teal-500',
  'from-orange-500 to-amber-500',
  'from-pink-500 to-rose-500',
  'from-indigo-500 to-blue-600',
  'from-teal-500 to-green-500',
  'from-red-500 to-orange-500',
];

interface PersonLink {
  type: 'website' | 'twitter' | 'github' | 'linkedin';
  url: string;
}

interface Person {
  key: string;
  initials: string;
  links: PersonLink[];
}

const people: Person[] = [
  {
    key: 'yuval',
    initials: 'YA',
    links: [
      { type: 'website', url: 'https://yuv.ai' },
      { type: 'twitter', url: 'https://x.com/yuvalav' },
      { type: 'github', url: 'https://github.com/hoodini' },
    ],
  },
  {
    key: 'avitz',
    initials: 'AV',
    links: [
      { type: 'website', url: 'https://aviz.live' },
      { type: 'twitter', url: 'https://x.com/avitz' },
    ],
  },
  {
    key: 'noam',
    initials: 'NN',
    links: [],
  },
  {
    key: 'gal',
    initials: 'GH',
    links: [],
  },
  {
    key: 'roey',
    initials: 'RT',
    links: [
      { type: 'website', url: 'https://curatingthefuture.com' },
      { type: 'twitter', url: 'https://x.com/blazing_science' },
    ],
  },
  {
    key: 'roi',
    initials: 'RY',
    links: [
      { type: 'website', url: 'https://yozevitch.com' },
    ],
  },
  {
    key: 'nadav',
    initials: 'NV',
    links: [],
  },
  {
    key: 'guy',
    initials: 'GA',
    links: [
      { type: 'website', url: 'https://ai-academy.co.il' },
      { type: 'linkedin', url: 'https://linkedin.com/in/guyaga' },
    ],
  },
];

const linkIcons = {
  website: Globe,
  twitter: Twitter,
  github: Github,
  linkedin: Linkedin,
} as const;

export default function ThanksPage() {
  const t = useTranslations('thanksPage');

  useMetaTags({
    title: "People Who Inspire Me | Elad Ya'akobovitch",
    description:
      'Mentors, educators, and thought leaders in tech & AI who have shaped my development journey.',
    type: 'website',
  });

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero */}
        <section className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-56 h-56 rounded-full bg-accent/5 blur-3xl" />

          <div className="container relative px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-6 text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white">
                  <GraduationCap className="h-8 w-8" />
                </div>
              </motion.div>

              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                  {t('title')}
                </h1>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-lg">
                  {t('subtitle')}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* People Grid */}
        <section className="w-full py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {people.map((person, index) => (
                <ScrollAnimate key={person.key} delay={index * 0.04}>
                  <div className="group relative h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative flex flex-col h-full p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                      {/* Avatar */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`flex-shrink-0 h-14 w-14 rounded-full bg-gradient-to-br ${GRADIENT_COLORS[index % GRADIENT_COLORS.length]} flex items-center justify-center`}>
                          <span className="text-sm font-bold text-white">
                            {person.initials}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-lg leading-tight">
                            {t(`people.${person.key}.name`)}
                          </h3>
                          <p className="text-sm text-primary font-medium mt-0.5">
                            {t(`people.${person.key}.role`)}
                          </p>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                        {t(`people.${person.key}.bio`)}
                      </p>

                      {/* Links */}
                      {person.links.length > 0 && (
                        <div className="flex gap-2 mt-4 pt-4 border-t border-border/30">
                          {person.links.map((link) => {
                            const Icon = linkIcons[link.type];
                            return (
                              <a
                                key={link.url}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                                aria-label={`${link.type} link`}
                              >
                                <Icon className="h-4 w-4" />
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </ScrollAnimate>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
