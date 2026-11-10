// Single place for the facts the Business Brain page states about availability
// and where its calls to action lead. Edit here, not in the page copy.

export const WA_NUMBER = '972525427474';

/**
 * Short intake questionnaire (about 5 minutes; its last question collects the
 * preferred time for a call). Leave empty until the questionnaire is live:
 * while empty, the primary call to action opens WhatsApp instead.
 */
export const QUESTIONNAIRE_URL = '';

/** Founder pricing: seats offered and seats already taken (deposit paid 23.7.2026). */
export const FOUNDER_SEATS_TOTAL = 3;
export const FOUNDER_SEATS_TAKEN = 1;
export const FOUNDER_SEATS_LEFT = FOUNDER_SEATS_TOTAL - FOUNDER_SEATS_TAKEN;

export const FOUNDER_SEATS_TEXT = `נשארו ${FOUNDER_SEATS_LEFT} מקומות מתוך ${FOUNDER_SEATS_TOTAL}`;

export const WA_START_LINK =
  `https://wa.me/${WA_NUMBER}?text=` +
  encodeURIComponent('היי אלעד, אני רוצה להתחיל עם המוח העסקי');

export const HAS_QUESTIONNAIRE = QUESTIONNAIRE_URL.length > 0;
export const START_HREF = HAS_QUESTIONNAIRE ? QUESTIONNAIRE_URL : WA_START_LINK;
export const START_LABEL = HAS_QUESTIONNAIRE
  ? 'מתחילים בשאלון קצר (5 דקות)'
  : 'מתחילים בשיחה בוואטסאפ';
