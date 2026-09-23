/**
 * Centralized Motion Variants
 * Provides performant, GPU-accelerated motion variant definitions using transform & opacity.
 * Fully supports prefers-reduced-motion fallbacks.
 */

import {
  FAST,
  MEDIUM,
  SLOW,
  STAGGER,
  EASING,
  MOTION_TIMING,
  MOTION_EASING,
} from './motionTokens';

export {
  FAST,
  MEDIUM,
  SLOW,
  STAGGER,
  EASING,
  MOTION_TIMING,
  MOTION_EASING,
};

/**
 * 1. Page Entrance
 */
export const pageEntranceVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: SLOW,
      ease: EASING.easeOut,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: FAST,
      ease: EASING.easeOut,
    },
  },
};

/**
 * 2. Section Reveal
 */
export const sectionRevealVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: (customIndex = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: SLOW,
      delay: customIndex * STAGGER.medium,
      ease: EASING.easeOut,
    },
  }),
};

/**
 * 3. Stagger Reveal
 */
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER.medium,
      delayChildren: STAGGER.fast,
    },
  },
};

export const staggerItemVariants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MEDIUM,
      ease: EASING.easeOut,
    },
  },
};

/**
 * 4. Hover Lift
 */
export const hoverLiftVariants = {
  rest: {
    y: 0,
    scale: 1,
  },
  hover: {
    y: -4,
    scale: 1.01,
    transition: {
      duration: MEDIUM,
      ease: EASING.easeOut,
    },
  },
  tap: {
    y: -1,
    scale: 0.995,
    transition: {
      duration: FAST,
      ease: EASING.easeOut,
    },
  },
};

/**
 * 5. Button Interaction
 */
export const buttonInteractionVariants = {
  rest: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.02,
    y: -1,
    transition: {
      duration: FAST,
      ease: EASING.easeOut,
    },
  },
  tap: {
    scale: 0.97,
    y: 0,
    transition: {
      duration: FAST,
      ease: EASING.easeOut,
    },
  },
};

/**
 * 6. Image Reveal
 */
export const imageRevealVariants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: SLOW,
      ease: EASING.easeOut,
    },
  },
};

/**
 * 7. Text Line Reveal (Masked vertical line reveal)
 */
export const textLineContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER.fast,
    },
  },
};

export const textLineItemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MEDIUM,
      ease: EASING.easeOut,
    },
  },
};

/**
 * 8. Page Transition
 */
export const pageTransitionVariants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: SLOW,
      ease: EASING.easeOut,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: FAST,
      ease: EASING.easeOut,
    },
  },
};

/**
 * 9. Scroll-Linked Movement Helper Variants
 */
export const scrollLinkedVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: SLOW,
      ease: EASING.easeOut,
    },
  },
};

/**
 * 10. Reduced Motion Fallback
 * Disables transform shifts, uses immediate 0ms fade to maintain instant accessibility.
 */
export const reducedMotionVariants = {
  hidden: {
    opacity: 0,
    x: 0,
    y: 0,
    scale: 1,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.01,
    },
  },
  hover: {
    x: 0,
    y: 0,
    scale: 1,
  },
  tap: {
    x: 0,
    y: 0,
    scale: 1,
  },
};

// Legacy exports for backwards compatibility
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: MEDIUM, ease: EASING.easeOut },
  },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: SLOW, ease: EASING.easeOut },
  },
};

export const cardEnterVariants = sectionRevealVariants;
export const staggerContainer = staggerContainerVariants;
