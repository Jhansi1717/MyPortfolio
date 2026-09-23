import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Container } from '../components/primitives/Container';
import { resumeConfig } from '../data/portfolioData';
import { ArrowUpRight, ArrowDown, FileText, CheckCircle2 } from 'lucide-react';

export const ResumeSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const easeCurve = [0.16, 1, 0.3, 1] as [number, number, number, number];

  // Motion variants: 500-650ms duration, 16px entrance translateY
  const headerVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: easeCurve },
    },
  };

  const cardVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.12,
        ease: easeCurve,
      },
    },
  };

  return (
    <section
      id="resume"
      aria-label="Resume Section"
      className="py-20 md:py-28 lg:py-32 border-b border-[#292720] relative overflow-hidden bg-transparent scroll-mt-24"
    >
      {/* Subtle Background Accent Behind Document Card */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] bg-[#D49A46]/[0.012] blur-[150px] rounded-full" />
      </div>

      <Container size="default" className="relative z-10">
        {/* Section Heading Hierarchy */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={headerVariants}
          className="text-center max-w-xl mx-auto mb-10 md:mb-14"
        >
          {/* Index & Section Label */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" aria-hidden="true" />
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#D49A46] font-semibold">
              09 / RESUME
            </span>
          </div>

          {/* Section Title */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase font-bold tracking-tight text-[#F2EBDD] leading-tight">
            RESUME
          </h2>

          {/* Supporting Text */}
          <p className="mt-3 font-body text-base text-[#AAA398] font-normal leading-relaxed">
            View or download my current resume.
          </p>
        </motion.div>

        {/* Premium Centered Document Access Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={cardVariants}
          className="group relative max-w-2xl mx-auto rounded-xs bg-[#0D0C09] border border-[#24221C] hover:border-[#D49A46]/45 p-6 sm:p-8 md:p-10 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85)] border-t-2 border-t-[#D49A46]/70 transition-all duration-300 hover:-translate-y-1"
        >
          {/* Corner Framing Accents */}
          <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t border-l border-[#D49A46]/40 pointer-events-none" />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t border-r border-[#D49A46]/40 pointer-events-none" />
          <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b border-l border-[#D49A46]/40 pointer-events-none" />
          <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b border-r border-[#D49A46]/40 pointer-events-none" />

          {/* Top Metadata Row */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#1E1D17] font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.10em]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" aria-hidden="true" />
              <span className="text-[#D49A46] font-medium">CURRENT VERSION</span>
            </div>
            <span className="text-[#8E887D]">PROFESSIONAL RESUME · PDF</span>
          </div>

          {/* Abstract Non-Readable Document Representation Graphic */}
          <div className="mb-8 p-6 sm:p-7 rounded-xs bg-[#12110D] border border-[#201F18] flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6">
            {/* Document Graphic Silhouette */}
            <div className="relative w-16 h-20 sm:w-18 sm:h-22 bg-[#171612] border border-[#2A2821] rounded-xs p-2.5 flex flex-col justify-between shrink-0 shadow-inner group-hover:border-[#D49A46]/50 transition-colors duration-300">
              {/* Folded Corner Dog-Ear */}
              <div className="absolute top-0 right-0 w-3.5 h-3.5 border-b border-l border-[#2A2821] bg-[#0D0C09] pointer-events-none" />
              
              {/* Top Accent Bar */}
              <div className="w-6 h-1 bg-[#D49A46] rounded-full" />

              {/* Purely Decorative Abstract Skeleton Lines (Zero Real Text) */}
              <div className="space-y-1.5 my-auto" aria-hidden="true">
                <div className="w-9 h-1 bg-[#2E2B23] rounded-full" />
                <div className="w-7 h-1 bg-[#26241D] rounded-full" />
                <div className="w-10 h-1 bg-[#2E2B23] rounded-full" />
                <div className="w-6 h-1 bg-[#26241D] rounded-full" />
              </div>

              {/* Document Icon with 2-3px shift on hover */}
              <div className="flex items-center justify-between pt-1 border-t border-[#201F18]">
                <FileText className="w-3.5 h-3.5 text-[#D49A46] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                <div className="w-2 h-1 bg-[#D49A46]/40 rounded-full" />
              </div>
            </div>

            {/* Document Identity & Subject Summary */}
            <div className="flex-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 mb-1 font-mono text-[10px] uppercase tracking-wider text-[#68645C]">
                <CheckCircle2 className="w-3 h-3 text-[#D49A46]" />
                <span>CANONICAL RESUME RECORD</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#F2EBDD] tracking-tight">
                JHANSI BHUKYA
              </h3>
              <p className="font-mono text-xs text-[#D49A46] tracking-[0.08em] font-semibold mt-1">
                AI/ML ENGINEER · FULL-STACK ENGINEER
              </p>
              <p className="font-body text-xs sm:text-[13px] text-[#8E887D] leading-relaxed mt-2.5">
                Standardized curriculum vitae encompassing machine learning systems, deep learning architectures, full-stack engineering implementations, and verified credentials.
              </p>
            </div>
          </div>

          {/* Action Buttons: Responsive Grid (Stacks on mobile, row on tablet/desktop) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 pt-2">
            {/* Primary Action: OPEN FULL RESUME in new tab */}
            <a
              href={resumeConfig.filePath}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#D49A46] hover:bg-[#E5BA70] text-[#090907] font-mono text-xs uppercase font-bold tracking-[0.10em] rounded-xs transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#D49A46]"
              aria-label="Open full PDF resume in a new tab"
            >
              <span>OPEN FULL RESUME</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5" />
            </a>

            {/* Secondary Action: DOWNLOAD RESUME */}
            <a
              href={resumeConfig.filePath}
              download={resumeConfig.fileName}
              className="group/btn inline-flex items-center justify-center gap-2.5 px-6 py-3.5 border border-[#2E2B22] hover:border-[#D49A46]/60 bg-[#14130F] hover:bg-[#1A1913] text-[#F2EBDD] font-mono text-xs uppercase font-bold tracking-[0.10em] rounded-xs transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#D49A46]"
              aria-label="Download resume PDF file directly"
            >
              <span>DOWNLOAD RESUME</span>
              <ArrowDown className="w-4 h-4 text-[#D49A46] transition-transform duration-300 group-hover/btn:translate-y-0.5" />
            </a>
          </div>

          {/* Subtle Bottom Note */}
          <div className="mt-6 pt-4 border-t border-[#1C1B15] text-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#55524B]">
              FORMAT: PDF · FILE: Jhansi_Bhukya_Resume.pdf
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
