'use client';

import { useMetaTags } from '@/hooks/useMetaTags';
import SkillsSection from '@/components/sections/skills-section';
import HeroSection from '@/components/hero/hero-section';
import FeaturedProjectsSection from '@/components/sections/featured-projects-section';
import CTASection from '@/components/sections/cta-section';
import ProcessSection from '@/components/sections/process-section';
import RecommendationsSection from '@/components/sections/recommendations-section';
import TechMarquee from '@/components/ui/tech-marquee';

export default function HomePage() {
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

        <SkillsSection />

        {/* Static Featured Projects - always visible */}
        <FeaturedProjectsSection />

        {/* Recommendations */}
        <RecommendationsSection />

        {/* Process / How I Work */}
        <ProcessSection />

        {/* CTA Section */}
        <CTASection />
      </main>
    </div>
  );
}
