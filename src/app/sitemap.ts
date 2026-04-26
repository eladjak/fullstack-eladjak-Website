import { MetadataRoute } from 'next';
import { getAllMDXPosts } from '@/lib/mdx';
import { allGuides } from '@/data/agent-guides';

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

  // Agent guide index + individual guides
  const guideIndexRoute: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/guide`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
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

  // MDX blog posts (local files)
  const mdxPosts = getAllMDXPosts();
  const mdxRoutes: MetadataRoute.Sitemap = mdxPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...guideIndexRoute, ...guideRoutes, ...mdxRoutes];
}
