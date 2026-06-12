'use client';

import HeroSection from '@/components/hero/hero-section';
import StatsBar from '@/components/sections/stats-bar';
import TechMarquee from '@/components/ui/tech-marquee';
import SkillsSection from '@/components/sections/skills-section';
import ServicesPreviewSection from '@/components/sections/services-preview-section';
import FeaturedProjectsSection from '@/components/sections/featured-projects-section';
import LatestPostsSection, {
  type MDXPostSerialized,
} from '@/components/sections/latest-posts-section';
import RecommendationsSection from '@/components/sections/recommendations-section';
import ProcessSection from '@/components/sections/process-section';
import B2BBand from '@/components/sections/b2b-band';
import CTASection from '@/components/sections/cta-section';
// ChatFAQ is intentionally a static import (SSR'd, NOT lazy): the homepage
// carries the site-wide FAQPage JSON-LD, so the matching visible FAQ content
// (static Q&A fallback inside ChatFAQ) must exist in the initial HTML.
import { ChatFAQ } from '@/components/ui/chat-faq';

interface HomePageClientProps {
  /** Latest blog posts, fetched server-side in the page (SSR'd into HTML). */
  latestPosts: MDXPostSerialized[];
}

// Below-fold sections were previously `dynamic(..., { ssr: false })`, which kept
// them out of the server-rendered HTML — invisible to AI/SEO crawlers. They are
// now plain imports so they render server-side. They are still `"use client"`
// components (for Framer Motion / hooks), so they hydrate on the client, but the
// initial HTML now contains their real content.

export default function HomePageClient({ latestPosts }: HomePageClientProps) {
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

        <LatestPostsSection posts={latestPosts} />

        <RecommendationsSection />

        <ProcessSection />

        <B2BBand />

        <ChatFAQ />

        <CTASection />
      </main>
    </div>
  );
}
