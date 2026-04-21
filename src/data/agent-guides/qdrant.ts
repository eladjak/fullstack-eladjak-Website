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
  heroDescription: "Qdrant זה סוג של בסיס נתונים חדש יחסית שמכונה 'בסיס נתונים וקטורי' — כזה שיודע לזכור לפי משמעות ולא לפי מילים. בניגוד לבסיסי נתונים מסורתיים (כמו Postgres או MySQL) שמחפשים התאמה מדויקת של טקסט — 'תמצא לי את כל הלקוחות ששמם דוד' — Qdrant יכול לחפש רעיונות: 'תמצא לי שיחות דומות לזו, גם אם השתמשו במילים אחרות'. זו היכולת שמאפשרת למערכות AI מודרניות (ChatGPT, [Claude](/claude-code), Perplexity) לזכור את השיחות הקודמות שלכם ולהחזיר תשובה רלוונטית, גם כשהניסוח שונה לחלוטין. Qdrant בקוד פתוח לחלוטין (גרסה 1.14+ נכון לסוף 2025), נכתב בשפת Rust (אחת השפות המהירות בעולם התוכנה), ורץ כשירות רקע על השרת בשתי יציאות רשת — 6333 ל-HTTP ו-6334 ל-gRPC — בדיוק כמו מסד נתונים רגיל, רק שבמקום טבלאות הוא מאחסן 'טביעות אצבע מתמטיות' של משפטים (embeddings) עם תמיכה של עד 4096 מימדים לוקטור דחוס, וגם וקטורים דלילים (sparse) לחיפוש היברידי. אצלי (אלעד) Qdrant הוא הלב של כל רשת הסוכנים: הוא מחזיק את הזיכרון של [Kami](/guide/kami) בוואטסאפ, את היומן של [Box](/guide/box), ואת המאגר של [Adopter](/guide/adopter). אצלכם Qdrant יכול להיות הבסיס של צ'אטבוט שזוכר לקוחות, של חיפוש חכם באתר, של מערכת המלצות, או של כל מקום שצריך 'לזכור לפי רעיון ולא לפי מילה'.",
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
      before: "Pinecone serverless כ-$70+/חודש ל-workload דומה (Weaviate Cloud דומה)",
      after: "Qdrant docker מקומי — 0₪, 100k+ embeddings בקלות (או Qdrant Cloud free tier 1GB / כ-$0.04 לשעה ב-cluster הקטן)",
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
        "Embedding זו טביעת אצבע מספרית של משפט, של פסקה או אפילו של תמונה — סדרה של מאות מספרים (בדרך כלל 768 או 1536) שמייצגים את ה*משמעות* של התוכן בתוך 'מפה של משמעויות'. לפני ש-[Qdrant](/guide/qdrant) יכול לעזור לנו למצוא משהו, צריך להפוך את הטקסט ל-embedding כזה, והעבודה הזו נעשית על ידי מודלים ייעודיים (כמו gemini-embedding-001 של גוגל, או text-embedding-3 של OpenAI). אצלי (אלעד) כל שיחה שנכנסת ל-[Kami](/guide/kami) עוברת קודם דרך Gemini שממיר אותה לטביעת אצבע כזו, ורק אחר כך היא נשמרת ב-Qdrant.",
      color: "from-violet-600 to-purple-500",
      difficulty: "intermediate",
      beginner:
        "דמיינו שלכל משפט בעולם יש קואורדינטה ייחודית על 'מפה' תלת-ממדית (או במקרה שלנו, 768-ממדית). משפטים עם משמעות דומה — 'אכלתי סלט' ו-'הכנתי צהריים בריא' — יקבלו קואורדינטות קרובות אחת לשנייה על המפה הזו. משפטים רחוקים במשמעות — 'אכלתי סלט' ו-'תיקנתי את המכונית' — יקבלו קואורדינטות רחוקות. זה כל הקסם: כשאתם מחפשים משהו, אתם בעצם שואלים 'איזה קואורדינטות במפה הכי קרובות לשלי?'",
      content: [
        "gemini-embedding-001 של גוגל — חינמי לחלוטין, מחזיר וקטור של 768 מספרים, ועובד יוצא מהכלל גם בעברית (זו הבחירה שלי אצלי)",
        "OpenAI text-embedding-3-small — עולה בערך $0.02 למיליון טוקנים, 1536 מימדים (מתאים אם אתם כבר משלמים ל-OpenAI). גרסה גדולה יותר text-embedding-3-large נותנת 3072 מימדים בתמורה יקרה יותר",
        "Voyage voyage-3 — 1024 מימדים, נחשב הכי איכותי לאנגלית בעולמות ה-RAG היום, אבל בתשלום",
        "nomic-embed-text-v1.5 — קוד פתוח, 768 מימדים, רץ מקומית דרך Ollama; Cohere embed-multilingual-v3 תומך בלמעלה מ-100 שפות כולל עברית ברמה טובה",
        "כל שירות מחזיר מערך של מספרים שברים (floats) — זה בדיוק הוקטור שנשמר ב-Qdrant לצד המטא-דאטה שלכם",
        "חשוב מאוד: אי אפשר לחפש חיפוש משותף בין collection אחד ל-collection אחר אם הם משתמשים במודלים שונים או במימד שונה (dimension) — המפה של כל מודל היא שפה שונה",
      ],
      tips: [
        "לעברית — gemini-embedding-001 עם הגדרת outputDimensionality=768 נותן תוצאות מדהימות בחינם, ואין סיבה להתחיל במשהו אחר אלא אם יש צורך ספציפי",
        "אל תחליפו אף פעם מודל embedding אחרי שיש לכם data ב-collection — תצטרכו לעשות re-indexing (בניית מחדש של כל הוקטורים מאפס), כי כל מודל מדבר 'שפה' אחרת של מספרים; ראו את [המדריך ל-Adopter](/guide/adopter) לדוגמה של ניהול embeddings במקום אחד",
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
        "Collection זה סוג של 'ספריית משמעויות' עצמאית בתוך Qdrant — אוסף של וקטורים שכולם חיים באותה מפה (כלומר, נוצרו על ידי אותו מודל embedding עם אותו מספר מימדים). כל נקודה בתוך ה-collection מורכבת מ-id (מזהה ייחודי), מה-vector עצמו (טביעת האצבע המספרית), ומ-payload (חבילת מטא-דאטה ב-JSON — למשל שם משתמש, תאריך, או תגיות לסינון). אצלי (אלעד) יש 10 collections כאלו ברשת — אחד לכל מטרה נפרדת.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "intermediate",
      beginner:
        "אפשר לחשוב על collection כמו על ארון ספרים: כל ארון מוקדש לנושא אחד (שיחות, מתכונים, סטטוסים של שירותים) וכל הספרים בו מסודרים לפי אותה שיטת מיון. שינוי השיטה באמצע מחייב להוציא את כל הספרים ולסדר מחדש (זה ה-re-indexing), אז חשוב לבחור נכון בהתחלה.",
      content: [
        "Collection הוא המקבילה של 'טבלה' בבסיס נתונים רגיל — מוגדר פעם אחת עם שם, גודל וקטור (dimension) וסוג מדד מרחק (distance metric)",
        "Point הוא המקבילה של 'שורה' בטבלה — מורכב מ-id (מזהה), vector (טביעת האצבע המספרית), ו-payload (JSON חופשי עם כל מטא-דאטה שתרצו)",
        "Distance metric (איך מודדים 'דומים'): Cosine similarity (זווית בין וקטורים — מומלץ לטקסט), Euclidean (מרחק ישר), או Dot product (מכפלה פנימית)",
        "Indexing: Qdrant משתמש באלגוריתם בשם HNSW (Hierarchical Navigable Small Worlds) שבונה אוטומטית מפה רב-שכבתית לחיפוש מהיר של שכנים קרובים, בלי צורך לעבור על כל הוקטורים",
        "אצלי ברשת: kami_memory (1000 הודעות וואטסאפ של [Kami](/guide/kami)), kaylee_memory (הזיכרון של [Kaylee](/guide/kaylee)), agents_registry (מי-עושה-מה), healing_history (מה ריפא [Hermes](/guide/hermes) בעבר), network_memory, telegram_news ועוד",
        "יצירת collection נעשית פעם אחת דרך קריאה אחת ל-API: PUT /collections/<name> עם הגדרת הוקטור — ומשם והלאה אפשר רק להוסיף או לחפש",
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
        "חיפוש סמנטי זו הדרך שבה Qdrant מוצא את הוקטורים הכי דומים במשמעות לשאילתה שלכם — התהליך הזה נקרא k-NN (k-Nearest Neighbors, כלומר 'k השכנים הכי קרובים'). ההיגיון פשוט: אתם שולחים וקטור של שאילתה (נוצר מאותו מודל embedding כמו ה-collection), ו-Qdrant מחזיר לכם את ה-top-k נקודות הכי קרובות אליו, עם אפשרות להוסיף filter — תנאי סינון רגיל על ה-payload, למשל 'רק מהחודש האחרון' או 'רק של משתמש ספציפי'. אצלי (אלעד) זה קורה אלפי פעמים ביום ברחבי רשת הסוכנים.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "intermediate",
      beginner:
        "זה קצת כמו משחק 'חם וקר': אתם אומרים ל-Qdrant 'אני מחפש משהו שמרגיש ככה' (הוקטור של השאלה), והוא אומר לכם 'הנה 10 הדברים שהכי דומים לזה במאגר שלך, עם ציון דמיון לכל אחד'. ציון של 1.0 = זהה לחלוטין, 0.7 = רלוונטי מאוד, 0.5 = כבר די לא קשור.",
      content: [
        "הנקודת כניסה לחיפוש: POST /collections/<name>/points/search — תמיד שליחה של הוקטור יחד עם פרמטרים",
        "ה-body כולל: vector (המערך עצמו), limit (כמה תוצאות להחזיר), filter (תנאי סינון אופציונלי), ו-with_payload (האם להחזיר את ה-JSON של המטא-דאטה)",
        "Filter syntax משתמש במבנה של must (חייב), should (עדיף), ו-must_not (אסור) — דומה מאוד ל-syntax של MongoDB למי שמכיר",
        "Score של דמיון מגיע בין 0 ל-1 בשיטת Cosine: 1.0 = משפטים זהים, 0.85 = מאוד קרובים, 0.5 = כבר לא קשורים במיוחד",
        "לשימוש ב-RAG (Retrieval-Augmented Generation — כש-[Claude](/claude-code) מקבל הקשר נוסף מהזיכרון לפני שהוא עונה), מומלץ לקבוע סף של 0.7 ומעלה — מתחת לזה תקבלו יותר רעש מאשר תשובות טובות",
        "Batch search מאפשר לשלוח כמה שאילתות בקריאה אחת — שימושי כשרוצים למצוא דמיון בין מספר משפטים במקביל (אצלי [Adopter](/guide/adopter) משתמש בזה למניעת כפילויות)",
      ],
      codeExample: {
        label: "חיפוש עם filter",
        code: 'POST /collections/kami_memory/points/search\n{\n  "vector": [0.12, -0.03, 0.87, ...],  // 768 floats\n  "limit": 10,\n  "with_payload": true,\n  "filter": {\n    "must": [\n      {"key": "year", "match": {"value": 2026}}\n    ]\n  }\n}',
      },
    },
    {
      id: "real-use",
      icon: Sparkles,
      title: "6 שימושים אמיתיים ברשת שלי",
      subtitle: "מה באמת משמר ב-Qdrant",
      description:
        "כדי שהמושגים ירגישו מוחשיים — הנה 6 use cases אמיתיים של collections שאני (אלעד) מריץ בייצור כל יום ברשת הסוכנים. כל אחד מהם פותר בעיה אחרת, וביחד הם מהווים את מערכת הזיכרון הארגונית של הרשת.",
      color: "from-amber-600 to-orange-500",
      difficulty: "advanced",
      content: [
        "kami_memory — שומר את ההודעות האחרונות של [Kami](/guide/kami) בוואטסאפ. לפני שהוא עונה לי על משהו, הוא מחפש בקולקשן הזה אם כבר דיברנו על משהו דומה, וככה השיחה זורמת ולא חוזרת על עצמה",
        "agents_registry — רישום חי של כל הסוכנים ברשת עם תיאור מה כל אחד עושה. כשאני שואל משהו כמו 'מה [Hermes](/guide/hermes) עושה?' מקבלים תיאור מלא בתוך פחות משנייה",
        "agent_status — heartbeat של כל השירותים, מתעדכן כל 5 דקות על ידי [Dashboard](/guide/dashboard). שאילתה סמנטית כמו 'איזה שירותים לא הגיבו היום?' מקבלת תשובה מיידית",
        "healing_history — ההיסטוריה של כל התיקונים האוטומטיים שעשה [Hermes](/guide/hermes). כשנופל container חדש, הוא שואל 'באיזה מצב דומה כבר הייתי בעבר, ומה תיקן אותו?' ומקבל רעיון ראשון מניסיון",
        "network_memory — זיכרון משותף שסוכנים כותבים אליו כשהם רוצים לשתף תובנה. מה [CrewAI](/guide/crewai) יצר אתמול, מה [Adopter](/guide/adopter) גילה — הכל נגיש לכולם",
        "telegram_news — מאמרים וכלי AI שנשלפים מערוצי טלגרם. [Adopter](/guide/adopter) משווה כל פריט חדש למה שכבר יש בקולקשן כדי למנוע כפילויות סמנטיות (גם אם הניסוח שונה)",
      ],
      tips: [
        "תתחילו מ-collection אחד קטן ופשוט (למשל שיחות או מסמכים) — אחרי שתבינו את הזרימה, תחלקו בהמשך לקולקשנים מיוחדים לפי נושא",
        "שמרו את ה-ID בתוך ה-payload זהה ל-ID של המקור בבסיס הנתונים הראשי שלכם (Postgres, [n8n](/guide/n8n) וכו') — ככה קל לחזור לנתון המלא בלי לשכפל אותו פעמיים",
      ],
    },
    {
      id: "advanced",
      icon: Lightbulb,
      title: "טיפים מתקדמים",
      subtitle: "מה שלמדתי בשנה עם Qdrant",
      description:
        "האזור הזה הוא הפרטים הקטנים שעושים את ההבדל בין 'יש לי Qdrant' ל-'Qdrant שלי עף, חוסך עלויות, ומחזיק שנים'. אלו הדברים שלמדתי (אלעד) בשנה של הרצה ב-production עם רשת סוכנים שלמה שנסמכת על הזיכרון הזה כל שנייה.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      content: [
        "Payload indexing — אם אתם מסננים הרבה לפי שדה מסוים ב-JSON (למשל 'year' או 'user_id'), תגדירו לו index ייעודי ב-Qdrant. זה מאיץ את ה-filter בפעמים-פעמים ונחסך זמן סריקה",
        "Snapshot backup — GET /collections/<name>/snapshots יוצר backup מלא ודחוס של collection בקובץ אחד. אצלי זה רץ על cron לילי דרך [Docker](/guide/docker) ומועלה לאחסון חיצוני",
        "Sparse vectors — בנוסף לוקטורים דחוסים (dense, זה ה-embeddings הרגיל) אפשר לשמור גם וקטורים דלילים (sparse, בסגנון BM25 — חיפוש לפי מילים ממש). שילוב של שניהם נותן hybrid search חזק במיוחד",
        "Quantization — טכניקה של דחיסת הוקטורים (scalar quantization) שמקטינה את השימוש בזיכרון פי 4 עם פגיעה מזערית באיכות התוצאות. קריטי כשיש לכם מיליוני וקטורים",
        "Replication ו-sharding — בגרסה החדשה Qdrant תומך במצב cluster עם שכפול ופיצול אוטומטי בין שרתים. אצלי זה עוד לא רץ כי שרת אחד מספיק, אבל זה שם לכשיגדל",
        "Metrics — GET /metrics מחזיר את המטריקות בפורמט Prometheus (latency של חיפושים, גדלי תורים, זיכרון). קל לחבר ל-Grafana או ל-[Dashboard](/guide/dashboard) ולצפות בביצועים בזמן אמת",
      ],
      tips: [
        "אל תשמרו את הטקסט המקורי השלם בתוך ה-payload אם הוא ארוך — שמרו רק ID שמצביע על הנתון המלא במסד נתונים אחר (Postgres, קובץ). Payload גדול עוקץ את מהירות החיפוש",
        "אבטחה קריטית: החל מגרסאות אחרונות, Qdrant דורש API key כברירת מחדל. אף פעם אל תחשפו את port 6333 לאינטרנט הפתוח בלי API key ובלי חומת אש — זה המקבילה של להשאיר את ה-Postgres שלכם עירום ברשת",
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
