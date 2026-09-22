/**
 * Reusable motion variants for cinematic and accessible transitions
 */
import { MOTION_TIMING, MOTION_EASING, cardEnterVariants, staggerContainerVariants } from './motionTokens';

export { MOTION_TIMING, MOTION_EASING, cardEnterVariants, staggerContainerVariants };

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: MOTION_TIMING.medium, ease: MOTION_EASING.easeOut },
  },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION_TIMING.slow, ease: MOTION_EASING.easeOut },
  },
};

export const staggerContainer = staggerContainerVariants;

