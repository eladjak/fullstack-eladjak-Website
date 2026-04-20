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
  agentNameHe: "זיכרון סמנטי לסוכנים",
  tagline: "הבסיס לזכירה לפי משמעות, לא לפי מילים",
  heroDescription: "Postgres שומר עובדות. Redis שומר cache. בסיס נתונים וקטורי שומר משמעות. זה מה שמאפשר לסוכן AI לזכור שיחות מלפני שבוע, למצוא תשובה דומה מבלי לחפש במילים המדויקות, ולסנן כפילויות באופן חכם. Qdrant הוא הבסיס הפתוח והמהיר שאני משתמש בו.",
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
      title: "מה זה Qdrant?",
      subtitle: "Vector database — OSS, Rust, מהיר",
      description:
        "Qdrant זה בסיס נתונים שמתמחה באחסון וחיפוש של וקטורים — מספרים שמייצגים משמעות. כתוב ב-Rust, מהיר, פתוח.",
      color: "from-red-600 to-rose-500",
      difficulty: "beginner",
      beginner:
        "תחשבו על זה ככה: במקום לחפש 'טקסט מכיל את המילה X', Qdrant מחפש 'מה דומה למשמעות של הטקסט הזה'. זה מה שמאפשר ל-AI לזכור דברים לפי הרעיון, לא לפי המילה הספציפית.",
      content: [
        "Vector database — מאחסן נקודות ב-n-dimensional space",
        "חיפוש nearest neighbors — הכי מהיר בקטגוריה (HNSW index)",
        "Filtering — אפשר לשלב with vector search (למשל 'רק מ-2025')",
        "Payload — כל point נושא metadata חופשי (JSON)",
        "Collections — כמו tables; כל אחד עם מימד embedding שונה",
        "Docker image רשמי, 150MB, רץ על 256MB RAM בקלות",
      ],
      codeExample: {
        label: "התקנה ב-30 שניות",
        code: "docker run -d -p 6333:6333 -p 6334:6334 \\\n  -v $(pwd)/qdrant_storage:/qdrant/storage \\\n  qdrant/qdrant",
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
    "אני משתמש ב-Qdrant כבר 8 חודשים — 10 collections בייצור, 10k+ embeddings, אפס תקלות. הכי מדהים אותי: העלות האפסית. המדריך מבוסס על שימוש רציף — כולל בעיה שעלתה כשהחלפתי embedding model וצריך היה re-index מאפס.",
};
