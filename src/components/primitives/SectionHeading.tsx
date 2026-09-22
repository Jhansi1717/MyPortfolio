import React from 'react';
import { cn } from '../../lib/utils';

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
  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        alignment === 'center' ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-3xl',
        className
      )}
    >
      {indexTag && (
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#D49A46]">
            {indexTag}
          </span>
        </div>
      )}
      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase font-bold tracking-tight text-[#F2EBDD] leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-[#AAA398] font-normal leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
};
