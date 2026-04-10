'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Github, ExternalLink, Eye } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { ScrollAnimate } from '@/components/ui/scroll-animate';

const ProjectPreviewModal = dynamic(
  () => import('@/components/ui/project-preview-modal').then((m) => m.ProjectPreviewModal),
  { ssr: false }
);

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
    image: '/projects/haderech-screenshot.png',
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
    image: '/projects/portfolio-screenshot.png',
  },
  {
    id: 'ey-ai-kids',
    messageKey: 'eyAiKids',
    category: 'ai',
    technologies: ['React', 'TypeScript', 'AI/ML', 'Tailwind CSS', 'Node.js'],
    github_url: 'https://github.com/eladjak/ey.ai-kids-playground',
    live_url: 'https://sipurai.ai',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    icon: 'EY.AI',
    image: '/projects/ey-ai-kids-screenshot.png',
  },
  {
    id: 'ninja-keyboard',
    messageKey: 'ninjaKeyboard',
    category: 'tools',
    technologies: ['Next.js 15', 'React 19', 'Supabase', 'Zustand', 'next-intl', 'Vitest'],
    github_url: 'https://github.com/eladjak/ninja-keyboard',
    gradient: 'from-red-500/20 to-orange-500/20',
    icon: 'Ninja',
    image: '/projects/ninja-keyboard.jpg',
  },
  {
    id: 'voice-chat',
    messageKey: 'voiceChat',
    category: 'ai',
    technologies: ['TypeScript', 'Whisper', 'Claude API', 'ElevenLabs', 'WebSocket'],
    github_url: 'https://github.com/eladjak/voice-chat-claude',
    gradient: 'from-fuchsia-500/20 to-pink-500/20',
    icon: 'Voice',
    image: '/projects/voice-chat.jpg',
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
    image: '/projects/omanut-screenshot.png',
  },
  {
    id: 'bayit-beseder',
    messageKey: 'bayitBeseder',
    category: 'web',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Framer Motion'],
    github_url: 'https://github.com/eladjak/bayit-beseder',
    live_url: 'https://www.bayitbeseder.com',
    gradient: 'from-lime-500/20 to-green-500/20',
    icon: 'Bayit',
    image: '/projects/bayit-beseder-screenshot.png',
  },
  {
    id: 'zehutai',
    messageKey: 'zehutai',
    category: 'ai',
    technologies: ['Python', 'NLP', 'RAG', 'CI/CD', 'pytest'],
    github_url: 'https://github.com/eladjak/ZehutAI',
    gradient: 'from-sky-500/20 to-blue-600/20',
    icon: 'Zehut',
    image: '/projects/zehutai.jpg',
  },
  {
    id: 'kidushishi',
    messageKey: 'kidushishi',
    category: 'tools',
    technologies: ['React 18', 'TypeScript', 'Vite', 'Supabase', 'Mapbox'],
    github_url: 'https://github.com/eladjak/kidushishi-menegment-app',
    gradient: 'from-teal-500/20 to-cyan-500/20',
    icon: 'Kidush',
    image: '/projects/kidushishi.jpg',
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
    image: '/projects/html-to-pptx-screenshot.png',
  },
  {
    id: 'hebrew-calendar',
    messageKey: 'hebrewCalendar',
    category: 'tools',
    technologies: ['React', 'FullCalendar', 'Hebrew Calendar API', 'Google OAuth', 'i18n'],
    github_url: 'https://github.com/eladjak/hebrew-gregorian-calendar',
    live_url: 'https://hebrew-calendar-eosin.vercel.app',
    gradient: 'from-indigo-500/20 to-blue-500/20',
    icon: 'Calendar',
    image: '/projects/hebrew-calendar-screenshot.jpg',
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
    image: '/projects/vacation-vibe-screenshot.jpg',
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
    image: '/projects/team-meetings-screenshot.jpg',
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
    image: '/projects/customer-crm-screenshot.jpg',
  },
  {
    id: 'crypto-tracker',
    messageKey: 'cryptoTracker',
    category: 'tools',
    technologies: ['jQuery', 'AJAX', 'CoinGecko API', 'Chart.js', 'Bootstrap'],
    github_url: 'https://github.com/eladjak/Jquery-AJAX---Cryptocurrency-API-Tracking-Application-Project',
    gradient: 'from-yellow-500/20 to-amber-500/20',
    icon: 'Crypto',
    image: '/projects/crypto-tracker-screenshot.jpg',
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
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [previewProject, setPreviewProject] = useState<StaticProject | null>(null);

  const categories: { key: Category; label: string }[] = [
    { key: 'all', label: t('allCategories') },
    { key: 'web', label: t('categories.web') },
    { key: 'ai', label: t('categories.ai') },
    { key: 'tools', label: t('categories.tools') },
  ];

  // Collect all unique technologies across all projects, sorted by frequency
  const allTechs = useMemo(() => {
    const freq: Record<string, number> = {};
    for (const p of allProjects) {
      for (const tech of p.technologies) {
        freq[tech] = (freq[tech] ?? 0) + 1;
      }
    }
    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .map(([tech]) => tech);
  }, []);

  const toggleTech = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((item) => item !== tech) : [...prev, tech]
    );
  };

  const filteredProjects = useMemo(() => {
    let result = activeCategory === 'all' ? allProjects : allProjects.filter((p) => p.category === activeCategory);
    if (selectedTechs.length > 0) {
      result = result.filter((p) => selectedTechs.every((tech) => p.technologies.includes(tech)));
    }
    return result;
  }, [activeCategory, selectedTechs]);

  return (
    <>
      <div className="container mx-auto px-4 py-12">
        <ScrollAnimate>
          <div className="text-center mb-12">
            <h1 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              {t('title')}
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              {t('subtitle')}
            </p>
          </div>
        </ScrollAnimate>

        {/* Category filters */}
        <ScrollAnimate delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
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

        {/* Tech stack filter bar */}
        <ScrollAnimate delay={0.15}>
          <div
            className="mb-10"
            role="group"
            aria-label={t('techFilter.label')}
          >
            <div className="flex flex-wrap justify-center gap-2">
              {/* "All Tech" pill */}
              <button
                onClick={() => setSelectedTechs([])}
                aria-pressed={selectedTechs.length === 0}
                className={`rounded-full px-3.5 py-1 text-xs font-medium border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                  selectedTechs.length === 0
                    ? 'border-purple-500/60 bg-purple-500/15 text-purple-300'
                    : 'border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:bg-white/10 hover:text-white/80'
                }`}
              >
                {t('techFilter.all')}
              </button>

              {allTechs.map((tech) => {
                const active = selectedTechs.includes(tech);
                return (
                  <button
                    key={tech}
                    onClick={() => toggleTech(tech)}
                    aria-pressed={active}
                    className={`rounded-full px-3.5 py-1 text-xs font-medium border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                      active
                        ? 'border-purple-500/60 bg-purple-500/15 text-purple-300 shadow-[0_0_8px_rgba(168,85,247,0.25)]'
                        : 'border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:bg-white/10 hover:text-white/80'
                    }`}
                  >
                    {tech}
                  </button>
                );
              })}
            </div>

            {/* Active filter summary */}
            {selectedTechs.length > 0 && (
              <p className="text-center text-xs text-white/40 mt-2">
                {filteredProjects.length} / {allProjects.length} projects
                {' · '}
                <button
                  onClick={() => setSelectedTechs([])}
                  className="text-purple-400 hover:text-purple-300 underline underline-offset-2 transition-colors"
                >
                  clear
                </button>
              </p>
            )}
          </div>
        </ScrollAnimate>

        {/* Projects grid */}
        <LayoutGroup>
          <motion.div
            key={`${activeCategory}-${selectedTechs.join(',')}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                  className="group"
                >
                  <div className="relative h-full rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
                    {/* Project header - screenshot or gradient */}
                    <div
                      className={`relative h-36 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
                    >
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={t(`projects.${project.messageKey}.title`)}
                          fill
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          {...(index < 3 ? { priority: true } : { loading: 'lazy' })}
                        />
                      ) : (
                        <>
                          <div className="absolute -top-8 -end-8 h-24 w-24 rounded-full bg-primary/10 pointer-events-none" />
                          <div className="absolute -bottom-4 -start-4 h-16 w-16 rounded-full bg-accent/10 pointer-events-none" />
                          <span className="relative text-2xl font-bold text-primary/80">
                            {project.icon}
                          </span>
                        </>
                      )}

                      {/* Live Preview overlay button — shows on hover when live_url exists */}
                      {project.live_url && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={() => setPreviewProject(project)}
                            aria-label={`${t('livePreview')} — ${t(`projects.${project.messageKey}.title`)}`}
                            className="inline-flex items-center gap-2 rounded-lg bg-purple-600/90 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-purple-500 active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                          >
                            <Eye className="h-4 w-4" aria-hidden="true" />
                            {t('livePreview')}
                          </button>
                        </div>
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
                          <button
                            key={tech}
                            onClick={() => {
                              if (!selectedTechs.includes(tech)) toggleTech(tech);
                            }}
                            aria-pressed={selectedTechs.includes(tech)}
                            title={`Filter by ${tech}`}
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                              selectedTechs.includes(tech)
                                ? 'bg-purple-500/20 text-purple-300 ring-1 ring-purple-500/40'
                                : 'bg-primary/5 text-primary hover:bg-primary/15 cursor-pointer'
                            }`}
                          >
                            {tech}
                          </button>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-4 pt-2 border-t border-border/50">
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                          aria-label={`צפייה בקוד המקור של ${t(`projects.${project.messageKey}.title`)}`}
                        >
                          <Github className="h-4 w-4" aria-hidden="true" />
                          <span>{t('code')}</span>
                        </a>
                        {project.live_url && (
                          <>
                            <a
                              href={project.live_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                              aria-label={`דמו חי של ${t(`projects.${project.messageKey}.title`)}`}
                            >
                              <ExternalLink className="h-4 w-4" aria-hidden="true" />
                              <span>{t('liveDemo')}</span>
                            </a>
                            <button
                              onClick={() => setPreviewProject(project)}
                              className="ms-auto inline-flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                              aria-label={`${t('livePreview')} — ${t(`projects.${project.messageKey}.title`)}`}
                            >
                              <Eye className="h-4 w-4" aria-hidden="true" />
                              <span>{t('livePreview')}</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* Empty state when filters return nothing */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 text-muted-foreground"
          >
            <p className="text-lg mb-3">No projects match the selected filters.</p>
            <button
              onClick={() => { setActiveCategory('all'); setSelectedTechs([]); }}
              className="text-sm text-purple-400 hover:text-purple-300 underline underline-offset-2 transition-colors"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>

      {/* Live Preview Modal */}
      {previewProject?.live_url && (
        <ProjectPreviewModal
          url={previewProject.live_url}
          title={t(`projects.${previewProject.messageKey}.title`)}
          onClose={() => setPreviewProject(null)}
        />
      )}
    </>
  );
}
