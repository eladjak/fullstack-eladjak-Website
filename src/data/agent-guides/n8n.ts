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
  tagline: "Zapier בקוד פתוח — 1000+ אינטגרציות, self-hosted, ללא מגבלת executions",
  heroDescription:
    "n8n הוא workflow automation platform בקוד פתוח (TypeScript/Node), עם ממשק ויזואלי של drag-and-drop לבניית pipelines מ-1000+ אינטגרציות (Slack, Gmail, Postgres, Webhooks, HTTP, OpenAI, [Qdrant](/guide/qdrant), ועוד). רץ ב-[Docker](/guide/docker) עם PostgreSQL מאחור. אצלי n8n מבצע cron-jobs עסקיים (invoicing, content publishing, agent heartbeats) ומחליף 3 SaaS שונים שהיו עולים ~80$/חודש. אצלך n8n יכול להיות ה-glue של כל ה-stack — אוטומציה של CRM, marketing ops, integration בין מערכות פנים-ארגוניות, או תחליף מלא ל-Zapier/Make.",
  badgeText: "2026 · Workflow Automation · מדריך מעשי",
  canonical: "https://fullstack-eladjak.co.il/guide/n8n",
  heroBgImage: "/images/guides/guide-n8n-hero.jpg",
  stats: [
    { label: "nodes זמינים", value: "1000+" },
    { label: "executions", value: "ללא הגבלה" },
    { label: "עלות self-host", value: "0$" },
    { label: "אינטגרציות אצלי", value: "25" },
  ],
  paradigmTitle: "למה לא Zapier?",
  paradigmSub:
    "Zapier נהדר עד שאתם מגיעים ל-20$/חודש על 750 טריגרים. n8n לוקח את כל היכולת, פותח אותה, ומוסיף יכולת לכתוב JS בתוך ה-workflow.",
  paradigmShifts: [
    {
      before: "Zapier Starter 20$/חודש — 750 טריגרים",
      after: "n8n ב-VPS 5$/חודש — executions אינסופיים",
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
        "רוצים workflows בלי לגעת בקוד, אבל לא רוצים לשלם 200$/חודש ל-Zapier Team.",
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
      subtitle: "Workflow engine + ממשק ויזואלי + 1000 מתאמים",
      description:
        "n8n בנוי בשלוש שכבות: (1) execution engine ב-Node.js שמריץ workflows, (2) PostgreSQL/SQLite לשמירת workflows + execution history, (3) editor UI מבוסס Vue שמנהל את ה-flows.",
      color: "from-pink-600 to-rose-500",
      difficulty: "beginner",
      beginner:
        "חשבו על n8n כמו 'Excel של אוטומציות': יש לכם תאים (nodes), לוחות (workflows), ונוסחאות (expressions). כל node הוא integration (Gmail, HTTP, Slack), והחיבור ביניהם מגדיר את זרימת המידע.",
      content: [
        "node = integration יחיד (Gmail, Slack, Postgres, HTTP Request, IF, Code, Schedule)",
        "trigger node = התחלה של workflow (Webhook, Cron, Gmail Trigger, Telegram Trigger)",
        "workflow = DAG של nodes מחוברים. נתונים זורמים דרך ה-edges",
        "expression: {{$json.field}} מושך שדה מה-node הקודם. דומה ל-Zapier מאק",
        "credentials: מאוחסנים ב-DB מוצפנים. נבחרים פר-node, משותפים בין workflows",
        "execution: auto (trigger) או manual (לבדיקה). היסטוריה נשמרת ב-DB",
      ],
      tips: [
        "ה-UI תומך ב-undo/redo מלא — לא לפחד לנסות",
        "Execute Node אחד יחיד (play button על node) שומר זמן דיבוג",
        "Pinned data: אפשר 'לנעול' data של execution מוצלח כדי לבדוק downstream nodes",
      ],
    },
    {
      id: "install",
      icon: Settings,
      title: "התקנה ב-Docker",
      subtitle: "VPS + compose = n8n רץ ב-5 דקות",
      description:
        "ההמלצה: docker-compose עם n8n + PostgreSQL + reverse proxy (Caddy/Traefik) ו-HTTPS. self-hosting מאפשר workflows ללא הגבלת executions.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "intermediate",
      beginner:
        "ב-VPS של Hetzner ב-5€/חודש אפשר להריץ n8n + Postgres + reverse proxy. הקובץ compose.yml הוא 30 שורות, ההרצה פקודה אחת. אחרי HTTPS עם Caddy — יש לכם אינסטנס אישי.",
      content: [
        "image רשמית: n8nio/n8n (stable) עם Node 20 + כל ה-nodes מובנים",
        "PostgreSQL: מומלץ במקום SQLite ברגע שיש יותר מ-5 workflows פעילים",
        "env vars חשובים: N8N_HOST, N8N_PROTOCOL=https, WEBHOOK_URL, DB_POSTGRESDB_*",
        "volumes: /home/node/.n8n שומר credentials + local files",
        "reverse proxy: Caddy עם auto-HTTPS הוא הכי קל (Traefik עם labels אלטרנטיבה)",
        "backup: pg_dump יומי של DB + export של workflows ל-JSON",
      ],
      tips: [
        "תגדירו ENCRYPTION_KEY סטטי מראש — אחרת שינוי עתידי ימחק את כל ה-credentials",
        "הקצו לפחות 1GB RAM + 10GB disk. execution history ו-data גדלים מהר",
        "ב-Hetzner ו-DigitalOcean יש images מוכנות עם n8n pre-installed",
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
        "מתוך 1000+ nodes, יש 20 בסיסיים שחוזרים בכל workflow. ההכרה שלהם חוסכת שעות.",
      color: "from-purple-600 to-violet-500",
      difficulty: "intermediate",
      content: [
        "טריגרים: Webhook, Cron, Manual, Gmail Trigger, Telegram Trigger, RSS, IMAP",
        "HTTP: HTTP Request (POST/GET/PUT + auth + retry) — ה-node הכי חשוב",
        "לוגיקה: IF (תנאי), Switch (router), Merge, Split In Batches, Loop",
        "Transform: Set, Code (JS/Python), Function, Item Lists",
        "אינטגרציות אימייל: Gmail, Outlook, SMTP, Mailchimp, Resend",
        "אינטגרציות מסרים: Slack, Discord, Telegram, WhatsApp (unofficial)",
        "DB: Postgres, MySQL, MongoDB, Airtable, Google Sheets, Notion",
        "AI: OpenAI, Anthropic, Ollama, LangChain, HuggingFace",
        "Vector DB: Qdrant, Pinecone, Weaviate, Supabase Vector",
      ],
      tips: [
        "HTTP Request עם 'Import cURL' — מדביקים curl command ומקבלים node מוכן",
        "Code node תומך ב-async/await ובייבוא npm packages (מוגבל) — כלי הצלה חזק",
        "Wait node: השהיה בין פעולות, חיוני ל-rate limits של APIs",
      ],
    },
    {
      id: "agents",
      icon: Network,
      title: "לחבר n8n לסוכנים ברשת",
      subtitle: "n8n + Delegator + Kami + CrewAI",
      description:
        "n8n משתלב בקלות עם שאר הרשת דרך HTTP nodes. workflow יכול לקרוא ל-Kami לשלוח WhatsApp, ל-CrewAI לייצר תוכן, ול-Delegator לתזמור.",
      color: "from-indigo-600 to-blue-500",
      difficulty: "advanced",
      content: [
        "WhatsApp דרך Kami: HTTP Request POST http://hub.eladjak.com/kami/whatsapp עם { to, text }",
        "תוכן דרך CrewAI: POST /crews/blog_he/run + poll /crews/runs/{id} עד status=completed",
        "Email דרך Delegator: POST /campaign-email → שמירה על rate limits + Resend credits",
        "SMS: POST /sms/send (Twilio מאחור)",
        "Qdrant search: HTTP Request ל-/collections/kami_memory/points/search",
        "Scheduled content: Cron → CrewAI (yt_to_blog_he) → n8n formats → Delegator publishes",
      ],
      tips: [
        "Webhook node ב-n8n מקבל events מחוץ — הפנו Postiz, Resend webhooks לכאן",
        "שמרו את הת credentials של hub.eladjak.com ב-n8n credentials מוצפן, לא כ-expression",
        "תבדקו workflows ב-'Executions' tab — מראה את כל ה-runs + errors",
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
        "ל-workflows רציניים צריך לוגיקה אמיתית. n8n תומך ב-expressions (כמו JS inline), loops, sub-workflows, ו-error branches.",
      color: "from-amber-600 to-orange-500",
      difficulty: "advanced",
      content: [
        "Expressions: {{ $json.name.split(' ')[0] }} — JS inline בתוך כל שדה",
        "$now, $today, DateTime: זמנים עם Luxon api. לדוגמה {{ $now.minus({ days: 7 }).toISO() }}",
        "Split In Batches: לעבוד על array בקבוצות של 10, מונע memory spikes + rate limits",
        "Wait node: שהייה של שניות/דקות/עד תאריך. חשוב לתיזמונים",
        "Error Workflow: workflow נפרד שמופעל אוטומטית כש-main workflow נכשל",
        "Sub-workflow: קוראים ל-workflow מ-workflow אחר (Execute Workflow node). קוד חוזר",
        "Pinned data + Test Workflow: להריץ חלק מה-workflow עם data מבוקר",
      ],
      tips: [
        "בכל Code node, עטפו ב-try/catch והחזירו { error } ב-item — מונע execution stop",
        "HTTP Request Options: ON_ERROR=CONTINUE_REGULAR_OUTPUT — מאפשר לטפל ב-errors ב-IF",
        "Credentials עם rate limit — תיצרו 2-3 עותקים ותחלקו בין workflows",
      ],
    },
    {
      id: "production",
      icon: Database,
      title: "n8n בייצור — מה חייבים לדאוג לו",
      subtitle: "backups, monitoring, scaling, security",
      description:
        "ברגע שיש workflows חשובים, n8n הופך ל-critical infrastructure. הנה ה-checklist הבסיסי.",
      color: "from-rose-600 to-pink-500",
      difficulty: "advanced",
      content: [
        "Backups: pg_dump יומי + upload ל-S3/Backblaze; export workflows ל-JSON שבועי",
        "Monitoring: Uptime Kuma על /healthz של n8n; alert ל-Telegram אם יורד",
        "Execution Cleanup: N8N_EXECUTIONS_DATA_PRUNE=true + EXECUTIONS_DATA_MAX_AGE=168 (7 ימים)",
        "Workers: ב-scale אפשר להפריד ל-queue mode עם Redis + workers נפרדים",
        "Access control: הגדירו Users + API Keys; אל תחשפו את ה-UI בלי SSO או VPN",
        "Version control: ייצוא workflows ל-git (יש Git sync node) = reproducibility",
        "Secrets: תמיד דרך n8n credentials; לא לכתוב API keys ב-expressions",
      ],
      tips: [
        "n8n cloud שווה רק מתחת ל-20 workflows. מעל — VPS חוסך כסף גם ב-1 שנה",
        "'Error workflow' עם notification ל-WhatsApp שומר עליכם כש-workflow גדול נכשל",
        "תבדקו N8N_SECURE_COOKIE=true ו-N8N_HIRING_COOKIE_PATH — קלים לשכוח",
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
