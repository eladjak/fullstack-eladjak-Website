import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'אנשים שמשפיעים עליי',
  description:
    'מנטורים, מחנכים ומובילי דעה בעולם הטכנולוגיה וה-AI שעיצבו את המסע המקצועי שלי כמפתח Full-Stack.',
  keywords: [
    'מנטורים',
    'מובילי AI',
    'מובילי טכנולוגיה',
    'השפעות',
    'לימוד',
    'Full-Stack',
    'AI',
  ],
  alternates: {
    canonical: 'https://fullstack-eladjak.co.il/thanks',
  },
  openGraph: {
    title: "אנשים שמשפיעים עליי | אלעד יעקובוביץ'",
    description:
      'מנטורים, מחנכים ומובילי דעה בעולם הטכנולוגיה וה-AI שעיצבו את המסע המקצועי שלי.',
    url: 'https://fullstack-eladjak.co.il/thanks',
  },
  twitter: {
    title: "אנשים שמשפיעים עליי | אלעד יעקובוביץ'",
    description:
      'מנטורים, מחנכים ומובילי דעה בעולם הטכנולוגיה וה-AI שעיצבו את המסע המקצועי שלי.',
  },
};

export default function ThanksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
