import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'המדריך המלא ל-Claude Code',
  description:
    'מדריך מעשי בעברית ל-Claude Code — התקנה, CLAUDE.md, MCP, Skills, סוכנים מקבילים וטיפים מתקדמים. כתוב על ידי מפתח שמשתמש בו יומיומית.',
  keywords: [
    'Claude Code',
    'Anthropic',
    'AI coding',
    'מדריך Claude Code',
    'MCP',
    'CLAUDE.md',
    'סוכנים AI',
    'פיתוח עם AI',
    'כלי AI לפיתוח',
    'טיפים Claude Code',
  ],
  alternates: {
    canonical: 'https://fullstack-eladjak.co.il/claude-code',
  },
  openGraph: {
    title: "המדריך המלא ל-Claude Code | אלעד יעקובוביץ'",
    description:
      'מדריך מעשי בעברית ל-Claude Code — התקנה, CLAUDE.md, MCP, Skills וסוכנים מקבילים.',
    url: 'https://fullstack-eladjak.co.il/claude-code',
  },
  twitter: {
    title: "המדריך המלא ל-Claude Code | אלעד יעקובוביץ'",
    description:
      'מדריך מעשי בעברית ל-Claude Code — התקנה, CLAUDE.md, MCP, Skills וסוכנים מקבילים.',
  },
};

export default function ClaudeCodeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
