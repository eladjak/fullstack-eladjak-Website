'use client';

import { Github, Globe } from 'lucide-react';
import Image from 'next/image';
import { memo, useState } from 'react';
import { ProjectPreview } from './project-preview';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { TagBadge } from '@/components/ui/tag-badge';
import { useRealtimeUpdates } from '@/hooks/useRealtimeUpdates';
import type { Tables } from '@/lib/supabase.types';

type Project = Tables<'projects'>;

interface ProjectCardProps {
  project: Project;
  index?: number;
}

/**
 * PERFORMANCE OPTIMIZATIONS:
 * - Added React.memo to prevent unnecessary re-renders
 * - Replaced <img> with Next.js Image for optimization
 * - Removed localStorage caching anti-pattern (browser HTTP cache is better)
 * - Using TagBadge component for consistency
 * - Added priority loading for first 3 projects
 */
const ProjectCard = memo(({ project: initialProject, index = 0 }: ProjectCardProps) => {
  const [project, setProject] = useState(initialProject);

  useRealtimeUpdates<'projects'>({
    table: 'projects',
    filter: `id=eq.${initialProject.id}`,
    onUpdate: (payload) => {
      setProject(prev => ({
        ...prev,
        ...payload
      }));
    },
    toastMessages: {
      update: 'Project updated'
    }
  });

  // Generate fallback image URL
  const imageUrl = project.image_url ||
    `https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop`;

  return (
    <Card className="group overflow-hidden transition-all duration-500 hover:shadow-xl hover:scale-[1.02] hover:bg-background/80">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileFocus={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <div className="aspect-video relative overflow-hidden">
          {/* PERFORMANCE FIX: Next.js Image instead of <img> */}
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            priority={index < 3}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* 3D Preview overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <ProjectPreview technologies={project.technologies} />
          </div>
          {/* Hover gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-100 transition-opacity duration-500" />
        </div>
        <CardHeader>
          <h3 className="text-xl font-bold">{project.title}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{project.description}</p>
          {/* CONSISTENCY FIX: Using TagBadge component */}
          <div className="flex flex-wrap gap-2">
            {project.technologies?.map((tech) => (
              <TagBadge key={tech} tag={tech} variant="default" showIcon={false} />
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              aria-label={`View code for ${project.title}`}
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              <span>View Code</span>
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              aria-label={`Live demo of ${project.title}`}
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
              <span>Live Demo</span>
            </a>
          )}
        </CardFooter>
      </motion.div>
    </Card>
  );
});
ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
