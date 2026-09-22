import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Container } from '../components/primitives/Container';
import { internshipExperienceData } from '../data/portfolioData';
import { Calendar, MapPin, Building2, ChevronDown, ShieldCheck, Clock } from 'lucide-react';
import { cn } from '../lib/utils';
import { MOTION_TIMING, MOTION_EASING } from '../animations/motionTokens';

export const ExperienceSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const data = internshipExperienceData;

  return (
    <section
      id="experience"
      aria-label="Experience Section"
      className="py-20 md:py-28 border-b border-[#292720] bg-[#090907] relative scroll-mt-20 overflow-hidden"
    >
      <Container size="wide">
        {/* Section Heading with 02 / EXPERIENCE title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: MOTION_TIMING.slow, ease: MOTION_EASING.smooth }}
          className="mb-12 md:mb-16 max-w-3xl"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#D49A46]">
              PROFESSIONAL TRAJECTORY // INDUSTRY PRACTICE
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase font-bold tracking-tight text-[#F2EBDD] leading-tight">
            02 / EXPERIENCE
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#AAA398] font-normal leading-relaxed max-w-2xl">
            Formal professional industry engagement grounded in computational rigor, machine intelligence workflows, and data-driven systems architecture.
          </p>
        </motion.div>

        {/* Premium Editorial Timeline */}
        <div className="relative pl-6 sm:pl-10 md:pl-12 lg:pl-16">
          {/* Vertical Timeline Axis with subtle illumination on card hover */}
          <div
            className={cn(
              'absolute left-2 sm:left-3 md:left-4 top-2 bottom-6 w-0.5 transition-all duration-500',
              isCardHovered
                ? 'bg-gradient-to-b from-[#D49A46] via-[#D49A46]/60 to-[#292720]'
                : 'bg-gradient-to-b from-[#D49A46] via-[#38352C] to-[#292720]'
            )}
            aria-hidden="true"
          />

          {/* Start Date Marker */}
          <div className="relative -left-6 sm:-left-10 md:-left-12 lg:-left-16 flex items-center gap-3 sm:gap-4 mb-6">
            <div
              className={cn(
                'w-5 h-5 rounded-full border-2 bg-[#090907] flex items-center justify-center shrink-0 z-10 transition-all duration-300',
                isCardHovered
                  ? 'border-[#D49A46] shadow-[0_0_16px_rgba(212,154,70,0.6)] scale-105'
                  : 'border-[#D49A46] shadow-[0_0_10px_rgba(212,154,70,0.3)]'
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" />
            </div>
            <div className="flex items-center gap-2 font-mono text-xs tracking-wider text-[#D49A46] uppercase font-semibold">
              <Calendar className="w-3.5 h-3.5 text-[#D49A46]" aria-hidden="true" />
              <span>{data.startDate} — {data.endDate}</span>
              <span className="hidden sm:inline-block text-[#68645C]">·</span>
              <span className="hidden sm:inline-block text-[#AAA398]">{data.duration}</span>
            </div>
          </div>

          {/* Primary Editorial Experience Card */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: MOTION_TIMING.slow, ease: MOTION_EASING.smooth }}
            onPointerEnter={() => setIsCardHovered(true)}
            onPointerLeave={() => setIsCardHovered(false)}
            className={cn(
              'rounded-xs border border-[#292720] bg-[#11110E] p-6 sm:p-8 md:p-10',
              'hover:border-[#38352C] hover:bg-[#14130F] transition-all duration-380',
              'hover:shadow-[0_12px_32px_rgba(0,0,0,0.45)] group',
              'focus-within:border-[#D49A46]/60 focus-within:ring-1 focus-within:ring-[#D49A46]/30',
              'relative overflow-hidden'
            )}
          >
            {/* Top Accent Line */}
            <div
              className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#D49A46] via-[#E5BA70] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] origin-left pointer-events-none"
              aria-hidden="true"
            />

            {/* Top Metadata Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#292720]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-[#D49A46]/10 border border-[#D49A46]/30 text-[#E5BA70] font-mono text-xs uppercase font-medium group-hover:border-[#D49A46]/50 transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" aria-hidden="true" />
                  {data.verificationBadge}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xs bg-[#171612] border border-[#292720] text-[#AAA398] font-mono text-xs uppercase group-hover:text-[#F2EBDD] transition-colors">
                  <Building2 className="w-3 h-3 text-[#D49A46]" aria-hidden="true" />
                  {data.company}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-[#68645C]">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D49A46]" aria-hidden="true" />
                  {data.location}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#D49A46]" aria-hidden="true" />
                  {data.duration}
                </span>
              </div>
            </div>

            {/* Role & Company Typography */}
            <div className="pt-6 sm:pt-8">
              <div className="font-mono text-xs text-[#D49A46] uppercase tracking-widest mb-1.5">
                INDUSTRY INTERNSHIP
              </div>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase font-bold text-[#F2EBDD] tracking-tight leading-tight group-hover:text-[#FFFDF9] transition-colors">
                {data.role}
              </h3>
              <div className="font-mono text-base sm:text-lg text-[#E5BA70] font-semibold uppercase tracking-wider mt-2 flex items-center gap-2">
                <span>@ {data.company}</span>
              </div>
            </div>

            {/* High-Level Focus Labels */}
            <div className="mt-6 pt-6 border-t border-[#292720]">
              <div className="font-mono text-[11px] text-[#68645C] uppercase tracking-wider mb-3">
                CORE FOCUS AREAS
              </div>
              <div className="flex flex-wrap gap-2.5">
                {data.focusLabels.map((label) => (
                  <span
                    key={label}
                    className="px-3 py-1.5 rounded-xs border border-[#D49A46]/30 bg-[#D49A46]/8 text-[#F2EBDD] font-mono text-xs sm:text-sm font-medium uppercase tracking-wider hover:border-[#D49A46] hover:bg-[#D49A46]/15 transition-all duration-200"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Verified Scope Narrative */}
            <p className="mt-6 text-sm sm:text-base text-[#AAA398] leading-relaxed max-w-3xl font-light">
              Hands-on industry internship focusing on data science pipelines, automated preprocessing workflows, and applied machine learning integration at {data.company}.
            </p>

            {/* Expandable Detail Component */}
            <div className="mt-8 pt-6 border-t border-[#292720]">
              <button
                type="button"
                id="experience-expand-button"
                onClick={() => setIsExpanded(!isExpanded)}
                aria-expanded={isExpanded}
                aria-controls="experience-detail-aminobots"
                className={cn(
                  'w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-3',
                  'px-4 py-2.5 min-h-[44px] rounded-xs border border-[#292720] bg-[#171612] text-[#F2EBDD]',
                  'hover:border-[#D49A46] hover:text-[#E5BA70] transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D49A46]',
                  'font-mono text-xs uppercase tracking-wider font-medium'
                )}
              >
                <span>
                  {isExpanded
                    ? 'COLLAPSE ENGAGEMENT DETAILS'
                    : 'VIEW ENGAGEMENT DETAILS'}
                </span>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 text-[#D49A46] transition-transform duration-300',
                    isExpanded && 'rotate-180'
                  )}
                  aria-hidden="true"
                />
              </button>

              {/* Subtle Reveal Content */}
              {isExpanded && (
                <div
                  id="experience-detail-aminobots"
                  role="region"
                  aria-labelledby="experience-expand-button"
                  className="mt-6 pt-6 border-t border-[#292720]/80 space-y-6 animate-in fade-in duration-200"
                >
                  {/* Verified Information Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xs bg-[#090907] border border-[#292720]">
                      <div className="font-mono text-[11px] text-[#68645C] uppercase tracking-wider">
                        ORGANIZATION
                      </div>
                      <div className="font-mono text-sm text-[#F2EBDD] font-bold mt-1">
                        {data.company}
                      </div>
                    </div>

                    <div className="p-4 rounded-xs bg-[#090907] border border-[#292720]">
                      <div className="font-mono text-[11px] text-[#68645C] uppercase tracking-wider">
                        ROLE
                      </div>
                      <div className="font-mono text-sm text-[#F2EBDD] font-bold mt-1">
                        {data.role}
                      </div>
                    </div>

                    <div className="p-4 rounded-xs bg-[#090907] border border-[#292720]">
                      <div className="font-mono text-[11px] text-[#68645C] uppercase tracking-wider">
                        PERIOD
                      </div>
                      <div className="font-mono text-sm text-[#F2EBDD] font-bold mt-1">
                        {data.period}
                      </div>
                    </div>

                    <div className="p-4 rounded-xs bg-[#090907] border border-[#292720]">
                      <div className="font-mono text-[11px] text-[#68645C] uppercase tracking-wider">
                        DOMAIN
                      </div>
                      <div className="font-mono text-sm text-[#E5BA70] font-bold mt-1">
                        DATA SCIENCE & AI
                      </div>
                    </div>
                  </div>

                  {/* Factual Scope */}
                  <div className="p-5 rounded-xs bg-[#090907] border border-[#292720] flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-[#D49A46] shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="text-xs text-[#AAA398] leading-relaxed">
                      <strong className="text-[#F2EBDD] font-mono uppercase block mb-1">
                        Industry Scope
                      </strong>
                      {data.scopeNote}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.article>

          {/* Terminal Date Marker (Conclusion / Horizon) */}
          <div className="relative -left-6 sm:-left-10 md:-left-12 lg:-left-16 flex items-center gap-3 sm:gap-4 mt-6">
            <div className="w-5 h-5 rounded-full border border-[#68645C] bg-[#11110E] flex items-center justify-center shrink-0 z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#68645C]" />
            </div>
            <div className="font-mono text-xs text-[#68645C] uppercase tracking-wider">
              FORMAL TERM COMPLETION TARGET // {data.endDate}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

