import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export const HeroRoleSlider: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col justify-start select-none w-full min-w-0">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="font-mono text-[11px] sm:text-xs tracking-[0.05em] text-[#AAA398] uppercase font-normal mb-2"
      >
        I AM AN
      </motion.div>

      <motion.h1
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-[2.2rem] xs:text-[2.5rem] sm:text-[3.1rem] md:text-[3.6rem] lg:text-[4.25rem] xl:text-[5rem] 2xl:text-[5.4rem] font-bold uppercase tracking-[-0.03em] text-[#F2EBDD] leading-[0.98] whitespace-nowrap max-w-full"
      >
        AI / ML ENGINEER
      </motion.h1>

      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        className="mt-2 font-mono text-[10px] sm:text-[11px] md:text-xs uppercase tracking-[0.12em] text-[#8E887D] font-medium"
      >
        <span>FULL-STACK DEVELOPER</span>
        <span className="mx-2 text-[#D49A46]">·</span>
        <span>SOFTWARE ENGINEER</span>
      </motion.div>
    </div>
  );
};
