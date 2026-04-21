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

    "כי היא חיה איפה שאתם כבר נמצאים — וואטסאפ. בלי כניסה, בלי כפתורים, בלי לעדכן אפליקציה.",

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

        "Box זה מאמן אישי שחי בכיס שלכם — סוכן AI שמקבל הודעות בוואטסאפ (טקסט או תמונה), מבין מה אמרתם בשפה חופשית, זוכר את זה לטווח ארוך, ומחזיר תשובה עם הצעד הבא. הוא לא אפליקציה חדשה שצריך להוריד וללמוד; הוא שיחה בוואטסאפ, בדיוק כמו שיחה עם חבר שגם עוקב, גם מחשב, וגם לא שופט.",

      color: "from-rose-600 to-pink-500",

      difficulty: "beginner",

      beginner:

        "תחשבו על יומן דיגיטלי עם מוח. אתם כותבים 'אכלתי בוריטו' בוואטסאפ — Box מבין שזה ארוחה, מעריך כמה קלוריות וחלבון היו בה, שומר את זה במאגר פנימי, ובסוף השבוע מחזיר לכם סיכום קצר. בלי אפליקציה, בלי הרשמה, בלי כפתורים. אצלי ([אלעד](/contact)) הוא מלווה תוכנית ירידה במשקל + בניית כוח, אבל אצלכם הוא יכול לעקוב אחרי שינה, ריצה, הרגלי לימוד או כל יעד אחר.",

      content: [

        "Box הוא endpoint פשוט על ה-[Delegator](/guide/delegator) (port 3900) — שכבת ה-API המרכזית שדרכה כל הסוכנים ברשת מדברים. כלומר Box הוא לא שרת נפרד אלא יכולת שמשתלבת בתוך תשתית קיימת",

        "התקשורת: POST /coach/intake עם JSON פשוט ({text, source}) → parsing עם Gemini 2.5 Flash (המודל החינמי של Google שמבין עברית מצוין) → שמירה ל-intake.jsonl (קובץ טקסט פשוט שבו כל שורה היא אירוע)",

        "התגובה שמגיעה חזרה: {ok, summary, next_step, calories_estimate, macros} — כלומר 'קיבלתי, הנה הסיכום, והנה מה שכדאי לעשות עכשיו'",

        "state.json — המוח של Box. קובץ JSON אחד שמכיל את כל ההקשר: phase (intake/active/maintenance), יעד משקל, פרוטוקול (keto/16:8/גירעון קלורי), שעת התחלת חלון. הוא נטען בכל אינטראקציה כדי ש-Box לא ישכח מי אתם",

        "calendar feed: endpoint /box/calendar.ics — קובץ ICS הוא פורמט יומנים סטנדרטי (כמו ש-Google Calendar ו-Apple Calendar קוראים). Box מייצר קובץ חי עם 7 ימים של חלונות אכילה קדימה, ואפשר להירשם אליו פעם אחת מהטלפון",

        "dashboard: /coach/dashboard — דף HTML פשוט שמציג את המצב הנוכחי, 10 ה-intakes האחרונים ומגמה שבועית. זו חלון זכוכית אל תוך ה-state, לא כלי ניהול",

        "הזיכרון ארוך-הטווח יושב ב-[Qdrant](/guide/qdrant) — מסד וקטורי שמאפשר חיפוש לפי משמעות. כלומר אחרי 3 חודשים אפשר לשאול 'מתי הרגשתי הכי טוב?' ו-Box ימצא את ההתאמות הנכונות, לא לפי מילה מדויקת אלא לפי רעיון",

      ],

      tips: [

        "השם 'Box' באנגלית — על שם בוקס/אגרוף (מאבק מתמיד ליעד). זה בכוונה 'Box' ולא 'Boks'",

        "Box בנוי על [Claude Code](/claude-code) + [CrewAI](/guide/crewai) — שכבת הלוגיקה של הסוכן. זה לא שרת מונוליטי אחד אלא הרכבה של רכיבים פתוחים, ולכן קל להחליף כל חלק בנפרד",

      ],

    },

    {

      id: "intake",

      icon: MessageCircle,

      title: "Intake — איך מדברים איתו",

      subtitle: "טקסט חופשי בעברית, Box מבין ושומר",

      description:

        "Intake זה תהליך הקליטה של כל נתון חדש. במקום טופס עם שדות, Box עובד עם טקסט חופשי: אתם כותבים בעברית טבעית מה אכלתם, איך אתם מרגישים, או כמה זמן ישנתם — והמודל השפה מסווג, מבין, ושומר. זה המקום שבו 'יומן רגיל' נהפך ל'יומן עם מוח'.",

      color: "from-emerald-600 to-teal-500",

      difficulty: "beginner",

      beginner:

        "כתיבה חופשית פשוטה: 'בוקר — שייק חלבון, ביצה, קפה שחור' — Box מבין שזו ארוחה, מעריך מאקרו-נוטריאנטים, ושומר עם חותמת זמן. 'מרגיש נפוח' — Box שומר את זה כסימפטום בנפרד מהאוכל, כדי שבהמשך נוכל לבדוק אם יש קשר. אין פורמט קבוע, אין טעויות — המודל יודע לקלוט כמעט כל ניסוח.",

      content: [

        "הסיווג האוטומטי: כל הודעה נכנסת מקטלגת לאחד מחמישה סוגים — meal (אוכל), symptom (סימפטום/הרגשה), weight (משקל), activity (פעילות גופנית), fasting (חלון צום). ה-LLM עושה את זה באופן שקוף בלי שתצטרכו לבחור",

        "הפורמט הפנימי שנשמר: {ts, text, type, classified, macros?, notes?} — timestamp, הטקסט המקורי, סוג, מה שה-AI הבין, והערות. כלומר הכל נשאר — גם הטקסט הגולמי וגם הפירוש",

        "האחסון: /opt/coach-data/progress-logs/intake.jsonl — קובץ JSONL (כל שורה JSON נפרד). פורמט עמיד, קל לגיבוי, וקל לייצוא למערכת אחרת",

        "SOURCE allowlist: רק מקורות מאושרים נכנסים (למשל elad-direct-whatsapp, box-ocr, elad-ios-shortcut). זה חשוב כי Box יושב על תשתית עם סוכנים רבים ([Kami](/guide/kami), [Kaylee](/guide/kaylee), [Hermes](/guide/hermes)) שמייצרים תעבורה — אנחנו לא רוצים שדיווח של סוכן אחר ייכנס בטעות כ-intake",

        "phantom filter: מנגנון שמזהה הודעות שנראות כמו chatter של סוכנים ודוחה אותן. שכבת הגנה שנייה מעל ה-allowlist",

        "התגובה שמוחזרת בוואטסאפ: 'קיבלתי — ~550kcal, 40g חלבון. הצעד הבא: לסיים מים עד 11:00' — קצר, קונקרטי, ועם next action אחד בלבד כדי לא להציף",

        "הרחבת OCR: אפשר לשלוח תמונה של צלחת אוכל → Google Cloud Vision API מחלץ טקסט מה-PDF/תפריט/אריזה → מועבר למודל השפה כאילו הקלדתם אותו. הקלט הזה חינמי עד 1000 תמונות בחודש",

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

      subtitle: "phase, יעדים, פרוטוקול — מה שבוקס יודע עליכם",

      description:

        "State זה הזיכרון הקצר-טווח של Box — קובץ אחד שמכיל את כל ההקשר הנוכחי: באיזה שלב אתם, מה היעד, איזה פרוטוקול פעיל. בכל אינטראקציה Box קורא את ה-state הזה קודם, ורק אחר כך מגיב. זה ההבדל בין 'עוזר שמגיב להודעה' ל'מאמן שזוכר את המסע'.",

      color: "from-violet-600 to-purple-500",

      difficulty: "intermediate",

      content: [

        "המיקום: /opt/coach-data/state.json — קובץ JSON אחד פשוט. אפשר לפתוח בעורך טקסט, לקרוא, לערוך ידנית. שקוף לחלוטין — אין קופסה שחורה",

        "השדות המרכזיים: phase (intake/active/maintenance), protocol (keto/if/deficit), weight_start, weight_target, fast_start_hour. מינימום שדות כדי שה-state יישאר קל להבנה ולתחזוקה",

        "עדכון אוטומטי: כל intake של משקל מעדכן את progress; כל שינוי פרוטוקול משתקף מיד. אין צורך לזכור ל'לשמור' — ה-state חי",

        "phase=intake: שלב איסוף הנתונים הראשוני. Box עוד לא מציע צעדים — הוא רק לומד את הדפוסים שלכם. אורך טיפוסי: שבוע-שבועיים",

        "phase=active: החלק הפעיל. יש פרוטוקול, יש יעד, Box מתזכר חלונות, מחשב מאקרואים, ונותן next steps יומיים",

        "phase=maintenance: אחרי הגעה ליעד. Box עובר למצב שמירה — פחות הוראות, יותר ניטור, והתראות רק כשיש סטייה משמעותית",

        "תאימות ל-SQLite: מעבר ל-state.json יש גם SQLite מוצפן לאחסון היסטוריה ארוכה (כל ה-intakes, משקלים, סימפטומים). הזיכרון הסמנטי יושב ב-[Qdrant](/guide/qdrant) — שם אפשר לחפש 'מה עבד בחודש שעבר' ולקבל תשובה מבוססת דמיון רעיוני ולא רק זמן",

      ],

      tips: [

        'שינוי phase ידני: POST /coach/phase עם {phase:"active"} — נוח כשרוצים להתחיל שלב חדש מיד. אפשר גם לכתוב לבוקס בוואטסאפ "בוא נעבור ל-active ממחר בבוקר" והוא יזהה את הכוונה ויעדכן לבד',

        "הגיבוי: כי ה-state הוא קובץ יחיד, אפשר לגבות אותו עם cron פשוט (ראו [Docker](/guide/docker) לדוגמת volume mounts). אובדן state = אובדן זיכרון — שווה לגבות יומית",

      ],

    },

    {

      id: "calendar",

      icon: Calendar,

      title: "ICS יומן — חלונות 16:8 ל-Google Calendar",

      subtitle: "הירשמו פעם אחת, ותראו את חלונות האכילה בטלפון לתמיד",

      description:

        "ICS זה פורמט סטנדרטי לקבצי יומן — בדיוק הפורמט ש-Google Calendar, Apple Calendar ו-Outlook יודעים לקרוא. Box חושף endpoint שמחזיר קובץ ICS חי (מתעדכן בזמן אמת), ואפשר להירשם אליו כמו לפודקאסט. התוצאה: חלונות הצום והאכילה שלכם מופיעים ביומן שאתם כבר משתמשים בו, בלי אפליקציה נוספת.",

      color: "from-blue-600 to-indigo-500",

      difficulty: "intermediate",

      beginner:

        "תחשבו על זה כמו 'הרשמה לערוץ יומן'. אתם נותנים ל-Google Calendar כתובת URL אחת של Box, והוא יסנכרן לבד כל כמה דקות. החלונות — מתי מותר לאכול, מתי צום — יופיעו בטלפון, בלפטופ, ובכל מכשיר שמחובר לאותו Google. אם אלעד שינה את שעת ההתחלה בוואטסאפ ל-Box, היומן יעודכן תוך דקות ספורות — בלי שצריך לגעת בכלום.",

      content: [

        "ה-endpoint: GET https://hub.eladjak.com/box/calendar.ics — מחזיר טקסט בפורמט VCALENDAR (פורמט הטקסט הסטנדרטי של יומנים). אפשר לפתוח בדפדפן, לראות איך זה נראה, ולהוריד",

        "מה באירועים: כל אירוע הוא 'חלון אכילה 16:8' — מתחיל ב-fast_start_hour + 16 שעות צום, ונמשך 8 שעות אכילה. השעות נקבעות דינמית מה-state של Box",

        "7 אירועים קדימה בכל קריאה — כשהיומן מסתנכרן שוב מחר, יהיו 7 חדשים. אין 'סוף' ליומן; הוא מייצר את הבא באופן רציף",

        "כיצד מוסיפים ב-Google: Calendar → Other calendars → From URL → הדביקו את ה-URL. ב-Apple Calendar: File → New Calendar Subscription. זה פעולה חד-פעמית",

        "זמן סנכרון טיפוסי: 5-15 דקות. Google בודק את ה-URL בקצב משלו; אי אפשר להכריח עדכון מיידי, אבל בפועל זה עובד מצוין לתזכורות יומיומיות",

        "אצלי ([אלעד](/contact)) זה חיוני כי בשבת וחגים אני שקט — ה-calendar מקבל skip אוטומטי לימים הללו (ראו [Adopter](/guide/adopter) ועקרון Shabbat awareness שמופיע בכל הסוכנים ברשת)",

      ],

      codeExample: {

        label: "דוגמת VCALENDAR",

        code: 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Box//Elad//HE\nBEGIN:VEVENT\nUID:box-eat-2026-04-21\nSUMMARY:חלון אכילה 16:8\nDTSTART:20260421T100000\nDTEND:20260421T180000\nEND:VEVENT\nEND:VCALENDAR',

      },

    },

    {

      id: "coach",

      icon: Zap,

      title: "Coaching — הצעדים הבאים",

      subtitle: "לא רק איסוף — גם המלצות קונקרטיות",

      description:

        "Coaching זה המקום שבו Box עובר מ'יומן' ל'מאמן'. אחרי שנאסף מספיק מידע (בדרך כלל שבועיים), המודל מתחיל לזהות דפוסים אישיים ולהציע התערבויות מדויקות — מותאמות לכם, לא המלצות כלליות מספר. הטון: שואל ומציע, לא פוקד ולא שופט.",

      color: "from-amber-600 to-orange-500",

      difficulty: "intermediate",

      content: [

        "ניתוח מגמה שבועי: Box מריץ CrewAI crew שקורא את ה-intakes של השבוע, מזהה כיוון כללי (התקדמות/קיפאון/נסיגה), ומפיק תובנה אחת או שתיים. זה לא גרף עמוס — זה משפט קצר, מבוסס-נתונים",

        "זיהוי דפוסים אישיים: 'אתם נוטים לאכול יותר ברביעי בערב' — Box מוצא את זה מתוך תצפית אמפירית, לא מתוך כלל קבוע מראש. זה עובד כי ה-intakes נשמרים במלואם ל-90 יום ב-[Qdrant](/guide/qdrant)",

        "הצעות פרואקטיביות: אחרי ארוחה כבדה — 'הליכה 20 דקות תעזור לעיכול'. Box לא מחכה שתבקשו — הוא יוזם. אבל הוא יוזם בזהירות, בדרך כלל הצעה אחת ביום, כדי לא להציף",

        "דוח שבועי בוואטסאפ: כל יום שישי Box שולח סיכום: 'השבוע — התקדמות חיובית בכיוון היעד, 12 חלונות הושלמו מתוך 14, חלבון יציב'. קצר, ענייני, בלי ציון או שיפוט",

        "habit stacking: טכניקה מ-Atomic Habits — מזהים הרגל חזק שכבר קיים ומצמידים אליו הרגל חדש. Box מוצא אוטומטית הרגלים חזקים ומציע הצמדה: 'אחרי הקפה בבוקר — זה הזמן הטוב לויטמין D'",

        "הטון: שואל, מציע, מתעד — אף פעם לא שופט. 'אכלת 2400 קלוריות היום — קצת מעל היעד. רוצה שנתאים את ארוחת הערב?' במקום 'חרגת מהיעד!'",

      ],

      tips: [

        "התוכנית הזו היא לא תוכנית דיאטה — זו תבנית של coach-agent. אצלכם אפשר להפעיל אותה על כל יעד מדיד: שינה (מתי הולכים לישון + איך התעוררתם), ריצה (ק״מ + תחושה), גמילה (מספר פעמים + טריגרים), לימוד מוזיקה (דקות תרגול + התקדמות) או ניהול תקציב",

        "Box משתמש ב-[Claude Code](/claude-code) ללוגיקה מורכבת וב-Gemini Flash ל-parsing מהיר. ראו את [המדריך ל-CrewAI](/guide/crewai) כדי להבין איך crews של סוכנים משתפים פעולה על ניתוח כזה",

      ],

    },

    {

      id: "advanced",

      icon: Lightbulb,

      title: "טיפים מתקדמים",

      subtitle: "אינטגרציות שהופכות את זה ממקסם למערכת",

      description:

        "הסעיף הזה לאלה שרוצים להרחיב את Box מעבר לשימוש הבסיסי. כל אחת מהיכולות כאן מוסיפה שכבת נוחות אמיתית — מצמצמת חיכוך, מוסיפה אוטומציה, או פותחת use cases חדשים. לא חובה להטמיע הכל — כל אחת עומדת בפני עצמה.",

      color: "from-slate-600 to-zinc-500",

      difficulty: "advanced",

      content: [

        "שילוב OCR: שליחת תמונה של צלחת/תפריט/אריזה → Google Cloud Vision API מחלץ טקסט → Box מטפל בו כ-intake רגיל. חינמי עד 1000 תמונות בחודש. נוח במסעדה כשאין כוח להקליד",

        "iOS Shortcut: בונים קיצור במכשיר (Shortcuts app) עם כפתור אחד שפותח צ'אט ישיר עם Box בוואטסאפ — מצמצם את הזמן מ'רעיון' ל'הודעה' ל-3 שניות. עובד גם מה-Home Screen וגם מה-Apple Watch",

        "webhook מ-Garmin/Fitbit: מתחברים דרך [n8n](/guide/n8n) לשירות הכושר, ו-Box מקבל משקל/שעות שינה/דופק אוטומטית כל בוקר. זה מבטל את הצורך להיזכר לדווח",

        "Shabbat awareness: בשבת וחגים ישראליים Box שקט אוטומטית — לא שולח דוחות, לא מתזכר. זה עקרון שחוצה את כל הסוכנים ברשת שלי (ראו [Kami](/guide/kami) ו-[Kaylee](/guide/kaylee) שעובדים אותו דבר)",

        "Multi-user: ה-state נתמך לפי user_id, כך שאפשר להפעיל Box אחד לכמה אנשים (מאמנים, דיאטנים, מטפלים). כל לקוח מקבל state משלו, פרטיות נשמרת, והמערכת מתחזקת חלק אחד בלבד",

        "Export: GET /coach/state מחזיר את כל המצב ב-JSON. backup פשוט: cron שמשמר את הקובץ ב-Box או Google Drive כל לילה. גם ייצוא לפורמט אחר (CSV/Excel) הוא trivial מ-JSON",

        "ניטור: ה-[Dashboard](/guide/dashboard) מציג את הבריאות של Box ביחד עם שאר הסוכנים — ככה רואים מיד אם יש intakes שלא נכנסו או אם ה-state.json לא מתעדכן",

      ],

      tips: [

        "הדבר שעזר לי הכי הרבה: כתיבה ב-bullet points קצרים. 'בוקר: 3 ביצים, טוסט, קפה' — Box מעבד מהר ומחזיר תגובה מיידית. משפטים ארוכים עובדים, אבל עולים יותר tokens והתגובה איטית",

        "שילוב עם [Aider](/guide/aider) או [Ollama](/guide/ollama) כמודל חלופי: אם יום אחד Gemini לא זמין, אפשר להחליף ל-LLM מקומי עם שינוי config אחד — הארכיטקטורה של Box פתוחה ולא נעולה לספק",

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

