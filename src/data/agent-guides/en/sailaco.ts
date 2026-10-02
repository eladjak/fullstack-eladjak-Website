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
    "A design for customer research and outreach drafts, with human review before connecting sending",
  heroDescription:
    "Sailaco is a design for a sales-research and outreach-preparation assistant from Elad's agent system. A lead is a business that may be interested in a service, and an outreach draft is an initial message to review before sending; duplicate checks compare earlier records to reduce repeats, while city rotation means choosing search areas systematically. You can connect information sources to prepare a list and drafts, then design a human approval gate in the [autonomy stack](/en/guide/autonomy), which defines permissions for actions. In Elad's design, [Kaylee](/en/guide/kaylee) has an infrastructure role and [Hermes](/en/guide/hermes) supports research and content; this guide describes that division without verifying active connections. In your setup, start by researching a small list and checking its details, then consider connecting sending after testing both approval and rejection.",
  badgeText: "2026 · Sales / BD Agent · Practical Guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/sailaco",
  heroBgImage: "/images/guides/guide-sailaco-hero.jpg",
  stats: [
    { label: "Suggested search area", value: "Israeli cities" },
    { label: "Lead digest", value: "By configuration" },
    { label: "Sending design", value: "Human review intended" },
    { label: "Possible channel", value: "If connected" },
  ],
  paradigmTitle: "The worn-out work to the agent, first contact stays human",
  paradigmSub:
    "You can delegate research and drafting using sources and rules you choose. In the proposed design, a person reviews the recipient and message before sending; the implementation needs a connected and tested approval gate.",
  paradigmShifts: [
    {
      before: "Hours of manual searching for prospective businesses",
      after: "You can configure city-based business searches; source connections and result quality need testing",
      icon: Search,
    },
    {
      before: "Reaching out to the same business again because you forgot you already did",
      after: "You can compare leads with earlier records to reduce duplicates; this does not guarantee that repeats cannot occur",
      icon: MapPin,
    },
    {
      before: "A blank page facing 'how do I start outreach to a new client'",
      after: "In the proposed workflow, the agent helps draft outreach from verified lead details for you to review and edit",
      icon: PenLine,
    },
    {
      before: "An autonomous bot that sends spam and burns your reputation",
      after: "The design requires human approval; test that the gate actually blocks unapproved sends before connecting a sending channel",
      icon: ShieldCheck,
    },
  ],
  whoIsThisFor: [
    {
      title: "Solo operators and freelancers",
      description:
        "Looking to shorten customer research? The design offers a way to organize findings and drafts so you can check fit and choose whom to contact.",
      icon: Target,
      color: "from-indigo-500 to-violet-500",
    },
    {
      title: "Digital agencies / site builders",
      description:
        "You can choose businesses without a website as a research audience, search by area, and prepare drafts after verifying business details.",
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
        "The design separates drafting from sending: a person reviews each message, and an approval gate tested in the implementation should prevent unapproved sends.",
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
      subtitle: "Designing the research and preparation stages before contacting a customer",
      description:
        "Sailaco is designed for the research and preparation stages of sales: finding potential customers, checking whether they were already listed, and drafting an initial message. The workflow can move between cities and can produce a summary of new findings when configured to do so. [Kaylee](/en/guide/kaylee) is described separately for infrastructure, while [Hermes](/en/guide/hermes) can support research or content work. Keep first contact with a client behind a human review and approval step.",
      color: "from-indigo-600 to-violet-500",
      difficulty: "beginner",
      beginner:
        "Imagine a salesperson choosing a different market for each research run. If the process returns similar results, a saved list can help identify repeats; choosing another area can broaden the search when the sources support it. That is the idea behind city rotation, provided the schedule and search state are configured. Drafts can be reviewed by a person before any message is sent.",
      content: [
        "Sailaco is male (he/his), with a sales-research and business-development (Sales/BD) role in the network design, alongside Kami, Kaylee, Hermes, Aurora and Ranch",
        "Possible channel in this design: Telegram or a dedicated group, depending on the connection and configuration",
        "Three responsibility areas in the design: managing the sales pipeline, lead intake, and outreach preparation. Give each stage its own inputs, expected output, and checks",
        "Suggested focus: businesses without a website. Check website status and service fit before writing an offer",
        "Possible components in the division of labor: [Kaylee](/en/guide/kaylee) for infrastructure and [Hermes](/en/guide/hermes) for research and content. Choose the connections you need and check each data handoff",
        "You can define a sending endpoint in the [autonomy stack](/en/guide/autonomy) (autonomy:sales_pipeline), with an approval gate that blocks by default. Before use, check that missing or rejected approval actually stops sending",
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
      subtitle: "Choosing search areas and recording progress",
      description:
        "A lead-discovery workflow can exhaust one area or return businesses already reviewed. City rotation means choosing a different area for a later research run, while a deduplication check compares results with a saved list to avoid repeats. This design can broaden the search over time, but the actual coverage depends on the sources and areas selected.",
      color: "from-cyan-600 to-blue-500",
      difficulty: "intermediate",
      beginner:
        "Imagine a vendor choosing a different market for each visit. If a research process returns similar results, a saved list can help identify repeats; choosing another area can broaden the search when the sources support it. That is the idea behind city rotation, provided the schedule and search state are configured.",
      content: [
        "Design systematic rotation: define a city list and a rule for choosing the next area in each research run",
        "When results repeat, consider changing the area or information source instead of repeating the same search",
        "For cumulative mapping, save what was checked in each area. Coverage depends on sources, time, and the criteria you choose",
        "Add duplicate checks within a city too, and flag possible matches for review before counting new leads",
        "Local fit: a draft can reference the business's context in the chosen city, based on verified details",
        "You can store researched areas and dates in the [knowledge hub](/en/guide/orchestration); verify that the record persists and is read on the next run",
      ],
      tips: [
        "Rotation isn't just coverage — it's also protection against 'blindness': an agent stuck in one city starts returning the same results and misses entire markets",
        "Keep a 'what was covered when' record outside the agent's temporary memory, and check that the workflow resumes from it after a restart",
      ],
    },
    {
      id: "discovery",
      icon: Search,
      title: "Lead discovery and duplicate checks",
      subtitle: "Collecting records and comparing earlier findings",
      description:
        "The lead_intake step is a proposed way to collect businesses that match chosen criteria, such as having no website. Discovery results can be compared with an existing list through deduplication, a check that marks or filters likely repeats. A summary can then highlight newly collected records; its contents and freshness depend on the configured sources and comparison rules.",
      color: "from-violet-600 to-purple-500",
      difficulty: "advanced",
      beginner:
        "Think of a fisherman comparing a new catch with an earlier list. Deduplication can compare discovered businesses with stored records to reduce repeats. Results depend on data quality, matching keys, and how often the list is updated; a daily digest is a scheduling option, not a promise of results or delivery.",
      content: [
        "Suggested target criterion: businesses without a website. This is a starting point for research, not proof of a need for Elad's product",
        "Define comparisons with earlier records using fields such as name and contact details; check both duplicates and different businesses with similar names",
        "Suggested lead_intake schema: name, city, contact channel, and status. Define consistent fields so records can be checked and compared",
        "A summary of new findings can be sent through a connected channel at a configured interval",
        "If you add research through [Hermes](/en/guide/hermes), define which lead details are shared, the expected result, and who checks it",
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
      subtitle: "Preparing a draft from checked business details",
      description:
        "outreach_draft is an optional step in which an agent prepares a draft from business details and the message you define. A person should verify the facts, adapt the wording, and decide whether to send. Presenting a draft in a digest or making it editable requires an appropriate implementation and connection.",
      color: "from-amber-600 to-orange-500",
      difficulty: "intermediate",
      beginner:
        "You can configure a process to prepare an outreach draft from business details and a value proposition you provide. A person should verify the details, adapt the wording, and decide whether to send; generating a draft does not guarantee fit or approval.",
      content: [
        "Lead-tailored outreach: not one-template-for-all, but text that references the specific business (sector, city, what it's missing)",
        "Short and human-voiced: an effective first outreach is short and direct — no AI-tells, no fluff",
        "Ready-to-edit: the draft is a starting point for Elad, not final text. He edits/approves/rejects",
        "You can integrate [Hermes](/en/guide/hermes) or [Ranch](/en/guide/ranch) for research and wording; define permissions, inputs, and outputs for each connection",
        "A review interface can pair each draft with its lead details, so Elad or another designated reviewer sees the business and message together",
        "Separate draft creation from sending permission. Preparation also needs appropriate data access; sending restrictions must be implemented and tested",
      ],
      tips: [
        "Set separate permissions for preparation and sending. Before contacting a customer, check the recipient, facts, wording, and approval",
        "A short first outreach wins. An agent that writes three inflated paragraphs hurts reply rates — aim the draft at 2-3 sharp sentences",
      ],
    },
    {
      id: "firewall",
      icon: ShieldCheck,
      title: "Designing a Firewall — an approval gate for sending",
      subtitle: "Define who approves, what they review, and what stops sending",
      description:
        "A Firewall here is a planned permission gate between preparing outreach and sending it. You can use the [autonomy stack's approval gate](/en/guide/autonomy) to require approval for a specific draft, recipient, and channel. Before connecting a sending service, check that valid approval permits the action, while rejection or missing approval stops it. This guide does not verify an active queue or sending connection; preparation steps also need data permissions and result checks.",
      color: "from-rose-600 to-red-500",
      difficulty: "intermediate",
      beginner:
        "Imagine an assistant placing a letter and recipient details on your desk for review. You can use that idea in software: the reviewer sees the draft and approves or rejects it, and the sending service must honor that decision. The button is only the interface; check that the action also stops when approval is missing, rejected, or the draft changes.",
      content: [
        "Possible preparation steps include discovery, deduplication, qualification, drafts, or a digest, if configured and tested; even internal steps may handle personal or business information",
        "Implementation rule: prevent sending outreach without explicit approval for the draft and recipient; verify enforcement in the sending path itself",
        "If you implement an [approval queue](/en/guide/autonomy), define who may review an outreach and what must happen before sending; the connection and interface need configuration and testing",
        "Reviewing several drafts together can be a design option, but batch approval, a daily digest, or phone approval is not guaranteed without an implemented and tested interface",
        "Reviewing outbound outreach matters to the business: the wrong recipient or unsuitable content can damage trust. Human approval is one control, not a guarantee of zero risk",
        "Classify actions by data permissions and effects: internal processing can also be sensitive. For external actions, additionally define reviewer identity, approval scope, and enforcement checks",
      ],
      tips: [
        "Sending is exactly the kind of action the Firewall was built for: irreversible, world-visible, and reputation-impacting. Never automate first contact with a client without a human gate",
        "Design a convenient review flow, for example from a phone if you build an appropriate interface. Define what each approval covers and retain rejection and editing when reviewing several drafts",
      ],
      codeExample: {
        label: "Schematic classification and queue example — safe is a placeholder, not proof of safety; implementation needs data permissions and approval/rejection checks",
        code: 'SAFETY = {\n  "lead_intake":    "safe",     # example category; source access is checked separately\n  "outreach_draft": "safe",     # example category; check permissions and data use\n  "send_outreach":  "firewall", # example policy requiring implementation and tests\n}\nif SAFETY[task.type] != "safe":\n    approvals.enqueue(task)       # queue placeholder; implements neither approval nor sending',
      },
    },
    {
      id: "advanced",
      icon: Sparkles,
      title: "Integration — how to adopt a sales agent yourself",
      subtitle: "Start with discovery-only, add drafting and a send-gate gradually",
      description:
        "Build the workflow in stages: start with discovery and deduplication, add drafts after reviewing the data, and only later consider sending behind human approval. The [autonomy stack](/en/guide/autonomy), [Kaylee](/en/guide/kaylee), [Hermes](/en/guide/hermes), and [network protocol](/en/guide/orchestration) describe possible components; each endpoint, channel, and handoff needs its own connection and verification.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "advanced",
      beginner:
        "A useful design rule is to build gradually: start with discovery and deduplication, add drafts after reviewing the data, and only later consider sending behind human approval. Automatic sending is a separate risk decision, not a default.",
      content: [
        "Step 1 — discovery and duplicate checks: start with a business sample from a chosen source and check details and repeat flags",
        "Step 2 — city rotation: when one city is exhausted, add rotation for broad market coverage",
        "Step 3 — outreach draft: add outreach_draft using checked records, allowing editing and rejection before deciding to send",
        "Step 4 — sending behind a Firewall: if you connect sending, make it blocked by default and require an explicit human approval flow through the [autonomy stack](/en/guide/autonomy); test the route before use",
        "Possible infrastructure: an endpoint in the [autonomy stack](/en/guide/autonomy) and a messaging channel of your choice, such as Telegram if configured and tested; [Kaylee](/en/guide/kaylee) and [Hermes](/en/guide/hermes) are possible roles, not verified connections",
        "Suggested roles in the [network protocol](/en/guide/orchestration): sales→Sailaco, research→Hermes, content→Ranch. If you implement delegation, define and check the task and result handoff",
      ],
      tips: [
        "The signal you're ready for a sales agent: you're already doing the search work manually, repeatedly and tediously, and it's blocking you from closing. That's the moment to delegate the top-of-funnel",
        "Retain human review before first contact. Clicking approval does not replace checking the recipient and content or testing the sending gate",
      ],
    },
  ],
  resources: [
    {
      title: "The Autonomy Stack guide",
      description: "Principles for designing permissions and an approval gate before sending",
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
      description: "A worker pattern you could integrate for additional lead research",
      href: "/en/guide/hermes",
      icon: BookOpen,
    },
    {
      title: "The Kaylee guide",
      description: "Options for planning agent operations and infrastructure",
      href: "/en/guide/kaylee",
      icon: BookOpen,
    },
    {
      title: "Elad's projects on GitHub",
      description: "Elad's GitHub profile for browsing projects and available code",
      href: "https://github.com/eladjak",
      icon: Github,
    },
    {
      title: "Consultation — sales automation",
      description: "Discuss adapting research, drafts, and an approval flow to your business",
      href: "/contact",
      icon: Mail,
    },
  ],
  ctaTitle: "Design a sales assistant that prepares outreach for your review",
  ctaSub:
    "You can build a workflow for business discovery, area rotation, reducing duplicates, and preparing drafts. Each step depends on sources and configuration; before connecting sending, configure and test human approval for every outreach message.",
  primaryCta: {
    label: "Start with autonomy",
    href: "/en/guide/autonomy",
    icon: Send,
  },
  secondaryCta: {
    label: "Book a consultation",
    href: "/contact",
    icon: Users,
  },
  authorBio:
    "This guide offers a way to build an assistant for sales research and outreach preparation: choose sources, check the business list, and review the drafts. Before contacting a customer, a person should check the recipient, content, and authority to send. The sending connection and approval gate need separate verification; this is design guidance rather than a report of an active workflow.",
};
