import {
  Radio,
  Filter,
  Brain,
  CheckCircle2,
  Github,
  ExternalLink,
  BookOpen,
  Code2,
  Rocket,
  Lightbulb,
  Zap,
  Users,
  Mail,
  Rss,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const adopterGuideEn: AgentGuideData = {
  slug: "adopter",
  agentName: "Adopter",
  agentNameHe: "Adopter — Autonomous Content Filter",
  logoImage: "/images/guide-logos/adopter-logo.png",
  tagline: "Instead of reading 500 posts a day — an agent that filters",
  heroDescription:
    "Adopter is a Python service plus cron that listens to Telegram channels through Telethon, sends each post to Gemini Flash with a classification schema (novelty × signal × actionability × risk), and stores only the top-K items in a [Qdrant](/en/guide/qdrant) collection called `network_memory`. A circuit breaker caps it at 5 adoptions per day. For me it filters 500 posts a day down to 3-5 findings — for you it can point at RSS feeds, Discord channels, Reddit or Twitter forums, mailing lists, or any content firehose that needs a smart filter.",
  badgeText: "2026 · Autonomous Content Adoption · Practical Guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/adopter",
  heroBgImage: "/images/guides/guide-adopter-hero.jpg",
  stats: [
    { label: "channels monitored", value: "20+" },
    { label: "posts per day", value: "500+" },
    { label: "adoptions per day", value: "3-5" },
    { label: "circuit breaker", value: "5/day" },
  ],
  paradigmTitle: "Autonomous filtering instead of FOMO",
  paradigmSub:
    "There is simply too much content. Adopter reads for you, filters it, and surfaces only what matters.",
  paradigmShifts: [
    {
      before: "300 open Telegram channels, notifications everywhere",
      after: "Adopter reads; you get 3 posts a day with a reason why",
      icon: Filter,
    },
    {
      before: "Forgetting a great tool you heard about a month ago",
      after: "Qdrant remembers everything — semantic search brings it back",
      icon: Brain,
    },
    {
      before: "Endless push that wears you out and you just mute it",
      after: "Autonomous filtering — only the pretend-to-matter disappears",
      icon: Zap,
    },
    {
      before: "No trace of what you did with suggested content",
      after: "Audit trail: 'adopted X because Y, skipped Z because W'",
      icon: CheckCircle2,
    },
  ],
  whoIsThisFor: [
    {
      title: "Content creators",
      description:
        "It scans the dozens of channels you planned to follow and returns the strongest 20%.",
      icon: Rss,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Product managers",
      description:
        "Trends, new players, shipped features — Adopter spots and summarises them.",
      icon: Sparkles,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "ChiefTech / R&D",
      description:
        "New tools, frameworks, models — Adopter classifies and suggests an integration.",
      icon: Code2,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Too busy to read",
      description:
        "If you track 30 channels on the AI industry, Adopter saves you roughly 5 hours a day.",
      icon: Rocket,
      color: "from-pink-500 to-rose-500",
    },
  ],
  toc: [
    { id: "what-is", label: "What it is" },
    { id: "flow", label: "The flow" },
    { id: "classifier", label: "Classifier" },
    { id: "circuit", label: "Circuit Breaker" },
    { id: "dedup", label: "Dedup" },
    { id: "advanced", label: "Advanced" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Radio,
      title: "What is Adopter? A personal research assistant that never stops",
      subtitle:
        "An automatic service that reads on your behalf, filters, and surfaces only what is truly worth your time",
      description:
        "Adopter is an autonomous agent — a piece of software that runs in the background with no hand-holding — that I put in charge of the most tiring task in 2026 tech: tracking dozens of Telegram broadcast channels run by practitioners and deciding, for me, what is worth an hour and what is noise. It is written in Python, triggered by cron (the operating system's job scheduler — essentially a clock that fires it on the hour, every hour), sends every post to Gemini Flash (Google's fast, free LLM) which grades it across four criteria, and stores only the best items inside a [Qdrant](/en/guide/qdrant) collection — a semantic database that remembers by meaning rather than by keyword.",
      color: "from-orange-600 to-amber-500",
      difficulty: "beginner",
      beginner:
        "Think of it this way: instead of a personal news editor sitting in an office reading the paper for you, you get a robot that never sleeps, never tires, and never forgets — one that follows 20 sources in parallel, checks every post against four smart questions ('is it new? is it strong? can I act on it? how risky is it?'), and at the end of the day hands you 3-5 gems instead of 500 posts. In my case it has been running for three months and saves me 4-5 hours of scrolling a day. For you it can replace the compulsive habit of refreshing social feeds.",
      content: [
        "Input: roughly 20 public Telegram channels across AI, developer tooling, news and research — you pick which channels to read",
        "Process: every hour cron runs a scan → sends the posts to Gemini Flash for classification (completely free up to 15 requests per minute) → decides to adopt or skip",
        "Output: records stored in a collection called network_memory (a virtual folder inside [Qdrant](/en/guide/qdrant)) tagged category=adopted-content to keep them separate from other content",
        "Rate limiting: at most 5 adoptions per day via a circuit breaker (a 'breaker' mechanism that prevents flooding — the name is borrowed from electrical engineering)",
        "Audit trail: every decision is logged — skips included — with a clear reason. You can always go back and see what Adopter 'thought' about any given post",
        "DRY_RUN mode: you can run the whole pipeline without saving anything, just to see what it would have decided — handy for tuning before you flip it live",
      ],
    },
    {
      id: "flow",
      icon: Rss,
      title: "The full flow — the six steps from channel to memory",
      subtitle:
        "The journey of a Telegram post, from the moment it is written to the moment it reaches you as an insight",
      description:
        "This flow is a pipeline — a sequence of stages that every post passes through, one after another, until it either lands in long-term memory or is discarded. Each stage is simple on its own; the magic is in the chain. Let's walk through it end to end.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "intermediate",
      content: [
        "Step 1 — cron (the operating system's scheduler) runs the tg-public-ingest.py script at the top of every hour. That is the only trigger: no button, no human in the loop",
        "Step 2 — a Telethon client (a Python library that connects to Telegram through the official MTProto protocol — not the limited Bot API, but the full user-grade connection) pulls the 50 most recent messages from each listed channel",
        "Step 3 — a fast pre-filter throws out obvious junk: media-only posts without text, posts that are just a shortened link with no context, or posts shorter than 50 characters",
        "Step 4 — semantic dedup: we generate an embedding (a translation of the text into a 768-number vector that captures meaning — see the [Qdrant guide](/en/guide/qdrant) for the full explanation) and check whether a similar post already exists. Similarity above 90% means we skip it",
        "Step 5 — the classifier: Gemini Flash receives the post and returns JSON with a category ({valuable, maybe, noise}) and a confidence score between 0 and 1",
        "Step 6 — decision: if the result is valuable with confidence above 0.8 → adopt. Otherwise → skip. The decision is POSTed to the [Delegator](/en/guide/delegator) (the central API gateway of the agent network), which writes the full record into network_memory with a link back to the source",
      ],
      codeExample: {
        label: "Classifier prompt (condensed version)",
        code: 'Classify this post:\n\n"{post_text}"\n\nCategories:\n- valuable (specific tool/paper/product/insight)\n- maybe (interesting but generic)\n- noise (spam/promo/unrelated)\n\nReturn JSON: {category, confidence 0-1, reason}',
      },
    },
    {
      id: "classifier",
      icon: Brain,
      title: "The classifier — how Adopter decides what is truly 'interesting'",
      subtitle:
        "The craft of prompt engineering combined with learning from your own feedback",
      description:
        "The classifier is the beating heart of Adopter. It is the written instruction that Gemini Flash receives for every post. Classification is the technical term for automatically sorting content into predefined buckets — the same way email services sort your inbox into primary, social, or promotions. This prompt is dynamic — it improves over time because you are teaching it what counts as a miss and what counts as a hit.",
      color: "from-violet-600 to-purple-500",
      difficulty: "advanced",
      content: [
        "The base prompt is paired with a handful of your personal examples — 5 to 10 posts you marked 'this is excellent' and 5 you marked 'not interesting'. That is the difference between a generic classifier and one that knows your taste",
        "Structured JSON output: category, confidence between 0 and 1, a one-line reason, and tags — so you can filter by topic later on",
        "Context window (the amount of text the model sees at once): only the post itself, the channel name, and a timestamp. History is deliberately withheld — otherwise the model anchors on the previous item and stops grading objectively",
        "Temperature 0.1 — the parameter that controls how 'creative' the model is. 0 is fully robotic, 1 is a tipsy artist. Here we want consistency — two runs on the same post should produce the same grade",
        "Feedback loop: if you mark an adoption as a mistake, the post flows into the negative example bank. Next time a similar post appears, it gets recognised as an example of 'not for me'",
        "Auto-tune: after 50 feedback points, the system rebuilds the prompt with the 10 best positives and the 10 clearest negatives — no manual editing required",
      ],
      tips: [
        "Do not lean on the model alone. Without examples from your own world, the classifier generalises and misses the nuance. 30 minutes spent tagging 20 posts upfront buys you months of sharper accuracy",
        "If you run on [CrewAI](/en/guide/crewai) or [Claude Code](/en/claude-code) instead of Gemini, the principle is identical — just swap the model and keep the prompt structure",
      ],
    },
    {
      id: "circuit",
      icon: ShieldAlert,
      title: "Circuit Breaker — the gatekeeper that prevents overflow",
      subtitle:
        "Five adoptions a day is the ceiling — and that is what keeps the system sane",
      description:
        "A circuit breaker is a metaphor borrowed from electricity — the automatic switch in your fuse box that trips under load and prevents a fire. We adopted the same principle in software: a hard ceiling that kicks in the moment something crosses the allowed threshold. In Adopter the ceiling is five adoptions per day. Without it, a single 'noisy' day on one channel could dump 50 items into memory and bury you.",
      color: "from-red-600 to-rose-500",
      difficulty: "intermediate",
      beginner:
        "This mechanism is basically a gatekeeper that says 'enough for today, folks'. Even if ten great posts land on the same day, Adopter will pick the five best and let the rest wait until tomorrow. That is what prevents the 'opened my inbox and got 200 new messages' syndrome. For me this single rule is what turns a system I actually read every morning into a system I would otherwise ignore.",
      content: [
        "The MAX_ADOPTIONS_PER_DAY = 5 parameter lives in the config file — you can change it, but 5 is a battle-tested number",
        "A counter resets every day at 00:00 UTC (global time) — midnight in London, 2am in Israel",
        "Once you hit 5, Adopter keeps classifying everything as usual but simply does not save — the audit log is still written, so you can see what was missed",
        "CRITICAL override: if the model spots something unusually important (confidence above 0.95, rare tags, or a 'hard trigger' topic), it bypasses the ceiling and fires a direct alert",
        "Per-day config override: you can define an 'AI day' on which the ceiling jumps to 20 — handy for conferences or product launch days",
      ],
      tips: [
        "Start at 3 adoptions per day. Only raise it once you are confident the signal-to-noise ratio (how much of the captured content is genuinely interesting) is high enough",
        "A similar mechanism ships in [Kami](/en/guide/kami) and [Hermes](/en/guide/hermes) — circuit-breaker thinking is a signature of a healthy agent network",
      ],
    },
    {
      id: "dedup",
      icon: Filter,
      title: "Dedup — recognising a story you have already seen",
      subtitle:
        "A semantic search before every adoption — so information never duplicates itself",
      description:
        "Dedup (short for deduplication) is arguably Adopter's best-kept secret. In a world where 20 Telegram channels cover the same news cycle, any new tool will show up in 6 different places within two hours. Without this step you would see the same insight six times. With it, you see it once — and it is linked to every source that mentioned it.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "intermediate",
      content: [
        "Before every adoption — Adopter builds an embedding of the post. An embedding is a translation of text into a 768-dimensional vector that captures meaning. Two posts that say the same thing with different words end up with similar vectors",
        "The search runs against the telegram_news collection in [Qdrant](/en/guide/qdrant) with a threshold of 0.9 — i.e. 90% similarity and above counts as 'the same story'",
        "If a match comes back with score ≥ 0.9, we skip immediately. The post never reaches the classifier — saving the model call cost too",
        "Posts flagged as duplicates are still stored in telegram_news (they just are not promoted to an adoption) — so the database keeps every source for later",
        "Second safety layer: URL-hash dedup (if two posts point to the exact same link, they are automatically duplicates). This catches cases where the text was rephrased but the source is identical",
        "Special handling for near-duplicates (similarity 0.8-0.9): instead of skipping, Adopter adopts the post but keeps a reference to the original — so you can retroactively see the entire thread of discussion around a topic",
      ],
      tips: [
        "This is what lets Adopter cover 20 channels without drowning you in repeats — most of the time 2-3 channels quote the same primary source within hours",
        "If you are building something similar for Hebrew text, use an embedding model that supports Hebrew (such as gemini-embedding-001) — English-centric models miss duplicates that are phrased differently",
      ],
    },
    {
      id: "advanced",
      icon: Lightbulb,
      title: "Advanced tips — lessons from three months of continuous operation",
      subtitle:
        "The nuances that separate a demo project from a system that lives for the long haul",
      description:
        "After three months of 24/7 operation, more than 45,000 scanned posts, and hundreds of tiny adjustments to the prompt and thresholds — these are the things I wish I had known before I started. Every line here is worth hours of trial and error.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      content: [
        "Use MTProto (Telegram's user-level protocol, via Telethon) — not the Bot API. The Bot API is limited to channels the bot is a member of; MTProto grants access to any public channel, but it does require a one-time phone number plus OTP login",
        "Persistent sessions — never log in from scratch on every run, or Telegram will block you for suspicious behaviour. Save the session string once and reuse it",
        "Telegram rate limits — 30 requests per minute is a safe ceiling. Cross it and you get a FloodWaitError that locks you out for hours. A tiny sleep between calls is cheap insurance",
        "Gemini cost: classifying 500 posts a day costs zero — the Flash free tier is enough for personal use. Only at 1,000+ posts a day should you consider upgrading to the paid tier",
        "My [Dashboard](/en/guide/dashboard) exposes a dedicated URL: /network/memory/html?agent=adopter&category=adopted-content — a visual view of everything adopted, sorted by date with free-text search",
        "Downstream use: the [CrewAI](/en/guide/crewai) crews pull from adopted-content and turn it into secondary content — summaries, social posts, and replies that flow into [Kami](/en/guide/kami) and out to my WhatsApp",
      ],
      tips: [
        "My approach: I started with 3 channels and added one every couple of days. After each addition I watched the signal for a day or two to make sure it did not drop. If you start with 20 channels at once, you cannot tell which channel is polluting the mix",
        "Extension idea: you can point Adopter at completely different sources — RSS feeds, Discord communities, subreddits, mailing lists, even email newsletters. The architecture stays the same; only step 2 (how you fetch the content) changes",
      ],
    },
  ],
  resources: [
    {
      title: "Telethon (MTProto)",
      description: "The Python Telegram client it is built on",
      href: "https://docs.telethon.dev",
      icon: ExternalLink,
    },
    {
      title: "Gemini API",
      description: "Adopter's classifier — Flash free tier",
      href: "https://ai.google.dev",
      icon: ExternalLink,
    },
    {
      title: "Qdrant Guide",
      description: "Adopter's semantic dedup engine",
      href: "/en/guide/qdrant",
      icon: BookOpen,
    },
    {
      title: "Delegator Guide",
      description: "How Adopter writes into network_memory",
      href: "/en/guide/delegator",
      icon: BookOpen,
    },
    {
      title: "GitHub",
      description: "autonomous-adopter source code",
      href: "https://github.com/eladjak",
      icon: Github,
    },
    {
      title: "Book a call",
      description: "Want automated sourcing tailored to your needs?",
      href: "/en/contact",
      icon: Mail,
    },
  ],
  ctaTitle: "Stop drowning in content",
  ctaSub:
    "Adopter scans on your behalf, filters, and surfaces what matters — set up in 5 minutes.",
  primaryCta: {
    label: "GitHub",
    href: "https://github.com/eladjak",
    icon: Github,
  },
  secondaryCta: {
    label: "Book a call",
    href: "/en/contact",
    icon: Users,
  },
  authorBio:
    "Adopter has been running on my servers for 3 months — 20 Telegram channels, roughly 500 posts scanned per day, 3-5 adoptions per day on average. It has surfaced over 30 new tools I would never have found on my own. This guide is based on real tuning of the classifier.",
};
