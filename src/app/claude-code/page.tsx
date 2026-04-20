"use client";

import { AgentGuide } from "@/components/agent-guide/AgentGuide";
import { claudeCodeGuide } from "@/data/agent-guides/claude-code";

export default function ClaudeCodePage() {
  return <AgentGuide guide={claudeCodeGuide} />;
}
