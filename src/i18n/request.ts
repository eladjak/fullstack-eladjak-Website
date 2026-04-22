import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';
import heMessages from '../../messages/he.json';
import enMessages from '../../messages/en.json';

const messages = {
  he: heMessages,
  en: enMessages,
} as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: messages[locale],
    timeZone: 'Asia/Jerusalem',
    now: new Date(),
  };
});
