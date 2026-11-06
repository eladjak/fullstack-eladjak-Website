import readingTime from 'reading-time';
import { getAllMDXPosts, type MDXPost } from './mdx';
import type { PortableTextBlock } from '@portabletext/react';

type RecordPost = { _id:string; slug:string; language:string; title:string; excerpt?:string; publishedAt:string; tags?:string[]; image?:string; body:PortableTextBlock[] };
export type BlogPost = MDXPost & { sanityBodies?: Partial<Record<'he' | 'en', PortableTextBlock[]>> };
const query = `*[_type == "post" && siteId == "fullstack-portfolio" && status == "published" && !(_id in path("drafts.**")) && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc) {_id,"slug":slug.current,language,title,excerpt,publishedAt,tags,"image":mainImage.asset->url,body}`;

export function mergePosts(local: MDXPost[], records: RecordPost[]): BlogPost[] {
  const groups = new Map<string, RecordPost[]>();
  for (const r of records) {
    if (!r.slug || !r.title || !r.publishedAt || !Array.isArray(r.body)) continue;
    const group = groups.get(r.slug) ?? [];
    group.push(r); groups.set(r.slug, group);
  }
  const slugs = new Set(local.map(p => p.slug));
  const remote: BlogPost[] = [];
  for (const [slug, group] of groups) {
    if (slugs.has(slug)) continue;
    // Records arrive newest first. Hebrew is the explicit default; fall back to English.
    const he = group.find(p => p.language === 'he');
    const en = group.find(p => p.language === 'en');
    const fallback = he ?? en;
    if (!fallback) continue;
    const text = (fallback.body as Array<{children?:Array<{text?:string}>}>).flatMap(b => b.children?.map(c => c.text ?? '') ?? []).join(' ');
    remote.push({ slug, content: '', readingTime: Math.max(1, Math.ceil(readingTime(text).minutes)),
      frontmatter: { title: en?.title ?? fallback.title, titleHe: he?.title ?? fallback.title, description: en?.excerpt ?? fallback.excerpt ?? '', descriptionHe: he?.excerpt ?? fallback.excerpt ?? '', date: fallback.publishedAt, tags: fallback.tags ?? [], featured_image: fallback.image, locale: he && en ? undefined : he ? 'he' : 'en' },
      sanityBodies: { he: he?.body ?? fallback.body, en: en?.body ?? fallback.body } });
  }
  return [...local, ...remote].sort((a,b) => Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date));
}
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const url = new URL('https://b0hm1i34.api.sanity.io/v2024-01-01/data/query/production');
    url.searchParams.set('query', query); url.searchParams.set('perspective', 'published');
    const response = await fetch(url, { next: { revalidate: 60 } });
    if (!response.ok) throw new Error(`Sanity HTTP ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data.result)) throw new Error('Invalid Sanity result');
    return mergePosts(getAllMDXPosts(), data.result);
  } catch (error) { console.error('Sanity blog fetch failed', error); return getAllMDXPosts(); }
}
