'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Github, ExternalLink, Eye, Search, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { ScrollAnimate } from '@/components/ui/scroll-animate';
import { allProjects as bankProjects, type BankProject } from '@/data/projects';

const ProjectPreviewModal = dynamic(
  () => import('@/components/ui/project-preview-modal').then((m) => m.ProjectPreviewModal),
  { ssr: false }
);

type Category = 'all' | 'web' | 'ai' | 'tools';

// The project list is NOT defined here. It is generated from the publicity bank
// (~/projects/_lib/publicity-bank/projects.json), which is the single source every
// one of Elad's sites reads. Editing this page's copy of it is what caused the two
// drifting arrays this replaced.
type StaticProject = BankProject;

// LINK-AUDIT (2026-07-13): every live_url + github_url below was HEAD-checked live
// and returns HTTP 200 to a real page (following redirects). RULE for future edits:
// a card is clickable ONLY via fields present here, and any live_url/github_url MUST
// resolve 200 to a real page — HEAD-check before adding/changing one. Projects with
// NO link are non-clickable BY DESIGN: triplus is NDA/client-internal and
// intentionally exposes no public URL (no broken anchor is rendered for it).
// LINK-AUDIT (2026-07-24): zehutai now links to the public zehut.org.il (site went
// live July 2026); businessBrain links to the on-site product page. Both HEAD 200.
// Door rule (2026-08-16): a visitor never leaves this page for a *.vercel.app
// address. The data keeps the URL - that is still how the project is reached
// internally - but the public card offers neither the link nor the preview.
// Filtered at render rather than deleted, so restoring a demo is one named
// domain away and no card loses its record of where it lives.
function publicLiveUrl(url?: string): string | undefined {
  if (!url || url.includes('vercel.app')) return undefined;
  return url;
}

