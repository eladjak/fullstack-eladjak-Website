import {
  TrendingUp,
  Layers,
  Route,
  Brain,
  Wrench,
  CheckCircle2,
  Shuffle,
  Scale,
  Gauge,
  Github,
  ExternalLink,
  BookOpen,
  Mail,
  Send,
  Users,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const capabilityLadderGuideEn: AgentGuideData = {
  slug: "capability-ladder",
  agentName: "Capability Ladder",
  agentNameHe: "The Capability Ladder — five rungs to a different class of agent",
  category: "pattern",
  tagline:
    "Five rungs that raise an agent from 'a bot that answers nicely' to 'a system that executes and verifies' — without waiting for a smarter model",
  heroDescription:
    "The capability ladder is a thinking framework that organizes the answer to a question every agent builder asks: 'why isn't my agent anywhere near Claude's level — and what can I do about it?'. The surprising answer is that most of the gap isn't in the model itself, but in five layers around it — and each is a rung you can climb: orchestrator routing (the request reaches the right executor), memory and retrieval (the agent remembers and pulls in relevant context), tools (real hands — files, APIs, a browser), a verify loop (the agent checks its own artifact before reporting), and model+fallback (the right model for each task, with a fallback chain when a provider goes down). For me (Elad), this ladder is precisely what took my [agent network](/en/guide/orchestration) from 'bots that answer' to a system that performs real work and verifies it. For you — it's an investment map: instead of paying for the most expensive model and hoping, you climb rung by rung and measure. And the ceiling deserves honesty too: the ladder delivers Claude-level operation on well-scoped jobs — not Claude's raw intelligence. That's a distinction worth understanding before you start.",
  badgeText: "2026 · Agent Capability Framework · Practical Guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/capability-ladder",
  heroBgImage: "/images/guides/guide-capability-ladder-hero.jpg",
  logoImage: "/images/guide-logos/capability-ladder-logo.png",
  stats: [
    { label: "Rungs", value: "5" },
    { label: "First rung", value: "Routing" },
    { label: "Last rung", value: "Model+fallback" },
    { label: "The ceiling", value: "Operation, not IQ" },
  ],
  paradigmTitle: "From 'waiting for a smarter model' to 'climbing the ladder'",
  paradigmSub:
    "The difference between a disappointing agent and an impressive one is almost never the model — it's the layers around it. And that's exactly the part under your control.",
  paradigmShifts: [
    {
      before: "Waiting for the next model so the agent will finally 'be smart'",
      after: "Climbing the ladder: routing, memory, tools, verification — without swapping the model",
      icon: TrendingUp,
    },
    {
      before: "Agent = model + prompt, and that's it",
      after: "Agent = model + five capability layers around it — and each layer adds a visible step up",
      icon: Layers,
    },
    {
      before: "Promising the client 'an agent as smart as Claude'",
      after: "Honesty: Claude-level operation on scoped jobs — not raw IQ",
      icon: Scale,
    },
    {
      before: "Every task runs on the most expensive model 'just in case'",
      after: "The right model per task + a fallback chain — stability and savings together",
      icon: Gauge,
    },
  ],
  whoIsThisFor: [
    {
      title: "Disappointed agent builders",
      description:
        "Built an agent that 'answers nicely but doesn't really help'? The ladder shows exactly which rung it's missing.",
      icon: TrendingUp,
      color: "from-indigo-500 to-violet-500",
    },
    {
      title: "Anyone planning an agent network",
      description:
        "Before building ([orchestration](/en/guide/orchestration)), it's worth knowing where you're climbing — the ladder is the investment roadmap.",
      icon: Route,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Decision-makers facing vendors",
      description:
        "When someone offers you an 'AI agent', the ladder gives you language to ask: which rungs does it actually have — routing? memory? verification?",
      icon: Scale,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Anyone burning budget on models",
      description:
        "If the bill grows and the results don't — you're probably buying IQ instead of building operation. The ladder realigns the investment.",
      icon: Gauge,
      color: "from-pink-500 to-rose-500",
    },
  ],
  toc: [
    { id: "what-is", label: "What it is" },
    { id: "rung-routing", label: "Rung 1: Routing" },
    { id: "rung-memory", label: "Rung 2: Memory" },
    { id: "rung-tools", label: "Rung 3: Tools" },
    { id: "rung-verify", label: "Rung 4: Verification" },
    { id: "rung-model", label: "Rung 5: Model+fallback" },
    { id: "ceiling", label: "The honest ceiling" },
    { id: "living-system", label: "The living network today" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Layers,
      title: "What is the capability ladder?",
      subtitle: "Five layers separating a disappointing bot from an agent that works",
      description:
        "When an agent disappoints, the instinct is to blame the model: 'it's just not smart enough'. But when you break down the gap between 'a bot that answers' and a system like Claude, you discover most of it sits in five layers around the model — not inside it: did the request reach whoever knows how to handle it (routing)? Did it have the right context (memory and retrieval)? Did it have hands to execute (tools)? Did it check itself before reporting (verification)? And was the chosen model right for the task, with a fallback when something goes down (model+fallback)? Those five layers are the ladder — and each rung you climb adds a noticeable step up in capability, on exactly the same model.",
      color: "from-indigo-600 to-violet-500",
      difficulty: "beginner",
      beginner:
        "Imagine two carpenters with exactly the same hands and the same talent. One has an organized workshop: a drawing before the work, a sorted lumber store, a full toolbox, and a measurement of every joint before assembly. The other has only a hammer. Who builds the better piece of furniture? That's precisely the difference between an agent with the full ladder and an agent that's 'just a model': the brain is the same brain — but the environment around it determines whether the talent turns into an artifact. The capability ladder is the list of the five things that turn 'a hammer' into 'a workshop'.",
      content: [
        "The rungs are ordered by the recommended climbing order: routing → memory and retrieval → tools → verify loop → model+fallback. Each rung leans on the previous ones",
        "The central principle: most of the gap between a disappointing agent and an impressive one is engineering, not model — which means it's under your control, today, without waiting for any model release",
        "Each rung stands on its own and is measurable: you can climb one step, measure the improvement, and only then invest in the next — instead of building everything at once",
        "The ladder applies to a single agent and to a whole network: my [agent network](/en/guide/orchestration) is essentially one big ladder that every agent in it climbs",
        "The practical guides for each rung already exist on this site — the ladder is the map that connects them into one picture: [orchestration](/en/guide/orchestration), [Qdrant](/en/guide/qdrant), the [autonomy stack](/en/guide/autonomy), the [output guardian](/en/guide/output-guardian)",
      ],
      tips: [
        "Before you upgrade a model — walk the five rungs and ask which one is missing. In most cases you'll find a day invested in a missing rung is worth more than doubling your model spend",
        "The ladder is also a diagnostic tool: when an agent fails, ask at which rung the failure happened — wrong routing? missing context? missing tool? no verification? wrong model? The answer focuses the fix",
      ],
    },
    {
      id: "rung-routing",
      icon: Route,
      title: "Rung 1 — orchestrator routing: the request reaches whoever knows",
      subtitle: "Before anything else: recognize what's being asked, route to the right executor",
      description:
        "The first and most neglected rung: making sure every request reaches whoever actually knows how to handle it. A single agent trying to do everything will be mediocre at everything; a system that recognizes the request type and routes it to the fitting specialist — impresses in every domain it covers. This is exactly what [Aurora's](/en/guide/aurora) orchestrator brain does: recognize what's being asked, route to the fitting live executor, and only then execute. Routing is the cheapest force-multiplier on the ladder — it doesn't require a strong model, only the engineering decision to build it.",
      color: "from-cyan-600 to-blue-500",
      difficulty: "beginner",
      beginner:
        "Think of a good call center. When you call, you don't get a 'general worker' trying to solve everything — you get a dispatcher who understands within seconds whether you need technical support, billing or sales, and transfers you to the right department. Without that dispatcher, even the best employees would waste their time on calls outside their domain. The routing rung does exactly that for agents: first understand what's being asked, only then decide who handles it.",
      content: [
        "Intent recognition: a short, cheap step that classifies the request — a question? a code task? research? a visual artifact? — before anyone starts working on it",
        "A delegation matrix: a simple table mapping every request type to its executor — the same principle as the [autonomy stack's](/en/guide/autonomy) no-map-no-route",
        "Specialists instead of a generalist: [Hermes](/en/guide/hermes) for building and content, a code specialist for code, a research executor for research — each with its own prompt and tools",
        "One entry point: the user doesn't need to know who the specialists are — they address one address, and routing happens behind the scenes (see [Aurora's](/en/guide/aurora) orchestrator brain)",
        "The step up this adds: requests stop 'falling between the chairs' or getting a generic answer — every request gets the most professional treatment the network knows how to give",
      ],
      tips: [
        "Start with a matrix of just three request types. Simple routing that works beats sophisticated routing that gets confused — add categories when there's proven need",
        "Log where every request was routed. The routing journal is the tool that reveals which request types have no good executor — and that's the signal for the network's next growth step",
      ],
    },
    {
      id: "rung-memory",
      icon: Brain,
      title: "Rung 2 — memory and retrieval: the right context at the right time",
      subtitle: "An agent without memory starts every conversation from zero — and feels like a stranger",
      description:
        "The second rung is the ability to remember and retrieve: both conversation memory (what was said in this conversation — every chat has its own history, persisted so it survives a restart) and long-term semantic memory (what was ever said — stored as embeddings in [Qdrant](/en/guide/qdrant) and retrieved by meaning). The difference in experience is dramatic: an agent that remembers context feels like an assistant who knows you; an agent that forgets feels like a form. But memory matters beyond experience — it's critical for quality: a model given the five relevant details from the past answers more intelligently than the same model without the context.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "intermediate",
      beginner:
        "Imagine a doctor who keeps no patient file: every visit starts with 'tell me everything from the beginning'. Even if he's the most brilliant doctor in the world, care will suffer — because he makes decisions without your history. The patient file is exactly what this rung gives the agent: memory of the current conversation (so it doesn't re-ask what it asked a minute ago) and an archive of everything said in the past, retrieved as needed. The same 'brain' — but now with a file in hand.",
      content: [
        "Conversation memory (short-term): a separate history per conversation, persisted to a file and surviving restarts — the way [Kami](/en/guide/kami) does with his chat map",
        "Semantic memory (long-term): every interaction is stored as an embedding in [Qdrant](/en/guide/qdrant) — and retrieved by meaning, not by exact words",
        "Smart retrieval: before every answer, the system pulls the most relevant items from the past and adds them to the context — that's the famous RAG (Retrieval-Augmented Generation)",
        "Hygiene matters: memory that grows without maintenance rots — duplicates and contradictions. [Aurora's](/en/guide/aurora) memory maintenance (brain_maintain) keeps it usable",
        "The step up this adds: continuity. You can continue an idea from a week ago, and the agent 'knows you' — the trait that most distinguishes a personal assistant from a one-shot tool",
      ],
      tips: [
        "Always separate conversation memory from long-term memory. Mixing them (pushing everything into context) inflates costs and confuses the model — selective retrieval beats flooding",
        "Test the quality of retrieval, not just its existence: ask the agent about something from two weeks ago and check whether it pulls the right detail. Bad retrieval is worse than no retrieval — it injects wrong context",
      ],
    },
    {
      id: "rung-tools",
      icon: Wrench,
      title: "Rung 3 — tools: real hands in the world",
      subtitle: "The difference between 'knowing how to explain' and 'knowing how to do'",
      description:
        "The third rung gives the agent hands: tools — defined capabilities the model can invoke: read and write files, call an API, search the web, run code, send a message. Without tools, even the smartest model can only advise ('here's how you'd do it'); with tools, it executes ('done, here's the artifact'). This is the rung where an agent turns from an answerer into a worker — and also the rung where responsibility enters: real hands require the safety gate of the [autonomy stack](/en/guide/autonomy), because an agent that can do can also err.",
      color: "from-amber-600 to-orange-500",
      difficulty: "intermediate",
      beginner:
        "The difference between an advisor and a doer: an advisor tells you 'you should send the client a reminder email' — and you still have to write and send it yourself. A doer says 'I sent the client a reminder, here's a copy'. Tools are what turn the agent from the first into the second. And as in life, the moment someone has hands — they also need rules: what may be done alone, and what requires asking first. That's why this rung always ships together with a safety layer.",
      content: [
        "A tool = a defined capability with clear input and output that the model can invoke: read_file, send_message, search_web, run_query — the model chooses when and how",
        "The connecting standard is MCP (Model Context Protocol — an open protocol that connects models to tools uniformly) — a tool written once serves every agent",
        "Tools are only as good as their environment: a file tool needs correct permissions, an API tool needs managed keys — the infrastructure is part of the rung",
        "Hands require brakes: every tool with external consequence (sending, publishing, deleting) goes through the [autonomy stack's](/en/guide/autonomy) Firewall — safe runs alone, risky waits for approval",
        "The step up this adds: throughput. An agent with tools finishes tasks end-to-end — and that's the point where users stop treating it as a toy",
      ],
      tips: [
        "Give the agent a few great tools, not many mediocre ones. Ten tools confuse the model's choice; three perfect tools with sharp descriptions produce better results",
        "Write every tool description as if explaining to a new employee: when to use it, when not to, and what the output is. Tool-description quality affects results more than any other prompt",
      ],
    },
    {
      id: "rung-verify",
      icon: CheckCircle2,
      title: "Rung 4 — the verify loop: the agent checks itself",
      subtitle: "The rung that turns 'sounds right' into 'checked and found right'",
      description:
        "The fourth rung probably has the highest return-on-investment on the ladder: the verify loop. After the agent executes, it doesn't report immediately — it checks its own artifact: was the file really created? Does the code really compile? Does the answer really address what was asked? Only an artifact that passed the check is reported as 'done'; one that failed goes back for repair. It's the same principle that appears across the network — the [autonomy stack's](/en/guide/autonomy) verify-on-result, the orchestrator brain's verified-artifact gate, and the [output guardian](/en/guide/output-guardian) for scheduled jobs — applied at the level of the single agent.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "advanced",
      beginner:
        "The difference between a student who hands in the exam the moment they finish writing, and a student who reviews their answers before submitting. Exactly the same knowledge — but the second one catches the arithmetic slips, the question accidentally skipped, the unfinished sentence. The verify loop is that habit, built into the agent: before it says 'done', it checks its own work. Simple — and it changes the reliability level end to end.",
      content: [
        "The pattern: execute → verify → report. Between execution and reporting comes a checking step that looks for objective evidence the artifact is sound",
        "Verification must be external to the claim: not 'the model says it succeeded' but 'the file exists and is valid', 'the tests pass', 'the link returns 200'",
        "A failed check triggers repair: the artifact goes back to the agent with the reason, and it tries again — a loop of a few attempts, not surrender after the first",
        "The compounding effect: a verify loop at the agent level + the [output guardian](/en/guide/output-guardian) at the system level = a double layer that almost never lets an imaginary success through",
        "The step up this adds: trust. The difference between an agent you must double-check every time and an agent you can hand a task and walk away — is exactly this loop",
      ],
      tips: [
        "Define each task type's verification question up front: 'how do we know it succeeded?'. A task with no objective answer to that question isn't ready for an agent yet",
        "Cap the repair loop (three-four attempts) and then hand off to a human. A loop without a ceiling can get stuck and burn budget on one stubborn task",
      ],
      codeExample: {
        label: "The verify loop — execute, check, repair",
        code: "for attempt in range(MAX_ATTEMPTS):\n    artifact = agent.execute(task)\n    check = verify(task, artifact)   # objective evidence, not a claim\n    if check.passed:\n        report_done(artifact)\n        break\n    task.feedback = check.reason     # the reason goes back to the agent\nelse:\n    escalate_to_human(task)          # didn't make it — a human takes over",
      },
    },
    {
      id: "rung-model",
      icon: Shuffle,
      title: "Rung 5 — model+fallback: the right brain for each task",
      subtitle: "The fitting model per task, and a fallback chain when a provider goes down",
      description:
        "Only at the fifth rung do we reach the model itself — deliberately last: once you have routing, memory, tools and verification, model choice turns from a fateful decision into an optimization decision. The principle is twofold: fit (the right model for each task — a free or local model via [Ollama](/en/guide/ollama) for classification and summarization, a strong model only for complex work) and fallback (when a provider goes down or exceeds quota, the system switches automatically to an alternative instead of stopping). Both capabilities live in the [autonomy stack's](/en/guide/autonomy) model gateway: one chokepoint that picks, measures, and swaps models — without any agent needing to know about it.",
      color: "from-violet-600 to-fuchsia-500",
      difficulty: "intermediate",
      beginner:
        "A good delivery company doesn't send a giant truck to fetch an envelope — and doesn't send a motorcycle to move a piano. They match the vehicle to the shipment. And when a vehicle breaks down mid-day, they don't cancel all deliveries — they send a replacement. The model rung does exactly that for the agents' 'thinking': simple tasks run on cheap or free models, complex tasks get the strong model, and when a provider is unavailable — an automatic switch to backup. The result: a system that's both economical and never stops.",
      content: [
        "Per-task model fit: classification, summarization and triage run on free or local models ([Ollama](/en/guide/ollama)); sensitive writing and complex code get a strong model",
        "A fallback chain: every task has a defined priority order of models — the first goes down or exceeds quota? Switch to the next in line, automatically",
        "One chokepoint: all calls pass through the [autonomy stack's](/en/guide/autonomy) model gateway — where every call is measured and the daily cost cap is enforced",
        "Model agnosticism: the agents don't know which model runs them — you swap a model with one setting at the gateway, without touching any agent",
        "The step up this adds: resilience and economy. The system keeps working when a provider goes down, and the monthly bill stays predictable — the two survival conditions of a system that runs 24/7",
      ],
      tips: [
        "Build the fallback chain before you need it. The day a major model provider goes down is not the day to learn how fallback works",
        "Measure quality per task before upgrading a model: sometimes the cheap model delivers 95% of the quality at 5% of the price — and sometimes the reverse. Without measurement, you're guessing",
      ],
    },
    {
      id: "ceiling",
      icon: Scale,
      title: "The honest ceiling — what the ladder gives and what it doesn't",
      subtitle: "Claude-level operation on scoped jobs — not raw IQ",
      description:
        "And here we must stop and tell the truth, because whoever sells a ladder without a ceiling sells an illusion: the five rungs dramatically raise operational quality — but they don't make a weak model smart. What the ladder gives: on well-defined, clearly-scoped tasks (summarize, route, sync, generate a report, execute a known action sequence), a system with the full ladder performs at a level that feels like Claude — because routing, context, tools and verification close most of the gap. What it doesn't give: raw intelligence. On an open, complex, unfamiliar problem — deep reasoning, long-horizon planning, fine judgment — a strong model without a ladder will still beat a weak model with a full one. This distinction isn't a weakness of the pattern; it's what lets you use it correctly.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      beginner:
        "Think of a restaurant with a perfectly organized kitchen: precise recipes, work stations, quality control. With an average cook, that restaurant will put out good, consistent food at an impressive level — because the system closes most of the gap. But if you ask the average cook to invent a new signature dish nobody has ever cooked — that's where the difference between him and a great chef shows. The ladder is the organized kitchen: it lifts execution to an excellent level on familiar tasks, but it doesn't replace raw talent on entirely new problems. Knowing the difference = knowing what to use each tool for.",
      content: [
        "What the ladder gives: Claude-level operation on scoped tasks — precise routing, right context, execution with tools, and a verified artifact. On those tasks, the difference from the raw model is night and day",
        "What the ladder doesn't give: raw IQ — deep reasoning on open problems, complex unfamiliar multi-step planning, fine judgment in novel situations. There, the model itself is the deciding factor",
        "The practical implication: defined, frequent tasks → an economical model + the full ladder. Open, critical problems → the strongest model, and even then with verification",
        "The rule of thumb: if you can write an objective 'definition of success' for a task — the ladder will bring it to a high level. If success is a matter of judgment — give it to the strong model (or a human)",
        "Honesty pays: a client promised 'an agent as smart as Claude' will be disappointed; a client promised 'reliable, high-level operation of the processes we defined' — gets exactly that, and stays",
      ],
      tips: [
        "Phrase the promise (to yourself and to clients) in operational terms, not intelligence terms: 'the system will execute and verify X, Y, Z reliably' — not 'the system is smart'",
        "Use the ceiling as a prioritization tool: any task below the ceiling (defined, measurable) is a candidate for full automation; whatever is above it — keep for a human+strong-model combination",
      ],
    },
    {
      id: "living-system",
      icon: Layers,
      title: "From theory to the living network — where the ladder stands today",
      subtitle: "Four layers that went live (July 2026) turned the ladder from an idea into infrastructure",
      description:
        "So far the ladder as a thinking model. Now what it looks like in practice on my network, after an upgrade wave that moved four layers from 'idea' to 'running in production': each one is exactly one of the ladder's rungs — except now it has a single shared home for the whole fleet. Routing lives in [Aurora's](/en/guide/aurora) orchestrator brain; memory moved into one 'memory kernel' that serves every agent instead of each one inventing its own; verification became a correctness layer inside the [output guardian](/en/guide/output-guardian); and model selection + fallback are centralized in a single network-wide LLM gateway. The difference from the previous version isn't conceptual but architectural: instead of every service holding its own copy of each layer, there is now one source of truth per rung — and that is precisely what turns a ladder on paper into a system that lasts.",
      color: "from-teal-600 to-cyan-500",
      difficulty: "advanced",
      beginner:
        "Imagine an apartment building where every flat dug its own water well, installed a generator, and hired a guard. It works — but it's wasteful, inconsistent, and hard to maintain. Now imagine the building moved to shared infrastructure: one water main, one power supply, one guard for the whole building. The exact same services — but managed from one place, cheaper and more reliable. That's what happened to my network: every rung of the ladder got shared 'building infrastructure' instead of a per-agent copy. The ladder stayed the same ladder — it's just built right now.",
      content: [
        "One LLM gateway for the whole fleet (the model+fallback rung): every model call on the network passes through a single gateway with a free-first ladder (a fast, cheap model for most tasks, a strong model only when needed) and an automatic fallback chain — instead of every service holding its own model-selection code",
        "One memory kernel (the memory rung): a shared memory envelope per agent+chat, with a nightly distill — so memory is one managed asset rather than a pile of copies; and it fails silently (a memory failure never drops the answer)",
        "A correctness layer in the [output guardian](/en/guide/output-guardian) (the verify rung): an advisor pass over scheduled jobs — it caught a real finding on its very first run; only legal status transitions are allowed, and a failure triggers a rework loop",
        "Deterministic approvals (the human link above the gateway): the morning brief of the [CEO loop](/en/guide/ceo-loop) writes a list of pending decisions, and a 'number approve/reject' reply is intercepted deterministically — without letting an LLM 'interpret' an approval command",
        "The lesson that moves the ladder from paper to infrastructure: don't rebuild each rung inside every agent. Build each rung once, as a shared service — reuse before duplication. That's what turns a network of agents into one organism rather than a pile of bots",
      ],
      tips: [
        "When a rung repeats across more than two agents — that's the signal to extract it into a shared service. One model gateway, one memory kernel, one output guardian: less code, fewer bugs, one point of control",
        "After centralizing a rung — delete the old copies. A shared layer running alongside five old copies is worse than either version alone (exactly like duplication in memory)",
      ],
    },
  ],
  resources: [
    {
      title: "The Orchestration guide",
      description: "The routing rung in practice — the hub, the delegation matrix, agent coordination",
      href: "/en/guide/orchestration",
      icon: BookOpen,
    },
    {
      title: "The Qdrant guide",
      description: "The memory rung in practice — embeddings and semantic retrieval",
      href: "/en/guide/qdrant",
      icon: BookOpen,
    },
    {
      title: "The Autonomy Stack guide",
      description: "Tools, the safety gate, verification and the model gateway — rungs 3-5",
      href: "/en/guide/autonomy",
      icon: BookOpen,
    },
    {
      title: "The Output Guardian guide",
      description: "The verification rung at the system level — 'ran' is not 'produced'",
      href: "/en/guide/output-guardian",
      icon: BookOpen,
    },
    {
      title: "Elad's network code",
      description: "A live network climbing all five rungs",
      href: "https://github.com/eladjak",
      icon: Github,
    },
    {
      title: "Consultation — a capability ladder for your business",
      description: "Want to map where your agents sit on the ladder — and what the next rung is?",
      href: "/contact",
      icon: Mail,
    },
  ],
  ctaTitle: "Stop waiting for the next model — start climbing",
  ctaSub:
    "Routing, memory, tools, verification, model+fallback. Five measurable rungs — and a ceiling stated honestly.",
  primaryCta: {
    label: "Start with orchestration",
    href: "/en/guide/orchestration",
    icon: Send,
  },
  secondaryCta: {
    label: "Book a consultation",
    href: "/contact",
    icon: Users,
  },
  authorBio:
    "I articulated the capability ladder after seeing the same mistake again and again — in myself and in others: blaming the model for a gap that actually sits in the layers around it. My network has climbed all five rungs, and the double lesson is clear: most of the road to an impressive agent is engineering under your control — and the part that remains is exactly where honesty about the ceiling is worth more than any promise.",
};
