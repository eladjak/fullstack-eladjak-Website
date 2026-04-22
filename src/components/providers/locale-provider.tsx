'use client';

import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { type Locale, defaultLocale, messages, getDirection } from '@/i18n';
import { getLocaleFromPath, toggleLocaleInPath, hasEnglishRoute, stripLocalePrefix } from '@/lib/locale-path';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  direction: 'rtl' | 'ltr';
  canSwitchToEnglish: boolean;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: defaultLocale,
  setLocale: () => {},
  direction: 'rtl',
  canSwitchToEnglish: false,
});

export function useLocale() {
  return useContext(LocaleContext);
}

const STORAGE_KEY = 'portfolio-locale';

export function LocaleProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const pathLocale = pathname ? getLocaleFromPath(pathname) : null;
  const strippedPath = pathname ? stripLocalePrefix(pathname) : '/';
  const canSwitchToEnglish = hasEnglishRoute(strippedPath);

  const [storageLocale, setStorageLocale] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored === 'he' || stored === 'en') {
      setStorageLocale(stored);
    }
    setMounted(true);
  }, []);

  const locale: Locale = pathLocale ?? storageLocale;

  const setLocale = useCallback(
    (newLocale: Locale) => {
      setStorageLocale(newLocale);
      try {
        localStorage.setItem(STORAGE_KEY, newLocale);
      } catch {
        // localStorage unavailable (SSR, private mode) — path still drives locale
      }

      if (pathname) {
        const target = toggleLocaleInPath(pathname, newLocale);
        if (target !== pathname) {
          router.push(target);
        }
      }
    },
    [pathname, router]
  );

  useEffect(() => {
    if (!mounted) return;
    const dir = getDirection(locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, mounted]);

  const direction = getDirection(locale);

  const contextValue = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, direction, canSwitchToEnglish }),
    [locale, setLocale, direction, canSwitchToEnglish]
  );

  return (
    <LocaleContext.Provider value={contextValue}>
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
