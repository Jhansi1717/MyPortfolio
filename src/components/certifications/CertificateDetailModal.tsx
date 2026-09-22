import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShieldCheck,
  Award,
  Calendar,
  Hash,
  Users,
  CheckCircle2,
  Copy,
  Check,
  BookOpen,
  Binary,
  Sparkles,
  Database,
  Layers,
  Shield,
  FileCheck,
} from 'lucide-react';
import { Certification } from '../../data/certifications';
import { MOTION_TIMING, MOTION_EASING } from '../../animations/motionTokens';

export interface CertificateDetailModalProps {
  certification: Certification | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateDetailModal: React.FC<CertificateDetailModalProps> = ({
  certification,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!certification) return null;

  const handleCopyCredential = () => {
    if (certification.credentialId) {
      navigator.clipboard.writeText(certification.credentialId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getDomainIcon = (id: string) => {
    if (id.includes('agentic') || id.includes('oracle')) {
      return <Binary className="w-5 h-5 text-[#D49A46]" />;
    }
    if (id.includes('genai')) {
      return <Sparkles className="w-5 h-5 text-[#D49A46]" />;
    }
    if (id.includes('hacking')) {
      return <Shield className="w-5 h-5 text-[#D49A46]" />;
    }
    if (id.includes('dbms')) {
      return <Database className="w-5 h-5 text-[#D49A46]" />;
    }
    if (id.includes('c-programming') || id.includes('fullstack')) {
      return <Layers className="w-5 h-5 text-[#D49A46]" />;
    }
    return <Award className="w-5 h-5 text-[#D49A46]" />;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          id="certificate-detail-modal"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: MOTION_TIMING.fast, ease: MOTION_EASING.smooth }}
            onClick={onClose}
            className="fixed inset-0 bg-[#090907]/85 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: MOTION_TIMING.medium, ease: MOTION_EASING.smooth }}
            className="relative w-full max-w-2xl bg-[#14130F] border border-[#292720] rounded-xs shadow-[0_24px_50px_rgba(0,0,0,0.8)] overflow-hidden z-10 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Amber Accent Line */}
            <div className="h-1 w-full bg-gradient-to-r from-[#D49A46] via-[#E5BA70] to-[#A06C2C]" />

            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-[#201F19] flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xs bg-[#1E1D18] border border-[#292720] text-[#D49A46] shrink-0 mt-0.5">
                  {getDomainIcon(certification.id)}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold text-[#E5BA70] uppercase tracking-wider">
                      {certification.issuerOrganization || certification.issuer}
                    </span>
                    {certification.institution && (
                      <>
                        <span className="text-[#68645C]">•</span>
                        <span className="font-mono text-xs text-[#AAA398]">
                          {certification.institution}
                        </span>
                      </>
                    )}
                    {certification.level && (
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-xs bg-[#1E1D18] text-[#D49A46] border border-[#292720] uppercase tracking-wider">
                        {certification.level}
                      </span>
                    )}
                  </div>
                  <h2
                    id="cert-modal-title"
                    className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#F2EBDD]"
                  >
                    {certification.title}
                  </h2>
                </div>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="p-2 rounded-xs bg-[#1E1D18] border border-[#292720] text-[#AAA398] hover:text-[#F2EBDD] hover:bg-[#292720] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D49A46]"
                aria-label="Close credential details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {/* Category & Status Banner */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xs bg-[#11100C] border border-[#201F19]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" />
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#888175]">
                    DOMAIN:
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#DCD6CA]">
                    {certification.category}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-xs bg-[#171612] border border-[#292720]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D49A46]" />
                  <span className="font-mono text-[10px] font-bold text-[#AAA398] uppercase tracking-wider">
                    VERIFIED CREDENTIAL
                  </span>
                </div>
              </div>

              {/* NPTEL Detailed Scores (when available) */}
              {(certification.score ||
                certification.assignmentScore ||
                certification.proctoredExamScore ||
                certification.certifiedCandidates) && (
                <div className="p-4 rounded-xs bg-[#11100C] border border-[#201F19]">
                  <div className="font-mono text-xs font-bold text-[#E5BA70] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <FileCheck className="w-3.5 h-3.5 text-[#D49A46]" />
                    <span>NPTEL PERFORMANCE BREAKDOWN</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {certification.score && (
                      <div className="p-3 rounded-xs bg-[#171612] border border-[#24221C]">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-[#888175] block mb-1">
                          CONSOLIDATED SCORE
                        </span>
                        <span className="font-mono text-xl font-bold text-[#E5BA70]">
                          {certification.score}
                        </span>
                      </div>
                    )}

                    {certification.assignmentScore && (
                      <div className="p-3 rounded-xs bg-[#171612] border border-[#24221C]">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-[#888175] block mb-1">
                          ASSIGNMENTS
                        </span>
                        <span className="font-mono text-sm font-bold text-[#F2EBDD]">
                          {certification.assignmentScore}
                        </span>
                      </div>
                    )}

                    {certification.proctoredExamScore && (
                      <div className="p-3 rounded-xs bg-[#171612] border border-[#24221C]">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-[#888175] block mb-1">
                          PROCTORED EXAM
                        </span>
                        <span className="font-mono text-sm font-bold text-[#F2EBDD]">
                          {certification.proctoredExamScore}
                        </span>
                      </div>
                    )}

                    {certification.certifiedCandidates && (
                      <div className="p-3 rounded-xs bg-[#171612] border border-[#24221C]">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-[#888175] block mb-1">
                          CANDIDATES CERTIFIED
                        </span>
                        <span className="font-mono text-sm font-bold text-[#AAA398]">
                          {certification.certifiedCandidates.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Summary Description */}
              {certification.summary && (
                <div>
                  <h4 className="font-mono text-xs font-bold text-[#E5BA70] uppercase tracking-wider mb-2 flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-[#D49A46]" />
                    <span>CURRICULUM & COMPETENCY SCOPE</span>
                  </h4>
                  <p className="text-sm text-[#AAA398] leading-relaxed font-light">
                    {certification.summary}
                  </p>
                </div>
              )}

              {/* Skills Highlighted */}
              {certification.skillsHighlighted &&
                certification.skillsHighlighted.length > 0 && (
                  <div>
                    <h4 className="font-mono text-xs font-bold text-[#E5BA70] uppercase tracking-wider mb-2.5">
                      VERIFIED COMPETENCY AREAS
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {certification.skillsHighlighted.map((skill, idx) => (
                        <span
                          key={idx}
                          className="font-mono text-xs px-2.5 py-1 rounded-xs bg-[#171612] border border-[#24221C] text-[#DCD6CA]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {/* Chronology & Validity Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {certification.date && (
                  <div className="p-3.5 rounded-xs bg-[#11100C] border border-[#201F19]">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#888175] uppercase tracking-wider mb-1">
                      <Calendar className="w-3 h-3 text-[#D49A46]" />
                      <span>ISSUE DATE</span>
                    </div>
                    <div className="font-mono text-xs font-semibold text-[#F2EBDD]">
                      {certification.date}
                    </div>
                  </div>
                )}

                {certification.validUntil && (
                  <div className="p-3.5 rounded-xs bg-[#11100C] border border-[#201F19]">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#888175] uppercase tracking-wider mb-1">
                      <Calendar className="w-3 h-3 text-[#D49A46]" />
                      <span>VALIDITY PERIOD</span>
                    </div>
                    <div className="font-mono text-xs font-semibold text-[#E5BA70]">
                      Valid until {certification.validUntil}
                    </div>
                  </div>
                )}

                {certification.period && (
                  <div className="p-3.5 rounded-xs bg-[#11100C] border border-[#201F19]">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#888175] uppercase tracking-wider mb-1">
                      <Calendar className="w-3 h-3 text-[#D49A46]" />
                      <span>COURSE PERIOD</span>
                    </div>
                    <div className="font-mono text-xs font-semibold text-[#F2EBDD]">
                      {certification.period} {certification.duration ? `(${certification.duration})` : ''}
                    </div>
                  </div>
                )}
              </div>

              {/* Credential ID / Verification Record */}
              {certification.credentialId && (
                <div className="p-4 rounded-xs bg-[#11100C] border border-[#292720] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#888175] uppercase tracking-wider mb-1">
                      <Hash className="w-3 h-3 text-[#D49A46]" />
                      <span>OFFICIAL CREDENTIAL ID</span>
                    </div>
                    <div className="font-mono text-xs sm:text-sm font-bold text-[#F2EBDD] tracking-wider break-all">
                      {certification.credentialId}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyCredential}
                    className="inline-flex items-center gap-2 font-mono text-xs px-3.5 py-2 rounded-xs bg-[#1E1D18] hover:bg-[#292720] border border-[#292720] text-[#D49A46] hover:text-[#E5BA70] transition-colors cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-[#D49A46]"
                    aria-label="Copy credential ID to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>COPY ID</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-[#201F19] bg-[#11100C] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[#68645C]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D49A46]" />
                <span>RECIPIENT: JHANSI BHUKYA // AUTHENTICATED RECORD</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-[#AAA398] hover:text-[#F2EBDD] transition-colors cursor-pointer sm:text-right"
              >
                CLOSE [ESC]
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
