import { NextResponse } from 'next/server';
import { getAllMDXPosts } from '@/lib/mdx';

export async function GET() {
  const posts = getAllMDXPosts();

  // Return posts without raw content (only metadata + reading time)
  const serialized = posts.map(({ slug, frontmatter, readingTime }) => ({
    slug,
    frontmatter,
    readingTime,
  }));

  return NextResponse.json(serialized);
}
