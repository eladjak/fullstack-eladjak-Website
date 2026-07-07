import {
  Sunrise,
  MessageSquare,
  MousePointerClick,
  LayoutDashboard,
  ShieldCheck,
  Brain,
  Gauge,
  Github,
  ExternalLink,
  BookOpen,
  Mail,
  Send,
  Users,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const ceoLoopGuideEn: AgentGuideData = {
  slug: "ceo-loop",
  agentName: "CEO Loop",
  agentNameHe: "CEO Loop — one morning brief, one-tap approval",
  category: "pattern",
  tagline:
    "A single 07:00 message that sums up what the network did overnight — and what's waiting for your one-tap decision",
  heroDescription:
    "The CEO Loop is how an AI agent network talks to you the way a good chief-of-staff talks to a CEO: not a hundred alerts a day, but one summary, at one time, with clear decisions waiting for you. Instead of logging into a dashboard and digging through logs, at 07:00 a single WhatsApp message arrives through [Kami](/en/guide/kami): what the network executed while you slept, what succeeded, and what needs your call. Every move that requires approval (send a client a proposal, publish a post, release a payment) arrives with approve/reject links — on WhatsApp and Telegram — so you decide straight from the message, without opening anything. And whoever does want to go deeper gets a 'magic link' that opens the dashboard already logged in, no password. For me (Elad), this is the one message I have to read each morning — it condenses everything the network did into a single 30-second picture. For you, it's the difference between a system that bombards you with notifications and one that respects your time and surfaces only what genuinely needs a human. The loop sits on top of the [autonomy stack](/en/guide/autonomy) and uses its approval gate — it's simply the human wrapper that makes that stack pleasant to live with.",
  badgeText: "2026 · Proactive CEO Briefing · Practical Guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/ceo-loop",
  heroBgImage: "/images/guides/guide-ceo-loop-hero.jpg",
  logoImage: "/images/guide-logos/ceo-loop-logo.png",
  stats: [
    { label: "Briefing", value: "07:00" },
    { label: "Messages/day", value: "One" },
    { label: "Decision", value: "One tap" },
    { label: "Dashboard entry", value: "No password" },
  ],
  paradigmTitle: "From 'notification flood' to 'CEO briefing'",
  paradigmSub:
    "The difference between an annoying system and one you can live with isn't how much it does — it's how it reports: when, how much, and at what decision resolution.",
  paradigmShifts: [
    {
      before: "Dozens of alerts scattered all day — and eventually you ignore them all",
      after: "One 07:00 briefing that condenses everything from overnight into a single picture",
      icon: Sunrise,
    },
    {
      before: "To approve a move you open a dashboard, log in, and hunt for where it is",
      after: "Approve or reject straight from the message — one tap, on WhatsApp or Telegram",
      icon: MousePointerClick,
    },
    {
      before: "'Log in to check' — another password, more friction, another reason not to open it",
      after: "A magic link opens the dashboard with you already logged in",
      icon: LayoutDashboard,
    },
    {
      before: "You can't tell if the report is accurate — maybe something failed silently and wasn't counted",
      after: "The briefing rests on outcome-verification: it reports what actually happened, not what 'tried to run'",
      icon: ShieldCheck,
    },
  ],
  whoIsThisFor: [
    {
      title: "Busy business owners",
      description:
        "You want to know what the system did without sitting in front of it. One morning brief gives you the picture in 30 seconds.",
      icon: Sunrise,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Agent-network builders",
      description:
        "Already have [autonomy](/en/guide/autonomy) running 24/7? This is the reporting layer that makes it pleasant to live with.",
      icon: Brain,
      color: "from-indigo-500 to-violet-500",
    },
    {
      title: "Managers afraid of losing control",
      description:
        "Every risky move comes to you for approval. The system works alone — but nothing irreversible happens without your tap.",
      icon: MousePointerClick,
      color: "from-rose-500 to-red-500",
    },
    {
      title: "Anyone drowning in alerts",
      description:
        "If you've already muted app notifications because there were too many, this is the opposite pattern: less noise, more decisions that actually matter.",
      icon: MessageSquare,
      color: "from-emerald-500 to-teal-500",
    },
  ],
  toc: [
    { id: "what-is", label: "What it is" },
    { id: "briefing", label: "The morning brief" },
    { id: "one-tap", label: "One-tap approval" },
    { id: "magic-link", label: "Magic link" },
    { id: "trust", label: "What it rests on" },
    { id: "advanced", label: "Advanced" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Sunrise,
      title: "What is the CEO Loop?",
      subtitle: "The reporting layer that makes an autonomous network pleasant to live with",
      description:
        "A network of agents that works on its own ([autonomy](/en/guide/autonomy)) solves one problem — but creates a new one: how do you know what it did, and when it needs you? The bad answer is a flood of notifications. The good answer is the CEO Loop: one proactive report, at a fixed time, at decision resolution. It isn't another agent — it's the pattern that ties together [Kami](/en/guide/kami) (the channel), the approval gate of the [autonomy stack](/en/guide/autonomy) (what needs a human), and the [dashboard](/en/guide/dashboard) (where you go deeper). The result: the system talks to you like a good chief-of-staff — it filters, prioritizes, and brings only what truly matters.",
      color: "from-amber-600 to-orange-500",
      difficulty: "beginner",
      beginner:
        "Picture the CEO of a company. She doesn't want every employee calling her whenever something happens — she'd go crazy. What she wants is a good chief-of-staff who comes in once a day with coffee and says: 'Here's what happened yesterday, here's what we closed on our own, and here are three decisions I need from you.' The CEO Loop is exactly that chief-of-staff, except it's an agent network: it works all night, sums up in the morning, and brings you only the decisions that genuinely need a human. Everything else — it already handled.",
      content: [
        "The CEO Loop is a reporting pattern, not an agent: it condenses outputs from layers that already exist in the network into one human message",
        "The three parts: a morning brief (what happened) + one-tap approval (what needs a decision) + a magic link (where you go deeper)",
        "The channel is [Kami](/en/guide/kami) — the same WhatsApp agent that already speaks, hears and talks; the loop uses it to reach you",
        "The data source is the [outcome ledger](/en/guide/autonomy) — so the brief reports what actually happened, not what was merely 'triggered'",
        "The principle: fewer messages, higher resolution. One message a day that demands action beats fifty you can ignore",
      ],
      tips: [
        "The measure of whether your reporting works isn't how much information it holds — it's how fast you can decide from it. If you have to read it twice, it's too long",
        "Start with report-only (no approval buttons) for a few days. Only once you trust what the brief reports should you give it the ability to approve moves",
      ],
    },
    {
      id: "briefing",
      icon: MessageSquare,
      title: "The morning brief — one message at 07:00",
      subtitle: "A summary of what the network did overnight, what succeeded, and what's waiting",
      description:
        "Once a day, at a fixed hour (07:00 for me), a scheduled process gathers the activity since the last brief and assembles it into a short message: what ran automatically and succeeded, what failed and was handled, and what's awaiting a decision. The message is sent through [Kami](/en/guide/kami) to WhatsApp. The guiding rule is resolution: not a list of fifty actions, but category headlines + a highlight of what genuinely needs attention. The rest is available in the [dashboard](/en/guide/dashboard) for anyone who wants to dive in.",
      color: "from-cyan-600 to-blue-500",
      difficulty: "beginner",
      beginner:
        "Think of a morning news bulletin. It doesn't read you every single thing that happened in the world in the last 24 hours — it picks the three or four important items, gives each a headline, and whoever wants more reads the full story. The network's morning brief works exactly like that: it doesn't flood you with every action, it brings you the headlines of what happened overnight. You read it in half a minute with your coffee, and you know exactly where things stand.",
      content: [
        "Timing: a scheduled process (systemd timer / cron) that runs once a day at a fixed hour — not a loop running constantly",
        "Collection: the process reads the [outcome ledger](/en/guide/autonomy) since the last brief and groups it by category (done / failed-and-handled / pending)",
        "Phrasing: the message passes through a language model that writes it in plain, human language — not a log dump",
        "Delivery: [Kami](/en/guide/kami) sends the brief to WhatsApp; any pending moves are attached as buttons (see the next section)",
        "Respecting your time: quiet hours are honored — the brief arrives in the morning, not in the middle of the night",
      ],
      tips: [
        "Pick an hour when you're genuinely free to read and decide. A brief that arrives while you're rushing to a meeting gets deferred — and then you miss decisions",
        "Keep the brief concise even after a busy night. If the network did fifty things, group them into five lines — the full detail belongs in the dashboard, not the message",
      ],
      codeExample: {
        label: "The briefing process — collect, phrase, send",
        code: "# systemd timer runs this once a day at 07:00\nevents = ledger.since(last_briefing)   # what happened since yesterday\ndone   = [e for e in events if e.status == 'done']\npending = approvals.list_pending()      # what's awaiting a decision\n\nbrief = summarize(done, pending)        # short human phrasing\nkami.send(brief, buttons=pending)       # WhatsApp + approval buttons",
      },
    },
    {
      id: "one-tap",
      icon: MousePointerClick,
      title: "One-tap approval — decide from within the message",
      subtitle: "Every risky move arrives with two options: approve or reject",
      description:
        "The part that turns the brief from a report into a working tool is one-tap approval. Every move classified 'risky' by the approval gate of the [autonomy stack](/en/guide/autonomy) — send a client a proposal, publish content, release a payment — is not executed on its own. It waits in a queue, and is attached to the brief as approve/reject links on WhatsApp and Telegram. Tapping 'approve' releases it for execution; tapping 'reject' cancels it. You decide straight from the message, on your phone, without opening any additional screen. This is autonomy-with-a-brake: the system does everything on its own — except the irreversible moves, which wait for you.",
      color: "from-rose-600 to-red-500",
      difficulty: "intermediate",
      beginner:
        "Picture a personal assistant who texts you: 'I prepared the proposal for the client, ready to send — shall I send it?' and you reply 'yes' or 'no' in a single message. That's the whole idea. Instead of the system sending things on your behalf without asking (scary), or making you log into some screen to approve (annoying) — it simply puts two buttons in the message. One tap and it happens, another tap and it's cancelled. That way you keep control over everything that matters, effortlessly.",
      content: [
        "The source: every move tagged 'needs-approval' by the Firewall of the [autonomy stack](/en/guide/autonomy) enters an approvals queue",
        "The display: pending moves are attached to the brief as approve/reject links on WhatsApp and Telegram — a short headline + 'approve' / 'reject'",
        "The approval: tapping 'approve' releases the move for execution through [Kami](/en/guide/kami); tapping 'reject' cancels and records the reason",
        "Off-brief: an urgent move doesn't wait for morning — it's sent the moment it's created; the brief only bundles what wasn't burning",
        "Transparency: every approve/reject is written to the ledger — so there's always a record of who decided what and when",
      ],
      tips: [
        "One-tap approval must be fast and available from the phone. If the process is clunky, you'll be tempted to approve everything without reading — which defeats the entire point of a safety gate",
        "Phrase the approval headline so you can decide from it alone. 'Send David Cohen a proposal for $4,000?' is far better than 'Approve task #482'",
      ],
      codeExample: {
        label: "Handling a button tap",
        code: "# WhatsApp webhook when a button is tapped\nif action == 'approve':\n    approvals.release(task_id)   # released for execution\nelif action == 'reject':\n    approvals.cancel(task_id, reason='user_rejected')\nledger.record(task_id, decision=action)  # audit trail",
      },
    },
    {
      id: "magic-link",
      icon: LayoutDashboard,
      title: "The magic link — dashboard without a password",
      subtitle: "For those who want to go deeper: a link that opens the dashboard already logged in",
      description:
        "Sometimes a headline isn't enough and you want the full picture. Instead of sending 'log into the dashboard' (another password, more friction), the brief includes a magic link: a URL with an embedded token — tapping it opens the [dashboard](/en/guide/dashboard) with you already logged in, without typing anything. It's the same 'passwordless sign-in' (magic link) principle many sites already use. Full disclosure: in the classic version the token is one-time and short-lived; in my current setup the simpler version runs — a fixed token in the URL — a deliberate trade-off for a personal dashboard sitting behind the network's other protection layers, with the rotating-token upgrade as the next step.",
      color: "from-violet-600 to-fuchsia-500",
      difficulty: "intermediate",
      beginner:
        "You know how a site emails you a 'log in' button, you tap it, and suddenly you're in without typing a password? That's a 'magic link.' The network's brief does exactly that: if you want to see more than the headlines, there's one link in the message you tap — and you're already inside the dashboard, logged in, seeing everything. No password to remember, no login screen. In the full version the link works only once and only for a short time — just like a one-time verification code; in my current setup a simpler variant runs, with a fixed link, which fits a personal dashboard.",
      content: [
        "The mechanism (the recommended version): the link holds a signed token that is valid for a short time and for one-time use",
        "The flow: tap → the server verifies the token → opens a logged-in session → redirects to the [dashboard](/en/guide/dashboard)",
        "Security: in the recommended version the link expires quickly and cannot be reused. In my current setup the token is fixed — a deliberate trade-off for a personal dashboard, with additional protection layers behind it",
        "The infrastructure: the dashboard runs behind a [Cloudflare Tunnel](/en/guide/cloudflare-tunnel) — no port open to the internet, entry always through a protected layer",
        "The experience: from a WhatsApp message to a full dashboard in one tap — zero friction, and that's what actually makes you open it",
      ],
      tips: [
        "A short-lived one-time token is the right standard for any shared environment. If your messages could reach the wrong eyes — don't compromise on a fixed link: anyone who obtains the message would gain permanent access",
        "The magic link is what makes the report get read. Password friction at entry means you simply don't open it; remove it, and suddenly the dashboard is actually used",
      ],
    },
    {
      id: "trust",
      icon: ShieldCheck,
      title: "What it rests on — a report you can trust",
      subtitle: "The brief reports what actually happened, because beneath it there's verification and an output-guardian",
      description:
        "A report is worth exactly as much as its reliability. If the brief reports 'I sent 3 proposals' but one failed silently — you've lost. So the CEO Loop rests on two layers that guarantee it reports the truth: the outcome-verification of the [autonomy stack](/en/guide/autonomy) — which checks that each task genuinely reached its goal before it's counted as 'done' — and the output-guardian — a watchdog layer that verifies a scheduled task actually produced a real output, not merely 'ran.' Together they ensure the brief never reports fake success to you.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "advanced",
      beginner:
        "Picture a sales report that says 'we sold 100 units' — but it turns out 20 were returned and nobody updated the report. A report like that is worse than nothing, because it lies to you with confidence. To stop the network's brief from doing that, there are two 'quality controllers' beneath it: one that checks each task genuinely succeeded before it's counted, and a second (the 'output-guardian') that verifies a task meant to produce a file or output actually produced it, rather than just claiming to. That way, when the brief says 'this happened,' you can trust it really happened.",
      content: [
        "Outcome-verification: a task is counted as 'done' only after a separate verification step proves the goal was reached — see the [autonomy stack](/en/guide/autonomy)",
        "Output-guardian: a watchdog layer that checks every scheduled job produced a real output (file, record, change) — not just that the process 'didn't crash'",
        "Why it's critical: the most dangerous failure in an autonomous system is a job that runs every day with apparent success while producing nothing — the output-guardian catches exactly that",
        "Trends from [Aurora](/en/guide/aurora): the reflection agent feeds the brief a trend assessment — what's degrading, not just what happened yesterday",
        "Full transparency: every number in the brief can be traced to the ledger line it rests on — there's no 'magic,' there's a source of truth",
      ],
      tips: [
        "'Ran' doesn't equal 'succeeded,' and 'succeeded' doesn't equal 'produced an output.' Three different levels of truth — and a reliable brief needs all three beneath it",
        "The output-guardian pays for itself the first moment it catches a job that reported 'fine' seven days straight — without producing a single thing",
      ],
      codeExample: {
        label: "Output-guardian — 'ran' isn't 'produced'",
        code: "# runs after every scheduled job\nran = job.exit_code == 0        # the process didn't crash\nproduced = artifact_exists(job)  # but was a real output created?\nif ran and not produced:\n    alert('job ok but artifact missing')  # silent failure — caught",
      },
    },
    {
      id: "advanced",
      icon: Gauge,
      title: "Integration — how to adopt a CEO Loop yourself",
      subtitle: "Start with report-only, add approvals and a magic link gradually",
      description:
        "As with every guide — you don't build the full loop on day one. The order: first report-only (a daily brief with no buttons), then one-tap approval (once you trust the report and are ready to let it release moves), and only then the magic link (once the dashboard is mature enough). The loop connects to the rest of the network: [Kami](/en/guide/kami) is the channel, the [autonomy stack](/en/guide/autonomy) provides the approval gate and the outcome ledger, [Aurora](/en/guide/aurora) adds trend assessment, and the [dashboard](/en/guide/dashboard) is the destination of the magic link. This isn't a new system — it's the human wrapper over a system that already exists.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      beginner:
        "The golden rule returns: don't build it all on day one. Start with the simplest thing — a daily message that sums up what happened, with no buttons at all. Live with it for a few days and make sure it's accurate and you trust it. Only then give it approval buttons, and only after that the magic link to the dashboard. For me (Elad) this started as a simple morning message and gradually became the tool through which I run the entire network from my phone. Each layer went in only once the previous one had proven itself.",
      content: [
        "Step 1 — report-only: a scheduled process that collects from the [outcome ledger](/en/guide/autonomy) and sends a daily brief through [Kami](/en/guide/kami). No buttons",
        "Step 2 — one-tap approval: once you trust the report, wire the Firewall's approvals queue to WhatsApp buttons",
        "Step 3 — magic link: once the dashboard is mature, add a one-time token that opens it logged in — deep-dive in one tap",
        "Step 4 — report trust: connect the output-guardian and outcome-verification so the brief reports the truth only",
        "Infrastructure: the process runs on a [systemd](/en/guide/systemd) timer, behind a [Cloudflare Tunnel](/en/guide/cloudflare-tunnel), and talks to WhatsApp through [Kami](/en/guide/kami)",
        "Overriding rule: fewer messages, higher resolution. The best report is the one you actually read every morning — not the one that holds the most",
      ],
      tips: [
        "The sign you're ready for a CEO Loop: you have a system that does enough on its own that you're no longer sure what it did. That's the moment to build the reporting layer",
        "Resist the urge to keep adding to the brief. Every line you add lowers the odds that the rest gets read. A good CEO briefing is brutally short",
      ],
    },
  ],
  resources: [
    {
      title: "The Autonomy Stack guide",
      description: "The system beneath the loop — queue, Firewall, verification and cost cap",
      href: "/en/guide/autonomy",
      icon: BookOpen,
    },
    {
      title: "The Kami guide",
      description: "The WhatsApp channel through which the brief and approval buttons arrive",
      href: "/en/guide/kami",
      icon: BookOpen,
    },
    {
      title: "The Dashboard guide",
      description: "The destination of the magic link — the network's Mission Control",
      href: "/en/guide/dashboard",
      icon: BookOpen,
    },
    {
      title: "The Aurora guide",
      description: "The reflection agent that adds trend assessment to the brief",
      href: "/en/guide/aurora",
      icon: ExternalLink,
    },
    {
      title: "Elad's network code",
      description: "The reporting loop, the approval gate and the output-guardian",
      href: "https://github.com/eladjak",
      icon: Github,
    },
    {
      title: "Consultation — proactive reporting",
      description: "Want a system that reports to you like a chief-of-staff, not an alert firehose?",
      href: "/contact",
      icon: Mail,
    },
  ],
  ctaTitle: "A system that talks to you like a chief-of-staff — not an alert firehose",
  ctaSub:
    "One morning brief, one-tap approval, and a magic link to the dashboard. Less noise, more decisions that actually matter.",
  primaryCta: {
    label: "Start with autonomy",
    href: "/en/guide/autonomy",
    icon: Send,
  },
  secondaryCta: {
    label: "Consultation",
    href: "/contact",
    icon: Users,
  },
  authorBio:
    "I built the CEO Loop because I discovered that a network working on its own is only half a solution: without the right reporting, you're either flooded with alerts or completely blind. The big lesson was that the best report isn't the one holding the most information, but the one that lets you decide fastest — one message in the morning, one tap, one link to go deeper. Less noise, more control.",
};
