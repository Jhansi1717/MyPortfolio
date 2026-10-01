import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../lib/utils';
import { EASE_CUSTOM, DURATION } from '../../utils/motionTokens';

export interface SectionHeadingProps {
  indexTag?: string;
  title: string;
  description?: string;
  alignment?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  indexTag,
  title,
  description,
  alignment = 'left',
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        alignment === 'center' ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-3xl',
        className
      )}
    >
      {indexTag && (
        <motion.div 
          initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: DURATION.COMPONENT, ease: EASE_CUSTOM }}
          className="flex items-center gap-2 mb-3"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" aria-hidden="true" />
          <span className="font-mono text-[11px] uppercase tracking-[0.10em] text-[#D49A46] font-semibold">
            {indexTag}
          </span>
        </motion.div>
      )}
      
      <motion.h2 
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: DURATION.SECTION, delay: 0.05, ease: EASE_CUSTOM }}
        className="font-display text-3xl sm:text-4xl md:text-5xl uppercase font-bold tracking-tight text-[#F2EBDD] leading-tight"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p 
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: DURATION.SECTION, delay: 0.1, ease: EASE_CUSTOM }}
          className="mt-6 text-base sm:text-lg text-[#AAA398] font-normal leading-relaxed max-w-2xl border-l border-[#292720] pl-6"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};
