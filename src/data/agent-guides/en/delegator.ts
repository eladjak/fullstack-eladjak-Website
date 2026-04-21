import {
  Network,
  Route,
  Plug,
  Layers,
  Github,
  ExternalLink,
  BookOpen,
  Code2,
  Rocket,
  Lightbulb,
  Zap,
  Users,
  Mail,
  Server,
  Lock,
  Globe,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const delegatorGuideEn: AgentGuideData = {
  slug: "delegator",
  agentName: "Delegator",
  agentNameHe: "Delegator — Central API Gateway",
  logoImage: "/images/guide-logos/delegator-logo.png",
  tagline: "One gateway, 100+ endpoints, the whole network behind it",
  heroDescription: "Delegator is an HTTP router written in Node/TypeScript that runs on port 3900 on my VPS. It centralizes 100+ endpoints: email (Resend), SMS (Twilio), calendar (Hebcal + Google), drive, research (Perplexity/Gemini), content-studio, landing-pages, campaigns, pipeline orchestration, and auto-routing. Auth is handled with an API key + JWT, and everything is logged to [Qdrant](/en/guide/qdrant). For me it fronts all 10 agents behind a single gateway — for you it can replace Zapier/Make and serve as an API gateway for any multi-agent architecture, without scattering credentials across five different .env files.",
  badgeText: "2026 · Central API Router · Practical Guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/delegator",
  heroBgImage: "/images/guides/guide-delegator-hero.jpg",
  stats: [
    { label: "endpoints", value: "100+" },
    { label: "services behind it", value: "10" },
    { label: "uptime (90 days)", value: "99.7%" },
    { label: "public URL", value: "hub" },
  ],
  paradigmTitle: "Stop duplicating the middle layer",
  paradigmSub:
    "You have 5 agents, all of them need to send email? No. One sends to the delegator, the delegator handles it. Simple.",
  paradigmShifts: [
    {
      before: "credentials in every agent, updating means updating several places",
      after: "credentials in the delegator only, rotate once",
      icon: Lock,
    },
    {
      before: "Kami needs API keys for Resend, Stripe, Postiz, Gmail, fal.ai...",
      after: "Kami sends POST /email to the delegator → delegator does the magic",
      icon: Route,
    },
    {
      before: "Want to block publishing on Shabbat? Wire it into 5 agents",
      after: "Calendar gate in the delegator. Every publish goes through it. One place.",
      icon: Layers,
    },
    {
      before: "When you add a new webhook — update every agent",
      after: "Add it to the delegator, everyone gets it for free",
      icon: Plug,
    },
  ],
  whoIsThisFor: [
    {
      title: "Building a network of 3+ agents",
      description:
        "The moment you have 3, you already have coordination overhead. Delegator solves it.",
      icon: Network,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Infrastructure managers",
      description:
        "One place — one contract, one rate-limit, one audit log.",
      icon: Server,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Automation developers",
      description:
        "Zapier-style — internal email/sms/post/calendar pipelines.",
      icon: Route,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Agent communities",
      description:
        "A few independents building together? Delegator works beautifully as a shared service.",
      icon: Users,
      color: "from-pink-500 to-rose-500",
    },
  ],
  toc: [
    { id: "what-is", label: "What It Is" },
    { id: "routes", label: "Routes" },
    { id: "gateway", label: "Gateway" },
    { id: "calendar", label: "Calendar Gate" },
    { id: "costs", label: "Cost Tracking" },
    { id: "llm-route", label: "LLM Routing" },
    { id: "advanced", label: "Advanced" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Server,
      title: "What is the Delegator? The single entry point to the whole network",
      subtitle: "A Python HTTP router that replaces Zapier, Make, and 5 credential files",
      description:
        "Delegator is what you'd call an 'API gateway' in technical jargon — a central switchboard that sits in front of any system with many background services. It's a small program written in plain Python (no fancy framework like FastAPI or Express), running as a background service on my server, listening for requests that come in over HTTP. Every agent in my network — [Kami](/en/guide/kami), [Kaylee](/en/guide/kaylee), [Box](/en/guide/box), [Hermes](/en/guide/hermes), [Adopter](/en/guide/adopter), and all the rest — whenever they want to send an email, fire off an SMS, check a calendar, or call an LLM — they don't talk to the provider directly. They talk to the Delegator, and the Delegator is the one that knows which API key to use and how to speak to each service.",
      color: "from-cyan-600 to-blue-500",
      difficulty: "beginner",
      beginner:
        "Picture the switchboard of a large office building. Instead of every employee memorizing the phone number of the bank, the post office, the electricity company, and all the clients — there's one operator who knows them all. The employee picks up the phone, says 'connect me to the bank' — and she wires it through. That's exactly how the Delegator works. The agents don't need to manage the contact details themselves (what we call credentials — passwords and access keys for external services); they just send a simple request to the Delegator and it takes care of the rest. That way, if you swap out the API key for an email service — you change it in one place, not across 10 different agents.",
      content: [
        "Runs on port 3900 on the VPS (my virtual server, inside Hetzner) — internal only. External visitors reach it at hub.eladjak.com through a cloudflared tunnel (a free Cloudflare service that connects a home server to the internet without opening firewall ports)",
        "The code lives at `/opt/ai-factory/scripts/delegator.py` — a single Python file, roughly 5,000 lines. No dependency hell, no million libraries. Just stdlib (Python's standard library) and a handful of basic networking libraries",
        "Over 100 endpoints (endpoints — addresses you can hit, like /email/send or /calendar/check). Each endpoint handles a specific job",
        "Centralized secrets management — API keys for Resend (email sending), Twilio (SMS), Google OAuth, Anthropic, OpenAI, Gemini — all live in the server's environment variables, never in code and never in Git",
        "Public HTML dashboards running on the same server: `/launcher` (agent menu), `/hub` (network status), `/costs/llm` (LLM spend), `/calendar/publishing-status` (what's allowed to publish right now)",
        "For me: fronts all 10 agents behind a single gateway. For you: can serve as the gateway for your own multi-agent network, or replace Zapier/Make when they get too pricey",
      ],
    },
    {
      id: "routes",
      icon: Route,
      title: "Over 100 endpoints — what's inside the gateway",
      subtitle: "Not just a pipe — real business logic too",
      description:
        "An endpoint is a specific server address that answers a specific request. For example POST /email/send to send an email, or GET /calendar/check to check a schedule. Delegator hosts 100+ of them, grouped by responsibility. It's not just middleware (a pass-through layer that forwards requests to another service) — there's real business logic in here too, like a gate that checks whether publishing is allowed right now, or a router that picks which LLM to call based on cost.",
      color: "from-violet-600 to-purple-500",
      difficulty: "intermediate",
      content: [
        "Publishing & distribution: `/postiz/post` (post to social networks via Postiz), `/campaign-email` (marketing email campaign), `/social-post` (general publishing), `/sms/send` (SMS via Twilio), `/content-studio/publish` (publish content studio output)",
        "AI pipelines: `/research` (research a topic via Perplexity or Gemini), `/landing-page` (generate a full landing page), `/pipeline/full` (the full chain from idea to publish), `/content-studio/generate` (content generation)",
        "Google Workspace: `/gmail/send` and `/gmail/search` (email), `/calendar/check` (availability), `/drive/search` (file search), `/docs/create` (create a new document)",
        "Infrastructure & monitoring: `/health/agents` (which agents are alive), `/network/memory` (shared network memory that flows into [Qdrant](/en/guide/qdrant)), `/kaylee/report` (reports from [Kaylee](/en/guide/kaylee)), `/claude-code/enqueue` (task queue for [Claude Code](/en/claude-code))",
        "Business data: `/projects`, `/campaigns`, `/groups`, `/bank/transactions` (bank feed), `/routines` (daily routines)",
        "HTML dashboards: `/hub`, `/launcher`, `/costs`, `/costs/llm`, `/coach/dashboard` (for [Box](/en/guide/box)), `/box/calendar.ics` (iCal for the training calendar)",
        "Smart LLM routing: `/llm/route` — 4 fallback tiers (falling back when one fails) from completely free all the way to paid Claude",
      ],
    },
    {
      id: "gateway",
      icon: Plug,
      title: "The Gateway Pattern — centralized responsibility instead of scattered",
      subtitle: "When everyone goes through the same gate, you can manage them from one place",
      description:
        "The Gateway pattern is a software architecture principle where, instead of every component in the network talking directly to external services, they all route through a single central gateway. The payoff: anything you want to check or enforce across the whole network — you add it once in the gateway, and the change applies to everyone automatically. Want to add a log line for every request? One line. Want to rate-limit how many requests per minute each agent can send? One line.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "intermediate",
      content: [
        "Central auth: today it's simple API-key auth; down the road you can add JWT (JSON Web Token — a standard for issuing signed access tokens with an expiry) in a middleware layer (code that runs before every endpoint)",
        "Rate limiting: a uniform cap per user type. Agents don't need to coordinate among themselves how many requests have been sent — the gateway knows",
        "Structured logs: every request is recorded in a uniform JSON format with agent, endpoint, status, and latency. You can slice the data later by the agent making the call or by endpoint type",
        "Retries: if an external service like Resend goes down for a moment, the Delegator retries in the background. The calling agent doesn't need to know there was a transient failure",
        "Caching: Hebcal data (the Hebrew calendar), Google OAuth tokens, and other data that rarely changes stays in memory for a defined window, instead of hitting the API every time",
        "Feature flags: want to temporarily disable an endpoint, say during maintenance? One line of code — everyone is affected immediately",
      ],
      tips: [
        "A tip I learned the hard way: even when the Delegator and an agent live on the same physical server, the agent still calls it over HTTP (rather than importing it as an internal library). It looks like a wasted 2ms, but it dramatically reduces coupling (tight dependency between components). Tomorrow you'll want to move the agent to a different server — and you won't have to change a single line of code",
      ],
    },
    {
      id: "calendar",
      icon: Globe,
      title: "The Hebrew calendar gate — essential in Israel",
      subtitle: "Automatic blocking of publishing on Shabbat, holidays, Memorial Day",
      description:
        "This is a unique protection layer I added to the Delegator after a few embarrassing incidents. The idea: before any publishing endpoint carries out the action, it checks the Hebrew-Israeli calendar via a service called Hebcal. If it's currently Shabbat, a holiday, Memorial Day for fallen soldiers, or Holocaust Remembrance Day — it simply refuses to publish marketing content and returns a polite message with the time publishing will resume. It works as middleware on every publishing endpoint in the network.",
      color: "from-amber-600 to-orange-500",
      difficulty: "advanced",
      beginner:
        "Imagine this: it's Memorial Day at 11:00 AM, the siren sounds. At that very moment one of my agents (maybe [Adopter](/en/guide/adopter)) decides to publish a post titled 'Weekend Sale!'. Public embarrassment. The Delegator blocks it automatically — it stops the request and returns: 'Marketing publishing is blocked until 20:00.' The agent understands this isn't a bug, it's a cultural gate, and schedules itself to publish later.",
      content: [
        "The internal function `_il_calendar_status()` calls the Hebcal API (a free Hebrew calendar service) and caches the response for 6 hours to avoid flooding Hebcal with requests",
        "Three sensitive categories: `shabbat_chag` (Shabbat and Israeli holidays — hard block), `solemn_modern` (Memorial Day, Holocaust Remembrance Day — marketing content blocked), `celebratory_modern` (Independence Day — celebratory content allowed, aggressive marketing not)",
        "A 30-minute buffer before candle lighting and 40 minutes after nightfall — consistent with halacha. No publishing 'exactly at 17:30' if Shabbat starts at 17:32",
        "Every publish call can include a `content_type` field in the payload (the body of the request) with one of these values: `generic` (regular), `critical` (critical — always passes), `condolence` (condolence — passes on Memorial Day), `il_celebration` (celebratory — passes on Independence Day)",
        "`critical` bypasses the gate — for example a system-down alert has to go out even on Shabbat",
        "Public status at `GET /calendar/publishing-status` — returns JSON plus a nice HTML page with auto-refresh, so you always know what's allowed right now",
      ],
      codeExample: {
        label: "Example response from Delegator when trying to publish on Memorial Day",
        code: '{\n  "sensitive": true,\n  "category": "solemn_modern",\n  "reason": "Yom HaZikaron (Memorial Day) — marketing publishing blocked until sundown.",\n  "resume_at_iso": "2026-04-21T19:30:00"\n}',
      },
    },
    {
      id: "costs",
      icon: Zap,
      title: "Cost tracking — which agent is eating how much",
      subtitle: "A dashboard showing in real time which agent spent how much on LLMs",
      description:
        "LLM calls (language models like Claude, Gemini, GPT) are the biggest line item in an autonomous agent network, and without tracking it can explode into an imaginary bill at the end of the month. I added a mechanism to the Delegator that records every LLM call that goes through it: which tier was used, which model, which agent asked, how many tokens went in, how many came out, and how long it took. Later you can slice the data and see, say, 'Kami consumed 40% of this month's LLM budget'.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "intermediate",
      content: [
        "The internal function `_log_llm_call(tier, model, requester, tokens_in, tokens_out, latency)` runs after every successful call — without hurting the agent's response time",
        "Data is written in JSONL format (one JSON line per event) to `/opt/ai-factory/data/costs/llm-calls.jsonl`. A simple format that's easy to slice with `grep`, with pandas, or with any other tool",
        "A live dashboard at `/costs/llm` refreshes every 60 seconds — pivot by agent, by model, by tier, or by date",
        "4 cost tiers: `ollama-local` (completely free, runs locally on [Ollama](/en/guide/ollama)), `gemini-flash` (free up to 1M tokens per month), `stepfun-openrouter` (StepFun's free model via OpenRouter), `claude-sonnet` (paid — $3 per million input tokens, $15 output)",
        "For me: actual [Claude Sonnet](/en/claude-code) spend runs about $2-5 a month, because it's only used as an emergency fallback. Most of the work is done on free Gemini Flash",
      ],
      tips: [
        "Add cost tracking on day one of the project, before there's anything to track. Otherwise you discover a month after launch that something is running in a loop and burned $200 — with no way to tell which endpoint is responsible",
      ],
    },
    {
      id: "llm-route",
      icon: Layers,
      title: "LLM routing — always free first",
      subtitle: "One endpoint, 4 automatic fallback tiers, $0 most of the time",
      description:
        "Instead of every agent deciding on its own which LLM to call (and when to fall back to a different model if it fails), the Delegator exposes a single endpoint called `/llm/route`. The agent sends its prompt along with a system prompt and a token limit, and the Delegator decides for itself: try the cheapest model first (free), fall back to the next one if it fails, and so on until something works. The response also includes which tier and which model actually answered, so the agent knows.",
      color: "from-pink-600 to-rose-500",
      difficulty: "advanced",
      content: [
        "Tier 1 — Ollama Local: if [Ollama](/en/guide/ollama) (a local model runtime) is running on the same server with the qwen3:4b model loaded — the call is completely free and the fastest. Requires 8GB+ RAM and preferably a GPU",
        "Tier 2 — Gemini 2.5 Flash: free up to 1 million tokens per month via Google AI Studio. Excellent quality for most tasks, including Hebrew",
        "Tier 3 — StepFun via OpenRouter: a strong Chinese model with the `:free` suffix on OpenRouter. Completely free with no token cap, but there's a rate limit",
        "Tier 4 — Claude Sonnet: paid, used only if all the previous tiers failed. I've configured it as an emergency fallback only",
        "Response format: `{ok, tier, model, latency_ms, cost_usd_estimate, response, tried: [...]}` — including a list of every model I tried before the success",
        "There's an internal pricing table in the Delegator that computes an accurate cost_usd_estimate from tokens_in × tokens_out × the provider's rate",
      ],
      tips: [
        "If you're starting out: use only tier 2 (Gemini Flash). Ollama needs a GPU for reasonable performance, and that's overhead not worth taking on at the start. As the project grows — then it's worth adding more tiers",
      ],
    },
    {
      id: "advanced",
      icon: Lightbulb,
      title: "Advanced tips from 6 months in production",
      subtitle: "The nuances that turn a simple API gateway into something stable and reliable",
      description:
        "This isn't a theoretical guide — everything here was forged from failures I hit along the way. These are the lessons from running the Delegator in maintenance for half a year.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      content: [
        "Not using a framework is an advantage — but it means you build the middleware yourself: logging, CORS (cross-origin browser permissions), auth. It takes a day, but afterwards you're in full control",
        "Exposure to the internet via cloudflared tunnel (a free Cloudflare service) — no need to open firewall ports, no need for a static IP, and no exposure of the home server to network scans",
        "Keep state only in defined places — files on disk, a database, Qdrant. In-memory state (variables inside the process) doesn't survive a service restart and will cause weird bugs",
        "The service runs under systemd (Linux's service manager) with `Restart=always` — if the code crashes for any reason, it comes back up automatically within 5 seconds",
        "The HTML dashboards are rendered by the Delegator itself using server-side rendering (assembling the HTML on the server before sending). No React, no SPA, no build step — just an HTML string returned from the server",
        "Backup: on every significant patch I keep a timestamped copy (`delegator.py.bak-sprint-6.7`) — that way if something breaks, rollback is a single filename change",
      ],
      tips: [
        "Important to understand: the Delegator isn't meant to be a public customer-facing product API. It's an internal gateway for communication between my agents. Don't expose it to the internet without a real authentication layer (JWT or mTLS), and don't let end customers hit it directly",
      ],
    },
  ],
  resources: [
    {
      title: "GitHub — Delegator code",
      description: "The full code in delegator.py",
      href: "https://github.com/eladjak",
      icon: Github,
    },
    {
      title: "Cloudflared",
      description: "Free tunnel for public exposure",
      href: "https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/",
      icon: ExternalLink,
    },
    {
      title: "Hebcal API",
      description: "Calendar data for Israel + Jewish calendar",
      href: "https://www.hebcal.com/home/developer-apis",
      icon: ExternalLink,
    },
    {
      title: "The Kami guide",
      description: "Uses the delegator for email, research, content",
      href: "/en/guide/kami",
      icon: BookOpen,
    },
    {
      title: "The CrewAI guide",
      description: "Crews accessible through the delegator",
      href: "/en/guide/crewai",
      icon: BookOpen,
    },
    {
      title: "Architecture consultation",
      description: "Want a gateway for your network?",
      href: "/en/contact",
      icon: Mail,
    },
  ],
  ctaTitle: "One gateway replaces 5 integrations",
  ctaSub:
    "Plain Python, free cloudflared, and the result — an agent network that's easy to maintain.",
  primaryCta: {
    label: "The Kami guide",
    href: "/en/guide/kami",
    icon: BookOpen,
  },
  secondaryCta: {
    label: "Consultation call",
    href: "/en/contact",
    icon: Users,
  },
  authorBio:
    "The Delegator has been with me for 6 months, ~5,000 lines of code, 100+ endpoints. The first version was 200 lines. It grew with need — every feature that showed up in a handful of agents ended up passing through it. This guide is based on that growth.",
};
