'use client';

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, Globe } from "lucide-react";
import Link from "next/link";
import { useMetaTags } from '@/hooks/useMetaTags';
import ProjectCard from "@/components/projects/project-card";
import BlogCard from "@/components/blog/blog-card";
import { SocialLink } from "@/components/ui/social-link";
import SkillsSection from "@/components/sections/skills-section";
import HeroSection from "@/components/hero/hero-section";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Tables } from "@/lib/supabase.types";
import type { BlogPost } from "@/types/blog";

export default function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState<Tables<'projects'>[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
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
  
  useEffect(() => {
    const loadFeaturedContent = async () => {
      const [projectsData, postsData] = await Promise.all([
        supabase.from('projects').select('*').eq('featured', true).limit(3),
        supabase.from('blog_posts').select('*, profiles(*)').eq('featured', true).limit(3)
      ]);

      if (projectsData.data) setFeaturedProjects(projectsData.data);
      if (postsData.data) setFeaturedPosts(postsData.data as unknown as BlogPost[]);
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
        <HeroSection />

        <SkillsSection />

        {/* Featured Projects Section */}
        {featuredProjects.length > 0 && (
          <section className="w-full py-12 md:py-24 lg:py-32">
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
                  A selection of my best work
                </p>
              </motion.div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <ProjectCard project={project} index={index} />
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="text-center mt-8"
              >
                <Link
                  href="/projects"
                  className="inline-flex items-center text-primary hover:underline"
                >
                  View All Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </section>
        )}

        {/* Featured Blog Posts Section */}
        {featuredPosts.length > 0 && (
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
            <div className="container px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                  Latest Posts
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                  Thoughts on development, technology, and more
                </p>
              </motion.div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="text-center mt-8"
              >
                <Link
                  href="/blog"
                  className="inline-flex items-center text-primary hover:underline"
                >
                  Read More Posts
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </section>
        )}

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
