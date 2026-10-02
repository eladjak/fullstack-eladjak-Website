import { act, type ReactNode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ClientLayout } from '../client-layout';

const { pathname } = vi.hoisted(() => ({ pathname: { current: '/en/guide' } }));
Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

vi.mock('next/navigation', () => ({
  usePathname: () => pathname.current,
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: { children: ReactNode }) => children,
  MotionConfig: ({ children }: { children: ReactNode }) => children,
  motion: { div: 'div' },
  useReducedMotion: () => false,
}));

vi.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: ReactNode }) => children,
}));
vi.mock('react-hot-toast', () => ({ Toaster: () => null }));
vi.mock('@vercel/analytics/react', () => ({ Analytics: () => null }));
vi.mock('@vercel/speed-insights/next', () => ({ SpeedInsights: () => null }));
vi.mock('next/dynamic', () => ({ default: () => () => null }));

vi.mock('@/components/ui/footer', () => ({ default: () => null }));
vi.mock('@/components/ui/page-transition', () => ({
  PageTransition: ({ children }: { children: ReactNode }) => children,
}));
vi.mock('@/components/ui/spotlight', () => ({ SpotlightCursor: () => null }));
vi.mock('@/components/ui/whatsapp-fab', () => ({ WhatsAppFAB: () => null }));
vi.mock('@/components/ui/scroll-to-top', () => ({ ScrollToTop: () => null }));
vi.mock('@/components/ui/theme-toggle', () => ({ default: () => null }));
vi.mock('@/components/ui/animated-logo', () => ({ default: () => 'EY.dev' }));

describe('ClientLayout locale accessible labels', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    pathname.current = '/en/guide';
    container = document.createElement('div');
    document.body.append(container);
    root = createRoot(container);
  });

  it('renders English skip and mobile menu labels on an English route', () => {
    act(() => root.render(<ClientLayout><main>Guide</main></ClientLayout>));

    const skip = container.querySelector('a[href="#main-content"]');
    expect(skip?.textContent).toBe('Skip to main content');
    const menu = container.querySelector('button[aria-label="Open menu"]');
    expect(menu).not.toBeNull();
    expect(menu).toHaveAttribute('aria-expanded', 'false');

    act(() => menu?.dispatchEvent(new MouseEvent('click', { bubbles: true })));
    expect(container.querySelector('button[aria-label="Close menu"]')).toHaveAttribute('aria-expanded', 'true');
    expect(container.querySelector('[role="dialog"][aria-label="Mobile navigation"]')).not.toBeNull();

    const closeButtons = container.querySelectorAll('button[aria-label="Close menu"]');
    act(() => closeButtons[1]?.dispatchEvent(new MouseEvent('click', { bubbles: true })));
    expect(container.querySelector('button[aria-label="Open menu"]')).toHaveAttribute('aria-expanded', 'false');
    expect(container.querySelector('[role="dialog"][aria-label="Mobile navigation"]')).toBeNull();
  });

  it('preserves Hebrew labels and the mobile open/close behavior on a Hebrew route', () => {
    pathname.current = '/guide';
    act(() => root.render(<ClientLayout><main>מדריך</main></ClientLayout>));

    const skip = container.querySelector('a[href="#main-content"]');
    expect(skip?.textContent).toBe('דלג לתוכן הראשי');
    act(() => container.querySelector('button[aria-label="פתח תפריט"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true })));
    expect(container.querySelector('[role="dialog"][aria-label="תפריט ניווט"]')).not.toBeNull();

    act(() => container.querySelector('button[aria-label="סגור תפריט"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true })));
    expect(container.querySelector('button[aria-label="פתח תפריט"]')).toHaveAttribute('aria-expanded', 'false');
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });
});
