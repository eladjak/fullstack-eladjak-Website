'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ScrollAnimate } from '@/components/ui/scroll-animate';

type Category = 'all' | 'web' | 'ai' | 'tools';

interface StaticProject {
  id: string;
  messageKey: string;
  category: Category;
  technologies: string[];
  github_url: string;
  live_url?: string;
  gradient: string;
  icon: string;
  image?: string;
}

const allProjects: StaticProject[] = [
  {
    id: 'haderech',
    messageKey: 'haderech',
    category: 'web',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Convex', 'Clerk', 'Tailwind CSS'],
    github_url: 'https://github.com/eladjak/Haderech-Next',
    live_url: 'https://haderech-next.vercel.app',
    gradient: 'from-violet-500/20 to-purple-600/20',
    icon: 'HaDerech',
    image: '/projects/haderech.png',
  },
  {
    id: 'portfolio',
    messageKey: 'portfolio',
    category: 'web',
    technologies: ['Next.js 16', 'TypeScript', 'Framer Motion', 'MDX', 'next-intl'],
    github_url: 'https://github.com/eladjak/fullstack-eladjak-Website',
    live_url: 'https://fullstack-eladjak.co.il',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    icon: 'Portfolio',
    image: '/projects/portfolio.png',
  },
  {
    id: 'ey-ai-kids',
    messageKey: 'eyAiKids',
    category: 'ai',
    technologies: ['React', 'TypeScript', 'AI/ML', 'Tailwind CSS', 'Node.js'],
    github_url: 'https://github.com/eladjak/ey.ai-kids-playground',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    icon: 'EY.AI',
  },
  {
    id: 'ninja-keyboard',
    messageKey: 'ninjaKeyboard',
    category: 'tools',
    technologies: ['Next.js 15', 'React 19', 'Supabase', 'Zustand', 'next-intl', 'Vitest'],
    github_url: 'https://github.com/eladjak/ninja-keyboard',
    gradient: 'from-red-500/20 to-orange-500/20',
    icon: 'Ninja',
  },
  {
    id: 'voice-chat',
    messageKey: 'voiceChat',
    category: 'ai',
    technologies: ['TypeScript', 'Whisper', 'Claude API', 'ElevenLabs', 'WebSocket'],
    github_url: 'https://github.com/eladjak/voice-chat-claude',
    gradient: 'from-fuchsia-500/20 to-pink-500/20',
    icon: 'Voice',
  },
  {
    id: 'omanut',
    messageKey: 'omanut',
    category: 'web',
    technologies: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Responsive Design'],
    github_url: 'https://github.com/eladjak/omanut-hakesher-website',
    live_url: 'https://omanut-hakesher-website.vercel.app',
    gradient: 'from-amber-500/20 to-orange-500/20',
    icon: 'Omanut',
    image: '/projects/omanut.png',
  },
  {
    id: 'bayit-beseder',
    messageKey: 'bayitBeseder',
    category: 'web',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Framer Motion'],
    github_url: 'https://github.com/eladjak/bayit-beseder',
    gradient: 'from-lime-500/20 to-green-500/20',
    icon: 'Bayit',
  },
  {
    id: 'zehutai',
    messageKey: 'zehutai',
    category: 'ai',
    technologies: ['Python', 'NLP', 'RAG', 'CI/CD', 'pytest'],
    github_url: 'https://github.com/eladjak/ZehutAI',
    gradient: 'from-sky-500/20 to-blue-600/20',
    icon: 'Zehut',
  },
  {
    id: 'kidushishi',
    messageKey: 'kidushishi',
    category: 'tools',
    technologies: ['React 18', 'TypeScript', 'Vite', 'Supabase', 'Mapbox'],
    github_url: 'https://github.com/eladjak/kidushishi-menegment-app',
    gradient: 'from-teal-500/20 to-cyan-500/20',
    icon: 'Kidush',
  },
  {
    id: 'html-to-pptx',
    messageKey: 'htmlToPptx',
    category: 'tools',
    technologies: ['Next.js 14', 'TypeScript', 'pptxgenjs', 'JSDOM', 'Tailwind CSS'],
    github_url: 'https://github.com/eladjak/html-to-pptx',
    live_url: 'https://html-to-pptx-ten.vercel.app',
    gradient: 'from-orange-500/20 to-amber-500/20',
    icon: 'PPTX',
  },
  {
    id: 'hebrew-calendar',
    messageKey: 'hebrewCalendar',
    category: 'tools',
    technologies: ['React', 'FullCalendar', 'Hebrew Calendar API', 'Google OAuth', 'i18n'],
    github_url: 'https://github.com/eladjak/hebrew-gregorian-calendar',
    gradient: 'from-indigo-500/20 to-blue-500/20',
    icon: 'Calendar',
  },
  {
    id: 'vacation-vibe',
    messageKey: 'vacationVibe',
    category: 'web',
    technologies: ['React', 'TypeScript', 'NestJS', 'TypeORM', 'Redux Toolkit', 'Material-UI'],
    github_url: 'https://github.com/eladjak/Vacation-STUDENT_ID_Final',
    live_url: 'https://vacation-vibe-pi.vercel.app',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    icon: 'Vacation',
  },
  {
    id: 'team-meetings',
    messageKey: 'teamMeetings',
    category: 'tools',
    technologies: ['React', 'TypeScript', 'Vite', 'FullCalendar', 'MUI', 'Framer Motion'],
    github_url: 'https://github.com/eladjak/team-meetings',
    live_url: 'https://team-meetings.vercel.app',
    gradient: 'from-purple-500/20 to-violet-500/20',
    icon: 'Meetings',
  },
  {
    id: 'customer-crm',
    messageKey: 'customerCrm',
    category: 'web',
    technologies: ['Angular', 'Node.js', 'Express', 'MongoDB', 'JWT Auth'],
    github_url: 'https://github.com/eladjak/Custome-Mengment-Angular',
    live_url: 'https://customer-crm-tau.vercel.app',
    gradient: 'from-rose-500/20 to-pink-500/20',
    icon: 'CRM',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function ProjectsPage() {
  const t = useTranslations('projectsPage');
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const categories: { key: Category; label: string }[] = [
    { key: 'all', label: t('allCategories') },
    { key: 'web', label: t('categories.web') },
    { key: 'ai', label: t('categories.ai') },
    { key: 'tools', label: t('categories.tools') },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-12">
      <ScrollAnimate>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl mb-4">
            {t('title')}
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
            {t('subtitle')}
          </p>
        </div>
      </ScrollAnimate>

      {/* Category filters */}
      <ScrollAnimate delay={0.1}>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                activeCategory === cat.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {cat.label}
              <span className="ms-1.5 text-xs opacity-70">
                {cat.key === 'all'
                  ? allProjects.length
                  : allProjects.filter((p) => p.category === cat.key).length}
              </span>
            </button>
          ))}
        </div>
      </ScrollAnimate>

      {/* Projects grid */}
      <motion.div
        key={activeCategory}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filteredProjects.map((project) => (
          <motion.div key={project.id} variants={cardVariants} className="group">
            <div className="relative h-full rounded-xl border border-border/50 bg-card overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
              {/* Project header - screenshot or gradient */}
              <div
                className={`relative h-36 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.icon}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <>
                    <div className="absolute -top-8 -end-8 h-24 w-24 rounded-full bg-primary/10" />
                    <div className="absolute -bottom-4 -start-4 h-16 w-16 rounded-full bg-accent/10" />
                    <span className="relative text-2xl font-bold text-primary/80">
                      {project.icon}
                    </span>
                  </>
                )}
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-200">
                  {t(`projects.${project.messageKey}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {t(`projects.${project.messageKey}.description`)}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 pt-2 border-t border-border/50">
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                    aria-label={`View source code for ${project.icon}`}
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    <span>{t('code')}</span>
                  </a>
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                      aria-label={`Live demo of ${project.icon}`}
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      <span>{t('liveDemo')}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
