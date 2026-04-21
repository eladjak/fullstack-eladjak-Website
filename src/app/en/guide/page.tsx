import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Sparkles, Bot, Server, Zap } from "lucide-react";
import { allGuidesEn } from "@/data/agent-guides/en";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fullstack-eladjak.co.il";
const GUIDE_INDEX_URL_EN = `${SITE_URL}/en/guide`;
const GUIDE_INDEX_URL_HE = `${SITE_URL}/guide`;
const GUIDE_INDEX_OG = `${SITE_URL}/images/og-default.jpg`;

export const metadata: Metadata = {
  title: "AI Agent + Infrastructure Guides | Elad Yaakobovitch",
  description:
    "14 practical guides covering a full AI agent network: Claude Code, Kami (WhatsApp agent), Kaylee (SRE), CrewAI, Box, Hermes, Adopter, Dashboard, Qdrant, Delegator, Docker, Ollama, n8n, and Aider. Installation, code, and production tips from a developer running this network 24/7.",
  alternates: {
    canonical: GUIDE_INDEX_URL_EN,
    languages: {
      "he-IL": GUIDE_INDEX_URL_HE,
      "en-US": GUIDE_INDEX_URL_EN,
      "x-default": GUIDE_INDEX_URL_EN,
    },
  },
  keywords: [
    "AI agent guides",
    "Claude Code guide",
    "AI agent network",
    "MCP guide",
    "Docker guide",
    "Ollama guide",
    "LLM local",
    "n8n guide",
    "Aider guide",
    "Qdrant vector database",
    "CrewAI",
    "WhatsApp AI agent",
    "self-healing infrastructure",
    "Elad Yaakobovitch",
    "fullstack-eladjak",
  ],
  openGraph: {
    title: "14 AI Agent + Infrastructure Guides | Elad Yaakobovitch",
    description:
      "A complete AI agent network — Claude Code, Kami, Kaylee, CrewAI, Qdrant, Docker, Ollama, n8n and more. Practical guides with installation, code, and production tips.",
    url: GUIDE_INDEX_URL_EN,
    type: "website",
    locale: "en_US",
    siteName: "Elad Yaakobovitch — Portfolio",
    images: [
      {
        url: GUIDE_INDEX_OG,
        width: 1200,
        height: 630,
        alt: "AI Agent + Infrastructure Guides",
      },
    ],
  },
  twitter: {
    title: "14 AI Agent + Infrastructure Guides",
    description:
      "Claude Code, Kami, Kaylee, CrewAI, Qdrant, Docker, Ollama, n8n and more — practical guides.",
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

export default function GuideIndexEn() {
  const agentGuides = allGuidesEn.filter(
    (g) => (g.category ?? "agent") === "agent",
  );
  const infraGuides = allGuidesEn.filter((g) => g.category === "infra");

  return (
    <main className="min-h-dvh bg-background" dir="ltr" lang="en">
      {/* Hero */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
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
              2026 · 14 Guides · Agents + Infrastructure
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Agent Network Guides
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
            14 practical guides covering a complete AI agent network + core
            infrastructure. Not theory — real installation steps, tips from
            daily use, and working code examples.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              hrefLang="he"
            >
              עברית · Hebrew version
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 bg-card border border-border rounded-full px-3 py-1">
              <Bot className="size-3.5 text-primary" /> 10 agents
            </span>
            <span className="inline-flex items-center gap-1.5 bg-card border border-border rounded-full px-3 py-1">
              <Server className="size-3.5 text-accent" /> 4 infra components
            </span>
            <span className="inline-flex items-center gap-1.5 bg-card border border-border rounded-full px-3 py-1">
              <Zap className="size-3.5 text-amber-500" /> open source
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
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              AI Agents
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              10 autonomous agents working together across diverse tasks
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {agentGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} variant="agent" />
          ))}
        </div>
      </section>

      {/* Infrastructure */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="mb-8 mt-4 flex items-center gap-3">
          <div className="size-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0">
            <Server className="size-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Infrastructure
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              The core tools that power the network — containers, local LLMs,
              automations, and a complementary CLI
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {infraGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} variant="infra" />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Need help deploying something similar? I run this exact
            infrastructure in production 24/7.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground font-medium px-6 py-3 hover:opacity-90 transition-opacity"
          >
            Schedule a consultation
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

function GuideCard({
  guide,
  variant,
}: {
  guide: (typeof allGuidesEn)[number];
  variant: "agent" | "infra";
}) {
  const href =
    guide.slug === "claude-code" ? "/en/claude-code" : `/en/guide/${guide.slug}`;
  const firstSection = guide.sections[0];
  const Icon = firstSection?.icon;
  const gradient = firstSection?.color || "from-primary to-accent";
  const heroImage = guide.heroBgImage;
  const secondaryBadge = guide.badgeText.split("·")[1]?.trim() || guide.agentName;

  return (
    <Link
      href={href}
      className="group bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 flex flex-col"
      aria-label={`${guide.agentName} guide`}
    >
      {heroImage && (
        <div className="relative h-32 sm:h-36 overflow-hidden">
          <Image
            src={heroImage}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            aria-hidden="true"
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
                alt={`${guide.agentName} logo`}
                fill
                sizes="80px"
                className="object-cover"
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
      <div className="flex-1 flex flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-tight">
            {guide.agentName}
          </h3>
          {variant === "infra" && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 whitespace-nowrap shrink-0 mt-1">
              Infrastructure
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
          <span>Read the guide</span>
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
