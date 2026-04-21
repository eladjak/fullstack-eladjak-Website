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
  logoImage: "/images/guide-logos/kaylee-logo.png",
  tagline: "Who watches your server at 3 AM? An AI agent that never sleeps",
  heroDescription:
    "Kaylee is the autonomous AI agent that keeps my entire agent network alive — around the clock, every day, without a break. Under the hood she runs on OpenClaw, a framework that has recently taken the agent world by storm: an AI agent that can perform almost any action you ask of it on a Linux server (start services, inspect logs, fix configuration, even edit source code) entirely on its own. OpenClaw pairs with Gemini Flash (Google's free tier) for reasoning, and ships with full access to the critical pieces of a host: containers (via [Docker](/en/guide/docker)), system services (systemd), and the file system. That power is also its risk — it fires a lot of parallel requests at the model, so unconstrained use can get expensive fast. The fix is to set boundaries up front: an allowlist of permitted actions, protected paths, and budget guards. In my setup Kaylee speaks over Telegram (the @kylie_elad_bot), watches ten services at once, and only wakes me when she genuinely doesn't know what to do. For you she can replace on-call rotation, tidy up log noise automatically, or act as a general maintenance agent for any server environment that needs to stay stable.",
  badgeText: "2026 · Monitoring + Self-Healing · Hands-On Guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/kaylee",
  heroBgImage: "/images/guides/guide-kaylee-hero.jpg",
  stats: [
    { label: "Automated checks", value: "5m" },
    { label: "Self-healing cycle", value: "10m" },
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
        "Kaylee is an autonomous AI agent with real hands on the server: she can run commands, check service status, edit configuration files, restart containers, and tail logs — exactly like a human sysadmin would. The engine underneath is [OpenClaw](/en/guide/kaylee), a relatively new agent platform built on top of the Claude Agent SDK that lets you wire any LLM into a Linux tool surface and let it work on its own.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "beginner",
      beginner:
        "Think of Kaylee as a teammate glued to a screen 24/7, quietly handling every small server hiccup — no complaints, no sleep, no salary. You tell her in plain language 'check on delegator', and she actually runs the right commands, reads the logs, and reports back with what she found. If the issue is simple, she also fixes it and tells you 'handled'.",
      content: [
        "The engine: [OpenClaw](https://github.com/openclaw/agent) — an agent platform built on the Claude Agent SDK (the same kit that powers [Claude Code](/en/claude-code))",
        "The brain: [Gemini 2.5 Flash](https://ai.google.dev) by default — fully free up to several thousand requests per day. Swap it for any model you like (Claude Sonnet, GPT-4, a local Ollama — all via one config line)",
        "System access: shell (bash), Docker CLI, systemd, file read/write — everything gated through an allowlist so she can't escalate her own privileges",
        "User interface: a Telegram bot (mine is @kylie_elad_bot) — you just message her and get a reply. A webhook is also exposed on port 18789 so other agents in the network can reach her",
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
        "Environment variables: GEMINI_API_KEY (a free key from ai.google.dev), TELEGRAM_BOT_TOKEN (from your bot), and DELEGATOR_URL (the central API gateway, if you're running one — see the [Delegator guide](/en/guide/delegator))",
        "Run it: docker-compose up -d brings the container up in the background — within thirty seconds she's online and answering your first Telegram messages",
      ],
      codeExample: {
        label: "Kaylee's docker-compose",
        code: 'services:\n  openclaw:\n    image: openclaw/agent:latest\n    volumes:\n      - /opt/openclaw/data:/home/node/.openclaw\n      - /var/run/docker.sock:/var/run/docker.sock\n    environment:\n      - GEMINI_API_KEY=${GEMINI_API_KEY}\n      - TELEGRAM_BOT_TOKEN=${TG_TOKEN}\n    ports: ["18789:3000"]\n    restart: unless-stopped',
      },
      tips: [
        "The line that mounts /var/run/docker.sock (the Docker socket — effectively the remote control for [Docker](/en/guide/docker) on the host) into Kaylee's container gives her full authority over every other container on the box. That's extremely powerful and extremely dangerous, which is why you must configure a strict Telegram allowlist that defines exactly who is allowed to send her instructions",
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
        "Scheduled monitoring is a set of jobs Kaylee runs on a fixed cadence in the background — without anyone having to ask. On Linux this happens via cron (the veteran scheduling system). In my setup three such layers run in parallel, each responsible for a different kind of check. Together they turn her from 'someone who answers when asked' into an agent that proactively looks after the server.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "intermediate",
      beginner:
        "Picture a security guard on three patrol loops: a short one every five minutes that confirms everyone's in their rooms, a medium loop every ten minutes that checks what's broken and fixes it, and a daily loop that covers general cleanliness. Each loop catches different problems — together they make sure nothing slips through the cracks.",
      content: [
        "heartbeat cron every 5 minutes — runs a health check against all ten agents in the network and writes the result to the agent_status collection in [Qdrant](/en/guide/qdrant). That's what lets the [Dashboard](/en/guide/dashboard) show a live view of the entire network",
        "self-heal cron every 10 minutes — if Kaylee sees that a service has fallen over, she automatically attempts to bring it back (up to three tries) before escalating to a human",
        "auto-kaylee-reports cron every 5 minutes — sweeps journalctl (the systemd log system) for anomalies, summarizes them, and posts short alerts to the [Dashboard](/en/guide/dashboard)",
        "08:00 morning report — a daily health summary: disk usage, RAM usage, CPU load, and how many containers are healthy. Delivered straight to the user's Telegram",
        "22:00 evening cleanup — runs /tmp tidying (the temporary file folder), docker prune (removing unused images), and log rotation (swapping full log files for fresh ones)",
      ],
      tips: [
        "All the crons are short, readable bash scripts — adding a new job or changing a cadence takes minutes, no deep refactor required",
        "If a cron job itself crashes, it will come back within five minutes via the heartbeat — the system knows how to heal its own safety net",
      ],
      codeExample: {
        label: "Self-heal logic in a nutshell",
        code: 'for container in ${CRITICAL}; do\n  if ! docker ps | grep -q "$container"; then\n    docker restart $container || alert_kaylee "failed to restart $container"\n  fi\ndone',
      },
    },
    {
      id: "heal",
      icon: RefreshCw,
      title: "Self-healing",
      subtitle: "Hermes-style — detect, diagnose, repair, verify",
      description:
        "Self-healing is Kaylee's ability to spot a problem, diagnose it, attempt a fix, and then verify the fix actually worked — all without needing to wake anyone up. This is the same pattern that [Hermes](/en/guide/hermes) implements across the whole network: from the first detection to the final alert when the system truly gives up. In operations parlance, escalation means handing a problem to someone (or something) that knows more. In practice it means Kaylee only pages me after she has genuinely tried and proven she can't handle it alone.",
      color: "from-rose-600 to-pink-500",
      difficulty: "advanced",
      beginner:
        "Suppose one of [Kami](/en/guide/kami)'s services dies in the middle of the night. Kaylee notices within ten minutes (via the heartbeat), tries a restart, confirms the service is healthy again, and updates the [Dashboard](/en/guide/dashboard) with a short note: 'went down, recovered'. Only if three consecutive attempts fail will she page you directly on Telegram. In practice most small incidents resolve before you even realize there was one.",
      content: [
        "Detection — the 5-minute heartbeat spots a service that has stopped responding or is in a failure state",
        "Diagnosis — Gemini reads the container's last 100 log lines (tail -100) and tries to explain what went wrong",
        "Repair — Kaylee walks through the approved action list in order: restart, pull + up (fetch a fresh image and reconnect), rebuild, reset (full reset)",
        "Verification — the crucial step: after the fix she actually confirms that the service is back to active and that the health endpoint (the URL you check to ask 'are you alive?') responds with 200 as expected",
        "Escalation — if three consecutive attempts fail, she relays an alert via [Kami](/en/guide/kami) to my WhatsApp, with a summary of what she tried and how each attempt ended",
        "Learning — every repair is written to the healing_history collection in [Qdrant](/en/guide/qdrant) with full metadata: which problem it was, which fix worked, how long it took",
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
      subtitle: "What I learned after four months of daily use",
      description:
        "This section is the pile of nuances that separates 'I have a DevOps bot' from 'Kaylee is a genuine teammate'. These are things I (Elad) learned after four months of daily use on a real production server — tricks that multiplied her reliability, cut my model costs, and gave me tighter control over how she operates. For you, each one will save weeks of trial and error.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      content: [
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
    "OpenClaw is open source, Gemini is free, and a VPS is cheap. In an hour, Kaylee is watching your back.",
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
    "Kaylee is the agent that keeps the rest of the network alive. She runs 24/7 on a single VPS watching ten services at once, self-heals known incidents, and only wakes a human when she genuinely doesn't know what to do. This guide lays out the architecture of an SRE agent you can adopt into any production stack — big or small.",
};
