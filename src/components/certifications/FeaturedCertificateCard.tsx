import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Binary,
  ShieldCheck,
  Calendar,
  Hash,
  ArrowRight,
  Copy,
  Check,
  Sparkles,
  Award,
} from 'lucide-react';
import { Certification } from '../../data/certifications';
import { MOTION_TIMING, MOTION_EASING } from '../../animations/motionTokens';

export interface FeaturedCertificateCardProps {
  certification: Certification;
  onInspect: (cert: Certification) => void;
}

export const FeaturedCertificateCard: React.FC<FeaturedCertificateCardProps> = ({
  certification,
  onInspect,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (certification.credentialId) {
      navigator.clipboard.writeText(certification.credentialId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: MOTION_TIMING.slow, ease: MOTION_EASING.smooth }}
      className="relative rounded-xs border border-[#2D2A22] bg-gradient-to-b from-[#171611] to-[#12110D] p-6 sm:p-8 lg:p-10 overflow-hidden group hover:border-[#D49A46]/70 transition-all duration-380 shadow-[0_8px_30px_rgba(0,0,0,0.5)] md:hover:-translate-y-1 cursor-pointer focus-within:ring-2 focus-within:ring-[#D49A46]"
      onClick={() => onInspect(certification)}
      id="featured-oracle-cert-card"
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onInspect(certification);
        }
      }}
      aria-label={`Inspect ${certification.title} credential details`}
    >
      {/* Top Accent Line */}
      <div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D49A46] via-[#E5BA70] to-[#8C6026] scale-x-100 origin-left"
        aria-hidden="true"
      />

      {/* Subtle Background Circuit Watermark */}
      <div
        className="absolute -right-12 -bottom-12 w-64 h-64 opacity-[0.035] group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none text-[#D49A46]"
        aria-hidden="true"
      >
        <Binary className="w-full h-full" />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          {/* Badge Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#24221C] mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xs bg-[#1E1D18] border border-[#2D2A22] text-[#D49A46] group-hover:scale-105 transition-transform duration-300">
                <Binary className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#E5BA70] uppercase tracking-wider">
                    {certification.issuerOrganization || certification.issuer}
                  </span>
                  <span className="text-[#68645C]">•</span>
                  <span className="font-mono text-[11px] text-[#AAA398]">
                    {certification.level}
                  </span>
                </div>
                <div className="font-mono text-[10px] text-[#888175] uppercase tracking-widest mt-0.5">
                  PRIMARY AI ACCREDITATION
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xs bg-[#1A1914] border border-[#2E2B23]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D49A46]" />
                <span className="font-mono text-[10px] font-bold text-[#E5BA70] uppercase tracking-wider">
                  VERIFIED // ACTIVE
                </span>
              </div>
            </div>
          </div>

          {/* Main Title & Category */}
          <div className="mb-6">
            <div className="font-mono text-xs text-[#D49A46] uppercase tracking-widest mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{certification.category}</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-[#F2EBDD] group-hover:text-[#FFFDF9] transition-colors leading-tight">
              {certification.title}
            </h3>
          </div>

          {/* Key Competencies Chips */}
          {certification.skillsHighlighted && (
            <div className="flex flex-wrap gap-2 mb-6">
              {certification.skillsHighlighted.map((skill, idx) => (
                <span
                  key={idx}
                  className="font-mono text-xs px-2.5 py-1 rounded-xs bg-[#14130F] border border-[#24221C] text-[#DCD6CA] group-hover:border-[#2D2A22] transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xs bg-[#14130F] border border-[#24221C] mb-6">
            {/* Issue Date */}
            <div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#888175] uppercase tracking-wider mb-1">
                <Calendar className="w-3 h-3 text-[#D49A46]" />
                <span>ISSUE DATE</span>
              </div>
              <div className="font-mono text-xs sm:text-sm font-semibold text-[#F2EBDD]">
                {certification.date}
              </div>
            </div>

            {/* Validity Period */}
            <div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#888175] uppercase tracking-wider mb-1">
                <Calendar className="w-3 h-3 text-[#D49A46]" />
                <span>VALIDITY PERIOD</span>
              </div>
              <div className="font-mono text-xs sm:text-sm font-semibold text-[#E5BA70]">
                Valid until {certification.validUntil}
              </div>
            </div>

            {/* Credential ID with Copy */}
            <div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#888175] uppercase tracking-wider mb-1">
                <Hash className="w-3 h-3 text-[#D49A46]" />
                <span>CREDENTIAL ID</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold text-[#F2EBDD] truncate">
                  {certification.credentialId}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-1 rounded-xs bg-[#1E1D18] hover:bg-[#292720] text-[#D49A46] hover:text-[#E5BA70] transition-colors cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-[#D49A46]"
                  aria-label="Copy Oracle credential ID"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action Bar */}
        <div className="pt-4 border-t border-[#24221C] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="font-mono text-xs text-[#888175] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" />
            <span>AUTHENTICATED RECIPIENT: JHANSI BHUKYA</span>
          </div>

          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#D49A46] group-hover:text-[#E5BA70] transition-colors">
            <span>INSPECT CREDENTIAL DETAILS</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
