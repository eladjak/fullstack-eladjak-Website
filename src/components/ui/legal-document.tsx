import type { ReactNode } from 'react';

export const legalLinkClass = 'rounded-sm text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      {children}
    </section>
  );
}

export function LegalDocument({ title, englishTitle, children }: { title: string; englishTitle: string; children: ReactNode }) {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-16 md:py-24">
      <article className="space-y-10 text-base leading-8 text-foreground/90">
        <header lang="he" dir="rtl" className="space-y-3">
          <h1 className="text-3xl font-bold leading-tight text-foreground md:text-4xl">{title}</h1>
          <p className="text-sm text-muted-foreground">עודכן: 19 בנובמבר 2026</p>
          <a className={`inline-flex min-h-11 items-center ${legalLinkClass}`} href="#english" lang="en" dir="ltr">{englishTitle} in English</a>
        </header>
        {children}
      </article>
    </main>
  );
}
