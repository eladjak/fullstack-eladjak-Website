import type { LucideIcon } from "lucide-react";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface GuideSection {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  color: string; // tailwind gradient e.g. "from-violet-600 to-purple-500"
  difficulty: Difficulty;
  content: string[];
  beginner?: string;
  tips?: string[];
  codeExample?: { label: string; code: string };
}

export interface ParadigmShift {
  before: string;
  after: string;
  icon: LucideIcon;
}

export interface WhoFor {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string; // tailwind bg gradient
}

export interface Resource {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export interface GuideStat {
  label: string;
  value: string;
}

export interface TocItem {
  id: string;
  label: string;
}

export type GuideCategory = "agent" | "infra";

export interface AgentGuideData {
  slug: string;
  agentName: string; // e.g. "Kami", "קאמי"
  agentNameHe: string;
  category?: GuideCategory; // defaults to "agent"
  tagline: string; // short hero subtitle
  heroDescription: string;
  badgeText: string; // e.g. "2026 · סוכן WhatsApp עברי · מדריך מעשי"
  canonical: string;
  heroBgImage?: string; // optional, defaults to none
  /**
   * Optional slug for simpleicons.org CDN (e.g. "docker", "n8n", "ollama", "anthropic")
   * Renders as a recognizable brand logo alongside the lucide icon.
   */
  brandIconSlug?: string;
  /** Optional brand color hex (without #) for the simpleicons URL tint. */
  brandIconColor?: string;
  stats: GuideStat[]; // 4 stats for hero
  paradigmShifts: ParadigmShift[];
  paradigmTitle: string;
  paradigmSub: string;
  whoIsThisFor: WhoFor[];
  sections: GuideSection[];
  toc: TocItem[];
  resources: Resource[];
  ctaTitle: string;
  ctaSub: string;
  primaryCta: { label: string; href: string; icon: LucideIcon };
  secondaryCta?: { label: string; href: string; icon: LucideIcon };
  authorBio: string; // paragraph about why Elad knows this agent
}
