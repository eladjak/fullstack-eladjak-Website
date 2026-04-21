import {
  Radio,
  Filter,
  Brain,
  CheckCircle2,
  Github,
  ExternalLink,
  BookOpen,
  Code2,
  Rocket,
  Lightbulb,
  Zap,
  Users,
  Mail,
  Rss,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const adopterGuide: AgentGuideData = {
  slug: "adopter",
  agentName: "Adopter",
  agentNameHe: "סינון אוטונומי של חדשות וכלים",
  logoImage: "/images/guide-logos/adopter-logo.png",
  tagline: "במקום לקרוא 500 פוסטים ביום — סוכן שמסנן",
  heroDescription: "Adopter הוא Python service + cron שמאזין לערוצי Telegram דרך Telethon, שולח כל פוסט ל-Gemini Flash עם schema סיווג (novelty × signal × actionability × risk) ושומר רק את ה-top-K ב-[Qdrant](/guide/qdrant) collection `network_memory`. circuit breaker של 5 אימוצים ליום. אצלי מסנן 500 פוסטים/יום ל-3-5 ממצאים — אצלך אפשר להפנות אותו ל-RSS feeds, Discord channels, פורומי Reddit/טוויטר, mailing lists, או כל content firehose שצריך פילטר חכם.",
  badgeText: "2026 · Autonomous Content Adoption · מדריך מעשי",
  canonical: "https://fullstack-eladjak.co.il/guide/adopter",
  heroBgImage: "/images/guides/guide-adopter-hero.jpg",
  stats: [
    { label: "ערוצים מנוטרים", value: "20+" },
    { label: "פוסטים ליום", value: "500+" },
    { label: "מאומצים ליום", value: "3-5" },
    { label: "circuit breaker", value: "5/day" },
  ],
  paradigmTitle: "סינון אוטונומי במקום FOMO",
  paradigmSub:
    "יש יותר מדי תוכן. Adopter קורא בשבילך, מסנן, ומביא רק את מה שחשוב.",
  paradigmShifts: [
    {
      before: "300 ערוצי Telegram פתוחים, notifications מאסו",
      after: "Adopter קורא, אתה מקבל 3 פוסטים ביום + הסבר למה",
      icon: Filter,
    },
    {
      before: "שוכחים על כלי מעולה ששמעתם עליו לפני חודש",
      after: "Qdrant זוכר את הכל — חיפוש סמנטי מחזיר את הכלי",
      icon: Brain,
    },
    {
      before: "דחיקה כזאת שמעייפת ומכבה",
      after: "סינון אוטונומי — רק pretend-to-matter נעלם",
      icon: Zap,
    },
    {
      before: "לא יודעים מה עשיתי עם תוכן מוצע",
      after: "Audit trail: 'אמץ X כי Y, לא אמץ Z כי W'",
      icon: CheckCircle2,
    },
  ],
  whoIsThisFor: [
    {
      title: "יוצרי תוכן",
      description:
        "הוא סורק עשרות ערוצים שתכננתם להיעזר בהם, מחזיר את ה-20% החזקים.",
      icon: Rss,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "מנהלי מוצר",
      description:
        "מגמות, שחקנים חדשים, פיצ'רים — Adopter מזהה ומסכם.",
      icon: Sparkles,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "ChiefTech / R&D",
      description:
        "כלים חדשים, frameworks, מודלים — Adopter מסווג + מציע integration.",
      icon: Code2,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "עמוס מדי כדי לקרוא",
      description:
        "אם יש לכם 30 ערוצים על 'תעשיית ה-AI' — Adopter חוסך לכם 5 שעות ביום.",
      icon: Rocket,
      color: "from-pink-500 to-rose-500",
    },
  ],
  toc: [
    { id: "what-is", label: "מה זה" },
    { id: "flow", label: "הזרם" },
    { id: "classifier", label: "סיווג" },
    { id: "circuit", label: "Circuit Breaker" },
    { id: "dedup", label: "Dedup" },
    { id: "advanced", label: "מתקדם" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Radio,
      title: "מה זה Adopter?",
      subtitle: "Python service + cron + Gemini Flash + Qdrant",
      description:
        "Adopter הוא שילוב של Telegram reader, LLM classifier, ו-Qdrant memory. הוא מאומן לסנן 'מעניין מול רעש' לפי preferences שהוא לומד מתגובות.",
      color: "from-orange-600 to-amber-500",
      difficulty: "beginner",
      beginner:
        "תחשבו על כתבנית חדשות אישית, רק שהיא לא רק כותבת — היא גם מחליטה מה לכתוב. אתם נותנים לה ערוצים, היא מחליטה מה שווה להעביר אליכם.",
      content: [
        "Input: ~20 ערוצי Telegram ציבוריים — AI, DevTools, News, Research",
        "Process: pull כל שעה → classify with Gemini Flash → decide adopt/skip",
        "Output: entries ב-network_memory עם category=adopted-content",
        "Rate limit: max 5 adoptions/day (circuit breaker) — לא מציף אתכם",
        "Audit: כל החלטה נרשמת — גם sc skip + reason",
        "DRY_RUN mode — לבדוק איזה החלטות יקבל לפני שחופר",
      ],
    },
    {
      id: "flow",
      icon: Rss,
      title: "הזרם המלא",
      subtitle: "מ-Telegram ל-network_memory ב-6 שלבים",
      description:
        "נסו לחשוב על זה כ-pipeline לינארי. כל שלב פשוט.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "intermediate",
      content: [
        "cron שעתי — מפעיל tg-public-ingest.py",
        "Telegram MTProto client → שליפה של 50 הודעות אחרונות מכל ערוץ",
        "Filter מהיר: ללא media-only, ללא קיצורי URL בלבד",
        "Qdrant dedup: embedding → search — אם דמיון >0.9 ל-entry קיים, SKIP",
        "Classifier: Gemini Flash מקטלג ל-{valuable, maybe, noise} + confidence",
        "Adopter decides: אם valuable + confidence>0.8 → adopt; else skip",
        "POST ל-delegator /network/memory עם payload מלא + source link",
      ],
      codeExample: {
        label: "Classifier prompt מקוצר",
        code: 'Classify this post:\n\n"{post_text}"\n\nCategories:\n- valuable (specific tool/paper/product/insight)\n- maybe (interesting but generic)\n- noise (spam/promo/unrelated)\n\nReturn JSON: {category, confidence 0-1, reason}',
      },
    },
    {
      id: "classifier",
      icon: Brain,
      title: "Classifier — איך מחליטים מה 'מעניין'",
      subtitle: "Prompt engineering + feedback loop",
      description:
        "ה-prompt של ה-classifier הוא הלב. משתפר עם הזמן על סמך הפידבק שלכם.",
      color: "from-violet-600 to-purple-500",
      difficulty: "advanced",
      content: [
        "Base prompt עם דוגמאות שלכם — 5-10 פוסטים שסימנתם 'כן' ו-5 שסימנתם 'לא'",
        "Output structured: JSON עם category, confidence, reason, tags",
        "Context window: רק הפוסט + title ערוץ + timestamp — אין הקשר היסטורי (מכוון)",
        "Temperature: 0.1 — רוצים החלטות עקביות, לא יצירתיות",
        "Feedback loop: אם אתם מסמנים adoption 'טעות' — הפוסט נכנס ל-examples בתור NEGATIVE",
        "Auto-tune: אחרי 50 feedback points, re-bootstrap prompt עם top 10 positive + negative",
      ],
      tips: [
        "אל תסתמכו רק על LLM. בלי דוגמאות ספציפיות שלכם, ה-classifier מכליל ומפסיד דיוק",
      ],
    },
    {
      id: "circuit",
      icon: ShieldAlert,
      title: "Circuit Breaker — הגבלת מה שמאומץ",
      subtitle: "5 אימוצים ליום, לא יותר",
      description:
        "בלי circuit breaker, יום אחד Adopter יאמץ 50 דברים והצפה.",
      color: "from-red-600 to-rose-500",
      difficulty: "intermediate",
      beginner:
        "זה מנגנון שאומר 'נו בסדר, מספיק לשבוע הזה'. גם אם יש 10 פוסטים מעולים היום — Adopter מאמץ רק 5, והשאר יחכו למחר.",
      content: [
        "MAX_ADOPTIONS_PER_DAY = 5 (קבוע ב-config)",
        "counter משתנה daily — reset ב-00:00 UTC",
        "אחרי שהגיע ל-5, Adopter ממשיך לסווג אבל רק skip — audit log מלא",
        "אם ראה משהו CRITICAL (confidence > 0.95, rare tags) — אפשר override, שולח alert",
        "Config override לימים מסוימים: 'יום בינה מלאכותית' → יכול להיות 20",
      ],
      tips: [
        'התחילו עם 3 adoptions/day. תעלו לאט אחרי שאתם בטוחים שה-signal-to-noise טוב',
      ],
    },
    {
      id: "dedup",
      icon: Filter,
      title: "Dedup — לא לאמץ פעמיים",
      subtitle: "Qdrant semantic search לפני כל אימוץ",
      description:
        "שני ערוצים שתולים את אותו מאמר? Adopter מזהה ומאמץ פעם אחת בלבד.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "intermediate",
      content: [
        "לפני אימוץ, יצירת embedding של הפוסט (Gemini embedding)",
        "search ב-Qdrant collection `telegram_news` עם threshold 0.9",
        "אם יש hit עם score ≥ 0.9 → skip (זה duplicate)",
        "מה שנכנס ל-dedup גם נשמר — כדי שכל הפוסטים יהיו לחיפוש",
        "Hash based dedup אחרי (URL exact match) — חיזוק שני",
        "מגיב אחרת ל-near-duplicates (0.8-0.9) — adopt עם reference ל-original",
      ],
      tips: [
        "Dedup זה מה שמאפשר לAdopter לעבוד על 20 ערוצים בלי spam — ברוב המקרים 2-3 ערוצים מצטטים את אותם מקורות",
      ],
    },
    {
      id: "advanced",
      icon: Lightbulb,
      title: "טיפים מתקדמים",
      subtitle: "אינטגרציה עם Adopter",
      description:
        "הדברים שעשיתי כדי שהוא יעבוד לטווח ארוך.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      content: [
        "Telegram MTProto (לא Bot API) — יותר פריצה, דורש phone+code חד-פעמי",
        "Session persistence — לא להתחבר מחדש בכל run; שומרים session string",
        "Rate limiting מצד Telegram — לא לבקש יותר מדי מהר; 30 req/min בטוח",
        "Gemini cost: classification של 500 פוסטים/יום = ~$0 (Flash free tier)",
        "Dashboard: /network/memory/html?agent=adopter&category=adopted-content",
        "Downstream: CrewAI crews יכולים לשלוף adopted-content ולהפיק תוכן משני",
      ],
      tips: [
        "הגישה שלי: התחלתי עם 3 ערוצים, הוספתי לאט. אחרי כל הוספה, בדקתי יום-יומיים שה-signal טוב",
      ],
    },
  ],
  resources: [
    {
      title: "Telethon (MTProto)",
      description: "ה-Python client לטלגרם שממנו עובדים",
      href: "https://docs.telethon.dev",
      icon: ExternalLink,
    },
    {
      title: "Gemini API",
      description: "ה-classifier של Adopter — Flash tier חינמי",
      href: "https://ai.google.dev",
      icon: ExternalLink,
    },
    {
      title: "המדריך ל-Qdrant",
      description: "ה-dedup semantic של Adopter",
      href: "/guide/qdrant",
      icon: BookOpen,
    },
    {
      title: "המדריך ל-Delegator",
      description: "איך Adopter כותב ל-network_memory",
      href: "/guide/delegator",
      icon: BookOpen,
    },
    {
      title: "GitHub",
      description: "קוד של autonomous-adopter",
      href: "https://github.com/eladjak",
      icon: Github,
    },
    {
      title: "שיחת ייעוץ",
      description: "רוצים sourcing אוטומטי לצרכים שלכם?",
      href: "/contact",
      icon: Mail,
    },
  ],
  ctaTitle: "תפסיקו להיחנק בתוכן",
  ctaSub:
    "Adopter סורק במקומכם, מסנן, ומביא את מה שחשוב — ב-5 דקות התקנה.",
  primaryCta: {
    label: "GitHub",
    href: "https://github.com/eladjak",
    icon: Github,
  },
  secondaryCta: {
    label: "שיחת ייעוץ",
    href: "/contact",
    icon: Users,
  },
  authorBio:
    "Adopter רץ אצלי 3 חודשים — 20 ערוצי Telegram, ~500 פוסטים ליום נסרקים, 3-5 אמוצים ביום בממוצע. הוא שמע על מעל 30 כלים חדשים שלא הייתי שומע עליהם לבד. המדריך מבוסס על tuning אמיתי של ה-classifier.",
};
