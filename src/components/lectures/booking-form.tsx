'use client';

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CalendarRange,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Mic,
  RotateCcw,
  Send,
  Square,
  Target,
  UserRound,
  Users,
  LayoutGrid,
  AlertTriangle,
} from 'lucide-react';
import { CONTACT, LECTURES_COPY, type LecturesLocale, type Option } from './content';
import { cn } from '@/lib/utils';

const DRAFT_KEY = 'lectures-inquiry-draft-v1';
const TOTAL = 7;

interface Answers {
  audience: string;
  audienceOther: string;
  size: string;
  format: string;
  dateFrom: string;
  dateTo: string;
  flexible: boolean;
  city: string;
  placeMode: string;
  goal: string;
  name: string;
  phone: string;
  email: string;
  org: string;
  website: string;
}

const EMPTY: Answers = {
  audience: '',
  audienceOther: '',
  size: '',
  format: '',
  dateFrom: '',
  dateTo: '',
  flexible: false,
  city: '',
  placeMode: '',
  goal: '',
  name: '',
  phone: '',
  email: '',
  org: '',
  website: '',
};

type Status = 'idle' | 'sending' | 'success' | 'error';

/* ------------------------------------------------------------------ */
/* Speech recognition (dictation into the goal field).                */
/* The browser API is not in the TS DOM lib, so we type the subset.   */
/* ------------------------------------------------------------------ */
interface SpeechResultEvent {
  resultIndex: number;
  results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }>;
}
interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((e: SpeechResultEvent) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
}
type SpeechCtor = new () => SpeechRecognitionLike;

