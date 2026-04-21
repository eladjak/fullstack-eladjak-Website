import {
  Cpu,
  Download,
  Zap,
  HardDrive,
  Layers,
  Gauge,
  DollarSign,
  Github,
  ExternalLink,
  BookOpen,
  Code2,
  Rocket,
  Lightbulb,
  Users,
  Mail,
  Brain,
  Terminal,
  Server,
  Shield,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const ollamaGuide: AgentGuideData = {
  slug: "ollama",
  agentName: "Ollama",
  agentNameHe: "Ollama — מודלי שפה חכמים על המחשב שלך, בחינם",
  category: "infra",
  logoImage: "/images/guide-logos/ollama-logo.png",
  tagline: "מודלי שפה חכמים (כמו ChatGPT) שרצים ישירות על המחשב שלך, בלי חיבור לענן",
  heroDescription:
    "Ollama זו פלטפורמה לקוד פתוח שמאפשרת להריץ מודלי שפה חכמים של בינה מלאכותית (הידועים בקיצור LLMs — Large Language Models, המנוע שמאחורי ChatGPT, Claude וחבריהם) ישירות על המחשב שלך. אין צורך בחיבור לאינטרנט, אין שליחת נתונים לחברות כמו OpenAI או Google, והכל קורה אצלך, בפרטיות מלאה. הפלטפורמה כתובה בשפת Go והיא יודעת להריץ עשרות מודלים מפורסמים כמו Gemma של Google, Llama של Meta, Qwen של Alibaba, ו-DeepSeek — כולם בחינם לחלוטין. אצלי (אלעד) Ollama משמשת בעיקר כרשת ביטחון: כשהמודלים בענן יקרים מדי או לא זמינים, הסוכנים שלי (כמו [Kami](/guide/kami), [Kaylee](/guide/kaylee), ו-[CrewAI](/guide/crewai)) עוברים אוטומטית להשתמש במודל מקומי — וחוסכים המון כסף על משימות שגרתיות. אצלך זה יכול להיות הרבה יותר מכך: סביבת AI מלאה שפועלת גם בלי אינטרנט, פתרון עבור ארגונים עם דרישות פרטיות מחמירות (רפואה, משפט, ביטחון), או פשוט דרך להכיר את העולם של מודלי שפה פתוחים בלי לשלם דולר אחד.",
  badgeText: "2026 · Local LLM Runtime · מדריך מעשי",
  canonical: "https://fullstack-eladjak.co.il/guide/ollama",
  heroBgImage: "/images/guides/guide-ollama-hero.jpg",
  stats: [
    { label: "עלות", value: "חינם" },
    { label: "זמן התקנה", value: "5 דקות" },
    { label: "מודלים נפוצים", value: "50+" },
    { label: "פרטיות", value: "100% local" },
  ],
  paradigmTitle: "כשהבינה המלאכותית רצה אצלכם — הכל משתנה",
  paradigmSub:
    "אין מגבלות על מספר הבקשות, אין מפתחות API לנהל, אין דאגות פרטיות. רק המחשב שלכם, המודל, והשיחה ביניכם.",
  paradigmShifts: [
    {
      before: "40$/חודש על OpenAI/Anthropic API",
      after: "Gemma 2B רץ על MacBook, 0$",
      icon: DollarSign,
    },
    {
      before: "כל שאילתה עולה ל-cloud ונשמרת אצל vendor",
      after: "נתונים רגישים נשארים בבית. מודל קטן, תשובה ב-200ms",
      icon: Shield,
    },
    {
      before: "Rate limits מגבילים batch processing",
      after: "1000 classifications ברצף, ללא הגבלה",
      icon: Zap,
    },
    {
      before: "תלות ב-internet יציב למשימות AI",
      after: "LLM עובד גם ב-offline, על טיסה, במרתף",
      icon: Server,
    },
  ],
  whoIsThisFor: [
    {
      title: "מפתחים בתקציב",
      description:
        "לפני שמשלמים 20$/חודש ל-ChatGPT Plus — Gemma 2B מטפל ב-70% מהמשימות בחינם.",
      icon: DollarSign,
      color: "from-emerald-500 to-green-500",
    },
    {
      title: "תעשיות רגישות",
      description:
        "רפואה, משפט, פיננסים — air-gapped LLM הוא לפעמים הדרך היחידה לשלב AI.",
      icon: Shield,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "אוטומציה מקומית",
      description:
        "Classification של אלפי הודעות, OCR post-processing, summary של logs — בלי לשלם לכל API call.",
      icon: Zap,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "לומדים על LLMs",
      description:
        "להבין איך GGUF, quantization, context windows עובדים — Ollama מפשט הכל לפקודה אחת.",
      icon: BookOpen,
      color: "from-violet-500 to-purple-500",
    },
  ],
  toc: [
    { id: "what-is", label: "מה זה" },
    { id: "install", label: "התקנה" },
    { id: "models", label: "בחירת מודל" },
    { id: "api", label: "שימוש ב-API" },
    { id: "performance", label: "ביצועים" },
    { id: "integration", label: "אינטגרציה" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Cpu,
      title: "מה זה בעצם Ollama?",
      subtitle: "הדרך הפשוטה ביותר להכיר את העולם של בינה מלאכותית מקומית",
      description:
        "Ollama נולדה כפרויקט שמאתגר תפיסה אחת: שכדי להשתמש ב-AI מתקדם חייבים להתחבר לחברת ענק כלשהי ולשלם לה. היא מספקת כלי אחד פשוט שיודע להוריד מודל, לטעון אותו לזיכרון, ולפתוח אותו לשיחה — בדיוק כמו ChatGPT, אבל בלי ש-OpenAI יודעת עליכם דבר.",
      color: "from-indigo-600 to-blue-500",
      difficulty: "beginner",
      beginner:
        "חשבו על Ollama כמו Spotify של מודלי שפה: יש ספרייה גדולה של 'שירים' (מודלים), בוחרים איזה להוריד, והוא מתנגן אצלכם. ההבדל הגדול הוא שהנגן הזה דורש מעבד חזק יחסית — ומה שמתנגן אצלכם הוא 'שיחה אינטליגנטית', לא מוזיקה.",
      content: [
        "התקנה אחת פשוטה, ללא צורך בידע טכני עמוק — קובץ התקנה שעובד ב-Mac, ב-Windows, וב-Linux",
        "ספרייה עם למעלה מ-200 מודלים פתוחים מהמובילים בעולם, וביניהם: משפחת Gemma של Google (כולל Gemma 3 החדשה), משפחת Llama של Meta (Llama 3.1, 3.2 ו-3.3), משפחת Qwen של Alibaba (Qwen 2.5 ו-Qwen 3), סדרת DeepSeek (DeepSeek-V3 ו-DeepSeek-R1 עם יכולות חשיבה), מודלי Mistral הצרפתיים (Mistral Small, Mixtral), מודלי Phi-4 של Microsoft, סדרת SmolLM2 של HuggingFace, ומודלים ייעודיים נוספים (GPT-OSS של OpenAI במהדורה הפתוחה, Command-R של Cohere, Granite של IBM) — כולם בחינם מוחלט לשימוש מקומי",
        "ממשק API זהה לחלוטין לזה של OpenAI — כך שכל תוכנה שכבר מדברת עם ChatGPT יכולה לדבר עם Ollama במקום זה, בהחלפת כתובת אחת",
        "רץ ברקע כשירות בסיס (port 11434), זמין לכל אפליקציה אחרת במחשב — לכן אפשר לחבר אותו בקלות לסוכנים, כלים, ואתרים שבניתם",
        "תומך ב-GPU אוטומטית — כרטיס NVIDIA, שבב Apple Silicon, או AMD יקפיץ את המהירות פי 5-10 לעומת CPU בלבד",
        "המודלים מגיעים בפורמט חסכוני (GGUF) שדוחס את המידע מבלי לפגוע משמעותית באיכות — כך שגם מחשב ביתי של 8GB RAM יכול להריץ מודל מכובד",
      ],
      tips: [
        "התחילו מ-Gemma 3 בגודל 4B: ברירת מחדל מצוינת שרצה יפה גם על MacBook Air רגיל, ונחשבת למודל החזק ביותר בגודלה נכון ל-2026. איכות מצוינת, מהירה, ודורשת כ-3.3GB זיכרון בלבד.",
        "אם יש לכם GPU חזק (16GB VRAM ומעלה) — נסו את Qwen 3 בגודל 14B או 32B. האיכות שלהם כבר מתחרה ב-Claude Haiku וב-GPT-4o-mini, וכוללת מצב חשיבה (thinking mode) לפתרון בעיות מורכבות.",
        "לעבודה על קוד — Qwen 3 Coder (גדל 30B) ו-DeepSeek-Coder-V2 עדיפים משמעותית על מודלי שיחה כלליים. הם אומנו על מיליארדי שורות קוד אמיתיות ומחזירים פלט מדויק יותר.",
      ],
      codeExample: {
        label: "שני פקודות, ויש לכם AI מקומי",
        code: "# Mac/Linux — להתקנה\ncurl -fsSL https://ollama.com/install.sh | sh\n\n# להורדת מודל ולשיחה איתו\nollama pull gemma3:2b\nollama run gemma3:2b \"שלום, מה שלומך?\"",
      },
    },
    {
      id: "install",
      icon: Download,
      title: "התקנה — כל פלטפורמה",
      subtitle: "Mac, Linux, Windows, Docker",
      description:
        "התקנת Ollama זו פעולה פשוטה מאוד שנתמכת בכל מערכות ההפעלה הנפוצות. ההמלצה שלי: התקנה ישירה על המחשב (Mac ו-Linux) שנותנת גישה מיידית לכרטיס המסך (GPU) שלכם ומאיצה את הביצועים משמעותית. [Docker](/guide/docker) — מערכת שמריצה תוכנות בתוך 'קופסאות' מבודדות — שמור למי שבאמת צריך הפרדה בין שרתים או עובד בסביבת ייצור (production).",
      color: "from-emerald-600 to-teal-500",
      difficulty: "beginner",
      beginner:
        "אם יש לכם Mac מודרני (עם שבב M1/M2/M3) או מחשב Linux עם כרטיס NVIDIA — ההתקנה זה סקריפט אחד שרץ בטרמינל ותוך כמה דקות הכל מוכן. ב-Windows האפשרות הפשוטה היא להוריד את Ollama Desktop (גרסה ויזואלית עם אייקון בשורת המשימות), ולשרתים המקצועיים מומלץ להשתמש ב-Docker.",
      content: [
        "ב-Mac: או פקודה אחת בטרמינל (curl | sh) או הורדת האפליקציה הרשמית מ-ollama.com — שמקבלים אייקון נחמד בשורת התפריטים העליונה",
        "ב-Linux: אותה פקודה יוצרת אוטומטית שירות רקע (systemd) שמתחיל לרוץ בכל הפעלה של המחשב — בדיוק כמו כל שירות מערכת אחר",
        "ב-Windows: אפשר להוריד את Ollama Desktop (עדיין בגרסת הרצה מוקדמת) או להשתמש ב-WSL2 (תת-מערכת לינוקס שמובנית בתוך חלונות) יחד עם nvidia-container-toolkit",
        "ב-[Docker](/guide/docker): יש image רשמי (ollama/ollama:latest) שרץ עם הדגל --gpus=all אם יש NVIDIA, או בלי דגל זה לריצה על מעבד בלבד",
        "כונן SSD מהיר חשוב מאוד: כשמפעילים מודל הוא נטען מהדיסק לזיכרון, וכונן NVMe מודרני מוריד את זמן ההמתנה הראשון בחצי",
        "כלל אצבע לזיכרון RAM: צריך בערך פי 1.2 מגודל המודל ברמת הדחיסה הסטנדרטית (Q4). כלומר Gemma 3 בגודל 4B דורש כ-3.3GB, Llama 3.1 בגודל 8B דורש כ-6GB, ואילו Qwen 3 בגודל 32B יצרוך כ-22GB",
      ],
      tips: [
        "הגדירו את משתנה הסביבה OLLAMA_MODELS כך שיצביע על כונן גדול — המודלים יכולים לתפוס 50GB ויותר, והם לא מיועדים לדיסק המערכת הקטן",
        "ב-Linux, הדרך המסודרת להוסיף הגדרות זה דרך sudo systemctl edit ollama — כך אפשר להוסיף משתני סביבה מבלי לשבור את העדכונים הבאים",
        "ב-Docker חובה לחבר volume לנתיב /root/.ollama — אחרת בכל פעם שהקונטיינר ייעצר תאבדו את כל המודלים שהורדתם ותצטרכו להוריד אותם מחדש",
      ],
      codeExample: {
        label: "Docker עם GPU",
        code: "docker run -d \\\n  --gpus=all \\\n  -v ollama:/root/.ollama \\\n  -p 11434:11434 \\\n  --name ollama \\\n  ollama/ollama",
      },
    },
    {
      id: "models",
      icon: Layers,
      title: "איזה מודל לבחור?",
      subtitle: "חלוקה לפי use case — small vs large, chat vs code",
      description:
        "בחירת מודל זו החלטה שיכולה להיראות מסובכת — ספריית Ollama מכילה מאות מודלים עם שמות מלאים בקיצורים טכניים. האמת הפשוטה היא שלכל סוג משימה מספיקים חמישה או שישה מודלים מובילים, ובפועל רוב המשתמשים מסתדרים עם שניים-שלושה. הנה המדריך המעשי לבחירה חכמה לפי המשימה שלכם ולפי החומרה שיש לכם בבית.",
      color: "from-amber-600 to-orange-500",
      difficulty: "intermediate",
      beginner:
        "חשבו על שני מימדים פשוטים לבחירה: (1) כמה זיכרון יש לכם — הן רגיל (RAM) והן בכרטיס המסך (VRAM, הזיכרון של ה-GPU); (2) מה המשימה העיקרית — שיחה רגילה, כתיבת קוד, סיווג טקסטים (classification), או יצירת embeddings (המרת טקסט לייצוג מספרי שמאפשר השוואות חכמות). הצטלבות של שני המימדים האלה תיתן לכם את המודל המתאים.",
      content: [
        "למשימות כלליות (שיחה, סיכומים, תרגום, כתיבה יצירתית): Gemma 3 בגודל 4B מהיר וחסכוני לעבודה יומיומית / Llama 3.1 בגודל 8B אלטרנטיבה מצוינת עם הקשר של 128k טוקנים / Qwen 3 בגודל 14B הוא נקודת המתוק שבין איכות לדרישות חומרה / Llama 3.3 בגודל 70B ו-Qwen 3 בגודל 32B מביאים איכות ברמת מודלי ענן, אך דורשים חומרה חזקה (32–48GB VRAM)",
        "למשימות חשיבה מורכבות (reasoning — פתרון בעיות מתמטיות, לוגיות, ניתוחים רב-שלביים): DeepSeek-R1 (זמין במספר גדלים מ-1.5B עד 70B), Qwen 3 במצב thinking-mode, או gpt-oss של OpenAI (גרסה קוד-פתוחה של GPT). אלה מודלים חדשים שמבצעים 'חשיבה פנימית' לפני שמחזירים תשובה",
        "לעבודה עם קוד (כתיבה, ביקורת, refactoring): Qwen 3 Coder (גודל 30B) — הטוב ביותר נכון ל-2026 / DeepSeek-Coder-V2 (16B) אלטרנטיבה מצוינת וחסכונית / StarCoder2 (15B) של HuggingFace מתאים לעבודה עם Python / CodeLlama (34B) עדיין תקף למי שעובד על שפות פחות נפוצות",
        "למודלים קלי משקל (למחשבים חלשים או מכשירי קצה): SmolLM3 של HuggingFace בגודל 3B / Phi-4-mini של Microsoft (3.8B) / Gemma 3 1B — כולם רצים בנוחות גם על מחשבים נטולי GPU",
        "למשימות סיווג (classification) עם פלט JSON מובנה: Gemma 3 בגודל 4B או Phi-4 עם הפרמטר format: 'json' — מחזירים תשובות עקביות ומהירות",
        "ל-embeddings (ייצוג מספרי לחיפוש סמנטי): nomic-embed-text גרסה 1.5 (768 מימדים), mxbai-embed-large (1024 מימדים, איכות גבוהה יותר), או snowflake-arctic-embed-l — כולם משתלבים מצוין עם [Qdrant](/guide/qdrant)",
        "לעברית: Qwen 3 ו-Qwen 2.5 הם המובילים הבלתי-מעורערים מבין המודלים המקומיים. Gemma 3 סבירה וחסכונית. Mistral Small 3.1 טובה מעבר לציפיות. DeepSeek ו-Llama עדיין חלשים יחסית בעברית — הם אומנו בעיקר על טקסטים באנגלית",
        "לראייה ממוחשבת (ניתוח תמונות): LLaVA (7B), MiniCPM-V (8B), Qwen2-VL (7B) או Gemma 3 במהדורת Vision — כולם מבצעים OCR (זיהוי טקסט בתמונות), תיאור מילולי של תמונות, ואפילו מענה על שאלות לגבי תרשימים וצילומי מסך",
      ],
      tips: [
        "ברירת המחדל המומלצת ל-quantization (דחיסה חכמה של המודל שמצמצמת משקל מבלי לפגוע משמעותית באיכות) זה Q4_K_M. גרסת Q8_0 נותנת איכות מעט גבוהה יותר אבל דורשת פי 2 זיכרון — בדרך כלל לא שווה את זה עבור שימוש יומיומי",
        "ההבדל בין llama3.1:latest (ברירת המחדל, Q4_K_M) לבין llama3.1:8b-instruct-q8_0 הוא כ-3–5 אחוזים באיכות התשובה, אבל פי שניים בצריכת הזיכרון. לכן הגרסה הדחוסה עדיפה כמעט תמיד — הורידו את הגרסה הגדולה רק אם יש לכם הרבה VRAM והאיכות המרבית חיונית",
        "לפני שמורידים מודל כבד של 30GB ומעלה, שווה להציץ בדף המודל באתר הרשמי (ollama.com/library/NAME) — שם יש טבלאות השוואה, benchmarks עדכניים, ומגוון רמות quantization עם פירוט גודל ואיכות",
        "עדכון חשוב מ-2026: המודלים החדשים (Gemma 3, Qwen 3, DeepSeek-V3, Llama 3.3) כולם תומכים ב-128k טוקני הקשר (context window) — אפשר להזין מסמכים שלמים או בסיסי קוד גדולים לתוך שיחה אחת",
      ],
      codeExample: {
        label: "חיפוש ובדיקת מודל",
        code: "ollama list           # מה מותקן\nollama pull qwen3-coder:7b\nollama show qwen3-coder:7b  # config, context, params\nollama rm MODEL       # מחיקה (המודלים כבדים)",
      },
    },
    {
      id: "api",
      icon: Terminal,
      title: "שימוש ב-REST API",
      subtitle: "תואם OpenAI — קל להחליף integrations קיימים",
      description:
        "ה-API זו הדרך שבה תוכנות מדברות עם Ollama מהקוד שלהן. ברירת המחדל היא פורט 11434 (המספר שבו השירות מאזין לבקשות במחשב), וה-API תומך במגוון כתובות: /api/generate לייצור טקסט פשוט, /api/chat לשיחה עם היסטוריה, /api/embeddings להמרת טקסט למספרים, ו-/v1/chat/completions שהיא כתובת תואמת לחלוטין ל-API של OpenAI. הדבר האחרון הזה הוא הקסם — כל תוכנה שכבר יודעת לעבוד עם ChatGPT תוכל לעבור ל-Ollama מבלי לשנות כמעט דבר.",
      color: "from-purple-600 to-violet-500",
      difficulty: "intermediate",
      content: [
        "Streaming (תשובה שמתגלגלת מילה-מילה כמו ב-ChatGPT): מוסיפים 'stream': true לגוף הבקשה ומקבלים את הפלט בזרם מתמשך של טוקנים (יחידות טקסט קטנות שהמודל מייצר)",
        "החלפה שקופה ל-OpenAI: משנים את כתובת ה-API ל-http://localhost:11434/v1, נותנים מפתח API דמי (כל מחרוזת מזהה בסיסית) — וזה עובד מיידית עם LangChain, LlamaIndex, Vercel AI SDK וכל לקוח אחר",
        "ניהול הקשר (context): בניגוד ל-ChatGPT, השיחה לא נשמרת אוטומטית בין קריאות. צריך לשלוח את כל מערך ההודעות (messages) בכל בקשה מחדש",
        "הגדרת תפקיד (system prompt): messages: [{role: 'system', content: '...'}, {role: 'user', ...}] — זו הדרך לומר למודל מי הוא ואיך הוא אמור להתנהג",
        "פרמטרים כמו temperature (רמת היצירתיות), top_p (כמה אפשרויות לשקול), ו-num_ctx (גודל חלון ההקשר, כלומר כמה טקסט המודל יכול 'לזכור' בבת אחת) — כולם נשלחים בתוך אובייקט options ומותאמים לכל בקשה בנפרד",
        "קריאה לפונקציות (function calling): Qwen 2.5 ו-Llama 3.1 ומעלה תומכים בזה — היכולת של המודל לקרוא לכלים חיצוניים. פחות יציב מ-GPT-4, אבל מספיק ברוב המקרים",
      ],
      tips: [
        "תמיד הגדירו את num_ctx מראש: ברירת המחדל היא 2048 טוקנים — זה פחות מדף אחד של טקסט, וברוב הפעמים קטן מדי. עלו ל-4096 או 8192 לפי הצורך",
        "הפרמטר keep_alive: '5m' בתוך options ישאיר את המודל טעון בזיכרון בין בקשות — חוסך שתיים עד שלוש שניות של טעינה בכל קריאה חוזרת",
        "למשימות שדורשות פלט מובנה (כמו מילוי טופס): הפרמטר response_format: 'json' יכפה על Gemma 3 להחזיר JSON חוקי — מצוין לאוטומציות ב-[CrewAI](/guide/crewai) או ב-[n8n](/guide/n8n)",
      ],
      codeExample: {
        label: "קריאה מ-Node/TypeScript",
        code: "const res = await fetch('http://localhost:11434/api/chat', {\n  method: 'POST',\n  body: JSON.stringify({\n    model: 'gemma3:2b',\n    messages: [{ role: 'user', content: 'מה זה container?' }],\n    stream: false,\n    options: { num_ctx: 4096, temperature: 0.7 },\n  }),\n});\nconst { message } = await res.json();",
      },
    },
    {
      id: "performance",
      icon: Gauge,
      title: "ביצועים — מה לצפות ואיך לשפר",
      subtitle: "tokens/sec, latency, ו-throughput",
      description:
        "ביצועים זו השאלה הראשונה שכל מי שמתחיל ב-Ollama שואל: כמה מהר זה יהיה אצלי? התשובה תלויה בשלושה גורמים עיקריים — גודל המודל (כמה 'חכם' הוא), החומרה שלכם (CPU לבד, או GPU שמאיץ את החישובים), ורמת ה-quantization (הדחיסה). הנה הערכים הטיפוסיים בשנת 2026, כך שתדעו מראש למה לצפות — ואיך לשפר אם הביצועים לא מספקים.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "advanced",
      content: [
        "MacBook עם שבב M3 Pro ו-36GB זיכרון מריץ את Gemma 3 בגודל 2B במהירות של כחמישים טוקנים לשנייה (יחידות טקסט שנוצרות בזמן אמת). Qwen 2.5 בגודל 7B יגיע לכעשרים, ואילו Llama 3.3 בגודל 70B ברמת דחיסה Q4 ייתן רק כארבעה טוקנים לשנייה",
        "NVIDIA 4090 (כרטיס מסך מהדור העליון עם 24GB VRAM — זיכרון ייעודי לכרטיס) + Qwen 2.5 בגודל 14B = כשישים טוקנים לשנייה. להרצת מודל בגודל 70B תצטרכו כרטיס עם 32GB VRAM ומעלה",
        "הרצה על CPU בלבד (למשל Intel i7 רגיל): Gemma 3 בגודל 2B נותן כעשרה טוקנים לשנייה, ומודלים בגודל 7B ייתנו רק שלושה — לא מעשי לשיחה בזמן אמת, אבל מספיק לעיבוד batch (קבוצות של משימות ברקע)",
        "זמן ההמתנה לטוקן הראשון (first-token latency) תלוי בעיקר בזמן הטעינה של המודל לזיכרון. הגדרת keep_alive='10m' מונעת טעינה חוזרת בין בקשות ומקצרת משמעותית את התגובה",
        "במקביליות (concurrency): Ollama מריץ כמות מוגבלת של בקשות במקביל. לצרכי תפוקה גבוהה (throughput) עדיף להשתמש ב-vLLM או TGI — שרתי inference מקצועיים יותר שבנויים לעומסים גדולים",
        "Flash Attention (אופטימיזציה חכמה של מנגנון ה-attention בלב המודל) מופעלת אוטומטית כשיש GPU תומך — חוסכת 30-40% מצריכת הזיכרון ללא פגיעה באיכות",
      ],
      tips: [
        "לפני שמעלים לייצור (production), כדאי להריץ בדיקת עומסים עם כלים כמו hey או bombardier: Ollama מסתדר עם שתיים עד ארבע בקשות מקבילות, מעבר לזה הוא נחנק ומאט משמעותית",
        "אם המודל גדול מדי ומתחלק בין ה-CPU ל-GPU (מצב hybrid) — הביצועים צונחים ב-60-80%. במקרה כזה עדיף לרדת למודל קטן יותר שנכנס כולו לזיכרון ה-GPU",
        "להשוואת ביצועים מקצועית יש כלי בשם llama-bench (כלול ברפוזיטורי של Ollama) — הוא הרבה יותר מדויק מלהריץ שאילתות ידנית ולמדוד בשעון יד",
      ],
    },
    {
      id: "integration",
      icon: Brain,
      title: "אינטגרציה עם רשת הסוכנים",
      subtitle: "איך Ollama משתלב עם Kami, CrewAI, Delegator",
      description:
        "אינטגרציה זו הנקודה שבה Ollama הופך מכלי מקומי נחמד לחלק פועם של מערכת רחבה יותר. ברשת הסוכנים שלי, Ollama ממלא תפקיד של רשת ביטחון (fallback — תוכנית גיבוי) וגם של עובד ברקע למשימות שגרתיות שלא מצדיקות תשלום לענן. בזכות ה-endpoint תואם-OpenAI, כל מודל ברשת יכול לעבור מ-Claude או Gemini ל-Ollama בשינוי כתובת בלבד. זה שימושי במיוחד למשימות classification בתוך [Adopter](/guide/adopter) ולסיווג של intakes ב-[Box](/guide/box).",
      color: "from-rose-600 to-pink-500",
      difficulty: "advanced",
      content: [
        "LangChain ו-LlamaIndex (ספריות פופולריות לבניית אפליקציות AI): OllamaLLM(model='qwen2.5', base_url='http://localhost:11434') — החלפה שקופה בשורה אחת",
        "[CrewAI](/guide/crewai): Agent(llm=LLM(model='ollama/qwen2.5:7b')) — תמיכה מובנית וטבעית, בלי אדפטרים או wrappers",
        "Fallback ב-[Kami](/guide/kami): אם Claude מחזיר שגיאה (429 זה חריגת quota, 500 זה תקלת שרת) — הקוד תופס את החריגה ועובר ל-Ollama אוטומטית, השיחה ממשיכה בלי שהמשתמש הרגיש",
        "[Adopter](/guide/adopter) עושה סיווג של כ-500 הודעות ביום — במקום לשרוף quota יקר של Gemini, הכל רץ דרך Ollama המקומי בחינם",
        "Embeddings: המודל nomic-embed-text רץ ב-Ollama בכ-150 טוקנים לשנייה ומהווה חלופה מעולה ל-embeddings של Gemini (שחינמי אבל עם מגבלת קצב של דקה-לדקה)",
        "במעקב העלויות (/costs/llm) הקריאות מסומנות כ-'local' — המשמעות בפועל היא עלות אפסית, סופרים רק את החשמל של המחשב",
      ],
      tips: [
        "תמיד תבדקו את המודל על הדאטה האמיתי שלכם. מודל שמקבל ציון גבוה על benchmarks סטנדרטיים (כמו MT-Bench) לא בהכרח מצטיין בעברית או בדומיין הספציפי שלכם",
        "גישה היברידית: [Claude](/claude-code) לחשיבה מורכבת ולמקרים קריטיים, Ollama לסיווג מסיבי של נתונים ברקע. זה השילוב הכי חסכוני ומייצב שמצאתי",
        "אזהרת אבטחה קריטית: לעולם אל תחשפו את פורט 11434 לאינטרנט! זה API פתוח לגמרי ללא הרשאות (auth). אם יש צורך בגישה מרחוק — הקימו reverse proxy עם טוקן הרשאה",
      ],
      codeExample: {
        label: "fallback chain מ-Claude ל-Ollama",
        code: "async function llm(prompt: string) {\n  try {\n    return await anthropicClient.messages.create({ ... });\n  } catch (e) {\n    if (e.status === 429 || e.status >= 500) {\n      return await ollamaClient.chat({\n        model: 'qwen2.5:7b',\n        messages: [{ role: 'user', content: prompt }],\n      });\n    }\n    throw e;\n  }\n}",
      },
    },
  ],
  resources: [
    {
      title: "Ollama",
      description: "האתר הרשמי, התקנה ו-model library",
      href: "https://ollama.com",
      icon: ExternalLink,
    },
    {
      title: "Ollama GitHub",
      description: "הקוד הפתוח + issues + release notes",
      href: "https://github.com/ollama/ollama",
      icon: Github,
    },
    {
      title: "llama.cpp",
      description: "ה-engine שמתחת. שימושי להבנה של GGUF ו-quantization",
      href: "https://github.com/ggerganov/llama.cpp",
      icon: Github,
    },
    {
      title: "HuggingFace GGUF Collection",
      description: "מודלים בפורמט GGUF שלא זמינים ב-Ollama registry",
      href: "https://huggingface.co/models?library=gguf",
      icon: ExternalLink,
    },
    {
      title: "Open WebUI",
      description: "ממשק web גרפי ל-Ollama (דומה ל-ChatGPT)",
      href: "https://github.com/open-webui/open-webui",
      icon: Github,
    },
    {
      title: "המדריך ל-CrewAI",
      description: "איך לחבר Ollama ל-crew של agents",
      href: "/guide/crewai",
      icon: BookOpen,
    },
  ],
  ctaTitle: "להפסיק לשלם על API ולהעביר חלק ל-local",
  ctaSub:
    "5 דקות של התקנה, ו-LLM רץ אצלכם. לפי המשימה — חיסכון של 20-80% בעלויות ענן.",
  primaryCta: {
    label: "Ollama הרשמי",
    href: "https://ollama.com",
    icon: ExternalLink,
  },
  secondaryCta: {
    label: "דברו איתי על setup",
    href: "https://wa.me/972525427474",
    icon: Mail,
  },
  authorBio:
    "Ollama הוא שכבה משלימה ברשת — ה-fallback החינמי כש-cloud APIs לא זמינים או יקרים מדי, וה-default למשימות batch שלא מצדיקות תשלום. המדריך מציג את החלוקה המעשית: איזה מודלים שווים local, מתי להשתמש ב-hybrid, ואיך לשלב עם LangChain/CrewAI בלי לשבור workflows קיימים.",
};
