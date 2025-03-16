'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import NotificationsMenu from './notifications';
import Link from 'next/link';
import { AuthDialog } from '@/components/auth/auth-dialog';

const languages = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'he', name: 'עברית', dir: 'rtl' }
];

import { useTranslation } from 'react-i18next';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    const storedLang = localStorage.getItem('language') || 'en';
    setCurrentLang(storedLang);
    document.documentElement.dir = languages.find(l => l.code === storedLang)?.dir || 'ltr';
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const switchLanguage = (langCode: string) => {
    if (!mounted) return;
    setCurrentLang(langCode);
    localStorage.setItem('language', langCode);
    const newDir = languages.find(l => l.code === langCode)?.dir || 'ltr';
    document.documentElement.dir = newDir;
  };

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/ai-tools', label: 'AI Tools' },
    { href: '/whiteboard', label: 'Whiteboard' }
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
          <Link href="/" className="text-xl font-bold">
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
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
            <div className="relative group">
              <button
                className="flex items-center space-x-1 text-foreground/80 hover:text-foreground"
                onClick={() => setIsOpen(true)}
              >
                <Globe className="h-4 w-4" />
                <span>{languages.find(l => l.code === currentLang)?.name}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-background border rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => switchLanguage(lang.code)}
                    className="block w-full text-left px-4 py-2 hover:bg-muted"
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed inset-y-0 right-0 w-64 bg-background border-l shadow-xl md:hidden"
          >
            <div className="flex flex-col p-4">
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
              <div className="space-y-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      switchLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className="w-full text-left py-2 text-foreground/80 hover:text-foreground transition-colors"
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
