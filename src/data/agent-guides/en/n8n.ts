import {
  Workflow,
  Zap,
  Plug,
  Webhook,
  Clock,
  GitBranch,
  Network,
  Github,
  ExternalLink,
  BookOpen,
  Code2,
  Rocket,
  Lightbulb,
  Users,
  Mail,
  Settings,
  Layers,
  Database,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const n8nGuideEn: AgentGuideData = {
  slug: "n8n",
  agentName: "n8n",
  agentNameHe: "n8n — Visual Automation Platform",
  category: "infra",
  logoImage: "/images/guide-logos/n8n-logo.png",
  tagline: "Open-source Zapier — 1000+ integrations, self-hosted, unlimited executions",
  heroDescription:
    "n8n is an open-source workflow automation platform (TypeScript/Node) with a visual drag-and-drop interface for building pipelines from 1000+ integrations (Slack, Gmail, Postgres, Webhooks, HTTP, OpenAI, [Qdrant](/en/guide/qdrant), and more). It runs on [Docker](/en/guide/docker) with PostgreSQL behind it. On my stack, n8n handles business cron jobs (invoicing, content publishing, agent heartbeats) and replaces three separate SaaS products that used to cost ~$80/month. On yours, n8n can be the glue of the entire stack — CRM automation, marketing ops, internal system integrations, or a full replacement for Zapier/Make.",
  badgeText: "2026 · Workflow Automation · Practical Guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/n8n",
  heroBgImage: "/images/guides/guide-n8n-hero.jpg",
  stats: [
    { label: "available nodes", value: "1000+" },
    { label: "executions", value: "unlimited" },
    { label: "self-host cost", value: "$0" },
    { label: "my integrations", value: "25" },
  ],
  paradigmTitle: "Why not Zapier?",
  paradigmSub:
    "Zapier is great until you hit $20/month for 750 triggers. n8n takes the same capability, opens it up, and adds the ability to write JS inside the workflow.",
  paradigmShifts: [
    {
      before: "Zapier Starter $20/month — 750 triggers",
      after: "n8n on a $5/month VPS — unlimited executions",
      icon: Zap,
    },
    {
      before: "Complex logic = adding Code by Zapier ($$)",
      after: "Code node in n8n — full JS for free",
      icon: Code2,
    },
    {
      before: "Vendor lock-in, no access to your workflows",
      after: "self-hosted, backed up in Postgres, exportable to JSON",
      icon: GitBranch,
    },
    {
      before: "No integration with your private AI agent",
      after: "HTTP node → hub.eladjak.com/kami/whatsapp",
      icon: Network,
    },
  ],
  whoIsThisFor: [
    {
      title: "Small ops teams",
      description:
        "Want workflows without touching code, but don't want to pay $200/month for Zapier Team.",
      icon: Users,
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Solo founders",
      description:
        "Automatic connections between Gmail, WhatsApp, Google Sheets, and a small CRM — all in a single workflow.",
      icon: Rocket,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Developers with a business side",
      description:
        "The Code node lets you wire n8n to internal servers and databases. Faster than building an integration platform from scratch.",
      icon: Code2,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "AI teams that need automation",
      description:
        "Connect Claude/Kami/CrewAI to ops tools — email, calendar, CRM, invoicing — without a new backend.",
      icon: Workflow,
      color: "from-violet-500 to-purple-500",
    },
  ],
  toc: [
    { id: "what-is", label: "What it is" },
    { id: "install", label: "Installation" },
    { id: "nodes", label: "Nodes & triggers" },
    { id: "agents", label: "Connecting agents" },
    { id: "advanced", label: "Advanced logic" },
    { id: "production", label: "In production" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Workflow,
      title: "n8n — the technical view",
      subtitle: "Workflow engine + visual interface + 1000 connectors",
      description:
        "n8n is an open-source visual automation platform built by a German company of the same name — think of it as 'open-source Zapier' that you run yourself on a server, with no cap on how many automations fire each month. Under the hood it has three layers: (1) an execution engine written in Node.js that runs the automations (each one is called a 'workflow' in n8n), (2) a database (PostgreSQL or SQLite) that stores the workflows and execution history, and (3) a polished visual editor in the browser where you drag boxes around and connect them with lines. On my setup n8n is the smart assembly line of the network — about 25 workflows that wire [Kami](/en/guide/kami), [CrewAI](/en/guide/crewai), and [Qdrant](/en/guide/qdrant) together with external services like Gmail, Slack, and WhatsApp.",
      color: "from-pink-600 to-rose-500",
      difficulty: "beginner",
      beginner:
        "Think of n8n as a factory assembly line: along the line are stations (nodes), and each station performs one action — 'read new email', 'send a WhatsApp message', 'save to Google Sheets'. You build the line once by dragging stations and drawing connections between them — and from that moment on, every time a trigger fires (say, a new email arrives), the line runs automatically and performs all the actions in sequence. Compared to Zapier charging ~$20/month for 750 runs, n8n on a €5/month VPS gives you unlimited runs — savings of $100+ per month.",
      content: [
        "node — a single station on the assembly line. Each node performs one action (send email, call an API, query a DB). There are 1000+ ready-made nodes and the option to write your own",
        "trigger node — the entry point that fires the workflow: Webhook (receives an HTTP request), Cron (runs on a schedule like 'every day at 09:00'), Gmail Trigger (new email arrives), and more",
        "workflow — the DAG (directed acyclic graph) of all the connected nodes. Data flows from node to node through the connections you drew in the visual editor",
        "expression — an internal templating language in the form {{$json.field}} that pulls values from the previous node. Lets you use the result of one step as input to the next, without writing code",
        "credentials — passwords, API keys, and tokens are stored separately in an encrypted vault. Configure once, use across all workflows — and you can rotate a key in one place",
        "webhook — a unique URL that n8n generates; any HTTP request to it fires the workflow. The standard way to connect external services (like Postiz or Resend) into n8n",
        "rate limit — a cap many APIs enforce (e.g. 'max 60 requests per minute'). n8n handles it with the Wait node that pauses between actions so you don't get blocked",
      ],
      tips: [
        "The editor supports full undo/redo and version history — don't be afraid to experiment and break things, it's easy to roll back",
        "The 'Execute Node' button on a single node runs just that node (not the whole workflow) — saves hours of debugging, especially on long workflows",
        "Pinned Data is a winning technique: 'pin' the result of one successful run and then test downstream nodes against that same data without re-running the whole thing",
      ],
    },
    {
      id: "install",
      icon: Settings,
      title: "Installing with Docker",
      subtitle: "VPS + compose = n8n running in 5 minutes",
      description:
        "The recommended way to run n8n in production is via [Docker](/en/guide/docker) with docker-compose — a single file that defines n8n + a PostgreSQL database + a reverse proxy (Caddy or Traefik) that handles HTTPS automatically. The install itself takes a few minutes, and the result is a fully private instance you own — with workflows and unlimited executions, which makes the savings vs. Zapier immediate and substantial.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "intermediate",
      beginner:
        "On my setup n8n runs on the main Hetzner VPS alongside the rest of the agent network. On yours, even the smallest Hetzner or DigitalOcean VPS (around €5/month) is enough to run n8n + Postgres. The compose.yml is under 30 lines, the command to bring everything up is docker compose up -d, and Caddy takes care of a free HTTPS certificate automatically from Let's Encrypt. Within half an hour you have a professional automation platform, and the savings vs. Zapier Starter ($20/month) pay off in the very first week.",
      content: [
        "Official image: n8nio/n8n — the stable release is built on Node.js 20 and ships with all 1000+ nodes by default — nothing extra to install",
        "PostgreSQL is recommended over SQLite once you have more than 5 active workflows — SQLite stumbles on concurrent executions, Postgres handles it easily",
        "Important env vars: N8N_HOST (your domain), N8N_PROTOCOL=https, WEBHOOK_URL (public address for webhooks), and DB_POSTGRESDB_* (database connection details)",
        "Volumes: the /home/node/.n8n directory stores encrypted credentials and local files — you must map it to a volume, otherwise everything vanishes on restart",
        "Reverse proxy: Caddy with auto-HTTPS is the simplest (a one-line config); Traefik with Docker labels is a good alternative if you already run that stack",
        "Backup: daily pg_dump of the DB + weekly JSON export of workflows. Newer n8n versions include git sync — recommended to connect to a private repo",
      ],
      tips: [
        "Set N8N_ENCRYPTION_KEY up front and store it somewhere safe — if it ever changes, all encrypted credentials get wiped and you'll have to re-enter everything",
        "Allocate at least 1GB RAM and 10GB disk. Execution history and data pile up fast — especially if you have workflows running every 5 minutes",
        "Hetzner, DigitalOcean, and Railway all offer one-click n8n images — a single click and you're live, no manual compose.yml wrangling",
      ],
      codeExample: {
        label: "docker-compose.yml for n8n",
        code: "version: '3.8'\nservices:\n  postgres:\n    image: postgres:16-alpine\n    restart: unless-stopped\n    environment:\n      POSTGRES_DB: n8n\n      POSTGRES_USER: n8n\n      POSTGRES_PASSWORD: ${DB_PASSWORD}\n    volumes: ['./data/postgres:/var/lib/postgresql/data']\n  n8n:\n    image: n8nio/n8n:latest\n    restart: unless-stopped\n    ports: ['5678:5678']\n    environment:\n      DB_TYPE: postgresdb\n      DB_POSTGRESDB_HOST: postgres\n      DB_POSTGRESDB_DATABASE: n8n\n      DB_POSTGRESDB_USER: n8n\n      DB_POSTGRESDB_PASSWORD: ${DB_PASSWORD}\n      N8N_ENCRYPTION_KEY: ${ENCRYPTION_KEY}\n      WEBHOOK_URL: https://n8n.yourdomain.com\n    depends_on: [postgres]\n    volumes: ['./data/n8n:/home/node/.n8n']",
      },
    },
    {
      id: "nodes",
      icon: Plug,
      title: "Key nodes and triggers",
      subtitle: "20 nodes that solve 90% of the tasks",
      description:
        "Even though n8n ships with over 1000 nodes, the truth is that across all my workflows — 25 of them in production — roughly 20 core nodes recur and solve 90% of the work. Knowing these tools deeply is the difference between building a workflow in half an hour versus a full day of frustration.",
      color: "from-purple-600 to-violet-500",
      difficulty: "intermediate",
      content: [
        "Triggers (entry points): Webhook (receives HTTP requests), Cron (on a schedule — 'every day at 09:00'), Manual (run by hand for testing), Gmail Trigger (new incoming email), Telegram Trigger (new bot message), RSS (new post in a feed), IMAP (generic mail server)",
        "HTTP Request — the most important node of them all: sends to external APIs via POST/GET/PUT, supports every auth type (Bearer, Basic, OAuth2, API Key), auto-retries on failures, and has built-in pagination",
        "Logic and flow: IF (classic if/else condition), Switch (like switch/case — route to 5+ branches), Merge (join two data streams), Split In Batches (process a list in small chunks), Loop (repeat an action)",
        "Data transformation: Set (define new JSON fields), Code (write inline JavaScript or Python — the rescue tool that replaces 10 fancy nodes), Function, Item Lists",
        "Email integrations: Gmail, Outlook, generic SMTP, Mailchimp, Resend — I send everything via Resend because it has a clean API and is free up to 3000 emails/month",
        "Messaging integrations: Slack, Discord, Telegram — there's an unofficial node for WhatsApp, but I skip it and send through [Kami](/en/guide/kami) via HTTP Request",
        "Databases: Postgres, MySQL, MongoDB, Airtable, Google Sheets, Notion — the convenience of Google Sheets as a 'small DB' is priceless for tiny projects",
        "AI: OpenAI, Anthropic ([Claude](/en/claude-code)), [Ollama](/en/guide/ollama) (free local models), LangChain, HuggingFace — chaining LLMs together became instantly natural",
        "Vector databases: [Qdrant](/en/guide/qdrant), Pinecone, Weaviate, Supabase Vector — for semantic search and agent memory",
      ],
      tips: [
        "HTTP Request supports 'Import cURL' — paste a curl command you copied from the browser's DevTools and n8n auto-fills every field (URL, headers, body, auth). Life-changing",
        "Code node supports async/await and importing npm packages (from a curated allowlist) — when you need logic no ready-made node covers, this is the universal solver",
        "Wait node — pause 5 seconds between calls to an API with a 12-req/min rate limit. Essential when working with OpenAI, Gmail, and Resend to avoid being blocked",
      ],
    },
    {
      id: "agents",
      icon: Network,
      title: "Wiring n8n into the agent network",
      subtitle: "n8n + Delegator + Kami + CrewAI",
      description:
        "This is where n8n's real power on my stack kicks in: it isn't just running by itself — it conducts an orchestra of AI agents. Through HTTP Request nodes, a single workflow can call [Kami](/en/guide/kami) to send a WhatsApp message, [CrewAI](/en/guide/crewai) to generate a Hebrew blog post, and the [Delegator](/en/guide/delegator) to orchestrate a full email campaign — all in one visual flow, with no new backend.",
      color: "from-indigo-600 to-blue-500",
      difficulty: "advanced",
      content: [
        "Sending WhatsApp via [Kami](/en/guide/kami): HTTP Request with POST to hub.eladjak.com/kami/whatsapp and body { to, text } — Kami hides all the Green API and Meta API complexity behind the scenes",
        "Generating content via [CrewAI](/en/guide/crewai): POST to /crews/blog_he/run and then poll /crews/runs/{id} every 10 seconds until the status is completed. The result comes back as JSON ready to publish",
        "Email campaigns via the [Delegator](/en/guide/delegator): POST to /campaign-email — the Delegator handles Resend rate limits, watches credits, and automatically pauses on Shabbat or holidays via the Israeli calendar gate",
        "Sending SMS: POST to the Delegator's /sms/send (Twilio behind it) — arrives as a regular SMS within seconds, good for verifications and urgent alerts",
        "Semantic search in [Qdrant](/en/guide/qdrant): HTTP Request to /collections/kami_memory/points/search with an embedding of the question — lets you gather relevant context before calling an LLM",
        "Scheduled content: Cron every morning → CrewAI (yt_to_blog_he turns a YouTube video into a Hebrew post) → n8n formats to HTML → Delegator publishes to the blog and schedules the social posts",
      ],
      tips: [
        "The Webhook node in n8n can receive events from external services — point the webhooks from Postiz, Resend, and Green API to n8n, and decide there what to do with each event",
        "Store the hub.eladjak.com API keys in encrypted n8n credentials rather than inline in an expression — then if you rotate a key, you update in one spot instead of hunting across 20 workflows",
        "Debug workflows via the 'Executions' tab — it shows every run with the full data path between nodes, including detailed errors. A superb debugging tool",
      ],
      codeExample: {
        label: "Code node — sending to Kami from n8n",
        code: "// n8n Code node (JavaScript)\nconst msg = items[0].json.message;\nconst res = await $http.request({\n  method: 'POST',\n  url: 'https://hub.eladjak.com/kami/whatsapp',\n  headers: { 'X-API-Key': $env.KAMI_KEY },\n  body: { to: '972525427474', text: msg },\n});\nreturn [{ json: { sent: res.ok, messageId: res.data.id } }];",
      },
    },
    {
      id: "advanced",
      icon: Layers,
      title: "Advanced logic and expressions",
      subtitle: "IF/Switch, loops, error handling, sub-workflows",
      description:
        "Once workflows get serious (more than 10 nodes, failure handling, loops over large lists), the basics stop being enough — and that's where n8n's advanced capabilities come in. Inline JavaScript expressions, loops over batches, sub-workflows for code re-use, and error branches that handle failures gracefully. These are the tools that turn n8n from 'open-source Zapier' into a serious automation conductor.",
      color: "from-amber-600 to-orange-500",
      difficulty: "advanced",
      content: [
        "Expressions — inline JavaScript inside any field of any node. Example: {{ $json.name.split(' ')[0] }} extracts the first name. Removes the need for a separate Set node for every tiny transformation",
        "Built-in time helpers: $now and $today use the Luxon library. For example {{ $now.minus({ days: 7 }).toISO() }} returns the date from a week ago in ISO — handy for APIs that require time ranges",
        "Split In Batches — process an array of 1000 items in batches of 10, preventing memory crashes and helping you respect the rate limits of the API you're hammering",
        "Wait node — pause by seconds/minutes/hours, or until a specific date. Crucial for subtle timing (like 'send a reminder 3 days before the event')",
        "Error Workflow — a separate workflow that runs automatically when a primary workflow fails. Mine sends a WhatsApp alert to me via [Kami](/en/guide/kami) with the failure details",
        "Sub-workflow — one workflow calling another (via the Execute Workflow node). Enables code re-use: for example a 'send alert' workflow called from 10 other workflows",
        "Pinned Data + Test Workflow — 'pin' the data from a successful run and then execute only the second half of the workflow against that frozen data. Massive time savings when debugging",
      ],
      tips: [
        "In every Code node, wrap your code in try/catch and return { error: message } inside the item instead of throwing — then the workflow continues and you handle the failure in an IF downstream",
        "In HTTP Request, enable 'On Error: Continue (with error output)' — the error flows out the node's second output, so you can route it into an IF or keep going without crashing",
        "For APIs with a low rate limit, create 2-3 credential copies (each with a different API key) and spread them across workflows. Multiplies your capacity without paying more",
      ],
    },
    {
      id: "production",
      icon: Database,
      title: "n8n in production — what you must take care of",
      subtitle: "backups, monitoring, scaling, security",
      description:
        "Once workflows start running critical business processes (invoices, customer reminders, content publishing), n8n stops being a 'nice-to-have' and becomes critical infrastructure. An hour of downtime = customers don't get messages, campaigns don't launch, money leaks away. Here's the checklist to tick off before you get there.",
      color: "from-rose-600 to-pink-500",
      difficulty: "advanced",
      content: [
        "Backups — an automated daily pg_dump of the database uploaded to S3 or Backblaze (cheaper), plus a weekly JSON export of workflows. Full restore is possible within minutes",
        "Monitoring — Uptime Kuma hits n8n's /healthz every minute. When it goes down, an immediate alert fires to Telegram or WhatsApp via [Kami](/en/guide/kami) — you find out about an outage before an angry customer does",
        "Execution Cleanup — set N8N_EXECUTIONS_DATA_PRUNE=true and EXECUTIONS_DATA_MAX_AGE=168 (7 days). Without this, the DB bloats within weeks and the history bogs the system down",
        "Workers — at scale, n8n supports queue mode with Redis and separate workers. The UI stays fast and executions run in parallel across multiple processes",
        "Access Control — always keep Users + API Keys enabled. Never expose the public UI without SSO or a VPN — it holds the API keys to all your services, a single point of compromise",
        "Version Control — export workflows to a private git repo (newer versions include a built-in Git sync node). Gives you history, code review, and real rollback if you break something",
        "Secrets — always via n8n credentials, never as a raw API key inside an expression. Credentials are encrypted at rest; expressions appear in plain text on every run",
      ],
      tips: [
        "n8n Cloud makes sense only below 20 active workflows. Above that, a self-hosted VPS saves hundreds of dollars in the first year — before you even factor in full data ownership",
        "An Error Workflow with WhatsApp alerts via [Kami](/en/guide/kami) = the biggest peace of mind in history. When a major workflow fails at 3am, you know within seconds",
        "Double-check the N8N_SECURE_COOKIE=true and N8N_HIRING_COOKIE_PATH settings — easy to forget, and important for security especially when the instance sits behind a reverse proxy",
      ],
    },
  ],
  resources: [
    {
      title: "n8n.io",
      description: "Official site + detailed docs + community",
      href: "https://n8n.io",
      icon: ExternalLink,
    },
    {
      title: "n8n GitHub",
      description: "Open source + release notes + contributions",
      href: "https://github.com/n8n-io/n8n",
      icon: Github,
    },
    {
      title: "n8n Workflows Library",
      description: "Community library of ready-made workflows",
      href: "https://n8n.io/workflows",
      icon: ExternalLink,
    },
    {
      title: "n8n + OpenAI Playlist",
      description: "Videos from the team itself — practical AI workflows",
      href: "https://www.youtube.com/@n8n-io",
      icon: ExternalLink,
    },
    {
      title: "Webhook.site",
      description: "A tool for testing webhooks before wiring them to n8n",
      href: "https://webhook.site",
      icon: ExternalLink,
    },
    {
      title: "The Delegator guide",
      description: "The API gateway connecting to my n8n workflows",
      href: "/en/guide/delegator",
      icon: BookOpen,
    },
  ],
  ctaTitle: "Replace Zapier in 30 minutes",
  ctaSub:
    "n8n runs on the smallest VPS, handles infinite executions, and enables the kind of logic Zapier charges a fortune for.",
  primaryCta: {
    label: "Official n8n",
    href: "https://n8n.io",
    icon: ExternalLink,
  },
  secondaryCta: {
    label: "Talk about your automation stack",
    href: "https://wa.me/972525427474",
    icon: Mail,
  },
  authorBio:
    "n8n is the automation engine that ties the whole network together — the business cron jobs, the glue between AI agents and generic tools, and the control surface for triggers on external events. This guide lays out the common patterns (webhook→agent→publish, scheduled content, error workflows) so you can turn n8n from an external tool into the practical backbone of your stack.",
};
