import {
  MessageCircle,
  Mic,
  Brain,
  Clock,
  Zap,
  Shield,
  Users,
  Star,
  Lightbulb,
  Code2,
  Rocket,
  BookOpen,
  Github,
  ExternalLink,
  Sparkles,
  Phone,
  Calendar,
  Bell,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const kamiGuideEn: AgentGuideData = {
  slug: "kami",
  agentName: "Kami",
  agentNameHe: "Kami — WhatsApp AI Agent",
  category: "agent",
  logoImage: "/images/guide-logos/kami-logo.png",
  tagline: "A personal conversation assistant designed to connect WhatsApp with useful AI services",
  heroDescription: "Kami is a personal conversation assistant designed to bring WhatsApp messages and AI help together in one familiar place. It can connect WhatsApp to a language model — software that understands text and drafts replies, such as [Claude Sonnet](/en/claude-code) — and can include voice-note transcription and conversation search with [Qdrant](/en/guide/qdrant), a database that retrieves information by meaning. The guide also describes connecting it with other agents, such as [Kaylee](/en/guide/kaylee), so each part of a workflow has a clear role. In my setup (Elad), Kami is a pattern for bringing questions, voice notes, and reminders into one conversation. You could adapt the same pattern for customer support, learning, or a team assistant, depending on the services and permissions you choose.",
  badgeText: "2026 · Hebrew-native WhatsApp agent · Practical guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/kami",
  heroBgImage: "/images/guides/guide-kami-hero.jpg",
  videoUrl: "/videos/guides/kami.mp4",
  stats: [
    { label: "Designed role", value: "Depends on setup" },
    { label: "Default language", value: "Hebrew" },
    { label: "Voice transcription", value: "Provider-dependent" },
    { label: "Semantic memory", value: "Configuration-dependent" },
  ],
  paradigmTitle: "Why this changes the way we work with AI",
  paradigmSub:
    "Kami is a design pattern for a conversation assistant that can retain context and help with tasks when the required connections and permissions are configured.",
  paradigmShifts: [
    {
      before: "Open an app, type a question, wait, read the answer",
      after: "Record a voice note and receive a voice reply if the required services are connected",
      icon: Mic,
    },
    {
      before: "Forget what we talked about a week ago",
      after: "Conversation memory can connect topics when configured and approved",
      icon: Brain,
    },
    {
      before: "Having to nudge yourself to start a conversation",
      after: "You can configure reminders or scheduled briefings with appropriate sending rules",
      icon: Sparkles,
    },
    {
      before: "Bots that answer once and then forget you exist",
      after: "A consistent personality and conversational style, according to the service configuration",
      icon: Users,
    },
  ],
  whoIsThisFor: [
    {
      title: "Solo founders",
      description:
        "Fast communication on the move. Capture an idea while walking and watch it turn into a task.",
      icon: Rocket,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Busy family managers",
      description:
        "Smart reminders, scheduling, weekly wrap-ups of what happened. Like a personal secretary.",
      icon: Calendar,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Developers who want their own",
      description:
        "Fully open source. TypeScript, Bun, Claude API. Spin up your own version in minutes.",
      icon: Code2,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Anyone tired of ChatGPT",
      description:
        "Kami remembers you, holds context, and speaks back in a natural human voice.",
      icon: MessageCircle,
      color: "from-pink-500 to-rose-500",
    },
  ],
  toc: [
    { id: "what-is", label: "What it is" },
    { id: "setup", label: "Setup" },
    { id: "voice", label: "Voice" },
    { id: "memory", label: "Memory" },
    { id: "proactive", label: "Proactivity" },
    { id: "bridge", label: "Agent bridge" },
    { id: "advanced", label: "Advanced" },
  ],
  sections: [
    {
      id: "what-is",
      icon: MessageCircle,
      title: "What exactly is Kami?",
      subtitle: "Your personal WhatsApp agent — with real depth",
      description:
        "Kami is a personal AI agent designed by Elad as a service connected to WhatsApp. In the described flow, a message can pass through a gateway such as Green API to [Claude Sonnet](/en/claude-code), a language model that interprets text and drafts a reply; the reply can return as text or voice if those connections are configured. A VPS (Virtual Private Server) is a computer rented online that can host the service. Availability and message delivery depend on connected providers and deployment.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "beginner",
      beginner:
        "Think of Kami as a personal conversation assistant for WhatsApp: you can send a message or voice note, and a suitable design can reply in text or audio. A connected conversation memory can help it use earlier context when that feature is configured and working. The benefit is a familiar interface without needing a separate app. Actual availability, memory, and message delivery depend on the connections, permissions, and deployment you choose.",
      content: [
        "In the design described here, the service runs on a VPS (a private computer rented online) and receives WhatsApp events through a Green API webhook — an automatic message sent by an outside service when something happens. Actual availability depends on the connected services and their operation.",
        "Every incoming message passes through [Claude Sonnet](/en/claude-code) 4.5 with a custom system prompt (the system prompt is the background instructions that tell the model who it is and how to behave — in my setup it is defined as Elad's personal assistant)",
        "Design example for voice transcription: an STT service (Speech-to-Text) such as Gemini or Whisper can produce text if included in the deployment. Provider availability, accuracy, price, and fallback behavior depend on its settings and plan",
        "You can connect a TTS service (Text-to-Speech) to return a spoken reply. Voice, cost, and availability depend on the service and configuration",
        "Long-term memory is stored in [Qdrant](/en/guide/qdrant) — a semantic database that lets you retrieve past messages by meaning rather than by exact keywords",
      ],
      tips: [
        "Kami is open source — the code is on GitHub, so feel free to fork it and build your own version with a completely different personality",
        "The system prompt is the heart of the personality. In system-prompt.ts you can change the tone, the role, and the instructions — for example to turn it into a legal assistant, a personal trainer, or a study buddy",
      ],
    },
    {
      id: "setup",
      icon: Zap,
      title: "Plan and set it up for your environment",
      subtitle: "What you need and how to get started",
      description:
        "Setup requires technical familiarity, a compatible WhatsApp provider, access to a language model such as [Claude](/en/claude-code), and a computer or VPS (a rented virtual server) to host the service. This is a component outline, not a setup-time or price promise: cost, quotas, availability, and maintenance depend on the providers and configuration you choose.",
      color: "from-amber-600 to-orange-500",
      difficulty: "intermediate",
      beginner:
        "If you are not a developer, ask someone familiar with the chosen services to help configure them. After setup, the service still needs appropriate monitoring and maintenance. You can explore conversation memory in an assistant you already use before deciding whether a WhatsApp-connected design fits your needs.",
      content: [
        "git clone https://github.com/eladjak/elad-personal-agent — download the source repository to your machine (git is a version control system that tracks changes to files)",
        "bun install — install every library Kami depends on (Bun is a modern, blazing-fast JavaScript/TypeScript runtime, an alternative to Node.js)",
        "Create a .env file with the credentials: GREEN_API_TOKEN (for WhatsApp), ANTHROPIC_API_KEY (for [Claude](/en/claude-code)), OPENAI_API_KEY (for voice transcription), GEMINI_API_KEY (for speech synthesis and memory embeddings)",
        "Connect a WhatsApp number to the Green API account — a one-time QR code scan through their dashboard, exactly like pairing WhatsApp Web",
        "A VPS can host the service; select its size and provider based on workload and current terms. You can configure systemd, the Linux service manager, to run a process in the background and start it after reboot, then verify the behavior",
        "bun build src/index.ts --outdir dist — an example command for bundling; output size and startup time depend on the code, dependencies, and environment",
      ],
      tips: [
        "Choose hosting and a WhatsApp gateway after checking provider policies, compatibility, privacy, quotas, and current pricing; availability and traffic restrictions can vary between providers",
      ],
      codeExample: {
        label: "First run",
        code: "git clone https://github.com/eladjak/elad-personal-agent.git\ncd elad-personal-agent\nbun install\ncp .env.example .env\n# Edit .env with your keys\nbun run build\nbun run start",
      },
    },
    {
      id: "voice",
      icon: Mic,
      title: "Voice: hearing and speaking",
      subtitle: "Gemini transcription → Claude → Gemini TTS",
      description:
        "Voice is one possible way to use a conversation assistant when audio transcription and speech services are connected. In this design, a WhatsApp voice note can be transcribed, processed, and returned as audio if each provider and delivery path is configured. Actual language support, availability, response time, and adoption depend on the selected services and users.",
      color: "from-purple-600 to-violet-500",
      difficulty: "intermediate",
      beginner:
        "Example voice flow: an audio message goes to an STT service (speech-to-text), and the resulting text is sent to [Claude](/en/claude-code) for drafting. A TTS service can turn the draft into speech and return it to the conversation. Provider names, fallback behavior, language support, and actual response time depend on configuration and connected services.",
      content: [
        "Incoming voice note → Green API delivers a URL to the .oga file (WhatsApp's native audio format)",
        "Kami downloads the file → sends it to Gemini for transcription with the language set to Hebrew (and if Gemini is unavailable — falls back automatically to Whisper via Groq or OpenAI)",
        "Within 2 to 3 seconds the transcribed text comes back — precise Hebrew, including punctuation and proper diacritics",
        "[Claude Sonnet](/en/claude-code) receives the text along with the conversation context, drafts a Hebrew reply, and hands it to Gemini TTS",
        "Gemini TTS (configured with voice=Charon, a clear male voice) returns an MP3 file → Kami uploads it back to WhatsApp",
        "The magic: if you sent text you get text back, if you sent voice you get voice back — Kami mirrors the channel you reached out on",
      ],
      tips: [
        "whisper-large-v3 (via Groq) is more accurate than whisper-1 in Hebrew but more expensive; for everyday conversation, whisper-1 produces excellent results at negligible cost",
        "You can connect a TTS (Text-to-Speech) service such as Gemini or another option; availability, quality, price, and quotas depend on the provider's current plan and configuration.",
        "If transcription quality in noisy conditions matters, test several services on representative samples and compare quality and latency; results vary by provider, language, and network conditions",
      ],
    },
    {
      id: "memory",
      icon: Brain,
      title: "Semantic memory with Qdrant",
      subtitle: "Not just the last message — the last 1,000, retrieved by meaning",
      description:
        "Conversation memory can be stored in [Qdrant](/en/guide/qdrant), a vector database that supports searching by meaning, not only exact words. In this pattern, an embedding is a numeric representation of text that can be stored and searched later. The model, vector dimensions, and which messages are retained depend on the application and provider configuration; this guide does not assert a specific deployment.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "advanced",
      beginner:
        "The mechanism sounds complex, but the idea is simple: Kami does not remember things word for word, it remembers the concept. If you ask 'what did we say about the new diet?', it will find every relevant conversation about dieting, even if the original wording was 'healthy nutrition' or 'low-calorie meals'. That is what gives the feeling that it actually knows you, rather than just reacting to your latest message.",
      content: [
        "Two complementary memory layers: a short-term per-chat conversation memory (what was said in this conversation) + a long-term semantic memory in Qdrant (what was ever said, by meaning)",
        "The conversation memory is managed as a Map keyed by chat id (chatId): every conversation — private or group — has its own separate history, so different chats never bleed into each other",
        "Each chat's history is persisted to its own file on the server — so it survives a restart: even after the service comes back up, Kami continues the conversation from the same point, without 'resetting'",
        "Every message (yours and Kami's) is stored in a collection named kami_memory inside [Qdrant](/en/guide/qdrant)",
        "You can choose an embeddings model (a numeric representation used for semantic search), such as a Google service; availability, Hebrew support, dimensions, and pricing vary by model, account, and configuration.",
        "Before Kami answers, it runs a semantic search: 'what has the user asked in the past that is similar in meaning to the question right now?'",
        "It pulls the 5 to 10 most relevant past messages and slots them into the system prompt — that is how [Claude](/en/claude-code) sees the broader context",
        "The result: a feeling that Kami actually remembers you, because it actually does — the memory is anchored in meaning, not in the last words typed",
      ],
      tips: [
        "After a few months of use you build up a personal library of ideas and insights — you can export it to Markdown and treat it as a private knowledge archive",
        "Qdrant can be self-hosted, for example in a [Docker](/en/guide/docker) container, or connected as a managed service. The choice affects infrastructure, cost, backups, and maintenance; check the current service terms and actual resource needs.",
      ],
      codeExample: {
        label: "Semantic memory search",
        code: "// Inside Kami's response flow\nconst memories = await qdrant.search('kami_memory', {\n  vector: embeddingOfQuestion,\n  limit: 10,\n  with_payload: true,\n});\n// The most relevant memories get added to Claude's context",
      },
    },
    {
      id: "proactive",
      icon: Sparkles,
      title: "Proactive — not just reactive",
      subtitle: "Morning briefings, end-of-day summaries, idea tracking",
      description:
        "You can configure cron jobs — scheduled tasks that run at chosen times, like an alarm clock — to send messages or summaries. This can turn a reactive process into an assistant that reaches out first, if the schedule, connections, and sending rules are configured and checked.",
      color: "from-pink-600 to-rose-500",
      difficulty: "intermediate",
      beginner:
        "Imagine an assistant configured to review the day's schedule in the morning and send a few useful points. The same mechanism can support reminders, a team summary, or a follow-up message after you choose an appropriate schedule, information sources, and sending rules.",
      content: [
        "Example schedule: Cron 08:00, a morning briefing with tasks and calendar events, such as one connected to the [CEO Loop](/en/guide/ceo-loop)",
        "Another example: Cron 20:00, an evening summary of what is complete and what remains open",
        "You can configure a reminder when an important message goes unanswered for a chosen period; timing and behavior depend on settings",
        "You can configure an event that forwards an incident message from [Kaylee](/en/guide/kaylee) to a person; connection and delivery must be checked",
        "You can add an anti-spam guard to check duplicates, limit message frequency, and bundle alerts. Its behavior depends on identification keys, saved state, and the sending path; also check retries and delivery failures. This example does not guarantee that every alert arrives exactly once",
        "Example quiet-hour configuration: 22:00 to 08:00, deferring routine summaries with predefined exceptions for urgent alerts. Configure and check the time zone, urgency rules, and behavior while sending is blocked; this guide does not verify an active sending rule",
      ],
      tips: [
        "You can add quiet-hour rules for a local calendar, such as Shabbat and holidays, after checking the time zone, date source, and intended behavior",
        "You can add, edit, or disable any cron job at any moment — it is just one line in the Linux crontab file (crontab is the system's scheduling table)",
      ],
    },
    {
      id: "bridge",
      icon: Users,
      title: "Bridge to other agents",
      subtitle: "Kami talks to Claude Code and Kaylee via a central API",
      description:
        "Kami is not a lone agent — it is part of a network of agents that talk to each other. The bridge between them is implemented today as a central HTTP API — a small network service every agent posts messages to and pulls its pending messages from (in early versions it was a shared file called messages.jsonl; the API replaced it as the network grew). This lets Kami forward requests to [Claude Code](/en/claude-code) on my machine, or to [Kaylee](/en/guide/kaylee) on the server, and route the replies back.",
      color: "from-cyan-600 to-blue-500",
      difficulty: "advanced",
      beginner:
        "Think of it as a private WhatsApp group just for the agents. You tell Kami 'check whether the server is up', it forwards the request to [Kaylee](/en/guide/kaylee) (the infrastructure agent in charge of every server), Kaylee runs the check and replies, and Kami brings the answer back to you on WhatsApp — all without you needing to know which agent does what behind the scenes.",
      content: [
        "The bridge itself is a central HTTP API — an agent posts a message with a POST request and pulls the messages waiting for it with a GET request. Simple, resilient, and every programming language can talk to it",
        "Every message carries these fields: {ts (timestamp), from (sender), to (recipient), content (payload), status (pending/handled), type (request/response)}",
        "Kami checks the bridge at a steady cadence — spotting new messages addressed to it and processing them",
        "Kami can send messages to two recipients: claude-code (that is me on my machine) or kylie (that is [Kaylee](/en/guide/kaylee))",
        "[Claude Code](/en/claude-code) running on my Windows box connects to the same bridge and responds whenever it sees messages directed to it",
        "[Kaylee](/en/guide/kaylee) receives her messages through her own dedicated webhook (a network address that accepts incoming requests)",
        "Channel visibility: every message another agent in the network sends you through Kami's channel is also written into his conversation memory — so if you ask him 'what did you send me this morning?', he actually knows, even when the message was produced by another agent",
      ],
      tips: [
        "If you want [Claude Code](/en/claude-code) to run a coding task while you are mid-conversation on WhatsApp — just tell Kami 'ask Claude to check X', and it will forward the request and bring the result back to you",
      ],
      codeExample: {
        label: "A bridge message",
        code: '{"ts":"2026-04-20T21:00:00Z","from":"elad","to":"claude-code","type":"request","content":"Check the project build","status":"pending"}',
      },
    },
    {
      id: "advanced",
      icon: Shield,
      title: "Advanced tips and automation",
      subtitle: "Patterns to evaluate for your deployment",
      description:
        "This section gathers design and maintenance considerations for adapting a personal conversation assistant. Each recommendation depends on your providers, permissions, and deployment; the examples are not evidence of measured results or continuous use of a particular system.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      beginner:
        "This section collects ideas for separate profiles, conversation-history backups, and service maintenance. Choose what fits your needs, define retention and access policies, and test restoration before relying on a backup.",
      content: [
        "WhatsApp Business vs Personal — Kami works perfectly with a regular personal number; Green API does not require a business profile or Meta verification",
        "Quotas and pricing: check current terms, limits, and prices directly with the WhatsApp and language-model providers before choosing a configuration.",
        "Multi-user — you can add additional users in code and offer a personal agent to every family member, each with their own system prompt (dad gets one, mom another, the kids a third)",
        "Backup — the conversation log grows quickly; set up a weekly rotation that uploads to AWS S3 or Hetzner Object Storage (cheap archival storage for files)",
        "The 'dashboard' text command — send Kami the word 'dashboard' on WhatsApp, and you get back a one-time link that opens the [dashboard](/en/guide/dashboard) with you already signed in — no password and no login screen",
        "Monitoring option: a tool such as Uptime Kuma can check a health endpoint (a URL that reports whether a service responds) and send an alert if configured. This guide does not verify a live endpoint or alert route",
        "A/B testing for system prompts — duplicate system-prompt.ts into several variants and switch between them with an environment variable (ENV var — external configuration the program reads at startup), to see which personality resonates best",
      ],
      tips: [
        "The pattern that has paid off the most: 'mirror mode' — if you sent a voice note, Kami replies in voice; if you sent text, Kami replies in text. It creates a feeling of natural, frictionless communication",
        "Add a /status command in WhatsApp — it returns a compact system status (uptime, message count, memory usage) without consuming any LLM tokens, so it costs nothing",
      ],
    },
  ],
  resources: [
    {
      title: "GitHub — Elad's projects",
      description: "My public repos — AI-agent code, skills and infrastructure (the Kami repo itself is private)",
      href: "https://github.com/eladjak",
      icon: Github,
    },
    {
      title: "Green API",
      description: "A possible WhatsApp connection provider; check availability, quotas, and pricing with the provider",
      href: "https://green-api.com",
      icon: ExternalLink,
    },
    {
      title: "Qdrant Cloud",
      description: "Vector database that powers semantic memory",
      href: "https://qdrant.tech",
      icon: ExternalLink,
    },
    {
      title: "OpenAI Whisper API",
      description: "Accurate Hebrew voice transcription — Kami's fallback engine",
      href: "https://platform.openai.com/docs/guides/speech-to-text",
      icon: ExternalLink,
    },
    {
      title: "Gemini TTS",
      description: "A possible text-to-speech service; check languages, voices, availability, and pricing with the provider",
      href: "https://ai.google.dev",
      icon: ExternalLink,
    },
    {
      title: "The full Claude Code guide",
      description: "The foundation behind the entire stack — how to use Claude Code",
      href: "/en/claude-code",
      icon: BookOpen,
    },
  ],
  ctaTitle: "Ready to build your own Kami?",
  ctaSub:
    "The code is open source; enabling a voice conversation requires selecting providers, configuring connections, and testing in your environment. Cost and setup time depend on those choices and permissions.",
  primaryCta: {
    label: "Build your own Kami",
    href: "https://github.com/eladjak",
    icon: Github,
  },
  secondaryCta: {
    label: "Message me on WhatsApp",
    href: "https://wa.me/972525427474",
    icon: Phone,
  },
  authorBio:
    "Kami is a guide to designing a personal conversation assistant connected to WhatsApp. The described architecture can combine a language model, voice transcription or playback, memory, and reminders, depending on the services, permissions, and tasks you configure. Each connection needs to be configured and tested in your environment; actual availability and behavior depend on the deployment and providers. This guide helps explain the components and adapt the pattern for personal, family, or business use.",
};
