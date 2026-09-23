import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { hoverLiftVariants, reducedMotionVariants } from '../../animations/variants';

export interface MotionHoverLiftProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export const MotionHoverLift: React.FC<MotionHoverLiftProps> = ({
  children,
  className = '',
  onClick,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? reducedMotionVariants : hoverLiftVariants;

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={variants}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};
