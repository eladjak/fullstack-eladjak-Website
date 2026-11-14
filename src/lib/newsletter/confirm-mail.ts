/**
 * The confirmation email (transactional: it only asks the person to confirm
 * a sign-up they just made, it is not advertising) and the send call.
 */

export const FROM = `"אלעד יעקובוביץ'" <delivery@eladjak.com>`;
export const SUBJECT = "עוד צעד אחד: אישור ההרשמה לעדכונים";

export function buildConfirmEmail(link: string, contactUrl: string) {
  const text = [
    "שלום,",
    "",
    "מישהו (כנראה את/ה) הזין את כתובת המייל הזאת בטופס ההרשמה לעדכונים באתר של אלעד יעקובוביץ'.",
    "כדי להשלים את ההרשמה, פותחים את הקישור ולוחצים על הכפתור 'אישור ההרשמה':",
    "",
    link,
    "",
    "הקישור תקף ל-48 שעות.",
    "אם לא נרשמתם, אפשר להתעלם מהמייל הזה. לא יקרה כלום ולא תקבלו ממני דבר.",
    "",
    "אלעד",
    "",
    `שאלה? אפשר לכתוב לי דרך דף יצירת הקשר: ${contactUrl}`,
  ].join("\n");

  const html = `<!doctype html>
<html lang="he" dir="rtl">
<body style="margin:0;padding:0;background:#f5f4f0;">
<div dir="rtl" style="max-width:520px;margin:0 auto;padding:28px 20px;font-family:Arial,Helvetica,sans-serif;color:#1f2933;line-height:1.7;font-size:16px;text-align:right;">
  <p style="margin:0 0 16px;">שלום,</p>
  <p style="margin:0 0 16px;">מישהו (כנראה את/ה) הזין את כתובת המייל הזאת בטופס ההרשמה לעדכונים באתר של אלעד יעקובוביץ'.</p>
  <p style="margin:0 0 24px;">כדי להשלים את ההרשמה, לוחצים על הכפתור:</p>
  <p style="margin:0 0 24px;text-align:center;">
    <a href="${link}" style="display:inline-block;background:#1d4ed8;color:#ffffff;text-decoration:none;font-weight:bold;padding:14px 28px;border-radius:8px;">אישור ההרשמה</a>
  </p>
  <p style="margin:0 0 6px;font-size:14px;color:#52606d;">הכפתור לא עובד? מעתיקים את הקישור הזה לדפדפן:</p>
  <p dir="ltr" style="margin:0 0 24px;font-size:13px;color:#52606d;word-break:break-all;text-align:left;"><a href="${link}" style="color:#1d4ed8;">${link}</a></p>
  <p style="margin:0 0 8px;font-size:14px;color:#52606d;">הקישור תקף ל-48 שעות.</p>
  <p style="margin:0 0 24px;font-size:14px;color:#52606d;">אם לא נרשמתם, אפשר להתעלם מהמייל הזה. לא יקרה כלום ולא תקבלו ממני דבר.</p>
  <p style="margin:0 0 4px;">אלעד</p>
  <p style="margin:24px 0 0;font-size:13px;color:#7b8794;">שאלה? <a href="${contactUrl}" style="color:#52606d;">כתבו לי דרך דף יצירת הקשר</a></p>
</div>
</body>
</html>`;
  return { text, html };
}

export type SendOutcome = { kind: "sent" } | { kind: "provider_error"; detail: string };

export async function sendConfirmationEmail(
  args: { to: string; link: string; contactUrl: string },
  deps: { apiKey: string; fetchImpl?: typeof fetch; baseUrl?: string },
): Promise<SendOutcome> {
  const doFetch = deps.fetchImpl ?? fetch;
  const { html, text } = buildConfirmEmail(args.link, args.contactUrl);
  try {
    const res = await doFetch(`${deps.baseUrl ?? "https://api.resend.com"}/emails`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${deps.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: FROM, to: [args.to], subject: SUBJECT, html, text }),
      signal: AbortSignal.timeout(8_000),
      cache: "no-store",
    });
    const j = (await res.json().catch((): null => null)) as { id?: unknown } | null;
    // Success only when Resend accepted it AND returned a message id.
    if (res.status >= 200 && res.status < 300 && typeof j?.id === "string") {
      return { kind: "sent" };
    }
    return { kind: "provider_error", detail: `send: status ${res.status}` };
  } catch (e) {
    // Fixed category only: exception text can carry request details.
    return {
      kind: "provider_error",
      detail: `send: ${e instanceof Error && (e.name === "TimeoutError" || e.name === "AbortError") ? "timeout" : "network"}`,
    };
  }
}
