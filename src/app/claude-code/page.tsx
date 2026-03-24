"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface GuideSection {
  id: string;
  emoji: string;
  title: string;
  description: string;
  color: string;
  content: string[];
  tips?: string[];
  codeExample?: { label: string; code: string };
}

const sections: GuideSection[] = [
  {
    id: "what-is",
    emoji: "🤖",
    title: "מה זה Claude Code?",
    description:
      "כלי פיתוח מבוסס AI שפועל ישירות מהטרמינל. הוא קורא קבצים, כותב קוד, מריץ פקודות ומחפש באינטרנט - הכל מתוך שיחה טבעית.",
    color: "from-violet-600 to-purple-500",
    content: [
      "Claude Code הוא סוכן AI אוטונומי של Anthropic שמבין את הפרויקט שלך לעומק",
      "הוא עובד ישירות בטרמינל - לא צריך IDE מיוחד",
      "יכול לקרוא, לכתוב ולערוך קבצים, להריץ טסטים, ולבצע Git operations",
      "תומך ב-MCP (Model Context Protocol) לחיבור לשירותים חיצוניים",
      "יש לו מערכת Skills שמרחיבה את היכולות שלו ב-350+ מיומנויות",
    ],
    tips: [
      "Claude Code שונה מ-ChatGPT - הוא לא רק עונה על שאלות, הוא באמת עובד על הקוד שלך",
      "הוא יכול לנהל פרויקטים שלמים מאפס ועד לפרודקשן",
    ],
  },
  {
    id: "install",
    emoji: "⚡",
    title: "התקנה מהירה",
    description:
      "5 דרכים להתקין את Claude Code - בחר את מה שמתאים לך.",
    color: "from-emerald-600 to-teal-500",
    content: [
      "npm install -g @anthropic-ai/claude-code  →  התקנה גלובלית דרך npm",
      "אפליקציית Desktop  →  claude.com/download (Windows / Mac / Linux)",
      "VS Code Extension  →  חפש 'Claude Code' ב-Extensions",
      "JetBrains Plugin  →  זמין ל-WebStorm, IntelliJ, PyCharm",
      "גישה דרך הדפדפן  →  claude.com/code",
    ],
    tips: [
      "מומלץ להתחיל עם ה-CLI (שורת הפקודה) לחוויה המלאה",
      "צריך מנוי Anthropic - Pro ($20/חודש) או Max ($100/חודש)",
    ],
    codeExample: {
      label: "התקנה בשורה אחת",
      code: "npm install -g @anthropic-ai/claude-code\ncd my-project\nclaude",
    },
  },
  {
    id: "first-steps",
    emoji: "🚀",
    title: "צעדים ראשונים",
    description: "איך מתחילים לעבוד עם Claude Code? הנה הצעדים הבסיסיים.",
    color: "from-purple-600 to-violet-500",
    content: [
      "פתח טרמינל בתיקיית הפרויקט שלך",
      "הקלד claude ולחץ Enter",
      "תאר מה אתה רוצה לבנות בשפה טבעית (עברית או אנגלית)",
      "Claude יקרא את הקבצים, יבין את המבנה, ויתחיל לעבוד",
      "אשר או דחה כל פעולה שהוא מציע",
    ],
    tips: [
      "הקלד /init בפעם הראשונה כדי ליצור קובץ CLAUDE.md עם הגדרות הפרויקט",
      "השתמש ב-/help לרשימת פקודות מלאה",
      "הקלד /cost לבדוק כמה טוקנים השתמשת",
    ],
  },
  {
    id: "claude-md",
    emoji: "📋",
    title: "CLAUDE.md - הקובץ הכי חשוב",
    description:
      "CLAUDE.md הוא 'חוזה העבודה' שלך עם Claude. הוא נטען אוטומטית בכל שיחה ומלמד את Claude איך אתה עובד, מה ה-stack שלך, ומה הכללים שחשובים לך.",
    color: "from-blue-600 to-indigo-500",
    content: [
      "CLAUDE.md גלובלי → ~/.claude/CLAUDE.md (חל על כל הפרויקטים)",
      "CLAUDE.md לפרויקט → /root/my-project/CLAUDE.md (ייחודי לפרויקט)",
      "שניהם נטענים יחד - הגלובלי קודם, אחר-כך הייחודי",
      "כלול: stack טכנולוגי, כלי package manager, כללי סגנון קוד, כלים מועדפים",
      "הוסף: כיצד לטפל בשגיאות, מה לא לעשות, ועדיפויות החשיבה",
      "אפשר לקשר לקבצי rules נוספים: @rules/coding-style.md",
    ],
    tips: [
      "ככל שה-CLAUDE.md מפורט יותר, כך Claude מבין טוב יותר ושואל פחות שאלות",
      "תחזיר על עצמך: אם Claude עשה משהו לא נכון, הוסף כלל ל-CLAUDE.md כדי שזה לא יקרה שוב",
      "השתמש ב-/init כדי שClaude ייצור את הקובץ הראשוני לך אוטומטית",
    ],
    codeExample: {
      label: "דוגמה ל-CLAUDE.md",
      code: `# My Project

## Package Manager
Use bun ONLY. Never npm or yarn.

## Code Style
- TypeScript strict mode
- Functional components only
- Use Result types for errors (never try/catch in business logic)

## Commit Messages
Format: feat/fix/refactor: description in Hebrew

## What NOT to do
- Never use 'any' type
- Never hardcode secrets
- Never use placeholder images`,
    },
  },
  {
    id: "mcp-servers",
    emoji: "🔌",
    title: "MCP - Model Context Protocol",
    description:
      "MCP הוא הסטנדרט שמאפשר ל-Claude להתחבר לכלים חיצוניים. כל MCP Server מוסיף ל-Claude יכולות חדשות - גלישה באינטרנט, ניהול GitHub, עיצוב UI ועוד.",
    color: "from-cyan-600 to-teal-500",
    content: [
      "Context7 → תיעוד עדכני של ספריות ישירות לתוך השיחה (no knowledge cutoff!)",
      "Octocode → חיפוש קוד אמיתי מ-GitHub לדוגמאות עבודה",
      "Stitch (Google) → עיצוב UI ויצוא HTML/Tailwind ישירות ל-Claude",
      "Playwright → גלישה ואינטראקציה עם אתרים דרך עץ נגישות",
      "GitHub MCP → ניהול PRs, issues, ו-repositories",
      "Supabase / Convex MCP → ניהול בסיס נתונים מתוך הצ'אט",
      "ההגדרות בקובץ: ~/.claude/.mcp.json",
    ],
    tips: [
      "Context7 + Octocode ביחד = תיעוד רשמי + קוד אמיתי. שימוש בשניהם ביחד עדיף תמיד",
      "כל MCP Server רץ כתהליך נפרד ב-Node.js - אפשר לפתח MCP משלך ב-TypeScript תוך שעה",
    ],
    codeExample: {
      label: "~/.claude/.mcp.json",
      code: `{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    },
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "ghp_..." }
    }
  }
}`,
    },
  },
  {
    id: "skills-hooks",
    emoji: "🧩",
    title: "Skills ו-Hooks",
    description:
      "Skills הם 'תוספים' לClaude שמלמדים אותו אומנויות ספציפיות. Hooks הם אוטומציות שרצות לפני/אחרי כל פעולה.",
    color: "from-amber-600 to-orange-500",
    content: [
      "Skills נמצאים בתיקייה ~/.claude/skills/ - כל Skill הוא קובץ Markdown עם הוראות",
      "/commit → Skill שכותב הודעות commit חכמות בפורמט Conventional Commits",
      "/review → Skill שמפעיל 3 סוקרים מתמחים: איכות, אבטחה, ו-performance",
      "/plan → Skill שמנהל תהליך תכנון מובנה לפני כל פיצ'ר גדול",
      "Hooks: PreToolUse (לפני), PostToolUse (אחרי), Stop (בסיום שיחה)",
      "דוגמה ל-Hook: auto-prettier אחרי כל עריכת JS/TS, tsc אחרי כל TypeScript",
      "יצירת Skill: צור תיקייה ~/.claude/skills/my-skill/ עם קובץ skill.md",
    ],
    tips: [
      "350+ Skills זמינים ב-GitHub - מ-React ועד ביטוח לאומי ישראלי",
      "Hooks חוסכים זמן: auto-format, auto-typecheck, ו-console.log audit רצים לבד",
      "התקנת skill: npx skills add <repo>/<skill-name> -y -g",
    ],
    codeExample: {
      label: "הגדרת Hook ב-settings.json",
      code: `{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [{
          "type": "command",
          "command": "npx prettier --write \\"$CLAUDE_TOOL_INPUT_FILE_PATH\\""
        }]
      }
    ]
  }
}`,
    },
  },
  {
    id: "agents",
    emoji: "🤝",
    title: "עבודה עם סוכנים",
    description:
      "Claude Code יכול להפעיל תת-סוכנים שעובדים במקביל על משימות שונות. זה כמו לנהל צוות של מומחים - כל אחד מתמחה בתחומו.",
    color: "from-rose-600 to-pink-500",
    content: [
      "ה-Agent Tool מאפשר ל-Claude להריץ תת-Claude עם הקשר נקי ומבודד",
      "תת-סוכן לסקירת קוד = אובייקטיביות מלאה (הוא לא כתב את הקוד!)",
      "oh-my-claudecode (OMC) - 32 סוכנים מתמחים מוכנים: architect, executor, security-reviewer",
      "מצב team: plan → design → execute → verify → fix (לולאה אוטומטית)",
      "מצב autopilot: Claude לוקח משימה ועובד עד שהיא גמורה לחלוטין",
      "מצב ralph: כמו autopilot אבל עם persistence - לא עוצר עד שהכל עובד",
      "הרץ 6+ סוכנים במקביל על משימות עצמאיות - חוסך 70%+ זמן",
    ],
    tips: [
      "קוד ריוויו עם תת-סוכן עדיף על ריוויו בשיחה הראשית - הוא לא מוטה כי לא כתב את הקוד",
      "Jim Prosser, יועץ תקשורת שאינו מתכנת, בנה מערכת 'מנהל לשכה' שלמה עם 6 סוכנים ב-36 שעות",
    ],
    codeExample: {
      label: "הפעלת צוות סוכנים",
      code: `# מצב team - צוות מלא
team: בנה API לניהול משתמשים עם auth ו-CRUD מלא

# מצב autopilot - עבודה עצמאית
autopilot: הוסף dark mode לכל הקומפוננטות

# מצב ralph - לא עוצר עד שגמור
ralph: פתור את כל ה-TypeScript errors בפרויקט`,
    },
  },
  {
    id: "workflows",
    emoji: "🔄",
    title: "Workflows - תהליכי עבודה",
    description: "תהליכים מוכחים שחוסכים שעות עבודה כל יום.",
    color: "from-violet-600 to-purple-500",
    content: [
      "TDD (Test-Driven Development) - כתוב טסט → הרץ (אדום) → כתוב קוד → הרץ (ירוק)",
      "Security Scan - סרוק את כל הפרויקט לפגיעויות אבטחה",
      "Code Review - סקירת קוד אוטומטית עם 3 סוקרים מתמחים",
      "Overnight Work - שלח משימות ל-Copilot לפני השינה, קבל PR בבוקר",
      "UI Design → Code - עצב ב-Stitch, קבל קוד, Claude מוסיף לוגיקה",
    ],
  },
  {
    id: "advanced",
    emoji: "💡",
    title: "טיפים מתקדמים",
    description:
      "הטריקים שיהפכו אותך ממשתמש ביניים לאלוף Claude Code. כולל ניהול context, git worktrees, ו-ultrathink.",
    color: "from-gray-600 to-zinc-500",
    content: [
      "ultrathink → כתוב את המילה בפרומפט להפעלת מצב חשיבה מעמיקה (+ צבע קשת בשם!)",
      "/compact → דוחס את ה-context כשהשיחה ארוכה מדי - חוסך טוקנים",
      "Git Worktrees → פתח כמה שיחות Claude במקביל על branches שונות ללא conflict",
      "LSP Integration → ניווט קוד 900x מהיר יותר מ-grep ללא false positives",
      "Escape → בטל פעולה שClaude מריץ כרגע (בלי לסגור את השיחה)",
      "Tab → אשר הצעת קוד בלי להקליד 'כן' / 'yes'",
      "Gemini Image Generation → nano-banana-poster ליצירת תמונות AI בחינם מהטרמינל",
      "שלב AIs: Claude לקוד, v0.dev ל-UI, Gemini לתמונות, Copilot לעבודת לילה",
    ],
    tips: [
      "Git Worktrees = super-power: תיקיה נפרדת לכל branch, Claude בכל אחת עצמאית",
      "CLAUDE.md גלובלי + CLAUDE.md לפרויקט = Claude שמכיר אותך ואת הפרויקט לחלוטין",
      "/cost בסוף כל שיחה - עקוב אחרי הצריכה כדי לדעת אילו tasks שווים את הכסף",
    ],
    codeExample: {
      label: "Git Worktree workflow",
      code: `# צור worktree לפיצ'ר חדש
git worktree add ../my-project-feature feat/new-feature

# פתח Claude בתיקייה הנפרדת
cd ../my-project-feature
claude

# Claude עובד על הבranch הזה בלבד - ללא conflict עם main`,
    },
  },
];

