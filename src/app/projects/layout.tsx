import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'פרויקטים',
  description:
    '14+ פרויקטי Full-Stack ו-AI בפרודקשן — מאפליקציות ווב ועד רשתות סוכנים אוטונומיים. React, Next.js, TypeScript, Supabase.',
  keywords: [
    'פרויקטי Full-Stack',
    'פרויקטי AI',
    'React',
    'Next.js',
    'TypeScript',
    'Supabase',
    'פיתוח ווב',
    'GitHub',
  ],
  alternates: {
    canonical: 'https://fullstack-eladjak.co.il/projects',
  },
  openGraph: {
    title: "פרויקטים | אלעד יעקובוביץ'",
    description:
      '14+ פרויקטי Full-Stack ו-AI deployed בפרודקשן — React, Next.js, TypeScript, Supabase.',
    url: 'https://fullstack-eladjak.co.il/projects',
  },
  twitter: {
    title: "פרויקטים | אלעד יעקובוביץ'",
    description:
      '14+ פרויקטי Full-Stack ו-AI deployed בפרודקשן — React, Next.js, TypeScript, Supabase.',
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
