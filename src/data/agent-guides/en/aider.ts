import {
  Terminal,
  Code2,
  GitCommit,
  Keyboard,
  Layers,
  DollarSign,
  Lock,
  Github,
  ExternalLink,
  BookOpen,
  Rocket,
  Lightbulb,
  Users,
  Mail,
  Zap,
  RefreshCw,
  CheckCheck,
  Cpu,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const aiderGuideEn: AgentGuideData = {
  slug: "aider",
  agentName: "Aider",
  agentNameHe: "Aider — AI Pair-Programming CLI",
  category: "infra",
  logoImage: "/images/guide-logos/aider-logo.png",
  tagline: "Aider in any editor. Claude Code is my primary — Aider is the free backup",
  heroDescription:
    "Aider is an AI pair-programming CLI written in Python. It supports 200+ models via LiteLLM (Anthropic Claude Sonnet 4.6 / Haiku 4.5 / Opus 4.5, OpenAI GPT-5 / GPT-4.1 / o4-mini, Google Gemini 2.5 Pro / Flash, xAI Grok, 300+ models via OpenRouter, plus local models through [Ollama](/en/guide/ollama)), edits files directly on disk, creates automatic git commits, and includes a smart repo-map powered by tree-sitter that understands your project. On my machine Aider is installed in an isolated environment with separate credentials (not [Claude Max](/en/claude-code)) and free models (Qwen 2.5 Coder:free and DeepSeek V3:free via OpenRouter) — a backup for when Claude Max hits its quota or when I want an extra-private session. For you, Aider can be the primary tool: if you don't have Claude Pro/Max, or if you're a privacy-focused developer who needs local-only inference (with [Ollama](/en/guide/ollama)), Aider delivers about 80% of [Claude Code](/en/claude-code)'s capability for absolutely zero cost.",
  badgeText: "2026 · AI Pair-Programming CLI · Practical Guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/aider",
  heroBgImage: "/images/guides/guide-aider-hero.jpg",
  stats: [
    { label: "Supported models", value: "200+" },
    { label: "git integration", value: "auto" },
    { label: "Install", value: "pipx" },
    { label: "Free fallback", value: "yes" },
  ],
  paradigmTitle: "Why another tool?",
  paradigmSub:
    "Claude Code is excellent, but there are situations where Aider is preferable: totally free, isolated, local models, or CI/CD-friendly.",
  paradigmShifts: [
    {
      before: "Claude Pro at $20/month is the minimum for AI coding",
      after: "Aider + OpenRouter free tier (Qwen 2.5 Coder / DeepSeek V3) = $0, full stop",
      icon: DollarSign,
    },
    {
      before: "Every project runs on the same credentials",
      after: "Aider is isolated — separate account with its own credits, never touches Max",
      icon: Lock,
    },
    {
      before: "Adding AI to CI/CD means building a wrapper from scratch",
      after: "aider --yes --message 'fix lint' inside a GitHub Action",
      icon: Zap,
    },
    {
      before: "Company secrets leave the machine",
      after: "Aider + Ollama (Qwen 3 Coder / DeepSeek Coder) = fully air-gapped",
      icon: Terminal,
    },
  ],
  whoIsThisFor: [
    {
      title: "Developers without Claude Pro",
      description:
        "Want free AI pair programming — OpenRouter with Qwen 2.5 Coder:free or DeepSeek V3:free delivers most of the value.",
      icon: DollarSign,
      color: "from-emerald-500 to-green-500",
    },
    {
      title: "Strict privacy requirements",
      description:
        "Aider + local Ollama = air-gapped. Code never leaves the machine. Ideal for medical, legal, defense.",
      icon: Lock,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "CI/CD automation",
      description:
        "Adding an AI fix step to a pipeline — Aider is the right CLI for the job (full support for the --yes flag so it runs without prompts).",
      icon: Zap,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Claude Code users who want a backup",
      description:
        "Out of Max quota? Aider on separate credits continues the work without eating your primary token budget.",
      icon: RefreshCw,
      color: "from-violet-500 to-purple-500",
    },
  ],
  toc: [
    { id: "what-is", label: "What it is" },
    { id: "install", label: "Install & isolation" },
    { id: "models", label: "Models" },
    { id: "workflow", label: "Workflow" },
    { id: "advanced", label: "Advanced techniques" },
    { id: "compare", label: "Aider vs. Claude Code" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Terminal,
      title: "Aider — what it is",
      subtitle: "A terminal tool that edits your files for you and saves everything to git",
      description:
        "Aider is an open-source tool from researcher Paul Gauthier — an \"AI pair-programmer\" that runs inside your terminal window (the black-and-white command-line interface). It's written in Python and connects to an LLM (Large Language Model — like [Claude](/en/claude-code), OpenAI's GPT, or Google's Gemini) to understand what you want and apply the change directly to your code files. Unlike a regular chat where you get back text and have to copy it over by hand — Aider edits the files itself, runs tests on request, and even commits (saves a checkpoint in your project's git history) with a message it writes on its own.",
      color: "from-orange-600 to-red-500",
      difficulty: "beginner",
      beginner:
        "Think of it as having a programming partner sitting next to you, except instead of talking you type a request in English (or Hebrew) — and they open the file themselves, fix what needs fixing, and note in the project's history what changed and why. You open a terminal, cd into your project folder, run `aider`, and say something like \"fix the bug in login.ts\" — and within seconds the file is updated. Want to undo? A single command (`/undo`) rolls everything back. It's exactly like working with [Claude Code](/en/claude-code), except Aider is the simpler, free alternative.",
      content: [
        "Aider is a CLI tool written in Python (CLI = Command Line Interface — the tools that run inside that black terminal window). Installing it is a single command: `pipx install aider-chat`. Why pipx and not plain pip? Because pipx gives the tool its own isolated environment that won't conflict with other projects on your machine — exactly what you want for something installed globally.",
        "Repo-map — one of Aider's smartest capabilities. When it opens your project, it scans every file, builds a short summary of each one, and sends the LLM only the parts relevant to the current request. That saves a huge number of tokens (the units AI models charge for) and lets it work on massive projects without overwhelming the model.",
        "Auto-commit — every change Aider makes is automatically saved to git (the version-control system for your code) with a clear message: what changed, what you asked for, and which model was used. That means even if something goes wrong, you always have a full \"undo button\" for every step.",
        "Diff view — before any change, Aider shows you clearly what it's about to do: deletions in red, additions in green. If you don't like it — `/undo` and it rolls back. The feeling is like working with a partner who asks permission for every move.",
        "Supports 200+ models via a library called LiteLLM (a kind of \"universal translator\" between different AI providers). You can pick [Claude](/en/claude-code) Sonnet / Haiku / Opus from Anthropic, GPT-5 / GPT-4.1 / o4-mini from OpenAI, Gemini 2.5 Pro / Flash from Google, Grok from xAI, local models via [Ollama](/en/guide/ollama), or 300+ models via OpenRouter (a payment gateway that aggregates providers from Anthropic, OpenAI, Google, Meta, DeepSeek, Mistral AI, xAI, Cohere, and more).",
        "Two run modes: interactive chat mode (you talk, it replies, it streams changes live) and non-interactive mode activated with `--yes --message '...'` — a mode where Aider takes a single command, executes it, and exits. That's the mode that lets you embed it into CI/CD (automation systems like GitHub Actions that run after every commit).",
      ],
      tips: [
        "In my experience Aider works best on projects that are well organized: clean git, clear typings, a tests folder. The more structured the project, the faster the LLM understands it and the more accurate its answers become.",
        "Use `/add file.ts` to add a file to the context (the material the LLM can see right now) — that's what allows Aider to edit it. For files you're done with — `/drop file.ts`. A good rule is to work with 3-5 relevant files at a time rather than dumping the whole project in.",
        "The `/git <command>` command runs a git command directly from inside Aider — saving you from opening a second terminal. `/git status`, `/git log`, `/git diff main` — all of them work.",
      ],
    },
    {
      id: "install",
      icon: Lock,
      title: "Installation with full isolation from Claude Code",
      subtitle: "Separate environment + separate credentials — without touching your primary subscription's quota",
      description:
        "The most important step for serious Aider use is installing it in isolation — meaning a separate Python environment with API keys that are separate from [Claude Code](/en/claude-code). An API key is a secret code that identifies your account with the AI provider (Anthropic, OpenAI, Google, etc.) and is what you get billed on. On my setup Aider lives in a dedicated folder `/opt/aider/` with an OpenRouter key that is completely separate from my [Claude Max](/en/claude-code) account — so working with Aider never dips into the primary tool's quota.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "intermediate",
      beginner:
        "Why go to all this trouble to isolate things? Think of it like two bank accounts: one for work, one for savings. If they share a credit card, every purchase eats into the savings too. Same idea here — if Aider uses the same API keys as [Claude Code](/en/claude-code), every line of code it writes comes out of the same monthly quota. Full isolation = peace of mind. Aider runs on a free OpenRouter account (a gateway that offers free models like Alibaba Cloud's Qwen 2.5 Coder:free and DeepSeek's DeepSeek V3:free) while [Claude Code](/en/claude-code) keeps humming along on the primary subscription.",
      content: [
        "Clean install: `pipx install aider-chat` — this command gives Aider its own Python environment in `~/.local/pipx`, so it won't conflict with the libraries of other projects. pipx is a tool built specifically to install Python CLI utilities globally in isolation.",
        "Fully separate account: go to openrouter.ai, sign up for free, generate an API key, and use it with a free model like `qwen/qwen-2.5-coder-32b-instruct:free` or `deepseek/deepseek-chat-v3:free`. These models are open-source (Qwen from Alibaba Cloud, DeepSeek from DeepSeek), impressively capable, and cost nothing — perfect as a backup. Note that OpenRouter's free tier is rate-limited (requests per minute and daily cap); beyond that you move to a paid tier.",
        "A configuration file `~/.aider.conf.yml` tells Aider which default model to pick and where to find it. For example: `model: openrouter/qwen/qwen-2.5-coder-32b-instruct:free` + `openai-api-base: https://openrouter.ai/api/v1`. That way every time you launch Aider it already knows where to connect.",
        "Critical note: do not set the `ANTHROPIC_API_KEY` environment variable in the same terminal where Aider runs — otherwise Aider will pick it up automatically (that's its default) and silently burn through your [Claude](/en/claude-code) quota without you noticing. Either run Aider from a script with `env -i` (which starts with a clean environment) or put the keys inside `.aider.conf.yml` itself rather than in env vars.",
        "If you actually do want to use Anthropic through Aider — create a separate API key in the Anthropic dashboard, set a billing cap on it ($10/month), and that becomes your safe buffer. If that key burns, the primary [Claude Code](/en/claude-code) keeps working without interruption.",
        "Want full privacy? Set `model: ollama/qwen2.5-coder:32b` (or `qwen3-coder` if you've pulled Qwen 3 Coder) + `api_base: http://localhost:11434`. [Ollama](/en/guide/ollama) is a tool that runs AI models directly on your own machine, without sending a single line of code to an external server. Perfect for sensitive domains like medical, legal, or confidential company code.",
      ],
      tips: [
        "On Windows or WSL (Windows Subsystem for Linux — a Linux environment running inside Windows), `pipx install aider-chat` usually just works. If you hit dependency issues, a good fallback is to install through conda — an alternative package manager: `pipx install conda` first, then install Aider inside it.",
        "Set `.aider.conf.yml` both in your home folder (`$HOME`) and at the root of the specific project. Project settings override the global ones — so you can configure an expensive model for an important project and a free model for everything else.",
        "Don't forget to add `aider-chat-logs/*` to your project's `.gitignore`. Aider keeps detailed logs of every conversation, and those shouldn't end up in a PR (Pull Request — a request to merge code into the main branch). That saves disk space and avoids exposing internal details.",
      ],
      codeExample: {
        label: "~/.aider.conf.yml with OpenRouter",
        code: "model: openrouter/qwen/qwen-2.5-coder-32b-instruct:free\nweak-model: openrouter/qwen/qwen-2.5-coder-32b-instruct:free\nopenai-api-base: https://openrouter.ai/api/v1\n# API key in env: OPENROUTER_API_KEY=sk-or-...\nauto-commits: true\nauto-lint: true\nedit-format: diff\nstream: true\nshow-diffs: true\nsubtree-only: true",
      },
    },
    {
      id: "models",
      icon: Cpu,
      title: "Models — what works best for which use case",
      subtitle: "Free vs. paid, code-specialized vs. general-purpose",
      description:
        "Aider can connect to more than 200 different AI models through a library called LiteLLM (think of it as a \"universal adapter\" that translates requests for each provider separately). In practice, most developers stick with 5-7 models that cover 95% of their needs. In this section we'll walk through them by category — from the priciest and strongest down to the free alternatives that still do 80% of the work. Choosing well saves a lot of money: you don't want to burn the top model on fixing a typo.",
      color: "from-indigo-600 to-blue-500",
      difficulty: "intermediate",
      content: [
        "[Claude Sonnet 4.6](/en/claude-code) from Anthropic — currently the best model for complex code editing, especially in large projects with many interdependent files. Cost: about $3 per million input tokens and $15 per million output tokens (one million tokens ≈ 750,000 words). This is a model that handles long context and does refactoring (reorganizing code) smoothly. It's my primary choice for [Claude Code](/en/claude-code).",
        "GPT-5 and GPT-4.1 from OpenAI — excellent for problems that demand deep reasoning and for changes that touch many files at once. GPT-5 is the new flagship, GPT-4.1 is the stable veteran, and o4-mini (the successor to o3-mini) is the snappier, cheaper reasoning-focused sibling. Useful when you want a second opinion on something Claude is struggling with.",
        "Gemini 2.5 Pro and Gemini 2.5 Flash from Google — 2.5 Pro is comparable in quality to GPT-5 at a significantly lower price (around $1.25/M input), and Flash is even cheaper for fast tasks. Especially brilliant for mass fixes (batch fixes) — for example, \"go through 50 files and replace the old function with the new one in each.\" Thanks to its long context (a million tokens — two million in the Pro version) it can hold entire projects in RAM.",
        "Qwen 2.5 Coder 32B:free and Qwen 3 Coder from Alibaba Cloud, via OpenRouter — among the best free code models available today. Slower than paid models and rate-limited on the free tier, but absolutely free. On my setup this is the backup when [Claude Max](/en/claude-code) hits its quota. For you — if you don't have Claude Pro/Max, this can be your primary tool. Qwen 3 Coder (the newer generation) is available on OpenRouter's paid tier at a very competitive price.",
        "DeepSeek V3 and DeepSeek Coder from DeepSeek — excellent performance-per-dollar ratio. DeepSeek V3 is a strong general-purpose reasoning model, and it's available on OpenRouter's free tier as `deepseek/deepseek-chat-v3:free`. Particularly strong on Python, a little less sharp on TypeScript.",
        "[Ollama](/en/guide/ollama) with local Qwen 2.5 Coder / Qwen 3 Coder / DeepSeek Coder / Llama 3 (from Meta) / Gemma 3 (from Google DeepMind) — the most private option available. Code never leaves your machine, there's no log at any cloud provider, and it's perfect for sensitive industries (medical, legal, defense). The one requirement: a computer with a strong GPU (graphics processing unit) — at least 24GB VRAM for the 32B-class models. Without a good GPU it's very slow.",
        "The `--weak-model` flag — a clever cost-saver. Aider uses a small, simple model for writing commit titles (the short message describing what changed). There's no reason to burn expensive Sonnet on \"fix: typo in login\" — set `weak-model: anthropic/claude-haiku-4-5` (Haiku is far cheaper: ~$1/M input, $5/M output) or a free OpenRouter model and you'll save 30-40% on total cost.",
        "`/architect` mode — a powerful feature: a strong model (e.g., Sonnet 4.6 or o4-mini) handles planning, then its plan is passed to a cheaper editor-model that applies the actual changes. Result: premium-model planning quality at a mid-tier model's cost.",
      ],
      tips: [
        "The `--edit-format diff` flag fits most projects — it sends the LLM only the change itself, not the whole file. For large, complex changes, `--edit-format udiff` is better (a more sophisticated diff format). Sonnet 4.6 handles both better than any other model.",
        "Before launching a large request through Aider, run the `/tokens` command inside the session — it shows you how many tokens are currently in context and the estimated cost of another request. About 30K tokens is a normal conversation, 100K is already expensive, and over 200K is a gamble on your wallet.",
        "For simple problems (typos, single-line fixes, variable renames) — use Claude Haiku 4.5 from Anthropic, GPT-4.1 mini from OpenAI, Gemini 2.5 Flash, or Qwen 2.5 Coder:free. No sense burning Claude Opus 4.5, Anthropic's most expensive model ($15/M input), on a five-minute bug.",
      ],
      codeExample: {
        label: "hybrid: Sonnet for main, Haiku for weak, architect mode",
        code: "# In ~/.aider.conf.yml\nmodel: anthropic/claude-sonnet-4-6\nweak-model: anthropic/claude-haiku-4-5  # for commit titles + small tasks\neditor-model: anthropic/claude-sonnet-4-6\narchitect: true  # planning on strong model, edits on cheaper model\n# Saves 30-40% on tokens",
      },
    },
    {
      id: "workflow",
      icon: Keyboard,
      title: "The daily workflow",
      subtitle: "What to type at each step and the shortcut commands that save hours",
      description:
        "Aider comes with about 25 short commands that start with a slash (slash commands) — each one a separate tool that speeds up a common action. If you remember 7-8 of them, your work becomes several times faster. In this section we'll walk through the typical loop that repeats itself in almost every session of mine: from opening Aider inside a project folder all the way to committing a new feature.",
      color: "from-purple-600 to-violet-500",
      difficulty: "intermediate",
      content: [
        "Start a session: `cd project && aider` — cd into the project folder and launch. Aider scans all the files, builds its repo-map (its own project map), and waits for your first command.",
        "`/add path/to/file.ts` — adds a file to context so Aider can read and edit it. You can add several files on one line separated by spaces. Without /add, the file is only \"seen\" from afar via the repo-map and can't be edited.",
        "`/ls` — shows a list of everything currently in context: which files have been added, how many tokens each occupies, and which ones are read-only (readable but not editable).",
        "`/drop file.ts` — removes a file from context after you're done with it. That saves tokens and makes room for the next files. Tip: don't forget to drop files you're done with, otherwise the context balloons.",
        "A natural-language request — for example, \"add validation (input checking) to the email field in src/forms/signup.ts so it rejects invalid addresses.\" Aider edits the file, shows a diff, asks for approval, and commits with a detailed message.",
        "`/diff` — shows the most recent change Aider made in a visual way: red for what was removed, green for what was added. Handy for a quick approval before moving on.",
        "`/undo` — reverts the most recent git commit (using `git reset --soft`, so the changes are still on disk but no longer recorded in a commit). A life-saver when the model overshoots.",
        "`/test` — runs the project's test suite based on your configuration. Aider will see the output and can suggest fixes for failing tests.",
        "`/tokens` — how many tokens are currently in context and the estimated cost of another request. Great for knowing when to `/clear` and start a fresh session.",
        "`/clear` — wipes the chat history but keeps the files you added. Useful when you move from one task to another and don't want Aider to \"remember\" what came before.",
        "`/exit` — a clean exit. Changes are already saved in git, so closing Aider doesn't hurt your work.",
      ],
      tips: [
        "Start every session with `/add` for all the relevant files before your first request. Comprehensive context = better answers. Don't drip-feed files one by one — it confuses both the LLM and you.",
        "`/model anthropic/claude-sonnet-4-6` swaps the model mid-session. Useful when the weaker model is failing and you need to \"upgrade\" to something more serious — or the other way around, when you finished the hard part and want to drop back to a cheap model for small tasks. Other time-savers: `/architect` to enable architect mode, `/commit` for a manual commit, and watch mode (`--watch-files`) which makes Aider automatically follow files you edit in another editor.",
        "`/voice` — if you set up OpenAI Whisper (a per-minute speech-to-text service, or a local alternative like whisper.cpp), you can dictate requests out loud instead of typing. About 2x faster, especially in Hebrew. For me it saves a ton of time during long sessions in front of the screen.",
      ],
      codeExample: {
        label: "a typical session",
        code: "$ cd my-project\n$ aider\n> /add src/auth/login.ts src/auth/types.ts\n> Fix the user type — email can be null\n[Aider edits, commits, shows diff]\n> /test\n[runs npm test]\n> The test passes. Add a test for this case.\n[Aider writes test, commits]",
      },
    },
    {
      id: "advanced",
      icon: Layers,
      title: "Advanced techniques",
      subtitle: "Automation, CI/CD, voice input, and monorepos",
      description:
        "One of Aider's most powerful capabilities is non-interactive mode — a mode where it runs without a chat UI, takes a single command, executes it, and exits. This opens the door to an entire world of automation: automatic runs on every Pull Request, overnight lint fixes across dozens of projects, auto-generated documentation for new code. In this section we'll walk through the advanced techniques that turn Aider into a system rather than just a manual tool.",
      color: "from-rose-600 to-pink-500",
      difficulty: "advanced",
      content: [
        "Non-interactive mode: `aider --yes --message 'fix all lint errors' file.ts` — Aider starts, performs the request, and exits with no approval prompts. The `--yes` flag means \"say yes to every question.\" That's the foundation of any automation.",
        "Scripting: you can wrap Aider in a shell script and hook it into git hooks (mechanisms that run automatically at specific points in git, e.g., before every commit). Example: a pre-commit hook that runs Aider to fix lint errors in the files you changed before the commit starts.",
        "GitHub Actions: Aider runs beautifully on GitHub runners (temporary servers that execute automation on every push to a project). A common example — every time a Pull Request is opened, Aider walks the code, fixes lint and formatting issues, and adds a fixup commit. The ANTHROPIC_API_KEY is stored as an encrypted GitHub secret.",
        "Voice input: `aider --voice-language he` via OpenAI Whisper — lets you dictate requests in Hebrew instead of typing. 2x faster for long sentences, and works especially well in Hebrew.",
        "Multi-repo and monorepos: the `--git-dname` flag lets you point at a specific git repo even when you're sitting in a different folder. Especially useful in a monorepo (one project that holds many sub-projects) where each package can be its own repo.",
        "CONVENTIONS.md: one of Aider's quietest and most useful features. Write a CONVENTIONS.md at the project root with 10-15 rules (\"I use bun, not npm\", \"always TypeScript strict\", \"semicolons at end of line\"), and Aider reads it before every request and sticks to the rules. It's effectively a style guide the AI actually respects.",
        "Read-only context: the `--read-only file.ts` flag tells Aider \"read this file for understanding, but don't touch it.\" Useful when you want something to serve as context without being at risk of being changed — e.g., schema files, constants, or base configuration.",
        "Linter integration: `--auto-lint` runs a linter (a style-checking tool) automatically after every Aider edit. If lint fails, Aider sees the errors and fixes them on the spot. That way the code comes out clean from the start.",
      ],
      tips: [
        "Set up a CONVENTIONS.md with 10-15 golden rules for the project — Aider follows them on every edit. On my side there are things like \"always use [better-result](/en/claude-code) for error handling, not try/catch,\" \"bun not npm,\" \"Tailwind v4 primitives only.\"",
        "In CI: always pair `--yes` with `--no-pretty` (which suppresses ANSI colors in logs — they come out as \"gibberish\" in non-terminal logs). Before deploying for real, run the flow once on a private branch to make sure the output comes out clean.",
        "In a monorepo: run Aider from the individual package, not from the monorepo root. That makes its repo-map much more accurate and avoids flooding the LLM with 200 files that have nothing to do with the current request.",
      ],
      codeExample: {
        label: "GitHub Action for automatic lint fix",
        code: "name: Aider Lint Fix\non:\n  pull_request: { types: [opened] }\njobs:\n  fix:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: pip install aider-chat\n      - run: aider --yes --message 'fix all lint errors' --no-pretty\n        env:\n          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC }}\n      - uses: stefanzweifel/git-auto-commit-action@v5",
      },
    },
    {
      id: "compare",
      icon: CheckCheck,
      title: "Aider vs. Claude Code",
      subtitle: "When each one wins — not a replacement, but a complement",
      description:
        "Both are excellent tools, and honestly they don't really compete — they complement each other. The choice depends on context: what the task is, what the budget looks like, whether you need absolute privacy or cloud is fine. My own setup is [Claude Code](/en/claude-code) as the primary for serious, day-to-day development and Aider for isolated tasks and for saving against the primary subscription's quota. For you — the choice starts with one question: \"Do I have a [Claude Max](/en/claude-code) subscription?\" If yes, Claude Code leads. If not, Aider takes the stage.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "beginner",
      content: [
        "[Claude Code](/en/claude-code) offers a rich work experience: a full graphical terminal UI, native integration with MCP (Model Context Protocol — a standard protocol for connecting Claude to external tools), sub-agents (helper agents that run tasks in parallel), skills, hooks (automatic actions that run at specific points), TodoWrite (an internal task list manager). Ideal for serious development on a Max subscription at $100 or $200/month.",
        "Aider is a pure, minimal CLI — simpler, faster, easier to automate. Supports 200+ AI providers via LiteLLM (Anthropic, OpenAI, Google, xAI, Meta via OpenRouter, DeepSeek, Mistral AI, Cohere, and more), has a fully free path via OpenRouter, and community-supported MCP integration (via forks and manual configuration). Advantage: anyone who needs a backup or has no budget still gets a high-quality tool.",
        "Code editing: [Claude Code](/en/claude-code) with its diff UI is more comfortable for interactive work. Aider with patch mode is especially strong in automated CI (the output is short and easy to parse).",
        "Git integration: both tools are excellent, but with Aider it's fully automatic — every change becomes a commit without asking. [Claude Code](/en/claude-code) requires an explicit `/commit` command, which gives you more control but takes more steps.",
        "Multi-file context: [Claude Code](/en/claude-code) uses sub-agents for very large projects (tens of thousands of files). Aider with repo-map works nicely up to medium-large scale, and beyond that it's better to scope down to a single sub-project.",
        "Monthly cost: [Claude Code](/en/claude-code) requires a Max subscription ($100 or $200/month) or a pay-as-you-go API key. Aider can be completely free with Qwen 2.5 Coder:free or DeepSeek V3:free via OpenRouter, or low-cost with OpenRouter pay-as-you-go.",
        "Local AI: Aider works great alongside [Ollama](/en/guide/ollama) and enables air-gapped work (fully disconnected from the internet — code never leaves the machine). [Claude Code](/en/claude-code) depends on Anthropic's cloud service and currently has no offline mode.",
      ],
      tips: [
        "On my setup the combination is: [Claude Code](/en/claude-code) for planning and complex tasks that need long thinking alongside [Kami](/en/guide/kami), [Kaylee](/en/guide/kaylee), and the [Delegator](/en/guide/delegator) agents. Aider for mass lint fixes and large refactors across dozens of files.",
        "If you have [Claude Max](/en/claude-code) — [Claude Code](/en/claude-code) wins 90% of the time thanks to sub-agents, MCP, and planning capabilities. Aider plays the backup role, or handles sensitive code that demands an air-gap, or powers CI/CD.",
        "If you don't have [Claude Max](/en/claude-code) — start with Aider + OpenRouter Qwen 2.5 Coder:free or DeepSeek V3:free. You'll get 80% of the capability for free. When you hit a request Aider can't handle, consider moving to [Claude Code](/en/claude-code).",
      ],
    },
  ],
  resources: [
    {
      title: "aider.chat",
      description: "The official Aider site + docs",
      href: "https://aider.chat",
      icon: ExternalLink,
    },
    {
      title: "Aider on GitHub",
      description: "The open-source repo + issues + release notes",
      href: "https://github.com/paul-gauthier/aider",
      icon: Github,
    },
    {
      title: "OpenRouter",
      description: "API gateway for 300+ models including a free tier (Qwen 2.5 Coder, DeepSeek V3)",
      href: "https://openrouter.ai",
      icon: ExternalLink,
    },
    {
      title: "LiteLLM",
      description: "The library Aider uses. Helpful for understanding provider support",
      href: "https://github.com/BerriAI/litellm",
      icon: Github,
    },
    {
      title: "Aider benchmarks",
      description: "Model comparison on coding tasks — updated monthly",
      href: "https://aider.chat/docs/leaderboards",
      icon: ExternalLink,
    },
    {
      title: "The Claude Code guide",
      description: "My primary tool; Aider is the complement",
      href: "/en/claude-code",
      icon: BookOpen,
    },
  ],
  ctaTitle: "A complementary tool for every developer",
  ctaSub:
    "Whether you have Claude Max or not — Aider is a CLI worth knowing. 5 minutes to install, hours saved.",
  primaryCta: {
    label: "aider.chat",
    href: "https://aider.chat",
    icon: ExternalLink,
  },
  secondaryCta: {
    label: "Questions about setup",
    href: "https://wa.me/972525427474",
    icon: Mail,
  },
  authorBio:
    "Aider complements Claude Code for isolated tasks: lint fixes, small refactors, and CI automations. The main advantage — support for 200+ models via LiteLLM including free (Qwen 2.5 Coder, DeepSeek V3 via OpenRouter) and local (Ollama) ones, so you can build a hybrid that saves on cost without giving up quality. This guide walks through the isolated setup, picking the right model per task, and how to fit Aider into a daily workflow or an automated pipeline.",
};
