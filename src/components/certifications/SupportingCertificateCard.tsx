import React from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Award,
  Calendar,
  ArrowRight,
  Sparkles,
  Database,
  Layers,
  Shield,
  FileCheck,
} from 'lucide-react';
import { Certification } from '../../data/certifications';
import { MOTION_TIMING, MOTION_EASING } from '../../animations/motionTokens';

export interface SupportingCertificateCardProps {
  certification: Certification;
  index: number;
  onInspect: (cert: Certification) => void;
}

export const SupportingCertificateCard: React.FC<SupportingCertificateCardProps> = ({
  certification,
  index,
  onInspect,
}) => {
  const getDomainIcon = (id: string) => {
    if (id.includes('genai')) {
      return <Sparkles className="w-4 h-4 text-[#D49A46]" />;
    }
    if (id.includes('hacking')) {
      return <Shield className="w-4 h-4 text-[#D49A46]" />;
    }
    if (id.includes('dbms')) {
      return <Database className="w-4 h-4 text-[#D49A46]" />;
    }
    if (id.includes('c-programming') || id.includes('fullstack')) {
      return <Layers className="w-4 h-4 text-[#D49A46]" />;
    }
    return <Award className="w-4 h-4 text-[#D49A46]" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: MOTION_TIMING.slow,
        delay: index * 0.07,
        ease: MOTION_EASING.smooth,
      }}
      className="p-6 sm:p-7 border border-[#24221C] hover:border-[#D49A46]/60 md:hover:-translate-y-1 transition-all duration-380 bg-[#14130F] hover:bg-[#181712] hover:shadow-[0_12px_28px_rgba(0,0,0,0.4)] flex flex-col justify-between group relative overflow-hidden rounded-xs cursor-pointer focus-within:ring-2 focus-within:ring-[#D49A46]"
      onClick={() => onInspect(certification)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onInspect(certification);
        }
      }}
      id={`cert-card-${certification.id}`}
      aria-label={`Inspect ${certification.title} credential details`}
    >
      {/* Top Accent Line */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#D49A46] via-[#E5BA70] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] origin-left pointer-events-none"
        aria-hidden="true"
      />

      <div>
        {/* Header: Issuer + Badges */}
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-[#201F19] mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xs bg-[#171612] border border-[#292720] text-[#D49A46] group-hover:scale-105 transition-transform duration-200">
              {getDomainIcon(certification.id)}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-xs font-bold text-[#E5BA70] uppercase tracking-wider group-hover:translate-x-0.5 transition-transform duration-200">
                  {certification.issuerOrganization || certification.issuer}
                </span>
                {certification.level && (
                  <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-xs bg-[#1E1D18] text-[#D49A46] border border-[#2E2A20] uppercase tracking-wider">
                    {certification.level}
                  </span>
                )}
              </div>
              {certification.institution && (
                <div className="font-mono text-[10px] text-[#888175] truncate mt-0.5">
                  {certification.institution}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-xs bg-[#171612] border border-[#292720] shrink-0">
            <ShieldCheck className="w-3 h-3 text-[#D49A46]" />
            <span className="font-mono text-[10px] text-[#AAA398] uppercase tracking-wider">
              VERIFIED
            </span>
          </div>
        </div>

        {/* Certificate Title */}
        <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-[#F2EBDD] group-hover:text-[#FFFDF9] transition-colors mb-3 leading-snug">
          {certification.title}
        </h3>

        {/* NPTEL Score & Period Metadata */}
        {(certification.score || certification.period) && (
          <div className="p-3 rounded-xs bg-[#11100C] border border-[#201F19] mb-4 flex items-center justify-between gap-3">
            {certification.score && (
              <div>
                <div className="font-mono text-[9px] text-[#888175] uppercase tracking-wider">
                  CONSOLIDATED SCORE
                </div>
                <div className="font-mono text-base font-bold text-[#E5BA70]">
                  {certification.score}
                </div>
              </div>
            )}

            {certification.period && (
              <div className="text-right">
                <div className="font-mono text-[9px] text-[#888175] uppercase tracking-wider">
                  SESSION
                </div>
                <div className="font-mono text-xs font-semibold text-[#DCD6CA]">
                  {certification.period}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Summary snippet if no score box */}
        {!certification.score && certification.summary && (
          <p className="text-xs text-[#AAA398] leading-relaxed line-clamp-2 mb-4 font-light">
            {certification.summary}
          </p>
        )}
      </div>

      {/* Footer: Credential ID / Inspect action */}
      <div className="pt-3.5 border-t border-[#201F19] flex items-center justify-between text-[11px] font-mono">
        {certification.credentialId ? (
          <span className="text-[#68645C] text-[10px] font-mono truncate max-w-[170px]">
            ID: {certification.credentialId}
          </span>
        ) : (
          <span className="text-[#68645C] text-[10px] uppercase">
            {certification.category}
          </span>
        )}

        <div className="flex items-center gap-1.5 text-[#D49A46] group-hover:text-[#E5BA70] font-semibold transition-colors">
          <span>DETAILS</span>
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
    </motion.div>
  );
};
