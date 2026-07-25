'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Tag } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/components/providers/locale-provider';
import { ScrollAnimate } from '@/components/ui/scroll-animate';
import { TagBadge } from '@/components/ui/tag-badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

export interface MDXPostSerialized {
  slug: string;
  frontmatter: {
    title: string;
    titleHe?: string;
    date: string;
    description: string;
    descriptionHe?: string;
    tags: string[];
    featured_image?: string;
    author?: string;
    /**
     * Optional locale restriction. When set, post shows only on matching locale's
     * blog index. When omitted, post is bilingual (visible in both `he` and `en`).
     */
    locale?: 'he' | 'en';
  };
  readingTime: number;
}

interface BlogIndexClientProps {
  /**
   * All published posts, fetched server-side and passed as plain serializable
   * objects so the full list renders into the initial SSR HTML (crawler-visible,
   * no loading spinner). Locale filtering + tag filtering happen on the client.
   */
  posts: MDXPostSerialized[];
}

export default function BlogIndexClient({ posts }: BlogIndexClientProps) {
  const t = useTranslations('blogPage');
  const { locale } = useLocale();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Locale filter: keep posts that either match the current locale OR have no
  // locale field (bilingual posts default to visible in both languages).
  const localeFilteredPosts = posts.filter(
    post => !post.frontmatter.locale || post.frontmatter.locale === locale
  );

  const allTags = Array.from(
    new Set(localeFilteredPosts.flatMap(post => post.frontmatter.tags))
  ).sort();

  const filteredPosts = selectedTag
    ? localeFilteredPosts.filter(post => post.frontmatter.tags.includes(selectedTag))
    : localeFilteredPosts;

  // Detect duplicate featured_image values across the rendered list.
  // The first post to use an image keeps it; subsequent posts using the same
  // image render a gradient placeholder instead.
  const seenImages = new Set<string>();
  const imageUsage = new Map<string, boolean>(); // slug -> useImage?
  for (const post of filteredPosts) {
    const img = post.frontmatter.featured_image;
    if (!img) {
      imageUsage.set(post.slug, false);
      continue;
    }
    if (seenImages.has(img)) {
      imageUsage.set(post.slug, false);
    } else {
      seenImages.add(img);
      imageUsage.set(post.slug, true);
    }
  }

  const getTitle = (post: MDXPostSerialized) =>
    locale === 'he' && post.frontmatter.titleHe
      ? post.frontmatter.titleHe
      : post.frontmatter.title;

  const getDescription = (post: MDXPostSerialized) =>
    locale === 'he' && post.frontmatter.descriptionHe
      ? post.frontmatter.descriptionHe
      : post.frontmatter.description;

  return (
    <div className="container mx-auto px-4 py-12">
      <ScrollAnimate>
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-glow">{t('title')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </ScrollAnimate>

      {/* Tag Filters */}
      {allTags.length > 0 && (
        <ScrollAnimate delay={0.05}>
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            <button
              type="button"
              onClick={() => setSelectedTag(null)}
              aria-pressed={selectedTag === null}
              className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                selectedTag === null
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-primary/10 text-primary border-transparent hover:bg-primary/15 transition-colors duration-200'
              }`}
            >
              <Tag className="h-3 w-3" />
              {t('allPosts')}
            </button>
            {allTags.map(tag => (
              <button
                type="button"
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                aria-pressed={selectedTag === tag}
                className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  selectedTag === tag
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-primary/10 text-primary border-transparent hover:bg-primary/15 transition-colors duration-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </ScrollAnimate>
      )}

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">{t('noPosts')}</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: Math.min(index * 0.05, 0.3) }}
            >
              <Card className="wow-card group overflow-hidden h-full flex flex-col">
                {/* Featured Image — render real image only when not a duplicate.
                    Duplicates and missing images fall back to a gradient placeholder. */}
                {imageUsage.get(post.slug) && post.frontmatter.featured_image ? (
                  <div className="relative w-full aspect-video overflow-hidden">
                    <Image
                      src={post.frontmatter.featured_image}
                      alt={getTitle(post)}
                      fill
                      className="object-cover transition-transform duration-200 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div
                    className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-primary/30 via-primary/10 to-secondary/20 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <Tag className="h-10 w-10 text-primary/40 wow-icon" />
                  </div>
                )}
                <CardHeader>
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold group-hover:text-primary transition-colors">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        {getTitle(post)}
                      </Link>
                    </h2>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <time dateTime={post.frontmatter.date}>
                          {new Date(post.frontmatter.date).toLocaleDateString(
                            locale === 'he' ? 'he-IL' : 'en-US',
                            { year: 'numeric', month: 'short', day: 'numeric' }
                          )}
                        </time>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>
                          {post.readingTime} {t('minRead')}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground line-clamp-3">
                    {getDescription(post)}
                  </p>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2">
                  {post.frontmatter.tags.slice(0, 3).map(tag => (
                    <TagBadge key={tag} tag={tag} variant="default" showIcon={false} />
                  ))}
                  {post.frontmatter.tags.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{post.frontmatter.tags.length - 3}
                    </span>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
