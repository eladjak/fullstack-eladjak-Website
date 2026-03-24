import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'בלוג',
  description:
    'מאמרים טכניים על פיתוח Full-Stack, AI, Next.js, TypeScript וכלי פיתוח מודרניים. תוכן מקצועי בעברית ובאנגלית.',
  keywords: [
    'בלוג פיתוח',
    'מאמרים טכניים',
    'Full-Stack',
    'AI',
    'Next.js',
    'TypeScript',
    'React',
    'פיתוח ווב',
  ],
  alternates: {
    canonical: 'https://fullstack-eladjak.co.il/blog',
  },
  openGraph: {
    title: "בלוג | אלעד יעקובוביץ'",
    description:
      'מאמרים טכניים על פיתוח Full-Stack, AI, Next.js, TypeScript וכלי פיתוח מודרניים.',
    url: 'https://fullstack-eladjak.co.il/blog',
  },
  twitter: {
    title: "בלוג | אלעד יעקובוביץ'",
    description:
      'מאמרים טכניים על פיתוח Full-Stack, AI, Next.js, TypeScript וכלי פיתוח מודרניים.',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
