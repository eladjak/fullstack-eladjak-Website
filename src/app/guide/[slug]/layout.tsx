import type { Metadata } from "next";
import { guideBySlug, allGuides } from "@/data/agent-guides";
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
  const text = raw.replace(/\s+/g, " ").trim();
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
 * Pre-generate params for all guides so each /guide/[slug] route has static
 * metadata resolved at build time (better for Google + AI engine indexing).
 */
export function generateStaticParams() {
  return allGuides
    .filter((g) => g.slug !== "claude-code")
    .map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: Pick<LayoutProps, "params">): Promise<Metadata> {
  const { slug } = await params;
  const guide = guideBySlug.get(slug);
  if (!guide) {
    return {
      title: "מדריך לא נמצא",
    };
  }

  const title = `המדריך המלא ל-${guide.agentNameHe}`;
  // Strip markdown-style links [label](href) from description so meta stays clean.
  const cleanTagline = guide.tagline.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  const cleanHero = guide.heroDescription.replace(
    /\[([^\]]+)\]\([^)]+\)/g,
    "$1",
  );
  // Clamp meta description to the SEO/GEO sweet spot (120-160 chars). Prefer
  // tagline + start of hero, then trim on a word boundary so it stays readable.
  const description = clampMeta(`${cleanTagline}. ${cleanHero}`);

  const ogImageUrl = guide.heroBgImage
    ? guide.heroBgImage.startsWith("http")
      ? guide.heroBgImage
      : `${SITE_URL}${guide.heroBgImage}`
    : `${SITE_URL}/images/og-default.jpg`;

  return {
    title,
    description,
    keywords: [
      guide.agentName,
      guide.agentNameHe,
      `מדריך ${guide.agentName}`,
      `מדריך ${guide.agentNameHe}`,
      `${guide.agentName} עברית`,
      `${guide.agentName} מדריך בעברית`,
      "סוכני AI",
      "סוכן בינה מלאכותית",
      "AI agent",
      "agent network",
      "מדריך AI בעברית",
      "Claude Code עברית",
      guide.category === "infra"
        ? "תשתית AI"
        : guide.category === "pattern"
          ? "דפוסי רשת-סוכנים"
          : "סוכן אוטונומי",
      "אלעד יעקובוביץ'",
      "fullstack-eladjak",
    ],
    alternates: {
      canonical: guide.canonical,
      languages: {
        "he-IL": guide.canonical,
        "en-US": `${SITE_URL}/en/guide/${guide.slug}`,
        "x-default": guide.canonical,
      },
    },
    openGraph: {
      title,
      description,
      url: guide.canonical,
      type: "article",
      locale: "he_IL",
      siteName: "אלעד יעקובוביץ' - תיק עבודות",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${guide.agentNameHe} — מדריך מעשי בעברית`,
        },
      ],
      authors: ["אלעד יעקובוביץ'"],
      tags: [guide.agentName, "AI", "agent", "מדריך עברית"],
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
      images: [ogImageUrl],
      creator: "@eladjak",
    },
    authors: [{ name: "אלעד יעקובוביץ'", url: SITE_URL }],
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

export default async function GuideLayout({
  children,
  params,
}: LayoutProps) {
  const { slug } = await params;
  const guide = guideBySlug.get(slug);
  return (
    <>
      {/* JSON-LD emitted from this SERVER layout so it lands in the initial
          server-rendered HTML (visible to AI crawlers), not the React payload. */}
      {guide && guide.slug !== "claude-code" && (
        <SeoJsonLd guide={guide} locale="he" />
      )}
      {/* Server-rendered SEO/GEO content fallback (sr-only) — supplies <h1>,
          semantic tags, <h4> depth and external citation links in the initial
          HTML, which the "use client" guide UI cannot. */}
      {guide && guide.slug !== "claude-code" && (
        <GuideSeoContent guide={guide} locale="he" />
      )}
      {children}
    </>
  );
}
