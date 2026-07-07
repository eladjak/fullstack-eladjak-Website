import {
  PackageCheck,
  ShieldCheck,
  BellRing,
  ListChecks,
  FileCheck,
  Layers,
  AlertTriangle,
  ClipboardList,
  Github,
  ExternalLink,
  BookOpen,
  Mail,
  Send,
  Users,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const outputGuardianGuideEn: AgentGuideData = {
  slug: "output-guardian",
  agentName: "Output Guardian",
  agentNameHe: "The Output Guardian — 'ran' is not 'produced'",
  category: "pattern",
  tagline:
    "The watchdog layer that checks every scheduled job actually produced an artifact — not just 'ran successfully'",
  heroDescription:
    "The output guardian is a monitoring pattern (a watchdog — a small piece of software that keeps an eye on other processes) born from an uncomfortable insight: the most dangerous failure in an autonomous system isn't the one that screams — it's the one that stays silent. A scheduled job can run every day, finish without a single error, and look 'green' in every log — while producing absolutely nothing: the backup doesn't actually back up, the report doesn't actually get sent, the file doesn't actually get written. The output guardian closes exactly that hole: at a fixed cadence it walks over every scheduled job in the network and asks one simple question — not 'did the process run?' but 'was a real artifact produced?' — a file that was updated, a record that was written, a message that was sent. If a job 'ran successfully' but the artifact is missing, a direct alert goes to the phone. For me (Elad), the guardian watches over every scheduled job in my [agent network](/en/guide/orchestration) — and it has already proven itself by catching jobs that looked perfectly healthy while producing nothing. For you — it's the same principle for any automation you run: backups, reports, syncs. If you have even one scheduled process you care about, it deserves an output guardian.",
  badgeText: "2026 · Output Watchdog Pattern · Practical Guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/output-guardian",
  heroBgImage: "/images/guides/guide-output-guardian-hero.jpg",
  logoImage: "/images/guide-logos/output-guardian-logo.png",
  stats: [
    { label: "The question", value: "Artifact?" },
    { label: "Levels of truth", value: "3" },
    { label: "Check cadence", value: "Recurring" },
    { label: "Alert", value: "To the phone" },
  ],
  paradigmTitle: "From 'the process ran' to 'an artifact in hand'",
  paradigmSub:
    "Green logs give false confidence. The difference between a system that looks healthy and one that actually works is a single check: was a real artifact produced in the world.",
  paradigmShifts: [
    {
      before: "A job finishes without an error — and everyone assumes all is well",
      after: "The output guardian checks a real artifact was produced: a file, a record, a sent report",
      icon: PackageCheck,
    },
    {
      before: "A silent failure surfaces after weeks — when it's already too late",
      after: "A 'ran-but-produced-nothing' gap is caught on the next check, and an alert goes out immediately",
      icon: BellRing,
    },
    {
      before: "Green logs = false confidence ('everything ran, everything's fine')",
      after: "Three levels of truth: ran → succeeded → produced. Only the third one counts",
      icon: ShieldCheck,
    },
    {
      before: "Every job needs its own manual monitoring — and nobody actually checks",
      after: "One definition per job: which artifact, where, and within what time window",
      icon: ListChecks,
    },
  ],
  whoIsThisFor: [
    {
      title: "Agent-network builders",
      description:
        "Have an [autonomy stack](/en/guide/autonomy) running jobs on its own? This is the safety layer that confirms they actually produce something.",
      icon: Layers,
      color: "from-indigo-500 to-violet-500",
    },
    {
      title: "Anyone running backups and reports",
      description:
        "A backup that 'ran' for half a year without backing anything up is the classic nightmare. An output guardian catches it on the first check, not after the disaster.",
      icon: FileCheck,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Product teams with automation in production",
      description:
        "Every scheduled pipeline (sync, ETL, email sends) needs an artifact check — not just a 'the process is alive' check.",
      icon: ClipboardList,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Anyone burned by a silent failure",
      description:
        "If you've ever discovered too late that something 'worked' for weeks without working — this pattern was built precisely for you.",
      icon: AlertTriangle,
      color: "from-rose-500 to-red-500",
    },
  ],
  toc: [
    { id: "what-is", label: "What it is" },
    { id: "three-truths", label: "Three levels of truth" },
    { id: "check-types", label: "Check types" },
    { id: "alerts", label: "Alerts" },
    { id: "examples", label: "Examples" },
    { id: "advanced", label: "Advanced" },
  ],
  sections: [
    {
      id: "what-is",
      icon: PackageCheck,
      title: "What is an output guardian?",
      subtitle: "The watchdog that checks the shelves, not the oven",
      description:
        "The output guardian is a small monitoring process that runs at a fixed cadence and walks over every scheduled job in the system. For each job, what it's supposed to produce is defined up front, along with a time window — an updated backup file, a daily report that was sent, a record written to the database. The guardian checks the artifact itself, not the process. If a job ran 'successfully' but the artifact is missing or stale — that's exactly the silent failure it was built to catch, and an alert goes out. It complements the verify-on-result step of the [autonomy stack](/en/guide/autonomy): verification checks a single task the moment it runs, while the guardian checks the whole picture over time.",
      color: "from-teal-600 to-emerald-500",
      difficulty: "beginner",
      beginner:
        "Imagine a bakery whose oven switches on every morning at 05:00 sharp, runs for two hours, and switches off — all according to plan. Except someone forgot to put dough in it. From the outside everything is perfect: the oven worked, electricity was consumed, no fault light came on. But there is no bread. The output guardian is the worker who doesn't check the oven — he checks the shelves: is there bread or not? That's the whole idea, and it works for any automated process: don't settle for 'the machine ran' — check there's an artifact in hand.",
      content: [
        "A watchdog = a guard process that watches over other processes. The output guardian is a watchdog specializing in one question: was an artifact produced?",
        "Every scheduled job gets an artifact check: what should be created (a file/record/message), where, and within what time window (e.g., 'the backup file must have been updated within the last 24 hours')",
        "The guardian itself runs as a simple scheduled process (a [systemd](/en/guide/systemd) timer) — a couple of definition lines per job, no heavyweight monitoring platform",
        "How it differs from regular uptime monitoring: monitoring asks 'is the service alive?'; the output guardian asks 'did the service produce anything?' — two completely different questions",
        "When a gap is found, the alert goes directly to the owner via [Kami](/en/guide/kami) — a message to the phone, not another log line nobody reads",
      ],
      tips: [
        "Start from the question 'which process would hurt most to discover too late that it failed?' — that's the first job that deserves an output guardian",
        "Don't build this as a big system. A good output guardian is one script + one config file. The simplicity is what guarantees it doesn't itself become another component that breaks silently",
      ],
    },
    {
      id: "three-truths",
      icon: ShieldCheck,
      title: "Three levels of truth — ran, succeeded, produced",
      subtitle: "Each level catches failures the previous one misses",
      description:
        "To understand why an output guardian is essential, you need to distinguish three different levels of truth. Level 1 — 'ran': the process started and finished without crashing (exit code 0). Level 2 — 'succeeded': a verification step confirmed the task achieved its immediate goal (that's the verify-on-result of the [autonomy stack](/en/guide/autonomy)). Level 3 — 'produced': a tangible, fresh, non-empty artifact exists in the world. Most systems stop at level 1. Good systems reach level 2. But only level 3 gives real confidence — because it checks the thing that ultimately matters: the artifact.",
      color: "from-indigo-600 to-violet-500",
      difficulty: "beginner",
      beginner:
        "Think of a courier who's supposed to deliver a package. Level 1: 'I've set off' — nice, but says nothing. Level 2: 'I delivered the package' — better, there's a success claim. Level 3: the package is actually at your door and you can see it. Only at the third level are you truly at ease. The difference sounds subtle, but in practice it's enormous: between 'I set off' and 'I delivered' there are traffic jams, wrong addresses and mistakes — and between 'I delivered' and 'the package is at the door' there's a whole other world of things that can go quietly wrong.",
      content: [
        "Level 1 — 'ran' (exit code 0): the process didn't crash. Catches: crashes, syntax errors, a service that didn't start. Misses: every silent logical failure",
        "Level 2 — 'succeeded' (verify-on-result): a separate step checked evidence that the immediate goal was achieved. Catches: a failed API call, a wrong response. Misses: an artifact created empty, a file deleted afterwards, an artifact in the wrong place",
        "Level 3 — 'produced' (the output guardian): the artifact exists, is fresh, and isn't empty — checked separately from the process that created it. Catches: everything that's left",
        "The principle: each level checks a different layer, so combining all three is dramatically stronger than any one alone — like a seatbelt, an airbag and brakes",
        "The same distinction exists in the network itself: [Aurora's](/en/guide/aurora) orchestrator brain runs a verified-artifact gate on every live request, and the output guardian checks the scheduled jobs — two directions of the same truth",
      ],
      tips: [
        "When someone (or something) reports 'done', ask yourself which level of truth it is. Most reports in systems are level 1 dressed up as level 3",
        "Don't drop level 2 just because you have level 3. Immediate verification catches a failure the moment it happens; the guardian catches it if it slipped through. They complement, not replace",
      ],
      codeExample: {
        label: "Three levels of truth in code",
        code: "# Level 1 — ran\nran = job.exit_code == 0\n\n# Level 2 — succeeded (right after the run)\nsucceeded = verify_result(job)\n\n# Level 3 — produced (a separate, later check)\nproduced = artifact_exists(job) and fresh(job) and not empty(job)\n\nif ran and succeeded and not produced:\n    alert('silent failure: ran + verified, but no artifact')",
      },
    },
    {
      id: "check-types",
      icon: ListChecks,
      title: "Check types — how to test 'there's an artifact'",
      subtitle: "A file, a record, a log line, a message — every job gets its own check type",
      description:
        "An 'artifact' looks different for every job, so a good output guardian supports a handful of simple check types. What they all share: they test something tangible and objective, with a time window (freshness — how recent the artifact is). The definition per job is a line or two in a config file: the check type, where to look, and the allowed time window. That's all it takes to turn a 'blind' job into a supervised one.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "intermediate",
      beginner:
        "How do you know 'an artifact was produced'? It depends on what the job is supposed to create. If it writes a file — you check the file exists, isn't empty, and was recently updated. If it inserts a row into a database — you check a new row from today exists. If it sends a report — you check 'sent' was recorded in the journal. Like an inspector's checklist: every kind of chore has its own way of being checked, but they all boil down to the same principle — look at the thing itself, don't trust the report about it.",
      content: [
        "File check (file): does the file exist? Is its size above zero? Is its modification time inside the allowed window? — the most common check, fits backups, data exports and reports",
        "Record check (db record): was a new database record created since the last run? — fits sync jobs, data collection and result logging",
        "Log check (log): did a specific success signature (not just 'finished') appear in the log within the time window? — fits cases with no direct access to the artifact",
        "Job-artifact check (job artifact): for jobs managed by the [autonomy stack's](/en/guide/autonomy) queue — does the outcome ledger show a real artifact for the latest run?",
        "Timer check (timer): did the timer itself even fire when it was supposed to? — catches the most silent failure of all: a job that simply stopped being scheduled",
        "The golden rule: every check needs a time window. 'The file exists' is half a check; 'the file exists and was updated within the last 24 hours' — that's a complete check",
      ],
      tips: [
        "Don't check what's easy to check — check what matters. If the real artifact is 'the customer received an email', a 'file was created' check is a weak proxy. Always ask: what's the closest evidence to the artifact the user sees?",
        "The timer check is the most boring and the most important. A job that stopped because someone accidentally disabled a timer will never fail — it just won't run, and no artifact check will ever fire for it",
      ],
      codeExample: {
        label: "Per-job check definitions — a config file",
        code: '{\n  "nightly_backup":  { "check": "file",   "path": "/backups/db.tar.gz", "max_age_hours": 26 },\n  "daily_report":    { "check": "log",    "match": "report sent",       "max_age_hours": 25 },\n  "crm_sync":        { "check": "db",     "table": "sync_runs",          "max_age_hours": 4  },\n  "weekly_review":   { "check": "timer",  "unit": "review.timer",        "max_age_hours": 170 }\n}',
      },
    },
    {
      id: "alerts",
      icon: BellRing,
      title: "Alerts — straight to the phone, without flooding",
      subtitle: "A real alert when there's a gap, complete silence when there isn't",
      description:
        "An output guardian that floods you with alerts will be ignored within a week — and then it's worthless. So the alerting side matters as much as the checking side: an alert goes out only for a real gap ('ran but produced nothing'), it reaches the owner's phone directly via [Kami](/en/guide/kami), and it respects quiet hours and a cooldown period — the same fault won't nag you again every hour. Gaps are also recorded to a central attention inbox, so the [CEO Loop](/en/guide/ceo-loop) briefing can gather them in the morning.",
      color: "from-amber-600 to-orange-500",
      difficulty: "intermediate",
      beginner:
        "Think of a good smoke alarm. It stays silent all year, beeps only when there's real smoke — and doesn't start beeping again every five minutes about the same smoke you already know about. If it beeped at every bit of shower steam, you'd disable it — and that's the moment alarms become dangerous. Exactly the same with output-guardian alerts: an alert only for a real gap, once, directly to you — and then silence until something changes.",
      content: [
        "The alert channel: a direct message to the phone via [Kami](/en/guide/kami) — not an email that gets buried and not a log line. An artifact gap is exactly the kind of thing that justifies a message",
        "Cooldown: after alerting about a specific job, the guardian won't alert about it again for several hours — giving you time to handle it without repeated nagging",
        "Quiet hours: a gap discovered in the middle of the night waits for morning (unless marked critical) — because a 3 AM alert about a daily report changes nothing",
        "Attention inbox: every gap is also recorded to a central list of 'things that need attention' — so even if you missed a message, the gap doesn't vanish",
        "The briefing link: the [CEO Loop](/en/guide/ceo-loop) gathers open gaps into the morning briefing — 'two jobs ran without producing an artifact' — and you decide what to do",
      ],
      tips: [
        "The metric for good alerts: how many of them led to action. If you're deleting alerts without reading them — there are too many, and the problem is the guardian's, not yours",
        "When a gap keeps recurring, don't settle for a spot fix — it's excellent input for [Aurora](/en/guide/aurora), who can recognize the pattern and propose a root-cause fix",
      ],
    },
    {
      id: "examples",
      icon: FileCheck,
      title: "Real-world examples — where it catches things",
      subtitle: "A backup, a daily report, a scheduled scan, a content pipeline",
      description:
        "The best way to feel the value of an output guardian is through the classic cases where it catches a failure no other layer would have caught. What they all share: a process that ran 'successfully' over time, without a single error — and without producing the thing it exists for. These aren't theoretical scenarios; they're the most common silent-failure patterns in any automated system.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "beginner",
      beginner:
        "All the examples here are variations on the same story: something ran like clockwork, looked fine, and did nothing. It happens more than you'd think — because automated processes drift over time: a folder moves, a permission expires, an external service changes its address. The process keeps running, but its hand no longer reaches the right place. And without an artifact check, nothing will ever tell you.",
      content: [
        "The backup that didn't back up: a backup job ran every night for half a year — but after a folder restructure it was backing up an empty directory. The log is green; the file produced — 2KB instead of 2GB. A file check with a size threshold catches it on the first night",
        "The report that was never sent: a daily report generated successfully, but the send step failed silently after an auth token expired. 'The process finished' — but nobody received anything. A log check on a 'sent' signature exposes the gap immediately",
        "The scan that stopped: a scheduled scan someone accidentally disabled during maintenance and forgot to re-enable. It doesn't fail — it simply doesn't run. A timer check is the only thing that catches complete absence",
        "The content pipeline that produced emptiness: an automated content process kept running after its data source dried up — 'successfully' producing empty files. A non-emptiness check stops the phantom stream",
        "The common denominator: in every case level 1 ('ran') and even level 2 ('succeeded') were green — only the artifact check (level 3) revealed there was nothing in hand",
      ],
      tips: [
        "Go over your five most important scheduled jobs and ask about each: 'if it stops producing an artifact without crashing — how long until I find out?'. Any answer above a day is an immediate candidate for an output guardian",
        "The most convincing example is the one that happens to you. The moment the guardian catches its first gap — you'll stop asking whether it's worth the investment",
      ],
    },
    {
      id: "advanced",
      icon: Layers,
      title: "Integration — how to adopt an output guardian yourself",
      subtitle: "Start with one critical job, expand gradually",
      description:
        "As in every guide — don't wrap the whole system on day one. The order: pick the job that would hurt most to discover failed too late (almost always: the backup), define one artifact check for it, and wire an alert to the phone. Live with it for a week, calibrate the time window, and only then add the remaining jobs. The output guardian plugs into the wider network: it reads from the [outcome ledger](/en/guide/autonomy), reports via [Kami](/en/guide/kami), feeds the [CEO Loop](/en/guide/ceo-loop) briefing, and hands [Aurora](/en/guide/aurora) raw material for spotting failure patterns.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      beginner:
        "The golden rule returns: start small. One job — the most important one — one check, one alert. After you've seen it work without nagging, add the next one. Within a few weeks all the important jobs are supervised, and the feeling changes: instead of 'I hope everything ran', you know — because if something ran without producing, you'll get a message. That peace of mind is exactly what this pattern sells.",
      content: [
        "Step 1 — one job: pick the process that's most expensive to discover failed too late, and define one artifact check with a time window",
        "Step 2 — the alert: wire the check to a phone message (for me, via [Kami](/en/guide/kami)) with a cooldown — one alert, not a flood",
        "Step 3 — calibration: the first week you'll get a few false alerts (a too-tight window, a wrong size threshold). Calibrate — don't switch it off",
        "Step 4 — expansion: add the rest of the scheduled jobs, one by one. Each job = one definition line in the config file",
        "Step 5 — wiring into the network: feed the gaps to the attention inbox and the [CEO Loop](/en/guide/ceo-loop) morning briefing, and let [Aurora](/en/guide/aurora) analyze recurring patterns",
        "Infra: the guardian itself is a script + a [systemd](/en/guide/systemd) timer — and it also guards itself: if it doesn't run, its own timer shows up as a gap in the timer check",
      ],
      tips: [
        "Don't forget to guard the guardian: define a timer check on the guardian itself, or minimal external monitoring. A watchdog that dies silently is the ultimate silent failure",
        "Resist the temptation to turn this into a platform. One config file, one script, one timer — the simpler the guardian, the better its odds of surviving for years without maintenance",
      ],
    },
  ],
  resources: [
    {
      title: "The Autonomy Stack guide",
      description: "The framework the guardian completes — queue, Firewall, verify-on-result and ledger",
      href: "/en/guide/autonomy",
      icon: BookOpen,
    },
    {
      title: "The CEO Loop guide",
      description: "The briefing that gathers artifact gaps into morning decisions",
      href: "/en/guide/ceo-loop",
      icon: BookOpen,
    },
    {
      title: "The Aurora guide",
      description: "The reflection agent that analyzes recurring failure patterns",
      href: "/en/guide/aurora",
      icon: BookOpen,
    },
    {
      title: "The systemd guide",
      description: "The timers that run both the jobs and the guardian",
      href: "/en/guide/systemd",
      icon: ExternalLink,
    },
    {
      title: "Elad's network code",
      description: "The output guardian, artifact checks and gap alerts",
      href: "https://github.com/eladjak",
      icon: Github,
    },
    {
      title: "Consultation — automation reliability",
      description: "Want to know your automation actually produces — not just runs?",
      href: "/en/contact",
      icon: Mail,
    },
  ],
  ctaTitle: "Stop hoping everything ran — know everything produced",
  ctaSub:
    "An artifact check for every scheduled job, a real alert when there's a gap, and peace of mind when there isn't. 'Ran' is not 'produced'.",
  primaryCta: {
    label: "Start with the autonomy stack",
    href: "/en/guide/autonomy",
    icon: Send,
  },
  secondaryCta: {
    label: "Book a consultation",
    href: "/en/contact",
    icon: Users,
  },
  authorBio:
    "I built the output guardian after realizing the most dangerous failure in an autonomous system isn't the one that takes a service down — it's the one that leaves it 'green' while it produces nothing. The big lesson: 'ran', 'succeeded' and 'produced' are three different levels of truth, and a system you can trust needs all three. Since the guardian has been running, 'all good' for me is a verified fact — not a hope.",
};
