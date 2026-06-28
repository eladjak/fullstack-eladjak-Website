import {
  Feather,
  Lightbulb,
  Layers,
  Megaphone,
  Sparkles,
  ShieldCheck,
  Repeat,
  Github,
  ExternalLink,
  BookOpen,
  Mail,
  Send,
  Users,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const ranchGuideEn: AgentGuideData = {
  slug: "ranch",
  agentName: "Ranch",
  agentNameHe: "Ranch — the network's content agent",
  category: "agent",
  tagline:
    "The agent that mines ideas from your conversations, repurposes each idea to every channel in your voice — and publishes only with approval",
  heroDescription:
    "Most 'content agents' wait for you to ask them to write. Ranch does the opposite: he takes the initiative. He is male (he/his), chats on Telegram via @eladcontent_bot and in the 'Rebels' group, and does three things that turn a pile of conversations into a content factory: proactive idea mining (goes over conversation memory and finds worthy content ideas already said but never written), per-channel repurposing (takes one idea and turns it into N versions, each tailored to its channel, in Elad's voice and amlak-first — a TL;DR at the top), and scheduled publishing. But publishing itself is blocked behind a Firewall — Ranch prepares and proposes, but a post goes out only after human approval. Mind the division of labor: Ranch writes the copy; [Hermes](/en/guide/hermes) supplies him the media and illustrations. For me (Elad) Ranch is the difference between 'I have tons of ideas that vanish' and 'my ideas automatically become content on every channel'. For you — it's the pattern that turns every conversation into a content source, without losing your personal voice and without publishing anything you didn't approve.",
  badgeText: "2026 · Content Agent · Practical Guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/ranch",
  heroBgImage: "/images/guides/guide-ranch-hero.jpg",
  stats: [
    { label: "Idea mining", value: "Proactive" },
    { label: "Repurposing", value: "Per-channel" },
    { label: "Publishing", value: "Human OK" },
    { label: "Voice", value: "Elad · TL;DR" },
  ],
  paradigmTitle: "The idea is the source, not the article",
  paradigmSub:
    "One idea is not one post. Ranch mines ideas from conversations and turns each into N per-channel versions — in your voice, approved by you.",
  paradigmShifts: [
    {
      before: "Content ideas get said in conversation and vanish forever",
      after: "Ranch mines them automatically from conversation memory and surfaces the worthy ones",
      icon: Lightbulb,
    },
    {
      before: "The exact same text pasted to every social network",
      after: "Each idea is repurposed to N versions, each tailored to its channel",
      icon: Layers,
    },
    {
      before: "Generic AI content that sounds like a robot",
      after: "Writing in Elad's voice, amlak-first (TL;DR), no AI-tells",
      icon: Feather,
    },
    {
      before: "A bot that publishes on its own and might post something unapproved",
      after: "Publishing blocked by the Firewall — a post goes out only with human approval",
      icon: ShieldCheck,
    },
  ],
  whoIsThisFor: [
    {
      title: "Content creators and solo operators",
      description:
        "Lots of ideas but no time to write? Ranch mines them from your conversations and turns them into ready-for-approval content.",
      icon: Feather,
      color: "from-indigo-500 to-violet-500",
    },
    {
      title: "Personal brands",
      description:
        "Your voice is the asset. Ranch writes in your voice (amlak-first, no AI-tells) — not in a generic robot voice.",
      icon: Megaphone,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Small marketing teams",
      description:
        "Manual per-channel repurposing burns hours. Ranch does idea→all-channels, and the team approves and improves.",
      icon: Layers,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Anyone wary of auto-publishing",
      description:
        "Rightly so — an unapproved post can embarrass. The pattern is built so Ranch prepares, you approve every publish.",
      icon: ShieldCheck,
      color: "from-pink-500 to-rose-500",
    },
  ],
  toc: [
    { id: "what-is", label: "What it is" },
    { id: "mining", label: "Idea mining" },
    { id: "repurpose", label: "Repurposing" },
    { id: "voice", label: "Elad's voice" },
    { id: "publish", label: "Publish + Firewall" },
    { id: "advanced", label: "Advanced" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Feather,
      title: "What is Ranch?",
      subtitle: "The content agent that takes initiative — mines ideas, repurposes per channel, publishes with approval",
      description:
        "Ranch is the network's content specialist — and the key word is proactive. While most content agents wait for a request, Ranch actively goes over conversation memory, finds content ideas already said, and turns them into per-channel versions. He doesn't write 'generically' — he writes in Elad's voice, amlak-first (a TL;DR at the top of every text, mandatory for an Israeli audience). The division of labor is clear: Ranch writes the copy; [Hermes](/en/guide/hermes) supplies the media and illustrations; publishing itself goes through a Firewall. He depends on [Hermes](/en/guide/hermes) for media, [Kaylee](/en/guide/kaylee) for infra, and [Claude Code](/en/claude-code) for doc/link ingest.",
      color: "from-indigo-600 to-violet-500",
      difficulty: "beginner",
      beginner:
        "Think of a personal content editor sitting next to you in meetings. Instead of you having to remember 'oh, that's a good post idea', he jots down every interesting idea that comes up in conversation. Then he takes each such idea and turns it into several versions — a short post for Facebook, a thread for Twitter, an article for the blog — each in a style that fits the channel, and in your voice (not a robot voice). At the end he shows you everything and says 'ready to publish, approve?'. Ranch is exactly that editor, except he's an AI agent who never misses an idea and never tires.",
      content: [
        "Ranch is male (he/his) — the network's content agent, alongside Kami, Kaylee, Hermes, Aurora and Sailaco",
        "Channel: Telegram @eladcontent_bot + the 'Rebels' group (an active bot in the group)",
        "Four responsibilities: content_propose (proposing ideas), content_repurpose (per-channel repurposing), publish (publishing), content_copy (copywriting)",
        "Division of labor: Ranch = copy/text; [Hermes](/en/guide/hermes) = media/illustrations. The copy belongs to Ranch, not Hermes",
        "Depends on [Hermes](/en/guide/hermes) (media), [Kaylee](/en/guide/kaylee) (infra), [Claude Code](/en/claude-code) (doc/link ingest)",
        "publish is an endpoint in the [autonomy stack](/en/guide/autonomy) (autonomy:content) and blocked by the Firewall",
      ],
      tips: [
        "The difference between a regular content agent and Ranch is the initiative: not 'write me a post' but 'here are 3 ideas I found in your conversations this week, shall I prepare them?'. That's the leap from 'tool' to 'partner'",
        "Keep roles separate: copy=Ranch, media=Hermes. Mixing them means no agent truly specializes in either",
      ],
    },
    {
      id: "mining",
      icon: Lightbulb,
      title: "Proactive idea mining — from conversations already had",
      subtitle: "Ranch goes over conversation memory and finds worthy content ideas",
      description:
        "The best source for content isn't 'what do we write today' but 'what have you already said'. Every conversation, decision or insight is a potential content idea — but most vanish. content_propose is Ranch's domain that mines that gold: he goes over [conversation memory](/en/guide/orchestration) (the knowledge hub / conversation-memory), finds worthy ideas (not noise, not a raw news digest — but a valuable angle), and proposes them as content items. That way 'I have an idea' doesn't depend on you remembering to write it down.",
      color: "from-cyan-600 to-blue-500",
      difficulty: "intermediate",
      beginner:
        "Imagine every interesting conversation you have is a little gold mine of ideas — but without mining, the gold stays in the ground. Ranch is the miner: he goes back over what was already said and looks for the moments worth turning into content. 'Wait, what you said there about X is a great post idea'. Instead of relying on your memory (which always forgets the best idea), Ranch goes over your conversations and extracts the gold — and offers it to you ready.",
      content: [
        "Source: conversation memory / the [knowledge hub](/en/guide/orchestration) — what was already said, not an idea to invent from scratch",
        "Filtering for a worthy angle: Ranch doesn't propose every sentence — he looks for a valuable idea (angle, insight, story), not a raw digest",
        "Proactive, not reactive: Ranch pushes content proposals on his own ('here are 3 ideas from this week') instead of waiting for a request",
        "Every idea is a single idea with an ID and status — not 'just text', but an item trackable through the state machine",
        "Connects to [Claude Code](/en/claude-code): when an idea comes from a doc/link, the orchestrator ingests it and Ranch processes it",
        "Proposals are shown in the 'Rebels' group / to Elad — he picks which ideas to advance to the repurposing step",
      ],
      tips: [
        "Initiative is a content agent's superpower. A tool that writes when asked saves time; an agent that spots ideas that would otherwise be forgotten is worth far more",
        "Filter aggressively for a worthy angle. An agent that proposes every sentence as a 'post idea' floods you — the value is precisely in the selection, not the quantity",
      ],
    },
    {
      id: "repurpose",
      icon: Repeat,
      title: "Per-channel repurposing — one idea, N versions",
      subtitle: "Each idea becomes a version tailored to each platform — not the same text everywhere",
      description:
        "The core principle of a content factory: the idea is the source, not the product. One article pasted identically to every network is a waste — every channel behaves differently. content_repurpose is the domain where Ranch takes one idea and produces N versions from it: a short post for Facebook, a thread for Twitter/X, a native post for LinkedIn, a carousel for Instagram, and a full blog article. Each version is tailored to the length, tone and format of its channel — but all share the same core idea and the same voice.",
      color: "from-violet-600 to-purple-500",
      difficulty: "advanced",
      beginner:
        "Think of a bakery making one dough and turning it into different baked goods — a roll, a turnover, a pizza. Same dough, different shapes for different audiences. Ranch does exactly that with an idea: the dough is the idea, and he turns it into a short Facebook post (roll), a long Twitter thread (pizza), and a full blog article (cake). Why not paste the same text everywhere? Because each channel is a different audience with different expectations — just like you don't serve a wedding cake at breakfast.",
      content: [
        "Channel→format matrix: blog=full article + a TL;DR card; Telegram=trimmed long-form; X=thread; LinkedIn=native post; Facebook=short; Instagram=carousel",
        "Never the same text everywhere: each version is tailored to the length, tone and format of the channel",
        "amlak-first on every text channel: a short, punchy TL;DR at the top (critical for an Israeli audience that bounces off a wall of text)",
        "Reels/Shorts are not the article: a short video extracts the single strongest hook → 'full version on the site' — entertainment, not learning",
        "Integrated media: Ranch requests illustrations/images from [Hermes](/en/guide/hermes); he writes the copy, Hermes supplies the visuals",
        "A state machine per variant: draft→noted→approved→banked→scheduled→published — one idea approval cascades to all versions",
      ],
      tips: [
        "Internalize: 'the article is the source, not the product'. The moment you stop thinking 'one post' and start thinking 'one idea → N channels', output multiplies",
        "Never publish the SEO version (the structured one, with the headings and keywords) as a human post. Same idea, two registers — a site version and a flowing version for social",
      ],
    },
    {
      id: "voice",
      icon: Megaphone,
      title: "Elad's voice + amlak-first — not sounding like a robot",
      subtitle: "Writing in the personal voice, with a TL;DR at the top, no AI-tells",
      description:
        "Content that sounds like AI loses trust. content_copy is the domain where Ranch rises above 'yet another generator': he writes in Elad's voice — direct, factual, no fluff — and strips the AI-tells (excessive bold, em-dashes, list-itis, symmetric structure, formulaic transitions). Every text leads with an amlak (a TL;DR) of 2-3 sales-y, human lines. This isn't decoration — it's a requirement: an Israeli audience bounces off a wall of text, and a post without a TL;DR gets scrolled past.",
      color: "from-amber-600 to-orange-500",
      difficulty: "intermediate",
      beginner:
        "We can all spot text written by AI: too many bolded words, an overly predictable structure, 'in this article we will discuss...', 'it is important to note...'. It sounds artificial and loses trust. Ranch does the opposite — he writes the way Elad writes: straight, short, human. And every text starts with a 'TL;DR' — two or three lines that summarize the gist right at the start. Why? Because in Israel, if the first line doesn't grab you, no one will keep reading. That's the difference between a post that gets read and a post that gets scrolled past.",
      content: [
        "Elad's voice: direct, factual, no hype — calibrated to the personal voice, not a 'generic AI voice'",
        "amlak-first: every text leads with 2-3 sales-y TL;DR lines (mandatory for an Israeli audience)",
        "Stripping AI-tells: excessive bold, em-dashes, list-itis, H2→3-bullets structure, formulaic transitions",
        "Rhythm variation: a short sentence then a long winding one, a real opinion, light colloquial nuance — not artificial uniformity",
        "dual-output: a site/SEO version keeps structure and keywords (good for [GEO](/en/guide/orchestration)); a social version is stripped and flowing — same idea, two registers",
        "Editing pipeline: create in a human voice → calibrate to Elad's voice → mechanical edit (em-dash/calque cleanup) — the order is critical",
      ],
      tips: [
        "amlak-first isn't a tip — it's a law. In Israel a post without a TL;DR at the top simply doesn't get read. Two sales-y lines at the start double the read rate",
        "A simple quality check for 'sounds human': read the text out loud. If it sounds like a corporate slide deck — it has AI-tells. If it sounds like a person talking — you nailed it",
      ],
    },
    {
      id: "publish",
      icon: ShieldCheck,
      title: "Publish + Firewall — goes out only with approval",
      subtitle: "Ranch schedules and prepares; a post publishes only after a button click",
      description:
        "All of Ranch's work — mining, repurposing, writing, scheduling — runs on its own. But the one action with an irreversible external consequence — publishing a post to the world — is blocked behind the [autonomy stack's Firewall](/en/guide/autonomy). A post goes out only after Elad approves it. This is critical: content published in your name is your brand, and an unapproved post (a factual error, the wrong tone, sensitive timing) can embarrass. Ranch brings everything up to the publish gate; the last step is taken by a human.",
      color: "from-rose-600 to-red-500",
      difficulty: "intermediate",
      beginner:
        "Think of an editor who prepares your whole newspaper — writes, designs, lays it out — but you press the 'publish' button. Why? Because once something is published in your name, you can't take it back, and it represents you to everyone. Ranch's Firewall is exactly that 'publish' button: all the prep is automatic, but the moment content goes out to the world — that's where you approve. You review the draft, approve, and that's it. That way you get a content factory without losing control of what goes out in your name.",
      content: [
        "Safe actions (run on their own): mining, repurposing, writing, draft scheduling, idea proposals — no external consequence",
        "Blocked action: publish — posting to the world, an irreversible move that represents the brand",
        "The mechanism: a ready post enters the [approval queue](/en/guide/autonomy); Elad approves/rejects with a click in the dashboard or the bot",
        "Cascading approval: approving an idea can approve all its variants at once; a targeted note targets a single variant",
        "Scheduling vs publishing: Ranch can schedule (safe); the actual publish at the target time still passes the gate (or is explicitly pre-approved)",
        "The same principle across the network: an action visible in the world (publish, send, payment) = firewall; an internal action = safe",
      ],
      tips: [
        "Publishing is exactly the kind of action the Firewall was built for: irreversible, world-visible, and brand-representing. Don't fully automate publishing 'to save a click'",
        "Make approval fast and from the phone. If approving every post is a headache, you'll be tempted to disable the gate — which is exactly the mistake it exists to prevent",
      ],
      codeExample: {
        label: "Ranch's safety classification",
        code: 'SAFETY = {\n  "content_propose":   "safe",     # mining runs alone\n  "content_repurpose": "safe",     # repurposing is safe\n  "publish":           "firewall", # publishing waits for approval\n}\nif SAFETY[task.type] != "safe":\n    approvals.enqueue(task)          # Elad approves with a click',
      },
    },
    {
      id: "advanced",
      icon: Sparkles,
      title: "Integration — how to adopt a content agent yourself",
      subtitle: "Start with idea mining, add repurposing and a publish-gate gradually",
      description:
        "As in every guide — don't build the full Ranch on day one. The order: first idea mining (an agent that proposes ideas from conversations), then per-channel repurposing + Elad's voice (as ideas mature into content), and only then — publishing behind a Firewall. Ranch sits on the [autonomy stack](/en/guide/autonomy) (autonomy:content), depends on [Hermes](/en/guide/hermes) for media and [Kaylee](/en/guide/kaylee) for infra, and is coordinated via the [network protocol](/en/guide/orchestration) — he's the link that turns an idea into published content, without losing the voice and without publishing unapproved.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      beginner:
        "The golden rule returns: don't build the whole content agent on day one. Start with the simplest thing — an agent that goes over your conversations and proposes 'here are content ideas'. Only after that works, let it repurpose each idea to every channel in your voice. And only at the end, when you trust the quality, wire in publishing — but always behind approval. For me (Elad) Ranch started as a simple idea-proposer and gradually became a full content factory. Auto-publishing behind a gate is the last thing, not the first.",
      content: [
        "Step 1 — idea mining: an agent that goes over conversation memory and proposes worthy content ideas. That's the first component",
        "Step 2 — Elad's voice + amlak: as ideas mature, add writing in the personal voice with amlak-first and AI-tell removal",
        "Step 3 — per-channel repurposing: one idea → N versions, each tailored to its channel (never the same text)",
        "Step 4 — publishing behind a Firewall: only when you trust the quality, wire publish — always via the [approval queue](/en/guide/autonomy)",
        "Infra: an endpoint in the [autonomy stack](/en/guide/autonomy), a Telegram bot, depends on [Hermes](/en/guide/hermes) (media) + [Kaylee](/en/guide/kaylee) (infra)",
        "Coordination: the delegation matrix ([network protocol](/en/guide/orchestration)) decides that content/copy→Ranch, media→Hermes",
      ],
      tips: [
        "The signal you're ready for a content agent: you have more ideas than you can write up, and they vanish. That's the moment to delegate the mining and repurposing",
        "Keep the state machine (draft→...→published) visible. That's what turns a 'pile of drafts' into a 'factory' — every status is a trigger for the next action, not just a label",
      ],
    },
  ],
  resources: [
    {
      title: "The Autonomy Stack guide",
      description: "The Firewall behind which Ranch's publishing is blocked",
      href: "/en/guide/autonomy",
      icon: BookOpen,
    },
    {
      title: "The Orchestration guide",
      description: "The content-factory case study + the delegation matrix",
      href: "/en/guide/orchestration",
      icon: BookOpen,
    },
    {
      title: "The Hermes guide",
      description: "The worker agent that supplies Ranch media and illustrations",
      href: "/en/guide/hermes",
      icon: BookOpen,
    },
    {
      title: "The Kaylee guide",
      description: "The infrastructure + distribution Ranch runs on",
      href: "/en/guide/kaylee",
      icon: BookOpen,
    },
    {
      title: "Elad's network code",
      description: "Idea mining, per-channel repurposing, Elad's voice and a publish-gate",
      href: "https://github.com/eladjak",
      icon: Github,
    },
    {
      title: "Consultation — a content factory",
      description: "Want an agent that turns every conversation into content — in your voice?",
      href: "/en/contact",
      icon: Mail,
    },
  ],
  ctaTitle: "Turn every idea into content on every channel — in your voice, with your approval",
  ctaSub:
    "Proactive idea mining, per-channel repurposing, writing in Elad's voice with amlak-first. Publishing always behind human approval.",
  primaryCta: {
    label: "Start with orchestration",
    href: "/en/guide/orchestration",
    icon: Send,
  },
  secondaryCta: {
    label: "Book a consultation",
    href: "/en/contact",
    icon: Users,
  },
  authorBio:
    "I built Ranch because I realized lots of good ideas get said in conversations and simply vanish. The big lesson: a good content agent is proactive (mines ideas) not reactive (waits for a request), writes in my voice not a robot's, and publishing — which represents the brand — always stays behind approval.",
};
