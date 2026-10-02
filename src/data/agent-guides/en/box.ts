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
  agentNameHe: "Box — Telegram Health Coach",
  category: "agent",
  logoImage: "/images/guide-logos/box-logo.png",
  tagline: "A tracking-assistant pattern that can meet people in the chat they already use",
  heroDescription:
    "Box is a personal Telegram-based tracking and coaching assistant built from Elad's system. Its purpose is simple: collect short updates in a conversation, use [Claude Code](/en/claude-code) to process them, and keep long-term context in [Qdrant](/en/guide/qdrant), a store that can find information by meaning rather than by exact wording alone. You write naturally and the information stays readable; ICS is a standard calendar file, and this guide explains how you can add it to your own calendar to keep reminders in one place. In my setup (Elad), Box is intended to turn short updates into organized follow-up. In your setup, you could adapt the same pattern to track sleep, running, habits, learning, or any measurable personal goal without turning the conversation into a complicated system.",
  badgeText: "2026 · Health Coach AI · Practical Guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/box",
  heroBgImage: "/images/guides/guide-box-hero.jpg",
  videoUrl: "/videos/guides/box.mp4",
  stats: [
    { label: "Meal intake time", value: "<5s" },
    { label: "Meal memory", value: "90 days" },
    { label: "Interface", value: "Telegram" },
    { label: "16:8 windows", value: "ICS" },
  ],
  paradigmTitle: "A health app people actually use",
  paradigmSub:
    "Because it lives where you already are — chat (Telegram in my setup). No login, no buttons, no app updates.",
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
        "Box only requires a chat app (Telegram or WhatsApp). No UI, no abandonment. Easy to use dozens of times a day.",
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
      subtitle: "An autonomous personal coach — check-ins and intake through Telegram",
      description:
        "Box is a personal coach that lives in your pocket — an AI agent that talks with you on Telegram, understands what you said in plain language, remembers it long-term, and replies with the next step. It isn't a new app you have to download and learn; it's a chat conversation, exactly like chatting with a friend who also tracks, calculates, and never judges.",
      color: "from-rose-600 to-pink-500",
      difficulty: "beginner",
      beginner:
        "Think of a digital journal that helps organize short updates. Once chat access and the appropriate permissions are connected, you can build a workflow that saves a message such as 'I practiced guitar for twenty minutes' and prepares a summary from the collected records. In your setup, the same pattern could track learning, practice, or another personal goal. Storage, summaries, and delivery frequency depend on configuration and verification of the implementation.",
      content: [
        "One possible pattern is a proactive check-in — a short message asking about progress — at times configured in advance. Box can accept a free-form reply and save it as a record; the questions and schedule are configuration choices, and this example is not proof of an active schedule.",
        "In the full pattern, Box is an endpoint on the [Delegator](/en/guide/delegator) — the central API layer every agent in the network speaks through. In other words, Box isn't a separate server but a capability that plugs into an existing stack.",
        "Communication (in the full pattern): an intake endpoint accepting simple JSON ({text, source}) → parsing with Gemini 2.5 Flash (Google's free model, which handles Hebrew beautifully) → write to intake.jsonl (a plain text file where each line is one event).",
        "The response you get back: {ok, summary, next_step, calories_estimate, macros} — meaning \"got it, here's the summary, and here's what to do next.\"",
        "state.json — Box's brain. A single JSON file holding the entire context: phase (intake/active/maintenance), weight goal, protocol (keto/16:8/calorie deficit), window start time. It's loaded on every interaction so Box never forgets who you are.",
        "Calendar feed: you can add an endpoint that returns an ICS file, a calendar format Google Calendar and Apple Calendar can read. If connected, it could show eating windows calculated from the settings; this guide does not verify a live endpoint or updates.",
        "Dashboard: you can build an HTML page to show state, recent intake records, and trends. This is a display concept; its address, current data, and availability depend on the connection and permissions.",
        "Long-term memory sits in [Qdrant](/en/guide/qdrant) — a vector database that enables semantic search. After three months you can ask \"when did I feel best?\" and Box finds the right matches, not by exact word but by meaning.",
      ],
      tips: [
        "The name \"Box\" is English for boxing/fist — the constant fight toward a goal. Spelled \"Box\", not \"Boks\", on purpose.",
        "Box is built on [Claude Code](/en/claude-code) for logic and Gemini for fast parsing. It isn't one monolithic server but a composition of open components, so each part is easy to swap independently.",
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
        "You can write a free-form update such as 'morning: a twenty-minute walk'. In a workflow configured for it, a language model can suggest a category and save the text with a timestamp. Ambiguous wording may be misinterpreted; show the interpretation for review and allow corrections. Free-form input can make reporting easier, but it does not guarantee accurate understanding",
      content: [
        "Automatic classification: every incoming message is categorized into one of five types — meal, symptom, weight, activity, fasting (window). The LLM does this transparently, without you having to choose.",
        "Internal format stored: {ts, text, type, classified, macros?, notes?} — timestamp, the original text, the type, what the AI understood, and any notes. Nothing is lost — both the raw text and its interpretation are kept.",
        "Storage: an intake.jsonl file in a dedicated data folder on the server — a JSONL file (each line is a separate JSON record). It's durable, easy to back up, and easy to export to another system.",
        "SOURCE allowlist: only approved sources get through (for example elad-direct, ios-shortcut). This matters because Box sits on an infrastructure with many agents ([Kami](/en/guide/kami), [Kaylee](/en/guide/kaylee), [Hermes](/en/guide/hermes)) generating traffic — we don't want another agent's report to accidentally register as an intake.",
        "Phantom filter: a mechanism that detects messages that look like agent chatter and rejects them. A second defensive layer above the allowlist.",
        "The reply sent back in chat: \"Got it — ~550kcal, 40g protein. Next step: finish your water by 11:00\" — short, concrete, and with a single next action so you aren't overwhelmed.",
        "A possible extension — OCR: send a photo of a plate/menu/package → an OCR service (e.g. Google Cloud Vision, free up to 1,000 images per month) extracts the text → it's fed to the language model as if you had typed it. Not wired up in my setup yet, but a natural addition to the pattern.",
      ],
      codeExample: {
        label: "Sending from curl (the pattern's API shape)",
        code: 'curl -X POST https://your-server.example.com/coach/intake \\\n  -H \'content-type: application/json\' \\\n  -d \'{"text":"Lunch — tuna salad with avocado","source":"elad-direct"}\'',
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
      beginner:
        "State is simply Box's 'memory' — a single file that holds everything it currently knows about you: what phase you're in, what your goal is, which plan is active. Every time you talk to it, it reads this memory first and only then replies — and that's exactly the difference between 'an assistant reacting to a single message' and 'a coach who remembers your whole journey'. The nice part is that it's a simple, readable file, not a black box: you can always open it and see exactly what Box remembers about you.",
      content: [
        "Location: a state.json file in Box's data folder on the server — a single, simple JSON file. You can open it in a text editor, read it, and edit it by hand. Fully transparent — no black box.",
        "Core fields: phase (intake/active/maintenance), protocol (keto/if/deficit), weight_start, weight_target, fast_start_hour. A minimal schema keeps the state easy to understand and maintain.",
        "In an implementation, a weight intake or protocol change can update the saved state. The write path, persistence, and timing depend on the application; this guide does not verify a live state service.",
        "phase=intake: the initial data-collection stage. Box doesn't suggest steps yet — it's just learning your patterns. Typical length: one or two weeks. This is also the first-use phase, where Box focuses on observation rather than intervention.",
        "phase=active: the working phase. There's a protocol, there's a goal, Box reminds you about windows, calculates macros, and gives daily next steps.",
        "phase=maintenance: after you reach the goal. Box shifts to maintenance mode — fewer instructions, more monitoring, and alerts only when there's a significant deviation.",
        "Long-term history: every intake is kept in intake.jsonl — an append-only file (lines are only ever added, never deleted) that is easy to back up and export. Semantic memory sits in [Qdrant](/en/guide/qdrant) — there you can search \"what worked last month?\" and get an answer based on conceptual similarity rather than just time.",
      ],
      tips: [
        'Changing phases: message Box in chat — "let\'s switch to active starting tomorrow morning" — and it picks up the intent and updates the state itself. No technical commands needed.',
        "Backup: because the state is a single file, a simple cron job can back it up (see [Docker](/en/guide/docker) for volume-mount examples). Losing state = losing memory — it's worth backing up daily.",
      ],
    },
    {
      id: "calendar",
      icon: Calendar,
      title: "ICS calendar — 16:8 windows inside Google Calendar",
      subtitle: "Subscribe once and see your eating windows on your phone forever",
      description:
        "ICS is a standard calendar-file format that Google Calendar, Apple Calendar, and Outlook can read. The design can provide a URL that returns an ICS file and let you subscribe to it like a calendar feed. If the connection exists and updates, it can show fasting and eating windows in the calendar you already use; this description does not verify a live endpoint.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "intermediate",
      beginner:
        "Think of it as subscribing to a calendar channel: if a valid endpoint is implemented and connected to Google Calendar, the calendar can fetch events on the provider's refresh schedule. Whether eating and fasting windows appear depends on what the endpoint returns, and Box changes appear only after they are saved and available to fetch. This guide does not verify an active endpoint or a specific sync interval.",
      content: [
        "Example endpoint: GET /box/calendar.ics could return text in VCALENDAR format, the standard text format for calendars. If you implement an address like this, you can open it in a browser and inspect the output.",
        "What's in the events: each event is a \"16:8 eating window\" — it begins at fast_start_hour + 16 hours of fasting, and lasts 8 hours for eating. The times are set dynamically from Box's state.",
        "A design could return a limited number of future events on each request. The quantity and update behavior depend on the implementation and the calendar provider's sync schedule.",
        "To connect an implemented endpoint in Google, use Calendar → Other calendars → From URL → paste the URL. In Apple Calendar, use File → New Calendar Subscription. The calendar subscription and returned events must be tested after setup.",
        "Refresh cadence: the calendar provider decides when it fetches the URL. Do not rely on an immediate update or a fixed interval; check provider behavior before using the calendar for time-sensitive reminders.",
        "A schedule can be designed to exclude Shabbat or holidays if the calendar logic and source data are configured. That behavior is not verified here; see [Adopter](/en/guide/adopter) for a related design consideration.",
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
      beginner:
        "This is where Box moves from 'a journal that records what you ate' to 'a coach that tells you what to do now'. After it gets to know you for about two weeks, it starts spotting personal patterns — like 'you tend to eat more on Wednesday evenings' — and gives precise suggestions tailored to you, not generic advice from a book. And most importantly: its tone asks and suggests, it doesn't command or judge. For me (Elad) that's the difference between an app that logs and a real coach who knows me and knows when to push and when to give rest.",
      content: [
        "Weekly trend analysis: Box runs an analysis that reads the week's intakes, identifies an overall direction (progress/plateau/regression), and produces one or two insights. It isn't a busy chart — it's a short, data-backed sentence.",
        "Personal pattern detection: \"You tend to eat more on Wednesday evenings\" — Box finds this from empirical observation, not a pre-set rule. It works because intakes are retained in full for 90 days in [Qdrant](/en/guide/qdrant).",
        "Proactive suggestions: after a heavy meal — \"a 20-minute walk will help digestion.\" Box doesn't wait for you to ask — it initiates. But gently, typically one suggestion per day, to avoid overwhelming you.",
        "Weekly chat report: at the end of the week Box sends a summary: \"This week — positive movement toward the goal, 12 of 14 windows completed, protein steady.\" Short, factual, no grade or judgment.",
        "Habit stacking: a technique from Atomic Habits — you identify an existing strong habit and attach a new one to it. Box automatically finds strong habits and suggests a stack: \"after your morning coffee — that's a good moment for vitamin D.\"",
        "The tone: asks, suggests, logs — never judges. \"You had 2400 calories today — a little over the target. Want us to adjust dinner?\" instead of \"you went over the target!\"",
      ],
      tips: [
        "This program isn't a diet plan — it's a coach-agent template. In your own setup you can apply it to any measurable goal: sleep (bedtime + how you woke up), running (km + how it felt), habit change (count + triggers), music practice (minutes + progress), or budgeting.",
        "Box uses [Claude Code](/en/claude-code) for complex logic and Gemini Flash for fast parsing. If you want to extend it to multi-agent analysis, see the [CrewAI guide](/en/guide/crewai) — it explains how agent crews collaborate on this kind of analysis.",
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
      beginner:
        "This section is for those who already like Box and want to turn it from something nice into a system that works for them effortlessly. Each capability here removes friction — for instance, instead of typing what you ate, you just photograph the plate and it figures it out; or your fitness device automatically sends your weight and sleep every morning, without you having to remember to report. You don't have to implement everything — each capability stands on its own, take what speaks to you. This part is more technical, but the goal is simple: less work for you, more benefit.",
      content: [
        "OCR integration (an extension idea): send a photo of a plate/menu/package → a service like Google Cloud Vision extracts the text → Box handles it like a regular intake. Free up to 1,000 images per month. Handy at a restaurant when you don't have the energy to type. Not wired up in my setup yet.",
        "iOS Shortcut: build a one-button shortcut on the device (Shortcuts app) that opens a direct chat with Box in Telegram — shrinks the time from \"idea\" to \"message\" to 3 seconds. Works from the Home Screen and the Apple Watch.",
        "Webhook from Garmin/Fitbit: connect via [n8n](/en/guide/n8n) to your fitness service and Box receives weight/sleep/heart rate automatically every morning. This removes the need to remember to report.",
        "Shabbat awareness: on Israeli Shabbat and holidays Box goes quiet automatically — no reports, no reminders. This principle runs across every agent in my network (see [Kami](/en/guide/kami) and [Kaylee](/en/guide/kaylee), which behave the same way).",
        "Multi-user: state is keyed by user_id, so you can run one Box for multiple people (coaches, dietitians, therapists). Each client gets their own state, privacy is preserved, and you maintain a single codebase.",
        "Export: GET /coach/state returns the full state as JSON. Simple backup: a cron job that copies the file to Box.com or Google Drive every night. Exporting to another format (CSV/Excel) is trivial from JSON.",
        "Monitoring: you can connect a [Dashboard](/en/guide/dashboard) to display health and missing intake metrics if you implement it; this guide does not verify an active Box dashboard.",
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
      description: "Image OCR for automatic intake — free up to 1,000/month",
      href: "https://cloud.google.com/vision",
      icon: ExternalLink,
    },
    {
      title: "Kami guide",
      description: "Box lives in the same agent network as Kami — a coach alongside a personal assistant",
      href: "/en/guide/kami",
      icon: BookOpen,
    },
    {
      title: "Consultation call",
      description: "Want your own coach version? 30-minute call",
      href: "/contact",
      icon: Mail,
    },
    {
      title: "Delegator guide",
      description: "The API Box runs on",
      href: "/en/guide/delegator",
      icon: BookOpen,
    },
  ],
  ctaTitle: "Ready for a personal coach in your chat app?",
  ctaSub:
    "The code is open, the APIs are free, and time to first intake — 10 minutes.",
  primaryCta: {
    label: "Spin up your own Box",
    href: "https://github.com/eladjak",
    icon: Github,
  },
  secondaryCta: {
    label: "Book a consultation",
    href: "/contact",
    icon: Users,
  },
  authorBio:
    "Box is described as a coach-agent pattern — an agent that collects updates and supports progress toward a personal goal — that can be adapted for learning, sleep, habits, or other goals. A proactive check-in is a short follow-up message in a configured channel, such as chat; you can add response storage and a progress view. This guide explains the architecture and options without claiming that a specific schedule, channel, or endpoint is active today.",
};
