import {
  Server,
  Activity,
  Shield,
  Terminal,
  Cpu,
  HardDrive,
  Wrench,
  Eye,
  Github,
  ExternalLink,
  BookOpen,
  Users,
  Code2,
  Rocket,
  Lightbulb,
  Zap,
  Gauge,
  RefreshCw,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const kayleeGuideEn: AgentGuideData = {
  slug: "kaylee",
  agentName: "Kaylee",
  agentNameHe: "Kaylee — Autonomous Infrastructure Agent",
  category: "agent",
  logoImage: "/images/guide-logos/kaylee-logo.png",
  tagline: "Who watches your server at 3 AM? An AI agent that never sleeps",
  heroDescription:
    "Kaylee is a server-maintenance agent designed to help Elad inspect incidents and prepare repair actions. The guide describes her with OpenClaw, an agent framework, plus [Docker](/en/guide/docker), which isolates software in separate services, and systemd, the Linux service manager that runs programs in the background. Tools like these can read system logs and run commands, so an operator sets an allowlist of permitted actions and protected paths first; the AI model interprets requests and suggests a next step, while its ability to act depends on the permissions granted. In my setup (Elad), Kaylee illustrates an infrastructure-monitoring role that hands difficult cases to a person, alongside [Kami](/en/guide/kami) for conversation and [Aurora](/en/guide/aurora) for audits. You could adapt the same pattern for an operations team, with clear limits on what it may inspect and what needs human approval.",
  badgeText: "2026 · Monitoring + Self-Healing · Hands-On Guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/kaylee",
  heroBgImage: "/images/guides/guide-kaylee-hero.jpg",
  videoUrl: "/videos/guides/kaylee.mp4",
  stats: [
    { label: "Automated checks", value: "5m" },
    { label: "Self-healing cycle", value: "By configuration" },
    { label: "Active tools", value: "50+" },
    { label: "Mean diagnosis time", value: "<3s" },
  ],
  paradigmTitle: "DevOps that sleeps at night",
  paradigmSub:
    "Instead of being paged by Grafana, you have an agent with real access that handles the small stuff itself and briefs you in the morning.",
  paradigmShifts: [
    {
      before: "Woken at 3 AM by a Grafana alert",
      after: "Kaylee tried a restart, fixed it, and filed a morning note: 'something broke, here's the log'",
      icon: Activity,
    },
    {
      before: "Hunt for which container runs what, find the log, diagnose",
      after: "One sentence: 'how's delegator doing?' → full diagnosis plus a recommendation",
      icon: Terminal,
    },
    {
      before: "Write Ansible / Chef / Pulumi for every chore",
      after: "Plain English: 'restart container X and verify health' → done",
      icon: Wrench,
    },
    {
      before: "Forget to update Docker images for months",
      after: "Weekly audit, short report, 'three updates worth looking at'",
      icon: RefreshCw,
    },
  ],
  whoIsThisFor: [
    {
      title: "Solo operators",
      description:
        "No DevOps team, one or two servers to run. Kaylee is the team.",
      icon: Rocket,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Developers who hate YAML",
      description:
        "Describe the outcome in plain language, Kaylee executes — no Ansible playbooks required.",
      icon: Code2,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Small companies with a critical server",
      description:
        "Automated monitoring, self-healing, and a full audit log of every action. A solid base for SOC-1.",
      icon: Shield,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Anyone learning DevOps",
      description:
        "Kaylee narrates what she does and why. You learn by shipping.",
      icon: Lightbulb,
      color: "from-pink-500 to-rose-500",
    },
  ],
  toc: [
    { id: "what-is", label: "Overview" },
    { id: "install", label: "Install" },
    { id: "tools", label: "Toolbox" },
    { id: "cron", label: "Cron" },
    { id: "heal", label: "Self-Heal" },
    { id: "safety", label: "Safety" },
    { id: "advanced", label: "Advanced" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Server,
      title: "What is Kaylee? Meet your DevOps agent",
      subtitle: "OpenClaw running on Docker, reasoning with Gemini, chatting over Telegram",
      description:
        "Kaylee is an autonomous AI agent with real hands on the server: she can run commands, check service status, edit configuration files, restart containers, and tail logs — exactly like a human sysadmin would. The engine underneath is [OpenClaw](https://github.com/openclaw/agent), a relatively new agent platform built on top of the Claude Agent SDK that lets you wire any LLM into a Linux tool surface and let it work on its own.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "beginner",
      beginner:
        "Think of Kaylee as an operations teammate that can be configured to check selected services, read their logs, and report what it finds. If an incident matches a permitted repair, the design can let her try that action and verify the result; more sensitive cases stay with a person. The exact checks and permissions depend on the server setup.",
      content: [
        "The engine: [OpenClaw](https://github.com/openclaw/agent) — an agent platform built on the Claude Agent SDK (the same kit that powers [Claude Code](/en/claude-code))",
        "The model layer: [Gemini API](https://ai.google.dev) is one option for connecting a language model. Model choice, availability, quotas, and cost depend on your account and the provider's terms; check them before connecting. An alternative model needs interface adaptation and verification of the capabilities you require",
        "System access: shell (bash), Docker CLI, systemd, file read/write — everything gated through an allowlist so she can't escalate her own privileges",
        "User interface: a Telegram bot (mine is @kylie_elad_bot) — you just message her and get a reply. She also has a dedicated webhook (port 3500 in my setup) through which other agents in the network send her messages",
        "Network chatter: she receives messages from the [Delegator](/en/guide/delegator) (the central API gateway) and from [Kami](/en/guide/kami) (when he relays a WhatsApp request from me), forming a loop of agents that help each other",
        "Long-term memory: every action is logged into [Qdrant](/en/guide/qdrant) with metadata — what was asked, what she did, what the outcome was. After a month you have a searchable history of everything that ever happened",
      ],
      tips: [
        "Kaylee doesn't flinch at complex requests. Ask her to spin up a container for a service you've never deployed and she'll draft a sensible docker-compose, suggest reasonable defaults, and wait for your approval before actually starting it",
        "Remember that she runs inside her own container with the privileges she needs — so if she herself misbehaves, [Hermes](/en/guide/hermes) (the self-healing layer) is the one that keeps her in line",
      ],
    },
    {
      id: "install",
      icon: Zap,
      title: "Installing on an existing VPS",
      subtitle: "Her access starts from a single Docker bundle",
      description:
        "Installing Kaylee means dropping one container onto an existing Linux VPS — the whole process rides on [Docker](/en/guide/docker) (a system for running software inside an isolated 'box'), so you don't install dependencies directly on the host. On my setup she runs on Ubuntu 22 inside a roughly 200 MB container, and the journey from a fresh server to the first Telegram ping is about ten minutes. For you the same recipe works on any standard €5–€20/month VPS.",
      color: "from-amber-600 to-orange-500",
      difficulty: "intermediate",
      beginner:
        "All you need is a modest server (a basic VPS at €5–€20/month) and a free Telegram bot token (you get one in under a minute from @BotFather in Telegram — the official address for minting new bots). Wire the two together through a config file, run one Docker command, and Kaylee is live and responding in Telegram.",
      content: [
        "Clone the code: git clone the OpenClaw repo (the platform's source) and cd into it — that pulls down every file you need onto the server",
        "docker-compose.yml is the main config file (the one that tells [Docker](/en/guide/docker) how to bring the container up) — it already exists in the repo and defines the container plus the volumes (folders shared between container and host) you'll use",
        "SYSTEM_OVERRIDE.md is Kaylee's persona-and-rules file — what she's allowed to do, how she speaks, and what's off limits. This is where I define her customized behavior",
        "CLAUDE.md is the file that explains your project to Kaylee — the stack, which services run, and project conventions. It's re-read on every message, so you can tweak her behavior on the fly",
        "Environment variables are configuration values the application reads at startup: GEMINI_API_KEY (an access key from ai.google.dev; usage is subject to account and provider terms), TELEGRAM_BOT_TOKEN (from your bot), and DELEGATOR_URL (the central API gateway, if you're running one — see the [Delegator guide](/en/guide/delegator))",
        "Run it: docker-compose up -d brings the container up in the background — within thirty seconds she's online and answering your first Telegram messages",
      ],
      codeExample: {
        label: "Kaylee's docker-compose",
        code: 'services:\n  openclaw:\n    image: openclaw/agent:latest\n    volumes:\n      - /opt/openclaw/data:/home/node/.openclaw\n    environment:\n      - GEMINI_API_KEY=${GEMINI_API_KEY}\n      - TELEGRAM_BOT_TOKEN=${TG_TOKEN}\n    ports: ["18789:3000"]\n    restart: unless-stopped',
      },
      tips: [
        "Security principle: mounting /var/run/docker.sock (the control interface for host [Docker](/en/guide/docker)) can grant an agent broad authority over the server. Avoid it unless essential; give the agent only the permissions it needs, restrict who can invoke it, and require human approval for sensitive actions.",
        "Keep her state in its own folder (I use /opt/openclaw/data). That way, even if you bump the container image later, her memory and history stay intact",
      ],
    },
    {
      id: "tools",
      icon: Terminal,
      title: "The toolbox she can reach for",
      subtitle: "From docker ps to grep-ing logs, all invoked in one sentence",
      description:
        "Kaylee's toolbox is a curated set of 50+ prebuilt operations she can execute on the server — exactly the kind of commands a human sysadmin reaches for daily. The idea is not that she invents new commands, but that she picks from a well-defined allowlist (the formal term for a list of permitted operations) and fires the right one at the right moment. In my setup every action she runs is logged automatically, so I can rewind and see exactly what she did and when.",
      color: "from-violet-600 to-purple-500",
      difficulty: "intermediate",
      beginner:
        "For Kaylee to look after the server, she needs a 'toolbox' — just like a technician who shows up with a bag holding a screwdriver, a hammer, and a voltage meter. Her tools are the commands a human server admin uses: 'show me what's running now', 'read me the log', 'restart this service'. The important point: she doesn't invent new tools, she picks from a pre-approved list — and every action she takes is logged, so I (Elad) can always rewind and see exactly what she did and when.",
      content: [
        "bash — run Linux shell commands (shell access, meaning access to the system's command interpreter). Restricted to approved actions only — for example she's forbidden from running rm -rf / (a recursive wipe of the entire disk)",
        "docker — full container control: ps (who's running), logs (tail output), restart, inspect (technical metadata), stats (CPU and memory), exec (run a command inside a container). See the [Docker guide](/en/guide/docker)",
        "systemctl — system-service management (systemd is the official Linux service manager): is-active (is a service running), status (detailed state), restart, enable (start on boot), logs (read the journal)",
        "file_read / file_write — read and write files, also gated through an allowlist of permitted paths so she can't casually edit critical system files",
        "curl / network — probe internal and external endpoints (API endpoints) to confirm services answer correctly both from the network and from inside the server",
        "git — status, log, diff, pull against the project repo. Useful for seeing what changed since last time or pulling updates",
        "Media tools — ffmpeg (video processing), yt-dlp (YouTube downloads), and ImageMagick (image manipulation) are preinstalled, so she can handle light creative tasks too",
      ],
      tips: [
        "Every tool is constrained through the allowlist in the config — for instance, writing to /etc (Linux's main configuration directory) is off limits even if you ask nicely. That guardrail can't be talked around from inside the conversation",
        "You can add your own tools — for example write_to_pagerduty (fire an alert at your on-call system), slack_post (publish to Slack), or whatsapp_via_kami (relay a WhatsApp message through [Kami](/en/guide/kami)). See the [Kami guide](/en/guide/kami) for a complete example",
      ],
    },
    {
      id: "cron",
      icon: Gauge,
      title: "Scheduled monitoring — heartbeat + health + cleanup",
      subtitle: "Three layers of background surveillance",
      description:
        "Scheduled monitoring is a design for background jobs that run on a chosen cadence; on Linux, cron is one scheduling option. The jobs, intervals, permissions, reporting destination, and Kaylee's connection to them must be configured and tested separately. This section presents design options; it does not verify active jobs or monitoring of a particular server.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "intermediate",
      beginner:
        "The examples in this section are a possible monitoring configuration, not a description of active jobs: you can define periodic checks, status summaries, or scheduled cleanup when the infrastructure and permissions support them. Set and test the cadence, reporting channels, and repair actions separately in your environment.",
      content: [
        "Configuration example: a heartbeat (periodic health check) can write results to agent_status in [Qdrant](/en/guide/qdrant) if connected; a [Dashboard](/en/guide/dashboard) view requires its own implementation and connection",
        "Configuration example: a self-heal process can detect an unavailable service and attempt a defined recovery action, with retry limits and escalation conditions set in advance. Example numbers do not describe an active system",
        "Monitoring reports can be configured to scan journalctl (systemd's log system) and surface unusual events; posting them to a [Dashboard](/en/guide/dashboard) depends on an implemented connection",
        "Schedule example: a morning report at a chosen time can summarize disk, memory, load, and containers and send it through a selected channel if the alert connection is configured and tested",
        "You can schedule maintenance such as log rotation or temporary-file cleanup. Do not run deletion or docker prune by default: define paths, retention, checks, and explicit approval for actions that could remove data",
      ],
      tips: [
        "All the crons are short, readable bash scripts — adding a new job or changing a cadence takes minutes, no deep refactor required",
        "One possible pattern is an independent check for failed scheduled jobs and an alert; automatic recovery requires a separate mechanism that is configured and tested, and is not guaranteed by having a heartbeat",
      ],
      codeExample: {
        label: "Self-heal design example",
        code: 'for container in ${CRITICAL}; do\n  if ! docker ps | grep -q "$container"; then\n    docker restart $container || alert_kaylee "failed to restart $container"\n  fi\ndone',
      },
    },
    {
      id: "heal",
      icon: RefreshCw,
      title: "Self-healing",
      subtitle: "Hermes-style — detect, diagnose, repair, verify",
      description:
        "Self-healing is a design pattern in which an agent detects a problem, checks it, attempts a limited repair, and verifies the result. Escalation means handing an issue to a person or another system when needed, if repair and alert steps are configured and tested. The examples here do not verify an active heartbeat, automatic repair, or alert path.",
      color: "from-rose-600 to-pink-500",
      difficulty: "advanced",
      beginner:
        "Configuration example: if a [Kami](/en/guide/kami) service stops responding, a scheduled check could detect it, attempt an approved restart, verify health, and escalate if the attempt fails. The check interval, retry count, repair action, [Dashboard](/en/guide/dashboard) update, and alert channel must be configured and tested; this guide does not establish that they are active.",
      content: [
        "Detection: a configured periodic check can detect a service that stops responding or enters a failure state",
        "Diagnosis — Gemini reads the container's last 100 log lines (tail -100) and tries to explain what went wrong",
        "Repair: define an allowlist and order of actions. Start with limited, reversible steps; pull, rebuild, or reset can change or delete state and require appropriate review and approval",
        "Verification: after an action, a configured check can confirm whether the service is healthy; a health endpoint reports availability, and its response meaning must be validated in your environment",
        "Escalation: you can configure a failure threshold and alert channel, such as through [Kami](/en/guide/kami), after verifying the connection and recipient",
        "Learning: if you build a repair log, retain only necessary information and define access and retention; a connection to a store such as [Qdrant](/en/guide/qdrant) is optional",
      ],
      tips: [
        "After a month or two in production she starts recognizing your server's specific failure patterns — repairs get faster because she pulls the fix that worked last time for a similar issue",
        "Every repair is logged with a timestamp, the root cause, and the action taken. You can ask for a monthly report of all failures and fixes — it's excellent raw material for spotting recurring weak points",
      ],
    },
    {
      id: "safety",
      icon: Shield,
      title: "Safety: what Kaylee is not allowed to do",
      subtitle: "Allowlist, guardrails, and an audit trail",
      description:
        "Safety is why an autonomous DevOps agent with full [Docker](/en/guide/docker) access is a double-edged sword: the exact capability that lets her fix anything by herself also lets her destroy everything, accidentally or maliciously, if the wrong person takes control of her. In my setup Kaylee sits behind a whole stack of dos-and-don'ts defined in an allowlist (list of permitted actions), and every action is written to an immutable audit trail (tamper-evident action log). For you this section is non-negotiable before you let her anywhere near a production server.",
      color: "from-red-600 to-rose-500",
      difficulty: "advanced",
      beginner:
        "Great power demands clear boundaries — and that's exactly the point here. The same ability that lets Kaylee fix everything by herself also lets her destroy everything by accident if we don't put up a fence. Imagine handing keys to a new assistant: you give them a key to the door and the storeroom, not to the safe and the bank account. For me (Elad) Kaylee has an explicit list of 'these are the things you must never touch' — deleting critical files, installing things without approval — and every action she takes is written to a log that can't be altered. This chapter is mandatory before you put an agent like this on a real server.",
      content: [
        "Forbidden: running rm -rf (recursive file deletion) against critical paths — root /, the config directory /etc, the kernel boot directory /boot, or the home directories of other users",
        "Forbidden: running docker system prune -af (a command that wipes all unused images and volumes, including active ones) — only prune -f without --all is allowed, to prevent data loss",
        "Forbidden: installing new packages via apt/npm/pip without explicit human approval — this blocks malicious or unintended dependencies from sneaking in",
        "Forbidden: writing to sensitive system files — /etc/passwd (the user account list), /etc/ssh (remote-access configuration), or /var/lib/postgresql (the database data directory)",
        "Every meaningful action is POSTed to a central audit log and also surfaced on the [Dashboard](/en/guide/dashboard) — you have a complete record you can review at any time",
        "WhatsApp messages are always sent through [Kami](/en/guide/kami) only — never directly via Green API (the send provider). This concentrates WhatsApp logic in one place and prevents duplicate or unsupervised sends",
      ],
      tips: [
        "The single most important setting is the Telegram allowlist — exactly who is allowed to message her and give her instructions. The default should be only your own Telegram number, and only after careful review should you ever add anyone else",
        "Every action is stored in a dedicated [Qdrant](/en/guide/qdrant) collection — enough to run a proper forensic audit (after-the-fact investigation) if something unexpected happens, and to rewind through the timeline to understand exactly how it unfolded",
      ],
    },
    {
      id: "advanced",
      icon: Cpu,
      title: "Advanced tips",
      subtitle: "Options for configuring and checking an operations assistant",
      description:
        "This section presents options for designing an operations assistant: dividing responsibilities, updating rules, using multiple servers, and providing a fallback when a dependency fails. Each option needs configuration and testing in your environment. These examples do not verify production use, improved reliability, or cost savings.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      beginner:
        "Think of this as a list of options for improving your working environment. Start with one need: rules that are easy to update, consolidated reports, or handling a provider failure. Define the intended behavior and also check a case where the action fails. You can work gradually; the result depends on implementation, permissions, and your environment.",
      content: [
        "A possible role for Kaylee in an agent network: infrastructure-health checks, backups, scheduled jobs, and permission reviews. Content distribution or community moderation could be added as separate capabilities, each requiring its own connection and authorization. The principle is to use her for operations, without assuming she runs around the clock.",
        "Division of labor (deliberate focus): content/asset generation and data-science moved to [Hermes](/en/guide/hermes) (studio/worker); ad-hoc development to [Claude Code](/en/claude-code). Kaylee keeps the environment stable and distributes — she doesn't dabble everywhere. Less turned out to be more for reliability.",
        "Hot-reloading SYSTEM_OVERRIDE.md — Kaylee re-reads the rules file on every incoming message, which means you can tweak her behavior on the fly without restarting the container",
        "Multi-VPS — you can run Kaylee instances on several servers in parallel and wire them together through the [Delegator](/en/guide/delegator) (the central API gateway), so each VPS is tended by a local Kaylee but all reports converge in one place",
        "Calendar-aware quiet hours — Kaylee understands Shabbat, holidays, and memorial days from the Jewish/Israeli calendar, and holds back routine messages during those windows (critical alerts still get through) so she doesn't disturb the rest",
        "Draft mode — when publishing is blocked (for example on Shabbat), reports don't vanish; they queue as drafts and ship automatically the moment the block lifts",
        "Gemini is not perfect — the model sometimes overcommits to its own conclusions (the formal term is overconfidence). You must add a reality-check layer that actually verifies the fix worked, not just that Kaylee believes it did",
        "Local fallback — if the Gemini API is down or out of quota, she can automatically switch to [Ollama](/en/guide/ollama) (a model running locally on the server, e.g. gemma3:4b). Quality drops, but Kaylee keeps functioning until the external service is back",
      ],
      tips: [
        "Build her a control panel in the [Dashboard](/en/guide/dashboard) — you get a live view of what she's done in the last hour, plus one-click buttons for prepackaged actions (restart a specific service, clear logs, run a status report) instead of having to type a Telegram message every time",
      ],
    },
  ],
  resources: [
    {
      title: "OpenClaw on GitHub",
      description: "The framework Kaylee is built on — powered by the Claude Agent SDK",
      href: "https://github.com/openclaw/openclaw",
      icon: Github,
    },
    {
      title: "Gemini API",
      description: "Kaylee's LLM — free for most workloads",
      href: "https://ai.google.dev",
      icon: ExternalLink,
    },
    {
      title: "Telegram Bot API",
      description: "For Kaylee's chat interface",
      href: "https://core.telegram.org/bots/api",
      icon: ExternalLink,
    },
    {
      title: "Qdrant",
      description: "Kaylee's memory store — repair history and status trails",
      href: "https://qdrant.tech",
      icon: ExternalLink,
    },
    {
      title: "The Kami guide",
      description: "The agent Kaylee talks to across the bridge",
      href: "/en/guide/kami",
      icon: BookOpen,
    },
    {
      title: "The Hermes guide",
      description: "The self-healing pattern Kaylee implements",
      href: "/en/guide/hermes",
      icon: BookOpen,
    },
  ],
  ctaTitle: "Want DevOps that sleeps at night?",
  ctaSub:
    "Start by defining and checking one task on your server. Model choice, infrastructure costs, and setup time depend on your environment and provider terms; active monitoring requires connection and verification.",
  primaryCta: {
    label: "Install OpenClaw",
    href: "https://github.com/openclaw/openclaw",
    icon: Github,
  },
  secondaryCta: {
    label: "Book a consultation",
    href: "/contact",
    icon: Users,
  },
  authorBio:
    "Kaylee is an operations agent designed to help a team look after its services. The architecture in this guide describes monitoring a selected set of services, trying permitted repairs for known incidents, and escalating cases that need a person's decision. The number of services and the actions available depend on the infrastructure and permissions, so the pattern can be adapted to a small or large production stack.",
};
