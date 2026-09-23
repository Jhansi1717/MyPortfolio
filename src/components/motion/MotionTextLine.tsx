import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  textLineContainerVariants,
  textLineItemVariants,
  reducedMotionVariants,
} from '../../animations/variants';

export interface MotionTextLineProps {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
}

export const MotionTextLine: React.FC<MotionTextLineProps> = ({
  children,
  className = '',
  once = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-30px' }}
      variants={textLineContainerVariants}
      className={`overflow-hidden ${className}`}
    >
      <motion.div variants={textLineItemVariants}>{children}</motion.div>
    </motion.div>
  );
};
