import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  Camera,
  CalendarCheck,
  Check,
  ChevronDown,
  Clock,
  FileText,
  HeartHandshake,
  PhoneCall,
  Presentation,
  ScrollText,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { AudienceTabs, type AudienceTabItem } from './audience-tabs';
import { BookingForm } from './booking-form';
import { LECTURES_COPY_V2 } from './content-v2';
import { FaqChat } from './faq-chat';
import { HeroMedia, type HeroVideo } from './hero-media';
import { RevealRoot } from './reveal-root';
import { LECTURES_COPY, SITE_URL, type FormatId, type LecturesLocale } from './content';
import { cn } from '@/lib/utils';

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

/**
 * The opening film is wired by file presence: next.config.js checks
 * public/videos/lectures-intro.mp4 (and .webm) at build time. Once the file is in
 * the build, the hero plays it (lazy, muted, captioned). Until then the
 * illustrated stage is the hero, and previews show a note where the film goes.
 */
function getHeroVideo(locale: LecturesLocale, captionsLabel: string): HeroVideo | null {
  if (!process.env.LECTURES_INTRO_MP4) return null;
  return {
    mp4: '/videos/lectures-intro.mp4',
    webm: process.env.LECTURES_INTRO_WEBM ? '/videos/lectures-intro.webm' : undefined,
    captions: `/videos/lectures-intro.${locale}.vtt`,
    captionsLang: locale,
    captionsLabel,
  };
}

