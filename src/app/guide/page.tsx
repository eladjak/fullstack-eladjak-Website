import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { headers } from "next/headers";
import { ChevronLeft, Sparkles, Bot, Server, Zap } from "lucide-react";
import { allGuides } from "@/data/agent-guides";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fullstack-eladjak.co.il";
const GUIDE_INDEX_URL = `${SITE_URL}/guide`;
const GUIDE_INDEX_OG = `${SITE_URL}/images/og-default.jpg`;

export const metadata: Metadata = {
  title: "מדריכי סוכני AI + תשתית בעברית | אלעד יעקובוביץ'",
  description:
    "14 מדריכים מעשיים בעברית לבניית רשת סוכני AI מלאה: Claude Code, Kami (WhatsApp), Kaylee, CrewAI, Box, Hermes, Adopter, Dashboard, Qdrant (vector DB), Delegator (orchestration), Docker, Ollama (LLM מקומי), n8n (אוטומציה) ו-Aider. התקנה, קוד, וטיפים מייצור 24/7 — כתובים על ידי מפתח שמפעיל את הרשת הזו בפועל.",
  alternates: {
    canonical: GUIDE_INDEX_URL,
    languages: {
      "he-IL": GUIDE_INDEX_URL,
    },
  },
  keywords: [
    "מדריכי AI",
    "מדריך AI בעברית",
    "סוכני AI בעברית",
    "סוכן בינה מלאכותית",
    "AI agent network",
    "agent network",
    "Claude Code עברית",
    "Claude Code מדריך",
    "MCP",
    "מדריך Docker עברית",
    "Ollama בעברית",
    "LLM מקומי",
    "n8n מדריך עברית",
    "Aider מדריך",
    "Qdrant מדריך",
    "vector database",
    "CrewAI",
    "WhatsApp AI agent",
    "Kami WhatsApp",
    "Delegator orchestration",
    "אלעד יעקובוביץ'",
    "fullstack-eladjak",
  ],
  openGraph: {
    title: "14 מדריכי סוכני AI + תשתית בעברית | אלעד יעקובוביץ'",
    description:
      "רשת סוכני AI מלאה בעברית — Claude Code, Kami, Kaylee, CrewAI, Qdrant, Docker, Ollama, n8n ועוד. התקנה, קוד, וטיפים מייצור.",
    url: GUIDE_INDEX_URL,
    type: "website",
    locale: "he_IL",
    siteName: "אלעד יעקובוביץ' - תיק עבודות",
    images: [
      {
        url: GUIDE_INDEX_OG,
        width: 1200,
        height: 630,
        alt: "מדריכי סוכני AI + תשתית בעברית",
      },
    ],
  },
  twitter: {
    title: "14 מדריכי סוכני AI + תשתית בעברית",
    description:
      "Claude Code, Kami, Kaylee, CrewAI, Qdrant, Docker, Ollama, n8n ועוד — מדריכים מעשיים בעברית.",
    card: "summary_large_image",
    images: [GUIDE_INDEX_OG],
    creator: "@eladjak",
  },
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

export default async function GuideIndex() {
  const agentGuides = allGuides.filter((g) => (g.category ?? "agent") === "agent");
  const infraGuides = allGuides.filter((g) => g.category === "infra");

  // Per-request CSP nonce from src/proxy.ts so the inline JSON-LD
  // <script> below satisfies our nonce-based CSP without 'unsafe-inline'.
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  // JSON-LD: CollectionPage wrapping an ItemList of all 14 guides as
  // LearningResource entries. This helps AI search engines (ChatGPT,
  // Perplexity, Claude, Gemini) and Google AI Overviews understand the
  // index page as a curated collection of educational Hebrew resources.
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": GUIDE_INDEX_URL,
    url: GUIDE_INDEX_URL,
    name: "מדריכי סוכני AI + תשתית בעברית",
    description:
      "14 מדריכים מעשיים בעברית לבניית רשת סוכני AI מלאה: סוכנים (Claude Code, Kami, Kaylee, Box, Hermes, Delegator, Adopter, Dashboard, CrewAI) ותשתית (Qdrant, Docker, Ollama, n8n, Aider).",
    inLanguage: "he-IL",
    isPartOf: {
      "@type": "WebSite",
      "@id": SITE_URL,
      name: "אלעד יעקובוביץ' - תיק עבודות",
      url: SITE_URL,
    },
    author: {
      "@type": "Person",
      name: "Elad Yaakobovitch",
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      name: "14 מדריכי סוכני AI ותשתית",
      numberOfItems: allGuides.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: allGuides.map((guide, index) => {
        const guideUrl =
          guide.slug === "claude-code"
            ? `${SITE_URL}/claude-code`
            : `${SITE_URL}/guide/${guide.slug}`;
        return {
          "@type": "ListItem",
          position: index + 1,
          url: guideUrl,
          item: {
            "@type": "LearningResource",
            "@id": guideUrl,
            name: `המדריך המלא ל-${guide.agentNameHe}`,
            url: guideUrl,
            description: guide.tagline,
            inLanguage: "he-IL",
            learningResourceType:
              guide.category === "infra"
                ? "Infrastructure Guide"
                : "AI Agent Guide",
            educationalLevel: "Beginner to Advanced",
            author: {
              "@type": "Person",
              name: "Elad Yaakobovitch",
            },
            about: {
              "@type": "Thing",
              name: guide.agentName,
            },
          },
        };
      }),
    },
  };

  return (
    <main className="min-h-dvh bg-background" dir="rtl">
      <Script
        id="jsonld-guide-collection"
        type="application/ld+json"
        strategy="beforeInteractive"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      {/* Hero */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Decorative background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute top-0 start-1/2 -translate-x-1/2 size-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none"
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">
              2026 · 14 מדריכים · סוכנים + תשתית
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 font-heebo text-balance">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              מדריכי רשת הסוכנים
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
            14 מדריכים בעברית לרשת סוכני AI מלאה + רכיבי תשתית. לא תיאוריה —
            התקנה מעשית, טיפים מתוך שימוש אמיתי, ודוגמאות קוד שעובדות.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 bg-card border border-border rounded-full px-3 py-1">
              <Bot className="size-3.5 text-primary" /> 10 סוכנים
            </span>
            <span className="inline-flex items-center gap-1.5 bg-card border border-border rounded-full px-3 py-1">
              <Server className="size-3.5 text-accent" /> 4 רכיבי תשתית
            </span>
            <span className="inline-flex items-center gap-1.5 bg-card border border-border rounded-full px-3 py-1">
              <Zap className="size-3.5 text-amber-500" /> קוד פתוח
            </span>
          </div>
        </div>
      </section>

      {/* Agents */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
        <div className="mb-8 flex items-center gap-3">
          <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
            <Bot className="size-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-heebo">
              סוכני AI
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              10 סוכנים אוטונומיים שעובדים בעברית ומנהלים יחד משימות מגוונות
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {agentGuides.map((guide, index) => (
            <GuideCard key={guide.slug} guide={guide} variant="agent" eager={index < 3} />
          ))}
        </div>
      </section>

      {/* Build your server */}
      <section
        id="build-your-server"
        className="max-w-6xl mx-auto px-4 sm:px-6 pb-20"
      >
        <div className="mb-8 mt-4 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/[0.04] via-transparent to-cyan-500/[0.04] p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="size-11 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
              <Server className="size-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-heebo">
                  בנה את השרת שלך
                </h2>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  {infraGuides.length} כלי ליבה
                </span>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-pretty">
                כלי הליבה שאני בונה איתם את השרת האישי שלי. כל אחד מהם רץ אצלי
                על Hetzner VPS ומשרת את 13 הסוכנים.
              </p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {infraGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} variant="infra" />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            רוצים לקבל עזרה בהטמעה? יש לי תשתית דומה בייצור 24/7.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground font-medium px-6 py-3 hover:opacity-90 transition-opacity"
          >
            תאמו שיחת ייעוץ
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

function GuideCard({
  guide,
  variant,
  eager = false,
}: {
  guide: (typeof allGuides)[number];
  variant: "agent" | "infra";
  eager?: boolean;
}) {
  const href =
    guide.slug === "claude-code" ? "/claude-code" : `/guide/${guide.slug}`;
  const firstSection = guide.sections[0];
  const Icon = firstSection?.icon;
  const gradient = firstSection?.color || "from-primary to-accent";
  const heroImage = guide.heroBgImage;
  const secondaryBadge = guide.badgeText.split("·")[1]?.trim() || guide.agentName;

  return (
    <Link
      href={href}
      className="group bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 flex flex-col"
      aria-label={`מדריך ${guide.agentName}`}
    >
      {/* Card image header */}
      {heroImage && (
        <div className="relative h-32 sm:h-36 overflow-hidden">
          <Image
            src={heroImage}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            aria-hidden="true"
            {...(eager ? { priority: true, fetchPriority: 'high' as const } : { loading: 'lazy' as const })}
          />
          <div
            aria-hidden="true"
            className={`absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent`}
          />
          {Icon && (
            <div
              className={`absolute bottom-3 start-3 size-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}
            >
              <Icon className="h-5 w-5 text-white" />
            </div>
          )}
          {guide.logoImage ? (
            <div className="absolute top-3 end-3 size-16 sm:size-20 rounded-2xl overflow-hidden shadow-xl ring-2 ring-white/20">
              <Image
                src={guide.logoImage}
                alt={`לוגו ${guide.agentName}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
          ) : guide.brandIconSlug ? (
            <div className="absolute top-3 end-3 size-14 rounded-2xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-xl ring-2 ring-white/20">
              <Image
                src={`https://cdn.simpleicons.org/${guide.brandIconSlug}/${guide.brandIconColor ?? "currentColor"}`}
                alt={`לוגו ${guide.agentName}`}
                width={32}
                height={32}
                unoptimized
              />
            </div>
          ) : null}
        </div>
      )}
      {!heroImage && Icon && (
        <div className="p-6 pb-0">
          <div
            className={`size-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-sm`}
          >
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      )}

      {/* Body */}
      <div className="flex-1 flex flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors font-heebo leading-tight">
            {guide.agentNameHe}
          </h3>
          {variant === "infra" && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 whitespace-nowrap shrink-0 mt-1">
              תשתית
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mb-3">{secondaryBadge}</p>
        <p className="text-sm text-foreground/80 mb-3 font-medium leading-relaxed text-pretty">
          {guide.tagline}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 text-pretty flex-1">
          {guide.heroDescription}
        </p>

        <div className="flex items-center gap-2 text-sm font-medium text-primary">
          <span>לקריאת המדריך</span>
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        </div>

        <div className="mt-4 pt-4 border-t border-border/50 flex flex-wrap gap-1.5">
          {guide.stats.slice(0, 2).map((stat) => (
            <span
              key={stat.label}
              className="text-[10px] bg-muted rounded-full px-2 py-1 text-muted-foreground tabular-nums"
            >
              {stat.value} · {stat.label}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
