"use client";

import { AgentGuide } from "@/components/agent-guide/AgentGuide";
import { claudeCodeGuideEn } from "@/data/agent-guides/en/claude-code";

export default function ClaudeCodePageEn() {
  return <AgentGuide guide={claudeCodeGuideEn} locale="en" />;
}
