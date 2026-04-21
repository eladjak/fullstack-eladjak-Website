import {
  Activity,
  RefreshCw,
  Shield,
  Zap,
  Gauge,
  AlertTriangle,
  Github,
  ExternalLink,
  BookOpen,
  Code2,
  Rocket,
  Lightbulb,
  Cpu,
  HeartPulse,
  Wrench,
  Users,
  Mail,
  Eye,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const hermesGuideEn: AgentGuideData = {
  slug: "hermes",
  agentName: "Hermes",
  agentNameHe: "Hermes — Self-Healing Services",
  logoImage: "/images/guide-logos/hermes-logo.png",
  tagline: "Self-healing — failures shouldn't wake you up",
  heroDescription:
    "Hermes is a self-healing infrastructure CLI written in Go (v0.8.0 in my stack). The philosophy: a whitelist of permitted actions + verification-after-fix + learning from recurring failures. A five-stage architecture: detect → diagnose → fix → verify → learn. It runs as a cron job or a webhook responder and persists history to SQLite/JSON. In my setup it performs autoheal for [Kami](/en/guide/kami) and for OpenClaw (the engine behind [Kaylee](/en/guide/kaylee)) — but for you, it's a pattern you can adopt with any CLI (or even bash scripts): the five stages fit any production system, not just AI agents.",
  badgeText: "2026 · Self-Healing Infrastructure · Practical Guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/hermes",
  heroBgImage: "/images/guides/guide-hermes-hero.jpg",
  stats: [
    { label: "Avg. time to fix", value: "<90s" },
    { label: "Attempts before escalation", value: "3" },
    { label: "Repair action types", value: "12+" },
    { label: "Success rate", value: "~85%" },
  ],
  paradigmTitle: "Failures shouldn't wake you up",
  paradigmSub:
    "90% of failures are the same 10 problems on repeat. Hermes solves them on its own, and wakes you only for something genuinely new.",
  paradigmShifts: [
    {
      before: "PagerDuty at 3 AM because a Docker container crashed",
      after: "Hermes tried a restart, it worked, sent a morning email 'handled and resolved'",
      icon: RefreshCw,
    },
    {
      before: "Running the same fix script for the fifth time this week",
      after: "Hermes remembers 'what worked for what' and applies it automatically",
      icon: Lightbulb,
    },
    {
      before: "PagerDuty, Opsgenie, VictorOps — $100+/month",
      after: "Hermes is open, transparent, repair rules stored as JSON",
      icon: Shield,
    },
    {
      before: "Monitoring without action = noise",
      after: "Monitoring + action pipeline = a real solution",
      icon: Activity,
    },
  ],
  whoIsThisFor: [
    {
      title: "Small SRE teams",
      description:
        "Senior engineer drowning in on-call rotations? A self-healing pattern meaningfully cuts the load within a week.",
      icon: Rocket,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Solo operators with a critical server",
      description:
        "One or two servers, lots of services. Hermes looks after them even while you're on vacation.",
      icon: Shield,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Builders of multi-tenant products",
      description:
        "Customers shouldn't have to know about your failures. Hermes makes sure they don't.",
      icon: Users,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Agent developers",
      description:
        "A foundational pattern for any agent that acts in the real world — it needs fallback and verification.",
      icon: Code2,
      color: "from-pink-500 to-rose-500",
    },
  ],
  toc: [
    { id: "what-is", label: "What it is" },
    { id: "pattern", label: "Pattern" },
    { id: "whitelist", label: "Whitelist" },
    { id: "verification", label: "Verification" },
    { id: "memory", label: "Memory" },
    { id: "escalation", label: "Escalation" },
    { id: "advanced", label: "Advanced" },
  ],
  sections: [
    {
      id: "what-is",
      icon: HeartPulse,
      title: "What is Hermes? A doctor living in your server's ER",
      subtitle: "A Go CLI that detects an incident, diagnoses, fixes, verifies, and learns — without waking you",
      description:
        "Hermes is a self-healing infrastructure CLI — a tool written in Go that runs on the server like a teammate who never sleeps. The idea is simple but powerful: 90% of production failures are the same 10 recurring problems (a container that fell over, a stuck network connection, a disk that filled up). Hermes recognizes that pattern and, instead of waking you every time, triggers a five-stage sequence: detect, diagnose, fix, verify, and learn (for the next time). In my own setup it performs autoheal for [Kami](/en/guide/kami) and for OpenClaw (the engine behind [Kaylee](/en/guide/kaylee)), but it's a pattern you can adopt on any stack — not just AI agents, but any production service. The real savings are in your sleep and in the PagerDuty bill you never have to pay again.",
      color: "from-cyan-600 to-blue-500",
      difficulty: "beginner",
      beginner:
        "Think of it like this: instead of paying $100/month for PagerDuty so your on-call can wake up at 3 AM and `docker restart` the thing that crashes every Tuesday night — Hermes is a caretaker that fixes itself. It sits on the server, checks every 5 minutes that everything is alive, and when something breaks it does the obvious first thing (e.g. restart), verifies it really worked, and jots down a note to itself: 'that worked — next time this happens, I know what to do.' Only after three failed attempts does it alert you — and then you know it's truly something new and interesting, not another boring repeat of a known issue.",
      content: [
        "Detect — continuous monitoring of services (a [cron](/en/guide/dashboard) job every 5 minutes that runs a healthcheck against everything important: docker ps, journalctl, a /health request against each endpoint — the equivalent of Google SRE, on a small scale)",
        "Diagnose — identify the root cause, not just the symptom. Hermes grabs the last 100 log lines, sends them to an LLM ([Claude](/en/claude-code) or Gemini) with a 'what went wrong here?' prompt — and gets a clear diagnosis back",
        "Fix — runs an action from the whitelist (restart, recreate, pull+up, cache clear). This is critical: Hermes cannot run arbitrary commands — only actions that were pre-marked as safe and idempotent",
        "Verify — it's not enough that the command ran; you have to prove the service is genuinely back. Hermes waits 30 seconds, sends a health request, checks the response is well-formed, and confirms no new errors in the log",
        "Learn — every successful fix is stored as an embedding in [Qdrant](/en/guide/qdrant) (a collection called healing_history). Next time a similar failure occurs — Hermes already knows what worked",
        "Escalate — only after 3 failed attempts, or if 2+ services fail in parallel (a cascade) — a human alert is sent with an attached runbook: 'I tried X, Y, Z, here's what the log says'",
      ],
      tips: [
        "Don't start with a complex external CLI — Hermes's earliest version was 80 lines of Python running under [cron](/en/guide/dashboard). Only after the pattern proved itself did I move it to Go",
        "This pattern pairs beautifully with [Docker](/en/guide/docker) + [Qdrant](/en/guide/qdrant) + the [Delegator](/en/guide/delegator) — see the advanced section below",
      ],
    },
    {
      id: "pattern",
      icon: Zap,
      title: "The Pattern in detail — how to wire up the 5 stages",
      subtitle: "Each stage is simple and testable on its own; together they form a self-healing loop",
      description:
        "The beauty of the Hermes pattern is that each stage is a short, independently testable function — which is exactly why you can start with a minimal version (an hour's work) and grow it incrementally. This is the canonical SRE approach at Google: a self-healing system is built from small, safe steps, not as one giant monolith.",
      color: "from-violet-600 to-purple-500",
      difficulty: "intermediate",
      content: [
        "Stage 1 — Detection: a [cron](/en/guide/dashboard) job runs every 5 minutes, iterates the service list, and runs a simple healthcheck (docker inspect, curl /health, systemctl is-active). If something is not green — jump to the next stage",
        "Stage 2 — Diagnosis: take tail -100 of the relevant log and send it to [Claude](/en/claude-code) or Gemini with a short prompt: 'this is the log of a service that crashed. What's the root cause? What would you recommend fixing?' — the answer comes back classified (OOM, port conflict, network, config) so the next stage knows which action to pick",
        "Stage 3 — Repair: based on the diagnosis category, pick an action from the whitelist. OOM → restart. Port conflict → recreate. Important: only one action per iteration (don't change everything at once — if it works, you want to know what worked)",
        "Stage 4 — Verification: wait 30 seconds (startup), then check three things: (a) the health endpoint returns 200 + valid JSON, (b) response time is reasonable, (c) no new ERROR in the last minute of logs. Only if all three pass is it counted as 'the fix worked'",
        "Stage 5 — Learn: write a record to the [Qdrant](/en/guide/qdrant) collection named healing_history — the symptom as an embedding + the action that worked + timestamp. Next time a similar symptom appears — a semantic search finds it and tries the winning action first (saving 2 wasted attempts)",
        "Stage 6 — Escalate (only if all 3 attempts fail): send an alert via the [Delegator](/en/guide/delegator) — email for non-urgent, SMS for critical, and via [Kami](/en/guide/kami) on WhatsApp for immediate. The alert carries a full runbook of what was attempted",
      ],
      codeExample: {
        label: "Main loop",
        code: "for service in SERVICES:\n  status = check_health(service)\n  if status.healthy: continue\n  \n  diagnosis = diagnose_with_llm(service, status.logs)\n  for action in WHITELIST[diagnosis.category]:\n    apply(action)\n    if check_health(service).healthy:\n      record(service, diagnosis, action, success=True)\n      break\n  else:\n    alert_human(service, diagnosis)",
      },
    },
    {
      id: "whitelist",
      icon: Shield,
      title: "Whitelist — what Hermes is allowed to do (and, crucially, what it isn't)",
      subtitle: "The whitelist is the safety harness of any self-healing system",
      description:
        "The moment you give an automated script permission to run commands against production — you must define exactly what's allowed and what isn't. Hermes's whitelist is a small JSON file containing the list of permitted actions — without it, Hermes will do nothing. That's the difference between a system that lets you sleep soundly and one that accidentally wipes out your VPS.",
      color: "from-amber-600 to-orange-500",
      difficulty: "advanced",
      beginner:
        "Imagine leaving house keys with a friend who's coming to feed the cat. You don't hand them your will, your safe, and access to your bank account — just the key to the door and the food cabinet. The whitelist is that same idea: a narrow list of 'these are the safe actions you're allowed to attempt.' 'docker restart' — yes (worst case, the service comes back up). 'rm -rf /' — never. Rule of thumb: every whitelist action must be idempotent — meaning, running it twice causes no more harm than running it once.",
      content: [
        "CONTAINER_RESTART — `docker restart <name>`: the safest action, idempotent, the most useful (handles roughly 80% of [Docker](/en/guide/docker) failures)",
        "CONTAINER_RECREATE — `docker compose up -d --force-recreate <name>`: fully resets state, good for stuck connections or memory leaks",
        "SYSTEMD_RESTART — `systemctl restart <service>`: for services that don't run in a container (nginx, local postgres, [Ollama](/en/guide/ollama))",
        "IMAGE_PULL — `docker pull + recreate`: pulls a new version. Caution: this is a version change, not just a restart — don't include in auto-heal without prior approval",
        "CACHE_CLEAR — deletes known tmp/cache directories (e.g. when disk fills and a service stalls). Closed list of paths — no wildcards",
        "CONNECTION_RESET — restarts the networking stack; used only when an external healthcheck (from the [Dashboard](/en/guide/dashboard)) fails, not an internal one",
        "Forbidden (outside the whitelist): rm, dd, mkfs, chown/chmod on /etc, apt/yum install, kernel operations, firewall changes. If Hermes thinks any of these are needed — it escalates to a human",
      ],
      tips: [
        "Start with a whitelist of just 3 actions (restart, recreate, cache_clear). Only after a month of stable operation — expand. In my case I started with a whitelist that was too aggressive and had to dial it back after Hermes 'fixed' things that weren't actually broken",
        "Every whitelist action must be idempotent. If you're unsure what that means, ask yourself: 'if Hermes runs this 5 times back-to-back, will any harm be done?' If yes — don't put it in the whitelist",
      ],
    },
    {
      id: "verification",
      icon: Eye,
      title: "Verification — the key to real reliability",
      subtitle: "A fix worked only if you can prove it worked — 'the command ran' is not enough",
      description:
        "The most common mistake junior SRE teams make: 'I ran a restart, it returned 0, it's probably fine.' It isn't. Verification is the ability to prove that after the fix the service is genuinely alive, genuinely responsive, and genuinely doing what it's supposed to do. That's the difference between a Hermes that works and a script that runs at night and lulls you into feeling everything's fine — until morning reveals that the API was returning 500 all night long.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "intermediate",
      content: [
        "The health endpoint must return 200 + JSON in the expected shape (not just status=ok — also required fields like version, uptime)",
        "Response time under a reasonable threshold (a service answering in 5 seconds instead of 200ms is 'unhealthy' even if it came back)",
        "A log tail within 30 seconds of the fix contains no new ERRORs (if it comes back with the same error — the fix didn't succeed)",
        "If it's an API — a request/response sanity check with a synthetic payload (POST to a test endpoint, confirming the roundtrip works)",
        "If it's a DB — a simple SELECT 1 for reads, plus a small write+rollback transaction to confirm writes also work",
        "Wait time: 30 seconds after the fix before starting to check (startup period) — otherwise you'll catch the service mid-boot and mistakenly conclude it's broken",
      ],
      tips: [
        "Internalize this: 'verification is half the value.' Many teams spend 90% on detect+fix and 10% on verify. In my stack the ratio is inverted: verify is more code than fix, because it's what decides whether you get woken up at night or not",
        "For agents (like [Kami](/en/guide/kami) and [Kaylee](/en/guide/kaylee)) — verify must include a real capability check: not just 'the container is alive,' but 'I sent a test message through the webhook and got a valid reply back'",
      ],
      codeExample: {
        label: "Basic verify",
        code: "def verify(service):\n    sleep(30)  # allow warmup\n    r = requests.get(f'http://{service}/health', timeout=5)\n    if r.status_code != 200: return False\n    if 'ok' not in r.json(): return False\n    logs = docker_logs(service, since='1min ago')\n    if any('ERROR' in l for l in logs): return False\n    return True",
      },
    },
    {
      id: "memory",
      icon: Cpu,
      title: "Memory — the memory that makes Hermes smarter every week",
      subtitle: "A Qdrant collection that remembers what worked for what — semantic search over historical fixes",
      description:
        "Without memory, Hermes is a collection of scripts running in a loop. With memory — it becomes something that learns from your network. Every successful fix is stored as an embedding in [Qdrant](/en/guide/qdrant), and the next time a similar failure appears, a 40ms semantic search surfaces the action that worked before. That's the difference between a static system and one that gets smarter with every incident.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "advanced",
      content: [
        "A collection named healing_history in [Qdrant](/en/guide/qdrant) (cosine distance, 768 dimensions using gemini-embedding-001)",
        "Record fields: {ts, service, symptom_embedding, action_taken, success, duration_ms}",
        "The symptom embedding is composed of two parts: a short description of the issue (from the LLM's diagnosis) + a tail of 20 lines from the log",
        "Before every repair action: Hermes runs a semantic search against the collection — 'find the 3 most similar past failures'",
        "If a match is found with score > 0.8 and success=true — try that fix first (saving 2 failed attempts)",
        "Automatic weekly report sent to the [Dashboard](/en/guide/dashboard): 'Top 5 problem-action pairs' — exposes recurring patterns and invites you to fix the underlying root cause",
      ],
      tips: [
        "As memory grows, more failures get fixed on the first attempt — in my setup, after 6 months, the success rate rose from ~60% to ~85% with no code changes, purely thanks to memory",
        "The weekly report is the most valuable asset — if failure X appears 12 times a week, it's a sign you haven't really fixed it; treat healing_history like a bug backlog",
      ],
    },
    {
      id: "escalation",
      icon: AlertTriangle,
      title: "Escalation — when it's right to wake you (and as little as possible)",
      subtitle: "The gold of self-healing: alert only when it's truly worth your sleep",
      description:
        "Escalation is a last resort — the moment Hermes throws its hands up and says 'I can't do this, please help.' The whole point of Hermes is to cut alerts down to 10% of cases — reserved only for the new and interesting. If Hermes sends too many alerts, that's a sign the whitelist or memory isn't good enough, not a sign that 'the tool is noisy.' PagerDuty costs $29/user/month; Hermes costs $0 and saves your sleep on top.",
      color: "from-rose-600 to-pink-500",
      difficulty: "intermediate",
      content: [
        "3 failed attempts — every whitelist action was tried, nothing brought the service back (this is the most common escalation trigger)",
        "Service DOWN > 10 minutes — even if 3 attempts haven't been exhausted; 10 minutes of downtime is already worth a human's eyes",
        "Data loss risk — a situation that could cause data loss (critical disk full, DB corruption, unreachable [Qdrant](/en/guide/qdrant) documents) — Hermes does not touch, only alerts",
        "Cascade — if 2+ services fail at the same time, that's a sign of an environmental issue (network, hardware, power) — Hermes won't try to fix one and worsen the overall state; it alerts immediately",
        "Tiered alert channels: email for non-urgent (daily digest), SMS for critical (essential service down), WhatsApp via [Kami](/en/guide/kami) for immediate (cascade or data loss). This replaces PagerDuty at $0",
        "A runbook is attached automatically to every alert — 'I tried: restart (failed because X), recreate (failed because Y), cache clear (not relevant). The log says Z. Similar past fixes: [list from healing_history]'",
      ],
      tips: [
        "My rule: if Hermes wakes me up at night, it's something I've never seen before. I'd rather have a service down for 20 minutes and investigate calmly than be buried under 60 identical alerts about the same restart",
        "After 'uptime,' the most important metric is 'escalation rate per week' — in my setup it's 1-2 a week. If yours is 20, the whitelist needs thickening",
      ],
    },
    {
      id: "advanced",
      icon: Wrench,
      title: "Integrating with your stack — Hermes is a Pattern, not a service",
      subtitle: "How to embed the approach inside your existing agents and services",
      description:
        "Important note: there is no standalone container called 'hermes' running on its own (that was an earlier configuration that turned out to be cosmetic only). The Hermes pattern lives inside the agents and services themselves — as cron jobs, webhook handlers, or in-code modules. That's actually an advantage: an effective self-healing system doesn't have to be a central service — it can be distributed across every component.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      content: [
        "In my setup, the Hermes pattern is implemented inside [Kaylee](/en/guide/kaylee) (a self-heal cron that runs on her OpenClaw engine) and inside the [Delegator](/en/guide/delegator) (an auto-heal executor that detects failures in any endpoint)",
        "You can add this pattern to any agent in the network — [Kami](/en/guide/kami), [Box](/en/guide/box), [Adopter](/en/guide/adopter), [CrewAI](/en/guide/crewai) — with no architectural changes",
        "Health endpoints: a baseline requirement. Every service must expose a /health endpoint that returns JSON with {status, version, uptime}. Without it — there is no real verification",
        "Centralized logs: `journalctl` on Linux, `docker logs` on [Docker](/en/guide/docker) — these are Hermes's basic diagnostic tools. If you have Loki or Datadog — even better",
        "Integration with PagerDuty/Opsgenie: not mandatory (Hermes replaces them in 90% of cases), but you can wire them into the escalation path as an extra fallback",
        "[Dashboard](/en/guide/dashboard) endpoint: /health/agents displays the real-time status of every service. This is your UI over the entire network — keep it open in a monitor tab all day",
        "Pairing with [n8n](/en/guide/n8n) or [Aider](/en/guide/aider): Hermes can trigger n8n flows as part of a repair (e.g. 'restart + post a message to Slack'), or ask Aider to automatically fix code when a build fails",
      ],
      tips: [
        "Don't implement Hermes from scratch on day one. Start with 3 lines of bash: `docker ps | grep unhealthy && docker restart $name`, add a health check, and then gradually migrate to Go or Python. My first version was 80 lines; the current one exceeds 2,000 — but the value came from the very first version",
        "The pattern also works on completely non-AI stacks — nginx + postgres + redis get exactly the same treatment: detect → diagnose → fix (from a short whitelist) → verify → learn. It's not just for agents",
      ],
    },
  ],
  resources: [
    {
      title: "Elad's network code",
      description: "Hermes is implemented inside Kaylee + the delegator",
      href: "https://github.com/eladjak",
      icon: Github,
    },
    {
      title: "Site Reliability Engineering (Google)",
      description: "The classic book — where these ideas come from",
      href: "https://sre.google/sre-book/table-of-contents",
      icon: ExternalLink,
    },
    {
      title: "Docker Healthcheck docs",
      description: "How to build good healthchecks inside containers",
      href: "https://docs.docker.com/engine/reference/builder/#healthcheck",
      icon: ExternalLink,
    },
    {
      title: "The Kaylee guide",
      description: "The agent that runs Hermes on my VPS",
      href: "/en/guide/kaylee",
      icon: BookOpen,
    },
    {
      title: "The Qdrant guide",
      description: "The store behind healing_history — Hermes's memory",
      href: "/en/guide/qdrant",
      icon: BookOpen,
    },
    {
      title: "SRE consulting call",
      description: "Want Hermes inside your infrastructure?",
      href: "/contact",
      icon: Mail,
    },
  ],
  ctaTitle: "Getting started with Hermes isn't just code",
  ctaSub:
    "It's a mindset shift — from reactive to autonomous. Ready to see how it's built?",
  primaryCta: {
    label: "How Kaylee uses it",
    href: "/en/guide/kaylee",
    icon: BookOpen,
  },
  secondaryCta: {
    label: "Book a consult",
    href: "/contact",
    icon: Users,
  },
  authorBio:
    "Hermes handled 40+ incidents for me in six months — without me even knowing something was wrong. This approach turned the VPS into 'fire and forget.' This guide is based on real failures — I started with a whitelist that was too aggressive and had to rein it back.",
};
