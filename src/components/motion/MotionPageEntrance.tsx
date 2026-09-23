import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { pageEntranceVariants, reducedMotionVariants } from '../../animations/variants';

export interface MotionPageEntranceProps {
  children: React.ReactNode;
  className?: string;
}

export const MotionPageEntrance: React.FC<MotionPageEntranceProps> = ({
  children,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? reducedMotionVariants : pageEntranceVariants;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};
