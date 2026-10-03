import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LocaleProvider } from '@/components/providers/locale-provider';
import Navigation from '../navigation';

const route = vi.hoisted(() => ({ pathname: '/en/guide' }));

vi.mock('next/navigation', () => ({
  usePathname: () => route.pathname,
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock('next/dynamic', () => ({ default: () => () => null }));
vi.mock('./theme-toggle', () => ({ default: () => null }));
vi.mock('./animated-logo', () => ({ default: () => 'EY.dev' }));
vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  motion: {
    div: ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => <div className={className}>{children}</div>,
  },
  useReducedMotion: () => true,
}));

describe('Navigation locale links', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement('div');
    document.body.append(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.restoreAllMocks();
  });

  async function renderAt(pathname: string) {
    route.pathname = pathname;
    await act(async () => {
      root.render(<LocaleProvider><Navigation /></LocaleProvider>);
    });
  }

  it('keeps the English Guides link and active state on the existing English route', async () => {
    await renderAt('/en/guide');
    const link = Array.from(container.querySelectorAll('a')).find((item) => item.textContent?.trim() === 'Guides');
    expect(link).toBeDefined();
    expect(link).toHaveAttribute('href', '/en/guide');
    expect(link).toHaveAttribute('aria-current', 'page');
  });

  it('keeps the Hebrew Guides destination unchanged', async () => {
    await renderAt('/guide');
    const link = Array.from(container.querySelectorAll('a')).find((item) => item.textContent?.trim() === 'מדריכים');
    expect(link).toBeDefined();
    expect(link).toHaveAttribute('href', '/guide');
    expect(link).toHaveAttribute('aria-current', 'page');
  });
});
