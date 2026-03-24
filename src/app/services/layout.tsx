import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'שירותים',
  description:
    'שירותי פיתוח Full-Stack, אינטגרציית AI, בניית אתרים ויעוץ טכני. מחירים שקופים, פיתוח מקצועי, תוצאות מדידות. מגדל העמק, ישראל.',
  keywords: [
    'שירותי פיתוח',
    'פיתוח Full-Stack',
    'אינטגרציית AI',
    'בניית אתרים',
    'יעוץ טכני',
    'Next.js',
    'React',
    'TypeScript',
    'אוטומציה עסקית',
    'WhatsApp בוט',
    'מפתח ישראל',
  ],
  alternates: {
    canonical: 'https://fullstack-eladjak.co.il/services',
  },
  openGraph: {
    title: "שירותים | אלעד יעקובוביץ'",
    description:
      'שירותי פיתוח Full-Stack, אינטגרציית AI, בניית אתרים ויעוץ טכני. מחירים שקופים.',
    url: 'https://fullstack-eladjak.co.il/services',
  },
  twitter: {
    title: "שירותים | אלעד יעקובוביץ'",
    description:
      'שירותי פיתוח Full-Stack, אינטגרציית AI, בניית אתרים ויעוץ טכני. מחירים שקופים.',
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
