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
  tagline: "Your AI finally understands how all the pieces of your code fit together",
  heroDescription:
    "Understand-Anything is an open-source tool (from developer Lum1104) that turns an entire code project into a 'living map' — a diagram showing which files, functions and modules exist and how each one connects to the others. It was born from a problem anyone who has worked with an AI assistant knows well: the AI is great at writing code, but it doesn't actually 'know' your project — every conversation starts from scratch, with no idea that this file depends on that one or who calls whom. Understand-Anything solves that by building a 'knowledge graph' (a database of what-connects-to-what) of your whole codebase, which the assistant can then lean on. The beautiful part: all the thinking runs on the AI model you already have inside [Claude Code](/en/claude-code) — no external API key, no separate paid service. In my setup I ran it on real projects across my network to get a bird's-eye view of how a system is built before diving in to change something. In your case it's perfect for quickly onboarding to a new project, auto-documenting 'orphan' code nobody remembers anymore, or simply understanding the structure of a library you're considering adopting.",
  badgeText: "2026 · Code Intelligence · Practical Guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/understand-anything",
  heroBgImage: "/images/guides/guide-understand-anything-hero.jpg",
  stats: [
    { label: "API keys required", value: "0" },
    { label: "projects I mapped", value: "3+" },
    { label: "cost", value: "free" },
    { label: "plugin for", value: "Claude Code" },
  ],
  paradigmTitle: "From 'AI that writes code' to 'AI that knows your code'",
  paradigmSub:
    "A regular AI assistant starts every conversation from scratch. Understand-Anything gives it a permanent map of the project.",
  paradigmShifts: [
    {
      before: "'The AI doesn't know which file calls which'",
      after: "Knowledge graph: every import, every call, every dependency — mapped up front",
      icon: Network,
    },
    {
      before: "A whole day to understand a new code project",
      after: "An automatic 5–7 step guided tour through the code",
      icon: Compass,
    },
    {
      before: "Documentation that's stale the moment you write it",
      after: "A map rebuilt from the code itself, automatically",
      icon: Map,
    },
    {
      before: "A code-analysis tool that needs a paid API key per run",
      after: "Runs on the AI model you already have — $0 extra",
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
      title: "Building with AI assistants",
      description:
        "Give [Claude Code](/en/claude-code) permanent structural context so its answers are accurate to your specific project.",
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
      subtitle: "An open-source tool that turns a whole project into a who-connects-to-whom diagram",
      description:
        "Understand-Anything scans a software project and builds a 'map' from it — an orderly description of every file, function and the relationships between them. Instead of opening dozens of files one by one to figure out how a system works, the tool shows you the big picture: which parts exist, what each one does, and who relies on whom. It's built as a plugin for [Claude Code](/en/claude-code), so it slots straight into the tool you already work with.",
      color: "from-sky-600 to-cyan-500",
      difficulty: "beginner",
      beginner:
        "Imagine being handed a huge building with no signs, no map and no blueprints, and being told 'start working.' That's how a developer (or an AI assistant) feels stepping into a large code project they don't know. Understand-Anything is essentially the architect who shows up, walks the whole building, and draws you a clear plan: where the entrance is, how the floors connect, and which pipe leads where. Now you can work without fearing that every decision will knock down a wall somewhere else.",
      content: [
        "Scans every code file in the project and automatically detects the language (JavaScript, TypeScript, Python and more) and the type of each file",
        "Builds a 'knowledge graph' — a data structure describing nodes (files and functions) and edges (relationships: 'this file imports that one', 'this function calls that one')",
        "Groups files into logical 'layers' by role — for example a state-management layer, a business-logic layer, a UI layer — so you grasp the architecture, not just the files",
        "Generates an automatic multi-step 'guided tour' explaining where to start reading and in what order, just like a guide who knows the terrain",
        "Built on the tree-sitter library — a fast, precise code-parsing engine that understands the structure of the code itself (not just text search) — so the result is reliable",
        "All output is saved in a single folder inside the project (knowledge-graph.json) — one file you can commit to git alongside the code, so the whole team benefits from it",
      ],
      tips: [
        "To get a live add-on inside the tool, install it through the plugins system of [Claude Code](/en/claude-code) — that's all it takes to get started",
        "The map is a simple data file (JSON). If you commit it to git next to the code, everyone who pulls the project also gets the map — without re-running anything",
      ],
      codeExample: {
        label: "Install and first run",
        code: "# Add the marketplace and install the plugin\n/plugin marketplace add Lum1104/Understand-Anything\n/plugin install understand-anything\n\n# Run on a scoped folder to keep cost down\n/understand src/stores\n\n# Result: <project>/.understand-anything/knowledge-graph.json",
      },
    },
    {
      id: "the-problem",
      icon: Brain,
      title: "The problem — 'the AI doesn't know your code'",
      subtitle: "Why a brilliant AI assistant still misses the big picture",
      description:
        "This is perhaps the most important insight in the whole guide. Large language models (LLM — the 'brain' behind [Claude](/en/claude-code), ChatGPT, etc.) are geniuses at writing a single snippet of code, but they don't 'remember' your project between conversations and can't see all of it at once. When you ask for a change, the AI sees only what you showed it — not the hundreds of other files that might depend on the one it's about to modify. The result: a change that looks correct but breaks something elsewhere in the project.",
      color: "from-rose-600 to-red-500",
      difficulty: "beginner",
      beginner:
        "Think of a brilliant handyman you invite over fresh every time — who never remembers previous visits. He can fix a faucet beautifully, but he doesn't know this pipe connects to the boiler upstairs, because nobody told him the building's layout. So he fixes the faucet... and unintentionally causes a flood upstairs. An AI assistant without a map of the code is exactly that: real talent, zero familiarity with the whole. Understand-Anything hands it the building's map up front.",
      content: [
        "An LLM (large language model) is the technology powering coding assistants — great at a localized snippet, but lacking a full picture of the entire project",
        "Every model's 'context window' is limited — you can't simply stuff a hundreds-of-files project into it, so the AI always sees only a small slice at a time",
        "Without a map, the AI guesses the relationships between files — and sometimes gets it wrong: it changes one function not knowing five other places call it",
        "The problem worsens as the project grows: precisely in large systems, where it's hardest to keep everything in your head, the AI is most 'blind' to the overall picture",
        "Manual documentation is written once and goes stale immediately — nobody updates it after every change, so it can't be trusted as a source of truth",
        "Understand-Anything closes the gap: it derives the map from the code itself, so it always reflects reality rather than some outdated description",
      ],
      tips: [
        "The map doesn't replace the developer's judgment — it gives the AI (and you) a reliable starting point before you begin changing code",
        "If you combine this with [Claude Code](/en/claude-code), ask it to read the map before tackling a task — that way its answers are far more accurate to your specific project",
      ],
    },
    {
      id: "how-it-works",
      icon: Cpu,
      title: "How it works — a deterministic backbone + an AI layer",
      subtitle: "One part precise and fixed, one part smart and flexible — all on your model",
      description:
        "Understand-Anything works in two complementary stages. First a 'deterministic backbone' runs — a series of fast scripts that extract dry facts from the code (which files exist, which functions, who imports whom). Then an 'AI layer' kicks in to add understanding: it summarizes what each part does, groups things into layers, and builds the guided tour. The critical part: all the thinking in the AI layer runs on the model already active inside [Claude Code](/en/claude-code) — not on a paid external service.",
      color: "from-violet-600 to-purple-500",
      difficulty: "intermediate",
      beginner:
        "It's like building an atlas of a country. First you send a drone to photograph every road with mathematical precision — that's the 'deterministic' stage, pure facts. Then a geographer arrives and adds the meaning: 'this region is the industrial center', 'this highway connects the two main cities'. The two stages together turn a dry set of points into a map that actually tells a story — which is exactly what Understand-Anything does with your code.",
      content: [
        "Stage 1 — scan: maps every file in the project, detecting language and category for each. Fast, runs in seconds, no AI",
        "Stage 2 — structure: the tree-sitter engine reads each file and extracts its functions, classes and 'call graph' (who calls whom) — precise and deterministic",
        "Stage 3 — semantic analysis (AI): 'subagents' (instructions for the AI to perform a focused task) summarize what each file does and identify logical dependencies beyond the explicit imports",
        "Stage 4 — architecture and tour: the AI layer groups files into meaningful layers and builds a guided tour explaining where to start",
        "Stage 5 — assembly and validation: all the parts merge into a single knowledge-graph.json file, and a validator checks that the map is sound with no contradictions",
        "The big differentiator: the AI layer runs on the local model of [Claude Code](/en/claude-code) — with no dependence on Gemini, OpenAI or any external key. That means zero extra cost and zero extra point of failure",
      ],
      tips: [
        "The deterministic backbone (scan + structure) is the cheap, fast part. The AI layer is what 'costs' in time and resources — so scope the run to a focused folder (see below)",
        "The tool never touches your source code — it writes only to its own dedicated folder. Safe to run even on an active project without fear of breaking anything",
      ],
      codeExample: {
        label: "Output structure inside the project folder",
        code: "<project>/.understand-anything/\n  knowledge-graph.json   # the full map: nodes, edges, layers, tour\n  meta.json              # metadata for future (incremental) runs\n  .understandignore      # which folders to skip (derived from .gitignore)\n  intermediate/          # intermediate artifacts for cheap reuse",
      },
    },
    {
      id: "knowledge-graph",
      icon: Network,
      title: "The knowledge graph — what's actually stored in the map",
      subtitle: "Nodes, edges, layers and a tour — in one file you can commit to git",
      description:
        "The heart of Understand-Anything is the knowledge graph — an orderly way to describe a network of things and the relationships between them. In our case the 'things' are files and functions (called nodes), and the 'relationships' are the connections between them (called edges) — for example 'this file imports that one' or 'this function depends on that one'. On top of it all, layers group nodes by role, and a tour explains the logical order for understanding the system.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "intermediate",
      beginner:
        "A knowledge graph is simply an orderly way to draw 'who knows whom'. Like a diagram of who-is-friends-with-whom on a social network: each person is a dot, and each friendship is a line connecting two dots. Here, instead of people there are files and functions, and instead of friendships there are 'who uses whom' relationships. The moment you see that diagram, you suddenly understand who the central character in the story is — which file everyone leans on — and what you can change safely.",
      content: [
        "Node — a single unit on the map: a whole file or an important function. Each node has a name, a type and a short description of what it does",
        "Edge — a relationship between two nodes. The common types: imports, contains, depends_on and related — so you see exactly who relies on whom",
        "Layer — a grouping of nodes with a shared role, for example 'state-management layer', 'core engine', 'app routes'. This is how you grasp the architecture at a glance",
        "Tour — a recommended sequence of steps for reading the code, from the root down to the sub-systems, so a new developer (or [Claude Code](/en/claude-code)) knows where to start",
        "Everything is saved in a readable knowledge-graph.json file — you can commit it to git alongside the code, so the whole team shares the same up-to-date map",
        "When you run on a scoped folder, some files will be flagged as 'orphans' — not a defect, but a sign that their relationships lead outside the scope you scanned. A broader run will connect them too",
      ],
      tips: [
        "A node everyone depends on (many incoming edges) is usually the heart of the system — that's where to be especially careful before changes, and that's exactly what the map reveals instantly",
        "You can keep the knowledge graph alongside a [Qdrant](/en/guide/qdrant) graph: the two are complementary — Qdrant remembers the meaning of text, and Understand-Anything maps the structure of code. Each solves a different problem",
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
        "Understand-Anything delivers the most value when you need a bird's-eye view of a whole system or a complex sub-system. It's less suited to tiny tasks where it's already obvious what's going on. Here's the distinction — when it's worth running and when it's just waste — drawn from real runs I did on several projects across my network.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "intermediate",
      beginner:
        "It's like hiring a land surveyor: when you're buying a whole plot and want to understand its boundaries — worth every penny. When you just want to hang a picture on a wall — you don't need a surveyor. Same here: for entering a large project or planning a significant change, the map is gold; for fixing one line you already understand, just make the fix.",
      content: [
        "Onboarding to a new project — the classic case. Instead of wasting hours jumping between files, you get layers and a guided tour that explain the structure fast",
        "Before a big change or refactor — you see who depends on what, and spot the 'dangerous' files many things lean on, before you touch them",
        "To give [Claude Code](/en/claude-code) good context — ask it to read the map before a task, and it works at a higher level of precision on the specific project",
        "Auto-documenting 'orphan' code — an old project nobody remembers the structure of. The map restores reliable documentation derived from the code itself",
        "For complexity assessment — a manager or product owner can see how many layers and connections are involved, getting a real sense of scale without reading code",
        "Less suited to: a localized fix that's already understood, a tiny project of a few files, or a situation where you already know the code by heart — there the map adds nothing",
      ],
      tips: [
        "For huge projects — don't run on everything at once. Scope to one sub-system at a time (the state folder, the business-logic folder) — it's both cheaper and more focused on what actually interests you",
        "After building a map, commit it to git. On subsequent runs the tool updates only what changed (incremental) — far faster and cheaper than running from scratch",
      ],
    },
    {
      id: "cost-aware",
      icon: Lightbulb,
      title: "Advanced tips — running it cheap and smart",
      subtitle: "What I learned from running it on real projects",
      description:
        "This part is the small details that make the difference between 'I ran it once and it was expensive' and 'I run it when I need to, fast and cheap'. Most of the cost isn't in scanning the code (which is fast and nearly free) but in the AI layer that summarizes and understands — so all the tricks revolve around correctly scoping what you hand the AI to analyze.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      content: [
        "Scoping is the main cost-saving lever: you define an .understandignore file that skips irrelevant folders (repeated UI components, tests, auto-generated files) and keeps only the core",
        "The deterministic backbone (scan, structure) runs in seconds at almost no cost — you can always run it first, see how many files come in, and only then decide whether to pay for the AI layer",
        "A focused run on a single sub-system (dozens of files, not hundreds) is the sweet spot: large enough to be useful, small enough to be cheap",
        "Incremental update: after the first run, the tool re-analyzes only files that changed. Saving the meta.json file is what enables this — commit it to git",
        "'Orphan' warnings in a scoped run are perfectly fine — they just mean those files' relationships lead outside the scope you chose. Nothing to fix",
        "Because everything runs on the local model of [Claude Code](/en/claude-code), the tool survives even when external API keys are blocked or hit a quota — a reliability edge that tools depending on a paid cloud service don't have",
      ],
      tips: [
        "Don't run a full pass on a hundreds-of-files project without a clear reason — that's the expensive part. Scope, run focused, and save the result. Almost always one sub-system is all you need",
        "Combine it with [Docker](/en/guide/docker) and [Qdrant](/en/guide/qdrant) in your toolbox: Docker runs the infrastructure, Qdrant remembers meaning, and Understand-Anything maps the code — three complementary tools for serious work with AI",
      ],
    },
  ],
  resources: [
    {
      title: "Understand-Anything GitHub",
      description: "The tool's open source (Lum1104)",
      href: "https://github.com/Lum1104/Understand-Anything",
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
      href: "/en/contact",
      icon: Mail,
    },
  ],
  ctaTitle: "Give your AI a map — and get answers that know your code",
  ctaSub:
    "Understand-Anything is free, runs on the model you already have, and maps any project in minutes.",
  primaryCta: {
    label: "To the tool's GitHub",
    href: "https://github.com/Lum1104/Understand-Anything",
    icon: Package,
  },
  secondaryCta: {
    label: "Book a consultation",
    href: "/en/contact",
    icon: Users,
  },
  authorBio:
    "Understand-Anything is the tool I run to get a bird's-eye view of a code project before diving deep — with no external API key, on the model already running inside Claude Code. I've run it on several real projects in my network, mapping one sub-system at a time to keep cost low. This guide lays out the patterns that worked: why the AI 'doesn't know' your code, how a knowledge graph solves it, when it's worth running and when it isn't, and how to scope correctly so it stays fast and cheap.",
};
