import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  Building2,
  CalendarCheck,
  Check,
  ChevronDown,
  Clock,
  FileText,
  GraduationCap,
  HeartHandshake,
  PhoneCall,
  Presentation,
  ScrollText,
  Sparkles,
  Users,
  UsersRound,
  type LucideIcon,
} from 'lucide-react';
import { BookingForm } from './booking-form';
import { LECTURES_COPY, SITE_URL, type AudienceId, type FormatId, type LecturesLocale } from './content';
import { cn } from '@/lib/utils';

const AUDIENCE_ICONS: Record<AudienceId, LucideIcon> = {
  org: Building2,
  school: GraduationCap,
  community: UsersRound,
  torah: BookOpen,
  parents: HeartHandshake,
  other: Users,
};
const FORMAT_ICONS: Record<FormatId, LucideIcon> = {
  torah: ScrollText,
  talk: Presentation,
  workshop: Sparkles,
  series: CalendarCheck,
};
const STEP_ICONS: LucideIcon[] = [PhoneCall, FileText, Presentation, BookOpen];

const focusRing = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring';

function pagePath(locale: LecturesLocale) {
  return locale === 'en' ? '/en/lectures' : '/lectures';
}

export function lecturesJsonLd(locale: LecturesLocale) {
  const c = LECTURES_COPY[locale];
  const url = `${SITE_URL}${pagePath(locale)}`;
  const inLanguage = locale === 'he' ? 'he-IL' : 'en-US';
  const person = {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: locale === 'he' ? 'אלעד יעקובוביץ׳' : 'Elad Yakobovich',
    url: `${SITE_URL}/about`,
  };
  const torah = c.formats.items.find((f) => f.id === 'torah');
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: c.meta.title,
      description: c.meta.description,
      serviceType: locale === 'he' ? 'הרצאות וסדנאות בינה מלאכותית' : 'AI talks and workshops',
      url,
      inLanguage,
      provider: person,
      areaServed: { '@type': 'Country', name: locale === 'he' ? 'ישראל' : 'Israel' },
      audience: c.audiences.items.map((a) => ({ '@type': 'Audience', audienceType: a.label })),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: c.formats.title,
        itemListElement: c.formats.items.map((f) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: f.title, description: f.summary },
        })),
      },
    },
    torah && {
      '@context': 'https://schema.org',
      '@type': 'Course',
      '@id': `${url}#torah-course`,
      name: torah.title,
      description: torah.summary,
      inLanguage,
      provider: person,
      teaches: torah.takeaways,
      educationalLevel: locale === 'he' ? 'ללא ידע קודם' : 'Beginner',
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'onsite',
        courseWorkload: 'PT3H',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: c.faq.items.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: locale === 'he' ? 'בית' : 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: c.meta.title, item: url },
      ],
    },
  ].filter(Boolean);
}

/** Server-rendered JSON-LD (plain <script>, not next/script, so crawlers see it). */
export function LecturesJsonLd({ locale }: { locale: LecturesLocale }) {
  return (
    <>
      {lecturesJsonLd(locale).map((schema, i) => (
        <script
          // biome-ignore lint: static index for a static list
          key={i}
          type="application/ld+json"
          // JSON.stringify output; '<' escaped so no copy can close the script tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
        />
      ))}
    </>
  );
}

