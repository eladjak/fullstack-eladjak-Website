'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Globe, Layers, MessageCircle, Presentation, RefreshCw, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLocale } from '@/components/providers/locale-provider';

// "Build me a quote", interactive project estimator.
// Interaction > information (web-paradigm-shift): instead of reading a price
// list, the visitor assembles their project and gets a truthful estimate range.
// All ranges come from the SAME published ranges as the FAQ/services content, // no invented pricing. The final CTA opens WhatsApp with a prefilled summary.

type TierId = 'basic' | 'standard' | 'custom';

interface ProjectType {
  id: string;
  icon: LucideIcon;
  label: { he: string; en: string };
  desc: { he: string; en: string };
  // Truthful ranges per tier, anchored to the published FAQ/services ranges.
  ranges: Record<TierId, { he: string; en: string }>;
  includes: { he: string[]; en: string[] };
}

const PROJECT_TYPES: ProjectType[] = [
  {
    id: 'bot',
    icon: Bot,
    label: { he: 'בוט וואטסאפ / צ\'אטבוט', en: 'WhatsApp Bot / Chatbot' },
    desc: {
      he: 'מענה אוטומטי חכם 24/7, מעוגן בידע העסק',
      en: 'Smart 24/7 auto-reply, grounded in your business knowledge',
    },
    ranges: {
      basic: { he: '₪3,500–6,000', en: '₪3,500–6,000' },
      standard: { he: '₪6,000–12,000', en: '₪6,000–12,000' },
      custom: { he: '₪12,000 ומעלה', en: '₪12,000+' },
    },
    includes: {
      he: ['בוט מעוגן-ידע (כמו זה שבאתר)', 'חיבור לוואטסאפ / לאתר', 'לוח בקרה ולוגים'],
      en: ['Knowledge-grounded bot (like the one on this site)', 'WhatsApp / website integration', 'Dashboard & logs'],
    },
  },
  {
    id: 'site',
    icon: Globe,
    label: { he: 'אתר / דף נחיתה', en: 'Website / Landing Page' },
    desc: {
      he: 'מהיר, נגיש, עברית-RTL מושלמת, SEO מלא',
      en: 'Fast, accessible, flawless Hebrew RTL, full SEO',
    },
    ranges: {
      basic: { he: '₪3,000–6,000', en: '₪3,000–6,000' },
      standard: { he: '₪6,000–12,000', en: '₪6,000–12,000' },
      custom: { he: '₪12,000 ומעלה', en: '₪12,000+' },
    },
    includes: {
      he: ['עיצוב מותאם ומובייל-ראשון', 'SEO/GEO מלא (ציון 95+)', 'טפסים וחיבורי אנליטיקה'],
      en: ['Custom mobile-first design', 'Full SEO/GEO (95+ score)', 'Forms & analytics wiring'],
    },
  },
  {
    id: 'app',
    icon: Layers,
    label: { he: 'אפליקציית Full-Stack', en: 'Full-Stack Application' },
    desc: {
      he: 'Next.js + Node.js + PostgreSQL, מקצה לקצה',
      en: 'Next.js + Node.js + PostgreSQL, end to end',
    },
    ranges: {
      basic: { he: '₪8,000–12,000', en: '₪8,000–12,000' },
      standard: { he: '₪12,000–25,000', en: '₪12,000–25,000' },
      custom: { he: '₪25,000 ומעלה', en: '₪25,000+' },
    },
    includes: {
      he: ['Backend + מסד נתונים', 'הרשאות משתמשים ואבטחה', 'פריסה לפרודקשן וליווי'],
      en: ['Backend + database', 'Auth, roles & security', 'Production deploy & handover'],
    },
  },
  {
    id: 'ai',
    icon: Sparkles,
    label: { he: 'אוטומציה / אינטגרציית AI', en: 'AI Automation / Integration' },
    desc: {
      he: 'סוכני AI, חיבורי OpenAI/Claude, תהליכים אוטומטיים',
      en: 'AI agents, OpenAI/Claude integrations, automated workflows',
    },
    ranges: {
      basic: { he: '₪5,000–9,000', en: '₪5,000–9,000' },
      standard: { he: '₪9,000–20,000', en: '₪9,000–20,000' },
      custom: { he: '₪20,000 ומעלה', en: '₪20,000+' },
    },
    includes: {
      he: ['אפיון תהליך והחזר השקעה', 'סוכן/אוטומציה מחוברים למערכות שלכם', 'מדידה, לוגים וגדרות בטיחות'],
      en: ['Process & ROI mapping', 'Agent/automation wired to your systems', 'Metrics, logs & guardrails'],
    },
  },
  {
    id: 'workshop',
    icon: Presentation,
    label: { he: 'סדנת AI לצוות', en: 'Team AI Workshop' },
    desc: {
      he: 'Claude Code, רשתות סוכנים ועבודה מוגברת-AI, הלכה למעשה',
      en: 'Claude Code, agent networks & AI-augmented work, hands-on',
    },
    ranges: {
      basic: { he: '₪2,000–4,000', en: '₪2,000–4,000' },
      standard: { he: '₪4,000–8,000', en: '₪4,000–8,000' },
      custom: { he: 'לפי היקף', en: 'By scope' },
    },
    includes: {
      he: ['תוכן מותאם לצוות ולכלים שלכם', 'תרגול מעשי על פרויקט אמיתי', 'חומרים והקלטה לשימוש פנימי'],
      en: ['Content tailored to your team & tools', 'Hands-on practice on a real project', 'Materials & recording for internal use'],
    },
  },
];

