"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Share2,
  Copy,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  LayoutGrid,
} from "lucide-react";
import type { AgentGuideData, Difficulty } from "./types";
import { allGuides } from "@/data/agent-guides";
import { allGuidesEn } from "@/data/agent-guides/en";
import { SeoJsonLd } from "./SeoJsonLd";
import { GuideVideo } from "./GuideVideo";

type Locale = "he" | "en";

/**
 * i18n strings for UI chrome. Content comes from the guide data object
 * (already localized in he/en variants under /data/agent-guides/{,/en}).
 */
const T = {
  he: {
    allGuides: "כל המדריכים",
    prevGuide: "למדריך הקודם",
    nextGuide: "למדריך הבא",
    simpleExplanation: "הסבר פשוט",
    technicalMode: "מצב טכני",
    inSimpleTerms: "בשפה פשוטה:",
    practicalGuide: "המדריך המעשי",
    clickToOpen: "לחצו על כל סעיף לפתיחה",
    whoIsThisFor: "למי זה מתאים?",
    hereHow: "הנה איך:",
    resources: "משאבים ולינקים",
    liked: "אהבתם? שתפו:",
    copyLink: "העתיקו קישור",
    copied: "הועתק!",
    share: "שתפו",
    tipsFromExperience: "טיפים מהניסיון",
    previousGuide: "המדריך הקודם",
    nextGuideLabel: "המדריך הבא",
    backToIndex: "חזרה לאינדקס",
    contact: "צרו קשר",
    consultingServices: "שירותי ייעוץ AI",
    moreGuides: "עוד מדריכים",
    completeGuideTo: (name: string) => `המדריך המלא ל-${name}`,
    aboutAuthor: "אלעד יעקובוביץ'",
    authorRole: "מפתח Full-Stack ומומחה AI",
    switchLang: "English",
    switchLangHref: (slug: string) =>
      slug === "claude-code" ? "/en/claude-code" : `/en/guide/${slug}`,
    agentsHeading: "סוכני AI",
    infraHeading: "תשתית ורכיבי בסיס",
    difficulty: {
      beginner: "למתחילים",
      intermediate: "בינוני",
      advanced: "מתקדם",
    } as Record<Difficulty, string>,
    guideIndex: "/guide",
  },
  en: {
    allGuides: "All guides",
    prevGuide: "Previous guide",
    nextGuide: "Next guide",
    simpleExplanation: "Simple explanation",
    technicalMode: "Technical mode",
    inSimpleTerms: "In plain terms:",
    practicalGuide: "The practical guide",
    clickToOpen: "Click any section to open it",
    whoIsThisFor: "Who is this for?",
    hereHow: "Here's how:",
    resources: "Resources & links",
    liked: "Liked it? Share:",
    copyLink: "Copy link",
    copied: "Copied!",
    share: "Share",
    tipsFromExperience: "Tips from experience",
    previousGuide: "Previous guide",
    nextGuideLabel: "Next guide",
    backToIndex: "Back to index",
    contact: "Contact",
    consultingServices: "AI consulting services",
    moreGuides: "More guides",
    completeGuideTo: (name: string) => `${name} — The Complete Guide`,
    aboutAuthor: "Elad Yaakobovitch",
    authorRole: "Full-Stack Developer & AI Specialist",
    switchLang: "עברית",
    switchLangHref: (slug: string) =>
      slug === "claude-code" ? "/claude-code" : `/guide/${slug}`,
    agentsHeading: "AI Agents",
    infraHeading: "Infrastructure",
    difficulty: {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
    } as Record<Difficulty, string>,
    guideIndex: "/en/guide",
  },
} as const;

/**
 * Parse markdown-style links in a string: [label](href) → <Link>label</Link>
 * Used to create real clickable cross-links between guides in content fields.
 */
function renderWithLinks(text: string): React.ReactNode {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (match) {
      const [, label, href] = match;
      if (!href) return part;
      const isExternal = href.startsWith("http");
      return (
        <Link
          key={i}
          href={href}
          {...(isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary transition-colors font-medium"
        >
          {label}
        </Link>
      );
    }
    return part;
  });
}

const difficultyColors: Record<
  Difficulty,
  { color: string; bg: string }
