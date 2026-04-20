import {
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
  Github,
  ExternalLink,
  Brain,
  Mail,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const claudeCodeGuide: AgentGuideData = {
  slug: "claude-code",
  agentName: "Claude Code",
  agentNameHe: "Claude Code",
  tagline: "לא עוד כלי AI — צוות שלם של מומחים שעובד בשבילך",
  heroDescription: "תארו לעצמכם שיש לכם צוות של מתכנת, מעצב, בודק, מומחה אבטחה, וכותב תוכן — כולם זמינים 24/7, עובדים במקביל, ועולים פחות ממנוי חודשי אחד. זה Claude Code — וכבר שנה שאני משתמש בו יומיום.",
  badgeText: "2026 · מעודכן · מדריך מעשי בעברית",
  canonical: "https://fullstack-eladjak.co.il/claude-code",
  heroBgImage: "/images/guides/guide-claude-code-hero.jpg",
  stats: [
    { label: "מיומנויות", value: "350+" },
    { label: "חיבורי MCP", value: "17" },
    { label: "סוכנים", value: "32" },
    { label: "מהירות LSP", value: "900x" },
  ],
  paradigmTitle: "למה זה משנה הכל?",
  paradigmSub:
    "זה לא עוד מודל שפה שעונה על שאלות. זה כלי שבאמת עושה את העבודה במקומכם.",
  paradigmShifts: [
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
      before: "בניית אתר מ-0 תוך שבועות",
      after: "אתר מלא עם עיצוב, SEO ותוכן תוך שעות בודדות",
      icon: Rocket,
    },
  ],
  whoIsThisFor: [
    {
      title: "יזמים ובעלי עסקים",
      description:
        "בנו אתרים, אפליקציות וכלים בעצמכם — בלי צוות פיתוח. Claude Code הוא צוות הפיתוח שלכם.",
      icon: Star,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "מפתחים מתחילים",
      description:
        "למדו תוך כדי בנייה. Claude מסביר כל שורה, מתקן טעויות, ומלמד best practices בזמן אמת.",
      icon: Lightbulb,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "מפתחים מנוסים",
      description:
        "הכפילו את הפרודוקטיביות. 32 סוכנים מקבילים, 350+ מיומנויות, ובדיקות אוטומטיות.",
      icon: Code2,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "אנשי תוכן ושיווק",
      description:
        "בנו landing pages, כלים אינטראקטיביים, ואוטומציות — בלי לכתוב שורת קוד אחת.",
      icon: Sparkles,
      color: "from-pink-500 to-rose-500",
    },
  ],
  toc: [
    { id: "paradigm", label: "למה עכשיו?" },
    { id: "what-is", label: "מה זה?" },
    { id: "install", label: "התקנה" },
    { id: "first-steps", label: "צעדים" },
    { id: "claude-md", label: "CLAUDE.md" },
    { id: "mcp-servers", label: "MCP" },
    { id: "skills-hooks", label: "Skills" },
    { id: "agents", label: "Agents" },
    { id: "workflows", label: "Workflows" },
    { id: "advanced", label: "מתקדם" },
  ],
  sections: [
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
      description:
        "5 דרכים להתקין את Claude Code — בחרו את מה שמתאים לכם.",
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
      title: "CLAUDE.md — הקובץ הכי חשוב",
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
        code: "# My Project\n\n## Stack\nNext.js 14, TypeScript, Tailwind CSS, Supabase\n\n## Rules\n- Always write in Hebrew for UI text\n- Use functional components only\n- Never hardcode secrets\n\n## Commit Messages\nFormat: feat/fix/refactor: description",
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
        "MCP זה כמו 'תוספים' ל-Claude. רוצים שהוא יעצב לכם UI? יש לזה תוסף. רוצים שהוא ינהל לכם את GitHub? יש תוסף. כל תוסף פותח יכולת חדשה.",
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
        code: '{\n  "mcpServers": {\n    "context7": {\n      "command": "npx",\n      "args": ["-y", "@upstash/context7-mcp@latest"]\n    },\n    "playwright": {\n      "command": "npx",\n      "args": ["@playwright/mcp@latest"]\n    }\n  }\n}',
      },
    },
    {
      id: "skills-hooks",
      icon: Sparkles,
      title: "Skills ו-Hooks",
      subtitle: "350+ מיומנויות מוכנות לשימוש",
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
        "תחשבו על זה כמו לנהל צוות: אחד מעצב, אחד כותב קוד, אחד בודק אבטחה — כולם עובדים במקביל. מי שאינו מתכנת, יכול לבנות 'מנהל לשכה' שלם ב-36 שעות.",
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
        code: "# צוות מלא - תכנון עד אימות\nteam: בנה API לניהול משתמשים עם auth\n\n# עבודה עצמאית\nautopilot: הוסף dark mode לכל הקומפוננטות\n\n# לא עוצר עד שגמור\nralph: פתור את כל ה-TypeScript errors",
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
      color: "from-slate-600 to-zinc-500",
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
        code: "# צור worktree לפיצ'ר חדש\ngit worktree add ../my-project-feature feat/new-feature\ncd ../my-project-feature\nclaude   # Claude עובד על branch נפרד — ללא conflict",
      },
    },
  ],
  resources: [
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
  ],
  ctaTitle: "מוכנים להתחיל?",
  ctaSub:
    "התקינו את Claude Code, צרו CLAUDE.md, ותתחילו לבנות. הכלים כבר כאן — רק צריך להתחיל.",
  primaryCta: {
    label: "התקינו Claude Code",
    href: "https://claude.com/download",
    icon: Zap,
  },
  secondaryCta: {
    label: "GitHub Repository",
    href: "https://github.com/eladjak/ultimate-ai-dev-environment",
    icon: Code2,
  },
  authorBio:
    "משתמש ב-Claude Code יום-יום עם 350+ סקילים ורשת של 10 סוכני AI אוטונומיים. המדריך הזה מבוסס על שנה של עבודה אמיתית — לא תיאוריה. בנוי כנקודת כניסה מדויקת ליזמים, מפתחים, ואנשי תוכן.",
};
