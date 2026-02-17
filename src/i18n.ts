import heMessages from '../messages/he.json';
import enMessages from '../messages/en.json';

export type Locale = 'he' | 'en';

export const locales: Locale[] = ['he', 'en'];
export const defaultLocale: Locale = 'he';

export const messages: Record<Locale, typeof heMessages> = {
  he: heMessages,
  en: enMessages,
};

export function getDirection(locale: Locale): 'rtl' | 'ltr' {
  return locale === 'he' ? 'rtl' : 'ltr';
}
