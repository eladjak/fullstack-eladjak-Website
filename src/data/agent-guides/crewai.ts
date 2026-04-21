import {
  Users,
  Workflow,
  Target,
  Bot,
  FileText,
  Github,
  ExternalLink,
  BookOpen,
  Code2,
  Rocket,
  Lightbulb,
  Zap,
  Star,
  Mail,
  Sparkles,
  DollarSign,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const crewaiGuide: AgentGuideData = {
  slug: "crewai",
  agentName: "CrewAI",
  agentNameHe: "CrewAI — צוותי AI שעובדים יחד",
  brandIconSlug: "crewai",
  brandIconColor: "FF5A5A",
  tagline: "במקום סוכן אחד, צוות של מומחים שעובד ביחד",
  heroDescription: "CrewAI היא מסגרת Python פתוחה לתזמור מספר agents סביב משימה משותפת. כל agent מוגדר עם role, goal, tools ו-LLM עצמאי; ה-workflows מתוארים כ-`sequential`, `hierarchical` או `consensus`. ריצה טיפוסית מאחורי FastAPI + Docker. אצלי רצים 10 crews ב-VPS (blog-he, marketing-team, yt-to-blog-he, research-crew ועוד) — אבל אצלך CrewAI יכול לייצר אוטומציות תוכן, research ops, code review מבוזר, ניתוח דאטה, תחקירי לקוחות, או כל משימה שדורשת יותר מ-prompt יחיד ל-LLM אחד.",
  badgeText: "2026 · Multi-Agent Orchestration · מדריך מעשי",
  canonical: "https://fullstack-eladjak.co.il/guide/crewai",
  heroBgImage: "/images/guides/guide-crewai-hero.jpg",
  stats: [
    { label: "crews ברשת שלי", value: "10" },
    { label: "זמן ריצת crew", value: "60-180s" },
    { label: "עלות ממוצעת", value: "חינם" },
    { label: "סוכנים ב-crew", value: "2-5" },
  ],
  paradigmTitle: "מ-LLM בודד לצוות AI",
  paradigmSub:
    "ההבדל בין לבקש מ-ChatGPT לכתוב לבין להפעיל צוות שיווק שלם — משמעותי.",
  paradigmShifts: [
    {
      before: "LLM אחד מנסה לעשות הכל — רדוד, כללי",
      after: "3 סוכנים מקצועיים — חוקר, אסטרטג, כותב — עבודה עמוקה",
      icon: Users,
    },
    {
      before: "prompts ארוכים ומסורבלים עם כל ההוראות",
      after: "role + goal קצר לכל סוכן; התוצאה נקייה יותר",
      icon: Target,
    },
    {
      before: "תוצאה אחידה ושטוחה",
      after: "כל סוכן מביא expertise משלו, יוצר תוצר רב-שכבתי",
      icon: Sparkles,
    },
    {
      before: "זמן פיתוח workflows מורכבים של ימים",
      after: "crew חדש ב-20 שורות Python, עובד תוך דקות",
      icon: Zap,
    },
  ],
  whoIsThisFor: [
    {
      title: "יוצרי תוכן",
      description:
        "מחקר → טיוטה → עריכה → SEO. 4 תפקידים, crew אחד, מאמר מוכן.",
      icon: FileText,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "צוותי שיווק",
      description: "ניתוח קהל → פוזיציונינג → copy — כמו סוכנות פרסום קטנה.",
      icon: Star,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "מפתחי סוכנים",
      description:
        "המסגרת הכי נקייה ל-multi-agent workflows. Python, פשוט.",
      icon: Code2,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "חברות מוצר",
      description: "research crew, product crew, onboarding crew — workflow לכל דבר.",
      icon: Rocket,
      color: "from-pink-500 to-rose-500",
    },
  ],
  toc: [
    { id: "what-is", label: "מה זה" },
    { id: "concepts", label: "מושגים" },
    { id: "first-crew", label: "Crew ראשון" },
    { id: "examples", label: "דוגמאות" },
    { id: "gemini", label: "Gemini gotchas" },
    { id: "advanced", label: "מתקדם" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Users,
      title: "מה זה CrewAI?",
      subtitle: "ספריית Python לתזמור סוכנים במקביל וסדרתי",
      description:
        "CrewAI היא ספרייה שנולדה מתוך LangChain אבל נשארה נקייה — Agents, Tasks, Crews, Processes. פשוט ומספיק חזק ל-90% מהמקרים.",
      color: "from-violet-600 to-purple-500",
      difficulty: "beginner",
      beginner:
        "CrewAI מאפשרת להגדיר כמה סוכני AI שעובדים ביחד כמו צוות — כל אחד עם תפקיד שונה. אתם אומרים למשל: 'חוקר, אסטרטג, כותב' — והם עובדים יחד על משימה אחת.",
      content: [
        "Agent — יחידה בסיסית: role, goal, backstory, tools, llm",
        "Task — מה צריך לבצע: description, expected_output, agent, context",
        "Crew — אוסף agents + tasks + process (sequential / hierarchical)",
        "Process — איך הם עובדים: ברצף (כל אחד מקבל את הפלט של הקודם) או עם manager",
        "LLM — Gemini, Claude, OpenAI, Ollama — כולם נתמכים",
        "Tools — פונקציות שמועברות ל-agents (web search, DB query, API call)",
      ],
    },
    {
      id: "concepts",
      icon: Workflow,
      title: "Agent, Task, Crew — המושגים",
      subtitle: "4 רעיונות מרכזיים שמספיקים ל-90% מהצרכים",
      description:
        "CrewAI נקייה יחסית — 4 מושגים ואתם כותבים crews אמיתיים.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "intermediate",
      content: [
        "Agent(role='כותב עברי', goal='לכתוב תוכן בעברית', backstory='...', llm=llm) — הגדרת סוכן",
        "Task(description='כתוב מאמר על X', expected_output='מאמר 500 מילה', agent=writer) — משימה",
        "context=[t1] — ה-task יקבל את הפלט של t1 כקלט",
        "Crew(agents=[a1, a2], tasks=[t1, t2], process=Process.sequential) — crew מסודר",
        "crew.kickoff(inputs={'topic': 'AI'}) — הפעלה; {topic} מוחלף אוטומטית ב-descriptions",
        "ה-output הוא dict עם ה-raw output של המשימה האחרונה",
      ],
      codeExample: {
        label: "Crew פשוט ב-20 שורות",
        code: "from crewai import Agent, Task, Crew, Process, LLM\n\nllm = LLM(model='gemini/gemini-2.5-flash', api_key=KEY)\n\nwriter = Agent(\n    role='Hebrew Writer',\n    goal='Write clear Hebrew',\n    backstory='Warm, direct tone.',\n    llm=llm,\n)\n\ntask = Task(\n    description='Write about {topic} in 300 words',\n    expected_output='Hebrew article',\n    agent=writer,\n)\n\ncrew = Crew(agents=[writer], tasks=[task], process=Process.sequential)\nresult = crew.kickoff(inputs={'topic': 'TypeScript'})",
      },
    },
    {
      id: "first-crew",
      icon: Rocket,
      title: "Crew ראשון שלך ב-15 דקות",
      subtitle: "התקנה, setup, והרצה ראשונה",
      description:
        "מחזיר pipeline שלם של research → write → review לפי נושא שאתם נותנים.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "beginner",
      content: [
        "pip install crewai crewai-tools — הספרייה והכלים הבסיסיים",
        "קבל Gemini API key חינמי מ-ai.google.dev — 1M tokens/חודש",
        "הגדר 3 סוכנים: researcher, writer, reviewer",
        "הגדר 3 tasks עם context (researcher → writer → reviewer)",
        "crew.kickoff(inputs={'topic': 'שלך'})",
        "התוצאה מחזירה את הפלט של ה-task האחרון (הביקורת של ה-reviewer)",
      ],
      tips: [
        "התחילו עם Gemini Flash — חינמי וטוב. רק אם הפלט לא מספק, עברו ל-Claude/GPT",
        "ה-backstory הוא הכי חשוב — כמה משפטים שמגדירים אישיות וסגנון",
      ],
    },
    {
      id: "examples",
      icon: Target,
      title: "3 crews אמיתיים בשימוש",
      subtitle: "Education pipeline, Marketing team, YT → Blog",
      description:
        "אלה 3 crews שאני משתמש בהם יומיום. הקוד המלא ב-GitHub.",
      color: "from-amber-600 to-orange-500",
      difficulty: "intermediate",
      content: [
        "education_pipeline — Researcher (web search) → Curriculum Designer → Hebrew Writer. תוצר: שיעור 800-1200 מילים בעברית",
        "marketing_team — Audience Analyst → Positioning Strategist → Hebrew Copywriter. תוצר: 3 headlines + subline + social post + email subject",
        "yt_to_blog_he — Summarizer → Hebrew Writer → SEO Specialist. תוצר: פוסט בלוג מלא + metadata",
        "כל crew מקבל {inputs} ייחודיים — topic, product, video_id",
        "זמן ריצה טיפוסי: 60-180 שניות (3 LLM calls + context passing)",
        "העלות: כמעט אפסית עם Gemini Flash (free tier נדיב)",
      ],
      tips: [
        "אני טוען style guide ('איך אלעד כותב') ישירות ב-backstory של ה-writer — התוצאה באמת נשמעת כמוני",
      ],
    },
    {
      id: "gemini",
      icon: Lightbulb,
      title: "Gemini + CrewAI — מה ללמוד מראש",
      subtitle: "ReAct parser issues על inputs ארוכים",
      description:
        "CrewAI משתמש ב-ReAct prompt format אוניברסלית. Gemini לא תמיד עוקב בדיוק — נוצרים retry loops.",
      color: "from-red-600 to-rose-500",
      difficulty: "advanced",
      beginner:
        "בקצרה: שני הטכנולוגיות האלה לא תמיד מסתדרות על inputs ארוכים (מעל 5000 תווים). אם תהיה תקיעה — זה כנראה למה.",
      content: [
        "הבעיה: CrewAI דורש 'Thought: ...\\nAction: ...\\nAction Input: ...' וגמיני לפעמים קופץ ישר ל-Final Answer",
        "הסימפטום: הגעת ל-240s timeout על curl ל-/run",
        "פתרון 1: לעקוף CrewAI — לכתוב 3 קריאות Gemini ישירות ב-Python ולשרשר ידנית",
        "פתרון 2: להעביר ל-Claude Haiku — עוקב ReAct היטב, עולה ~$0.25 לריצה של blog post",
        "פתרון 3: להקטין input — למשל לסכם transcript לפני ששולחים (Gemini Flash ב-fast mode)",
        "פתרון 4: CrewAI version >= 0.80 שיפרה תמיכה ב-Gemini — upgrade",
      ],
      tips: [
        "המלצה מעשית: הפוקוס של כל task description <2000 תווים. אם יותר — ממשים את Gemini ישיר",
      ],
    },
    {
      id: "advanced",
      icon: Bot,
      title: "Hierarchical processes + Manager agent",
      subtitle: "כש-sequential לא מספיק",
      description:
        "Process.hierarchical = יש manager שמקבל החלטות איזה agent לשלוח לכל task.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      content: [
        "Process.hierarchical — מוסיף 'manager' agent (בד\"כ GPT-4 או Claude) שמנתב משימות",
        "טוב כשיש הרבה agents (5+) וכל task יכול להיעשות על ידי כמה מהם",
        "Memory — crews יכולים להחזיק memory בין kickoffs (long-term + entity + contextual)",
        "Tools customization — פונקציות Python רגילות עם @tool decorator",
        "Async execution — Task(async_execution=True) מאפשר מקבילות חלקית",
        "Callbacks — on_task_start, on_task_complete, on_crew_complete לניטור",
      ],
      tips: [
        "היזהרו עם hierarchical — מוציא יותר tokens (גם ה-manager קורא)",
        "לפרויקטים עסקיים אמיתיים — תעדיפו sequential עם context ברור, הרבה יותר צפוי",
      ],
    },
  ],
  resources: [
    {
      title: "CrewAI Docs",
      description: "התיעוד הרשמי — מעולה ומעודכן",
      href: "https://docs.crewai.com",
      icon: ExternalLink,
    },
    {
      title: "CrewAI GitHub",
      description: "הקוד הפתוח של הספרייה — 30k+ stars",
      href: "https://github.com/crewAIInc/crewAI",
      icon: Github,
    },
    {
      title: "Google AI Studio",
      description: "Gemini API key חינמי לשימוש עם ה-crews",
      href: "https://ai.google.dev",
      icon: ExternalLink,
    },
    {
      title: "המדריך ל-Claude Code",
      description: "איך לבנות crews במהירות עם Claude Code",
      href: "/claude-code",
      icon: BookOpen,
    },
    {
      title: "המדריך ל-Delegator",
      description: "איך להפעיל crews דרך API מרחוק",
      href: "/guide/delegator",
      icon: BookOpen,
    },
    {
      title: "התמחרות עם מומחה",
      description: "רוצים crew מותאם? שיחת ייעוץ 30 דקות",
      href: "/contact",
      icon: DollarSign,
    },
  ],
  ctaTitle: "מוכנים ל-crew משלכם?",
  ctaSub:
    "Python פשוט, Gemini חינמי, והסבר מלא של 3 crews שאני משתמש בהם יומיום.",
  primaryCta: {
    label: "CrewAI ב-GitHub",
    href: "https://github.com/crewAIInc/crewAI",
    icon: Github,
  },
  secondaryCta: {
    label: "שיחת ייעוץ",
    href: "/contact",
    icon: Mail,
  },
  authorBio:
    "אני מריץ 10 crews על VPS-Elad-Hub בייצור. המדריך הזה נכתב מתוך חודשיים של trial and error — כולל הפיצ'רים שעבדו וה-gotchas של Gemini שעלו לי בזמן תיקונים. כל crew שאני מתאר כאן — באמת משמש אותי ללא הכנה מראש.",
};
