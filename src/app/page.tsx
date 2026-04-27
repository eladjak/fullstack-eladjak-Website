import type { Metadata } from 'next';
import HomePageClient from '@/components/sections/home-page-client';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fullstack-eladjak.co.il';
const OG_IMAGE = 'https://avatars.githubusercontent.com/u/108827199?v=4';

export const metadata: Metadata = {
  title: "אלעד יעקובוביץ' | מפתח Full-Stack ומומחה AI",
  description:
    "מפתח Full-Stack שבונה ומפעיל רשת של 13 סוכני AI. אתרים, אפליקציות, ייעוץ אסטרטגי, וסדנאות AI לארגונים.",
  alternates: {
    canonical: `${SITE_URL}/`,
    languages: {
      'he-IL': `${SITE_URL}/`,
      'en': `${SITE_URL}/en`,
    },
  },
  openGraph: {
    title: "אלעד יעקובוביץ' | מפתח Full-Stack ומומחה AI",
    description:
      "מפתח Full-Stack שבונה ומפעיל רשת של 13 סוכני AI. אתרים, אפליקציות, ייעוץ אסטרטגי, וסדנאות AI לארגונים.",
    type: 'website',
    url: `${SITE_URL}/`,
    siteName: "אלעד יעקובוביץ' - תיק עבודות",
    locale: 'he_IL',
    images: [
      {
        url: OG_IMAGE,
        width: 460,
        height: 460,
        alt: "אלעד יעקובוביץ' - מפתח Full-Stack ומומחה AI | ישראל",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "אלעד יעקובוביץ' | מפתח Full-Stack ומומחה AI",
    description:
      "מפתח Full-Stack שבונה ומפעיל רשת של 13 סוכני AI. אתרים, אפליקציות, ייעוץ אסטרטגי, וסדנאות AI.",
    images: [OG_IMAGE],
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
