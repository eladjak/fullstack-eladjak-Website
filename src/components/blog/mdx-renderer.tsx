'use client';

import { useMemo } from 'react';
import { useLocale } from 'next-intl';

interface MDXRendererProps {
  content: string;
}

/**
 * Simple Markdown-to-HTML renderer for MDX blog content.
 *
 * Wave-12 (2026-05-10): Bilingual posts use a `---` separator between English (top)
 * and Hebrew (bottom) sections. Pick the half matching the active locale instead of
 * rendering both languages stacked. Falls back to full content if no separator found.
 */
export function MDXRenderer({ content }: MDXRendererProps) {
  const locale = useLocale();
  const html = useMemo(() => {
    const sliced = sliceByLocale(content, locale);
    return markdownToHtml(sliced);
  }, [content, locale]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

/**
 * Posts are authored as: English content, then a single `---` line, then Hebrew.
 * Some posts have no Hebrew section yet, in that case we return the full content.
 * If we're in `he` locale and a Hebrew section exists, return it; otherwise English.
 */
function sliceByLocale(content: string, locale: string): string {
  const sections = content.split(/^---\s*$/m);
  if (sections.length < 2) return content;
  const english = sections[0]?.trim() ?? '';
  const hebrew = sections.slice(1).join('\n---\n').trim();
  if (locale === 'he' && hebrew.length > 50) return hebrew;
  return english.length > 50 ? english : content;
}

function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Code blocks (fenced) - must be processed before inline code
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_match, lang, code) => {
    const langAttr = lang ? ` language-${lang}` : '';
    const escaped = escapeHtml(code.trim());
    return `<pre class="bg-card rounded-lg p-4 overflow-x-auto border border-border"><code class="text-sm${langAttr}">${escaped}</code></pre>`;
  });

  // Split into lines for block-level processing
  const lines = html.split('\n');
  const result: string[] = [];
  let inList = false;
  let listType = '';
  let inBlockquote = false;
  let blockquoteLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? '';

    // Skip if inside a pre block
    if (line.includes('<pre>') || line.includes('</pre>')) {
      result.push(line);
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      if (!inBlockquote) {
        inBlockquote = true;
        blockquoteLines = [];
      }
      blockquoteLines.push(line.slice(2));
      continue;
    } else if (inBlockquote) {
      result.push(`<blockquote class="border-l-4 border-primary/30 pl-4 italic text-foreground/80 my-4"><p>${processInline(blockquoteLines.join(' '))}</p></blockquote>`);
      inBlockquote = false;
      blockquoteLines = [];
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      if (inList) {
        result.push(listType === 'ul' ? '</ul>' : '</ol>');
        inList = false;
      }
      result.push('<hr />');
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      if (inList) {
        result.push(listType === 'ul' ? '</ul>' : '</ol>');
        inList = false;
      }
      const level = headingMatch[1]?.length ?? 1;
      const text = headingMatch[2] ?? '';
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      result.push(`<h${level} id="${id}" class="text-foreground font-bold">${processInline(text)}</h${level}>`);
      continue;
    }

    // Unordered list
    if (/^[-*]\s+/.test(line)) {
      if (!inList || listType !== 'ul') {
        if (inList) result.push(listType === 'ul' ? '</ul>' : '</ol>');
        result.push('<ul>');
        inList = true;
        listType = 'ul';
      }
      const content = line.replace(/^[-*]\s+/, '');
      result.push(`<li>${processInline(content)}</li>`);
      continue;
    }

    // Ordered list
    const olMatch = line.match(/^\d+\.\s+(.+)$/);
    if (olMatch) {
      if (!inList || listType !== 'ol') {
        if (inList) result.push(listType === 'ul' ? '</ul>' : '</ol>');
        result.push('<ol>');
        inList = true;
        listType = 'ol';
      }
      result.push(`<li>${processInline(olMatch[1] ?? '')}</li>`);
      continue;
    }

    // Close list if we hit a non-list line
    if (inList && line.trim() !== '') {
      result.push(listType === 'ul' ? '</ul>' : '</ol>');
      inList = false;
    }

    // Empty line
    if (line.trim() === '') {
      result.push('');
      continue;
    }

    // Paragraph (default)
    if (!line.startsWith('<')) {
      result.push(`<p>${processInline(line)}</p>`);
    } else {
      result.push(line);
    }
  }

  // Close any open elements
  if (inBlockquote) {
    result.push(`<blockquote class="border-l-4 border-primary/30 pl-4 italic text-foreground/80 my-4"><p>${processInline(blockquoteLines.join(' '))}</p></blockquote>`);
  }
  if (inList) {
    result.push(listType === 'ul' ? '</ul>' : '</ol>');
  }

  return result.join('\n');
}

function processInline(text: string): string {
  let result = text;

  // Images
  result = result.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" />');

  // Links
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors duration-200">$1</a>');

  // Bold + italic
  result = result.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');

  // Bold
  result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Italic
  result = result.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Inline code (avoid matching inside code blocks)
  result = result.replace(/`([^`]+)`/g, '<code class="bg-primary/10 text-primary rounded px-1.5 py-0.5 text-sm font-mono">$1</code>');

  return result;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
