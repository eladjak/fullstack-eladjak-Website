import { type Metadata } from 'next';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://fullstack-eladjak.co.il';
const CANONICAL = `${SITE_URL}/skills-universe`;

export const metadata: Metadata = {
  title: "יקום הכישורים — אלעד יעקובוביץ'",
  description:
    'הדמיה תלת-ממדית אינטראקטיבית של כל הכלים, השפות והפריימוורקים שאני עובד איתם — פרונט, באק, AI, DevOps והכל ביניהם. גרור לסיבוב, לחץ על כדור לפרטים.',
  keywords: [
    'יקום הכישורים',
    'skills universe',
    '3D skills visualization',
    'תיק עבודות אינטראקטיבי',
    'three.js portfolio',
    'react three fiber',
    "אלעד יעקובוביץ'",
  ],
  alternates: {
    canonical: CANONICAL,
    languages: {
      'he-IL': CANONICAL,
    },
  },
  openGraph: {
    title: "יקום הכישורים — אלעד יעקובוביץ'",
    description:
      'הדמיה תלת-ממדית אינטראקטיבית של כל הכלים, השפות והפריימוורקים שאני עובד איתם.',
    url: CANONICAL,
    type: 'website',
    locale: 'he_IL',
    siteName: "אלעד יעקובוביץ' - תיק עבודות",
  },
  twitter: {
    title: "יקום הכישורים — אלעד יעקובוביץ'",
    description:
      'הדמיה תלת-ממדית אינטראקטיבית של הכלים, השפות והפריימוורקים שלי.',
    card: 'summary_large_image',
    creator: '@eladjak',
  },
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

export default function SkillsUniverseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