const TIERS: { id: TierId; label: { he: string; en: string }; desc: { he: string; en: string } }[] = [
  {
    id: 'basic',
    label: { he: 'בסיסי', en: 'Basic' },
    desc: { he: 'גרסה ראשונה ממוקדת, מהר לאוויר', en: 'Focused first version, live fast' },
  },
  {
    id: 'standard',
    label: { he: 'מורחב', en: 'Standard' },
    desc: { he: 'יכולות מלאות, אינטגרציות ומסכי ניהול', en: 'Full features, integrations & admin' },
  },
  {
    id: 'custom',
    label: { he: 'מותאם', en: 'Custom' },
    desc: { he: 'מערכת רב-שלבית או דרישות מיוחדות', en: 'Multi-phase system or special requirements' },
  },
];

const T = {
  title: { he: 'בנו לי הצעה', en: 'Build Me a Quote' },
  subtitle: {
    he: 'שלוש בחירות, ותקבלו אומדן כן, בלי טופס ובלי המתנה',
    en: 'Three clicks, get an honest estimate, no form, no waiting',
  },
  step1: { he: '1. מה בונים?', en: '1. What are we building?' },
  step2: { he: '2. באיזה היקף?', en: '2. At what scope?' },
  resultTitle: { he: 'אומדן ראשוני', en: 'Initial estimate' },
  includesLabel: { he: 'מה כלול:', en: 'What\'s included:' },
  disclaimer: {
    he: 'זה אומדן כן על בסיס טווחי המחיר המפורסמים שלי, הצעה מדויקת נסגרת אחרי שיחה קצרה על הצרכים שלכם.',
    en: 'An honest estimate based on my published ranges, an exact quote follows a short call about your needs.',
  },
  ctaWhatsApp: { he: 'שלחו לי את זה בוואטסאפ', en: 'Send me this on WhatsApp' },
  ctaContact: { he: 'או דרך טופס יצירת הקשר', en: 'or via the contact form' },
  restart: { he: 'התחילו מחדש', en: 'Start over' },
  waPrefix: {
    he: 'היי אלעד, בניתי הצעה באתר: ',
    en: 'Hi Elad, I built a quote on your site: ',
  },
  waScope: { he: 'בהיקף', en: 'scope' },
  waRange: { he: 'טווח משוער', en: 'estimated range' },
};

