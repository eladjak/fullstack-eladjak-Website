import type { Metadata } from "next";
import { guideBySlug, allGuides } from "@/data/agent-guides";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fullstack-eladjak.co.il";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
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

  const title = `המדריך המלא ל-${guide.agentNameHe} | אלעד יעקובוביץ'`;
  // Strip markdown-style links [label](href) from description so meta stays clean.
  const cleanTagline = guide.tagline.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  const cleanHero = guide.heroDescription.replace(
    /\[([^\]]+)\]\([^)]+\)/g,
    "$1",
  );
  const description = `${cleanTagline}. ${cleanHero.slice(0, 140)}`.slice(
    0,
    300,
  );

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
      guide.category === "infra" ? "תשתית AI" : "סוכן אוטונומי",
      "אלעד יעקובוביץ'",
      "fullstack-eladjak",
    ],
    alternates: {
      canonical: guide.canonical,
      languages: {
        "he-IL": guide.canonical,
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

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
