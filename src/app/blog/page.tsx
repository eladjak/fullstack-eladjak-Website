'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Tag } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/components/providers/locale-provider';
import { ScrollAnimate } from '@/components/ui/scroll-animate';
import { TagBadge } from '@/components/ui/tag-badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

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
    author?: string;
  };
  readingTime: number;
}

export default function BlogPage() {
  const t = useTranslations('blogPage');
  const { locale } = useLocale();
  const [posts, setPosts] = useState<MDXPostSerialized[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog/posts')
      .then(res => res.json())
      .then((data: MDXPostSerialized[]) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const allTags = Array.from(
    new Set(posts.flatMap(post => post.frontmatter.tags))
  ).sort();

  const filteredPosts = selectedTag
    ? posts.filter(post => post.frontmatter.tags.includes(selectedTag))
    : posts;

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
          <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
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
              onClick={() => setSelectedTag(null)}
              className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium transition-colors ${
                selectedTag === null
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-primary/10 text-primary border-transparent hover:bg-primary/20'
              }`}
            >
              <Tag className="h-3 w-3" />
              {t('allPosts')}
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium transition-colors ${
                  selectedTag === tag
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-primary/10 text-primary border-transparent hover:bg-primary/20'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </ScrollAnimate>
      )}

      {/* Posts Grid */}
      {loading ? (
        <div className="flex justify-center py-20" role="status" aria-label="Loading blog posts">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <span className="sr-only">Loading blog posts...</span>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">{t('noPosts')}</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <Card className="group overflow-hidden transition-all duration-200 hover:shadow-xl hover:translate-y-[-4px] h-full flex flex-col">
                {/* Featured Image */}
                {post.frontmatter.featured_image && (
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
                )}
                <CardHeader>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {getTitle(post)}
                      </Link>
                    </h3>
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
