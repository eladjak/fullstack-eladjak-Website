import { getAllMDXPosts } from '@/lib/mdx';
import BlogIndexClient, {
  type MDXPostSerialized,
} from '@/components/blog/blog-index-client';

// Server Component: fetch all published posts at build/request time and render
// them into the initial HTML. Previously this page was `"use client"` and
// fetched `/api/blog/posts` in a `useEffect`, shipping an empty shell + spinner
// to crawlers. Now the post list is server-rendered; only tag/locale filtering
// is client-side (in BlogIndexClient).
export default function BlogPage() {
  const posts: MDXPostSerialized[] = getAllMDXPosts().map(
    ({ slug, frontmatter, readingTime }) => ({
      slug,
      frontmatter: {
        title: frontmatter.title,
        titleHe: frontmatter.titleHe,
        date: frontmatter.date,
        description: frontmatter.description,
        descriptionHe: frontmatter.descriptionHe,
        tags: frontmatter.tags ?? [],
        featured_image: frontmatter.featured_image,
        author: frontmatter.author,
        locale: frontmatter.locale,
      },
      readingTime,
    })
  );

  return <BlogIndexClient posts={posts} />;
}
