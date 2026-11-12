import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

/**
 * Lecture / workshop proposal requests from /lectures and /en/lectures.
 *
 * Delivery follows the existing contact form exactly (the site has no lead
 * database): Resend email to CONTACT_EMAIL, else Web3Forms, else a mailto
 * fallback that the client turns into a "send by email" button.
 */

const optionalText = (max: number) =>
  z.string().trim().max(max).optional().default("");

export const inquirySchema = z
  .object({
    locale: z.enum(["he", "en"]).default("he"),
    audience: z.string().trim().min(1).max(40),
    audienceOther: optionalText(200),
    size: optionalText(40),
    format: optionalText(40),
    dateFrom: optionalText(10),
    dateTo: optionalText(10),
    flexible: z.boolean().optional().default(false),
    city: optionalText(120),
    placeMode: optionalText(40),
    goal: optionalText(3000),
    name: z.string().trim().min(2).max(100),
    phone: optionalText(30),
    email: z
      .union([z.literal(""), z.string().trim().email().max(254)])
      .optional()
      .default(""),
    org: optionalText(160),
    // Honeypot: real users never see or fill this field.
    website: optionalText(200),
  })
  .refine((d) => d.phone.length >= 7 || d.email.length > 0, {
    message: "phone or email required",
    path: ["phone"],
  });

export type LectureInquiry = z.infer<typeof inquirySchema>;

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  rateLimitMap.set(ip, { ...entry, count: entry.count + 1 });
  return true;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const LABELS: Record<string, string> = {
  org: "צוות בארגון",
  school: "בית ספר / צוות חינוכי",
  community: "קהילה / קבוצת מבוגרים",
  torah: "רבנים, אברכים, בית מדרש",
  parents: "הורים",
  other: "אחר",
  talk: "הרצאה",
  workshop: "סדנה מעשית",
  series: "סדרת מפגשים",
  unsure: "עוד לא ידוע",
  onsite: "אצלם במקום",
  remote: "מרחוק",
};

function rows(d: LectureInquiry): [string, string][] {
  const label = (v: string) => LABELS[v] ?? v;
  const when = d.flexible
    ? "גמיש"
    : [d.dateFrom, d.dateTo].filter(Boolean).join(" עד ") || "";
  return [
    ["שם", d.name],
    ["טלפון", d.phone],
    ["מייל", d.email],
    ["ארגון / קהילה", d.org],
    [
      "קהל",
      d.audience === "other" ? `אחר: ${d.audienceOther}` : label(d.audience),
    ],
    ["גודל קבוצה", d.size],
    ["מסגרת", d.format ? label(d.format) : ""],
    ["מתי", when],
    [
      "איפה",
      [d.city, d.placeMode ? label(d.placeMode) : ""]
        .filter(Boolean)
        .join(" · "),
    ],
    ["מטרה", d.goal],
    ["שפת הדף", d.locale],
  ];
}

export function buildPlainText(d: LectureInquiry): string {
  return rows(d)
    .map(([k, v]) => `${k}: ${v || "—"}`)
    .join("\n");
}

function buildHtml(d: LectureInquiry): string {
  const body = rows(d)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;color:#6b7280;white-space:nowrap;vertical-align:top">${escapeHtml(k)}</td><td style="padding:8px 12px;color:#111827;white-space:pre-wrap">${escapeHtml(v || "—")}</td></tr>`,
    )
    .join("");
  return `<!DOCTYPE html><html lang="he" dir="rtl"><body style="margin:0;padding:24px;background:#f3f4f6;font-family:Arial,sans-serif">
<table role="presentation" width="100%" style="max-width:640px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden">
<tr><td style="background:#6d28d9;padding:20px 24px;color:#fff;font-size:20px;font-weight:700">בקשת הצעה: הרצאה / סדנה</td></tr>
<tr><td><table role="presentation" width="100%" style="border-collapse:collapse;font-size:15px">${body}</table></td></tr>
</table></body></html>`;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: "rate_limited" },
        { status: 429 },
      );
    }

    // Refuse oversized bodies before parsing (a real request is ~1-4 KB).
    const MAX_BYTES = 16_000;
    if (Number(request.headers.get("content-length") ?? 0) > MAX_BYTES) {
      return NextResponse.json(
        { success: false, error: "too_large" },
        { status: 413 },
      );
    }
    const raw = await request.text();
    if (raw.length > MAX_BYTES) {
      return NextResponse.json(
        { success: false, error: "too_large" },
        { status: 413 },
      );
    }
    let body: unknown;
    try {
      body = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { success: false, error: "bad_json" },
        { status: 400 },
      );
    }
    const parsed = inquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "validation",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }
    const data = parsed.data;

    // Bots fill the hidden field; pretend success and drop it.
    if (data.website) return NextResponse.json({ success: true });

    const subject = `[הרצאות] בקשת הצעה מ-${data.name}${data.org ? ` (${data.org})` : ""}`;
    const contactEmail =
      process.env.CONTACT_EMAIL || "elad@hiteclearning.co.il";
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const { error } = await resend.emails.send({
          from: "Portfolio Lectures <portfolio@eladjak.com>",
          to: [contactEmail],
          ...(data.email ? { replyTo: data.email } : {}),
          subject,
          html: buildHtml(data),
          text: buildPlainText(data),
        });
        if (!error) return NextResponse.json({ success: true });
        console.error("Lectures inquiry: Resend error", error);
      } catch (e) {
        // Fall through to the Web3Forms backup instead of failing the request.
        console.error("Lectures inquiry: Resend threw", e);
      }
    }

    const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (web3formsKey) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: web3formsKey,
            name: data.name,
            email: data.email || undefined,
            subject,
            message: buildPlainText(data),
            from_name: "Portfolio Lectures Form",
          }),
        });
        const result = (await res.json()) as { success: boolean };
        if (result.success) return NextResponse.json({ success: true });
      } catch (e) {
        console.error("Lectures inquiry: Web3Forms error", e);
      }
    }

    return NextResponse.json(
      { success: false, fallback: "mailto", email: contactEmail },
      { status: 200 },
    );
  } catch (error) {
    console.error("Lectures inquiry error", error);
    return NextResponse.json(
      { success: false, error: "internal" },
      { status: 500 },
    );
  }
}
