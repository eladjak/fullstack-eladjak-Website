'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Bot,
  CalendarDays,
  HandHeart,
  Info,
  MessageCircle,
  Receipt,
  RotateCcw,
  Sparkles,
  Users,
} from 'lucide-react';
import { ScrollAnimate } from '@/components/ui/scroll-animate';

// ─── Types ────────────────────────────────────────────────────────────────────

interface DemoMessage {
  sender: 'user' | 'bot';
  text: string;
}

interface Scenario {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  intro: string;
  messages: DemoMessage[];
}

// ─── Scripted scenarios (נתונים לדוגמה בלבד) ─────────────────────────────────

const SCENARIOS: Scenario[] = [
  {
    id: 'donors',
    label: 'מעקב תורמים',
    icon: HandHeart,
    intro: 'רכזת גיוס המשאבים שואלת על תורם שלא השלים תרומה',
    messages: [
      { sender: 'user', text: 'בוקר טוב. מה קורה עם התורמים מהקמפיין של החודש?' },
      {
        sender: 'bot',
        text: 'בוקר טוב! מצב הקמפיין (נתוני דוגמה): 214 תורמים פעילים, ₪38,400 נאספו מתוך יעד של ₪50,000. שלושה דברים שדורשים תשומת לב: 1) ר. לוי התחיל תרומה של ₪1,800 באתר ולא השלים, זה קרה לפני יומיים. 2) הוראת הקבע של מ. אברהמי נדחתה החודש (כרטיס שפג). 3) 12 תורמים חדשים מהכנס עדיין לא קיבלו מכתב תודה.',
      },
      { sender: 'user', text: 'תכין לי טיוטה חמה לר. לוי, בלי לחץ' },
      {
        sender: 'bot',
        text: 'הנה טיוטה: "שלום ר., ראינו שהתחלת תרומה לקמפיין ורצינו רק לוודא שהכל עבד תקין מבחינה טכנית. אם משהו נתקע, אנחנו כאן לעזור. תודה על השותפות בדרך.", לשלוח ממספר התנועה, או שתעדיפי לערוך קודם?',
      },
      { sender: 'user', text: 'מצוין, שלחי. ומה עם מכתבי התודה?' },
      {
        sender: 'bot',
        text: 'נשלח ✓. לגבי מכתבי התודה, הכנתי 12 מכתבים מותאמים אישית לפי גובה התרומה וערוץ ההגעה. הם מחכים לאישור שלך בתיקיית הטיוטות. אחרי אישור, כולם יוצאים בלחיצה אחת ואני מסמן את התורמים כ"טופל" במעקב.',
      },
    ],
  },
  {
    id: 'conference',
    label: 'לוגיסטיקת כנס',
    icon: CalendarDays,
    intro: 'שבועיים לפני כנס ארצי, בדיקת מוכנות מלאה',
    messages: [
      { sender: 'user', text: 'איפה אנחנו עומדים עם הכנס בבנייני האומה?' },
      {
        sender: 'bot',
        text: 'תמונת מצב לכנס (נתוני דוגמה, 14 יום לאירוע): נרשמו 342 מתוך יעד 400 · אולם, חוזה חתום ✓ · הגברה, הצעת מחיר התקבלה, מחכה לאישור תקציב ✓ · קייטרינג, טרם נסגר ⚠️ · הסעות מהצפון, 2 אוטובוסים מלאים, שלישי ב-60% · דוברים, 5 מתוך 6 אישרו. החוליה החלשה כרגע: קייטרינג.',
      },
      { sender: 'user', text: 'מה הבעיה עם הקייטרינג?' },
      {
        sender: 'bot',
        text: 'שלחנו בקשה לשלושה ספקים לפני 9 ימים. אחד ענה (₪68 למנה, מעל התקציב של ₪55), שניים לא חזרו אלינו למרות תזכורת. המלצה: לחזור לספק מהכנס הקודם, עמד בתקציב וקיבל משוב טוב מהמשתתפים. להכין פנייה אליו?',
      },
      { sender: 'user', text: 'כן, ותעדכן את צוות הלוגיסטיקה' },
      {
        sender: 'bot',
        text: 'בוצע: 1) פנייה לספק יצאה עם פירוט הכמויות והתאריך. 2) עדכון נשלח לקבוצת הלוגיסטיקה כולל טבלת סטטוס מעודכנת. 3) קבעתי תזכורת, אם אין תשובה מהספק עד מחר ב-12:00, אני מעלה את זה שוב. אעדכן אותך ברגע שתהיה תזוזה.',
      },
    ],
  },
  {
    id: 'volunteers',
    label: 'תיאום מתנדבים',
    icon: Users,
    intro: 'שיבוץ מתנדבים לפעילות סוף השבוע, מי זמין, מי נשחק',
    messages: [
      { sender: 'user', text: 'צריך 20 מתנדבים לדוכנים ביום שישי. איפה אנחנו?' },
      {
        sender: 'bot',
        text: 'סטטוס שיבוץ (נתוני דוגמה): 14 אישרו הגעה, 4 טרם ענו, 2 ביטלו. פירוט לפי עמדות: דוכן מרכזי 6/6 ✓ · צומת הכניסה 4/6 ⚠️ · חלוקת עלונים 4/8 ⚠️. שווה לדעת: י. ברק התנדב 4 סופי שבוע ברצף, כדאי לתת לו לנוח לפני שהוא נשחק. יש 7 מתנדבים רדומים שלא שובצו חודשיים ויכולים להשלים את החסר.',
      },
      { sender: 'user', text: 'תפני לרדומים, ותשחררי את ברק בעדינות' },
      {
        sender: 'bot',
        text: 'יוצא לדרך: 1) הודעה אישית לכל אחד מה-7 (מנוסחת לפי ההיסטוריה שלו, מי אוהב דוכנים, מי מעדיף חלוקה). 2) לברק: "י., עשית ארבעה סופי שבוע ברצף ואנחנו רואים את זה. השבת נוח, הכיסוי עלינו. מחכים לך רענן בשבוע הבא." 3) אני עוקב אחרי התשובות ומעדכן את טבלת השיבוץ אוטומטית. עדכון הערב.',
      },
      { sender: 'user', text: 'מעולה. תזכיר לי מחר בבוקר איפה זה עומד' },
      {
        sender: 'bot',
        text: 'נקבע ✓. מחר ב-08:30 תקבל סיכום: מי אישר, אילו עמדות עדיין חסרות, והצעה לשיבוץ סופי. אם עד אז נסגור את כל 20 המקומות, אשלח רק אישור קצר שהכל מכוסה.',
      },
    ],
  },
  {
    id: 'receipts',
    label: 'קבלות ספקים',
    icon: Receipt,
    intro: 'סוף חודש, סדר בקבלות לקראת הדוח הכספי',
    messages: [
      { sender: 'user', text: 'הגזברית מבקשת את כל הקבלות של החודש עד יום חמישי' },
      {
        sender: 'bot',
        text: 'מצב הקבלות לחודש (נתוני דוגמה): נקלטו 23 קבלות בסך ₪17,850. חסרות 4: דפוס (₪2,300, שולם ב-12 לחודש) · הגברה מהאירוע בחיפה (₪1,500) · ציוד למטה (₪640) · החזר נסיעות לרכזים (₪380, יש אישורים חלקיים). לשלושה מהספקים יש פרטי קשר במערכת, אפשר לבקש העתקים אוטומטית.',
      },
      { sender: 'user', text: 'תבקש מכולם, ותסמן לי מה קשור לסעיף הכנסים בתקציב' },
      {
        sender: 'bot',
        text: 'נשלחו 3 בקשות להעתקי קבלות ✓ (לגבי החזר הנסיעות, צריך אישור שלך על הטופס לפני שאני שולח לרכזים). סיווג לפי סעיפי תקציב: כנסים ואירועים ₪9,200 (52%) · שוטף ומטה ₪5,400 · הסברה ודפוס ₪3,250. סעיף הכנסים מנצל 78% מהמסגרת החודשית, עוד בגדר התקציב.',
      },
      { sender: 'user', text: 'אשר את טופס הנסיעות ותכין חבילה מסודרת לגזברית' },
      {
        sender: 'bot',
        text: 'מאושר ✓. אני מרכיב חבילה: כל הקבלות ממוינות לפי סעיף + טבלת סיכום + רשימת "בהמתנה" עם תאריך צפוי לכל קבלה חסרה. ברגע שהעתק חדש נכנס, החבילה מתעדכנת. תזכורת אחרונה לספקים שלא יענו, מחרתיים בבוקר, יומיים לפני הדדליין של הגזברית.',
      },
    ],
  },
  {
    id: 'weekly',
    label: 'סיכום שבועי להנהלה',
    icon: BarChart3,
    intro: 'יום ראשון בבוקר, דוח מרוכז לישיבת ההנהלה',
    messages: [
      { sender: 'user', text: 'ישיבת הנהלה בעוד שעה. מה הסיכום השבועי?' },
      {
        sender: 'bot',
        text: 'סיכום שבועי (נתוני דוגמה): 📈 גיוס, ₪12,300 השבוע (+18% מהשבוע שעבר), 31 תורמים חדשים. 👥 מתנדבים, 87 פעילים, 3 פעילויות שטח התקיימו, שיבוץ שישי נסגר במלואו. 📅 כנס, 342 נרשמים, קייטרינג נסגר אתמול ✓. ⚠️ דורש החלטת הנהלה: הצעת ההגברה חורגת ב-₪1,200 מהסעיף, צריך אישור חריגה או ספק חלופי.',
      },
      { sender: 'user', text: 'מה היית ממליץ על ההגברה?' },
      {
        sender: 'bot',
        text: 'לאשר את החריגה. שיקולים: הספק החלופי הזול יותר קיבל משוב שלילי באירוע של סניף ירושלים (תקלות שמע באמצע נאום מרכזי), וסעיף הכנסים כולו עדיין בתוך המסגרת השנתית. חריגה של ₪1,200 מול סיכון תקלה באירוע של 400 איש, נראית סבירה. אבל זו החלטה של ההנהלה, לכן שמתי אותה על השולחן עם כל הנתונים.',
      },
      { sender: 'user', text: 'תכין את זה כמצגת קצרה לישיבה' },
      {
        sender: 'bot',
        text: 'מוכן ✓, 5 שקפים: תמונת מצב · גיוס משאבים · שטח ומתנדבים · הכנס הארצי · נקודה להחלטה (ההגברה, עם שתי האופציות והמלצה). נשלח אליך ולמזכ"ל. אחרי הישיבה, ספרו לי מה הוחלט ואני מעדכן את המשימות לכל הצוותים בהתאם.',
      },
    ],
  },
];

