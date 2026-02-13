'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, SortAsc, SortDesc } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import ProjectTimeline from '@/components/projects/project-timeline';
import ProjectComparison from '@/components/projects/project-comparison';
import type { Tables } from '@/lib/supabase.types';
import ProjectCard from '@/components/projects/project-card';
import ProjectFilters from '@/components/projects/project-filters';
import { LoadingPage } from '@/components/ui/loading-spinner';
import { useMetaTags } from '@/hooks/useMetaTags';

type Project = Tables<'projects'>;

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadProjects();
  }, [sortOrder]);

  async function loadProjects() {
    try {
      setLoading(true);
      let query = supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: sortOrder === 'asc' });

      if (selectedTech.length > 0) {
        query = query.contains('technologies', selectedTech);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  }

  const toggleSort = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const allTechnologies = Array.from(
    new Set(
      projects.flatMap(project => project.technologies || [])
    )
  ).sort();

  useMetaTags({
    title: 'Projects | Portfolio',
    description: 'Explore my portfolio of software development projects, featuring web applications, mobile apps, and more.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    type: 'portfolio'
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Projects</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSort}
              className="flex items-center space-x-2 rounded-md border border-gray-200 px-3 py-2 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
            >
              {sortOrder === 'asc' ? (
                <SortAsc className="h-4 w-4" />
              ) : (
                <SortDesc className="h-4 w-4" />
              )}
              <span>Sort by Date</span>
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 rounded-md border border-gray-200 px-3 py-2 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {showFilters && (
          <ProjectFilters
            technologies={allTechnologies}
            selected={selectedTech}
            onChange={(techs) => {
              setSelectedTech(techs);
              loadProjects();
            }}
          />
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 space-y-12"
      >
        <ProjectComparison projects={projects} />
        <ProjectTimeline />
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary mb-4">
          Portfolio Showcase
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore my latest projects and creative works, showcasing innovative solutions and technical expertise.
        </p>
      </motion.div>

      {loading ? (
        <LoadingPage label="Loading projects..." />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {/* PERFORMANCE FIX: Pass index for priority loading first 3 images */}
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
