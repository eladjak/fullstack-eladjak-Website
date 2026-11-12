import type { Metadata } from 'next';
import { LecturesJsonLd, LecturesPage } from '@/components/lectures/lectures-page';
import { LECTURES_COPY, SITE_URL } from '@/components/lectures/content';

const c = LECTURES_COPY.en;
const URL_HE = `${SITE_URL}/lectures`;
const URL_EN = `${SITE_URL}/en/lectures`;

export const metadata: Metadata = {
  title: { absolute: `${c.meta.title} | Elad Yakobovich` },
  description: c.meta.description,
  alternates: {
    canonical: URL_EN,
    languages: { 'he-IL': URL_HE, 'en-US': URL_EN, 'x-default': URL_HE },
  },
  openGraph: {
    title: `${c.meta.title} | Elad Yakobovich`,
    description: c.meta.description,
    url: URL_EN,
    type: 'website',
    locale: 'en_US',
    images: [{ url: `${SITE_URL}/images/lectures-hero.jpg`, width: 1400, height: 933, alt: c.hero.imageAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${c.meta.title} | Elad Yakobovich`,
    description: c.meta.description,
    images: [`${SITE_URL}/images/lectures-hero.jpg`],
  },
};

export default function LecturesEnPage() {
  return (
    <>
      <LecturesJsonLd locale="en" />
      <LecturesPage locale="en" />
    </>
  );
}
