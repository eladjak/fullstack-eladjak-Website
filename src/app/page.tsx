'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useMetaTags } from '@/hooks/useMetaTags';
import BlogCard from '@/components/blog/blog-card';
import SkillsSection from '@/components/sections/skills-section';
import HeroSection from '@/components/hero/hero-section';
import FeaturedProjectsSection from '@/components/sections/featured-projects-section';
import TestimonialsSection from '@/components/sections/testimonials-section';
import CTASection from '@/components/sections/cta-section';
import ProcessSection from '@/components/sections/process-section';
import StatsBar from '@/components/sections/stats-bar';
import TechMarquee from '@/components/ui/tech-marquee';
import { ScrollAnimate } from '@/components/ui/scroll-animate';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { BlogPost } from '@/types/blog';

export default function HomePage() {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const t = useTranslations('blog');

  useEffect(() => {
    const loadFeaturedContent = async () => {
      const postsData = await supabase
        .from('blog_posts')
        .select('*, profiles(*)')
        .eq('featured', true)
        .limit(3);

      if (postsData.data) setFeaturedPosts(postsData.data as unknown as BlogPost[]);
    };

    loadFeaturedContent();
  }, []);

  useMetaTags({
    title: "Elad Ya'akobovitch | Full-Stack Developer",
    description:
      'Full-Stack Developer specializing in Next.js, React, and TypeScript. Building modern web applications with creative vision and technical expertise.',
    image: 'https://avatars.githubusercontent.com/u/108827199?v=4',
    type: 'website',
  });

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection />

        <TechMarquee />

        <StatsBar />

        <SkillsSection />

        {/* Static Featured Projects - always visible */}
        <FeaturedProjectsSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Featured Blog Posts Section - only when Supabase data exists */}
        {featuredPosts.length > 0 && (
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
            <div className="container px-4 md:px-6">
              <ScrollAnimate>
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                    {t('latestPosts')}
                  </h2>
                  <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                    {t('subtitle')}
                  </p>
                </div>
              </ScrollAnimate>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuredPosts.map((post, index) => (
                  <ScrollAnimate key={post.id} delay={index * 0.05}>
                    <BlogCard post={post} />
                  </ScrollAnimate>
                ))}
              </div>

              <ScrollAnimate delay={0.15}>
                <div className="text-center mt-8">
                  <Link
                    href="/blog"
                    className="inline-flex items-center text-primary hover:underline"
                  >
                    {t('readMore')}
                    <ArrowRight className="ms-2 h-4 w-4" />
                  </Link>
                </div>
              </ScrollAnimate>
            </div>
          </section>
        )}

        {/* Process / How I Work */}
        <ProcessSection />

        {/* CTA Section */}
        <CTASection />
      </main>
    </div>
  );
}
