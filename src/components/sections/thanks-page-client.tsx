'use client';

import { motion } from 'framer-motion';
import { Globe, Twitter, Github, Linkedin, GraduationCap, Youtube, Facebook, Instagram, Send } from 'lucide-react';
import Image from 'next/image';
import { ScrollAnimate } from '@/components/ui/scroll-animate';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/components/providers/locale-provider';

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
  type: 'website' | 'twitter' | 'github' | 'linkedin' | 'youtube' | 'facebook' | 'instagram' | 'telegram';
  url: string;
}

type PersonCategory = 'ai' | 'dev' | 'educator' | 'creator' | 'futurist';

const categoryColors: Record<PersonCategory, string> = {
  ai: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  dev: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  educator: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  creator: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  futurist: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
};

const categoryLabels: Record<PersonCategory, { he: string; en: string }> = {
  ai: { he: 'AI', en: 'AI' },
  dev: { he: 'פיתוח', en: 'Dev' },
  educator: { he: 'חינוך', en: 'Education' },
  creator: { he: 'יוצר', en: 'Creator' },
  futurist: { he: 'עתידנות', en: 'Futurism' },
};

interface Person {
  key: string;
  initials: string;
  category: PersonCategory;
  photo?: string;
  links: PersonLink[];
}

const people: Person[] = [
  {
    key: 'yuval',
    initials: 'YA',
    category: 'ai',
    photo: '/images/mentors/yuval-avidani.jpg',
    links: [
      { type: 'website', url: 'https://yuv.ai' },
      { type: 'linkedin', url: 'https://linkedin.com/in/yuval-avidani-87081474' },
      { type: 'twitter', url: 'https://x.com/yuvalav' },
      { type: 'github', url: 'https://github.com/hoodini' },
    ],
  },
  {
    key: 'avitz',
    initials: 'AV',
    category: 'ai',
    photo: '/images/mentors/avitz.jpg',
    links: [
      { type: 'website', url: 'https://aviz.live' },
      { type: 'twitter', url: 'https://x.com/avitz' },
      { type: 'youtube', url: 'https://youtube.com/@avitz' },
    ],
  },
  {
    key: 'noam',
    initials: 'NN',
    category: 'educator',
    links: [],
  },
  {
    key: 'gal',
    initials: 'GH',
    category: 'dev',
    photo: '/images/mentors/gal-havkin.jpg',
    links: [
      { type: 'github', url: 'https://github.com/Quegenx' },
    ],
  },
  {
    key: 'roey',
    initials: 'RT',
    category: 'futurist',
    photo: '/images/mentors/roey-tzezana.jpg',
    links: [
      { type: 'website', url: 'https://curatingthefuture.com' },
      { type: 'twitter', url: 'https://x.com/blazing_science' },
      { type: 'youtube', url: 'https://youtube.com/@curatingthefuture' },
    ],
  },
  {
    key: 'roi',
    initials: 'RY',
    category: 'ai',
    photo: '/images/mentors/roi-yozevitch.png',
    links: [
      { type: 'website', url: 'https://yozevitch.com' },
      { type: 'linkedin', url: 'https://linkedin.com/in/dr-roy-yozevitch-8a44516b' },
      { type: 'facebook', url: 'https://facebook.com/Yozevitch.Roi' },
    ],
  },
  {
    key: 'nadav',
    initials: 'NV',
    category: 'creator',
    links: [
      { type: 'linkedin', url: 'https://linkedin.com/in/nadav-naveh' },
      { type: 'twitter', url: 'https://x.com/Nadav__Naveh' },
    ],
  },
  {
    key: 'guy',
    initials: 'GA',
    category: 'ai',
    links: [
      { type: 'website', url: 'https://ai-academy.co.il' },
      { type: 'linkedin', url: 'https://linkedin.com/in/guyaga' },
      { type: 'facebook', url: 'https://facebook.com/Guyaga' },
    ],
  },
  {
    key: 'yuvalK',
    initials: 'YK',
    category: 'creator',
    links: [
      { type: 'website', url: 'https://newsletter.aimakerslab.io' },
      { type: 'linkedin', url: 'https://linkedin.com/in/yuvalkesh' },
      { type: 'twitter', url: 'https://x.com/KeshYuval' },
    ],
  },
  {
    key: 'alexanderK',
    initials: 'AK',
    category: 'dev',
    links: [
      { type: 'website', url: 'https://alekapit.com' },
      { type: 'linkedin', url: 'https://linkedin.com/in/akapit' },
    ],
  },
  {
    key: 'danielT',
    initials: 'DT',
    category: 'educator',
    links: [],
  },
  {
    key: 'arielE',
    initials: 'AE',
    category: 'ai',
    links: [
      { type: 'website', url: 'https://aisrael.co.il' },
      { type: 'linkedin', url: 'https://linkedin.com/in/ariel-eisen' },
    ],
  },
];

const linkIcons = {
  website: Globe,
  twitter: Twitter,
  github: Github,
  linkedin: Linkedin,
  youtube: Youtube,
  facebook: Facebook,
  instagram: Instagram,
  telegram: Send,
} as const;

export default function ThanksPageClient() {
  const t = useTranslations('thanksPage');
  const { locale } = useLocale();

  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex-1">
        {/* Hero */}
        <section className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden">
          {/* Hero illustration */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/section-thanks.jpg"
              alt=""
              fill
              className="object-cover opacity-[0.08]"
              priority
              aria-hidden="true"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="absolute top-20 start-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-10 end-10 w-56 h-56 rounded-full bg-accent/5 blur-3xl" />

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
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl [text-shadow:0_0_40px_hsl(var(--primary)/0.4)]">
                  {t('title')}
                </h1>
                <p className="mx-auto max-w-[600px] text-foreground/70 md:text-lg">
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
                    <div className="relative flex flex-col h-full p-6 rounded-xl bg-card border border-border/50 backdrop-blur-sm hover:border-primary/20 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300">
                      {/* Category badge */}
                      <div className="absolute top-3 end-3">
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryColors[person.category]}`}>
                          {categoryLabels[person.category][locale === 'he' ? 'he' : 'en']}
                        </span>
                      </div>

                      {/* Avatar */}
                      <div className="flex items-start gap-4 mb-4">
                        {person.photo ? (
                          <div className={`flex-shrink-0 h-14 w-14 rounded-full bg-gradient-to-br ${GRADIENT_COLORS[index % GRADIENT_COLORS.length]} p-[2px] shadow-md shadow-primary/20`}>
                            <Image
                              src={person.photo}
                              alt={t(`people.${person.key}.name`)}
                              width={56}
                              height={56}
                              sizes="56px"
                              className="rounded-full object-cover w-full h-full"
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          <div className={`flex-shrink-0 h-14 w-14 rounded-full bg-gradient-to-br ${GRADIENT_COLORS[index % GRADIENT_COLORS.length]} flex items-center justify-center shadow-md shadow-primary/20`}>
                            <span className="text-sm font-bold text-white">
                              {person.initials}
                            </span>
                          </div>
                        )}
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
                                className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary hover:scale-110 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                aria-label={`ביקור בפרופיל ${link.type} של ${t(`people.${person.key}.name`)}`}
                              >
                                <Icon className="h-4 w-4" aria-hidden="true" />
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
