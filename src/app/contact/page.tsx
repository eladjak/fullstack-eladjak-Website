import type { Metadata } from 'next';
import ContactPageClient from '@/components/sections/contact-page-client';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fullstack-eladjak.co.il';
// A 460x460 avatar under a `summary_large_image` declaration is either
// cropped past recognition or dropped, which reads to a human as a broken
// link preview. The site already served this 1200x630 file at the root.
const OG_IMAGE = `${SITE_URL}/og-image.png`;

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
      // /en/contact does not exist. Advertising it to search engines pointed
      // them at a 404 as the English alternate of this page.
      'en': `${SITE_URL}/contact`,
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

export default function ContactPage() {
  return <ContactPageClient />;
}
