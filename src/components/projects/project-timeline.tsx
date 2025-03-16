'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Tables } from '@/lib/supabase.types';

type Project = Tables<'projects'>;

gsap.registerPlugin(ScrollTrigger);

export default function ProjectTimeline() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (data) setProjects(data);
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.timeline-container',
        start: 'top center',
        end: 'bottom center',
        scrub: 1
      }
    });

    projects.forEach((_, index) => {
      timeline.fromTo(
        `.timeline-item-${index}`,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.5 }
      );
    });

    return () => {
      timeline.kill();
    };
  }, [projects]);

  return (
    <div className="timeline-container relative py-16">
      <div className="absolute left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-primary via-accent to-primary" />
      
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          className={`timeline-item-${index} relative mb-16 ${
            index % 2 === 0 ? 'ml-auto pl-8 pr-4' : 'mr-auto pl-4 pr-8'
          } w-1/2`}
          initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-lg bg-card p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">{project.title}</h3>
              <time className="text-sm text-muted-foreground">
                {format(new Date(project.created_at || ''), 'MMM yyyy')}
              </time>
            </div>
            <p className="mb-4 text-muted-foreground">{project.description}</p>
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
          </div>
          <div
            className={`absolute top-1/2 ${
              index % 2 === 0 ? 'left-0' : 'right-0'
            } h-0.5 w-8 bg-primary`}
          />
          <div
            className={`absolute top-1/2 ${
              index % 2 === 0 ? 'left-0' : 'right-0'
            } -translate-y-1/2 ${
              index % 2 === 0 ? '-translate-x-1/2' : 'translate-x-1/2'
            } h-4 w-4 rounded-full bg-primary`}
          />
        </motion.div>
      ))}
    </div>
  );
}
