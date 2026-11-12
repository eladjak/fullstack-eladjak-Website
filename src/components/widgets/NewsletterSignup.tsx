"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONSENT_TEXT, CONSENT_VERSION } from "@/lib/newsletter/consent";

type Status = "idle" | "success" | "already" | "error";

interface Props {
  /** Optional override for the heading. Defaults to Hebrew. */
  title?: string;
  subtitle?: string;
  /** Compact mode hides the heading + subtitle, useful for tight footer slots. */
  compact?: boolean;
  className?: string;
}

const COPY = {
  title: "הירשמו לעדכונים",
  subtitle:
    "אחת לחודש: מדריך חדש, פרויקט חדש, ולפעמים גם לקח קטן מהשרת. אפס ספאם.",
  placeholder: "האימייל שלכם",
  button: "הירשמו",
  success: "נרשמתם. תודה.",
  successDetail: "נשמרתם ברשימה. המייל הראשון יגיע כשיהיה משהו ששווה לשלוח.",
  already: "אתם כבר ברשימה",
  alreadyDetail: "הכתובת הזאת כבר רשומה. אין צורך לעשות שום דבר נוסף.",
  privacy: "לא משתפים עם אף אחד.",
  errorInvalid: "נראה שחסר משהו בכתובת המייל. בדקו אותה ונסו שוב.",
  errorConsent: "כדי להירשם צריך לסמן את תיבת האישור.",
  errorRate: "נשלחו יותר מדי ניסיונות מהמכשיר הזה. נסו שוב בעוד רבע שעה.",
  errorGeneric:
    "ההרשמה לא נשמרה, בגלל תקלה אצלנו. נסו שוב בעוד דקה, או כתבו לי דרך דף יצירת הקשר.",
} as const;

export function NewsletterSignup({
  title = COPY.title,
  subtitle = COPY.subtitle,
  compact = false,
  className,
}: Props) {
  const prefersReducedMotion = useReducedMotion();
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [consent, setConsent] = React.useState(false);
  const [honeypot, setHoneypot] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const isSuccess = status === "success" || status === "already";
  const isError = status === "error";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting || isSuccess) return;

    const trimmed = email.trim();
    if (!trimmed) {
      setStatus("error");
      setErrorMessage(COPY.errorInvalid);
      // The role="alert" below announces the message, but measured in a browser
      // focus stayed on <body> after a rejected submit, leaving the user with
      // nowhere to type. rAF so focus lands after React commits the error state.
      requestAnimationFrame(() => inputRef.current?.focus());
      return;
    }
    if (!consent) {
      setStatus("error");
      setErrorMessage(COPY.errorConsent);
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch("/api/newsletter/subscribe/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          consent: true,
          consentVersion: CONSENT_VERSION,
          source: window.location.pathname,
          website: honeypot,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        status?: string;
        error?: string;
      };

      // Success only when the server says the list provider confirmed it.
      if (
        res.ok &&
        data.ok === true &&
        (data.status === "subscribed" || data.status === "already_subscribed")
      ) {
        setStatus(data.status === "already_subscribed" ? "already" : "success");
        setEmail("");
        return;
      }

      setStatus("error");
      setErrorMessage(
        data.error === "invalid_email"
          ? COPY.errorInvalid
          : data.error === "consent_required"
            ? COPY.errorConsent
            : data.error === "too_many_requests"
              ? COPY.errorRate
              : COPY.errorGeneric,
      );
    } catch {
      setStatus("error");
      setErrorMessage(COPY.errorGeneric);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={cn("w-full", className)} dir="rtl">
      {!compact && (
        <div className="mb-3 space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            {title}
          </h3>
          <p className="text-pretty text-sm text-muted-foreground">
            {subtitle}
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-2"
        noValidate
        aria-busy={isSubmitting}
      >
        {/* Honeypot: hidden from people and screen readers; bots fill it. */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="newsletter-website">אתר אינטרנט</label>
          <input
            id="newsletter-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(ev) => setHoneypot(ev.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            {COPY.placeholder}
          </label>
          <div className="relative flex-1">
            <Mail
              className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
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
                if (status !== "idle") setStatus("idle");
              }}
              placeholder={COPY.placeholder}
              aria-invalid={isError}
              aria-describedby={isError ? "newsletter-error" : undefined}
              className={cn(
                "flex w-full rounded-md border bg-background py-2 pe-3 ps-9",
                "text-sm ring-offset-background placeholder:text-muted-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-60",
                isError
                  ? "border-destructive focus-visible:ring-destructive"
                  : "border-input",
              )}
            />
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting || isSuccess}
            whileHover={
              prefersReducedMotion || isSubmitting || isSuccess
                ? undefined
                : { scale: 1.02 }
            }
            whileTap={
              prefersReducedMotion || isSubmitting || isSuccess
                ? undefined
                : { scale: 0.98 }
            }
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2",
              "text-sm font-semibold ring-offset-background",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-70",
              isSuccess
                ? "bg-primary/10 border-primary/30 border text-primary"
                : "hover:bg-primary/90 bg-primary text-primary-foreground shadow-sm",
            )}
            aria-label={COPY.button}
          >
            {isSubmitting ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : isSuccess ? (
              <Check className="size-4" aria-hidden="true" />
            ) : null}
            <span>
              {status === "already"
                ? COPY.already
                : isSuccess
                  ? COPY.success
                  : isSubmitting
                    ? "שומר…"
                    : COPY.button}
            </span>
          </motion.button>
        </div>

        {!isSuccess && (
          <label
            htmlFor="newsletter-consent"
            className="flex min-h-[44px] cursor-pointer items-start gap-2 py-1 text-xs leading-relaxed text-muted-foreground"
          >
            <input
              id="newsletter-consent"
              type="checkbox"
              checked={consent}
              disabled={isSubmitting}
              onChange={(ev) => {
                setConsent(ev.target.checked);
                if (status === "error") setStatus("idle");
              }}
              className="mt-0.5 size-4 shrink-0 cursor-pointer accent-primary"
            />
            <span>{CONSENT_TEXT}</span>
          </label>
        )}
      </form>

      <p className="sr-only" role="status" aria-live="polite">
        {isSubmitting
          ? "שומר את ההרשמה"
          : status === "already"
            ? COPY.alreadyDetail
            : status === "success"
              ? COPY.successDetail
              : ""}
      </p>

      {isSuccess && (
        <p className="mt-2 text-xs text-muted-foreground">
          {status === "already" ? COPY.alreadyDetail : COPY.successDetail}
        </p>
      )}

      {isError && (
        <p
          id="newsletter-error"
          role="alert"
          className="mt-2 text-xs text-destructive"
        >
          {errorMessage || COPY.errorGeneric}
        </p>
      )}

      {!compact && !isError && !isSuccess && (
        <p className="text-muted-foreground/80 mt-2 text-xs">{COPY.privacy}</p>
      )}
    </div>
  );
}

export default NewsletterSignup;
