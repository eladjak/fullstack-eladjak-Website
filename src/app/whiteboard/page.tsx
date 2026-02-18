'use client';

import Link from 'next/link';
import { Pen, ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function WhiteboardPage() {
  const t = useTranslations('nav');

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md px-4">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Pen className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Whiteboard</h1>
        <p className="text-muted-foreground">
          The collaborative whiteboard is being upgraded. Check back soon!
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('home')}
        </Link>
      </div>
    </div>
  );
}
