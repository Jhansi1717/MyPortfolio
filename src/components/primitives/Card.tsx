import React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'surface' | 'secondary' | 'ghost';
  interactive?: boolean;
  accentLine?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'surface',
  interactive = false,
  accentLine = false,
  className = '',
  children,
  ...props
}) => {
  const variantClasses = {
    surface: 'bg-[#11110E] border-[#292720]',
    secondary: 'bg-[#171612] border-[#292720]',
    ghost: 'bg-transparent border-[#292720]',
  };

  return (
    <div
      className={cn(
        'relative rounded-sm border p-6 md:p-8 transition-all duration-380 ease-[cubic-bezier(0.25,0.1,0.25,1.0)]',
        variantClasses[variant],
        interactive &&
          'hover:border-[#D49A46]/50 hover:bg-[#14130F] md:hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.4)] cursor-pointer group',
        className
      )}
      {...props}
    >
      {/* Animated Top Accent Line (Left to Right) */}
      {(accentLine || interactive) && (
        <div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#D49A46] via-[#E5BA70] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] origin-left pointer-events-none"
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
};

