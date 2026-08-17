import type { Metadata } from 'next';
import ThanksPageClient from '@/components/sections/thanks-page-client';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fullstack-eladjak.co.il';
// A 460x460 avatar under a `summary_large_image` declaration is either
// cropped past recognition or dropped, which reads to a human as a broken
// link preview. The site already served this 1200x630 file at the root.
const OG_IMAGE = `${SITE_URL}/og-image.png`;

const TITLE = "תודה | אלעד יעקובוביץ'";
const DESCRIPTION =
  'מנטורים, מחנכים ומובילי דעה בעולם הטכנולוגיה וה-AI שעיצבו את המסע המקצועי שלי.';

export const metadata: Metadata = {
  // `absolute` bypasses the layout's title.template (" | אלעד יעקובוביץ'")
  // so we don't double-suffix. TITLE already includes the brand.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/thanks`,
    languages: {
      'he-IL': `${SITE_URL}/thanks`,
      'en': `${SITE_URL}/en/thanks`,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    url: `${SITE_URL}/thanks`,
    siteName: "אלעד יעקובוביץ' - תיק עבודות",
    locale: 'he_IL',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "אנשים שמשפיעים עליי | אלעד יעקובוביץ'",
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

export default function ThanksPage() {
  return <ThanksPageClient />;
}
