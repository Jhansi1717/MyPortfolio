import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Container } from '../components/primitives/Container';
import { engineeringSnapshotData } from '../data/portfolioData';
import { Brain, Terminal, Database, Cpu, Layers } from 'lucide-react';
import { cn } from '../lib/utils';

export const EngineeringSnapshotSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const easeCurve = [0.16, 1, 0.3, 1] as [number, number, number, number];

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'ai-ml':
        return (
          <Brain
            className="w-5 h-5 text-[#D49A46] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        );
      case 'engineering':
        return (
          <Terminal
            className="w-5 h-5 text-[#D49A46] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        );
      case 'data':
        return (
          <Database
            className="w-5 h-5 text-[#D49A46] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        );
      case 'core-cs':
        return (
          <Cpu
            className="w-5 h-5 text-[#D49A46] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        );
      default:
        return (
          <Layers
            className="w-5 h-5 text-[#D49A46] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        );
    }
  };

  return (
    <section
      id="technical-profile"
      aria-label="Technical Profile Section"
      className="py-20 md:py-28 lg:py-32 border-b border-[#292720] bg-transparent relative scroll-mt-24"
    >
      <Container size="wide">
        {/* Section Heading with Target Typography: Title 58-76px, Description 19-22px */}
        <div className="mb-14 md:mb-18 lg:mb-20 max-w-4xl">
          {/* Index Tag */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: easeCurve }}
            className="flex items-center gap-2 mb-3 sm:mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" aria-hidden="true" />
            <span className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.14em] text-[#D49A46] font-semibold">
              05 / TECHNICAL PROFILE
            </span>
          </motion.div>

          {/* Section Title: Desktop Target 58–76px */}
          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.08, ease: easeCurve }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] uppercase font-bold tracking-tight text-[#F2EBDD] leading-[1.05]"
          >
            TECHNICAL PROFILE
          </motion.h2>

          {/* Section Description: Desktop Target 19–22px */}
          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.16, ease: easeCurve }}
            className="mt-5 sm:mt-6 text-base sm:text-lg lg:text-[1.25rem] text-[#AAA398] font-normal leading-relaxed border-l border-[#292720] pl-6 max-w-3xl"
          >
            Core engineering capabilities organized across machine learning architectures,
            software systems, data pipelines, and computer science foundations.
          </motion.p>
        </div>

        {/* 4 Cards Grid with 70–100ms Sequential Stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {engineeringSnapshotData.map((category, idx) => {
            const isAiMl = category.id === 'ai-ml';

            return (
              <motion.div
                key={category.id}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.08,
                  ease: easeCurve,
                }}
                className={cn(
                  'rounded-xs border border-[#24221C] bg-[#0E0D0A] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300',
                  'hover:border-[#D49A46]/45 hover:bg-[#11100C] hover:-translate-y-[3px]',
                  'hover:shadow-[0_20px_45px_rgba(0,0,0,0.7)] group relative overflow-hidden'
                )}
              >
                {/* Subtle Card Variation: Left Accent Rule (AI/ML has slightly stronger accent line) */}
                <div
                  className={cn(
                    'absolute left-0 top-0 bottom-0 transition-transform duration-300 origin-top pointer-events-none',
                    isAiMl
                      ? 'w-[2.5px] bg-[#D49A46] scale-y-75 group-hover:scale-y-100'
                      : 'w-[1.5px] bg-[#D49A46]/80 scale-y-0 group-hover:scale-y-100'
                  )}
                  aria-hidden="true"
                />

                <div>
                  {/* Card Category Code & Icon: Desktop Target 13–15px */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span className="font-mono text-xs sm:text-[13px] text-[#6E6A62] tracking-[0.14em] uppercase font-semibold group-hover:text-[#D49A46] transition-colors">
                      {category.code}
                    </span>
                    <div className="text-[#55524B] group-hover:text-[#D49A46] transition-colors">
                      {getCategoryIcon(category.id)}
                    </div>
                  </div>

                  {/* Card Title: Desktop Target 27–34px (Hierarchy Rule: Dominant Anchor) */}
                  <h3 className="font-display text-2xl sm:text-[1.7rem] lg:text-[1.85rem] uppercase font-bold text-[#F2EBDD] tracking-tight mb-3 group-hover:text-[#FFFDF9] transition-colors leading-[1.15]">
                    {category.name}
                  </h3>

                  {/* Card Description/Subtitle: Desktop Target 16–18px */}
                  <p className="font-body text-sm sm:text-[15px] lg:text-[16px] text-[#8E887D] mb-7 leading-relaxed tracking-normal font-normal">
                    {category.subtitle}
                  </p>

                  {/* Skill List: Desktop Target 16–18px (Hierarchy Rule: SKILL LIST > DESCRIPTION) */}
                  <div className="space-y-3.5 sm:space-y-4">
                    {category.skills.map((skill) => (
                      <div
                        key={skill}
                        className="flex items-center gap-3 group/item"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#2E2B23] group-hover/item:bg-[#D49A46] transition-colors shrink-0" />
                        <span className="font-mono text-sm sm:text-[15px] text-[#DCD6CA] group-hover/item:text-[#FFFDF9] transition-colors tracking-tight font-medium">
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Metadata: Desktop Target 13–15px */}
                <div className="mt-10 sm:mt-12 pt-4 sm:pt-5 border-t border-[#24221C]">
                  <span className="font-mono text-xs sm:text-[13px] text-[#6E6A62] tracking-wide leading-relaxed block">
                    {category.evidence}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Factual Summary Footer (Clean, professional, free from pseudo-technical jargon) */}
        <div className="mt-10 pt-4 border-t border-[#292720]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs text-[#6E6A62]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" aria-hidden="true" />
            <span>APPLIED TECHNICAL STACK VERIFIED ACROSS CODE REPOSITORIES</span>
          </div>
          <span className="text-[#8E887D]">HYDERABAD, INDIA</span>
        </div>
      </Container>
    </section>
  );
};
