import { type Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fullstack-eladjak.co.il';

export const metadata: Metadata = {
  title: 'מתודולוגיית עבודה — מהרעיון לפרודקשן | אלעד יעקובוביץ\'',
  description:
    'איך אני בונה פרויקטי AI ו-Full-Stack — שש פאזות עבודה ברורות: ייעוץ ראשוני, אפיון, פיתוח באיטרציות, בדיקות, עליה לאוויר וליווי שוטף. שיטה שעובדת לארגונים, צוותי פיתוח ויזמים.',
  keywords: [
    'מתודולוגיית פיתוח',
    'תהליך עבודה AI',
    'פיתוח באיטרציות',
    'אפיון פרויקט',
    'PRD',
    'sprint',
    'פיתוח לארגונים',
    'B2B development',
    'AI consulting',
    'אלעד יעקובוביץ\'',
  ],
  alternates: {
    canonical: `${SITE_URL}/methodology`,
    languages: {
      'he-IL': `${SITE_URL}/methodology`,
    },
  },
  openGraph: {
    title: 'מתודולוגיית עבודה — מהרעיון לפרודקשן',
    description:
      'שש פאזות פיתוח: ייעוץ, אפיון, איטרציות שבועיות, בדיקות, השקה וליווי שוטף. שיטה שעובדת לארגונים וצוותי פיתוח.',
    url: `${SITE_URL}/methodology`,
    type: 'website',
    locale: 'he_IL',
    siteName: "אלעד יעקובוביץ' - תיק עבודות",
  },
  twitter: {
    title: 'מתודולוגיית עבודה — מהרעיון לפרודקשן',
    description:
      'שש פאזות פיתוח שמובילות פרויקט מרעיון לפרודקשן. ייעוץ, אפיון, איטרציות, בדיקות, השקה וליווי.',
    card: 'summary_large_image',
    creator: '@eladjak',
  },
};

export default function MethodologyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
