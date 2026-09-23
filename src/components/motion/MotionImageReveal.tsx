import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { imageRevealVariants, reducedMotionVariants } from '../../animations/variants';

export interface MotionImageRevealProps {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
}

export const MotionImageReveal: React.FC<MotionImageRevealProps> = ({
  children,
  className = '',
  once = true,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? reducedMotionVariants : imageRevealVariants;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-40px' }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};
