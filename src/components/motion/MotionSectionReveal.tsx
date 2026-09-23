import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { sectionRevealVariants, reducedMotionVariants } from '../../animations/variants';

export interface MotionSectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delayIndex?: number;
  once?: boolean;
  margin?: string;
}

export const MotionSectionReveal: React.FC<MotionSectionRevealProps> = ({
  children,
  className = '',
  delayIndex = 0,
  once = true,
  margin = '-60px',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? reducedMotionVariants : sectionRevealVariants;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: margin as `${number}px` | `${number}%` }}
      custom={delayIndex}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};
