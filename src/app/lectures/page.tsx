import type { Metadata } from 'next';
import { LecturesJsonLd, LecturesPage } from '@/components/lectures/lectures-page';
import { LECTURES_COPY, SITE_URL } from '@/components/lectures/content';

const c = LECTURES_COPY.he;
const URL_HE = `${SITE_URL}/lectures`;
const URL_EN = `${SITE_URL}/en/lectures`;

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  alternates: {
    canonical: URL_HE,
    languages: { 'he-IL': URL_HE, 'en-US': URL_EN, 'x-default': URL_HE },
  },
  openGraph: {
    title: `${c.meta.title} | אלעד יעקובוביץ׳`,
    description: c.meta.description,
    url: URL_HE,
    type: 'website',
    locale: 'he_IL',
    images: [{ url: `${SITE_URL}/images/lectures-og.jpg`, width: 1200, height: 630, alt: c.hero.imageAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${c.meta.title} | אלעד יעקובוביץ׳`,
    description: c.meta.description,
    images: [`${SITE_URL}/images/lectures-og.jpg`],
  },
};

export default function LecturesHePage() {
  return (
    <>
      <LecturesJsonLd locale="he" />
      <LecturesPage locale="he" />
    </>
  );
}
