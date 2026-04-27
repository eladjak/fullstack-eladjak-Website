import {
  Cog,
  Activity,
  Terminal,
  Shield,
  GitBranch,
  RefreshCw,
  Github,
  ExternalLink,
  BookOpen,
  Rocket,
  Users,
  Mail,
  Server,
  Zap,
  AlertCircle,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const systemdGuideEn: AgentGuideData = {
  slug: "systemd",
  agentName: "systemd",
  agentNameHe: "systemd — The Service Manager Of Modern Linux",
  category: "infra",
  brandIconSlug: "",
  tagline: "turn any script into a service that auto-starts, self-heals, and ships logs — in 25 lines of YAML",
  heroDescription:
    "systemd is the process and service manager of most modern Linux distributions (Ubuntu, Debian, CentOS, Fedora, Arch — all of them). Without systemd, every time you wanted a script to start automatically at boot, restart if it crashes, and get bounded RAM/CPU — you had to write a lot of dirty code with cron, screen, supervisord and init.d. With systemd, all of that is a small INI-style text file with 10-20 lines and one command. For me (Elad) on the Hetzner VPS, systemd manages all 13 of my microservice agents: each is a separate systemd unit, auto-starts, ships logs centrally to journalctl, and restarts itself if it crashes. systemd-timer also replaces my cron with clearer syntax and execution history, and systemd-resolved handles DNS. It is not the most popular tool among Unix-philosophy purists (some prefer classic init scripts), but the reality is that if you're in production Linux — you're using systemd. This guide will show the parts you'll use 90% of the time: writing service units, managing them via systemctl, and reading logs in journalctl.",
  badgeText: "2026 · Service Manager · Practical guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/systemd",
  stats: [
    { label: "services I run", value: "13" },
    { label: "auto-restart", value: "yes" },
    { label: "daily logs", value: "~500MB" },
    { label: "boot time", value: "<10s" },
  ],
  paradigmTitle: "Turn a script from 'I run it manually' into 'infrastructure'",
  paradigmSub:
    "The difference between a hobby project and a serious app isn't the code — it's how it runs.",
  paradigmShifts: [
    {
      before: "`python app.py &` in screen and hope it doesn't crash",
      after: "systemctl service that restarts itself automatically",
      icon: RefreshCw,
    },
    {
      before: "cron with '> /var/log/myapp.log 2>&1'",
      after: "systemd-timer + built-in journalctl",
      icon: Activity,
    },
    {
      before: "After a reboot — remember to start everything again",
      after: "systemctl enable — everything comes up on its own",
      icon: Server,
    },
    {
      before: "No memory control, one script kills everything",
      after: "MemoryMax, CPUQuota — built-in protection",
      icon: Shield,
    },
  ],
  whoIsThisFor: [
    {
      title: "Anyone running a Python/Node script on a server",
      description:
        "Instead of `nohup` and `screen`, systemd does everything better — auto-restart, logs, monitoring.",
      icon: Rocket,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Anyone running AI agents on a VPS",
      description:
        "Each agent = systemd service. If one falls over, only it restarts. The rest of the network keeps running.",
      icon: Users,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Teams moving back from Docker to scripts",
      description:
        "Not every app needs Docker. systemd gives isolation, restart, and monitoring — without container overhead.",
      icon: Cog,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Anyone still using cron",
      description:
        "systemd-timer with clearer syntax, execution history, and the ability to track failures.",
      icon: Activity,
      color: "from-orange-500 to-amber-500",
    },
  ],
  toc: [
    { id: "what-is", label: "What it is" },
    { id: "service-unit", label: "Service unit" },
    { id: "systemctl", label: "systemctl" },
    { id: "journalctl", label: "journalctl" },
    { id: "timers", label: "Timers" },
    { id: "advanced", label: "Advanced" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Cog,
      title: "What is systemd? The process manager",
      subtitle: "PID 1 — the first process, responsible for everything else",
      description:
        "systemd is what Linux runs first after the kernel boots — it is process number 1 (PID 1), and it is responsible for bringing up every other service the server needs. The classic 'init system' has gradually been replaced by systemd in most distributions since 2015, and it offers far more than 'just run scripts in order X': dependency management between services, parallelism (services that don't depend on each other start together), automatic health checks, resource limits, and central log management. It is somewhat controversial in the Linux community (some argue it's 'too big' and violates Unix philosophy), but in practice — it's what you'll meet on every production server.",
      color: "from-blue-600 to-cyan-500",
      difficulty: "beginner",
      beginner:
        "Think of it like a head of a large household: this manager makes sure the laundry runs, the cooking happens on time, the computer turns on when needed, and if something breaks — they fix it without waiting for the owner to come home. systemd does that for the whole server.",
      content: [
        "Unit — the basic building block. Every service, timer, mount, target — all units. Defined in `.service`, `.timer`, `.mount` files, etc.",
        "Service — a unit type representing a process that needs to run. The most common type. I have 13 of them",
        "Target — a state of the system. For example `multi-user.target` = everything except GUI. Services say 'I want to start after target X'",
        "Unit files — small INI-style text files. Live under `/etc/systemd/system/` (admin-defined) or `/usr/lib/systemd/system/` (packages)",
        "Cgroups — a kernel mechanism systemd uses for process isolation. Each service runs in its own cgroup, so memory/CPU can be limited individually",
        "PID 1 — systemd itself runs as process 1; every other service is a 'child'. If it crashes — the system falls. In practice this doesn't happen",
      ],
      tips: [
        "If you're on Ubuntu/Debian/Fedora — you're already using systemd. Zero installation effort needed",
        "Alpine Linux and Void Linux use OpenRC instead. They're popular in containers because of small size",
      ],
    },
    {
      id: "service-unit",
      icon: GitBranch,
      title: "Service Unit: the file that defines a service",
      subtitle: "20 lines that turn a script into infrastructure",
      description:
        "A service unit is a simple INI file describing how to run your service. Three main sections: [Unit] (description and dependencies), [Service] (how to run — command, user, restart policy), and [Install] (where in the boot order to enable). Each of my 13 agents is defined in such a file under `/etc/systemd/system/`.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "intermediate",
      content: [
        "[Unit] Description — a short English description shown in `systemctl status`",
        "[Unit] After — dependencies. For example `After=network.target postgresql.service` says 'wait for the network and Postgres to come up before you start'",
        "[Service] Type — `simple` (default, the process runs in foreground), `forking` (forks and exits — for old-style daemons), `notify` (notifies systemd when it's ready), `oneshot` (runs once and exits)",
        "[Service] ExecStart — the command to run. Always a full path: `/usr/bin/python3 /opt/myapp/app.py`",
        "[Service] User/Group — which user runs it. Always try not to be root. Create a dedicated user per service",
        "[Service] Restart — `always`, `on-failure` (only if it crashed), `no`. For my agents always `always`",
        "[Service] RestartSec — how long to wait before restart. I use 5 seconds — fast but doesn't flood the CPU if something is really broken",
        "[Service] Environment / EnvironmentFile — environment variables. EnvironmentFile points at a `.env` file (no shell — needs simple format)",
        "[Install] WantedBy — when to start. Almost always `multi-user.target` (after everything else has come up)",
      ],
      tips: [
        "After every change to a unit file: `systemctl daemon-reload` — systemd needs to re-read all unit files",
        "Each unit ships its stdout/stderr to journalctl automatically. No need to set `StandardOutput=` — that's the default",
        "If your service listens on a port below 1024 (like 80 or 443), you need `AmbientCapabilities=CAP_NET_BIND_SERVICE`. Better still, put it behind nginx instead",
      ],
      codeExample: {
        label: "Full service unit for a Python agent",
        code: "# /etc/systemd/system/kami-agent.service\n[Unit]\nDescription=Kami WhatsApp Agent\nAfter=network.target postgresql.service redis.service\nRequires=postgresql.service\nWants=redis.service\n\n[Service]\nType=simple\nUser=kami\nGroup=kami\nWorkingDirectory=/opt/kami\nEnvironmentFile=/opt/kami/.env\nExecStart=/opt/kami/.venv/bin/python -m kami.main\nRestart=always\nRestartSec=5s\n\n# Resource limits\nMemoryMax=512M\nCPUQuota=50%\n\n# Security\nNoNewPrivileges=true\nPrivateTmp=true\nProtectSystem=strict\nReadWritePaths=/opt/kami/data /var/log/kami\n\n# Logging\nStandardOutput=journal\nStandardError=journal\nSyslogIdentifier=kami\n\n[Install]\nWantedBy=multi-user.target",
      },
    },
    {
      id: "systemctl",
      icon: Terminal,
      title: "systemctl: the commands you'll use every day",
      subtitle: "start, stop, status, enable, disable",
      description:
        "systemctl is the CLI for managing systemd. Most of what you do is very simple commands you'll repeat dozens of times a day. Here's the set that covers 95% of the time.",
      color: "from-purple-600 to-violet-500",
      difficulty: "beginner",
      content: [
        "`systemctl start <service>` — one-shot start. The service comes up but won't return after a reboot",
        "`systemctl enable <service>` — marks 'auto-start at every boot'. Doesn't start now",
        "`systemctl enable --now <service>` — mark + start now. What I use almost always",
        "`systemctl stop <service>` — stops. Sends SIGTERM (graceful), waits 90s, and if the service hasn't stopped — sends SIGKILL",
        "`systemctl restart <service>` — stop + start in sequence. The standard way to apply config changes",
        "`systemctl reload <service>` — if the service supports reload (loads config without stopping). Rare",
        "`systemctl status <service>` — shows current state + last 10 log lines. The first thing to check when something doesn't work",
        "`systemctl list-units --failed` — shows only services currently in failed state. Always worth checking",
        "`systemctl daemon-reload` — after changing a unit file, you need to ask systemd to re-read it",
      ],
      tips: [
        "My favorite shortcut: `sc` as an alias for `systemctl`. Add `alias sc='sudo systemctl'` to `.bashrc`",
        "To see all your units: `systemctl list-units --type=service --all` — shows running, stopped, and failed",
        "`systemctl edit <service>` opens an editor and creates a drop-in override (a separate file that overrides fields). Safer than editing the original",
      ],
      codeExample: {
        label: "Typical deployment workflow",
        code: "# 1. Write the unit file\nsudo nano /etc/systemd/system/kami-agent.service\n\n# 2. Tell systemd to read it\nsudo systemctl daemon-reload\n\n# 3. Enable and start\nsudo systemctl enable --now kami-agent\n\n# 4. Verify it works\nsudo systemctl status kami-agent\n# Active: active (running) since ...\n\n# 5. Future updates (after git pull):\nsudo systemctl restart kami-agent\nsudo systemctl status kami-agent\n\n# 6. If something is broken, see what happened:\nsudo journalctl -u kami-agent -n 50 --no-pager",
      },
    },
    {
      id: "journalctl",
      icon: Activity,
      title: "journalctl: central logs, fast queries",
      subtitle: "All logs from all services — in one place, with queries",
      description:
        "journalctl is the tool for reading logs systemd collects. Anything your services write to stdout or stderr goes there automatically, with rich metadata (precise timestamp, PID, unit, user). You can search by any of them, filter by time range, follow in real time — all in one tool.",
      color: "from-amber-600 to-orange-500",
      difficulty: "intermediate",
      content: [
        "`journalctl -u kami-agent` — every log for that service from the start. Long, but comprehensive",
        "`journalctl -u kami-agent -f` — follow, in real time. The first tool for debugging an active service",
        "`journalctl -u kami-agent -n 100` — last 100 lines only. Fast",
        "`journalctl -u kami-agent --since '1 hour ago'` — only what happened in the last hour. Supports `yesterday`, `2 hours ago`, `2026-04-27 10:00`",
        "`journalctl -u kami-agent -p err` — only error-or-worse messages. Priorities: emerg, alert, crit, err, warning, notice, info, debug",
        "`journalctl -u kami-agent --grep 'timeout'` — regex search inside the logs. `--grep` supports full regex",
        "`journalctl -u kami-agent -o json-pretty` — output in JSON with full metadata. Useful for processing with `jq`",
        "`journalctl --disk-usage` — how much space logs take. `journalctl --vacuum-size=500M` shrinks to 500MB",
        "`journalctl --list-boots` — list of boots. `-b -1` shows logs from the previous boot (useful for debugging crashes)",
      ],
      tips: [
        "Always add `--no-pager` in scripts — otherwise journalctl opens less and waits for Q",
        "If the server is small on disk, add to `/etc/systemd/journald.conf`: `SystemMaxUse=500M` and `SystemMaxFileSize=50M`. Otherwise logs can eat the whole disk",
        "Logs from multiple units together: `journalctl -u kami -u kaylee -u box -f` — three agents in real time, in one stream",
      ],
      codeExample: {
        label: "Useful journalctl commands",
        code: "# Last hour's logs, errors only\nsudo journalctl -u kami-agent --since '1 hour ago' -p err\n\n# Real-time monitoring of every agent\nsudo journalctl -u kami -u kaylee -u box -u hermes -f\n\n# Search for exceptions in the last 24h\nsudo journalctl -u kami-agent --since today --grep 'Exception|Traceback'\n\n# Daily JSON export for data analysis\nsudo journalctl -u kami-agent --since today -o json > kami-today.jsonl\n\n# Crash debugging: logs from the boot before the crash\nsudo journalctl -b -1 -u kami-agent",
      },
    },
    {
      id: "timers",
      icon: Zap,
      title: "Timers: the cron of 2026",
      subtitle: "Schedule tasks with history, visibility, and better than cron",
      description:
        "systemd-timers is the modern replacement for cron. Instead of one file with archaic syntax (`* * * * *`), each scheduled job is two files: `myjob.service` (what to do) and `myjob.timer` (when). Advantages over cron: full history (`journalctl -u myjob.timer`), restart on failure, advanced features like 'run weekly at 2am only if the server was up then'.",
      color: "from-rose-600 to-pink-500",
      difficulty: "intermediate",
      content: [
        "OnCalendar — schedule by time. Clearer syntax than cron: `OnCalendar=daily`, `OnCalendar=*-*-* 03:00:00`, `OnCalendar=Mon..Fri 09:00`",
        "OnBootSec — how long after boot to run. `OnBootSec=5min` = 5 minutes after the server came up",
        "OnUnitActiveSec — interval since the last execution. `OnUnitActiveSec=1h` = every hour after the previous run",
        "Persistent — if the server was down when it should have run, it'll run immediately after boot. A feature cron lacks",
        "RandomizedDelaySec — adds random jitter. Useful so you don't kick off 100 services at the exact same second",
        "`systemctl list-timers` — shows every timer, when it last fired, and when it's next due",
        "Comparison: cron remains good for personal simple scripts. systemd-timer is better for anything serious on a server",
      ],
      tips: [
        "Always set `Persistent=true` for backup timers — otherwise if the server was off when it should have run, you miss it entirely",
        "To verify scheduling: `systemd-analyze calendar 'Mon..Fri 09:00'` — shows exactly when it'll fire next",
      ],
      codeExample: {
        label: "timer + service for daily backup",
        code: "# /etc/systemd/system/pg-backup.service\n[Unit]\nDescription=Daily PostgreSQL backup\n\n[Service]\nType=oneshot\nUser=postgres\nExecStart=/usr/local/bin/pg-backup.sh\n\n# /etc/systemd/system/pg-backup.timer\n[Unit]\nDescription=Run pg-backup daily at 03:00\n\n[Timer]\nOnCalendar=*-*-* 03:00:00\nRandomizedDelaySec=10min\nPersistent=true\n\n[Install]\nWantedBy=timers.target\n\n# Enable:\n# sudo systemctl enable --now pg-backup.timer\n# Verify:\n# systemctl list-timers pg-backup.timer\n# journalctl -u pg-backup.service",
      },
    },
    {
      id: "advanced",
      icon: Shield,
      title: "Advanced: sandboxing, resource limits, secrets",
      subtitle: "Turns systemd into a lightweight Docker substitute in many cases",
      description:
        "One of systemd's modern features is the ability to isolate services without Docker — through kernel mechanisms (namespaces, cgroups, capabilities). If your project doesn't strictly need containerization (you don't need to build an image to share with others), systemd can give you 80% of Docker's isolation in a few lines.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      content: [
        "MemoryMax / MemoryHigh — memory ceiling. If the service exceeds it, the OOM-killer kills it (and systemd restarts it)",
        "CPUQuota — max CPU percentage. `CPUQuota=50%` = at most half a core",
        "TasksMax — max threads/processes. Prevents fork bombs",
        "ProtectSystem=strict — the filesystem becomes read-only. Only directories you specify in `ReadWritePaths` are writable",
        "ProtectHome=true — blocks access to `/home`. A service that doesn't need it — never touches it",
        "PrivateTmp=true — separate `/tmp` per service. Isolation between services that write there",
        "NoNewPrivileges=true — blocks privilege escalation. Even if there's a vulnerability — can't become root",
        "DynamicUser=true — systemd creates a temporary user during execution and deletes it after. No need to create a user manually",
        "LoadCredential — secrets from a file or socket without 'sitting' in the environment all the time",
        "systemd-analyze security <service> — gives a security score (0-10) and suggests improvements. A must-use tool",
      ],
      tips: [
        "Run `systemd-analyze security kami-agent` on every service — you get an automatic improvement list. I improved all my agents from a score of 4 down to 1.5 (lower = safer)",
        "For secrets (API keys), use `LoadCredential` instead of `Environment`. They won't appear in `systemctl show` or in `/proc/<pid>/environ`",
      ],
      codeExample: {
        label: "Hardened service with full sandboxing",
        code: "[Service]\n# Filesystem isolation\nProtectSystem=strict\nProtectHome=true\nPrivateTmp=true\nReadWritePaths=/var/lib/kami /var/log/kami\n\n# Process isolation\nNoNewPrivileges=true\nProtectKernelTunables=true\nProtectKernelModules=true\nProtectControlGroups=true\nRestrictAddressFamilies=AF_INET AF_INET6 AF_UNIX\nRestrictNamespaces=true\nLockPersonality=true\nMemoryDenyWriteExecute=true\nRestrictRealtime=true\n\n# Resource limits\nMemoryMax=512M\nCPUQuota=50%\nTasksMax=100\n\n# Secrets\nLoadCredential=anthropic-key:/etc/kami/secrets/anthropic.key\n# In code: $CREDENTIALS_DIRECTORY/anthropic-key",
      },
    },
  ],
  resources: [
    {
      title: "systemd Documentation",
      description: "The official docs — comprehensive, if a bit intimidating at first",
      href: "https://www.freedesktop.org/wiki/Software/systemd/",
      icon: BookOpen,
    },
    {
      title: "DigitalOcean systemd Tutorials",
      description: "The easiest tutorials to understand. Start here",
      href: "https://www.digitalocean.com/community/tutorials/systemd-essentials-working-with-services-units-and-the-journal",
      icon: BookOpen,
    },
    {
      title: "ArchWiki systemd",
      description: "The most comprehensive guide. If you want to go deep",
      href: "https://wiki.archlinux.org/title/Systemd",
      icon: ExternalLink,
    },
    {
      title: "systemd by Example",
      description: "Real unit examples for every situation",
      href: "https://systemd-by-example.com/",
      icon: ExternalLink,
    },
    {
      title: "The Docker guide",
      description: "The popular alternative — when to pick which",
      href: "/en/guide/docker",
      icon: BookOpen,
    },
    {
      title: "The Cloudflare Tunnel guide",
      description: "Run cloudflared as a systemd service",
      href: "/en/guide/cloudflare-tunnel",
      icon: BookOpen,
    },
  ],
  ctaTitle: "Need help turning a script into a service?",
  ctaSub:
    "I have 13 agents running as systemd services with 99.9% uptime. I can move your scripts to production-grade services.",
  primaryCta: {
    label: "systemd Quick Reference",
    href: "https://www.shellhacks.com/systemd-systemctl-managing-services-and-units-cheat-sheet/",
    icon: BookOpen,
  },
  secondaryCta: {
    label: "Book a systemd setup",
    href: "https://wa.me/972525427474",
    icon: Mail,
  },
  authorBio:
    "On my Hetzner VPS, systemd manages 13 different services, from Python agents to Node webhooks to Go workers. Average uptime: 99.9%. Each service is isolated with resource limits and sandboxing, and when something falls over — it comes back on its own within 5 seconds. This guide is everything I've collected over a thousand hours of running production Linux.",
};
