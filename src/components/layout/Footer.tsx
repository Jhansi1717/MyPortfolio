import React from 'react';
import { ArrowUp, Terminal } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { profileData, socialLinks } from '../../data/portfolioData';
import { ExternalLink } from '../primitives/ExternalLink';

export const Footer: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#292720] bg-transparent text-[#AAA398] py-12 md:py-16 relative overflow-hidden">
      
      {/* ========================================================
          FOOTER MOTION: A thin amber pulse or line travels slowly
          across the footer.
          ======================================================== */}
      {!shouldReduceMotion && (
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#292720]/40 overflow-hidden" aria-hidden="true">
          <motion.div
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#D49A46]/60 to-transparent"
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-12 border-b border-[#292720]/60">
          
          {/* Identity Info */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[#D49A46]">
              <Terminal className="w-4 h-4" />
              <span className="font-mono text-xs tracking-widest uppercase font-bold">
                PORTFOLIO SYSTEM // V1.0
              </span>
            </div>
            <h3 className="font-display text-lg uppercase font-bold text-[#F2EBDD] tracking-wide">
              {profileData.name}
            </h3>
            <p className="text-sm text-[#AAA398] max-w-sm leading-relaxed font-light">
              AI/ML Engineer & Systems Builder focused on self-supervised representations,
              deep neural networks, and robust full-stack software development.
            </p>
          </div>

          {/* Social Profiles */}
          <div className="md:col-span-4 flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#F2EBDD] mb-2 font-bold">
              VERIFIED CHANNELS & PROFILES
            </span>
            <div className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <ExternalLink
                  key={link.id}
                  href={link.url}
                  className="text-xs text-[#AAA398] hover:text-[#E5BA70] transition-colors"
                >
                  {link.label} — @{link.username}
                </ExternalLink>
              ))}
            </div>
          </div>

          {/* Back to top */}
          <div className="md:col-span-3 flex flex-col md:items-end justify-between h-full gap-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#AAA398] hover:text-[#D49A46] border border-[#292720] hover:border-[#D49A46]/60 bg-[#11110E] px-4 py-2 rounded-xs transition-colors focus-visible:outline-2 focus-visible:outline-[#D49A46] cursor-pointer"
            >
              <span>BACK TO APEX</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#D49A46]" />
            </button>
            <div className="font-mono text-[11px] text-[#68645C] md:text-right uppercase">
              <span>LOCATION: HYDERABAD, INDIA</span>
              <br />
              <span>STATUS: SYSTEM OPERATIONAL</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright details */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#68645C]">
          <p>© {new Date().getFullYear()} Jhansi Bhukya. Built with technical restraint.</p>
          <p className="flex items-center gap-2 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
            <span>LATENCY: ZERO SYNTHETIC METRICS</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
