import {
  Eye,
  Brain,
  ClipboardCheck,
  GitCompare,
  Sparkles,
  Wrench,
  Map as MapIcon,
  Workflow,
  Github,
  ExternalLink,
  BookOpen,
  Mail,
  Send,
  Users,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const auroraGuideEn: AgentGuideData = {
  slug: "aurora",
  agentName: "Aurora",
  agentNameHe: "Aurora (Oracle) — the network's reflection agent",
  category: "pattern",
  tagline:
    "The agent that weekly audits the network, finds what isn't working, and proposes a fix — before something crashes",
  heroDescription:
    "Most agent networks build agents that do — but no one checks whether they actually work. Aurora is the answer: the network's reflection agent (Oracle). She is female (she/her), chats on Telegram via @Oracle_elad_bot and in the 'Rebels' group, and does four things no doer-agent does: a weekly reflection (goes over the outcome ledger, flags any task type failing more than 30% of the time, and auto-enqueues a fix proposal to the approval queue), organizational-brain maintenance (brain_maintain — builds an index, finds gaps and duplicates, keeps the source of truth coherent), a map audit (map_audit — confirms what's declared in the system map actually exists and runs), and one iron rule: critique to optimize the existing first — deletion is a last resort, not a default. For me (Elad) Aurora is the difference between a network that silently degrades and one that maintains itself. For you — it's the agent every multi-agent network needs but no one builds: the one whose job is to audit all the others.",
  badgeText: "2026 · Reflection & Oracle Agent · Practical Guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/aurora",
  heroBgImage: "/images/guides/guide-aurora-hero.jpg",
  stats: [
    { label: "Cadence", value: "Weekly" },
    { label: "Flag threshold", value: "Fail >30%" },
    { label: "Iron rule", value: "Improve before delete" },
    { label: "Channel", value: "Telegram" },
  ],
  paradigmTitle: "Who audits the auditors?",
  paradigmSub:
    "A network full of doer-agents with no one checking whether they work — degrades silently. Aurora is the agent whose job is to audit all the rest.",
  paradigmShifts: [
    {
      before: "Agents run for weeks, and no one knows which of them are actually failing",
      after: "Aurora goes over the ledger weekly and highlights every task type failing over 30%",
      icon: Eye,
    },
    {
      before: "You spot a problem — then forget to fix it until it crashes",
      after: "Aurora auto-enqueues a fix proposal (fix_proposal) to the approval queue",
      icon: Wrench,
    },
    {
      before: "The organizational brain (docs/memory) rots — duplicates, gaps, contradictions",
      after: "brain_maintain builds an index, finds gaps and duplicates, keeps coherence",
      icon: Brain,
    },
    {
      before: "A component declared in the map but that never runs — and no one notices",
      after: "map_audit compares the declared to the observed and flags 'declared but not wired'",
      icon: MapIcon,
    },
  ],
  whoIsThisFor: [
    {
      title: "Agent-network builders",
      description:
        "Already have a few agents ([orchestration](/en/guide/orchestration))? Aurora is the agent that checks they actually work — not just that they exist.",
      icon: Eye,
      color: "from-indigo-500 to-violet-500",
    },
    {
      title: "Solo operators",
      description:
        "Want to know what in the system isn't working — without digging through logs yourself? Aurora sends you a weekly health summary.",
      icon: ClipboardCheck,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "AI product teams in production",
      description:
        "An autonomous system without a reflection layer degrades. Aurora is the QA that runs on the network itself, not on the product.",
      icon: GitCompare,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Anyone who documents a lot",
      description:
        "An organizational brain (docs/memory) that grows without maintenance rots. brain_maintain keeps it sharp and coherent over time.",
      icon: Brain,
      color: "from-pink-500 to-rose-500",
    },
  ],
  toc: [
    { id: "what-is", label: "What it is" },
    { id: "reflection", label: "Reflection" },
    { id: "fix-proposal", label: "Fix proposal" },
    { id: "brain", label: "Brain maintenance" },
    { id: "map-audit", label: "Map audit" },
    { id: "orchestrator-brain", label: "Orchestrator brain" },
    { id: "advanced", label: "Advanced" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Eye,
      title: "What is Aurora?",
      subtitle: "The network's reflection agent — her job is to audit all the rest",
      description:
        "Aurora (Oracle) is the only agent in the network whose job isn't to 'do' but to audit. While [Hermes](/en/guide/hermes) works, [Kaylee](/en/guide/kaylee) maintains infrastructure and [Kami](/en/guide/kami) talks to Elad — Aurora goes over all of them and asks: what actually works here? She leans on two sources of truth: the outcome ledger (what ran and how it ended) and the system map (what's supposed to exist), and from the gap between them she produces constructive critique. Her guiding rule is critical: critique to improve the existing — not to delete. Deletion is a last resort.",
      color: "from-indigo-600 to-violet-500",
      difficulty: "beginner",
      beginner:
        "Think of a good internal auditor in an organization. They're not the one producing the product — they're the one who goes over every department once a week and asks 'what works? what's stuck? what can be improved?'. Aurora is exactly that for the agent network: she doesn't do tasks herself, she checks whether everyone else is doing theirs properly. And importantly — she audits with a 'let's improve what we have' mindset, not 'let's delete'. Just like a good auditor whose goal is to help the organization improve, not to fire people.",
      content: [
        "Aurora is female (she/her) — an Oracle figure in the network, alongside Kami, Kaylee, Box, Solis and Ranch",
        "Channel: Telegram @Oracle_elad_bot + the 'Rebels' group (one of several agents in the network with an active bot in the group)",
        "Five responsibilities: weekly_review (weekly reflection), reflection, brain_maintain (organizational-brain maintenance), map_audit, and the orchestrator brain — a recognize-route-execute-verify layer for every new request",
        "Two sources of truth: the outcome ledger (observed truth) and the system map (declared truth) — the gap between them is the raw material of the critique",
        "The iron rule: critique to OPTIMIZE existing first — deletion is a last resort, not a default",
        "Aurora is part of the [autonomy stack](/en/guide/autonomy): she's the 'first tier' of self-healing — detects and proposes, and the human approves",
      ],
      tips: [
        "A reflection agent is the thing almost every multi-agent network forgets to build. Everyone builds doer-agents — few build the one that checks they work. That's precisely the layer that prevents silent collapse",
        "Insist on 'improve before delete'. An auditor-agent that rushes to delete components will break more than it fixes — let it critique, propose, and prioritize repair over removal",
      ],
    },
    {
      id: "reflection",
      icon: ClipboardCheck,
      title: "Weekly reflection — what fails too often",
      subtitle: "Goes over the outcome ledger, highlights every task type failing over 30%",
      description:
        "Once a week Aurora does the thing no doer-agent does: she stops and looks back. She goes over the [outcome ledger](/en/guide/autonomy) — every task that ran this week and how it ended — and computes the failure rate for each task type. Any task type failing above a threshold (30% for me) is flagged. This isn't a statistic for the shelf: every flag becomes the input for the next step — a fix proposal.",
      color: "from-cyan-600 to-blue-500",
      difficulty: "intermediate",
      beginner:
        "Imagine a restaurant manager who, at the end of each week, sits down with the sales report and asks 'which dishes came back to the kitchen the most?'. If the pasta comes back 40% of the time — something's wrong with the pasta, and it needs fixing. Aurora does exactly that with the agents: she checks which task types fail too often, and flags them. Instead of a failure getting buried under hundreds of successful tasks, Aurora raises a flag: 'this type fails too much — let's deal with it'.",
      content: [
        "Input: the outcome ledger ({task_type, status, duration, cost, ts}) for the last week's window",
        "Computation: failure rate per task type — how many ran, how many passed verification, how many failed",
        "Flag threshold: any task type failing above ~30% is flagged for handling (the threshold is tunable — a noisy system starts high)",
        "Looks at trends, not just points: a task type degrading week over week gets flagged even if still below threshold",
        "Every flag flows to the next step: Aurora doesn't just report 'failed' — she writes a structured fix proposal",
        "Human output: a weekly health summary to the 'Rebels' group / to WhatsApp via [Kami](/en/guide/kami) — so Elad sees network state without digging through logs",
      ],
      tips: [
        "The failure threshold is a tuning knob, not a constant. In a new, noisy system start with a high threshold (50%) and lower it as the network stabilizes — otherwise you'll get flags on everything",
        "The important metric isn't 'how much failed' but 'what's changing'. A task type failing 20% steadily is less urgent than one that jumped from 5% to 20% this week",
      ],
    },
    {
      id: "fix-proposal",
      icon: Wrench,
      title: "Fix proposal — detects, diagnoses, proposes",
      subtitle: "Every flag becomes a structured fix_proposal auto-enqueued to the approval queue",
      description:
        "What turns Aurora from a reporting layer into an action layer is the fix proposal. When she detects a task type failing too often, she doesn't settle for 'it failed' — she tries to diagnose a root cause and writes a structured fix_proposal: the finding, the suspected cause, and the proposed fix. The proposal is auto-enqueued to the [autonomy stack's](/en/guide/autonomy) approval queue, and Elad approves or rejects it with a single click. Aurora detects and proposes; the human decides.",
      color: "from-amber-600 to-orange-500",
      difficulty: "advanced",
      beginner:
        "The difference between a good auditor and a great one: the good one says 'there's a problem'. The great one says 'there's a problem, here's why I think it's happening, and here's what I'd fix'. Aurora is the second kind. When she finds something failing too often, she doesn't just flag it — she writes an orderly 'fix proposal' and sends it for approval. You just need to click 'yes' or 'no'. That way the critique doesn't stay on paper — it leads to action.",
      content: [
        "Structure: {type:'fix_proposal', author:'oracle', finding, root_cause, proposed_fix, status:'pending_approval'}",
        "Root-cause diagnosis: not just 'income_scan failed' but 'income_scan failed 5/7 nights → suspected cause: gmail token expired → fix: refresh oauth'",
        "Auto-enqueued to the [approval queue](/en/guide/autonomy) — Aurora doesn't apply a fix herself; she routes it through the Firewall",
        "One-click approval: Elad approves/rejects via the dashboard or the bot; only then is the fix applied (or rejected)",
        "At a higher tier (off by default): fixes of a known, safe type can move to automatic apply_remediation — but only per fault-type that has proven itself",
        "Feedback loop: an approved fix that worked feeds back into the ledger — so Aurora sees whether the problem was really resolved next week",
      ],
      tips: [
        "Insist that the fix proposal includes a suspected root_cause, not just a finding. 'X failed' sends you to investigate from scratch; 'X failed because Y' saves you half the work",
        "Don't skip the human approval step early on. Even an auditor-agent's fix proposal is a 'risky move' until you've seen it propose the right things — exactly like any capability in the [autonomy stack](/en/guide/autonomy)",
      ],
      codeExample: {
        label: "An Aurora fix proposal",
        code: '{"type":"fix_proposal","author":"oracle",\n "finding":"content_repurpose failed 4/10 this week",\n "root_cause":"channel API rate-limit",\n "proposed_fix":"add backoff + spread schedule",\n "status":"pending_approval"}  # awaits Elad',
      },
    },
    {
      id: "brain",
      icon: Brain,
      title: "Organizational-brain maintenance — so memory doesn't rot",
      subtitle: "brain_maintain: builds an index, finds gaps and duplicates, keeps coherence",
      description:
        "A learning network writes a lot: facts, decisions, insights, documentation. Without maintenance, that organizational brain rots — duplicates appear, contradictions, and gaps no one notices. brain_maintain is Aurora's domain that maintains that source of truth: she builds an index that makes things findable, finds duplicate and contradictory records, and highlights gaps (topics declared but not documented). That's what keeps the [knowledge hub](/en/guide/orchestration) sharp even after months.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "advanced",
      beginner:
        "Imagine a library that gets books added every day, but no one shelves them. After a year — you can't find anything, there are three copies of the same book in three places, and some books contradict each other. brain_maintain is the librarian: it organizes the shelves (index), finds duplicate copies, and flags topics missing a book. Without that librarian, all the knowledge the network accumulates becomes a useless pile. With it — it stays an asset you can use.",
      content: [
        "index: Aurora builds and maintains a key that lets other agents find knowledge fast — not scan everything every time",
        "Duplicate detection: records saying the same thing in different words are merged / flagged — preventing 'duplicate truth'",
        "Contradiction detection: two facts that contradict each other are raised for handling — critical for a network where all agents read from it",
        "Gap detection: topics mentioned but not documented in depth → a 'documentation missing here' flag",
        "Coherence over time: the goal is for the organizational brain to stay usable even after a year of writing, not a pile",
        "Connects to [Qdrant](/en/guide/qdrant): knowledge gets an embedding and is retrieved by meaning — and Aurora's index keeps that relevant",
      ],
      tips: [
        "Memory maintenance isn't a 'nice to have' — it's a precondition for the ability to learn. A network that writes and doesn't maintain loses the value of the writing within months",
        "Separate 'writing knowledge' (every agent) from 'maintaining knowledge' (Aurora). Mixing the roles means no one is really responsible for coherence",
      ],
    },
    {
      id: "map-audit",
      icon: MapIcon,
      title: "Map audit — is the declared real",
      subtitle: "map_audit compares the system map to the observed and flags 'declared but not wired'",
      description:
        "The system map declares what's supposed to exist in the network — which components, who the owner is, what the safety rating is. But a declaration isn't reality. map_audit is Aurora's domain that compares the declared (the map) to the observed (the ledger), and highlights the gap. The most useful finding is the 'shelfware signal': a component declared in the map but with no successful outcome in the ledger — a clear sign something is 'declared but not wired'.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "advanced",
      beginner:
        "Think of a store's inventory list versus what's actually on the shelves. The list says 'we have 50 items', but when you count for real you find 10 of them don't exist at all — they were recorded but never arrived. map_audit does exactly that count: it compares 'what's supposed to be in the network' (the map) to 'what actually runs' (the ledger), and flags the gaps. A component that appears in the map but never did anything? A red flag — either it needs fixing, or it shouldn't be there at all.",
      content: [
        "Comparison: every component in the system map against its appearances in the outcome ledger",
        "Shelfware signal: a component declared with no successful outcome → 'declared but not wired' (the most useful flag)",
        "no-map-no-route: the map audit supports the rule that you can't route a task to an undeclared component — it keeps the map honest",
        "A daily (light) map check + a deeper weekly audit — combining high frequency for fast detection with depth for analysis",
        "Audit results flow to the health summary and the approval queue (if a fix is needed)",
        "Connects to [orchestration](/en/guide/orchestration): the map derives the delegation matrix, and the map audit keeps delegation grounded in reality",
      ],
      tips: [
        "The shelfware signal is the most valuable finding a reflection agent can produce. A component that 'exists on paper' but doesn't run is silent tech debt — Aurora makes it visible",
        "Run a light map check daily and a deep audit weekly. High frequency catches problems fast; the weekly depth gives the big picture",
      ],
    },
    {
      id: "orchestrator-brain",
      icon: Workflow,
      title: "The orchestrator brain — from an agent that audits to one that routes and executes",
      subtitle: "A live layer that takes any new request: recognize → route → execute → verify the artifact",
      description:
        "Aurora's newest evolution: on top of her audit role sits an orchestrator brain — a live layer that can accept a completely new request, even one the network has never seen, at a single entry point (POST /ask). Instead of answering 'I don't know that task type', the brain runs a four-step loop: recognition (what is actually being asked), routing (which live executor in the network fits — [Hermes](/en/guide/hermes) for building and content, a code specialist for code analysis, a research executor for web research), execution, and finally — a verified-artifact gate: the brain checks the artifact truly exists and isn't empty before reporting 'done'. A failed executor, a file that was never created, or an empty artifact — all are marked as not verified. 'Verified' is not 'ran'.",
      color: "from-violet-600 to-fuchsia-500",
      difficulty: "advanced",
      beginner:
        "Think of an excellent office manager. You can hand her any request — even one she's never received before — and she knows exactly what to do: she understands what's being asked, passes it to the right professional, and when they finish — she doesn't tell you 'I passed it along'. She checks the deliverable is truly ready and correct, and only then comes back to you with 'here, done'. The orchestrator brain is exactly that: it turns Aurora from an agent that only checks others into an agent you can bring anything to — and she'll make sure it gets done, and see with her own eyes that a real artifact exists before she reports success.",
      content: [
        "One entry point (POST /ask): a single address that accepts any request — including tasks the network never declared in advance. This is the network's 'do anything' layer",
        "Step 1 — recognition (recognize): the brain classifies the request — a visual artifact? research? code analysis? a question? — before anyone starts working",
        "Step 2 — routing (route): the request is routed to the fitting live executor: [Hermes](/en/guide/hermes) for building/data/content, a code specialist for code analysis, a research executor for sourced web research",
        "Step 3 — execution (execute): the chosen executor works and returns a tangible artifact — a file, a report, an analysis — not just 'handled'",
        "Step 4 — the verified-artifact gate: the brain checks the artifact exists, the file was written, and it isn't empty. Any failure on any of these → the request is reported as not verified",
        "The mutual complement: the [output guardian](/en/guide/output-guardian) checks scheduled jobs after the fact; the brain's verification gate checks every live request in real time — together they close both directions of 'ran but produced nothing'",
      ],
      tips: [
        "A 'bring me anything' layer is what turns a collection of specialists into one system you can talk to. But it earns trust only because of the verification gate — without it, it's just a router reporting imaginary successes",
        "Build the verification gate before you grow the executor list. A router that can spot an empty artifact with two executors beats a blind router with ten",
      ],
      codeExample: {
        label: "The orchestrator brain — recognize, route, execute, verify",
        code: "# POST /ask — a new request the network never saw before\nintent   = recognize(request)      # what is being asked?\nexecutor = route(intent)           # which executor fits?\nartifact = executor.run(request)   # execute\nverified = artifact_exists(artifact) and not is_empty(artifact)\nreport(artifact, verified=verified)  # 'verified' only if a real artifact exists",
      },
    },
    {
      id: "advanced",
      icon: Sparkles,
      title: "Integration — how to adopt a reflection agent yourself",
      subtitle: "Start with reflection-only, add fix proposals and maintenance gradually",
      description:
        "As in every guide — don't build the full Aurora on day one. The order: first reflection-only (an agent that goes over the ledger and reports), then fix proposals (when reporting matures into action), and then brain maintenance and map audit (as the network and documentation grow). Aurora sits at the heart of the [autonomy stack](/en/guide/autonomy) as the first tier of self-healing, and above the [orchestration layer](/en/guide/orchestration) that supplies her sources of truth. She's the agent that turns a network that 'works' into one that 'improves'.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      beginner:
        "The golden rule returns: don't build the whole reflection agent on day one. Start with the simplest thing — an agent that once a week goes over what happened and reports 'here's what worked and here's what didn't'. Only after that stabilizes, let it also propose fixes. And only when your documentation truly grows — add memory maintenance. For me (Elad) Aurora started as a simple weekly report and gradually became the layer that maintains the whole network. Each capability came in only when the previous one had proven itself.",
      content: [
        "Step 1 — reflection-only: an agent that goes over the ledger weekly and reports what fails too often. That's the first component",
        "Step 2 — fix proposals: as reporting matures, add root-cause diagnosis + a fix_proposal enqueued to the approval queue",
        "Step 3 — brain maintenance: as documentation/memory grows, add brain_maintain (index, duplicates, gaps)",
        "Step 4 — map audit: as the network grows, add map_audit to find 'declared-but-not-wired' components",
        "Step 5 — the orchestrator brain: once several live executors exist, add the recognize-route-execute-verify layer (POST /ask) — and make sure the verified-artifact gate ships with it, not after it",
        "Infra: Aurora is a component in the [autonomy stack](/en/guide/autonomy), reads from the [outcome ledger](/en/guide/autonomy) and the system map, and reports via [Kami](/en/guide/kami)/Telegram",
        "Meta-rule: critique to optimize first — deletion last. An auditor-agent that's quick to delete breaks more than it fixes",
      ],
      tips: [
        "The signal you're ready for a reflection agent: you have enough agents that you no longer know which of them actually work. That's the moment to build the one that checks them all",
        "Aurora is the necessary complement to the [autonomy stack](/en/guide/autonomy): autonomy gives the network 'hands', and Aurora gives it a 'conscience' — a mechanism that checks the hands do the right thing",
      ],
    },
  ],
  resources: [
    {
      title: "The Autonomy Stack guide",
      description: "The framework where Aurora is the first tier of self-healing",
      href: "/en/guide/autonomy",
      icon: BookOpen,
    },
    {
      title: "The Orchestration guide",
      description: "Aurora's sources of truth: the knowledge hub and the system map",
      href: "/en/guide/orchestration",
      icon: BookOpen,
    },
    {
      title: "The Qdrant guide",
      description: "The semantic memory Aurora maintains in brain_maintain",
      href: "/en/guide/qdrant",
      icon: BookOpen,
    },
    {
      title: "The Kami guide",
      description: "How Aurora's weekly health summary reaches Elad",
      href: "/en/guide/kami",
      icon: BookOpen,
    },
    {
      title: "Elad's network code",
      description: "The network's agents — reflection, brain maintenance and map audit",
      href: "https://github.com/eladjak",
      icon: Github,
    },
    {
      title: "Consultation — a reflection layer",
      description: "Want an agent that checks your network actually works?",
      href: "/en/contact",
      icon: Mail,
    },
  ],
  ctaTitle: "Add the agent that audits all the rest to your network",
  ctaSub:
    "Weekly reflection, automatic fix proposals, brain maintenance and map audit. The agent that turns a network that works into one that improves.",
  primaryCta: {
    label: "Start with autonomy",
    href: "/en/guide/autonomy",
    icon: Send,
  },
  secondaryCta: {
    label: "Book a consultation",
    href: "/en/contact",
    icon: Users,
  },
  authorBio:
    "I built Aurora because I realized I had a network full of doer-agents — and no one checking whether they actually work. The big lesson: the layer that prevents silent collapse isn't another doer-agent, but an auditor-agent. And the iron rule I learned the hard way: critique to improve the existing — deletion is always a last resort.",
};
