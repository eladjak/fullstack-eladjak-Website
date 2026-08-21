import type { Metadata } from "next";
import { guideBySlugEn, allGuidesEn } from "@/data/agent-guides/en";
import { guideBySlug } from "@/data/agent-guides";
import { SeoJsonLd } from "@/components/agent-guide/SeoJsonLd";
import { GuideSeoContent } from "@/components/agent-guide/GuideSeoContent";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fullstack-eladjak.co.il";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

/**
 * Clamp a meta description into the 120-160 char SEO/GEO range. If the source
 * is longer than the max it is cut on the last word boundary before the limit
 * and an ellipsis is appended; shorter strings are returned untouched.
 */
function clampMeta(raw: string, max = 158): string {
  // Normalize ASCII quotes to typographic ones: React HTML-escapes ' and "
  // inside attribute values (&#x27; / &quot;), which inflates the SERIALIZED
  // meta-description length past the 120-160 GEO budget even when the visible
  // text is in range. Typographic quotes are emitted as-is (1 char each).
  const text = raw
    .replace(/\s+/g, " ")
    .replace(/'/g, "’")
    .replace(/"/g, "”")
    .trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  const base = (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(
    /[\s.,;:]+$/,
    "",
  );
  return `${base}…`;
}

/**
 * Anything not produced by generateStaticParams below is not a guide, and must
 * fail at the routing layer with a real 404. Without this the route answered
 * 200 for any slug: the page is a client component, so its notFound() painted
 * the right screen far too late to change the status line.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return allGuidesEn
    .filter((g) => g.slug !== "claude-code")
    .map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: Pick<LayoutProps, "params">): Promise<Metadata> {
  const { slug } = await params;
  const guide = guideBySlugEn.get(slug);
  if (!guide) {
    return { title: "Guide not found" };
  }
  const heGuide = guideBySlug.get(slug);

  const title = `${guide.agentName} — The Complete Guide`;
  const cleanTagline = guide.tagline.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  const cleanHero = guide.heroDescription.replace(
    /\[([^\]]+)\]\([^)]+\)/g,
    "$1",
  );
  // Clamp meta description to the SEO/GEO sweet spot (120-160 chars).
  const description = clampMeta(`${cleanTagline}. ${cleanHero}`);

  const enCanonical = `${SITE_URL}/en/guide/${guide.slug}`;
  const heCanonical = heGuide?.canonical || `${SITE_URL}/guide/${guide.slug}`;

  const ogImageUrl = guide.heroBgImage
    ? guide.heroBgImage.startsWith("http")
      ? guide.heroBgImage
      : `${SITE_URL}${guide.heroBgImage}`
    : `${SITE_URL}/images/og-default.jpg`;

  return {
    title: {
      absolute: `${title} | Elad Yaakobovitch`,
    },
    description,
    keywords: [
      guide.agentName,
      `${guide.agentName} guide`,
      `${guide.agentName} tutorial`,
      "AI agents",
      "AI agent network",
      "Claude Code",
      "MCP",
      guide.category === "infra"
        ? "AI infrastructure"
        : guide.category === "pattern"
          ? "agent network patterns"
          : "autonomous agent",
      "Elad Yaakobovitch",
      "fullstack-eladjak",
    ],
    alternates: {
      canonical: enCanonical,
      languages: {
        "he-IL": heCanonical,
        "en-US": enCanonical,
        "x-default": enCanonical,
      },
    },
    openGraph: {
      title,
      description,
      url: enCanonical,
      type: "article",
      locale: "en_US",
      siteName: "Elad Yaakobovitch, Portfolio",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${guide.agentName} — Complete practical guide`,
        },
      ],
      authors: ["Elad Yaakobovitch"],
      tags: [guide.agentName, "AI", "agent", "guide"],
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
      images: [ogImageUrl],
      creator: "@eladjak",
    },
    authors: [{ name: "Elad Yaakobovitch", url: SITE_URL }],
    category:
      guide.category === "infra"
        ? "Infrastructure"
        : guide.category === "pattern"
          ? "Agent Patterns"
          : "AI Agents",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function GuideLayoutEn({
  children,
  params,
}: LayoutProps) {
  const { slug } = await params;
  const guide = guideBySlugEn.get(slug);
  return (
    <>
      {/* JSON-LD emitted from this SERVER layout so it lands in the initial
          server-rendered HTML (visible to AI crawlers), not the React payload. */}
      {guide && guide.slug !== "claude-code" && (
        <SeoJsonLd guide={guide} locale="en" />
      )}
      {/* Server-rendered SEO/GEO content fallback (sr-only), supplies <h1>,
          semantic tags, <h4> depth and external citation links in the initial
          HTML, which the "use client" guide UI cannot. */}
      {guide && guide.slug !== "claude-code" && (
        <GuideSeoContent guide={guide} locale="en" />
      )}
      {children}
    </>
  );
}
