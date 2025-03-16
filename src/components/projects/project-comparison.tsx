'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
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
      <div className="flex items-center justify-center space-x-4">
        <select
          className="rounded-md border bg-background px-3 py-2"
          onChange={(e) => selectProject(projects.find(p => p.id === e.target.value) || null, 0)}
          value={selectedProjects[0]?.id || ''}
        >
          <option value="">Select Project 1</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.title}
            </option>
          ))}
        </select>

        <GitCompare className="h-6 w-6 text-primary" />

        <select
          className="rounded-md border bg-background px-3 py-2"
          onChange={(e) => selectProject(projects.find(p => p.id === e.target.value) || null, 1)}
          value={selectedProjects[1]?.id || ''}
        >
          <option value="">Select Project 2</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.title}
            </option>
          ))}
        </select>
      </div>

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
                <img
                  src={project?.image_url || 'https://via.placeholder.com/400x300'}
                  alt={project?.title}
                  className="w-full rounded-lg object-cover"
                />
                
                <p className="text-muted-foreground">{project?.description}</p>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project?.technologies?.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                      >
                        {tech}
                      </span>
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
