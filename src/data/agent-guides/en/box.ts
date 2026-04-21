import {
  Dumbbell,
  Apple,
  Target,
  TrendingDown,
  Calendar,
  Heart,
  Github,
  ExternalLink,
  BookOpen,
  Users,
  Code2,
  Rocket,
  Lightbulb,
  Zap,
  MessageCircle,
  Mail,
  Clock,
} from "lucide-react";

import type { AgentGuideData } from "@/components/agent-guide/types";

export const boxGuideEn: AgentGuideData = {
  slug: "box",
  agentName: "Box",
  agentNameHe: "Box — WhatsApp Health Coach",
  logoImage: "/images/guide-logos/box-logo.png",
  tagline: "A health app people actually use — because it lives in WhatsApp",
  heroDescription:
    "A personal coaching agent built on [Claude Code](/en/claude-code) + [CrewAI](/en/guide/crewai), with long-term memory in [Qdrant](/en/guide/qdrant), image OCR through Google Cloud Vision API, and an auto-generated ICS calendar feed. Interface: WhatsApp via the [Delegator](/en/guide/delegator). State is stored as a single JSON file plus an encrypted SQLite database. In my own setup it accompanies a personal weight-loss and strength program, but this is a coach-agent pattern — not a diet plan. You can adapt it to sleep, running, habit change, learning an instrument, money management, or any measurable personal goal the user sets for themselves.",
  badgeText: "2026 · Health Coach AI · Practical Guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/box",
  heroBgImage: "/images/guides/guide-box-hero.jpg",
  videoUrl: "/videos/guides/box.mp4",
  stats: [
    { label: "Meal intake time", value: "<5s" },
    { label: "Meal memory", value: "90 days" },
    { label: "Image OCR", value: "live" },
    { label: "16:8 windows", value: "ICS" },
  ],
  paradigmTitle: "A health app people actually use",
  paradigmSub:
    "Because it lives where you already are — WhatsApp. No login, no buttons, no app updates.",
  paradigmShifts: [
    {
      before: "Open a nutrition app, search for the product, enter quantities, save...",
      after: '"I had a Greek salad with chicken" — the data is already in the system',
      icon: MessageCircle,
    },
    {
      before: "Crowded charts you can't interpret",
      after: 'Weekly report: "You lost 0.8kg, below target. Add more protein"',
      icon: TrendingDown,
    },
    {
      before: "Does anyone remember how you felt after a heavy meal?",
      after: 'Box asks after the meal "how do you feel?" and logs it',
      icon: Heart,
    },
    {
      before: "A 16:8 eating window? You forget, and by then it's too late",
      after: "Calendar subscription — Google Calendar shows you the window",
      icon: Calendar,
    },
  ],
  whoIsThisFor: [
    {
      title: "People who tried health apps and gave up",
      description:
        "Box only requires WhatsApp. No UI, no abandonment. Easy to use dozens of times a day.",
      icon: Heart,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Anyone following keto / 16:8 / a calorie deficit",
      description:
        "Box knows the protocol, reminds you about windows, and calculates macronutrients.",
      icon: Apple,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Developers who want to build a similar bot",
      description:
        "The code is open, the pattern is clean — coach intake + state management + cron.",
      icon: Code2,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Therapists and dietitians",
      description:
        "You can spin up a version per client, with isolated state and a more sophisticated interface.",
      icon: Users,
      color: "from-pink-500 to-rose-500",
    },
  ],
  toc: [
    { id: "what-is", label: "What it is" },
    { id: "intake", label: "Intake" },
    { id: "state", label: "State" },
    { id: "calendar", label: "Calendar" },
    { id: "coach", label: "Coaching" },
    { id: "advanced", label: "Advanced" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Dumbbell,
      title: "What is Box?",
      subtitle: "An autonomous personal coach — intake through WhatsApp",
      description:
        "Box is a personal coach that lives in your pocket — an AI agent that receives WhatsApp messages (text or image), understands what you said in plain language, remembers it long-term, and replies with the next step. It isn't a new app you have to download and learn; it's a WhatsApp conversation, exactly like chatting with a friend who also tracks, calculates, and never judges.",
      color: "from-rose-600 to-pink-500",
      difficulty: "beginner",
      beginner:
        "Think of it as a digital journal with a brain. You write \"I ate a burrito\" in WhatsApp — Box understands it's a meal, estimates calories and protein, stores it in an internal record, and at the end of the week sends you a short summary. No app, no signup, no buttons. In my own ([Elad](/en/contact)) setup it accompanies a weight-loss and strength program, but in your setup it can track sleep, running, study habits, or any other goal.",
      content: [
        "Box is a simple endpoint on the [Delegator](/en/guide/delegator) (port 3900) — the central API layer every agent in the network speaks through. In other words, Box isn't a separate server but a capability that plugs into an existing stack.",
        "Communication: POST /coach/intake with simple JSON ({text, source}) → parsing with Gemini 2.5 Flash (Google's free model, which handles Hebrew beautifully) → write to intake.jsonl (a plain text file where each line is one event).",
        "The response you get back: {ok, summary, next_step, calories_estimate, macros} — meaning \"got it, here's the summary, and here's what to do next.\"",
        "state.json — Box's brain. A single JSON file holding the entire context: phase (intake/active/maintenance), weight goal, protocol (keto/16:8/calorie deficit), window start time. It's loaded on every interaction so Box never forgets who you are.",
        "Calendar feed: the /box/calendar.ics endpoint — ICS is the standard calendar format (the one Google Calendar and Apple Calendar read). Box generates a live file with 7 days of eating windows ahead, and you subscribe to it once from your phone.",
        "Dashboard: /coach/dashboard — a simple HTML page showing the current state, the last 10 intakes, and the weekly trend. It's a window into the state, not a management tool.",
        "Long-term memory sits in [Qdrant](/en/guide/qdrant) — a vector database that enables semantic search. After three months you can ask \"when did I feel best?\" and Box finds the right matches, not by exact word but by meaning.",
      ],
      tips: [
        "The name \"Box\" is English for boxing/fist — the constant fight toward a goal. Spelled \"Box\", not \"Boks\", on purpose.",
        "Box is built on [Claude Code](/en/claude-code) + [CrewAI](/en/guide/crewai) — the agent's logic layer. It isn't one monolithic server but a composition of open components, so each part is easy to swap independently.",
      ],
    },
    {
      id: "intake",
      icon: MessageCircle,
      title: "Intake — how you talk to it",
      subtitle: "Free text in your own words, Box understands and stores it",
      description:
        "Intake is the ingestion step for every new data point. Instead of a form with fields, Box works with free text: you write naturally about what you ate, how you feel, or how long you slept — and the language model classifies, understands, and stores it. This is where an \"ordinary journal\" becomes a \"journal with a brain.\"",
      color: "from-emerald-600 to-teal-500",
      difficulty: "beginner",
      beginner:
        "Simple free-form writing: \"morning — protein shake, egg, black coffee\" — Box understands it's a meal, estimates macros, and saves it with a timestamp. \"Feeling bloated\" — Box stores this as a symptom, separately from the food, so later we can check whether there's a correlation. There's no fixed format and no mistakes — the model handles almost any phrasing.",
      content: [
        "Automatic classification: every incoming message is categorized into one of five types — meal, symptom, weight, activity, fasting (window). The LLM does this transparently, without you having to choose.",
        "Internal format stored: {ts, text, type, classified, macros?, notes?} — timestamp, the original text, the type, what the AI understood, and any notes. Nothing is lost — both the raw text and its interpretation are kept.",
        "Storage: /opt/coach-data/progress-logs/intake.jsonl — a JSONL file (each line is a separate JSON record). It's durable, easy to back up, and easy to export to another system.",
        "SOURCE allowlist: only approved sources get through (for example elad-direct-whatsapp, box-ocr, elad-ios-shortcut). This matters because Box sits on an infrastructure with many agents ([Kami](/en/guide/kami), [Kaylee](/en/guide/kaylee), [Hermes](/en/guide/hermes)) generating traffic — we don't want another agent's report to accidentally register as an intake.",
        "Phantom filter: a mechanism that detects messages that look like agent chatter and rejects them. A second defensive layer above the allowlist.",
        "The reply sent back on WhatsApp: \"Got it — ~550kcal, 40g protein. Next step: finish your water by 11:00\" — short, concrete, and with a single next action so you aren't overwhelmed.",
        "OCR extension: send a photo of a plate → Google Cloud Vision API extracts the text from the PDF/menu/package → it's fed to the language model as if you had typed it. This input is free up to 1000 images per month.",
      ],
      codeExample: {
        label: "Sending from curl",
        code: 'curl -X POST https://hub.eladjak.com/coach/intake \\\n  -H \'content-type: application/json\' \\\n  -d \'{"text":"Lunch — tuna salad with avocado","source":"elad-direct"}\'',
      },
    },
    {
      id: "state",
      icon: Target,
      title: "State — the full picture",
      subtitle: "Phase, goals, protocol — what Box knows about you",
      description:
        "State is Box's short-term memory — one file holding the current context: which phase you're in, what the goal is, which protocol is active. Every interaction starts by reading this state, and only then does Box respond. That's the difference between \"an assistant that replies to a message\" and \"a coach that remembers the journey.\"",
      color: "from-violet-600 to-purple-500",
      difficulty: "intermediate",
      content: [
        "Location: /opt/coach-data/state.json — a single, simple JSON file. You can open it in a text editor, read it, and edit it by hand. Fully transparent — no black box.",
        "Core fields: phase (intake/active/maintenance), protocol (keto/if/deficit), weight_start, weight_target, fast_start_hour. A minimal schema keeps the state easy to understand and maintain.",
        "Automatic updates: every weight intake updates progress; every protocol change is reflected immediately. No need to remember to \"save\" — the state is live.",
        "phase=intake: the initial data-collection stage. Box doesn't suggest steps yet — it's just learning your patterns. Typical length: one or two weeks. This is also the first-use phase, where Box focuses on observation rather than intervention.",
        "phase=active: the working phase. There's a protocol, there's a goal, Box reminds you about windows, calculates macros, and gives daily next steps.",
        "phase=maintenance: after you reach the goal. Box shifts to maintenance mode — fewer instructions, more monitoring, and alerts only when there's a significant deviation.",
        "SQLite compatibility: beyond state.json there's also an encrypted SQLite database for long-term history (all intakes, weights, symptoms). Semantic memory sits in [Qdrant](/en/guide/qdrant) — there you can search \"what worked last month?\" and get an answer based on conceptual similarity rather than just time.",
      ],
      tips: [
        'Manual phase change: POST /coach/phase with {phase:"active"} — handy when you want to start a new stage right away. You can also message Box on WhatsApp "let\'s switch to active starting tomorrow morning" and it will pick up the intent and update the state itself.',
        "Backup: because the state is a single file, a simple cron job can back it up (see [Docker](/en/guide/docker) for volume-mount examples). Losing state = losing memory — it's worth backing up daily.",
      ],
    },
    {
      id: "calendar",
      icon: Calendar,
      title: "ICS calendar — 16:8 windows inside Google Calendar",
      subtitle: "Subscribe once and see your eating windows on your phone forever",
      description:
        "ICS is the standard file format for calendars — exactly what Google Calendar, Apple Calendar, and Outlook know how to read. Box exposes an endpoint that returns a live ICS file (always up to date), and you subscribe to it like subscribing to a podcast. The result: your fasting and eating windows appear in the calendar you already use, without another app.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "intermediate",
      beginner:
        "Think of it as \"subscribing to a calendar channel.\" You hand Google Calendar one Box URL and it syncs automatically every few minutes. The windows — when you can eat and when you fast — show up on your phone, laptop, and any device signed into the same Google account. If I change the start time via WhatsApp, the calendar updates within a few minutes — you don't have to touch anything.",
      content: [
        "The endpoint: GET https://hub.eladjak.com/box/calendar.ics — returns text in VCALENDAR format (the standard text format for calendars). You can open it in a browser, see how it looks, and download it.",
        "What's in the events: each event is a \"16:8 eating window\" — it begins at fast_start_hour + 16 hours of fasting, and lasts 8 hours for eating. The times are set dynamically from Box's state.",
        "7 events ahead on every call — when the calendar syncs again tomorrow, there will be 7 new ones. There's no \"end\" to the calendar; it keeps producing the next one continuously.",
        "How to add it in Google: Calendar → Other calendars → From URL → paste the URL. In Apple Calendar: File → New Calendar Subscription. It's a one-time action.",
        "Typical sync time: 5–15 minutes. Google checks the URL on its own cadence; you can't force an instant refresh, but in practice it's excellent for daily reminders.",
        "In my own setup ([Elad](/en/contact)) this is essential because I stay quiet on Shabbat and holidays — the calendar automatically skips those days (see [Adopter](/en/guide/adopter) and the Shabbat-awareness principle that runs across every agent in the network).",
      ],
      codeExample: {
        label: "VCALENDAR example",
        code: "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Box//Elad//EN\nBEGIN:VEVENT\nUID:box-eat-2026-04-21\nSUMMARY:16:8 Eating Window\nDTSTART:20260421T100000\nDTEND:20260421T180000\nEND:VEVENT\nEND:VCALENDAR",
      },
    },
    {
      id: "coach",
      icon: Zap,
      title: "Coaching — the next steps",
      subtitle: "Not just logging — concrete recommendations",
      description:
        "Coaching is where Box moves from \"journal\" to \"coach.\" After enough data is collected (usually two weeks), the model starts identifying personal patterns and suggesting precise interventions — tailored to you, not generic advice from a book. The tone: asks and suggests, never commands, never judges.",
      color: "from-amber-600 to-orange-500",
      difficulty: "intermediate",
      content: [
        "Weekly trend analysis: Box runs a CrewAI crew that reads the week's intakes, identifies an overall direction (progress/plateau/regression), and produces one or two insights. It isn't a busy chart — it's a short, data-backed sentence.",
        "Personal pattern detection: \"You tend to eat more on Wednesday evenings\" — Box finds this from empirical observation, not a pre-set rule. It works because intakes are retained in full for 90 days in [Qdrant](/en/guide/qdrant).",
        "Proactive suggestions: after a heavy meal — \"a 20-minute walk will help digestion.\" Box doesn't wait for you to ask — it initiates. But gently, typically one suggestion per day, to avoid overwhelming you.",
        "Weekly WhatsApp report: every Friday Box sends a summary: \"This week — positive movement toward the goal, 12 of 14 windows completed, protein steady.\" Short, factual, no grade or judgment.",
        "Habit stacking: a technique from Atomic Habits — you identify an existing strong habit and attach a new one to it. Box automatically finds strong habits and suggests a stack: \"after your morning coffee — that's a good moment for vitamin D.\"",
        "The tone: asks, suggests, logs — never judges. \"You had 2400 calories today — a little over the target. Want us to adjust dinner?\" instead of \"you went over the target!\"",
      ],
      tips: [
        "This program isn't a diet plan — it's a coach-agent template. In your own setup you can apply it to any measurable goal: sleep (bedtime + how you woke up), running (km + how it felt), habit change (count + triggers), music practice (minutes + progress), or budgeting.",
        "Box uses [Claude Code](/en/claude-code) for complex logic and Gemini Flash for fast parsing. See the [CrewAI guide](/en/guide/crewai) to understand how agent crews collaborate on this kind of analysis.",
      ],
    },
    {
      id: "advanced",
      icon: Lightbulb,
      title: "Advanced tips",
      subtitle: "Integrations that turn this from a tool into a system",
      description:
        "This section is for people who want to extend Box beyond basic use. Every capability here adds a real layer of convenience — reduces friction, adds automation, or opens up new use cases. You don't have to implement them all — each one stands on its own.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      content: [
        "OCR integration: send a photo of a plate/menu/package → Google Cloud Vision API extracts the text → Box handles it like a regular intake. Free up to 1000 images per month. Handy at a restaurant when you don't have the energy to type.",
        "iOS Shortcut: build a one-button shortcut on the device (Shortcuts app) that opens a direct chat with Box in WhatsApp — shrinks the time from \"idea\" to \"message\" to 3 seconds. Works from the Home Screen and the Apple Watch.",
        "Webhook from Garmin/Fitbit: connect via [n8n](/en/guide/n8n) to your fitness service and Box receives weight/sleep/heart rate automatically every morning. This removes the need to remember to report.",
        "Shabbat awareness: on Israeli Shabbat and holidays Box goes quiet automatically — no reports, no reminders. This principle runs across every agent in my network (see [Kami](/en/guide/kami) and [Kaylee](/en/guide/kaylee), which behave the same way).",
        "Multi-user: state is keyed by user_id, so you can run one Box for multiple people (coaches, dietitians, therapists). Each client gets their own state, privacy is preserved, and you maintain a single codebase.",
        "Export: GET /coach/state returns the full state as JSON. Simple backup: a cron job that copies the file to Box.com or Google Drive every night. Exporting to another format (CSV/Excel) is trivial from JSON.",
        "Monitoring: the [Dashboard](/en/guide/dashboard) shows Box's health alongside the rest of the agents — so you see immediately if intakes aren't coming in or if state.json isn't being updated.",
      ],
      tips: [
        "The thing that helped me most: writing in short bullets. \"Morning: 3 eggs, toast, coffee\" — Box processes it fast and replies instantly. Long sentences work too, but they cost more tokens and the response is slower.",
        "Swapping in [Aider](/en/guide/aider) or [Ollama](/en/guide/ollama) as an alternative model: if Gemini is ever unavailable, you can switch to a local LLM by changing one config value — Box's architecture is open and not locked to any provider.",
      ],
    },
  ],
  resources: [
    {
      title: "Coach ABBA Hatuv on GitHub",
      description: "The Box codebase — Python + FastAPI + Gemini",
      href: "https://github.com/eladjak",
      icon: Github,
    },
    {
      title: "16:8 Fasting Research",
      description: "Articles and benefits of intermittent fasting",
      href: "https://www.healthline.com/nutrition/16-8-intermittent-fasting",
      icon: ExternalLink,
    },
    {
      title: "Google Cloud Vision API",
      description: "Image OCR for automatic intake — free up to 1000/month",
      href: "https://cloud.google.com/vision",
      icon: ExternalLink,
    },
    {
      title: "Kami guide",
      description: "Box connects to Kami through WhatsApp intakes",
      href: "/en/guide/kami",
      icon: BookOpen,
    },
    {
      title: "Consultation call",
      description: "Want your own coach version? 30-minute call",
      href: "/en/contact",
      icon: Mail,
    },
    {
      title: "Delegator guide",
      description: "The API Box runs on",
      href: "/en/guide/delegator",
      icon: BookOpen,
    },
  ],
  ctaTitle: "Ready for a personal coach in WhatsApp?",
  ctaSub:
    "The code is open, the APIs are free, and time to first intake — 10 minutes.",
  primaryCta: {
    label: "Spin up your own Box",
    href: "https://github.com/eladjak",
    icon: Github,
  },
  secondaryCta: {
    label: "Book a consultation",
    href: "/en/contact",
    icon: Users,
  },
  authorBio:
    "Box is built as a coach-agent pattern for any personal goal: health, habit change, sleep, learning, finance. The real value is that the interface is WhatsApp — the place the user already lives, with no new app to abandon after a week. This guide presents the architecture and pattern so you can adapt it to any coaching use case in your organization or personal life.",
};
