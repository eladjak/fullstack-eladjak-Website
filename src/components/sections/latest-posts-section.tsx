'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/components/providers/locale-provider';
import { ScrollAnimate } from '@/components/ui/scroll-animate';
import { TagBadge } from '@/components/ui/tag-badge';

interface MDXPostSerialized {
  slug: string;
  frontmatter: {
    title: string;
    titleHe?: string;
    date: string;
    description: string;
    descriptionHe?: string;
    tags: string[];
    featured_image?: string;
  };
  readingTime: number;
}

function formatDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === 'he' ? 'he-IL' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function truncate(text: string, maxLength = 120): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}

export default function LatestPostsSection() {
  const t = useTranslations('latestPosts');
  const { locale, direction } = useLocale();
  const [posts, setPosts] = useState<MDXPostSerialized[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog/posts')
      .then(res => res.json())
      .then((data: MDXPostSerialized[]) => {
        // Already sorted newest-first by the API; take top 3
        setPosts(data.slice(0, 3));
      })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  // Don't render the section at all while loading or if no posts
  if (loading || posts.length === 0) return null;

  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent pointer-events-none" />

      <div className="container relative z-10 px-4 md:px-6">
        {/* Section header */}
        <ScrollAnimate>
          <div className="flex items-center justify-between mb-12 gap-4 flex-wrap">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-glow">
                {t('title')}
              </h2>
              <p className="mt-2 text-muted-foreground text-base md:text-lg max-w-xl">
                {t('subtitle')}
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group shrink-0"
            >
              <span>{t('viewAll')}</span>
              <ArrowIcon
                className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </ScrollAnimate>

        {/* Cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => {
            const title =
              locale === 'he' && post.frontmatter.titleHe
                ? post.frontmatter.titleHe
                : post.frontmatter.title;
            const description =
              locale === 'he' && post.frontmatter.descriptionHe
                ? post.frontmatter.descriptionHe
                : post.frontmatter.description;
            const tags = post.frontmatter.tags.slice(0, 3);

            return (
              <ScrollAnimate key={post.slug} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="h-full"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex flex-col h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 gap-4 hover:border-primary/40 hover:bg-white/8 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    aria-label={title}
                  >
                    {/* Tags */}
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                          <TagBadge
                            key={tag}
                            tag={tag}
                            showIcon={false}
                            className="text-xs px-2 py-0.5"
                          />
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-lg font-semibold leading-snug text-foreground group-hover:text-primary line-clamp-2">
                      {title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {truncate(description)}
                    </p>

                    {/* Meta row */}
                    <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/8 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <time dateTime={post.frontmatter.date}>
                          {formatDate(post.frontmatter.date, locale)}
                        </time>
                      </span>
                      <span className="flex items-center gap-1.5 shrink-0">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {post.readingTime} {t('minRead')}
                      </span>
                    </div>

                    {/* Read more CTA */}
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary mt-1">
                      {t('readMore')}
                      <ArrowIcon className="h-3 w-3" aria-hidden="true" />
                    </span>
                  </Link>
                </motion.div>
              </ScrollAnimate>
            );
          })}
        </div>
      </div>
    </section>
  );
}
