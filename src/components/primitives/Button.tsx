import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'right',
      className = '',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const [offset, setOffset] = React.useState({ x: 0, y: 0 });
    const [isTouch, setIsTouch] = React.useState(false);

    // Combine forwarded ref and local ref
    React.useImperativeHandle(ref, () => buttonRef.current!);

    React.useEffect(() => {
      const touchCheck = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
      setIsTouch(touchCheck);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || isTouch) return;
      const rect = buttonRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate delta from center
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      // Limit to very subtle maximum 4px magnetic drag
      const maxMagneticTranslation = 4;
      const pullX = (deltaX / (rect.width / 2)) * maxMagneticTranslation;
      const pullY = (deltaY / (rect.height / 2)) * maxMagneticTranslation;
      
      setOffset({
        x: Math.max(-maxMagneticTranslation, Math.min(maxMagneticTranslation, pullX)),
        y: Math.max(-maxMagneticTranslation, Math.min(maxMagneticTranslation, pullY)),
      });
    };

    const handleMouseLeave = () => {
      setOffset({ x: 0, y: 0 });
    };

    // 2x horizontal padding rule strictly applied:
    // sm: py-2 px-4 (8px vertical, 16px horizontal)
    // md: py-2.5 px-5 (10px vertical, 20px horizontal)
    // lg: py-3 px-6 (12px vertical, 24px horizontal)
    const sizeClasses = {
      sm: 'py-2 px-4 text-xs tracking-wider',
      md: 'py-2.5 px-5 text-sm tracking-wide',
      lg: 'py-3 px-6 text-sm tracking-wider font-medium',
    };

    const variantClasses = {
      primary:
        'bg-[#D49A46] text-[#090907] font-semibold hover:bg-[#E5BA70] border border-[#D49A46] shadow-[0_2px_12px_rgba(212,154,70,0.15)] hover:shadow-[0_4px_16px_rgba(212,154,70,0.25)] md:hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
      secondary:
        'bg-[#171612] text-[#F2EBDD] border border-[#292720] hover:border-[#D49A46] hover:bg-[#1E1D18] hover:text-[#E5BA70] md:hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
      outline:
        'bg-transparent text-[#F2EBDD] border border-[#292720] hover:border-[#D49A46] hover:text-[#E5BA70] md:hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
      ghost:
        'bg-transparent text-[#AAA398] hover:text-[#F2EBDD] hover:bg-[#171612] border border-transparent md:hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
    };

    return (
      <button
        ref={buttonRef}
        disabled={disabled}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          transition: offset.x === 0 && offset.y === 0 
            ? 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)' 
            : 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
        className={cn(
          'group inline-flex items-center justify-center gap-2.5 rounded-sm uppercase font-mono cursor-pointer select-none whitespace-nowrap',
          'focus-visible:outline-2 focus-visible:outline-[#D49A46] focus-visible:outline-offset-2',
          'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {icon && iconPosition === 'left' && (
          <span className="inline-flex shrink-0 transition-transform duration-250 group-hover:-translate-x-1">
            {icon}
          </span>
        )}
        <span className="truncate">{children}</span>
        {icon && iconPosition === 'right' && (
          <span className="inline-flex shrink-0 transition-transform duration-250 group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
