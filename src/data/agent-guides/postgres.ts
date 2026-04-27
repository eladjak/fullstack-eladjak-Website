import {
  Database,
  Table,
  Shield,
  GitBranch,
  Layers,
  Terminal,
  Github,
  ExternalLink,
  BookOpen,
  Rocket,
  Users,
  Mail,
  HardDrive,
  Activity,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const postgresGuide: AgentGuideData = {
  slug: "postgres",
  agentName: "PostgreSQL",
  agentNameHe: "PostgreSQL — בסיס הנתונים שתבחרו לאורך הקריירה",
  category: "infra",
  brandIconSlug: "postgresql",
  brandIconColor: "4169E1",
  heroBgImage: "/images/guides/guide-postgres-hero.jpg",
  tagline: "בסיס הנתונים הרלציוני שמחזיק את ה-state של רשת הסוכנים בייצור",
  heroDescription:
    "PostgreSQL (קוראים לו בקיצור Postgres) הוא בסיס הנתונים הרלציוני בקוד פתוח הכי מבוגר, הכי יציב, והכי 'משעמם' בטוב — וזו בדיוק הסיבה שהוא הבחירה הנכונה כמעט לכל פרויקט שדורש לזכור דברים בייצור. בניגוד ל-SQLite (שמושלם לפיתוח ולכלים מקומיים — קובץ אחד על הדיסק), Postgres רץ כשירות נפרד שיודע לטפל בעשרות חיבורים מקבילים, בעסקאות מורכבות, ובכמויות נתונים גדולות בלי להזיע. אצלי (אלעד) על Hetzner VPS Postgres מחזיק את ה-state של הסוכנים: מי דיבר עם מי, אילו פעולות הוחלט עליהן, מה סטטוס המשימות, ומי שילם איזה תשלום. ב-2026 Postgres הוא לא רק 'בסיס נתונים' — עם הרחבות כמו pgvector (חיפוש סמנטי, אלטרנטיבה ל-[Qdrant](/guide/qdrant) בעומסים קטנים), TimescaleDB (סדרות זמן), ו-PostGIS (מפות וגיאוגרפיה), הוא הופך לפלטפורמה שלמה. כשאתם בונים מוצר חדש, ההמלצה שלי פשוטה: התחילו עם SQLite, ופצלו ל-Postgres ברגע שיש משתמש שני. גם אם בסוף תעברו ל-DynamoDB או Firebase, השנים שתשקיעו בלימוד Postgres ישתלמו לכם בכל פרויקט שתעבדו עליו.",
  badgeText: "2026 · Relational DB · מדריך מעשי",
  canonical: "https://fullstack-eladjak.co.il/guide/postgres",
  stats: [
    { label: "גרסה", value: "16+" },
    { label: "שורות בייצור אצלי", value: "2M+" },
    { label: "uptime", value: "99.9%" },
    { label: "עלות", value: "חינם" },
  ],
  paradigmTitle: "למה Postgres ולא SQLite/MongoDB/Firebase",
  paradigmSub:
    "SQLite מצוין לפיתוח. Postgres מצוין לייצור. ההבדל ביניהם זה לא מהירות — זה תזמון.",
  paradigmShifts: [
    {
      before: "MongoDB כי 'JSON זה גמיש'",
      after: "Postgres עם עמודת JSONB. גמישות + עסקאות + JOIN.",
      icon: Layers,
    },
    {
      before: "Firebase כי 'מהיר להתחיל'",
      after: "Postgres עם pgrest/Supabase. אותה מהירות, בלי vendor lock.",
      icon: GitBranch,
    },
    {
      before: "SQLite גם בייצור — 'לא צריך יותר'",
      after: "Postgres ברגע שיש משתמש שני שכותב במקביל.",
      icon: Database,
    },
    {
      before: "DynamoDB כי 'AWS אמרו'",
      after: "Postgres עם read-replicas. עולה פחות, יותר מבוקר.",
      icon: Shield,
    },
  ],
  whoIsThisFor: [
    {
      title: "מפתחים שעובדים עם דאטה אמיתי",
      description:
        "כל פרויקט שיש לו משתמשים, פעולות, ודיווחים. Postgres נותן לכם SQL חזק, עסקאות אטומיות, וביצועים שלא ייגמרו לכם מהר.",
      icon: Rocket,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "צוותי data שצריכים אנליטיקה",
      description:
        "Materialized views, window functions, CTE-ים מקוננים. Postgres הוא DB וגם כלי BI מובנה.",
      icon: Activity,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "מי שבונה רשת סוכנים",
      description:
        "state של agents, log של פעולות, היסטוריית שיחות. Postgres + JSONB + pgvector = פתרון אחד לכל זה.",
      icon: Users,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "מי שמתעב vendor lock",
      description:
        "Postgres רץ בכל מקום: Hetzner, AWS, GCP, Mac, Windows. אם אי פעם תרצו לעבור — תעבירו dump ב-pg_dump.",
      icon: HardDrive,
      color: "from-orange-500 to-amber-500",
    },
  ],
  toc: [
    { id: "what-is", label: "מה זה" },
    { id: "install", label: "התקנה" },
    { id: "schema", label: "סכמה ו-types" },
    { id: "extensions", label: "הרחבות" },
    { id: "production", label: "production" },
    { id: "backup", label: "גיבוי" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Database,
      title: "מה זה Postgres? למה זה לא MySQL",
      subtitle: "בסיס נתונים רלציוני (relational) לרציני שעבד טוב 30 שנה",
      description:
        "Postgres זה בסיס נתונים רלציוני — כלומר הוא שומר נתונים בטבלאות שיש להן קשרים (relations) זו לזו, ואפשר לחבר ביניהן בשאילתות (JOIN). זה הסטנדרט מאז שנות ה-70 ועד היום, כי הרעיון פשוט וחזק: כל ישות במערכת (משתמש, הזמנה, מוצר) מקבלת טבלה משלה, ובמקום לשכפל מידע אתם פשוט מצביעים מטבלה אחת על השנייה. Postgres נבדל מ-MySQL בכמה דברים שחשובים בייצור: הוא תומך ב-JSONB (אינדקס מהיר על שדות JSON), בעמודות מערך, בעסקאות DDL (אפילו שינוי סכמה זה אטומי — אם נכשל באמצע, הכל מתבטל), ובסטנדרט SQL הרבה יותר קפדני מ-MySQL.",
      color: "from-blue-600 to-cyan-500",
      difficulty: "beginner",
      beginner:
        "תחשבו על Postgres כמו על Excel חכם מאוד שיודע להחזיק מיליוני שורות, להגיב על מאות שאלות בשנייה, ולוודא שאם אתם עושים פעולה מורכבת (להוריד כסף מחשבון אחד ולהעלות לשני) — או שהכל קורה, או ששום דבר לא קורה. אין מצב באמצע. זו תכונה שנקראת ACID, וזו הסיבה שבנקים, חברות ביטוח, ואני (אלעד) — כולם משתמשים בו.",
      content: [
        "טבלאות (tables) — הבסיס. כל טבלה היא רשימה של שורות עם עמודות מוגדרות מראש. דומה ל-Excel, אבל עם types חזקים (text, int, timestamp, jsonb)",
        "מפתח ראשי (primary key) — עמודה שמזהה כל שורה באופן ייחודי. לרוב משתמשים ב-`uuid` או `bigserial` (ספרור אוטומטי)",
        "מפתחות זרים (foreign keys) — הקשר בין טבלאות. אם בטבלת orders יש עמודת user_id, היא יכולה להצביע על id ב-users — וPostgres יוודא שלא יהיה order ללא user מתאים",
        "אינדקסים (indexes) — מבני נתונים שמאיצים שאילתות. בלי index, חיפוש על מיליון שורות לוקח שנייה שלמה; עם index, מילישנייה. לעמודות שמשתמשים בהן ב-WHERE — תמיד index",
        "עסקאות (transactions) — קבוצה של פעולות שמתבצעות יחד. `BEGIN ... COMMIT` או `ROLLBACK` — או הכל קורה, או שום דבר לא",
        "JSONB — סוג נתונים שמאחסן JSON בפורמט בינארי דחוס. תומך באינדקס מלא על שדות פנימיים, מאפשר שאילתות כמו `WHERE data->>'status' = 'active'`",
      ],
      tips: [
        "אם אתם באים מ-MongoDB — נסו JSONB לפני שאתם נשבעים נצח לאוסף document. תקבלו את הגמישות + JOIN + עסקאות",
        "אל תפחדו מ-SQL. הוא ישנו 50 שנה והוא לא הולך לשום מקום. ORM-ים באים והולכים, SQL נשאר",
      ],
      codeExample: {
        label: "טבלה בסיסית עם foreign key ו-JSONB",
        code: "CREATE TABLE users (\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\n  email text UNIQUE NOT NULL,\n  created_at timestamptz DEFAULT now()\n);\n\nCREATE TABLE agent_messages (\n  id bigserial PRIMARY KEY,\n  user_id uuid REFERENCES users(id) ON DELETE CASCADE,\n  agent_name text NOT NULL,\n  payload jsonb NOT NULL,\n  created_at timestamptz DEFAULT now()\n);\n\nCREATE INDEX idx_messages_user ON agent_messages(user_id, created_at DESC);\nCREATE INDEX idx_messages_payload ON agent_messages USING GIN (payload);",
      },
    },
    {
      id: "install",
      icon: Terminal,
      title: "התקנה: docker-compose ו-managed services",
      subtitle: "שלוש דרכים להרים Postgres — בחרו לפי השלב",
      description:
        "התקנת Postgres יכולה להיות מסובכת אם הולכים בדרך הישנה (apt-get + הגדרות ידניות + permissions). הדרך המודרנית: docker-compose בפיתוח, וב-production או אותו docker או שירות מנוהל (Supabase, Neon, או RDS) שמטפל בגיבויים, רפליקציה ועדכוני אבטחה בשבילכם. אצלי (אלעד) Postgres רץ כקונטיינר ב-docker-compose על אותו שרת עם שאר הסוכנים, כי הנפח קטן והעלות אפסית.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "beginner",
      content: [
        "Docker (פיתוח + ייצור קטן) — השיטה הכי פשוטה. שורת compose אחת ויש לכם DB. גיבוי = העתקת volume. שדרוג = החלפת tag",
        "Homebrew/apt (פיתוח מקומי בלבד) — `brew install postgresql@16` או `apt install postgresql-16`. שירות שרץ ברקע על המחשב שלכם",
        "Supabase (managed + UI) — Postgres + REST API + Auth + Storage. החינמי נדיב מאוד (500MB, 2 פרויקטים). אצלי כל הפרויקטים הקטנים יושבים שם",
        "Neon (serverless Postgres) — נרדם כשלא משתמשים, מתעורר מיד. מצוין לפיתוח, פחות לעומסים יציבים. החינמי 0.5GB",
        "RDS / Cloud SQL (לעסקים) — אמזון/גוגל מנהלים בשבילכם. יקר אבל אפס תחזוקה. כדאי כשהדאטה קריטית ויש תקציב",
        "psql — הלקוח הקלאסי בשורת פקודה. אחרי `apt install postgresql-client`, מתחברים עם `psql postgresql://user:pass@host:5432/db`",
      ],
      tips: [
        "בפיתוח אל תפתחו את פורט 5432 לאינטרנט. השאירו אותו פנימי לרשת ה-docker, וגישה רק דרך SSH tunnel",
        "Supabase חינמי = יופי לסטארטים. ברגע שעוברים את 500MB, חישבו אם להמשיך אצלם או לעבור ל-self-hosted",
        "GUI נחמד: TablePlus (mac/windows, חינמי לשתי connections), DBeaver (קוד פתוח, כבד יותר), pgAdmin (חינמי, רשמי)",
      ],
      codeExample: {
        label: "docker-compose.yml לPostgres עם persistence",
        code: "services:\n  postgres:\n    image: postgres:16-alpine\n    restart: unless-stopped\n    environment:\n      POSTGRES_DB: agents\n      POSTGRES_USER: app\n      POSTGRES_PASSWORD_FILE: /run/secrets/pg_pass\n    volumes:\n      - pg_data:/var/lib/postgresql/data\n      - ./init.sql:/docker-entrypoint-initdb.d/init.sql:ro\n    ports:\n      - '127.0.0.1:5432:5432'  # רק localhost\n    secrets:\n      - pg_pass\n    healthcheck:\n      test: ['CMD-SHELL', 'pg_isready -U app']\n      interval: 10s\n\nvolumes:\n  pg_data:\n\nsecrets:\n  pg_pass:\n    file: ./.secrets/pg_pass.txt",
      },
    },
    {
      id: "schema",
      icon: Table,
      title: "סכמה, types, ומיגרציות",
      subtitle: "איך לתכנן את הטבלאות שלכם נכון מההתחלה",
      description:
        "סכמה (schema) זה המבנה של ה-DB — אילו טבלאות יש, אילו עמודות יש בכל אחת, ומה הקשרים ביניהן. תכנון נכון של סכמה בהתחלה חוסך כאב ראש לאורך כל חיי הפרויקט. הכלל הזהב: התחילו פשוט (לא לנרמל יותר מדי בהתחלה), אבל השתמשו ב-types חזקים מהיום הראשון (אל תשמרו תאריכים כ-text — תמיד timestamptz; אל תשמרו כסף כ-float — תמיד numeric).",
      color: "from-purple-600 to-violet-500",
      difficulty: "intermediate",
      content: [
        "Types חשובים: `uuid` (מפתחות), `timestamptz` (תמיד עם timezone), `numeric(precision, scale)` (כסף), `text` (לא varchar — אין יתרון), `jsonb` (לא json), `boolean`",
        "מפתחות ראשיים — תמיד `uuid` כברירת מחדל. עדיף על `serial` כי לא חושף את הסדר/כמות, ומאפשר merge בין DBs",
        "Constraints — `NOT NULL` כברירת מחדל; `CHECK (column > 0)` למגבלות עסקיות; `UNIQUE (col1, col2)` לייחודיות מורכבת",
        "Migrations — אסור לשנות סכמה ידנית בייצור. השתמשו בכלי כמו `prisma migrate`, `drizzle-kit`, או `sqlx migrate` — שמייצרים קבצי SQL שאתם committים לגיט",
        "Soft deletes — במקום `DELETE`, הוסיפו עמודת `deleted_at timestamptz`. שומר היסטוריה, מאפשר שחזור, חשוב למוצרים בייצור",
        "Audit columns — תוסיפו לכל טבלה: `created_at`, `updated_at`, `created_by`. עתידכם תודה לכם",
      ],
      tips: [
        "השתמשו ב-`citext` (case-insensitive text) לאימיילים. ככה `Elad@x.com` ו-`elad@x.com` נחשבים לאותו דבר באינדקס",
        "אל תאחסנו תמונות ב-DB. שמרו אותן ב-S3/R2 ושמרו רק את ה-URL ב-Postgres",
        "כשאתם בספק — תוסיפו עמודה. הסרת עמודה זה כאב, הוספה זה זול",
      ],
      codeExample: {
        label: "מיגרציה לדוגמה (drizzle/prisma-style)",
        code: "-- 001_create_agent_tasks.sql\nCREATE TABLE agent_tasks (\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\n  agent_name text NOT NULL,\n  status text NOT NULL CHECK (status IN ('pending','running','done','failed')),\n  priority int NOT NULL DEFAULT 0,\n  payload jsonb NOT NULL,\n  result jsonb,\n  error text,\n  created_at timestamptz NOT NULL DEFAULT now(),\n  updated_at timestamptz NOT NULL DEFAULT now(),\n  completed_at timestamptz,\n  deleted_at timestamptz\n);\n\nCREATE INDEX idx_tasks_pending\n  ON agent_tasks(agent_name, priority DESC, created_at)\n  WHERE status = 'pending' AND deleted_at IS NULL;",
      },
    },
    {
      id: "extensions",
      icon: Layers,
      title: "הרחבות: pgvector, TimescaleDB, PostGIS",
      subtitle: "מה שהופך את Postgres מ-DB לפלטפורמה",
      description:
        "אחת התכונות המדהימות של Postgres היא מערכת ה-extensions: יכולת להוסיף יכולות שלמות בפקודה אחת (`CREATE EXTENSION ...`). זה הופך את Postgres מ'בסיס נתונים' ל'פלטפורמה' — אותו DB שמטפל ב-state של הסוכנים יכול גם לעשות חיפוש סמנטי, לאחסן סדרות זמן, או לחפש לפי קואורדינטות גיאוגרפיות.",
      color: "from-amber-600 to-orange-500",
      difficulty: "intermediate",
      content: [
        "pgvector — מאפשר לאחסן embeddings (וקטורים) ולחפש לפי דמיון. אלטרנטיבה ל-[Qdrant](/guide/qdrant) לעומסים קטנים-בינוניים. תמיכה ב-HNSW (אינדקס מהיר) מגרסה 0.5+",
        "TimescaleDB — הופך את Postgres ל-time-series DB. מצוין למטריקות, IoT, מחירי מניות. אוטומטי-מחלק חודשים/ימים לטבלאות פנימיות",
        "PostGIS — נתונים גיאוגרפיים. 'מצא את כל הלקוחות תוך רדיוס 5 ק\"מ ממיקום הנהג' זו שאילתה אחת",
        "pg_cron — תזמון משימות בתוך ה-DB. במקום cron מערכת, `SELECT cron.schedule(...)` מתזמן ניקיון אוטומטי",
        "pg_partman — חלוקת טבלאות ענקיות לחלקים (partitions) אוטומטית. חיוני לטבלאות לוגים שגדלות בלי הפסקה",
        "uuid-ossp / pgcrypto — פונקציות הצפנה ו-uuid generation. מובנים ברוב ההפצות",
      ],
      tips: [
        "Supabase תומך בפועל ברוב ההרחבות הפופולריות (pgvector, PostGIS, pg_cron) — אז יכול להיות שלא צריך self-host כדי לקבל אותן",
        "אל תוסיפו extensions שאתם לא משתמשים. כל אחת לוקחת זיכרון ויכולה ליצור attack surface",
        "pgvector vs Qdrant: pgvector טוב עד ~1M וקטורים. מעבר לזה Qdrant יעבוד יותר מהר ב-HNSW המנוהל שלו",
      ],
      codeExample: {
        label: "pgvector בפעולה",
        code: "CREATE EXTENSION IF NOT EXISTS vector;\n\nCREATE TABLE memories (\n  id bigserial PRIMARY KEY,\n  text text NOT NULL,\n  embedding vector(1536),  -- OpenAI ada-002 dim\n  created_at timestamptz DEFAULT now()\n);\n\n-- אינדקס HNSW לחיפוש מהיר\nCREATE INDEX ON memories\n  USING hnsw (embedding vector_cosine_ops);\n\n-- חיפוש 5 הזיכרונות הדומים ביותר\nSELECT text, 1 - (embedding <=> $1) AS similarity\nFROM memories\nORDER BY embedding <=> $1\nLIMIT 5;",
      },
    },
    {
      id: "production",
      icon: Shield,
      title: "Production: connection pooling, ביצועים, אבטחה",
      subtitle: "מה שצריך לדעת לפני שעוברים לעולם האמיתי",
      description:
        "ההבדל בין Postgres בפיתוח לבייצור הוא בעיקר במספר חיבורים מקבילים, גודל הדאטה, וחשיפה לאינטרנט. כל חיבור ל-Postgres עולה ~10MB RAM — בלי pooling, 100 משתמשים מקבילים = 1GB רק לחיבורים. PgBouncer פותר את זה: הוא יושב בין האפליקציה ל-DB, ומחזיק כמה עשרות חיבורים אמיתיים שמשרתים אלפי לקוחות 'לוגיים'.",
      color: "from-rose-600 to-pink-500",
      difficulty: "advanced",
      content: [
        "PgBouncer — connection pooler קלאסי. רץ כשירות נפרד (פורט 6432), והאפליקציה מתחברת אליו במקום ל-Postgres ישירות. mode 'transaction' מאפשר שיתוף חיבורים מצויין",
        "EXPLAIN ANALYZE — הפקודה הכי חשובה לביצועים. מציגה איך Postgres תכנן והריץ את השאילתה, איפה הוא בזבז זמן, ואם הוא השתמש באינדקסים",
        "אינדקסים חכמים: `CREATE INDEX CONCURRENTLY` (לא נועל את הטבלה), `partial index` (רק על שורות שמתאימות לתנאי), `expression index` (על תוצאה של פונקציה)",
        "VACUUM ו-AUTOVACUUM — Postgres לא מוחק שורות מיד; הוא מסמן אותן כ'מתות' ומנקה אחר כך. אם autovacuum לא רץ — הביצועים מתדרדרים. בדקו ב-`pg_stat_user_tables`",
        "תצורת זיכרון — `shared_buffers = 25% מה-RAM`, `effective_cache_size = 75% מה-RAM`, `work_mem = 16-64MB`. ברירות המחדל של Postgres שמרניות מדי",
        "אבטחה: SSL חובה (`ssl=on`), `pg_hba.conf` עם `scram-sha-256`, אסור להריץ DB ישירות חשוף לאינטרנט — תמיד מאחורי VPN/firewall",
        "Read replicas — Postgres תומך ברפליקציה אסינכרונית מובנית. שאילתות קריאה כבדות (אנליטיקה) על replica, כתיבות על master",
      ],
      tips: [
        "אצלי Postgres רץ ב-docker עם UFW שחוסם 5432 לעולם החיצוני. גישה רק דרך SSH tunnel מהמחשב שלי, או דרך הרשת הפנימית של docker",
        "תפעילו `pg_stat_statements` — הרחבה שמתעדת איזה שאילתות איטיות ומופעלות הכי הרבה. זה הצעד הראשון בכל אופטימיזציה",
        "עדכוני אבטחה — Postgres יוצא עם מינוריים כל רבעון. שדרגו אותם תוך חודש (16.1 → 16.2 → 16.3) — הם תאימים אחורה לחלוטין",
      ],
      codeExample: {
        label: "PgBouncer מינימלי",
        code: "# pgbouncer.ini\n[databases]\nagents = host=postgres port=5432 dbname=agents\n\n[pgbouncer]\nlisten_addr = 0.0.0.0\nlisten_port = 6432\nauth_type = scram-sha-256\nauth_file = /etc/pgbouncer/userlist.txt\npool_mode = transaction\nmax_client_conn = 1000\ndefault_pool_size = 25\nreserve_pool_size = 5\n\n# האפליקציה מתחברת ל-pgbouncer:6432\n# במקום ל-postgres:5432 ישירות",
      },
    },
    {
      id: "backup",
      icon: HardDrive,
      title: "גיבוי, שחזור, ו-disaster recovery",
      subtitle: "הדבר הכי חשוב — ולרוב זה שאף אחד לא בודק עד שכבר מאוחר",
      description:
        "גיבוי שלא בדקתם שהוא משוחזר — לא קיים. זה כלל הברזל של עולם ה-DB. Postgres מציע שתי שיטות עיקריות: `pg_dump` (גיבוי לוגי, נוח להעברה בין גרסאות) ו-PITR (Point-in-Time Recovery, גיבוי פיזי שמאפשר לחזור לרגע ספציפי בעבר). בפרויקטים קטנים pg_dump יומי מספיק; ברגע שיש לקוחות אמיתיים — PITR + replica.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      content: [
        "`pg_dump` — מייצא את ה-DB לקובץ SQL או pgsql binary. רץ live (לא נועל), מתאים ל-DBs עד עשרות GB. שחזור: `pg_restore` או `psql < dump.sql`",
        "`pg_dumpall` — כמו pg_dump אבל לכל ה-DBs במופע יחד, כולל users ו-permissions",
        "WAL archiving — Postgres כותב כל שינוי ל-WAL (Write-Ahead Log). עם `archive_command` שמעלה אותם ל-S3, אפשר לשחזר לכל רגע בעבר",
        "pgBackRest / Barman — כלים שמתמחים ב-PITR. אצלי אני משתמש ב-pg_dump יומי + העתקה ל-S3 (Backblaze B2 — הכי זול)",
        "בדיקת שחזור — אחת לחודש לפחות, שחזרו את הגיבוי האחרון ל-DB צד וודאו שכל הטבלאות שם, שיש בהן את מספר השורות הצפוי, ושאפליקציה רגילה רצה עליהן",
        "Logical replication — דרך לעבור מגרסה לגרסה (13 → 16) בלי downtime. מקימים replica חדש על הגרסה החדשה, מסנכרנים, ועוברים אליו",
        "אסטרטגיית 3-2-1: 3 עותקים, 2 מדיות שונות, 1 מחוץ לאתר. אצלי: data על ה-VPS + עותק יומי ב-Backblaze + עותק שבועי בכונן חיצוני בבית",
      ],
      tips: [
        "אל תסתמכו על snapshot של VPS לבד — זה לא גיבוי DB. זה image של disk, ויש סיכוי טוב שה-DB באמצע transaction בנקודת ה-snapshot",
        "Backblaze B2 — אחסון תואם S3 ב-$0.005/GB/חודש. גיבוי 100GB יעלה לכם 50 סנט בחודש",
        "תיעדו את שיטת השחזור. כשתצטרכו לשחזר באמת (3 בלילה, panic mode), לא תזכרו את הפקודות. כתבו runbook ברור עם פקודות מדויקות",
      ],
      codeExample: {
        label: "סקריפט גיבוי יומי ל-S3/Backblaze",
        code: "#!/bin/bash\n# /usr/local/bin/pg-backup.sh — רץ מ-cron יומי ב-3:00\nset -euo pipefail\n\nDATE=$(date +%Y-%m-%d)\nBACKUP_FILE=\"/tmp/pg-backup-${DATE}.sql.gz\"\n\n# גיבוי דחוס\ndocker exec postgres pg_dump -U app -d agents --clean \\\n  | gzip > \"${BACKUP_FILE}\"\n\n# העלאה ל-Backblaze (rclone צריך הגדרה מראש)\nrclone copy \"${BACKUP_FILE}\" b2:my-backups/postgres/\n\n# שמירת רק 7 ימים אחרונים מקומית\nfind /tmp -name 'pg-backup-*.sql.gz' -mtime +7 -delete\n\n# התראה אם הגיבוי קטן מדי (משהו דפוק)\nSIZE=$(stat -c%s \"${BACKUP_FILE}\")\nif [ \"$SIZE\" -lt 1000000 ]; then\n  curl -X POST \"$ALERT_WEBHOOK\" -d 'pg backup too small!'\nfi",
      },
    },
  ],
  resources: [
    {
      title: "PostgreSQL Docs",
      description: "התיעוד הרשמי — אחד הטובים בתעשייה, יסודי ומעודכן",
      href: "https://www.postgresql.org/docs/",
      icon: BookOpen,
    },
    {
      title: "Use The Index, Luke",
      description: "המדריך המעולה לאינדקסים — חובה למפתחים רציניים",
      href: "https://use-the-index-luke.com/",
      icon: BookOpen,
    },
    {
      title: "Supabase",
      description: "Postgres מנוהל + REST API + Auth + Storage. החינמי נדיב",
      href: "https://supabase.com",
      icon: ExternalLink,
    },
    {
      title: "pgvector",
      description: "ההרחבה לחיפוש סמנטי על Postgres",
      href: "https://github.com/pgvector/pgvector",
      icon: Github,
    },
    {
      title: "Postgres Weekly",
      description: "ניוזלטר שבועי על Postgres — חדשות, טיפים, ופוסטים",
      href: "https://postgresweekly.com/",
      icon: ExternalLink,
    },
    {
      title: "המדריך ל-Docker",
      description: "איך להריץ Postgres בקונטיינר עם persistence",
      href: "/guide/docker",
      icon: BookOpen,
    },
  ],
  ctaTitle: "רוצים שאני אעזור לכם לתכנן סכמה?",
  ctaSub:
    "סכמה טובה זה ההבדל בין מוצר שמתפתח יפה למוצר שמתקבע על מבנה רע. שעת ייעוץ חוסכת חודשי refactor.",
  primaryCta: {
    label: "Postgres Tutorial",
    href: "https://www.postgresql.org/docs/current/tutorial.html",
    icon: BookOpen,
  },
  secondaryCta: {
    label: "תאמו ייעוץ סכמה",
    href: "https://wa.me/972525427474",
    icon: Mail,
  },
  authorBio:
    "אני עובד עם Postgres מ-2014, ובכל פרויקט רציני שהקמתי הוא נמצא במרכז: מ-CRM ללקוחות, דרך מערכות סוכנים, ועד אתרים גדולים. אצלי על Hetzner Postgres 16 רץ ב-docker עם 2M+ שורות ומגיב מתחת ל-10ms בשאילתות יומיומיות. המדריך הזה הוא תמצית של מה שלמדתי בדרך הקשה.",
};
