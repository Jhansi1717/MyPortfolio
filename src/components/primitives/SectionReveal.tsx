import React, { useEffect, useState, useRef } from 'react';
import { cn } from '../../lib/utils';

export interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  showLineReveal?: boolean;
}

export const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  className = '',
  delay = 0,
  showLineReveal = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    if (motionQuery.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (domRef.current) observer.unobserve(domRef.current);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1,
      }
    );

    const currentEl = domRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) observer.unobserve(currentEl);
    };
  }, []);

  if (prefersReducedMotion) {
    return (
      <div className={className}>
        {showLineReveal && (
          <div className="w-full h-px bg-[#292720] mb-8" aria-hidden="true" />
        )}
        {children}
      </div>
    );
  }

  return (
    <div
      ref={domRef}
      className={cn(
        'transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6 pointer-events-none',
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {showLineReveal && (
        <div
          className={cn(
            'h-px bg-gradient-to-r from-[#D49A46]/60 via-[#292720] to-transparent mb-8 transition-all duration-1000 ease-out origin-left',
            isVisible ? 'w-full scale-x-100 opacity-100' : 'w-0 scale-x-0 opacity-0'
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
};
