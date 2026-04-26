import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export interface MDXFrontmatter {
  title: string;
  titleHe?: string;
  date: string;
  description: string;
  descriptionHe?: string;
  tags: string[];
  featured_image?: string;
  author?: string;
  published?: boolean;
  /**
   * Optional locale restriction. When set, the post is shown only on the matching
   * locale's blog index. When omitted, the post is treated as bilingual (visible
   * on both `he` and `en` indexes) — Hebrew is the primary language by default.
   */
  locale?: 'he' | 'en';
}

export interface MDXPost {
  slug: string;
  frontmatter: MDXFrontmatter;
  content: string;
  readingTime: number;
}

/**
 * Get all MDX blog posts sorted by date (newest first).
 */
export function getAllMDXPosts(): MDXPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'));

  const posts = files.map((filename) => {
    const slug = filename.replace('.mdx', '');
    const filePath = path.join(BLOG_DIR, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const frontmatter = data as MDXFrontmatter;

    // Skip unpublished posts
    if (frontmatter.published === false) {
      return null;
    }

    const stats = readingTime(content);

    return {
      slug,
      frontmatter,
      content,
      readingTime: Math.ceil(stats.minutes),
    };
  }).filter((post): post is MDXPost => post !== null);

  return posts.sort((a, b) =>
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

/**
 * Get a single MDX blog post by slug.
 */
export function getMDXPostBySlug(slug: string): MDXPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const frontmatter = data as MDXFrontmatter;
  const stats = readingTime(content);

  return {
    slug,
    frontmatter,
    content,
    readingTime: Math.ceil(stats.minutes),
  };
}

/**
 * Get all unique tags from MDX posts.
 */
export function getAllMDXTags(): string[] {
  const posts = getAllMDXPosts();
  const tags = new Set<string>();

  for (const post of posts) {
    for (const tag of post.frontmatter.tags) {
      tags.add(tag);
    }
  }

  return Array.from(tags).sort();
}

/**
 * Get all slugs for static generation.
 */
export function getAllMDXSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace('.mdx', ''));
}
