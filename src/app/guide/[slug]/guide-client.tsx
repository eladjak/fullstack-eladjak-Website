"use client";

import { notFound } from "next/navigation";
import { AgentGuide } from "@/components/agent-guide/AgentGuide";
import { guideBySlug } from "@/data/agent-guides";

/** Renders a guide the server has already confirmed exists. Kept as a client
 *  component so the guide object, which carries icon references, never has to
 *  cross the server/client boundary. */
export function GuideClient({ slug }: { readonly slug: string }) {
  const guide = guideBySlug.get(slug);
  if (!guide) notFound();
  return <AgentGuide guide={guide} />;
}
