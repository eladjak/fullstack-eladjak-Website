import {
  LayoutDashboard,
  Monitor,
  Gauge,
  Kanban,
  Github,
  ExternalLink,
  BookOpen,
  Code2,
  Rocket,
  Lightbulb,
  Zap,
  Users,
  Mail,
  Eye,
  Sparkles,
  Settings,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const dashboardGuide: AgentGuideData = {
  slug: "dashboard",
  agentName: "Dashboard",
  agentNameHe: "Dashboard",
  tagline: "Mission Control — 12 טאבים, UI אחד, כל הרשת במבט",
  heroDescription:
    "ה-UI המרכזי שלי. Node server קטן ב-Windows שמציג kanban, health, costs, network memory, reports. לא משלם על Grafana, Linear או Retool — יש לי UI מותאם שמבין את הרשת שלי.",
  badgeText: "2026 · Self-hosted Mission Control · מדריך מעשי",
  canonical: "https://fullstack-eladjak.co.il/guide/dashboard",
  stats: [
    { label: "טאבים", value: "12" },
    { label: "WebSocket updates", value: "5s" },
    { label: "עלות", value: "חינם" },
    { label: "שיכבות נתונים", value: "live" },
  ],
  paradigmTitle: "UI שמבין את העסק שלכם",
  paradigmSub:
    "Grafana ו-Linear מעולים ל-90% הגנרי. הדשבורד הזה הוא הרוח של ה-10% שייחודי לכם.",
  paradigmShifts: [
    {
      before: "5 טאבים פתוחים: Grafana, Linear, GitHub, UptimeKuma, Gmail",
      after: "טאב אחד, מתעדכן real-time, מותאם בדיוק לזרימת העבודה",
      icon: LayoutDashboard,
    },
    {
      before: "$100/חודש על Datadog + Retool + Linear",
      after: "Node server מקומי — 0₪",
      icon: Settings,
    },
    {
      before: "screenshot ב-WhatsApp ליקירים ('תראו מה עשיתי')",
      after: "URL חי עם iframe של הדשבורד — כל הצוות רואה",
      icon: Eye,
    },
    {
      before: "רוצה feature חדש? להמתין לעדכון ChromeOS של הכלי",
      after: "פותחים server.js, מוסיפים endpoint + tab — יש",
      icon: Zap,
    },
  ],
  whoIsThisFor: [
    {
      title: "עצמאים עם רשת כלים",
      description:
        "5+ שירותים שצריכים לראות במקום אחד — זה פתרון מושלם.",
      icon: Rocket,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "שנאי טיילים",
      description:
        "הדשבורד הזה לא ייפה, הוא שימושי. אם זה מה שחשוב — קדימה.",
      icon: Gauge,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "מפתחים שרוצים custom UI",
      description:
        "Node HTTP server + HTML + vanilla JS. פשוט, ניתן לשכפול, קל לערוך.",
      icon: Code2,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "צוותים קטנים",
      description:
        "כמה עצמאים ביחד? Dashboard כ-shared mission control מצוין.",
      icon: Users,
      color: "from-pink-500 to-rose-500",
    },
  ],
  toc: [
    { id: "what-is", label: "מה זה" },
    { id: "tabs", label: "12 הטאבים" },
    { id: "ws", label: "WebSocket" },
    { id: "proxy", label: "Proxy" },
    { id: "kanban", label: "Kanban" },
    { id: "advanced", label: "מתקדם" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Monitor,
      title: "מה זה Dashboard?",
      subtitle: "Node HTTP server על Windows עם UI שמתחבר לכל",
      description:
        "Vanilla Node.js HTTP server (אין Express, אין Next.js). ~3000 שורות שמשרתות HTML מכובד, WebSocket לעדכוני real-time, ו-proxy לכל שירות ברשת.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "beginner",
      beginner:
        "תחשבו על זה כעל עמוד אינטרנט מקומי שפתוח כל היום בדפדפן שלכם. הוא מראה את כל מה שקורה ברשת שלכם במבט אחד.",
      content: [
        "Node HTTP server על port 3456 (HTTP) + 3457 (WebSocket)",
        "קוד: ~/.claude/dashboard/server.js (~3000 שורות)",
        "start-dashboard.vbs — אוטומטית מופעל ב-Windows startup",
        "UI: index.html עם vanilla JS — אין framework, שינויים מיידיים",
        "Proxy ל-panel (5300), Ollama (11434), hub.eladjak.com — הכל מקובץ",
        "Data: project-registry.json, kanban JSON, cache מקומי",
      ],
    },
    {
      id: "tabs",
      icon: LayoutDashboard,
      title: "12 הטאבים",
      subtitle: "מה יש בכל אחד ולמה",
      description:
        "כל טאב רץ על נתונים שונים. חלק live, חלק cached, כולם נגישים במבט.",
      color: "from-violet-600 to-purple-500",
      difficulty: "intermediate",
      content: [
        "Mission Control — סקירה כוללת, דגלים אדומים, KPIs של היום",
        "Kanban — 39+ פרויקטים, drag-and-drop בין עמודות",
        "Image Gen — SD Turbo + Gemini (nano-banana-poster)",
        "Broadcast — שליחת הודעה למספר סוכנים בבת אחת",
        "Network — בריאות 10 הסוכנים (proxies ל-hub.eladjak.com/health/agents)",
        "Claude Chat — ממשק שיחה מקומי עם history",
        "Qwen Chat — gemma3/qwen3 מקומי דרך Ollama",
        "Brain — שליפה מ-Second Brain (knowledge base שלי)",
        "Costs — per-agent, per-provider spending",
        "Research — דפדפן agentic פתוח",
        "Scheduler — תזמון משימות וaגנטים",
        "Settings — פתיחה/סגירה של integrations",
      ],
    },
    {
      id: "ws",
      icon: Zap,
      title: "WebSocket — עדכונים בזמן אמת",
      subtitle: "5s intervals במקום polling",
      description:
        "WebSocket מ-port 3457 מוציא push updates ל-client.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "intermediate",
      content: [
        "על startup, client connects ל-ws://localhost:3457",
        "Server sends heartbeat כל 30s (keep-alive)",
        "Events שנשלחים: task-updated, kanban-move, health-status-change, new-message",
        "Client מעדכן DOM ללא reload מלא",
        "אם WebSocket נופל — fallback ל-polling כל 10s",
        "קל להוסיף event חדש — broadcast() ב-server, handler ב-client",
      ],
      codeExample: {
        label: "Broadcast של event",
        code: "// server.js\nfunction broadcast(event) {\n  wsClients.forEach(c => {\n    if (c.readyState === 1) c.send(JSON.stringify(event));\n  });\n}\n\nbroadcast({ type: 'health-status', payload: { agent: 'kami', status: 'pass' }});",
      },
    },
    {
      id: "proxy",
      icon: ExternalLink,
      title: "Proxy layer — Single URL לכל",
      subtitle: "/api/panel-proxy/X → localhost:5300/api/X",
      description:
        "Dashboard משמש כ-reverse proxy ל-3 שירותים פנימיים — מסתיר פורטים, מוסיף CORS.",
      color: "from-amber-600 to-orange-500",
      difficulty: "intermediate",
      content: [
        "/api/panel-proxy/* → port 5300 (agent-control-panel)",
        "/api/ollama-proxy/* → port 11434 (Ollama local LLM)",
        "/api/hub-proxy/* → hub.eladjak.com (VPS)",
        "timeout default: 5-120s לפי endpoint",
        "CORS headers נוספים — מאפשר נוחות ב-client-side fetch",
        "Offline fallback: מחזיר {ok:false, error:'service offline'} במקום 500",
      ],
    },
    {
      id: "kanban",
      icon: Kanban,
      title: "Kanban — 39 פרויקטים במקום אחד",
      subtitle: "Projects registry + status tracking",
      description:
        "הטאב החשוב ביותר. מאחד את כל הפרויקטים שלי ב-view אחד.",
      color: "from-pink-600 to-rose-500",
      difficulty: "intermediate",
      content: [
        "~/.claude/projects-registry.json — מקור האמת",
        "Columns: ideas / active / maintenance / on-hold / archived",
        "Drag-and-drop — shuffleJS, שומר ל-localStorage + POST ל-server",
        "Cards: title, description, tech stack, last session, deploy URL",
        "Filters: by tech, by status, by age",
        "Quick actions: open in VSCode, open deploy URL, copy path",
      ],
      tips: [
        "השלב הראשון: להכניס את כל הפרויקטים שלכם לregistry אפילו תור idea. רואים לראשונה את כמות הrepos במבט",
      ],
    },
    {
      id: "advanced",
      icon: Sparkles,
      title: "הוספת טאב חדש",
      subtitle: "~50 שורות ויש לכם תכונה משלכם",
      description:
        "הגישה שלי להוספה: server.js + index.html — שום build.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      content: [
        "הוסיפו endpoint ב-server.js: if (req.url === '/api/newtab') { ... }",
        "הוסיפו div בin-in index.html עם id='tab-newtab'",
        "הוסיפו button ב-navigation: <button onclick=\"showTab('newtab')\">",
        "הוסיפו fetch ב-load של הטאב: fetch('/api/newtab').then(...).then(render)",
        "אם צריך real-time: broadcast() מ-server כשיש data חדש, handler ב-client",
        "זה הכל. אין build, אין hot-reload — רק refresh",
      ],
      tips: [
        "הגישה הזו מצוינת לאב-טיפוס מהיר. לפרודקשן אמיתי — אולי React. אבל לזה המטרה היא להיות שמיש לבד",
      ],
    },
  ],
  resources: [
    {
      title: "GitHub — הדשבורד שלי",
      description: "Fork-able — התאימו לעצמכם",
      href: "https://github.com/eladjak",
      icon: Github,
    },
    {
      title: "WebSocket on Node",
      description: "Library של ws — הבסיס לreal-time",
      href: "https://github.com/websockets/ws",
      icon: ExternalLink,
    },
    {
      title: "Shuffle.js",
      description: "ל-kanban drag-and-drop",
      href: "https://vestride.github.io/Shuffle/",
      icon: ExternalLink,
    },
    {
      title: "המדריך ל-Delegator",
      description: "הדשבורד עושה לו proxy",
      href: "/guide/delegator",
      icon: BookOpen,
    },
    {
      title: "המדריך ל-Kaylee",
      description: "הדשבורד מציג את סטטוסה",
      href: "/guide/kaylee",
      icon: BookOpen,
    },
    {
      title: "שיחת ייעוץ",
      description: "רוצים דשבורד מותאם?",
      href: "/contact",
      icon: Mail,
    },
  ],
  ctaTitle: "הצרכים שלכם שונים — תתאימו UI",
  ctaSub:
    "Vanilla JS, Node פשוט, התאמה לצרכים שלכם תוך שעה. קוד פתוח, להעתיק ולשנות.",
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
    "הדשבורד רץ אצלי מ-Sprint 1, גדל מ-3 טאבים ל-12. הוא UI הראשון שאני פותח בבוקר וה-UI האחרון שאני סוגר בערב. המדריך מבוסס על 6 חודשים של שימוש אמיתי — כולל טעויות (בסוף הוצאתי dashboard/server.js מהכרך, נפרד).",
};
