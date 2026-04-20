import {
  Terminal,
  Code2,
  GitCommit,
  Keyboard,
  Layers,
  DollarSign,
  Lock,
  Github,
  ExternalLink,
  BookOpen,
  Rocket,
  Lightbulb,
  Users,
  Mail,
  Zap,
  RefreshCw,
  CheckCheck,
  Cpu,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const aiderGuide: AgentGuideData = {
  slug: "aider",
  agentName: "Aider",
  agentNameHe: "Aider — CLI לתכנות בזוג",
  tagline: "Aider בכל editor. Claude Code הוא הראשי — Aider הוא ה-backup החופשי",
  heroDescription:
    "Aider הוא CLI לתכנות בזוג עם AI, כתוב ב-Python. תומך ב-100+ מודלים (Anthropic, OpenAI, Gemini, OpenRouter, Ollama), מבצע edits ישירות על קבצים, committים אוטומטית ב-git, ומכיל repo-map חכם שמבין את הפרויקט. אצלי Aider מותקן מבודד עם credentials נפרדים (לא Claude Max) ומודלים חינמיים (qwen3-coder:free דרך OpenRouter) — כ-backup כש-Claude Max במכסה או בזמן שרוצה פרסום פרטי. אצלך Aider יכול להיות הכלי הראשי: אם אין לכם Claude Pro/Max, או שאתם חוקרי privacy שצריכים local-only (עם Ollama), Aider נותן 80% מהיכולת של Claude Code בחינם מוחלט.",
  badgeText: "2026 · AI Pair Programming CLI · מדריך מעשי",
  canonical: "https://fullstack-eladjak.co.il/guide/aider",
  heroBgImage: "/images/guides/guide-aider-hero.jpg",
  stats: [
    { label: "מודלים נתמכים", value: "100+" },
    { label: "git integration", value: "auto" },
    { label: "התקנה", value: "pip" },
    { label: "fallback חינם", value: "קיים" },
  ],
  paradigmTitle: "למה עוד כלי?",
  paradigmSub:
    "Claude Code מעולה, אבל יש מצבים שבהם Aider עדיף: חינם מוחלט, isolation, local models, או CI/CD חסכני.",
  paradigmShifts: [
    {
      before: "Claude Pro 20$/חודש הוא המינימום ל-AI coding",
      after: "Aider + OpenRouter qwen3:free = 0$ לחלוטין",
      icon: DollarSign,
    },
    {
      before: "כל הפרויקטים רצים על אותם credentials",
      after: "Aider מבודד — חשבון עם credits שונה, בלי לגעת ב-Max",
      icon: Lock,
    },
    {
      before: "לשלב AI ב-CI/CD = לבנות wrapper מאפס",
      after: "aider --yes --message 'fix lint' ב-GitHub Action",
      icon: Zap,
    },
    {
      before: "סוד של ארגון לא יוצא מהמחשב",
      after: "Aider + Ollama qwen3-coder = air-gapped full",
      icon: Terminal,
    },
  ],
  whoIsThisFor: [
    {
      title: "מפתחים ללא Claude Pro",
      description:
        "רוצים AI pair programming בחינם — OpenRouter עם qwen3-coder:free נותן את רוב הערך.",
      icon: DollarSign,
      color: "from-emerald-500 to-green-500",
    },
    {
      title: "פרטיות מחמירה",
      description:
        "Aider + Ollama מקומי = air-gapped. קוד לא יוצא מהמחשב. רפואה, משפט, ביטחון.",
      icon: Lock,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "CI/CD automation",
      description:
        "להוסיף AI fix לpipeline — Aider הוא ה-CLI שמתאים (תמיכה מלאה ב--yes).",
      icon: Zap,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "משתמשי Claude Code שרוצים backup",
      description:
        "במכסה של Max? Aider עם credits נפרדים ממשיך את העבודה מבלי לפגוע ב-token budget.",
      icon: RefreshCw,
      color: "from-violet-500 to-purple-500",
    },
  ],
  toc: [
    { id: "what-is", label: "מה זה" },
    { id: "install", label: "התקנה ובידוד" },
    { id: "models", label: "מודלים" },
    { id: "workflow", label: "workflow" },
    { id: "advanced", label: "טכניקות" },
    { id: "compare", label: "Aider מול Claude Code" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Terminal,
      title: "Aider — מה הוא",
      subtitle: "CLI שעורך קבצים ומבצע git commits אוטומטית",
      description:
        "Aider הוא Python CLI שמחבר LLM ל-repository מקומי. בניגוד ל-ChatGPT שמחזיר טקסט, Aider עורך את הקבצים עצמם, מריץ tests (אם מבקשים), ומבצע git commit עם הודעה אוטומטית.",
      color: "from-orange-600 to-red-500",
      difficulty: "beginner",
      beginner:
        "פותחים terminal, מריצים aider בתוך פרויקט git, מבקשים 'תקן את הבאג ב-login.ts' — Aider עורך את הקובץ, commits. אפשר לראות diff, לערוך שוב, לעשות undo דרך git.",
      content: [
        "Python CLI — pip install aider-chat או pipx install (מומלץ, isolation)",
        "repo-map: Aider סורק את הפרויקט + יוצר summary לכל קובץ; ה-LLM מקבל רק מה שרלוונטי",
        "auto-commit: כל שינוי מבוצע עם git commit עם הודעה אוטומטית + ציטוט של ה-request",
        "diff view: לפני ואחרי, אפשר לדחות שינוי עם /undo",
        "תומך ב-100+ מודלים דרך LiteLLM: Claude, GPT-4, Gemini, Ollama, Mistral, OpenRouter",
        "chat mode + non-interactive mode (--yes --message 'do X') ל-CI",
      ],
      tips: [
        "Aider עובד הכי טוב על repo עם git תקין + קבצים ברורים (typings, tests)",
        "השתמשו ב-/add file.ts להכניס קובץ ל-context. /drop להסיר",
        "/git <command> מריץ git ישירות בלי לצאת מ-Aider",
      ],
    },
    {
      id: "install",
      icon: Lock,
      title: "התקנה עם בידוד מלא מ-Claude Code",
      subtitle: "venv נפרד + credentials שונים — לא לגעת ב-Max",
      description:
        "המפתח לשימוש רציני: להתקין Aider בסביבה מבודדת עם API keys שונים מ-Claude Max. אצלי זה venv ב-/opt/aider/ עם OpenRouter key שלא שייך לחשבון הראשי.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "intermediate",
      beginner:
        "מדוע להפריד? כדי שהעבודה ב-Aider לא תנקה לכם את מכסת Claude Max. אם משתמשים באותה סביבה + אותו Anthropic API key, גם Aider יאכל מה-quota. בידוד = שקט נפשי.",
      content: [
        "התקנה נקייה: pipx install aider-chat (מקבל venv משלו ב-~/.local/pipx)",
        "חשבון נפרד: OpenRouter API key חינמי (openrouter.ai) עם qwen3-coder:free",
        "קובץ ~/.aider.conf.yml שמגדיר: model: openrouter/qwen3-coder:free, openai-api-base: https://openrouter.ai/api/v1",
        "לא להגדיר ANTHROPIC_API_KEY ב-env — Aider יבחר בו אוטומטית ויישרף מכסה",
        "אם רוצים Anthropic — הגדירו key נפרד עם billing cap של $10/חודש",
        "ל-Ollama: model: ollama/qwen3-coder, api_base: http://localhost:11434 — local בלבד",
      ],
      tips: [
        "ב-Windows/WSL: pipx install aider-chat עובד; אם בעיות — conda ב-pipx install conda",
        "תגדירו .aider.conf.yml גם ב-project root + גם ב-$HOME — project override רשאי",
        "תוסיפו aider-chat-logs/* ל-.gitignore — אחרת logs של chat מגיעים ל-PR",
      ],
      codeExample: {
        label: "~/.aider.conf.yml עם OpenRouter",
        code: "model: openrouter/qwen3-coder:free\nopenai-api-base: https://openrouter.ai/api/v1\n# API key ב-env: OPENROUTER_API_KEY=sk-or-...\nauto-commits: true\nauto-lint: true\nedit-format: diff\nstream: true\nshow-diffs: true\nsubtree-only: true",
      },
    },
    {
      id: "models",
      icon: Cpu,
      title: "מודלים — מה עובד הכי טוב",
      subtitle: "Free vs paid, code-specific vs general",
      description:
        "Aider מחבר ל-100+ מודלים דרך LiteLLM. בפועל 5-7 מודלים נפוצים מכסים 95% מהצרכים. הנה החלוקה.",
      color: "from-indigo-600 to-blue-500",
      difficulty: "intermediate",
      content: [
        "Claude Sonnet 4.6 (Anthropic): הטוב ביותר בעריכת קוד מורכבת. ~3$/M input tokens",
        "GPT-4.1 / o3-mini (OpenAI): מעולה ל-reasoning ו-refactoring גדול",
        "Gemini 2.5 Pro: איכות דומה ל-GPT-4, זול יותר. טוב ב-batch fixes",
        "qwen3-coder:free (OpenRouter): החינמי הטוב ביותר ל-code. איטי יותר, מוגבל ב-context",
        "deepseek-coder-v3 (DeepSeek): מצוין לpython, קצת חלש ב-TS",
        "Ollama local (qwen3-coder, deepseek-coder): איכותי אבל דורש GPU טוב",
        "--weak-model: Aider משתמש במודל קטן לכותרות commits. זה לא חייב להיות Sonnet",
      ],
      tips: [
        "--edit-format diff מתאים רוב פרויקטים. udiff עדיף עבור שינויים גדולים (Sonnet מטפל הכי טוב)",
        "לפני שינוי גדול: aider --msg '/tokens' — מראה כמה tokens ב-context. ~30k סביר, 100k יקר",
        "לבעיות פשוטות: haiku או qwen3-coder:free מספיקים; לא לשרוף Opus על bug קטן",
      ],
      codeExample: {
        label: "hybrid: Anthropic ל-main, Ollama ל-weak",
        code: "# בקובץ ~/.aider.conf.yml\nmodel: anthropic/claude-sonnet-4-6\nweak-model: ollama/qwen3-coder  # לכותרות commits + פעולות קטנות\neditor-model: anthropic/claude-sonnet-4-6\n# שומר 30-40% על tokens",
      },
    },
    {
      id: "workflow",
      icon: Keyboard,
      title: "ה-workflow היומיומי",
      subtitle: "מה להקליד מתי + slash commands שחוסכים זמן",
      description:
        "Aider מכיל ~25 slash commands שחוסכים שעות. הנה הרצף הטיפוסי של עבודה על פיצ'ר.",
      color: "from-purple-600 to-violet-500",
      difficulty: "intermediate",
      content: [
        "התחלה: cd project && aider → הוא טוען repo-map ומתחיל",
        "/add path/to/file.ts — מוסיף קובץ ל-context (Aider יוכל לערוך אותו)",
        "/ls — מראה מה ב-context כרגע",
        "/drop file.ts — מוציא מ-context (אחרי שסיימתם עם קובץ)",
        "request: 'תוסיף validation ל-email field ב-src/forms/signup.ts' — Aider עורך + commits",
        "/diff — מראה את השינוי האחרון",
        "/undo — ביטול הcommit האחרון (git reset --soft)",
        "/test — מריץ את ה-test suite (לפי config)",
        "/tokens — כמה tokens ב-context, עלות משוערת",
        "/clear — מנקה את ה-chat history (שומר את ה-files)",
        "/exit — סגירה; השינויים כבר ב-git",
      ],
      tips: [
        "תתחילו עם /add של כל הקבצים הרלוונטיים לפני הבקשה הראשונה — context מקיף = תשובה טובה",
        "/model claude-sonnet-4-6 מחליף מודל באמצע session — שימושי כשמודל חלש נכשל",
        "/voice: אם מוגדר OpenAI Whisper, מקליטים קול במקום להקליד — מהיר פי 2",
      ],
      codeExample: {
        label: "session טיפוסי",
        code: "$ cd my-project\n$ aider\n> /add src/auth/login.ts src/auth/types.ts\n> תקן את הטיפוס של user — email יכול להיות null\n[Aider עורך, commits, מראה diff]\n> /test\n[runs npm test]\n> ה-test עובר. תוסיף test לזה\n[Aider כותב test, commits]",
      },
    },
    {
      id: "advanced",
      icon: Layers,
      title: "טכניקות מתקדמות",
      subtitle: "scripting, CI/CD, voice input, multi-repo",
      description:
        "Aider תומך ב-non-interactive mode שמאפשר אוטומציה מלאה. שימושי ל-CI/CD, batch fixes, ו-nightly tasks.",
      color: "from-rose-600 to-pink-500",
      difficulty: "advanced",
      content: [
        "non-interactive: aider --yes --message 'fix all lint errors' file.ts — רץ בלי שאלות",
        "scripting: תוכלו לעטוף Aider ב-shell script + git hooks לבצע fixes אוטומטיים",
        "GitHub Actions: aider-chat רץ ב-runner, עם ANTHROPIC_API_KEY secret",
        "voice input: aider --voice-language he (דרך OpenAI Whisper) — מקליטים בעברית",
        "multi-repo: --git-dname לשליטה ב-git repo ספציפי; שימושי ב-monorepos",
        "conventions: קובץ CONVENTIONS.md ב-repo — Aider קורא אותו ומיישם (style, patterns)",
        "read-only context: --read-only file.ts — Aider יקרא אבל לא יערוך",
        "linter integration: --auto-lint מריץ lint אוטומטית אחרי edits",
      ],
      tips: [
        "תגדירו CONVENTIONS.md עם 10-15 כללים של הפרויקט — Aider עוקב אחריהם",
        "ב-CI: תמיד --yes + --no-pretty (למנוע ANSI colors ב-logs)",
        "ל-monorepo: תריצו Aider במונחי package בודד; repo-map הרבה יותר מדויק",
      ],
      codeExample: {
        label: "GitHub Action ל-lint fix אוטומטי",
        code: "name: Aider Lint Fix\non:\n  pull_request: { types: [opened] }\njobs:\n  fix:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: pip install aider-chat\n      - run: aider --yes --message 'fix all lint errors' --no-pretty\n        env:\n          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC }}\n      - uses: stefanzweifel/git-auto-commit-action@v5",
      },
    },
    {
      id: "compare",
      icon: CheckCheck,
      title: "Aider מול Claude Code",
      subtitle: "מתי כל אחד עדיף — לא תחליף, אלא משלים",
      description:
        "שניהם מצוינים. הבחירה תלויה ב-context. אצלי: Claude Code ראשי ל-dev רציני, Aider ל-tasks מבודדים וחוסך credits.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "beginner",
      content: [
        "Claude Code: UI עשיר, MCP, sub-agents, skills, hooks, TodoWrite. אידיאלי ל-dev רציני עם Max subscription",
        "Aider: CLI טהור, קל לאוטומציה, תומך בכל ה-providers, free tier אפשרי עם OpenRouter",
        "עריכת קוד: Claude Code עם diff UI נוח יותר ל-interactive. Aider עם patch mode מוצלח ב-CI",
        "git integration: שניהם מעולים. Aider אוטומטית commits; Claude Code דורש /commit",
        "multi-file context: Claude Code עם sub-agents לפרויקטים גדולים. Aider עם repo-map עובד יפה",
        "עלות: Claude Code צריך Max (20$/חודש) או API key. Aider יכול להיות חינמי מוחלט",
        "local AI: Aider מצוין עם Ollama (air-gapped). Claude Code תלוי ב-Anthropic API",
      ],
      tips: [
        "אני משלב: Claude Code ל-planning + tasks מורכבות; Aider ל-lint fixes + mass refactoring",
        "אם יש Claude Max — Claude Code עדיף ל-90% מהזמן, Aider לחלקים המבודדים",
        "אם אין Claude Max — התחילו מ-Aider + OpenRouter; תעברו ל-Claude Code כשיש צורך ב-MCP",
      ],
    },
  ],
  resources: [
    {
      title: "aider.chat",
      description: "האתר הרשמי של Aider + docs",
      href: "https://aider.chat",
      icon: ExternalLink,
    },
    {
      title: "Aider GitHub",
      description: "הקוד הפתוח + issues + release notes",
      href: "https://github.com/paul-gauthier/aider",
      icon: Github,
    },
    {
      title: "OpenRouter",
      description: "API gateway ל-100+ מודלים כולל qwen3-coder:free",
      href: "https://openrouter.ai",
      icon: ExternalLink,
    },
    {
      title: "LiteLLM",
      description: "ה-library שבה Aider משתמש. עזר להבין תמיכת providers",
      href: "https://github.com/BerriAI/litellm",
      icon: Github,
    },
    {
      title: "Aider benchmarks",
      description: "השוואת מודלים במשימות קוד — מעודכן חודשי",
      href: "https://aider.chat/docs/leaderboards",
      icon: ExternalLink,
    },
    {
      title: "המדריך ל-Claude Code",
      description: "הכלי המרכזי שלי; Aider הוא המשלים",
      href: "/claude-code",
      icon: BookOpen,
    },
  ],
  ctaTitle: "כלי משלים לכל מפתח",
  ctaSub:
    "בין אם יש לכם Claude Max ובין אם לא — Aider הוא CLI שחייבים להכיר. 5 דקות התקנה, שעות של חיסכון.",
  primaryCta: {
    label: "aider.chat",
    href: "https://aider.chat",
    icon: ExternalLink,
  },
  secondaryCta: {
    label: "שאלות על setup",
    href: "https://wa.me/972525427474",
    icon: Mail,
  },
  authorBio:
    "Aider משלים את Claude Code ל-tasks מבודדים: lint fixes, refactoring קטנים, ו-CI automations. היתרון המרכזי — תומך ב-100+ מודלים כולל חינמיים (OpenRouter) ומקומיים (Ollama), כך שאפשר לבנות hybrid שחוסך בעלויות בלי לוותר על איכות. המדריך מציג את ה-setup המבודד, בחירת המודל לפי המשימה, ואיך לשלב Aider ב-workflow יומיומי או ב-pipeline אוטומטי.",
};
