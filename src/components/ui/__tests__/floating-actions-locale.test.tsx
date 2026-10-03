import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { NextIntlClientProvider } from 'next-intl';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { messages, type Locale } from '@/i18n';
import { WhatsAppFAB } from '../whatsapp-fab';
import { ScrollToTop } from '../scroll-to-top';

vi.mock('framer-motion', () => {
  const Anchor = ({
    initial: _initial,
    animate: _animate,
    transition: _transition,
    whileHover: _whileHover,
    whileTap: _whileTap,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    initial?: unknown;
    animate?: unknown;
    transition?: unknown;
    whileHover?: unknown;
    whileTap?: unknown;
  }) => <a {...props} />;
  const Button = ({
    initial: _initial,
    animate: _animate,
    exit: _exit,
    transition: _transition,
    whileHover: _whileHover,
    whileTap: _whileTap,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    initial?: unknown;
    animate?: unknown;
    exit?: unknown;
    transition?: unknown;
    whileHover?: unknown;
    whileTap?: unknown;
  }) => <button {...props} />;
  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    motion: { a: Anchor, button: Button },
    useReducedMotion: () => true,
  };
});

describe('Floating action locale labels', () => {
  let container: HTMLDivElement;
  let root: Root;
  let originalScrollY: PropertyDescriptor | undefined;

  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    originalScrollY = Object.getOwnPropertyDescriptor(window, 'scrollY');
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 400 });
    container = document.createElement('div');
    document.body.append(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    if (originalScrollY) Object.defineProperty(window, 'scrollY', originalScrollY);
    else Reflect.deleteProperty(window, 'scrollY');
    vi.restoreAllMocks();
  });

  async function renderActions(locale: Locale) {
    await act(async () => {
      root.render(
        <NextIntlClientProvider locale={locale} messages={messages[locale]} timeZone="Asia/Jerusalem">
          <>
            <WhatsAppFAB />
            <ScrollToTop />
          </>
        </NextIntlClientProvider>,
      );
    });
  }

  it('renders localized English WhatsApp accessible help without changing its destination', async () => {
    await renderActions('en');
    const whatsapp = container.querySelector<HTMLAnchorElement>('a[href^="https://wa.me/"]');
    expect(whatsapp).toHaveAttribute('aria-label', 'Message me on WhatsApp');
    expect(whatsapp).toHaveAttribute('title', 'Message me on WhatsApp 💬');
    expect(whatsapp?.querySelector('[role="tooltip"]')?.textContent).toBe('Message me on WhatsApp 💬');
    const destination = new URL(whatsapp?.getAttribute('href') ?? '');
    expect(destination.origin + destination.pathname).toBe('https://wa.me/972525427474');
    expect(destination.searchParams.get('text')).toBe('היי אלעד, אשמח לשמוע על הפרויקט שלי');
  });

  it('renders localized Hebrew WhatsApp accessible help without changing its destination', async () => {
    await renderActions('he');
    const whatsapp = container.querySelector<HTMLAnchorElement>('a[href^="https://wa.me/"]');
    expect(whatsapp).toHaveAttribute('aria-label', 'דברו איתי בוואטסאפ');
    expect(whatsapp).toHaveAttribute('title', 'דברו איתי בוואטסאפ 💬');
    expect(whatsapp?.querySelector('[role="tooltip"]')?.textContent).toBe('דברו איתי בוואטסאפ 💬');
    const destination = new URL(whatsapp?.getAttribute('href') ?? '');
    expect(destination.origin + destination.pathname).toBe('https://wa.me/972525427474');
    expect(destination.searchParams.get('text')).toBe('היי אלעד, אשמח לשמוע על הפרויקט שלי');
  });

  it('renders both scroll-to-top labels in English', async () => {
    await renderActions('en');
    const scroll = container.querySelector<HTMLButtonElement>('button[aria-label="Scroll to top"]');
    expect(scroll).toHaveAttribute('title', 'Back to Top');
  });

  it('renders both scroll-to-top labels in Hebrew', async () => {
    await renderActions('he');
    const scroll = container.querySelector<HTMLButtonElement>('button[aria-label="גלול למעלה"]');
    expect(scroll).toHaveAttribute('title', 'חזרה למעלה');
  });
});
