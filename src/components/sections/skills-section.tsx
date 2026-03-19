'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';
import { ScrollAnimate } from '@/components/ui/scroll-animate';
import {
  Globe,
  Sparkles,
  Server,
  Smartphone,
  type LucideIcon
} from 'lucide-react';

interface TechTag {
  name: string;
}

interface Capability {
  titleKey: string;
  descriptionKey: string;
  icon: LucideIcon;
  gradient: string;
  techTags: TechTag[];
}

const capabilities: Capability[] = [
  {
    titleKey: 'webApps',
    descriptionKey: 'webAppsDesc',
    icon: Globe,
    gradient: 'from-blue-500/15 to-cyan-500/15',
    techTags: [
      { name: 'Next.js' },
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' },
    ],
  },
  {
    titleKey: 'aiIntegration',
    descriptionKey: 'aiIntegrationDesc',
    icon: Sparkles,
    gradient: 'from-violet-500/15 to-purple-500/15',
    techTags: [
      { name: 'OpenAI' },
      { name: 'Claude AI' },
      { name: 'LangChain' },
      { name: 'Vector DBs' },
    ],
  },
  {
    titleKey: 'backendApis',
    descriptionKey: 'backendApisDesc',
    icon: Server,
    gradient: 'from-emerald-500/15 to-green-500/15',
    techTags: [
      { name: 'Node.js' },
      { name: 'Supabase' },
      { name: 'PostgreSQL' },
      { name: 'REST & GraphQL' },
    ],
  },
  {
    titleKey: 'mobileCrossPlatform',
    descriptionKey: 'mobileCrossPlatformDesc',
    icon: Smartphone,
    gradient: 'from-amber-500/15 to-orange-500/15',
    techTags: [
      { name: 'React Native' },
      { name: 'PWA' },
      { name: 'Responsive Design' },
      { name: 'Mobile-First' },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function SkillsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const t = useTranslations('skills');

  const stats = [
    { value: '3+', label: t('stats.experience') },
    { value: '20+', label: t('stats.projects') },
    { value: '15+', label: t('stats.technologies') },
  ];

  return (
    <section id="skills" className="w-full py-16 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <ScrollAnimate>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              {t('title')}
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              {t('subtitle')}
            </p>
          </div>
        </ScrollAnimate>

        {/* Capabilities Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
        >
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <motion.div
                key={capability.titleKey}
                variants={cardVariants}
                className="relative group scroll-fade"
              >
                {/* Hover gradient glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${capability.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Card */}
                <div className="relative h-full p-6 md:p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  {/* Decorative corner accent */}
                  <div
                    className={`absolute -top-10 -end-10 h-20 w-20 rounded-full bg-gradient-to-br ${capability.gradient} opacity-40`}
                  />

                  <div className="relative space-y-4">
                    {/* Icon + Title */}
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br ${capability.gradient} text-primary-foreground shrink-0`}
                      >
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold mb-2">
                          {t(`capabilities.${capability.titleKey}.title`)}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {t(`capabilities.${capability.titleKey}.description`)}
                        </p>
                      </div>
                    </div>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {capability.techTags.map((tag) => (
                        <span
                          key={tag.name}
                          className="px-3 py-1 text-xs font-medium rounded-lg bg-background/60 border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors duration-200"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center scroll-scale"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
