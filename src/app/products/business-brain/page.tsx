'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  MessageCircle,
  Bot,
  Clock,
  BarChart3,
  Shield,
  CheckCircle2,
  Phone,
  Calendar,
  ArrowLeft,
  Sparkles,
  Users,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import { ScrollAnimate } from '@/components/ui/scroll-animate';
import { BusinessBrainChatFAQ } from '@/components/business-brain/business-brain-chat-faq';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  delay: number;
}

interface PricingTier {
  name: string;
  setup: number;
  monthly: number;
  features: string[];
  highlighted?: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const WA_DEEP_LINK =
  'https://wa.me/972525427474?text=' +
  encodeURIComponent('היי אלעד, אני רוצה לשמוע על המוח העסקי');

const WA_FOUNDER_LINK =
  'https://wa.me/972525427474?text=' +
  encodeURIComponent('היי אלעד, אני מעוניין לשריין מקום מייסד במוח העסקי');

// Live WhatsApp conversation demo
const DEMO_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    sender: 'bot',
    text: 'בוקר טוב! הנה הדו"ח שלך לסוף השבוע: 4 לידים חדשים, 2 פגישות מחר, ותזכורת — שלמה לא ענה עדיין על ההצעה שלך מלפני 3 ימים.',
    delay: 0,
  },
  {
    id: '2',
    sender: 'user',
    text: 'מה הסטטוס של שלמה?',
    delay: 1800,
  },
  {
    id: '3',
    sender: 'bot',
    text: 'שלמה כהן — פגישה ראשונה 14.7, הצעה נשלחה 18.7 (₪4,200), לא ענה. רוצה שאכין טיוטת הודעת מעקב?',
    delay: 3200,
  },
  {
    id: '4',
    sender: 'user',
    text: 'כן, בסגנון חם ולא לוחץ',
    delay: 5000,
  },
  {
    id: '5',
    sender: 'bot',
    text: '"שלמה שלום, רק רציתי לבדוק שהכל ברור מהצעה שנשלחה. שמח לענות על כל שאלה. מה שיהיה כאן — אלעד."',
    delay: 7000,
  },
];

// Comparison data
const COMPARISON_ROWS = [
  {
    feature: 'מכיר את הלידים שלך',
    secretary: true,
    metaAi: false,
    bb: true,
  },
  {
    feature: 'דו"ח בוקר אוטומטי',
    secretary: false,
    metaAi: false,
    bb: true,
  },
  {
    feature: 'תזכורות חכמות',
    secretary: true,
    metaAi: false,
    bb: true,
  },
  {
    feature: 'עברית רהוטה ומדויקת',
    secretary: true,
    metaAi: true,
    bb: true,
  },
  {
    feature: 'זמין 24/7',
    secretary: false,
    metaAi: true,
    bb: true,
  },
  {
    feature: 'גב אנושי כשצריך',
    secretary: true,
    metaAi: false,
    bb: true,
  },
  {
    feature: 'מחיר חודשי',
    secretary: '₪7,800',
    metaAi: 'חינם',
    bb: '₪490',
  },
];

const PRICING_TIERS: PricingTier[] = [
  {
    name: 'בסיסי',
    setup: 2900,
    monthly: 490,
    features: [
      'דו"ח בוקר יומי',
      'תזכורות לידים',
      'סיכום יום',
      'שאלות חופשיות עד 60/יום',
    ],
  },
  {
    name: 'מקצועי',
    setup: 2900,
    monthly: 790,
    highlighted: true,
    features: [
      'הכל מהבסיסי',
      'אינטגרציה ל-Google Calendar',
      'ניתוח מגמות שבועי',
      'שאלות חופשיות ללא הגבלה',
      'SLA תגובה 4 שעות',
    ],
  },
];

// ─── WhatsApp Chat Demo Component ─────────────────────────────────────────────

