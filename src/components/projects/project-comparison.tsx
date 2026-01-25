'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { TagBadge } from '@/components/ui/tag-badge';
import { Label } from '@/components/ui/label';
import { ArrowLeftRight, GitCompare } from 'lucide-react';
import type { Tables } from '@/lib/supabase.types';
import { supabase } from '@/lib/supabase';

type Project = Tables<'projects'>;

interface ProjectComparisonProps {
  projects?: Project[];
}

export default function ProjectComparison({ projects: initialProjects }: ProjectComparisonProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<[Project | null, Project | null]>([null, null]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        if (initialProjects) {
          setProjects(initialProjects);
        } else {
          const { data } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });
          
          if (data) setProjects(data);
        }
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [initialProjects]);

  const selectProject = (project: Project, index: 0 | 1) => {
    setSelectedProjects(prev => {
      const next = [...prev] as [Project | null, Project | null];
      next[index] = project;
      return next;
    });
  };

  return (
    <div className="space-y-8">
      {/* ACCESSIBILITY FIX: Added Labels for select elements */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-center mb-4">Compare Projects</legend>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="w-full md:w-auto space-y-2">
            <Label htmlFor="project-select-1" className="sr-only">
              First Project to Compare
            </Label>
            <select
              id="project-select-1"
              className="w-full md:w-auto rounded-md border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
              onChange={(e) => selectProject(projects.find(p => p.id === e.target.value) || null, 0)}
              value={selectedProjects[0]?.id || ''}
              aria-label="Select first project for comparison"
            >
              <option value="">Select Project 1</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
          </div>

          <GitCompare className="h-6 w-6 text-primary" aria-hidden="true" />

          <div className="w-full md:w-auto space-y-2">
            <Label htmlFor="project-select-2" className="sr-only">
              Second Project to Compare
            </Label>
            <select
              id="project-select-2"
              className="w-full md:w-auto rounded-md border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
              onChange={(e) => selectProject(projects.find(p => p.id === e.target.value) || null, 1)}
              value={selectedProjects[1]?.id || ''}
              aria-label="Select second project for comparison"
            >
              <option value="">Select Project 2</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      {selectedProjects[0] && selectedProjects[1] && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-8"
        >
          {selectedProjects.map((project, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader>
                <h3 className="text-xl font-bold">{project?.title}</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* PERFORMANCE FIX: Next.js Image instead of <img> */}
                <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={project?.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop'}
                    alt={project?.title || 'Project'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <p className="text-muted-foreground">{project?.description}</p>

                <div className="space-y-2">
                  <h4 className="font-semibold">Technologies</h4>
                  {/* CONSISTENCY FIX: Using TagBadge component */}
                  <div className="flex flex-wrap gap-2">
                    {project?.technologies?.map((tech) => (
                      <TagBadge key={tech} tag={tech} variant="default" showIcon={false} />
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Links</h4>
                  <div className="flex space-x-4">
                    {project?.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        GitHub
                      </a>
                    )}
                    {project?.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      )}
    </div>
  );
}
