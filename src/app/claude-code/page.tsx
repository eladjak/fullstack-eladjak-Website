"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Share2,
  Copy,
  Check,
  ChevronDown,
  Sparkles,
  Zap,
  Shield,
  Users,
  Terminal,
  Lightbulb,
  Rocket,
  BookOpen,
  Code2,
  Puzzle,
  Bot,
  RefreshCw,
  Star,
} from "lucide-react";

/* ─── Types ─── */
type Difficulty = "beginner" | "intermediate" | "advanced";

interface GuideSection {
  id: string;
  icon: typeof Sparkles;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  difficulty: Difficulty;
  content: string[];
  beginner?: string; // simple explanation for non-tech users
  tips?: string[];
  codeExample?: { label: string; code: string };
}

/* ─── Data ─── */
const difficultyConfig: Record<
  Difficulty,
  { label: string; color: string; bg: string }
> = {
  beginner: {
    label: "למתחילים",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  intermediate: {
    label: "בינוני",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  advanced: {
    label: "מתקדם",
    color: "text-rose-400",
    bg: "bg-rose-500/10 border-rose-500/20",
  },
};

const paradigmShifts = [
  {
    before: "חיפוש ב-StackOverflow שעות",
    after: "תשובה מדויקת ומותאמת לפרויקט שלך תוך שניות",
    icon: Zap,
  },
  {
    before: "לימוד framework חדש שבועות",
    after: "Claude בונה בו פרויקט עובד ומסביר כל שורה",
    icon: BookOpen,
  },
  {
    before: "שכירת צוות מפתחים, בודקים, מעצבים",
    after: "כל המומחויות הללו בכלי אחד, 24/7",
    icon: Users,
  },
  {
    before: 'בניית אתר מ-0 תוך שבועות',
    after: "אתר מלא עם עיצוב, SEO ותוכן תוך שעות בודדות",
    icon: Rocket,
  },
];

const whoIsThisFor = [
  {
    title: "יזמים ובעלי עסקים",
    description: "בנו אתרים, אפליקציות וכלים בעצמכם — בלי צוות פיתוח. Claude Code הוא צוות הפיתוח שלכם.",
    icon: Star,
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "מפתחים מתחילים",
    description: "למדו תוך כדי בנייה. Claude מסביר כל שורה, מתקן טעויות, ומלמד best practices בזמן אמת.",
    icon: Lightbulb,
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "מפתחים מנוסים",
    description: "הכפילו את הפרודוקטיביות. 32 סוכנים מקבילים, 350+ מיומנויות, ובדיקות אוטומטיות.",
    icon: Code2,
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "אנשי תוכן ושיווק",
    description: "בנו landing pages, כלים אינטראקטיביים, ואוטומציות — בלי לכתוב שורת קוד אחת.",
    icon: Sparkles,
    color: "from-pink-500 to-rose-500",
  },
];

const sections: GuideSection[] = [
  {
    id: "what-is",
    icon: Bot,
    title: "מה זה Claude Code?",
    subtitle: "לא עוד צ'אטבוט — לשכה שלמה של מומחים",
    description:
      "Claude Code הוא סוכן AI אוטונומי שפועל ישירות מהטרמינל שלך. הוא קורא קבצים, כותב קוד, מריץ פקודות ומחפש באינטרנט — הכל משיחה טבעית.",
    color: "from-violet-600 to-purple-500",
    difficulty: "beginner",
    beginner:
      "תחשבו על זה ככה: במקום לשכור מתכנת, מעצב, בודק ומומחה אבטחה — יש לכם את כולם בכלי אחד. אתם אומרים מה אתם רוצים בעברית, והוא בונה את זה. לא צריך לדעת לתכנת.",
    content: [
      "סוכן AI אוטונומי של Anthropic שמבין את הפרויקט שלך לעומק",
      "עובד ישירות בטרמינל — לא צריך IDE מיוחד",
      "קורא, כותב ועורך קבצים, מריץ טסטים, ומבצע Git operations",
      "תומך ב-MCP לחיבור לשירותים חיצוניים (GitHub, בסיסי נתונים, עיצוב UI)",
      "מערכת Skills עם 350+ מיומנויות מותקנות",
    ],
    tips: [
      "Claude Code שונה מ-ChatGPT — הוא לא רק עונה, הוא באמת עושה. כותב קבצים, מריץ פקודות, ומתקן באגים",
      "הוא מנהל פרויקטים שלמים מאפס ועד לפרודקשן",
    ],
  },
  {
    id: "install",
    icon: Zap,
    title: "התקנה מהירה",
    subtitle: "5 דקות ואתם בפנים",
    description: "5 דרכים להתקין את Claude Code — בחרו את מה שמתאים לכם.",
    color: "from-emerald-600 to-teal-500",
    difficulty: "beginner",
    beginner:
      "הדרך הכי פשוטה: הורידו את האפליקציה מ-claude.com/download. פתחו, התחברו, והתחילו לדבר. זה באמת ככה פשוט.",
    content: [
      "npm install -g @anthropic-ai/claude-code → התקנה גלובלית דרך npm",
      "אפליקציית Desktop → claude.com/download (Windows / Mac / Linux)",
      "VS Code Extension → חפשו 'Claude Code' ב-Extensions",
      "JetBrains Plugin → זמין ל-WebStorm, IntelliJ, PyCharm",
      "גישה דרך הדפדפן → claude.com/code",
    ],
    tips: [
      "מומלץ להתחיל עם אפליקציית Desktop — הכי פשוט",
      "צריך מנוי Anthropic — Pro ($20/חודש) או Max ($100/חודש)",
    ],
    codeExample: {
      label: "התקנה בשורה אחת",
      code: "npm install -g @anthropic-ai/claude-code\ncd my-project\nclaude",
    },
  },
  {
    id: "first-steps",
    icon: Rocket,
    title: "צעדים ראשונים",
    subtitle: "מהרגע הראשון ועד לתוצאה",
    description: "איך מתחילים לעבוד? הנה הצעדים הבסיסיים.",
    color: "from-purple-600 to-violet-500",
    difficulty: "beginner",
    beginner:
      "פתחו את Claude Code, ואמרו לו מה אתם רוצים. למשל: 'תבנה לי אתר תדמית לעסק שלי — מכירת פרחים בנתניה'. הוא שואל שאלות, מקבל תשובות, ובונה. זהו.",
    content: [
      "פתחו טרמינל בתיקיית הפרויקט שלכם",
      "הקלידו claude ולחצו Enter",
      "תארו מה אתם רוצים לבנות בשפה טבעית (עברית או אנגלית!)",
      "Claude קורא את הקבצים, מבין את המבנה, ומתחיל לעבוד",
      "אשרו או דחו כל פעולה שהוא מציע — אתם תמיד בשליטה",
    ],
    tips: [
      "הקלידו /init בפעם הראשונה כדי ליצור קובץ CLAUDE.md עם הגדרות הפרויקט",
      "השתמשו ב-/help לרשימת פקודות מלאה",
    ],
  },
  {
    id: "claude-md",
    icon: BookOpen,
    title: 'CLAUDE.md — הקובץ הכי חשוב',
    subtitle: "חוזה העבודה שלך עם Claude",
    description:
      "CLAUDE.md הוא קובץ שנטען אוטומטית בכל שיחה ומלמד את Claude איך אתם עובדים, מה ה-stack שלכם, ומה חשוב לכם.",
    color: "from-blue-600 to-indigo-500",
    difficulty: "intermediate",
    beginner:
      "דמיינו שאתם שוכרים עובד חדש. אתם נותנים לו מסמך עם 'הכללים של החברה'. CLAUDE.md זה בדיוק זה — פעם אחת כותבים, ומאז Claude תמיד יודע מה אתם אוהבים ומה לא.",
    content: [
      "CLAUDE.md גלובלי → ~/.claude/CLAUDE.md (חל על כל הפרויקטים)",
      "CLAUDE.md לפרויקט → /my-project/CLAUDE.md (ייחודי לפרויקט)",
      "שניהם נטענים יחד — הגלובלי קודם, אחר-כך הייחודי",
      "כללו: stack טכנולוגי, כללי סגנון קוד, כלים מועדפים, ומה לא לעשות",
    ],
    tips: [
      "ככל שה-CLAUDE.md מפורט יותר — Claude מבין טוב יותר ושואל פחות שאלות",
      "הקלידו /init כדי שClaude ייצור את הקובץ הראשוני לכם אוטומטית",
    ],
    codeExample: {
      label: "דוגמה ל-CLAUDE.md",
      code: `# My Project

## Stack
Next.js 14, TypeScript, Tailwind CSS, Supabase

## Rules
- Always write in Hebrew for UI text
- Use functional components only
- Never hardcode secrets

## Commit Messages
Format: feat/fix/refactor: description`,
    },
  },
  {
    id: "mcp-servers",
    icon: Puzzle,
    title: "MCP — חיבור לעולם החיצון",
    subtitle: "הסטנדרט שמרחיב את Claude לאינסוף",
    description:
      "MCP מאפשר ל-Claude להתחבר לכלים חיצוניים — GitHub, עיצוב UI, בסיסי נתונים, גלישה באינטרנט ועוד.",
    color: "from-cyan-600 to-teal-500",
    difficulty: "intermediate",
    beginner:
      "MCP זה כמו 'תוספים' לClaude. רוצים שהוא יעצב לכם UI? יש לזה תוסף. רוצים שהוא ינהל לכם את GitHub? יש תוסף. כל תוסף פותח יכולת חדשה.",
    content: [
      "Context7 → תיעוד עדכני של ספריות (no knowledge cutoff!)",
      "Octocode → חיפוש קוד אמיתי מ-GitHub",
      "Stitch (Google) → עיצוב UI ויצוא HTML/Tailwind",
      "Playwright → גלישה ואינטראקציה עם אתרים",
      "GitHub MCP → ניהול PRs, issues, ו-repositories",
      "ההגדרות בקובץ: ~/.claude/.mcp.json",
    ],
    tips: [
      "Context7 + Octocode ביחד = תיעוד + קוד אמיתי. תמיד עדיף שניהם",
      "אפשר לפתח MCP משלכם ב-TypeScript תוך שעה",
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
    }
  }
}`,
    },
  },
  {
    id: "skills-hooks",
    icon: Sparkles,
    title: "Skills ו-Hooks",
    subtitle: '350+ מיומנויות מוכנות לשימוש',
    description:
      "Skills הם תוספים שמלמדים את Claude אומנויות ספציפיות. Hooks הם אוטומציות שרצות לפני/אחרי כל פעולה.",
    color: "from-amber-600 to-orange-500",
    difficulty: "intermediate",
    beginner:
      "Skills זה כמו לתת לClaude 'קורסים'. יש skill לכתיבת commit messages חכמות, skill לסקירת אבטחה, skill להתאמה לנגישות ישראלית — 350+ כאלה מוכנים.",
    content: [
      "Skills בתיקייה ~/.claude/skills/ — כל Skill הוא קובץ Markdown",
      "/commit → הודעות commit חכמות בפורמט מובנה",
      "/review → סקירת קוד אוטומטית עם 3 סוקרים מתמחים",
      "/plan → תכנון מובנה לפני כל פיצ'ר גדול",
      "Hooks: auto-prettier אחרי כל עריכה, tsc אחרי TypeScript",
    ],
    tips: [
      "350+ Skills זמינים ב-GitHub — מ-React ועד ביטוח לאומי ישראלי",
      "התקנת skill: npx skills add <repo>/<skill-name> -y -g",
    ],
    codeExample: {
      label: "הגדרת Hook אוטומטי",
      code: `{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write|Edit",
      "hooks": [{
        "type": "command",
        "command": "npx prettier --write \\"$CLAUDE_TOOL_INPUT_FILE_PATH\\""
      }]
    }]
  }
}`,
    },
  },
  {
    id: "agents",
    icon: Users,
    title: "עבודה עם סוכנים",
    subtitle: "צוות שלם שעובד בשבילך במקביל",
    description:
      "Claude Code מפעיל תת-סוכנים שעובדים במקביל — כמו לנהל צוות של מומחים.",
    color: "from-rose-600 to-pink-500",
    difficulty: "advanced",
    beginner:
      "תחשבו על זה כמו לנהל צוות: אחד מעצב, אחד כותב קוד, אחד בודק אבטחה — כולם עובדים במקביל. Jim Prosser, יועץ תקשורת שאינו מתכנת, בנה מערכת 'מנהל לשכה' שלמה ב-36 שעות.",
    content: [
      "Agent Tool מריץ תת-Claude עם הקשר נקי ומבודד",
      "32 סוכנים מתמחים: architect, executor, security-reviewer",
      "מצב team → plan → design → execute → verify → fix (לולאה אוטומטית)",
      "מצב autopilot → Claude עובד עד שהמשימה גמורה לחלוטין",
      "6+ סוכנים במקביל — חוסך 70%+ זמן על משימות עצמאיות",
    ],
    tips: [
      "קוד ריוויו עם תת-סוכן = אובייקטיביות מלאה, כי הוא לא כתב את הקוד",
    ],
    codeExample: {
      label: "הפעלת צוות סוכנים",
      code: `# צוות מלא - תכנון עד אימות