const allProjects: StaticProject[] = bankProjects;


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
  const [searchQuery, setSearchQuery] = useState('');
  const [techExpanded, setTechExpanded] = useState(false);

  // Number of tech pills shown before "show more" toggle.
  const TECH_COLLAPSED_COUNT = 8;

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

  const visibleTechs = techExpanded ? allTechs : allTechs.slice(0, TECH_COLLAPSED_COUNT);

  const filteredProjects = useMemo(() => {
    let result = activeCategory === 'all' ? allProjects : allProjects.filter((p) => p.category === activeCategory);
    if (selectedTechs.length > 0) {
      result = result.filter((p) => selectedTechs.every((tech) => p.technologies.includes(tech)));
    }
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter((p) => {
        const haystack = [
          t(`projects.${p.messageKey}.title`),
          t(`projects.${p.messageKey}.description`),
          p.technologies.join(' '),
        ]
          .join(' ')
          .toLowerCase();
        return haystack.includes(q);
      });
    }
    return result;
  }, [activeCategory, selectedTechs, searchQuery, t]);

  const hasActiveFilters = activeCategory !== 'all' || selectedTechs.length > 0 || searchQuery.trim() !== '';

  const clearAll = () => {
    setActiveCategory('all');
    setSelectedTechs([]);
    setSearchQuery('');
  };

  return (
    <>
      <main className="container mx-auto px-4 py-12">
        <ScrollAnimate>
          <header className="text-center mb-12">
            <h1 className="wow-title wow-title--center text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              {t('title')}
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              {t('subtitle')}
            </p>
            <h4 className="sr-only">{t('subtitle')}</h4>
          </header>
        </ScrollAnimate>

        {/* Search box */}
        <ScrollAnimate delay={0.05}>
          <div className="mx-auto mb-6 max-w-md">
            <div className="relative">
              <Search
                className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                type="search"
                inputMode="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('search.placeholder')}
                aria-label={t('search.label')}
                className="w-full rounded-full border border-white/10 bg-white/5 ps-10 pe-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:border-purple-500/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label={t('search.clear')}
                  className="absolute end-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              )}
            </div>
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
                className={`rounded-full px-3.5 py-1 text-xs font-medium border transition-[transform,background-color,color,opacity] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                  selectedTechs.length === 0
                    ? 'border-purple-500/60 bg-purple-500/15 text-purple-300'
                    : 'border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:bg-white/10 hover:text-white/80'
                }`}
              >
                {t('techFilter.all')}
              </button>

              {visibleTechs.map((tech) => {
                const active = selectedTechs.includes(tech);
                return (
                  <button
                    key={tech}
                    onClick={() => toggleTech(tech)}
                    aria-pressed={active}
                    className={`rounded-full px-3.5 py-1 text-xs font-medium border transition-[transform,background-color,color,opacity] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                      active
                        ? 'border-purple-500/60 bg-purple-500/15 text-purple-300 shadow-[0_0_8px_rgba(168,85,247,0.25)]'
                        : 'border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:bg-white/10 hover:text-white/80'
                    }`}
                  >
                    {tech}
                  </button>
                );
              })}

              {/* Show more / less tech pills */}
              {allTechs.length > TECH_COLLAPSED_COUNT && (
                <button
                  onClick={() => setTechExpanded((v) => !v)}
                  aria-expanded={techExpanded}
                  className="inline-flex items-center gap-1 rounded-full px-3.5 py-1 text-xs font-medium border border-dashed border-white/15 bg-transparent text-white/50 hover:text-white/80 hover:border-white/30 transition-[transform,background-color,color,opacity] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                >
                  {techExpanded
                    ? t('techFilter.showLess')
                    : t('techFilter.showMore', { count: allTechs.length - TECH_COLLAPSED_COUNT })}
                  <ChevronDown
                    className={`h-3 w-3 transition-transform duration-200 ${techExpanded ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
              )}
            </div>

            {/* Always-visible result count + clear */}
            <p className="text-center text-xs text-white/40 mt-3" aria-live="polite">
              {t('resultCount', { shown: filteredProjects.length, total: allProjects.length })}
              {hasActiveFilters && (
                <>
                  {' · '}
                  <button
                    onClick={clearAll}
                    className="text-purple-400 hover:text-purple-300 underline underline-offset-2 transition-colors"
                  >
                    {t('clearFilters')}
                  </button>
                </>
              )}
            </p>
          </div>
        </ScrollAnimate>

        {/* Projects grid */}
        <section aria-label={t('title')}>
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
                  <div className="wow-card relative h-full rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm overflow-hidden">
                    {/* Project header - screenshot or gradient */}
                    <div
                      className={`wow-media relative h-36 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
                    >
                      {/* Category badge */}
                      <span className="absolute top-2 start-2 z-10 rounded-full bg-black/55 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-medium text-white/90 ring-1 ring-white/10">
                        {t(`categories.${project.category}`)}
                      </span>
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={t(`projects.${project.messageKey}.title`)}
                          fill
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105 group-focus-within:scale-105"
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
                      {publicLiveUrl(project.live_url) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto transition-opacity duration-200">
                          <button
                            onClick={() => setPreviewProject(project)}
                            aria-label={`${t('livePreview')} — ${t(`projects.${project.messageKey}.title`)}`}
                            className="wow-press inline-flex items-center gap-2 rounded-lg bg-purple-600/90 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-purple-500 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                          >
                            <Eye className="h-4 w-4" aria-hidden="true" />
                            {t('livePreview')}
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary group-focus-within:text-primary transition-colors duration-200">
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
                        {project.github_url && (
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
                        )}
                        {publicLiveUrl(project.live_url) && (
                          <>
                            <a
                              href={publicLiveUrl(project.live_url)}
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
        </section>

        {/* Empty state when filters return nothing */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 text-muted-foreground"
          >
            <p className="text-lg mb-3">{t('empty.title')}</p>
            <button
              onClick={clearAll}
              className="text-sm text-purple-400 hover:text-purple-300 underline underline-offset-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded"
            >
              {t('empty.clear')}
            </button>
          </motion.div>
        )}
      </main>

      {/* Live Preview Modal */}
      {publicLiveUrl(previewProject?.live_url) && (
        <ProjectPreviewModal
          url={publicLiveUrl(previewProject.live_url)!}
          title={t(`projects.${previewProject.messageKey}.title`)}
          onClose={() => setPreviewProject(null)}
        />
      )}
    </>
  );
}
