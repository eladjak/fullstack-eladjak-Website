"use client";

import { notFound, useParams } from "next/navigation";
import { AgentGuide } from "@/components/agent-guide/AgentGuide";
import { guideBySlug } from "@/data/agent-guides";

export default function GuidePage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  if (!slug) notFound();
  const guide = guideBySlug.get(slug);
  if (!guide || guide.slug === "claude-code") notFound();
  return <AgentGuide guide={guide} />;
}
