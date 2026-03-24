import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'צור קשר',
  description:
    'צרו קשר לפרויקט הפיתוח הבא שלכם. WhatsApp, אימייל, או טופס יצירת קשר. מגדל העמק, ישראל. מענה תוך 24 שעות.',
  keywords: [
    'צור קשר',
    'פיתוח ווב',
    'שכירת מפתח',
    'פרויקט פיתוח',
    'Full-Stack Israel',
    'מפתח ישראל',
    'WhatsApp',
  ],
  alternates: {
    canonical: 'https://fullstack-eladjak.co.il/contact',
  },
  openGraph: {
    title: "צור קשר | אלעד יעקובוביץ'",
    description:
      'צרו קשר לפרויקט הפיתוח הבא שלכם. WhatsApp, אימייל, או טופס יצירת קשר. מענה תוך 24 שעות.',
    url: 'https://fullstack-eladjak.co.il/contact',
  },
  twitter: {
    title: "צור קשר | אלעד יעקובוביץ'",
    description:
      'צרו קשר לפרויקט הפיתוח הבא שלכם. WhatsApp, אימייל, או טופס יצירת קשר.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
