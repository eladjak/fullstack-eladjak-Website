'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Moon, Sun, Globe, FileText, User, Mail, Home, Briefcase, Wrench, Heart, BookOpen, Bot } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { track } from '@vercel/analytics/react';
import { useLocale } from '@/components/providers/locale-provider';
import { allGuides } from '@/data/agent-guides';

const RESULT_LIMIT = 12;
const QUERY_TRUNCATE = 50;
const QUERY_DEBOUNCE_MS = 500;

type CommandKind = 'guide' | 'blog' | 'page' | 'action';

function kindFromId(id: string): CommandKind {
  if (id.startsWith('guide-')) return 'guide';
  if (id.startsWith('blog-')) return 'blog';
  if (id === 'theme' || id === 'language' || id === 'github') return 'action';
  return 'page';
}

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  keywords?: string[];
  group?: string;
}

interface BlogPostMeta {
  slug: string;
  frontmatter: {
    title: string;
    titleHe?: string;
    date?: string;
    tags?: string[];
  };
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [blogPosts, setBlogPosts] = useState<BlogPostMeta[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const t = useTranslations('nav');
  const { locale, setLocale } = useLocale();

  const navigate = useCallback((href: string) => {
    router.push(href);
    setOpen(false);
  }, [router]);

  const runCommand = useCallback((cmd: CommandItem) => {
    try {
      track('palette_select', {
        kind: kindFromId(cmd.id),
        label: cmd.label,
      });
    } catch {
      // Analytics failures must never break navigation.
    }
    cmd.action();
  }, []);

  // Fetch blog posts once when palette first opens (with abort + timeout + fallback)
  useEffect(() => {
    if (!open || blogPosts.length > 0) return;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    fetch('/api/blog/posts', { signal: controller.signal })
      .then((r): Promise<unknown> => (r.ok ? r.json() : Promise.resolve([])))
      .then((data: unknown) => {
        clearTimeout(timeoutId);
        if (Array.isArray(data)) {
          setBlogPosts(data as BlogPostMeta[]);
        }
      })
      .catch(() => {
        clearTimeout(timeoutId);
        // Silent fallback — palette still works for nav + guides.
      });
    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [open, blogPosts.length]);

  const commands: CommandItem[] = useMemo(() => {
    const navCommands: CommandItem[] = [
      { id: 'home', group: 'דפים', label: t('home'), icon: <Home className="h-4 w-4" />, action: () => navigate('/'), keywords: ['home', 'main', 'בית'] },
      { id: 'services', group: 'דפים', label: t('services'), icon: <Wrench className="h-4 w-4" />, action: () => navigate('/services'), keywords: ['services', 'pricing', 'שירותים', 'מחירים'] },
      { id: 'projects', group: 'דפים', label: t('projects'), icon: <Briefcase className="h-4 w-4" />, action: () => navigate('/projects'), keywords: ['projects', 'work', 'פרויקטים'] },
      { id: 'blog', group: 'דפים', label: t('blog'), icon: <FileText className="h-4 w-4" />, action: () => navigate('/blog'), keywords: ['blog', 'posts', 'articles', 'בלוג'] },
      { id: 'about', group: 'דפים', label: t('about'), icon: <User className="h-4 w-4" />, action: () => navigate('/about'), keywords: ['about', 'bio', 'אודות'] },
      { id: 'contact', group: 'דפים', label: t('contact'), icon: <Mail className="h-4 w-4" />, action: () => navigate('/contact'), keywords: ['contact', 'email', 'צור קשר'] },
      { id: 'thanks', group: 'דפים', label: t('thanks'), icon: <Heart className="h-4 w-4" />, action: () => navigate('/thanks'), keywords: ['thanks', 'gratitude', 'mentors', 'תודות'] },
      { id: 'methodology', group: 'דפים', label: 'מתודולוגיה', icon: <BookOpen className="h-4 w-4" />, action: () => navigate('/methodology'), keywords: ['methodology', 'process', 'מתודולוגיה', 'תהליך'] },
      { id: 'skills-universe', group: 'דפים', label: 'יקום הסקילים', icon: <Wrench className="h-4 w-4" />, action: () => navigate('/skills-universe'), keywords: ['skills', 'universe', 'יקום', 'מיומנויות'] },
    ];

    const guideCommands: CommandItem[] = allGuides.map((g) => ({
      id: `guide-${g.slug}`,
      group: 'מדריכים',
      label: g.agentNameHe || g.agentName,
      description: g.tagline,
      icon: <Bot className="h-4 w-4" />,
      action: () => navigate(`/guide/${g.slug}`),
      keywords: [g.slug, g.agentName, g.agentNameHe, 'guide', 'מדריך'].filter(Boolean) as string[],
    }));

    const blogCommands: CommandItem[] = blogPosts.map((p) => {
      const title = locale === 'he' && p.frontmatter.titleHe ? p.frontmatter.titleHe : p.frontmatter.title;
      return {
        id: `blog-${p.slug}`,
        group: 'בלוג',
        label: title,
        description: p.frontmatter.tags?.slice(0, 3).join(' · '),
        icon: <FileText className="h-4 w-4" />,
        action: () => navigate(`/blog/${p.slug}`),
        keywords: [p.slug, ...(p.frontmatter.tags ?? [])],
      };
    });

    const actionCommands: CommandItem[] = [
      { id: 'theme', group: 'פעולות', label: theme === 'dark' ? 'Light Mode' : 'Dark Mode', icon: theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />, action: () => { setTheme(theme === 'dark' ? 'light' : 'dark'); setOpen(false); }, keywords: ['theme', 'dark', 'light', 'mode', 'ערכת נושא'] },
      { id: 'language', group: 'פעולות', label: locale === 'he' ? 'Switch to English' : 'עבור לעברית', icon: <Globe className="h-4 w-4" />, action: () => { setLocale(locale === 'he' ? 'en' : 'he'); setOpen(false); }, keywords: ['language', 'hebrew', 'english', 'שפה', 'עברית', 'אנגלית'] },
      { id: 'github', group: 'פעולות', label: 'GitHub', icon: <Wrench className="h-4 w-4" />, action: () => { window.open('https://github.com/eladjak', '_blank'); setOpen(false); }, keywords: ['github', 'code', 'source'] },
    ];

    return [...navCommands, ...guideCommands, ...blogCommands, ...actionCommands];
  }, [t, theme, locale, navigate, setTheme, setLocale, blogPosts]);

  const { filtered, totalMatches } = useMemo(() => {
    if (!query) {
      // No query: show top RESULT_LIMIT (mix of nav + a few guides) for orientation
      const slice = commands.slice(0, RESULT_LIMIT);
      return { filtered: slice, totalMatches: slice.length };
    }
    const lower = query.toLowerCase();
    const matches = commands.filter((cmd) =>
      cmd.label.toLowerCase().includes(lower) ||
      cmd.id.toLowerCase().includes(lower) ||
      cmd.description?.toLowerCase().includes(lower) ||
      cmd.keywords?.some((kw) => kw.toLowerCase().includes(lower))
    );
    return { filtered: matches.slice(0, RESULT_LIMIT), totalMatches: matches.length };
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

  // Focus input when opened + emit open analytics event
  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      try {
        track('palette_open');
      } catch {
        // Silent — analytics is best-effort.
      }
    }
  }, [open]);

  // Debounced query analytics (500ms) with privacy truncation
  useEffect(() => {
    if (!open || !query) return;
    const handle = setTimeout(() => {
      try {
        track('palette_query', { q: query.slice(0, QUERY_TRUNCATE) });
      } catch {
        // Silent — analytics is best-effort.
      }
    }, QUERY_DEBOUNCE_MS);
    return () => clearTimeout(handle);
  }, [query, open]);

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
      runCommand(filtered[selectedIndex]);
    }
  }, [filtered, selectedIndex, runCommand]);

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
                    placeholder="חיפוש דפים ופעולות..."
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
                      לא נמצאו תוצאות
                    </li>
                  )}
                  {filtered.map((cmd, index) => (
                    <li
                      key={cmd.id}
                      role="option"
                      aria-selected={index === selectedIndex}
                      onClick={() => runCommand(cmd)}
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
                      <span className="flex-1 min-w-0">
                        <span className="block truncate font-medium">{cmd.label}</span>
                        {cmd.description && (
                          <span className="block truncate text-[11px] text-muted-foreground/70">
                            {cmd.description}
                          </span>
                        )}
                      </span>
                      {cmd.group && (
                        <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider text-muted-foreground/50 px-1.5 py-0.5 border border-border/30 rounded">
                          {cmd.group}
                        </span>
                      )}
                      {index === selectedIndex && (
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      )}
                    </li>
                  ))}
                </ul>
                {totalMatches > RESULT_LIMIT && (
                  <div className="border-t border-border/40 px-4 py-2 text-center text-[11px] text-muted-foreground/70">
                    +{totalMatches - RESULT_LIMIT} עוד תוצאות. צמצם חיפוש להציגן.
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
