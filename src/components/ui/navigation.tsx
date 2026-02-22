'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './theme-toggle';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/components/providers/locale-provider';
import { useActiveSection } from '@/hooks/useActiveSection';
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

/** Section anchor links shown on the home page for smooth scroll navigation */
const SECTION_ANCHORS = [
  { id: 'skills', labelKey: 'skills' },
  { id: 'projects', labelKey: 'featuredProjects' },
  { id: 'testimonials', labelKey: 'testimonials' },
  { id: 'cta', labelKey: 'contact' },
] as const;

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations('nav');
  const tSections = useTranslations('nav');
  const { locale, setLocale } = useLocale();
  const pathname = usePathname();
  const activeSection = useActiveSection();
  const isHomePage = pathname === '/';

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

  /** Smooth scroll to a section by ID, accounting for the fixed nav height */
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;
    const navHeight = 64; // h-16 = 64px
    const y = element.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }, []);

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/projects', label: t('projects') },
    { href: '/blog', label: t('blog') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl shadow-lg border-b border-border/30'
          : 'bg-background/40 backdrop-blur-md'
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
                className="text-foreground/90 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
              >
                {item.label}
              </Link>
            ))}
            {/* Section scroll links - only visible on home page */}
            {isHomePage && (
              <div className="flex items-center gap-1 ms-2 border-s border-border ps-4">
                {SECTION_ANCHORS.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`relative px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
                        isActive
                          ? 'text-primary-foreground bg-primary'
                          : 'text-foreground/60 hover:text-foreground hover:bg-muted'
                      }`}
                      aria-label={`Scroll to ${section.id}`}
                    >
                      {tSections(section.labelKey)}
                    </button>
                  );
                })}
              </div>
            )}
            <ThemeToggle />
            <div className="relative group">
              <button
                className="flex items-center gap-1.5 text-foreground/80 hover:text-foreground transition-colors"
                aria-label="Switch language"
              >
                {(() => {
                  const current = languages.find((l) => l.code === locale);
                  if (!current) return null;
                  const { Flag } = current;
                  return <Flag className="h-5 w-5 rounded-sm overflow-hidden" />;
                })()}
                <span className="text-sm">{languages.find((l) => l.code === locale)?.name}</span>
              </button>
              <div className="absolute end-0 mt-2 w-40 bg-background border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {languages.map((lang) => {
                  const { Flag } = lang;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => setLocale(lang.code)}
                      className={`flex items-center gap-2 w-full text-start px-4 py-2 hover:bg-muted text-sm transition-colors ${
                        locale === lang.code ? 'text-primary font-medium' : ''
                      }`}
                    >
                      <Flag className="h-4 w-4 rounded-sm" />
                      {lang.name}
                    </button>
                  );
                })}
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
              {/* Section scroll links in mobile - only on home page */}
              {isHomePage && (
                <>
                  <div className="border-t my-4" />
                  <div className="space-y-1">
                    {SECTION_ANCHORS.map((section) => {
                      const isActive = activeSection === section.id;
                      return (
                        <button
                          key={section.id}
                          onClick={() => {
                            scrollToSection(section.id);
                            setIsOpen(false);
                          }}
                          className={`block w-full text-start py-2 px-2 rounded-md text-sm transition-colors ${
                            isActive
                              ? 'text-primary font-medium bg-primary/10'
                              : 'text-foreground/80 hover:text-foreground hover:bg-muted'
                          }`}
                        >
                          {tSections(section.labelKey)}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
              <div className="border-t my-4" />
              <div className="flex items-center justify-between py-2">
                <span className="text-foreground/80">{t('theme')}</span>
                <ThemeToggle />
              </div>
              <div className="border-t my-4" />
              <div className="space-y-2">
                {languages.map((lang) => {
                  const { Flag } = lang;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLocale(lang.code);
                        setIsOpen(false);
                      }}
                      className={`flex items-center gap-2 w-full text-start py-2 transition-colors ${
                        locale === lang.code
                          ? 'text-primary font-medium'
                          : 'text-foreground/80 hover:text-foreground'
                      }`}
                    >
                      <Flag className="h-5 w-5 rounded-sm" />
                      {lang.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