const resources = [
  {
    title: "מדריך Claude Code בעברית",
    description: "מדריך מקיף ומעודכן בעברית מאת Tom Hagiladi",
    href: "https://tomhagiladi.github.io/claude-code-guide/",
    emoji: "📖",
  },
  {
    title: "Ultimate AI Dev Environment",
    description: "350+ Skills, 17 MCP Servers, 32 Agents",
    href: "https://github.com/eladjak/ultimate-ai-dev-environment",
    emoji: "🚀",
  },
  {
    title: "AI Agent Skills Repository",
    description: "350+ Skills מוכנים להתקנה",
    href: "https://github.com/eladjak/ai-agents-skills",
    emoji: "🧩",
  },
  {
    title: "Claude Code Docs (Anthropic)",
    description: "התיעוד הרשמי מ-Anthropic",
    href: "https://docs.anthropic.com/en/docs/claude-code",
    emoji: "📚",
  },
  {
    title: "Israeli Skills Library",
    description: "92 סקילים ישראליים - מס, ביטוח לאומי, בנקאות ועוד",
    href: "https://agentskills.co.il",
    emoji: "🇮🇱",
  },
  {
    title: "oh-my-claudecode (OMC)",
    description: "מערכת multi-agent עם 32 סוכנים מתמחים",
    href: "https://github.com/transcendr/oh-my-claudecode",
    emoji: "🤝",
  },
];