team: בנה API לניהול משתמשים עם auth

# עבודה עצמאית
autopilot: הוסף dark mode לכל הקומפוננטות

# לא עוצר עד שגמור
ralph: פתור את כל ה-TypeScript errors`,
    },
  },
  {
    id: "workflows",
    icon: RefreshCw,
    title: "Workflows — תהליכי עבודה",
    subtitle: "שגרות שחוסכות שעות כל יום",
    description: "תהליכים מוכחים שחוסכים שעות עבודה.",
    color: "from-indigo-600 to-blue-500",
    difficulty: "intermediate",
    content: [
      "TDD → כתוב טסט → הרץ (אדום) → כתוב קוד → הרץ (ירוק) → שפר",
      "Security Scan → סריקת פגיעויות אבטחה אוטומטית",
      "Code Review → 3 סוקרים מתמחים (איכות, אבטחה, ביצועים)",
      "UI Design → Code → עיצוב ב-Stitch, Claude מוסיף לוגיקה",
      "Overnight Work → שלח משימות לפני השינה, קבל PR בבוקר",
    ],
  },
  {
    id: "advanced",
    icon: Terminal,
    title: "טיפים מתקדמים",
    subtitle: "מביניים לאלופים",
    description: "הטריקים שמפילים את הלסת.",
    color: "from-gray-600 to-zinc-500",
    difficulty: "advanced",
    content: [
      "ultrathink → מצב חשיבה מעמיקה (כתבו את המילה בפרומפט)",
      "/compact → דחיסת context בשיחות ארוכות — חוסך טוקנים",
      "Git Worktrees → כמה שיחות Claude במקביל על branches שונות",
      "LSP Integration → ניווט קוד 900x מהיר מ-grep",
      "Tab → אישור מהיר בלי להקליד 'כן'",
      "Escape → ביטול פעולה שClaude מריץ כרגע",
      "שילוב AIs: Claude לקוד, Gemini לתמונות, Copilot לעבודת לילה",
    ],
    tips: [
      "Git Worktrees = super-power: תיקיה נפרדת לכל branch",
      "CLAUDE.md גלובלי + CLAUDE.md לפרויקט = Claude שמכיר אותך לחלוטין",
    ],
    codeExample: {
      label: "Git Worktree workflow",
      code: `# צור worktree לפיצ'ר חדש
