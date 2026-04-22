'use client';

import { Calendar, Clock, User } from 'lucide-react';
import { TagBadge } from '@/components/ui/tag-badge';
import { SocialShare } from '@/components/blog/social-share';
import { BlogPostReadingTime } from '@/components/blog/blog-post-nav';
import { useLocale } from '@/components/providers/locale-provider';

interface Frontmatter {
  title: string;
  titleHe?: string;
  description: string;
  descriptionHe?: string;
  date: string;
  author?: string;
  tags: string[];
}

interface Props {
  frontmatter: Frontmatter;
  shareUrl: string;
  readingTime: number;
}

export function BlogPostLocalizedHeader({ frontmatter, shareUrl, readingTime }: Props) {
  const { locale } = useLocale();

  const title = locale === 'he' && frontmatter.titleHe ? frontmatter.titleHe : frontmatter.title;
  const description =
    locale === 'he' && frontmatter.descriptionHe ? frontmatter.descriptionHe : frontmatter.description;
  const dateLabel = new Date(frontmatter.date).toLocaleDateString(
    locale === 'he' ? 'he-IL' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <header className="mb-8 space-y-4">
      <h1 className="text-4xl md:text-5xl font-bold leading-tight text-glow">{title}</h1>

      {description && <p className="text-xl text-foreground/80">{description}</p>}

      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>{frontmatter.author || "Elad Ya'akobovitch"}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <time dateTime={frontmatter.date}>{dateLabel}</time>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <BlogPostReadingTime minutes={readingTime} />
        </div>
      </div>

      {frontmatter.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {frontmatter.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} variant="default" showIcon={true} />
          ))}
        </div>
      )}

      <SocialShare url={shareUrl} title={title} />
    </header>
  );
}
