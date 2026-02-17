'use client';

import Link from 'next/link';
import { FileQuestion, Home, Search, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* 404 Animation */}
        <div className="relative">
          <div className="text-9xl font-bold text-primary/10 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-primary/10 p-8">
              <FileQuestion className="h-16 w-16 text-primary" />
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-foreground">
            {t('title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-4">
          <Link
            href="/"
            className="group flex flex-col items-center gap-3 p-6 bg-card border border-border rounded-lg hover:border-primary hover:shadow-md transition-all"
          >
            <div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
              <Home className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-1">
              <div className="font-medium">{t('home')}</div>
              <div className="text-xs text-muted-foreground">{t('homeDesc')}</div>
            </div>
          </Link>

          <Link
            href="/blog"
            className="group flex flex-col items-center gap-3 p-6 bg-card border border-border rounded-lg hover:border-primary hover:shadow-md transition-all"
          >
            <div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
              <FileQuestion className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-1">
              <div className="font-medium">{t('blog')}</div>
              <div className="text-xs text-muted-foreground">{t('blogDesc')}</div>
            </div>
          </Link>

          <Link
            href="/projects"
            className="group flex flex-col items-center gap-3 p-6 bg-card border border-border rounded-lg hover:border-primary hover:shadow-md transition-all"
          >
            <div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-1">
              <div className="font-medium">{t('projects')}</div>
              <div className="text-xs text-muted-foreground">{t('projectsDesc')}</div>
            </div>
          </Link>
        </div>

        {/* Additional Help */}
        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            {t('needHelp')}{' '}
            <Link href="/contact" className="text-primary hover:underline inline-flex items-center gap-1">
              {t('contactUs')}
              <ArrowRight className="h-3 w-3" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