export function LecturesPage({ locale }: { locale: LecturesLocale }) {
  const c = LECTURES_COPY[locale];
  const v = LECTURES_COPY_V2[locale];
  const torahFormat = c.formats.items.find((f) => f.id === 'torah');
  const rest = c.formats.items.filter((f) => f.id !== 'torah');
  const dir = locale === 'he' ? 'rtl' : 'ltr';
  // The speaker-media frame is a note for Elad: shown in previews and local builds only,
  // never on the production site until a real photo or clip replaces it.
  const showMediaSlot = process.env.VERCEL_ENV !== 'production';
  const heroVideo = getHeroVideo(locale, v.hero.captionsLabel);

  const tabOrder = ['org', 'school', 'community', 'torah'];
  const panels = [...v.audiences.panels].sort((x, y) => tabOrder.indexOf(x.id) - tabOrder.indexOf(y.id));
  const audienceItems: AudienceTabItem[] = panels.map((p) => {
    const a = c.audiences.items.find((x) => x.id === p.id);
    return {
      id: p.id,
      tab: p.tab,
      label: a?.label ?? p.tab,
      text: a?.text ?? '',
      image: p.image,
      imageAlt: p.imageAlt,
      suggestHref: p.suggest === 'torah' ? '#torah' : `#format-${p.suggest}`,
      suggestLabel: p.suggestLabel,
    };
  });

  return (
    <div className="relative overflow-x-clip bg-background text-foreground">
      <RevealRoot />
      <noscript>
        <style>{'[role="tabpanel"][data-state="inactive"]{display:block!important}'}</style>
      </noscript>

      {/* ------------------------------ HERO ------------------------------ */}
      <header className="lec-hero-bg relative isolate">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:pb-32 lg:pt-24">
          <div>
            <p className="mb-6 text-base font-semibold text-cta">{c.hero.kicker}</p>
            <h1 className="text-balance font-extrabold leading-[1.08] tracking-tight">
              <span className="block text-balance text-[clamp(2.1rem,4.8vw,3.5rem)]">{v.hero.line1}</span>
              <span className="mt-1 block text-balance text-[clamp(1.6rem,3.5vw,2.6rem)] text-muted-foreground">{v.hero.line2}</span>
            </h1>
            <p className="mt-8 max-w-[58ch] text-pretty text-lg leading-[1.75] text-muted-foreground sm:text-xl">
              {c.hero.lead}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#booking"
                className={cn(
                  'group inline-flex min-h-14 items-center justify-center gap-2.5 rounded-2xl bg-cta px-8 text-lg font-bold text-cta-foreground shadow-[0_14px_36px_-16px_rgba(245,158,11,0.75)] transition-transform duration-150 hover:-translate-y-0.5 active:scale-[.97] motion-reduce:transition-none motion-reduce:hover:translate-y-0',
                  focusRing,
                )}
              >
                {c.hero.cta}
                <ArrowLeft className="size-5 transition-transform duration-150 group-hover:-translate-x-1 ltr:rotate-180 ltr:group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
              </a>
              <a
                href="#formats"
                className={cn(
                  'inline-flex min-h-12 items-center justify-center gap-2 px-2 font-semibold text-muted-foreground underline-offset-[6px] transition-colors duration-150 hover:text-foreground hover:underline',
                  focusRing,
                )}
              >
                {c.hero.secondary}
                <ChevronDown className="size-4" aria-hidden="true" />
              </a>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-base text-muted-foreground">
              {[...v.hero.facts, c.hero.note].map((f) => (
                <li key={f} className="inline-flex items-center gap-2.5">
                  <span className="size-1.5 shrink-0 rounded-full bg-cta" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <figure className="relative mx-auto w-full max-w-[560px] lg:max-w-none" aria-label={v.hero.sceneLabel}>
            <HeroMedia
              poster="/images/lectures-stage.webp"
              posterAlt={c.hero.imageAlt}
              video={heroVideo}
              labels={v.hero}
              transcript={v.hero.transcriptLines}
              slotNote={showMediaSlot ? v.hero.videoSlotNote : null}
            />
          </figure>
        </div>
      </header>

      <main>
        {/* ---------------------------- AUDIENCES ---------------------------- */}
        <section aria-labelledby="aud-title" className="border-t border-border">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
            <div className="lec-reveal max-w-3xl">
              <h2 id="aud-title" className="text-balance text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.15]">
                {c.audiences.title}
              </h2>
              <p className="mt-4 text-pretty text-lg leading-[1.75] text-muted-foreground">{c.audiences.lead}</p>
            </div>
            <div className="lec-reveal">
              <AudienceTabs items={audienceItems} dir={dir} suggestPrefix={v.audiences.suggestPrefix} listLabel={c.audiences.title} />
            </div>
            <p className="lec-reveal mt-8 inline-flex items-center gap-2 text-base text-muted-foreground">
              <HeartHandshake className="size-5 shrink-0 text-cta" aria-hidden="true" />
              {v.audiences.eyebrowParents}
            </p>
          </div>
        </section>

        {/* ----------------------------- FORMATS INDEX ----------------------------- */}
        <section id="formats" aria-labelledby="idx-title" className="scroll-mt-24 border-t border-border">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
            <div className="lec-reveal max-w-3xl">
              <h2 id="idx-title" className="text-balance text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.15]">
                {v.index.title}
              </h2>
              <p className="mt-4 text-lg leading-[1.75] text-muted-foreground">{v.index.lead}</p>
            </div>
            <ul className="lec-reveal mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[torahFormat, ...rest].filter(Boolean).map((f) => {
                if (!f) return null;
                const Icon = FORMAT_ICONS[f.id];
                return (
                  <li key={f.id}>
                    <a
                      href={f.id === 'torah' ? '#torah' : `#format-${f.id}`}
                      className={cn('lec-card group flex h-full min-h-[11rem] flex-col rounded-2xl border border-border bg-card p-6', focusRing)}
                    >
                      <Icon className="size-6 text-cta" aria-hidden="true" />
                      <span className="mt-4 text-pretty text-lg font-bold leading-snug">{f.title}</span>
                      <span className="mt-auto pt-4 text-sm text-muted-foreground">{f.duration}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ----------------------------- TORAH MORNING (featured format) ----------------------------- */}
        {torahFormat && (
          <section aria-labelledby="torah-title" className="scroll-mt-24 border-t border-border bg-card/40">
            <span id="torah" className="block scroll-mt-24" aria-hidden="true" />
            <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
              <p className="lec-reveal mb-4 inline-flex items-center gap-2 text-base font-semibold text-cta">
                <ScrollText className="size-5" aria-hidden="true" />
                {v.torah.label}
              </p>
              <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
                <div className="lec-reveal">
                  <h2 id="torah-title" className="text-balance text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.15]">
                    {torahFormat.title}
                  </h2>
                  <p className="mt-3 text-lg font-semibold text-muted-foreground">{v.torah.title}</p>
                  <p className="mt-6 max-w-[60ch] text-pretty text-lg leading-[1.75]">{v.torah.lead}</p>
                  <FormatMeta format={torahFormat} locale={locale} />

                  <h3 className="mt-12 text-xl font-bold">{v.torah.partsTitle}</h3>
                  <ol className="mt-5 space-y-4">
                    {v.torah.parts.map((p, i) => (
                      <li key={p.title} className="lec-card flex gap-5 rounded-2xl border border-border bg-background/60 p-5 sm:p-6">
                        <span className="grid size-10 shrink-0 place-items-center rounded-full lec-cta-tint text-lg font-bold tabular-nums text-cta">
                          {i + 1}
                        </span>
                        <div>
                          <h4 className="text-lg font-bold">{p.title}</h4>
                          <p className="mt-1.5 leading-[1.75] text-muted-foreground">{p.text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="lec-reveal space-y-8">
                  <div className="relative aspect-[3/2] overflow-hidden rounded-3xl border border-border">
                    <Image
                      src={v.torah.image}
                      alt={v.torah.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 520px, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <Takeaways title={c.formats.leaveWith} items={torahFormat.takeaways} level={3} />
                  <div>
                    <h3 className="text-base font-bold">{v.torah.respectTitle}</h3>
                    <ul className="mt-3 space-y-2">
                      {v.torah.respect.map((r) => (
                        <li key={r} className="flex gap-3 leading-[1.7] text-muted-foreground">
                          <span className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-cta" aria-hidden="true" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href="#booking-torah"
                    className={cn(
                      'group inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-2xl bg-cta px-8 text-lg font-bold text-cta-foreground transition-transform duration-150 hover:-translate-y-0.5 active:scale-[.97] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-auto',
                      focusRing,
                    )}
                  >
                    {c.formats.ask}
                    <ArrowLeft className="size-5 ltr:rotate-180" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ----------------------------- OTHER FORMATS ----------------------------- */}
        <section aria-labelledby="fmt-title" className="border-t border-border">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
            <div className="lec-reveal max-w-3xl">
              <h2 id="fmt-title" className="text-balance text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.15]">
                {v.formatsOther.title}
              </h2>
              <p className="mt-4 text-lg leading-[1.75] text-muted-foreground">{v.formatsOther.lead}</p>
            </div>
            <div className="mt-12 divide-y divide-border border-y border-border">
              {rest.map((f) => {
                const Icon = FORMAT_ICONS[f.id];
                return (
                  <article
                    key={f.id}
                    id={`format-${f.id}`}
                    aria-labelledby={`format-${f.id}-title`}
                    className="lec-reveal grid scroll-mt-24 gap-6 py-10 lg:grid-cols-[1fr_1.1fr_1fr] lg:gap-10 lg:py-12"
                  >
                    <div>
                      <Icon className="size-7 text-cta" aria-hidden="true" />
                      <h3 id={`format-${f.id}-title`} className="mt-4 text-balance text-2xl font-bold">
                        {f.title}
                      </h3>
                      <FormatMeta format={f} locale={locale} />
                    </div>
                    <p className="text-pretty text-lg leading-[1.75] text-muted-foreground">{f.summary}</p>
                    <Takeaways title={c.formats.leaveWith} items={f.takeaways} compact />
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ----------------------------- FROM THE FIELD ----------------------------- */}
        <section aria-labelledby="recent-title" className="border-t border-border bg-card/40">
          <div
            className={cn(
              'mx-auto grid gap-12 px-5 py-20 sm:px-8 lg:gap-16 lg:py-28',
              showMediaSlot ? 'max-w-6xl lg:grid-cols-[1fr_1.1fr]' : 'max-w-3xl',
            )}
          >
            <div className="lec-reveal">
              <p className="text-base font-semibold text-cta">
                {v.field.label} · <span className="tabular-nums">{v.field.date}</span>
              </p>
              <h2 id="recent-title" className="sr-only">
                {c.recent.title}
              </h2>
              <p className="mt-5 text-balance text-[clamp(1.5rem,2.6vw,2.1rem)] font-bold leading-[1.45]">{c.recent.text}</p>
              <ol className="mt-10 space-y-5">
                {c.recent.bullets.map((b, i) => (
                  <li key={b} className="flex gap-4">
                    <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-border text-sm font-bold tabular-nums text-cta">
                      {i + 1}
                    </span>
                    <span className="text-lg leading-[1.75] text-muted-foreground">{b}</span>
                  </li>
                ))}
              </ol>
            </div>
            {showMediaSlot && (
              <div className="lec-reveal">
                <figure className="grid aspect-[4/3] place-items-center rounded-3xl border-2 border-dashed lec-cta-edge p-8 text-center">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full lec-cta-tint px-3 py-1 text-sm font-semibold text-cta">
                      <Camera className="size-4" aria-hidden="true" />
                      {v.media.previewBadge}
                    </span>
                    <h3 className="mt-5 text-xl font-bold">{v.media.title}</h3>
                    <p className="mx-auto mt-3 max-w-[40ch] leading-[1.7] text-muted-foreground">{v.media.text}</p>
                  </div>
                </figure>
              </div>
            )}
          </div>
        </section>

        {/* ----------------------------- HOW IT WORKS ----------------------------- */}
        <section aria-labelledby="how-title" className="border-t border-border">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
            <h2 id="how-title" className="lec-reveal text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.15]">
              {c.how.title}
            </h2>
            <div className="relative mt-14">
              <div className="lec-line absolute inset-x-0 top-6 hidden h-px lg:block" aria-hidden="true">
                <div className="h-px w-full bg-[color-mix(in_srgb,var(--cta)_60%,transparent)]" />
              </div>
              <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                {c.how.steps.map((s, i) => {
                  const Icon = STEP_ICONS[i] ?? Check;
                  return (
                    <li key={s.title} className="lec-reveal" style={{ transitionDelay: `${i * 90}ms` }}>
                      <span className="relative grid size-12 place-items-center rounded-2xl border border-border bg-background text-cta">
                        <Icon className="size-6" aria-hidden="true" />
                      </span>
                      <h3 className="mt-5 text-xl font-bold">
                        <span className="sr-only">{i + 1}. </span>
                        {s.title}
                      </h3>
                      <p className="mt-2 leading-[1.75] text-muted-foreground">{s.text}</p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </section>

        {/* ----------------------------- ABOUT ----------------------------- */}
        <section aria-labelledby="about-title" className="border-t border-border bg-card/40">
          <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 lg:py-28">
            <div className="lec-reveal grid items-center gap-6 sm:grid-cols-[auto_1fr] sm:gap-8">
              <Image
                src="https://avatars.githubusercontent.com/u/108827199?v=4"
                alt={v.aboutPhotoAlt}
                width={112}
                height={112}
                className="size-24 rounded-full border-2 lec-cta-edge object-cover sm:size-28"
              />
              <div>
                <h2 id="about-title" className="text-balance text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-[1.2]">
                  {c.about.title}
                </h2>
                <p className="mt-3 max-w-[60ch] text-pretty text-lg leading-[1.75] text-muted-foreground">{c.about.intro}</p>
              </div>
            </div>
            <ul className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2">
              {c.about.items.map((item, i) => (
                <li key={item.gain} className="lec-reveal flex gap-4" style={{ transitionDelay: `${i * 80}ms` }}>
                  <span className="mt-1 grid size-9 shrink-0 place-items-center rounded-full lec-cta-tint text-cta">
                    <Check className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-balance text-xl font-bold leading-[1.4]">{item.gain}</h3>
                    <p className="mt-2 text-pretty leading-[1.75] text-muted-foreground">{item.because}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href={locale === 'en' ? '/en/about' : '/about'}
              className={cn('lec-reveal mt-10 inline-flex min-h-11 items-center gap-2 font-semibold text-cta underline-offset-[6px] hover:underline', focusRing)}
            >
              {c.about.link}
              <ArrowLeft className="size-4 ltr:rotate-180" aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* ----------------------------- TESTIMONIALS (hidden until real quotes exist) ----------------------------- */}
        {v.testimonials.length > 0 && (
          <section aria-labelledby="testimonials-title" className="border-t border-border">
            <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 lg:py-28">
              <h2 id="testimonials-title" className="lec-reveal text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.15]">
                {v.testimonialsTitle}
              </h2>
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                {v.testimonials.map((t) => (
                  <figure key={t.name} className="lec-reveal rounded-3xl border border-border bg-card/60 p-8">
                    <blockquote className="text-pretty text-lg leading-[1.75]">{t.quote}</blockquote>
                    <figcaption className="mt-5 text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">{t.name}</span> · {t.role}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ----------------------------- FAQ ----------------------------- */}
        <section aria-labelledby="faq-title" className="border-t border-border">
          <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 lg:py-28">
            <h2 id="faq-title" className="lec-reveal text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.15]">
              {c.faq.title}
            </h2>
            <p className="lec-reveal mt-4 max-w-[60ch] text-lg leading-[1.75] text-muted-foreground">{v.faqChat.lead}</p>
            <div className="lec-reveal mt-10">
              <FaqChat
                items={c.faq.items}
                labels={v.faqChat}
                avatarSrc="https://avatars.githubusercontent.com/u/108827199?v=4"
                bookingHref="#booking"
                dir={dir}
              />
            </div>
          </div>
        </section>

        {/* ----------------------------- BOOKING ----------------------------- */}
        <section id="booking" aria-labelledby="booking-title" className="relative scroll-mt-20 border-t border-border bg-card/40">
          <span id="booking-torah" className="absolute top-0 scroll-mt-20" aria-hidden="true" />
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16 lg:py-28">
            <div>
              <h2 id="booking-title" className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.15]">
                {c.form.title}
              </h2>
              <p className="mt-4 text-pretty text-lg leading-[1.75] text-muted-foreground">{c.form.lead}</p>
              <ul className="mt-8 space-y-3">
                {v.bookingAside.map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-base">
                    <Check className="size-4 shrink-0 text-cta" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <BookingForm locale={locale} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function FormatMeta({
  format,
  locale,
}: {
  format: (typeof LECTURES_COPY)['he']['formats']['items'][number];
  locale: LecturesLocale;
}) {
  return (
    <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-base">
      <div className="inline-flex items-center gap-2">
        <dt>
          <Clock className="size-4 text-cta" aria-hidden="true" />
          <span className="sr-only">{locale === 'he' ? 'משך' : 'Duration'}</span>
        </dt>
        <dd>{format.duration}</dd>
      </div>
      <div className="inline-flex items-center gap-2">
        <dt>
          <Users className="size-4 text-cta" aria-hidden="true" />
          <span className="sr-only">{locale === 'he' ? 'למי' : 'For'}</span>
        </dt>
        <dd className="text-muted-foreground">{format.forWhom}</dd>
      </div>
    </dl>
  );
}

function Takeaways({
  title,
  items,
  compact,
  level = 4,
}: {
  title: string;
  items: string[];
  compact?: boolean;
  level?: 3 | 4;
}) {
  const H = level === 3 ? 'h3' : 'h4';
  return (
    <div className={compact ? '' : 'rounded-2xl border border-border p-5 sm:p-6'}>
      <H className="text-base font-bold">{title}</H>
      <ul className="mt-3 space-y-2.5">
        {items.map((t) => (
          <li key={t} className="flex gap-2.5 leading-[1.7]">
            <Check className="mt-1.5 size-4 shrink-0 text-cta" aria-hidden="true" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
