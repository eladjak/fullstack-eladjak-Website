'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Loader2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';

type Status = 'idle' | 'success' | 'error';

interface Props {
  /** Optional override for the heading. Defaults to the active locale. */
  title?: string;
  subtitle?: string;
  /** Compact mode hides the heading + subtitle, useful for tight footer slots. */
  compact?: boolean;
  className?: string;
}

export function NewsletterSignup({
  title,
  subtitle,
  compact = false,
  className,
}: Props) {
  const locale = useLocale();
  const t = useTranslations('footer.newsletter');
  const copy = {
    title: title ?? t('title'),
    subtitle: subtitle ?? t('subtitle'),
    placeholder: t('placeholder'),
    button: t('button'),
    success: t('success'),
    privacy: t('privacy'),
    errorInvalid: t('errorInvalid'),
    errorGeneric: t('errorGeneric'),
  };
  const prefersReducedMotion = useReducedMotion();
  const [email, setEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<Status>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const isSuccess = status === 'success';
  const isError = status === 'error';

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting || isSuccess) return;

    const trimmed = email.trim();
    if (!trimmed) {
      setStatus('error');
      setErrorMessage(copy.errorInvalid);
      // The role="alert" below announces the message, but measured in a browser
      // focus stayed on <body> after a rejected submit, leaving the user with
      // nowhere to type. rAF so focus lands after React commits the error state.
      requestAnimationFrame(() => inputRef.current?.focus());
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const res = await fetch('/api/newsletter/subscribe/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (res.ok && data.ok) {
        setStatus('success');
        setEmail('');
        return;
      }

      setStatus('error');
      setErrorMessage(
        data.error === 'invalid_email' ? copy.errorInvalid : copy.errorGeneric
      );
    } catch {
      setStatus('error');
      setErrorMessage(copy.errorGeneric);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={cn('w-full', className)} dir={locale === 'he' ? 'rtl' : 'ltr'}>
      {!compact && (
        <div className="space-y-2 mb-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            {copy.title}
          </h3>
          <p className="text-sm text-muted-foreground text-pretty">{copy.subtitle}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-2"
        noValidate
      >
        <label htmlFor="newsletter-email" className="sr-only">
          {copy.placeholder}
        </label>
        <div className="relative flex-1">
          <Mail
            className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            id="newsletter-email"
            type="email"
            dir="ltr"
            inputMode="email"
            autoComplete="email"
            required
            disabled={isSubmitting || isSuccess}
            value={email}
            onChange={(ev) => {
              setEmail(ev.target.value);
              if (status !== 'idle') setStatus('idle');
            }}
            placeholder={copy.placeholder}
            aria-invalid={isError}
            aria-describedby={isError ? 'newsletter-error' : undefined}
            className={cn(
              'flex w-full rounded-md border bg-background ps-9 pe-3 py-2',
              'text-sm ring-offset-background placeholder:text-muted-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-60',
              isError ? 'border-destructive focus-visible:ring-destructive' : 'border-input'
            )}
          />
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting || isSuccess}
          whileHover={prefersReducedMotion || isSubmitting || isSuccess ? undefined : { scale: 1.02 }}
          whileTap={prefersReducedMotion || isSubmitting || isSuccess ? undefined : { scale: 0.98 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className={cn(
            'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2',
            'text-sm font-semibold ring-offset-background',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-70',
            isSuccess
              ? 'bg-primary/10 text-primary border border-primary/30'
              : 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90'
          )}
          aria-label={copy.button}
        >
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : isSuccess ? (
            <Check className="size-4" aria-hidden="true" />
          ) : null}
          <span>{isSuccess ? copy.success : copy.button}</span>
        </motion.button>
      </form>

      {isError && (
        <p
          id="newsletter-error"
          role="alert"
          className="mt-2 text-xs text-destructive"
        >
          {errorMessage || copy.errorGeneric}
        </p>
      )}

      {!compact && !isError && (
        <p className="mt-2 text-xs text-muted-foreground/80">{copy.privacy}</p>
      )}
    </div>
  );
}

export default NewsletterSignup;
