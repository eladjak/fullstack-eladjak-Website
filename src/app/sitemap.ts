import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';
import { getAllMDXPosts } from '@/lib/mdx';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fullstack-eladjak.co.il';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/ai-tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/whiteboard`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  try {
    // Fetch published blog posts
    const { data: blogPosts } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, created_at')
      .eq('published', true)
      .order('updated_at', { ascending: false });

    const blogRoutes: MetadataRoute.Sitemap =
      blogPosts?.map((post) => ({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at || post.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      })) || [];

    // Fetch projects
    const { data: projects } = await supabase
      .from('projects')
      .select('id, title, updated_at, created_at')
      .order('updated_at', { ascending: false });

    const projectRoutes: MetadataRoute.Sitemap =
      projects?.map((project) => ({
        url: `${SITE_URL}/projects/${project.id}`,
        lastModified: new Date(project.updated_at || project.created_at),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })) || [];

    // MDX blog posts (local files)
    const mdxPosts = getAllMDXPosts();
    const mdxRoutes: MetadataRoute.Sitemap = mdxPosts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.frontmatter.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    return [...staticRoutes, ...blogRoutes, ...mdxRoutes, ...projectRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return static routes + MDX routes even if database query fails
    const mdxPosts = getAllMDXPosts();
    const mdxRoutes: MetadataRoute.Sitemap = mdxPosts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.frontmatter.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
    return [...staticRoutes, ...mdxRoutes];
  }
}