> = {
  beginner: {
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  intermediate: {
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  advanced: {
    color: "text-rose-400",
    bg: "bg-rose-500/10 border-rose-500/20",
  },
};

interface AgentGuideProps {
  guide: AgentGuideData;
  locale?: Locale;
}

export function AgentGuide({ guide, locale = "he" }: AgentGuideProps) {
  const t = T[locale];
  const isRtl = locale === "he";
  const guidesList = locale === "en" ? allGuidesEn : allGuides;
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showBeginner, setShowBeginner] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // Prev/next guide for nav (locale-aware)
  const guideIndex = guidesList.findIndex((g) => g.slug === guide.slug);
  const prevGuide = guideIndex > 0 ? guidesList[guideIndex - 1] : undefined;
  const nextGuide =
    guideIndex >= 0 && guideIndex < guidesList.length - 1
      ? guidesList[guideIndex + 1]
      : undefined;
  const guidePrefix = locale === "en" ? "/en/guide" : "/guide";
  const claudeCodeHref = locale === "en" ? "/en/claude-code" : "/claude-code";
  const guideHref = (slug: string) =>
    slug === "claude-code" ? claudeCodeHref : `${guidePrefix}/${slug}`;

  const handleShare = async () => {
    const url = guide.canonical;
    if (typeof navigator !== "undefined" && navigator.share) {
      await navigator.share({ title: t.completeGuideTo(guide.agentName), url });
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const scrollToSection = (id: string) => {
    setExpandedSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const PrimaryIcon = guide.primaryCta.icon;
  const SecondaryIcon = guide.secondaryCta?.icon;

  // In RTL, prev visually on the right uses ChevronRight; in LTR, prev on left uses ChevronLeft.
  const PrevArrowIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextArrowIcon = isRtl ? ChevronLeft : ChevronRight;

  return (
    <main
      className="min-h-dvh bg-background"
      dir={isRtl ? "rtl" : "ltr"}
      lang={locale}
    >
      <SeoJsonLd guide={guide} locale={locale} />
      {/* Sticky TOC + guide nav */}
      <div className="sticky top-16 z-30 py-2 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 bg-background/70 backdrop-blur-md border border-border/50 rounded-2xl px-3 py-2 shadow-sm">
            {/* prev/next between guides */}
            <div className="flex items-center gap-1 shrink-0 border-e border-border/50 pe-2 me-1">
              {prevGuide ? (
                <Link
                  href={guideHref(prevGuide.slug)}
                  className="p-1.5 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  aria-label={`${t.prevGuide}: ${prevGuide.agentName}`}
                  title={prevGuide.agentName}
                >
                  <PrevArrowIcon className="h-4 w-4" />
                </Link>
              ) : (
                <span className="p-1.5 opacity-30" aria-hidden="true">
                  <PrevArrowIcon className="h-4 w-4" />
                </span>
              )}
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="p-1.5 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label={t.allGuides}
                aria-expanded={menuOpen}
                title={t.allGuides}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              {nextGuide ? (
                <Link
                  href={guideHref(nextGuide.slug)}
                  className="p-1.5 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  aria-label={`${t.nextGuide}: ${nextGuide.agentName}`}
                  title={nextGuide.agentName}
                >
                  <NextArrowIcon className="h-4 w-4" />
                </Link>
              ) : (
                <span className="p-1.5 opacity-30" aria-hidden="true">
                  <NextArrowIcon className="h-4 w-4" />
                </span>
              )}
              <Link
                href={t.switchLangHref(guide.slug)}
                className="ms-1 px-2 py-1 rounded-full text-[10px] font-semibold text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors border border-border/60"
                hrefLang={locale === "he" ? "en" : "he"}
                title={t.switchLang}
              >
                {t.switchLang}
              </Link>
            </div>
            {/* section TOC */}
            <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
              {guide.toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors px-2.5 py-1 rounded-full hover:bg-primary/10 whitespace-nowrap"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Guide menu dropdown */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="mt-2 bg-background/95 backdrop-blur-md border border-border/50 rounded-2xl p-4 shadow-lg"
                role="menu"
              >
                {(["agent", "infra"] as const).map((cat) => {
                  const items = allGuides.filter(
                    (g) => (g.category ?? "agent") === cat
                  );
                  if (!items.length) return null;
                  const heading =
                    cat === "agent" ? t.agentsHeading : t.infraHeading;
                  return (
                    <div key={cat} className="mb-3 last:mb-0">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-1">
                        {heading}
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                        {items.map((g) => {
                          const isCurrent = g.slug === guide.slug;
                          const logoSrc = g.logoImage
                            ? g.logoImage
                            : g.brandIconSlug
                              ? `https://cdn.simpleicons.org/${g.brandIconSlug}/${g.brandIconColor ?? "currentColor"}`
                              : undefined;
                          const unopt = !g.logoImage;
                          return (
                            <Link
                              key={g.slug}
                              href={guideHref(g.slug)}
                              onClick={() => setMenuOpen(false)}
                              role="menuitem"
                              aria-current={isCurrent ? "page" : undefined}
                              className={`flex items-center gap-2.5 text-xs font-medium px-3 py-2 rounded-lg transition-colors ${
                                isCurrent
                                  ? "bg-primary/15 text-primary border border-primary/30"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent"
                              }`}
                            >
                              {logoSrc ? (
                                <Image
                                  src={logoSrc}
                                  alt=""
                                  width={24}
                                  height={24}
                                  className="shrink-0 rounded-md"
                                  unoptimized={unopt}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  className="size-1.5 rounded-full bg-primary/60 shrink-0"
                                  aria-hidden="true"
                                />
                              )}
                              <span className="truncate text-start flex-1">
                                {g.agentName}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        {guide.heroBgImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={guide.heroBgImage}
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-20"
              priority
              fetchPriority="high"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
          </div>
        )}

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Brand/Custom logo (prefer logoImage over brandIconSlug) */}
            {(guide.logoImage || guide.brandIconSlug) && (
              <div className="mb-8 flex justify-center">
                {guide.logoImage ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="relative"
                  >
                    <div
                      className="absolute inset-0 bg-primary/30 rounded-3xl blur-2xl opacity-60"
                      aria-hidden="true"
                    />
                    <Image
                      src={guide.logoImage}
                      alt={`${guide.agentName} logo`}
                      width={144}
                      height={144}
                      className="relative rounded-3xl shadow-2xl shadow-primary/20 ring-1 ring-white/10"
                      priority
                    />
                  </motion.div>
                ) : (
                  <div className="inline-flex size-28 items-center justify-center rounded-3xl bg-card/80 backdrop-blur-sm border border-border/60 shadow-xl">
                    <Image
                      src={`https://cdn.simpleicons.org/${guide.brandIconSlug}/${guide.brandIconColor ?? "currentColor"}`}
                      alt={`${guide.agentName} logo`}
                      width={72}
                      height={72}
                      unoptimized
                    />
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5">
                <span className="text-xs font-semibold text-primary tracking-wide uppercase">
                  {guide.badgeText}
                </span>
              </div>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 bg-card/60 border border-border/50 rounded-full px-3 py-1.5 text-xs text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                aria-label={locale === "he" ? "שיתוף המדריך" : "Share guide"}
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Share2 className="h-3.5 w-3.5" />
                )}
                {copied ? t.copied : t.share}
              </button>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 font-heebo text-balance">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t.completeGuideTo(locale === "he" ? guide.agentNameHe : guide.agentName)}
              </span>
            </h1>
            <p className="text-xl sm:text-2xl font-medium text-foreground/80 mb-4 text-balance">
              {renderWithLinks(guide.tagline)}
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
              {renderWithLinks(guide.heroDescription)}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {guide.stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card/60 backdrop-blur-sm rounded-xl p-4 border border-border/50"
              >
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tabular-nums">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Beginner/Advanced toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex justify-center"
          >
            <div
              className="inline-flex bg-card/60 border border-border/50 rounded-full p-1"
              role="tablist"
              aria-label={locale === "he" ? "רמת הסבר" : "Explanation level"}
            >
              <button
                onClick={() => setShowBeginner(true)}
                role="tab"
                aria-selected={showBeginner}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  showBeginner
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.simpleExplanation}
              </button>
              <button
                onClick={() => setShowBeginner(false)}
                role="tab"
                aria-selected={!showBeginner}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  !showBeginner
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.technicalMode}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* VIDEO (optional) */}
      {guide.videoUrl && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <GuideVideo
            src={guide.videoUrl}
            title={locale === "he" ? guide.agentNameHe : guide.agentName}
            poster={guide.videoPoster || guide.heroBgImage}
          />
        </div>
      )}

      {/* PARADIGM SHIFT */}
      <section id="paradigm" className="relative py-16 sm:py-24 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-heebo text-balance">
              {guide.paradigmTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              {guide.paradigmSub}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 mb-16">
            {guide.paradigmShifts.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 p-5 hover:border-primary/20 transition-all duration-300"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground line-through decoration-red-400/50">
                        {item.before}
                      </p>
                      <p className="text-sm font-medium text-foreground mt-1">
                        {item.after}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Who is this for */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold font-heebo mb-2">
              {t.whoIsThisFor}
            </h3>
            <p className="text-muted-foreground">{t.hereHow}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {guide.whoIsThisFor.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 p-5 text-center hover:border-primary/20 hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className={`inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-white mb-3`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GUIDE SECTIONS */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold font-heebo mb-2">
            {t.practicalGuide}
          </h2>
          <p className="text-muted-foreground">{t.clickToOpen}</p>
        </div>

        <div className="space-y-4">
          {guide.sections.map((section, index) => {
            const Icon = section.icon;
            const diff = {
              ...difficultyColors[section.difficulty],
              label: t.difficulty[section.difficulty],
            };
            const isExpanded = expandedSection === section.id;

            return (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
              >
                <button
                  onClick={() =>
                    setExpandedSection(isExpanded ? null : section.id)
                  }
                  className="w-full text-right"
                  aria-expanded={isExpanded}
                  aria-controls={`panel-${section.id}`}
                >
                  <div
                    className={`group bg-card rounded-2xl border border-border p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md ${
                      isExpanded
                        ? "ring-2 ring-primary/30 shadow-lg border-primary/20"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`size-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center shrink-0 shadow-sm`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="text-lg font-bold text-foreground font-heebo">
                            {section.title}
                          </h3>
                          <span
                            className={`text-[10px] font-medium border rounded-full px-2 py-0.5 ${diff.bg} ${diff.color}`}
                          >
                            {diff.label}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {section.subtitle}
                        </p>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-muted-foreground shrink-0"
                        aria-hidden="true"
                      >
                        <ChevronDown className="h-5 w-5" />
                      </motion.div>
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      id={`panel-${section.id}`}
                      role="region"
                      aria-labelledby={section.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-muted/30 rounded-b-2xl border border-t-0 border-border p-5 sm:p-6 -mt-2">
                        {showBeginner && section.beginner && (
                          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 mb-5">
                            <p className="text-sm font-medium text-emerald-400 mb-1 flex items-center gap-1.5">
                              <Lightbulb className="h-4 w-4" /> {t.inSimpleTerms}
                            </p>
                            <p className="text-sm text-foreground/80 leading-relaxed text-pretty">
                              {renderWithLinks(section.beginner)}
                            </p>
                          </div>
                        )}

                        <p className="text-muted-foreground mb-4 text-sm text-pretty">
                          {renderWithLinks(section.description)}
                        </p>

                        <ul className="space-y-3">
                          {section.content.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-foreground/90"
                            >
                              <span
                                className="text-primary mt-1 shrink-0"
                                aria-hidden="true"
                              >
                                &#x2022;
                              </span>
                              <span className="text-sm leading-relaxed text-pretty">
                                {item.includes("→") ? (
                                  <>
                                    <span className="bg-card/80 rounded-lg px-2 py-0.5 font-mono text-xs border border-border/50 ml-1">
                                      {item.split("→")[0]!.trim()}
                                    </span>
                                    <span
                                      className="text-muted-foreground mx-1"
                                      aria-hidden="true"
                                    >
                                      →
                                    </span>
                                    {renderWithLinks(
                                      item.split("→").slice(1).join("→").trim()
                                    )}
                                  </>
                                ) : (
                                  renderWithLinks(item)
                                )}
                              </span>
                            </li>
                          ))}
                        </ul>

                        {section.codeExample && (
                          <div className="mt-6">
                            <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                              {section.codeExample.label}
                            </p>
                            <div className="bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden">
                              <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-800 bg-zinc-900/60">
                                <span
                                  className="size-3 rounded-full bg-red-500/70"
                                  aria-hidden="true"
                                />
                                <span
                                  className="size-3 rounded-full bg-yellow-500/70"
                                  aria-hidden="true"
                                />
                                <span
                                  className="size-3 rounded-full bg-green-500/70"
                                  aria-hidden="true"
                                />
                              </div>
                              <pre
                                className="p-4 text-xs text-zinc-300 overflow-x-auto leading-relaxed font-mono"
                                dir="ltr"
                              >
                                {section.codeExample.code}
                              </pre>
                            </div>
                          </div>
                        )}

                        {section.tips && (
                          <div className="mt-6 bg-primary/5 rounded-xl p-4 border border-primary/20">
                            <p className="text-sm font-medium text-primary mb-2 flex items-center gap-1.5">
                              <Lightbulb className="h-4 w-4" /> {t.tipsFromExperience}
                            </p>
                            {section.tips.map((tip, i) => (
                              <p
                                key={i}
                                className="text-sm text-foreground/80 mt-1 text-pretty"
                              >
                                {renderWithLinks(tip)}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* RESOURCES */}
      <section className="bg-card/50 border-t border-border py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-10 font-heebo">
            {t.resources}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {guide.resources.map((resource, index) => {
              const Icon = resource.icon;
              const isExternal = resource.href.startsWith("http");
              return (
                <motion.a
                  key={resource.title}
                  href={resource.href}
                  {...(isExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="group bg-card rounded-xl border border-border p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:shadow-primary/10 hover:border-primary/30"
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors font-heebo">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 text-pretty">
                    {resource.description}
                  </p>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 text-center overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-4 font-heebo text-balance">
            {guide.ctaTitle}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            {guide.ctaSub}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={guide.primaryCta.href}
              target={
                guide.primaryCta.href.startsWith("http") ? "_blank" : undefined
              }
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground font-medium px-8 py-3.5 hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
            >
              <PrimaryIcon className="h-5 w-5" />
              {guide.primaryCta.label}
            </Link>
            {guide.secondaryCta && SecondaryIcon && (
              <Link
                href={guide.secondaryCta.href}
                target={
                  guide.secondaryCta.href.startsWith("http")
                    ? "_blank"
                    : undefined
                }
                className="inline-flex items-center justify-center gap-2 rounded-full bg-muted text-foreground font-medium px-8 py-3.5 hover:bg-muted/80 transition-colors"
              >
                <SecondaryIcon className="h-5 w-5" />
                {guide.secondaryCta.label}
              </Link>
            )}
          </div>

          <div className="mt-10 flex items-center justify-center gap-3">
            <span className="text-sm text-muted-foreground">{t.liked}</span>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 bg-card/60 border border-border/50 rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
              aria-label={t.copyLink}
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? t.copied : t.copyLink}
            </button>
          </div>
        </div>
      </section>

      {/* GUIDE PREV/NEXT NAVIGATION */}
      <section className="border-t border-border py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-4">
            {prevGuide ? (
              <Link
                href={guideHref(prevGuide.slug)}
                className="group bg-card border border-border rounded-2xl p-5 hover:border-primary/30 hover:-translate-y-0.5 transition-all flex items-center gap-4"
              >
                <PrevArrowIcon className="h-6 w-6 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground mb-1">
                    {t.previousGuide}
                  </div>
                  <div className="font-semibold font-heebo group-hover:text-primary transition-colors text-balance">
                    {locale === "he" ? prevGuide.agentNameHe : prevGuide.agentName}
                  </div>
                </div>
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
            {nextGuide ? (
              <Link
                href={guideHref(nextGuide.slug)}
                className={`group bg-card border border-border rounded-2xl p-5 hover:border-primary/30 hover:-translate-y-0.5 transition-all flex items-center gap-4 ${isRtl ? "sm:flex-row-reverse sm:text-start text-end" : ""}`}
              >
                <NextArrowIcon className="h-6 w-6 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground mb-1">
                    {t.nextGuideLabel}
                  </div>
                  <div className="font-semibold font-heebo group-hover:text-primary transition-colors text-balance">
                    {locale === "he" ? nextGuide.agentNameHe : nextGuide.agentName}
                  </div>
                </div>
              </Link>
            ) : (
              <Link
                href={t.guideIndex}
                className={`group bg-card border border-border rounded-2xl p-5 hover:border-primary/30 hover:-translate-y-0.5 transition-all flex items-center gap-4 ${isRtl ? "sm:flex-row-reverse sm:text-start text-end" : ""}`}
              >
                <LayoutGrid className="h-6 w-6 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground mb-1">
                    {t.allGuides}
                  </div>
                  <div className="font-semibold font-heebo group-hover:text-primary transition-colors">
                    {t.backToIndex}
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* AUTHOR */}
      <section className="border-t border-border bg-card/30 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-card rounded-2xl border border-border p-8"
          >
            <Image
              src="https://avatars.githubusercontent.com/u/108827199?v=4"
              alt={t.aboutAuthor}
              width={64}
              height={64}
              className="rounded-2xl shadow-lg shadow-primary/20 shrink-0"
            />
            <div className={`flex-1 text-center ${isRtl ? "sm:text-right" : "sm:text-left"}`}>
              <h3 className="text-lg font-bold text-foreground font-heebo mb-1">
                {locale === "he" ? (
                  <>אלעד יעקובוביץ&apos;</>
                ) : (
                  <>{t.aboutAuthor}</>
                )}
              </h3>
              <p className="text-sm text-primary font-medium mb-3">
                {t.authorRole}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 text-pretty">
                {guide.authorBio}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  {t.contact}{" "}
                  <span aria-hidden="true">{isRtl ? "←" : "→"}</span>
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.consultingServices}
                </Link>
                <Link
                  href={t.guideIndex}
                  className="inline-flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.moreGuides}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
