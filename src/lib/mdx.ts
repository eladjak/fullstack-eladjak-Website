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
 * Delimiter separating the English body from the Hebrew body in bilingual posts.
 * Authored order is English first, Hebrew second. Posts without the delimiter are
 * single-language and returned unchanged (backward compatible).
 */
export const LOCALE_SPLIT = '<!--LOCALE-SPLIT-->';

const HEBREW_RE = /[֐-׿]/g;

/**
 * Return only the active-locale portion of a (possibly bilingual) post body.
 * A bilingual body contains LOCALE_SPLIT; we route each part by its Hebrew ratio
 * (order-robust), strip the delimiter, and return the matching half. Single-language
 * posts (no delimiter) are returned as-is.
 */
export function localizeMDXContent(content: string, locale: 'he' | 'en'): string {
  if (!content.includes(LOCALE_SPLIT)) {
    return content;
  }
  const parts = content.split(LOCALE_SPLIT).map(p => p.trim()).filter(Boolean);
  if (parts.length < 2) {
    return content.replace(LOCALE_SPLIT, '').trim();
  }
  // Deterministic: authored order is English first, Hebrew second (the delimiter is
  // inserted before the Hebrew block). en=parts[0], he=parts[1]. Defensive guard:
  // if the first part is actually more-Hebrew than the second, swap — so a future
  // mis-ordered post still routes correctly without relying on a fragile ratio.
  const heRatio = (s: string) => (s.match(HEBREW_RE)?.length ?? 0) / Math.max(s.length, 1);
  let enPart = parts[0];
  let hePart = parts.slice(1).join('\n\n');
  if (heRatio(enPart) > heRatio(hePart)) {
    [enPart, hePart] = [hePart, enPart];
  }
  return locale === 'en' ? enPart : hePart;
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
