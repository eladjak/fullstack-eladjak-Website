import type { Metadata } from 'next';
import AboutPageClient from '@/components/sections/about-page-client';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fullstack-eladjak.co.il';
const OG_IMAGE = 'https://avatars.githubusercontent.com/u/108827199?v=4';

const TITLE = "אודות | אלעד יעקובוביץ'";
const DESCRIPTION =
  'המסע שלי מאמנות ועסקים לפיתוח Full-Stack. שילוב מומחיות טכנית עם חזון יצירתי ותובנה עסקית.';

export const metadata: Metadata = {
  // `absolute` bypasses the layout's title.template (" | אלעד יעקובוביץ'")
  // so we don't double-suffix. TITLE already includes the brand.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/about`,
    languages: {
      'he-IL': `${SITE_URL}/about`,
      'en': `${SITE_URL}/en/about`,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'profile',
    url: `${SITE_URL}/about`,
    siteName: "אלעד יעקובוביץ' - תיק עבודות",
    locale: 'he_IL',
    images: [
      {
        url: OG_IMAGE,
        width: 460,
        height: 460,
        alt: "אלעד יעקובוביץ' - מפתח Full-Stack ומומחה AI",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
