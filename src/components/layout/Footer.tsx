import React from 'react';
import { ArrowUp, Terminal } from 'lucide-react';
import { profileData, socialLinks } from '../../data/portfolioData';
import { ExternalLink } from '../primitives/ExternalLink';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#292720] bg-[#090907] text-[#AAA398] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-12 border-b border-[#292720]/60">
          {/* Identity col */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[#D49A46]">
              <Terminal className="w-4 h-4" />
              <span className="font-mono text-xs tracking-widest uppercase">
                PORTFOLIO_SYSTEM // V1.0
              </span>
            </div>
            <h3 className="font-display text-lg uppercase font-bold text-[#F2EBDD] tracking-wide">
              {profileData.name}
            </h3>
            <p className="text-sm text-[#AAA398] max-w-sm leading-relaxed">
              AI/ML Engineer & Systems Builder focused on self-supervised representations,
              transformer architectures, and high-reliability web systems.
            </p>
          </div>

          {/* Factual Links */}
          <div className="md:col-span-4 flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#F2EBDD] mb-2">
              DISPATCH & REPOSITORIES
            </span>
            <div className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <ExternalLink
                  key={link.id}
                  href={link.url}
                  className="text-xs text-[#AAA398] hover:text-[#E5BA70]"
                >
                  {link.label} — {link.username}
                </ExternalLink>
              ))}
            </div>
          </div>

          {/* Quick return to top */}
          <div className="md:col-span-3 flex flex-col md:items-end justify-between h-full gap-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#AAA398] hover:text-[#D49A46] border border-[#292720] hover:border-[#D49A46]/60 bg-[#11110E] px-4 py-2 rounded-xs transition-colors focus-visible:outline-2 focus-visible:outline-[#D49A46]"
            >
              <span>BACK TO APEX</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <div className="font-mono text-[11px] text-[#68645C] md:text-right">
              <span>LOCATION: HYDERABAD, INDIA</span>
              <br />
              <span>STATUS: ALL NODES OPERATIONAL</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#68645C]">
          <p>© {new Date().getFullYear()} Jhansi Bhukya. Built with technical restraint.</p>
          <p className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
            <span>LATENCY: ZERO MOCK DATA</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
