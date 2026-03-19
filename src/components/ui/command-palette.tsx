'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Moon, Sun, Globe, FileText, User, Mail, Home, Briefcase, Wrench, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/components/providers/locale-provider';

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  keywords?: string[];
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const t = useTranslations('nav');
  const { locale, setLocale } = useLocale();

  const navigate = useCallback((href: string) => {
    router.push(href);
    setOpen(false);
  }, [router]);

  const commands: CommandItem[] = useMemo(() => [
    { id: 'home', label: t('home'), icon: <Home className="h-4 w-4" />, action: () => navigate('/'), keywords: ['home', 'main', 'בית'] },
    { id: 'services', label: t('services'), icon: <Wrench className="h-4 w-4" />, action: () => navigate('/services'), keywords: ['services', 'pricing', 'שירותים', 'מחירים'] },
    { id: 'projects', label: t('projects'), icon: <Briefcase className="h-4 w-4" />, action: () => navigate('/projects'), keywords: ['projects', 'work', 'פרויקטים'] },
    { id: 'blog', label: t('blog'), icon: <FileText className="h-4 w-4" />, action: () => navigate('/blog'), keywords: ['blog', 'posts', 'articles', 'בלוג'] },
    { id: 'about', label: t('about'), icon: <User className="h-4 w-4" />, action: () => navigate('/about'), keywords: ['about', 'bio', 'אודות'] },
    { id: 'contact', label: t('contact'), icon: <Mail className="h-4 w-4" />, action: () => navigate('/contact'), keywords: ['contact', 'email', 'צור קשר'] },
    { id: 'thanks', label: t('thanks'), icon: <Heart className="h-4 w-4" />, action: () => navigate('/thanks'), keywords: ['thanks', 'gratitude', 'mentors', 'תודות'] },
    { id: 'theme', label: theme === 'dark' ? 'Light Mode' : 'Dark Mode', icon: theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />, action: () => { setTheme(theme === 'dark' ? 'light' : 'dark'); setOpen(false); }, keywords: ['theme', 'dark', 'light', 'mode', 'ערכת נושא'] },
    { id: 'language', label: locale === 'he' ? 'Switch to English' : 'עבור לעברית', icon: <Globe className="h-4 w-4" />, action: () => { setLocale(locale === 'he' ? 'en' : 'he'); setOpen(false); }, keywords: ['language', 'hebrew', 'english', 'שפה', 'עברית', 'אנגלית'] },
    { id: 'github', label: 'GitHub', icon: <Wrench className="h-4 w-4" />, action: () => { window.open('https://github.com/eladjak', '_blank'); setOpen(false); }, keywords: ['github', 'code', 'source'] },
  ], [t, theme, locale, navigate, setTheme, setLocale]);

  const filtered = useMemo(() => {
    if (!query) return commands;
    const lower = query.toLowerCase();
    return commands.filter(cmd =>
      cmd.label.toLowerCase().includes(lower) ||
      cmd.id.includes(lower) ||
      cmd.keywords?.some(kw => kw.includes(lower))
    );
  }, [query, commands]);

  // Keyboard shortcut to open
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action();
    }
  }, [filtered, selectedIndex]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <>
      {/* Hint in nav */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground border border-border/50 rounded-lg hover:bg-muted transition-colors"
        aria-label="Open command palette"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden lg:inline">Search...</span>
        <kbd className="pointer-events-none inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">&#8984;</span>K
        </kbd>
      </button>

      {/* Overlay + Dialog */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-50"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <div className="rounded-xl border border-border/50 bg-card shadow-2xl overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 border-b border-border/50">
                  <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search pages, actions..."
                    className="flex-1 py-3 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
                    aria-label="Search commands"
                    role="combobox"
                    aria-expanded="true"
                    aria-controls="command-list"
                  />
                  <kbd className="text-xs text-muted-foreground/60 border border-border/40 px-1.5 py-0.5 rounded">
                    ESC
                  </kbd>
                </div>

                {/* Results */}
                <ul
                  id="command-list"
                  role="listbox"
                  className="max-h-[300px] overflow-y-auto py-2"
                >
                  {filtered.length === 0 && (
                    <li className="px-4 py-8 text-center text-sm text-muted-foreground">
                      No results found.
                    </li>
                  )}
                  {filtered.map((cmd, index) => (
                    <li
                      key={cmd.id}
                      role="option"
                      aria-selected={index === selectedIndex}
                      onClick={() => cmd.action()}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors text-sm ${
                        index === selectedIndex
                          ? 'bg-primary/10 text-foreground'
                          : 'text-foreground/80 hover:bg-muted'
                      }`}
                    >
                      <span className={index === selectedIndex ? 'text-primary' : 'text-muted-foreground'}>
                        {cmd.icon}
                      </span>
                      <span className="flex-1 font-medium">{cmd.label}</span>
                      {index === selectedIndex && (
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
