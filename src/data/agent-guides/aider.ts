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
  agentNameHe: "Aider — עוזר תכנות מהטרמינל",
  category: "infra",
  logoImage: "/images/guide-logos/aider-logo.png",
  tagline: "Aider בכל editor. Claude Code הוא הראשי — Aider הוא ה-backup החופשי",
  heroDescription:
    "Aider זה כלי חינמי ובקוד פתוח מבית החוקר האמריקאי Paul Gauthier שמשמש כשותף תכנות וירטואלי — סוג של 'חבר לצוות' שיושב איתכם כשאתם כותבים קוד, מבין מה אתם מנסים להשיג, ומסייע בזריזות. הוא רץ מתוך הטרמינל (חלון הפקודות השחור שמפתחים עובדים איתו), מתחבר למודל בינה מלאכותית לפי בחירתכם ($ [Claude](/claude-code) של Anthropic, GPT של OpenAI, Gemini של Google, או מודל מקומי חינמי דרך [Ollama](/guide/ollama)), ועושה משהו שצ'אטים רגילים כמו ChatGPT לא עושים: הוא עורך ישירות את קבצי הקוד שלכם. אתם מבקשים בעברית 'תקן את הבאג בקובץ login.ts', Aider פותח את הקובץ בעצמו, מבצע את התיקון, ושומר היסטוריה מלאה ב-git (מערכת הניהול של גרסאות קוד שמשמשת כמעט כל מפתח בעולם) כך שאפשר תמיד לחזור אחורה בלחיצה אחת. אצלי (אלעד) Aider משלים את [Claude Code](/claude-code) ומשמש כגיבוי חינמי לגמרי למקרים שבהם המכסה של המנוי הראשי נגמרת — כל זה דרך OpenRouter (שירות שמאגד מודלי AI רבים במחיר סמלי או בחינם). אצלכם, אם אין לכם תקציב למנוי פרימיום של Claude, Aider יכול להיות הכלי הראשי שלכם ולתת 80% מהיכולות של הכלים החזקים בתחום — בחינם מוחלט, עם שליטה מלאה על הפרטיות של הקוד שלכם.",
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
        "להוסיף AI fix ל-pipeline — Aider הוא ה-CLI שמתאים (תמיכה מלאה בדגל --yes להרצה ללא שאלות).",
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
      subtitle: "כלי מהטרמינל שעורך את הקבצים שלכם בעצמו ושומר הכל ב-git",
      description:
        "Aider זה כלי פתוח מבית החוקר Paul Gauthier — מעין 'עוזר תכנות בזוג' שרץ מתוך חלון הטרמינל (הממשק שחור-לבן עם הפקודות). הוא כתוב בשפת Python ומתחבר ל-LLM (מודל שפה גדול — כמו [Claude](/claude-code), GPT של OpenAI או Gemini של Google) כדי להבין מה אתם רוצים ולממש את זה ישירות בקבצי הקוד שלכם. בניגוד לצ'אט רגיל שבו אתם מקבלים טקסט ומעתיקים ידנית — Aider עורך את הקבצים בעצמו, מריץ בדיקות אם תבקשו, ואפילו מבצע commit (שמירת נקודת ציון בהיסטוריית ה-git של הפרויקט) עם הודעה שהוא כותב לבד.",
      color: "from-orange-600 to-red-500",
      difficulty: "beginner",
      beginner:
        "תחשבו על זה כאילו יש לכם שותף לתכנות שיושב לידכם, אבל במקום לדבר איתו אתם מקלידים לו בקשה בעברית או באנגלית — והוא פותח את הקובץ בעצמו, מתקן את מה שצריך, ומסמן בהיסטוריה של הפרויקט איזה שינוי הוא עשה ולמה. פותחים טרמינל, נכנסים לתיקייה של הפרויקט, מריצים `aider`, ואומרים משהו כמו 'תקן את הבאג בקובץ login.ts' — תוך שניות הקובץ השתנה. רוצים להתחרט? פקודה אחת (`/undo`) מחזירה את הכל אחורה. זה בדיוק כמו לעבוד עם [Claude Code](/claude-code), רק שה-Aider הוא האלטרנטיבה החינמית והפשוטה יותר.",
      content: [
        "Aider זה כלי CLI בשפת Python (CLI = Command Line Interface, ממשק שורת פקודה — הכלים שרצים בחלון הטרמינל השחור). ההתקנה היא פקודה אחת: `pipx install aider-chat`. למה pipx ולא סתם pip? כי pipx יוצר לכלי סביבה משלו שלא מתנגשת עם פרויקטים אחרים במחשב — בדיוק מה שרוצים לכלי שמותקן גלובלית.",
        "Repo-map — אחת היכולות החכמות של Aider. כשהוא נכנס לפרויקט שלכם, הוא סורק את כל הקבצים, יוצר סיכום קצר של כל אחד, ושולח ל-LLM רק את החלקים הרלוונטיים לבקשה הנוכחית. זה חוסך המון טוקנים (היחידות שעליהן מחייבים מודלי AI) ומאפשר לו לעבוד על פרויקטים ענקיים בלי לבלבל את המודל.",
        "Auto-commit — כל שינוי שה-Aider עושה נשמר אוטומטית ב-git (מערכת ניהול הגרסאות של הקוד) עם הודעה ברורה: מה השתנה, איזו בקשה הבאתם, ובאיזה מודל השתמש. זה אומר שגם אם משהו ישתבש, תמיד יש לכם 'כפתור undo' מלא של כל צעד וצעד.",
        "Diff view (תצוגת הבדלים) — לפני כל שינוי Aider מראה לכם בבירור מה הוא עומד לעשות: מה ימחק באדום, מה ייכנס בירוק. אם לא אהבתם — `/undo` וזה חוזר אחורה. התחושה היא כמו לעבוד עם שותף שמבקש אישור לכל פעולה.",
        "תומך ב-100+ מודלים דרך ספרייה בשם LiteLLM (מעין 'מתרגם אוניברסלי' בין מודלי AI שונים). אתם יכולים לבחור בין [Claude](/claude-code) של Anthropic, GPT-4 של OpenAI, Gemini של Google, מודלים מקומיים דרך [Ollama](/guide/ollama), או מודלים חינמיים דרך OpenRouter (שער תשלום שמאגד עשרות ספקים).",
        "שני מצבי הפעלה: chat mode אינטראקטיבי (מדברים, הוא עונה, שולח שינויים בזמן אמת) ו-non-interactive mode שמופעל עם הדגל `--yes --message '...'` — מצב שבו Aider מקבל פקודה אחת, מבצע, יוצא. זה המצב שמאפשר להטמיע אותו ב-CI/CD (מערכות אוטומציה כמו GitHub Actions שרצות אחרי כל commit).",
      ],
      tips: [
        "אצלי (אלעד) Aider עובד הכי טוב על פרויקטים שמסודרים יפה: יש להם git תקין, יש typings ברורים, יש תיקיית tests. ככל שהפרויקט מאורגן יותר — ככה ה-LLM מבין אותו מהר יותר ונותן תשובות מדויקות יותר.",
        "השתמשו ב-`/add file.ts` כדי להוסיף קובץ ל-context (המידע שה-LLM רואה באותו רגע) — זה מרשה ל-Aider לערוך אותו. לקבצים שכבר לא צריך — `/drop file.ts`. מומלץ לעבוד עם 3-5 קבצים רלוונטיים ולא לזרוק את כל הפרויקט פנימה.",
        "הפקודה `/git <command>` מריצה פקודת git ישירות מתוך Aider — מה שחוסך לכם פתיחת חלון טרמינל נוסף. `/git status`, `/git log`, `/git diff main` — הכל עובד.",
      ],
    },
    {
      id: "install",
      icon: Lock,
      title: "התקנה עם בידוד מלא מ-Claude Code",
      subtitle: "סביבה נפרדת + credentials שונים — מבלי לגעת במכסה של המנוי הראשי",
      description:
        "השלב החשוב ביותר בשימוש רציני ב-Aider הוא להתקין אותו מבודד — כלומר, בסביבת Python נפרדת ועם מפתחות API נפרדים מ-[Claude Code](/claude-code). מפתח API זה קוד סודי שמזהה את החשבון שלכם אצל חברת ה-AI (Anthropic, OpenAI, Google וכו') ועליו מחייבים. אצלי (אלעד) Aider מותקן בתיקייה ייעודית `/opt/aider/` עם מפתח OpenRouter נפרד לגמרי מחשבון [Claude Max](/claude-code) הראשי — ככה עבודה ב-Aider לא נוגעת במכסה של הכלי המרכזי.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "intermediate",
      beginner:
        "למה כל הטרחה הזו של בידוד? תחשבו על זה כמו על שני חשבונות בנק: אחד לעבודה ואחד לחסכונות. אם שניהם באותו כרטיס אשראי, כל קנייה שורפת גם מהחסכונות. אותו דבר פה — אם Aider משתמש באותם מפתחות API של [Claude Code](/claude-code), כל שורת קוד שהוא יכתוב תתקצץ מאותה מכסה חודשית. בידוד מלא = שקט נפשי. Aider רץ על חשבון חינמי של OpenRouter (שער תשלום שמציע מודלים חינמיים כמו qwen3-coder:free של חברת Alibaba), בזמן ש-[Claude Code](/claude-code) ממשיך לעבוד לו בצד על המנוי הראשי.",
      content: [
        "התקנה נקייה: `pipx install aider-chat` — הפקודה הזו יוצרת ל-Aider סביבת Python משלו בתיקייה `~/.local/pipx`, כך שלא יתנגש עם ספריות של פרויקטים אחרים. pipx זה כלי שבנוי בדיוק בשביל התקנה גלובלית מבודדת של כלי CLI בשפת Python.",
        "חשבון נפרד לחלוטין: נכנסים ל-openrouter.ai, נרשמים בחינם, מייצרים API key, ומשתמשים בו עם qwen3-coder:free. המודל הזה הוא קוד פתוח של Alibaba, באיכות מרשימה ובעלות אפסית — מושלם כ-backup.",
        "קובץ הגדרות `~/.aider.conf.yml` שאומר ל-Aider איזה מודל לבחור כברירת מחדל ואיפה לחפש אותו. לדוגמה: `model: openrouter/qwen3-coder:free` + `openai-api-base: https://openrouter.ai/api/v1`. ככה בכל פעם שתפעילו Aider הוא כבר יידע לאן לפנות.",
        "הערה קריטית: אל תגדירו את משתנה הסביבה `ANTHROPIC_API_KEY` באותו טרמינל שבו רץ Aider — אחרת Aider יבחר בו אוטומטית (זה ברירת המחדל שלו) וישרוף לכם את מכסת [Claude](/claude-code) בלי שתשימו לב. או שתריצו את Aider מתוך סקריפט עם `env -i` (שמריץ עם משתני סביבה נקיים), או שתשימו את המפתחות בקובץ `.aider.conf.yml` עצמו ולא ב-env.",
        "אם אתם דווקא רוצים להשתמש ב-Anthropic דרך Aider — תייצרו מפתח API נפרד בדשבורד של Anthropic, תגדירו לו תקרת חיוב (billing cap) של $10/חודש, וזה יהיה הבאפר הבטוח שלכם. אם המפתח הזה ישרף — [Claude Code](/claude-code) הראשי ממשיך לעבוד ללא הפרעה.",
        "רוצים פרטיות מלאה? הגדירו `model: ollama/qwen3-coder` + `api_base: http://localhost:11434`. [Ollama](/guide/ollama) זה כלי שמריץ מודלי AI ישר על המחשב שלכם, בלי לשלוח שום שורת קוד לשרת חיצוני. מושלם לתחומים רגישים כמו רפואה, משפט, או קוד ארגוני סודי.",
      ],
      tips: [
        "אצלכם ב-Windows או WSL (Windows Subsystem for Linux, סביבת לינוקס בתוך חלונות): הפקודה `pipx install aider-chat` בדרך כלל עובדת חלק. אם נתקלים בבעיות תלויות, גיבוי טוב הוא להתקין דרך conda — מנהל חבילות חלופי: `pipx install conda` קודם, ואז להתקין Aider בתוכו.",
        "הגדירו `.aider.conf.yml` גם בתיקיית הבית שלכם (`$HOME`) וגם ב-root של הפרויקט הספציפי. ההגדרות של הפרויקט דורסות את הגלובליות — ככה אתם יכולים להגדיר מודל יקר לפרויקט חשוב ומודל חינמי לכל השאר.",
        "אל תשכחו להוסיף `aider-chat-logs/*` לקובץ `.gitignore` של הפרויקט. Aider שומר logs מפורטים של כל שיחה, ואלה לא צריכים להגיע ל-PR (Pull Request, בקשה למיזוג קוד ל-branch ראשי). זה גם חיסכון מקום וגם מונע חשיפה של פרטים פנימיים.",
      ],
      codeExample: {
        label: "~/.aider.conf.yml עם OpenRouter",
        code: "model: openrouter/qwen3-coder:free\nopenai-api-base: https://openrouter.ai/api/v1\n# API key ב-env: OPENROUTER_API_KEY=sk-or-...\nauto-commits: true\nauto-lint: true\nedit-format: diff\nstream: true\nshow-diffs: true\nsubtree-only: true",
      },
    },
    {
      id: "models",
      icon: Cpu,
      title: "מודלים — מה עובד הכי טוב לאיזה שימוש",
      subtitle: "חינמי מול בתשלום, מודל שמתמחה בקוד מול מודל כללי",
      description:
        "Aider יכול להתחבר ליותר מ-100 מודלי AI שונים דרך ספרייה בשם LiteLLM (חשבו עליה כעל 'שקע אוניברסלי' שמתרגם את הבקשה לכל ספק בנפרד). בפועל, רוב המפתחים עובדים עם 5-7 מודלים בלבד שמכסים 95% מהצרכים. בסעיף הזה נעבור עליהם לפי קטגוריה — מהיקר והטוב ביותר ועד לחלופות החינמיות שעושות 80% מהעבודה. הבחירה הנכונה חוסכת המון כסף: לא שורפים את המודל הכי טוב על תיקון טעות כתיב.",
      color: "from-indigo-600 to-blue-500",
      difficulty: "intermediate",
      content: [
        "[Claude Sonnet 4.6](/claude-code) של Anthropic — זה המודל הטוב ביותר כיום לעריכת קוד מורכבת, במיוחד בפרויקטים גדולים עם הרבה קבצים שתלויים זה בזה. העלות: כ-$3 לכל מיליון טוקני קלט (מיליון טוקנים = בערך 750 אלף מילים). כאן מדובר במודל שמבין context ארוך ועושה refactoring (ארגון מחדש של קוד) בצורה חלקה. זו הבחירה שלי ל-[Claude Code](/claude-code) הראשי.",
        "GPT-4.1 ו-o3-mini של OpenAI — מצוינים לבעיות שדורשות חשיבה עמוקה (reasoning) ולשינויים שמשפיעים על הרבה קבצים בו-זמנית. GPT-4.1 הוא הגרסה המלאה, o3-mini הוא האחיין הזריז והזול יותר. שימושי כשרוצים דעה שנייה על בעיה ש-Claude מתקשה איתה.",
        "Gemini 2.5 Pro של Google — באיכות דומה ל-GPT-4 אבל בעלות נמוכה משמעותית. מבריק במיוחד בתיקונים המוניים (batch fixes) — למשל 'תעבור על 50 קבצים ותחליף בכל אחד את הפונקציה הישנה בחדשה'. בזכות ה-context הארוך שלו (מיליון טוקנים) הוא מחזיק פרויקטים שלמים ב-RAM.",
        "qwen3-coder:free של חברת Alibaba, דרך OpenRouter — המודל החינמי הטוב ביותר לקוד שקיים היום. איטי יותר ממודלים בתשלום ומוגבל ב-context (כמות הטקסט שהוא זוכר בפעם), אבל בחינם מוחלט. אצלי (אלעד) זה ה-backup כש-[Claude Max](/claude-code) מגיע למכסה. אצלכם — אם אין Claude Pro/Max, זה יכול להיות הכלי הראשי.",
        "deepseek-coder-v3 של DeepSeek — מצטיין במיוחד בקוד Python. קצת פחות חד ב-TypeScript, אז לא מתאים לכל פרויקט. חינמי במסלול הבסיסי של OpenRouter.",
        "[Ollama](/guide/ollama) עם qwen3-coder או deepseek-coder מקומיים — האופציה הכי פרטית שיש. הקוד לא יוצא מהמחשב, אין לוג אצל אף ספק ענן, וזה מושלם לתעשיות רגישות (רפואה, משפט, ביטחון). הדרישה היחידה: מחשב עם כרטיס מסך חזק (GPU — מעבד גרפי). בלי GPU טוב זה איטי מאוד.",
        "הדגל `--weak-model` — פטנט חיסכון חכם. Aider משתמש במודל קטן ופשוט לכתיבת כותרות commit (ההודעה הקצרה שמתארת מה השתנה). אין סיבה לשרוף Sonnet יקר על 'fix: typo in login' — תגדירו מודל חינמי ל-weak-model ותחסכו 30-40% מהעלות הכוללת.",
      ],
      tips: [
        "הדגל `--edit-format diff` מתאים לרוב הפרויקטים — הוא שולח ל-LLM רק את השינוי עצמו, לא את כל הקובץ. עבור שינויים גדולים ומורכבים, `--edit-format udiff` עדיף (זה פורמט diff מתוחכם יותר). Sonnet מטפל בשניהם הכי טוב מכל המודלים.",
        "לפני שאתם מפעילים בקשה גדולה על Aider, תריצו `aider --msg '/tokens'` — זה מראה לכם כמה טוקנים כרגע ב-context ומה ההוצאה המשוערת. בערך 30 אלף טוקנים זה שיחה רגילה, 100 אלף זה כבר יקר, ומעל 200 אלף זה הימור על הארנק.",
        "לבעיות פשוטות (typo, תיקון שורה בודדת, שינוי משתנה) — תשתמשו ב-haiku של Anthropic או ב-qwen3-coder:free. אין טעם לשרוף Opus, המודל הכי יקר של Anthropic, על bug של חמש דקות.",
      ],
      codeExample: {
        label: "hybrid: Anthropic ל-main, Ollama ל-weak",
        code: "# בקובץ ~/.aider.conf.yml\nmodel: anthropic/claude-sonnet-4-6\nweak-model: ollama/qwen3-coder  # לכותרות commits + פעולות קטנות\neditor-model: anthropic/claude-sonnet-4-6\n# שומר 30-40% על tokens",
      },
    },
    {
      id: "workflow",
      icon: Keyboard,
      title: "זרימת העבודה היומיומית",
      subtitle: "מה להקליד בכל שלב ופקודות הקיצור שחוסכות שעות",
      description:
        "Aider מגיע עם כ-25 פקודות קצרות שמתחילות בלוכסן (slash commands) — כל אחת מהן כלי נפרד שמזרז פעולות נפוצות. אם תזכרו 7-8 מהן, העבודה תהיה פי כמה מהירה. בסעיף הזה נעבור על הרצף הטיפוסי שאצלי (אלעד) חוזר על עצמו כמעט בכל session: מפתיחת Aider בתיקיית פרויקט ועד commit של תכונה חדשה.",
      color: "from-purple-600 to-violet-500",
      difficulty: "intermediate",
      content: [
        "התחלת session: `cd project && aider` — נכנסים לתיקיית הפרויקט ומפעילים. Aider סורק את כל הקבצים, בונה repo-map (מפה של הפרויקט שלו), ומחכה לפקודה הראשונה שלכם.",
        "`/add path/to/file.ts` — מוסיף קובץ ל-context כדי ש-Aider יוכל לקרוא ולערוך אותו. אפשר להוסיף כמה קבצים בשורה אחת מופרדים ברווח. ללא /add, הקובץ רק נצפה מרחוק דרך repo-map אבל לא ניתן לעריכה.",
        "`/ls` — מראה רשימה של כל מה שנמצא כרגע ב-context: אילו קבצים נוספו, כמה טוקנים כל אחד תופס, ואיזה בסטטוס read-only (קריאה בלבד, לא ניתן לעריכה).",
        "`/drop file.ts` — מוציא קובץ מה-context אחרי שסיימתם לעבוד עליו. זה חוסך טוקנים ומפנה מקום לקבצים הבאים. טיפ: לא לשכוח להוציא קבצים גמורים, אחרת ה-context תופח.",
        "בקשה בשפה חופשית — למשל 'תוסיף validation (בדיקת תקינות) לשדה האימייל בקובץ src/forms/signup.ts, כך שיחסום כתובות לא חוקיות'. Aider עורך את הקובץ, מראה diff, שואל אישור, עושה commit עם הודעה מפורטת.",
        "`/diff` — מראה את השינוי האחרון שעשה Aider בצורה ויזואלית: אדום למה שנמחק, ירוק למה שנוסף. שימושי לאישור מהיר לפני שממשיכים.",
        "`/undo` — מבטל את ה-commit האחרון ב-git (בשיטה של `git reset --soft`, כלומר השינויים עדיין בדיסק אבל לא רשומים ב-commit). פקודה מצילת חיים כשהמודל החמיץ.",
        "`/test` — מריץ את סוויטת הבדיקות (test suite) של הפרויקט, לפי ההגדרות בקובץ הקונפיגורציה. Aider יראה את הפלט ויוכל להציע תיקונים לבדיקות שנכשלו.",
        "`/tokens` — כמה טוקנים כרגע ב-context והעלות המשוערת של בקשה נוספת. מצוין כדי לדעת מתי לעשות `/clear` ולהתחיל session חדש.",
        "`/clear` — מנקה את היסטוריית השיחה (chat history) אבל שומר את הקבצים שהוספתם. שימושי כשעוברים ממשימה אחת למשימה אחרת ולא רוצים ש-Aider 'יזכור' את מה שהיה קודם.",
        "`/exit` — יציאה נקייה. השינויים כבר שמורים ב-git, אז סגירת Aider לא פוגעת בעבודה.",
      ],
      tips: [
        "תתחילו כל session עם `/add` של כל הקבצים הרלוונטיים לפני הבקשה הראשונה. context מקיף = תשובה טובה יותר. אל תוסיפו קבצים טיפה-טיפה — זה מבלבל את ה-LLM ואת עצמכם.",
        "`/model claude-sonnet-4-6` מחליף את המודל באמצע session. שימושי כשהמודל החלש נכשל ואתם צריכים 'לשדרג' לעוצמה רצינית יותר — או להיפך, כשסיימתם את החלק המורכב ורוצים לחזור למודל זול לפעולות קלות.",
        "`/voice` — אם הגדרתם OpenAI Whisper (שירות המרת דיבור לטקסט), אתם יכולים להקליט את הבקשה בקול במקום להקליד. פי 2 מהיר, במיוחד בעברית. אצלי זה חוסך המון זמן בישיבות ארוכות מול המסך.",
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
      subtitle: "אוטומציה, CI/CD, קלט קולי, ו-monorepos",
      description:
        "אחת היכולות החזקות של Aider היא non-interactive mode — מצב שבו הוא רץ בלי ממשק שיחה, מקבל פקודה אחת, מבצע אותה, יוצא. זה פותח דלת לכל עולם האוטומציה: הרצה אוטומטית בכל פעם שפותחים Pull Request, תיקוני lint בלילה על עשרות פרויקטים, הוספת documentation אוטומטית לקוד חדש. בסעיף הזה נעבור על הטכניקות המתקדמות שמפעילות את Aider כמו מערכת ולא רק ככלי ידני.",
      color: "from-rose-600 to-pink-500",
      difficulty: "advanced",
      content: [
        "Non-interactive mode: `aider --yes --message 'fix all lint errors' file.ts` — Aider יתחיל, יבצע את הבקשה, ויצא בלי לשאול שום שאלת אישור. הדגל `--yes` אומר 'תענה כן לכל שאלה'. זה הבסיס לכל אוטומציה.",
        "Scripting: תוכלו לעטוף את Aider בסקריפט shell ולחבר אותו ל-git hooks (מנגנונים שרצים אוטומטית בנקודות מסוימות ב-git, למשל לפני כל commit). דוגמה: pre-commit hook שמריץ Aider לתקן lint errors בקבצים ששינתם לפני שמתחילים ב-commit.",
        "GitHub Actions: Aider רץ מעולה ב-runners של GitHub (שרתים זמניים שמריצים אוטומציה על כל push לפרויקט). דוגמה נפוצה — בכל פעם שנפתח Pull Request, Aider עובר על הקוד, מתקן בעיות lint ו-formatting, ומוסיף commit מתוקן. המפתח ANTHROPIC_API_KEY נשמר כ-secret מוצפן ב-GitHub.",
        "קלט קולי: `aider --voice-language he` דרך OpenAI Whisper — מאפשר להכתיב בקשות בעברית במקום להקליד. מהיר פי 2 למשפטים ארוכים, ובעברית עובד טוב במיוחד.",
        "Multi-repo ו-monorepos: הדגל `--git-dname` מאפשר להצביע על git repo ספציפי, גם אם אתם יושבים בתיקייה אחרת. שימושי במיוחד ב-monorepo (פרויקט אחד שמכיל הרבה תתי-פרויקטים), שבו כל package יכול להיות repo משלו.",
        "CONVENTIONS.md: אחת התכונות השקטות הכי שימושיות של Aider. תכתבו קובץ CONVENTIONS.md ב-root של הפרויקט עם 10-15 כללים ('אני משתמש ב-bun לא npm', 'תמיד TypeScript strict', 'חצי-נקודה בסוף שורה'), ו-Aider יקרא אותו לפני כל בקשה וייצמד לכללים. זה מעין 'מדריך סגנון' שה-AI מכיר.",
        "Read-only context: הדגל `--read-only file.ts` אומר ל-Aider 'קרא את הקובץ להבנה, אבל אל תיגע בו'. שימושי כשרוצים שמשהו ישרת כהקשר (context) לבלי שיהיה בסיכון להשתנות — למשל קבצי schema, constants, או הגדרות בסיסיות.",
        "Linter integration: `--auto-lint` מריץ linter (כלי שבודק סגנון קוד) אוטומטית אחרי כל עריכה של Aider. אם ה-lint נכשל, Aider רואה את השגיאות ומתקן אותן בו במקום. ככה הקוד יוצא מההתחלה נקי.",
      ],
      tips: [
        "תגדירו קובץ CONVENTIONS.md עם 10-15 כללי הזהב של הפרויקט — Aider עוקב אחריהם בכל עריכה. אצלי (אלעד) יש שם דברים כמו 'תמיד [better-result](/guide/claude-code) לטיפול בשגיאות, לא try/catch', 'bun לא npm', 'אלמנטים ב-Tailwind v4 בלבד'.",
        "ב-CI: תמיד לשלב `--yes` עם `--no-pretty` (שמונע צבעי ANSI בלוגים — הם יוצאים כמו 'ג'יבריש' בלוגים שאינם טרמינל). לפני פריסה אמיתית, תריצו את הזרימה פעם אחת על branch פרטי כדי לוודא שהפלט יוצא נקי.",
        "ב-monorepo: תריצו את Aider מתוך ה-package הבודד ולא מ-root של ה-monorepo. ככה ה-repo-map שלו הרבה יותר מדויק ולא מציף את ה-LLM ב-200 קבצים שלא רלוונטיים לבקשה הנוכחית.",
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
        "שניהם כלים מעולים, ובאמת לא מתחרים אלא משלימים אחד את השני. הבחירה תלויה בהקשר: מה המשימה, איזה תקציב יש, אם צריך פרטיות מוחלטת או שקף עננית. אצלי (אלעד) ההרכב הוא [Claude Code](/claude-code) כראשי לפיתוח רציני ויומיומי, ו-Aider ל-tasks מבודדים ולחיסכון במכסה של המנוי הראשי. אצלכם — הבחירה תלויה קודם כל בשאלה 'האם יש לי מנוי [Claude Max](/claude-code)?'. אם כן, Claude Code מוביל. אם לא, Aider לוקח את הבמה.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "beginner",
      content: [
        "[Claude Code](/claude-code) מציע חוויית עבודה עשירה: ממשק גרפי מלא בטרמינל, אינטגרציה עם MCP (Model Context Protocol — פרוטוקול סטנדרטי שמחבר את Claude לכלים חיצוניים), sub-agents (סוכני-משנה שמבצעים משימות במקביל), skills, hooks (פעולות אוטומטיות שרצות בנקודות מסוימות), TodoWrite (ניהול רשימת משימות פנימי). אידיאלי לפיתוח רציני עם מנוי Max של $100-200 לחודש.",
        "Aider הוא CLI טהור ומינימלי — פשוט יותר, מהיר יותר, קל יותר לאוטומציה. תומך בכל ספקי ה-AI הגדולים דרך LiteLLM, ויש לו מסלול חינמי מלא דרך OpenRouter. יתרון: מי שצריך backup או אין לו תקציב יקבל כלי שעדיין ברמה גבוהה.",
        "עריכת קוד: [Claude Code](/claude-code) עם ה-diff UI שלו נוח יותר לעבודה אינטראקטיבית. Aider עם patch mode מוצלח במיוחד ב-CI אוטומטי (הפלט קצר וקל לניתוח).",
        "שילוב git: שני הכלים מעולים, אבל אצל Aider זה אוטומטי לחלוטין — כל שינוי הופך ל-commit בלי שאלות. ב-[Claude Code](/claude-code) נדרשת פקודת `/commit` מפורשת, מה שנותן שליטה אבל דורש יותר צעדים.",
        "Context רב-קבצי: [Claude Code](/claude-code) משתמש ב-sub-agents לפרויקטים גדולים מאוד (עשרות אלפי קבצים). Aider עם repo-map עובד יפה עד בינוני-גדול, ואז ממליץ להתמקד בתת-פרויקט בודד.",
        "עלות חודשית: [Claude Code](/claude-code) דורש מנוי Max ($100-200/חודש) או API key עם תשלום לפי שימוש. Aider יכול להיות חינמי מוחלט עם qwen3-coder:free, או בעלות נמוכה עם OpenRouter pay-as-you-go.",
        "AI מקומי: Aider מצוין יחד עם [Ollama](/guide/ollama) ומאפשר עבודה air-gapped (מנותקת לגמרי מהאינטרנט — הקוד לא יוצא מהמחשב). [Claude Code](/claude-code) תלוי בשירות הענן של Anthropic וכרגע אין לו מצב offline.",
      ],
      tips: [
        "אצלי (אלעד) השילוב הוא: [Claude Code](/claude-code) ל-planning ולמשימות מורכבות שדורשות חשיבה ארוכה עם [Kami](/guide/kami), [Kaylee](/guide/kaylee) וסוכני ה-[Delegator](/guide/delegator). Aider לתיקוני lint המוניים ול-refactoring גדול על עשרות קבצים.",
        "אם יש לכם [Claude Max](/claude-code) — [Claude Code](/claude-code) עדיף ב-90% מהזמן בזכות הסוכנים, ה-MCP ויכולות ה-planning. Aider ישרת אתכם בתפקיד backup, בעבודה על קוד רגיש שדורש air-gap, או ב-CI/CD.",
        "אם אין לכם [Claude Max](/claude-code) — התחילו עם Aider + OpenRouter qwen3-coder:free. תקבלו 80% מהיכולת בחינם. כשתתקלו בבקשה שבה Aider לא מספיק, תשקלו מעבר ל-[Claude Code](/claude-code).",
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
