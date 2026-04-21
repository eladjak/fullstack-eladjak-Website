import { type Metadata } from 'next';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://fullstack-eladjak.co.il';
const CANONICAL = `${SITE_URL}/claude-code`;
const OG_IMAGE = `${SITE_URL}/images/guides/guide-claude-code-hero.jpg`;

export const metadata: Metadata = {
  title: "המדריך המלא ל-Claude Code | אלעד יעקובוביץ'",
  description:
    'מדריך מעשי בעברית ל-Claude Code של Anthropic — התקנה, CLAUDE.md, MCP, Skills, סוכנים מקבילים, hooks, והטיפים המתקדמים שמפעילים רשת של 10 סוכני AI בייצור. כתוב על ידי מפתח שמשתמש בו יומיומית.',
  keywords: [
    'Claude Code',
    'Claude Code עברית',
    'Claude Code מדריך',
    'מדריך Claude Code בעברית',
    'Anthropic',
    'AI coding',
    'MCP',
    'Model Context Protocol',
    'CLAUDE.md',
    'Skills Claude Code',
    'סוכני AI',
    'סוכן בינה מלאכותית',
    'agent network',
    'פיתוח עם AI',
    'כלי AI לפיתוח',
    'AI agent network',
    'אלעד יעקובוביץ\'',
    'fullstack-eladjak',
  ],
  alternates: {
    canonical: CANONICAL,
    languages: {
      'he-IL': CANONICAL,
    },
  },
  openGraph: {
    title: "המדריך המלא ל-Claude Code | אלעד יעקובוביץ'",
    description:
      'מדריך מעשי בעברית ל-Claude Code — התקנה, CLAUDE.md, MCP, Skills, סוכנים מקבילים וטיפים מתקדמים של מפתח שמשתמש בו יומיומית.',
    url: CANONICAL,
    type: 'article',
    locale: 'he_IL',
    siteName: "אלעד יעקובוביץ' - תיק עבודות",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Claude Code — מדריך מעשי בעברית',
      },
    ],
    authors: ["אלעד יעקובוביץ'"],
    tags: ['Claude Code', 'Anthropic', 'AI', 'agent', 'מדריך עברית', 'MCP'],
  },
  twitter: {
    title: "המדריך המלא ל-Claude Code | אלעד יעקובוביץ'",
    description:
      'מדריך מעשי בעברית ל-Claude Code — התקנה, CLAUDE.md, MCP, Skills וסוכנים מקבילים.',
    card: 'summary_large_image',
    images: [OG_IMAGE],
    creator: '@eladjak',
  },
  authors: [{ name: "אלעד יעקובוביץ'", url: SITE_URL }],
  category: 'AI Agents',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function ClaudeCodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
