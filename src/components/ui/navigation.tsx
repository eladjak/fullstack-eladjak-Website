'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import NotificationsMenu from './notifications';
import Link from 'next/link';
import { AuthDialog } from '@/components/auth/auth-dialog';
import ThemeToggle from './theme-toggle';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/components/providers/locale-provider';
import type { Locale } from '@/i18n';

const languages: { code: Locale; name: string }[] = [
  { code: 'he', name: 'עברית' },
  { code: 'en', name: 'English' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations('nav');
  const { locale, setLocale } = useLocale();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/projects', label: t('projects') },
    { href: '/blog', label: t('blog') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
    { href: '/ai-tools', label: t('aiTools') },
    { href: '/whiteboard', label: t('whiteboard') },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-md shadow-lg'
          : 'bg-background/50 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            EY.dev
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <NotificationsMenu />
            <AuthDialog />
            <ThemeToggle />
            <div className="relative group">
              <button
                className="flex items-center gap-1.5 text-foreground/80 hover:text-foreground transition-colors"
                aria-label="Switch language"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm">{languages.find((l) => l.code === locale)?.name}</span>
              </button>
              <div className="absolute end-0 mt-2 w-36 bg-background border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLocale(lang.code)}
                    className={`block w-full text-start px-4 py-2 hover:bg-muted text-sm transition-colors ${
                      locale === lang.code ? 'text-primary font-medium' : ''
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: locale === 'he' ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: locale === 'he' ? '-100%' : '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className={`fixed inset-y-0 ${locale === 'he' ? 'left-0 border-e' : 'right-0 border-s'} w-64 bg-background shadow-xl md:hidden z-50`}
          >
            <div className="flex flex-col p-4 pt-20">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="py-2 text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t my-4" />
              <div className="flex items-center justify-between py-2">
                <span className="text-foreground/80">{t('theme')}</span>
                <ThemeToggle />
              </div>
              <div className="border-t my-4" />
              <div className="space-y-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLocale(lang.code);
                      setIsOpen(false);
                    }}
                    className={`w-full text-start py-2 transition-colors ${
                      locale === lang.code
                        ? 'text-primary font-medium'
                        : 'text-foreground/80 hover:text-foreground'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
