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

export const postgresGuideEn: AgentGuideData = {
  slug: "postgres",
  agentName: "PostgreSQL",
  agentNameHe: "PostgreSQL — The Database You'll Pick For Years",
  category: "infra",
  brandIconSlug: "postgresql",
  brandIconColor: "4169E1",
  heroBgImage: "/images/guides/guide-postgres-hero.jpg",
  tagline: "the relational database that holds your agent network state in production",
  heroDescription:
    "PostgreSQL (Postgres for short) is the most mature, most stable, most 'boringly reliable' open-source relational database — and that is exactly why it is the right pick for almost any project that needs to remember things in production. Unlike SQLite (perfect for development and local tools — a single file on disk), Postgres runs as a separate service that handles dozens of concurrent connections, complex transactions, and large data volumes without breaking a sweat. For me (Elad), Postgres on Hetzner VPS holds the state of all my agents: who talked to whom, what actions were decided, the status of every task, and who paid which invoice. In 2026 Postgres is no longer just a 'database' — with extensions like pgvector (semantic search, an alternative to [Qdrant](/en/guide/qdrant) for smaller workloads), TimescaleDB (time series), and PostGIS (maps and geography), it becomes a full platform. When you build a new product my recommendation is simple: start with SQLite, switch to Postgres the moment you have a second user. Even if you eventually move to DynamoDB or Firebase, the years you invest in learning Postgres will pay off in every project you ever touch.",
  badgeText: "2026 · Relational DB · Practical guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/postgres",
  stats: [
    { label: "version", value: "16+" },
    { label: "rows in production", value: "2M+" },
    { label: "uptime", value: "99.9%" },
    { label: "cost", value: "free" },
  ],
  paradigmTitle: "Why Postgres rather than SQLite/MongoDB/Firebase",
  paradigmSub:
    "SQLite is excellent for development. Postgres is excellent for production. The difference between them is not speed — it's timing.",
  paradigmShifts: [
    {
      before: "MongoDB because 'JSON is flexible'",
      after: "Postgres with a JSONB column. Flexibility + transactions + JOIN.",
      icon: Layers,
    },
    {
      before: "Firebase because 'fast to start'",
      after: "Postgres with PostgREST/Supabase. Same speed, no vendor lock.",
      icon: GitBranch,
    },
    {
      before: "SQLite in production — 'we don't need more'",
      after: "Postgres the moment a second user writes concurrently.",
      icon: Database,
    },
    {
      before: "DynamoDB because 'AWS told us to'",
      after: "Postgres with read replicas. Cheaper, far more controlled.",
      icon: Shield,
    },
  ],
  whoIsThisFor: [
    {
      title: "Developers working with real data",
      description:
        "Any project with users, actions, and reports. Postgres gives you powerful SQL, atomic transactions, and headroom you won't outgrow quickly.",
      icon: Rocket,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Data teams that need analytics",
      description:
        "Materialized views, window functions, nested CTEs. Postgres is a DB and a built-in BI tool in one.",
      icon: Activity,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Anyone building an agent network",
      description:
        "Agent state, action logs, conversation history. Postgres + JSONB + pgvector = one solution for all of it.",
      icon: Users,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Anyone allergic to vendor lock",
      description:
        "Postgres runs everywhere: Hetzner, AWS, GCP, Mac, Windows. If you ever want to move — it's a pg_dump away.",
      icon: HardDrive,
      color: "from-orange-500 to-amber-500",
    },
  ],
  toc: [
    { id: "what-is", label: "What it is" },
    { id: "install", label: "Install" },
    { id: "schema", label: "Schema & types" },
    { id: "extensions", label: "Extensions" },
    { id: "production", label: "Production" },
    { id: "backup", label: "Backup" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Database,
      title: "What is Postgres? Why not MySQL",
      subtitle: "A serious relational database that has worked well for 30 years",
      description:
        "Postgres is a relational database — meaning it stores data in tables that have relations to each other, and you can join them with queries. This has been the standard since the 70s because the idea is simple and powerful: every entity in the system (user, order, product) gets its own table, and instead of duplicating data you simply point from one table to another. Postgres differs from MySQL on a few production-grade points: it supports JSONB (fast indexing on JSON fields), array columns, transactional DDL (even schema changes are atomic — if they fail mid-flight, everything rolls back), and a stricter SQL standard than MySQL's.",
      color: "from-blue-600 to-cyan-500",
      difficulty: "beginner",
      beginner:
        "Think of Postgres as an extremely smart Excel that can hold millions of rows, answer hundreds of questions per second, and guarantee that if you do a complex operation (debit one account and credit another) — either everything happens, or nothing happens. There is no in-between. That property is called ACID, and it's why banks, insurance companies, and I (Elad) all use it.",
      content: [
        "Tables — the basics. Each table is a list of rows with predefined columns. Like Excel, but with strong types (text, int, timestamp, jsonb)",
        "Primary key — a column that uniquely identifies each row. Most often `uuid` or `bigserial` (auto-incrementing)",
        "Foreign keys — the connection between tables. If an `orders` table has a `user_id` column, it can point at `id` in `users` — and Postgres guarantees no order can exist without a matching user",
        "Indexes — data structures that speed up queries. Without an index, searching one million rows takes a full second; with one, milliseconds. For columns you use in WHERE — always index",
        "Transactions — a group of operations that either all happen or none do. `BEGIN ... COMMIT` or `ROLLBACK`",
        "JSONB — a data type that stores JSON in a packed binary format. Supports full indexing on inner fields, allows queries like `WHERE data->>'status' = 'active'`",
      ],
      tips: [
        "If you come from MongoDB — try JSONB before swearing eternal loyalty to a document store. You'll get flexibility + JOINs + transactions",
        "Don't be afraid of SQL. It's been around for 50 years and isn't going anywhere. ORMs come and go, SQL stays",
      ],
      codeExample: {
        label: "A basic table with a foreign key and JSONB",
        code: "CREATE TABLE users (\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\n  email text UNIQUE NOT NULL,\n  created_at timestamptz DEFAULT now()\n);\n\nCREATE TABLE agent_messages (\n  id bigserial PRIMARY KEY,\n  user_id uuid REFERENCES users(id) ON DELETE CASCADE,\n  agent_name text NOT NULL,\n  payload jsonb NOT NULL,\n  created_at timestamptz DEFAULT now()\n);\n\nCREATE INDEX idx_messages_user ON agent_messages(user_id, created_at DESC);\nCREATE INDEX idx_messages_payload ON agent_messages USING GIN (payload);",
      },
    },
    {
      id: "install",
      icon: Terminal,
      title: "Install: docker-compose and managed services",
      subtitle: "Three ways to spin up Postgres — pick by stage",
      description:
        "Installing Postgres can get complicated the old-school way (apt-get + manual config + permissions). The modern path: docker-compose for development, and in production either the same Docker setup or a managed service (Supabase, Neon, RDS) that handles backups, replication and security updates for you. For me, Postgres runs as a container in docker-compose on the same server as the rest of the agents because the data volume is small and the cost is essentially zero.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "beginner",
      content: [
        "Docker (development + small production) — by far the simplest. One compose stanza and you have a DB. Backup = copy a volume. Upgrade = swap a tag",
        "Homebrew/apt (local development only) — `brew install postgresql@16` or `apt install postgresql-16`. A service running in the background on your machine",
        "Supabase (managed + UI) — Postgres + REST API + Auth + Storage. The free tier is generous (500MB, 2 projects). All my small projects live there",
        "Neon (serverless Postgres) — sleeps when unused, wakes up instantly. Great for dev, less great for steady load. Free tier 0.5GB",
        "RDS / Cloud SQL (for businesses) — Amazon/Google manage it for you. Expensive but zero-maintenance. Worth it when data is critical and budget is available",
        "psql — the classic CLI client. After `apt install postgresql-client`, connect with `psql postgresql://user:pass@host:5432/db`",
      ],
      tips: [
        "In development, never expose port 5432 to the internet. Keep it internal to the Docker network and access it through an SSH tunnel",
        "Free Supabase = great for early-stage. Once you cross 500MB, decide whether to stay or move to self-hosted",
        "Nice GUIs: TablePlus (mac/windows, free for two connections), DBeaver (open source, heavier), pgAdmin (free, official)",
      ],
      codeExample: {
        label: "docker-compose.yml for Postgres with persistence",
        code: "services:\n  postgres:\n    image: postgres:16-alpine\n    restart: unless-stopped\n    environment:\n      POSTGRES_DB: agents\n      POSTGRES_USER: app\n      POSTGRES_PASSWORD_FILE: /run/secrets/pg_pass\n    volumes:\n      - pg_data:/var/lib/postgresql/data\n      - ./init.sql:/docker-entrypoint-initdb.d/init.sql:ro\n    ports:\n      - '127.0.0.1:5432:5432'  # localhost only\n    secrets:\n      - pg_pass\n    healthcheck:\n      test: ['CMD-SHELL', 'pg_isready -U app']\n      interval: 10s\n\nvolumes:\n  pg_data:\n\nsecrets:\n  pg_pass:\n    file: ./.secrets/pg_pass.txt",
      },
    },
    {
      id: "schema",
      icon: Table,
      title: "Schema, types, and migrations",
      subtitle: "How to design your tables right from the start",
      description:
        "A schema is the structure of your DB — what tables exist, what columns each one has, and how they relate. A good schema design up front saves headaches for the whole life of the project. The golden rule: start simple (don't over-normalize early), but use strong types from day one (never store dates as text — always timestamptz; never store money as float — always numeric).",
      color: "from-purple-600 to-violet-500",
      difficulty: "intermediate",
      content: [
        "Important types: `uuid` (keys), `timestamptz` (always with timezone), `numeric(precision, scale)` (money), `text` (not varchar — no benefit), `jsonb` (not json), `boolean`",
        "Primary keys — default to `uuid`. Better than `serial` because it doesn't leak order/quantity and lets you merge across DBs",
        "Constraints — `NOT NULL` by default; `CHECK (column > 0)` for business rules; `UNIQUE (col1, col2)` for compound uniqueness",
        "Migrations — never change the schema by hand in production. Use a tool like `prisma migrate`, `drizzle-kit`, or `sqlx migrate` — they generate SQL files that you commit to git",
        "Soft deletes — instead of `DELETE`, add a `deleted_at timestamptz` column. Preserves history, allows restoration, important for production products",
        "Audit columns — add to every table: `created_at`, `updated_at`, `created_by`. Future-you will thank you",
      ],
      tips: [
        "Use `citext` (case-insensitive text) for emails. That way `Elad@x.com` and `elad@x.com` are the same value in the index",
        "Don't store images in the DB. Save them to S3/R2 and only keep the URL in Postgres",
        "When in doubt — add a column. Removing a column is painful, adding one is cheap",
      ],
      codeExample: {
        label: "An example migration (drizzle/prisma-style)",
        code: "-- 001_create_agent_tasks.sql\nCREATE TABLE agent_tasks (\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\n  agent_name text NOT NULL,\n  status text NOT NULL CHECK (status IN ('pending','running','done','failed')),\n  priority int NOT NULL DEFAULT 0,\n  payload jsonb NOT NULL,\n  result jsonb,\n  error text,\n  created_at timestamptz NOT NULL DEFAULT now(),\n  updated_at timestamptz NOT NULL DEFAULT now(),\n  completed_at timestamptz,\n  deleted_at timestamptz\n);\n\nCREATE INDEX idx_tasks_pending\n  ON agent_tasks(agent_name, priority DESC, created_at)\n  WHERE status = 'pending' AND deleted_at IS NULL;",
      },
    },
    {
      id: "extensions",
      icon: Layers,
      title: "Extensions: pgvector, TimescaleDB, PostGIS",
      subtitle: "What turns Postgres from a DB into a platform",
      description:
        "One of the magical things about Postgres is its extension system: the ability to add whole new capabilities with one command (`CREATE EXTENSION ...`). That turns Postgres from 'a database' into 'a platform' — the same DB that holds your agent state can also do semantic search, store time series, or query by geographic coordinates.",
      color: "from-amber-600 to-orange-500",
      difficulty: "intermediate",
      content: [
        "pgvector — store embeddings (vectors) and search by similarity. An alternative to [Qdrant](/en/guide/qdrant) for small-to-medium loads. HNSW index support since 0.5+",
        "TimescaleDB — turns Postgres into a time-series DB. Great for metrics, IoT, stock prices. Auto-partitions months/days into internal tables",
        "PostGIS — geographic data. 'Find every customer within 5km of the driver' is a single query",
        "pg_cron — schedule jobs from inside the DB. Instead of system cron, `SELECT cron.schedule(...)` schedules automatic cleanup",
        "pg_partman — auto-partitioning of huge tables. Critical for log tables that grow without end",
        "uuid-ossp / pgcrypto — encryption helpers and uuid generation. Built into most distributions",
      ],
      tips: [
        "Supabase actually supports most of the popular extensions (pgvector, PostGIS, pg_cron) — so you might not need self-hosting to get them",
        "Don't add extensions you aren't using. Each one consumes memory and can introduce attack surface",
        "pgvector vs Qdrant: pgvector works well up to ~1M vectors. Beyond that, Qdrant will outperform with its managed HNSW",
      ],
      codeExample: {
        label: "pgvector in action",
        code: "CREATE EXTENSION IF NOT EXISTS vector;\n\nCREATE TABLE memories (\n  id bigserial PRIMARY KEY,\n  text text NOT NULL,\n  embedding vector(1536),  -- OpenAI ada-002 dim\n  created_at timestamptz DEFAULT now()\n);\n\n-- HNSW index for fast similarity search\nCREATE INDEX ON memories\n  USING hnsw (embedding vector_cosine_ops);\n\n-- Find the 5 most similar memories\nSELECT text, 1 - (embedding <=> $1) AS similarity\nFROM memories\nORDER BY embedding <=> $1\nLIMIT 5;",
      },
    },
    {
      id: "production",
      icon: Shield,
      title: "Production: connection pooling, performance, security",
      subtitle: "What you need to know before going to the real world",
      description:
        "The difference between Postgres in development and Postgres in production is mostly the number of concurrent connections, the size of the data, and the exposure to the internet. Each Postgres connection costs ~10MB of RAM — without pooling, 100 concurrent users = 1GB just for connections. PgBouncer solves it: it sits between the application and the DB, holding a few dozen real connections that serve thousands of 'logical' clients.",
      color: "from-rose-600 to-pink-500",
      difficulty: "advanced",
      content: [
        "PgBouncer — the classic connection pooler. Runs as a separate service (port 6432); the application connects to it instead of Postgres directly. 'transaction' mode allows excellent connection sharing",
        "EXPLAIN ANALYZE — the most important command for performance. Shows how Postgres planned and ran the query, where it spent time, and whether it used indexes",
        "Smart indexes: `CREATE INDEX CONCURRENTLY` (doesn't lock the table), partial indexes (only on rows that match a predicate), expression indexes (on a function's output)",
        "VACUUM and AUTOVACUUM — Postgres doesn't delete rows immediately; it marks them as 'dead' and reclaims later. If autovacuum doesn't run, performance degrades. Check `pg_stat_user_tables`",
        "Memory tuning — `shared_buffers = 25% of RAM`, `effective_cache_size = 75% of RAM`, `work_mem = 16-64MB`. Postgres defaults are too conservative",
        "Security: SSL is mandatory (`ssl=on`), `pg_hba.conf` with `scram-sha-256`, never expose the DB directly to the internet — always behind a VPN/firewall",
        "Read replicas — Postgres ships with built-in async replication. Heavy read queries (analytics) on the replica, writes on the master",
      ],
      tips: [
        "My Postgres runs in Docker behind UFW that blocks 5432 to the outside world. Access is only via SSH tunnel from my machine, or via the internal Docker network",
        "Enable `pg_stat_statements` — an extension that tracks which queries are slow and most frequently called. The first step in any optimization",
        "Security updates — Postgres ships minor releases every quarter. Apply them within a month (16.1 → 16.2 → 16.3) — they're fully backwards compatible",
      ],
      codeExample: {
        label: "Minimal PgBouncer config",
        code: "# pgbouncer.ini\n[databases]\nagents = host=postgres port=5432 dbname=agents\n\n[pgbouncer]\nlisten_addr = 0.0.0.0\nlisten_port = 6432\nauth_type = scram-sha-256\nauth_file = /etc/pgbouncer/userlist.txt\npool_mode = transaction\nmax_client_conn = 1000\ndefault_pool_size = 25\nreserve_pool_size = 5\n\n# Application connects to pgbouncer:6432\n# instead of postgres:5432 directly",
      },
    },
    {
      id: "backup",
      icon: HardDrive,
      title: "Backup, restore, and disaster recovery",
      subtitle: "The most important thing — and the one nobody checks until it's too late",
      description:
        "A backup you haven't verified by restoring — does not exist. That is the iron rule of the DB world. Postgres offers two main approaches: `pg_dump` (logical backup, easy to move between versions) and PITR (Point-in-Time Recovery, a physical backup that lets you go back to any specific moment in the past). For small projects daily pg_dump is enough; the moment you have real customers — PITR + replica.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      content: [
        "`pg_dump` — exports the DB to a SQL or pgsql binary file. Runs live (no locks), works for DBs up to tens of GBs. Restore: `pg_restore` or `psql < dump.sql`",
        "`pg_dumpall` — like pg_dump but for every DB in the instance, including users and permissions",
        "WAL archiving — Postgres writes every change to the WAL (Write-Ahead Log). With `archive_command` shipping them to S3, you can restore to any point in the past",
        "pgBackRest / Barman — tools that specialize in PITR. I personally use daily pg_dump + copy to S3 (Backblaze B2 — the cheapest)",
        "Restore drill — at least once a month, restore the latest backup to a side DB and verify all tables are there, with the expected number of rows, and that a normal app runs against it",
        "Logical replication — a way to migrate from one major version to another (13 → 16) with no downtime. Spin up a new replica on the new version, sync, cut over",
        "3-2-1 strategy: 3 copies, 2 different media, 1 off-site. For me: data on the VPS + daily copy to Backblaze + weekly copy to a home external drive",
      ],
      tips: [
        "Don't rely on a VPS snapshot alone — it's not a DB backup. It's a disk image, and there's a real chance the DB was mid-transaction when the snapshot was taken",
        "Backblaze B2 — S3-compatible storage at $0.005/GB/month. Backing up 100GB will cost you 50 cents a month",
        "Document the restore procedure. When you actually need to restore (3am, panic mode), you won't remember the commands. Write a clear runbook with exact commands",
      ],
      codeExample: {
        label: "Daily backup script to S3/Backblaze",
        code: "#!/bin/bash\n# /usr/local/bin/pg-backup.sh — runs from cron daily at 3:00\nset -euo pipefail\n\nDATE=$(date +%Y-%m-%d)\nBACKUP_FILE=\"/tmp/pg-backup-${DATE}.sql.gz\"\n\n# Compressed backup\ndocker exec postgres pg_dump -U app -d agents --clean \\\n  | gzip > \"${BACKUP_FILE}\"\n\n# Upload to Backblaze (rclone needs to be configured beforehand)\nrclone copy \"${BACKUP_FILE}\" b2:my-backups/postgres/\n\n# Keep only the last 7 days locally\nfind /tmp -name 'pg-backup-*.sql.gz' -mtime +7 -delete\n\n# Alert if the backup is too small (something is broken)\nSIZE=$(stat -c%s \"${BACKUP_FILE}\")\nif [ \"$SIZE\" -lt 1000000 ]; then\n  curl -X POST \"$ALERT_WEBHOOK\" -d 'pg backup too small!'\nfi",
      },
    },
  ],
  resources: [
    {
      title: "PostgreSQL Docs",
      description: "The official docs — among the best in the industry, thorough and current",
      href: "https://www.postgresql.org/docs/",
      icon: BookOpen,
    },
    {
      title: "Use The Index, Luke",
      description: "The brilliant guide to indexes — required reading for serious developers",
      href: "https://use-the-index-luke.com/",
      icon: BookOpen,
    },
    {
      title: "Supabase",
      description: "Managed Postgres + REST API + Auth + Storage. Generous free tier",
      href: "https://supabase.com",
      icon: ExternalLink,
    },
    {
      title: "pgvector",
      description: "The extension for semantic search on Postgres",
      href: "https://github.com/pgvector/pgvector",
      icon: Github,
    },
    {
      title: "Postgres Weekly",
      description: "A weekly newsletter about Postgres — news, tips, and posts",
      href: "https://postgresweekly.com/",
      icon: ExternalLink,
    },
    {
      title: "The Docker guide",
      description: "How to run Postgres in a container with persistence",
      href: "/en/guide/docker",
      icon: BookOpen,
    },
  ],
  ctaTitle: "Want help designing your schema?",
  ctaSub:
    "A good schema is the difference between a product that evolves nicely and one that gets stuck on a bad shape. One consultation hour saves months of refactoring.",
  primaryCta: {
    label: "Postgres Tutorial",
    href: "https://www.postgresql.org/docs/current/tutorial.html",
    icon: BookOpen,
  },
  secondaryCta: {
    label: "Book a schema consult",
    href: "https://wa.me/972525427474",
    icon: Mail,
  },
  authorBio:
    "I've been working with Postgres since 2014, and in every serious project I've launched it sits at the center: from customer CRMs, to agent systems, to large web apps. On my Hetzner VPS, Postgres 16 runs in Docker holding 2M+ rows and answers daily queries in under 10ms. This guide is the distilled version of what I've learned the hard way.",
};
