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
import { postgresGuideEn } from "./postgres";
import { nginxGuideEn } from "./nginx";
import { cloudflareTunnelGuideEn } from "./cloudflare-tunnel";
import { systemdGuideEn } from "./systemd";
import { ufwGuideEn } from "./ufw";
import { githubActionsGuideEn } from "./github-actions";
import { redisStreamsGuideEn } from "./redis-streams";
import { vercelGuideEn } from "./vercel";
import { orchestrationGuideEn } from "./orchestration";
import { autonomyGuideEn } from "./autonomy";
import { auroraGuideEn } from "./aurora";
import { sailacoGuideEn } from "./sailaco";
import { ranchGuideEn } from "./ranch";
import { solisGuideEn } from "./solis";
import { understandAnythingGuideEn } from "./understand-anything";

export const allGuidesEn: AgentGuideData[] = [
  claudeCodeGuideEn,
  orchestrationGuideEn,
  autonomyGuideEn,
  auroraGuideEn,
  kamiGuideEn,
  kayleeGuideEn,
  crewaiGuideEn,
  boxGuideEn,
  hermesGuideEn,
  ranchGuideEn,
  sailacoGuideEn,
  solisGuideEn,
  qdrantGuideEn,
  delegatorGuideEn,
  adopterGuideEn,
  dashboardGuideEn,
  dockerGuideEn,
  ollamaGuideEn,
  n8nGuideEn,
  aiderGuideEn,
  postgresGuideEn,
  nginxGuideEn,
  cloudflareTunnelGuideEn,
  systemdGuideEn,
  ufwGuideEn,
  githubActionsGuideEn,
  redisStreamsGuideEn,
  vercelGuideEn,
  understandAnythingGuideEn,
];

export const guideBySlugEn = new Map<string, AgentGuideData>(
  allGuidesEn.map((g) => [g.slug, g])
);
