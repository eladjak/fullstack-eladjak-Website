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
  // ── Expansion (Apr 2026): full stack to ~100 skills ──────────────────────
  // AI / Agents — the missing 8 microservices + AI SDKs
  {
    id: "hermes",
    label: "Hermes",
    category: "ai",
    level: 4,
    description: "Multi-agent CLI לתזמור משימות בין סוכנים.",
  },
  {
    id: "adopter",
    label: "Adopter",
    category: "ai",
    level: 4,
    description: "סוכן גילוי תוכן אוטונומי — מסווג ומאמץ פוסטים רלוונטיים.",
  },
  {
    id: "dashboard-agent",
    label: "Dashboard",
    category: "ai",
    level: 4,
    description: "מרכז שליטה 12-טאבים לכל רשת הסוכנים.",
  },
  {
    id: "claude-code-cli",
    label: "Claude Code",
    category: "ai",
    level: 5,
    description: "ה-CLI הרשמי של Anthropic — סביבת העבודה היומית.",
  },
  {
    id: "gmail-reader",
    label: "Gmail Reader",
    category: "ai",
    level: 4,
    description: "סוכן קריאת מיילים — port 3710.",
  },
  {
    id: "gcal-writer",
    label: "GCal Writer",
    category: "ai",
    level: 4,
    description: "סוכן כתיבה ל-Google Calendar — port 3720.",
  },
  {
    id: "gdrive-reader",
    label: "GDrive Reader",
    category: "ai",
    level: 4,
    description: "סוכן קריאה/כתיבה ב-Google Drive — port 3730.",
  },
  {
    id: "whatsapp-cloud",
    label: "WhatsApp Cloud",
    category: "ai",
    level: 3,
    description: "Meta WhatsApp Cloud API — port 3740, ב-STANDBY.",
  },
  {
    id: "vercel-ai-sdk",
    label: "Vercel AI SDK",
    category: "ai",
    level: 4,
  },
  {
    id: "anthropic-sdk",
    label: "Anthropic SDK",
    category: "ai",
    level: 5,
  },
  {
    id: "openai-sdk",
    label: "OpenAI SDK",
    category: "ai",
    level: 4,
  },
  {
    id: "langchain",
    label: "LangChain",
    category: "ai",
    level: 3,
  },
  {
    id: "langgraph",
    label: "LangGraph",
    category: "ai",
    level: 3,
  },
  {
    id: "openrouter",
    label: "OpenRouter",
    category: "ai",
    level: 4,
  },
  {
    id: "groq",
    label: "Groq (Whisper STT)",
    category: "ai",
    level: 4,
  },
  {
    id: "elevenlabs",
    label: "ElevenLabs (TTS)",
    category: "ai",
    level: 4,
  },
  {
    id: "gemini-tts",
    label: "Gemini TTS",
    category: "ai",
    level: 4,
  },
  {
    id: "hyperframes",
    label: "Hyperframes",
    category: "ai",
    level: 3,
  },
  {
    id: "nano-banana",
    label: "nano-banana-poster",
    category: "ai",
    level: 5,
    description: "Gemini image generation — חינמי, איכותי, התחנה הראשונה לכל ויזואל.",
  },
  {
    id: "fal-ai",
    label: "fal.ai",
    category: "ai",
    level: 3,
  },
  // Frontend — UI libraries, animation, 3D
  {
    id: "reactbits",
    label: "ReactBits",
    category: "frontend",
    level: 4,
  },
  {
    id: "radix",
    label: "Radix UI",
    category: "frontend",
    level: 4,
  },
  {
    id: "base-ui",
    label: "Base UI",
    category: "frontend",
    level: 3,
  },
  {
    id: "lucide",
    label: "Lucide Icons",
    category: "frontend",
    level: 4,
  },
  {
    id: "react-hook-form",
    label: "React Hook Form",
    category: "frontend",
    level: 4,
  },
  {
    id: "zod",
    label: "Zod",
    category: "frontend",
    level: 5,
    description: "וולידציית schema runtime עם type inference מלא.",
  },
  {
    id: "r3f",
    label: "React Three Fiber",
    category: "frontend",
    level: 4,
  },
  {
    id: "threejs",
    label: "Three.js",
    category: "frontend",
    level: 3,
  },
  {
    id: "drei",
    label: "drei",
    category: "frontend",
    level: 3,
  },
  {
    id: "gsap",
    label: "GSAP",
    category: "frontend",
    level: 3,
  },
  // Backend — APIs, auth, DBs, ORMs, Israeli services
  {
    id: "express",
    label: "Express",
    category: "backend",
    level: 4,
  },
  {
    id: "hono",
    label: "Hono",
    category: "backend",
    level: 4,
  },
  {
    id: "trpc",
    label: "tRPC",
    category: "backend",
    level: 4,
  },
  {
    id: "better-auth",
    label: "Better Auth",
    category: "backend",
    level: 4,
  },
  {
    id: "clerk",
    label: "Clerk",
    category: "backend",
    level: 3,
  },
  {
    id: "postgres",
    label: "Postgres",
    category: "backend",
    level: 5,
  },
  {
    id: "mongodb",
    label: "MongoDB",
    category: "backend",
    level: 3,
  },
  {
    id: "sqlite",
    label: "SQLite",
    category: "backend",
    level: 4,
  },
  {
    id: "prisma",
    label: "Prisma",
    category: "backend",
    level: 4,
  },
  {
    id: "drizzle",
    label: "Drizzle",
    category: "backend",
    level: 4,
  },
  {
    id: "resend",
    label: "Resend",
    category: "backend",
    level: 4,
  },
  {
    id: "cardcom",
    label: "Cardcom",
    category: "backend",
    level: 3,
    description: "סליקה ישראלית — מותאם לעוסק פטור/מורשה.",
  },
  {
    id: "green-invoice",
    label: "Green Invoice",
    category: "backend",
    level: 4,
    description: "API חשבוניות ישראלי — קבלות, חשבוניות, ניהול לקוחות.",
  },
  // DevOps — edge, hosting, build tools
  {
    id: "caddy",
    label: "Caddy",
    category: "devops",
    level: 3,
  },
  {
    id: "cloudflare-tunnel",
    label: "Cloudflare Tunnel",
    category: "devops",
    level: 4,
  },
  {
    id: "ufw",
    label: "UFW",
    category: "devops",
    level: 4,
  },
  {
    id: "letsencrypt",
    label: "Let's Encrypt",
    category: "devops",
    level: 4,
  },
  {
    id: "tmux",
    label: "tmux",
    category: "devops",
    level: 4,
  },
  {
    id: "htop",
    label: "htop",
    category: "devops",
    level: 3,
  },
  {
    id: "rsync",
    label: "rsync",
    category: "devops",
    level: 4,
  },
  {
    id: "railway",
    label: "Railway",
    category: "devops",
    level: 3,
  },
  {
    id: "fly",
    label: "Fly.io",
    category: "devops",
    level: 3,
  },
  {
    id: "bun",
    label: "Bun",
    category: "devops",
    level: 4,
  },
  {
    id: "pnpm",
    label: "pnpm",
    category: "devops",
    level: 4,
  },
  {
    id: "vite",
    label: "Vite",
    category: "devops",
    level: 4,
  },
  {
    id: "turborepo",
    label: "Turborepo",
    category: "devops",
    level: 3,
  },
  // Tools — IDEs, AI coding helpers, design, browser automation
  {
    id: "cursor",
    label: "Cursor",
    category: "tools",
    level: 4,
  },
  {
    id: "windsurf",
    label: "Windsurf",
    category: "tools",
    level: 3,
  },
  {
    id: "copilot",
    label: "GitHub Copilot",
    category: "tools",
    level: 4,
  },
  {
    id: "codex-cli",
    label: "Codex CLI",
    category: "tools",
    level: 4,
  },
  {
    id: "gemini-cli",
    label: "Gemini CLI",
    category: "tools",
    level: 4,
  },
  {
    id: "stitch",
    label: "Google Stitch",
    category: "tools",
    level: 4,
    description: "כלי עיצוב UI של Google — Stitch MCP בכל פרויקט פרונט.",
  },
  {
    id: "v0",
    label: "v0.dev",
    category: "tools",
    level: 3,
  },
  {
    id: "claude-design",
    label: "Claude Design",
    category: "tools",
    level: 4,
  },
  {
    id: "canva",
    label: "Canva",
    category: "tools",
    level: 3,
  },
  {
    id: "mcp-servers",
    label: "MCP Servers",
    category: "tools",
    level: 5,
    description: "13 MCP servers פעילים: context7, octocode, stitch, chrome ועוד.",
  },
  {
    id: "agent-browser",
    label: "agent-browser",
    category: "tools",
    level: 4,
  },
  {
    id: "playwright",
    label: "Playwright",
    category: "tools",
    level: 4,
  },
];

// ── Generated skills (auto-scanned from ~/.claude/skills/ + ~/.claude/commands/) ─
// These are imported lazily so the curated SKILLS array stays the source of truth
// for the inner ring; GENERATED_SKILLS becomes the outer ring in the 3D canvas.
import { GENERATED_SKILLS } from './skills-universe-generated';

/**
 * ALL_SKILLS = curated 107 + generated 300+ from the local skills library.
 * Use this for the full 3D canvas rendering.
 * Use SKILLS for the curated-only legend / counts of the "core" ring.
 */
export const ALL_SKILLS: SkillNode[] = [...SKILLS, ...GENERATED_SKILLS];

export { GENERATED_SKILLS };

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
