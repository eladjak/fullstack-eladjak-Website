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
  agentNameHe: "Hermes / Gardax — the network's worker agent",
  category: "agent",
  logoImage: "/images/guide-logos/hermes-logo.png",
  tagline: "Gardax — the network's worker agent: research, scraping, media & data-science",
  heroDescription:
    "In my network today, Hermes is Gardax — the comic-cast character alongside Kami, Kaylee, Box and Solis, and the network's studio/worker agent: an autonomous expert worker that takes jobs from [Claude Code](/en/claude-code) (the orchestrator) and returns structured output. Its responsibilities: research, scraping data off the web (scrape), generating visual assets and media (media generation), data-science analysis, running cron, and delegating coding tasks to coding agents like codex/opencode. It runs on free Gemini and chats on Telegram in text and voice via the bot @elad_hermes_bot. Mind the division of labor: writing content and posts now belongs to [Ranch](/en/guide/ranch) (the content agent); Hermes supplies him the media and illustrations, but Ranch writes the copy. The name 'Hermes' stays because the agent grew out of a self-healing (autoheal) infrastructure pattern — but today the network's live self-healing lives mostly in the [autonomy stack](/en/guide/autonomy) (remediation.py + fix proposals from [Aurora/Oracle](/en/guide/orchestration)), and Hermes itself is first and foremost the worker agent. For you it's a general pattern for any agent network: a headless component that does the 'heavy lifting' (research, scraping, media, data) and returns clean output to the orchestrator — without burdening the human interface.",
  badgeText: "2026 · Autonomous Worker Agent · Practical Guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/hermes",
  heroBgImage: "/images/guides/guide-hermes-hero.jpg",
  videoUrl: "/videos/guides/hermes.mp4",
  stats: [
    { label: "Role", value: "Worker agent" },
    { label: "Model", value: "Free Gemini" },
    { label: "Channel", value: "Telegram" },
    { label: "Core domains", value: "Research/Media/Data" },
  ],
  paradigmTitle: "Heavy lifting shouldn't go through the human interface",
  paradigmSub:
    "Research, scraping, media and data analysis are 'heavy lifting'. Hermes is the worker agent that takes them from the orchestrator and returns structured output — without burdening Kami.",
  paradigmShifts: [
    {
      before: "The orchestrator tries to both plan and do research/scraping/media itself",
      after: "Hermes is a dedicated worker agent that takes the job and returns structured output",
      icon: RefreshCw,
    },
    {
      before: "Media and illustrations mixed with copywriting in the same agent",
      after: "Hermes supplies media/illustrations; [Ranch](/en/guide/ranch) writes the copy — a clean division of labor",
      icon: Lightbulb,
    },
    {
      before: "Every AI call costs money — even a routine work task",
      after: "Hermes runs on free Gemini, so the heavy lifting costs almost nothing",
      icon: Shield,
    },
    {
      before: "A worker agent that returns 'done' without proof",
      after: "Structured output (JSON) that's traceable, repeatable, and verifiable",
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
      title: "What is Hermes? The network's worker agent",
      subtitle: "A headless component that takes a work task from the orchestrator, executes, and returns structured output",
      description:
        "Hermes is the network's worker agent — the interface-less component that does the 'heavy lifting' on behalf of the orchestrator. It doesn't talk to Elad directly like [Kami](/en/guide/kami); it takes a structured task from [Claude Code](/en/claude-code) and returns clean output. Its responsibilities: research, scraping data (scrape), generating media and visual assets (creative_visual), data analysis (data_analysis), running cron, and delegating coding tasks to other coding agents (codex_exec). It runs on free Gemini and chats on Telegram in text and voice via @elad_hermes_bot. A historical note: the name 'Hermes' grew from a self-healing (autoheal) infrastructure pattern, and the guide below still details that pattern's five stages because it remains an important foundational idea — but today the network's live self-healing lives in the [autonomy stack](/en/guide/autonomy) (remediation.py + Aurora's fix proposals), not in Hermes. Hermes itself is first and foremost the worker agent.",
      color: "from-cyan-600 to-blue-500",
      difficulty: "beginner",
      beginner:
        "Think of an office with a manager and a particularly capable 'do-it-all' person. The manager (the orchestrator) doesn't personally run off to dig up information, crunch data, or make graphics — they hand it to the do-it-all, who goes out, does the work, and comes back with a tidy result. Hermes is exactly that do-it-all in the network: need research on a topic? Scraping a site? An illustration or image? Analysis of a data table? The orchestrator sends the task to Hermes, and Hermes returns a finished product. It works in the background, doesn't talk to Elad directly, and runs on a free model — so the heavy lifting costs almost nothing.",
      content: [
        "Research — gathering and summarizing information on a topic on behalf of the orchestrator; returns a structured summary, not a 'raw search'",
        "Scraping (scrape) — pulling information from web sources (pages, listings, public data) and returning it tidy",
        "Media & assets (creative_visual) — generating illustrations, images and visual assets (via Gemini/nano-banana). Important: Hermes supplies the media; the copy that accompanies it is written by [Ranch](/en/guide/ranch)",
        "Data analysis (data_analysis) — processing and analyzing data, computations, and insights written to the [knowledge hub](/en/guide/orchestration) or the inbox",
        "cron + codex_exec — running scheduled tasks, and delegating coding tasks to other coding agents (codex/opencode) when a programmer's 'hands' are needed",
        "Channel: Telegram @elad_hermes_bot (text+voice via Gemini TTS) + the model gateway; runs on free Gemini",
      ],
      tips: [
        "A good worker agent is deliberately interface-less: it doesn't argue with the user, it takes a structured task and returns structured output. That separation between 'who talks to the human' (Kami) and 'who does the work' (Hermes) is what keeps the network clean",
        "The division of labor with [Ranch](/en/guide/ranch) is critical: Hermes = media/research/data, Ranch = content writing and posts. Don't let the worker agent write copy — that's a separate role",
      ],
    },
    {
      id: "pattern",
      icon: Zap,
      title: "The self-healing pattern in detail — the 5 stages Hermes grew from",
      subtitle: "Background: each stage is simple and testable on its own; together they form a self-healing loop",
      description:
        "The following sections describe the self-healing pattern the name 'Hermes' grew from — it stays in the guide because it's an important foundational idea for any autonomous system. Note: in my network today the live self-healing lives not in Hermes but in the [autonomy stack](/en/guide/autonomy) (remediation.py + Aurora/Oracle's fix proposals); read that guide for the current implementation. The beauty of the pattern is that each stage is a short, independently testable function — which is why you can start with a minimal version and grow it incrementally. This is the canonical SRE approach at Google: a self-healing system is built from small, safe steps, not as one giant monolith.",
      color: "from-violet-600 to-purple-500",
      difficulty: "intermediate",
      beginner:
        "The whole idea is a simple five-step loop, exactly like a doctor: check whether something's wrong (detection), figure out what the problem is (diagnosis), give a treatment (repair), verify the patient is actually healthy (verification), and remember what worked so next time is faster (learning). The beauty is that each step is a small piece you can test on its own, so you can start with a humble hour-of-work version and grow gradually. For me (Elad) this is what a system that fixes itself looks like — without me having to get up in the middle of the night.",
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
      beginner:
        "This may be the most important part, and most people underrate it. The classic mistake: 'I restarted the service, the command ran, so it must be fine.' Not necessarily. Verification is the difference between 'the command ran' and 'the patient is actually healthy'. Like a doctor who doesn't settle for prescribing medicine but comes back to check the fever really dropped. For me (Elad) I invest more code in verification than in the fix itself — because that's exactly what decides whether I sleep soundly or discover in the morning that the site returned errors all night while 'everything looked green'.",
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
      beginner:
        "Without memory, Hermes is a technician who shows up from scratch each time and doesn't remember solving the exact same issue last week. With memory, it becomes a veteran technician who says 'ah, I know this one — try this first'. Every successful fix is stored, and the next time a similar symptom appears, a quick 'by meaning' search finds the solution that worked before and tries it first. The result for me (Elad): after half a year, the share of fixes that succeed on the first try jumped from 60% to 85% — without changing a line of code, just because the system remembers.",
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
        "Escalation is a last resort — the moment Hermes throws its hands up and says 'I can't do this, please help.' The whole point of Hermes is to cut alerts down to 10% of cases — reserved only for the new and interesting. If Hermes sends too many alerts, that's a sign the whitelist or memory isn't good enough, not a sign that 'the tool is noisy.' PagerDuty's starter plan runs $21/user/month (modern alternatives like BetterStack, Grafana OnCall or Squadcast come in cheaper still); Hermes costs $0 and saves your sleep on top.",
      color: "from-rose-600 to-pink-500",
      difficulty: "intermediate",
      beginner:
        "Escalation is the moment Hermes throws up its hands and says 'I can't manage on my own, please help.' And that's the whole beauty: the entire goal is for that moment to happen as rarely as possible. Picture a good night guard — he doesn't call you about every noise, only when something truly happened that he can't handle. If Hermes wakes you a lot, it's not 'the tool being noisy' — it's a sign you need to teach it to handle more cases on its own. For me (Elad) it wakes me once or twice a week, always about something I've genuinely never seen before. And it replaces an alerting service that costs tens of dollars a month — for free.",
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
        "Important note: the Hermes pattern (detect→diagnose→fix→verify→learn) lives inside the agents and services themselves — cron jobs, webhook handlers, or in-code modules — not one central service. That's an advantage: effective self-healing is distributed across every component. 2026 update: beyond the self-healing pattern it grew from, today in my network Hermes is also the network's studio/worker agent — the headless component that generates assets, analyzes data, and runs code on behalf of the orchestrator. Both sides coexist: the pattern that keeps the server alive, and the agent that produces work on top of it.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      beginner:
        "An important point to grasp: Hermes isn't 'one piece of software' you install, but an approach — a way of thinking you can plant inside every agent and service you already have. Like a healthy habit you can teach every team member, not a separate department. For me (Elad) the same self-healing approach lives inside [Kaylee](/en/guide/kaylee) and inside the [Delegator](/en/guide/delegator), without changing their architecture. This section is more technical, but the idea is simple: any component that can check itself, fix itself, and learn from its mistakes — is a component you can rely on.",
      content: [
        "Hermes as a studio agent (my network, 2026): a headless component that takes jobs from [Claude Code](/en/claude-code) (the orchestrator) and returns structured output — visual asset generation, data-science analysis, and delegating coding tasks to other coding agents. Runs on free Gemini, and chats on Telegram in text and voice (Gemini TTS).",
        "Division of labor across the network: [Kami](/en/guide/kami) = human interface (WhatsApp), Claude Code = dev orchestration, Hermes = studio/worker, [Kaylee](/en/guide/kaylee) = reliability/infra + distribution. Each knows the others and delegates to the right one — the network's 'harmony map'.",
        "In my setup, the Hermes pattern is implemented inside [Kaylee](/en/guide/kaylee) (a self-heal cron that runs on her OpenClaw engine) and inside the [Delegator](/en/guide/delegator) (an auto-heal executor that detects failures in any endpoint)",
        "You can add this pattern to any agent in the network — [Kami](/en/guide/kami), [Box](/en/guide/box), [Adopter](/en/guide/adopter), [CrewAI](/en/guide/crewai) — with no architectural changes",
        "Health endpoints: a baseline requirement. Every service must expose a /health endpoint that returns JSON with {status, version, uptime}. Without it — there is no real verification",
        "Centralized logs: `journalctl` on Linux, `docker logs` on [Docker](/en/guide/docker) — these are Hermes's basic diagnostic tools. If you have Loki or Datadog — even better",
        "Integration with PagerDuty/BetterStack/Grafana OnCall (or Jira Service Management Incident Management, which is the rebranded Opsgenie after Atlassian absorbed it): not mandatory (Hermes replaces them in 90% of cases), but you can wire them into the escalation path as an extra fallback",
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
      title: "The Autonomy Stack guide",
      description: "Where the network's live self-healing lives today — remediation + Oracle",
      href: "/en/guide/autonomy",
      icon: BookOpen,
    },
    {
      title: "The Orchestration guide",
      description: "The division of labor: who orchestrates, who works, who writes content",
      href: "/en/guide/orchestration",
      icon: BookOpen,
    },
    {
      title: "The Qdrant guide",
      description: "The store behind healing_history — the self-healing pattern's memory",
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
