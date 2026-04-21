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
  logoImage: "/images/guide-logos/crewai-logo.png",
  tagline: "במקום סוכן אחד, צוות של מומחים שעובד ביחד",
  heroDescription: "CrewAI היא מסגרת Python פתוחה לתזמור מספר agents סביב משימה משותפת. כל agent מוגדר עם role, goal, tools ו-LLM עצמאי (למשל [Claude](/claude-code) או מודל מקומי דרך [Ollama](/guide/ollama)); ה-workflows מתוארים כ-`sequential`, `hierarchical` או `consensus`. ריצה טיפוסית מאחורי FastAPI + [Docker](/guide/docker). אצלי רצים 10 crews ב-VPS (blog-he, marketing-team, yt-to-blog-he, research-crew ועוד) — אבל אצלך CrewAI יכול לייצר אוטומציות תוכן, research ops, code review מבוזר, ניתוח דאטה, תחקירי לקוחות, או כל משימה שדורשת יותר מ-prompt יחיד ל-LLM אחד.",
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
      title: "מה זה CrewAI? צוות AI שעובד בשבילכם",
      subtitle: "ספריית Python בקוד פתוח לתזמור כמה סוכני AI על משימה משותפת",
      description:
        "CrewAI היא ספרייה בשפת Python שנולדה כפרויקט קוד פתוח ב-2023, מתוך ההבנה שמודל שפה בודד — חזק ככל שיהיה — לא תמיד נותן את התוצאות הטובות ביותר למשימות מורכבות. הגישה של CrewAI היא פשוטה אבל גאונית: במקום לבקש מ-AI אחד לכתוב מאמר שלם, מגדירים צוות של כמה סוכני AI — כל אחד עם תפקיד מוגדר, מטרה ברורה, וגישה לכלים משלו — ונותנים להם לעבוד יחד, כמו צוות אנושי. השילוב הזה מניב תוצאות עמוקות יותר, מדויקות יותר, ולרוב גם זולות יותר, כי אפשר להשתמש במודל חזק רק לחלקים שדורשים את זה.",
      color: "from-violet-600 to-purple-500",
      difficulty: "beginner",
      beginner:
        "דמיינו שאתם רוצים לכתוב מאמר שיווקי מעולה. במקום לבקש את זה מ-[ChatGPT](/claude-code) בהודעה אחת, מה אם הייתם שוכרים צוות של שלושה אנשים מקצועיים — חוקר שאוסף עובדות, אסטרטג שמחליט על הזווית והכותרת, וכותב שמנסח בטון מושך? זה בדיוק מה ש-CrewAI עושה, רק שהצוות הוא וירטואלי, עובד בלי הפסקה, ועולה פחות מכוס קפה. כל 'עובד' הוא סוכן AI נפרד עם תפקיד, מטרה, וגישה לכלים — והם מעבירים עבודה ביניהם כמו צוות אמיתי.",
      content: [
        "Agent (סוכן): היחידה הבסיסית — כל סוכן מוגדר עם role (התפקיד שלו), goal (המטרה שהוא שואף אליה), backstory (רקע שמעצב את האישיות), tools (כלים שהוא יכול להשתמש בהם), ו-llm (המודל שמניע את החשיבה שלו)",
        "Task (משימה): יחידת עבודה בודדת — מה שצריך לבצע, איך צריכה להיראות התוצאה הצפויה, ומי הסוכן שאחראי עליה. אפשר להעביר את התוצאה של משימה קודמת כקלט למשימה הבאה",
        "Crew (צוות): אוסף של סוכנים + משימות + process (תהליך העבודה). זה ה-'ארגון' שמריצים בפועל",
        "Process (תהליך): איך הצוות עובד — ברצף (sequential, כל משימה מחכה לסיום הקודמת), בהיררכיה (hierarchical, עם manager שמחלק תפקידים), או בקונצנזוס (consensus, דיון ביניהם)",
        "LLM: CrewAI תומך בכל המודלים הפופולריים — [Claude](/claude-code) של Anthropic, Gemini של Google, GPT של OpenAI, וגם מודלים מקומיים דרך [Ollama](/guide/ollama). אפשר לתת לכל סוכן מודל שונה — למשל חוקר עם Gemini (מהיר וזול) וכותב עם Claude (איכותי יותר לעברית)",
        "Tools (כלים): פונקציות בפייתון שהסוכנים יכולים להשתמש בהן — חיפוש באינטרנט, שאילתה למסד נתונים, קריאה ל-API, שליחת הודעה דרך [Delegator](/guide/delegator), חיפוש ב-[Qdrant](/guide/qdrant) ועוד",
      ],
      tips: [
        "הצוות יכול לרוץ מאחורי FastAPI + [Docker](/guide/docker) ולהיות נגיש כשירות HTTP — בדיוק כמו שהסוכנים שלי רצים. זה מאפשר לחבר crews ל-webhook, cron job, או לוח שליטה כמו [Dashboard](/guide/dashboard)",
      ],
    },
    {
      id: "concepts",
      icon: Workflow,
      title: "Agent, Task, Crew — המושגים",
      subtitle: "4 רעיונות מרכזיים שמספיקים ל-90% מהצרכים",
      description:
        "המבנה של CrewAI זה כמו לנהל צוות עובדים וירטואלי: יש לכם סוכנים (העובדים), משימות (מה צריך לעשות), והצוות עצמו (איך הם עובדים יחד). כל מושג פה הוא לֵגוֹ שאפשר לחבר — ברגע שהבנתם את ארבעת היסודות, כל workflow מורכב שתדמיינו הופך להיות בהישג יד. הקוד נקי כל כך, שאצלי (אלעד) הצוותים הקטנים מסתכמים ב-20-30 שורות Python, והצוותים הגדולים שמריצים את [הפרויקטים המלאים שלי](/guide/delegator) בקושי חוצים 100 שורות.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "intermediate",
      content: [
        "Agent זה סוכן בודד — מגדירים לו role (התפקיד, למשל 'כותב עברי' או 'חוקר שוק'), goal (המטרה שהוא שואף אליה), backstory (סיפור רקע שקובע את האישיות והסגנון שלו), ו-llm (איזה מודל מניע אותו — אפשר [Claude](/claude-code), Gemini, או מודל מקומי דרך [Ollama](/guide/ollama))",
        "Task זו משימה בודדת — תיאור מה צריך לעשות (description), איך התוצאה הצפויה צריכה להיראות (expected_output), ואיזה agent אחראי עליה. זה כמו הוראת עבודה ברורה שאתם נותנים לעובד",
        "context=[t1] — המנגנון שמחבר משימות. ה-task הבא יקבל את הפלט של t1 כקלט, בדיוק כמו שכותב מקבל את המחקר של החוקר כבסיס לכתיבה",
        "Crew זה הצוות עצמו — אוסף של agents + tasks + process. זה האובייקט שמריצים בפועל, והוא מחזיק את כל הלוגיקה של איך העבודה זורמת",
        "crew.kickoff(inputs={'topic': 'AI'}) מפעיל את הצוות. ה-{topic} יושתל אוטומטית בכל ה-descriptions — ככה אתם מפעילים את אותו צוות על נושאים שונים בלי לשכתב קוד",
        "ה-output שחוזר מ-kickoff הוא אובייקט עם ה-raw output של המשימה האחרונה — התוצר הסופי של הצוות. לעיתים זה מאמר, לפעמים JSON, לפעמים החלטה — תלוי במה הגדרתם כ-expected_output",
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
        "ה-crew הראשון שלכם הוא pipeline קלאסי של מחקר → כתיבה → עריכה, בדיוק כמו חלוקת תפקידים בצוות תוכן אמיתי. אתם נותנים נושא, והצוות הווירטואלי מחזיר מאמר ערוך. זה לא יותר מ-30 שורות Python, ומי שבא מ-[Claude Code](/claude-code) או מעולם הסוכנים יכיר את הפילוסופיה מיד. אצלך הצוות הזה יכול לרוץ מקומי על המחשב, או להתארח ב-VPS כמו אצלי ולהיקרא דרך API.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "beginner",
      beginner:
        "זה השלב שבו הופכים מ'שמעתי על CrewAI' ל'יש לי crew שעובד'. תתקינו את הספרייה, תוציאו מפתח חינמי ל-Gemini, תגדירו שלושה סוכנים פשוטים, וזה רץ. מי שאף פעם לא כתב Python עד הסוף — אל תדאגו, הקוד ברור וקצר, ואפשר לבקש מ-[Claude](/claude-code) להדריך אתכם שלב-שלב.",
      content: [
        "pip install crewai crewai-tools מתקין את הספרייה עצמה ואת חבילת הכלים הבסיסיים — חיפוש באינטרנט, קריאת קבצים, scraping ועוד",
        "קבלו Gemini API key חינמי מ-ai.google.dev — Google מעניקה מיליון tokens בחודש בחינם, מספיק לעשרות ריצות של crew",
        "הגדירו 3 סוכנים: researcher (חוקר שמוציא עובדות), writer (כותב שהופך עובדות לטקסט זורם), ו-reviewer (עורך שמבקר ומלטש)",
        "הגדירו 3 tasks עם context — ה-writer יקבל את המחקר של ה-researcher, וה-reviewer יקבל את הטיוטה של ה-writer. זרימה כמו במערכת עיתון",
        "crew.kickoff(inputs={'topic': 'שלך'}) מפעיל את כל השרשרת. תכניסו נושא, ותקבלו תוצר ערוך חזרה",
        "התוצאה מחזירה את הפלט של ה-task האחרון — הביקורת הערוכה של ה-reviewer, שהיא בעצם המאמר הסופי אחרי שעבר שלושה זוגות עיניים וירטואליות",
      ],
      tips: [
        "התחילו עם Gemini Flash — הוא חינמי, מהיר, ואיכותי. רק אם הפלט לא מספק, שדרגו סוכן ספציפי ל-[Claude](/claude-code) או GPT",
        "ה-backstory הוא החלק הקריטי ביותר — כמה משפטים שמגדירים אישיות, טון, והתמחות. אצלי ה-backstory של הכותב כולל דוגמאות מהסגנון שלי ב-[Kami](/guide/kami) כדי שהפלט ישמע אותנטי",
      ],
    },
    {
      id: "examples",
      icon: Target,
      title: "3 crews אמיתיים בשימוש",
      subtitle: "Education pipeline, Marketing team, YT → Blog",
      description:
        "התיאוריה יפה — אבל עכשיו נראה איך זה נראה בשטח. אלה שלושה crews שאצלי (אלעד) רצים יומיום על ה-VPS ומייצרים תוכן אמיתי. כל אחד מהם הוא חלוקת תפקידים שמזכירה צוות עובדים אנושי — יש מי שחוקר, מי שמעצב את המסר, ומי שכותב בעברית זורמת. אצלך אפשר לשכפל את הבסיס ולהתאים לדומיין שלך: צוות ייעוץ משפטי, צוות תמיכת לקוחות, צוות ניתוח נתונים — אותם עקרונות, תפקידים שונים.",
      color: "from-amber-600 to-orange-500",
      difficulty: "intermediate",
      content: [
        "education_pipeline — שלושה סוכנים: Researcher (מחפש באינטרנט), Curriculum Designer (בונה מבנה שיעור), ו-Hebrew Writer (כותב בעברית ברורה). התוצר: שיעור מלא של 800-1200 מילים בעברית, מוכן לפרסום",
        "marketing_team — Audience Analyst (מנתח קהל יעד) → Positioning Strategist (מחליט על הזווית) → Hebrew Copywriter (כותב את ה-copy). התוצר: 3 כותרות, subline, פוסט לסושיאל, ושורת נושא לאימייל. צוות שיווק מיניאטורי בתוך crew אחד",
        "yt_to_blog_he — Summarizer (מסכם תמלול YouTube) → Hebrew Writer (הופך סיכום למאמר) → SEO Specialist (מוסיף כותרות וmeta tags). התוצר: פוסט בלוג מלא עם metadata מוכן להעלאה ל-WordPress דרך [n8n](/guide/n8n)",
        "כל crew מקבל {inputs} ייחודיים — לצוות החינוך זה topic, לצוות השיווק זה product, ול-YT→Blog זה video_id. אותו crew משרת אינסוף ריצות",
        "זמן ריצה טיפוסי הוא 60-180 שניות — שלוש קריאות LLM עם העברת context ביניהן. לא מיידי, אבל מצוין ל-pipelines לא-סינכרוניים",
        "העלות כמעט אפסית בזכות ה-free tier הנדיב של Gemini Flash. אצלי (אלעד) כל 10 ה-crews יחד עולים בחודש פחות מקפה אחד",
      ],
      tips: [
        "אני טוען style guide ('איך אלעד כותב') ישירות ל-backstory של ה-writer — כולל דוגמאות מפוסטים קודמים. התוצאה באמת נשמעת כמוני, לא כמו ChatGPT גנרי",
        "שמרו את ה-crews כקבצי YAML או Python נפרדים וטענו אותם דינמית דרך [Delegator](/guide/delegator) — ככה תוכלו להריץ כל crew מרחוק דרך HTTP בלי לגעת בקוד",
      ],
    },
    {
      id: "gemini",
      icon: Lightbulb,
      title: "Gemini + CrewAI — מה ללמוד מראש",
      subtitle: "ReAct parser issues על inputs ארוכים",
      description:
        "זו מלכודת שעלתה לי כמה לילות לא-ישנים אז שווה להזהיר מראש. CrewAI מתזמר את הסוכנים באמצעות פורמט אוניברסלי שנקרא ReAct (Reasoning + Action) — סוג של שפה פנימית בין הצוות למנצח התזמורת. Gemini, חכם ככל שיהיה, לא תמיד עוקב אחרי הפורמט הזה בדיוק כשה-input ארוך. התוצאה: retry loops, timeouts, והצוות תקוע. אצלי (אלעד) ה-crew של yt_to_blog_he נתקל בזה על תמלולי וידאו ארוכים, והפתרון חייב הנדסה יצירתית.",
      color: "from-red-600 to-rose-500",
      difficulty: "advanced",
      beginner:
        "בקצרה: שתי הטכנולוגיות האלה לא תמיד מסתדרות על inputs ארוכים (מעל 5000 תווים). אם ה-crew שלך נתקע — זו כנראה הסיבה. בחלק הזה אני (אלעד) מסביר מה קורה ואיך עוקפים את הבעיה, כולל הפתרון שמשתמש בו בפרודקשן.",
      content: [
        "הבעיה: CrewAI דורש מהמודל לפלוט פורמט מדויק — 'Thought: ...' אחרי זה 'Action: ...' ואז 'Action Input: ...'. Gemini לפעמים קופץ ישר ל-Final Answer ודולג על השלבים, ואז ה-parser של CrewAI לא מזהה את התשובה",
        "הסימפטום הטיפוסי: הקריאה ל-/run נתקעת עד ה-timeout של 240 שניות, או שתראו retry loops בלוגים של [Docker](/guide/docker)",
        "פתרון 1: לעקוף את CrewAI לגמרי למשימה הזו — לכתוב 3 קריאות Gemini ישירות ב-Python ולשרשר אותן ידנית. מאבדים את ה-orchestration היפה אבל מרוויחים יציבות",
        "פתרון 2: להעביר את הסוכן הבעייתי ל-[Claude](/claude-code) Haiku — הוא עוקב אחרי ReAct מצוין ועולה סביב 0.25$ לריצה של פוסט בלוג. זולה יחסית, יציבה בהרבה",
        "פתרון 3: לקצר את ה-input — למשל לסכם transcript ארוך ב-Gemini Flash לפני שמעבירים אותו ל-crew. הצוות מקבל תקציר במקום הטקסט המלא",
        "פתרון 4: לשדרג ל-CrewAI מגרסה 0.80 ומעלה — היא שיפרה משמעותית את התמיכה ב-Gemini. pip install --upgrade crewai",
      ],
      tips: [
        "המלצה מעשית שאני פועל לפיה: שמרו כל task description מתחת ל-2000 תווים. אם אתם חייבים input ארוך — תוותרו על CrewAI במשימה הזו ותקראו ל-Gemini ישיר דרך [Delegator](/guide/delegator)",
        "לפני שאתם צוללים לדיבוג, תריצו את אותו prompt עם [Claude](/claude-code) Haiku ותראו אם זה עובד — אם כן, זה אישור שהבעיה היא ב-Gemini ולא ב-crew logic",
      ],
    },
    {
      id: "advanced",
      icon: Bot,
      title: "Hierarchical processes + Manager agent",
      subtitle: "כש-sequential לא מספיק",
      description:
        "Process.hierarchical זה המצב שבו CrewAI הופך מצוות שעובד ברצף לתזמורת אמיתית עם מנצח. במקום שהמשימות יעברו בקו ישר מסוכן לסוכן, מופיע manager agent (בד\"כ מודל חזק כמו GPT-4 או [Claude](/claude-code) Opus) שמקבל החלטות בזמן אמת: מי מקבל איזה task, מתי לפצל, מתי לאחד, ומתי לעצור. זה מצב מתקדם שאצלי (אלעד) רץ רק על crew אחד מתוך העשרה — כל היתר sequential, פשוט כי זה יותר צפוי וזול. אבל כשאתם צריכים גמישות אמיתית — hierarchical שווה את המאמץ.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      content: [
        "Process.hierarchical מוסיף manager agent — סוכן שלא מבצע משימות בעצמו אלא רק מנתב אותן לחברי הצוות. זה כמו מנצח תזמורת שלא מנגן אבל מחליט מי יחתוך את הסולו",
        "זה טוב במיוחד כשיש הרבה agents (5 ומעלה) וכל task יכול להיעשות על ידי כמה מהם — ה-manager מחליט מי הכי מתאים ברגע הנתון",
        "Memory — crews יכולים להחזיק זיכרון בין kickoffs: long-term (מידע קבוע), entity (זיכרון על ישויות ספציפיות), ו-contextual (הקשר מהריצה הנוכחית). אצלי הזיכרון מגובה ב-[Qdrant](/guide/qdrant)",
        "Tools customization — פונקציות Python רגילות עם @tool decorator הופכות לכלים שהסוכן יכול לקרוא להם. ככה מחברים את ה-crew ל-[Delegator](/guide/delegator), ל-[n8n](/guide/n8n), או לכל API פרטי",
        "Async execution — Task(async_execution=True) מאפשר למשימות עצמאיות לרוץ במקביל. נהדר כשהחוקר והאנליסט לא תלויים אחד בשני וחבל שיחכו",
        "Callbacks — on_task_start, on_task_complete, on_crew_complete הם hooks לניטור, לוגים, ושידור סטטוס ל-[Dashboard](/guide/dashboard) שלכם בזמן אמת",
      ],
      tips: [
        "היזהרו עם hierarchical — הוא מוציא משמעותית יותר tokens כי גם ה-manager קורא את ההקשר בכל החלטה. אצלי ה-crew ההיררכי עולה פי 3 מ-sequential שקול",
        "לפרויקטים עסקיים אמיתיים תעדיפו sequential עם context ברור — הרבה יותר צפוי, קל יותר לדבג, וזול יותר. hierarchical שמורו למקרים שבאמת יש אי-ודאות על סדר העבודה",
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
