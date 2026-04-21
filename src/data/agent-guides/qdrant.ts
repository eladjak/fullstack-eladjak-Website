import {
  Database,
  Search,
  Brain,
  Layers,
  Github,
  ExternalLink,
  BookOpen,
  Code2,
  Rocket,
  Lightbulb,
  Zap,
  Sparkles,
  Users,
  Mail,
  Cpu,
  Package,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const qdrantGuide: AgentGuideData = {
  slug: "qdrant",
  agentName: "Qdrant",
  agentNameHe: "Qdrant — זיכרון סמנטי לסוכנים",
  logoImage: "/images/guide-logos/qdrant-logo.png",
  tagline: "הבסיס לזכירה לפי משמעות, לא לפי מילים",
  heroDescription: "Qdrant הוא vector database בקוד פתוח, כתוב ב-Rust, רץ ב-Docker container עם HTTP + gRPC API. יכולות: אחסון embeddings (עד 65,536 מימדים), HNSW indexing, semantic search, filters מורכבים, payload arbitrary, sharding ו-replication. אצלי יש 10 collections ([kami_memory](/guide/kami), [box_coach](/guide/box), [network_memory](/guide/adopter) ועוד) עם אלפי וקטורים. אצלך Qdrant יכול לשמש memory ל-chatbot, semantic search על מאגר מסמכים, recommendation engine, או דה-דופליקציה סמנטית של תוכן — בכל מקום שצריך 'לזכור משמעות' ולא רק מילות מפתח.",
  badgeText: "2026 · Vector Memory · מדריך מעשי",
  canonical: "https://fullstack-eladjak.co.il/guide/qdrant",
  heroBgImage: "/images/guides/guide-qdrant-hero.jpg",
  stats: [
    { label: "collections אצלי", value: "10" },
    { label: "embeddings total", value: "10k+" },
    { label: "חיפוש", value: "<50ms" },
    { label: "עלות", value: "חינם" },
  ],
  paradigmTitle: "מאפסים את המשמעות של 'לזכור'",
  paradigmSub:
    "בסיס נתונים רגיל מחפש לפי מילים. Qdrant מחפש לפי רעיונות. זה ההבדל.",
  paradigmShifts: [
    {
      before: "SELECT * WHERE text LIKE '%diet%'",
      after: "SEARCH similar to 'בריאות תזונה' → מוצא גם אוכל-ספורט-מצב רוח",
      icon: Search,
    },
    {
      before: "מאות שורות כדי להבין 'מה המשתמש שאל'",
      after: "שאלה סמנטית, 5 תשובות רלוונטיות, 40ms",
      icon: Brain,
    },
    {
      before: "ChatGPT memory פשוט + מוגבל",
      after: "מליוני וקטורים, filtering, metadata — שלך",
      icon: Database,
    },
    {
      before: "Pinecone/Weaviate Cloud — $70+/חודש",
      after: "Qdrant docker מקומי — 0₪, 100k+ embeddings בקלות",
      icon: Package,
    },
  ],
  whoIsThisFor: [
    {
      title: "בונים סוכנים עם זיכרון",
      description:
        "Memory long-term, short-term, conversation history — הכל ב-Qdrant.",
      icon: Brain,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "חיפוש סמנטי במוצר שלכם",
      description:
        "FAQ, documentation search, product recommendations — Qdrant מחליף Elasticsearch ל-relevance.",
      icon: Search,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "מפתחי RAG",
      description:
        "Retrieval-Augmented Generation — הבסיס של chatbots עם knowledge base.",
      icon: Layers,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Data engineers",
      description:
        "Dedupe, clustering, anomaly detection — עם embeddings של ה-data.",
      icon: Code2,
      color: "from-pink-500 to-rose-500",
    },
  ],
  toc: [
    { id: "what-is", label: "מה זה" },
    { id: "embeddings", label: "Embeddings" },
    { id: "collections", label: "Collections" },
    { id: "search", label: "חיפוש" },
    { id: "real-use", label: "שימוש אמיתי" },
    { id: "advanced", label: "מתקדם" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Database,
      title: "מה זה Qdrant? בסיס נתונים שמבין משמעות",
      subtitle: "בקוד פתוח, כתוב ב-Rust, ומריץ חיפוש סמנטי מהיר יותר מכל מתחרה",
      description:
        "Qdrant הוא סוג של בסיס נתונים חדש יחסית שנקרא 'מסד וקטורי' (Vector Database). בניגוד ל-Postgres או MySQL שמחפשים התאמה מדויקת של מילים (למשל 'מצא לי את כל הלקוחות ששמם דוד'), Qdrant מחפש התאמה של *משמעות* — ולכן הוא הפך בשנים האחרונות לאחד הרכיבים החשובים בכל מערכת AI רצינית שצריכה 'לזכור' דברים. הוא נכתב בשפת Rust (אחת השפות המהירות ביותר בעולם התוכנה), והוא בקוד פתוח לחלוטין.",
      color: "from-red-600 to-rose-500",
      difficulty: "beginner",
      beginner:
        "תחשבו על זה ככה: בספרייה רגילה, כדי למצוא ספר צריך לדעת את השם המדויק או את שם הסופר. במסד וקטורי כמו Qdrant — אפשר לבוא ולהגיד 'אני מחפש משהו על בישול צמחוני עם טעם ים-תיכוני' — והוא ימצא לכם ספרים רלוונטיים, גם אם המילים שהוא יחזיר עם השם אף פעם לא הופיעו בשאילתה שלכם. זו בדיוק היכולת שמאפשרת לסוכני AI כמו [Kami](/guide/kami) ו-[Box](/guide/box) 'לזכור' את השיחות שלכם איתם לפי מה שנאמר, ולא לפי המילים המדויקות.",
      content: [
        "בסיס נתונים וקטורי: מאחסן 'נקודות' במרחב רב-מימדי (בדרך כלל 768 או 1536 מימדים). כל נקודה מייצגת משפט, תמונה, קטע קוד — כל מה שאפשר להמיר ל-embedding",
        "חיפוש שכנים קרובים ביותר (Nearest Neighbors) — אלגוריתם בשם HNSW שמוצא את 10 הנקודות הכי דומות למשהו שחיפשתם, גם אם יש מיליוני נקודות במאגר, תוך פחות מ-50 מילישניות",
        "סינון חכם: אפשר לשלב חיפוש וקטורי עם סינון רגיל (למשל 'מצא לי שיחות דומות, אבל רק מהחודש האחרון, ורק של משתמש ספציפי') — הרכב מנצח שמעט מתחרים נותנים",
        "Payload גמיש: לצד כל וקטור אפשר לשמור JSON חופשי עם metadata — מזהה משתמש, תאריך, תגיות, או כל שדה אחר שתרצו לסנן לפיו",
        "Collections מרובים: ארגון לפי נושא או שימוש (אצלי יש collection נפרד לכל סוכן — kami_memory, box_coach, network_memory ועוד). כל collection יכול להשתמש ב-embedding model שונה",
        "פריסה פשוטה: image רשמי של Docker במשקל 150MB, רץ בנוחות גם על VPS של 256MB זיכרון, ומגיע עם ממשק ויזואלי יפה לחקר הנתונים בכתובת localhost:6333/dashboard",
      ],
      tips: [
        "התקנה ב-docker-compose — ראו את [המדריך ל-Docker](/guide/docker) לפרטים על networks, volumes ואיך להגדיר את זה להיות persistent",
        "אם אתם משתמשים ב-[CrewAI](/guide/crewai) או בסוכן שלכם עם [Claude](/claude-code) — חיבור ל-Qdrant דרך LangChain או הקוד הישיר הוא פקודה אחת; הספרייה (qdrant-client) ב-Python מעולה",
      ],
      codeExample: {
        label: "התקנה מיידית ב-30 שניות",
        code: "docker run -d -p 6333:6333 -p 6334:6334 \\\n  -v $(pwd)/qdrant_storage:/qdrant/storage \\\n  qdrant/qdrant\n\n# עכשיו יש לכם UI ב-http://localhost:6333/dashboard\n# ו-REST API ב-http://localhost:6333",
      },
    },
    {
      id: "embeddings",
      icon: Cpu,
      title: "Embeddings — איך טקסט נהפך למספרים",
      subtitle: "משפט → 768 מספרים → מיקום בחלל",
      description:
        "לפני ש-Qdrant עוזר, צריך להמיר טקסט לוקטור. שירותים שעושים את זה: Gemini, OpenAI, Voyage, Cohere.",
      color: "from-violet-600 to-purple-500",
      difficulty: "intermediate",
      beginner:
        "כל משפט מקבל 'טביעת אצבע מספרית' (768 או 1536 מספרים). משפטים דומים מקבלים טביעות דומות. Qdrant יודע למצוא אילו טביעות דומות.",
      content: [
        "gemini-embedding-001 — חינמי, 768 מימדים, טוב בעברית",
        "OpenAI text-embedding-3-small — $0.02/1M tokens, 1536 מימדים",
        "Voyage voyage-3 — הכי איכותי ב-English, יקר יותר",
        "Cohere embed-multilingual-v3 — מעולה ל-100+ שפות",
        "כל שירות מחזיר array של floats — זה ה-vector",
        "חשוב: אי אפשר לחפש between collections עם מימדים שונים",
      ],
      tips: [
        "לעברית — gemini-embedding-001 עם outputDimensionality=768 מספק תוצאות מצוינות בחינם",
        "אל תחליפו embedding model ב-collection קיים — חייב re-index מאפס",
      ],
      codeExample: {
        label: "יצירת embedding",
        code: "import requests\n\nresp = requests.post(\n    f'https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key={KEY}',\n    json={'content': {'parts': [{'text': 'אכלתי סלט יווני'}]}, 'outputDimensionality': 768}\n)\nembedding = resp.json()['embedding']['values']  # list of 768 floats",
      },
    },
    {
      id: "collections",
      icon: Layers,
      title: "Collections — המבנה של הנתונים",
      subtitle: "כל collection = 'table' עם מימד קבוע",
      description:
        "ב-Qdrant אוסף נקודות באותו vector space נקרא collection. כל נקודה — id + vector + payload.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "intermediate",
      content: [
        "Collection = table equivalent — שם + vector size + distance metric",
        "Point = row equivalent — id + vector + payload (JSON)",
        "Distance: Cosine (מומלץ לטקסט) / Euclid / Dot",
        "Indexing: HNSW אוטומטי — quick approximate search",
        "אצלי: kami_memory (1000 הודעות וואטסאפ), kaylee_memory, agents_registry, healing_history, network_memory, telegram_news + 4 אחרים",
        "כל collection מוגדר פעם אחת דרך PUT /collections/<name>",
      ],
      codeExample: {
        label: "יצירת collection",
        code: "PUT /collections/kami_memory\n{\n  \"vectors\": {\n    \"size\": 768,\n    \"distance\": \"Cosine\"\n  }\n}",
      },
    },
    {
      id: "search",
      icon: Search,
      title: "חיפוש סמנטי — הכוח של Qdrant",
      subtitle: "k-NN עם filtering — פשוט ומהיר",
      description:
        "מקבלים vector של query, מחזירים top-k nearest neighbors עם optional filters.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "intermediate",
      content: [
        "POST /collections/X/points/search",
        "Body: {vector: [...], limit: 10, filter: {...}, with_payload: true}",
        "filter syntax: must / should / must_not — כמו Mongo",
        "Score: 0-1 (Cosine) — 1.0 = identical, 0.5 = unrelated",
        "מומלץ threshold ≥ 0.7 בשימוש ב-RAG — מתחת זה רעש",
        "batch search: מכמה queries יחד לחיפושים מרובים",
      ],
      codeExample: {
        label: "חיפוש עם filter",
        code: 'POST /collections/kami_memory/points/search\n{\n  "vector": [0.12, -0.03, 0.87, ...],  // 768 floats\n  "limit": 10,\n  "with_payload": true,\n  "filter": {\n    "must": [\n      {"key": "year", "match": {"value": 2026}}\n    ]\n  }\n}',
      },
    },
    {
      id: "real-use",
      icon: Sparkles,
      title: "5 שימושים אמיתיים ברשת שלי",
      subtitle: "מה באמת משמר ב-Qdrant",
      description:
        "לא רק תיאוריה — אלה 5 use cases שאני מריץ כל יום.",
      color: "from-amber-600 to-orange-500",
      difficulty: "advanced",
      content: [
        "kami_memory — שיחות וואטסאפ אחרונות. Kami מחפש רלוונטיות לפני תשובה",
        "agents_registry — מי-עושה-מה ברשת. 'מה Hermes עושה?' → תיאור ברור",
        "agent_status — heartbeat; כל 5 דק' מתעדכן. 'איזה שירותים בריאים?' → מיידי",
        "healing_history — מה עבד על מה (Hermes). 'container X נפל — מה תקנתי פעם?' → נסיון הראשון",
        "network_memory — דברים שסוכנים רוצים לשתף. מה CrewAI יצר, מה Adopter מצא",
        "telegram_news — מאמרים/כלים מערוצי טלגרם. Adopter מחפש דמיון למנוע כפילות",
      ],
    },
    {
      id: "advanced",
      icon: Lightbulb,
      title: "טיפים מתקדמים",
      subtitle: "מה שלמדתי בשנה עם Qdrant",
      description:
        "הניואנסים שעושים את ההבדל בין מאגר מגמגם למאגר שחי.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      content: [
        "Payload indexing — על fields שמסננים לפיהם הרבה (למשל 'year') — מאיץ filter",
        "Snapshot backup — GET /collections/X/snapshots — backup מלא של collection",
        "Sparse vectors — מלבד dense (embeddings) אפשר גם sparse (BM25-style) לחיפוש היברידי",
        "Quantization — scalar quantization מקטין אחסון פי 4 עם פגיעה מינורית באיכות",
        "Replication — Qdrant תומך ב-cluster mode עם sharding (לא אצלי, אבל נתמך)",
        "Metrics — GET /metrics (Prometheus format) — מציג latency, queue sizes",
      ],
      tips: [
        "אל תשמרו את ה-text המקורי רק ב-payload — תקראו לו דרך ID מ-DB אחר. Payload גדול מאט",
        "אבטחה: Qdrant דרוש API key ברוב הגרסאות החדשות. אל תחשפו port 6333 לאינטרנט",
      ],
    },
  ],
  resources: [
    {
      title: "Qdrant Docs",
      description: "תיעוד רשמי — ברור ומקיף",
      href: "https://qdrant.tech/documentation",
      icon: ExternalLink,
    },
    {
      title: "Qdrant GitHub",
      description: "קוד פתוח ב-Rust, 20k+ stars",
      href: "https://github.com/qdrant/qdrant",
      icon: Github,
    },
    {
      title: "Gemini Embeddings",
      description: "Embedding model חינמי — טוב בעברית",
      href: "https://ai.google.dev/gemini-api/docs/embeddings",
      icon: ExternalLink,
    },
    {
      title: "המדריך ל-Kami",
      description: "איך Kami משתמש ב-Qdrant לזיכרון",
      href: "/guide/kami",
      icon: BookOpen,
    },
    {
      title: "המדריך ל-Hermes",
      description: "healing_history collection בפעולה",
      href: "/guide/hermes",
      icon: BookOpen,
    },
    {
      title: "שיחת ייעוץ",
      description: "רוצה RAG במוצר שלך?",
      href: "/contact",
      icon: Mail,
    },
  ],
  ctaTitle: "Memory של הסוכנים שלך זה ההבדל",
  ctaSub:
    "Qdrant בחינם, 30 שניות להתקנה, והתחלתם לזכור משמעות.",
  primaryCta: {
    label: "התקנת Qdrant",
    href: "https://qdrant.tech/documentation/guides/installation",
    icon: Package,
  },
  secondaryCta: {
    label: "שיחת ייעוץ",
    href: "/contact",
    icon: Users,
  },
  authorBio:
    "Qdrant הוא ה-vector database שבו משתמשים כל הסוכנים ברשת לזיכרון סמנטי. 10 collections בייצור, אלפי וקטורים, עלות אפסית. המדריך מציג את הדפוסים המוצלחים: איך לבחור dimensions, מתי לעשות re-index, איך לנהל payload, ואיך להשתלב עם embedding models קוד-פתוחים — כדי שתוכלו לבנות זיכרון סמנטי לסוכן משלכם בשעה אחת.",
};
