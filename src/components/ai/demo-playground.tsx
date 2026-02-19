'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Info,
  Search,
  Sparkles,
  Code2,
  MessageSquare,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

// ── Code Review Demo ──────────────────────────────────────────────────

interface ReviewAnnotation {
  line: number;
  type: 'error' | 'warning' | 'suggestion';
  message: string;
}

const sampleCode = `function fetchUser(id) {
  var data = fetch('/api/users/' + id)
  return data
}

function processItems(items) {
  let result = []
  for (var i = 0; i < items.length; i++) {
    result.push(items[i].name.toUpperCase())
  }
  return result
}`;

const reviewAnnotations: ReviewAnnotation[] = [
  { line: 1, type: 'warning', message: 'Missing TypeScript types for parameter and return value' },
  { line: 2, type: 'error', message: 'Missing `await` - fetch() returns a Promise' },
  { line: 2, type: 'suggestion', message: 'Use template literals instead of string concatenation' },
  { line: 3, type: 'error', message: 'Returning raw Response instead of parsed JSON' },
  { line: 6, type: 'suggestion', message: 'Consider using Array.map() instead of for loop' },
  { line: 8, type: 'warning', message: 'Use `let` or `const` instead of `var`' },
  { line: 9, type: 'warning', message: 'No null check on `items[i].name` - may throw if undefined' },
];

const annotationIcons = {
  error: AlertTriangle,
  warning: Info,
  suggestion: CheckCircle2,
};

const annotationColors = {
  error: 'text-red-500 bg-red-500/10 border-red-500/30',
  warning: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
  suggestion: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
};

function CodeReviewDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [visibleAnnotations, setVisibleAnnotations] = useState<ReviewAnnotation[]>([]);
  const [progress, setProgress] = useState(0);
  const t = useTranslations('aiPlayground');

  const runReview = useCallback(() => {
    setIsRunning(true);
    setVisibleAnnotations([]);
    setProgress(0);

    reviewAnnotations.forEach((annotation, index) => {
      setTimeout(() => {
        setVisibleAnnotations((prev) => [...prev, annotation]);
        setProgress(((index + 1) / reviewAnnotations.length) * 100);
        if (index === reviewAnnotations.length - 1) {
          setIsRunning(false);
        }
      }, 400 + index * 350);
    });
  }, []);

  const reset = () => {
    setIsRunning(false);
    setVisibleAnnotations([]);
    setProgress(0);
  };

  const codeLines = sampleCode.split('\n');
  const annotatedLines = new Set(visibleAnnotations.map((a) => a.line));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{t('codeReview.instruction')}</p>
        <div className="flex gap-2">
          <button
            onClick={reset}
            disabled={isRunning}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium border border-border hover:bg-muted transition-colors disabled:opacity-50"
          >
            <RotateCcw className="h-3 w-3" />
            {t('reset')}
          </button>
          <button
            onClick={runReview}
            disabled={isRunning}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isRunning ? <Loader2 className="h-3 w-3 animate-spin" /> : <Play className="h-3 w-3" />}
            {isRunning ? t('analyzing') : t('runReview')}
          </button>
        </div>
      </div>

      {/* Progress bar */}
      {isRunning && (
        <div className="h-1 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Code Panel */}
        <div className="rounded-xl border border-border/50 bg-muted/30 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border/50 bg-muted/50">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-400/80" />
              <div className="h-3 w-3 rounded-full bg-amber-400/80" />
              <div className="h-3 w-3 rounded-full bg-emerald-400/80" />
            </div>
            <span className="text-xs text-muted-foreground font-mono">utils.js</span>
          </div>
          <pre className="p-4 text-sm font-mono overflow-x-auto">
            {codeLines.map((line, i) => (
              <div
                key={i}
                className={cn(
                  'flex gap-3 px-1 -mx-1 rounded transition-colors duration-300',
                  annotatedLines.has(i + 1) && 'bg-amber-500/5'
                )}
              >
                <span className="text-muted-foreground/40 select-none w-5 text-right shrink-0">
                  {i + 1}
                </span>
                <span className="text-foreground/90">{line || '\u00A0'}</span>
              </div>
            ))}
          </pre>
        </div>

        {/* Annotations Panel */}
        <div className="rounded-xl border border-border/50 bg-card/50 overflow-hidden">
          <div className="px-4 py-2 border-b border-border/50 bg-muted/50 flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">{t('codeReview.findings')}</span>
            <span className="text-xs text-muted-foreground">
              {visibleAnnotations.length}/{reviewAnnotations.length}
            </span>
          </div>
          <div className="p-3 space-y-2 max-h-[400px] overflow-y-auto">
            <AnimatePresence mode="popLayout">
              {visibleAnnotations.length === 0 && !isRunning && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-muted-foreground/60 text-center py-8"
                >
                  {t('codeReview.empty')}
                </motion.p>
              )}
              {visibleAnnotations.map((annotation, index) => {
                const Icon = annotationIcons[annotation.type];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className={cn(
                      'flex gap-3 p-3 rounded-lg border text-sm',
                      annotationColors[annotation.type]
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono text-xs opacity-70">Line {annotation.line}</span>
                      <p className="mt-0.5">{annotation.message}</p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Prompt Playground Demo ────────────────────────────────────────────

const samplePrompts = [
  {
    prompt: 'Write a React hook for debouncing input',
    response: `export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}`,
  },
  {
    prompt: 'Create a TypeScript type for an API response',
    response: `type ApiResponse<T> = {
  success: true;
  data: T;
  meta?: { total: number; page: number };
} | {
  success: false;
  error: { code: string; message: string };
};

// Usage:
type UserResponse = ApiResponse<User>;
type ListResponse = ApiResponse<User[]>;`,
  },
  {
    prompt: 'Write a function to validate email addresses',
    response: `import { z } from 'zod';

const emailSchema = z
  .string()
  .email('Invalid email format')
  .min(5, 'Email too short')
  .max(254, 'Email too long')
  .refine(
    (email) => !email.endsWith('.test'),
    'Test domains not allowed'
  );

export function validateEmail(input: string) {
  return emailSchema.safeParse(input);
}`,
  },
];

function PromptPlayground() {
  const [selectedPrompt, setSelectedPrompt] = useState(0);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const t = useTranslations('aiPlayground');

  const currentResponse = samplePrompts[selectedPrompt]!.response;

  const startStreaming = useCallback(() => {
    setIsStreaming(true);
    setStreamedText('');
    setCharIndex(0);
  }, []);

  useEffect(() => {
    if (!isStreaming) return;

    intervalRef.current = setInterval(() => {
      setCharIndex((prev) => {
        if (prev >= currentResponse.length) {
          setIsStreaming(false);
          if (intervalRef.current) clearInterval(intervalRef.current);
          return prev;
        }
        setStreamedText(currentResponse.slice(0, prev + 2));
        return prev + 2;
      });
    }, 15);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isStreaming, currentResponse]);

  const reset = () => {
    setIsStreaming(false);
    setStreamedText('');
    setCharIndex(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{t('prompt.instruction')}</p>

      {/* Prompt selector */}
      <div className="flex flex-wrap gap-2">
        {samplePrompts.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedPrompt(index);
              reset();
            }}
            className={cn(
              'rounded-full px-3 py-1.5 text-xs font-medium border transition-colors',
              selectedPrompt === index
                ? 'bg-primary/10 border-primary/30 text-primary'
                : 'border-border text-muted-foreground hover:border-primary/20'
            )}
          >
            {item.prompt.length > 40 ? item.prompt.slice(0, 40) + '...' : item.prompt}
          </button>
        ))}
      </div>

      {/* Prompt display */}
      <div className="rounded-xl border border-border/50 bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <MessageSquare className="h-3.5 w-3.5 text-primary" />
          </div>
          <p className="text-sm text-foreground pt-0.5">{samplePrompts[selectedPrompt]!.prompt}</p>
        </div>
      </div>

      {/* Generate button */}
      <div className="flex justify-center">
        <button
          onClick={startStreaming}
          disabled={isStreaming}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {isStreaming ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          {isStreaming ? t('generating') : t('generate')}
        </button>
      </div>

      {/* Response */}
      <AnimatePresence>
        {(streamedText || isStreaming) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-border/50 bg-muted/30 overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border/50 bg-muted/50">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">AI Response</span>
              {isStreaming && (
                <span className="ml-auto text-xs text-primary animate-pulse">streaming...</span>
              )}
            </div>
            <pre className="p-4 text-sm font-mono overflow-x-auto text-foreground/90">
              <code>{streamedText}</code>
              {isStreaming && (
                <span className="inline-block w-2 h-4 bg-primary/70 animate-pulse ml-0.5" />
              )}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Semantic Search Demo ──────────────────────────────────────────────

interface SearchResult {
  title: string;
  snippet: string;
  score: number;
  type: 'semantic' | 'keyword';
}

const semanticResults: SearchResult[] = [
  { title: 'useDebounce Hook', snippet: 'Custom hook that delays state updates for smoother UX...', score: 0.94, type: 'semantic' },
  { title: 'Form Validation Pattern', snippet: 'Zod-based validation with debounced input checking...', score: 0.87, type: 'semantic' },
  { title: 'Performance Optimization', snippet: 'Techniques including memoization and throttled renders...', score: 0.82, type: 'semantic' },
  { title: 'API Rate Limiter', snippet: 'Token bucket implementation with configurable delays...', score: 0.76, type: 'semantic' },
];

const keywordResults: SearchResult[] = [
  { title: 'debounce.ts', snippet: 'export function debounce(fn, delay)...', score: 1.0, type: 'keyword' },
  { title: 'throttle.ts', snippet: 'export function throttle(fn, limit)...', score: 0.3, type: 'keyword' },
];

function SemanticSearchDemo() {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const t = useTranslations('aiPlayground');

  const search = useCallback(() => {
    if (!query.trim()) return;
    setIsSearching(true);
    setShowResults(false);
    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
    }, 800);
  }, [query]);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{t('search.instruction')}</p>

      {/* Search input */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && search()}
            placeholder={t('search.placeholder')}
            className="w-full rounded-lg border border-border bg-background pl-9 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <button
          onClick={search}
          disabled={isSearching || !query.trim()}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          {t('searchBtn')}
        </button>
      </div>

      {/* Quick suggestions */}
      {!showResults && (
        <div className="flex flex-wrap gap-2">
          {['how to delay user input', 'state management patterns', 'optimize API calls'].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => {
                setQuery(suggestion);
                setIsSearching(true);
                setShowResults(false);
                setTimeout(() => {
                  setIsSearching(false);
                  setShowResults(true);
                }, 800);
              }}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:border-primary/30 hover:text-primary transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Results comparison */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-4 md:grid-cols-2"
          >
            {/* Keyword Results */}
            <div className="rounded-xl border border-border/50 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-border/50 bg-muted/50 flex items-center gap-2">
                <Code2 className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs font-medium">{t('search.keyword')}</span>
                <span className="ml-auto text-xs text-muted-foreground">{keywordResults.length} {t('search.results')}</span>
              </div>
              <div className="p-3 space-y-2">
                {keywordResults.map((result, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="p-3 rounded-lg bg-muted/30 border border-border/30"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{result.title}</span>
                      <span className={cn(
                        'text-xs font-mono px-1.5 py-0.5 rounded',
                        result.score > 0.5 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-muted text-muted-foreground'
                      )}>
                        {Math.round(result.score * 100)}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{result.snippet}</p>
                  </motion.div>
                ))}
                <p className="text-xs text-muted-foreground/60 text-center pt-2">
                  {t('search.keywordNote')}
                </p>
              </div>
            </div>

            {/* Semantic Results */}
            <div className="rounded-xl border border-primary/20 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-primary/20 bg-primary/5 flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-medium text-primary">{t('search.semantic')}</span>
                <span className="ml-auto text-xs text-primary/70">{semanticResults.length} {t('search.results')}</span>
              </div>
              <div className="p-3 space-y-2">
                {semanticResults.map((result, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                    className="p-3 rounded-lg bg-primary/5 border border-primary/10"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{result.title}</span>
                      <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                        {Math.round(result.score * 100)}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{result.snippet}</p>
                  </motion.div>
                ))}
                <p className="text-xs text-primary/50 text-center pt-2">
                  {t('search.semanticNote')}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main Playground Component ─────────────────────────────────────────

const tabs = [
  { key: 'codeReview', icon: Code2 },
  { key: 'prompt', icon: MessageSquare },
  { key: 'search', icon: Search },
] as const;

export default function DemoPlayground() {
  const [activeTab, setActiveTab] = useState(0);
  const t = useTranslations('aiPlayground');

  return (
    <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden shadow-xl">
      {/* Tab bar */}
      <div className="flex border-b border-border/50 bg-muted/30" role="tablist">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              role="tab"
              aria-selected={activeTab === index}
              onClick={() => setActiveTab(index)}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium transition-all',
                activeTab === index
                  ? 'border-b-2 border-primary text-primary bg-primary/5'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{t(`tabs.${tab.key}`)}</span>
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="p-5 md:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 0 && <CodeReviewDemo />}
            {activeTab === 1 && <PromptPlayground />}
            {activeTab === 2 && <SemanticSearchDemo />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
