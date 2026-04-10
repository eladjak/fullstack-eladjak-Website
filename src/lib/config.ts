/**
 * Site-wide configuration constants
 * Update NEXT_PUBLIC_BOOKING_URL in .env.local to activate YouCanBookMe scheduling.
 * Example: NEXT_PUBLIC_BOOKING_URL=https://youcanbook.me/eladjak
 */

/** YouCanBookMe scheduling URL. Falls back to /contact if not set. */
export const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL ?? '/contact';

/** Whether the booking URL is an external link (i.e. not a local route). */
export const IS_EXTERNAL_BOOKING_URL =
  BOOKING_URL.startsWith('http://') || BOOKING_URL.startsWith('https://');
