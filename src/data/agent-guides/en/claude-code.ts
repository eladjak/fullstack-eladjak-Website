import {
  Sparkles,
  Zap,
  Shield,
  Users,
  Terminal,
  Lightbulb,
  Rocket,
  BookOpen,
  Code2,
  Puzzle,
  Bot,
  RefreshCw,
  Star,
  Github,
  ExternalLink,
  Brain,
  Mail,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const claudeCodeGuideEn: AgentGuideData = {
  slug: "claude-code",
  agentName: "Claude Code",
  agentNameHe: "Claude Code",
  logoImage: "/images/guide-logos/claude-code-logo.png",
  tagline: "Not just another AI tool — an entire team of specialists working for you",
  heroDescription:
    "Claude Code is the real 2025–2026 breakthrough in software development: instead of treating AI as a side assistant that writes snippets for you in ChatGPT, Claude Code brings the most advanced AI in the world directly into your terminal and working environment — with the ability to edit files, run commands, manage git, test sites in a browser, and execute complex tasks completely on its own. It's built by Anthropic (creators of the Claude model — the direct competitor to OpenAI's ChatGPT, and widely considered the most advanced model in the world for coding today). The Claude Code CLI integrates with every leading development environment (VS Code, Cursor, JetBrains, plus a Mac/Windows desktop app), offers access to the three current 2026 models — Opus 4.7 (the strongest, with a one-million-token context window), Sonnet 4.6 (the balanced default — 400K tokens, with 1M in beta for some users), and Haiku 4.5 (fast and cost-efficient) — and supports a massive open ecosystem of extensions: Skills (ready-made capabilities that teach Claude to perform specific tasks), MCP Servers (connectors to external services), Sub-Agents and Managed Agents (a virtual team of specialists working in parallel, including background tasks), Hooks (automations that fire before or after any action), and more. What I've put together and share in this guide — my full working environment with 350+ professional Skills, 32 specialized agents, and 17 MCP servers — represents hundreds of hours of research, experimentation, and expensive mistakes I've already made on your behalf. Everything is open source, completely free, continuously updated, and ready to install on your machine with a single command. Whether you're a seasoned developer looking for a dramatic productivity jump, an entrepreneur who wants to build an MVP in a single night, or simply curious about the technology reshaping the world of work — Claude Code is the entry point, and this guide (together with the repositories linked below) is the shortest route in.",
  badgeText: "2026 · Updated · Practical guide",
  canonical: "https://fullstack-eladjak.co.il/en/claude-code",
  heroBgImage: "/images/guides/guide-claude-code-hero.jpg",
  videoUrl: "/videos/guides/claude-code.mp4",
  stats: [
    { label: "Skills", value: "350+" },
    { label: "MCP connectors", value: "17" },
    { label: "Agents", value: "32" },
    { label: "LSP speed", value: "900x" },
  ],
  paradigmTitle: "Why does this change everything?",
  paradigmSub:
    "This isn't another language model answering questions. It's a tool that actually does the work for you.",
  paradigmShifts: [
    {
      before: "Hours of StackOverflow searching",
      after: "A precise answer tailored to your project in seconds",
      icon: Zap,
    },
    {
      before: "Weeks of learning a new framework",
      after: "Claude builds a working project in it and explains every line",
      icon: BookOpen,
    },
    {
      before: "Hiring a team of developers, testers, and designers",
      after: "All of those roles in one tool, around the clock",
      icon: Users,
    },
    {
      before: "Building a website from scratch in weeks",
      after: "A complete site with design, SEO, and content in just a few hours",
      icon: Rocket,
    },
  ],
  whoIsThisFor: [
    {
      title: "Founders and business owners",
      description:
        "Build websites, apps, and tools on your own — no dev team required. Claude Code is your development team.",
      icon: Star,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Beginner developers",
      description:
        "Learn while you build. Claude explains every line, fixes mistakes, and teaches best practices in real time.",
      icon: Lightbulb,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Experienced developers",
      description:
        "Double your productivity. 32 parallel agents, 350+ skills, and automated quality checks.",
      icon: Code2,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Marketers and content creators",
      description:
        "Build landing pages, interactive tools, and automations — without writing a single line of code.",
      icon: Sparkles,
      color: "from-pink-500 to-rose-500",
    },
  ],
  toc: [
    { id: "paradigm", label: "Why now?" },
    { id: "what-is", label: "What is it?" },
    { id: "install", label: "Install" },
    { id: "first-steps", label: "First steps" },
    { id: "claude-md", label: "CLAUDE.md" },
    { id: "mcp-servers", label: "MCP" },
    { id: "skills-hooks", label: "Skills" },
    { id: "agents", label: "Agents" },
    { id: "workflows", label: "Workflows" },
    { id: "advanced", label: "Advanced" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Bot,
      title: "What is Claude Code?",
      subtitle: "Not another chatbot — an entire team inside one screen",
      description:
        "Claude Code is a development tool from Anthropic (the company behind the Claude models, direct competitors to OpenAI's ChatGPT). Instead of opening a browser, copying code into a chat, and pasting the answer back into your editor — Claude Code runs directly inside your terminal (your computer's command line) or inside your editor (VS Code, JetBrains, Cursor). It sees every file in your project and can read, write, run commands, perform git operations, browse the web, and debug issues — all from a natural conversation in English or Hebrew.",
      color: "from-violet-600 to-purple-500",
      difficulty: "beginner",
      beginner:
        "The simplest way to understand it: imagine a hands-on assistant who doesn't just answer in a chat window and let you copy the reply — they actually open your files, write the code, run the tests, and fix errors themselves. You describe what you want in plain English (for example: 'add a contact page with a form that emails me'), and it builds it. You don't need to know how to code to get started.",
      content: [
        "An autonomous AI agent from Anthropic that deeply understands your project — not just the current question",
        "Runs directly in the terminal (command line) or as a plugin inside your editor — no more switching windows",
        "Reads, writes, and edits files, runs automated tests, and performs git operations (commit, push, pull) on its own",
        "Supports MCP (Model Context Protocol — a protocol for connecting external tools) which opens access to GitHub, databases, UI design tools, and more — details in the [MCP section](/en/guide/claude-code#mcp-servers)",
        "Skills system (short instruction files that teach Claude how to perform a specific task) — my own setup includes 350+ professional skills that I built and released for free",
        "Runs an entire team of Sub-Agents (specialist sub-agents working in parallel): see [Kami](/en/guide/kami), [Kaylee](/en/guide/kaylee), [Box](/en/guide/box), and the rest of my agent network",
      ],
      tips: [
        "Claude Code is fundamentally different from ChatGPT: there you copy an answer and paste it into your code — here it writes directly to the file, runs the code, and fixes errors until everything works",
        "For me, it runs entire projects from zero to production — design, code, tests, and deployment. For you it can start with a single small task and expand gradually",
      ],
    },
    {
      id: "install",
      icon: Zap,
      title: "Quick install",
      subtitle: "Five minutes and you're in",
      description:
        "Claude Code is a tool that installs on your machine (not just a web app) — so there are five different ways to set it up, depending on how you prefer to work. Pick the option that matches your workflow; you can always add more later.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "beginner",
      beginner:
        "The easiest route for beginners: go to claude.com/download, grab the desktop app, open it, sign in with your Anthropic account, and start talking to Claude. It really is that simple — zero technical setup required up front.",
      content: [
        "Install via npm (Node.js's package manager) — type in the terminal: npm install -g @anthropic-ai/claude-code — preferred by developers who live on the command line",
        "Desktop app — download from claude.com/download for Windows, Mac, or Linux — the most beginner-friendly option",
        "VS Code extension — search for 'Claude Code' in Extensions and click Install — integrates directly into the world's most popular editor",
        "JetBrains plugin — available for WebStorm, IntelliJ, PyCharm, and the rest of the JetBrains family",
        "Browser access — claude.com/code — no install at all, great for a first taste",
      ],
      tips: [
        "If you're just getting started, my recommendation is the desktop app. Nothing to configure, and switching to VS Code or JetBrains later is just a click away",
        "You'll need an Anthropic subscription: Pro at $20/month (recommended for beginners, enough for most use cases), Max available in two tiers — $100/month or $200/month (for heavy users running multiple parallel agents), or pay-as-you-go API access (for developers building their own automations)",
        "Three models are available: Opus 4.7 (the strongest — one-million-token context window, ideal for complex tasks and architecture), Sonnet 4.6 (balanced default — 400K tokens, with a 1M beta for some users), and Haiku 4.5 (fast and cost-efficient for simple tasks and instant responses)",
      ],
      codeExample: {
        label: "One-line install in the terminal",
        code: "npm install -g @anthropic-ai/claude-code\ncd my-project\nclaude",
      },
    },
    {
      id: "first-steps",
      icon: Rocket,
      title: "First steps",
      subtitle: "From the first moment to the first real result",
      description:
        "Once Claude Code is installed, what do you actually do? Here are the basic steps that take you from 'I have it installed' to 'I have a working project'. Every step is simple and happens in plain-English conversation.",
      color: "from-purple-600 to-violet-500",
      difficulty: "beginner",
      beginner:
        "Open Claude Code and just tell it what you want. For example: 'build me a business site for my florist shop in Netanya, with a homepage, a product page, and a contact form'. It will ask clarifying questions (what colors? do you have a logo? how should customers order?), take your answers, and start building. That's really all there is to it.",
      content: [
        "Open a terminal window (command line) in your project's folder — on Windows: Windows Terminal or PowerShell; on Mac/Linux: Terminal",
        "Type the word claude and press Enter — Claude Code loads",
        "Describe what you want to build in natural language, in English or Hebrew — no special format required",
        "Claude reads the existing files on its own, understands the project structure, and gets to work — you don't need to explain everything from scratch",
        "Every action it wants to take (creating a file, deleting, running a command) asks for your approval — you're always in control and can say no",
      ],
      tips: [
        "The first time you're in a new project, run the /init command (slash-init) — it generates a CLAUDE.md file with your project's settings. Details in the next section",
        "The /help command lists every available Slash Command (commands that start with a slash) — a great way to discover the tools at your fingertips",
        "Not happy with the result? Don't fix it by hand — just tell Claude 'no, let's take a different approach' and it will start over",
      ],
    },
    {
      id: "claude-md",
      icon: BookOpen,
      title: "CLAUDE.md — the most important file in your project",
      subtitle: "The house rules — automatically loaded into every conversation",
      description:
        "CLAUDE.md is a simple text file (in Markdown format — a lightweight syntax for writing text with headings and emphasis) that's automatically loaded into the Context Window (Claude's active memory in a conversation) every time you interact with it inside the project. It teaches Claude how you work, what your tech stack is, what matters to you, and what to avoid. This is the single most valuable file to write well — because it spares you from repeating the same instructions in every conversation.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "intermediate",
      beginner:
        "Imagine you're hiring a new employee for your business. You hand them a 'company handbook': what the address is, who the customers are, what tone we use on WhatsApp, how to dress. CLAUDE.md is exactly that — a document you write once, and from then on Claude always knows your business context, the technologies you like, and the things that are off-limits.",
      content: [
        "Global CLAUDE.md (applies to every project) — lives at ~/.claude/CLAUDE.md on your machine. Put general instructions about your working style here",
        "Project-specific CLAUDE.md — lives in your project's root folder: my-project/CLAUDE.md. Put instructions unique to this project here",
        "Both files load together in every conversation — the global one first, then the project-specific one (which can override the global rules)",
        "What to include: your tech stack (Next.js, React, Python, etc.), code-style rules, preferred tools (bun over npm), a 'do not do' list, and even your preferred tone for commit messages",
        "In my setup, I have a detailed global CLAUDE.md with working rules for my agent network (see [Kami](/en/guide/kami), [Kaylee](/en/guide/kaylee)) and for the [Delegator](/en/guide/delegator) as the central entry point",
      ],
      tips: [
        "The more detailed your CLAUDE.md, the better Claude understands you and the fewer repeat questions it asks. Invest 15–30 minutes on it once",
        "Type /init at the start of a new project and Claude will auto-generate the initial file based on what it sees in the project",
        "Every time you correct Claude on the same mistake a second time — that's a signal the instruction belongs in CLAUDE.md",
      ],
      codeExample: {
        label: "A minimal CLAUDE.md example",
        code: "# My Project\n\n## Stack\nNext.js 14, TypeScript, Tailwind CSS, Supabase\n\n## Rules\n- Always write UI text in Hebrew\n- Use functional components only\n- Never hardcode secrets\n\n## Commit Messages\nFormat: feat/fix/refactor: description",
      },
    },
    {
      id: "mcp-servers",
      icon: Puzzle,
      title: "MCP — the bridge to the outside world",
      subtitle: "The open standard that opens Claude to an infinite toolkit",
      description:
        "MCP (short for Model Context Protocol) is an open standard Anthropic released in 2024 that lets Claude connect to external tools in a structured way: GitHub repositories, design systems, databases, browser automation, WhatsApp gateways, and more. The closest analogy: just as USB-C is a single standard that connects any device to any computer, MCP is a single standard that connects any service to any AI model. My setup has 17 MCP servers wired in; you can start with three or four of the essentials.",
      color: "from-cyan-600 to-teal-500",
      difficulty: "intermediate",
      beginner:
        "Think of MCPs as 'plugins' for Claude, just like browser extensions. Want it to design a UI for you? There's a plugin. Want it to manage your GitHub? There's a plugin. Want it to browse the web and fill out forms? There's a plugin. Every plugin you connect unlocks a new capability.",
      content: [
        "Context7 — up-to-date documentation for code libraries, with no knowledge cutoff (the date the model stopped learning). Solves the 'Claude doesn't know the new version' problem",
        "Octocode — real code search across GitHub. Instead of guessing how a library works, Claude sees real-world examples",
        "Google's Stitch — AI-driven UI design with direct export to HTML/Tailwind — a must-have before writing any new interface",
        "Playwright — automated browsing, form filling, screenshots, and E2E (end-to-end) testing",
        "GitHub MCP — manage Pull Requests, Issues, and Repositories directly from a Claude conversation",
        "All configuration lives in a single file: ~/.claude/.mcp.json — copy mine and you're off with 17 ready-to-go servers",
        "Other MCP servers worth knowing: [n8n](/en/guide/n8n) for automations, [Qdrant](/en/guide/qdrant) as a vector database, and DeepWiki for querying public GitHub repositories",
      ],
      tips: [
        "Context7 + Octocode together = official docs plus real-world code. For me this pairing is the gold standard before any new implementation — I recommend installing both from day one",
        "You can build your own MCP in TypeScript in about an hour — the protocol is delightfully simple and plenty of examples exist",
        "A word of caution: every MCP server you connect adds tokens to every conversation. Install only what you genuinely use",
      ],
      codeExample: {
        label: "Example ~/.claude/.mcp.json with two servers",
        code: '{\n  "mcpServers": {\n    "context7": {\n      "command": "npx",\n      "args": ["-y", "@upstash/context7-mcp@latest"]\n    },\n    "playwright": {\n      "command": "npx",\n      "args": ["@playwright/mcp@latest"]\n    }\n  }\n}',
      },
    },
    {
      id: "skills-hooks",
      icon: Sparkles,
      title: "Skills and Hooks — a free skill library ready to download",
      subtitle: "350+ ready-made skills I built and released to the public — download them and pick what fits",
      description:
        "Skills are one of Claude Code's most powerful features: each Skill is essentially a short 'how-to manual' that teaches Claude to perform a specific task the right way. Hooks are scripts that run automatically before or after any action (for example: triggering a spell-check after every file edit). Together, the two transform Claude Code from a language model into a personalized working environment.",
      color: "from-amber-600 to-orange-500",
      difficulty: "intermediate",
      beginner:
        "Think of Skills as short courses you give Claude: there's a Skill for writing smart git commit messages, one for running professional security reviews on code, one for Israeli accessibility compliance (IS 5568 standard), one for generating invoices that match Israel Tax Authority requirements, and hundreds more. Each Skill is a small file you can download, drop into a single folder, and immediately have available in every project.",
      content: [
        "Simple structure: every Skill is a Markdown file sitting in ~/.claude/skills/ — easy to edit, copy, and share",
        "The /commit command activates the commit-message Skill — Claude writes you a smart, correctly-formatted message automatically",
        "The /review command runs a comprehensive code review with three specialist reviewers (quality, security, performance) working in parallel",
        "The /plan command does structured planning for any large feature before coding begins — saves hours of getting stuck midway",
        "Hooks enable automation of recurring processes: running Prettier on every file save, running a TypeScript check after every edit, running security checks before every commit",
        "Over 350 skills ready to use out of the box — from coding skills (React, Next.js, Python) to Israel-specific specialties (social security, burial notices, VAT invoices) — all open source and free to download",
      ],
      tips: [
        "The fastest way to start: download the ai-agents-skills bundle from GitHub (link below) — a single ZIP containing every skill. Copy it into ~/.claude/skills/ and you're done",
        "You can write your own Skill — it's just a Markdown file with clear instructions for Claude — and share it with your team or the community",
        "Quick install command: npx skills add <repo>/<skill-name> -y -g (requires Node.js 18+)",
      ],
      codeExample: {
        label: "Example — install the full skills library in one command",
        code: "# Install my ai-agents-skills bundle (350+ skills)\ngit clone https://github.com/eladjak/ai-agents-skills.git ~/.claude/skills\n\n# Every skill is now available — ready to use:\nclaude\n> /commit   # run the commit-messages skill\n> /review   # code review with 3 reviewers\n> /plan     # structured feature planning",
      },
    },
    {
      id: "agents",
      icon: Users,
      title: "Working with Sub-Agents",
      subtitle: "An entire team of specialists running in parallel",
      description:
        "A Sub-Agent is a secondary instance of Claude that runs inside your main conversation, with its own clean and isolated context window, focused on a single specific task. Instead of one agent doing everything sequentially, Claude Code can spin up six, ten, or even sixteen sub-agents in parallel — each with a different role — and weave the results back together. It's like managing a human team: one writes code, one designs, one reviews security — and they all work simultaneously.",
      color: "from-rose-600 to-pink-500",
      difficulty: "advanced",
      beginner:
        "Picture yourself running a dev team: one person designs, one writes code, one audits security, one writes tests — all of them work at the same time and then merge their output. That's exactly what happens here: even non-programmers can build a full business (app, site, management system) in 36 hours, because they have a team of twenty specialists standing by. In my private agent network: [Kami](/en/guide/kami) handles WhatsApp, [Kaylee](/en/guide/kaylee) handles Telegram, [Box](/en/guide/box) covers health, [Hermes](/en/guide/hermes) runs scheduling — and they all talk to each other.",
      content: [
        "Agent Tool — the mechanism that launches a sub-Claude with a fresh, isolated context (no main conversation history — which is exactly what enables focus)",
        "My setup has 32 specialized agents installed via the OMC system (oh-my-claudecode): architect, executor, security-reviewer, test-engineer, and many more",
        "Team mode — a structured flow: plan → prd (requirements) → execute → verify → fix, looping automatically until the task is done",
        "Autopilot mode and Managed Agents — Claude receives a large goal and works on its own until it's fully complete, including tests and deployment. With Managed Agents the task runs in the background on Anthropic's cloud — you can close your laptop and come back to a finished result",
        "Six-plus sub-agents in parallel — saves 70%+ of the time on any task that can be split into independent pieces",
        "A whole agent network runs in the background: see [Adopter](/en/guide/adopter) scanning Telegram for discoveries, [CrewAI](/en/guide/crewai) assembling dedicated teams, and [Delegator](/en/guide/delegator) routing tasks to the right agent",
      ],
      tips: [
        "Code review via a sub-agent = total objectivity, because the reviewer didn't write the code and has no 'ego' attached to it — a tip that prevents a lot of bugs",
        "For your first steps, don't fire up all 32 agents at once. Start with standard Team mode and only add specialized agents once you see where the real bottlenecks are",
        "Type /agents to see the full list of agents available in your setup",
      ],
      codeExample: {
        label: "Running an agent team from concept to result",
        code: "# Full team — from planning to verification\n/team build API for user management with auth\n\n# Autonomous work until done\n/autopilot add dark mode to all components\n\n# A loop that doesn't stop until complete\n/ralph fix all TypeScript errors",
      },
    },
    {
      id: "workflows",
      icon: RefreshCw,
      title: "Workflows — proven working patterns",
      subtitle: "Consistent routines that save hours every day",
      description:
        "A workflow is an ordered sequence of steps you run again and again. When the right workflow is defined up front, the task moves faster, with higher quality, and without skipping important steps. Here are five workflows I use daily — all battle-tested on real projects.",
      color: "from-indigo-600 to-blue-500",
      difficulty: "intermediate",
      content: [
        "TDD (Test-Driven Development) — write the test before the code → run (red, because there's no implementation yet) → write the code → run (green, now it works) → refactor. A discipline that guarantees your code works and you can trust it",
        "Automated security scan — run the /security-review command to scan for vulnerabilities before every deployment. Claude checks for SQL Injection, XSS, exposed secrets, and more",
        "Code Review with three reviewers in parallel — a quality reviewer, a security reviewer, and a performance reviewer — working together to give comprehensive feedback",
        "UI Design → Code — design in Stitch (Google's AI tool) to produce an initial design, and then Claude converts it into React components with real logic underneath",
        "Overnight Work — before bed you hand Claude a large task with a clear goal, and in the morning you get a Pull Request ready for review. Runs on my [Dashboard](/en/guide/dashboard) for oversight",
      ],
      tips: [
        "Every workflow here has a short Slash Command in my setup — /tdd, /security-review, /code-review — one-second activation",
        "If you're just starting, pick a single workflow (I recommend /code-review) and make it a habit before adding more",
      ],
    },
    {
      id: "advanced",
      icon: Terminal,
      title: "Advanced tips",
      subtitle: "From intermediate to expert — the power-user tricks",
      description:
        "Once you've been working with Claude Code for a while, there's an extra layer of advanced capabilities that takes productivity to another level. The tips here come from power users and unlock abilities that many people don't even know exist.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      content: [
        "ultrathink — a magic word. Add it to your prompt and Claude switches into Extended Thinking mode — ideal for complex tasks and planning",
        "/compact — compresses the context window in long conversations. Saves tokens and lets you continue a session without opening a new one",
        "Git Worktrees — run multiple Claude sessions in parallel on different branches of the same project. An advanced feature that lets you develop three features simultaneously without conflicts",
        "LSP Integration (Language Server Protocol — a protocol that enables deep language awareness) — enables semantic code navigation at roughly 900x the speed of plain text search. Claude genuinely understands what each variable does",
        "Tab — a quick-accept shortcut that confirms an action without typing 'yes'. Seconds that add up to hours",
        "Escape — cancels whatever action Claude is running, if you see it heading in the wrong direction",
        "Combining different AIs: Claude for code, Gemini for images and search, Copilot for autonomous overnight work, [Ollama](/en/guide/ollama) for private local models",
        "Plan Mode — a mode in which Claude only plans and doesn't execute, until you approve. Excellent for complex features that need careful thought before writing code",
        "TodoWrite — Claude's internal tool for managing task lists inside a conversation. Lets you track progress on long tasks and see what's still pending",
        "Sandboxed Bash — running terminal commands in a safe, isolated environment, without any risk to your machine",
      ],
      tips: [
        "Git Worktrees are a superpower: a dedicated folder per branch, three Claudes running in parallel on the same project — and zero conflicts",
        "Global CLAUDE.md + project CLAUDE.md = a Claude that genuinely knows you and doesn't keep asking the same questions",
        "In my setup, five or six Claude instances run in parallel all the time via Git Worktrees — that's the reason a full week of work can fit into a single day",
      ],
      codeExample: {
        label: "Workflow with a Git Worktree",
        code: "# Create a worktree for a new feature\ngit worktree add ../my-project-feature feat/new-feature\ncd ../my-project-feature\nclaude   # Claude works on its own branch — no conflicts",
      },
    },
  ],
  resources: [
    {
      title: "⭐ Ultimate AI Dev Environment — my full setup (free!)",
      description: "The ultimate development environment I built and share for free: 350+ Skills, 17 MCP servers, 32 specialized agents. Download it, install it, and make your Claude Code as sharp and organized as mine.",
      href: "https://github.com/eladjak/ultimate-ai-dev-environment",
      icon: Rocket,
    },
    {
      title: "📦 AI Agent Skills Repository — the skills library ready to use",
      description: "350+ ready-made skills you can download: smart git commits, code review, feature planning, TDD, security scans, RAG pipelines, React patterns. One ZIP file or one git clone — and it's all yours.",
      href: "https://github.com/eladjak/ai-agents-skills",
      icon: Puzzle,
    },
    {
      title: "🇮🇱 Israeli Skills Library — Israel-focused skills",
      description: "92 skills unique to Israel: Tax Authority, National Insurance, Israeli banks, VAT invoices, Hebrew and RTL. All open and free in a public repository.",
      href: "https://agentskills.co.il",
      icon: Star,
    },
    {
      title: "Claude Code guide in Hebrew — Tom Hagiladi",
      description: "A comprehensive and up-to-date Hebrew guide to getting started with Claude Code",
      href: "https://tomhagiladi.github.io/claude-code-guide/",
      icon: BookOpen,
    },
    {
      title: "Claude Code Docs (Anthropic)",
      description: "The official Claude Code documentation from Anthropic",
      href: "https://docs.anthropic.com/en/docs/claude-code",
      icon: BookOpen,
    },
    {
      title: "oh-my-claudecode (OMC)",
      description: "A multi-agent system with 32 specialized agents — a turnkey alternative",
      href: "https://github.com/transcendr/oh-my-claudecode",
      icon: Users,
    },
  ],
  ctaTitle: "Ready to start? My full repository is waiting for you",
  ctaSub:
    "Install Claude Code, download all 350+ skills I've built and released to the public, and end your very first day with a complete development environment. Everything is free, open source, and continuously updated.",
  primaryCta: {
    label: "Download the full repository (GitHub)",
    href: "https://github.com/eladjak/ultimate-ai-dev-environment",
    icon: Rocket,
  },
  secondaryCta: {
    label: "Install Claude Code (Anthropic)",
    href: "https://claude.com/download",
    icon: Zap,
  },
  authorBio:
    "Behind this guide is intensive daily use of Claude Code, including building and running a network of 10 autonomous AI agents and a Hebrew-language Skills community. The goal of the guide and its companion repositories is to save you long hours of learning the hard way — and hand you a ready-made environment that works from day one.",
};
