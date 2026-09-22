import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'outline' | 'status';
  size?: 'sm' | 'md';
  className?: string;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-3 py-1 text-xs',
  };

  const variantClasses = {
    default: 'bg-[#171612] text-[#AAA398] border border-[#292720]',
    accent: 'bg-[#D49A46]/10 text-[#E5BA70] border border-[#D49A46]/30',
    outline: 'bg-transparent text-[#F2EBDD] border border-[#292720]',
    status: 'bg-[#11110E] text-[#4ADE80] border border-[#4ADE80]/30',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-mono tracking-wider uppercase rounded-xs whitespace-nowrap select-none',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {variant === 'status' && (
        <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
      )}
      {children}
    </span>
  );
};
