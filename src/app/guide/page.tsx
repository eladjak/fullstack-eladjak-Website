import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { allGuides } from "@/data/agent-guides";

export const metadata: Metadata = {
  title: "מדריכי סוכני AI | אלעד יעקובוביץ'",
  description:
    "10 מדריכים מעשיים בעברית לסוכני AI — Claude Code, Kami, Kaylee, CrewAI, Box, Hermes, Qdrant, Delegator, Adopter, Dashboard. התקנה, שימוש, וטיפים מניסיון אמיתי.",
  alternates: {
    canonical: "https://fullstack-eladjak.co.il/guide",
  },
  keywords: [
    "מדריכי AI",
    "סוכני AI בעברית",
    "Claude Code עברית",
    "מדריך WhatsApp AI",
    "Kami",
    "Kaylee",
    "CrewAI",
    "agent network",
  ],
};

export default function GuideIndex() {
  return (
    <main className="min-h-dvh bg-background" dir="rtl">
      <section className="relative py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">
              2026 · 10 מדריכים · סוכנים אוטונומיים
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 font-heebo text-balance">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              מדריכי רשת הסוכנים
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
            10 מדריכים בעברית לסוכני AI שאני מפעיל יומיום. לא תיאוריה — שימוש אמיתי,
            טיפים מתוך ניסיון, ודוגמאות קוד שעובדות.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {allGuides.map((guide, i) => {
            const href =
              guide.slug === "claude-code"
                ? "/claude-code"
                : `/guide/${guide.slug}`;
            const firstSection = guide.sections[0];
            const Icon = firstSection?.icon;
            const gradient = firstSection?.color || "from-primary to-accent";
            return (
              <Link
                key={guide.slug}
                href={href}
                className="group bg-card rounded-2xl border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  {Icon && (
                    <div
                      className={`size-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 shadow-sm`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors font-heebo">
                      {guide.agentNameHe}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {guide.badgeText.split("·")[1]?.trim() || guide.agentName}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-foreground/80 mb-4 font-medium leading-relaxed text-pretty">
                  {guide.tagline}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 text-pretty">
                  {guide.heroDescription}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <span>לקריאת המדריך</span>
                  <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                </div>
                <div className="mt-4 pt-4 border-t border-border/50 flex flex-wrap gap-2">
                  {guide.stats.slice(0, 2).map((stat) => (
                    <span
                      key={stat.label}
                      className="text-[10px] bg-muted rounded-full px-2 py-1 text-muted-foreground"
                    >
                      {stat.value} · {stat.label}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
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
