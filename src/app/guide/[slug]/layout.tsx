import type { Metadata } from "next";
import { guideBySlug } from "@/data/agent-guides";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: Pick<LayoutProps, "params">): Promise<Metadata> {
  const { slug } = await params;
  const guide = guideBySlug.get(slug);
  if (!guide) {
    return {
      title: "מדריך לא נמצא",
    };
  }

  const title = `המדריך המלא ל-${guide.agentNameHe} | אלעד יעקובוביץ'`;
  const description = `${guide.tagline}. ${guide.heroDescription.slice(0, 140)}`;

  return {
    title,
    description,
    keywords: [
      guide.agentName,
      guide.agentNameHe,
      `מדריך ${guide.agentName}`,
      `מדריך ${guide.agentNameHe}`,
      "סוכני AI",
      "Agent Network",
      "מדריך עברית",
    ],
    alternates: {
      canonical: guide.canonical,
    },
    openGraph: {
      title,
      description,
      url: guide.canonical,
      type: "article",
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
    },
  };
}

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
