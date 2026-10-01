/**
 * Global Motion Design Tokens & Timing System
 * Enforces a consistent, cinematic, and restrained motion language across the portfolio.
 */

// Centralized Cubic Bezier Easing Curves
export const EASE_CUSTOM = [0.16, 1, 0.3, 1] as const;
export const EASE_SMOOTH = [0.25, 0.1, 0.25, 1.0] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

// Centralized Timing Hierarchy
export const DURATION = {
  MICRO: 0.2,        // 150–250ms (buttons, links, icons, hover feedback)
  COMPONENT: 0.35,   // 250–450ms (card reveals, drawer transitions, tabs)
  SECTION: 0.55,     // 400–700ms (section headings, staggered content groups)
  HERO: 0.75,        // 600–1200ms (hero choreography entrance)
} as const;

// Reusable Section Reveal Variants
export const createSectionReveal = (shouldReduceMotion: boolean | null, delay: number = 0) => {
  if (shouldReduceMotion) {
    return {
      initial: { opacity: 1, y: 0 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: '-40px' },
      transition: { duration: 0.01 },
    };
  }

  return {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: {
      duration: DURATION.SECTION,
      delay,
      ease: EASE_CUSTOM,
    },
  };
};

// Reusable Stagger Container Variants
export const createStaggerContainer = (staggerDelay: number = 0.08, delayChildren: number = 0.02) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

// Reusable Stagger Item Variants
export const createStaggerItem = (shouldReduceMotion: boolean | null, distance: number = 12) => {
  if (shouldReduceMotion) {
    return {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0 },
    };
  }

  return {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: DURATION.SECTION,
        ease: EASE_CUSTOM,
      },
    },
  };
};