function WhatsAppDemo({ reduced }: { reduced: boolean }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (reduced) {
      setVisibleCount(DEMO_MESSAGES.length);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    DEMO_MESSAGES.forEach((msg, index) => {
      const t = setTimeout(() => {
        setVisibleCount((c) => Math.max(c, index + 1));
      }, msg.delay + 600);
      timers.push(t);
    });

    return () => timers.forEach((t) => clearTimeout(t));
  }, [reduced]);

  return (
    <div
      className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/30"
      role="region"
      aria-label="הדגמת שיחת וואטסאפ"
    >
      {/* WhatsApp header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#075E54]">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#128C7E]">
          <Bot className="h-5 w-5 text-white" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white leading-tight">
            מוח עסקי
          </p>
          <p className="text-xs text-green-200">מחובר</p>
        </div>
      </div>

      {/* Chat area */}
      <div
        className="flex flex-col gap-3 p-4 min-h-[320px]"
        style={{
          background:
            'linear-gradient(to bottom, #0B1014 0%, #0D1117 100%)',
        }}
      >
        {DEMO_MESSAGES.slice(0, visibleCount).map((msg) => {
          const isBot = msg.sender === 'bot';
          return (
            <motion.div
              key={msg.id}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[78%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  isBot
                    ? 'bg-[#1E2A20] text-[#E3F0E7] rounded-tl-sm'
                    : 'bg-[#005C4B] text-white rounded-tr-sm'
                }`}
              >
                {msg.text}
                <p className="mt-1 text-right text-[10px] opacity-50">
                  {isBot ? '09:14' : '09:15'}
                </p>
              </div>
            </motion.div>
          );
        })}

        {/* Typing indicator for next message */}
        {visibleCount < DEMO_MESSAGES.length && !reduced && (
          <div className="flex justify-start">
            <div className="rounded-xl rounded-tl-sm bg-[#1E2A20] px-3.5 py-2.5">
              <div className="flex gap-1" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="block h-2 w-2 rounded-full bg-[#89B498]"
                    animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                    transition={{
                      duration: 0.7,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Count Up ─────────────────────────────────────────────────────────────────

function CountUp({
  value,
  suffix = '',
  prefix = '',
  reduced,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  reduced: boolean;
}) {
  const [display, setDisplay] = useState(reduced ? value : 0);
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const duration = 1200;
          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
            else setDisplay(value);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, reduced]);

  return (
    <span ref={ref} className="tabular-nums font-bold" aria-label={`${prefix}${value}${suffix}`}>
      {prefix}
      {display.toLocaleString('he-IL')}
      {suffix}
    </span>
  );
}

// ─── Cinematic helpers ────────────────────────────────────────────────────────

/**
 * Illustration with a gentle scroll parallax (transform-only, GPU-friendly).
 * Falls back to a static image under prefers-reduced-motion.
 */
function ParallaxIllustration({
  src,
  reduced,
  className = '',
  imgClassName = '',
  priority = false,
}: {
  src: string;
  reduced: boolean;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-[-8%]"
        style={{ y: reduced ? 0 : y }}
      >
        <Image
          src={src}
          alt=""
          aria-hidden="true"
          fill
          className={`object-cover object-center ${imgClassName}`}
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={priority}
        />
      </motion.div>
    </div>
  );
}

/** Content that slides in from a horizontal direction as it enters the viewport. */
function SlideIn({
  children,
  from,
  reduced,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  from: 'right' | 'left';
  reduced: boolean;
  delay?: number;
  className?: string;
}) {
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, x: from === 'right' ? 48 : -48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Founder Banner ───────────────────────────────────────────────────────────

function FounderBanner({
  reduced,
  onCheckout,
}: {
  reduced: boolean;
  onCheckout: () => void;
}) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent p-8 md:p-10"
    >
      {/* Background glow */}
      <div
        className="absolute -top-10 -end-10 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 border border-amber-500/30 px-3 py-1 text-sm font-medium text-amber-400 mb-4">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            מחיר מייסד — 3 מקומות בלבד
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-balance mb-2">
            שריין מקום עכשיו
          </h3>
          <p className="text-muted-foreground leading-relaxed max-w-lg mb-4">
            הקמה{' '}
            <strong className="text-foreground">₪1,450</strong>{' '}
            (במקום ₪2,900) ומנוי{' '}
            <strong className="text-foreground">₪390 לחודש</strong>{' '}
            (במקום ₪490). מקדמה של ₪500 שומרת את המקום ונספרת בהקמה.
          </p>

          {/* Savings callout */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              חיסכון של ₪1,740 בשנה הראשונה
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <AlertCircle className="h-4 w-4" aria-hidden="true" />
              המחיר עולה אחרי המקום האחרון
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
          <button
            type="button"
            onClick={onCheckout}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-semibold text-gray-900 shadow-lg shadow-amber-500/25 transition-all duration-150 hover:bg-amber-400 hover:shadow-amber-500/40 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            שריין מקום מייסד — ₪500 מקדמה
          </button>

          <a
            href={WA_FOUNDER_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium transition-all duration-150 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
            שאלה קודם? שלח הודעה
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── WhatsApp Icon ────────────────────────────────────────────────────────────

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

// ─── Checkout Modal ───────────────────────────────────────────────────────────

function CheckoutModal({
  open,
  onClose,
  reduced,
}: {
  open: boolean;
  onClose: () => void;
  reduced: boolean;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/sumit/business-brain-checkout/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone }),
      });
      const data = (await res.json()) as {
        checkoutUrl?: string;
        whatsappFallback?: string;
        error?: string;
        message?: string;
      };

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else if (data.whatsappFallback) {
        // Payment not configured yet — open WhatsApp
        window.open(data.whatsappFallback, '_blank', 'noopener,noreferrer');
        onClose();
      } else {
        setError(data.message ?? 'משהו השתבש. נסה שוב או שלח הודעה בוואטסאפ.');
      }
    } catch {
      setError('בעיית חיבור. נסה שוב.');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
            initial={reduced ? false : { opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-x-4 top-[10%] z-50 mx-auto max-w-md rounded-2xl border border-white/10 bg-[#09090B] p-6 shadow-2xl md:inset-x-auto md:left-1/2 md:-translate-x-1/2"
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 px-2.5 py-1 text-xs font-medium text-amber-400 mb-2">
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  מחיר מייסד
                </div>
                <h2 id="checkout-title" className="text-lg font-bold">
                  שריין מקום — ₪500 מקדמה
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  המקדמה נספרת על חשבון עלות ההקמה.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="סגור"
                className="shrink-0 rounded-full p-1.5 text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
              {[
                { id: 'co-name', label: 'שם מלא', value: name, set: setName, type: 'text', placeholder: 'ישראל ישראלי', autoComplete: 'name' },
                { id: 'co-email', label: 'כתובת מייל', value: email, set: setEmail, type: 'email', placeholder: 'you@example.com', autoComplete: 'email' },
                { id: 'co-phone', label: 'מספר טלפון', value: phone, set: setPhone, type: 'tel', placeholder: '052-000-0000', autoComplete: 'tel' },
              ].map((field) => (
                <div key={field.id} className="space-y-1.5">
                  <label
                    htmlFor={field.id}
                    className="block text-sm font-medium text-foreground"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    value={field.value}
                    onChange={(e) => field.set(e.target.value)}
                    placeholder={field.placeholder}
                    autoComplete={field.autoComplete}
                    required
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                  />
                </div>
              ))}

              {error && (
                <p className="text-sm text-destructive flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-semibold text-gray-900 shadow-lg shadow-amber-500/20 transition-all duration-150 hover:bg-amber-400 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 disabled:pointer-events-none"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" aria-hidden="true" />
                    מעביר לדף תשלום...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    לדף תשלום מאובטח
                  </>
                )}
              </button>

              <p className="text-center text-xs text-muted-foreground">
                תשלום מאובטח דרך Sumit · קבלה נשלחת למייל
              </p>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function BusinessBrainPage() {
  const reduced = useReducedMotion() ?? false;
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroParallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  // "How it works" — a line that fills as the visitor scrolls through the steps
  const howStepsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: howProgress } = useScroll({
    target: howStepsRef,
    offset: ['start 0.8', 'end 0.5'],
  });

  return (
    <>
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        reduced={reduced}
      />

      <div className="flex min-h-dvh flex-col" dir="rtl" lang="he">
        <main className="flex-1">

          {/* ─── HERO ─── */}
          <section
            ref={heroRef}
            className="relative w-full min-h-dvh flex items-center overflow-hidden"
            aria-labelledby="bb-hero-heading"
          >
            {/* Parallax background image */}
            <motion.div
              className="absolute inset-0 z-0"
              style={{ y: reduced ? 0 : heroParallaxY }}
            >
              <Image
                src="/images/business-brain-hero.jpg"
                alt=""
                aria-hidden="true"
                fill
                className="object-cover object-center"
                priority
                sizes="100vw"
              />
            </motion.div>

            {/* Overlay */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/80 via-background/60 to-background" />

            <div className="container relative z-10 px-4 md:px-6 pt-28 pb-16">
              <div className="max-w-3xl">
                {/* Badge */}
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                    <Bot className="h-4 w-4" aria-hidden="true" />
                    מוצר חדש · גרסת מייסדים
                  </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  id="bb-hero-heading"
                  initial={reduced ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-balance leading-[1.15] mb-6"
                >
                  עוזר ניהול עסקי בוואטסאפ{' '}
                  <span className="text-primary">שמכיר את העסק שלך</span>
                </motion.h1>

                <motion.p
                  initial={reduced ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8"
                >
                  דו"ח בוקר, תזכורות לידים, סיכום יום — ישירות לוואטסאפ שלך.
                  ומאחוריו אלעד: בן-אדם שמבין עסקים ועונה כשצריך.
                </motion.p>

                {/* CTA buttons */}
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-wrap gap-4"
                >
                  <button
                    type="button"
                    onClick={() => setCheckoutOpen(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-7 py-3.5 text-sm font-semibold text-gray-900 shadow-lg shadow-amber-500/25 transition-all duration-150 hover:bg-amber-400 hover:shadow-amber-500/40 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    שריין מקום מייסד
                  </button>

                  <a
                    href={WA_DEEP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-7 py-3.5 text-sm font-medium transition-all duration-150 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                    לקבוע שיחת היכרות
                  </a>
                </motion.div>
              </div>
            </div>

            {/* Scroll hint */}
            <motion.div
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground"
              aria-hidden="true"
            >
              <span className="text-xs">גלול למטה</span>
              <motion.div
                animate={reduced ? {} : { y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="h-1.5 w-1.5 rounded-full bg-primary/60"
              />
            </motion.div>
          </section>

          {/* ─── "יום בחיים" — WhatsApp Demo Scene ─── */}
          <section
            className="w-full py-20 md:py-28 bg-gradient-to-b from-background to-muted/20"
            aria-labelledby="bb-demo-heading"
          >
            <div className="container px-4 md:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Text side */}
                <ScrollAnimate>
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm font-medium text-primary mb-5">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    יום בחיים שלך עם המוח העסקי
                  </span>

                  <h2
                    id="bb-demo-heading"
                    className="text-3xl font-bold tracking-tighter sm:text-4xl text-balance mb-5"
                  >
                    הבוקר מתחיל לפני שאתה פותח לפטופ
                  </h2>

                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      7:30 — הודעה מגיעה לוואטסאפ: לידים שנכנסו אתמול, פגישות
                      של היום, ותזכורת על הצעה שלא קיבלה מענה. אתה עדיין בקפה.
                    </p>
                    <p>
                      אחר הצהריים — תשאל "מה הסטטוס של שלמה?" ותקבל תשובה עם
                      כל ההיסטוריה, מה הוצע, מתי. בשניות.
                    </p>
                    <p>
                      18:00 — סיכום יום. מה נסגר, מה נשאר פתוח. בלי Excel. בלי
                      ניחוש. ישר לטלפון.
                    </p>
                  </div>
                </ScrollAnimate>

                {/* Chat demo side */}
                <ScrollAnimate delay={0.15}>
                  <WhatsAppDemo reduced={reduced} />
                </ScrollAnimate>
              </div>
            </div>
          </section>

          {/* ─── 3 Key Messages ─── */}
          <section
            className="w-full py-20 md:py-28 bg-gradient-to-b from-muted/20 via-background to-background"
            aria-labelledby="bb-messages-heading"
          >
            <div className="container px-4 md:px-6">
              <ScrollAnimate className="text-center max-w-2xl mx-auto mb-14">
                <h2
                  id="bb-messages-heading"
                  className="text-3xl font-bold tracking-tighter sm:text-4xl text-balance mb-4"
                >
                  שלוש אמיתות שכדאי לדעת
                </h2>
                <p className="text-muted-foreground md:text-lg">
                  לפני שמחליטים — הנה מה שחשוב.
                </p>
              </ScrollAnimate>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Bot,
                    title: 'לא עוד צ\'אטבוט',
                    body: 'Meta AI יודע הכל על העולם. הסוכן שלך יודע אותך: את הלידים שלך, את הפגישות שלך, את המספרים שלך. זה ההבדל בין כלי כללי לעוזר שמכיר את העסק שלך.',
                  },
                  {
                    icon: Users,
                    title: 'אלעד מאחורי הסוכן',
                    body: 'אני לא מוכר תוכנה ונעלם. אני שם: כשהסוכן לא יודע — אני עונה. כשיש בעיה — אני פותר. שילוב של טכנולוגיה וגב אנושי שלא תמצא ב-SaaS רגיל.',
                  },
                  {
                    icon: TrendingUp,
                    title: 'מדד הצלחה מוסכם מראש',
                    body: 'לפני שמתחילים — מגדירים יחד: מה נמדד, מה מהווה הצלחה. אם אחרי 90 יום אתה לא רואה ערך מוכח — יוצאים, בלי שאלות.',
                  },
                ].map((card, i) => {
                  const Icon = card.icon;
                  return (
                    <ScrollAnimate key={card.title} delay={i * 0.1}>
                      <div className="group h-full rounded-2xl border border-border/60 bg-card/60 p-6 transition-all duration-200 hover:border-primary/40 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5 active:scale-[0.98]">
                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-200">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold">{card.title}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {card.body}
                        </p>
                      </div>
                    </ScrollAnimate>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ─── Comparison Table ─── */}
          <section
            className="w-full py-20 md:py-28 bg-gradient-to-b from-background via-primary/[0.03] to-muted/20"
            aria-labelledby="bb-compare-heading"
          >
            <div className="container px-4 md:px-6">
              <ScrollAnimate className="text-center max-w-2xl mx-auto mb-12">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                  <BarChart3 className="h-4 w-4" aria-hidden="true" />
                  השוואה
                </span>
                <h2
                  id="bb-compare-heading"
                  className="text-3xl font-bold tracking-tighter sm:text-4xl text-balance mb-4"
                >
                  מה ₪490 לחודש קונה לך?
                </h2>
                <p className="text-muted-foreground">
                  מזכירה חלקית: ₪7,800. Meta AI: חינם, לא מכיר את העסק שלך.
                  הסוכן: ₪490 + גב אנושי.
                </p>
              </ScrollAnimate>

              {/* Scene illustration — secretary vs. agent, slides in from the side */}
              <SlideIn from="left" reduced={reduced} className="mx-auto max-w-3xl mb-10">
                <ParallaxIllustration
                  src="/images/business-brain-compare.jpg"
                  reduced={reduced}
                  className="h-52 md:h-72 rounded-2xl border border-border/40"
                />
              </SlideIn>

              <SlideIn from="right" reduced={reduced}>
                <div className="mx-auto max-w-3xl overflow-x-auto rounded-2xl border border-border/60">
                  <table className="w-full text-sm" role="table">
                    <caption className="sr-only">השוואת שירות מוח עסקי מול חלופות</caption>
                    <thead>
                      <tr className="border-b border-border/60 bg-muted/30">
                        <th scope="col" className="px-5 py-4 text-right font-semibold text-foreground">
                          תכונה
                        </th>
                        <th scope="col" className="px-5 py-4 text-center font-semibold text-muted-foreground">
                          מזכירה
                        </th>
                        <th scope="col" className="px-5 py-4 text-center font-semibold text-muted-foreground">
                          Meta AI
                        </th>
                        <th scope="col" className="px-5 py-4 text-center font-semibold text-primary">
                          מוח עסקי
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {COMPARISON_ROWS.map((row, i) => (
                        <tr
                          key={row.feature}
                          className={`border-b border-border/40 ${i % 2 === 0 ? 'bg-background' : 'bg-muted/10'}`}
                        >
                          <td className="px-5 py-3.5 font-medium text-foreground">
                            {row.feature}
                          </td>
                          {(['secretary', 'metaAi', 'bb'] as const).map((col) => {
                            const val = row[col];
                            return (
                              <td key={col} className={`px-5 py-3.5 text-center ${col === 'bb' ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                                {typeof val === 'boolean' ? (
                                  val ? (
                                    <CheckCircle2 className="mx-auto h-5 w-5 text-emerald-500" aria-label="כן" />
                                  ) : (
                                    <span className="text-muted-foreground/40 text-lg" aria-label="לא">—</span>
                                  )
                                ) : (
                                  val
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </SlideIn>

              {/* Count-up stats — cards enter from alternating sides */}
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: 'חיסכון לעומת מזכירה', value: 7800, prefix: '₪', suffix: '/חודש' },
                  { label: 'עלות הסוכן', value: 490, prefix: '₪', suffix: '/חודש' },
                  { label: 'חיסכון שנתי', value: 87720, prefix: '₪', suffix: '' },
                  { label: 'זמן תגובה', value: 4, prefix: '', suffix: ' שעות' },
                ].map((stat, i) => (
                  <SlideIn
                    key={stat.label}
                    from={i % 2 === 0 ? 'right' : 'left'}
                    reduced={reduced}
                    delay={i * 0.08}
                  >
                    <div className="rounded-2xl border border-border/60 bg-card/60 p-5 text-center">
                      <div className="text-3xl font-bold text-primary mb-1">
                        <CountUp
                          value={stat.value}
                          prefix={stat.prefix}
                          suffix={stat.suffix}
                          reduced={reduced}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </SlideIn>
                ))}
              </div>
            </div>
          </section>

          {/* ─── How It Works ─── */}
          <section
            className="w-full py-20 md:py-28 bg-gradient-to-b from-muted/20 via-background to-muted/10"
            aria-labelledby="bb-how-heading"
          >
            <div className="container px-4 md:px-6">
              <ScrollAnimate className="text-center max-w-2xl mx-auto mb-14">
                <h2
                  id="bb-how-heading"
                  className="text-3xl font-bold tracking-tighter sm:text-4xl text-balance mb-4"
                >
                  איך זה עובד
                </h2>
              </ScrollAnimate>

              {/* Wide journey illustration — the 4 stages as one visual story */}
              <ScrollAnimate className="mx-auto max-w-4xl mb-14">
                <ParallaxIllustration
                  src="/images/business-brain-how.jpg"
                  reduced={reduced}
                  className="h-48 md:h-72 rounded-2xl border border-border/40"
                />
              </ScrollAnimate>

              <div
                ref={howStepsRef}
                className="relative mx-auto max-w-2xl space-y-4"
              >
                {/* Progress track + fill line, aligned to the icon column (RTL: right side) */}
                <div
                  className="absolute top-6 bottom-14 end-[21px] w-0.5 bg-border/40"
                  aria-hidden="true"
                />
                <motion.div
                  className="absolute top-6 bottom-14 end-[21px] w-0.5 origin-top bg-gradient-to-b from-primary to-amber-500"
                  style={{ scaleY: reduced ? 1 : howProgress }}
                  aria-hidden="true"
                />
                {[
                  {
                    step: '01',
                    icon: Phone,
                    title: 'שיחת מיפוי',
                    desc: '30 דקות. מבינים מה אתה צריך, עם אילו מערכות אתה עובד, ומה מדד ההצלחה שיגרום לך לדעת שהשקעת את הכסף נכון.',
                  },
                  {
                    step: '02',
                    icon: Bot,
                    title: 'בנייה ואפיון — שבועיים',
                    desc: 'הסוכן מוגדר לפי העסק שלך: שמות, לידים, סגנון הכתיבה שלך. לא תבנית גנרית.',
                  },
                  {
                    step: '03',
                    icon: MessageCircle,
                    title: 'העסק שלך מנוהל מהוואטסאפ',
                    desc: 'מהרגע שהסוכן באוויר — דוחות, תזכורות, שאלות. אתה מנהל מהטלפון. אני ברקע לכל מה שדורש שיקול דעת.',
                  },
                  {
                    step: '04',
                    icon: TrendingUp,
                    title: 'מדידה אחרי 90 יום',
                    desc: 'נשב יחד: האם עמדנו במדד שהגדרנו בתחילה? אם כן — ממשיכים ומשדרגים. אם לא — יוצאים, פשוט וברוח טובה.',
                  },
                ].map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <SlideIn key={step.step} from="left" reduced={reduced} delay={i * 0.12}>
                      <div className="flex items-start gap-5 group">
                        <div className="relative z-10 shrink-0">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-background text-primary shadow-sm group-hover:bg-primary/10 transition-colors duration-200">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </div>
                        </div>
                        <div className="pb-8">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono text-muted-foreground">{step.step}</span>
                            <h3 className="font-semibold">{step.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    </SlideIn>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ─── Pricing ─── */}
          <section
            className="relative w-full py-20 md:py-28 bg-gradient-to-b from-muted/10 to-background overflow-hidden"
            id="pricing"
            aria-labelledby="bb-pricing-heading"
          >
            {/* Faint constellation backdrop — barely there, pure atmosphere */}
            <div className="absolute inset-0 opacity-[0.22] pointer-events-none" aria-hidden="true">
              <Image
                src="/images/business-brain-pricing-bg.jpg"
                alt=""
                fill
                className="object-cover object-center"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
            </div>

            <div className="container relative px-4 md:px-6">
              <ScrollAnimate className="text-center max-w-2xl mx-auto mb-12">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  תמחור שקוף
                </span>
                <h2
                  id="bb-pricing-heading"
                  className="text-3xl font-bold tracking-tighter sm:text-4xl text-balance mb-4"
                >
                  ללא הפתעות
                </h2>
                <p className="text-muted-foreground">
                  תשלום חד-פעמי להקמה + מנוי חודשי. לא נעלם.
                </p>
              </ScrollAnimate>

              <div className="mx-auto max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {PRICING_TIERS.map((tier, i) => (
                  <motion.div
                    key={tier.name}
                    initial={reduced ? false : { opacity: 0, y: 36, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.55, delay: i * 0.14, ease: 'easeOut' }}
                  >
                    <div
                      className={`h-full rounded-2xl border p-6 transition-all duration-200 ${
                        tier.highlighted
                          ? 'border-primary/50 bg-primary/5 shadow-lg shadow-primary/10'
                          : 'border-border/60 bg-card/60'
                      }`}
                    >
                      {tier.highlighted && (
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 border border-primary/30 px-2.5 py-1 text-xs font-medium text-primary mb-4">
                          <Sparkles className="h-3 w-3" aria-hidden="true" />
                          הכי פופולרי
                        </div>
                      )}
                      <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
                      <div className="mb-1">
                        <span className="text-sm text-muted-foreground">הקמה: </span>
                        <span className="text-lg font-bold">₪{tier.setup.toLocaleString('he-IL')}</span>
                      </div>
                      <div className="mb-5">
                        <span className="text-3xl font-bold">₪{tier.monthly}</span>
                        <span className="text-muted-foreground">/חודש</span>
                      </div>
                      <ul className="space-y-2.5 mb-6" role="list">
                        {tier.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-sm">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" aria-hidden="true" />
                            <span className="text-muted-foreground">{f}</span>
                          </li>
                        ))}
                      </ul>
                      <a
                        href={WA_DEEP_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all duration-150 hover:shadow-md active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                          tier.highlighted
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20'
                            : 'border border-border/80 bg-transparent hover:bg-card/80'
                        }`}
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                        לקבוע שיחת היכרות
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Founder banner */}
              <FounderBanner reduced={reduced} onCheckout={() => setCheckoutOpen(true)} />
            </div>
          </section>

          {/* ─── Hero image 2 (network) ─── */}
          <section className="w-full py-0 overflow-hidden" aria-hidden="true">
            <motion.div
              initial={reduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <ParallaxIllustration
                src="/images/business-brain-network.jpg"
                reduced={reduced}
                className="h-64 md:h-80"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
            </motion.div>
          </section>

          {/* ─── Privacy & guarantees ─── */}
          <section
            className="w-full py-20 md:py-28 bg-gradient-to-b from-background via-primary/[0.02] to-background"
            aria-labelledby="bb-trust-heading"
          >
            <div className="container px-4 md:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-5xl mx-auto mb-12">
                {/* Shield illustration — slides in as the trust scene opens */}
                <SlideIn from="right" reduced={reduced}>
                  <ParallaxIllustration
                    src="/images/business-brain-trust.jpg"
                    reduced={reduced}
                    className="h-56 md:h-72 rounded-2xl border border-border/40"
                  />
                </SlideIn>

                <SlideIn from="left" reduced={reduced} delay={0.1}>
                  <h2
                    id="bb-trust-heading"
                    className="text-3xl font-bold tracking-tighter sm:text-4xl text-balance mb-4"
                  >
                    אמינות ופרטיות — לא עניין של רגש
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    המידע של העסק שלך נשאר אצלך. הכל כתוב, חתום, וברור — לפני שמתחילים.
                  </p>
                </SlideIn>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {[
                  {
                    icon: Shield,
                    title: 'תיקון 13 — הסכם עיבוד נתונים',
                    desc: 'לפי הדרישה החוקית, כל לקוח חותם על הסכם עיבוד נתונים. המידע שלך לא יוצא לשום מקום.',
                  },
                  {
                    icon: CheckCircle2,
                    title: 'SLA ברור',
                    desc: 'שעות זמינות, זמן תגובה מקסימלי — הכל כתוב לפני שמתחילים. לא ניחושים.',
                  },
                  {
                    icon: ArrowLeft,
                    title: 'יוצאים כשרוצים',
                    desc: '30 יום הודעה מראש, ולא יותר. אין נעילה ואין התחייבות ארוכה. אם לא עובד — יוצאים.',
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <ScrollAnimate key={item.title} delay={i * 0.1}>
                      <div className="text-center p-6">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </ScrollAnimate>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ─── FAQ Chat ─── */}
          <BusinessBrainChatFAQ />

          {/* ─── Final CTA ─── */}
          <section
            className="w-full py-20 md:py-28 bg-gradient-to-b from-background to-muted/20"
            aria-labelledby="bb-cta-heading"
          >
            <div className="container px-4 md:px-6">
              <ScrollAnimate className="text-center max-w-2xl mx-auto">
                <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/5 p-10 md:p-14">
                  {/* Glow */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-48 w-72 rounded-full bg-primary/15 blur-3xl" aria-hidden="true" />

                  <div className="relative">
                    <Image
                      src="/images/business-brain-value.jpg"
                      alt=""
                      aria-hidden="true"
                      width={80}
                      height={45}
                      className="mx-auto mb-6 rounded-xl opacity-80"
                    />

                    <h2
                      id="bb-cta-heading"
                      className="text-3xl font-bold tracking-tighter sm:text-4xl text-balance mb-4"
                    >
                      שלושה מקומות. לא יותר.
                    </h2>
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                      כל שריון מגיע עם מחיר מייסד — חיסכון של ₪1,740 בשנה
                      הראשונה. כשהמקומות מתמלאים, המחיר חוזר לרגיל.
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center">
                      <button
                        type="button"
                        onClick={() => setCheckoutOpen(true)}
                        className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-8 py-4 text-sm font-semibold text-gray-900 shadow-lg shadow-amber-500/25 transition-all duration-150 hover:bg-amber-400 hover:shadow-amber-500/40 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        <Sparkles className="h-4 w-4" aria-hidden="true" />
                        שריין מקום מייסד — ₪500 מקדמה
                      </button>

                      <a
                        href={WA_DEEP_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-medium transition-all duration-150 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                        רוצה לדבר קודם
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollAnimate>
            </div>
          </section>

        </main>
      </div>
    </>
  );
}
