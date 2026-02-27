/**
 * Typography System with Responsive Scaling
 * Uses CSS clamp() for fluid typography
 * Scales from mobile (375px) to desktop (1920px)
 */

export const TYPOGRAPHY_SCALE = {
  // Hero Section
  HERO_NAME: {
    size: "clamp(2.5rem, 8vw, 8rem)",
    lineHeight: "0.9",
    weight: 700,
    letterSpacing: "-0.02em",
  },

  HERO_TITLE: {
    size: "clamp(1.25rem, 3vw, 3rem)",
    lineHeight: "1.2",
    weight: 400,
    letterSpacing: "0.02em",
  },

  // Quote
  QUOTE: {
    size: "clamp(1rem, 2.5vw, 1.75rem)",
    lineHeight: "1.6",
    weight: 400,
    letterSpacing: "0.01em",
  },

  // Heading 1
  H1: {
    size: "clamp(1.75rem, 4vw, 3rem)",
    lineHeight: "1.2",
    weight: 700,
    letterSpacing: "-0.01em",
  },

  // Heading 2
  H2: {
    size: "clamp(1.25rem, 3vw, 2rem)",
    lineHeight: "1.3",
    weight: 600,
    letterSpacing: "-0.005em",
  },

  // Body
  BODY_LARGE: {
    size: "clamp(1rem, 1.5vw, 1.25rem)",
    lineHeight: "1.6",
    weight: 400,
    letterSpacing: "0.005em",
  },

  BODY: {
    size: "clamp(0.95rem, 1.2vw, 1.125rem)",
    lineHeight: "1.6",
    weight: 400,
    letterSpacing: "0",
  },

  // Small Text
  SMALL: {
    size: "clamp(0.875rem, 1vw, 1rem)",
    lineHeight: "1.5",
    weight: 400,
    letterSpacing: "0.01em",
  },

  // Caption
  CAPTION: {
    size: "clamp(0.75rem, 0.9vw, 0.875rem)",
    lineHeight: "1.4",
    weight: 500,
    letterSpacing: "0.02em",
  },
};

/**
 * Utility to create CSS for typography styles
 */
export const createTypographyCSS = (scale: typeof TYPOGRAPHY_SCALE.H1) => {
  return `
    font-size: ${scale.size};
    line-height: ${scale.lineHeight};
    font-weight: ${scale.weight};
    letter-spacing: ${scale.letterSpacing};
  `;
};

/**
 * Font stack recommendations (to import separately)
 */
export const FONT_STACKS = {
  DISPLAY: '"Satoshi", "Inter Tight", system-ui, sans-serif',
  BODY: '"Inter", "General Sans", system-ui, sans-serif',
  MONO: '"Fira Code", "Courier New", monospace',
};
