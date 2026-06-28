import {
  Cpu,
  ListChecks,
  ShieldCheck,
  CheckCircle2,
  ClipboardList,
  Activity,
  Wrench,
  BellRing,
  Gauge,
  Github,
  ExternalLink,
  BookOpen,
  Mail,
  Send,
  Users,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const autonomyGuideEn: AgentGuideData = {
  slug: "autonomy",
  agentName: "Autonomy Stack",
  agentNameHe: "The Autonomy Stack — a network that runs itself",
  category: "agent",
  tagline:
    "How to make an agent network operate on its own 24/7 — safely, with human approval for every risky move",
  heroDescription:
    "An agent network that talks to itself is a start. A network that also acts on its own — takes a task, executes it, verifies it actually succeeded, and repairs itself when something breaks — is the autonomy stack. This guide describes the live system I (Elad) run on a private server: a durable task queue (SQLite) that holds every request even when my computer is off; a Worker that pulls one task, executes, and dies (easy to debug, no memory leaks); a Firewall that blocks any dangerous action until I approve it with one click; a verify-on-result layer that proves a task truly succeeded rather than just 'ran'; an outcome ledger that measures every move; an Oracle that weekly audits itself and writes fix proposals; and at the very top — a self-healing executor that applies a fix on its own (off by default, enabled only once trusted). Above all of it sits a model gateway with a $5/day cost cap, plus a CRM and dashboard that show the whole thing at a glance. For you — the same pattern turns a pile of bots-waiting-for-orders into a system that works for you while you sleep.",
  badgeText: "2026 · Autonomous Agent Network · Practical Guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/autonomy",
  heroBgImage: "/images/guides/guide-orchestration-hero.jpg",
  stats: [
    { label: "Uptime", value: "24/7" },
    { label: "When PC is off", value: "Keeps going" },
    { label: "Risky move", value: "Human OK" },
    { label: "Cost cap", value: "$5/day" },
  ],
  paradigmTitle: "From 'a bot that waits' to 'a system that runs itself'",
  paradigmSub:
    "The gap between an agent that reacts to a command and an autonomous network is three things: a durable queue, verify-on-result, and a human safety gate on every irreversible move.",
  paradigmShifts: [
    {
      before: "Agent runs only while a session is open — close the laptop, everything stops",
      after: "A task queue on the server holds every request; the network runs even with the PC off",
      icon: Cpu,
    },
    {
      before: "'The command ran' = success (even if it silently failed)",
      after: "Verify-on-result proves the task actually hit its target before marking it 'done'",
      icon: CheckCircle2,
    },
    {
      before: "An autonomous agent = either block it entirely, or let it cause damage",
      after: "Firewall: safe actions run on their own, a risky move waits for one-click approval",
      icon: ShieldCheck,
    },
    {
      before: "Something breaks at night — you find out in the morning after it all crashed",
      after: "The Oracle audits itself, writes a fix proposal, and at the top layer — fixes it on its own",
      icon: Wrench,
    },
  ],
  whoIsThisFor: [
    {
      title: "Agent-network builders",
      description:
        "Already have agents that talk to each other ([orchestration](/en/guide/orchestration))? This is the step to let them act on their own — safely.",
      icon: Cpu,
      color: "from-indigo-500 to-violet-500",
    },
    {
      title: "Solo operators",
      description:
        "You want the system to run tasks while you sleep — but not do something irreversible without your sign-off.",
      icon: Gauge,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "AI product teams in production",
      description:
        "Real automation needs verification, measurement and a safety gate — not just 'the agent ran a command'.",
      icon: ShieldCheck,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Anyone afraid to give an agent 'hands'",
      description:
        "This pattern was built around exactly that fear: autonomy with a brake — everything can be stopped, paused, and rolled back.",
      icon: BellRing,
      color: "from-pink-500 to-rose-500",
    },
  ],
  toc: [
    { id: "what-is", label: "What it is" },
    { id: "queue", label: "Queue + Worker" },
    { id: "firewall", label: "Firewall" },
    { id: "verify", label: "Verify result" },
    { id: "ledger", label: "Outcome ledger" },
    { id: "selfheal", label: "Self-healing" },
    { id: "gateway", label: "Gateway + cost" },
    { id: "advanced", label: "Advanced" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Cpu,
      title: "What is an autonomy stack?",
      subtitle: "The difference between an agent that reacts and a network that acts on its own",
      description:
        "Autonomy is the layer that makes the agent network operate by itself — take a task, execute, verify, and repair — without a human standing behind every step. Unlike [orchestration](/en/guide/orchestration) (which is about how agents coordinate), autonomy is about how the network acts safely on its own. Its three pillars: durability (the queue holds tasks even when everything is off), reliability (verify-on-result instead of 'the command ran'), and safety (a Firewall that stops every risky move until a human approves).",
      color: "from-indigo-600 to-violet-500",
      difficulty: "beginner",
      beginner:
        "Picture a factory that runs at night too. No manager stands by each machine — there is a production line (the queue) feeding tasks, workers (the Worker) who take one task and do it, quality control at the end (verification) that checks the product is truly fine, and a safety gate (Firewall) that stops the line if something dangerous is requested until a shift manager approves. The autonomy stack is exactly that, for AI agents: it lets them work on their own — but with brakes everywhere that matter.",
      content: [
        "A durable task queue ([SQLite](/en/guide/postgres)) — every request enters a queue on the server and survives reboots, network drops, or a powered-off PC",
        "A single-shot Worker — pulls one task, executes it, and dies. No long-lived process that accumulates memory or messy state",
        "Firewall — classifies every task as 'safe' (runs on its own) or 'dangerous' (waits for one-click human approval)",
        "Verify-on-result — after every execution, a separate step checks the task actually hit its target, not just that 'the command didn't crash'",
        "Outcome ledger + Oracle — a log that measures every move, and an Oracle ([Aurora](/en/guide/orchestration)) that weekly audits the system and writes improvement proposals",
        "Everything is model-agnostic and runs through a model [gateway](#gateway) with a daily cost cap",
      ],
      tips: [
        "Don't build full autonomy on day one. Start with a simple queue + Worker, and add the Firewall and verification only once the network really begins performing actions with consequences",
        "The rule that holds it all together: 'safe by default'. Every new capability arrives turned off, and is enabled only after you've seen it behave",
      ],
    },
    {
      id: "queue",
      icon: ListChecks,
      title: "Task queue + Worker — the beating heart",
      subtitle: "A task enters a durable queue; the Worker pulls one, executes, and dies",
      description:
        "The heart of autonomy is a durable task queue: every request — from Elad on WhatsApp, from another agent, from a scheduled cron — is written to a queue on the server (SQLite for me, simple and resilient). Above it runs a Worker triggered every minute (systemd timer): it pulls the next task, executes it, reports a result — and dies. The 'single-shot process' pattern (pull→execute→die) is the opposite of a long-lived bot: easy to debug, no memory leaks, and every run starts clean.",
      color: "from-cyan-600 to-blue-500",
      difficulty: "intermediate",
      beginner:
        "Think of a bank counter with a 'take a number' system. Each visitor takes a number and joins the queue (that's SQLite — a list that isn't erased even if everything shuts down). Once a minute a clerk (the Worker) arrives, calls the next number, handles one customer, then goes home. Why 'goes home'? Because a clerk sitting eight hours gets tired and makes mistakes — a clerk who handles one customer and leaves is always fresh. That's the advantage of a single-shot Worker.",
      content: [
        "The queue is a SQLite table on the server: {id, type, payload, status, created_at, result}. Resilient to reboots and crashes — no task is ever lost",
        "Task sources: a WhatsApp message via [Kami](/en/guide/kami), a request from another agent via the bridge, or a scheduled cron (nightly income scan, daily CRM sweep, backup)",
        "The Worker is triggered every minute by a systemd timer — not an infinite loop. Each run: pull one task → execute → write result → exit",
        "no-map-no-route: the Worker only executes task types declared up front in the system map — you can't 'invent' an action that wasn't declared",
        "Every task type maps to an owner (which [agent](/en/guide/orchestration) or component handles it) — just like the delegation matrix in the network protocol",
      ],
      tips: [
        "A single-shot Worker on a systemd timer beats an infinite loop on every metric that matters: debugging, stability, and resource use. If one process hangs — the next one comes up anyway next minute",
        "SQLite is enough for most networks. Don't jump to [Postgres](/en/guide/postgres) or [Redis](/en/guide/redis-streams) before you truly feel the queue is a bottleneck — and in most cases it won't be",
      ],
      codeExample: {
        label: "Worker — pull, execute, exit",
        code: "# a systemd timer triggers this every minute\ntask = queue.claim_next()        # pull one task (atomic)\nif task:\n    result = execute(task)        # execute by type\n    if verify(task, result):      # verify-on-result\n        queue.mark_done(task, result)\n    else:\n        queue.mark_failed(task)\n# the process exits; the next one comes up next minute",
      },
    },
    {
      id: "firewall",
      icon: ShieldCheck,
      title: "Firewall + one-click approval — autonomy with a brake",
      subtitle: "A safe action runs on its own; a risky move waits for human approval",
      description:
        "The big fear of an autonomous agent is 'what if it does something irreversible?'. The Firewall is the answer: every task type has a safety rating. A safe task (summarize, classify, report, read) runs on its own immediately. A dangerous task (send an email to a client, publish a post, make a payment, delete) is blocked — it enters an approval queue, and Elad gets an alert and approves or rejects with a single click. That's how you get real autonomy without giving up control.",
      color: "from-rose-600 to-red-500",
      difficulty: "intermediate",
      beginner:
        "Think of a talented new personal assistant. Small things — arranging the calendar, summarizing emails — you let them do alone. But 'send the proposal to 12 clients' or 'transfer a payment' — there you'll want to see and approve first. The Firewall is exactly that distinction, automatically: it knows in advance which actions are safe (run alone) and which need your approval (stop, send you an alert, and wait for a 'yes'). That's what turns a 'scary agent' into an agent you can trust.",
      content: [
        "Every task type is tagged: safe (runs automatically) or needs-approval (firewall / human_command)",
        "Safe actions for me: summarize, classify, status report, scan, monitor — none have an irreversible external consequence",
        "Blocked actions for me: sending an email/message out, publishing content, a sales move, deletion — anything visible in the world",
        "A risky move → enters the approval queue → Elad gets an alert (WhatsApp/Telegram) → approves/rejects with one click in the dashboard or via the bot",
        "Additional controls: pause/resume (pause a component), force_run (run manually), mute (silence alerts) — all visible in the [dashboard](/en/guide/dashboard)",
        "The bridge link: only the approval path crosses the Firewall — the rest of the network cannot bypass it",
      ],
      tips: [
        "The right default is 'blocked, unless explicitly declared safe'. The inverse of 'allowed, unless blocked' — so a new capability never causes damage before you've vetted it",
        "One-click approval must be fast and reachable from the phone. If approval is cumbersome, you'll be tempted to disable the Firewall — which is exactly the mistake it exists to prevent",
      ],
      codeExample: {
        label: "Task safety classification",
        code: 'SAFETY = {\n  "summarize": "safe",       # runs alone\n  "classify":  "safe",\n  "send_email": "firewall",  # waits for approval\n  "publish":    "firewall",\n  "payment":    "firewall",\n}\nif SAFETY[task.type] != "safe":\n    approvals.enqueue(task)    # Elad approves with a click',
      },
    },
    {
      id: "verify",
      icon: CheckCircle2,
      title: "Verify-on-result — 'ran' is not 'succeeded'",
      subtitle: "A separate step that proves the task actually hit its target",
      description:
        "The classic automation mistake: assuming 'the command didn't crash' = 'the task succeeded'. In practice many failures are silent — an email sent to the wrong address, a post that went up empty, a script that ran but did nothing. The verify-on-result layer separates execution from verification: after the Worker executes, a separate step checks objective evidence that the target was achieved. Only if verification passes is the task marked 'done'. Otherwise — 'failed', and it returns for handling.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "advanced",
      beginner:
        "Imagine you asked a courier to deliver a package. 'I left the house with the package' is not 'the package arrived'. The only way to really know is to check the package is at the door. Verify-on-result is exactly that: the system isn't satisfied with 'I tried' — it checks the actual outcome. Sent an email? We confirm it went out. Published a post? We confirm it really appears. Only then does it count as 'done'.",
      content: [
        "The core split: execute() performs, verify() proves. Two separate steps, not one",
        "Verification looks for objective evidence: a response code, a record created in the DB, a file that exists, a value that changed — not just 'no error'",
        "A verify failure is information, not an accident: the task is marked failed with the reason, and enters the [outcome ledger](#ledger) for analysis",
        "The same principle that guides every agent in the network: self-verify after every success claim — the agent proves it succeeded, not just declares it",
        "Verification feeds the loop: recurring failure patterns become input for the [Oracle](#selfheal) that writes fix proposals",
      ],
      tips: [
        "Design the verification before the execution, not after. 'How will I know it succeeded?' is the first design question of every task type — if it has no objective answer, the task isn't ready for automation",
        "A silent verify failure is the worst of all. Better a task fails loudly and returns to the queue than 'succeeds' on paper and leaves you with hidden damage",
      ],
    },
    {
      id: "ledger",
      icon: ClipboardList,
      title: "Outcome ledger + system map — measuring every move",
      subtitle: "One source of truth that measures what worked, what failed, and what it cost",
      description:
        "For a system to improve, it needs to know how it performs. The outcome ledger records every move: what was executed, whether verification passed, how long it took, what it cost. Above it sits the system map — one declared source of truth describing every component, its owner, and its safety rating. Combining the two yields the 'shelfware signal': a component declared but which never ran successfully — an instant flag that something isn't wired up.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "advanced",
      beginner:
        "Every good business measures itself: how many orders, how many succeeded, how much they cost. The outcome ledger is exactly that for the agent network — a log that records everything the system did and how it ended. The system map is the 'flowchart' describing which components exist and what each is supposed to do. Comparing the two reveals important things — for example a component that exists on paper but in practice never managed to do anything (a sign it needs fixing or deleting).",
      content: [
        "Every run is written to the ledger: {task_type, status, duration, cost, ts} — the basis for all measurement and improvement",
        "The system map (system-map.json) is declared truth: a list of every component, type, criticality, owner, and controls",
        "From the system map are auto-derived: the delegation matrix (no-map-no-route — who handles what) and a human-readable operation map",
        "Shelfware signal: a component declared in the map but with no successful outcome in the ledger → a flag that it's 'declared but not wired'",
        "A daily map audit + a weekly reflection by the [Oracle](/en/guide/orchestration) → a WhatsApp summary, so Elad sees network health without digging through logs",
      ],
      tips: [
        "Separate declared truth (what the component is supposed to do — system map) from observed truth (what it actually does — the ledger). The gap between the two is where all the bugs hide",
        "Measuring cost in the ledger is not a luxury. Without knowing what each move costs, a silent API spike can drain a budget before you notice — exactly what the [model gateway](#gateway) exists to prevent",
      ],
    },
    {
      id: "selfheal",
      icon: Wrench,
      title: "Self-healing — the system audits and repairs itself",
      subtitle: "The Oracle writes a fix proposal; at the top layer — an executor applies it on its own",
      description:
        "The most advanced layer: a system that maintains itself. For me it works in several tiers. Tier one — the Oracle (Aurora) goes weekly over the ledger and the map, detects drift and failures, and writes a fix proposal (fix_proposal) that goes to human approval. A higher tier — a self-healing executor (apply_remediation) that can apply a fix on its own, but it's off by default and is enabled only when trusted for a specific failure type. In parallel, a knowledge custodian (brain_maintain) maintains the source of truth — index, gaps, and coherence — so the organizational brain doesn't rot either.",
      color: "from-amber-600 to-orange-500",
      difficulty: "advanced",
      beginner:
        "Our body repairs itself: a small wound closes on its own, and only for a big injury do we see a doctor. Self-healing in the network works the same way. The Oracle is like a weekly checkup: it goes over the system, spots what's unhealthy, and writes a 'prescription' (a fix proposal) that you approve. At a higher level, there's an 'immune system' that can fix known faults on its own — but it's off by default, and is enabled only for fault types you've already seen it handle safely.",
      content: [
        "Tier 1 — detection: the Oracle ([Aurora](/en/guide/orchestration)) goes weekly over the ledger + map, detects drift, recurring failures, and gaps",
        "Tier 2 — proposal: the Oracle writes a structured fix_proposal that enters the approval queue — Elad approves a fix with one click",
        "Tier 3 — execution: the remediation executor (apply_remediation) can apply a fix on its own, but is off-by-default — enabled per fault-type only once trust is built",
        "The knowledge custodian (brain_maintain) — maintains the knowledge hub: builds an index, finds gaps and duplicates, keeps coherence over time",
        "Audit-to-optimize: the Oracle's iron rule is to critique in order to improve the existing first — deletion is a last resort, not a default",
        "Everything goes through the same [Firewall](#firewall): even a fix the system proposes for itself is a 'risky move' until someone approves it (or until its type is trusted)",
      ],
      tips: [
        "Full automatic self-healing is the last thing you enable, not the first. Start from 'the system detects and proposes, a human approves' — and advance to self-execution only per fault type that has proven itself",
        "'Critique to improve, not to delete' is a definition that saves systems. An Oracle that rushes to delete components will break more than it fixes — let it critique, propose, and prioritize repair over removal",
      ],
      codeExample: {
        label: "An Oracle fix proposal",
        code: '{"type":"fix_proposal","author":"oracle",\n "finding":"income_scan failed 5/7 nights",\n "root_cause":"gmail token expired",\n "proposed_fix":"refresh oauth token",\n "status":"pending_approval"}  # awaits Elad',
      },
    },
    {
      id: "gateway",
      icon: Gauge,
      title: "Model gateway + cost control — autonomy isn't free",
      subtitle: "Every LLM call goes through one gateway with a $5 daily cap",
      description:
        "A system that runs on its own 24/7 can also burn money on its own 24/7. The model gateway is one chokepoint for all LLM calls in the network: it picks a model (free first — Gemini/local, a strong model only when needed), measures every call, and enforces a daily cost cap (for me, $5). If approaching the cap — it downgrades to cheaper models or stops non-critical actions. That's how autonomy stays economically sustainable.",
      color: "from-violet-600 to-fuchsia-500",
      difficulty: "intermediate",
      beginner:
        "Think of a smart electricity meter for the home. It knows how much each appliance draws, and if you approach the budget cap — it shuts off the non-essential things first. The model gateway is exactly that for the agent network: every time an agent 'thinks' (calls AI), it costs a little money. The gateway routes to free models first, measures everything, and if the day got too expensive — it slows down. That way the system can work all day without a surprise on the bill.",
      content: [
        "One chokepoint: all agents and loops call the LLM through the gateway — no direct call bypasses measurement",
        "Free models first: [Gemini](/en/guide/ollama) free for triage/content/summary, a local model via [Ollama](/en/guide/ollama) for simple tasks, a strong model only for complex work",
        "A daily cost cap ($5) — spanning the whole network. Approaching it? Automatic downgrade or rejection of non-critical actions",
        "Per-call measurement enters the [outcome ledger](#ledger) — so 'what it cost' is part of every move, not an end-of-month guess",
        "The gateway is also a resilience layer: if a model provider goes down, it auto-fallbacks to an alternative — the network doesn't stop",
      ],
      tips: [
        "A hard daily cost cap is the single most important safety net for an autonomous system. Without it, a bug in one loop can burn a month's budget in a single night — I've seen it happen",
        "'Free first' isn't stinginess but architecture. Most tasks (classify, summarize, triage) are solved perfectly by a free model — save the expensive model only for where it's truly needed",
      ],
    },
    {
      id: "advanced",
      icon: Activity,
      title: "Integration — how to adopt this yourself",
      subtitle: "Start with a simple queue, add a safety layer only when you give it 'hands'",
      description:
        "As in every guide — don't build the whole autonomy stack on day one. Order matters: first queue + Worker (durability), then the Firewall the moment the agent gets real 'hands', then verification and measurement, and only at the end — self-healing. Each layer arrives safe-by-default and lights up gradually. It all connects to the rest of the network: the [Delegator](/en/guide/delegator) is the entry gate, the [dashboard](/en/guide/dashboard) shows live state + approval buttons, and [orchestration](/en/guide/orchestration) provides the coordination layer on top of which all of this sits.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      beginner:
        "The golden rule returns: don't switch on full autonomy on day one. Just as you don't hand a new driver a race car immediately — you start small and add capability only as trust builds. For me (Elad) it started with a simple queue that holds tasks, and only when the system began performing real actions did I add the Firewall, then verification and measurement. Automatic self-healing was the last thing — and it's still off in most cases. Each layer came in only when I felt I trusted the previous one.",
      content: [
        "Step 1 — queue + Worker: durability before all. A task isn't lost, even when the PC is off",
        "Step 2 — Firewall: the moment the agent can perform an action with external consequence, block-by-default and add one-click approval",
        "Step 3 — verification + ledger: when you start trusting automatic execution, add verify-on-result and measurement — 'succeeded' is proven, not assumed",
        "Step 4 — Oracle + healing: as the system grows, add weekly self-critique, and gradually fix-execution per fault type",
        "Infra: runs on [Docker](/en/guide/docker)+[systemd](/en/guide/systemd), behind a [Cloudflare Tunnel](/en/guide/cloudflare-tunnel), with [Qdrant](/en/guide/qdrant) for memory and [Postgres](/en/guide/postgres)/SQLite for the queue",
        "Human interface: Elad controls everything from the phone — approvals, pauses, and summaries — via [Kami](/en/guide/kami) (WhatsApp) and Telegram bots",
      ],
      tips: [
        "The signal you're ready for an autonomy layer: you're already running actions manually, repeatedly and tediously, and trust the agents enough to let them do it. Before that — don't",
        "Every component here is a simple file/service (SQLite, a systemd timer, a JSON map), not a platform. The simplicity is what lets you sleep soundly while the system runs on its own",
      ],
    },
  ],
  resources: [
    {
      title: "The Orchestration guide",
      description: "The coordination layer the autonomy sits on — hub, inbox, council",
      href: "/en/guide/orchestration",
      icon: BookOpen,
    },
    {
      title: "The Dashboard guide",
      description: "Mission Control — live network state + one-click approval buttons",
      href: "/en/guide/dashboard",
      icon: BookOpen,
    },
    {
      title: "The Delegator guide",
      description: "The central API gateway — a single entry point to the network",
      href: "/en/guide/delegator",
      icon: ExternalLink,
    },
    {
      title: "The Kami guide",
      description: "The human interface — how you approve a risky move from the phone",
      href: "/en/guide/kami",
      icon: BookOpen,
    },
    {
      title: "Elad's network code",
      description: "Queue, Worker, Firewall, Oracle and the autonomy stack",
      href: "https://github.com/eladjak",
      icon: Github,
    },
    {
      title: "Consultation — an autonomous network",
      description: "Want a system that works for you 24/7 — safely?",
      href: "/en/contact",
      icon: Mail,
    },
  ],
  ctaTitle: "Build a network that runs itself — without losing control",
  ctaSub:
    "A durable queue, a Firewall with one-click approval, verify-on-result and a cost cap. Real autonomy with a brake everywhere that matters.",
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
    "I built a live autonomy stack running on a private server 24/7 — a durable task queue, a single-shot Worker, a Firewall with one-click approval, verify-on-result, and an Oracle that audits and repairs. The big lesson: autonomy without brakes isn't courage but negligence. Every capability here arrived safe-by-default and lit up gradually, only after I'd built trust in the previous one.",
};
