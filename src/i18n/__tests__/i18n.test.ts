import { describe, expect, it, vi } from 'vitest';

// The i18n.ts module imports JSON message files that may not exist in test env.
// Mock those imports before Vite tries to resolve them.
vi.mock('../../../messages/he.json', () => ({ default: { greeting: 'shalom' } }));
vi.mock('../../../messages/en.json', () => ({ default: { greeting: 'hello' } }));

// Now import the module under test. The @/ alias maps to src/, so @/i18n
// resolves to src/i18n.ts (the file, not the directory).
const { defaultLocale, getDirection, locales } = await import('@/i18n');

describe('i18n', () => {
  describe('getDirection', () => {
    it('returns "rtl" for Hebrew locale', () => {
      expect(getDirection('he')).toBe('rtl');
    });

    it('returns "ltr" for English locale', () => {
      expect(getDirection('en')).toBe('ltr');
    });
  });

  describe('defaultLocale', () => {
    it('is "he"', () => {
      expect(defaultLocale).toBe('he');
    });
  });

  describe('locales', () => {
    it('includes both "he" and "en"', () => {
      expect(locales).toContain('he');
      expect(locales).toContain('en');
    });

    it('has exactly 2 locales', () => {
      expect(locales).toHaveLength(2);
    });
  });
});
