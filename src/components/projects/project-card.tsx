'use client';

import { Github, Globe } from 'lucide-react';
import { ProjectPreview } from './project-preview';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import type { Tables } from '@/lib/supabase.types';

type Project = Tables<'projects'>;

interface ProjectCardProps {
  project: Project;
}

import { useState, useEffect } from 'react';
import { useRealtimeUpdates } from '@/hooks/useRealtimeUpdates';

export default function ProjectCard({ project: initialProject }: ProjectCardProps) {
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
  const [imageLoaded, setImageLoaded] = useState(false);
  const cacheKey = `project_image_${project.id}`;

  useEffect(() => {
    // Cache project images in localStorage
    if (project.image_url) {
      const cached = localStorage.getItem(cacheKey);
      if (!cached) {
        const img = new Image();
        img.src = project.image_url;
        img.onload = () => {
          localStorage.setItem(cacheKey, project.image_url);
          setImageLoaded(true);
        };
      } else {
        setImageLoaded(true);
      }
    }
  }, [project.image_url, cacheKey]);
  return (
    <Card className="group overflow-hidden transition-all duration-500 hover:shadow-xl hover:scale-[1.02] hover:bg-background/80">
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <div className="aspect-video relative overflow-hidden group">
          <ProjectPreview technologies={project.technologies} />
          <img
            src={project.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c'}
            alt={project.title}
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:filter group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
        <CardHeader>
          <h3 className="text-xl font-bold">{project.title}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies?.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
              >
                {tech}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              <span>View Code</span>
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <Globe className="h-4 w-4" />
              <span>Live Demo</span>
            </a>
          )}
        </CardFooter>
      </motion.div>
    </Card>
  );
}
