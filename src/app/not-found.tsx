'use client';

import Link from 'next/link';
import { FileQuestion, Home, Search, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className="min-h-dvh flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* 404 Animation */}
        <div className="relative">
          <div className="text-9xl font-bold text-primary/15 select-none dark:text-primary/20">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-primary/10 p-8 dark:bg-primary/15 dark:shadow-[0_0_24px_4px_hsla(263,70%,60%,0.25)] transition-shadow duration-300">
              <FileQuestion className="h-16 w-16 text-primary" />
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-foreground text-glow">
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
            className="group flex flex-col items-center gap-3 p-6 glow-border bg-card/60 backdrop-blur-sm border border-border/60 rounded-lg hover:border-primary/60 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
            className="group flex flex-col items-center gap-3 p-6 glow-border bg-card/60 backdrop-blur-sm border border-border/60 rounded-lg hover:border-primary/60 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
            className="group flex flex-col items-center gap-3 p-6 glow-border bg-card/60 backdrop-blur-sm border border-border/60 rounded-lg hover:border-primary/60 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
        <div className="pt-8 border-t border-border/60">
          <p className="text-sm text-muted-foreground">
            {t('needHelp')}{' '}
            <Link href="/contact" className="text-primary hover:underline hover:text-primary/80 inline-flex items-center gap-1 transition-colors duration-150">
              {t('contactUs')}
              <ArrowRight className="h-3 w-3" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
