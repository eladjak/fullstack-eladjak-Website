import {
  Target,
  MapPin,
  Search,
  PenLine,
  Inbox,
  ShieldCheck,
  Sparkles,
  Github,
  ExternalLink,
  BookOpen,
  Mail,
  Send,
  Users,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const sailacoGuideEn: AgentGuideData = {
  slug: "sailaco",
  agentName: "Sailaco",
  agentNameHe: "Sailaco (Sales/BD) — the network's sales agent",
  category: "agent",
  tagline:
    "The agent that rotates between cities, finds businesses with no website, and drafts outreach — but sends only with your approval",
  heroDescription:
    "The sales pipeline is the most worn-out, tedious work in a small business: finding leads, checking who's already been contacted, writing the first outreach. Sailaco is the agent that takes that work off your hands. He is male (he/his), chats on Telegram via @Sales_elad_bot and in the 'Rebels' group, and does three things: rotates between cities in Israel (rotation — never gets stuck in one city), finds new businesses with no website (with dedup — never repeats one already found), and drafts an outreach message for each lead. Once a day he sends a lead digest of what he found. But here's the critical part: sending itself is blocked behind a Firewall — Sailaco prepares everything, but an outreach goes out only after human approval with one click. For me (Elad) that's the difference between a 'dangerous spam bot' and a sales assistant you can trust. For you — it's the pattern for any responsible sales automation: the agent does all the worn-out work, the human keeps control of first contact with the client.",
  badgeText: "2026 · Sales / BD Agent · Practical Guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/sailaco",
  heroBgImage: "/images/guides/guide-sailaco-hero.jpg",
  stats: [
    { label: "Coverage", value: "Israeli cities" },
    { label: "Lead digest", value: "Daily" },
    { label: "Sending", value: "Human OK" },
    { label: "Channel", value: "Telegram" },
  ],
  paradigmTitle: "The worn-out work to the agent, first contact stays human",
  paradigmSub:
    "Lead-finding and outreach-writing are tedious work you can delegate. But first contact with a client is a sales move — and it stays behind human approval.",
  paradigmShifts: [
    {
      before: "Hours of manual searching for prospective businesses",
      after: "Sailaco rotates between cities and finds new businesses with no website, automatically",
      icon: Search,
    },
    {
      before: "Reaching out to the same business again because you forgot you already did",
      after: "Built-in dedup — Sailaco never repeats a lead already found",
      icon: MapPin,
    },
    {
      before: "A blank page facing 'how do I start outreach to a new client'",
      after: "Sailaco drafts a tailored outreach for each lead",
      icon: PenLine,
    },
    {
      before: "An autonomous bot that sends spam and burns your reputation",
      after: "Sending blocked by the Firewall — outreach goes out only with human approval",
      icon: ShieldCheck,
    },
  ],
  whoIsThisFor: [
    {
      title: "Solo operators and freelancers",
      description:
        "Need a steady lead flow but hate the searching? Sailaco does it — you just approve who to reach out to.",
      icon: Target,
      color: "from-indigo-500 to-violet-500",
    },
    {
      title: "Digital agencies / site builders",
      description:
        "Businesses without a website are your natural clients. Sailaco finds them city by city and drafts the outreach.",
      icon: MapPin,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Small BD teams",
      description:
        "Delegating the top-of-funnel to an agent frees the human team for closing — where humans truly win.",
      icon: Inbox,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Anyone wary of sales automation",
      description:
        "Rightly so — spam destroys reputation. The pattern here is built around that fear: the agent prepares, the human approves every outgoing message.",
      icon: ShieldCheck,
      color: "from-pink-500 to-rose-500",
    },
  ],
  toc: [
    { id: "what-is", label: "What it is" },
    { id: "rotation", label: "City rotation" },
    { id: "discovery", label: "Lead discovery" },
    { id: "outreach", label: "Outreach draft" },
    { id: "firewall", label: "Firewall" },
    { id: "advanced", label: "Advanced" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Target,
      title: "What is Sailaco?",
      subtitle: "The sales agent that does the top-of-funnel — without touching sending unapproved",
      description:
        "Sailaco is the network's Sales/BD agent — the component that handles the top of the sales pipeline: discovery, qualification, and outreach prep. He doesn't 'close deals' (that's a human role) and doesn't send autonomously (that's blocked). What he does do: rotate between cities in Israel, find new businesses with no website, dedup, draft outreach for each one, and send Elad a daily lead digest. He depends on [Kaylee](/en/guide/kaylee) for infrastructure and [Hermes](/en/guide/hermes) for research/content. Everything is built so the worn-out work is delegated, but first contact with a client always goes through a human.",
      color: "from-indigo-600 to-violet-500",
      difficulty: "beginner",
      beginner:
        "Think of a diligent junior salesperson working for you. Every morning he heads out for a round in a different city, looks for shops and businesses with no website, lists them, and prepares an initial outreach letter for each. At the end of the day he lays an orderly list on your desk: 'here are 8 businesses I found, and here's the draft for each'. You go through it, delete what's irrelevant, approve the rest — and only then do the letters go out. Sailaco is exactly that salesperson, except he's an AI agent who never tires and never forgets.",
      content: [
        "Sailaco is male (he/his) — the network's Sales/BD agent, alongside Kami, Kaylee, Hermes, Aurora and Ranch",
        "Channel: Telegram @Sales_elad_bot + the 'Rebels' group (a standalone bot, sailaco-telegram.service)",
        "Three responsibilities: sales_pipeline (managing the pipeline), lead_intake (lead intake), outreach_draft (writing outreach)",
        "Focuses on businesses without a website — the natural client of a site-builder/digital agency",
        "Depends on [Kaylee](/en/guide/kaylee) (infra) and [Hermes](/en/guide/hermes) (research/content) — division of labor per the network protocol",
        "Sending is an endpoint in the [autonomy stack](/en/guide/autonomy) (autonomy:sales_pipeline) and blocked by the Firewall",
      ],
      tips: [
        "The most important distinction in sales automation: you can delegate all of the 'who' and 'what to write', but the 'when to send and to whom' stays human. That's what separates a sales assistant from a spam bot",
        "Give the sales agent a narrow, clear scope (here: businesses without a website). The sharper the criterion, the higher the lead quality and the less 'noise'",
      ],
    },
    {
      id: "rotation",
      icon: MapPin,
      title: "City rotation — not getting stuck in one place",
      subtitle: "Sailaco rotates between cities in Israel to cover a wide market",
      description:
        "A common problem in automated lead discovery: the agent exhausts one city and then 'gets stuck' — repeating the same businesses over and over. Sailaco solves it with rotation: he systematically moves between cities in Israel, so each round he works fresh territory. That ensures broad coverage over time instead of over-mining a single area, and prevents the 'same 20 leads every day' effect.",
      color: "from-cyan-600 to-blue-500",
      difficulty: "intermediate",
      beginner:
        "Imagine a vendor with a cart. If he stands on the same street every day — pretty soon everyone there already knows him and there are no new customers. So he changes spots: one market today, a different street tomorrow, a new neighborhood the day after. That way there are always new faces. Sailaco does exactly that with cities: instead of exhausting one city and repeating the same businesses, he rotates between cities — and that way every day he discovers fresh leads.",
      content: [
        "Systematic rotation: Sailaco moves between cities in Israel on a rotation, not staying in one area",
        "Prevents over-mining: instead of repeating the same businesses in an exhausted city, he always works fresh ground",
        "Market coverage over time: over weeks, a broad mapping of website-less businesses across the country forms",
        "Connects to dedup (next section): even within the same city, a lead already found isn't counted again",
        "Local fit: outreach to a business in city X can reference the local context — relevance raises reply rates",
        "Logged in the [knowledge hub](/en/guide/orchestration): which cities were covered and when — so the rotation stays consistent across runs",
      ],
      tips: [
        "Rotation isn't just coverage — it's also protection against 'blindness': an agent stuck in one city starts returning the same results and misses entire markets",
        "Keep a 'what was covered when' record outside the agent (in the knowledge hub). Otherwise after a reboot it starts from scratch and repeats itself",
      ],
    },
    {
      id: "discovery",
      icon: Search,
      title: "Lead discovery + dedup — new businesses only",
      subtitle: "Finds businesses with no website, and cleans out anyone already found",
      description:
        "Sailaco's core is lead_intake: finding businesses with no website — exactly the target audience for a site builder. But discovery without cleaning is worthless: an agent that returns the same 50 businesses every run just wastes time. So every lead goes through dedup: Sailaco checks against the existing list and returns only new businesses not found before. That way the daily digest is always 'what's new', not 'what you've already seen'.",
      color: "from-violet-600 to-purple-500",
      difficulty: "advanced",
      beginner:
        "Think of a fisherman casting a net. If each time he pulls up the same fish he already caught and released — that's a waste. What he wants is only the new fish. Dedup is exactly that: Sailaco checks every business he finds against the list he already has, and throws back the ones he already knows. That way the daily list you get contains only genuinely new businesses — no confusing duplicates, no 'wait, I've already seen this one'.",
      content: [
        "Target criterion: businesses with no website — a clear population with a real need for Elad's product",
        "Dedup against the existing list: every lead is compared to what's already found; only new ones enter",
        "Structured lead_intake: every lead is stored with consistent fields (name, city, contact channel, status) — not free text",
        "Daily lead digest: once a day Sailaco pushes a digest of the new leads to the 'Rebels' group / to Elad",
        "Connects to [Hermes](/en/guide/hermes): when deeper research on a lead is needed (business size, contact person) — Sailaco delegates to him",
        "Quality over quantity: better 8 precise leads a day than 80 noisy ones no one will reach out to",
      ],
      tips: [
        "Dedup is what turns lead discovery from 'noise' into 'signal'. Without it, a sales agent floods you with the same names and loses your trust within two days",
        "Keep the target criterion narrow. 'Any business' returns junk; 'a website-less business in city X' returns a lead you can actually reach out to with a relevant offer",
      ],
    },
    {
      id: "outreach",
      icon: PenLine,
      title: "Outreach draft — prepares, doesn't send",
      subtitle: "A tailored initial outreach is written for each lead — ready for approval",
      description:
        "outreach_draft is where Sailaco turns a list of names into real value: for each lead he writes an initial outreach draft — short, relevant, and tailored to the specific business. The draft is exactly that — a draft. It is not sent. It's presented to Elad as part of the digest, and he can edit, approve, or reject. That saves all the time of 'how do I start a letter to a new client', without giving up the human touch that decides a first contact.",
      color: "from-amber-600 to-orange-500",
      difficulty: "intermediate",
      beginner:
        "The hardest thing about reaching out to a new client is the blank page: what do you write? How do you open? Sailaco solves exactly that. For each business he finds, he already prepares a draft — 'Hi, I noticed your business has no website, I build sites for...'. You don't start from scratch; you get a ready starting point, review it, change what's needed, and send. That's the difference between 'I'll write outreach tomorrow' (which never happens) and ready outreach that just needs approval.",
      content: [
        "Lead-tailored outreach: not one-template-for-all, but text that references the specific business (sector, city, what it's missing)",
        "Short and human-voiced: an effective first outreach is short and direct — no AI-tells, no fluff",
        "Ready-to-edit: the draft is a starting point for Elad, not final text. He edits/approves/rejects",
        "Connects to [Hermes](/en/guide/hermes)/[Ranch](/en/guide/ranch) for content: when background material or richer marketing phrasing is needed, Sailaco delegates",
        "Every draft is attached to its lead in the digest — Elad sees 'business → draft' side by side",
        "Sending is a completely separate step (next section) — drafting is safe, sending is blocked",
      ],
      tips: [
        "Separate 'prepare outreach' (safe, automatic) from 'send outreach' (dangerous, needs approval). That's the boundary that protects your reputation",
        "A short first outreach wins. An agent that writes three inflated paragraphs hurts reply rates — aim the draft at 2-3 sharp sentences",
      ],
    },
    {
      id: "firewall",
      icon: ShieldCheck,
      title: "Firewall — sending only with human approval",
      subtitle: "Sailaco prepares everything; outreach goes out only after Elad clicks a button",
      description:
        "This is the section that turns Sailaco from 'dangerous' to 'safe'. All his safe actions — discovery, qualification, dedup, draft prep — run on their own. But the one action with an irreversible external consequence — sending outreach to a client — is blocked behind the [autonomy stack's Firewall](/en/guide/autonomy). Outreach goes out only after Elad approves it with one click. That way the agent does 100% of the worn-out work, but first contact with a client — which can damage reputation — stays under full human control.",
      color: "from-rose-600 to-red-500",
      difficulty: "intermediate",
      beginner:
        "Think of an assistant who prepares letters for your signature. They can write, look up addresses, put everything in envelopes — but you do the signing and sending. Why? Because a letter that goes out in your name to the wrong client, or with the wrong tone, can hurt you. Sailaco's Firewall is exactly that signature: all the prep is automatic, but the moment something goes out to a real client — that's where you approve. One click, and only then is it sent.",
      content: [
        "Safe actions (run on their own): discovery, dedup, qualification, draft prep, daily digest — none have an external consequence",
        "Blocked action: sending outreach to a client — a sales move with an irreversible consequence on reputation",
        "The mechanism: a ready outreach enters the [approval queue](/en/guide/autonomy); Elad approves/rejects with a click via the dashboard or the bot",
        "Batch approval: you can approve/reject several outreaches at once from the daily digest — fast and convenient from the phone",
        "Why it's critical here: sales spam burns reputation and can even violate anti-spam laws — so sending is the most important place for a human gate",
        "The same principle across the network: an action visible in the world (send, publish, payment) = firewall; an internal action = safe",
      ],
      tips: [
        "Sending is exactly the kind of action the Firewall was built for: irreversible, world-visible, and reputation-impacting. Never automate first contact with a client without a human gate",
        "Make approval fast (batch from the phone). If approving every outreach is cumbersome, you'll be tempted to open the gate — which is exactly the mistake it exists to prevent",
      ],
      codeExample: {
        label: "Sailaco's safety classification",
        code: 'SAFETY = {\n  "lead_intake":    "safe",     # discovery runs alone\n  "outreach_draft": "safe",     # draft prep is safe\n  "send_outreach":  "firewall", # sending waits for approval\n}\nif SAFETY[task.type] != "safe":\n    approvals.enqueue(task)       # Elad approves with a click',
      },
    },
    {
      id: "advanced",
      icon: Sparkles,
      title: "Integration — how to adopt a sales agent yourself",
      subtitle: "Start with discovery-only, add drafting and a send-gate gradually",
      description:
        "As in every guide — don't build the full Sailaco on day one. The order: first discovery+dedup (an agent that returns a clean lead list), then outreach drafting (as the list matures), and only then — wiring sending behind a Firewall. Sailaco sits on the [autonomy stack](/en/guide/autonomy) (as an endpoint), depends on [Kaylee](/en/guide/kaylee) for infra and [Hermes](/en/guide/hermes) for research, and is coordinated via the [network protocol](/en/guide/orchestration). He's the agent that turns 'I need to find clients' into 'here's a list ready for approval' — without risking the reputation.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      beginner:
        "The golden rule returns: don't build the whole sales agent on day one. Start with the simplest and safest thing — an agent that only finds businesses and returns a clean list (no duplicates). Only after that works, let it also prepare outreach drafts. And only at the end, when you trust it, wire in sending — but always behind approval. For me (Elad) Sailaco started as a simple lead scanner and gradually became a full sales assistant. Automatic sending behind a gate is the last thing, not the first.",
      content: [
        "Step 1 — discovery + dedup: an agent that returns a website-less business list cleaned of duplicates. That's the first, safe component",
        "Step 2 — city rotation: when one city is exhausted, add rotation for broad market coverage",
        "Step 3 — outreach draft: as the list matures, add outreach_draft — a ready-for-approval outreach per lead",
        "Step 4 — sending behind a Firewall: only when you trust the quality, wire sending — always via the [approval queue](/en/guide/autonomy)",
        "Infra: an endpoint in the [autonomy stack](/en/guide/autonomy), a standalone Telegram bot, depends on [Kaylee](/en/guide/kaylee)+[Hermes](/en/guide/hermes)",
        "Coordination: the delegation matrix ([network protocol](/en/guide/orchestration)) decides that sales→Sailaco, research→Hermes, content→Ranch",
      ],
      tips: [
        "The signal you're ready for a sales agent: you're already doing the search work manually, repeatedly and tediously, and it's blocking you from closing. That's the moment to delegate the top-of-funnel",
        "Never make the sending step fully automatic 'to save a click'. That click is the protection for your reputation — and it's far cheaper than the cost of spam",
      ],
    },
  ],
  resources: [
    {
      title: "The Autonomy Stack guide",
      description: "The Firewall behind which Sailaco's sending is blocked",
      href: "/en/guide/autonomy",
      icon: BookOpen,
    },
    {
      title: "The Orchestration guide",
      description: "The delegation matrix: who sells, who researches, who writes content",
      href: "/en/guide/orchestration",
      icon: BookOpen,
    },
    {
      title: "The Hermes guide",
      description: "The worker agent Sailaco delegates lead research to",
      href: "/en/guide/hermes",
      icon: BookOpen,
    },
    {
      title: "The Kaylee guide",
      description: "The infrastructure Sailaco runs on",
      href: "/en/guide/kaylee",
      icon: BookOpen,
    },
    {
      title: "Elad's network code",
      description: "Sales pipeline, city rotation, dedup and a send-gate",
      href: "https://github.com/eladjak",
      icon: Github,
    },
    {
      title: "Consultation — sales automation",
      description: "Want a sales assistant that does the worn-out work — safely?",
      href: "/en/contact",
      icon: Mail,
    },
  ],
  ctaTitle: "Delegate the worn-out sales work — without risking your reputation",
  ctaSub:
    "Automatic discovery, city rotation, dedup and outreach drafts. Sending always behind human approval. A sales assistant you can trust.",
  primaryCta: {
    label: "Start with autonomy",
    href: "/en/guide/autonomy",
    icon: Send,
  },
  secondaryCta: {
    label: "Book a consultation",
    href: "/en/contact",
    icon: Users,
  },
  authorBio:
    "I built Sailaco because the search-and-write-outreach work is the most worn-out — and the most dangerous to automate. The big lesson: you can delegate all of the top-of-funnel, but first contact with a client must stay behind human approval. Spam burns reputation faster than automation saves time.",
};
