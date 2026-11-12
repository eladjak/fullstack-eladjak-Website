/**
 * The exact consent wording shown next to the newsletter checkbox.
 *
 * Israeli Communications Law, section 30A, requires explicit prior consent
 * before sending advertising email. We keep the text in ONE place so the
 * server stores, with every contact, the very words the visitor agreed to.
 * Changing the text? Bump CONSENT_VERSION, so old records stay traceable.
 */
export const CONSENT_VERSION = "he-2026-11-12";

export const CONSENT_TEXT =
  "אני מאשר/ת לקבל מאלעד יעקובוביץ' עדכונים במייל, שעשויים לכלול דבר פרסומת, בערך פעם בחודש. אפשר להסיר את ההרשמה בכל רגע.";

export const SIGNUP_SITE = "fullstack-eladjak.co.il";
