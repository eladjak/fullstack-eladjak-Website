import type { Metadata } from 'next';
import ThanksPageClient from '@/components/sections/thanks-page-client';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fullstack-eladjak.co.il';
const OG_IMAGE = 'https://avatars.githubusercontent.com/u/108827199?v=4';

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
        width: 460,
        height: 460,
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
