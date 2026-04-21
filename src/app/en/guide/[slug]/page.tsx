"use client";

import { notFound, useParams } from "next/navigation";
import { AgentGuide } from "@/components/agent-guide/AgentGuide";
import { guideBySlugEn } from "@/data/agent-guides/en";

export default function GuidePageEn() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  if (!slug) notFound();
  const guide = guideBySlugEn.get(slug);
  if (!guide || guide.slug === "claude-code") notFound();
  return <AgentGuide guide={guide} locale="en" />;
}
