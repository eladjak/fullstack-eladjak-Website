import {
  Network,
  Brain,
  Layers,
  Github,
  ExternalLink,
  BookOpen,
  Map,
  Lightbulb,
  Compass,
  Users,
  Mail,
  Cpu,
  Package,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const understandAnythingGuideEn: AgentGuideData = {
  slug: "understand-anything",
  agentName: "Understand-Anything",
  agentNameHe: "Understand-Anything — A Living Map for Any Codebase",
  category: "infra",
  logoImage: "/images/guide-logos/understand-anything-logo.png",
  tagline: "Your AI finally knows your whole codebase — not just what you showed it",
  heroDescription:
    "Understand-Anything is a free, open-source tool (from Egonex-AI) that draws you a map of a whole software project — which files it has, what each one does, and who's connected to whom. Here's the problem it solves: an AI assistant writes great code, but it doesn't know your project. Every conversation it starts from scratch, sees only what you showed it, and has no idea that a small change in one file might break five others. This map gives it (and you) the full picture before you touch anything. And the best part — it all runs on the AI you already have inside [Claude Code](/en/claude-code), with no external key and no extra service to pay for. I (Elad) use it to understand how a system is built before I go in to change something. For you, it's great for getting up to speed fast on a new project, or making sense of old code nobody remembers anymore.",
  badgeText: "2026 · Code Intelligence · Practical Guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/understand-anything",
  heroBgImage: "/images/guides/guide-understand-anything-hero.jpg",
  stats: [
    { label: "API keys required", value: "0" },
    { label: "projects I mapped", value: "2" },
    { label: "cost", value: "free" },
    { label: "plugin for", value: "Claude Code" },
  ],
  paradigmTitle: "From 'AI that writes code' to 'AI that knows your code'",
  paradigmSub:
    "A regular AI assistant starts every conversation from scratch. Understand-Anything gives it a permanent map of the project.",
  paradigmShifts: [
    {
      before: "'The AI doesn't know which file connects to which'",
      after: "A map showing who's connected to whom across the whole project, up front",
      icon: Network,
    },
    {
      before: "A whole day to understand a new project",
      after: "An automatic guided tour that walks you through the code step by step",
      icon: Compass,
    },
    {
      before: "Documentation that's stale the moment you write it",
      after: "A map built from the code itself, so it's always up to date",
      icon: Map,
    },
    {
      before: "A tool that charges for every run",
      after: "Runs on the AI you already have — no extra cost",
      icon: Package,
    },
  ],
  whoIsThisFor: [
    {
      title: "Onboarding to a new project",
      description:
        "Joining a team or inheriting someone else's code — and needing the big picture fast.",
      icon: Compass,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Maintaining a large system",
      description:
        "Before fixing a bug or upgrading — see who depends on whom so you don't break something else.",
      icon: Network,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Managers and product owners",
      description:
        "Want to gauge how complex a system you built (or are considering buying) really is — without reading a line of code.",
      icon: Layers,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Working with AI assistants",
      description:
        "Give [Claude Code](/en/claude-code) a permanent map of the project, so its answers fit your code exactly.",
      icon: Brain,
      color: "from-pink-500 to-rose-500",
    },
  ],
  toc: [
    { id: "what-is", label: "What it is" },
    { id: "the-problem", label: "The problem" },
    { id: "how-it-works", label: "How it works" },
    { id: "knowledge-graph", label: "Knowledge graph" },
    { id: "when-to-use", label: "When to use" },
    { id: "cost-aware", label: "Cost & tips" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Map,
      title: "What is Understand-Anything? A living map of your code",
      subtitle: "An open-source tool that turns a whole project into a who-connects-to-whom map",
      description:
        "Understand-Anything scans a software project and builds a map from it — an orderly picture of every file in the project, what each one does, and who's connected to whom. Instead of opening dozens of files one by one to figure out how it all works, you get the big picture in a single glance. It's built as a plugin (a small add-on that plugs into an existing tool) for [Claude Code](/en/claude-code), so it fits right into the tool you already use.",
      color: "from-sky-600 to-cyan-500",
      difficulty: "beginner",
      beginner:
        "Imagine being handed a huge building with no signs and no plan, and being told 'start working.' That's how a developer — or an AI assistant — feels stepping into a large project they don't know. Understand-Anything is like the architect who shows up, walks the whole building, and draws a clear plan: where the entrance is, how the floors connect, and which pipe leads where. Now you can work without fearing that every change will knock down a wall somewhere else.",
      content: [
        "Scans every file in the project and figures out on its own which programming language each is written in (JavaScript, Python and more)",
        "Draws a map showing which files and functions exist and who's connected to whom — for example 'this file uses that one'",
        "Sorts the files into groups by their role — one group that stores data, one that handles logic, one that shows the screen — so you understand the overall structure",
        "Builds a 'guided tour' that walks you through the code step by step: where to start and in what order, just like a guide who knows the terrain",
        "Reads the code in depth (not just searching for words in text), so the map it produces is accurate and trustworthy",
        "Saves everything in a single file inside the project (called knowledge-graph.json) — you can keep it alongside the code so the whole team shares the same map",
      ],
      tips: [
        "Installing is simple: add the plugin through [Claude Code](/en/claude-code), and that's it — you're ready to go",
        "The map is just one file. If you keep it next to the code, everyone who downloads the project gets the map too — without re-running anything",
      ],
      codeExample: {
        label: "Install and first run",
        code: "# Add the store and install the plugin\n/plugin marketplace add Egonex-AI/Understand-Anything\n/plugin install understand-anything\n\n# Run on a single folder to keep cost down\n/understand src/stores\n\n# Result: a map file inside the project\n# <project>/.understand-anything/knowledge-graph.json",
      },
    },
    {
      id: "the-problem",
      icon: Brain,
      title: "The problem — 'the AI doesn't know your code'",
      subtitle: "Why a brilliant AI assistant still misses the big picture",
      description:
        "This is maybe the most important point in the guide. The AI assistants that write code (like [Claude](/en/claude-code) or ChatGPT) are excellent at writing a single snippet of code — but they don't remember your project between conversations, and they can't see all of it at once. When you ask for a change, the AI sees only what you showed it right then — not all the other files that might depend on the one it's about to change. The result: a change that looks correct, but breaks something elsewhere.",
      color: "from-rose-600 to-red-500",
      difficulty: "beginner",
      beginner:
        "Think of a brilliant handyman who comes to your house fresh every time — and never remembers his previous visits. He can fix a faucet beautifully, but he doesn't know this pipe connects to the boiler upstairs, because nobody explained the building's layout to him. So he fixes the faucet... and unintentionally causes a flood upstairs. An AI assistant without a map of the code is exactly that: real talent, zero familiarity with the whole. Understand-Anything hands it the building's map up front.",
      content: [
        "An AI assistant is great at writing a single snippet of code, but it has no full picture of the whole project",
        "It can only 'read' a limited amount of code at a time — you can't show it hundreds of files at once, so it always sees just a small slice",
        "Without a map, the AI guesses how the files are connected — and sometimes gets it wrong: it changes one function without knowing five other places use it",
        "The bigger the project, the worse this gets: precisely in large systems, where it's hard to remember everything, the AI is most 'blind' to the overall picture",
        "Documentation written by hand goes stale fast — nobody updates it after every change, so you can't rely on it",
        "Understand-Anything solves this: it builds the map from the code itself, so it always reflects the real state of things",
      ],
      tips: [
        "The map doesn't replace the developer's judgment — it gives the AI (and you) a reliable starting point before you begin changing code",
        "Ask [Claude Code](/en/claude-code) to read the map before it tackles a task — that way its answers fit your project much better",
      ],
    },
    {
      id: "how-it-works",
      icon: Cpu,
      title: "How it works — facts first, understanding second",
      subtitle: "One part measures dry facts, one part adds the explanation — all on your AI",
      description:
        "Understand-Anything works in two complementary stages. First a quick pass gathers dry facts from the code: which files exist, which functions, and who's connected to whom. Then the AI steps in and adds the understanding — it summarizes what each part does, sorts the files into groups, and builds the guided tour. The key point: all the AI's thinking runs on the model already active inside [Claude Code](/en/claude-code), not on a paid external service.",
      color: "from-violet-600 to-purple-500",
      difficulty: "intermediate",
      beginner:
        "It's like building a map of a country. First you send a drone to photograph every road precisely — that's the dry-facts part. Then an expert arrives and adds the explanation: 'this is the industrial center', 'this highway connects the two big cities'. The two stages together turn a dry set of points into a map that actually tells a story — which is exactly what Understand-Anything does with your code.",
      content: [
        "Stage 1 — scan: goes over every file in the project and detects which language each is written in. Fast, runs in seconds, no AI",
        "Stage 2 — structure: reads each file and finds its functions and who-calls-whom. Precise and fixed, also no AI",
        "Stage 3 — understanding: here the AI steps in, summarizes what each file does, and also spots connections you don't see at first glance",
        "Stage 4 — sorting and tour: the AI groups the files logically and builds a guided tour explaining where to start",
        "Stage 5 — assembly and check: all the parts merge into a single file, and an automatic check makes sure the map is sound with no contradictions",
        "The main thing: the AI doing the work is the one already running inside [Claude Code](/en/claude-code) — with no dependence on an external service or a paid key. That means zero extra cost and fewer things that can break",
      ],
      tips: [
        "The first two stages (the scan and the structure) are cheap and fast. The part that 'costs' time is the AI — so run it on a focused folder, not the whole project (more below)",
        "The tool never touches your code — it only writes to its own separate folder. Safe to run even on an active project",
      ],
      codeExample: {
        label: "Output structure inside the project folder",
        code: "<project>/.understand-anything/\n  knowledge-graph.json   # the full map: nodes, edges, layers, tour\n  meta.json              # metadata for future (incremental) runs\n  .understandignore      # which folders to skip (derived from .gitignore)\n  intermediate/          # intermediate artifacts for cheap reuse",
      },
    },
    {
      id: "knowledge-graph",
      icon: Network,
      title: "What's actually in the map",
      subtitle: "Dots, lines, groups and a tour — all in one simple file",
      description:
        "The heart of Understand-Anything is the map itself (its technical name is a 'knowledge graph'). It's made of dots and lines: each dot is a file or a function, and each line shows a connection — for example 'this file uses that one'. On top of that, the map sorts the dots into groups by role, and adds a tour that explains the most logical order for understanding the system.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "intermediate",
      beginner:
        "This map is basically a drawing of 'who knows whom' — just like a friends diagram on a social network: each person is a dot, and each friendship is a line connecting two dots. Here, instead of people there are files, and instead of friendships there are 'who uses whom' connections. The moment you see the drawing, you suddenly understand who the central character is — which file everyone leans on — and what you can change safely.",
      content: [
        "Dot — a file or a function. Each dot has a name and a short description of what it does",
        "Line — a connection between two dots, showing who uses whom or who depends on whom",
        "Group — a set of files with a shared role, for example 'the files that store data' or 'the files that show the screen'. This is how you see the structure at a glance",
        "Tour — a recommended list of steps for reading the code, so a new developer (or [Claude Code](/en/claude-code)) knows where to start",
        "Everything is saved in one simple file — you can keep it alongside the code, so the whole team shares the same up-to-date map",
        "If you run on just one folder, some files will show up as 'disconnected'. That's not a defect — just a sign that their connections lead outside the folder you chose. A broader run will connect them too",
      ],
      tips: [
        "A file that many things lean on is usually the heart of the system — that's where to be especially careful before changes, and the map reveals it instantly",
        "You can combine the map with [Qdrant](/en/guide/qdrant): the two are complementary — Qdrant remembers the meaning of text, and Understand-Anything maps the structure of code. Each solves a different problem",
      ],
      codeExample: {
        label: "A snippet from knowledge-graph.json",
        code: '{\n  "nodes": [\n    { "id": "xp-store.ts", "type": "file", "summary": "gamification core: XP and levels" },\n    { "id": "badge-store.ts", "type": "file", "summary": "manages badges and unlocking" }\n  ],\n  "edges": [\n    { "from": "xp-store.ts", "to": "badge-store.ts", "type": "depends_on" }\n  ],\n  "layers": [\n    { "name": "Client State", "nodes": ["xp-store.ts", "badge-store.ts"] }\n  ]\n}',
      },
    },
    {
      id: "when-to-use",
      icon: Compass,
      title: "When to use it — and when not so much",
      subtitle: "The right tool for entering a project, not for every tiny task",
      description:
        "Understand-Anything is worth the most when you need to understand a whole system, or a large, complex part of one. It's less suited to small tasks where it's already obvious what's going on. Here's the distinction — when it's worth running and when it's just a waste.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "intermediate",
      beginner:
        "It's like hiring a land surveyor: when you're buying a whole plot and want to understand its boundaries — worth every penny. When you just want to hang a picture on a wall — you don't need a surveyor. Same here: for entering a large project or planning a significant change, the map is worth its weight in gold; for fixing one line you already understand, just make the fix.",
      content: [
        "Getting up to speed on a new project — the classic case. Instead of wasting hours jumping between files, you get a guided tour that explains the structure fast",
        "Before a big change — you see who depends on whom, and spot the 'sensitive' files many things lean on, before you touch them",
        "To help [Claude Code](/en/claude-code) — ask it to read the map before a task, and its answers fit your project better",
        "To bring order back to old code — a project nobody remembers the structure of anymore. The map gives it reliable documentation, derived from the code itself",
        "To gauge size — a manager or product owner can see how many parts and connections are involved, getting a real sense of scale without reading code",
        "Less suited to: a small fix that's already understood, a tiny project of a few files, or code you already know well — there the map adds nothing",
      ],
      tips: [
        "For large projects — don't run on everything at once. Run on one part at a time — it's both cheaper and more focused on what actually interests you",
        "After building a map, save it. On later runs the tool updates only what changed — far faster and cheaper than running from scratch",
      ],
    },
    {
      id: "cost-aware",
      icon: Lightbulb,
      title: "Tips — running it fast and cheap",
      subtitle: "What I learned from running it on real projects",
      description:
        "This part is the small details that make the difference between 'I ran it once and it was expensive' and 'I run it when I need to, fast and cheap'. Most of the cost isn't in scanning the code (which is fast and nearly free), but in the stage where the AI reads and understands — so all the tips revolve around one thing: only let the AI analyze what really matters.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      beginner:
        "This whole section boils down to one simple piece of advice: let the AI read only what it actually needs, not everything. Imagine you're paying a lawyer by the hour — you wouldn't have them read the company's entire archive to answer one small question. Same here: the initial scan is fast and nearly free, so it's always worth running it first, seeing how big the thing is, and only then deciding which narrow part to let the AI dig into. For me (Elad) that's the difference between 'I ran it once and it was expensive' and 'I run it when I need to, fast and cheap'.",
      content: [
        "The biggest saving is running only on the relevant part: you can tell the tool to skip folders you don't care about (like tests or auto-generated files) and keep only the core",
        "The scan stage runs in seconds at almost no cost — you can always run it first, see how many files come in, and only then decide whether to pay for the AI stage",
        "A focused run on a single part (dozens of files, not hundreds) is the sweet spot: large enough to be useful, small enough to be cheap",
        "After the first run, the tool re-analyzes only files that changed — so later runs are far faster and cheaper. You just need to save the map file alongside the code",
        "If you see warnings about 'disconnected' files in a focused run — that's perfectly fine. It just means their connections lead outside the part you chose. Nothing to fix",
        "Because everything runs on the AI you already have inside [Claude Code](/en/claude-code), the tool works even when external service keys are blocked or run out — a reliability edge tools that depend on a paid service don't have",
      ],
      tips: [
        "Don't run on a whole hundreds-of-files project without a reason — that's the expensive part. Run on one part, and save the result. Almost always one part is all you need",
        "Combine it with [Docker](/en/guide/docker) and [Qdrant](/en/guide/qdrant): Docker runs the infrastructure, Qdrant remembers meaning, and Understand-Anything maps the code — three complementary tools for serious work with AI",
      ],
    },
  ],
  resources: [
    {
      title: "Understand-Anything GitHub",
      description: "The tool's open source (Egonex-AI)",
      href: "https://github.com/Egonex-AI/Understand-Anything",
      icon: Github,
    },
    {
      title: "Claude Code Plugins",
      description: "How to install and manage plugins in Claude Code",
      href: "https://docs.claude.com/en/docs/claude-code/plugins",
      icon: ExternalLink,
    },
    {
      title: "tree-sitter",
      description: "The code-parsing engine that feeds the map",
      href: "https://tree-sitter.github.io/tree-sitter/",
      icon: ExternalLink,
    },
    {
      title: "Claude Code guide",
      description: "The tool Understand-Anything runs inside",
      href: "/en/claude-code",
      icon: BookOpen,
    },
    {
      title: "Qdrant guide",
      description: "Semantic memory — a tool that complements the code map",
      href: "/en/guide/qdrant",
      icon: BookOpen,
    },
    {
      title: "Book a consultation",
      description: "Want to deeply understand your own codebase?",
      href: "/contact",
      icon: Mail,
    },
  ],
  ctaTitle: "Give your AI a map — and get answers that know your code",
  ctaSub:
    "Understand-Anything is free, runs on the model you already have, and maps any project in minutes.",
  primaryCta: {
    label: "To the tool's GitHub",
    href: "https://github.com/Egonex-AI/Understand-Anything",
    icon: Package,
  },
  secondaryCta: {
    label: "Book a consultation",
    href: "/contact",
    icon: Users,
  },
  authorBio:
    "Understand-Anything is the tool I (Elad) run to understand a code project before diving deep — with no external key, on the AI already running inside Claude Code. I've run it on several real projects, one part at a time to keep cost low. This guide explains it in plain terms: why the AI 'doesn't know' your code, how the map solves it, when it's worth running and when it isn't, and how to do it fast and cheap.",
};