function getSpeechCtor(): SpeechCtor | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as { SpeechRecognition?: SpeechCtor; webkitSpeechRecognition?: SpeechCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export function BookingForm({ locale }: { locale: LecturesLocale }) {
  const c = LECTURES_COPY[locale].form;
  const q = c.questions;
  const uid = useId();
  const [step, setStep] = useState(1);
  const [a, setA] = useState<Answers>(EMPTY);
  const [error, setError] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [mailtoTarget, setMailtoTarget] = useState(CONTACT.email);
  const [restored, setRestored] = useState(false);
  const [storageOk, setStorageOk] = useState(false);
  const stepBodyRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  // Restore draft once.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { a?: Partial<Answers>; step?: number };
        setA({ ...EMPTY, ...parsed.a, website: '' });
        if (parsed.step && parsed.step >= 1 && parsed.step <= TOTAL) setStep(parsed.step);
      }
    } catch {
      /* storage blocked: the form still works, only without a draft */
    }
    setRestored(true);
  }, []);

  // "Request a proposal for this" on the Torah card links to #booking-torah:
  // preselect that format (still editable) instead of making people choose again.
  useEffect(() => {
    if (!restored) return;
    const apply = () => {
      if (window.location.hash !== '#booking-torah') return;
      setA((prev) => ({ ...prev, audience: prev.audience || 'torah', format: 'torah' }));
    };
    apply();
    window.addEventListener('hashchange', apply);
    return () => window.removeEventListener('hashchange', apply);
  }, [restored]);

  // Autosave draft on every change.
  useEffect(() => {
    if (!restored || status === 'success') return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ a, step }));
      setStorageOk(true);
    } catch {
      setStorageOk(false);
    }
  }, [a, step, restored, status]);

  // Move focus to the question heading when the step changes (not on first load).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step, status]);

  const set = useCallback(<K extends keyof Answers>(key: K, value: Answers[K]) => {
    setA((prev) => ({ ...prev, [key]: value }));
    setError('');
  }, []);

  const validate = (s: number): string => {
    if (s === 1) {
      if (!a.audience) return c.requiredChoice;
      if (a.audience === 'other' && !a.audienceOther.trim()) return c.requiredChoice;
    }
    if (s === 4 && !a.flexible && a.dateFrom && a.dateTo && a.dateTo < a.dateFrom) return q.dates.error;
    if (s === 7) {
      if (a.name.trim().length < 2) return q.contact.errorName;
      if (a.email.trim() && !isEmail(a.email)) return q.contact.errorEmail;
      if (a.phone.replace(/\D/g, '').length < 7 && !a.email.trim()) return q.contact.errorReach;
    }
    return '';
  };

  const goNext = () => {
    const msg = validate(step);
    if (msg) {
      setError(msg);
      focusFirstField();
      return;
    }
    setError('');
    setStep((s) => Math.min(TOTAL, s + 1));
  };
  function focusFirstField() {
    requestAnimationFrame(() => {
      const root = stepBodyRef.current;
      const target =
        root?.querySelector<HTMLElement>('input[aria-invalid="true"], textarea[aria-invalid="true"]') ??
        root?.querySelector<HTMLElement>('input:not([type=hidden]):not([tabindex="-1"]), textarea');
      target?.focus();
    });
  }
  const goBack = () => {
    setError('');
    setStep((s) => Math.max(1, s - 1));
  };
  const skip = () => {
    setError('');
    setStep((s) => Math.min(TOTAL, s + 1));
  };

  const submit = async () => {
    for (let s = 1; s <= TOTAL; s += 1) {
      const msg = validate(s);
      if (msg) {
        setStep(s);
        setError(msg);
        return;
      }
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/lectures-inquiry/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...a, locale }),
      });
      const json = (await res.json()) as { success?: boolean; fallback?: string; email?: string };
      if (res.ok && json.success) {
        setStatus('success');
        try {
          localStorage.removeItem(DRAFT_KEY);
        } catch {
          /* ignore */
        }
        return;
      }
      if (json.fallback === 'mailto' && json.email) setMailtoTarget(json.email);
      setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setA(EMPTY);
    setStep(1);
    setStatus('idle');
    setError('');
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* ignore */
    }
  };

  const summaryText = () => {
    const pick = (opts: Option[], v: string) => opts.find((o) => o.value === v)?.label ?? v;
    const lines = [
      `${q.contact.name}: ${a.name}`,
      a.org && `${q.contact.org}: ${a.org}`,
      `${q.audience.label} ${a.audience === 'other' ? a.audienceOther : pick(q.audience.options, a.audience)}`,
      a.size && `${q.size.label} ${pick(q.size.options, a.size)}`,
      a.format && `${q.format.label} ${pick(q.format.options, a.format)}`,
      (a.flexible || a.dateFrom) && `${q.dates.label} ${a.flexible ? q.dates.flexible : [a.dateFrom, a.dateTo].filter(Boolean).join(' - ')}`,
      (a.city || a.placeMode) && `${q.place.label} ${[a.city, a.placeMode && pick(q.place.options, a.placeMode)].filter(Boolean).join(', ')}`,
      a.goal && `${q.goal.label} ${a.goal}`,
      a.phone && `${q.contact.phone}: ${a.phone}`,
      a.email && `${q.contact.email}: ${a.email}`,
    ];
    return lines.filter(Boolean).join('\n');
  };

  /* ---------------------------- success / error ---------------------------- */
  if (status === 'success') {
    return (
      <Shell>
        <div className="flex flex-col items-center gap-4 py-8 text-center" role="status">
          <span className="grid size-16 place-items-center rounded-full bg-primary/15 text-primary animate-[lec-pop_200ms_ease-out]">
            <CheckCircle2 className="size-9" aria-hidden="true" />
          </span>
          <h3 ref={headingRef} tabIndex={-1} className="scroll-mt-28 text-2xl font-bold text-foreground outline-none">
            {c.success.title}
          </h3>
          <p className="max-w-md text-pretty text-muted-foreground">{c.success.text}</p>
          <button type="button" onClick={reset} className={secondaryBtn}>
            <RotateCcw className="size-4" aria-hidden="true" />
            {c.success.again}
          </button>
        </div>
      </Shell>
    );
  }

  if (status === 'error') {
    const text = encodeURIComponent(summaryText());
    return (
      <Shell>
        <div className="flex flex-col items-center gap-4 py-6 text-center" role="alert">
          <span className="grid size-16 place-items-center rounded-full bg-destructive/15 text-destructive">
            <AlertTriangle className="size-8" aria-hidden="true" />
          </span>
          <h3 ref={headingRef} tabIndex={-1} className="scroll-mt-28 text-2xl font-bold text-foreground outline-none">
            {c.error.title}
          </h3>
          <p className="max-w-md text-pretty text-muted-foreground">{c.error.text}</p>
          <div className="flex w-full flex-col flex-wrap justify-center gap-3 sm:flex-row">
            <button type="button" onClick={submit} className={primaryBtn}>
              <RotateCcw className="size-4" aria-hidden="true" />
              {c.error.retry}
            </button>
            <button type="button" onClick={() => setStatus('idle')} className={secondaryBtn}>
              <ArrowRight className="size-4 ltr:rotate-180" aria-hidden="true" />
              {c.error.edit}
            </button>
            <a href={`https://wa.me/${CONTACT.whatsapp}?text=${text}`} target="_blank" rel="noopener noreferrer" className={secondaryBtn}>
              {c.error.whatsapp}
            </a>
            <a href={`mailto:${mailtoTarget}?subject=${encodeURIComponent(c.title)}&body=${text}`} className={secondaryBtn}>
              <Mail className="size-4" aria-hidden="true" />
              {c.error.email}
            </a>
          </div>
        </div>
      </Shell>
    );
  }

  /* ------------------------------- questions ------------------------------- */
  const errorId = `${uid}-err`;
  const helpId = `${uid}-help`;
  const stepMeta: Record<number, { icon: ReactNode; label: string; help: string }> = {
    1: { icon: <Users />, label: q.audience.label, help: q.audience.help },
    2: { icon: <UserRound />, label: q.size.label, help: q.size.help },
    3: { icon: <LayoutGrid />, label: q.format.label, help: q.format.help },
    4: { icon: <CalendarRange />, label: q.dates.label, help: q.dates.help },
    5: { icon: <MapPin />, label: q.place.label, help: q.place.help },
    6: { icon: <Target />, label: q.goal.label, help: q.goal.help },
    7: { icon: <Mail />, label: q.contact.label, help: q.contact.help },
  };
  const meta = stepMeta[step];
  const skippable = step >= 2 && step <= 6;
  const isLast = step === TOTAL;

  return (
    <Shell>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (isLast) void submit();
          else goNext();
        }}
        aria-describedby={helpId}
      >
        {/* progress */}
        <div className="mb-6 flex items-center justify-between gap-4 text-sm text-muted-foreground">
          <span aria-live="polite">{c.stepOf(step, TOTAL)}</span>
        </div>
        <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-muted" aria-hidden="true">
          <div
            className="h-full rounded-full bg-cta transition-transform duration-200 ease-out rtl:origin-right ltr:origin-left"
            style={{ transform: `scaleX(${step / TOTAL})` }}
          />
        </div>

        <div key={step} ref={stepBodyRef} className="animate-[lec-in_200ms_ease-out] motion-reduce:animate-none">
          <div className="mb-2 flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary [&>svg]:size-5" aria-hidden="true">
              {meta.icon}
            </span>
            <h3 ref={headingRef} tabIndex={-1} className="scroll-mt-28 text-balance text-xl font-bold text-foreground outline-none sm:text-2xl">
              {meta.label}
            </h3>
          </div>
          <p id={helpId} className="mb-6 text-muted-foreground">
            {meta.help}
          </p>

          {step === 1 && (
            <ChoiceGroup
              name="audience"
              label={q.audience.label}
              options={q.audience.options}
              value={a.audience}
              onChange={(v) => set('audience', v)}
              describedBy={error ? errorId : undefined}
              required
            />
          )}
          {step === 1 && a.audience === 'other' && (
            <TextField
              id={`${uid}-other`}
              label={c.otherLabel}
              value={a.audienceOther}
              placeholder={c.otherPlaceholder}
              onChange={(v) => set('audienceOther', v)}
              autoFocus
              invalid={!!error}
              describedBy={error ? errorId : undefined}
            />
          )}
          {step === 2 && (
            <ChoiceGroup name="size" label={q.size.label} options={q.size.options} value={a.size} onChange={(v) => set('size', v)} />
          )}
          {step === 3 && (
            <ChoiceGroup name="format" label={q.format.label} options={q.format.options} value={a.format} onChange={(v) => set('format', v)} />
          )}
          {step === 4 && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <DateField id={`${uid}-from`} label={q.dates.from} value={a.dateFrom} disabled={a.flexible} onChange={(v) => set('dateFrom', v)} invalid={!!error} describedBy={error ? errorId : undefined} />
                <DateField id={`${uid}-to`} label={q.dates.to} value={a.dateTo} disabled={a.flexible} min={a.dateFrom} onChange={(v) => set('dateTo', v)} invalid={!!error} describedBy={error ? errorId : undefined} />
              </div>
              <label className={cn(chipBase, 'w-full sm:w-auto', a.flexible && chipOn)}>
                <input
                  type="checkbox"
                  className="size-5 accent-[var(--primary)]"
                  checked={a.flexible}
                  onChange={(e) => set('flexible', e.target.checked)}
                />
                {q.dates.flexible}
              </label>
            </div>
          )}
          {step === 5 && (
            <div className="space-y-5">
              <TextField id={`${uid}-city`} label={q.place.cityLabel} value={a.city} placeholder={q.place.cityPlaceholder} onChange={(v) => set('city', v)} autoComplete="address-level2" />
              <ChoiceGroup name="placeMode" label={q.place.label} options={q.place.options} value={a.placeMode} onChange={(v) => set('placeMode', v)} />
            </div>
          )}
          {step === 6 && (
            <GoalField
              id={`${uid}-goal`}
              locale={locale}
              value={a.goal}
              onChange={(v) => set('goal', v)}
              copy={q.goal}
            />
          )}
          {step === 7 && (
            <div className="space-y-4">
              <TextField id={`${uid}-name`} label={q.contact.name} value={a.name} placeholder={q.contact.namePlaceholder} onChange={(v) => set('name', v)} autoComplete="name" required invalid={error === q.contact.errorName} describedBy={error ? errorId : undefined} />
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField id={`${uid}-phone`} label={q.contact.phone} type="tel" inputMode="tel" dir="ltr" value={a.phone} placeholder={q.contact.phonePlaceholder} onChange={(v) => set('phone', v)} autoComplete="tel" invalid={error === q.contact.errorReach} describedBy={error ? errorId : undefined} />
                <TextField id={`${uid}-email`} label={q.contact.email} type="email" inputMode="email" dir="ltr" value={a.email} placeholder={q.contact.emailPlaceholder} onChange={(v) => set('email', v)} autoComplete="email" invalid={error === q.contact.errorEmail || error === q.contact.errorReach} describedBy={error ? errorId : undefined} />
              </div>
              <TextField id={`${uid}-org`} label={q.contact.org} value={a.org} placeholder={q.contact.orgPlaceholder} onChange={(v) => set('org', v)} autoComplete="organization" />
              {/* honeypot */}
              <div className="absolute size-px overflow-hidden opacity-0" aria-hidden="true" style={{ clipPath: 'inset(50%)' }}>
                <label>
                  Website
                  <input tabIndex={-1} autoComplete="off" value={a.website} onChange={(e) => set('website', e.target.value)} />
                </label>
              </div>
              <p className="text-sm text-muted-foreground">{q.contact.privacy}</p>
            </div>
          )}

          <p id={errorId} role="alert" className={cn('mt-4 min-h-6 text-sm font-medium text-destructive', !error && 'sr-only')}>
            {error}
          </p>
        </div>

        {/* nav */}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            {step > 1 && (
              <button type="button" onClick={goBack} className={ghostBtn}>
                <ArrowRight className="size-4 ltr:rotate-180" aria-hidden="true" />
                {c.back}
              </button>
            )}
            {skippable && (
              <button type="button" onClick={skip} className={ghostBtn}>
                {c.skip}
              </button>
            )}
          </div>
          <button type="submit" disabled={status === 'sending'} className={primaryBtn}>
            {status === 'sending' ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                {c.sending}
              </>
            ) : isLast ? (
              <>
                <Send className="size-4 rtl:-scale-x-100" aria-hidden="true" />
                {c.submit}
              </>
            ) : (
              <>
                {c.next}
                <ArrowLeft className="size-4 ltr:rotate-180" aria-hidden="true" />
              </>
            )}
          </button>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
          <span>{storageOk ? c.draftSaved : ''}</span>
          <button type="button" onClick={reset} className="min-h-11 rounded-md px-2 underline-offset-4 hover:text-foreground hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
            {c.clearDraft}
          </button>
        </div>
      </form>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* Pieces                                                             */
