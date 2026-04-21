import {
  MessageCircle,
  Mic,
  Brain,
  Clock,
  Zap,
  Shield,
  Users,
  Star,
  Lightbulb,
  Code2,
  Rocket,
  BookOpen,
  Github,
  ExternalLink,
  Sparkles,
  Phone,
  Calendar,
  Bell,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const kamiGuide: AgentGuideData = {
  slug: "kami",
  agentName: "Kami",
  agentNameHe: "עוזר AI בוואטסאפ",
  logoImage: "/images/guide-logos/kami-logo.png",
  tagline: "עוזר AI אישי שחי בוואטסאפ — שומע, מדבר, זוכר שיחות",
  heroDescription: "קאמי הוא סוכן בינה מלאכותית אישי שחי בתוך WhatsApp — אפליקציית המסרים שכולנו כבר משתמשים בה יום-יום. במקום לפתוח אפליקציה נפרדת כמו ChatGPT או Claude, אתם פשוט שולחים הודעה למספר בוואטסאפ, והוא עונה — בטקסט או בקול. תחת מכסה המנוע, קאמי הוא שירות שבניתי בשפת TypeScript (הגרסה העכשווית של JavaScript) שרץ 24 שעות ביממה על שרת פרטי קטן. הוא מחובר לוואטסאפ דרך Green API — שער קליל ומאובטח שמעביר בין וואטסאפ לקוד שלי את ההודעות. כשהודעה מגיעה, היא עוברת דרך Claude Sonnet — אחד ממודלי הבינה המלאכותית החזקים בעולם — כדי לעבד ולהבין את מה שנאמר. אם ההודעה היא קולית, OpenAI Whisper מתמללת אותה לעברית במדויק; כשקאמי עונה, הוא יכול להשיב בקול שמייצר Gemini TTS של Google (חינמי וטבעי). היכולת הייחודית של קאמי היא הזיכרון: הוא זוכר שיחות ישנות באמצעות מאגר מיוחד (Qdrant, מוסבר במדריך נפרד), כך שאפשר להמשיך רעיון שהתחלנו לפני שבוע ולחזור לנקודה שעצרנו בה. אצלי (אלעד), קאמי הפך למעין עוזר אישי: הוא שולח תדריך בוקר יומי, מזכיר משימות, ומקבל הודעות קוליות שלי בזמן נסיעה. אצלכם, אותו מבנה בדיוק יכול לשמש עבור תמיכת לקוחות חכמה שעובדת 24/7, עוזר ללמידה שמלווה תלמיד, חבר-משפחה-דיגיטלי של המשפחה, או כל שימוש אחר שאתם יכולים לדמיין עבור סוכן שפה שחי בוואטסאפ.",
  badgeText: "2026 · סוכן WhatsApp עברי · מדריך מעשי",
  canonical: "https://fullstack-eladjak.co.il/guide/kami",
  heroBgImage: "/images/guides/guide-kami-hero.jpg",
  stats: [
    { label: "תוכל להגיע", value: "24/7" },
    { label: "שפת ברירת מחדל", value: "עברית" },
    { label: "זמן תמלול קולי", value: "~2s" },
    { label: "זיכרון סמנטי", value: "1000+" },
  ],
  paradigmTitle: "למה זה משנה את הדרך שאנחנו עובדים עם AI",
  paradigmSub:
    "קאמי הוא לא ChatGPT עם ממשק וואטסאפ. זה סוכן שפועל מעצמו, שומר הקשר, ומבצע משימות בעולם האמיתי.",
  paradigmShifts: [
    {
      before: "לפתוח אפליקציה, להקליד שאלה, לחכות, לקרוא",
      after: "להקליט הודעה קולית בדרך לרכב — ולקבל קול חזרה בזמן שאתה נוהג",
      icon: Mic,
    },
    {
      before: "לשכוח על מה דיברנו לפני שבוע",
      after: "קאמי זוכר 1000+ הודעות קודמות ומחבר בין נושאים",
      icon: Brain,
    },
    {
      before: "להציק לעצמך להתחיל שיחה",
      after: "קאמי יוזם — שולח תדריך בוקר, מזכיר מה חשוב, מציע רעיונות",
      icon: Sparkles,
    },
    {
      before: "בוטים שעונים ואז שוכחים אותך",
      after: "אישיות עקבית, קרבה אישית, זמין תמיד כמו חבר טוב",
      icon: Users,
    },
  ],
  whoIsThisFor: [
    {
      title: "יזמים עצמאיים",
      description:
        "תקשורת מהירה בזמן תנועה. הקלטת רעיון בהליכה והוא הופך למשימה.",
      icon: Rocket,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "מנהלי משפחה פעילים",
      description:
        "תזכורות חכמות, תזמון, סיכום שבועי של מה שהיה. כמו מזכיר אישי.",
      icon: Calendar,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "מפתחים שרוצים נגישות",
      description:
        "פתוח לגמרי. קוד ב-TypeScript, Bun, Claude API. תרימו לעצמכם.",
      icon: Code2,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "כל מי שעייף מ-ChatGPT",
      description:
        "קאמי זוכר אותך, שומר את ההקשר, ומדבר בקול בעברית כמו בן אדם.",
      icon: MessageCircle,
      color: "from-pink-500 to-rose-500",
    },
  ],
  toc: [
    { id: "what-is", label: "מה זה" },
    { id: "setup", label: "התקנה" },
    { id: "voice", label: "קול" },
    { id: "memory", label: "זיכרון" },
    { id: "proactive", label: "יזימה" },
    { id: "bridge", label: "גשר סוכנים" },
    { id: "advanced", label: "מתקדם" },
  ],
  sections: [
    {
      id: "what-is",
      icon: MessageCircle,
      title: "מה זה Kami בכלל?",
      subtitle: "הסוכן האישי שלך בוואטסאפ — עם פנימיות",
      description:
        "קאמי הוא שירות TypeScript שעובד על שרת VPS, מחובר ל-Green API לקבלת הודעות וואטסאפ, ומריץ LLM (Claude Sonnet) כדי לחשוב ולהגיב.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "beginner",
      beginner:
        "תחשבו על קאמי כמו חבר שיש לו את כל הידע של ChatGPT, אבל הוא שלכם בלבד, יושב בוואטסאפ, וזוכר מה אמרתם לו אתמול ולפני שבוע. אתם כותבים לו או מקליטים לו, והוא עונה. זהו.",
      content: [
        "שירות Node/Bun שרץ על VPS 24/7 — מאזין לוואטסאפ דרך Green API webhook",
        "כל הודעה נכנסת עוברת דרך Claude Sonnet 4.5 עם system prompt מותאם אישית לך",
        "הודעות קוליות מתומללות אוטומטית דרך OpenAI Whisper (תמיכה מלאה בעברית)",
        "תשובות יוצאות כטקסט או כקול — Gemini TTS בקול Charon (גברי ברור)",
        "זוכר שיחות ב-Qdrant (בסיס נתונים סמנטי) — שליפה לפי משמעות, לא רק לפי מילים",
      ],
      tips: [
        "קאמי זה פתוח — הקוד ב-GitHub, אפשר לפצל ולבנות גרסה משלכם",
        "ה-system prompt מגדיר את האישיות. בקובץ system-prompt.ts אפשר לשנות טון, תפקידים, והוראות",
      ],
    },
    {
      id: "setup",
      icon: Zap,
      title: "התקנה ב-15 דקות",
      subtitle: "מה צריך ואיך מתחילים",
      description:
        "קאמי מיועד להפעלה עצמית. צריך: חשבון Green API (חינמי עד 1000 הודעות), מפתח Claude API, ו-VPS זול.",
      color: "from-amber-600 to-orange-500",
      difficulty: "intermediate",
      beginner:
        "אם אתם לא מפתחים — זה שלב שכדאי להיעזר במישהו שיודע קוד. אבל זה חד-פעמי, ואחר כך עובד לבד. בתור התחלה אפשר להתנסות ב-ChatGPT עם זיכרון ולעבור לקאמי כשתרצו משהו שלם יותר.",
      content: [
        "git clone https://github.com/eladjak/elad-personal-agent → קלון של המאגר",
        "bun install → התקנת תלויות",
        "קובץ .env עם: GREEN_API_TOKEN, ANTHROPIC_API_KEY, OPENAI_API_KEY (לקול), GEMINI_API_KEY",
        "חיבור מספר וואטסאפ לחשבון Green API — QR חד-פעמי דרך הפאנל שלהם",
        "העלאה ל-VPS קטן (Hetzner 5€/חודש מספיק) + systemd service",
        "bun build src/index.ts --outdir dist → החבילה יוצאת ~1.3MB וטוענת תוך שניה",
      ],
      tips: [
        "אל תעלו ל-AWS/GCP — YouTube ו-WhatsApp חוסמים IP של clouds גדולים. Hetzner, Contabo, DigitalOcean עובדים מצוין",
        "Green API הוא שער נקי ומאובטח יותר מ-WAHA או Puppeteer עם קוד QR — עלות: פרוטה עד מאות הודעות ביום",
      ],
      codeExample: {
        label: "הפעלה ראשונית",
        code: "git clone https://github.com/eladjak/elad-personal-agent.git\ncd elad-personal-agent\nbun install\ncp .env.example .env\n# ערכו את .env עם המפתחות שלכם\nbun run build\nbun run start",
      },
    },
    {
      id: "voice",
      icon: Mic,
      title: "קול: שמיעה + דיבור",
      subtitle: "תמלול Whisper → Claude → TTS של Gemini",
      description:
        "החלק שהכי מרגש אנשים. אתם מקליטים וקאמי שומע, מבין, ועונה — בקול.",
      color: "from-purple-600 to-violet-500",
      difficulty: "intermediate",
      beginner:
        "כשאתם מקליטים הודעה לקאמי, הוא שולח אותה ל-Whisper של OpenAI — שירות שמתמלל דיבור לטקסט (טוב במיוחד בעברית). אז הטקסט עובר ל-Claude שחושב ומייצר תשובה. התשובה חוזרת ל-Gemini TTS שמייצר קובץ קולי בעברית, והקובץ נשלח אליכם חזרה בוואטסאפ.",
      content: [
        "הודעה קולית נכנסת → Green API מעביר URL של קובץ .oga",
        "Kami מוריד → שולח ל-OpenAI Whisper (model=whisper-1, language=he)",
        "תוך 2-3 שניות חוזר טקסט מתומלל",
        "Claude Sonnet עונה בעברית → התשובה נשלחת ל-Gemini TTS",
        "Gemini TTS (voice=Charon) מחזיר MP3 → Kami שולח הקובץ לוואטסאפ",
        "אם שלחתם טקסט אז יקבלו טקסט. אם שלחתם קול — יקבלו קול. אוטומטי.",
      ],
      tips: [
        "Whisper large-v3 טוב יותר מ-whisper-1 בעברית אבל יקר יותר. לשיחות יומיום whisper-1 מספיק",
        "Gemini TTS חינם ברוב המקרים (Gemini Flash 2.5) — מחליף ElevenLabs ב-$5/חודש חוסך",
        "אם יש רעש רקע חזק — Groq Whisper Turbo נותן תוצאות טובות יותר ב-500ms",
      ],
    },
    {
      id: "memory",
      icon: Brain,
      title: "זיכרון סמנטי עם Qdrant",
      subtitle: "לא רק הודעה אחרונה — 1000 ההודעות האחרונות, לפי משמעות",
      description:
        "הזיכרון של קאמי חי ב-Qdrant (vector database). כל הודעה נהפכת ל-embedding (מספרים שמייצגים משמעות) ונשמרת לחיפוש עתידי.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "advanced",
      beginner:
        "זה נשמע מסובך, אבל הרעיון פשוט: קאמי לא זוכר 'מילה במילה', הוא זוכר 'הרעיון'. אם תשאלו אותו 'מה אמרנו על הדיאטה החדשה?', הוא ימצא כל שיחה שקשורה לדיאטה, גם אם השתמשתם במילים שונות.",
      content: [
        "כל הודעה (שלך + של קאמי) נשמרת ב-collection kami_memory ב-Qdrant",
        "embedding מיוצר דרך gemini-embedding-001 (768 מימדים) — חינמי ומעולה בעברית",
        "לפני תשובה, קאמי מחפש סמנטית: 'מה המשתמש שאל בעבר שדומה לזה?'",
        "הוא שולף 5-10 הודעות רלוונטיות וצורף אותן ל-system prompt",
        "התוצאה: תחושה שקאמי באמת זוכר — כי הוא זוכר",
      ],
      tips: [
        "אחרי כמה חודשים יש לכם ספריית רעיונות — אפשר לייצא ל-Markdown ולהשתמש בה",
        "Qdrant רץ חינמי בקונטיינר דוקר על אותו VPS — לא צריך שירות חיצוני",
      ],
      codeExample: {
        label: "חיפוש סמנטי בזיכרון",
        code: "// בתוך תגובת Kami\nconst memories = await qdrant.search('kami_memory', {\n  vector: embeddingOfQuestion,\n  limit: 10,\n  with_payload: true,\n});\n// הזיכרונות הכי רלוונטיים נכנסים לקונטקסט של Claude",
      },
    },
    {
      id: "proactive",
      icon: Sparkles,
      title: "יוזמה עצמית — לא רק תגובה",
      subtitle: "תדריך בוקר, סיכום יום, ניטור רעיונות",
      description:
        "קאמי לא רק עונה — הוא פותח שיחות. יש לו crons שמאפשרים לו ליזום כשזה הגיוני.",
      color: "from-pink-600 to-rose-500",
      difficulty: "intermediate",
      beginner:
        "דמיינו עוזר שבכל בוקר בוחן את היום הקרוב ושולח לכם את 3 הדברים החשובים. זה בדיוק מה שקאמי עושה — אבל בלי שצריך לבקש.",
      content: [
        "Cron 08:00 — תדריך בוקר (משימות היום, פגישות, סיכום מה היה אתמול)",
        "Cron 20:00 — סיכום ערב (מה נעשה, מה חסר, מה לתכנן למחר)",
        "Proactive scheduler — אם הייתה הודעה חשובה שלא ענו עליה 30 דק', קאמי מזכיר",
        "Trigger based on events — כשבקאמי יש הודעה מ-Kaylee על תקלה, הוא מעביר לאלעד",
        "שעות שקטות (22:00-08:00) — רק דברים דחופים",
      ],
      tips: [
        "מודעות לוח שנה ישראלי מובנית — בשבת, יום הזיכרון, יום כיפור קאמי שקט אוטומטית",
        "אפשר לבטל cron בכל שלב — זה פשוט שורה ב-crontab",
      ],
    },
    {
      id: "bridge",
      icon: Users,
      title: "גשר לסוכנים אחרים",
      subtitle: "Kami מתקשר עם Claude Code ו-Kaylee דרך messages.jsonl",
      description:
        "קאמי לא פועל לבד. יש לו ערוץ תקשורת קבוע עם שאר הסוכנים ברשת דרך קובץ gshr.jsonl.",
      color: "from-cyan-600 to-blue-500",
      difficulty: "advanced",
      beginner:
        "זה כמו WhatsApp group בין הסוכנים. אתם כותבים לקאמי 'תבדוק אם השרת עובד', הוא מעביר לקיילי (סוכן התשתית), קיילי עונה, וקאמי מחזיר לכם את התשובה.",
      content: [
        "הגשר = קובץ JSON Lines ב-~/.claude/kami-bridge/messages.jsonl",
        "כל הודעה: {ts, from, to, content, status, type}",
        "Kami קורא פעם ב-10 שניות — מעבד הודעות שמופנות אליו",
        "Kami יכול לשלוח ל-claude-code או ל-kylie (Kaylee)",
        "Claude Code על Windows קורא את הקובץ ומגיב",
        "Kaylee על ה-VPS מקבלת דרך endpoint ייעודי",
      ],
      tips: [
        "אם אתם רוצים שקלוד יבצע משימה קוד תוך כדי שיחה בוואטסאפ — פשוט כתבו לקאמי 'תגיד לקלוד לבדוק את X' והוא מעביר",
      ],
      codeExample: {
        label: "הודעה בגשר",
        code: '{"ts":"2026-04-20T21:00:00Z","from":"elad","to":"claude-code","type":"request","content":"תבדוק את הבילד של הפרויקט","status":"pending"}',
      },
    },
    {
      id: "advanced",
      icon: Shield,
      title: "טיפים מתקדמים ואוטומציה",
      subtitle: "מה שלמדנו אחרי חצי שנה של שימוש יומיומי",
      description:
        "הדברים הקטנים שעושים את ההבדל בין בוט לבין סוכן אמיתי.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      content: [
        "WhatsApp Business vs Personal — קאמי עובד גם עם מספר פרטי; Green API לא דורש פרופיל עסקי",
        "Rate limits — Green API חינמי מוגבל ל-1000 הודעות/חודש. Pro החל מ-$39/חודש ללא הגבלה",
        "Multi-user — אפשר להוסיף users בקוד ולתת סוכן לכל בן משפחה (system prompt נפרד)",
        "Backup — קובץ messages.jsonl מתמלא מהר. רוטציה שבועית + העלאה ל-S3 (או Hetzner Object Storage)",
        "Monitoring — Uptime Kuma על /health endpoint של קאמי; אזעקה אם יורד",
        "A/B testing system prompts — להעתיק את system-prompt.ts לגרסאות ולהחליף באמצעות ENV var",
      ],
      tips: [
        "ה-pattern הכי שווה: 'מצב הקלטה' — קאמי יודע שהקליט הודעה קולית ועונה בקול; אם כתבתם — עונה בטקסט. שקיפות מלאה",
        "בצע `/status` בוואטסאפ — מחזיר סטטוס מערכת בלי לצרוך tokens של LLM",
      ],
    },
  ],
  resources: [
    {
      title: "GitHub — elad-personal-agent",
      description: "הקוד המלא של קאמי — TypeScript + Bun + Claude + Whisper + Gemini TTS",
      href: "https://github.com/eladjak/elad-personal-agent",
      icon: Github,
    },
    {
      title: "Green API",
      description: "שער הוואטסאפ הרשמי — 1000 הודעות חינם",
      href: "https://green-api.com",
      icon: ExternalLink,
    },
    {
      title: "Qdrant Cloud",
      description: "בסיס נתונים וקטורי לזיכרון סמנטי",
      href: "https://qdrant.tech",
      icon: ExternalLink,
    },
    {
      title: "OpenAI Whisper API",
      description: "תמלול קולי מדויק בעברית",
      href: "https://platform.openai.com/docs/guides/speech-to-text",
      icon: ExternalLink,
    },
    {
      title: "Gemini TTS",
      description: "קול עברי חינמי — Charon, Achernar ועוד 28 קולות",
      href: "https://ai.google.dev",
      icon: ExternalLink,
    },
    {
      title: "המדריך המלא ל-Claude Code",
      description: "הבסיס של כל השרשרת — איך משתמשים ב-Claude Code",
      href: "/claude-code",
      icon: BookOpen,
    },
  ],
  ctaTitle: "מוכנים לבנות קאמי משלכם?",
  ctaSub:
    "הקוד פתוח, ה-API-ים זולים או חינמיים, והזמן עד לשיחה קולית ראשונה — 15 דקות.",
  primaryCta: {
    label: "בנו קאמי משלכם",
    href: "https://github.com/eladjak/elad-personal-agent",
    icon: Github,
  },
  secondaryCta: {
    label: "הגיבו אליי בוואטסאפ",
    href: "https://wa.me/972525427474",
    icon: Phone,
  },
  authorBio:
    "קאמי הוא סוכן AI שאני מפעיל בייצור ומפתח בהתמדה. הוא התחיל כ-chatbot פשוט והתפתח למערכת שמגיבה בקול, שומרת הקשר ארוך-טווח, ויוזמת תזכורות לפי הרגלים. המדריך בנוי כדי שתוכלו להבין את הארכיטקטורה, להתקין גרסה משלכם, ולעצב את האישיות של הסוכן לפי הצרכים שלכם — אישיים, משפחתיים, או עסקיים.",
};
