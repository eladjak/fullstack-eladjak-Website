export type SkillCategory =
  | "frontend"
  | "backend"
  | "ai"
  | "devops"
  | "lang"
  | "tools";

export interface SkillNode {
  id: string;
  label: string;
  category: SkillCategory;
  level?: number; // 1-5, optional
  description?: string;
}

export const SKILLS: SkillNode[] = [
  // Frontend (blue)
  {
    id: "react",
    label: "React",
    category: "frontend",
    level: 5,
    description: "ספריית UI מבוססת קומפוננטות — ליבה של כל פרויקט פרונט.",
  },
  {
    id: "next",
    label: "Next.js",
    category: "frontend",
    level: 5,
    description: "App Router, RSC, ISR — הפריימוורק שאיתו האתר הזה נבנה.",
  },
  {
    id: "tailwind",
    label: "Tailwind",
    category: "frontend",
    level: 5,
    description: "Utility-first CSS — מהיר, עקבי, ובלי לקרוס לתחזוקה.",
  },
  {
    id: "framer-motion",
    label: "Framer Motion",
    category: "frontend",
    level: 4,
    description: "אנימציות דקלרטיביות ל-React, רק transform/opacity.",
  },
  {
    id: "shadcn",
    label: "shadcn/ui",
    category: "frontend",
    level: 4,
    description: "פרימיטיבים נגישים מבוססי Radix שאתה מעתיק לפרויקט.",
  },
  // Backend (green)
  {
    id: "node",
    label: "Node.js",
    category: "backend",
    level: 5,
    description: "Runtime הליבה של רוב שירותי הסוכנים שלי.",
  },
  {
    id: "fastapi",
    label: "FastAPI",
    category: "backend",
    level: 4,
    description: "API פייתוני מהיר ל-Hub, Box, Delegator.",
  },
  {
    id: "supabase",
    label: "Supabase",
    category: "backend",
    level: 5,
    description: "Postgres + Auth + Storage + RLS — ה-stack המועדף ל-MVP.",
  },
  {
    id: "convex",
    label: "Convex",
    category: "backend",
    level: 4,
    description: "Backend reactive עם פונקציות TypeScript — חלופה ל-Supabase.",
  },
  {
    id: "redis",
    label: "Redis Streams",
    category: "backend",
    level: 4,
    description: "Pub/sub וזיכרון בין סוכנים — הליבה של ה-bridge.",
  },
  // AI / Agents (purple)
  {
    id: "claude",
    label: "Claude",
    category: "ai",
    level: 5,
    description: "המודל המוביל של Anthropic — הליבה של Claude Code ושל סוכניי.",
  },
  {
    id: "gpt",
    label: "GPT-5",
    category: "ai",
    level: 4,
    description: "מודל OpenAI — לראייה ולגיבוי כשצריך מודל חיצוני.",
  },
  {
    id: "gemini",
    label: "Gemini 2.5",
    category: "ai",
    level: 5,
    description: "מודל Google — חינמי לתמונות (nano-banana) ומהיר ל-Kaylee.",
  },
  {
    id: "mcp",
    label: "MCP",
    category: "ai",
    level: 5,
    description: "Model Context Protocol — מחבר כלים חיצוניים לסוכנים.",
  },
  {
    id: "kami",
    label: "Kami (WA agent)",
    category: "ai",
    level: 5,
    description: "סוכן הוואטסאפ האישי שלי — Sonnet + Green API.",
  },
  {
    id: "kaylee",
    label: "Kaylee (TG agent)",
    category: "ai",
    level: 5,
    description: "סוכנית הטלגרם — OpenClaw + Gemini Flash.",
  },
  {
    id: "box",
    label: "Box (coach)",
    category: "ai",
    level: 4,
    description: "המאמן הדיגיטלי שלי — תזונה, כושר, ושינה.",
  },
  {
    id: "delegator",
    label: "Delegator",
    category: "ai",
    level: 5,
    description: "API יחיד שמנתב מטלות לכל הסוכנים ברשת.",
  },
  {
    id: "crewai",
    label: "CrewAI",
    category: "ai",
    level: 4,
    description: "תזמור צוותי סוכנים פייתוני — ליבת ה-pipelines.",
  },
  {
    id: "qdrant",
    label: "Qdrant",
    category: "ai",
    level: 4,
    description: "מאגר וקטורי לזיכרון של הסוכנים.",
  },
  {
    id: "ollama",
    label: "Ollama",
    category: "ai",
    level: 4,
    description: "מודלים מקומיים — Gemma, Qwen — ל-fallback ופרטיות.",
  },
  {
    id: "n8n",
    label: "n8n",
    category: "ai",
    level: 3,
    description: "אוטומציה ויזואלית — חיבור webhooks ו-cron.",
  },
  {
    id: "aider",
    label: "Aider",
    category: "ai",
    level: 4,
    description: "Pair-programmer בטרמינל — חלופה זולה ל-Claude Code.",
  },
  // DevOps (orange)
  {
    id: "docker",
    label: "Docker",
    category: "devops",
    level: 5,
    description: "בידוד שירותים — כל הסוכנים רצים בקונטיינרים.",
  },
  {
    id: "vercel",
    label: "Vercel",
    category: "devops",
    level: 5,
    description: "הוסטינג ה-Next.js שלי — האתר הזה כאן.",
  },
  {
    id: "cloudflare",
    label: "Cloudflare",
    category: "devops",
    level: 4,
    description: "DNS, Tunnels, Workers — תשתית ה-edge.",
  },
  {
    id: "hetzner",
    label: "Hetzner VPS",
    category: "devops",
    level: 4,
    description: "ה-VPS המרכזי שמריץ את כל רשת הסוכנים.",
  },
  {
    id: "github-actions",
    label: "GitHub Actions",
    category: "devops",
    level: 4,
    description: "CI/CD — בדיקות, build, ודפלוי אוטומטי.",
  },
  {
    id: "systemd",
    label: "systemd",
    category: "devops",
    level: 4,
    description: "ניהול שירותים בלינוקס — keep-alive ל-bridges.",
  },
  {
    id: "nginx",
    label: "Nginx",
    category: "devops",
    level: 4,
    description: "Reverse proxy ו-TLS termination.",
  },
  // Languages (rose)
  {
    id: "ts",
    label: "TypeScript",
    category: "lang",
    level: 5,
    description: "השפה הראשית שלי לפרונט ו-backend.",
  },
  {
    id: "python",
    label: "Python",
    category: "lang",
    level: 5,
    description: "ל-AI, automation, ושירותי FastAPI.",
  },
  {
    id: "js",
    label: "JavaScript",
    category: "lang",
    level: 5,
    description: "הבסיס — בכל מקום שאין TypeScript.",
  },
  {
    id: "sql",
    label: "SQL",
    category: "lang",
    level: 4,
    description: "Postgres / SQLite — שאילתות, אינדקסים, RLS.",
  },
  {
    id: "bash",
    label: "Bash",
    category: "lang",
    level: 4,
    description: "סקריפטים תפעוליים, cron, deploy.",
  },
  // Tools (cyan)
  {
    id: "git",
    label: "Git",
    category: "tools",
    level: 5,
    description: "ניהול גרסאות — בלעדיו אין כלום.",
  },
  {
    id: "vscode",
    label: "VS Code",
    category: "tools",
    level: 5,
    description: "ה-IDE היומי שלי, עם Claude Code integration.",
  },
  {
    id: "figma",
    label: "Figma",
    category: "tools",
    level: 3,
    description: "לסקיצות והשראה — לרוב Stitch מחליף.",
  },
  {
    id: "postman",
    label: "Postman",
    category: "tools",
    level: 4,
    description: "בדיקת API ידנית מהירה.",
  },
];

export const CATEGORY_COLORS: Record<SkillCategory, string> = {
  frontend: "#3B82F6", // blue-500
  backend: "#10B981", // emerald-500
  ai: "#A855F7", // purple-500
  devops: "#F97316", // orange-500
  lang: "#F43F5E", // rose-500
  tools: "#06B6D4", // cyan-500
};

export const CATEGORY_LABELS_HE: Record<SkillCategory, string> = {
  frontend: "פרונט-אנד",
  backend: "באק-אנד",
  ai: "AI / סוכנים",
  devops: "DevOps",
  lang: "שפות",
  tools: "כלים",
};
