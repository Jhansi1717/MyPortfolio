import { useReducedMotion } from 'motion/react';
import {
  FAST,
  MEDIUM,
  SLOW,
  STAGGER,
  EASING,
  pageEntranceVariants,
  sectionRevealVariants,
  staggerContainerVariants,
  staggerItemVariants,
  hoverLiftVariants,
  buttonInteractionVariants,
  imageRevealVariants,
  textLineItemVariants,
  pageTransitionVariants,
  scrollLinkedVariants,
  reducedMotionVariants,
} from '../animations/variants';

/**
 * Centralized React Hook for the Portfolio Motion Design System
 * Provides single source of truth for motion tokens, reduced motion state, and variant presets.
 */
export function useMotionSystem() {
  const shouldReduceMotion = useReducedMotion();

  return {
    shouldReduceMotion: !!shouldReduceMotion,
    tokens: {
      FAST,
      MEDIUM,
      SLOW,
      STAGGER,
      EASING,
    },
    variants: {
      pageEntrance: shouldReduceMotion ? reducedMotionVariants : pageEntranceVariants,
      sectionReveal: shouldReduceMotion ? reducedMotionVariants : sectionRevealVariants,
      staggerContainer: shouldReduceMotion ? reducedMotionVariants : staggerContainerVariants,
      staggerItem: shouldReduceMotion ? reducedMotionVariants : staggerItemVariants,
      hoverLift: shouldReduceMotion ? reducedMotionVariants : hoverLiftVariants,
      buttonInteraction: shouldReduceMotion ? reducedMotionVariants : buttonInteractionVariants,
      imageReveal: shouldReduceMotion ? reducedMotionVariants : imageRevealVariants,
      textLineItem: shouldReduceMotion ? reducedMotionVariants : textLineItemVariants,
      pageTransition: shouldReduceMotion ? reducedMotionVariants : pageTransitionVariants,
      scrollLinked: shouldReduceMotion ? reducedMotionVariants : scrollLinkedVariants,
    },
  };
}
