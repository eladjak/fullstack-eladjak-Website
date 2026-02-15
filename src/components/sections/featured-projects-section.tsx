'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Github, Globe, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface StaticProject {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  github_url: string;
  live_url?: string;
  gradient: string;
  icon: string;
}

const staticProjects: StaticProject[] = [
  {
    id: 'haderech',
    title: 'HaDerech',
    description:
      'A complete interactive learning platform with course systems, community forums, and practice simulators. Built with modern technologies and AI integrations.',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'OpenAI', 'Tailwind CSS'],
    github_url: 'https://github.com/eladjak/Haderech',
    live_url: 'https://haderech.vercel.app',
    gradient: 'from-violet-500/20 to-purple-600/20',
    icon: 'HaDerech',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    description:
      'This very portfolio site! Built with Next.js 16, Three.js for 3D visuals, Framer Motion animations, real-time collaboration features, and AI-powered tools.',
    technologies: ['Next.js 16', 'Three.js', 'Framer Motion', 'Supabase', 'OpenAI'],
    github_url: 'https://github.com/eladjak/fullstack-eladjak-Website',
    live_url: 'https://fullstack-eladjak.co.il',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    icon: 'Portfolio',
  },
  {
    id: 'ey-ai-kids',
    title: 'EY.AI Kids',
    description:
      'An educational platform for children combining AI technologies with interactive learning experiences. Features gamification, progress tracking, and adaptive content.',
    technologies: ['React', 'TypeScript', 'AI/ML', 'Tailwind CSS', 'Node.js'],
    github_url: 'https://github.com/eladjak/ey-ai-kids',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    icon: 'EY.AI',
  },
  {
    id: 'omanut',
    title: 'Omanut Website',
    description:
      'A creative arts and culture website with beautiful design, Hebrew RTL support, and responsive layouts. Showcasing art collections and cultural events.',
    technologies: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Responsive Design'],
    github_url: 'https://github.com/eladjak/omanut-website',
    gradient: 'from-amber-500/20 to-orange-500/20',
    icon: 'Omanut',
  },
  {
    id: 'edutech',
    title: 'EduTech Platform',
    description:
      'A comprehensive educational technology platform with course management, student analytics, and interactive content delivery systems.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'REST API'],
    github_url: 'https://github.com/eladjak/edutech',
    gradient: 'from-rose-500/20 to-pink-500/20',
    icon: 'EduTech',
  },
  {
    id: 'hebrew-calendar',
    title: 'Hebrew-Gregorian Calendar',
    description:
      'An interactive calendar tool converting between Hebrew and Gregorian dates. Features holiday information, date calculations, and a clean user interface.',
    technologies: ['JavaScript', 'React', 'CSS3', 'Date Algorithms'],
    github_url: 'https://github.com/eladjak/hebrew-calendar',
    gradient: 'from-indigo-500/20 to-blue-500/20',
    icon: 'Calendar',
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function FeaturedProjectsSection() {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Featured Projects
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
            A selection of my recent work, from educational platforms to creative tools
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {staticProjects.map((project) => (
            <motion.div key={project.id} variants={cardVariants} className="group">
              <div className="relative h-full rounded-xl border border-border/50 bg-card overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
                {/* Gradient header */}
                <div
                  className={`relative h-32 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
                >
                  {/* Decorative circles */}
                  <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-primary/10" />
                  <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-accent/10" />
                  <span className="relative text-2xl font-bold text-primary/80">
                    {project.icon}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {project.description}
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
                      aria-label={`View source code for ${project.title}`}
                    >
                      <Github className="h-4 w-4" aria-hidden="true" />
                      <span>Code</span>
                    </a>
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                        aria-label={`Live demo of ${project.title}`}
                      >
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-3 text-sm font-medium text-primary hover:bg-primary/20 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            View All Projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
