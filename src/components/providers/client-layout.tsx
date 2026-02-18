'use client';

import { type ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import { LocaleProvider } from '@/components/providers/locale-provider';
import { AuthProvider } from '@/lib/auth';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import { PageTransition } from '@/components/ui/page-transition';
import { SpotlightCursor } from '@/components/ui/spotlight';

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
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          <Navigation />
          <div className="pt-16">
            <PageTransition>
              {children}
            </PageTransition>
          </div>
          <Footer />
          <SpotlightCursor />
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </LocaleProvider>
  );
}
