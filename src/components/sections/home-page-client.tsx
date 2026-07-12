'use client';

import HeroSection from '@/components/hero/hero-section';
import CinematicJourneyMount from '@/components/cinematic/cinematic-journey-mount';
import CinematicSceneCaption from '@/components/cinematic/cinematic-scene-caption';
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
    // `home-cinematic` scopes the transparent/dark treatment so the fixed flight
    // backdrop shows THROUGH the page; `cj-page` lifts content above the z-0
    // backdrop. The backdrop itself is client-only (ssr:false) — the SSR HTML
    // below (Hero h1, sections, FAQ, JSON-LD) is untouched and stays crawlable.
    <div className="home-cinematic flex min-h-dvh flex-col">
      {/* Full-page cinematic camera-flight backdrop (fixed, z-0). */}
      <CinematicJourneyMount />

      <main className="cj-page flex-1">
        {/* SCENE 1–2 — Approach → the operator's core. Hero flies in over it. */}
        {/* Above-fold: SSR'd for LCP + SEO. */}
        <HeroSection />

        <StatsBar />

        <TechMarquee />

        {/* SCENE 3 — the fleet as a constellation-city. */}
        <CinematicSceneCaption scene="fleet" />

        <SkillsSection />

        {/* SCENE 4 — districts of light = the projects/showcase. */}
        <CinematicSceneCaption scene="projects" />

        {/* Below-fold: dynamically imported — defers JS until needed. */}
        <ServicesPreviewSection />

        <FeaturedProjectsSection />

        <LatestPostsSection posts={latestPosts} />

        {/* SCENE 5 — the resonant hall = trust / recommendations. */}
        <CinematicSceneCaption scene="trust" />

        <RecommendationsSection />

        <ProcessSection />

        <B2BBand />

        <ChatFAQ />

        {/* SCENE 6 — the gate = contact / CTA. */}
        <CinematicSceneCaption scene="gate" />

        <CTASection />
      </main>
    </div>
  );
}
