import {
  Network,
  Route,
  Plug,
  Layers,
  Github,
  ExternalLink,
  BookOpen,
  Code2,
  Rocket,
  Lightbulb,
  Zap,
  Users,
  Mail,
  Server,
  Lock,
  Globe,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const delegatorGuide: AgentGuideData = {
  slug: "delegator",
  agentName: "Delegator",
  agentNameHe: "שער API מרכזי לכל רשת",
  logoImage: "/images/guide-logos/delegator-logo.png",
  tagline: "שער אחד, 100+ endpoints, כל הרשת מאחור",
  heroDescription: "Delegator הוא מה שנקרא בעגה המקצועית 'שער API' (API Gateway) — מעין מרכזייה דיגיטלית שיושבת בכניסה לרשת סוכני ה-AI שלי וממיינת את כל התנועה שעוברת דרכה. חשבו על מרכזייה של בניין משרדים גדול: במקום שכל עובד יזכור את המספר של הבנק, של חברת הדואר, של ספק החשמל ושל עשרות הלקוחות — יש מרכזנית אחת שיודעת את הכל; העובד רק מבקש 'תעבירי אותי לבנק' והיא מחברת. בדיוק כך Delegator מתפקד עבור הסוכנים שלי: כש-[Kami](/guide/kami) רוצה לשלוח אימייל, כש-[Box](/guide/box) צריך ליצור אירוע ביומן, כש-[Adopter](/guide/adopter) רוצה לשמור משהו בזיכרון — אף אחד מהם לא צריך לדעת את מפתחות ה-API של Resend (מייל — 100 ביום בחינם, מעבר לזה pay-per-use), Google, Twilio (SMS — תשלום לפי הודעה) או Perplexity (Pro API למחקר). הם פשוט שולחים בקשה ל-Delegator, והוא דואג לכל השאר. הטכנולוגיה עצמה פשוטה מאוד — שרת HTTP שכתבתי ב-Python עם מעל 100 נקודות קצה (endpoints) שמטפלות בכל מה שצריך. אצלי Delegator מחבר 10 סוכנים שונים מאחורי שער אחד — אצלכם הוא יכול להחליף שירותי אוטומציה כמו Zapier (חינם עד 100 tasks בחודש, Starter כ-29 דולר לחודש, Professional כ-73 דולר, Team כ-103 דולר למשתמש ב-2026) או Make, ולשמש כתשתית API מרכזית לכל ארכיטקטורה עם מספר מערכות AI — בלי לפזר סיסמאות וקונפיגורציה בחמישה מקומות שונים.",
  badgeText: "2026 · Central API Router · מדריך מעשי",
  canonical: "https://fullstack-eladjak.co.il/guide/delegator",
  heroBgImage: "/images/guides/guide-delegator-hero.jpg",
  videoUrl: "/videos/guides/delegator.mp4",
  stats: [
    { label: "endpoints", value: "100+" },
    { label: "שירותים מאחורה", value: "10" },
    { label: "uptime (90 יום)", value: "99.7%" },
    { label: "public URL", value: "hub" },
  ],
  paradigmTitle: "Stop duplicating the middle layer",
  paradigmSub:
    "יש לכם 5 סוכנים, כולם צריכים לשלוח email? לא. אחד שולח לדלגטור, הדלגטור שולח. פשוט.",
  paradigmShifts: [
    {
      before: "credentials בכל agent, update = update בכמה מקומות",
      after: "credentials ב-Delegator בלבד, rotate פעם אחת",
      icon: Lock,
    },
    {
      before: "ל-Kami API key של Resend, Stripe, Postiz, Gmail, fal.ai...",
      after: "Kami שולח ל-Delegator POST /email → Delegator עושה את ה-magic",
      icon: Route,
    },
    {
      before: "רוצים לחסום פרסום בשבת? צריך לשלב ב-5 agents",
      after: "Calendar gate ב-Delegator. כל publishing עובר דרכו. commit אחד",
      icon: Layers,
    },
    {
      before: "כשמוסיפים webhook חדש — צריך לעדכן כל agent",
      after: "להוסיף ל-Delegator, וכולם מקבלים בחינם",
      icon: Plug,
    },
  ],
  whoIsThisFor: [
    {
      title: "בונים רשת עם 3+ סוכנים",
      description:
        "ברגע שיש 3, כבר יש coordination overhead. Delegator פותר את זה.",
      icon: Network,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "מנהלי infrastructure",
      description:
        "מקום אחד — חוזה אחד, rate-limit אחד, audit log אחד.",
      icon: Server,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "מפתחי אוטומציה",
      description:
        "Zapier-style — pipelines פנימיים של email/sms/post/calendar.",
      icon: Route,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "קהילות סוכנים",
      description:
        "כמה עצמאיים בונים ביחד? Delegator כ-shared service עובד נפלא.",
      icon: Users,
      color: "from-pink-500 to-rose-500",
    },
  ],
  toc: [
    { id: "what-is", label: "מה זה" },
    { id: "routes", label: "Routes" },
    { id: "gateway", label: "Gateway" },
    { id: "calendar", label: "Calendar Gate" },
    { id: "costs", label: "Cost Tracking" },
    { id: "llm-route", label: "LLM Routing" },
    { id: "advanced", label: "מתקדם" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Server,
      title: "מה זה Delegator? שער הכניסה היחיד לכל הרשת",
      subtitle: "HTTP router בפייתון שמחליף Zapier, Make ו-5 קבצי credentials",
      description:
        "Delegator הוא מה שנקרא בעגה המקצועית 'API gateway' — שער כניסה מרכזי שיושב מול כל מערכת שיש לה הרבה שירותים ברקע. זו תוכנה קטנה שכתובה בפייתון רגיל (בלי framework מפונפן כמו FastAPI או Express), רצה בתור שירות רקע על השרת שלי, ומקשיבה לבקשות שמגיעות אליה דרך הרשת (HTTP). כל סוכן ברשת שלי — [Kami](/guide/kami), [Kaylee](/guide/kaylee), [Box](/guide/box), [Hermes](/guide/hermes), [Adopter](/guide/adopter) וכל השאר — כשהוא רוצה לשלוח מייל, להוציא הודעת SMS, לבדוק את הלו\"ז או לקרוא ל-LLM — הוא לא פונה ישירות לספק השירות. הוא פונה ל-Delegator, וה-Delegator הוא זה שיודע באיזה מפתח API להשתמש ואיך לדבר עם כל שירות.",
      color: "from-cyan-600 to-blue-500",
      difficulty: "beginner",
      beginner:
        "דמיינו מרכזייה של בניין משרדים גדול. במקום שכל עובד יזכור את מספר הטלפון של הבנק, של חברת הדואר, של ספק החשמל ושל הלקוחות — יש מרכזנית אחת שיודעת את הכל. העובד מרים טלפון, אומר 'תעבירי אותי לבנק' — והיא מחברת. כך בדיוק עובד Delegator. הסוכנים לא צריכים לנהל בעצמם את פרטי הקשר (מה שנקרא credentials — סיסמאות ומפתחות גישה לשירותים חיצוניים); הם רק שולחים בקשה פשוטה ל-Delegator והוא דואג לכל השאר. כך, אם מחליפים מפתח API של שירות מייל — משנים את זה במקום אחד בלבד, לא ב-10 סוכנים שונים.",
      content: [
        "רץ על port 3900 ב-VPS (שרת וירטואלי שלי, בתוך Hetzner) — בפנים בלבד. לגולשים מבחוץ הוא נגיש בכתובת hub.eladjak.com דרך cloudflared tunnel (שירות חינמי של Cloudflare שמחבר שרת ביתי לאינטרנט בלי לפתוח פורטים בפיירוול)",
        "הקוד יושב ב-`/opt/ai-factory/scripts/delegator.py` — קובץ פייתון אחד, בערך 5000 שורות. בלי dependency hell, בלי מיליון ספריות. רק stdlib (הספרייה הסטנדרטית של פייתון) + כמה ספריות רשת בסיסיות",
        "מעל 100 endpoints (נקודות קצה — כתובות שאליהן אפשר לפנות, כמו /email/send או /calendar/check). כל endpoint מטפל במשימה ספציפית",
        "ניהול סודות (secrets) מרוכז — מפתחות ה-API של Resend (שירות שליחת מיילים — שכבה חינמית של 100 מיילים ליום, מעבר לזה תשלום לפי נפח), Twilio (SMS — תשלום לפי הודעה), Google OAuth, Anthropic (Claude Sonnet 4.6 / Opus 4.7 / Haiku 4.5), OpenAI, Gemini, Perplexity (Pro API למחקר), fal.ai (יצירת תמונות/וידאו) — כולם ב-environment variables של השרת, אף פעם לא בקוד ולא ב-Git",
        "Dashboards ציבוריים (עמודי בקרה ב-HTML) שרצים על אותו שרת: `/launcher` (תפריט הסוכנים), `/hub` (מצב הרשת), `/costs/llm` (עלויות LLM), `/calendar/publishing-status` (מה מותר לפרסם עכשיו)",
        "אצלי: מרכז את 10 הסוכנים מאחורי שער אחד. אצלכם: יכול לשמש כ-gateway לרשת multi-agent משלכם, או להחליף Zapier/Make כשהם נעשים יקרים מדי",
      ],
    },
    {
      id: "routes",
      icon: Route,
      title: "מעל 100 endpoints — מה יש בתוך השער",
      subtitle: "לא רק צינור — גם לוגיקה עסקית אמיתית",
      description:
        "endpoint היא כתובת ספציפית בשרת שעונה למשימה מסוימת. למשל POST /email/send לשליחת מייל, או GET /calendar/check לבדיקת לו\"ז. Delegator מחזיק מעל 100 כאלה, מחולקים לפי תחומי אחריות. זה לא רק middleware (שכבת תיווך שמעבירה בקשות לשירות אחר) — יש כאן גם לוגיקה עסקית אמיתית, למשל שער שבודק אם מותר לפרסם עכשיו, או router שמחליט איזה LLM להפעיל לפי עלות.",
      color: "from-violet-600 to-purple-500",
      difficulty: "intermediate",
      content: [
        "פרסום ותפוצה: `/postiz/post` (פוסט לרשתות חברתיות דרך Postiz), `/campaign-email` (קמפיין מייל שיווקי), `/social-post` (פרסום כללי), `/sms/send` (SMS דרך Twilio), `/content-studio/publish` (פרסום תוצרי content studio)",
        "Pipelines של AI: `/research` (חקר נושא דרך Perplexity או Gemini), `/landing-page` (יצירת דף נחיתה מלא), `/pipeline/full` (השרשרת המלאה מרעיון ועד פרסום), `/content-studio/generate` (יצירת תוכן)",
        "Google Workspace: `/gmail/send` ו-`/gmail/search` (מייל), `/calendar/check` (בדיקת זמינות), `/drive/search` (חיפוש קבצים), `/docs/create` (יצירת מסמך חדש)",
        "תשתית וניטור: `/health/agents` (מי מהסוכנים חי), `/network/memory` (זיכרון משותף של הרשת שמתנקז ל-[Qdrant](/guide/qdrant)), `/kaylee/report` (דיווחים מ-[Kaylee](/guide/kaylee)), `/claude-code/enqueue` (תור משימות ל-[Claude Code](/claude-code))",
        "נתונים עסקיים: `/projects`, `/campaigns`, `/groups`, `/bank/transactions` (שאיבה מהבנק), `/routines` (שגרות יומיות)",
        "עמודי בקרה ב-HTML: `/hub`, `/launcher`, `/costs`, `/costs/llm`, `/coach/dashboard` (של [Box](/guide/box)), `/box/calendar.ics` (iCal ליומן כושר)",
        "ניתוב LLM חכם: `/llm/route` — 4 שכבות fallback (חזרה אחורה כשיש כשל) מחינמי לחלוטין ועד ל-Claude בתשלום",
      ],
    },
    {
      id: "gateway",
      icon: Plug,
      title: "דפוס Gateway — אחריות מרוכזת במקום מפוזרת",
      subtitle: "כשכולם עוברים דרך אותו שער, אפשר לנהל אותם מאותו מקום",
      description:
        "Gateway pattern הוא עיקרון אדריכלות תוכנה שבו במקום שכל רכיב ברשת ידבר ישירות עם שירותים חיצוניים, כולם מנותבים דרך שער מרכזי אחד. הרווח: כל מה שרוצים לבדוק או לאכוף על כל הרשת — אפשר להוסיף פעם אחת ב-Gateway, והשינוי חל על כולם באופן אוטומטי. רוצים להוסיף log לכל בקשה? שורה אחת. רוצים להגביל כמה בקשות בדקה כל סוכן יכול לשלוח (מה שנקרא rate limit)? שורה אחת.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "intermediate",
      content: [
        "אימות מרכזי (Central auth): היום אימות פשוט במפתח API, בעתיד אפשר להוסיף JWT (JSON Web Token — תקן מקובל לייצור אסימוני גישה חתומים עם תוקף) בשכבת middleware (קוד שרץ לפני כל endpoint)",
        "הגבלת קצב (Rate limiting): cap (תקרה) אחיד לכל סוג משתמש. הסוכנים לא צריכים לסנכרן ביניהם כמה בקשות נשלחו — השער יודע",
        "לוגים מובנים (Structured logs): כל בקשה נרשמת בפורמט JSON אחיד עם agent, endpoint, status, latency. אחר כך אפשר לחתוך את הנתונים לפי הסוכן שביקש או לפי סוג הפנייה",
        "ניסיונות חוזרים (Retries): אם שירות חיצוני כמו Resend נופל לרגע, Delegator ינסה שוב ברקע. הסוכן שקרא לא צריך לדעת שהיה כשל זמני",
        "שמירת מצב במטמון (Caching): נתוני Hebcal (לוח שנה עברי), tokens של Google OAuth ונתונים אחרים שלא משתנים בתדירות גבוהה נשמרים בזיכרון למשך זמן מוגדר, בלי צורך לקרוא לכל API מחדש",
        "Feature flags (מתגי פיצ'רים): רוצים לכבות endpoint מסוים זמנית, למשל בזמן תחזוקה? שורה אחת של קוד — וכולם מושפעים מיד",
      ],
      tips: [
        "טיפ שלמדתי בדרך הקשה: גם כש-Delegator וסוכן יושבים על אותו שרת פיזי, הסוכן עדיין פונה אליו דרך HTTP (ולא מייבא אותו כספרייה פנימית). זה נראה כמו בזבוז של 2ms, אבל זה מקטין דרמטית את ה-coupling (תלות הדוקה בין רכיבים). מחר תרצו להעביר את הסוכן לשרת אחר — ולא תצטרכו לשנות שורת קוד",
      ],
    },
    {
      id: "calendar",
      icon: Globe,
      title: "שער הלוח העברי — חובה בישראל",
      subtitle: "חסימה אוטומטית של פרסום בשבת, חג, יום הזיכרון",
      description:
        "זו שכבת הגנה ייחודית שהוספתי ל-Delegator אחרי כמה מקרים מביכים. הרעיון: לפני שכל endpoint של פרסום מבצע את הפעולה, הוא בודק את הלוח העברי-ישראלי דרך שירות בשם Hebcal. אם עכשיו שבת, חג, יום הזיכרון לחללי מערכות ישראל או יום הזיכרון לשואה — הוא פשוט מסרב לפרסם תוכן שיווקי, ומחזיר הודעה מנומסת עם זמן החזרה לפעילות. זה פועל בתור middleware על כל endpoint פרסום ברשת.",
      color: "from-amber-600 to-orange-500",
      difficulty: "advanced",
      beginner:
        "תארו לעצמכם: יום הזיכרון, 11:00 בבוקר, צפירה. באותו רגע אחד הסוכנים שלי (אולי [Adopter](/guide/adopter)) מחליט לפרסם פוסט עם כותרת 'מבצע סוף שבוע!'. בושה ציבורית. Delegator מונע את זה אוטומטית — הוא עוצר את הבקשה ומחזיר תשובה: 'פרסום שיווקי חסום עד השעה 20:00'. הסוכן יודע שזה לא באג אלא שער תרבותי, ומתזמן את עצמו לפרסם אחר כך.",
      content: [
        "הפונקציה הפנימית `_il_calendar_status()` פונה ל-Hebcal API (שירות חינמי של לוח עברי) ושומרת את התשובה ב-cache למשך 6 שעות, כדי לא להציף את Hebcal בבקשות",
        "שלוש קטגוריות רגישות: `shabbat_chag` (שבת וחגי ישראל — חסימה חזקה), `solemn_modern` (יום הזיכרון, יום השואה — חסימה של תוכן שיווקי), `celebratory_modern` (יום העצמאות — תוכן חגיגי מותר, אגרסיבי שיווקי לא)",
        "Buffer של 30 דקות לפני הדלקת נרות, ו-40 דקות אחרי צאת הכוכבים — כמו שמקובל בהלכה. לא מפרסמים 'בדיוק בשעה 17:30' אם השבת נכנסת ב-17:32",
        "כל קריאה לפרסום יכולה להכיל בתוך ה-payload (תוכן הבקשה) שדה `content_type` עם אחד מהערכים: `generic` (רגיל), `critical` (קריטי — עובר תמיד), `condolence` (תנחומים — עובר ביום הזיכרון), `il_celebration` (תוכן חגיגי — עובר ביום העצמאות)",
        "`critical` עוקף את השער — למשל התראה על מערכת שנפלה חייבת להישלח גם בשבת",
        "סטטוס ציבורי ב-`GET /calendar/publishing-status` — מחזיר JSON + עמוד HTML יפה עם רענון אוטומטי, כדי שתמיד תדעו מה מותר עכשיו",
      ],
      codeExample: {
        label: "דוגמת תגובה מ-Delegator כשניסו לפרסם ביום הזיכרון",
        code: '{\n  "sensitive": true,\n  "category": "solemn_modern",\n  "reason": "Yom HaZikaron — פרסום שיווקי חסום עד שקיעה.",\n  "resume_at_iso": "2026-04-21T19:30:00"\n}',
      },
    },
    {
      id: "costs",
      icon: Zap,
      title: "מעקב עלויות — מי מהסוכנים אוכל כמה",
      subtitle: "Dashboard שמראה בזמן אמת איזה סוכן הוציא כמה על LLM",
      description:
        "קריאות ל-LLM (מודלי שפה כמו Claude, Gemini, GPT) הן ההוצאה הכי גדולה ברשת סוכנים אוטונומית, ובלי מעקב זה יכול להתפוצץ לחשבון דמיוני בסוף החודש. הוספתי ל-Delegator מנגנון שמתעד כל קריאת LLM שעוברת דרכו: באיזה tier (שכבה) השתמש, באיזה model, מי הסוכן שביקש, כמה tokens נכנסו, כמה יצאו, וכמה זמן זה לקח. אפשר אחר כך לחתוך את הנתונים ולראות למשל ש-'Kami צרך 40% מתקציב ה-LLM החודשי'.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "intermediate",
      content: [
        "הפונקציה הפנימית `_log_llm_call(tier, model, requester, tokens_in, tokens_out, latency)` רצה אחרי כל קריאה מוצלחת — בלי פגיעה בזמן התגובה של הסוכן",
        "הנתונים נרשמים בפורמט JSONL (שורת JSON אחת לכל אירוע) בקובץ `/opt/ai-factory/data/costs/llm-calls.jsonl`. פורמט פשוט שקל לחתוך עם `grep`, עם pandas או עם כל כלי אחר",
        "Dashboard חי בכתובת `/costs/llm` מתרענן כל 60 שניות — pivot לפי סוכן, לפי מודל, לפי tier או לפי תאריך",
        "4 שכבות עלות (tiers): `ollama-local` (חינם לגמרי, רץ מקומית על [Ollama](/guide/ollama)), `gemini-flash` (שכבה חינמית של Gemini 2.5 Flash — ~15 RPM ומכסת tokens יומית נדיבה דרך Google AI Studio), `stepfun-openrouter` (מודל StepFun עם suffix `:free` ב-OpenRouter — מוגבל ב-~50 בקשות ליום בלי קרדיט, או 1000/יום עם 10 דולר קרדיט), `claude-sonnet` (Claude Sonnet 4.6 בתשלום — 3 דולר לכל מיליון tokens נכנסים, 15 דולר יוצאים)",
        "אצלי: העלות בפועל של [Claude Sonnet 4.6](/claude-code) יוצאת בסביבות 2-5 דולר בחודש, כי הוא משמש רק כ-fallback חירום. רוב העבודה נעשית ב-Gemini Flash החינמי",
      ],
      tips: [
        "הוסיפו מעקב עלויות כבר ביום הראשון של הפרויקט, לפני שיש בכלל מה לעקוב אחריו. אחרת מגלים חודש אחרי השקה שמשהו רץ ב-loop ושרף 200 דולר — ואין שום דרך לדעת איזה endpoint אחראי לזה",
      ],
    },
    {
      id: "llm-route",
      icon: Layers,
      title: "ניתוב LLM — תמיד חינמי קודם",
      subtitle: "endpoint אחד, 4 שכבות fallback אוטומטיות, 0 דולר ברוב הזמן",
      description:
        "במקום שכל סוכן יחליט בעצמו לאיזה מודל LLM לקרוא (ומתי ליפול בחזרה למודל אחר אם יש כשל), Delegator חושף endpoint אחד בשם `/llm/route`. הסוכן שולח את הפרומפט עם system prompt ומגבלת tokens, ו-Delegator מחליט בעצמו: מנסה קודם את המודל הזול ביותר (חינמי), ואם הוא נכשל עובר לבא בתור, וכך הלאה עד שמשהו עובד. התשובה כוללת גם באיזה tier ובאיזה model בפועל ענו, כדי שהסוכן ידע.",
      color: "from-pink-600 to-rose-500",
      difficulty: "advanced",
      content: [
        "שכבה 1 — Ollama Local: אם [Ollama](/guide/ollama) (סביבת הרצה של מודלים מקומית) רץ על אותו שרת עם המודל qwen3:4b טעון — הקריאה חינמית לחלוטין, והמהירה ביותר. דורש זיכרון RAM של 8GB ומעלה ורצוי GPU",
        "שכבה 2 — Gemini 2.5 Flash: השכבה החינמית של Google AI Studio (~15 RPM ומכסת tokens יומית נדיבה). איכות מצוינת לרוב המשימות, כולל עברית. Gemini 2.5 Pro בתשלום זמין כשדרוג",
        "שכבה 3 — StepFun דרך OpenRouter: מודל סיני חזק עם suffix של `:free` ב-OpenRouter. השכבה החינמית מוגבלת ל-~50 בקשות ליום (או ~1000/יום אם יש לכם 10 דולר קרדיט ב-OpenRouter). שימושי כ-fallback נוסף",
        "שכבה 4 — Claude Sonnet 4.6: בתשלום, משמש רק אם כל הקודמים נכשלו. הגדרתי אותו כ-fallback חירום בלבד. כאופציה אפשר גם להוסיף Haiku 4.5 (זול יותר) או Opus 4.7 (ל-reasoning כבד)",
        "פורמט התגובה: `{ok, tier, model, latency_ms, cost_usd_estimate, response, tried: [...]}` — כולל רשימה של כל המודלים שניסיתי לפני ההצלחה",
        "יש טבלת pricing פנימית ב-Delegator שמחשבת cost_usd_estimate מדויק לפי tokens_in × tokens_out × תעריף הספק",
      ],
      tips: [
        "אם אתם מתחילים: השתמשו רק בשכבה 2 (Gemini Flash). Ollama דורש GPU לביצועים הגיוניים, וזה overhead שלא שווה בהתחלה. כשהפרויקט יגדל — אז כדאי להוסיף עוד שכבות",
      ],
    },
    {
      id: "advanced",
      icon: Lightbulb,
      title: "טיפים מתקדמים מ-6 חודשי production",
      subtitle: "הניואנסים שהופכים API gateway פשוט למשהו יציב ואמין",
      description:
        "זה לא מדריך תיאורטי — כל הדברים כאן נבנו מכישלונות שעברתי בדרך. אלה הלקחים מתחזוקה שוטפת של Delegator במשך חצי שנה.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      content: [
        "אי-שימוש ב-framework הוא יתרון — אבל דורש לבנות את ה-middleware בעצמכם: logging, CORS (הרשאות דפדפן בין דומיינים), auth. לוקח יום, אבל אחר כך אתם בשליטה מלאה",
        "חשיפה לאינטרנט דרך cloudflared tunnel (שירות חינמי של Cloudflare) — אין צורך לפתוח פורטים בפיירוול, אין צורך ב-IP סטטי, ואין חשיפה של השרת הביתי לסריקות רשת",
        "שמרו state (מצב) רק במקומות מוגדרים — קבצים על הדיסק, מסד נתונים, Qdrant. in-memory state (משתנים בזיכרון של התהליך) לא שורד restart של השירות ויגרום לבאגים מוזרים",
        "השירות רץ דרך systemd (מנהל השירותים של לינוקס) עם הגדרת `Restart=always` — אם הקוד קורס מסיבה כלשהי, הוא קם אוטומטית תוך 5 שניות",
        "ה-Dashboards ב-HTML מיוצרים על ידי Delegator עצמו בשיטת server-side rendering (הרכבת ה-HTML בשרת לפני השליחה). בלי React, בלי SPA, בלי build step — פשוט מחרוזת HTML שמתקבלת מהשרת",
        "גיבוי: בכל patch משמעותי אני שומר עותק עם timestamp (`delegator.py.bak-sprint-6.7`) — כך, אם משהו נשבר, rollback הוא שינוי של שם קובץ אחד",
      ],
      tips: [
        "חשוב להבין: Delegator לא מיועד להיות API ציבורי של מוצר לקוחות. זה internal gateway לתקשורת בין הסוכנים שלי. אל תחשפו אותו לאינטרנט בלי שכבת אימות אמיתית (JWT או mTLS), ואל תתנו ללקוחות הקצה לגשת אליו ישירות",
      ],
    },
  ],
  resources: [
    {
      title: "GitHub — Delegator code",
      description: "הקוד המלא ב-delegator.py",
      href: "https://github.com/eladjak",
      icon: Github,
    },
    {
      title: "Cloudflared",
      description: "Tunnel חינמי לחשיפה ציבורית",
      href: "https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/",
      icon: ExternalLink,
    },
    {
      title: "Hebcal API",
      description: "Calendar data לישראל + יהודי",
      href: "https://www.hebcal.com/home/developer-apis",
      icon: ExternalLink,
    },
    {
      title: "המדריך ל-Kami",
      description: "משתמש ב-delegator ל-email, research, content",
      href: "/guide/kami",
      icon: BookOpen,
    },
    {
      title: "המדריך ל-CrewAI",
      description: "Crews נגישים דרך delegator",
      href: "/guide/crewai",
      icon: BookOpen,
    },
    {
      title: "שיחת ייעוץ Architecture",
      description: "רוצים gateway לרשת שלכם?",
      href: "/contact",
      icon: Mail,
    },
  ],
  ctaTitle: "Gateway אחד מחליף 5 אינטגרציות",
  ctaSub:
    "Python פשוט, cloudflared חינמי, והתוצאה — רשת סוכנים שקל לתחזק.",
  primaryCta: {
    label: "המדריך ל-Kami",
    href: "/guide/kami",
    icon: BookOpen,
  },
  secondaryCta: {
    label: "שיחת ייעוץ",
    href: "/contact",
    icon: Users,
  },
  authorBio:
    "Delegator חי אצלי 6 חודשים, ~5000 שורות קוד, 100+ endpoints. הגרסה הראשונה הייתה 200 שורות. הוא גדל עם הצורך — כל feature שצץ בכמה סוכנים עבר דרכו. המדריך מבוסס על הגדילה הזו.",
};
