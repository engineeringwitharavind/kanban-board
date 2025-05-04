import { createGlobalStyle } from 'styled-components';
import { COLORS, SPACING, TYPOGRAPHY } from '@constants';

const GlobalStyles = createGlobalStyle`
  :root {
    --color-background: ${COLORS.background};
    --color-surface: ${COLORS.surface};
    --color-surface-frosted: ${COLORS.surfaceFrosted};
    --color-text-primary: ${COLORS.textPrimary};
    --color-text-secondary: ${COLORS.textSecondary};
    --color-accent: ${COLORS.accent};
    --color-accent-hover: ${COLORS.accentHover};
    --color-danger: ${COLORS.danger};
    --color-success: ${COLORS.success};
    --color-border: ${COLORS.border};
    --color-shadow: ${COLORS.shadow};
    --color-disabled: ${COLORS.disabled};
    --color-white: ${COLORS.white};
    --color-gray100: ${COLORS.gray100};
    --color-gray300: ${COLORS.gray300};
    --color-gray500: ${COLORS.gray500};
    --color-gray700: ${COLORS.gray700};
    --color-gray900: ${COLORS.gray900};
    --color-gradient-accent: ${COLORS.accent};
    --spacing-xs: ${SPACING.xs};
    --spacing-sm: ${SPACING.sm};
    --spacing-md: ${SPACING.md};
    --spacing-lg: ${SPACING.lg};
    --spacing-xl: ${SPACING.xl};
    --font-family: ${TYPOGRAPHY.fontFamily};
    --font-size-xs: ${TYPOGRAPHY.fontSize.xs};
    --font-size-sm: ${TYPOGRAPHY.fontSize.sm};
    --font-size-md: ${TYPOGRAPHY.fontSize.md};
    --font-size-lg: ${TYPOGRAPHY.fontSize.lg};
    --font-size-xl: ${TYPOGRAPHY.fontSize.xl};
    --font-weight-regular: ${TYPOGRAPHY.fontWeight.regular};
    --font-weight-medium: ${TYPOGRAPHY.fontWeight.medium};
    --font-weight-bold: ${TYPOGRAPHY.fontWeight.bold};
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: var(--color-background);
    color: var(--color-text-primary);
    font-family: var(--font-family);
    font-size: var(--font-size-md);
    line-height: 1.5;
    contain: content;
    &.is-dragging {
      overflow: hidden;
    }
  }

  button,
  input,
  select,
  textarea {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation: none !important;
      transition: none !important;
    }
  }
`;

export default GlobalStyles;
