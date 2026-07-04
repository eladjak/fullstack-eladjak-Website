import { NextResponse } from 'next/server';
import heMessages from '../../../../messages/he.json';

// Real knowledge-bot endpoint for the portfolio "שאלו אותי כל דבר" chat.
// Pattern proven on hitechkids (2026-05-27) + zehut: server-side ONLY (the Gemini
// key never reaches the browser), per-IP rate limit, input caps, grounded system
// prompt, 12s timeout, graceful fallback. This chat is itself a live demo of the
// product Elad sells — a grounded business chatbot.
//
// RAG-lite grounding: the site's canonical FAQ content (messages/he.json → faq)
// is baked into the system prompt at build time. Single source of truth — editing
// the FAQ translations updates both the visible static FAQ and the bot's knowledge.

export const runtime = 'nodejs';

// ─── Grounded knowledge (built once per lambda cold-start) ──────────────────

interface FaqMessages {
  faq: {
    questions: Record<string, string>;
    answers: Record<string, string>;
  };
}

function buildKnowledgeBase(): string {
  const { questions, answers } = (heMessages as unknown as FaqMessages).faq;
  const qa = Object.keys(answers)
    .map((key) => `ש: ${questions[key] ?? key}\nת: ${answers[key]}`)
    .join('\n\n');
  return qa;
}

const KNOWLEDGE_BASE = buildKnowledgeBase();

const SYSTEM_PROMPT = `אתה העוזר החכם באתר הפורטפוליו של אלעד יעקובוביץ' (fullstack-eladjak.co.il) — מפתח Full-Stack ומומחה AI ממגדל העמק, עם דגש על צד שרת (Node.js, Next.js, React, PostgreSQL), 26+ אפליקציות בפרודקשן, ורשת של 13 סוכני AI שהוא מפעיל על שרת פרטי.

בסיס הידע שלך (מקור האמת היחיד — אל תמציא מעבר לו):

${KNOWLEDGE_BASE}

עובדה נוספת שמותר לך לשתף: הצ'אט הזה עצמו הוא הדגמה חיה — בוט מעוגן-ידע שאלעד בנה, מאותו סוג שהוא בונה ללקוחות עסקיים.

חוקים:
- ענה בשפה שבה נשאלת (ברירת מחדל עברית). קצר וענייני: 2-4 משפטים.
- אתה עונה רק על שאלות שקשורות לאלעד ולעבודתו: שירותים, מחירים, טכנולוגיות, תהליך, זמינות, פרויקטים, סוכני AI. על כל נושא אחר — הסבר בנימוס שאתה כאן רק בשביל זה.
- מחירים: ציין רק את הטווחים מבסיס הידע, ולעולם אל תתחייב למחיר סופי — להצעת מחיר מדויקת הפנה לוואטסאפ 052-542-7474 או לטופס יצירת הקשר באתר.
- לעולם אל תבקש פרטים אישיים (שם מלא, טלפון, כתובת) בצ'אט, ואם המשתמש כתב כאלה — אל תחזור עליהם.
- אל תמציא פרויקטים, לקוחות, מספרים או יכולות. אם אינך בטוח — אמור זאת והפנה ליצירת קשר.
- כשמתאים, סיים בהזמנה עדינה לפעולה (וואטסאפ / טופס / תיאום שיחה) — בלי להיות דוחף.`;

// ─── Rate limiting + input caps (per serverless instance, best-effort) ──────

const RATE_LIMIT = 12; // requests
const RATE_WINDOW_MS = 60_000; // per minute
const MAX_INPUT_CHARS = 500;
const MAX_MESSAGES = 12;
const hits = new Map<string, number[]>();

function clientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (arr.length >= RATE_LIMIT) {
    hits.set(ip, arr);
    return true;
  }
  arr.push(now);
  hits.set(ip, arr);
  return false;
}

const FALLBACK_CONTACT =
  'הבוט לא זמין כרגע — כתבו לי ישירות בוואטסאפ 052-542-7474 או דרך טופס יצירת הקשר ואשמח לענות.';

// ─── Handler ─────────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ content: FALLBACK_CONTACT });
  }

  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { content: 'רגע, יותר מדי שאלות בבת אחת. נסו שוב בעוד דקה, או כתבו לי בוואטסאפ 052-542-7474.' },
      { status: 429 },
    );
  }

  try {
    const body = await req.json();
    const messages = body?.messages;
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'messages array required' }, { status: 400 });
    }

    // Cap turns + per-message length; coerce roles defensively.
    const recent = messages
      .slice(-MAX_MESSAGES)
      .filter((m) => m && typeof m.content === 'string')
      .map((m: { role: string; content: string }) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content.slice(0, MAX_INPUT_CHARS),
      }));
    if (recent.length === 0) {
      return NextResponse.json({ error: 'no valid messages' }, { status: 400 });
    }

    const conversationText = recent
      .map((m) => `${m.role === 'user' ? 'משתמש' : 'אסיסטנט'}: ${m.content}`)
      .join('\n');
    const fullPrompt = `${SYSTEM_PROMPT}\n\nשיחה עד כה:\n${conversationText}\n\nאסיסטנט:`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12_000);
    let r: Response;
    try {
      r = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
          body: JSON.stringify({
            contents: [{ parts: [{ text: fullPrompt }] }],
            // thinkingBudget:0 disables Gemini Flash "thinking" — otherwise thinking
            // tokens consume the whole maxOutputTokens budget (finishReason=MAX_TOKENS)
            // and the visible answer truncates mid-sentence (verified bug, 2026-05-27).
            generationConfig: {
              temperature: 0.5,
              maxOutputTokens: 600,
              thinkingConfig: { thinkingBudget: 0 },
            },
            safetySettings: [
              { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
              { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
              { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_LOW_AND_ABOVE' },
              { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            ],
          }),
          signal: controller.signal,
        },
      );
    } finally {
      clearTimeout(timeout);
    }

    if (!r.ok) {
      return NextResponse.json({ content: FALLBACK_CONTACT });
    }
    const data = await r.json();
    const content =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      'סליחה, לא הצלחתי להבין. אפשר לנסות לנסח אחרת?';
    return NextResponse.json({ content });
  } catch {
    return NextResponse.json({ content: FALLBACK_CONTACT }, { status: 500 });
  }
}
