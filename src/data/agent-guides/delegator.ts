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
  heroDescription: "Delegator הוא HTTP router מבוסס Node/TypeScript שרץ על port 3900 ב-VPS. מרכז 100+ endpoints: email (Resend), SMS (Twilio), calendar (Hebcal + Google), drive, research (Perplexity/Gemini), content-studio, landing-pages, campaigns, pipeline orchestration ו-auto-routing. Auth: API key + JWT, logging ב-[Qdrant](/guide/qdrant). אצלי הוא מרכז את כל 10 הסוכנים מאחורי שער אחד — אצלך הוא יכול להחליף Zapier/Make ולשמש API gateway לכל ארכיטקטורת multi-agent, בלי לפזר credentials ב-5 קבצי .env.",
  badgeText: "2026 · Central API Router · מדריך מעשי",
  canonical: "https://fullstack-eladjak.co.il/guide/delegator",
  heroBgImage: "/images/guides/guide-delegator-hero.jpg",
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
      after: "credentials בדלגטור בלבד, rotate פעם אחת",
      icon: Lock,
    },
    {
      before: "ל-Kami API key של Resend, Stripe, Postiz, Gmail, fal.ai...",
      after: "Kami שולח ל-delegator POST /email → delegator עושה את ה-magic",
      icon: Route,
    },
    {
      before: "רוצים לחסום פרסום בשבת? לשלב ב-5 agents",
      after: "Calendar gate ב-delegator. כל publishing עובר דרכו. שם גיט אחד",
      icon: Layers,
    },
    {
      before: "כשתוסיפו webhook חדש — לעדכן כל agent",
      after: "להוסיף ל-delegator, כולם מקבלים בחינם",
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
        "אחד המקומות — אחד חוזה, אחד rate-limit, אחד audit log.",
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
        "כמה עצמאים בונים ביחד? Delegator כ-shared service עובד נפלא.",
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
      title: "מה זה Delegator?",
      subtitle: "Python HTTP server שמרכז את כל ה-cross-cutting concerns",
      description:
        "Vanilla Python (לא FastAPI) — כי זה פשוט. שרת http.server שמעטיף 100+ endpoints, מאחוריו אינטגרציות ל-Resend, Postiz, fal.ai, OAuth של Google, Anthropic, OpenAI, Gemini.",
      color: "from-cyan-600 to-blue-500",
      difficulty: "beginner",
      beginner:
        "תחשבו על זה כמו מזכירה של המשרד. כולם שולחים אליה כל דבר, והיא יודעת למי להעביר. בלי חוזר לאקזמה של פרטי הקשר.",
      content: [
        "Port 3900 (פנימי) — נגיש ב-hub.eladjak.com דרך cloudflared tunnel",
        "קוד: /opt/ai-factory/scripts/delegator.py (~5000 שורות)",
        "אין framework — http.server של stdlib + handlers מובנים ב-class",
        "API key management — כל ה-secrets ב-environment, לא בקוד",
        "Public HTML dashboards — /launcher, /hub, /costs/llm, /calendar/publishing-status",
        "Versioning עדיני — כל סוכן יודע את ה-endpoints שהוא צריך",
      ],
    },
    {
      id: "routes",
      icon: Route,
      title: "100+ endpoints — מה יש",
      subtitle: "חלוקה לפי קטגוריות",
      description:
        "לא רק middleware — גם business endpoints אמיתיים.",
      color: "from-violet-600 to-purple-500",
      difficulty: "intermediate",
      content: [
        "Publishing: /postiz/post, /campaign-email, /social-post, /sms/send, /content-studio/publish",
        "AI pipelines: /research, /landing-page, /pipeline/full, /content-studio/generate",
        "Google: /gmail/send, /gmail/search, /calendar/check, /drive/search, /docs/create",
        "Infra: /health/agents, /network/memory, /kaylee/report, /claude-code/enqueue",
        "Projects: /projects, /campaigns, /groups, /bank/transactions, /routines",
        "HTML dashboards: /hub, /launcher, /costs, /costs/llm, /coach/dashboard, /box/calendar.ics",
        "LLM routing: /llm/route (4-tier fallback חינמי → בתשלום)",
      ],
    },
    {
      id: "gateway",
      icon: Plug,
      title: "Gateway pattern — שער אחד לכולם",
      subtitle: "אחריות משותפת, אבטחה מרוכזת",
      description:
        "ברגע שיש gateway, אפשר להוסיף לו דברים שחלים על כולם.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "intermediate",
      content: [
        "Central auth — בעתיד אפשר להוסיף JWT middleware",
        "Rate limiting — אותו cap ל-generic users, ללא צורך לסנכרן בין agents",
        "Logging — structured logs לכל request → אפשר לחתוך לפי agent/endpoint",
        "Retries — אם Resend נופל, delegator יכול לנסות שוב; agents לא צריכים לדעת",
        "Caching — Hebcal, Google OAuth tokens, etc. נשמרים בזיכרון",
        "Feature flags — רוצה לחסום temporarily endpoint? one line",
      ],
      tips: [
        "הכי חשוב: agents קוראים דרך delegator *גם כשהוא באותו שרת*. זה אולי קצת מיותר 2ms, אבל זה מוריד את ה-coupling משמעותית",
      ],
    },
    {
      id: "calendar",
      icon: Globe,
      title: "Calendar Gate — חובה ישראלית",
      subtitle: "חסימת פרסום בשבת, חגים, ימי זיכרון",
      description:
        "IL calendar gate — כל publishing endpoint בודק Hebcal ומשתתק בשבת/חג.",
      color: "from-amber-600 to-orange-500",
      difficulty: "advanced",
      beginner:
        "פירוש: אם עכשיו יום הזיכרון, ושולח לסוכן POST /postiz/post עם תוכן שיווקי — הוא לא יפרסם. יחזיר תשובה 'חסום עד X:XX'. זה חוסך בושה ציבורית.",
      content: [
        "`_il_calendar_status()` משתמש ב-Hebcal API (cached 6h)",
        "3 קטגוריות: shabbat_chag (חסימה חזקה) / solemn_modern (יום הזיכרון — כללי חסום) / celebratory_modern (יום העצמאות)",
        "Buffer -30min לפני הדלקת נרות, +40min אחרי הבדלה",
        "content_type על payload: generic / critical / condolence / il_celebration",
        "critical עוקף — emergency תמיד עובר",
        "Public status: GET /calendar/publishing-status — JSON + HTML עם refresh",
      ],
      codeExample: {
        label: "דוגמת תגובה",
        code: '{\n  "sensitive": true,\n  "category": "solemn_modern",\n  "reason": "Yom HaZikaron — פרסום שיווקי חסום עד שקיעה.",\n  "resume_at_iso": "2026-04-21T19:30:00"\n}',
      },
    },
    {
      id: "costs",
      icon: Zap,
      title: "Cost Tracking — מי עולה כמה",
      subtitle: "per-agent LLM spend dashboard",
      description:
        "כל קריאת LLM דרך delegator נרשמת: tier, tokens, latency, requester.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "intermediate",
      content: [
        "`_log_llm_call(tier, model, requester, tokens_in, tokens_out, latency)` אחרי כל קריאה מוצלחת",
        "JSONL ל-`/opt/ai-factory/data/costs/llm-calls.jsonl`",
        "Dashboard /costs/llm (auto-refresh 60s) — pivot לפי agent",
        "4 tiers: ollama-local (חינם) / gemini-flash (חינם) / stepfun-openrouter (חינם) / claude-sonnet ($3/M in, $15/M out)",
        "אצלי: ~$2-5/חודש של Claude Sonnet (רק ב-emergency fallback)",
      ],
      tips: [
        "Tracking early זה WIN. אחרת מגלים חודש אחרי ששחררתם משהו ש-$200 נשרפו",
      ],
    },
    {
      id: "llm-route",
      icon: Layers,
      title: "LLM Routing — חינמי קודם",
      subtitle: "/llm/route עם fallback ב-4 שכבות",
      description:
        "POST /llm/route עם {prompt, system, max_tokens, requester} — ו-delegator מחליט איזה LLM.",
      color: "from-pink-600 to-rose-500",
      difficulty: "advanced",
      content: [
        "Tier 1: Ollama Local (qwen3:4b) — אם Ollama פועל על אותו VPS, חינם לחלוטין",
        "Tier 2: Gemini 2.5 Flash — חינמי עד 1M tokens/חודש",
        "Tier 3: StepFun via OpenRouter — model=:free suffix, ללא עלות",
        "Tier 4: Claude Sonnet — בתשלום, רק אם כל הקודמים נכשלו",
        "Response: {ok, tier, model, latency_ms, cost_usd_estimate, response, tried: []}",
        "נעזר אוטומטית ב-pricing table ל-estimate מדויק של cost",
      ],
      tips: [
        "התחילו עם Gemini Flash בלבד (tier 2). Ollama דורש GPU בשביל performance טוב",
      ],
    },
    {
      id: "advanced",
      icon: Lightbulb,
      title: "טיפים מתקדמים",
      subtitle: "הלקחים מההקמה ומהתחזוקה",
      description:
        "הניואנסים שהופכים API gateway פשוט ל-production-ready.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      content: [
        "בלי framework זה רכב — אבל צריך לבנות middleware בעצמכם (logging, cors, auth)",
        "Public URL דרך cloudflared tunnel — חינמי, ללא פתיחת ports",
        "Keep it stateful ONLY in well-known places (files, DB) — לא in-memory state עמיד",
        "Systemd service עם restart=always — שרוד crashes",
        "HTML dashboards ב-delegator עצמו — server-side render פשוט, ללא SPA",
        "Backup: בכל patch סימון עם timestamp (delegator.py.bak-sprint-X)",
      ],
      tips: [
        "זה לא מיועד להיות API ציבורי למוצר. זה internal gateway. אל תחשפו ללא auth בין agents",
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
    "Delegator חי אצלי 6 חודשים, ~5000 שורות קוד, 100+ endpoints. הגרסה הראשונה הייתה 200 שורות. הוא גדל עם הצורך — כל feature שקם בכמה סוכנים, עבר דרכו. המדריך מבוסס על הגדילה הזו.",
};