// ─── Small helpers ────────────────────────────────────────────────────────────

function CountUp({
  target,
  suffix = '',
  duration = 1.4,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString('he-IL')}
      {suffix}
    </span>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1" aria-label="הסוכן מקליד">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-muted-foreground/70"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </span>
  );
}

// ─── Playback state ───────────────────────────────────────────────────────────

interface PlayedMessage extends DemoMessage {
  id: string;
  /** For bot messages: how many characters are currently revealed. */
  shown: number;
  done: boolean;
}

export default function BusinessBrainDemoPage() {
  const reduced = useReducedMotion();
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [played, setPlayed] = useState<PlayedMessage[]>([]);
  const [botTyping, setBotTyping] = useState(false);
  const [playing, setPlaying] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const runIdRef = useRef(0);

  // Auto-scroll the chat container (not the page) as messages appear
  useEffect(() => {
    const el = chatRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [played, botTyping]);

  const playScenario = useCallback(
    (scenario: Scenario) => {
      const runId = ++runIdRef.current;
      const alive = () => runIdRef.current === runId;
      setActiveScenario(scenario);
      setPlayed([]);
      setBotTyping(false);
      setPlaying(true);

      const sleep = (ms: number) =>
        new Promise<void>((resolve) => setTimeout(resolve, reduced ? Math.min(ms, 120) : ms));

      (async () => {
        for (let i = 0; i < scenario.messages.length; i++) {
          if (!alive()) return;
          const msg = scenario.messages[i];
          const id = `${scenario.id}-${i}`;

          if (msg.sender === 'user') {
            await sleep(i === 0 ? 500 : 900);
            if (!alive()) return;
            setPlayed((prev) => [...prev, { ...msg, id, shown: msg.text.length, done: true }]);
          } else {
            await sleep(600);
            if (!alive()) return;
            setBotTyping(true);
            await sleep(reduced ? 100 : 1100);
            if (!alive()) return;
            setBotTyping(false);
            setPlayed((prev) => [...prev, { ...msg, id, shown: 0, done: false }]);
            if (reduced) {
              setPlayed((prev) =>
                prev.map((m) => (m.id === id ? { ...m, shown: msg.text.length, done: true } : m)),
              );
            } else {
              // Character-by-character typing effect, chunked for performance
              const chunk = 3;
              for (let c = chunk; c < msg.text.length + chunk; c += chunk) {
                await sleep(18);
                if (!alive()) return;
                const shown = Math.min(c, msg.text.length);
                setPlayed((prev) =>
                  prev.map((m) =>
                    m.id === id ? { ...m, shown, done: shown === msg.text.length } : m,
                  ),
                );
              }
            }
            await sleep(350);
          }
        }
        if (alive()) setPlaying(false);
      })();
    },
    [reduced],
  );

  const resetDemo = useCallback(() => {
    runIdRef.current++;
    setActiveScenario(null);
    setPlayed([]);
    setBotTyping(false);
    setPlaying(false);
  }, []);

  return (
    <main dir="rtl" className="w-full">
      {/* ─── Disclaimer banner ─── */}
      <div className="w-full bg-primary/10 border-b border-primary/20">
        <div className="container px-4 md:px-6 py-2.5 flex items-center justify-center gap-2 text-center">
          <Info className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-sm font-medium text-primary">
            הדגמה אינטראקטיבית, נתונים לדוגמה. שום דבר כאן לא מחובר למערכת אמיתית.
          </p>
        </div>
      </div>

      {/* ─── Hero ─── */}
      <section className="w-full pt-14 pb-10 md:pt-20 md:pb-14 bg-gradient-to-b from-primary/[0.04] to-background">
        <div className="container px-4 md:px-6">
          <ScrollAnimate className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm font-medium text-primary mb-5">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              המוח העסקי · גרסת ארגונים ותנועות
            </span>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-balance mb-4">
              ככה נראה בוקר של מנהל ארגון
              <span className="text-primary"> עם מוח אחד שרואה הכל</span>
            </h1>
            <p className="text-muted-foreground md:text-lg leading-relaxed">
              בחרו תרחיש אמיתי מחיי תנועה, תורמים, כנסים, מתנדבים, כספים, וצפו איך שיחה אחת בוואטסאפ סוגרת את מה שהיה לוקח בוקר שלם של טלפונים.
            </p>
          </ScrollAnimate>

          {/* Example-data stats */}
          <ScrollAnimate delay={0.15} className="mt-8">
            <div className="mx-auto grid max-w-2xl grid-cols-3 gap-3 text-center">
              {[
                { value: 214, suffix: '', label: 'תורמים במעקב (דוגמה)' },
                { value: 87, suffix: '', label: 'מתנדבים פעילים (דוגמה)' },
                { value: 9, suffix: '+', label: 'שעות תיאום שנחסכות בשבוע' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-border/60 bg-card/60 px-3 py-4"
                >
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    <CountUp target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* ─── The demo itself ─── */}
      <section className="w-full pb-16 md:pb-24" aria-labelledby="bb-demo-heading">
        <div className="container px-4 md:px-6">
          <h2 id="bb-demo-heading" className="sr-only">
            הדגמת שיחות עם המוח העסקי
          </h2>
          <div className="mx-auto max-w-3xl">
            {/* Scenario buttons */}
            <ScrollAnimate>
              <p className="text-center text-sm font-medium text-muted-foreground mb-4">
                בחרו תרחיש להפעלה:
              </p>
              <div className="flex flex-wrap justify-center gap-2.5 mb-8">
                {SCENARIOS.map((s) => {
                  const Icon = s.icon;
                  const active = activeScenario?.id === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => playScenario(s)}
                      aria-pressed={active}
                      className={`wow-press inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-[transform,background-color,color,opacity] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                        active
                          ? 'border-primary/50 bg-primary/15 text-primary shadow-sm'
                          : 'border-border/60 bg-card/60 text-foreground hover:bg-primary/5 hover:text-primary'
                      }`}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </ScrollAnimate>

            {/* Chat window */}
            <ScrollAnimate delay={0.1}>
              <div className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-xl shadow-primary/5">
                {/* Chat header */}
                <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-muted/40 px-4 py-3 md:px-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Bot className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">המוח הארגוני</div>
                      <div className="text-xs text-muted-foreground">
                        {botTyping ? 'מקליד…' : playing ? 'בשיחה' : 'זמין 24/7 · הדגמה'}
                      </div>
                    </div>
                  </div>
                  {activeScenario && (
                    <button
                      type="button"
                      onClick={resetDemo}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-[color] duration-150 hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                    >
                      <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                      איפוס
                    </button>
                  )}
                </div>

                {/* Messages */}
                <div
                  ref={chatRef}
                  className="h-[420px] md:h-[480px] overflow-y-auto px-4 py-5 md:px-6 space-y-4 bg-gradient-to-b from-background to-muted/20"
                  aria-live="polite"
                >
                  {!activeScenario && (
                    <div className="flex h-full flex-col items-center justify-center text-center gap-3 text-muted-foreground">
                      <MessageCircle className="h-10 w-10 text-primary/40" aria-hidden="true" />
                      <p className="text-sm max-w-xs leading-relaxed">
                        עוד לא בחרתם תרחיש. לחצו על אחד הכפתורים למעלה, והשיחה
                        תתנגן כאן, בדיוק כמו בוואטסאפ.
                      </p>
                    </div>
                  )}

                  {activeScenario && (
                    <p className="text-center text-xs text-muted-foreground/80 pb-1">
                      {activeScenario.intro} · נתונים לדוגמה
                    </p>
                  )}

                  <AnimatePresence initial={false}>
                    {played.map((m) => (
                      <motion.div
                        key={m.id}
                        initial={reduced ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                            m.sender === 'user'
                              ? 'bg-primary text-primary-foreground rounded-tl-sm'
                              : 'bg-card border border-border/60 rounded-tr-sm'
                          }`}
                        >
                          {m.sender === 'bot' ? m.text.slice(0, m.shown) : m.text}
                          {m.sender === 'bot' && !m.done && (
                            <span className="inline-block w-1 animate-pulse">▍</span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {botTyping && (
                    <div className="flex justify-start">
                      <div className="rounded-2xl rounded-tr-sm border border-border/60 bg-card px-4 py-2 shadow-sm">
                        <TypingDots />
                      </div>
                    </div>
                  )}
                </div>

                {/* Fake input bar */}
                <div className="border-t border-border/60 bg-muted/30 px-4 py-3 md:px-5">
                  <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-background px-4 py-2.5 text-sm text-muted-foreground/70 select-none">
                    <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    בגרסה האמיתית, פשוט כותבים כאן, בוואטסאפ של הארגון
                  </div>
                </div>
              </div>
            </ScrollAnimate>

            {/* CTA */}
            <ScrollAnimate delay={0.15} className="mt-10 text-center">
              <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                זה מרגיש מתאים לארגון שלכם? ההקמה נבנית סביב המבנה שלכם, צוותים, סניפים ומערכות קיימות.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href={
                    'https://wa.me/972525427474?text=' +
                    encodeURIComponent(
                      'היי אלעד, ראינו את ההדגמה של המוח העסקי לארגונים ורוצים לשמוע עוד',
                    )
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wow-press inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-[transform,background-color,color,opacity] duration-150 hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  לדבר על הארגון שלכם
                </a>
                <Link
                  href="/products/business-brain"
                  className="wow-press inline-flex items-center gap-2 rounded-xl border border-border/70 bg-card/60 px-7 py-3.5 text-sm font-semibold transition-[transform,background-color,color,opacity] duration-150 hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  חזרה לעמוד המוצר
                </Link>
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </section>
    </main>
  );
}
