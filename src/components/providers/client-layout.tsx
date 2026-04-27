'use client';

import { type ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import { LocaleProvider } from '@/components/providers/locale-provider';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import { PageTransition } from '@/components/ui/page-transition';
import { SpotlightCursor } from '@/components/ui/spotlight';
import { WhatsAppFAB } from '@/components/ui/whatsapp-fab';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

interface ClientLayoutProps {
  children: ReactNode;
}

/**
 * Client-side layout wrapper that provides:
 * - Locale (i18n) context
 * - Theme switching
 * - Auth context
 * - Navigation + Footer
 * - Page transitions between routes
 */
export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <LocaleProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* Skip to content link - WCAG 2.4.1 / IS 5568 */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:start-2 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg focus:outline-none"
          >
            דלג לתוכן הראשי
          </a>
          <Navigation />
          <div className="pt-16" id="main-content" tabIndex={-1}>
            <PageTransition>
              {children}
            </PageTransition>
          </div>
          <Footer />
          <WhatsAppFAB />
          <ScrollToTop />
          <SpotlightCursor />
          <Toaster />
          <Analytics />
          <SpeedInsights />
      </ThemeProvider>
    </LocaleProvider>
  );
}
