import type { Metadata } from "next";
import { verifyToken } from "@/lib/newsletter/token";
import { CONSENT_VERSION } from "@/lib/newsletter/consent";
import { ConfirmClient } from "./confirm-client";

// A page behind a private link: never indexed, and the token must not leak
// through the Referer header to anything the page links to.
export const metadata: Metadata = {
  title: { absolute: "אישור הרשמה לעדכונים | אלעד יעקובוביץ'" },
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export const dynamic = "force-dynamic";

export default async function NewsletterConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | string[] }>;
}) {
  const sp = await searchParams;
  const token = Array.isArray(sp.token) ? sp.token[0] : sp.token;

  // Reading only: opening this page changes nothing. The subscription is
  // made by the button, which POSTs to /api/newsletter/confirm.
  let initial: "ready" | "expired" | "invalid" = "invalid";
  const secret = process.env.NEWSLETTER_TOKEN_SECRET;
  if (token && secret && secret.length >= 32) {
    const v = verifyToken(token, secret, new Date());
    if (v.ok) initial = v.payload.v === CONSENT_VERSION ? "ready" : "expired";
    else initial = v.reason === "expired" ? "expired" : "invalid";
  }

  return (
    <ConfirmClient token={initial === "ready" ? (token as string) : ""} initial={initial} />
  );
}
