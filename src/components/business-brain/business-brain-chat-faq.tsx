'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Bot, SendHorizontal, User, MessageCircle } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type FaqKey =
  | 'privacy'
  | 'metaAi'
  | 'vacation'
  | 'taskFocus'
  | 'howItWorks'
  | 'pricing'
  | 'founding'
  | 'cancel';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

const QUESTIONS: Record<FaqKey, string> = {
  privacy: 'מה עם הפרטיות של העסק שלי?',
  metaAi: 'למה לא להשתמש ב-Meta AI בחינם?',
  vacation: 'מה קורה כשאתה בחופשה?',
  taskFocus: 'על אילו משימות הסוכן עונה?',
  howItWorks: 'איך זה עובד בפועל?',
  pricing: 'מה כוללת חבילת המייסד?',
  founding: 'כמה מקומות מייסדים נשארו?',
  cancel: 'אפשר לבטל את המנוי?',
};

const ANSWERS: Record<FaqKey, string> = {
  privacy:
    'כל מידע שתשתף — נשאר בינינו. לא מתחלק עם צד שלישי, לא מאומן עליו. הסוכן מחובר רק למה שאתה מחבר אותו אליו: היומן שלך, הלידים שלך. מבחינת הרגולציה — יש לנו הסכם עיבוד נתונים לפי תיקון 13 לחוק הגנת הפרטיות. אתה לא מתפשר.',
  metaAi:
    'Meta AI מדברת עברית ויודעת הכל — על העולם. הסוכן שלך יודע אותך. את שמות הלידים שלך, את מה שדיברת איתם בשבוע שעבר, את המחיר שהצעת לכל אחד. Meta AI לא רואה את ה-CRM שלך, לא זוכרת מה אמרת ב-1 בינואר, ולא תשלח תזכורת בדיוק בזמן שביקשת. זה ההבדל.',
  vacation:
    'הסוכן ממשיך לעבוד — תגובות אוטומטיות, תזכורות ועדכונים. ואני זמין ב-24 שעות לדברים שדורשים קבלת-החלטות. אם אני נעדר מעבר לזה, מודיע מראש ומסדרים כיסוי. זה חלק מה-SLA.',
  taskFocus:
    'כל מה שקשור לניהול היומיומי של העסק שלך: דו"ח בוקר (לידים, פגישות, תזכורות), סיכום יום, תזכורת ליד שלא ענה, שאלות על המספרים. לא תוכן שיווקי, לא ייעוץ עסקי אסטרטגי. ממוקד-משימות, כמו עוזר מנהל — לא יועץ.',
  howItWorks:
    'שלב א׳ — שיחת היכרות, שם אנחנו ממפים את העסק שלך: מה אתה צריך, עם אילו מערכות אתה עובד. שלב ב׳ — בניה ואפיון (שבועיים). שלב ג׳ — העסק מתחיל לקבל דיווחים ותזכורות ישירות לוואטסאפ. מהיום שהסוכן באוויר — אתה מנהל את העסק ממש מהטלפון.',
  pricing:
    'חבילת מייסד: הקמה ₪1,450 (במקום ₪2,900) + מנוי ₪390 לחודש (במקום ₪490). מכסה עד 3 מייסדים בלבד. ₪500 מקדמה עכשיו שמורידה מהיתרה.',
  founding:
    'התחלנו עם 3 מקומות. כל שריון מגיע עם ₪500 מקדמה שנספרת על חשבון ההקמה. אחרי שהמקומות יתמלאו — המחיר חוזר לרגיל (₪2,900 + ₪490). לא מיהרת — עלות שנה ראשונה תעלה לך ₪1,740 יותר.',
  cancel:
    'כן, ניתן לבטל בכל עת עם 30 יום הודעה מראש, בלי שום עלות נוספת. מקדמת ההרשמה לא מוחזרת, אבל כל שאר התשלומים עוצרים. פשוט ועניני.',
};

const FOLLOW_UPS: Record<FaqKey, FaqKey[]> = {
  privacy: ['metaAi', 'cancel', 'howItWorks'],
  metaAi: ['privacy', 'taskFocus', 'pricing'],
  vacation: ['pricing', 'cancel', 'founding'],
  taskFocus: ['howItWorks', 'metaAi', 'pricing'],
  howItWorks: ['taskFocus', 'pricing', 'founding'],
  pricing: ['founding', 'cancel', 'howItWorks'],
  founding: ['pricing', 'howItWorks', 'cancel'],
  cancel: ['pricing', 'vacation', 'privacy'],
};

const INITIAL_QUESTIONS: FaqKey[] = ['metaAi', 'howItWorks', 'pricing', 'privacy'];

