'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';

/**
 * Client-side navigation links for blog post pages.
 * Uses i18n translations for "Back to Blog", "All Posts", and "Get in touch".
 */
export function BlogPostBackLink() {
  const t = useTranslations('blogPage');

  return (
    <Link
      href="/blog"
      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
    >
      <ArrowLeft className="h-4 w-4" />
      {t('backToBlog')}
    </Link>
  );
}

export function BlogPostFooter() {
  const t = useTranslations('blogPage');

  return (
    <div className="flex justify-between items-center">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-primary hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('allPostsLink')}
      </Link>
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 text-primary hover:underline"
      >
        {t('getInTouch')}
      </Link>
    </div>
  );
}

export function BlogPostReadingTime({ minutes }: { minutes: number }) {
  const t = useTranslations('blogPage');

  return (
    <span>{minutes} {t('minRead')}</span>
  );
}