git worktree add ../my-project-feature feat/new-feature
cd ../my-project-feature
claude   # Claude עובד על branch נפרד — ללא conflict`,
    },
  },
];

const resources = [
  {
    title: "מדריך Claude Code בעברית",
    description: "מדריך מקיף ומעודכן בעברית מאת Tom Hagiladi",
    href: "https://tomhagiladi.github.io/claude-code-guide/",
    icon: BookOpen,
  },
  {
    title: "Ultimate AI Dev Environment",
    description: "350+ Skills, 17 MCP Servers, 32 Agents",
    href: "https://github.com/eladjak/ultimate-ai-dev-environment",
    icon: Rocket,
  },
  {
    title: "AI Agent Skills Repository",
    description: "350+ Skills מוכנים להתקנה",
    href: "https://github.com/eladjak/ai-agents-skills",
    icon: Puzzle,
  },
  {
    title: "Claude Code Docs (Anthropic)",
    description: "התיעוד הרשמי מ-Anthropic",
    href: "https://docs.anthropic.com/en/docs/claude-code",
    icon: BookOpen,
  },
  {
    title: "Israeli Skills Library",
    description: "92 סקילים ישראליים — מס, ביטוח לאומי, בנקאות",
    href: "https://agentskills.co.il",
    icon: Star,
  },
  {
    title: "oh-my-claudecode (OMC)",
    description: "מערכת multi-agent עם 32 סוכנים מתמחים",
    href: "https://github.com/transcendr/oh-my-claudecode",
    icon: Users,
  },
];

