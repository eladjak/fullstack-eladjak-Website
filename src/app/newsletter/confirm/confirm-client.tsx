"use client";

import * as React from "react";
import Link from "next/link";
import { Check, Loader2, MailCheck, TimerOff, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type View =
  | "ready"
  | "working"
  | "done"
  | "already"
  | "expired"
  | "invalid"
  | "unsubscribed"
  | "error";

const COPY = {
  ready: {
    title: "עוד לחיצה אחת",
    body: "לחצו על הכפתור כדי לאשר שאתם רוצים לקבל ממני עדכונים במייל, בערך פעם בחודש. אפשר להסיר את ההרשמה בכל רגע.",
  },
  done: {
    title: "נרשמתם. תודה!",
    body: "ההרשמה אושרה. המייל הראשון יגיע כשיהיה משהו ששווה לשלוח.",
  },
  already: {
    title: "אתם כבר ברשימה",
    body: "הכתובת הזאת כבר רשומה ומאושרת. אין צורך לעשות שום דבר נוסף.",
  },
  expired: {
    title: "הקישור כבר לא בתוקף",
    body: "קישורי האישור תקפים ל-48 שעות. אפשר פשוט להירשם שוב, ויישלח אליכם קישור חדש.",
  },
  invalid: {
    title: "הקישור הזה לא תקין",
    body: "אולי הוא נחתך כשהועתק. הכי קל להירשם שוב ולהשתמש בקישור מהמייל החדש.",
  },
  unsubscribed: {
    title: "הכתובת הזאת הוסרה בעבר",
    body: "לא נחזיר אותה לרשימה דרך קישור. רוצים לחזור? כתבו לי דרך דף יצירת הקשר.",
  },
  error: {
    title: "לא הצלחנו לאשר",
    body: "הייתה תקלה אצלנו, וההרשמה לא נשמרה. נסו שוב בעוד דקה. אם זה חוזר, כתבו לי דרך דף יצירת הקשר.",
  },
} as const;

export function ConfirmClient({
  token,
  initial,
}: {
  token: string;
  initial: "ready" | "expired" | "invalid";
}) {
  const [view, setView] = React.useState<View>(initial);

  async function confirm() {
    if (view === "working") return;
    setView("working");
    try {
      const res = await fetch("/api/newsletter/confirm/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        status?: string;
        error?: string;
      };
      if (res.ok && data.ok === true && data.status === "subscribed") return setView("done");
      if (res.ok && data.ok === true && data.status === "already_subscribed") return setView("already");
      if (data.error === "expired_token") return setView("expired");
      if (data.error === "invalid_token") return setView("invalid");
      if (data.error === "previously_unsubscribed") return setView("unsubscribed");
      setView("error");
    } catch {
      setView("error");
    }
  }

  const c = view === "working" ? COPY.ready : COPY[view];
  const good = view === "done" || view === "already";
  const pending = view === "ready" || view === "working";
  const retry = view === "expired" || view === "invalid";
  const Icon = good
    ? Check
    : view === "expired"
      ? TimerOff
      : pending
        ? MailCheck
        : AlertTriangle;

  return (
    <main
      dir="rtl"
      className="mx-auto flex min-h-[60vh] w-full max-w-md flex-col items-center justify-center px-4 py-16 text-center"
    >
      <div
        className={cn(
          "mb-5 flex size-14 items-center justify-center rounded-full",
          good || pending ? "bg-primary/15 text-primary" : "bg-destructive/10 text-destructive",
        )}
        aria-hidden="true"
      >
        <Icon className="size-7" />
      </div>
      <h1 className="text-2xl font-bold tracking-tight">{c.title}</h1>
      <p
        className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground"
        role={view === "error" ? "alert" : "status"}
      >
        {c.body}
      </p>

      {pending && (
        <button
          type="button"
          onClick={confirm}
          disabled={view === "working"}
          className="mt-7 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {view === "working" && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          <span>{view === "working" ? "מאשר…" : "אישור ההרשמה"}</span>
        </button>
      )}

      {view === "error" && (
        <button
          type="button"
          onClick={confirm}
          className="mt-7 inline-flex min-h-[48px] items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          נסו שוב
        </button>
      )}

      <div className="mt-7 flex flex-col items-center gap-3">
        {retry && (
          <Link
            href="/#newsletter"
            className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
          >
            להירשם מחדש
          </Link>
        )}
        {(view === "unsubscribed" || view === "error") && (
          <Link href="/contact" className="text-sm font-medium text-primary underline underline-offset-4">
            יצירת קשר
          </Link>
        )}
        {(good || retry) && (
          <Link href="/" className="text-sm text-muted-foreground underline underline-offset-4">
            חזרה לאתר
          </Link>
        )}
      </div>
    </main>
  );
}
