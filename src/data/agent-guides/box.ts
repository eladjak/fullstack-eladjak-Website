import {

  Dumbbell,

  Apple,

  Target,

  TrendingDown,

  Calendar,

  Heart,

  Github,

  ExternalLink,

  BookOpen,

  Users,

  Code2,

  Rocket,

  Lightbulb,

  Zap,

  MessageCircle,

  Mail,

  Clock,

} from "lucide-react";

import type { AgentGuideData } from "@/components/agent-guide/types";



export const boxGuide: AgentGuideData = {

  slug: "box",

  agentName: "Box",

  agentNameHe: "מאמן בריאות בוואטסאפ",

  logoImage: "/images/guide-logos/box-logo.png",

  tagline: "אפליקציית בריאות שבאמת משתמשים בה — בוואטסאפ",

  heroDescription: "סוכן coaching אישי מבוסס [Claude Code](/claude-code) + [CrewAI](/guide/crewai), עם זיכרון ארוך-טווח ב-[Qdrant](/guide/qdrant), OCR תמונות דרך Google Cloud Vision API, ולוח ICS שנוצר אוטומטית. ממשק: WhatsApp דרך [Delegator](/guide/delegator). ה-state מאוחסן כ-JSON + SQLite מוצפן. אצלי הוא מלווה תוכנית אישית של ירידה במשקל + בניית כוח, אבל זה pattern של coach-agent, לא תוכנית דיאטה: אצלך אפשר להתאים אותו לשינה, ריצה, גמילה, לימוד מוזיקה, ניהול כספים, או כל יעד אישי מדיד שהמשתמש קובע לעצמו.",

  badgeText: "2026 · Health Coach AI · מדריך מעשי",

  canonical: "https://fullstack-eladjak.co.il/guide/box",

  heroBgImage: "/images/guides/guide-box-hero.jpg",

  stats: [

    { label: "זמן intake לאוכל", value: "<5s" },

    { label: "זיכרון ארוחות", value: "90 יום" },

    { label: "OCR תמונות", value: "חי" },

    { label: "חלונות 16:8", value: "ICS" },

  ],

  paradigmTitle: "אפליקציית בריאות שבאמת משתמשים בה",

  paradigmSub:

    "כי היא חיה איפה שאתה כבר נמצא — וואטסאפ. בלי כניסה, בלי כפתורים, בלי לעדכן אפליקציה.",

  paradigmShifts: [

    {

      before: "פתח אפליקציית תזונה, חפש מוצר, מלא כמויות, שמור...",

      after: '"אכלתי סלט יווני עם עוף" — נתונים כבר בתוך המערכת',

      icon: MessageCircle,

    },

    {

      before: "גרפים עמוסים שאי אפשר לפרש",

      after: "דוח שבועי: 'ירדת 0.8kg, פחות מהיעד. תוסיף חלבון'",

      icon: TrendingDown,

    },

    {

      before: "מישהו זוכר איך תרגישו אחרי ארוחה כבדה?",

      after: "Box שואל אחרי הארוחה 'איך מרגיש?' ושומר",

      icon: Heart,

    },

    {

      before: "חלון אוכל 16:8? שוכחים, ומאוחר מדי",

      after: "Calendar subscription — Google Calendar מראה לך את החלון",

      icon: Calendar,

    },

  ],

  whoIsThisFor: [

    {

      title: "אנשים שהתנסו באפליקציות בריאות ונכשלו",

      description:

        "Box דורש רק WhatsApp. בלי UI, בלי נטישה. עשרות פעמים ביום בקלות.",

      icon: Heart,

      color: "from-emerald-500 to-teal-500",

    },

    {

      title: "מי שמבצע keto / 16:8 / calorie deficit",

      description:

        "Box יודע את הפרוטוקול, מזכיר חלונות, מחשב מאקרונוטריאנטים.",

      icon: Apple,

      color: "from-amber-500 to-orange-500",

    },

    {

      title: "מפתחים שרוצים לבנות bot דומה",

      description:

        "הקוד פתוח, ה-pattern נקי — coach intake + state management + cron.",

      icon: Code2,

      color: "from-violet-500 to-purple-500",

    },

    {

      title: "מטפלים ודיאטנים",

      description:

        "אפשר לפתוח גרסה לכל לקוח, עם state נפרד וממשק מסובך יותר.",

      icon: Users,

      color: "from-pink-500 to-rose-500",

    },

  ],

  toc: [

    { id: "what-is", label: "מה זה" },

    { id: "intake", label: "Intake" },

    { id: "state", label: "State" },

    { id: "calendar", label: "יומן" },

    { id: "coach", label: "אימון" },

    { id: "advanced", label: "מתקדם" },

  ],

  sections: [

    {

      id: "what-is",

      icon: Dumbbell,

      title: "מה זה Box?",

      subtitle: "מאמן אישי אוטונומי — intake דרך וואטסאפ",

      description:

        "Box הוא endpoint פשוט על הdelegator שמקבל הודעת intake (טקסט חופשי), מפרש, שומר, ומשיב עם הצעדים הבאים.",

      color: "from-rose-600 to-pink-500",

      difficulty: "beginner",

      beginner:

        "בוקס זה עוזר אישי לבריאות שחי בוואטסאפ. אתם שולחים לו 'אכלתי בוריטו' והוא מחשב כמה קלוריות זה היה, זוכר את זה, ובסוף השבוע נותן לכם דוח. פשוט.",

      content: [

        "endpoint /coach/intake ב-delegator (port 3900)",

        "POST {text, source} → parsing עם Gemini 2.5 Flash → שמירה ל-intake.jsonl",

        "מחזיר: {ok, summary, next_step, calories_estimate, macros}",

        "state.json מרכזי: phase (intake/active/maintenance), weight_start, weight_target, protocol",

        "calendar feed: /box/calendar.ics — חלונות 16:8 ל-7 ימים קדימה",

        "dashboard: /coach/dashboard — מצב נוכחי + 10 intakes אחרונים + trend",

      ],

      tips: [

        "השם 'Box' זה באנגלית — בוקס/אגרוף. ולא 'Boks'. אלעד עמד על זה :)",

      ],

    },

    {

      id: "intake",

      icon: MessageCircle,

      title: "Intake — איך מדברים איתו",

      subtitle: "טקסט חופשי בעברית, Box מבין ושומר",

      description:

        "אין שדות, אין טפסים. אומרים מה אכלתם, מה שתיתם, איך אתם מרגישים — בוקס מפרש.",

      color: "from-emerald-600 to-teal-500",

      difficulty: "beginner",

      beginner:

        "תרשמו 'בוקר — שייק חלבון, ביצה, קפה שחור' ובוקס יבין מה אכלתם ומתי. תרשמו 'מרגיש נפוח' — הוא ישמור את הסימפטום. ככה.",

      content: [

        "אין פורמט. טקסט חופשי. Box מסווג אוטומטית ל: meal / symptom / weight / activity / fasting",

        "פורמט פנימי: {ts, text, type, classified, macros?, notes?}",

        "שמור ב-/opt/coach-data/progress-logs/intake.jsonl",

        "SOURCE allowlist — רק מסורות מאושרות: elad-direct-whatsapp, box-ocr, elad-ios-shortcut",

        "phantom filter — דוחה הודעות שנראות כמו chatter של סוכנים אחרים",

        "מגיב עם סיכום: 'קיבלתי — ~550kcal, 40g חלבון. הצעד הבא: לסיים מים עד 11:00'",

      ],

      codeExample: {

        label: "שליחה מ-curl",

        code: 'curl -X POST https://hub.eladjak.com/coach/intake \\\n  -H \'content-type: application/json\' \\\n  -d \'{"text":"ארוחת צהריים — סלט טונה עם אבוקדו","source":"elad-direct"}\'',

      },

    },

    {

      id: "state",

      icon: Target,

      title: "State — המצב הכולל",

      subtitle: "phase, יעדים, פרוטוקול — מה שבוקס יודע עליך",

      description:

        "בוקס לא שוכח בין הודעות — יש לו state.json מרכזי שמתעדכן בכל אינטרקציה.",

      color: "from-violet-600 to-purple-500",

      difficulty: "intermediate",

      content: [

        "state.json ב-/opt/coach-data/state.json",

        "שדות: phase (intake/active/maintenance), protocol (keto/if/deficit), weight_start, weight_target, fast_start_hour",

        "מתעדכן אוטומטית — כל intake של weight מעדכן את progress",

        "phase=intake — רק אוסף נתונים, לא מציע הצעדים",

        "phase=active — 16:8 פעיל, intakes מחושבים, משקל מתועד",

        "phase=maintenance — אחרי הגעה ליעד, מצב יציב",

      ],

      tips: [

        'שינוי phase דרך POST ל-/coach/phase — נוח לשלוח "התחל 16:8 ממחר" ובוקס יעביר ל-active',

      ],

    },

    {

      id: "calendar",

      icon: Calendar,

      title: "ICS יומן — חלונות 16:8 ל-Google Calendar",

      subtitle: "subscribe ורואים את חלונות האכילה בטלפון",

      description:

        "endpoint /box/calendar.ics מחזיר קובץ ICS חי עם 7 ימים של חלונות fasting.",

      color: "from-blue-600 to-indigo-500",

      difficulty: "intermediate",

      beginner:

        "Google Calendar יכול לקרוא לכם 'קובץ ICS' (פורמט ליומנים) מ-URL — ותעדכן אוטומטית. אתם מחברים פעם אחת, רואים את חלונות האכילה על הטלפון עד סוף החיים.",

      content: [

        "GET https://hub.eladjak.com/box/calendar.ics → קובץ VCALENDAR",

        "אירועים: 'חלון אכילה 16:8' — מ-fast_start_hour + 16 ועד fast_start_hour",

        "7 אירועים קדימה, מתעדכנים כל פעם שקוראים את הקובץ",

        "Google Calendar → Add → From URL → הדבק ה-URL",

        "האירועים מופיעים בטלפון תוך 15 דק'",

      ],

      codeExample: {

        label: "דוגמת VCALENDAR",

        code: 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Box//Elad//HE\nBEGIN:VEVENT\nUID:box-eat-2026-04-21\nSUMMARY:חלון אכילה 16:8\nDTSTART:20260421T100000\nDTEND:20260421T180000\nEND:VEVENT\nEND:VCALENDAR',

      },

    },

    {

      id: "coach",

      icon: Zap,

      title: "Coaching — ההצעדים הבאים",

      subtitle: "לא רק איסוף — גם המלצות",

      description:

        "אחרי שיש מספיק intakes, Box מתחיל להציע שיפורים קונקרטיים.",

      color: "from-amber-600 to-orange-500",

      difficulty: "intermediate",

      content: [

        "ניתוח trend שבועי — ירידה/עלייה במשקל, עקביות בחלונות",

        "pattern detection — 'אתה תמיד נופל ברביעי בערב — תתכנן סנק חלבוני מראש'",

        "proactive suggestions — אחרי ארוחה כבדה: 'הליכה 20 דק' תעזור לעיכול'",

        "weekly summary — דוח בסוף השבוע ב-WhatsApp: 'ירדת 0.6kg, 12 חלונות הושלמו מ-14'",

        "habit stacking — מזהה הרגלים חזקים ומציע להוסיף עליהם (אחרי קפה = גם ויטמין)",

      ],

      tips: [

        "הגישה של Box: לא מוסרני. לא 'אסור!'. שואל, מציע, מתעד — לא שופט",

      ],

    },

    {

      id: "advanced",

      icon: Lightbulb,

      title: "טיפים מתקדמים",

      subtitle: "אינטגרציות שעוזרות שזה יעבוד באמת",

      description:

        "הדברים הקטנים שהופכים את Box מגאדג'ט למערכת אמיתית.",

      color: "from-slate-600 to-zinc-500",

      difficulty: "advanced",

      content: [

        "שילוב OCR — תמונה של ארוחה → טקסט → intake אוטומטי",

        "iOS Shortcut — כפתור יעד שפותח שיחה ישירה עם Box",

        "Garmin/Fitbit webhook — משקל נשמר אוטומטית כל בוקר",

        "Shabbat awareness — בשבת + חגים ישראליים בוקס שקט אוטומטית",

        "Multi-user — אפשר לפצל state per-user ולתת Box למטופלים",

        "Export — /coach/state מחזיר את כל המצב ב-JSON; backup פשוט",

      ],

      tips: [

        "הדבר שעזר לי הכי הרבה: לכתוב ב-bullet points קצרים. 'בוקר: 3 ביצים, טוסט' — Box מבין מהר ומחזיר תגובה מהירה",

      ],

    },

  ],

  resources: [

    {

      title: "Coach ABBA Hatuv on GitHub",

      description: "הקוד של Box — Python + FastAPI + Gemini",

      href: "https://github.com/eladjak",

      icon: Github,

    },

    {

      title: "16:8 Fasting Research",

      description: "מאמרים ותועלות של intermittent fasting",

      href: "https://www.healthline.com/nutrition/16-8-intermittent-fasting",

      icon: ExternalLink,

    },

    {
      title: "Google Cloud Vision API",
      description: "OCR של תמונות למטרות intake אוטומטי — חינמי עד 1000/חודש",
      href: "https://cloud.google.com/vision",
      icon: ExternalLink,
    },

    {

      title: "המדריך ל-Kami",

      description: "Box מתחבר ל-Kami דרך וואטסאפ intakes",

      href: "/guide/kami",

      icon: BookOpen,

    },

    {

      title: "שיחת ייעוץ",

      description: "רוצה גרסה משלך ל-coach? 30 דק' שיחה",

      href: "/contact",

      icon: Mail,

    },

    {

      title: "המדריך ל-Delegator",

      description: "ה-API שבוקס רץ עליו",

      href: "/guide/delegator",

      icon: BookOpen,

    },

  ],

  ctaTitle: "מוכנים למאמן אישי בוואטסאפ?",

  ctaSub:

    "הקוד פתוח, ה-API-ים חינמיים, והזמן עד ל-intake ראשון — 10 דקות.",

  primaryCta: {

    label: "תרימו Box משלכם",

    href: "https://github.com/eladjak",

    icon: Github,

  },

  secondaryCta: {

    label: "תאמו ייעוץ",

    href: "/contact",

    icon: Users,

  },

  authorBio:

    "Box בנוי כ-pattern של coach-agent לכל יעד אישי: בריאות, גמילה, שינה, לימוד, כספים. הערך האמיתי הוא שהממשק בוואטסאפ — המקום שבו המשתמש כבר נמצא, בלי אפליקציה חדשה שננטשת אחרי שבוע. המדריך מציג את הארכיטקטורה והתבנית כדי שתוכלו להתאים אותה לכל coaching use case שיש בארגון או בחיים האישיים.",

};