export function QuoteBuilder() {
  const { locale } = useLocale();
  const lang: 'he' | 'en' = locale === 'en' ? 'en' : 'he';
  const [typeId, setTypeId] = useState<string | null>(null);
  const [tier, setTier] = useState<TierId | null>(null);

  const selectedType = PROJECT_TYPES.find((p) => p.id === typeId) ?? null;
  const selectedTier = TIERS.find((t) => t.id === tier) ?? null;

  const waHref =
    selectedType && selectedTier
      ? `https://wa.me/972525427474?text=${encodeURIComponent(
          `${T.waPrefix[lang]}${selectedType.label[lang]} (${T.waScope[lang]}: ${selectedTier.label[lang]}, ${T.waRange[lang]}: ${selectedType.ranges[selectedTier.id][lang]})`,
        )}`
      : '#';

  return (
    <section className="w-full py-16 md:py-24" aria-labelledby="quote-builder-heading">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h2
            id="quote-builder-heading"
            className="text-3xl font-bold tracking-tighter sm:text-4xl mb-3"
          >
            {T.title[lang]}
          </h2>
          <p className="text-muted-foreground md:text-lg">{T.subtitle[lang]}</p>
        </div>

        <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/20 p-6 md:p-8">
          {/* Step 1, project type */}
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">{T.step1[lang]}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8" role="group" aria-label={T.step1[lang]}>
            {PROJECT_TYPES.map((p) => {
              const Icon = p.icon;
              const active = typeId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setTypeId(p.id)}
                  aria-pressed={active}
                  className={[
                    'rounded-xl border p-4 text-start transition-colors duration-150',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    active
                      ? 'border-primary/70 bg-primary/15 shadow-md shadow-primary/10'
                      : 'border-white/10 bg-white/5 hover:border-primary/40 hover:bg-primary/5',
                  ].join(' ')}
                >
                  <Icon className={`h-5 w-5 mb-2 ${active ? 'text-primary' : 'text-muted-foreground'}`} aria-hidden="true" />
                  <div className="text-sm font-semibold">{p.label[lang]}</div>
                  <div className="mt-1 text-xs text-muted-foreground leading-relaxed">{p.desc[lang]}</div>
                </button>
              );
            })}
          </div>

          {/* Step 2, scope tier */}
          <AnimatePresence>
            {selectedType && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">{T.step2[lang]}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8" role="group" aria-label={T.step2[lang]}>
                  {TIERS.map((t) => {
                    const active = tier === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTier(t.id)}
                        aria-pressed={active}
                        className={[
                          'rounded-xl border p-4 text-start transition-colors duration-150',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                          active
                            ? 'border-primary/70 bg-primary/15 shadow-md shadow-primary/10'
                            : 'border-white/10 bg-white/5 hover:border-primary/40 hover:bg-primary/5',
                        ].join(' ')}
                      >
                        <div className="text-sm font-semibold">{t.label[lang]}</div>
                        <div className="mt-1 text-xs text-muted-foreground leading-relaxed">{t.desc[lang]}</div>
                        <div className="mt-2 text-sm font-bold text-primary tabular-nums">
                          {selectedType.ranges[t.id][lang]}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result */}
          <AnimatePresence>
            {selectedType && selectedTier && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="rounded-xl border border-primary/30 bg-primary/10 p-5 md:p-6"
                aria-live="polite"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                  <span className="text-sm font-semibold text-muted-foreground">{T.resultTitle[lang]}</span>
                  <span className="text-2xl font-bold text-primary tabular-nums">
                    {selectedType.ranges[selectedTier.id][lang]}
                  </span>
                </div>
                <div className="text-sm font-semibold mb-1">{T.includesLabel[lang]}</div>
                <ul className="mb-4 space-y-1">
                  {selectedType.includes[lang].map((item) => (
                    <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-0.5" aria-hidden="true">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mb-4">{T.disclaimer[lang]}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-500/20 transition-transform duration-150 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    {T.ctaWhatsApp[lang]}
                  </a>
                  <a
                    href="/contact/"
                    className="text-sm text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded"
                  >
                    {T.ctaContact[lang]}
                  </a>
                  <button
                    onClick={() => {
                      setTypeId(null);
                      setTier(null);
                    }}
                    className="ms-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded"
                  >
                    <RefreshCw className="h-3 w-3" aria-hidden="true" />
                    {T.restart[lang]}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
