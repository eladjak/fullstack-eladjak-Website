'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageCircle, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * FAQ as a conversation, for /lectures.
 *
 * Every answer comes from the fixed FAQ list passed in (the same list that feeds
 * the FAQPage JSON-LD). No model call, no network. Chips ask, a short typing
 * beat, then the answer. Reduced motion: no typing beat, no movement.
 *
 * Without JS (and for crawlers) the full Q&A list below the chat is rendered
 * open in the server HTML; after hydration it collapses into "all questions".
 */

export interface FaqChatItem {
  q: string;
  a: string;
}

export interface FaqChatLabels {
  name: string;
  status: string;
  intro: string;
  pick: string;
  more: string;
  restart: string;
  allList: string;
  typing: string;
  logLabel: string;
  notFound: string;
  notFoundCta: string;
  avatarAlt: string;
  you: string;
  elad: string;
}

interface Msg {
  id: number;
  role: 'me' | 'elad';
  text: string;
}

const FIRST_CHIPS = 4;

export function FaqChat({
  items,
  labels,
  avatarSrc,
  bookingHref,
  dir,
}: {
  items: FaqChatItem[];
  labels: FaqChatLabels;
  avatarSrc: string;
  bookingHref: string;
  dir: 'rtl' | 'ltr';
}) {
  const [hydrated, setHydrated] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [asked, setAsked] = useState<number[]>([]);
  const [typing, setTyping] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);
  const timer = useRef<number | null>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const userToggled = useRef(false);
  const [listOpen, setListOpen] = useState(true);

  useEffect(() => {
    setHydrated(true);
    // The full list is open in server HTML (no-JS, crawlers). Collapse it once JS
    // runs, unless the visitor already opened or closed it themselves.
    if (!userToggled.current) setListOpen(false);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    const el = logRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollTo({ top: el.scrollHeight, behavior: reduce ? 'auto' : 'smooth' });
  }, [msgs, typing]);

  // Keep keyboard users in place: when the focused chip disappears, move focus to
  // the first remaining chip (or the restart button when none are left).
  const refocus = () => {
    window.requestAnimationFrame(() => {
      const box = chipsRef.current;
      if (!box || box.contains(document.activeElement)) return;
      const next = box.querySelector<HTMLButtonElement>('button');
      next?.focus();
    });
  };

  const ask = (i: number) => {
    if (typing) return;
    const item = items[i];
    if (!item) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    idRef.current += 1;
    const qId = idRef.current;
    setMsgs((m) => [...m, { id: qId, role: 'me', text: item.q }]);
    setAsked((a) => (a.includes(i) ? a : [...a, i]));
    setTyping(true);
    refocus();
    timer.current = window.setTimeout(
      () => {
        idRef.current += 1;
        const aId = idRef.current;
        setMsgs((m) => [...m, { id: aId, role: 'elad', text: item.a }]);
        setTyping(false);
        if (liveRef.current) liveRef.current.textContent = `${labels.elad}: ${item.a}`;
      },
      reduce ? 0 : 650,
    );
  };

  const restart = () => {
    if (timer.current) window.clearTimeout(timer.current);
    setMsgs([]);
    setAsked([]);
    setTyping(false);
    setShowAll(false);
    if (liveRef.current) liveRef.current.textContent = '';
    refocus();
  };

  const remaining = items.map((_, i) => i).filter((i) => !asked.includes(i));
  const chips = showAll ? remaining : remaining.slice(0, FIRST_CHIPS);
  const hidden = remaining.length - chips.length;

  const bubbleBase = 'max-w-[85%] rounded-2xl px-4 py-3 text-base leading-[1.7] sm:max-w-[78%]';

  return (
    <div dir={dir}>
      <div className="lec-faq-chat overflow-hidden rounded-3xl border border-border bg-card shadow-[0_24px_60px_-30px_rgba(0,0,0,0.55)]">
        {/* header */}
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <span className="relative shrink-0">
            <img
              src={avatarSrc}
              alt={labels.avatarAlt}
              width={44}
              height={44}
              loading="lazy"
              decoding="async"
              className="size-11 rounded-full object-cover lec-avatar-ring"
            />
            <span className="absolute -bottom-0.5 -end-0.5 size-3 rounded-full border-2 border-card bg-emerald-500" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="font-bold leading-tight">{labels.name}</p>
            <p className="text-sm text-muted-foreground">{labels.status}</p>
          </div>
          {msgs.length > 0 && (
            <button
              type="button"
              onClick={restart}
              className="ms-auto inline-flex min-h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              {labels.restart}
            </button>
          )}
        </div>

        {/* conversation */}
        <div
          ref={logRef}
          role="log"
          aria-live="off"
          aria-label={labels.logLabel}
          className="flex max-h-[min(30rem,62vh)] min-h-[9rem] flex-col gap-3 overflow-y-auto overscroll-contain px-4 py-5 sm:px-5"
        >
          <div className="lec-msg flex items-end gap-2">
            <div className={cn(bubbleBase, 'rounded-es-md bg-muted text-foreground')}>{labels.intro}</div>
          </div>
          {msgs.map((m) => (
            <div key={m.id} className={cn('lec-msg flex items-end gap-2', m.role === 'me' && 'justify-end')}>
              <div
                className={cn(
                  bubbleBase,
                  m.role === 'me'
                    ? 'rounded-ee-md bg-cta font-medium text-cta-foreground'
                    : 'rounded-es-md bg-muted text-foreground',
                )}
              >
                <span className="sr-only">{m.role === 'me' ? labels.you : labels.elad}: </span>
                {m.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex items-end gap-2" aria-hidden="true" data-typing="">
              <div className="flex items-center gap-1.5 rounded-2xl rounded-es-md bg-muted px-4 py-4" aria-hidden="true">
                <span className="lec-dot" />
                <span className="lec-dot [animation-delay:120ms]" />
                <span className="lec-dot [animation-delay:240ms]" />
              </div>
            </div>
          )}
        </div>

        {/* chips */}
        <div className="border-t border-border lec-chat-foot px-4 py-4 sm:px-5">
          <p className="mb-3 text-sm font-medium text-muted-foreground">{labels.pick}</p>
          <div ref={chipsRef} role="group" aria-label={labels.pick} className="flex flex-wrap gap-2">
            {chips.map((i) => (
              <button
                key={i}
                type="button"
                disabled={!hydrated}
                aria-disabled={typing || undefined}
                onClick={() => ask(i)}
                className="min-h-11 rounded-full border border-border bg-card px-4 py-2 text-start text-[0.95rem] font-medium leading-snug transition-[border-color,transform,background-color] duration-150 lec-chip-hover active:scale-[0.98] disabled:opacity-50 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {items[i]?.q}
              </button>
            ))}
            {hidden > 0 && (
              <button
                type="button"
                onClick={() => {
                  setShowAll(true);
                  refocus();
                }}
                disabled={!hydrated}
                className="min-h-11 rounded-full px-4 py-2 text-[0.95rem] font-semibold text-cta underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {labels.more.replace('{n}', String(hidden))}
              </button>
            )}
          </div>
          <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
            <MessageCircle className="size-4 shrink-0" aria-hidden="true" />
            {labels.notFound}{' '}
            <a
              href={bookingHref}
              className="min-h-11 inline-flex items-center font-semibold text-foreground underline underline-offset-4 hover:text-cta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {labels.notFoundCta}
            </a>
          </p>
        </div>
      </div>

      {/* Full list: open in server HTML (no-JS readers, crawlers), collapsed after hydration */}
      <details
        open={listOpen}
        onToggle={(e) => {
          const open = (e.currentTarget as HTMLDetailsElement).open;
          if (open !== listOpen) {
            userToggled.current = true;
            setListOpen(open);
          }
        }}
        className="mt-6 rounded-2xl border border-border px-5 py-4">
        <summary className="min-h-11 cursor-pointer py-2 font-semibold text-muted-foreground hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
          {labels.allList}
        </summary>
        <dl className="mt-3 space-y-5">
          {items.map((f) => (
            <div key={f.q}>
              <dt className="font-semibold">{f.q}</dt>
              <dd className="mt-1 max-w-[62ch] leading-[1.75] text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
      </details>

      <div ref={liveRef} aria-live="polite" aria-atomic="true" className="sr-only" />
    </div>
  );
}
