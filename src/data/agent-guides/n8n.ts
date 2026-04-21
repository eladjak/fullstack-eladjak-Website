import {
  Workflow,
  Zap,
  Plug,
  Webhook,
  Clock,
  GitBranch,
  Network,
  Github,
  ExternalLink,
  BookOpen,
  Code2,
  Rocket,
  Lightbulb,
  Users,
  Mail,
  Settings,
  Layers,
  Database,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const n8nGuide: AgentGuideData = {
  slug: "n8n",
  agentName: "n8n",
  agentNameHe: "n8n — פלטפורמת אוטומציות ויזואלית",
  category: "infra",
  logoImage: "/images/guide-logos/n8n-logo.png",
  tagline: "Zapier בקוד פתוח — 500+ אינטגרציות מובנות, self-hosted, ללא מגבלת executions",
  heroDescription:
    "n8n זו פלטפורמה חינמית וקוד פתוח מבית n8n GmbH — חברה גרמנית בוגרת, בוגרת Series B — שמאפשרת לבנות אוטומציות מורכבות בלי לכתוב כמעט שורת קוד. אתם בוודאי מכירים שירותים כמו Zapier או Make — אלה המערכות שמחברות בין האפליקציות השונות שלכם ומבצעות משימות אוטומטיות (למשל: 'כשמגיע אימייל חדש מלקוח, שמור אותו ב-Google Sheets, שלח הודעת וואטסאפ לצוות ופתח כרטיס ב-Trello'). הבעיה עם Zapier ו-Make היא המחיר — Zapier Starter עומד על 29$ לחודש (750 משימות), Zapier Professional על 73$ לחודש (2,000 משימות), ו-Zapier Team על 103$ למשתמש לחודש; Make יותר נדיב (Core ב-10.59$ לחודש, Pro ב-18.82$ לחודש), אבל עדיין עולה ככל שהשימוש גדל. n8n לוקחת את אותו רעיון בדיוק, פותחת את הקוד בחינם, ומאפשרת לכם להריץ אותה אצלכם על השרת — בלי מגבלת כמות אוטומציות, ובלי צורך לשלם לאף אחד (התוכנית המנוהלת של n8n, אם ממש רוצים, מתחילה ב-20$ לחודש עם 2,500 executions). הממשק שלה ויזואלי לחלוטין ונוח להבנה: גוררים קופסאות למסך (כל קופסה מייצגת פעולה — קריאת אימייל, שליחת הודעה, חישוב משהו, שמירה במסד נתונים) ומחברים ביניהן בקווים. מעל 500 קופסאות מובנות לכל שירות פופולרי — Gmail, Slack, Postgres, Google Sheets, AI Agent, Vector Store (Qdrant, Pinecone, Supabase Vector), LangChain, מודלי AI כמו ChatGPT ו-[Claude](/claude-code), ואפילו סוכנים מהרשת שלי כמו [Kami](/guide/kami) ו-[CrewAI](/guide/crewai). אצלי n8n מריצה 25 אוטומציות עסקיות שחוסכות לי שעות בשבוע (הפקת חשבוניות, פרסום תוכן, מעקב אחרי ביצועי סוכנים) — אצלכם היא יכולה להחליף לגמרי את Zapier ו-Make, או לשמש כ'דבק' שמחבר את כל המערכות הפנים-ארגוניות שלכם.",
  badgeText: "2026 · Workflow Automation · מדריך מעשי",
  canonical: "https://fullstack-eladjak.co.il/guide/n8n",
  heroBgImage: "/images/guides/guide-n8n-hero.jpg",
  videoUrl: "/videos/guides/n8n.mp4",
  stats: [
    { label: "nodes מובנים", value: "500+" },
    { label: "executions", value: "ללא הגבלה" },
    { label: "עלות self-host", value: "0$" },
    { label: "אינטגרציות אצלי", value: "25" },
  ],
  paradigmTitle: "למה לא Zapier?",
  paradigmSub:
    "Zapier נהדר עד שאתם מגיעים ל-29$/חודש על 750 משימות (ו-73$ ל-2,000). n8n לוקח את כל היכולת, פותח אותה, ומוסיף יכולת לכתוב JS בתוך ה-workflow.",
  paradigmShifts: [
    {
      before: "Zapier Starter 29$/חודש — 750 משימות",
      after: "n8n על Hetzner CPX11 בכ-4.75€/חודש — executions אינסופיים",
      icon: Zap,
    },
    {
      before: "לוגיקה מורכבת = להוסיף Code by Zapier ($$)",
      after: "Code node ב-n8n — JS מלא חינם",
      icon: Code2,
    },
    {
      before: "נעילה ב-vendor, אין גישה ל-workflows",
      after: "self-hosted, גיבוי ב-Postgres, export ל-JSON",
      icon: GitBranch,
    },
    {
      before: "אין אינטגרציה לסוכן AI פרטי",
      after: "HTTP node → hub.eladjak.com/kami/whatsapp",
      icon: Network,
    },
  ],
  whoIsThisFor: [
    {
      title: "צוותי ops קטנים",
      description:
        "רוצים workflows בלי לגעת בקוד, אבל לא רוצים לשלם 103$ למשתמש/חודש ל-Zapier Team.",
      icon: Users,
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "יזמים solo",
      description:
        "קשרים אוטומטיים בין Gmail, WhatsApp, Google Sheets, ו-CRM הקטן — הכל ב-workflow אחד.",
      icon: Rocket,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "מפתחים עם צד עסקי",
      description:
        "Code node מאפשר לשלב n8n עם שרתים ו-DBs פנימיים. מהיר יותר מלבנות Integration platform מאפס.",
      icon: Code2,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "צוותי AI שדורשים automation",
      description:
        "לחבר Claude/Kami/CrewAI ל-ops tools — email, calendar, CRM, invoicing — בלי backend חדש.",
      icon: Workflow,
      color: "from-violet-500 to-purple-500",
    },
  ],
  toc: [
    { id: "what-is", label: "מה זה" },
    { id: "install", label: "התקנה" },
    { id: "nodes", label: "nodes וטריגרים" },
    { id: "agents", label: "חיבור לסוכנים" },
    { id: "advanced", label: "לוגיקה מתקדמת" },
    { id: "production", label: "בייצור" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Workflow,
      title: "n8n — מה הוא בגישה טכנית",
      subtitle: "Workflow engine + ממשק ויזואלי + 500+ מתאמים מובנים",
      description:
        "n8n זו פלטפורמת אוטומציות ויזואלית בקוד פתוח מבית n8n GmbH (חברה גרמנית בוגרת Series B) — דמיינו 'Zapier בקוד פתוח' שאתם מריצים בעצמכם על שרת, בלי מגבלה של כמה אוטומציות אתם מפעילים בחודש. תחת מכסה המנוע יש שלוש שכבות: (1) מנוע ביצוע כתוב ב-Node.js שמריץ את האוטומציות (ב-n8n קוראים לכל אוטומציה 'workflow' — זרימת עבודה), (2) בסיס נתונים (PostgreSQL או SQLite) ששומר את ה-workflows ואת היסטוריית הריצות, ו-(3) עורך ויזואלי יפה בדפדפן שבו גוררים קופסאות ומחברים ביניהן בקווים. אצלי (אלעד) n8n הוא פס הייצור החכם של הרשת — ~25 workflows שמחברים את [Kami](/guide/kami), [CrewAI](/guide/crewai), ו-[Qdrant](/guide/qdrant) עם שירותים חיצוניים כמו Gmail, Slack ו-WhatsApp.",
      color: "from-pink-600 to-rose-500",
      difficulty: "beginner",
      beginner:
        "תחשבו על n8n כמו פס ייצור במפעל: על הפס יש תחנות (nodes), וכל תחנה עושה פעולה אחת — 'קרא אימייל חדש', 'שלח הודעת וואטסאפ', 'שמור ב-Google Sheets'. אתם בונים את הפס פעם אחת על ידי גרירת תחנות ויצירת חיבורים ביניהן — ומאותו רגע, בכל פעם שמגיע טריגר (למשל אימייל חדש), הפס רץ אוטומטית ומבצע את כל הפעולות בשרשרת. לעומת Zapier שגובה 29$ בחודש על 750 משימות (ו-73$ על 2,000), n8n על VPS ב-Hetzner CPX11 בכ-4.75€ בחודש נותן לכם ריצות אינסופיות — חיסכון של עשרות עד מאות דולרים בחודש כבר מהיום הראשון.",
      content: [
        "node — תחנה אחת בפס הייצור. כל node מבצע פעולה אחת (שליחת אימייל, קריאה מ-API, שאילתה ל-DB). יש 500+ nodes מובנים (ועוד מאות nodes בקהילה) ואפשרות לכתוב משלכם. חידושים עכשוויים: AI Agent node, Vector Store nodes (Qdrant, Pinecone, Supabase Vector), ו-LangChain nodes",
        "trigger node — הנקודה שמפעילה את ה-workflow: Webhook (מקבל בקשת HTTP), Cron (רץ לפי זמן מתוזמן כמו 'כל יום ב-09:00'), Gmail Trigger (כשמגיע אימייל חדש) ועוד",
        "workflow — ה-DAG (גרף מכוון ללא מעגלים) של כל ה-nodes המחוברים ביניהם. הנתונים זורמים מ-node ל-node דרך החיבורים שציירתם בעורך הויזואלי",
        "expression — שפת תבניות פנימית בסגנון {{$json.field}} ששולפת ערכים מה-node הקודם. מאפשרת להשתמש בתוצאה של שלב אחד כקלט לשלב הבא, בלי לכתוב קוד",
        "credentials — סיסמאות, מפתחות API ו-tokens נשמרים בנפרד במאגר מוצפן. מגדירים פעם אחת, משתמשים בכל ה-workflows — ואפשר להחליף מפתח חדש במקום אחד",
        "webhook — כתובת URL ייחודית שמייצרת n8n, וכל בקשת HTTP שמגיעה אליה מפעילה את ה-workflow. הדרך הנפוצה לחבר שירותים חיצוניים (כמו Postiz או Resend) אל n8n",
        "rate limit — מגבלה שהרבה APIs מפעילים (למשל 'מקסימום 60 בקשות בדקה'). n8n מטפל בזה עם Wait node שמשהה בין פעולות, כדי שלא תיחסמו",
      ],
      tips: [
        "העורך תומך ב-undo/redo מלא ובהיסטוריית גרסאות — אל תפחדו לנסות ולשבור, קל לחזור אחורה",
        "כפתור 'Execute Node' על node ספציפי מריץ רק אותו (ולא את כל ה-workflow) — חוסך שעות דיבוג במיוחד ב-workflows ארוכים",
        "Pinned Data — טכניקה מנצחת: 'נועלים' את התוצאה של ריצה מוצלחת אחת ואז בודקים את ה-nodes שבהמשך עם אותה data, בלי להריץ את הכל מחדש",
      ],
    },
    {
      id: "install",
      icon: Settings,
      title: "התקנה ב-Docker",
      subtitle: "VPS + compose = n8n רץ ב-5 דקות",
      description:
        "הדרך המומלצת להריץ n8n בייצור היא דרך [Docker](/guide/docker) עם docker-compose — קובץ אחד שמגדיר את n8n + בסיס נתונים PostgreSQL + reverse proxy (Caddy או Traefik) שמספק HTTPS אוטומטי. ההתקנה עצמה לוקחת דקות ספורות, והתוצאה היא אינסטנס פרטי לחלוטין בבעלותכם — עם workflows ללא הגבלת executions, מה שהופך את החיסכון מול Zapier למיידי ומשמעותי.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "intermediate",
      beginner:
        "אצלי (אלעד) n8n רץ על ה-VPS הראשי ב-Hetzner יחד עם שאר הסוכנים ברשת. אצלכם, אפילו VPS קטן של Hetzner (CX11 בכ-4.15€/חודש או CPX11 בכ-4.75€/חודש), DigitalOcean Droplet (מ-4$/חודש) או Contabo (מ-~4.50€/חודש עם משאבים נדיבים בהרבה) יספיק להרצת n8n + Postgres. הקובץ compose.yml הוא פחות מ-30 שורות, הפקודה להרים את הכל היא docker compose up -d, ו-Caddy דואג לתעודת HTTPS חינמית אוטומטית מ-Let's Encrypt. תוך חצי שעה יש לכם פלטפורמת אוטומציות מקצועית, והחיסכון מול Zapier Starter (29$/חודש) משתלם כבר מהשבוע הראשון.",
      content: [
        "image רשמית: n8nio/n8n הגרסה היציבה מבוססת Node.js 20 וכוללת את כל 500+ ה-nodes המובנים (כולל AI Agent, Vector Store, LangChain) כברירת מחדל — אין צורך להתקין שום דבר נוסף",
        "PostgreSQL מומלץ במקום SQLite ברגע שיש יותר מ-5 workflows פעילים — SQLite מקרטע עם executions מקבילים, Postgres מטפל בזה בקלות",
        "env vars חשובים: N8N_HOST (הדומיין שלכם), N8N_PROTOCOL=https, WEBHOOK_URL (כתובת ציבורית ל-webhooks), ו-DB_POSTGRESDB_* (פרטי חיבור למסד)",
        "volumes: התיקייה /home/node/.n8n שומרת credentials מוצפנים + קבצים מקומיים — חייבים למפות אותה ל-volume, אחרת כל הנתונים ייעלמו עם restart",
        "reverse proxy: Caddy עם auto-HTTPS הוא הכי פשוט (שורה אחת של הגדרה); Traefik עם labels של Docker הוא אלטרנטיבה טובה אם כבר יש לכם stack כזה",
        "backup: pg_dump יומי של ה-DB + ייצוא workflows ל-JSON שבועי. n8n כולל git sync בגרסאות החדשות — מומלץ לחבר לריפו פרטי",
      ],
      tips: [
        "הגדירו N8N_ENCRYPTION_KEY קבוע מראש ושמרו אותו במקום בטוח — אם ישתנה אי-פעם, כל ה-credentials המוצפנים יימחקו ותצטרכו להזין הכל מחדש",
        "הקצו לפחות 1GB RAM ו-10GB disk. execution history ונתונים נצברים מהר — במיוחד אם יש workflows שרצים כל 5 דקות",
        "ב-Hetzner, DigitalOcean ו-Railway יש images מוכנות של n8n — לחיצה אחת ואתם באוויר, בלי להתעסק עם compose.yml ידנית",
      ],
      codeExample: {
        label: "docker-compose.yml ל-n8n",
        code: "version: '3.8'\nservices:\n  postgres:\n    image: postgres:16-alpine\n    restart: unless-stopped\n    environment:\n      POSTGRES_DB: n8n\n      POSTGRES_USER: n8n\n      POSTGRES_PASSWORD: ${DB_PASSWORD}\n    volumes: ['./data/postgres:/var/lib/postgresql/data']\n  n8n:\n    image: n8nio/n8n:latest\n    restart: unless-stopped\n    ports: ['5678:5678']\n    environment:\n      DB_TYPE: postgresdb\n      DB_POSTGRESDB_HOST: postgres\n      DB_POSTGRESDB_DATABASE: n8n\n      DB_POSTGRESDB_USER: n8n\n      DB_POSTGRESDB_PASSWORD: ${DB_PASSWORD}\n      N8N_ENCRYPTION_KEY: ${ENCRYPTION_KEY}\n      WEBHOOK_URL: https://n8n.yourdomain.com\n    depends_on: [postgres]\n    volumes: ['./data/n8n:/home/node/.n8n']",
      },
    },
    {
      id: "nodes",
      icon: Plug,
      title: "nodes עיקריים וטריגרים",
      subtitle: "20 nodes שפותרים 90% מהמשימות",
      description:
        "למרות ש-n8n מגיע עם 500+ nodes מובנים (ועוד מאות בקהילה), האמת היא שבכל ה-workflows שלי — 25 מהם בייצור — חוזרים בערך 20 nodes בסיסיים שפותרים 90% מהמשימות. להכיר את הכלים האלה לעומק זה ההבדל בין בניית workflow בחצי שעה לבין יום שלם של תסכול.",
      color: "from-purple-600 to-violet-500",
      difficulty: "intermediate",
      content: [
        "טריגרים (נקודות הפעלה): Webhook (מקבל בקשות HTTP), Cron (לפי לוח זמנים — 'כל יום ב-09:00'), Manual (להרצה ידנית לבדיקה), Gmail Trigger (אימייל חדש נכנס), Telegram Trigger (הודעה חדשה בבוט), RSS (פוסט חדש בפיד), IMAP (שרת מייל כללי)",
        "HTTP Request — ה-node הכי חשוב בכלל: שליחה ל-API חיצוני עם POST/GET/PUT, תמיכה בכל סוגי ה-authentication (Bearer, Basic, OAuth2, API Key), retry אוטומטי על כשלונות ו-pagination מובנה",
        "לוגיקה וזרימה: IF (תנאי if/else קלאסי), Switch (כמו switch/case — ניתוב ל-5+ ענפים), Merge (איחוד שני זרמי נתונים), Split In Batches (לעבוד על רשימה בקבוצות קטנות), Loop (חזרה על פעולה)",
        "טרנספורמציה של נתונים: Set (הגדרת שדות JSON חדשים), Code (כתיבת JavaScript או Python inline — כלי הצלה שמחליף 10 nodes מתוחכמים), Function, Item Lists",
        "אינטגרציות אימייל: Gmail, Outlook, SMTP גנרי, Mailchimp, Resend — אצלי שולחים הכל דרך Resend כי יש API נקי וחינם עד 3000 מיילים בחודש",
        "אינטגרציות מסרים: Slack, Discord, Telegram — לוואטסאפ יש node לא-רשמי, אצלי עוקפים אותו ושולחים דרך [Kami](/guide/kami) עם HTTP Request",
        "בסיסי נתונים: Postgres, MySQL, MongoDB, Airtable, Google Sheets, Notion — הנוחות של Google Sheets כ-'DB קטן' לא יסולא בפז לפרויקטים קטנים",
        "AI: AI Agent node (חדש), OpenAI, Anthropic ([Claude](/claude-code)), [Ollama](/guide/ollama) (מודלים מקומיים חינם), LangChain nodes, HuggingFace — שרשור של LLMs וסוכנים הפך בן רגע לטבעי",
        "בסיסי נתונים וקטוריים: [Qdrant](/guide/qdrant), Pinecone, Weaviate, Supabase Vector — לחיפוש סמנטי וזיכרון של סוכנים",
      ],
      tips: [
        "HTTP Request תומך ב-'Import cURL' — מדביקים פקודת curl שהעתקתם מ-DevTools של הדפדפן, ו-n8n ממלא אוטומטית את כל השדות (URL, headers, body, auth). מנצח־חיים",
        "Code node תומך ב-async/await ובייבוא npm packages (עם רשימה מוגבלת של מותרים) — כשאתם צריכים לוגיקה שאין לה node מוכן, זה הכלי שפותר הכל",
        "Wait node — להשהות 5 שניות בין קריאות ל-API שיש לו rate limit של 12 בקשות בדקה. חיוני לעבודה עם OpenAI, Gmail ו-Resend כדי לא להיחסם",
      ],
    },
    {
      id: "agents",
      icon: Network,
      title: "לחבר n8n לסוכנים ברשת",
      subtitle: "n8n + Delegator + Kami + CrewAI",
      description:
        "כאן נכנס הכוח האמיתי של n8n אצלי: הוא לא רק רץ בעצמו — הוא המנצח על תזמורת של סוכני AI. דרך HTTP Request nodes, workflow אחד יכול לקרוא ל-[Kami](/guide/kami) שישלח הודעת וואטסאפ, ל-[CrewAI](/guide/crewai) שייצר פוסט בלוג בעברית, ול-[Delegator](/guide/delegator) שיתזמר קמפיין מייל שלם — כל זה ב-flow ויזואלי אחד, בלי לכתוב backend חדש.",
      color: "from-indigo-600 to-blue-500",
      difficulty: "advanced",
      content: [
        "שליחת וואטסאפ דרך [Kami](/guide/kami): HTTP Request עם POST ל-hub.eladjak.com/kami/whatsapp וגוף { to, text } — Kami מטפל בכל המורכבות של Green API ו-Meta API מאחורי הקלעים",
        "יצירת תוכן דרך [CrewAI](/guide/crewai): POST ל-/crews/blog_he/run ואז polling כל 10 שניות ל-/crews/runs/{id} עד שהסטטוס מגיע ל-completed. התוצאה חוזרת כ-JSON מוכן לפרסום",
        "קמפיין מייל דרך [Delegator](/guide/delegator): POST ל-/campaign-email — ה-Delegator דואג ל-rate limits של Resend, שומר על קרדיטים, ועוצר אוטומטית בשבת או חג דרך שער לוח השנה הישראלי",
        "שליחת SMS: POST ל-/sms/send של ה-Delegator (Twilio מאחור) — מגיע כ-SMS רגיל בתוך שניות, טוב לאימותים ולהתראות דחופות",
        "חיפוש סמנטי ב-[Qdrant](/guide/qdrant): HTTP Request ל-/collections/kami_memory/points/search עם embedding של השאלה — מאפשר לאסוף הקשר רלוונטי לפני קריאה ל-LLM",
        "יצירת תוכן מתוזמן: Cron כל בוקר → CrewAI (yt_to_blog_he ממיר סרטון יוטיוב לפוסט בעברית) → n8n מעצב ל-HTML → Delegator מפרסם לבלוג ומתזמן ל-social",
      ],
      tips: [
        "Webhook node של n8n יכול לקבל events משירותים חיצוניים — הפנו את ה-webhooks של Postiz, Resend ו-Green API אל n8n, ושם תחליטו מה לעשות עם כל אירוע",
        "שמרו את מפתחות ה-API של hub.eladjak.com ב-n8n credentials המוצפן ולא inline ב-expression — ככה אם תחליפו מפתח, תעדכנו במקום אחד ולא תרדפו אחרי 20 workflows",
        "בדקו workflows דרך הלשונית 'Executions' — היא מציגה כל ריצה עם נתיב מלא של הנתונים בין ה-nodes, כולל שגיאות מפורטות. כלי דיבוג נהדר",
      ],
      codeExample: {
        label: "Code node — לשלוח לקאמי מ-n8n",
        code: "// n8n Code node (JavaScript)\nconst msg = items[0].json.message;\nconst res = await $http.request({\n  method: 'POST',\n  url: 'https://hub.eladjak.com/kami/whatsapp',\n  headers: { 'X-API-Key': $env.KAMI_KEY },\n  body: { to: '972525427474', text: msg },\n});\nreturn [{ json: { sent: res.ok, messageId: res.data.id } }];",
      },
    },
    {
      id: "advanced",
      icon: Layers,
      title: "לוגיקה מתקדמת ו-expressions",
      subtitle: "IF/Switch, loops, error handling, sub-workflows",
      description:
        "ברגע ש-workflows הופכים רציניים (מעל 10 nodes, טיפול בכשלונות, לולאות על רשימות גדולות), הכלים הבסיסיים כבר לא מספיקים — וכאן נכנסות היכולות המתקדמות של n8n. expressions בסגנון JavaScript inline, לולאות על batches, sub-workflows שמאפשרים re-use של קוד, ו-error branches שמטפלים בכשלים בחן. אלה הכלים שהופכים את n8n מ-'Zapier בקוד פתוח' למנצח אוטומציות רציני.",
      color: "from-amber-600 to-orange-500",
      difficulty: "advanced",
      content: [
        "Expressions — JavaScript inline בתוך כל שדה של כל node. דוגמה: {{ $json.name.split(' ')[0] }} מוציא את השם הפרטי. זה מונע את הצורך ב-Set node נפרד לכל טרנספורמציה קטנה",
        "משתני זמן מובנים: $now ו-$today משתמשים בספריית Luxon. למשל {{ $now.minus({ days: 7 }).toISO() }} יחזיר את התאריך לפני שבוע ב-ISO — שימושי ל-APIs שדורשים טווחי זמן",
        "Split In Batches — לעבוד על מערך של 1000 פריטים בקבוצות של 10, מה שמונע קריסות זיכרון ועוזר לכבד rate limits של ה-API שאתם מפציצים",
        "Wait node — השהיה של שניות/דקות/שעות, או עד תאריך ספציפי. חשוב לתזמונים עדינים (למשל 'שלח תזכורת 3 ימים לפני האירוע')",
        "Error Workflow — workflow נפרד שמופעל אוטומטית כש-workflow ראשי נכשל. אצלי זה שולח התראה לוואטסאפ שלי דרך [Kami](/guide/kami) עם פרטי הכשל",
        "Sub-workflow — workflow אחד שקורא ל-workflow אחר (דרך Execute Workflow node). מאפשר re-use של קוד: למשל workflow 'שלח התראה' שנקרא מ-10 workflows אחרים",
        "Pinned Data + Test Workflow — 'נועלים' נתונים מריצה מוצלחת אחת, ואז מריצים רק את החצי השני של ה-workflow עם אותם נתונים קבועים. חיסכון עצום בדיבוג",
      ],
      tips: [
        "בכל Code node, עטפו את הקוד ב-try/catch והחזירו { error: message } בתוך ה-item במקום לזרוק — ככה ה-workflow ממשיך ואתם מטפלים בשגיאה ב-IF בהמשך",
        "ב-HTTP Request, הפעילו את האופציה 'On Error: Continue (with error output)' — זה שולח את השגיאה למוצא השני של ה-node, ואז תוכלו לטפל בה ב-IF או להמשיך בלי לקרוס",
        "ל-credentials של APIs עם rate limit נמוך — צרו 2-3 עותקים (כל אחד עם API key אחר) וחלקו אותם בין workflows. מכפיל את הקיבולת בלי לשלם יותר",
      ],
    },
    {
      id: "production",
      icon: Database,
      title: "n8n בייצור — מה חייבים לדאוג לו",
      subtitle: "backups, monitoring, scaling, security",
      description:
        "ברגע ש-workflows מתחילים להריץ תהליכים עסקיים חשובים (חשבוניות, תזכורות ללקוחות, פרסומי תוכן) — n8n מפסיק להיות 'כלי נחמד' והופך לתשתית קריטית. נפילה של שעה = לקוחות לא מקבלים הודעות, קמפיינים לא יוצאים לדרך, כסף הולך לאיבוד. הנה ה-checklist שצריך לסדר לפני שמגיעים לשם.",
      color: "from-rose-600 to-pink-500",
      difficulty: "advanced",
      content: [
        "Backups — pg_dump יומי אוטומטי של מסד הנתונים + העלאה ל-S3 או Backblaze (זול יותר), יחד עם ייצוא workflows ל-JSON שבועי. ככה גם שחזור מלא אפשרי תוך דקות",
        "Monitoring — Uptime Kuma בודק את /healthz של n8n כל דקה. כשהשירות נופל, התראה מיידית ל-Telegram או לוואטסאפ דרך [Kami](/guide/kami) — מוודא שלא תגלו נפילה רק מלקוח כועס",
        "Execution Cleanup — הגדירו N8N_EXECUTIONS_DATA_PRUNE=true ו-EXECUTIONS_DATA_MAX_AGE=168 (7 ימים). בלי זה, ה-DB תופח תוך שבועות וההיסטוריה משתקת את המערכת",
        "Workers — בקנה מידה גדול, n8n תומך ב-queue mode עם Redis ו-workers נפרדים. ככה ה-UI נשאר מהיר וה-executions רצים במקביל במספר תהליכים",
        "Access Control — תמיד Users + API Keys פעילים. לעולם אל תחשפו את ה-UI הציבורי בלי SSO או VPN — יש בו API keys של כל השירותים שלכם, וזה אגן של סוד אחד",
        "Version Control — ייצוא workflows לריפו git פרטי (יש Git sync node מובנה בגרסאות החדשות). ככה יש היסטוריה, code review, ו-rollback אמיתי אם שבירתם משהו",
        "Secrets — תמיד דרך n8n credentials, אף פעם לא כ-API key ישיר ב-expression. credentials מוצפנים במסד, expressions נראים בפלייני-טקסט בכל ריצה",
      ],
      tips: [
        "n8n Cloud (Starter ב-20$/חודש ל-2,500 executions, Pro ב-50$/חודש ל-10,000, Enterprise בהתאמה) משתלם רק מתחת ל-20 workflows פעילים. מעל זה, VPS self-hosted חוסך מאות דולרים בשנה הראשונה — וזה לפני שמדברים על שליטה מלאה בנתונים",
        "Error Workflow עם התראה לוואטסאפ שלכם דרך [Kami](/guide/kami) = השקט הנפשי הגדול בהיסטוריה. כש-workflow גדול נכשל ב-03:00 בלילה, אתם יודעים על זה תוך שניות",
        "בדקו את ההגדרות N8N_SECURE_COOKIE=true ו-N8N_HIRING_COOKIE_PATH — קלים לשכוח, וחשובים לאבטחה בעיקר כשהאינסטנס מאחורי reverse proxy",
      ],
    },
  ],
  resources: [
    {
      title: "n8n.io",
      description: "אתר רשמי + תיעוד מפורט + community",
      href: "https://n8n.io",
      icon: ExternalLink,
    },
    {
      title: "n8n GitHub",
      description: "הקוד הפתוח + release notes + contributions",
      href: "https://github.com/n8n-io/n8n",
      icon: Github,
    },
    {
      title: "n8n Workflows Library",
      description: "מאגר workflows מוכנים מהקהילה",
      href: "https://n8n.io/workflows",
      icon: ExternalLink,
    },
    {
      title: "n8n + OpenAI Playlist",
      description: "סרטונים של הצוות עצמו — AI workflows מעשיים",
      href: "https://www.youtube.com/@n8n-io",
      icon: ExternalLink,
    },
    {
      title: "Webhook.site",
      description: "כלי לבדיקת webhooks לפני שמחברים ל-n8n",
      href: "https://webhook.site",
      icon: ExternalLink,
    },
    {
      title: "המדריך ל-Delegator",
      description: "שער ה-API שמתחבר ל-n8n workflows שלי",
      href: "/guide/delegator",
      icon: BookOpen,
    },
  ],
  ctaTitle: "להחליף Zapier ב-30 דקות",
  ctaSub:
    "n8n רץ ב-VPS הקטן ביותר, מטפל ב-אינסוף executions, ומאפשר logic שזפיר גובה עליו הרבה כסף.",
  primaryCta: {
    label: "n8n הרשמי",
    href: "https://n8n.io",
    icon: ExternalLink,
  },
  secondaryCta: {
    label: "שיחה על automation stack",
    href: "https://wa.me/972525427474",
    icon: Mail,
  },
  authorBio:
    "n8n הוא מנוע האוטומציות שמחבר את כל הרשת — ה-cron jobs העסקיים, ה-glue בין סוכני AI לכלים גנריים, וה-control של triggers על events חיצוניים. המדריך מציג את הדפוסים הנפוצים (webhook→agent→publish, scheduled content, error-workflows) כדי שתוכלו להפוך n8n מכלי חיצוני ל-backbone מעשי של ה-stack שלכם.",
};
