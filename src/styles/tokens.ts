/**
 * Design Tokens for Jhansi Bhukya Portfolio
 * Strict design system specifications for dark cinematic aesthetic
 */

export const tokens = {
  colors: {
    background: '#090907',
    surface: '#11110E',
    surfaceSecondary: '#171612',
    surfaceHover: '#1E1D18',
    textPrimary: '#F2EBDD',
    textSecondary: '#AAA398',
    textMuted: '#68645C',
    border: '#292720',
    borderLight: '#3A372E',
    accent: '#D49A46',
    accentLight: '#E5BA70',
    accentDim: 'rgba(212, 154, 70, 0.12)',
    accentGlow: 'rgba(212, 154, 70, 0.25)',
    statusGreen: '#4ADE80',
  },
  typography: {
    fontDisplay: "'Syne', sans-serif",
    fontBody: "'Outfit', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    sizes: {
      hero: 'clamp(2.5rem, 6vw, 4.5rem)',
      display: 'clamp(2rem, 4vw, 3rem)',
      h1: 'clamp(1.75rem, 3vw, 2.25rem)',
      h2: 'clamp(1.35rem, 2vw, 1.75rem)',
      h3: '1.25rem',
      bodyLg: '1.125rem',
      body: '1rem',
      bodySm: '0.875rem',
      caption: '0.75rem',
      hudTag: '0.7rem',
    },
    lineHeights: {
      tight: 1.1,
      heading: 1.25,
      body: 1.6,
      relaxed: 1.75,
    },
  },
  spacing: {
    sectionPadding: 'py-20 md:py-28 lg:py-32',
    sectionGap: 'gap-12 md:gap-16 lg:gap-20',
    containerPadding: 'px-4 sm:px-6 md:px-8 lg:px-12',
  },
  borders: {
    radiusSm: '4px',
    radiusMd: '8px',
    radiusLg: '12px',
    radiusPill: '9999px',
  },
  transitions: {
    fast: '150ms cubic-bezier(0.16, 1, 0.3, 1)',
    normal: '250ms cubic-bezier(0.16, 1, 0.3, 1)',
    smooth: '400ms cubic-bezier(0.16, 1, 0.3, 1)',
  },
} as const;

export type DesignTokens = typeof tokens;
