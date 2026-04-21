import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fullstack-eladjak.co.il";
const CANONICAL_EN = `${SITE_URL}/en/claude-code`;
const CANONICAL_HE = `${SITE_URL}/claude-code`;

export const metadata: Metadata = {
  title: "Claude Code — The Complete Guide | Elad Yaakobovitch",
  description:
    "Claude Code is Anthropic's CLI + IDE extensions — the most advanced AI coding tool of 2026. A practical English guide with 350+ ready-to-install skills, 32 specialized sub-agents, and 17 MCP servers. Everything free and open source.",
  alternates: {
    canonical: CANONICAL_EN,
    languages: {
      "he-IL": CANONICAL_HE,
      "en-US": CANONICAL_EN,
      "x-default": CANONICAL_EN,
    },
  },
  keywords: [
    "Claude Code",
    "Claude Code guide",
    "Claude Code tutorial",
    "Anthropic CLI",
    "MCP servers",
    "Model Context Protocol",
    "AI pair programming",
    "Claude Code skills",
    "sub-agents",
    "Elad Yaakobovitch",
  ],
  openGraph: {
    title: "Claude Code — The Complete Guide",
    description:
      "A complete practical guide to Claude Code with 350+ skills, 32 agents, and 17 MCP servers — all open source.",
    url: CANONICAL_EN,
    type: "article",
    locale: "en_US",
    siteName: "Elad Yaakobovitch — Portfolio",
    images: [
      {
        url: `${SITE_URL}/images/guides/guide-claude-code-hero.jpg`,
        width: 1200,
        height: 630,
        alt: "Claude Code — Complete Guide",
      },
    ],
    authors: ["Elad Yaakobovitch"],
  },
  twitter: {
    title: "Claude Code — The Complete Guide",
    description:
      "350+ skills, 32 agents, 17 MCP servers — the ultimate Claude Code setup, open source.",
    card: "summary_large_image",
    images: [`${SITE_URL}/images/guides/guide-claude-code-hero.jpg`],
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

export default function ClaudeCodeLayoutEn({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
