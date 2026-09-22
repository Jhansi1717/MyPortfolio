/**
 * Centralized Motion Tokens & Constants
 * Consistent timing, easing curves, and depth ratios for the portfolio card motion system.
 */

export const MOTION_TIMING = {
  fast: 0.22, // 220ms - micro-interactions, buttons, icons, arrows
  medium: 0.38, // 380ms - card hover states, tabs, line transitions
  slow: 0.65, // 650ms - viewport entrance reveals, layer shifts
} as const;

export const MOTION_EASING = {
  // Smooth cinematic curve for UI cards
  smooth: [0.25, 0.1, 0.25, 1.0] as const,
  // High-end editorial entry curve
  easeOut: [0.16, 1, 0.3, 1.0] as const,
  // Subtle deceleration for micro-motions
  gentle: [0.33, 1, 0.68, 1.0] as const,
} as const;

export const DEPTH_LAYERS = {
  content: 1, // 1px subtle shift
  visual: 4, // 3-4px architecture/visual shift
  decoration: 7, // 6-7px ambient lighting/accent shift
} as const;

/**
 * Reusable Card Scroll Reveal Variants
 */
export const cardEnterVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.985,
  },
  visible: (customIndex = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: MOTION_TIMING.slow,
      delay: customIndex * 0.08,
      ease: MOTION_EASING.smooth,
    },
  }),
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};
