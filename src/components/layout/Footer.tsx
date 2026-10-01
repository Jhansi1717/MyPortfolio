import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { profileData, authoritativeProfile } from '../../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      label: 'GitHub',
      href: authoritativeProfile.github.profileUrl,
      icon: <Github className="w-3.5 h-3.5" />,
      external: true,
    },
    {
      label: 'LinkedIn',
      href: authoritativeProfile.linkedin.profileUrl,
      icon: <Linkedin className="w-3.5 h-3.5" />,
      external: true,
    },
    {
      label: 'LeetCode',
      href: authoritativeProfile.leetcode.profileUrl,
      icon: <ExternalLink className="w-3.5 h-3.5" />,
      external: true,
    },
    {
      label: 'Email',
      href: `mailto:${authoritativeProfile.email}`,
      icon: <Mail className="w-3.5 h-3.5" />,
      external: false,
    },
  ];

  return (
    <footer className="border-t border-[#292720] bg-[#090907] text-[#AAA398] py-8 sm:py-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#1E1D18]">
          
          {/* Identity: Name & Role */}
          <div>
            <div className="font-display text-base sm:text-lg font-bold uppercase tracking-wider text-[#F2EBDD]">
              {profileData.name}
            </div>
            <div className="font-mono text-xs text-[#D49A46] tracking-wider uppercase mt-0.5">
              {profileData.titles[0] || 'AI / ML Engineer'}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-1.5 text-[#AAA398] hover:text-[#E5BA70] transition-colors focus-visible:outline-2 focus-visible:outline-[#D49A46]"
                aria-label={link.label}
              >
                <span className="text-[#D49A46]">{link.icon}</span>
                <span>{link.label}</span>
              </a>
            ))}
          </div>

          {/* Back to Top */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#AAA398] hover:text-[#F2EBDD] border border-[#24221C] hover:border-[#D49A46] bg-[#11100C] px-3.5 py-1.5 rounded-xs transition-colors focus-visible:outline-2 focus-visible:outline-[#D49A46] cursor-pointer"
              aria-label="Scroll back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#D49A46]" />
            </button>
          </div>
        </div>

        {/* Copyright & Factual Baseline */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono text-[11px] text-[#68645C]">
          <p>© {currentYear} {profileData.name}. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" aria-hidden="true" />
            <span className="uppercase tracking-wider">Strict Factual Integrity</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
