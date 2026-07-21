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
  if (!companyId || !orgId || !apiToken) {
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

  if (!name || !email || !phone) {
    return NextResponse.json(
      { error: 'missing_fields', required: ['name', 'email', 'phone'] },
      { status: 400 },
    );
  }

  // Sumit LowProfile checkout — creates a hosted payment page
  // Reference: https://app.sumit.co.il/developers/docs/lowprofile
  const sumitPayload = {
    APIKey: apiToken,
    OrganizationID: orgId,
    Settings: {
      CustomerName: name,
      CustomerEmail: email,
      CustomerPhone: phone,
    },
    Sale: {
      Price: 500, // ₪500 מקדמת-מייסד
      Currency: 'ILS',
      Description: 'מוח עסקי — הרשמת מייסד (מקדמה)',
      SendEmailToCustomer: true,
      DocumentType: 3, // קבלה (receipt)
    },
    URLs: {
      Approved: `${siteUrl}/thanks?product=business-brain`,
      Error: `${siteUrl}/products/business-brain?payment=error`,
    },
  };

  try {
    const sumitRes = await fetch(
      `https://api.sumit.co.il/payments/create/${companyId}/`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sumitPayload),
      },
    );

    const data = (await sumitRes.json()) as {
      data?: { URL?: string };
      Succeeded?: boolean;
      Error?: { Message?: string };
    };

    if (!sumitRes.ok || !data.Succeeded || !data.data?.URL) {
      return NextResponse.json(
        {
          error: 'sumit_error',
          message: data.Error?.Message ?? 'שגיאה בפתיחת עמוד תשלום',
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ checkoutUrl: data.data.URL });
  } catch {
    return NextResponse.json(
      { error: 'network_error', message: 'לא הצלחנו להתחבר לספק התשלומים' },
      { status: 502 },
    );
  }
}