const tocLabels: { id: string; label: string }[] = [
  { id: "what-is", label: "מה זה?" },
  { id: "install", label: "התקנה" },
  { id: "first-steps", label: "צעדים ראשונים" },
  { id: "claude-md", label: "CLAUDE.md" },
  { id: "mcp-servers", label: "MCP" },
  { id: "skills-hooks", label: "Skills" },
  { id: "agents", label: "Agents" },
  { id: "workflows", label: "Workflows" },
  { id: "advanced", label: "טיפים מתקדמים" },
];

export default function ClaudeCodePage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <main className="min-h-dvh bg-background" dir="rtl">
      {/* Sticky TOC pill bar */}
      <div className="sticky top-16 z-30 py-2 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2 bg-background/70 backdrop-blur-md border border-border/50 rounded-2xl px-4 py-2 shadow-sm">
            {tocLabels.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setExpandedSection(item.id);
                  document
                    .getElementById(item.id)
                    ?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-1 rounded-full hover:bg-primary/10"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
              <span className="text-xs font-semibold text-primary tracking-wide uppercase">
                2026 · מעודכן · מדריך מעשי בעברית
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 font-heebo">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-glow">
                המדריך המלא ל-Claude Code
              </span>
            </h1>
            <p className="text-xl sm:text-2xl font-medium text-muted-foreground mb-6">
              מכלי AI לשותף פיתוח אמיתי
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              איך להפוך את Claude Code למנוע הפיתוח שלך - מהתקנה ועד מערכות
              מרובות סוכנים. 350+ מיומנויות, 17 שרתי MCP, וכל מה שצריך כדי
              לבנות תוכנה ב-2026.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {[
              { label: "Skills", value: "350+" },
              { label: "MCP Servers", value: "17" },
              { label: "Agents", value: "32" },
              { label: "מהירות LSP", value: "900x" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-card/60 backdrop-blur-sm rounded-xl p-4 border border-border/50"
              >
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Quick links mini TOC */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            {tocLabels.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setExpandedSection(item.id);
                  document
                    .getElementById(item.id)
                    ?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors bg-card/60 border border-border/50 rounded-full px-4 py-1.5 hover:border-primary/30 hover:bg-primary/5"
              >
                {item.label} ↓
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Guide Sections */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="space-y-4">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <button
                onClick={() =>
                  setExpandedSection(
                    expandedSection === section.id ? null : section.id
                  )
                }
                className="w-full text-right"
              >
                <div
                  className={`group bg-card rounded-2xl border border-border p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md hover:shadow-primary/5 ${
                    expandedSection === section.id
                      ? "ring-2 ring-primary/30 shadow-lg shadow-primary/5 border-primary/20"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center text-2xl shrink-0 shadow-sm shadow-primary/20`}
                    >
                      {section.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-foreground font-heebo">
                        {section.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
                        {section.description}
                      </p>
                    </div>
                    <motion.div
                      animate={{
                        rotate: expandedSection === section.id ? 180 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                      className="text-muted-foreground shrink-0"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {expandedSection === section.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-muted/30 rounded-b-2xl border border-t-0 border-border p-6 -mt-2">
                      <p className="text-muted-foreground mb-4">
                        {section.description}
                      </p>
                      <ul className="space-y-3">
                        {section.content.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-foreground/90"
                          >
                            <span className="text-primary mt-1 shrink-0">
                              &#x2022;
                            </span>
                            <span className="text-sm leading-relaxed">
                              {item.includes("→") ? (
                                <>
                                  <span className="bg-card/80 rounded-lg px-2 py-0.5 font-mono text-xs border border-border/50 ml-1">
                                    {item.split("→")[0].trim()}
                                  </span>
                                  <span className="text-muted-foreground mx-1">→</span>
                                  {item.split("→").slice(1).join("→").trim()}
                                </>
                              ) : (
                                item
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Code Example */}
                      {section.codeExample && (
                        <div className="mt-6">
                          <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                            {section.codeExample.label}
                          </p>
                          <div className="bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden">
                            <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-800 bg-zinc-900/60">
                              <span className="w-3 h-3 rounded-full bg-red-500/70" />
                              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                              <span className="w-3 h-3 rounded-full bg-green-500/70" />
                            </div>
                            <pre
                              className="p-4 text-xs text-zinc-300 overflow-x-auto leading-relaxed font-mono"
                              dir="ltr"
                            >
                              {section.codeExample.code}
                            </pre>
                          </div>
                        </div>
                      )}

                      {section.tips && (
                        <div className="mt-6 bg-primary/5 backdrop-blur-sm rounded-xl p-4 border border-primary/20">
                          <p className="text-sm font-medium text-primary mb-2">
                            💡 טיפים
                          </p>
                          {section.tips.map((tip, i) => (
                            <p
                              key={i}
                              className="text-sm text-foreground/80 mt-1"
                            >
                              {tip}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Resources */}
      <section className="bg-card/50 border-t border-border py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-10 font-heebo"
          >
            משאבים ולינקים
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map((resource, index) => (
              <motion.a
                key={resource.title}
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group bg-card rounded-xl border border-border p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:shadow-primary/10 hover:border-primary/30"
              >
                <div className="text-2xl mb-3">{resource.emoji}</div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors font-heebo">
                  {resource.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {resource.description}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-4 font-heebo">
            מוכן להתחיל?
          </h2>
          <p className="text-muted-foreground mb-8">
            התקן את Claude Code, צור CLAUDE.md, ותתחיל לבנות. הכלים כבר כאן -
            רק צריך להתחיל.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://claude.com/download"
              target="_blank"
              className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-medium px-8 py-3 hover:opacity-90 transition-opacity"
            >
              התקן Claude Code
            </Link>
            <Link
              href="https://github.com/eladjak/ultimate-ai-dev-environment"
              target="_blank"
              className="inline-flex items-center justify-center rounded-full bg-muted text-foreground font-medium px-8 py-3 hover:bg-muted/80 transition-colors"
            >
              GitHub Repository
            </Link>
          </div>
        </div>
      </section>

      {/* About the author */}
      <section className="border-t border-border bg-card/30 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-card rounded-2xl border border-border p-8"
          >
            {/* Avatar placeholder with initials */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-primary-foreground shrink-0 shadow-lg shadow-primary/20">
              א
            </div>
            <div className="flex-1 text-center sm:text-right">
              <h3 className="text-lg font-bold text-foreground font-heebo mb-1">
                אלעד יעקובוביץ&apos;
              </h3>
              <p className="text-sm text-primary font-medium mb-3">
                מפתח Full-Stack ומומחה AI
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                משתמש ב-Claude Code יום-יום עם 350+ סקילים ורשת של 3 סוכני AI
                אוטונומיים. המדריך הזה מבוסס על שנה של עבודה אמיתית - לא
                תיאוריה.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 text-sm font-medium text-primary hover:underline transition-colors"
                >
                  צור קשר
                  <span aria-hidden="true">←</span>
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  שירותי ייעוץ AI
                  <span aria-hidden="true">←</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
