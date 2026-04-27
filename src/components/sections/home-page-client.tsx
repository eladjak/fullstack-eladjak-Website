'use client';

import dynamic from 'next/dynamic';
import HeroSection from '@/components/hero/hero-section';
import StatsBar from '@/components/sections/stats-bar';
import TechMarquee from '@/components/ui/tech-marquee';
import SkillsSection from '@/components/sections/skills-section';

// Loading placeholder used for all below-fold sections.
// Animates only opacity (no width/height/top/left) per design rules.
const SectionSkeleton = () => (
  <div className="h-96 animate-pulse bg-muted/10" aria-hidden="true" />
);

// Below-fold sections — lazy-loaded to keep the initial JS bundle small.
// `ssr: false` defers both server-render cost and client hydration until
// the chunk is fetched, which is fine for content below the fold.
const ServicesPreviewSection = dynamic(
  () => import('@/components/sections/services-preview-section'),
  { ssr: false, loading: () => <SectionSkeleton /> },
);

const FeaturedProjectsSection = dynamic(
  () => import('@/components/sections/featured-projects-section'),
  { ssr: false, loading: () => <SectionSkeleton /> },
);

const LatestPostsSection = dynamic(
  () => import('@/components/sections/latest-posts-section'),
  { ssr: false, loading: () => <SectionSkeleton /> },
);

const RecommendationsSection = dynamic(
  () => import('@/components/sections/recommendations-section'),
  { ssr: false, loading: () => <SectionSkeleton /> },
);

const ProcessSection = dynamic(
  () => import('@/components/sections/process-section'),
  { ssr: false, loading: () => <SectionSkeleton /> },
);

const B2BBand = dynamic(
  () => import('@/components/sections/b2b-band'),
  { ssr: false, loading: () => <SectionSkeleton /> },
);

const CTASection = dynamic(
  () => import('@/components/sections/cta-section'),
  { ssr: false, loading: () => <SectionSkeleton /> },
);

export default function HomePageClient() {
  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex-1">
        {/* Above-fold: SSR'd for LCP + SEO. */}
        <HeroSection />

        <StatsBar />

        <TechMarquee />

        <SkillsSection />

        {/* Below-fold: dynamically imported — defers JS until needed. */}
        <ServicesPreviewSection />

        <FeaturedProjectsSection />

        <LatestPostsSection />

        <RecommendationsSection />

        <ProcessSection />

        <B2BBand />

        <CTASection />
      </main>
    </div>
  );
}