/* ------------------------------------------------------------------ */

const focusRing = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring';
const primaryBtn = cn(
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cta px-6 font-semibold text-cta-foreground shadow-sm transition-transform duration-150 hover:-translate-y-0.5 active:scale-[.97] disabled:opacity-60 motion-reduce:transition-none motion-reduce:hover:translate-y-0',
  focusRing,
);
const secondaryBtn = cn(
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 font-medium text-foreground transition-colors duration-150 hover:border-primary hover:text-primary active:scale-[.97]',
  focusRing,
);
const ghostBtn = cn(
  'inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-3 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground',
  focusRing,
);
const chipBase =
  'flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-border bg-background/60 px-4 py-3 text-start text-foreground transition-colors duration-150 hover:border-primary/60';
const chipOn = 'border-primary bg-primary/10 ring-1 ring-primary';
const fieldBase = cn(
  'min-h-12 w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 transition-colors duration-150 focus:border-primary disabled:opacity-50',
  focusRing,
);

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="relative rounded-3xl border border-border bg-card p-5 shadow-[0_20px_60px_-30px_rgba(139,92,246,0.45)] sm:p-8">
      {children}
    </div>
  );
}

function ChoiceGroup({
  name,
  label,
  options,
  value,
  onChange,
  describedBy,
  required,
}: {
  name: string;
  label: string;
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  describedBy?: string;
  required?: boolean;
}) {
  return (
    <fieldset>
      <legend className="sr-only">{label}</legend>
      <div role="radiogroup" aria-label={label} aria-required={required || undefined} aria-invalid={(required && !!describedBy) || undefined} aria-describedby={describedBy} className="grid gap-3 sm:grid-cols-2">
        {options.map((o) => {
          const on = value === o.value;
          return (
            <label key={o.value} className={cn(chipBase, 'has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring', on && chipOn)}>
              <input
                type="radio"
                name={name}
                value={o.value}
                checked={on}
                onChange={() => onChange(o.value)}
                className="sr-only"
              />
              <span
                className={cn(
                  'grid size-5 shrink-0 place-items-center rounded-full border-2 transition-colors duration-150',
                  on ? 'border-primary bg-primary' : 'border-muted-foreground/50',
                )}
                aria-hidden="true"
              >
                {on && <span className="size-2 rounded-full bg-primary-foreground" />}
              </span>
              <span className="flex flex-col">
                <span className="font-medium">{o.label}</span>
                {o.hint && <span className="text-sm text-muted-foreground">{o.hint}</span>}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  inputMode,
  dir,
  autoComplete,
  autoFocus,
  required,
  invalid,
  describedBy,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  inputMode?: 'text' | 'tel' | 'email';
  dir?: 'ltr' | 'rtl';
  autoComplete?: string;
  autoFocus?: boolean;
  required?: boolean;
  invalid?: boolean;
  describedBy?: string;
}) {
  return (
    <div className="mt-4 space-y-2 first:mt-0">
      <label htmlFor={id} className="block font-medium text-foreground">
        {label}
        {required && <span className="text-destructive" aria-hidden="true"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        dir={dir}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        required={required}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? describedBy : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={cn(fieldBase, dir === 'ltr' && 'text-start', invalid && 'border-destructive')}
      />
    </div>
  );
}

function DateField({
  id,
  label,
  value,
  onChange,
  disabled,
  min,
  invalid,
  describedBy,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  min?: string;
  invalid?: boolean;
  describedBy?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        type="date"
        dir="ltr"
        value={value}
        min={min || undefined}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? describedBy : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={cn(fieldBase, invalid && 'border-destructive')}
      />
    </div>
  );
}

function GoalField({
  id,
  locale,
  value,
  onChange,
  copy,
}: {
  id: string;
  locale: LecturesLocale;
  value: string;
  onChange: (v: string) => void;
  copy: (typeof LECTURES_COPY)['he']['form']['questions']['goal'];
}) {
  const [listening, setListening] = useState(false);
  const [micNote, setMicNote] = useState('');
  const recRef = useRef<SpeechRecognitionLike | null>(null);
  const baseRef = useRef('');
  const valueRef = useRef(value);
  valueRef.current = value;

  useEffect(() => () => recRef.current?.stop(), []);

  const toggle = () => {
    if (listening) {
      recRef.current?.stop();
      return;
    }
    const Ctor = getSpeechCtor();
    if (!Ctor) {
      setMicNote(copy.micUnsupported);
      return;
    }
    const rec = new Ctor();
    rec.lang = locale === 'he' ? 'he-IL' : 'en-US';
    rec.continuous = true;
    rec.interimResults = true;
    baseRef.current = valueRef.current ? `${valueRef.current.trimEnd()} ` : '';
    let finalText = '';
    rec.onresult = (e) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i += 1) {
        const r = e.results[i];
        if (r.isFinal) finalText += r[0].transcript;
        else interim += r[0].transcript;
      }
      onChange(`${baseRef.current}${finalText}${interim}`);
    };
    rec.onerror = (e) => {
      setMicNote(e.error === 'not-allowed' || e.error === 'service-not-allowed' ? copy.micDenied : copy.micUnsupported);
    };
    rec.onend = () => setListening(false);
    try {
      rec.start();
      recRef.current = rec;
      setListening(true);
      setMicNote('');
    } catch {
      setMicNote(copy.micUnsupported);
    }
  };

  return (
    <div className="space-y-3">
      <label htmlFor={id} className="sr-only">
        {copy.label}
      </label>
      <textarea
        id={id}
        rows={5}
        value={value}
        placeholder={copy.placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cn(fieldBase, 'min-h-36 resize-y leading-relaxed')}
      />
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          aria-pressed={listening}
          className={cn(
            secondaryBtn,
            listening && 'border-destructive text-destructive hover:border-destructive hover:text-destructive',
          )}
        >
          {listening ? <Square className="size-4 fill-current" aria-hidden="true" /> : <Mic className="size-4" aria-hidden="true" />}
          {listening ? copy.micStop : copy.micStart}
        </button>
        <span className="text-sm text-muted-foreground" aria-live="polite">
          {listening && (
            <span className="inline-flex items-center gap-2">
              <span className="size-2 rounded-full bg-destructive motion-safe:animate-pulse" aria-hidden="true" />
              {copy.micListening}
            </span>
          )}
          {!listening && micNote}
        </span>
      </div>
    </div>
  );
}
