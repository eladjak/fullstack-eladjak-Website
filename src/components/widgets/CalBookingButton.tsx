'use client';

import { Calendar } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const WHATSAPP_FALLBACK =
  'https://wa.me/972525427474?text=' +
  encodeURIComponent(
    'היי אלעד, אשמח לקבוע שיחת ייעוץ של 30 דקות.'
  );

interface Props {
  /** Optional Cal.com link, e.g. "eladjak/30min". When omitted, falls back to WhatsApp. */
  calLink?: string;
  className?: string;
  label?: string;
}

/**
 * "Book a 30-minute free call" CTA.
 *
 * If `calLink` is provided we open Cal.com in a new tab (no SDK install required).
 * Otherwise we open a prefilled WhatsApp message — that's the safe default
 * because we don't yet know whether Elad has a Cal.com account configured.
 */
export function CalBookingButton({
  calLink,
  className,
  label = '📅 לקבוע שיחה — 30 דקות חינם',
}: Props) {
  const prefersReducedMotion = useReducedMotion();
  const href = calLink ? `https://cal.com/${calLink}` : WHATSAPP_FALLBACK;
  const ariaLabel = calLink
    ? 'קביעת שיחת ייעוץ של 30 דקות בקאל.קום'
    : 'קביעת שיחת ייעוץ של 30 דקות בוואטסאפ';

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={
        className ??
        'inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
      }
      whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
    >
      <Calendar className="h-5 w-5" aria-hidden="true" />
      <span>{label}</span>
    </motion.a>
  );
}

export default CalBookingButton;
