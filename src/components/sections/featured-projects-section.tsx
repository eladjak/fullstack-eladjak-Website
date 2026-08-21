'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ScrollAnimate } from '@/components/ui/scroll-animate';
import TiltedCard from '@/components/ui/tilted-card';
import { featuredProjects as bankFeatured, type BankProject } from '@/data/projects';

// Shape comes from the publicity bank, not from a copy kept here.
type StaticProject = BankProject;

// LINK-AUDIT (2026-07-13): every live_url + github_url below HEAD-checked live → 200
// to a real page. LINK-AUDIT (2026-07-24): zehutai now links to public zehut.org.il.
// Door rule (2026-08-16): a visitor never leaves the front door for a
// *.vercel.app address. The data keeps the URL, a preview deploy is still how
// the project is reached internally, but the public card does not offer it.
// Filtered at render rather than deleted, so restoring a demo is one named
// domain away and no card silently loses its record of where it lives.
function publicLiveUrl(url?: string): string | undefined {
  if (!url || url.includes('vercel.app')) return undefined;
  return url;
}

// Which projects are featured is decided in the bank (featured: true), so the
// front door and the projects page can no longer disagree about a project.
const staticProjects: StaticProject[] = bankFeatured;


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function FeaturedProjectsSection() {
  const t = useTranslations('featuredProjects');

  return (
    <section id="projects" className="w-full py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <ScrollAnimate>
          <div className="text-center mb-14">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              {t('eyebrow')}
            </p>
            <h2 className="wow-title wow-title--center text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              {t('title')}
            </h2>
            <p className="mx-auto max-w-[640px] text-pretty text-muted-foreground md:text-lg leading-relaxed">
              {t('subtitle')}
            </p>
          </div>
        </ScrollAnimate>


        {/* Mobile: native scroll-snap carousel (no JS measurement needed) */}
        <div className="sm:hidden -mx-4">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-4 scrollbar-hide">
            {staticProjects.slice(0, 6).map((project) => (
              <div key={project.id} className="snap-center shrink-0 w-[85vw] group">
                <div className="relative h-full rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm overflow-hidden">
                  <div className={`relative h-40 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.icon}
                        fill
                        className="object-cover object-top"
                        sizes="85vw"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-primary/80">{project.icon}</span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-1">{t(`projects.${project.messageKey}.title`)}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{t(`projects.${project.messageKey}.description`)}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="inline-flex items-center rounded-full bg-primary/5 px-2 py-0.5 text-xs font-medium text-primary">{tech}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                          <Github className="h-4 w-4" /> {t('code')}
                        </a>
                      )}
                      {publicLiveUrl(project.live_url) && (
                        <a href={publicLiveUrl(project.live_url)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                          <ExternalLink className="h-4 w-4" /> {t('liveDemo')}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground/50 mt-2">← החליקו לעוד פרויקטים →</p>
        </div>

        {/* Desktop: grid layout */}
        <div className="hidden sm:grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {staticProjects.map((project, index) => (
            <div key={project.id} className="group scroll-scale">
              <TiltedCard tiltStrength={8} className="h-full">
              <div className="wow-card relative h-full rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm overflow-hidden">
                {/* Project header - screenshot or gradient */}
                <div
                  className={`relative h-40 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.icon}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105 group-focus-within:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
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

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary group-focus-within:text-primary transition-colors duration-200">
                    {t(`projects.${project.messageKey}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {t(`projects.${project.messageKey}.description`)}
                  </p>

                  {/* Technologies */}
                  <h4 className="sr-only">טכנולוגיות</h4>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-full bg-primary/5 px-2.5 py-0.5 text-xs font-medium text-primary transition-colors duration-200 hover:bg-primary/15"
                      >
                        {tech}
                      </span>
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
                        aria-label={`View source code for ${project.icon}`}
                      >
                        <Github className="h-4 w-4" aria-hidden="true" />
                        <span>{t('code')}</span>
                      </a>
                    )}
                    {publicLiveUrl(project.live_url) && (
                      <a
                        href={publicLiveUrl(project.live_url)}
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
              </TiltedCard>
            </div>
          ))}
        </div>

        <ScrollAnimate delay={0.2}>
          <div className="text-center mt-10">
            <Link
              href="/projects"
              className="wow-press inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-3 text-sm font-medium text-primary hover:bg-primary/20 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {t('viewAll')}
              <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
            </Link>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}
