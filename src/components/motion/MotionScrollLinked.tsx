import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

export interface MotionScrollLinkedProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // e.g. -20 to 20 px offset factor
}

export const MotionScrollLinked: React.FC<MotionScrollLinkedProps> = ({
  children,
  className = '',
  speed = 15,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const yTransform = useTransform(scrollYProgress, [0, 1], [-speed, speed]);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={containerRef} className={className}>
      <motion.div style={{ y: yTransform }}>{children}</motion.div>
    </div>
  );
};
