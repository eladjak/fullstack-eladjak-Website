import { MetadataRoute } from 'next';
import { getAllMDXPosts } from '@/lib/mdx';
import { allGuides } from '@/data/agent-guides';
import { allGuidesEn } from '@/data/agent-guides/en';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fullstack-eladjak.co.il';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/methodology`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/en/methodology`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/claude-code`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/skills-universe`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/thanks`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Agent guide index + individual guides (Hebrew and English both listed:
  // hreflang alternates alone do not get the /en tree crawled).
  const guideIndexRoute: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/guide`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/en/guide`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
  // Agents get higher priority than infra guides (Elad's flagship content).
  const guideRoutes: MetadataRoute.Sitemap = allGuides
    .filter((g) => g.slug !== 'claude-code')
    .map((g) => ({
      url: `${SITE_URL}/guide/${g.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: (g.category ?? 'agent') === 'agent' ? 0.8 : 0.7,
    }));

  // English guides mirror the Hebrew ones one-for-one; same claude-code
  // exclusion, one notch lower priority than their Hebrew counterparts.
  const guideRoutesEn: MetadataRoute.Sitemap = allGuidesEn
    .filter((g) => g.slug !== 'claude-code')
    .map((g) => ({
      url: `${SITE_URL}/en/guide/${g.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: (g.category ?? 'agent') === 'agent' ? 0.75 : 0.65,
    }));

  // Other English pages that already exist as routes.
  const enStaticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/en/claude-code`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // MDX blog posts (local files)
  const mdxPosts = getAllMDXPosts();
  const mdxRoutes: MetadataRoute.Sitemap = mdxPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...enStaticRoutes,
    ...guideIndexRoute,
    ...guideRoutes,
    ...guideRoutesEn,
    ...mdxRoutes,
  ];
}
