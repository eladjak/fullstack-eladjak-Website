'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { type Locale, defaultLocale, messages, getDirection } from '@/i18n';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  direction: 'rtl' | 'ltr';
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: defaultLocale,
  setLocale: () => {},
  direction: 'rtl',
});

export function useLocale() {
  return useContext(LocaleContext);
}

const STORAGE_KEY = 'portfolio-locale';

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored && (stored === 'he' || stored === 'en')) {
      setLocaleState(stored);
    }
    setMounted(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);
    const dir = getDirection(newLocale);
    document.documentElement.lang = newLocale;
    document.documentElement.dir = dir;
  }, []);

  // Apply direction on mount and locale change
  useEffect(() => {
    if (mounted) {
      const dir = getDirection(locale);
      document.documentElement.lang = locale;
      document.documentElement.dir = dir;
    }
  }, [locale, mounted]);

  const direction = getDirection(locale);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, direction }}>
      <NextIntlClientProvider
        locale={locale}
        messages={messages[locale]}
        timeZone="Asia/Jerusalem"
        now={new Date()}
        onError={(error) => {
          if (error.code === 'ENVIRONMENT_FALLBACK') return;
          console.error(error);
        }}
      >
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}
