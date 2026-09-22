import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ExternalLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  showIcon?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const ExternalLink: React.FC<ExternalLinkProps> = ({
  href,
  showIcon = true,
  className = '',
  children,
  ...props
}) => {
  const isExternal = href.startsWith('http') || href.startsWith('mailto:');

  return (
    <a
      href={href}
      target={isExternal && !href.startsWith('mailto:') ? '_blank' : undefined}
      rel={isExternal && !href.startsWith('mailto:') ? 'noopener noreferrer' : undefined}
      className={cn(
        'inline-flex items-center gap-1 text-[#F2EBDD] font-mono text-sm underline-offset-4 decoration-[#292720] hover:decoration-[#D49A46] hover:text-[#E5BA70] transition-colors duration-150',
        'focus-visible:outline-2 focus-visible:outline-[#D49A46] focus-visible:outline-offset-2 rounded-xs',
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {showIcon && isExternal && (
        <ArrowUpRight className="w-3.5 h-3.5 opacity-70 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </a>
  );
};
