'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './theme-toggle';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/components/providers/locale-provider';
import { CommandPalette } from '@/components/ui/command-palette';
import type { Locale } from '@/i18n';

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
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Close language dropdown on click outside
  useEffect(() => {
    if (!langDropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLangDropdownOpen(false);
      }
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
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/services', label: t('services') },
    { href: '/projects', label: t('projects') },
    { href: '/claude-code', label: t('claudeCode') },
    { href: '/blog', label: t('blog') },
    { href: '/about', label: t('about') },
    { href: '/thanks', label: t('thanks') },
    { href: '/contact', label: t('contact') },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
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
          {/* Mobile Menu Button - appears FIRST (start/right in RTL) on mobile */}
          <button
            className="md:hidden p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md"
            onClick={toggleMenu}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <Link
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
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
                className={`text-foreground/90 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm ${
                  isActive(item.href) ? 'text-primary font-semibold' : ''
                }`}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
            <CommandPalette />
            <ThemeToggle />
            {/* Language Dropdown - keyboard accessible */}
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
                  className="absolute end-0 mt-2 w-40 bg-background border rounded-md shadow-lg"
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

          {/* Spacer for mobile layout alignment (hamburger is at start) */}
          <div className="md:hidden w-10" />
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              className="fixed inset-0 bg-background/50 backdrop-blur-sm md:hidden z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              ref={mobileMenuRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: locale === 'he' ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: locale === 'he' ? '100%' : '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className={`fixed inset-y-0 ${locale === 'he' ? 'right-0 border-s' : 'left-0 border-e'} w-72 bg-background/95 backdrop-blur-xl shadow-xl md:hidden z-50`}
            >
              <div className="flex flex-col h-full">
                {/* Mobile menu header */}
                <div className="flex items-center justify-between p-4 border-b border-border/30">
                  <Link
                    href="/"
                    className="text-lg font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
                    onClick={() => setIsOpen(false)}
                  >
                    EY.dev
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-md hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`py-3 px-2 text-foreground/80 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md ${
                      isActive(item.href) ? 'text-primary font-medium' : ''
                    }`}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="border-t my-4" />
                <div className="flex items-center justify-between py-2 px-2">
                  <span className="text-foreground/80">{t('theme')}</span>
                  <ThemeToggle />
                </div>
                <div className="border-t my-4" />
                <div className="space-y-1">
                  {languages.map((lang) => {
                    const { Flag } = lang;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLocale(lang.code);
                          setIsOpen(false);
                        }}
                        className={`flex items-center gap-2 w-full text-start py-3 px-2 transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                          locale === lang.code
                            ? 'text-primary font-medium'
                            : 'text-foreground/80 hover:text-foreground'
                        }`}
                        aria-label={`Switch to ${lang.name}`}
                      >
                        <Flag className="h-5 w-5 rounded-sm" />
                        {lang.name}
                      </button>
                    );
                  })}
                </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
