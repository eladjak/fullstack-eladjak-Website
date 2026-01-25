/**
 * Material Design 3 Design Tokens
 *
 * Based on Material Design 3 principles:
 * - HCT (Hue, Chroma, Tone) color space for perceptual accuracy
 * - Dynamic color system with source color generation
 * - 15-level typography scale from Display to Label
 * - 4dp baseline grid for spacing
 *
 * These tokens should be used throughout the application for consistency.
 */

// ============================================================================
// COLOR TOKENS - Material Design 3 Color Roles
// ============================================================================

export const colorTokens = {
  light: {
    // Primary colors - main brand color
    primary: '#8B5CF6',           // Purple-600 from design
    onPrimary: '#FFFFFF',
    primaryContainer: '#EDE9FE',  // Purple-100
    onPrimaryContainer: '#4C1D95', // Purple-900

    // Secondary colors - complementary to primary
    secondary: '#6D28D9',         // Purple-700
    onSecondary: '#FFFFFF',
    secondaryContainer: '#DDD6FE', // Purple-200
    onSecondaryContainer: '#5B21B6', // Purple-800

    // Tertiary colors - accent color
    tertiary: '#A78BFA',          // Purple-400
    onTertiary: '#1F2937',
    tertiaryContainer: '#F5F3FF',  // Purple-50
    onTertiaryContainer: '#6D28D9',

    // Error colors
    error: '#DC2626',             // Red-600
    onError: '#FFFFFF',
    errorContainer: '#FEE2E2',    // Red-100
    onErrorContainer: '#991B1B',   // Red-800

    // Surface colors - backgrounds and cards
    surface: '#FFFFFF',
    onSurface: '#1F2937',          // Gray-800
    surfaceVariant: '#F9FAFB',     // Gray-50
    onSurfaceVariant: '#6B7280',   // Gray-500

    // Container colors
    surfaceContainer: '#F3F4F6',   // Gray-100
    surfaceContainerHigh: '#E5E7EB', // Gray-200
    surfaceContainerHighest: '#D1D5DB', // Gray-300
    surfaceContainerLow: '#FAFAFA',
    surfaceContainerLowest: '#FFFFFF',

    // Background
    background: '#FFFFFF',
    onBackground: '#1F2937',

    // Outline and borders
    outline: '#D1D5DB',            // Gray-300
    outlineVariant: '#E5E7EB',     // Gray-200

    // Inverse colors (for dark elements on light background)
    inverseSurface: '#1F2937',
    onInverseSurface: '#F9FAFB',
    inversePrimary: '#A78BFA',

    // Scrim (overlay)
    scrim: 'rgba(0, 0, 0, 0.5)',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },

  dark: {
    // Primary colors - adjusted for dark mode
    primary: '#A78BFA',           // Purple-400 (lighter for contrast)
    onPrimary: '#4C1D95',         // Purple-900 (dark on light primary)
    primaryContainer: '#6D28D9',   // Purple-700
    onPrimaryContainer: '#EDE9FE', // Purple-100

    // Secondary colors
    secondary: '#8B5CF6',         // Purple-600
    onSecondary: '#1F2937',
    secondaryContainer: '#5B21B6', // Purple-800
    onSecondaryContainer: '#DDD6FE',

    // Tertiary colors
    tertiary: '#C4B5FD',          // Purple-300
    onTertiary: '#4C1D95',
    tertiaryContainer: '#6D28D9',
    onTertiaryContainer: '#F5F3FF',

    // Error colors
    error: '#F87171',             // Red-400
    onError: '#7F1D1D',           // Red-900
    errorContainer: '#991B1B',
    onErrorContainer: '#FEE2E2',

    // Surface colors - dark backgrounds
    surface: '#111827',           // Gray-900
    onSurface: '#F9FAFB',         // Gray-50
    surfaceVariant: '#1F2937',    // Gray-800
    onSurfaceVariant: '#D1D5DB',  // Gray-300

    // Container colors
    surfaceContainer: '#1F2937',   // Gray-800
    surfaceContainerHigh: '#374151', // Gray-700
    surfaceContainerHighest: '#4B5563', // Gray-600
    surfaceContainerLow: '#0F172A',  // Slate-900
    surfaceContainerLowest: '#0C0A09', // Stone-950

    // Background
    background: '#09090B',        // Zinc-950
    onBackground: '#FAFAFA',

    // Outline and borders
    outline: '#4B5563',           // Gray-600
    outlineVariant: '#374151',    // Gray-700

    // Inverse colors (for light elements on dark background)
    inverseSurface: '#F9FAFB',
    onInverseSurface: '#1F2937',
    inversePrimary: '#8B5CF6',

    // Scrim
    scrim: 'rgba(0, 0, 0, 0.7)',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
};

// ============================================================================
// TYPOGRAPHY TOKENS - Material Design 3 Type Scale
// ============================================================================

export const typographyTokens = {
  // Display styles - largest, for hero sections
  displayLarge: {
    fontSize: '3.5625rem',    // 57px
    lineHeight: '4rem',       // 64px
    fontWeight: '400',
    letterSpacing: '-0.015625rem', // -0.25px
    family: 'var(--font-geist-sans)',
  },
  displayMedium: {
    fontSize: '2.8125rem',    // 45px
    lineHeight: '3.25rem',    // 52px
    fontWeight: '400',
    letterSpacing: '0',
    family: 'var(--font-geist-sans)',
  },
  displaySmall: {
    fontSize: '2.25rem',      // 36px
    lineHeight: '2.75rem',    // 44px
    fontWeight: '400',
    letterSpacing: '0',
    family: 'var(--font-geist-sans)',
  },

  // Headline styles - for major sections
  headlineLarge: {
    fontSize: '2rem',         // 32px
    lineHeight: '2.5rem',     // 40px
    fontWeight: '600',
    letterSpacing: '0',
    family: 'var(--font-geist-sans)',
  },
  headlineMedium: {
    fontSize: '1.75rem',      // 28px
    lineHeight: '2.25rem',    // 36px
    fontWeight: '600',
    letterSpacing: '0',
    family: 'var(--font-geist-sans)',
  },
  headlineSmall: {
    fontSize: '1.5rem',       // 24px
    lineHeight: '2rem',       // 32px
    fontWeight: '600',
    letterSpacing: '0',
    family: 'var(--font-geist-sans)',
  },

  // Title styles - for cards and dialogs
  titleLarge: {
    fontSize: '1.375rem',     // 22px
    lineHeight: '1.75rem',    // 28px
    fontWeight: '500',
    letterSpacing: '0',
    family: 'var(--font-geist-sans)',
  },
  titleMedium: {
    fontSize: '1rem',         // 16px
    lineHeight: '1.5rem',     // 24px
    fontWeight: '500',
    letterSpacing: '0.009375rem', // 0.15px
    family: 'var(--font-geist-sans)',
  },
  titleSmall: {
    fontSize: '0.875rem',     // 14px
    lineHeight: '1.25rem',    // 20px
    fontWeight: '500',
    letterSpacing: '0.00625rem', // 0.1px
    family: 'var(--font-geist-sans)',
  },

  // Body styles - for content
  bodyLarge: {
    fontSize: '1rem',         // 16px
    lineHeight: '1.5rem',     // 24px
    fontWeight: '400',
    letterSpacing: '0.03125rem', // 0.5px
    family: 'var(--font-geist-sans)',
  },
  bodyMedium: {
    fontSize: '0.875rem',     // 14px
    lineHeight: '1.25rem',    // 20px
    fontWeight: '400',
    letterSpacing: '0.015625rem', // 0.25px
    family: 'var(--font-geist-sans)',
  },
  bodySmall: {
    fontSize: '0.75rem',      // 12px
    lineHeight: '1rem',       // 16px
    fontWeight: '400',
    letterSpacing: '0.025rem', // 0.4px
    family: 'var(--font-geist-sans)',
  },

  // Label styles - for buttons and tabs
  labelLarge: {
    fontSize: '0.875rem',     // 14px
    lineHeight: '1.25rem',    // 20px
    fontWeight: '500',
    letterSpacing: '0.00625rem', // 0.1px
    family: 'var(--font-geist-sans)',
  },
  labelMedium: {
    fontSize: '0.75rem',      // 12px
    lineHeight: '1rem',       // 16px
    fontWeight: '500',
    letterSpacing: '0.03125rem', // 0.5px
    family: 'var(--font-geist-sans)',
  },
  labelSmall: {
    fontSize: '0.6875rem',    // 11px
    lineHeight: '1rem',       // 16px
    fontWeight: '500',
    letterSpacing: '0.03125rem', // 0.5px
    family: 'var(--font-geist-sans)',
  },
};

// Helper function to generate typography CSS class
export function getTypographyStyle(level: keyof typeof typographyTokens): string {
  const style = typographyTokens[level];
  return `font-size: ${style.fontSize}; line-height: ${style.lineHeight}; font-weight: ${style.fontWeight}; letter-spacing: ${style.letterSpacing}; font-family: ${style.family};`;
}

// ============================================================================
// SPACING TOKENS - Material Design 3 (4dp baseline grid)
// ============================================================================

export const spacingTokens = {
  // Base 4dp unit = 0.25rem (4px)
  xs: '0.25rem',      // 4px
  sm: '0.5rem',       // 8px
  md: '0.75rem',      // 12px
  lg: '1rem',         // 16px
  xl: '1.5rem',       // 24px
  '2xl': '2rem',      // 32px
  '3xl': '3rem',      // 48px
  '4xl': '4rem',      // 64px
  '5xl': '6rem',      // 96px
  '6xl': '8rem',      // 128px

  // Semantic spacing names
  componentGap: '1rem',        // Gap between component elements
  sectionGap: '2rem',          // Gap between sections
  cardPadding: '1.5rem',       // Padding inside cards
  buttonPadding: '0.75rem 1.5rem', // Button padding
  inputPadding: '0.75rem 1rem',    // Input padding
  iconSize: '1.5rem',          // Standard icon size
  iconSizeSm: '1rem',          // Small icon size
  iconSizeLg: '2rem',          // Large icon size
};

// ============================================================================
// ELEVATION TOKENS - Shadow system
// ============================================================================

export const elevationTokens = {
  level0: 'none',
  level1: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  level2: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  level3: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  level4: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  level5: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
};

// ============================================================================
// SHAPE TOKENS - Border radius
// ============================================================================

export const shapeTokens = {
  none: '0',
  xs: '0.25rem',      // 4px - small chips
  sm: '0.375rem',     // 6px - buttons
  md: '0.5rem',       // 8px - cards
  lg: '0.75rem',      // 12px - larger cards
  xl: '1rem',         // 16px - dialogs
  '2xl': '1.5rem',    // 24px - special components
  full: '9999px',     // Fully rounded

  // Semantic names
  button: '0.5rem',
  card: '0.75rem',
  input: '0.5rem',
  dialog: '1rem',
  chip: '9999px',
};

// ============================================================================
// MOTION TOKENS - Animation durations and easings
// ============================================================================

export const motionTokens = {
  duration: {
    short1: '50ms',
    short2: '100ms',
    short3: '150ms',
    short4: '200ms',
    medium1: '250ms',
    medium2: '300ms',
    medium3: '350ms',
    medium4: '400ms',
    long1: '450ms',
    long2: '500ms',
    long3: '550ms',
    long4: '600ms',
    extraLong1: '700ms',
    extraLong2: '800ms',
    extraLong3: '900ms',
    extraLong4: '1000ms',
  },

  easing: {
    standard: 'cubic-bezier(0.2, 0, 0, 1)',
    emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
    emphasizedDecelerate: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
    emphasizedAccelerate: 'cubic-bezier(0.3, 0, 0.8, 0.15)',
    linear: 'linear',
  },
};

// ============================================================================
// RESPONSIVE BREAKPOINTS
// ============================================================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get color token value for current theme
 */
export function getColorToken(
  role: keyof typeof colorTokens.light,
  theme: 'light' | 'dark' = 'light'
): string {
  return colorTokens[theme][role];
}

/**
 * Generate CSS custom properties from tokens
 */
export function generateCSSVariables(theme: 'light' | 'dark' = 'light'): Record<string, string> {
  const colors = colorTokens[theme];
  const vars: Record<string, string> = {};

  Object.entries(colors).forEach(([key, value]) => {
    // Convert camelCase to kebab-case
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    vars[`--md-${cssKey}`] = value;
  });

  return vars;
}
