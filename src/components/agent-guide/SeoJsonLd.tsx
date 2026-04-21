import Script from "next/script";
import type { AgentGuideData } from "./types";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fullstack-eladjak.co.il";
const AUTHOR_NAME = "אלעד יעקובוביץ'";
const AUTHOR_URL = SITE_URL;
const PUBLISHER_LOGO = "https://avatars.githubusercontent.com/u/108827199?v=4";

interface SeoJsonLdProps {
  guide: AgentGuideData;
}

/**
 * JSON-LD structured data for an agent guide page.
 *
 * Outputs two graphs:
 *  - TechArticle: describes the guide as a how-to technical article (Hebrew).
 *    Includes headline, description, image, author, publisher, datePublished,
 *    and inLanguage so Google + AI engines (Perplexity, ChatGPT, Google AI
 *    Overviews) can cite it correctly.
 *  - BreadcrumbList: Home → מדריכים (/guide) → guide slug, for rich results.
 *
 * No external deps; pure inline <script type="application/ld+json">.
 */
export function SeoJsonLd({ guide }: SeoJsonLdProps) {
  const pageUrl =
    guide.slug === "claude-code"
      ? `${SITE_URL}/claude-code`
      : `${SITE_URL}/guide/${guide.slug}`;

  const imageUrl = guide.heroBgImage
    ? guide.heroBgImage.startsWith("http")
      ? guide.heroBgImage
      : `${SITE_URL}${guide.heroBgImage}`
    : PUBLISHER_LOGO;

  // Dates — we don't track per-guide publish dates yet, so use sitemap-style
  // "recent" date. Year is 2026 per site-wide content. Using a stable Q1 2026
  // date means the TechArticle has a real datePublished without misleading
  // "updated today" every build.
  const datePublished = "2026-01-15";
  const dateModified = new Date().toISOString().split("T")[0];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `המדריך המלא ל-${guide.agentNameHe}`,
    description: guide.tagline,
    image: [imageUrl],
    datePublished,
    dateModified,
    inLanguage: "he-IL",
    url: pageUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: AUTHOR_URL,
    },
    publisher: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: AUTHOR_URL,
      logo: {
        "@type": "ImageObject",
        url: PUBLISHER_LOGO,
      },
    },
    about: {
      "@type": "Thing",
      name: guide.agentName,
    },
    keywords: [
      guide.agentName,
      guide.agentNameHe,
      `מדריך ${guide.agentName}`,
      `מדריך ${guide.agentNameHe}`,
      "סוכני AI",
      "AI agent",
      "agent network",
      "בינה מלאכותית",
    ].join(", "),
    articleSection: guide.category === "infra" ? "Infrastructure" : "AI Agents",
    proficiencyLevel: "Beginner to Advanced",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "דף הבית",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "מדריכים",
        item: `${SITE_URL}/guide`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.agentNameHe,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <Script
        id={`jsonld-article-${guide.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Script
        id={`jsonld-breadcrumb-${guide.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
