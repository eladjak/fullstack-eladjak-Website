import { NextResponse } from 'next/server';

/**
 * POST /api/sumit/business-brain-checkout
 *
 * Initiates a Sumit payment for the Business Brain founding reservation.
 * Amount: ₪500 deposit (non-refundable, counts toward setup fee).
 * Product: "מוח עסקי — הרשמת מייסד"
 *
 * Env vars required (set in Vercel dashboard / .env.local):
 *   SUMIT_COMPANY_ID  – Sumit company ID
 *   SUMIT_ORG_ID      – Sumit org (organisation) ID
 *   SUMIT_API_TOKEN   – Sumit private API token
 *   NEXT_PUBLIC_SITE_URL – base URL for redirect
 *
 * Sumit API docs: https://app.sumit.co.il/developers/
 * DocType 3 = קבלה (used for non-profits / osek patur receipts)
 */
export async function POST(req: Request) {
  const companyId = process.env.SUMIT_COMPANY_ID;
  const orgId = process.env.SUMIT_ORG_ID;
  const apiToken = process.env.SUMIT_API_TOKEN;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fullstack-eladjak.co.il';

  // Guard: env vars not configured → graceful degradation to WhatsApp
  if (!companyId || !apiToken) {
    return NextResponse.json(
      {
        error: 'payment_not_configured',
        whatsappFallback: `https://wa.me/972525427474?text=${encodeURIComponent('היי אלעד, אני רוצה לשריין מקום מייסד במוח העסקי')}`,
      },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const businessName =
    typeof body.businessName === 'string' ? body.businessName.trim() : '';
  const taxId = typeof body.taxId === 'string' ? body.taxId.trim() : '';

  // Receipt is issued to the business name when provided (osek patur → קבלה only).
  const documentName = businessName || name;

  if (!name || !email || !phone) {
    return NextResponse.json(
      { error: 'missing_fields', required: ['name', 'email', 'phone'] },
      { status: 400 },
    );
  }

  // Sumit hosted payment page — VERIFIED API shape (21.7.2026, tested live):
  // POST https://api.sumit.co.il/billing/payments/beginredirect/
  // body: { Credentials:{CompanyID,APIKey}, Customer, Items[], RedirectURL, ... }
  // Returns { Data: { RedirectURL }, Status: 0 } on success.
  const sumitPayload = {
    Credentials: {
      CompanyID: Number(companyId),
      APIKey: apiToken,
    },
    Customer: {
      Name: documentName,
      EmailAddress: email,
      Phone: phone,
      SearchMode: 0,
    },
    Items: [
      {
        Item: { Name: 'מוח עסקי - הרשמת מייסד (מקדמה)' },
        Quantity: 1,
        UnitPrice: 500, // ₪500 מקדמת-מייסד — נקבע בצד שרת בלבד
        Currency: 'ILS',
      },
    ],
    DocumentDescription: businessName
      ? `מוח עסקי - הרשמת מייסד (מקדמה) · איש קשר: ${name}${taxId ? ` · ח.פ/ע.מ: ${taxId}` : ''}`
      : 'מוח עסקי - הרשמת מייסד (מקדמה)',
    MaximumPayments: 1,
    RedirectURL: `${siteUrl}/thanks?product=business-brain`,
    ExitRedirectURL: `${siteUrl}/products/business-brain?payment=cancel`,
  };

  try {
    const sumitRes = await fetch(
      'https://api.sumit.co.il/billing/payments/beginredirect/',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(sumitPayload),
      },
    );

    const data = (await sumitRes.json()) as {
      Data?: { RedirectURL?: string };
      Status?: number;
      UserErrorMessage?: string | null;
    };

    if (!sumitRes.ok || data.Status !== 0 || !data.Data?.RedirectURL) {
      return NextResponse.json(
        {
          error: 'sumit_error',
          message: data.UserErrorMessage ?? 'שגיאה בפתיחת עמוד תשלום',
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ checkoutUrl: data.Data.RedirectURL });
  } catch {
    return NextResponse.json(
      { error: 'network_error', message: 'לא הצלחנו להתחבר לספק התשלומים' },
      { status: 502 },
    );
  }
}
