import {
  Network,
  Share2,
  Inbox,
  Users,
  Scale,
  Workflow,
  Layers,
  Sparkles,
  Github,
  ExternalLink,
  BookOpen,
  Mail,
  Rocket,
  Code2,
  Send,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const orchestrationGuideEn: AgentGuideData = {
  slug: "orchestration",
  agentName: "Orchestration",
  agentNameHe: "Multi-Agent Orchestration",
  category: "agent",
  tagline: "How to make several AI agents work together — without colliding, duplicating, or forgetting",
  heroDescription:
    "A single agent is a tool. A network of agents is a force — but only if they know how to work together. This guide is the 'glue' connecting the others: how [Kami](/en/guide/kami) (WhatsApp interface), [Claude Code](/en/claude-code) (dev orchestration), [Hermes](/en/guide/hermes) (studio/worker) and [Kaylee](/en/guide/kaylee) (reliability + distribution) share knowledge, delegate tasks to each other, and don't step on one another. The real problem in a multi-agent network isn't each agent's capability — it's coordination: who knows what, who owns what, and how important information reaches whoever needs to act on it. In my setup (Elad) this is solved with four simple components: a shared-knowledge hub (one source of truth), an attention inbox that prioritizes what needs handling, a network protocol that defines roles and delegation, and a council of models that validates big decisions. For you — the exact same pattern works for any team of agents, whether two or ten.",
  badgeText: "2026 · Multi-Agent Orchestration · practical guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/orchestration",
  stats: [
    { label: "agents in network", value: "6+" },
    { label: "source of truth", value: "one" },
    { label: "coordination", value: "async" },
    { label: "decision validation", value: "3 models" },
  ],
  paradigmTitle: "Coordination is the hard part, not capability",
  paradigmSub:
    "A single agent is strong. A network without coordination = duplication, collisions, and lost information. This structure solves that.",
  paradigmShifts: [
    {
      before: "Each agent with its own memory — nobody knows what the other did",
      after: "Shared knowledge hub: every agent writes facts to one place everyone reads",
      icon: Share2,
    },
    {
      before: "Important info drowned inside logs and chats — forgotten",
      after: "Prioritized inbox: 'what needs handling' separated from 'what happened'",
      icon: Inbox,
    },
    {
      before: "Two agents handling the same task (or nobody)",
      after: "Delegation matrix: every task type has a clear owner",
      icon: Workflow,
    },
    {
      before: "A big decision on one model — same biases",
      after: "Council of models: three models validate before an irreversible move",
      icon: Scale,
    },
  ],
  whoIsThisFor: [
    {
      title: "Agent builders",
      description:
        "Already have 2-3 agents and they're starting to collide? This is the stage to build a coordination layer.",
      icon: Code2,
      color: "from-indigo-500 to-violet-500",
    },
    {
      title: "Solo operators",
      description:
        "A network working for you 24/7 — but only if the important info reaches you filtered and prioritized.",
      icon: Rocket,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "AI product teams",
      description:
        "Multiple agents in production need ownership discipline and clear coordination channels, just like a human team.",
      icon: Users,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Anyone who wants the big picture",
      description:
        "Read about Kami/Hermes/Kaylee separately? Here's how they connect into one network.",
      icon: Network,
      color: "from-pink-500 to-rose-500",
    },
  ],
  toc: [
    { id: "what-is", label: "What it is" },
    { id: "hub", label: "Knowledge hub" },
    { id: "inbox", label: "Inbox" },
    { id: "protocol", label: "Protocol" },
    { id: "council", label: "Council" },
    { id: "content-empire", label: "Content factory" },
    { id: "advanced", label: "Advanced" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Network,
      title: "What is multi-agent orchestration?",
      subtitle: "The difference between a pile of bots and a team that works together",
      description:
        "Orchestration is the layer that makes several autonomous agents function as one team instead of a pile of bots each doing its own thing. The core idea: don't try to build one super-agent that does everything — build several focused agents, and invest the effort in coordinating between them. Just like a human team, what determines success isn't each individual's talent but how they divide the work, pass information, and avoid stepping on each other.",
      color: "from-indigo-600 to-violet-500",
      difficulty: "beginner",
      beginner:
        "Picture a restaurant kitchen. There's a head chef (who assigns tasks), a mains cook, a pastry chef, and someone responsible for keeping the fridge and oven always working. If each one tried to do everything — chaos. What makes the kitchen work isn't that each is a genius, but that there's a clear division of roles, an order board everyone sees, and one simple rule: 'you start a dish — you finish it.' Multi-agent orchestration is exactly that, just with AI agents.",
      content: [
        "Each agent focused on one role: [Kami](/en/guide/kami) = human interface (WhatsApp/voice), [Claude Code](/en/claude-code) = dev orchestration, [Hermes](/en/guide/hermes) = studio/worker (creative/data/code), [Kaylee](/en/guide/kaylee) = infra reliability + distribution",
        "Four coordination components (each in its own section below): the knowledge hub (source of truth), the inbox (work queue), the network protocol (roles + delegation), and the council (decision validation)",
        "Inter-agent communication is always structured (JSON), not 'free chat' — so an action is traceable, retryable, and verifiable",
        "The golden rule: don't build a monolith-agent. Small agents + good coordination beat one giant agent — easier to test, swap, and maintain",
      ],
      tips: [
        "Start with just two agents and one coordination component (the knowledge hub). Add the rest only when the pain appears — don't build the whole orchestration layer on day one",
        "This structure is model-agnostic: each agent can run on a different model (free Gemini, Claude, local) — coordination doesn't depend on which model",
      ],
    },
    {
      id: "hub",
      icon: Share2,
      title: "The shared knowledge hub — one source of truth",
      subtitle: "Instead of each agent remembering alone, everyone writes to and reads from one place",
      description:
        "The first problem in a multi-agent network: each agent with its own memory, and nobody knows what the other did. The solution is a shared-knowledge hub — one append-only event log that every agent writes facts to, and every agent can read from. This is the network's SSOT (Single Source of Truth): the full history of what happened, who did what, and the result.",
      color: "from-cyan-600 to-blue-500",
      difficulty: "intermediate",
      beginner:
        "Picture a shared notebook hanging in the kitchen: every cook writes down what they did ('sauce is done', 'out of tomatoes'), and anyone can read it. Instead of each one keeping a note in their pocket nobody else sees — there's one place everyone writes to and reads from. That way no piece of information gets lost between the agents.",
      content: [
        "Structure: an append-only file (mine is events.jsonl) — each line is an event {ts, actor, type, payload}. Simple, backup-able, easy to search",
        "Scope by actor: every agent knows who wrote each fact — important for tracing and resolving collisions",
        "Cheap writes, selective reads: you don't read all history every time — you pull by actor/type/time-window",
        "Connects well to [Qdrant](/en/guide/qdrant) for semantic search: important facts get an embedding and are retrieved by meaning, not just keyword",
        "Rule: the hub is a knowledge log (what happened), not a work queue (what to do) — that separation is done with the inbox (next section)",
      ],
      tips: [
        "Don't turn the hub into a giant database with a rigid schema. A simple event log (JSONL) wins — easy to back up, read, and hand-fix in an emergency",
        "Separate 'knowledge' from 'work queue' from day one. Mixing them causes critical info to rot inside the sea of history",
      ],
      codeExample: {
        label: "An event in the hub",
        code: '{"ts":"2026-06-01T09:00:00Z","actor":"hermes",\n "type":"insight","payload":{"topic":"events.jsonl",\n "finding":"peak activity 08-10","confidence":0.8}}',
      },
    },
    {
      id: "inbox",
      icon: Inbox,
      title: "The attention inbox — the orchestrator's work queue",
      subtitle: "Separate 'what happened' from 'what needs handling now'",
      description:
        "If you only ask the knowledge hub 'what's new?' every round — critical info rots and gets forgotten. So above the hub sits an attention inbox: a focused work queue of 'what needs the orchestrator's attention'. Agents push action items into it (not every event — only what needs action), the orchestrator ([Claude Code](/en/claude-code)) reads it every round, acts, and marks 'done'. That's the difference between a network that 'hopes someone notices' and one where important info truly reaches its destination.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "intermediate",
      beginner:
        "Think of the difference between a building's logbook (everyone who came and went — information, but most of it needs no action) and the building manager's task list ('door 4 won't close — fix it'). The knowledge hub is the logbook; the inbox is the task list. Without that separation, the message 'door 4 is broken' gets swallowed inside a thousand lines of 'someone entered at 14:03'.",
      content: [
        "Item = {id, source, kind, priority, title, body, status, ts}. kind classifies: operational (alert/action), tech-trend (a trend to check), fyi (for info)",
        "dedup by source+title+day — an agent pushing the same thing twice doesn't flood the queue",
        "Agents push, the orchestrator doesn't poll the hub — so nothing critical 'falls between the chairs'",
        "Lifecycle: pending → (orchestrator acts) → done. high/medium/low priority sets handling order",
        "What flows in for me: infra alerts from [Kaylee](/en/guide/kaylee), data insights from [Hermes](/en/guide/hermes), task failures, and tech trends — all arriving filtered and prioritized in one place",
      ],
      tips: [
        "The 'push-don't-pull' rule is the key: if the orchestrator has to scan all history every round to find what matters — you'll miss things. Let the agents raise a flag",
        "Durability caveat: if the orchestrator only runs while a session is active, items accumulate. Fix: a server-side drainer (systemd timer) that schedules/reconciles, and the orchestrator consumes its output",
      ],
      codeExample: {
        label: "An inbox item",
        code: '{"id":"kaylee:err:2026-06-01","source":"kaylee",\n "kind":"operational","priority":"high",\n "title":"21 errors in last hour","status":"pending"}',
      },
    },
    {
      id: "protocol",
      icon: Workflow,
      title: "The network protocol — delegation matrix and task ownership",
      subtitle: "The 'harmony map': who owns what, and who delegates to whom",
      description:
        "When you have several agents, the critical question is 'who does what'. The network protocol is one canonical document every agent reads — a roster (who exists and their role), a delegation matrix (which task goes to which agent), and coordination channels. But the most important part is cultural: task-ownership discipline — an agent that receives a task takes end-to-end responsibility for it (understands start-middle-end, leads it, and reports the result), not just 'acknowledges receipt'.",
      color: "from-violet-600 to-purple-500",
      difficulty: "advanced",
      beginner:
        "It's like a charter pinned to the staff-room wall: who's responsible for what, and who to go to when you need something. The most important rule is simple — if you got a task, you see it through to the end and report the result, not just say 'got it' and vanish. Without it, you get tasks that 'everyone thought someone else was doing'.",
      content: [
        "Roster + roles: each agent with one clear domain of responsibility — no confusing overlaps",
        "Delegation matrix: a 'task-type → owning-agent' table. content creation→Hermes, infra monitoring→Kaylee, development→Claude Code, human interface→Kami",
        "Every agent knows everyone: the protocol lives in several read-locations (the shared hub + each agent's context), so 'everyone knows everyone' and can delegate correctly",
        "Full ownership ≠ acknowledgment: 'got it' without execution counts as failure. The agent leads the task to completion and reports evidence of the result",
        "Inter-agent communication is structured (JSON {status, output}) — not free chat. That makes it traceable, retryable, verifiable",
        "Positive-reinforcement culture: the network is designed for collaboration, not competition — an agent that finishes a task hands it off clean",
      ],
      tips: [
        "Write the protocol as a human-readable document (Markdown), not just config. Humans and agents alike need to understand the 'harmony map'",
        "The biggest danger in a multi-agent network is a task that 'everyone thought someone else was doing'. An explicit ownership matrix prevents exactly that",
      ],
    },
    {
      id: "council",
      icon: Scale,
      title: "The council of models — validating big decisions",
      subtitle: "Before an irreversible move, ask several models — not just one",
      description:
        "One model carries its own biases. For a big decision (architecture, an irreversible move, an ethical question) a second and third opinion are worth it — from different models, not just the same one. A council of models is a pattern where the orchestrator consults several peer models (mine are GPT, Grok and Gemini) and synthesizes — with one simple rule: if 2 of 3 agree it's a good direction, but you also read the dissenter (sometimes the dissenter is right).",
      color: "from-amber-600 to-orange-500",
      difficulty: "advanced",
      beginner:
        "Before a big decision — where to live, which job to take — you'd ask a few people you trust, not just one. A council of models is exactly that: you ask three different models, and if most agree — it's a good direction. But you also listen to the one who disagrees, because sometimes that's the one who saw what everyone else missed.",
      content: [
        "Two council types: external models (cross-model — validates biases) and internal sub-agents (same model, different lenses — fast, for code reviews)",
        "When to trigger: a decision affecting more than one system, a move that costs a day to undo, blind-spot risk, or an ethics/privacy question",
        "The 2-of-3 rule: broad agreement = confidence; a lone dissent = check before dismissing; three-way disagreement = no consensus, a human decides",
        "Budget gate: every consultation costs — set a ceiling so there's no silent spike",
        "Not for everything: routine review = internal sub-agents (cheap/fast); a strategic decision = external models (real diversity)",
      ],
      tips: [
        "Don't synthesize the dissent away. The value of a council is precisely in the dissenting voice — if you 'smooth it out', you gave up the whole point",
        "Document the decision and the rationale — so you can look back and understand why you chose a direction, even months later",
      ],
    },
    {
      id: "content-empire",
      icon: Layers,
      title: "Case study: the content factory",
      subtitle: "How all the components connect into one end-to-end flow",
      description:
        "All the components connect nicely in a real case study: the content factory. An idea comes in, gets processed for every platform in one consistent voice, is saved in a classified bank, and distributed to all channels — all coordinated through the four components above. It illustrates why good orchestration turns a pile of capabilities into a production line.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "intermediate",
      content: [
        "Source: an idea (from [Hermes](/en/guide/hermes), from the orchestrator, or from trend-spotting in the inbox) — not a raw news digest, but a worthy angle",
        "Factory: a generation layer (free Gemini) applies one consistent voice and produces a per-platform variant — TL;DR-first, no AI-tells",
        "Bank: every variant saved in a state machine (draft→noted→approved→banked→scheduled→published) — one approval cascades to all variants",
        "Distribution: blogs (per-site), social (via a publishing scheduler), email (newsletter), and communities (WhatsApp via [Kami](/en/guide/kami), Telegram via [Kaylee](/en/guide/kaylee))",
        "Coordination: the hub logs what was created, the inbox surfaces what needs approval, the protocol sets who-creates-who-distributes, and the council steps in only for big content decisions",
      ],
      tips: [
        "The article is the source, not the product: one content item becomes N per-channel variants — you never publish the same text everywhere",
        "The state machine is what turns 'a pile of drafts' into 'a factory': every status is a trigger for the next action, not just a label",
      ],
    },
    {
      id: "advanced",
      icon: Sparkles,
      title: "Integration — how to adopt this yourself",
      subtitle: "Start small, add a coordination component only when the pain appears",
      description:
        "The most important thing to understand: you don't build the whole orchestration layer on day one. Start with two agents and one coordination component, and add the rest only when the pain appears. Each component solves a specific pain — don't adopt a component before you've felt the problem it solves.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      content: [
        "Step 1 — two agents + the knowledge hub: the moment there are two, they need a shared place to write/read. That's the first component",
        "Step 2 — inbox: when you start missing important info inside the sea, add a prioritized work queue above the hub",
        "Step 3 — network protocol: when duplications or orphaned tasks appear, write an explicit ownership matrix",
        "Step 4 — council: when a big decision comes up and you fear bias, add multi-model validation",
        "Infrastructure: the [Delegator](/en/guide/delegator) (central API gateway) is one entry point to the network; [Docker](/en/guide/docker)+[systemd](/en/guide/systemd) run the agents; the [Dashboard](/en/guide/dashboard) shows live network state",
        "Model-agnostic: each agent on the model that fits it — free Gemini for support/triage, a strong model for complex work. Coordination stays identical",
      ],
      tips: [
        "The signal that you need the orchestration layer: more than one agent, and you start asking 'wait, who was supposed to handle this?' — that's the moment",
        "Every coordination component is a simple file (JSONL/Markdown), not a system. The simple start is what holds up over time",
      ],
    },
  ],
  resources: [
    {
      title: "Elad's network code",
      description: "The agent network — Kami, Hermes, Kaylee and the coordination layer",
      href: "https://github.com/eladjak",
      icon: Github,
    },
    {
      title: "The Kami guide",
      description: "The network's human interface (WhatsApp + voice)",
      href: "/en/guide/kami",
      icon: BookOpen,
    },
    {
      title: "The Hermes guide",
      description: "The studio/worker — takes jobs from the orchestrator",
      href: "/en/guide/hermes",
      icon: BookOpen,
    },
    {
      title: "The Kaylee guide",
      description: "Infra reliability + community distribution",
      href: "/en/guide/kaylee",
      icon: BookOpen,
    },
    {
      title: "The Delegator guide",
      description: "The central API gateway — one entry point to the network",
      href: "/en/guide/delegator",
      icon: ExternalLink,
    },
    {
      title: "Consultation — agent networks",
      description: "Want to build a coordinated network of your own?",
      href: "/en/contact",
      icon: Mail,
    },
  ],
  ctaTitle: "Build an agent network that works together",
  ctaSub:
    "Start with two agents and one knowledge hub. Add the rest when the pain appears. Want to learn how?",
  primaryCta: {
    label: "Start with Kami",
    href: "/en/guide/kami",
    icon: Send,
  },
  secondaryCta: {
    label: "Consultation",
    href: "/en/contact",
    icon: Users,
  },
  authorBio:
    "I built a network of 6+ agents working together 24/7. The big lesson: each agent's capability was the easy part — coordinating them is what turned them into a force. This guide is based on what worked (and on duplications and orphaned tasks I learned from the hard way).",
};
