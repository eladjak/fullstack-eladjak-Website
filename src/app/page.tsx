'use client';

import { useMetaTags } from '@/hooks/useMetaTags';
import SkillsSection from '@/components/sections/skills-section';
import HeroSection from '@/components/hero/hero-section';
import FeaturedProjectsSection from '@/components/sections/featured-projects-section';
import CTASection from '@/components/sections/cta-section';
import ProcessSection from '@/components/sections/process-section';
import RecommendationsSection from '@/components/sections/recommendations-section';
import ServicesPreviewSection from '@/components/sections/services-preview-section';
import TechMarquee from '@/components/ui/tech-marquee';
import StatsBar from '@/components/sections/stats-bar';
import LatestPostsSection from '@/components/sections/latest-posts-section';

export default function HomePage() {
  useMetaTags({
    title: "אלעד יעקובוביץ' | מפתח Full-Stack ומומחה AI",
    description:
      'מפתח Full-Stack מומחה ל-Next.js, React ו-TypeScript. בניית אפליקציות ווב מודרניות עם אינטגרציית AI וחשיבה עסקית. ישראל.',
    image: 'https://avatars.githubusercontent.com/u/108827199?v=4',
    type: 'website',
  });

  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex-1">
        <HeroSection />

        <StatsBar />

        <TechMarquee />

        <SkillsSection />

        {/* Services Preview */}
        <ServicesPreviewSection />

        {/* Static Featured Projects - always visible */}
        <FeaturedProjectsSection />

        {/* Latest Blog Posts */}
        <LatestPostsSection />

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
