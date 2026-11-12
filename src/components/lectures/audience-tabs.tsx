'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AudienceTabItem {
  id: string;
  tab: string;
  label: string;
  text: string;
  image: string;
  imageAlt: string;
  suggestHref: string;
  suggestLabel: string;
}

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring';

/**
 * Audience switcher: one illustration + one paragraph per audience.
 * All panels are rendered on the server (forceMount) so every text is in the
 * HTML for crawlers and no-JS readers; inactive panels are only visually hidden.
 */
export function AudienceTabs({
  items,
  dir,
  suggestPrefix,
  listLabel,
}: {
  items: AudienceTabItem[];
  dir: 'rtl' | 'ltr';
  suggestPrefix: string;
  listLabel: string;
}) {
  return (
    <TabsPrimitive.Root defaultValue={items[0]?.id} dir={dir} className="mt-10">
      <TabsPrimitive.List
        aria-label={listLabel}
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
      >
        {items.map((a) => (
          <TabsPrimitive.Trigger
            key={a.id}
            value={a.id}
            className={cn(
              'min-h-11 shrink-0 rounded-full border border-border px-5 text-base font-semibold text-muted-foreground transition-[color,border-color,background-color] duration-150 hover:lec-cta-edge hover:text-foreground data-[state=active]:border-cta data-[state=active]:lec-cta-tint data-[state=active]:text-foreground',
              focusRing,
            )}
          >
            {a.tab}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>

      {items.map((a, i) => (
        <TabsPrimitive.Content
          key={a.id}
          value={a.id}
          forceMount
          className={cn('mt-6 data-[state=inactive]:hidden', focusRing)}
        >
          <div className="grid items-center gap-8 overflow-hidden rounded-3xl border border-border bg-card lg:grid-cols-[1.2fr_1fr]">
            <div className="relative aspect-[3/2] w-full lg:order-last">
              <Image
                src={a.image}
                alt={a.imageAlt}
                fill
                loading={i === 0 ? 'eager' : 'lazy'}
                sizes="(min-width: 1024px) 620px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="px-6 pb-8 sm:px-10 lg:py-10">
              <h3 className="text-2xl font-bold sm:text-3xl">{a.label}</h3>
              <p className="mt-4 max-w-[52ch] text-pretty text-lg leading-[1.75] text-muted-foreground">{a.text}</p>
              <p className="mt-6 text-sm font-semibold text-muted-foreground">{suggestPrefix}</p>
              <a
                href={a.suggestHref}
                className={cn(
                  'group mt-2 inline-flex min-h-11 items-center gap-2 text-lg font-bold text-foreground underline decoration-[color-mix(in_srgb,var(--cta)_55%,transparent)] decoration-2 underline-offset-[6px] transition-colors duration-150 hover:decoration-cta',
                  focusRing,
                )}
              >
                {a.suggestLabel}
                <ArrowLeft
                  className="size-5 text-cta transition-transform duration-150 group-hover:-translate-x-1 ltr:rotate-180 ltr:group-hover:translate-x-1 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
}
