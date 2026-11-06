import { NextResponse } from 'next/server';
import { getBlogPosts } from '@/lib/blog-content';

export async function GET() {
  const posts = await getBlogPosts();

  // Return posts without raw content (only metadata + reading time)
  const serialized = posts.map(({ slug, frontmatter, readingTime }) => ({
    slug,
    frontmatter,
    readingTime,
  }));

  return NextResponse.json(serialized);
}
