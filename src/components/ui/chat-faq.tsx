'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Bot, User } from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────────────

type QuestionKey =
  | 'services'
  | 'pricing'
  | 'technologies'
  | 'availability'
  | 'process'
  | 'aiExpertise'
  | 'hebrew'
  | 'contact'
  | 'timeline'
  | 'support';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  questionKey?: QuestionKey;
  text: string;
}

// Follow-up map: which questions to suggest after each answer
const FOLLOW_UPS: Record<QuestionKey, QuestionKey[]> = {
  services: ['pricing', 'technologies', 'availability'],
  pricing: ['services', 'timeline', 'contact'],
  technologies: ['aiExpertise', 'hebrew', 'services'],
  availability: ['contact', 'process', 'timeline'],
  process: ['timeline', 'support', 'contact'],
  aiExpertise: ['technologies', 'services', 'contact'],
  hebrew: ['technologies', 'services', 'contact'],
  contact: ['availability', 'pricing', 'process'],
  timeline: ['process', 'pricing', 'contact'],
  support: ['pricing', 'contact', 'process'],
};

const INITIAL_QUESTIONS: QuestionKey[] = [
  'services',
  'aiExpertise',
  'availability',
  'hebrew',
];

// ─── Typing Indicator ────────────────────────────────────────────────────────

function TypingDots() {
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

// ─── Suggested Question Chip ─────────────────────────────────────────────────

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
        'hover:border-primary/60 hover:bg-primary/20 hover:shadow-md hover:shadow-primary/10',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:pointer-events-none disabled:opacity-40',
      ].join(' ')}
      aria-label={label}
    >
      {label}
    </motion.button>
  );
}

// ─── ChatFAQ ─────────────────────────────────────────────────────────────────

export function ChatFAQ() {
  const t = useTranslations('faq');
  const prefersReducedMotion = useReducedMotion();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [suggested, setSuggested] = useState<QuestionKey[]>(INITIAL_QUESTIONS);
  const [isTyping, setIsTyping] = useState(false);
  const [answeredKeys, setAnsweredKeys] = useState<Set<QuestionKey>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleQuestionClick = (key: QuestionKey) => {
    if (isTyping) return;

    const questionText = t(`questions.${key}`);
    const answerText = t(`answers.${key}`);

    // Add user bubble
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      questionKey: key,
      text: questionText,
    };
    setMessages((prev) => [...prev, userMsg]);
    setSuggested([]);
    setIsTyping(true);

    // Track answered question — capture the updated set for follow-up filtering
    const newAnsweredKeys = new Set(answeredKeys).add(key);
    setAnsweredKeys(newAnsweredKeys);

    // Simulate typing delay
    const delay = prefersReducedMotion ? 100 : 900 + Math.random() * 400;

    setTimeout(() => {
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: answerText,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);

      // Suggest follow-ups, excluding already-answered ones
      const followUps = FOLLOW_UPS[key].filter(
        (k) => !newAnsweredKeys.has(k) && k !== key,
      );
      setSuggested(followUps.slice(0, 3));

      // Announce to screen readers
      if (liveRef.current) {
        liveRef.current.textContent = answerText;
      }
    }, delay);
  };

  const isEmpty = messages.length === 0;

  return (
    <section
      className="w-full py-16 md:py-24"
      aria-labelledby="chat-faq-heading"
    >
      <div className="container px-4 md:px-6">
        {/* Section heading */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h2
            id="chat-faq-heading"
            className="text-3xl font-bold tracking-tighter sm:text-4xl mb-3"
          >
            {t('title')}
          </h2>
          <p className="text-muted-foreground md:text-lg">{t('subtitle')}</p>
        </div>

        {/* Chat window */}
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/20 overflow-hidden">
            {/* Chat header */}
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4 bg-white/5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 shadow-md shadow-violet-500/20">
                <Bot className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight">
                  {t('chatHeader')}
                </p>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span
                    className="inline-block h-2 w-2 rounded-full bg-emerald-500"
                    aria-hidden="true"
                  />
                  Online
                </span>
              </div>
              {/* Window chrome dots */}
              <div
                className="ms-auto flex items-center gap-1.5"
                aria-hidden="true"
              >
                <span className="h-3 w-3 rounded-full bg-white/15" />
                <span className="h-3 w-3 rounded-full bg-white/15" />
                <span className="h-3 w-3 rounded-full bg-white/15" />
              </div>
            </div>

            {/* Messages area */}
            <div
              ref={scrollRef}
              className="flex flex-col gap-4 overflow-y-auto p-5 scroll-smooth"
              style={{ maxHeight: '420px', minHeight: '220px' }}
              role="log"
              aria-live="off"
              aria-label="Chat conversation"
            >
              {/* Empty state */}
              {isEmpty && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center gap-2 py-8 text-center"
                  aria-hidden="true"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-primary/20">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground max-w-[240px]">
                    {t('suggestedLabel')}
                  </p>
                </motion.div>
              )}

              {/* Message bubbles */}
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
                      {/* Avatar */}
                      <div
                        className={`flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full ${
                          isUser
                            ? 'bg-gradient-to-br from-violet-500 to-purple-600'
                            : 'bg-gradient-to-br from-cyan-500 to-teal-600'
                        }`}
                        aria-hidden="true"
                      >
                        {isUser ? (
                          <User className="h-3.5 w-3.5 text-white" />
                        ) : (
                          <Bot className="h-3.5 w-3.5 text-white" />
                        )}
                      </div>

                      {/* Bubble */}
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

              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-end gap-2 flex-row rtl:flex-row-reverse"
                    aria-label={t('typingLabel')}
                    role="status"
                  >
                    <div
                      className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-teal-600"
                      aria-hidden="true"
                    >
                      <Bot className="h-3.5 w-3.5 text-white" />
                    </div>
                    <div className="rounded-2xl rounded-ss-sm rtl:rounded-ss-2xl rtl:rounded-se-sm bg-white/10 border border-white/10 px-4 py-3">
                      <TypingDots />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Suggested questions */}
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
                    aria-label={t('suggestedLabel')}
                  >
                    {suggested.map((key) => (
                      <QuestionChip
                        key={key}
                        label={t(`questions.${key}`)}
                        onClick={() => handleQuestionClick(key)}
                        disabled={isTyping}
                      />
                    ))}
                  </motion.div>
                )}
                {suggested.length === 0 && !isTyping && messages.length > 0 && (
                  <motion.p
                    key="all-done"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs text-muted-foreground"
                  >
                    {t('suggestedLabel')}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Visually-hidden live region for screen readers */}
      <div
        ref={liveRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
    </section>
  );
}