const ALL_QUESTIONS: FaqKey[] = [
  'metaAi',
  'howItWorks',
  'pricing',
  'privacy',
  'taskFocus',
  'vacation',
  'founding',
  'cancel',
];

// Opening message from the "bot"
const OPENING_MESSAGE = 'שלום. אני כאן לענות על שאלות על המוח העסקי. בחר שאלה מהרשימה, או כתוב שאלה חופשית.';

// ─── Typing dots ──────────────────────────────────────────────────────────────

function TypingDots({ reduced }: { reduced: boolean }) {
  if (reduced) {
    return (
      <div className="flex items-center gap-1 px-1 py-0.5" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span key={i} className="block h-2 w-2 rounded-full bg-primary/70" />
        ))}
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1 px-1 py-0.5" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block h-2 w-2 rounded-full bg-primary/70"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.18,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ─── Question Chip ────────────────────────────────────────────────────────────

interface ChipProps {
  label: string;
  onClick: () => void;
  disabled: boolean;
}

function QuestionChip({ label, onClick, disabled }: ChipProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.03 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      className={[
        'rounded-full border px-3 py-1.5 text-sm font-medium text-start transition-colors duration-150',
        'border-primary/30 bg-primary/10 text-primary',
        'hover:border-primary/50 hover:bg-primary/20',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:pointer-events-none disabled:opacity-40',
      ].join(' ')}
      aria-label={label}
    >
      {label}
    </motion.button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function BusinessBrainChatFAQ() {
  const prefersReducedMotion = useReducedMotion();

  const openingMsg: ChatMessage = {
    id: 'opening',
    role: 'assistant',
    text: OPENING_MESSAGE,
  };

  const [messages, setMessages] = useState<ChatMessage[]>([openingMsg]);
  const [suggested, setSuggested] = useState<FaqKey[]>(INITIAL_QUESTIONS);
  const [isTyping, setIsTyping] = useState(false);
  const [answeredKeys, setAnsweredKeys] = useState<Set<FaqKey>>(new Set());
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleQuestionClick = (key: FaqKey) => {
    if (isTyping) return;

    const questionText = QUESTIONS[key];
    const answerText = ANSWERS[key];

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: questionText,
    };
    setMessages((prev) => [...prev, userMsg]);
    setSuggested([]);
    setIsTyping(true);

    const newAnsweredKeys = new Set(answeredKeys).add(key);
    setAnsweredKeys(newAnsweredKeys);

    const delay = prefersReducedMotion ? 100 : 800 + Math.random() * 400;

    setTimeout(() => {
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: answerText,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);

      const followUps = FOLLOW_UPS[key].filter(
        (k) => !newAnsweredKeys.has(k),
      );
      setSuggested(followUps.slice(0, 3));

      if (liveRef.current) {
        liveRef.current.textContent = answerText;
      }
    }, delay);
  };

  const handleFreeTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const question = input.trim();
    if (!question || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: question,
    };

    // Build context-aware history for the AI
    const history = [...messages, userMsg]
      .slice(-10)
      .map((m) => ({ role: m.role, content: m.text }));

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setSuggested([]);
    setIsTyping(true);

    // System context injected client-side for the free-text path
    const systemContext = `אתה עוזר-מכירות של "מוח עסקי" — שירות ניהול עסקי בוואטסאפ של אלעד יעקובוביץ' (fullstack-eladjak.co.il). ענה בעברית, בגוף ראשון כאלעד, בקצרה (2-3 משפטים), בלי מקפים ארוכים, בלי bullet points. תמחור: הקמה ₪2,900, מנוי בסיסי ₪490, מקצועי ₪790. חבילת מייסד: ₪1,450ונ₪390 לחודש. וואטסאפ: 052-542-7474.`;

    let answerText = 'לא הצלחתי לענות כרגע. רוצה לכתוב לי ישירות בוואטסאפ?';
    try {
      const res = await fetch('/api/chat-faq/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history, system: systemContext }),
      });
      const data = (await res.json().catch((): null => null)) as {
        content?: unknown;
      } | null;
      if (data && typeof data.content === 'string' && data.content) {
        answerText = data.content;
      }
    } catch {
      // network fallback
    }

    setMessages((prev) => [
      ...prev,
      { id: `assistant-${Date.now()}`, role: 'assistant', text: answerText },
    ]);
    setIsTyping(false);

    const remaining = INITIAL_QUESTIONS.filter((k) => !answeredKeys.has(k));
    setSuggested(remaining.slice(0, 3));

    if (liveRef.current) {
      liveRef.current.textContent = answerText;
    }
  };

  return (
    <section
      className="w-full py-16 md:py-24"
      id="faq"
      aria-labelledby="bb-faq-heading"
    >
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            שאלות נפוצות
          </span>
          <h2
            id="bb-faq-heading"
            className="text-3xl font-bold tracking-tighter sm:text-4xl mb-3"
          >
            שאל כל שאלה
          </h2>
          <p className="text-muted-foreground md:text-lg">
            בחר שאלה מוכנה, או כתוב בחופשיות.
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          {/* Chat window */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/20 overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4 bg-white/5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-700 shadow-md shadow-violet-500/20">
                <Bot className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight">מוח עסקי — מידע ושאלות</p>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span
                    className="inline-block h-2 w-2 rounded-full bg-emerald-500"
                    aria-hidden="true"
                  />
                  זמין עכשיו
                </span>
              </div>
              <div className="ms-auto flex items-center gap-1.5" aria-hidden="true">
                <span className="h-3 w-3 rounded-full bg-white/15" />
                <span className="h-3 w-3 rounded-full bg-white/15" />
                <span className="h-3 w-3 rounded-full bg-white/15" />
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex flex-col gap-4 overflow-y-auto p-5 scroll-smooth"
              style={{ maxHeight: '400px', minHeight: '200px' }}
              role="log"
              aria-live="off"
              aria-label="שיחה"
            >
              <AnimatePresence initial={false}>
                {messages.map((msg) => {
                  const isUser = msg.role === 'user';
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse rtl:flex-row' : 'flex-row rtl:flex-row-reverse'}`}
                    >
                      <div
                        className={`flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full ${
                          isUser
                            ? 'bg-gradient-to-br from-violet-500 to-purple-600'
                            : 'bg-gradient-to-br from-amber-500 to-orange-600'
                        }`}
                        aria-hidden="true"
                      >
                        {isUser ? (
                          <User className="h-3.5 w-3.5 text-white" />
                        ) : (
                          <Bot className="h-3.5 w-3.5 text-white" />
                        )}
                      </div>
                      <div
                        className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                          isUser
                            ? 'bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-se-sm rtl:rounded-se-2xl rtl:rounded-ss-sm'
                            : 'bg-white/10 border border-white/10 text-foreground rounded-ss-sm rtl:rounded-ss-2xl rtl:rounded-se-sm'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-end gap-2 flex-row rtl:flex-row-reverse"
                    aria-label="מקליד..."
                    role="status"
                  >
                    <div className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600" aria-hidden="true">
                      <Bot className="h-3.5 w-3.5 text-white" />
                    </div>
                    <div className="rounded-2xl rounded-ss-sm rtl:rounded-ss-2xl rtl:rounded-se-sm bg-white/10 border border-white/10 px-4 py-3">
                      <TypingDots reduced={!!prefersReducedMotion} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Suggested chips */}
            <div className="border-t border-white/10 bg-white/3 px-5 py-4">
              <AnimatePresence mode="wait">
                {suggested.length > 0 && (
                  <motion.div
                    key={suggested.join(',')}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18 }}
                    className="flex flex-wrap gap-2"
                    role="group"
                    aria-label="שאלות מוצעות"
                  >
                    {suggested.map((key) => (
                      <QuestionChip
                        key={key}
                        label={QUESTIONS[key]}
                        onClick={() => handleQuestionClick(key)}
                        disabled={isTyping}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Free text input */}
            <form
              onSubmit={handleFreeTextSubmit}
              className="flex items-center gap-2 border-t border-white/10 bg-white/5 px-4 py-3"
            >
              <label htmlFor="bb-chat-input" className="sr-only">
                שאל שאלה חופשית
              </label>
              <input
                id="bb-chat-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="שאל שאלה חופשית..."
                maxLength={400}
                disabled={isTyping}
                autoComplete="off"
                dir="rtl"
                className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isTyping || input.trim().length === 0}
                aria-label="שלח שאלה"
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-700 text-white shadow-md shadow-violet-500/20 transition-transform duration-150 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40"
              >
                <SendHorizontal className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
              </button>
            </form>
          </div>

          {/* Static SEO fallback */}
          <details className="mt-6 rounded-xl border border-border/50 bg-card/40 px-5 py-4">
            <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded">
              כל השאלות והתשובות (לקריאה ישירה)
            </summary>
            <dl className="mt-4 space-y-5">
              {ALL_QUESTIONS.map((key) => (
                <div key={key}>
                  <dt className="text-sm font-semibold text-foreground">
                    {QUESTIONS[key]}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {ANSWERS[key]}
                  </dd>
                </div>
              ))}
            </dl>
          </details>
        </div>
      </div>

      <div
        ref={liveRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
    </section>
  );
}
