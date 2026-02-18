'use client';

import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/components/providers/locale-provider';
import { ScrollAnimate } from '@/components/ui/scroll-animate';
import type { MDXFrontmatter } from '@/lib/mdx';

interface RelatedPost {
  slug: string;
  frontmatter: MDXFrontmatter;
  readingTime: number;
}

interface RelatedPostsProps {
  posts: RelatedPost[];
}

/**
 * Displays related blog posts based on shared tags.
 * Uses i18n for the section title and reading time label.
 */
export function RelatedPosts({ posts }: RelatedPostsProps) {
  const t = useTranslations('blogPage');
  const { locale } = useLocale();

  if (posts.length === 0) return null;

  const getTitle = (post: RelatedPost) =>
    locale === 'he' && post.frontmatter.titleHe
      ? post.frontmatter.titleHe
      : post.frontmatter.title;

  const getDescription = (post: RelatedPost) =>
    locale === 'he' && post.frontmatter.descriptionHe
      ? post.frontmatter.descriptionHe
      : post.frontmatter.description;

  return (
    <section aria-label="Related posts">
      <ScrollAnimate>
        <h2 className="text-2xl font-bold mb-6">{t('relatedPosts')}</h2>
      </ScrollAnimate>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <ScrollAnimate key={post.slug} delay={index * 0.05}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block rounded-xl border border-border/50 bg-card p-5 transition-all duration-200 hover:shadow-lg hover:border-primary/30 hover:translate-y-[-2px]"
            >
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {getTitle(post)}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {getDescription(post)}
              </p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <time dateTime={post.frontmatter.date}>
                    {new Date(post.frontmatter.date).toLocaleDateString(
                      locale === 'he' ? 'he-IL' : 'en-US',
                      { year: 'numeric', month: 'short', day: 'numeric' }
                    )}
                  </time>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{post.readingTime} {t('minRead')}</span>
                </div>
              </div>
            </Link>
          </ScrollAnimate>
        ))}
      </div>
    </section>
  );
}
