import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Sparkles, Bot, Server, Zap } from "lucide-react";
import { allGuides } from "@/data/agent-guides";

export const metadata: Metadata = {
  title: "מדריכי סוכני AI + תשתית | אלעד יעקובוביץ'",
  description:
    "14 מדריכים מעשיים בעברית — סוכני AI (Claude Code, Kami, Kaylee, CrewAI, Box, Hermes, Adopter, Dashboard), אחסון סמנטי (Qdrant), תזמור (Delegator), ותשתית (Docker, Ollama, n8n, Aider). התקנה, שימוש, וטיפים.",
  alternates: {
    canonical: "https://fullstack-eladjak.co.il/guide",
  },
  keywords: [
    "מדריכי AI",
    "סוכני AI בעברית",
    "Claude Code עברית",
    "Docker מדריך",
    "Ollama עברית",
    "n8n מדריך",
    "Aider מדריך",
    "Qdrant",
    "agent network",
  ],
};

export default function GuideIndex() {
  const agentGuides = allGuides.filter((g) => (g.category ?? "agent") === "agent");
  const infraGuides = allGuides.filter((g) => g.category === "infra");

  return (
    <main className="min-h-dvh bg-background" dir="rtl">
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
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-heebo">
              תשתית ורכיבי בסיס
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              הכלים שמאפשרים לרשת לעבוד — containers, LLMs מקומיים, אוטומציות,
              ו-CLI משלים
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
}: {
  guide: (typeof allGuides)[number];
  variant: "agent" | "infra";
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
          {guide.brandIconSlug && (
            <div className="absolute top-3 end-3 size-9 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg ring-1 ring-black/5">
              <Image
                src={`https://cdn.simpleicons.org/${guide.brandIconSlug}/${guide.brandIconColor ?? "currentColor"}`}
                alt={`לוגו ${guide.agentName}`}
                width={20}
                height={20}
                unoptimized
              />
            </div>
          )}
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
