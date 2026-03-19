'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ScrollAnimate } from '@/components/ui/scroll-animate';
import TiltedCard from '@/components/ui/tilted-card';

interface StaticProject {
  id: string;
  messageKey: string;
  technologies: string[];
  github_url: string;
  live_url?: string;
  gradient: string;
  icon: string;
  image?: string;
}

const staticProjects: StaticProject[] = [
  {
    id: 'haderech',
    messageKey: 'haderech',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'OpenAI', 'Tailwind CSS'],
    github_url: 'https://github.com/eladjak/Haderech-Next',
    live_url: 'https://haderech-next.vercel.app',
    gradient: 'from-violet-500/20 to-purple-600/20',
    icon: 'HaDerech',
    image: '/projects/haderech.png',
  },
  {
    id: 'portfolio',
    messageKey: 'portfolio',
    technologies: ['Next.js 16', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'next-intl'],
    github_url: 'https://github.com/eladjak/fullstack-eladjak-Website',
    live_url: 'https://fullstack-eladjak.co.il',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    icon: 'Portfolio',
    image: '/projects/portfolio.png',
  },
  {
    id: 'ey-ai-kids',
    messageKey: 'eyAiKids',
    technologies: ['React', 'TypeScript', 'AI/ML', 'Tailwind CSS', 'Node.js'],
    github_url: 'https://github.com/eladjak/ey.ai-kids-playground',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    icon: 'EY.AI',
    image: '/projects/ey-ai-kids.jpg',
  },
  {
    id: 'omanut',
    messageKey: 'omanut',
    technologies: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Responsive Design'],
    github_url: 'https://github.com/eladjak/omanut-hakesher-website',
    live_url: 'https://omanut-hakesher-website.vercel.app',
    gradient: 'from-amber-500/20 to-orange-500/20',
    icon: 'Omanut',
    image: '/projects/omanut.png',
  },
  {
    id: 'voice-chat',
    messageKey: 'voiceChat',
    technologies: ['TypeScript', 'Whisper', 'Claude API', 'ElevenLabs', 'WebSocket'],
    github_url: 'https://github.com/eladjak/voice-chat-claude',
    gradient: 'from-fuchsia-500/20 to-pink-500/20',
    icon: 'Voice',
    image: '/projects/voice-chat.jpg',
  },
  {
    id: 'html-to-pptx',
    messageKey: 'htmlToPptx',
    technologies: ['Next.js 14', 'TypeScript', 'pptxgenjs', 'JSDOM', 'Tailwind CSS'],
    github_url: 'https://github.com/eladjak/html-to-pptx',
    live_url: 'https://html-to-pptx-ten.vercel.app',
    gradient: 'from-orange-500/20 to-amber-500/20',
    icon: 'PPTX',
    image: '/projects/html-to-pptx.jpg',
  },
  {
    id: 'zehutai',
    messageKey: 'zehutai',
    technologies: ['Python', 'NLP', 'RAG', 'CI/CD', 'pytest'],
    github_url: 'https://github.com/eladjak/ZehutAI',
    gradient: 'from-sky-500/20 to-blue-600/20',
    icon: 'Zehut',
    image: '/projects/zehutai.jpg',
  },
  {
    id: 'team-meetings',
    messageKey: 'teamMeetings',
    technologies: ['React', 'TypeScript', 'Vite', 'FullCalendar', 'MUI'],
    github_url: 'https://github.com/eladjak/team-meetings',
    live_url: 'https://team-meetings.vercel.app',
    gradient: 'from-purple-500/20 to-violet-500/20',
    icon: 'Meetings',
    image: '/projects/team-meetings.jpg',
  },
];

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
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              {t('title')}
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              {t('subtitle')}
            </p>
          </div>
        </ScrollAnimate>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {staticProjects.map((project) => (
            <div key={project.id} className="group scroll-scale">
              <TiltedCard tiltStrength={8} className="h-full">
              <div className="relative h-full rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
                {/* Project header - screenshot or gradient */}
                <div
                  className={`relative h-40 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
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

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-200">
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
              </TiltedCard>
            </div>
          ))}
        </div>

        <ScrollAnimate delay={0.2}>
          <div className="text-center mt-10">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-3 text-sm font-medium text-primary hover:bg-primary/20 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {t('viewAll')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}
