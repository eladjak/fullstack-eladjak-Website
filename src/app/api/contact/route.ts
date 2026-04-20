import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

// --- Zod validation schema ---
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  subject: z.string().min(3).max(200),
  message: z.string().min(10).max(5000),
});

// --- In-memory rate limiting (5 requests per IP per 15 minutes) ---
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5;

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count += 1;
  return true;
}

// Periodically clean up expired entries to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW_MS);

// --- HTML escaping to prevent XSS in emails ---
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// --- Professional HTML email template ---
function buildEmailHtml(data: { name: string; email: string; subject: string; message: string }): string {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const subject = escapeHtml(data.subject);
  const message = escapeHtml(data.message);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background-color:#f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f1f5f9; padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 6px rgba(0,0,0,0.07);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding:32px 40px;">
              <h1 style="margin:0; color:#ffffff; font-size:22px; font-weight:600;">New Contact Form Submission</h1>
              <p style="margin:8px 0 0; color:rgba(255,255,255,0.85); font-size:14px;">From your portfolio website</p>
            </td>
          </tr>

          <!-- Sender Info -->
          <tr>
            <td style="padding:32px 40px 0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f8fafc; border-radius:8px; border:1px solid #e2e8f0;">
                <tr>
                  <td style="padding:20px 24px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding-bottom:12px;">
                          <span style="display:inline-block; font-size:12px; font-weight:600; color:#64748b; text-transform:uppercase; letter-spacing:0.05em;">Name</span><br/>
                          <span style="font-size:15px; color:#1e293b; font-weight:500;">${name}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom:12px;">
                          <span style="display:inline-block; font-size:12px; font-weight:600; color:#64748b; text-transform:uppercase; letter-spacing:0.05em;">Email</span><br/>
                          <a href="mailto:${email}" style="font-size:15px; color:#3b82f6; text-decoration:none; font-weight:500;">${email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span style="display:inline-block; font-size:12px; font-weight:600; color:#64748b; text-transform:uppercase; letter-spacing:0.05em;">Subject</span><br/>
                          <span style="font-size:15px; color:#1e293b; font-weight:500;">${subject}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:24px 40px 32px;">
              <h2 style="margin:0 0 12px; font-size:14px; font-weight:600; color:#64748b; text-transform:uppercase; letter-spacing:0.05em;">Message</h2>
              <div style="background-color:#f8fafc; border-radius:8px; border:1px solid #e2e8f0; padding:20px 24px;">
                <p style="margin:0; font-size:15px; line-height:1.7; color:#334155; white-space:pre-wrap;">${message}</p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:0 40px 32px;">
              <hr style="border:none; border-top:1px solid #e2e8f0; margin:0 0 16px;" />
              <p style="margin:0; font-size:12px; color:#94a3b8; text-align:center;">
                This email was sent from the contact form at
                <a href="https://fullstack-eladjak.co.il" style="color:#3b82f6; text-decoration:none;">fullstack-eladjak.co.il</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    // Rate limiting by IP
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() || 'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const data = contactSchema.parse(body);

    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL || 'elad@hiteclearning.co.il';

    if (!resendApiKey) {
      // No Resend API key - try Web3Forms before mailto fallback
      const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY;

      if (web3formsKey) {
        try {
          const web3Response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              access_key: web3formsKey,
              name: data.name,
              email: data.email,
              subject: `[Portfolio] ${data.subject}`,
              message: data.message,
              from_name: 'Portfolio Contact Form',
            }),
          });

          const web3Result = await web3Response.json() as { success: boolean };

          if (web3Result.success) {
            return NextResponse.json({ success: true });
          }

          console.error('Web3Forms submission failed:', web3Result);
        } catch (web3Error) {
          console.error('Web3Forms error:', web3Error);
        }
      }

      // Neither Resend nor Web3Forms configured/working - return mailto fallback
      return NextResponse.json(
        { success: false, fallback: 'mailto', email: contactEmail },
        { status: 200 }
      );
    }

    // Send email via official Resend SDK
    const resend = new Resend(resendApiKey);

    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <portfolio@eladjak.com>',
      to: [contactEmail],
      replyTo: data.email,
      subject: `[Portfolio] ${escapeHtml(data.subject)}`,
      html: buildEmailHtml({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      }),
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
