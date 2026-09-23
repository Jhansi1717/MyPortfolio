import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  staggerContainerVariants,
  staggerItemVariants,
  reducedMotionVariants,
} from '../../animations/variants';

export interface MotionStaggerProps {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
}

export const MotionStagger: React.FC<MotionStaggerProps> = ({
  children,
  className = '',
  once = true,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? reducedMotionVariants : staggerContainerVariants;

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

export interface MotionStaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export const MotionStaggerItem: React.FC<MotionStaggerItemProps> = ({
  children,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? reducedMotionVariants : staggerItemVariants;

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
};
