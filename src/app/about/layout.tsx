import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'אודות',
  description:
    "מפתח Full-Stack ומהנדס AI עם 26+ פרויקטים בפרודקשן. TypeScript, React, Next.js, Claude API. 4+ שנות ניסיון. מגדל העמק, ישראל.",
  keywords: [
    'אודות אלעד',
    'מפתח Full-Stack',
    'מהנדס AI',
    'TypeScript',
    'React',
    'Next.js',
    'Claude API',
    'ישראל',
    'מגדל העמק',
    'ניסיון פיתוח',
  ],
  alternates: {
    canonical: 'https://fullstack-eladjak.co.il/about',
  },
  openGraph: {
    title: "אודות | אלעד יעקובוביץ'",
    description:
      "מפתח Full-Stack ומהנדס AI עם 26+ פרויקטים בפרודקשן. TypeScript, React, Next.js, Claude API.",
    url: 'https://fullstack-eladjak.co.il/about',
  },
  twitter: {
    title: "אודות | אלעד יעקובוביץ'",
    description:
      "מפתח Full-Stack ומהנדס AI עם 26+ פרויקטים בפרודקשן. TypeScript, React, Next.js, Claude API.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
