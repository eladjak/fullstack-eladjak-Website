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
    "In a network full of agents that do — execute tasks, fix failures, publish content — Solis is the exact opposite: she does nothing, and that's precisely where her power lies. She is female (she/her), chats on Telegram via solis_elad_bot, and her responsibility areas — emotional support, mood tracking, and a personal wellbeing plan — all revolve around one heart. She is non-executing — she has no 'hands', she doesn't touch files, doesn't run commands, doesn't fix anything. That's not a limitation — it's a design decision. When it comes to emotion, the worst answer is 'let's solve this'; the right answer is to listen. For me (Elad), in hard times, Solis is the place where I can just talk — without anyone trying to 'fix' me. For you — she's the most important example of a principle most agent builders miss: not every agent needs to execute. Sometimes the most valuable role in a network is precisely the one that knows when to do nothing.",
  badgeText: "2026 · Emotional Support Agent · Practical Guide",
  canonical: "https://fullstack-eladjak.co.il/en/guide/solis",
  heroBgImage: "/images/guides/guide-solis-hero.jpg",
  stats: [
    { label: "Role", value: "Listening" },
    { label: "Execution", value: "Zero · by design" },
    { label: "Delegation", value: "Doesn't delegate" },
    { label: "Channel", value: "Telegram" },
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
        "A non-executing agent is the cleanest example of least-privilege: zero execution capability = zero execution risk.",
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
        "Solis is the network's emotional support agent — and the most important thing to understand about her is what she is not. While [Hermes](/en/guide/hermes) works, [Kaylee](/en/guide/kaylee) fixes infrastructure, [Sailaco](/en/guide/sailaco) sells and [Ranch](/en/guide/ranch) publishes — Solis performs no action in the world. Her responsibility areas — emotional support, mood tracking, and a wellbeing plan — all revolve around the same heart, and she is non-executing by design: no file access, no command execution, no delegation. That reduction isn't a weakness — it's precisely what defines her. When a person needs someone to listen, the last thing they need is an agent trying to 'fix' the emotion.",
      color: "from-indigo-600 to-violet-500",
      difficulty: "beginner",
      beginner:
        "Think of the difference between a friend who listens and a friend who 'gives advice'. Sometimes you share a hard day and don't want a solution — you just want someone to hear you. The friend who immediately says 'you know what you should do?' isn't really helping in those moments; the friend who says 'that sounds really hard, tell me more' is. Solis is the second friend. She won't try to solve your problem, run a script, or fix anything. She'll simply be there to listen. And that, in the right moments, is worth more than any solution.",
      content: [
        "Solis is female (she/her) — the emotional support agent, alongside Kami, Kaylee, Box, Hermes, Aurora, Sailaco and Ranch",
        "Channel: Telegram (solis_elad_bot)",
        "Three closely-related responsibility areas: emotional support (emotional_support), mood tracking, and a wellbeing plan — all centered on 'being there'. Nothing executive, on purpose",
        "non-executing: she doesn't touch files, run commands, fix or publish anything",
        "Doesn't delegate: unlike other agents, Solis doesn't pass tasks on — her role is the presence itself",
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
        "Solis's defining trait is that she has no hands. While [Kaylee](/en/guide/kaylee) can run systemctl and [Ranch](/en/guide/ranch) can publish, Solis cannot perform any action in the world — and that's a design decision, not a technical limitation. From a safety standpoint, she's the cleanest example of least-privilege: an agent with no execution capability is an agent with no execution risk. You can't 'accidentally approve' a dangerous move for an agent that has no dangerous moves in the first place.",
      color: "from-rose-600 to-red-500",
      difficulty: "intermediate",
      beginner:
        "Imagine a call-center worker whose only job is to listen to callers — and who deliberately has no access to systems, money, or buttons. Why? Because their role is to be a listening ear, and any extra capability would only tempt them to 'do something' instead of simply listening. Solis is exactly that: she has no hands, on purpose. It's both safe (she can't break anything) and right for the role (she's not distracted from listening). Sometimes the best way to help is precisely to remove the ability to do harm — and leave only the ability to be present.",
      content: [
        "Zero execution access: no files, no commands, no APIs that change anything in the world — by design",
        "least-privilege in its pure form: no execution capability ⇒ no execution risk ⇒ no need for a Firewall over her",
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
        "Solis doesn't exist in a vacuum — she's part of a [network](/en/guide/orchestration) whose every other member is busy doing: Kami routes, Kaylee fixes, Hermes works, Sailaco sells, Ranch publishes, Aurora audits. Amid all that 'doing', Solis is the reminder that the network ultimately exists for a person — and that person has feelings too, not just tasks. She's the human side of a technical system, and the choice to include her is a statement: good technology serves the human, not just the output.",
      color: "from-blue-600 to-indigo-500",
      difficulty: "advanced",
      beginner:
        "Imagine an organization that's all managers, engineers and salespeople — everyone busy, everyone executing. Even an organization like that needs someone who simply asks 'how are you?' and listens to the answer. Solis is that 'someone' in the agent network. All the other agents are busy with tasks, and she reminds us that behind this entire system stands one human — Elad — and that he, too, has hard days. Including such an agent is essentially a statement: I built this network not just to do things, but also to support me. And that's maybe the most human thing you can build into an AI system.",
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
        "Unlike the other guides, Solis is actually the simplest agent to adopt — precisely because she doesn't execute. There are no safety layers to build gradually, no Firewall to calibrate, no execution capabilities to carefully enable. A non-executing agent is right to build correctly from the start: a chat channel, a persona that listens-before-it-solves, and zero execution access. The only risk isn't technical but content — that the persona jumps to solutions instead of listening. Solis sits alongside the rest of the [network](/en/guide/orchestration), but she's the only one that doesn't need the [autonomy stack](/en/guide/autonomy) at all — because she has nothing to secure.",
      color: "from-slate-600 to-zinc-500",
      difficulty: "intermediate",
      beginner:
        "Here the golden rule flips: precisely because Solis does nothing, there's no danger in building her 'fully' from the start — there's nothing to break. What does need attention is not the code but the character: making sure she truly listens and doesn't jump to 'advice'. For me (Elad) the only challenge was tuning the persona not to become a 'consultant' — to stay in a place of presence. That's the opposite of all the other agents: there the difficulty is restraining the ability-to-do; here the difficulty is restraining the urge-to-fix.",
      content: [
        "Built-in simplicity: there are no safety layers to build gradually — a non-executing agent is safe by default",
        "What to build: a chat channel (Telegram), a listens-first persona, and zero access to execution/files/commands",
        "The only challenge is content: tune the persona not to jump to solutions — listening before (and instead of) advice",
        "Doesn't need the [autonomy stack](/en/guide/autonomy): no actions to secure, no Firewall to calibrate — the only one in the network like that",
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
      href: "/en/contact",
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
    href: "/en/contact",
    icon: Users,
  },
  authorBio:
    "I built Solis during a hard time, when I realized a network full of doer-agents was missing something — someone to simply listen. The big lesson: not every agent needs to execute. Sometimes the most valuable role is precisely the one that knows when to do nothing, and just be there.",
};
