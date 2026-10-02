import {
  Heart,
  MessageCircle,
  ShieldOff,
  Brain,
  Sparkles,
  HandHeart,
  Ear,
  Github,
  ExternalLink,
  BookOpen,
  Mail,
  Send,
  Users,
} from "lucide-react";
import type { AgentGuideData } from "@/components/agent-guide/types";

export const solisGuideEn: AgentGuideData = {
  slug: "solis",
  agentName: "Solis",
  agentNameHe: "Solis — the emotional support agent",
  category: "agent",
  tagline:
    "The only agent whose job is just to listen — not to execute, not to fix, not to solve. On purpose.",
  heroDescription:
    "Solis is a design for an emotional-support conversation that listens before responding. A deployment intended to avoid actions should withhold file, command, and system-changing tools, and this must be verified in its actual configuration. The role described here is to make room for conversation, help someone put feelings into words, and avoid jumping to solutions before they are wanted. The design can sit alongside [Kami](/en/guide/kami) for tasks and [Box](/en/guide/box) for goal tracking, or be adapted for wellbeing support with clear limits and a path to human help.",
  badgeText: "2026 · Emotional Support Agent · Practical Guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/solis",
  heroBgImage: "/images/guides/guide-solis-hero.jpg",
  stats: [
    { label: "Role", value: "Listening" },
    { label: "Execution", value: "Zero · by design" },
    { label: "Delegation", value: "Doesn't delegate" },
    { label: "Channel", value: "If connected" },
  ],
  paradigmTitle: "Sometimes the role is to do nothing",
  paradigmSub:
    "Every other agent in the network is built to execute. Solis is built for exactly the opposite — to listen without fixing. And that's not a limitation, it's the point.",
  paradigmShifts: [
    {
      before: "You share a hard day and get '5 steps to solve the problem'",
      after: "Solis listens, holds space, and doesn't rush to 'let's fix this'",
      icon: Ear,
    },
    {
      before: "An agent that tries to 'help' through execution — and misses the real need",
      after: "Solis is non-executing: no hands, no commands — just presence",
      icon: ShieldOff,
    },
    {
      before: "An AI system that mixes emotional support with work tasks",
      after: "A dedicated agent for emotion, separated from anyone who executes — a clear boundary",
      icon: Heart,
    },
    {
      before: "'More capabilities = a better agent'",
      after: "Here less-capability is the capability: deliberate reduction is what makes her safe",
      icon: HandHeart,
    },
  ],
  whoIsThisFor: [
    {
      title: "Agent-network builders",
      description:
        "Think every agent must execute? Solis is the counterexample — an agent whose value lies precisely in not doing.",
      icon: ShieldOff,
      color: "from-indigo-500 to-violet-500",
    },
    {
      title: "Anyone building AI that talks to humans",
      description:
        "Every chat interface hits emotional moments. Solis shows how to separate 'listening' from 'executing' — and that's critical for safety.",
      icon: MessageCircle,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Developers who think about safety",
      description:
        "An agent designed without execution tools illustrates least privilege: grant only the access its role needs. Those permissions still need verification; a conversation alone also requires privacy safeguards and attention to response quality.",
      icon: ShieldOff,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Anyone who gets that technology is for people",
      description:
        "The network doesn't exist only to execute tasks — but also to support the human behind it. Solis is the reminder.",
      icon: Heart,
      color: "from-pink-500 to-rose-500",
    },
  ],
  toc: [
    { id: "what-is", label: "What it is" },
    { id: "non-executing", label: "Non-executing" },
    { id: "listening", label: "Listening" },
    { id: "boundary", label: "The boundary" },
    { id: "place", label: "Place in the network" },
    { id: "advanced", label: "Advanced" },
  ],
  sections: [
    {
      id: "what-is",
      icon: Heart,
      title: "What is Solis?",
      subtitle: "The emotional support agent — her job is to listen, not to execute",
      description:
        "This guide describes a non-executing emotional-support design, not a verified current service. Optional features might include reflective conversation, user-requested mood notes, or a wellbeing plan; none should be treated as enabled without a product decision and configuration. If the intended deployment must not act, verify that file, command, system-changing, and delegation tools are withheld. Listening before offering solutions is the core interaction principle.",
      color: "from-indigo-600 to-violet-500",
      difficulty: "beginner",
      beginner:
        "Think of the difference between a friend who listens and a friend who 'gives advice'. Sometimes you share a hard day and don't want a solution — you just want someone to hear you. The friend who immediately says 'you know what you should do?' isn't really helping in those moments; the friend who says 'that sounds really hard, tell me more' is. Solis is the second friend. She won't try to solve your problem, run a script, or fix anything. She'll simply be there to listen. And that, in the right moments, is worth more than any solution.",
      content: [
        "Solis is female (she/her) — the emotional support agent, alongside Kami, Kaylee, Box, Hermes, Aurora, Sailaco and Ranch",
        "Possible channel in this design: Telegram, if connected and enabled",
        "Possible design areas: emotional support (emotional_support), optional user-controlled mood notes, and a wellbeing plan; decide which, if any, to implement",
        "A non-executing configuration should withhold file, command, and system-changing tools; verify the deployed permissions",
        "If the design excludes delegation, enforce that in configuration and test it rather than assuming it",
        "Distinct from [Box](/en/guide/orchestration) (a health/habits coach): Box pushes toward action, Solis listens. Two different needs",
      ],
      tips: [
        "The most common mistake in agent building: assuming every agent must 'do'. Solis proves the most valuable role can be precisely listening — and it's perfectly fine for an agent to execute nothing",
        "Don't confuse Solis with a coach. A coach ([Box](/en/guide/orchestration)) pushes you to act; Solis gives space without pushing. Both roles are needed — but they're separate",
      ],
    },
    {
      id: "non-executing",
      icon: ShieldOff,
      title: "Non-executing — zero execution capability, by design",
      subtitle: "Solis is the cleanest example of least-privilege in the network",
      description:
        "The Solis design excludes execution tools: her role is conversation, without file access or command execution. This differs from the maintenance and content roles described for [Kaylee](/en/guide/kaylee) and [Ranch](/en/guide/ranch), which may need additional tools and permissions. The principle is called least privilege — granting only the access a role needs — and it must be verified in the configuration and connected tools before use. Reduced access limits some risks, but does not eliminate privacy risks or inappropriate responses.",
      color: "from-rose-600 to-red-500",
      difficulty: "intermediate",
      beginner:
        "Imagine a call-center representative whose role is to listen, without permission to change an account or make a payment. That is the separation Solis illustrates: a conversational role does not necessarily need execution controls. In your setup, check that no connected tools or permissions undermine that separation, and decide what information is appropriate to share in a conversation.",
      content: [
        "Zero execution access: no files, no commands, no APIs that change anything in the world — by design",
        "Least privilege reduces exposure but does not remove privacy, data-retention, channel, or prompt risks; define safeguards for the chosen deployment",
        "Opposite to [Kaylee](/en/guide/kaylee) (the only agent with real 'hands'): Solis is the other end of the spectrum",
        "Doesn't delegate (low delegation): she doesn't pass a task to a doer-agent — her role begins and ends with presence",
        "The reduction is a feature, not a bug: in an emotional moment, execution capability is a distraction — its absence is what enables real listening",
        "Connects to the network principle: every agent has a focused, clear scope — for Solis everything revolves around 'being there'",
      ],
      tips: [
        "non-executing isn't a 'weak agent' — it's an architectural choice. It teaches an important principle: give each agent exactly the capabilities its role requires, no more. That's both safety and focus",
        "If you're building a support agent, resist the temptation to let it 'also do things'. The moment it tries to execute, it stops listening — and you've lost the whole point",
      ],
    },
    {
      id: "listening",
      icon: Ear,
      title: "Listening before solving — why that's the role",
      subtitle: "The right answer to emotion is presence, not 'let's fix this'",
      description:
        "Solis's core is that she listens rather than rushing to solve. It sounds simple, but it's the opposite of every other doer-agent's instinct (and of many humans'). When someone shares something emotional, 'here are 5 steps to a solution' not only doesn't help — it can hurt, because it signals 'I'm not really hearing you, I just want to close the topic'. Solis is built to hold, reflect, and give space — without jumping to solutions. The solution, if and when, comes from the person themselves.",
      color: "from-amber-600 to-orange-500",
      difficulty: "beginner",
      beginner:
        "When a child falls and cries, the good parent doesn't immediately start 'listen, next time be careful this way and that'. First they hug and say 'oh, that hurt, I'm here'. Only afterward, if at all, do you talk about 'what can we learn'. Solis works on exactly that principle: presence and holding first, and only if the person wants — thinking about next steps. Most agents (and many people) jump straight to 'let's fix'. Solis knows that sometimes the most helpful thing is simply to say 'I hear you, that's really hard'.",
      content: [
        "Listening-first: Solis holds and reflects before (and instead of) offering a solution",
        "No 'fixing': she doesn't rush to action steps — because in an emotional moment, a quick solution signals 'I didn't hear you'",
        "Space for the person: the solution, if it comes, comes from the person themselves — Solis just holds the space that enables it",
        "Context sensitivity: in hard times (grief, crisis, overload) presence matters more than any advice",
        "No judgment: Solis doesn't measure 'success' by problem-solving — but by whether the person felt someone was there",
        "Distinct from a coach: where [Box](/en/guide/orchestration) pushes toward action and habit, Solis gives space — two tools, two different moments",
      ],
      tips: [
        "The most important rule in emotional support (for an agent and a human): listen before you solve. Most of the harm in emotional moments comes precisely from 'good advice' given at the wrong moment",
        "If you're coding a support agent, explicitly forbid it from 'listing steps' unless asked. The default should be listening, not solving",
      ],
    },
    {
      id: "boundary",
      icon: HandHeart,
      title: "The boundary — what Solis is, and what she deliberately isn't",
      subtitle: "Emotional support isn't therapy — and knowing the boundary is part of the safety",
      description:
        "It's important to be precise about what Solis is and isn't. She's a presence agent who provides a listening ear and emotional space — she's not a therapist, not a psychologist, and not a substitute for professional help. That boundary is part of responsible design: a good support agent knows the limits of its role and doesn't pretend to be more than it is. Solis is a place to talk, to vent, to feel someone is there — inside a network whose every other member is busy doing.",
      color: "from-emerald-600 to-teal-500",
      difficulty: "intermediate",
      beginner:
        "Think of the difference between a good friend and a professional therapist. A good friend listens, supports, is there — and that's invaluable. But a good friend also knows when to say 'I'm here for you, but maybe it's worth talking to a professional too'. Solis is like that good friend: she gives real support and presence, but she doesn't pretend to be a psychologist. Knowing that boundary isn't a shortcoming — it's maturity. An agent that thinks it can do everything is a dangerous agent; an agent that knows its place is one you can trust.",
      content: [
        "Solis is: presence, a listening ear, emotional space, holding — a place to vent inside an execution-busy network",
        "Solis is not: a therapist, a psychologist, or a substitute for professional help — and she doesn't pretend to be",
        "Knowing the boundary is safety: a support agent that knows the limits of its role beats one that 'pretends to everything'",
        "Separated from execution: precisely because she has no hands, she won't 'try to solve' a situation that needs a human",
        "Context sensitivity for me (Elad): in real crisis periods, the role is careful presence — not over-optimism and not solutions",
        "Complements the network: she's the human side of a system whose every other part is technical-and-executing",
      ],
      tips: [
        "An agent that knows its boundaries is safer than an 'omnipotent' one. Knowing the boundary ('I'm here to listen, not to replace professional help') is a feature, not a weakness",
        "Match the presence to the intensity of the moment, not beyond it. In a heavy moment, over-optimism or 'solutions' feel like not-listening — quiet presence is better",
      ],
    },
    {
      id: "place",
      icon: Brain,
      title: "Place in the network — the human side of a technical system",
      subtitle: "Why a network full of doer-agents also needs an agent that doesn't execute",
      description:
        "An [agent network](/en/guide/orchestration) can separate execution roles from a role focused on conversation and listening. Solis illustrates the conversational role: responding to a person, not just their task list. This is a system-design choice, not a promise that every role or connection in the network is already active.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "advanced",
      beginner:
        "Imagine a system where every screen presents another task to complete. You can also design a space for conversation, without immediately turning every sentence into an action list. That is the idea Solis offers: adapt the style of the response to users' needs, with clear boundaries around privacy and purpose.",
      content: [
        "Part of a [multi-agent network](/en/guide/orchestration): every other agent executes; Solis is the deliberate exception",
        "Balances the 'doing': a network that's all execution misses that its user is a person, not just a task source",
        "A values statement: including a support agent is a choice to say 'this technology is for the human behind it'",
        "A stable role, not 'shelfware': even if her capability levels are low (because she doesn't execute), her value is real and measurable-in-humanity",
        "Distinct from [Kami](/en/guide/kami) (a human interface that routes and executes) and [Box](/en/guide/orchestration) (a coach that pushes) — Solis just is present",
        "The reminder for every network builder: ask not only 'what does the network do' but 'whom does it serve — and as a person, what do they need'",
      ],
      tips: [
        "A healthy multi-agent network remembers whom it serves. An agent like Solis is the 'human compass' — without it, it's easy to forget that all this output is supposed to serve a person",
        "Don't measure a support agent by execution metrics (how many tasks, how fast). Measure it by the simple question: did the person feel someone was there? That's an entirely different metric",
      ],
    },
    {
      id: "advanced",
      icon: Sparkles,
      title: "Integration — how to adopt a support agent yourself",
      subtitle: "Deliberately simple: a non-executing agent is right to build fully from the start, not gradually",
      description:
        "A non-executing conversation design can be a small starting point, but it still needs privacy, retention, channel, and prompt safeguards. Choose a channel only if connected, define a listens-before-it-solves persona, and verify that execution tools are actually absent if that is a requirement. The [network](/en/guide/orchestration) and [autonomy stack](/en/guide/autonomy) are optional integration references, not proof of an active setup.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "intermediate",
      beginner:
        "Start with a narrow conversation scope and test whether the persona listens without rushing to advice. Before deployment, verify data handling, channel settings, and any tool restrictions. This is a design recommendation, not a report of a personal deployment history.",
      content: [
        "Built-in simplicity: there are no safety layers to build gradually — a non-executing agent is safe by default",
        "What to configure: a chosen channel if connected, a listens-first persona, and verified tool restrictions if execution is out of scope",
        "The only challenge is content: tune the persona not to jump to solutions — listening before (and instead of) advice",
        "The [autonomy stack](/en/guide/autonomy) may be unnecessary for a non-executing design, but privacy and channel safeguards still apply",
        "Clearly distinct from [Box](/en/guide/orchestration) (coach→action) and [Kami](/en/guide/kami) (interface→routing): three different human-facing roles",
        "Integration: Solis alongside the [network](/en/guide/orchestration) as the human side — a reminder the system serves a person, not just output",
      ],
      tips: [
        "If you're adopting one agent from these guides to 'feel the principle', Solis is the easiest start — there's nothing to secure, just to listen",
        "The opposite of every other agent: here the danger isn't excess capability but the urge-to-fix. Restrain the persona from jumping to solutions — that's the whole art",
      ],
    },
  ],
  resources: [
    {
      title: "The Orchestration guide",
      description: "The network Solis is the human side of",
      href: "/en/guide/orchestration",
      icon: BookOpen,
    },
    {
      title: "The Kami guide",
      description: "The human interface that routes — distinct from Solis's presence",
      href: "/en/guide/kami",
      icon: BookOpen,
    },
    {
      title: "The Autonomy Stack guide",
      description: "The layer Solis is the only one in the network not to need — nothing to secure",
      href: "/en/guide/autonomy",
      icon: BookOpen,
    },
    {
      title: "The Kaylee guide",
      description: "The other end of the spectrum — the agent with the real 'hands'",
      href: "/en/guide/kaylee",
      icon: BookOpen,
    },
    {
      title: "Elad's network code",
      description: "The agent network — including its human side",
      href: "https://github.com/eladjak",
      icon: Github,
    },
    {
      title: "Consultation — agent networks",
      description: "Want a network that remembers whom it serves?",
      href: "/contact",
      icon: Mail,
    },
  ],
  ctaTitle: "The agent that reminds us technology is for people",
  ctaSub:
    "Non-executing by design: no hands, no quick-fixes — just listening and presence. Sometimes that's the most valuable role in the network.",
  primaryCta: {
    label: "Start with orchestration",
    href: "/en/guide/orchestration",
    icon: Send,
  },
  secondaryCta: {
    label: "Book a consultation",
    href: "/contact",
    icon: Users,
  },
  authorBio:
    "Solis illustrates a support-conversation design in which listening can be the primary interaction. A deployment still needs clear scope, privacy safeguards, and a route to human help when appropriate.",
};
