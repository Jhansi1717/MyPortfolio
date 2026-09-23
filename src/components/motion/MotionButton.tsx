import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { buttonInteractionVariants, reducedMotionVariants } from '../../animations/variants';

export interface MotionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const MotionButton: React.FC<MotionButtonProps> = ({
  children,
  className = '',
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? reducedMotionVariants : buttonInteractionVariants;

  return (
    <motion.button
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={variants}
      className={className}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
};
