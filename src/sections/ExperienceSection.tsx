import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Container } from '../components/primitives/Container';
import { internshipExperienceData } from '../data/portfolioData';

interface ContributionItem {
  number: string;
  heading: string;
  description: string;
}

const verifiedContributions: ContributionItem[] = [
  {
    number: '01',
    heading: 'DATA PREPROCESSING',
    description:
      'Designed and implemented data preprocessing pipelines for machine learning workflows.',
  },
  {
    number: '02',
    heading: 'DATA ANALYSIS',
    description:
      'Developed exploratory data analysis scripts to evaluate data quality and feature distributions.',
  },
  {
    number: '03',
    heading: 'MODEL INTEGRATION',
    description:
      'Collaborated with engineering teams to integrate machine learning models into staging environments.',
  },
];

const verifiedTools = ['PYTHON', 'PANDAS', 'NUMPY', 'SCIKIT-LEARN', 'GIT'];

export const ExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const data = internshipExperienceData;

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(typeof window !== 'undefined' && window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Subtle Parallax (Left: 6–8px vertical movement, Right: 3–5px; disabled on mobile/reduced-motion)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], [7, -7]);
  const rightY = useTransform(scrollYProgress, [0, 1], [4, -4]);

  const easeCurve = [0.16, 1, 0.3, 1] as [number, number, number, number];

  return (
    <section
      id="experience"
      ref={containerRef}
      aria-label="Professional Experience"
      className="py-20 md:py-28 lg:py-32 border-b border-[#292720] bg-transparent relative scroll-mt-24 overflow-hidden"
    >
      {/* =========================================================================
          ATMOSPHERIC DEPTH: Soft Amber Highlight & Large Partial Arc
          (Subordinate, adhering strictly to global background language)
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        {/* Soft Amber Glow */}
        <div className="absolute top-1/3 left-1/4 w-[480px] h-[480px] bg-[#D49A46]/[0.016] blur-[140px] rounded-full" />
        
        {/* Architectural Partial Arc Motif */}
        <svg
          className="absolute -right-24 top-1/4 w-[600px] h-[600px] opacity-[0.035] hidden md:block"
          fill="none"
          viewBox="0 0 600 600"
        >
          <circle cx="300" cy="300" r="260" stroke="#D49A46" strokeWidth="1" strokeDasharray="6 12" />
          <circle cx="300" cy="300" r="180" stroke="#D49A46" strokeWidth="0.75" />
        </svg>
      </div>

      <Container size="wide">
        {/* Section Header: Compact & Refined */}
        <div className="mb-10 sm:mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" aria-hidden="true" />
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#D49A46] font-semibold">
              03 / EXPERIENCE
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-[#F2EBDD]">
            PROFESSIONAL EXPERIENCE
          </h2>
        </div>

        {/* Asymmetric Editorial Layout: Left ~40% (lg:col-span-5), Right ~60% (lg:col-span-7) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
          
          {/* =========================================================================
              LEFT COLUMN (~40%): CAREER MILESTONE & REFINED TIMELINE
              Contains: Timeline, Date range, Role, Company, Location
              ========================================================================= */}
          <motion.div
            style={!shouldReduceMotion && isDesktop ? { y: leftY } : {}}
            className="lg:col-span-5 relative w-full min-w-0"
          >
            <div className="flex gap-5 sm:gap-6 items-stretch">
              
              {/* Vertical Timeline Track */}
              <div
                className="flex flex-col items-center shrink-0 select-none pt-1"
                aria-hidden="true"
              >
                {/* Main Amber Node Marker */}
                <motion.div
                  initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.35, delay: 0.1, ease: easeCurve }}
                  className="w-2.5 h-2.5 rounded-full bg-[#D49A46] shadow-[0_0_8px_rgba(212,154,70,0.35)]"
                />

                {/* Animated Vertical Line Draw */}
                <motion.div
                  initial={shouldReduceMotion ? { scaleY: 1 } : { scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.55, delay: 0.05, ease: easeCurve }}
                  className="w-px flex-grow my-2.5 bg-gradient-to-b from-[#D49A46] via-[#2E2B22] to-[#22201A] origin-top"
                />

                {/* Bottom Node */}
                <motion.div
                  initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.35, delay: 0.3, ease: easeCurve }}
                  className="w-2 h-2 rounded-full border border-[#D49A46]/50 bg-[#080806]"
                />
              </div>

              {/* Career Milestone Identity Content */}
              <div className="flex flex-col justify-start min-w-0 flex-grow">
                {/* Small Milestone Label */}
                <motion.div
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: 0.12, ease: easeCurve }}
                  className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.12em] text-[#6E6A62] font-semibold mb-2"
                >
                  01 / CAREER MILESTONE
                </motion.div>

                {/* Date: 15 JUL 2026 — 14 JAN 2027 (IBM Plex Mono) */}
                <motion.div
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.45, delay: 0.18, ease: easeCurve }}
                  className="font-mono text-xs sm:text-sm tracking-[0.08em] text-[#8E887D] uppercase font-medium mb-3.5 leading-relaxed"
                >
                  <span className="lg:hidden">15 JUL 2026 — 14 JAN 2027</span>
                  <span className="hidden lg:block">
                    15 JUL 2026
                    <br />
                    <span className="text-[#D49A46]">—</span>
                    <br />
                    14 JAN 2027
                  </span>
                </motion.div>

                {/* Role: DATA SCIENCE INTERN (Manrope Display, Bold) */}
                <motion.div
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: 0.25, ease: easeCurve }}
                >
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-[2.25rem] xl:text-[2.5rem] font-bold text-[#F2EBDD] uppercase leading-[1.08] tracking-tight">
                    DATA SCIENCE
                    <br />
                    INTERN
                  </h3>
                </motion.div>

                {/* Company: AMINOBOTS (Accent Color) */}
                <motion.div
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.45, delay: 0.32, ease: easeCurve }}
                  className="mt-3"
                >
                  <div className="font-mono text-sm sm:text-base text-[#D49A46] font-semibold tracking-[0.08em] uppercase">
                    {data.company}
                  </div>
                </motion.div>

                {/* Location: HYDERABAD, INDIA (Small & Understated) */}
                <motion.div
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: 0.38, ease: easeCurve }}
                  className="mt-1"
                >
                  <div className="font-mono text-[11px] text-[#6E6A62] tracking-[0.10em] uppercase">
                    {data.location}
                  </div>
                </motion.div>
              </div>

            </div>
          </motion.div>

          {/* =========================================================================
              RIGHT COLUMN (~60%): SCOPE STATEMENT, CONTRIBUTIONS & TOOLS
              Contains: Scope statement, 3 structured contribution rows, Technology stack
              ========================================================================= */}
          <motion.div
            style={!shouldReduceMotion && isDesktop ? { y: rightY } : {}}
            className="lg:col-span-7 relative w-full min-w-0"
          >
            {/* Scope Statement (Inter, 2–3 lines, visually distinct) */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.22, ease: easeCurve }}
              className="mb-8 pb-7 border-b border-[#22201A]"
            >
              <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.10em] text-[#6E6A62] font-semibold mb-3">
                PROFESSIONAL EXPERIENCE
              </div>
              <p className="font-body text-base sm:text-lg text-[#AAA398] font-normal leading-[1.65] max-w-2xl">
                {data.scopeNote}
              </p>
            </motion.div>

            {/* Editorial Contribution Rows (Structured: number + horizontal rule + heading + description) */}
            <div className="space-y-0 w-full mb-8 sm:mb-10">
              {verifiedContributions.map((item, idx) => (
                <motion.div
                  key={item.number}
                  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.45,
                    delay: 0.32 + idx * 0.1,
                    ease: easeCurve,
                  }}
                  className="group relative py-5 sm:py-6 border-b border-[#22201A] transition-transform duration-300 ease-out hover:translate-x-1 cursor-default"
                >
                  {/* Row Header: Number, Expanding Horizontal Rule, Heading */}
                  <div className="flex items-center gap-3 sm:gap-4 mb-2.5">
                    <span className="font-mono text-xs sm:text-sm text-[#6E6A62] group-hover:text-[#D49A46] font-semibold transition-colors shrink-0">
                      {item.number}
                    </span>
                    <div
                      className="w-5 sm:w-6 h-px bg-[#2E2B22] group-hover:w-9 sm:group-hover:w-10 group-hover:bg-[#D49A46]/70 transition-all duration-300 shrink-0"
                      aria-hidden="true"
                    />
                    <h4 className="font-mono text-xs sm:text-sm text-[#AAA398] group-hover:text-[#F2EBDD] font-bold uppercase tracking-[0.08em] transition-colors">
                      {item.heading}
                    </h4>
                  </div>

                  {/* Description: Indented to align with heading */}
                  <p className="font-body text-sm sm:text-base text-[#8E887D] group-hover:text-[#AAA398] font-normal leading-relaxed pl-8 sm:pl-10 transition-colors">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Technology Stack: Deliberate Footer Area */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: 0.64, ease: easeCurve }}
              className="pt-2"
            >
              <div className="font-mono text-[10px] sm:text-[11px] text-[#6E6A62] uppercase tracking-[0.12em] font-semibold mb-3">
                TECHNOLOGY STACK
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {verifiedTools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 border border-[#24221C] bg-[#0E0D0A] text-[#8E887D] font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] font-medium rounded-xs hover:border-[#D49A46]/60 hover:text-[#D49A46] transition-colors"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>

          </motion.div>

        </div>
      </Container>
    </section>
  );
};
