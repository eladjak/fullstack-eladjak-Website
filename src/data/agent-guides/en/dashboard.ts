import {
  LayoutDashboard,
  Monitor,
  Gauge,
  Kanban,
  Github,
  ExternalLink,
  BookOpen,
  Code2,
  Rocket,
  Lightbulb,
  Zap,
  Users,
  Mail,
  Eye,
  Sparkles,
  Settings,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const dashboardGuideEn: AgentGuideData = {
  slug: "dashboard",
  agentName: "Dashboard",
  agentNameHe: "Dashboard — Mission Control for Your Network",
  logoImage: "/images/guide-logos/dashboard-logo.png",
  tagline: "One UI, 12 tabs, every agent at a glance",
  heroDescription:
    "The Dashboard is a local self-hosted Node.js app (plain HTTP server, no framework) running on port 3456, with a dedicated WebSocket server on 3457 backed by the `ws` library. Its data sources: the hub.eladjak.com REST API (via the [Delegator](/en/guide/delegator)), [Qdrant](/en/guide/qdrant), local bridge files, PowerShell status scripts, and file-system watchers. It exposes 12 tabs — Mission Control, Agents, Projects, CrewAI, Costs, Health, Logs, and more. For me it's the main screen of my AI CEO setup; for you it can be the control panel for a home lab, a small SaaS ops team, an agent network, or a DevTooling squad. You just swap the data sources for your own adapters.",
  badgeText: "2026 · Self-hosted Mission Control · Hands-on Guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/dashboard",
  heroBgImage: "/images/guides/guide-dashboard-hero.jpg",
  videoUrl: "/videos/guides/dashboard.mp4",
  stats: [
    { label: "Tabs", value: "12" },
    { label: "WebSocket updates", value: "5s" },
    { label: "Cost", value: "Free" },
    { label: "Data layers", value: "live" },
  ],
  paradigmTitle: "A UI that understands your business",
  paradigmSub:
    "Grafana and Linear are great for the generic 90%. This dashboard is the spirit of the 10% that is uniquely yours.",
  paradigmShifts: [
    {
      before: "5 tabs open: Grafana, Linear, GitHub, UptimeKuma, Gmail",
      after: "One tab, updating in real time, shaped around your exact workflow",
      icon: LayoutDashboard,
    },
    {
      before: "Datadog from $15/host/mo + Retool from $10/user/mo + Linear Business from $10/user/mo = tens-to-hundreds of dollars a month",
      after: "A local Node server — $0",
      icon: Settings,
    },
    {
      before: "WhatsApp screenshots to the family ('look what I built')",
      after: "A live URL with an iframe of the dashboard — the whole team sees it",
      icon: Eye,
    },
    {
      before: "Want a new feature? Wait for the vendor's next release",
      after: "Open server.js, add an endpoint plus a tab — done",
      icon: Zap,
    },
  ],
  whoIsThisFor: [
    {
      title: "Solo operators with a stack of tools",
      description:
        "If you juggle 5+ services and want to see them in one place, this is the cleanest fit.",
      icon: Rocket,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Utility-over-polish people",
      description:
        "This dashboard isn't pretty — it's useful. If that's the trade-off you want, dive in.",
      icon: Gauge,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Developers who want custom UI",
      description:
        "A Node HTTP server plus plain HTML and vanilla JS. Simple, forkable, easy to edit.",
      icon: Code2,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Small teams",
      description:
        "Two or three operators collaborating? The Dashboard makes a great shared mission control.",
      icon: Users,
      color: "from-pink-500 to-rose-500",
    },
  ],
  toc: [
    { id: "what-is", label: "What it is" },
    { id: "tabs", label: "The 12 tabs" },
    { id: "ws", label: "WebSocket" },
    { id: "proxy", label: "Proxy" },
    { id: "kanban", label: "Kanban" },
    { id: "advanced", label: "Advanced" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Monitor,
      title: "What is the Dashboard?",
      subtitle: "A Node HTTP server on Windows, with a UI that plugs into everything",
      description:
        "The Dashboard is a private website that runs on my own machine — a kind of Mission Control that gathers all my agents, projects, costs, and system health in one place. Under the hood it's a plain Node.js server (the language behind countless web servers) with no heavy framework — no Next.js, no Express, just about 3,000 lines of direct code. That's the beauty of it: I can add a new tab or tweak something in minutes. It's a dashboard that speaks the language of your business, instead of stacking tens of dollars a month on generic tools like Datadog (from $15/host) or Retool (from $10/user) that never quite match how you actually work.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "beginner",
      beginner:
        "Think of a car dashboard — without the speedometer, engine temp, and fuel gauge you're driving blind. This dashboard is exactly that, but for your agent network and AI stack: a single web page that stays open all day in your browser and shows, at a glance, what [Kami](/en/guide/kami) is doing right now, how [Kaylee](/en/guide/kaylee) feels, how much money is burning on AI calls today, which projects are active, and where something is broken. Instead of jumping between five websites and a dozen tabs — everything lives on one screen.",
      content: [
        "The server runs on port 3456 (a port is a numeric address services use to talk on a machine) for regular HTTP traffic, and on port 3457 for WebSocket — a technology that lets the server push updates to the browser the moment something happens, without the browser having to ask again and again",
        "All the code lives in one file: ~/.claude/dashboard/server.js, about 3,000 readable lines. This isn't a monster project — you can read the whole thing in an hour and understand it end to end",
        "A small start-dashboard.vbs file makes sure the Dashboard launches automatically whenever the machine boots, so it's always there without me starting it manually",
        "The UI itself (what you see in the browser) is a plain index.html with vanilla JavaScript — no React, no Vue, no build step. Change a line, refresh the page, and you see the result instantly",
        "The Dashboard also acts as a proxy (a middleman) that routes requests to three other services: the agent-control-panel on port 5300, [Ollama](/en/guide/ollama) (for running AI models locally) on port 11434, and the Hub running on the cloud server at hub.eladjak.com. Everything ends up under one URL",
        "Data sources: local JSON files (projects-registry.json, which tracks 39 projects; the Kanban file; and so on), live calls to the [Delegator](/en/guide/delegator), and queries into [Qdrant](/en/guide/qdrant) for the agents' semantic memory",
      ],
    },
    {
      id: "tabs",
      icon: LayoutDashboard,
      title: "The 12 tabs — what each one holds",
      subtitle: "Each tab is a world; together they tell the full story",
      description:
        "The Dashboard is split into 12 tabs — each focused on a single topic, and together they cover everything: the big picture, projects, agents, content creation, costs, and health. Some tabs load live data (real-time), some rely on a cache (pre-computed data to save time), and some connect to external services. The goal: critical information is always one click away, with no need to juggle dozens of browser tabs.",
      color: "from-violet-600 to-purple-500",
      difficulty: "intermediate",
      content: [
        "Mission Control — the home tab and overall overview: today's KPIs (tasks completed, costs, messages), red flags for active incidents, and whatever needs my attention right now. This is the tab I keep open most of the time",
        "Kanban — all 39+ of my projects in a single view, grouped by stage (idea, active, maintenance, on-hold, archived). You can drag projects between columns with the mouse, and the change is saved immediately",
        "Image Gen — quick image generation: either via Stable Diffusion Turbo (a model running locally on the GPU) or via Google's Gemini (free and excellent). Useful for posts, site assets, and illustrations",
        "Broadcast — send one message to multiple agents at once (for example, 'everyone — heads up, the API changed'), without opening a separate chat with each of them",
        "Network — the health status of all 10 agents in the network ([Kami](/en/guide/kami), [Kaylee](/en/guide/kaylee), [Hermes](/en/guide/hermes), [Box](/en/guide/box), [CrewAI](/en/guide/crewai), [Adopter](/en/guide/adopter) and more). A green/yellow/red light per agent, with latency and the last heartbeat timestamp",
        "Claude Chat — a local chat UI to talk with [Claude](/en/claude-code), complete with conversation history. Handy when you don't want to open the official app",
        "Qwen Chat — a chat interface for AI models running locally on the machine (Google's gemma3, Alibaba's qwen3) via [Ollama](/en/guide/ollama). Free and offline — your privacy stays intact",
        "Brain — a search interface over my Second Brain: a personal knowledge base ([Qdrant](/en/guide/qdrant) + documents). Ask a question in natural language and get answers by meaning, not by keyword",
        "Costs — a full cost breakdown: how much I spent today, this week, and this month, per agent and per provider (Anthropic, Google, OpenAI). Makes it obvious where the money actually goes",
        "Research — an agentic browser that can navigate websites, fill forms, collect information, and return a summary. Useful for market research, price comparisons, and competitor tracking",
        "Scheduler — scheduling for tasks and agents: 'run X every day at 9:00', 'send a summary once a week'. The Linux world calls this cron — a recurring job",
        "Settings — toggles for integrations (WhatsApp, Telegram, Gmail, etc.), API key management, and configuration backups",
      ],
    },
    {
      id: "ws",
      icon: Zap,
      title: "WebSocket — real-time updates",
      subtitle: "The dashboard talks back when something changes, instead of asking constantly",
      description:
        "WebSocket is a technology that lets the server push updates to the browser the moment they happen — instead of the older approach where the browser had to keep asking 'anything new? anything new?' (a wasteful pattern known as polling). I run a dedicated WebSocket server on port 3457 that streams every live update: when a [Kami](/en/guide/kami) task changes state, when a server goes down, when a new message arrives — the Dashboard refreshes instantly without reloading the page. The result: what you see is always current.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "intermediate",
      content: [
        "The moment you open the Dashboard, the browser automatically connects to ws://localhost:3457 and keeps the connection open as long as the tab is open — much like a phone call that stays on the line",
        "To make sure the connection doesn't go stale, the server sends a heartbeat every 30 seconds — a little 'hello? still here?' — and if the client doesn't respond, the connection is re-established",
        "Event types on the wire: task-updated (a task changed), kanban-move (a project shifted columns), health-status-change (an agent came up/went down), new-message (a fresh message from [Kami](/en/guide/kami) or [Kaylee](/en/guide/kaylee))",
        "When an event arrives, the browser refreshes only the relevant slice of the DOM (the page structure) instead of reloading the entire page. It feels smooth and immediate",
        "In the rare case the WebSocket drops (flaky internet, server crash), there's a graceful fallback: the client automatically switches to polling the server every 10 seconds, so basic data keeps flowing",
        "Adding a new update stream is simple: call broadcast() from the server code when new data is available and the browser picks it up and renders. Easy to extend almost any tab with live updates",
      ],
      codeExample: {
        label: "Broadcast an event",
        code: "// server.js\nfunction broadcast(event) {\n  wsClients.forEach(c => {\n    if (c.readyState === 1) c.send(JSON.stringify(event));\n  });\n}\n\nbroadcast({ type: 'health-status', payload: { agent: 'kami', status: 'pass' }});",
      },
    },
    {
      id: "proxy",
      icon: ExternalLink,
      title: "Proxy — one URL for every service",
      subtitle: "The Dashboard is the front desk of the network — all requests flow through it",
      description:
        "The Dashboard also serves as a reverse proxy — a concept worth understanding. A proxy is simply a middleman: instead of your browser talking directly to a handful of services (each on its own port), it only talks to the Dashboard, which in turn forwards the request to the right service. Why is that useful? It hides internal ports from the outside world, unifies everything under one domain, handles CORS (browser security rules that restrict cross-domain requests), and lets you swap services behind the scenes without the client noticing. In my setup, the Dashboard proxies to three main services.",
      color: "from-amber-600 to-orange-500",
      difficulty: "intermediate",
      content: [
        "Any request hitting /api/panel-proxy/* is forwarded automatically to the agent-control-panel on port 5300 — the panel that manages local agents, their settings, and configuration",
        "Requests to /api/ollama-proxy/* go to [Ollama](/en/guide/ollama) on port 11434 — the platform for running local AI models (gemma3, qwen3, llama). That's how you chat with those models straight from the Dashboard",
        "Requests to /api/hub-proxy/* are routed to the public hub.eladjak.com — the VPS (a virtual server in the cloud) that hosts [Kami](/en/guide/kami), [Kaylee](/en/guide/kaylee), and the other agents. This is what wires the local Dashboard into the distributed network",
        "Each request has an appropriate timeout (max wait time): 5 seconds for quick status calls, up to 120 seconds for heavy operations like image generation or long search queries",
        "The Dashboard automatically injects CORS headers — which is what lets the browser call these services through it without hitting security errors. You don't have to touch any of it",
        "If a service is down, the proxy doesn't spit back a scary 500 error — it returns a clean JSON payload like {ok:false, error:'service offline'}, so the UI can show a friendly message instead of crashing",
      ],
    },
    {
      id: "kanban",
      icon: Kanban,
      title: "Kanban — 39 projects in one view",
      subtitle: "The war room for everything I've built, am building, or dream of building",
      description:
        "This might be the single most important tab in my Dashboard. Kanban (Japanese for 'visual board') is a way to manage tasks or projects in columns by stage — exactly like Trello or Linear, except this one is mine, local, and free. I'm juggling 39+ active projects at any given time: client work, websites, AI agents, internal tools, and ideas that haven't shipped yet. Without a single place that aggregates all of them, I'd simply forget half of them. For you this could be a team task board, a client tracker, or even a reading list — the underlying structure is the same.",
      color: "from-pink-600 to-rose-500",
      difficulty: "intermediate",
      content: [
        "The source of truth for everything is a plain JSON file called projects-registry.json — each project with its name, description, status, and metadata. Every edit is saved there, and the file is trivial to back up",
        "Projects are split across 5 columns by stage: ideas (not started), active (in progress), maintenance (shipped and being maintained), on-hold (paused), archived (historical)",
        "You can drag a project card between columns with the mouse — movement is handled by the Shuffle.js library, and the change is saved both locally in the browser (localStorage) and pushed to the server so the registry stays in sync",
        "Every card shows the essentials: project name, a short description, the tech stack (React, Next.js, etc.), when I last touched it, and a link to the deploy if it's live",
        "You can filter: by technology (show me only the Next.js projects), by status, or by age (what haven't I touched in a month?). This is the cleanup key — it surfaces the projects you've abandoned and forces a decision: close or revive",
        "Each card carries quick actions: open directly in VS Code (the editor), open the deploy URL in a new tab, and copy the folder path — so in seconds I can be working on any project",
      ],
      tips: [
        "First move when you start: just add every one of your projects to the registry, even the ones that are still just ideas. The moment they're in front of you, the full picture snaps into focus, and the first conclusion is usually 'wow, I have way more open loops than I thought'",
        "Set a rule for yourself: before starting a new project, check the board for something similar that's already waiting. This view helps you fight the eternal temptation to start yet another project instead of finishing what's already in flight",
      ],
    },
    {
      id: "advanced",
      icon: Sparkles,
      title: "Add a new tab — 50 lines and you have your own feature",
      subtitle: "The big win of a simple workshop: change, run, done",
      description:
        "My design philosophy for the Dashboard is deliberate minimalism: two files only — server.js on the server, index.html on the client — no build step (no compilation phase), no hot-reload, no dependencies to update every week. That's an intentional choice: less sophistication = less friction. Want to add a feature? Thirty minutes and it's running. This is exactly the paradigm that saves you from stacking Datadog/Retool/Linear subscriptions: you control your tool. For a marketable, production-grade product I'd reach for Next.js 14 or 15 (14 is the current LTS) — but for a personal mission control? Simplicity wins.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      content: [
        "Step 1 — add an endpoint (a URL the server responds to) in server.js: a plain if (req.url === '/api/newtab') check that returns the data you want to show (a service call, a file read, a computation — whatever fits)",
        "Step 2 — add an empty container (a div — a basic HTML element) in index.html with id='tab-newtab'. That's the stage your new tab will render on",
        "Step 3 — add a button to the nav that switches to the new tab: <button onclick=\"showTab('newtab')\">My tab</button>. The showTab function already handles hiding the others",
        "Step 4 — when the tab loads, call the server via fetch('/api/newtab'), receive the data, and render it however you like (table, chart, cards)",
        "If you want real-time updates, call broadcast() in server.js when new data lands, and add a client-side handler (an event handler) that receives the message and updates the screen",
        "That's it. No build, no deploy, no CI. Save the file, hit refresh, and your feature is live. This is exactly the approach that lets you sharpen the tool around your real needs, with zero friction",
      ],
      tips: [
        "This style is perfect for the personal-dashboard use case: simple code, fast iteration, zero magic. If you scale up to a large team sharing the same tool, it's worth graduating to Next.js with proper state management — but until then, simplicity wins every single time",
        "If you want to borrow parts of this Dashboard for your own project — the code is open on my GitHub. Fork it, adapt it to your needs, and in an hour or two you'll have your own control panel",
      ],
    },
  ],
  resources: [
    {
      title: "GitHub — my Dashboard",
      description: "Fork-able — make it yours",
      href: "https://github.com/eladjak",
      icon: Github,
    },
    {
      title: "WebSocket on Node",
      description: "The ws library — foundation for real-time updates",
      href: "https://github.com/websockets/ws",
      icon: ExternalLink,
    },
    {
      title: "Shuffle.js",
      description: "For Kanban drag-and-drop",
      href: "https://vestride.github.io/Shuffle/",
      icon: ExternalLink,
    },
    {
      title: "Delegator guide",
      description: "The Dashboard proxies to it",
      href: "/en/guide/delegator",
      icon: BookOpen,
    },
    {
      title: "Kaylee guide",
      description: "The Dashboard surfaces her status",
      href: "/en/guide/kaylee",
      icon: BookOpen,
    },
    {
      title: "Book a consultation",
      description: "Want a dashboard tailored to you?",
      href: "/en/contact",
      icon: Mail,
    },
  ],
  ctaTitle: "Your needs are different — shape the UI around them",
  ctaSub:
    "Vanilla JS, plain Node, tailored to your workflow in an hour. Open source — copy it and modify.",
  primaryCta: {
    label: "GitHub",
    href: "https://github.com/eladjak",
    icon: Github,
  },
  secondaryCta: {
    label: "Book a consultation",
    href: "/en/contact",
    icon: Users,
  },
  authorBio:
    "The Dashboard is the central UI for my agent network — a single pane of glass that aggregates status, costs, cron jobs, and logs. This guide walks through the architecture so you can build your own control panel on top of whatever data sources you have (REST, WebSocket, file watchers). The result: a UI that fits your workflow, instead of stacking yet another monthly SaaS subscription (Datadog, Retool, Linear and friends).",
};
