'use client';

import { motion } from 'framer-motion';
import {
  Search,
  FileText,
  Code,
  Bug,
  Rocket,
  Heart,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { ScrollAnimate } from '@/components/ui/scroll-animate';

type Phase = {
  number: string;
  title: string;
  subtitle: string;
  paragraph: string;
  deliverables: string[];
  duration: string;
  icon: typeof Search;
  gradient: string;
};

const phases: Phase[] = [
  {
    number: '01',
    title: 'שיחת ייעוץ ראשונית',
    subtitle: 'חצי שעה. בלי עלות. בלי התחייבות.',
    paragraph:
      'נשב לחצי שעה ב-Zoom או בטלפון ונבין מה אתם רוצים לבנות, מה הכאב העסקי שמאחורי הבקשה, ומה לוחות הזמנים שלכם. אני אגיד בכנות אם הפרויקט מתאים לי או לא — לפעמים אני אפנה אתכם למישהו אחר אם זה לא בתחום שלי. אם יש התאמה, אני יוצא מהשיחה עם תמונה ראשונית של הסקופ, הסיכונים העיקריים, וטווח מחירים גס. אם אין התאמה, איבדנו 30 דקות ולא יותר.',
    deliverables: [
      'הבנת מטרות עסקיות וטכניות',
      'מיפוי משתמשים וצרכים',
      'הערכה ראשונית של סקופ ותקציב',
      'המלצה כנה — לקחת או להפנות',
    ],
    duration: 'שיחה אחת · 30 דקות',
    icon: Search,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    number: '02',
    title: 'מסמך אפיון',
    subtitle: 'PRD מפורט עם מוקאפים וארכיטקטורה — כדי שכולנו נדבר על אותו דבר.',
    paragraph:
      'כאן הופכים את הרעיון למסמך עבודה. אני בונה PRD (Product Requirements Document) שמכסה את כל הפיצ\'רים, ה-user flows, מקרי הקצה והאינטגרציות. במקביל, אני יוצר מוקאפים של המסכים הראשיים (משתמש בכלים כמו Stitch או v0) ומציע ארכיטקטורה טכנית מותאמת — איזה מסד נתונים, איזה שירותים, איך מתחבר ל-AI אם רלוונטי. בסוף השלב הזה יש לכם מסמך בן 10-30 עמודים שאפשר להראות לדירקטוריון, לצוות פיתוח, או לשותף — ויש לי מפת דרכים לבנות לפיה.',
    deliverables: [
      'PRD מפורט עם רשימת פיצ\'רים ו-user stories',
      'מוקאפים של המסכים העיקריים',
      'הצעת ארכיטקטורה טכנית (DB, API, אינטגרציות)',
      'הערכת מאמץ ולוחות זמנים מדויקים',
      'הצעת מחיר סופית',
    ],
    duration: '3-7 ימי עבודה',
    icon: FileText,
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    number: '03',
    title: 'פיתוח באיטרציות שבועיות',
    subtitle: 'sprint שבועי, דמו ביום שישי, איטרציה מהירה.',
    paragraph:
      'הלב של העבודה. אני עובד בשיטת sprints שבועיים — ביום ראשון אנחנו מחליטים מה נכנס לסבב הזה, ביום חמישי או שישי יש דמו של מה שנעשה, ואם יש משובים אני מטפל בהם בסבב הבא. אתם רואים פרוגרס אמיתי כל שבוע, לא חודש של שתיקה ואז "הפתעה". אני עובד ב-Git עם branches נפרדים לכל פיצ\'ר, commit הודעות ברורות, ו-PR-ים מתועדים — כך שיש לכם נראות מלאה גם אם לא תפגשו אותי באמצע. כל הקוד עובר type-check ו-lint לפני כל commit, ואני משתמש ב-AI tooling (Claude Code, Copilot) כמכפיל פרודוקטיביות אבל הקוד עצמו עובר ביקורת אישית.',
    deliverables: [
      'דמו שבועי של פרוגרס (Zoom או Loom)',
      'גישה מלאה ל-Git repository',
      'תיעוד שוטף ב-PROGRESS.md בפרויקט',
      'ערוץ Slack/WhatsApp לשאלות מהירות',
      'staging environment חי לבדיקות',
    ],
    duration: '2-12 שבועות (תלוי בסקופ)',
    icon: Code,
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    number: '04',
    title: 'בדיקות ושיפורים',
    subtitle: 'QA, נגישות, ביצועים — לפני שעולים לאוויר.',
    paragraph:
      'לפני שהמערכת רואה את אור היום, אנחנו עוברים סבב מסודר של בדיקות. בדיקות פונקציונליות לכל ה-user flows הקריטיים, בדיקות נגישות לפי תקן IS 5568 / WCAG 2.1 (חשוב במיוחד לפרויקטים ציבוריים וארגוניים), בדיקות ביצועים עם Lighthouse ו-Core Web Vitals, ובדיקות אבטחה בסיסיות (OWASP Top 10). אם רלוונטי, גם בדיקות עומס. כל באג שמוצא — נכנס לרשימה, נפתר, ונבדק שוב. השלב הזה הוא הקטן יותר בזמן אבל הקריטי ביותר באיכות.',
    deliverables: [
      'דוח QA עם כל ה-user flows שנבדקו',
      'דוח נגישות (axe-core / Lighthouse)',
      'מדדי ביצועים (LCP, FID, CLS, TTI)',
      'בדיקת אבטחה בסיסית',
      'רשימת שינויים מתוקנים',
    ],
    duration: 'שבוע-שבועיים',
    icon: Bug,
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    number: '05',
    title: 'עליה לאוויר וליווי',
    subtitle: 'deploy, ניטור, ו-30 ימי תמיכה כלולים.',
    paragraph:
      'יום ההשקה. אני מטפל בכל ה-deployment — בין אם זה Vercel, Railway, Hetzner VPS או הענן הפנימי שלכם. מקים ניטור (Sentry לשגיאות, Plausible/PostHog לאנליטיקה אם רלוונטי), מוודא שה-DNS, ה-SSL ושאר התשתית עובדים, ומבצע smoke test אחרון בפרודקשן. אחרי ההשקה אני מספק 30 ימי תמיכה כלולים במחיר — כל באג שעולה, כל שאלה, כל תיקון קטן — מטופל ללא חיוב נוסף. זה הזמן שבו הפרויקט עובר באמת מ"קוד" ל"מערכת חיה".',
    deliverables: [
      'deploy לפרודקשן (Vercel/Railway/VPS)',
      'הגדרת ניטור ולוגים',
      'תיעוד deployment ב-README',
      '30 ימי תמיכה כלולים אחרי השקה',
      'שיחת מסירה ו-handover לצוות שלכם',
    ],
    duration: 'יום-שלושה',
    icon: Rocket,
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    number: '06',
    title: 'תחזוקה שוטפת',
    subtitle: 'ריטיינר חודשי — אופציונלי, לא חובה.',
    paragraph:
      'אחרי 30 הימים הכלולים, אם אתם רוצים שאמשיך לתחזק את המערכת — יש לי תוכנית ריטיינר חודשית גמישה. הכוונה היא: מספר שעות מובטחות בחודש לתיקוני באגים, עדכוני אבטחה, פיצ\'רים קטנים, ומענה מהיר לתקלות. אתם יכולים גם לבחור לקחת את הקוד ולעבוד עם צוות פנימי — אני אעביר handover מסודר ואשאיר תיעוד טוב. אין נעילה. השיטה שלי היא לבנות מערכות שאפשר להפעיל גם בלעדיי.',
    deliverables: [
      'מספר שעות חודשי מובטח (8/16/40)',
      'עדיפות במענה לתקלות',
      'עדכוני אבטחה ושדרוגי תלויות',
      'שיחת סטטוס חודשית',
      'אפשרות לפיצ\'רים חדשים בקצב שלכם',
    ],
    duration: 'חודשי, ללא התחייבות ארוכה',
    icon: Heart,
    gradient: 'from-red-500 to-pink-500',
  },
];

const principles = [
  {
    title: 'שקיפות מלאה',
    description: 'גישה ל-Git, דמו שבועי, PROGRESS.md מתעדכן. אין הפתעות.',
  },
  {
    title: 'איטרציות קצרות',
    description: 'sprint שבועי. אם משהו לא עובד, משנים בסבב הבא — לא בעוד חודש.',
  },
  {
    title: 'ללא נעילה',
    description: 'הקוד שלכם, התשתית שלכם, התיעוד שלכם. אפשר תמיד להמשיך עם צוות פנימי.',
  },
  {
    title: 'AI כמכפיל, לא כמחליף',
    description: 'משתמש ב-Claude Code ו-AI tooling להאצת פיתוח, אבל הקוד עובר ביקורת אנושית.',
  },
];

export default function MethodologyPage() {
  return (
    <div className="flex min-h-dvh flex-col" dir="rtl">
      <main className="flex-1">
        {/* Hero */}
        <section className="relative w-full pt-28 pb-16 md:pb-24 overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute top-0 start-1/2 -translate-x-1/2 size-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none"
          />

          <div className="container relative px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center space-y-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm font-medium text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                שיטת עבודה
              </span>

              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-balance font-heebo">
                איך אני עובד —
                <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  מהרעיון לפרודקשן
                </span>
              </h1>

              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg leading-relaxed text-pretty">
                שש פאזות ברורות שמובילות פרויקט AI או Full-Stack מהרעיון הראשוני
                ועד מערכת שעובדת בייצור. אותה שיטה אצל ארגונים, צוותי פיתוח ויזמים
                — מותאמת לסקופ ולתקציב.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Phases */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto space-y-8 md:space-y-10">
              {phases.map((phase, index) => {
                const Icon = phase.icon;

                return (
                  <ScrollAnimate key={phase.number} delay={index * 0.05}>
                    <motion.article
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      viewport={{ once: true }}
                      className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 md:p-10 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/10"
                    >
                      <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                        {/* Icon + number column */}
                        <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-3 shrink-0">
                          <div
                            className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${phase.gradient} text-white shadow-lg shrink-0`}
                          >
                            <Icon className="h-8 w-8" />
                          </div>
                          <div className="text-4xl md:text-5xl font-bold text-muted-foreground/15 select-none tabular-nums font-heebo">
                            {phase.number}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-5 min-w-0">
                          <header className="space-y-2">
                            <h2 className="text-2xl md:text-3xl font-bold font-heebo text-balance">
                              {phase.title}
                            </h2>
                            <p className="text-base text-foreground/70 leading-relaxed">
                              {phase.subtitle}
                            </p>
                          </header>

                          <p className="text-muted-foreground leading-relaxed text-pretty">
                            {phase.paragraph}
                          </p>

                          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
                            <div>
                              <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                                מה אתם מקבלים
                              </h3>
                              <ul className="grid gap-2 sm:grid-cols-2">
                                {phase.deliverables.map((item) => (
                                  <li
                                    key={item}
                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                  >
                                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                    <span className="leading-relaxed">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-4 py-2 text-sm text-foreground/80 self-start md:self-end whitespace-nowrap">
                              <Clock className="h-4 w-4 text-primary" />
                              <span className="font-medium">{phase.duration}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  </ScrollAnimate>
                );
              })}
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="w-full py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
          <div className="container relative px-4 md:px-6">
            <ScrollAnimate>
              <div className="text-center mb-12 max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4 font-heebo">
                  ארבעה עקרונות שמלווים את כל פאזה
                </h2>
                <p className="text-muted-foreground md:text-lg text-pretty">
                  למה אני עובד ככה — וכמה זה חוסך לכם בהמשך
                </p>
              </div>
            </ScrollAnimate>

            <div className="grid gap-5 md:grid-cols-2 max-w-4xl mx-auto">
              {principles.map((p, idx) => (
                <ScrollAnimate key={p.title} delay={idx * 0.05}>
                  <div className="rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm p-6 hover:border-primary/30 transition-colors duration-300">
                    <h3 className="text-lg font-semibold mb-2 font-heebo">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
                      {p.description}
                    </p>
                  </div>
                </ScrollAnimate>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-16 md:py-24 relative overflow-hidden">
          <div className="absolute top-1/2 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-2xl pointer-events-none" />

          <div className="container relative px-4 md:px-6">
            <ScrollAnimate>
              <div className="max-w-2xl mx-auto text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-heebo text-balance">
                  מתחילים לדבר על פרויקט?
                </h2>
                <p className="text-muted-foreground md:text-lg text-pretty">
                  שיחת ייעוץ ראשונית של חצי שעה, ללא עלות וללא התחייבות. נבין יחד אם
                  יש התאמה — ואם יש, איך מתחילים.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-cta px-8 py-4 text-base font-medium text-cta-foreground shadow-lg shadow-cta/25 hover:bg-cta/90 hover:shadow-xl hover:shadow-cta/30 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    תיאום שיחת ייעוץ
                    <ArrowLeft className="h-5 w-5" />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-8 py-4 text-base font-medium text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    לרשימת השירותים
                  </Link>
                </div>
              </div>
            </ScrollAnimate>
          </div>
        </section>
      </main>
    </div>
  );
}
