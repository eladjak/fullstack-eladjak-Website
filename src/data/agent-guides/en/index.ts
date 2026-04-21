import type { AgentGuideData } from "@/components/agent-guide/types";
import { claudeCodeGuideEn } from "./claude-code";
import { kamiGuideEn } from "./kami";
import { kayleeGuideEn } from "./kaylee";
import { crewaiGuideEn } from "./crewai";
import { boxGuideEn } from "./box";
import { hermesGuideEn } from "./hermes";
import { qdrantGuideEn } from "./qdrant";
import { delegatorGuideEn } from "./delegator";
import { adopterGuideEn } from "./adopter";
import { dashboardGuideEn } from "./dashboard";
import { dockerGuideEn } from "./docker";
import { ollamaGuideEn } from "./ollama";
import { n8nGuideEn } from "./n8n";
import { aiderGuideEn } from "./aider";

export const allGuidesEn: AgentGuideData[] = [
  claudeCodeGuideEn,
  kamiGuideEn,
  kayleeGuideEn,
  crewaiGuideEn,
  boxGuideEn,
  hermesGuideEn,
  qdrantGuideEn,
  delegatorGuideEn,
  adopterGuideEn,
  dashboardGuideEn,
  dockerGuideEn,
  ollamaGuideEn,
  n8nGuideEn,
  aiderGuideEn,
];

export const guideBySlugEn = new Map<string, AgentGuideData>(
  allGuidesEn.map((g) => [g.slug, g])
);
