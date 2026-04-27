import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fullstack-eladjak.co.il";
const CANONICAL_EN = `${SITE_URL}/en/methodology`;
const CANONICAL_HE = `${SITE_URL}/methodology`;

export const metadata: Metadata = {
  title: {
    absolute: "Methodology — From Idea to Production | Elad Yaakobovitch",
  },
  description:
    "How I build AI and Full-Stack projects — six clear phases from initial consultation to production: PRD, weekly sprints, QA, launch, and ongoing support. A proven approach for organizations, development teams, and founders.",
  keywords: [
    "development methodology",
    "AI development process",
    "iterative development",
    "PRD",
    "weekly sprint",
    "B2B development",
    "AI consulting",
    "product requirements document",
    "Full-Stack development process",
    "Elad Yaakobovitch",
  ],
  alternates: {
    canonical: CANONICAL_EN,
    languages: {
      "he-IL": CANONICAL_HE,
      "en-US": CANONICAL_EN,
      "x-default": CANONICAL_EN,
    },
  },
  openGraph: {
    title: "Methodology — From Idea to Production",
    description:
      "Six development phases: consultation, PRD, weekly sprints, QA, launch, and ongoing support. A proven approach for organizations and dev teams.",
    url: CANONICAL_EN,
    type: "website",
    locale: "en_US",
    siteName: "Elad Yaakobovitch — Portfolio",
  },
  twitter: {
    title: "Methodology — From Idea to Production",
    description:
      "Six development phases that take a project from idea to production. Consultation, PRD, sprints, QA, launch, and support.",
    card: "summary_large_image",
    creator: "@eladjak",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function MethodologyLayoutEn({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
