import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

interface RoleItem {
  article: string;
  title: string;
}

const ROLES: RoleItem[] = [
  { article: 'I AM AN', title: 'AI/ML ENGINEER' },
  { article: 'I AM A', title: 'SOFTWARE ENGINEER' },
  { article: 'I AM A', title: 'FULL-STACK ENGINEER' },
];

export const HeroRoleSlider: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;

    // 2100ms hold (within 1900–2300ms) + 550ms transition = 2650ms total cycle
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2650);

    return () => clearInterval(timer);
  }, [shouldReduceMotion]);

  const currentRole = ROLES[roleIndex];

  if (shouldReduceMotion) {
    return (
      <div className="flex flex-col justify-start select-none w-full">
        {/* Subtle, quiet label */}
        <div className="h-5 sm:h-6 mb-2 flex items-center justify-center lg:justify-start font-mono text-[11px] sm:text-xs tracking-[0.05em] text-[#6E6A62] uppercase font-normal">
          I AM AN
        </div>
        <div className="font-display text-[2.2rem] xs:text-[2.5rem] sm:text-[3.1rem] md:text-[3.6rem] lg:text-[4.25rem] xl:text-[5rem] 2xl:text-[5.4rem] font-bold uppercase tracking-[-0.03em] text-[#F2EBDD] leading-[0.96] whitespace-nowrap min-h-[1.2em] flex items-center justify-center lg:justify-start">
          AI/ML ENGINEER
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start select-none w-full">
      {/* 1. Grammatically Correct Article Header — Quiet, Low-Opacity Label Above Role */}
      <div className="h-5 sm:h-6 relative overflow-hidden mb-2 flex justify-center lg:justify-start">
        <AnimatePresence mode="wait">
          <motion.div
            key={`article-${roleIndex}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-[11px] sm:text-xs tracking-[0.05em] text-[#6E6A62] uppercase font-normal flex items-center"
          >
            {currentRole.article}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. Main Title - Dominant Visual Anchor, Phrase-Level Transitions (y: 10 -> 0 -> -10) */}
      <div className="relative h-[1.2em] flex items-center overflow-hidden justify-center lg:justify-start w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={`title-${roleIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[2.2rem] xs:text-[2.5rem] sm:text-[3.1rem] md:text-[3.6rem] lg:text-[4.25rem] xl:text-[5rem] 2xl:text-[5.4rem] font-bold uppercase tracking-[-0.03em] text-[#F2EBDD] leading-[0.96] absolute inset-x-0 whitespace-nowrap text-center lg:text-left"
          >
            {currentRole.title}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
