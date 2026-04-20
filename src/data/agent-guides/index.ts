import type { AgentGuideData } from "@/components/agent-guide/types";
import { claudeCodeGuide } from "./claude-code";
import { kamiGuide } from "./kami";
import { kayleeGuide } from "./kaylee";
import { crewaiGuide } from "./crewai";
import { boxGuide } from "./box";
import { hermesGuide } from "./hermes";
import { qdrantGuide } from "./qdrant";
import { delegatorGuide } from "./delegator";
import { adopterGuide } from "./adopter";
import { dashboardGuide } from "./dashboard";

export const allGuides: AgentGuideData[] = [
  claudeCodeGuide,
  kamiGuide,
  kayleeGuide,
  crewaiGuide,
  boxGuide,
  hermesGuide,
  qdrantGuide,
  delegatorGuide,
  adopterGuide,
  dashboardGuide,
];

export const guideBySlug = new Map<string, AgentGuideData>(
  allGuides.map((g) => [g.slug, g])
);

export {
  claudeCodeGuide,
  kamiGuide,
  kayleeGuide,
  crewaiGuide,
  boxGuide,
  hermesGuide,
  qdrantGuide,
  delegatorGuide,
  adopterGuide,
  dashboardGuide,
};
