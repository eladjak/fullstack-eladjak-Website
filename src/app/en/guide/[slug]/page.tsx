import { notFound } from "next/navigation";
import { guideBySlugEn } from "@/data/agent-guides/en";
import { GuideClientEn } from "./guide-client";

/**
 * Server component on purpose. A guide slug that does not exist must answer
 * HTTP 404, and only the server can set that. This page previously ran on the
 * client, where notFound() drew the right screen long after a 200 had already
 * been sent, a soft 404, which Google treats as a real page with thin content.
 *
 * Only the slug string is handed to the client component. The guide object
 * stays client-side because it carries icon references, and moving one across
 * this boundary is the non-serializable-props failure that typecheck misses.
 */
/** Only the slugs generateStaticParams produces are real guides. Anything else
 *  must fail at the routing layer with a genuine 404. This has to live on the
 *  page segment, it was set on the layout and was ignored there. */
export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guideBySlugEn.get(slug);
  if (!guide || guide.slug === "claude-code") notFound();
  return <GuideClientEn slug={slug} />;
}
