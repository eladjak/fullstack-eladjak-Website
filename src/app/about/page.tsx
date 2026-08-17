import type { Metadata } from 'next';
import AboutPageClient from '@/components/sections/about-page-client';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fullstack-eladjak.co.il';
// A 460x460 avatar under a `summary_large_image` declaration is either
// cropped past recognition or dropped, which reads to a human as a broken
// link preview. The site already served this 1200x630 file at the root.
const OG_IMAGE = `${SITE_URL}/og-image.png`;

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
        width: 1200,
        height: 630,
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