export function LecturesPage({ locale }: { locale: LecturesLocale }) {
  const c = LECTURES_COPY[locale];
  const featured = c.formats.items.find((f) => f.featured);
  const rest = c.formats.items.filter((f) => !f.featured);

  return (
    <div className="relative overflow-x-clip bg-background text-foreground">
      {/* ------------------------------ HERO ------------------------------ */}
      <header className="relative isolate">
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_70%_0%,rgba(139,92,246,0.18),transparent_65%)]"
          aria-hidden="true"
        />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-12 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-24 lg:pt-20">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              <Presentation className="size-4" aria-hidden="true" />
              {c.hero.kicker}
            </p>
            <h1 className="text-balance text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
              {c.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">{c.hero.lead}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#booking"
                className={cn(
                  'group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cta px-7 text-base font-bold text-cta-foreground shadow-[0_10px_30px_-12px_rgba(245,158,11,0.7)] transition-transform duration-150 hover:-translate-y-0.5 active:scale-[.97] motion-reduce:transition-none motion-reduce:hover:translate-y-0',
                  focusRing,
                )}
              >
                {c.hero.cta}
                <ArrowLeft className="size-5 transition-transform duration-150 group-hover:-translate-x-0.5 ltr:rotate-180" aria-hidden="true" />
              </a>
              <a
                href="#formats"
                className={cn(
                  'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border px-6 font-semibold text-foreground transition-colors duration-150 hover:border-primary hover:text-primary',
                  focusRing,
                )}
              >
                {c.hero.secondary}
                <ChevronDown className="size-4" aria-hidden="true" />
              </a>
            </div>
            <p className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="size-4 text-primary" aria-hidden="true" />
              {c.hero.note}
            </p>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-border shadow-[0_30px_80px_-40px_rgba(139,92,246,0.6)]">
              <Image
                src="/images/lectures-hero.jpg"
                alt={c.hero.imageAlt}
                width={1400}
                height={933}
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* ---------------------------- AUDIENCES ---------------------------- */}
        <section aria-labelledby="aud-title" className="border-y border-border bg-muted/30">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
            <h2 id="aud-title" className="text-3xl font-bold sm:text-4xl">
              {c.audiences.title}
            </h2>
            <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">{c.audiences.lead}</p>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {c.audiences.items.map((a) => {
                const Icon = AUDIENCE_ICONS[a.id];
                return (
                  <li
                    key={a.id}
                    className={cn(
                      'rounded-2xl border border-border bg-card p-5 transition-colors duration-150 hover:border-primary/60',
                      a.id === 'torah' && 'border-primary/50 ring-1 ring-primary/30',
                    )}
                  >
                    <Icon className="mb-4 size-7 text-primary" aria-hidden="true" />
                    <h3 className="font-bold">{a.label}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ----------------------------- FORMATS ----------------------------- */}
        <section id="formats" aria-labelledby="fmt-title" className="scroll-mt-24">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <h2 id="fmt-title" className="text-3xl font-bold sm:text-4xl">
              {c.formats.title}
            </h2>
            <p className="mt-3 text-muted-foreground">{c.formats.lead}</p>

            {featured && (
              <article className="mt-10 grid overflow-hidden rounded-3xl border border-primary/40 bg-card lg:grid-cols-[1.15fr_1fr]">
                <div className="p-6 sm:p-10">
                  <FormatHead format={featured} />
                  <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">{featured.summary}</p>
                  <Takeaways title={c.formats.leaveWith} items={featured.takeaways} />
                  <a
                    href="#booking"
                    className={cn(
                      'mt-8 inline-flex min-h-12 items-center gap-2 rounded-xl bg-cta px-6 font-bold text-cta-foreground transition-transform duration-150 hover:-translate-y-0.5 active:scale-[.97] motion-reduce:hover:translate-y-0',
                      focusRing,
                    )}
                  >
                    {c.formats.ask}
                    <ArrowLeft className="size-5 ltr:rotate-180" aria-hidden="true" />
                  </a>
                </div>
                <div className="relative min-h-64 lg:min-h-full">
                  <Image
                    src="/images/lectures-formats.jpg"
                    alt={c.recent.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 480px, 100vw"
                    className="object-cover"
                  />
                </div>
              </article>
            )}

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              {rest.map((f) => (
                <article key={f.id} className="flex flex-col rounded-3xl border border-border bg-card p-6 transition-colors duration-150 hover:border-primary/60 sm:p-8">
                  <FormatHead format={f} compact />
                  <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{f.summary}</p>
                  <Takeaways title={c.formats.leaveWith} items={f.takeaways} />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------- FROM THE FIELD ----------------------------- */}
        <section aria-labelledby="recent-title" className="border-y border-border bg-muted/30">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_1.2fr] lg:py-20">
            <div>
              <h2 id="recent-title" className="text-3xl font-bold sm:text-4xl">
                {c.recent.title}
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed">{c.recent.text}</p>
            </div>
            <ol className="space-y-4">
              {c.recent.bullets.map((b, i) => (
                <li key={b} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/15 font-bold tabular-nums text-primary">{i + 1}</span>
                  <span className="pt-1 leading-relaxed">{b}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ----------------------------- HOW IT WORKS ----------------------------- */}
        <section aria-labelledby="how-title">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <h2 id="how-title" className="text-3xl font-bold sm:text-4xl">
              {c.how.title}
            </h2>
            <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {c.how.steps.map((s, i) => {
                const Icon = STEP_ICONS[i] ?? Check;
                return (
                  <li key={s.title} className="relative">
                    <div className="flex items-center gap-3">
                      <span className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
                        <Icon className="size-6" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-semibold tabular-nums text-muted-foreground">0{i + 1}</span>
                    </div>
                    <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{s.text}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* ----------------------------- ABOUT ----------------------------- */}
        <section aria-labelledby="about-title" className="border-y border-border bg-muted/30">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
            <h2 id="about-title" className="text-3xl font-bold">
              {c.about.title}
            </h2>
            <div className="mt-5 space-y-3 text-lg leading-relaxed">
              {c.about.lines.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
            <Link href="/about" className={cn('mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-primary underline-offset-4 hover:underline', focusRing)}>
              {c.about.link}
              <ArrowLeft className="size-4 ltr:rotate-180" aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* ----------------------------- FAQ ----------------------------- */}
        <section aria-labelledby="faq-title">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
            <h2 id="faq-title" className="text-3xl font-bold sm:text-4xl">
              {c.faq.title}
            </h2>
            <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
              {c.faq.items.map((f) => (
                <details key={f.q} className="group">
                  <summary
                    className={cn(
                      'flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold [&::-webkit-details-marker]:hidden',
                      focusRing,
                    )}
                  >
                    <h3 className="text-base">{f.q}</h3>
                    <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <p className="px-5 pb-5 leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------- BOOKING ----------------------------- */}
        <section id="booking" aria-labelledby="booking-title" className="scroll-mt-20 border-t border-border bg-muted/30">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
            <h2 id="booking-title" className="text-3xl font-bold sm:text-4xl">
              {c.form.title}
            </h2>
            <p className="mb-8 mt-3 text-pretty text-muted-foreground">{c.form.lead}</p>
            <BookingForm locale={locale} />
          </div>
        </section>
      </main>
    </div>
  );
}

function FormatHead({
  format,
  compact,
}: {
  format: (typeof LECTURES_COPY)['he']['formats']['items'][number];
  compact?: boolean;
}) {
  const Icon = FORMAT_ICONS[format.id];
  return (
    <div>
      <span className="grid size-12 place-items-center rounded-2xl bg-primary/15 text-primary">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <h3 className={cn('mt-5 text-balance font-bold', compact ? 'text-xl' : 'text-2xl sm:text-3xl')}>{format.title}</h3>
      <div className="mt-3 flex flex-wrap gap-2 text-sm">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-foreground">
          <Clock className="size-4 text-primary" aria-hidden="true" />
          {format.duration}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-foreground">
          <Users className="size-4 text-primary" aria-hidden="true" />
          {format.forWhom}
        </span>
      </div>
    </div>
  );
}

function Takeaways({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-6">
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <ul className="mt-3 space-y-2">
        {items.map((t) => (
          <li key={t} className="flex gap-2.5 leading-relaxed">
            <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
