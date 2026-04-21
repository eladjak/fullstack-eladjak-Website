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
  brandIconSlug: "ollama",
  brandIconColor: "FFFFFF",
  tagline: "מודלי שפה חכמים (כמו ChatGPT) שרצים ישירות על המחשב שלך, בלי חיבור לענן",
  heroDescription:
    "Ollama זו פלטפורמה לקוד פתוח שמאפשרת להריץ מודלי שפה חכמים של בינה מלאכותית (הידועים בקיצור LLMs — Large Language Models, המנוע שמאחורי ChatGPT, Claude וחבריהם) ישירות על המחשב שלך. אין צורך בחיבור לאינטרנט, אין שליחת נתונים לחברות כמו OpenAI או Google, והכל קורה אצלך, בפרטיות מלאה. הפלטפורמה כתובה בשפת Go והיא יודעת להריץ עשרות מודלים מפורסמים כמו Gemma של Google, Llama של Meta, Qwen של Alibaba, ו-DeepSeek — כולם בחינם לחלוטין. אצלי (אלעד) Ollama משמשת בעיקר כרשת ביטחון: כשהמודלים בענן יקרים מדי או לא זמינים, הסוכנים שלי עוברים אוטומטית להשתמש במודל מקומי — וחוסכים המון כסף על משימות שגרתיות. אצלך זה יכול להיות הרבה יותר מכך: סביבת AI מלאה שפועלת גם בלי אינטרנט, פתרון עבור ארגונים עם דרישות פרטיות מחמירות (רפואה, משפט, ביטחון), או פשוט דרך להכיר את העולם של מודלי שפה פתוחים בלי לשלם דולר אחד.",
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
        "ספרייה עם מעל 50 מודלים מובילים: Gemma (של Google), Llama (של Meta), Qwen (של Alibaba), DeepSeek, Mistral ועוד — כולם בחינם מוחלט",
        "ממשק API זהה לחלוטין לזה של OpenAI — כך שכל תוכנה שכבר מדברת עם ChatGPT יכולה לדבר עם Ollama במקום זה, בהחלפת כתובת אחת",
        "רץ ברקע כשירות בסיס (port 11434), זמין לכל אפליקציה אחרת במחשב — לכן אפשר לחבר אותו בקלות לסוכנים, כלים, ואתרים שבניתם",
        "תומך ב-GPU אוטומטית — כרטיס NVIDIA, שבב Apple Silicon, או AMD יקפיץ את המהירות פי 5-10 לעומת CPU בלבד",
        "המודלים מגיעים בפורמט חסכוני (GGUF) שדוחס את המידע מבלי לפגוע משמעותית באיכות — כך שגם מחשב ביתי של 8GB RAM יכול להריץ מודל מכובד",
      ],
      tips: [
        "התחילו מ-Gemma 3 בגודל 2B: ברירת מחדל מצוינת שרצה יפה גם על MacBook Air רגיל. איכות סבירה, מהירה, ודורשת רק 2GB זיכרון.",
        "אם יש לכם GPU חזק (16GB VRAM ומעלה) — נסו את Qwen 2.5 14B. האיכות שלו כבר קרובה לזו של ChatGPT-3.5 של פעם.",
        "לעבודה על קוד — qwen3-coder או deepseek-coder עדיפים משמעותית על Llama הכללי. הם אומנו על מיליוני שורות קוד אמיתיות.",
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
        "Ollama נתמך בכל פלטפורמה. ההמלצה: native ב-Mac/Linux (GPU ישר); Docker רק אם חייבים isolation או multi-tenant.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "beginner",
      beginner:
        "ב-Mac Silicon ו-Linux עם GPU זה פשוט: install script אחד. ב-Windows צריך Ollama Desktop או WSL2. עבור שרתי production — Docker עם GPU runtime.",
      content: [
        "Mac: curl | sh או Ollama.app מ-ollama.com (Menu Bar integration)",
        "Linux: curl | sh יוצר systemd service אוטומטי שרץ ברקע",
        "Windows: Ollama Desktop (preview) או WSL2 עם nvidia-container-toolkit",
        "Docker: ollama/ollama:latest עם --gpus=all (NVIDIA) או בלי (CPU)",
        "SSD חשוב: המודלים נטענים לזיכרון מהדיסק. NVMe מוריד latency ראשון ב-50%",
        "RAM: מינימום גודל מודל × 1.2. Gemma 2B = 3GB RAM, Qwen 14B = 20GB",
      ],
      tips: [
        "תגדירו OLLAMA_MODELS=/path/to/big/disk — המודלים יכולים להיות 50GB+",
        "ב-Linux systemd: sudo systemctl edit ollama כדי להוסיף env vars",
        "ב-Docker: mount volume ל-/root/.ollama כדי לשמור מודלים בין restarts",
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
        "יש מאות מודלים. בפועל, 5-7 מספיקים לכל use case. הנה המדריך המעשי לבחירה לפי משימה וחומרה.",
      color: "from-amber-600 to-orange-500",
      difficulty: "intermediate",
      beginner:
        "חשבו בשני מימדים: (1) כמה RAM/VRAM יש לכם? (2) מה המשימה — שיחה/קוד/classification/embedding? מצטלבים — ויש לכם המלצה.",
      content: [
        "כללי (chat, summarization, translation): gemma3:2b (קטן, מהיר) / qwen2.5:7b (איזון) / llama3.3:70b (איכות גבוהה, דורש 48GB+)",
        "קוד (code gen, review): qwen3-coder:7b, deepseek-coder-v2:16b, codellama:34b-instruct",
        "Classification + structured output: gemma3:2b עם JSON mode (מהיר, עקבי)",
        "Embeddings: nomic-embed-text:v1.5 (768 מימד, פתוח, דומה ל-OpenAI small)",
        "Hebrew: Qwen2.5 עובד הכי טוב בעברית מבין ה-local models. Gemma סביר. Llama חלש יחסית.",
        "Vision: llava:7b או moondream:2b — OCR + description של תמונות",
      ],
      tips: [
        "Q4_K_M quantization = ברירת מחדל טובה. Q8 יותר איכותי אבל דורש פי 2 זיכרון",
        "הבדל בין llama3.3:latest ל-llama3.3:70b-instruct-q4_0 הוא ~5% איכות, פי 4 בזיכרון",
        "לפני שמורידים מודל 30GB+: בדקו ollama.com/library/MODEL — יש ביחדים (performance vs quality)",
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
        "ברירת מחדל: port 11434. API תומך ב-/api/generate, /api/chat, /api/embeddings, ו-/v1/chat/completions (OpenAI-compatible).",
      color: "from-purple-600 to-violet-500",
      difficulty: "intermediate",
      content: [
        "streaming: הוסיפו 'stream': true ל-payload. token-by-token generation",
        "OpenAI drop-in: שינוי base URL ל-http://localhost:11434/v1 + דמי API key — עובד עם LangChain, LlamaIndex, Vercel AI SDK, וכל client",
        "context management: לא שמור אוטומטית. יש לשלוח את ה-messages array שלם כל פעם",
        "system prompt: messages: [{role: 'system', content: '...'}, {role: 'user', ...}]",
        "temperature, top_p, num_ctx — ב-options. מותאם לכל request",
        "function calling: qwen2.5 ו-llama3.1+ תומכים. פחות יציב מ-GPT-4 אבל עובד",
      ],
      tips: [
        "תמיד תגדירו num_ctx מראש — ברירת מחדל היא 2048, קטן מדי",
        "keep_alive: '5m' בתוך options שומר את המודל בזיכרון בין בקשות — חוסך 2-3 שניות load",
        "למשימות מובנות: responses: 'json' — force JSON output מ-Gemma3",
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
        "הביצועים תלויים ב-3 גורמים: גודל מודל, chipset (CPU/GPU), ו-quantization. הנה הערכים הטיפוסיים ב-2026.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "advanced",
      content: [
        "MacBook M3 Pro (36GB) + gemma3:2b = ~50 tokens/sec. Qwen2.5:7b = ~20. Llama3.3:70b-q4 = ~4",
        "NVIDIA 4090 (24GB VRAM) + Qwen2.5:14b = ~60 tokens/sec. 32GB VRAM נחוץ ל-70B",
        "CPU-only (Intel i7) + gemma3:2b = ~10 tokens/sec. 7B models = ~3. לא מעשי ל-chat חי.",
        "זמן first-token: תלוי ב-model load. keep_alive='10m' מונע reload",
        "concurrency: Ollama מריץ batch מוגבל. ל-throughput גבוה — vLLM או TGI (מעל Ollama)",
        "flash attention: aktiviert אוטומטית עם GPU תומך. חוסך 30-40% זיכרון",
      ],
      tips: [
        "לפני production: Load test עם hey או bombardier — Ollama חונק בערך 2-4 בקשות מקבילות",
        "אם המודל מתחלק ל-CPU+GPU (hybrid) — יורד ב-60-80% ביצועים. Downgrade למודל קטן יותר",
        "השוו את הביצועים ב-llama-bench (נכלל ב-Ollama repo) — מדויק יותר מהרצה ידנית",
      ],
    },
    {
      id: "integration",
      icon: Brain,
      title: "אינטגרציה עם רשת הסוכנים",
      subtitle: "איך Ollama משתלב עם Kami, CrewAI, Delegator",
      description:
        "Ollama יכול להחליף כל LLM ברשת — דרך proxy עם OpenAI-compatible endpoint. טובים במיוחד ל-classification tasks בתוך Adopter ו-classification של intakes ב-Box.",
      color: "from-rose-600 to-pink-500",
      difficulty: "advanced",
      content: [
        "LangChain/LlamaIndex: OllamaLLM(model='qwen2.5', base_url='http://localhost:11434') — drop-in",
        "CrewAI: Agent(llm=LLM(model='ollama/qwen2.5:7b')) — תומך native",
        "Kami fallback: אם Claude נכשל (429/500), fallback ל-Ollama דרך try/catch",
        "Adopter classification: 500 הודעות/יום ל-Ollama במקום Gemini. חוסך quota",
        "Embeddings: nomic-embed-text ב-Ollama, ~150 tokens/sec, אלטרנטיבה ל-Gemini embedding (שחינמי אבל עם rate limit)",
        "cost tracker: סימון ב-/costs/llm שהקריאה היתה 'local' — חינם, סופרים רק זמן חשמל",
      ],
      tips: [
        "טסטו local עם הדאטה האמיתי שלכם. מודל שעובד על MT-Bench לא תמיד עובד בעברית",
        "hybrid: Claude ל-reasoning מורכב, Ollama ל-batch classification. הכי חסכוני",
        "לא לחשוף port 11434 לאינטרנט. זה API פתוח בלי auth. reverse proxy + token",
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
