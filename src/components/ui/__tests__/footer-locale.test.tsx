import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { NextIntlClientProvider } from 'next-intl';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { messages, type Locale } from '@/i18n';
import Footer from '../footer';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={className}>{children}</div>
    ),
    button: ({ children, className, whileHover: _whileHover, whileTap: _whileTap, transition: _transition, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
      whileHover?: unknown;
      whileTap?: unknown;
      transition?: unknown;
    }) => (
      <button className={className} {...props}>{children}</button>
    ),
  },
  useReducedMotion: () => true,
}));

const originalFetch = globalThis.fetch;

let container: HTMLDivElement;
let root: Root;

async function renderFooter(locale: Locale) {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
  await act(async () => {
    root.render(
      <NextIntlClientProvider
        locale={locale}
        messages={messages[locale]}
        timeZone="Asia/Jerusalem"
        now={new Date('2026-10-03T09:00:00.000Z')}
      >
        <Footer />
      </NextIntlClientProvider>,
    );
  });
}

function getLinkByName(name: string | RegExp): HTMLAnchorElement {
  const links = Array.from(container.querySelectorAll('a'));
  const match = links.find((link) => {
    const accessibleName = link.getAttribute('aria-label') || link.textContent || '';
    return typeof name === 'string' ? accessibleName.includes(name) : name.test(accessibleName);
  });
  expect(match, `expected link named ${name}`).toBeDefined();
  return match as HTMLAnchorElement;
}

function getButtonByName(name: string): HTMLButtonElement {
  const button = Array.from(container.querySelectorAll('button')).find(
    (candidate) => candidate.getAttribute('aria-label') === name,
  );
  expect(button, `expected button named ${name}`).toBeDefined();
  return button as HTMLButtonElement;
}

describe('Footer locale behavior', () => {
  afterEach(() => {
    if (root) {
      act(() => root.unmount());
    }
    container?.remove();
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it('renders English footer and existing English destinations on /en/guide', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 503,
      json: async () => ({}),
    }) as unknown as typeof fetch;

    await renderFooter('en');

    const footer = container.querySelector('[role="contentinfo"]');
    expect(footer).not.toBeNull();
    expect(footer?.textContent).not.toMatch(/[\u0590-\u05FF]/);
    expect(container.textContent).toContain('Related projects');
    expect(getLinkByName(/personal hub/i).getAttribute('href')).toBe('https://www.eladjak.com');
    expect(getLinkByName('Download CV').getAttribute('href')).toBe('/cv-elad-yaakobovitch.html');
    expect(getLinkByName('Accessibility statement').getAttribute('href')).toBe('/accessibility');
    expect(getLinkByName('Guides').getAttribute('href')).toBe('/en/guide');
    expect(getLinkByName('Services').getAttribute('href')).toBe('/services');
    expect(getButtonByName('Scroll to top')).toBeInTheDocument();
    expect(container.querySelector('input[placeholder="Your email"]')).not.toBeNull();
    expect(container.textContent).toContain('Unsubscribe anytime. Your email is never shared.');
    const newsletterInput = container.querySelector<HTMLInputElement>('#newsletter-email');
    expect(newsletterInput?.dir).toBe('ltr');
    expect(newsletterInput?.closest('form')?.parentElement?.getAttribute('dir')).toBe('ltr');
    expect(footer?.querySelector('.container')?.className).toContain('pb-24');

    for (let attempt = 0; attempt < 4; attempt += 1) {
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });
      if (container.querySelector('a[href="/en/guide"]')?.getAttribute('aria-label')?.includes('Agent network status')) break;
    }

    const agentStatusLink = Array.from(container.querySelectorAll('a')).find((link) =>
      link.getAttribute('aria-label')?.includes('Agent network status'),
    );
    expect(agentStatusLink).toBeDefined();
    expect(agentStatusLink?.getAttribute('href')).toBe('/en/guide');
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://hub.eladjak.com/health',
      expect.objectContaining({ cache: 'no-store' }),
    );
  });

  it('keeps the Hebrew footer and Hebrew guide destination unchanged', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 503,
      json: async () => ({}),
    }) as unknown as typeof fetch;

    await renderFooter('he');

    expect(container.textContent).toContain('פרויקטים נלווים:');
    expect(getLinkByName(/מדריכים/).getAttribute('href')).toBe('/guide');
    expect(getLinkByName('הורדת קורות חיים').getAttribute('href')).toBe('/cv-elad-yaakobovitch.html');
    expect(getLinkByName('הצהרת נגישות').getAttribute('href')).toBe('/accessibility');
    expect(getButtonByName('גלול למעלה')).toBeInTheDocument();
    const newsletterInput = container.querySelector<HTMLInputElement>('#newsletter-email');
    expect(newsletterInput?.dir).toBe('ltr');
    expect(newsletterInput?.closest('form')?.parentElement?.getAttribute('dir')).toBe('rtl');
    expect(container.querySelector('[role="contentinfo"] .container')?.className).toContain('pb-24');
  });
});
