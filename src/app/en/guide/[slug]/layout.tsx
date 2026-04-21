import type { Metadata } from "next";
import { guideBySlugEn, allGuidesEn } from "@/data/agent-guides/en";
import { guideBySlug } from "@/data/agent-guides";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fullstack-eladjak.co.il";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

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
  const description = `${cleanTagline}. ${cleanHero.slice(0, 160)}`.slice(
    0,
    300,
  );

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
      guide.category === "infra" ? "AI infrastructure" : "autonomous agent",
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
      siteName: "Elad Yaakobovitch — Portfolio",
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
    category: guide.category === "infra" ? "Infrastructure" : "AI Agents",
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

export default function GuideLayoutEn({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
