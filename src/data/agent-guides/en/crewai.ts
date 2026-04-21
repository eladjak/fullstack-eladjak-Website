import {
  Users,
  Workflow,
  Target,
  Bot,
  FileText,
  Github,
  ExternalLink,
  BookOpen,
  Code2,
  Rocket,
  Lightbulb,
  Zap,
  Star,
  Mail,
  Sparkles,
  DollarSign,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const crewaiGuideEn: AgentGuideData = {
  slug: "crewai",
  agentName: "CrewAI",
  agentNameHe: "CrewAI — Multi-Agent Teams",
  logoImage: "/images/guide-logos/crewai-logo.png",
  tagline: "Instead of a single agent, a team of specialists working together",
  heroDescription:
    "CrewAI is an open-source Python framework for orchestrating multiple AI agents around a shared task. Each Agent is defined with a role, a goal, a set of tools, and its own LLM (for example [Claude](/en/claude-code) or a local model via [Ollama](/en/guide/ollama)); workflows are described as `sequential`, `hierarchical` or `consensus`. A typical deployment runs behind FastAPI + [Docker](/en/guide/docker). I currently run 10 crews on my VPS (blog-he, marketing-team, yt-to-blog-he, research-crew and more) — but for you, CrewAI can power content automation, research ops, distributed code review, data analysis, customer research, or anything that needs more than a single prompt to a single LLM.",
  badgeText: "2026 · Multi-Agent Orchestration · Practical Guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/crewai",
  heroBgImage: "/images/guides/guide-crewai-hero.jpg",
  stats: [
    { label: "crews in my network", value: "10" },
    { label: "crew runtime", value: "60-180s" },
    { label: "average cost", value: "free" },
    { label: "agents per crew", value: "2-5" },
  ],
  paradigmTitle: "From a single LLM to an AI team",
  paradigmSub:
    "The difference between asking ChatGPT to write something and running a full marketing squad — is substantial.",
  paradigmShifts: [
    {
      before: "One LLM trying to do everything — shallow, generic",
      after: "3 specialized agents — researcher, strategist, writer — deep work",
      icon: Users,
    },
    {
      before: "Long, tangled prompts crammed with every instruction",
      after: "A short role + goal per agent; the output is cleaner",
      icon: Target,
    },
    {
      before: "One uniform, flat result",
      after: "Each agent brings its own expertise, producing layered output",
      icon: Sparkles,
    },
    {
      before: "Days of engineering for a complex workflow",
      after: "A new crew in 20 lines of Python, running in minutes",
      icon: Zap,
    },
  ],
  whoIsThisFor: [
    {
      title: "Content creators",
      description:
        "Research → draft → edit → SEO. Four roles, one crew, a finished article.",
      icon: FileText,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Marketing teams",
      description:
        "Audience analysis → positioning → copy — like a tiny ad agency in a box.",
      icon: Star,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Agent developers",
      description:
        "The cleanest framework for multi-agent workflows. Python, plain and simple.",
      icon: Code2,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Product companies",
      description:
        "Research crew, product crew, onboarding crew — a workflow for every surface.",
      icon: Rocket,
      color: "from-pink-500 to-rose-500",
    },
  ],
  toc: [
    { id: "what-is", label: "What it is" },
    { id: "concepts", label: "Concepts" },
    { id: "first-crew", label: "First crew" },
    { id: "examples", label: "Examples" },
    { id: "gemini", label: "Gemini gotchas" },
    { id: "advanced", label: "Advanced" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Users,
      title: "What is CrewAI? An AI team that works for you",
      subtitle:
        "An open-source Python library for orchestrating multiple AI agents around a shared task",
      description:
        "CrewAI is a Python library that began as an open-source project in 2023, born from a simple realization: no matter how capable a single language model is, it rarely produces the best result on genuinely complex tasks. CrewAI's approach is simple but elegant: instead of asking one AI to write an entire article, you define a team of agents — each with a clear role, a defined goal, and access to its own tools — and let them work together, the way a human team would. The result is deeper, more accurate, and usually cheaper, because you can reserve your strongest model for the parts that truly need it. An Agent is the basic worker; a Task is a unit of work; a Crew is the whole team plus the Process that ties them together; and an LLM is the model that powers each agent.",
      color: "from-violet-600 to-purple-500",
      difficulty: "beginner",
      beginner:
        "Imagine you want to write a great marketing article. Instead of asking [ChatGPT](/en/claude-code) for it in one message, imagine hiring a three-person team — a researcher who gathers the facts, a strategist who picks the angle and headline, and a writer who crafts the tone. That is exactly what CrewAI does — except the team is virtual, never tires, and costs less than a cup of coffee. Each 'employee' is an independent AI agent with a role, a goal, and tools of its own — and they hand work off to each other like a real crew.",
      content: [
        "Agent: the basic unit — every agent is defined with a role (what it does), a goal (what it is trying to achieve), a backstory (background that shapes its personality), tools (what it can call), and an llm (the model driving its reasoning).",
        "Task: a single unit of work — what needs to be done, what the expected output looks like, and which agent owns it. The output of one task can flow as input into the next.",
        "Crew: the collection of agents + tasks + process. This is the 'organization' you actually run.",
        "Process: how the team operates — sequential (each task waits for the previous one), hierarchical (a manager dispatches work), or consensus (the agents deliberate together).",
        "LLM: CrewAI supports every major model — Anthropic's [Claude](/en/claude-code), Google's Gemini, OpenAI's GPT, and local models via [Ollama](/en/guide/ollama). You can assign a different model to each agent — for example a researcher on Gemini (fast and cheap) and a writer on Claude (stronger for nuanced language).",
        "Tools: Python functions your agents can invoke — web search, database queries, API calls, sending a message through the [Delegator](/en/guide/delegator), searching [Qdrant](/en/guide/qdrant), and more.",
      ],
      tips: [
        "A crew can live behind FastAPI + [Docker](/en/guide/docker) and be exposed as an HTTP service — which is exactly how my agents run. That makes it easy to wire crews into webhooks, cron jobs, or a control surface like a [Dashboard](/en/guide/dashboard).",
      ],
    },
    {
      id: "concepts",
      icon: Workflow,
      title: "Agent, Task, Crew — the core concepts",
      subtitle: "Four ideas that cover 90% of what you'll ever need",
      description:
        "CrewAI's structure feels like running a virtual team: you have agents (the workers), tasks (what needs doing), and the crew itself (how they operate together). Every concept here is a Lego brick you can snap together — once you internalize the four fundamentals, any workflow you can imagine becomes reachable. The code is clean enough that my small crews come in under 30 lines of Python, and even the larger ones powering my [full projects](/en/guide/delegator) rarely exceed 100 lines.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "intermediate",
      content: [
        "Agent is a single worker — you define its role (for example 'Hebrew writer' or 'market researcher'), its goal, a backstory that sets its personality and tone, and its llm (the model driving it — [Claude](/en/claude-code), Gemini, or a local model via [Ollama](/en/guide/ollama)).",
        "Task is a single assignment — a description of what to do, an expected_output describing what the result should look like, and the agent responsible. Think of it as a clear work order you hand to an employee.",
        "context=[t1] — the mechanism that chains tasks. The next task receives t1's output as its input, just like a writer receiving the researcher's notes before starting.",
        "Crew is the team itself — a bundle of agents + tasks + process. It is the object you actually run, and it holds the logic for how work flows between members.",
        "crew.kickoff(inputs={'topic': 'AI'}) starts the crew. The {topic} placeholder is substituted automatically throughout every description — which is how you reuse the same crew across different subjects without rewriting code.",
        "The object returned by kickoff contains the raw output of the final task — the team's end product. Sometimes it is an article, sometimes JSON, sometimes a decision — whatever you declared as expected_output.",
      ],
      codeExample: {
        label: "A simple crew in 20 lines",
        code: "from crewai import Agent, Task, Crew, Process, LLM\n\nllm = LLM(model='gemini/gemini-2.5-flash', api_key=KEY)\n\nwriter = Agent(\n    role='Hebrew Writer',\n    goal='Write clear Hebrew',\n    backstory='Warm, direct tone.',\n    llm=llm,\n)\n\ntask = Task(\n    description='Write about {topic} in 300 words',\n    expected_output='Hebrew article',\n    agent=writer,\n)\n\ncrew = Crew(agents=[writer], tasks=[task], process=Process.sequential)\nresult = crew.kickoff(inputs={'topic': 'TypeScript'})",
      },
    },
    {
      id: "first-crew",
      icon: Rocket,
      title: "Your first crew in 15 minutes",
      subtitle: "Install, configure, and run",
      description:
        "Your first crew is the classic research → writing → editing pipeline, exactly like the way a real content team splits its work. You provide a topic, and your virtual team returns a polished article. It is no more than 30 lines of Python, and anyone coming from [Claude Code](/en/claude-code) or the agent world will recognize the philosophy immediately. You can run this crew locally on your machine or, like mine, host it on a VPS and call it through an API.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "beginner",
      beginner:
        "This is the moment you go from 'I've heard of CrewAI' to 'I have a crew that works'. Install the library, grab a free Gemini key, define three simple agents, and run it. If you've never written Python end to end — do not worry, the code is short and clear, and you can ask [Claude](/en/claude-code) to walk you through it step by step.",
      content: [
        "pip install crewai crewai-tools installs the library itself and the default tool pack — web search, file reading, scraping, and more.",
        "Grab a free Gemini API key from ai.google.dev — Google gives you a million tokens per month for free, more than enough for dozens of crew runs.",
        "Define three agents: a researcher (pulls the facts), a writer (turns facts into flowing prose), and a reviewer (critiques and polishes).",
        "Define three tasks with context — the writer receives the researcher's output, and the reviewer receives the writer's draft. A flow that mirrors a newsroom.",
        "crew.kickoff(inputs={'topic': 'yours'}) triggers the whole chain. Pass in a topic and get a finished piece back.",
        "The final result is the output of the last task — the reviewer's edited version, which is effectively the article after three virtual pairs of eyes.",
      ],
      tips: [
        "Start with Gemini Flash — it is free, fast, and solid. Only upgrade a specific agent to [Claude](/en/claude-code) or GPT if the output leaves you wanting more.",
        "The backstory is the most important piece — a few sentences that encode personality, tone, and expertise. My writer's backstory includes examples from how [Kami](/en/guide/kami) writes, so the output sounds authentic rather than generic.",
      ],
    },
    {
      id: "examples",
      icon: Target,
      title: "3 real crews in production",
      subtitle: "Education pipeline, marketing team, YT → blog",
      description:
        "Theory is great — but here is how it looks in the wild. These are three crews I run daily on my VPS, producing real content. Each one is a role split that mirrors a human team — someone researches, someone shapes the message, someone writes in fluent Hebrew. You can clone the skeleton and adapt it to your domain: a legal advisory crew, a customer support crew, a data analysis crew — same principles, different roles.",
      color: "from-amber-600 to-orange-500",
      difficulty: "intermediate",
      content: [
        "education_pipeline — three agents: a Researcher (scans the web), a Curriculum Designer (builds the lesson structure), and a Hebrew Writer (writes in clear Hebrew). Output: a full 800–1200 word lesson, ready to publish.",
        "marketing_team — Audience Analyst (profiles the target audience) → Positioning Strategist (picks the angle) → Hebrew Copywriter (writes the copy). Output: three headlines, a subline, a social post, and an email subject line. A miniature marketing department inside a single crew.",
        "yt_to_blog_he — Summarizer (compresses a YouTube transcript) → Hebrew Writer (turns the summary into an article) → SEO Specialist (adds headings and meta tags). Output: a full blog post with metadata, ready to upload to WordPress through [n8n](/en/guide/n8n).",
        "Each crew takes its own {inputs} — education uses topic, marketing uses product, YT → blog uses video_id. The same crew serves an unlimited number of runs.",
        "Typical runtime is 60–180 seconds — three LLM calls with context flowing between them. Not instant, but excellent for asynchronous pipelines.",
        "Cost is essentially zero thanks to Gemini Flash's generous free tier. For me, running all ten crews together costs less than a single coffee per month.",
      ],
      tips: [
        "I load a style guide ('how Elad writes') directly into the writer's backstory — complete with excerpts from earlier posts. The output genuinely sounds like me, not like generic ChatGPT.",
        "Store your crews as separate YAML or Python files and load them dynamically through the [Delegator](/en/guide/delegator) — that way you can trigger any crew remotely over HTTP without touching the code.",
      ],
    },
    {
      id: "gemini",
      icon: Lightbulb,
      title: "Gemini + CrewAI — what to know up front",
      subtitle: "ReAct parser issues on long inputs",
      description:
        "This is the trap that cost me a few sleepless nights, so it is worth flagging early. CrewAI orchestrates its agents using a universal format called ReAct (Reasoning + Action) — a kind of internal language between the team and its conductor. Gemini, smart as it is, does not always follow that format precisely when inputs get long. The result: retry loops, timeouts, and a stuck crew. My yt_to_blog_he crew hit this exact wall on long video transcripts, and the fix required some creative engineering.",
      color: "from-red-600 to-rose-500",
      difficulty: "advanced",
      beginner:
        "The short version: these two technologies do not always play nicely on long inputs (over 5,000 characters). If your crew hangs — this is usually why. In this section I explain what is happening and how to work around it, including the fix I use in production.",
      content: [
        "The problem: CrewAI expects the model to emit a precise format — 'Thought: ...' followed by 'Action: ...' and 'Action Input: ...'. Gemini sometimes jumps straight to the Final Answer and skips the scaffolding, at which point CrewAI's parser cannot extract an answer.",
        "The classic symptom: a /run call hangs until the 240-second timeout, or you see retry loops in your [Docker](/en/guide/docker) logs.",
        "Fix 1: bypass CrewAI entirely for that task — write three direct Gemini calls in Python and chain them yourself. You lose the elegant orchestration, but you gain stability.",
        "Fix 2: move the problematic agent to [Claude](/en/claude-code) Haiku — it follows ReAct faithfully and costs roughly $0.25 per blog-post run. Relatively cheap, vastly more reliable.",
        "Fix 3: shorten the input — for instance, summarize a long transcript with Gemini Flash before handing it to the crew. The team receives a digest instead of the full text.",
        "Fix 4: upgrade to CrewAI 0.80 or later — Gemini support improved significantly. pip install --upgrade crewai.",
      ],
      tips: [
        "A practical rule I follow: keep every task description under 2,000 characters. If you truly need a long input, skip CrewAI for that task and call Gemini directly through the [Delegator](/en/guide/delegator).",
        "Before diving into debugging, run the same prompt through [Claude](/en/claude-code) Haiku — if that works, you have confirmed the issue is with Gemini and not with your crew logic.",
      ],
    },
    {
      id: "advanced",
      icon: Bot,
      title: "Hierarchical processes + a manager agent",
      subtitle: "When sequential isn't enough",
      description:
        "Process.hierarchical is where CrewAI stops being a relay race and becomes a real orchestra with a conductor. Instead of tasks moving in a straight line, a manager agent (typically a strong model like GPT-4 or [Claude](/en/claude-code) Opus) makes real-time decisions: who gets which task, when to split, when to combine, and when to stop. It is advanced territory — only one of my ten crews runs this way — everything else is sequential, simply because it is more predictable and cheaper. But when you genuinely need flexibility, hierarchical is worth the effort.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      content: [
        "Process.hierarchical adds a manager agent — an agent that never performs tasks itself but routes them to team members. Like a conductor who does not play an instrument but decides who gets the solo.",
        "It shines when you have many agents (5+) and any given task could be handled by several of them — the manager decides who fits best at that moment.",
        "Memory — crews can retain state across kickoffs: long-term (persistent knowledge), entity (memory about specific entities), and contextual (context from the current run). My memory is backed by [Qdrant](/en/guide/qdrant).",
        "Tools customization — plain Python functions with the @tool decorator become callables for your agents. That is how you wire a crew into the [Delegator](/en/guide/delegator), [n8n](/en/guide/n8n), or any private API.",
        "Async execution — Task(async_execution=True) lets independent tasks run in parallel. Perfect when your researcher and analyst do not depend on each other and you do not want one waiting on the other.",
        "Callbacks — on_task_start, on_task_complete, and on_crew_complete are hooks for monitoring, logging, and streaming status to your [Dashboard](/en/guide/dashboard) in real time.",
      ],
      tips: [
        "Be careful with hierarchical — it consumes significantly more tokens because the manager re-reads context at every decision. My one hierarchical crew costs roughly 3× an equivalent sequential one.",
        "For real business workflows, prefer sequential with clear context — more predictable, easier to debug, and cheaper. Reserve hierarchical for genuinely uncertain orderings.",
      ],
    },
  ],
  resources: [
    {
      title: "CrewAI Docs",
      description: "The official documentation — excellent and well maintained",
      href: "https://docs.crewai.com",
      icon: ExternalLink,
    },
    {
      title: "CrewAI GitHub",
      description: "The open-source library — 30k+ stars",
      href: "https://github.com/crewAIInc/crewAI",
      icon: Github,
    },
    {
      title: "Google AI Studio",
      description: "A free Gemini API key to pair with your crews",
      href: "https://ai.google.dev",
      icon: ExternalLink,
    },
    {
      title: "The Claude Code guide",
      description: "How to build crews fast with Claude Code",
      href: "/en/claude-code",
      icon: BookOpen,
    },
    {
      title: "The Delegator guide",
      description: "How to trigger crews remotely via an API",
      href: "/en/guide/delegator",
      icon: BookOpen,
    },
    {
      title: "Book a consultation",
      description: "Want a custom crew? A 30-minute advisory call",
      href: "/en/contact",
      icon: DollarSign,
    },
  ],
  ctaTitle: "Ready to build your own crew?",
  ctaSub:
    "Plain Python, a free Gemini key, and a full walkthrough of three crews I use every day.",
  primaryCta: {
    label: "CrewAI on GitHub",
    href: "https://github.com/crewAIInc/crewAI",
    icon: Github,
  },
  secondaryCta: {
    label: "Book a consultation",
    href: "/en/contact",
    icon: Mail,
  },
  authorBio:
    "I run 10 crews on VPS-Elad-Hub in production. This guide was written out of two months of trial and error — the features that worked and the Gemini gotchas that bit me during fixes. Every crew I describe here is one I actually use, no hand-waving.",
};
