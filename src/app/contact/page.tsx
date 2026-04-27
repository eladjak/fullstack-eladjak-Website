import type { Metadata } from 'next';
import ContactPageClient from '@/components/sections/contact-page-client';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fullstack-eladjak.co.il';
const OG_IMAGE = 'https://avatars.githubusercontent.com/u/108827199?v=4';

const TITLE = "צור קשר | אלעד יעקובוביץ'";
const DESCRIPTION =
  "צרו קשר עם אלעד יעקובוביץ' לשיתופי פעולה, פרויקטים חדשים או ייעוץ טכנולוגי. תגובה תוך מספר שעות.";

export const metadata: Metadata = {
  // `absolute` bypasses the layout's title.template (" | אלעד יעקובוביץ'")
  // so we don't double-suffix. TITLE already includes the brand.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/contact`,
    languages: {
      'he-IL': `${SITE_URL}/contact`,
      'en': `${SITE_URL}/en/contact`,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    url: `${SITE_URL}/contact`,
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

export default function ContactPage() {
  return <ContactPageClient />;
}
