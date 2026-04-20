'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './theme-toggle';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/components/providers/locale-provider';
import dynamic from 'next/dynamic';
import type { Locale } from '@/i18n';

const CommandPalette = dynamic(
  () => import('@/components/ui/command-palette').then((m) => m.CommandPalette),
  { ssr: false }
);

/** Inline Israel flag SVG (for Hebrew) */
function FlagIL({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="640" height="480" fill="#fff" />
      <rect y="54" width="640" height="50" fill="#0038b8" />
      <rect y="376" width="640" height="50" fill="#0038b8" />
      <polygon points="320,152 346,218 418,218 358,258 380,324 320,284 260,324 282,258 222,218 294,218" fill="none" stroke="#0038b8" strokeWidth="12" />
    </svg>
  );
}

/** Inline UK flag SVG (for English) */
function FlagGB({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="640" height="480" fill="#012169" />
      <path d="M75 0l244 181L562 0h78v62L400 241l240 178v61h-80L320 302 81 480H0v-60l239-178L0 64V0z" fill="#fff" />
      <path d="M424 281l216 159v40L369 281zm-184 20l6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z" fill="#C8102E" />
      <path d="M241 0v480h160V0zM0 160v160h640V160z" fill="#fff" />
      <path d="M0 193v96h640v-96zM273 0v480h96V0z" fill="#C8102E" />
    </svg>
  );
}

const languages: { code: Locale; name: string; Flag: typeof FlagIL }[] = [
  { code: 'he', name: 'עברית', Flag: FlagIL },
  { code: 'en', name: 'English', Flag: FlagGB },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const t = useTranslations('nav');
  const { locale, setLocale } = useLocale();
  const pathname = usePathname();
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close language dropdown on click outside
  useEffect(() => {
    if (!langDropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLangDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [langDropdownOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/services', label: t('services') },
    { href: '/projects', label: t('projects') },
    { href: '/guide', label: t('guides') },
    { href: '/blog', label: t('blog') },
    { href: '/about', label: t('about') },
    { href: '/thanks', label: t('thanks') },
    { href: '/contact', label: t('contact') },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const isRTL = locale === 'he';

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-background/70 backdrop-blur-xl shadow-lg border-b border-primary/10'
            : 'bg-background/40 backdrop-blur-md'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo - always visible, always at end (left in RTL) */}
            <Link
              href="/"
              className="text-xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm order-2 md:order-first"
              aria-label="EY.dev - Home"
            >
              EY.dev
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm text-foreground/90 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm ${
                    isActive(item.href) ? 'text-primary font-semibold' : ''
                  }`}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
              <CommandPalette />
              <ThemeToggle />
              {/* Language Dropdown */}
              <div className="relative" ref={langDropdownRef}>
                <button
                  className="flex items-center gap-1.5 text-foreground/80 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm px-1 py-0.5"
                  aria-label="Switch language"
                  aria-expanded={langDropdownOpen}
                  aria-haspopup="listbox"
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                >
                  {(() => {
                    const current = languages.find((l) => l.code === locale);
                    if (!current) return null;
                    const { Flag } = current;
                    return <Flag className="h-5 w-5 rounded-sm overflow-hidden" />;
                  })()}
                  <span className="text-sm">{languages.find((l) => l.code === locale)?.name}</span>
                </button>
                {langDropdownOpen && (
                  <div
                    className="absolute end-0 mt-2 w-40 bg-background border rounded-md shadow-lg z-50"
                    role="listbox"
                    aria-label="Select language"
                  >
                    {languages.map((lang) => {
                      const { Flag } = lang;
                      return (
                        <button
                          key={lang.code}
                          role="option"
                          aria-selected={locale === lang.code}
                          onClick={() => {
                            setLocale(lang.code);
                            setLangDropdownOpen(false);
                          }}
                          className={`flex items-center gap-2 w-full text-start px-4 py-2 hover:bg-muted text-sm transition-colors focus-visible:outline-none focus-visible:bg-muted ${
                            locale === lang.code ? 'text-primary font-medium' : ''
                          }`}
                        >
                          <Flag className="h-4 w-4 rounded-sm" />
                          {lang.name}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile: Hamburger button - at start (right in RTL) */}
            <button
              className="md:hidden p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md order-1 md:order-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'סגור תפריט' : 'פתח תפריט'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* ═══ Mobile Navigation Drawer ═══ */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="תפריט ניווט"
              initial={{ x: isRTL ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '100%' : '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
              className={`fixed inset-y-0 ${isRTL ? 'right-0' : 'left-0'} w-[280px] bg-background shadow-2xl md:hidden z-[70] flex flex-col`}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between h-16 px-4 border-b border-border/30 shrink-0">
                <Link
                  href="/"
                  className="text-lg font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
                  onClick={() => setIsOpen(false)}
                >
                  EY.dev
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="סגור תפריט"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex-1 overflow-y-auto py-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block py-3 px-6 text-base transition-colors ${
                      isActive(item.href)
                        ? 'text-primary font-medium bg-primary/5 border-e-2 border-primary'
                        : 'text-foreground/80 hover:text-foreground hover:bg-muted/50'
                    }`}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Drawer footer: theme + language */}
              <div className="border-t border-border/30 p-4 space-y-3 shrink-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t('theme')}</span>
                  <ThemeToggle />
                </div>
                <div className="flex gap-2">
                  {languages.map((lang) => {
                    const { Flag } = lang;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLocale(lang.code);
                          setIsOpen(false);
                        }}
                        className={`flex items-center gap-2 flex-1 justify-center py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          locale === lang.code
                            ? 'bg-primary/10 text-primary border border-primary/20'
                            : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                        aria-label={`Switch to ${lang.name}`}
                      >
                        <Flag className="h-4 w-4 rounded-sm" />
                        {lang.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