const tocLabels = [
  { id: "paradigm", label: "למה עכשיו?" },
  { id: "what-is", label: "מה זה?" },
  { id: "install", label: "התקנה" },
  { id: "first-steps", label: "צעדים ראשונים" },
  { id: "claude-md", label: "CLAUDE.md" },
  { id: "mcp-servers", label: "MCP" },
  { id: "skills-hooks", label: "Skills" },
  { id: "agents", label: "Agents" },
  { id: "workflows", label: "Workflows" },
  { id: "advanced", label: "טיפים" },
];

/* ─── Component ─── */
export default function ClaudeCodePage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showBeginner, setShowBeginner] = useState(true);

  const handleShare = async () => {
    const url = "https://fullstack-eladjak.co.il/claude-code";
    if (typeof navigator !== "undefined" && navigator.share) {
      await navigator.share({ title: "המדריך המלא ל-Claude Code", url });
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const scrollToSection = (id: string) => {
    setExpandedSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <main className="min-h-dvh bg-background" dir="rtl">
      {/* Sticky TOC */}
      <div className="sticky top-16 z-30 py-2 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-1.5 bg-background/70 backdrop-blur-md border border-border/50 rounded-2xl px-3 py-2 shadow-sm">
            {tocLabels.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
                className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors px-2.5 py-1 rounded-full hover:bg-primary/10"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/claude-code-hero.jpg"
            alt=""
            fill
            className="object-cover opacity-20"
            priority
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* Badge + Share */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5">
                <span className="text-xs font-semibold text-primary tracking-wide uppercase">
                  2026 · מעודכן · מדריך מעשי בעברית
                </span>
              </div>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 bg-card/60 border border-border/50 rounded-full px-3 py-1.5 text-xs text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                aria-label="שיתוף המדריך"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
                {copied ? "הועתק!" : "שתפו"}
              </button>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 font-heebo">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-glow">
                המדריך המלא ל-Claude Code
              </span>
            </h1>
            <p className="text-xl sm:text-2xl font-medium text-foreground/80 mb-4">
              לא רק כלי AI — <span className="text-primary">לשכה שלמה של מומחים</span> שעובדת בשבילך
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              תארו לעצמכם שיש לכם צוות של מתכנת, מעצב, בודק, מומחה אבטחה, וכותב תוכן —
              כולם זמינים 24/7, עובדים במקביל, ועולים פחות ממנוי חודשי אחד.
              זה Claude Code.
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
              { label: "מיומנויות", value: "350+" },
              { label: "חיבורי MCP", value: "17" },
              { label: "סוכנים", value: "32" },
              { label: "מהירות LSP", value: "900x" },
            ].map((stat) => (
              <div key={stat.label} className="bg-card/60 backdrop-blur-sm rounded-xl p-4 border border-border/50">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Beginner/Advanced toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex justify-center"
          >
            <div className="inline-flex bg-card/60 border border-border/50 rounded-full p-1">
              <button
                onClick={() => setShowBeginner(true)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  showBeginner ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                הסבר פשוט
              </button>
              <button
                onClick={() => setShowBeginner(false)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  !showBeginner ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                מצב טכני
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ PARADIGM SHIFT ═══════ */}
      <section id="paradigm" className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/claude-code-team.jpg" alt="" fill className="object-cover opacity-10" loading="lazy" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-heebo">
              למה זה <span className="text-primary">משנה הכל</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              זה לא עוד מודל שפה שעונה על שאלות. זה כלי שבאמת <strong className="text-foreground">עושה את העבודה</strong> במקומכם.
            </p>
          </motion.div>

          {/* Before/After cards */}
          <div className="grid sm:grid-cols-2 gap-4 mb-16">
            {paradigmShifts.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 p-5 hover:border-primary/20 transition-all duration-300"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground line-through decoration-red-400/50">{item.before}</p>
                      <p className="text-sm font-medium text-foreground mt-1">{item.after}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Who is this for */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold font-heebo mb-2">למי זה מתאים?</h3>
            <p className="text-muted-foreground">ממש לכולם. הנה איך:</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whoIsThisFor.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 p-5 text-center hover:border-primary/20 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-white mb-3`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ GUIDE SECTIONS ═══════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold font-heebo mb-2">
            המדריך המעשי
          </h2>
          <p className="text-muted-foreground">לחצו על כל סעיף לפתיחה</p>
        </div>

        <div className="space-y-4">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const diff = difficultyConfig[section.difficulty];
            const isExpanded = expandedSection === section.id;

            return (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
              >
                <button
                  onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                  className="w-full text-right"
                >
                  <div className={`group bg-card rounded-2xl border border-border p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md ${
                    isExpanded ? "ring-2 ring-primary/30 shadow-lg border-primary/20" : ""
                  }`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center shrink-0 shadow-sm`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="text-lg font-bold text-foreground font-heebo">
                            {section.title}
                          </h3>
                          <span className={`text-[10px] font-medium border rounded-full px-2 py-0.5 ${diff.bg} ${diff.color}`}>
                            {diff.label}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {section.subtitle}
                        </p>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-muted-foreground shrink-0"
                      >
                        <ChevronDown className="h-5 w-5" />
                      </motion.div>
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-muted/30 rounded-b-2xl border border-t-0 border-border p-5 sm:p-6 -mt-2">
                        {/* Beginner explanation */}
                        {showBeginner && section.beginner && (
                          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 mb-5">
                            <p className="text-sm font-medium text-emerald-400 mb-1 flex items-center gap-1.5">
                              <Lightbulb className="h-4 w-4" /> בשפה פשוטה:
                            </p>
                            <p className="text-sm text-foreground/80 leading-relaxed">
                              {section.beginner}
                            </p>
                          </div>
                        )}

                        <p className="text-muted-foreground mb-4 text-sm">{section.description}</p>

                        <ul className="space-y-3">
                          {section.content.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-foreground/90">
                              <span className="text-primary mt-1 shrink-0">&#x2022;</span>
                              <span className="text-sm leading-relaxed">
                                {item.includes("→") ? (
                                  <>
                                    <span className="bg-card/80 rounded-lg px-2 py-0.5 font-mono text-xs border border-border/50 ml-1">
                                      {item.split("→")[0]!.trim()}
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
                              <pre className="p-4 text-xs text-zinc-300 overflow-x-auto leading-relaxed font-mono" dir="ltr">
                                {section.codeExample.code}
                              </pre>
                            </div>
                          </div>
                        )}

                        {section.tips && (
                          <div className="mt-6 bg-primary/5 rounded-xl p-4 border border-primary/20">
                            <p className="text-sm font-medium text-primary mb-2 flex items-center gap-1.5">
                              <Lightbulb className="h-4 w-4" /> טיפים
                            </p>
                            {section.tips.map((tip, i) => (
                              <p key={i} className="text-sm text-foreground/80 mt-1">
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
            );
          })}
        </div>
      </section>

      {/* ═══════ RESOURCES ═══════ */}
      <section className="bg-card/50 border-t border-border py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-10 font-heebo">
            משאבים ולינקים
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <motion.a
                  key={resource.title}
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="group bg-card rounded-xl border border-border p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:shadow-primary/10 hover:border-primary/30"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors font-heebo">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="relative py-16 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/claude-code-journey.jpg" alt="" fill className="object-cover opacity-10" loading="lazy" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-4 font-heebo">
            מוכנים להתחיל?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            התקינו את Claude Code, צרו CLAUDE.md, ותתחילו לבנות.
            הכלים כבר כאן — רק צריך להתחיל.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://claude.com/download"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground font-medium px-8 py-3.5 hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
            >
              <Zap className="h-5 w-5" />
              התקינו Claude Code
            </Link>
            <Link
              href="https://github.com/eladjak/ultimate-ai-dev-environment"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-muted text-foreground font-medium px-8 py-3.5 hover:bg-muted/80 transition-colors"
            >
              <Code2 className="h-5 w-5" />
              GitHub Repository
            </Link>
          </div>

          {/* Share bar */}
          <div className="mt-10 flex items-center justify-center gap-3">
            <span className="text-sm text-muted-foreground">אהבתם? שתפו:</span>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 bg-card/60 border border-border/50 rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "הועתק!" : "העתיקו קישור"}
            </button>
          </div>
        </div>
      </section>

      {/* ═══════ AUTHOR ═══════ */}
      <section className="border-t border-border bg-card/30 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-card rounded-2xl border border-border p-8"
          >
            <Image
              src="https://avatars.githubusercontent.com/u/108827199?v=4"
              alt="Elad Yaakobovitch"
              width={64}
              height={64}
              className="rounded-2xl shadow-lg shadow-primary/20 shrink-0"
            />
            <div className="flex-1 text-center sm:text-right">
              <h3 className="text-lg font-bold text-foreground font-heebo mb-1">
                אלעד יעקובוביץ&apos;
              </h3>
              <p className="text-sm text-primary font-medium mb-3">
                מפתח Full-Stack ומומחה AI
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                משתמש ב-Claude Code יום-יום עם 350+ סקילים ורשת של 3 סוכני AI
                אוטונומיים. המדריך הזה מבוסס על שנה של עבודה אמיתית — לא
                תיאוריה.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  צרו קשר <span aria-hidden="true">←</span>
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  שירותי ייעוץ AI
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
