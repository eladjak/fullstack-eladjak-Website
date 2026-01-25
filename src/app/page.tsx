'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, Code, BookOpen, Coffee, ExternalLink, Globe } from "lucide-react";
import { useInView } from 'react-intersection-observer';
import Link from "next/link";
import { useMetaTags } from '@/hooks/useMetaTags';
import ProjectCard from "@/components/projects/project-card";
import BlogCard from "@/components/blog/blog-card";
import { SocialLink } from "@/components/ui/social-link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Tables } from "@/lib/supabase.types";

export default function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState<Tables<'projects'>[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<Tables<'blog_posts'>[]>([]);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const [activeUsers, setActiveUsers] = useState<number>(0);

  useEffect(() => {
    const channel = supabase.channel('active_users')
      .on('presence', { event: 'sync' }, () => {
        const presenceState = channel.presenceState();
        setActiveUsers(Object.keys(presenceState).length);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ user_id: Math.random().toString() });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    const loadFeaturedContent = async () => {
      const [projectsData, postsData] = await Promise.all([
        supabase.from('projects').select('*').eq('featured', true).limit(3),
        supabase.from('blog_posts').select('*').eq('featured', true).limit(3)
      ]);

      if (projectsData.data) setFeaturedProjects(projectsData.data);
      if (postsData.data) setFeaturedPosts(postsData.data);
    };

    loadFeaturedContent();
  }, []);

  useMetaTags({
    title: 'Elad Ya\'akobovitch | Full-Stack Developer',
    description: 'Full-Stack Developer specializing in Next.js, React, and TypeScript. Building modern web applications with creative vision and technical expertise.',
    image: 'https://avatars.githubusercontent.com/u/108827199?v=4',
    type: 'website'
  });

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              background: "linear-gradient(to right, var(--primary), var(--accent))",
              opacity: 0.1,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <div className="container px-4 md:px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Elad Ya'akobovitch
                </h1>
                <h2 className="text-2xl font-semibold text-primary">
                  Full-Stack Developer
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Building modern web applications with Next.js, React, and TypeScript.
                  Combining technical expertise with creative vision and business insight.
                  Results-driven, not hours-driven.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background via-background/80 to-background">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Real-Time Collaboration</h2>
              <p className="text-muted-foreground">
                {activeUsers} users currently online
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-lg bg-card"
              >
                <h3 className="text-xl font-semibold mb-2">Live Comments</h3>
                <p className="text-muted-foreground">
                  Engage in real-time discussions with other users
                </p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-lg bg-card"
              >
                <h3 className="text-xl font-semibold mb-2">Instant Updates</h3>
                <p className="text-muted-foreground">
                  See changes as they happen across the platform
                </p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-lg bg-card"
              >
                <h3 className="text-xl font-semibold mb-2">Smart Moderation</h3>
                <p className="text-muted-foreground">
                  AI-powered content filtering for a safe environment
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Let's Connect</h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Feel free to reach out for collaborations or just a friendly hello
                </p>
              </div>
              {/* DRY FIX: Using SocialLink component */}
              <div className="flex space-x-4">
                <SocialLink href="https://github.com/eladjak" icon={Github} label="GitHub Profile" />
                <SocialLink href="https://linkedin.com/in/eladjak" icon={Linkedin} label="LinkedIn Profile" />
                <SocialLink href="mailto:elad@hiteclearning.co.il" icon={Mail} label="Send Email" />
                <SocialLink href="https://fullstack-eladjak.co.il" icon={Globe} label="Portfolio Website" />
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
