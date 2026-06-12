import type { Metadata } from 'next';
import HomePageClient from '@/components/sections/home-page-client';
import { getAllMDXPosts } from '@/lib/mdx';
import type { MDXPostSerialized } from '@/components/sections/latest-posts-section';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fullstack-eladjak.co.il';
const OG_IMAGE = 'https://avatars.githubusercontent.com/u/108827199?v=4';

export const metadata: Metadata = {
  title: "אלעד יעקובוביץ' | מפתח Full-Stack ומומחה AI",
  description:
    "מפתח Full-Stack מגדל העמק שבונה ומפעיל רשת של 13 סוכני AI על VPS. אתרים, אפליקציות, ייעוץ AI, אוטומציה עסקית וסדנאות לארגונים ובתי ספר.",
  alternates: {
    canonical: `${SITE_URL}/`,
    languages: {
      'he-IL': `${SITE_URL}/`,
      'en': `${SITE_URL}/en`,
    },
  },
  openGraph: {
    title: "אלעד יעקובוביץ' | מפתח Full-Stack ומומחה AI",
    description:
      "מפתח Full-Stack מגדל העמק שבונה ומפעיל רשת של 13 סוכני AI על VPS. אתרים, אפליקציות, ייעוץ AI, אוטומציה עסקית וסדנאות לארגונים ובתי ספר.",
    type: 'website',
    url: `${SITE_URL}/`,
    siteName: "אלעד יעקובוביץ' - תיק עבודות",
    locale: 'he_IL',
    images: [
      {
        url: OG_IMAGE,
        width: 460,
        height: 460,
        alt: "אלעד יעקובוביץ' - מפתח Full-Stack ומומחה AI | ישראל",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "אלעד יעקובוביץ' | מפתח Full-Stack ומומחה AI",
    description:
      "מפתח Full-Stack שבונה ומפעיל רשת של 13 סוכני AI. אתרים, אפליקציות, ייעוץ אסטרטגי, וסדנאות AI.",
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
