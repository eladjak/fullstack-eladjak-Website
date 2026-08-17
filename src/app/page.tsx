import type { Metadata } from 'next';
import HomePageClient from '@/components/sections/home-page-client';
import { getAllMDXPosts } from '@/lib/mdx';
import type { MDXPostSerialized } from '@/components/sections/latest-posts-section';
import { AGENT_COUNT } from '@/data/site-facts';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fullstack-eladjak.co.il';
// A 460x460 avatar under a `summary_large_image` declaration is either
// cropped past recognition or dropped, which reads to a human as a broken
// link preview. The site already served this 1200x630 file at the root.
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  title: "אלעד יעקובוביץ' | מפתח Full-Stack ומומחה AI",
  description: `מפתח Full-Stack מגדל העמק שבונה ומפעיל רשת של ${AGENT_COUNT} סוכני AI על שרת Contabo. אתרים, אפליקציות, ייעוץ AI, אוטומציה עסקית וסדנאות לארגונים ובתי ספר.`,
  alternates: {
    canonical: `${SITE_URL}/`,
    languages: {
      'he-IL': `${SITE_URL}/`,
      'en': `${SITE_URL}/en`,
    },
  },
  openGraph: {
    title: "אלעד יעקובוביץ' | מפתח Full-Stack ומומחה AI",
    description: `מפתח Full-Stack מגדל העמק שבונה ומפעיל רשת של ${AGENT_COUNT} סוכני AI על שרת Contabo. אתרים, אפליקציות, ייעוץ AI, אוטומציה עסקית וסדנאות לארגונים ובתי ספר.`,
    type: 'website',
    url: `${SITE_URL}/`,
    siteName: "אלעד יעקובוביץ' - תיק עבודות",
    locale: 'he_IL',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "אלעד יעקובוביץ' - מפתח Full-Stack ומומחה AI | ישראל",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "אלעד יעקובוביץ' | מפתח Full-Stack ומומחה AI",
    description: `מפתח Full-Stack שבונה ומפעיל רשת של ${AGENT_COUNT} סוכני AI. אתרים, אפליקציות, ייעוץ אסטרטגי, וסדנאות AI.`,
    images: [OG_IMAGE],
  },
};

export default function HomePage() {
  // Fetch the latest posts server-side so the "Latest Posts" cards render into
  // the initial HTML (SSR) instead of via a client `fetch` (spinner + empty
  // HTML, invisible to crawlers). Pass only plain serializable fields across
  // the server→client boundary.
  const latestPosts: MDXPostSerialized[] = getAllMDXPosts()
    .slice(0, 3)
    .map(({ slug, frontmatter, readingTime }) => ({
      slug,
      frontmatter: {
        title: frontmatter.title,
        titleHe: frontmatter.titleHe,
        date: frontmatter.date,
        description: frontmatter.description,
        descriptionHe: frontmatter.descriptionHe,
        tags: frontmatter.tags ?? [],
        featured_image: frontmatter.featured_image,
      },
      readingTime,
    }));

  return <HomePageClient latestPosts={latestPosts} />;
}
