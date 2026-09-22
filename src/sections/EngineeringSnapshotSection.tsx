import React from 'react';
import { motion } from 'motion/react';
import { Container } from '../components/primitives/Container';
import { engineeringSnapshotData } from '../data/portfolioData';
import { Brain, Terminal, Database, Cpu, Check, Layers } from 'lucide-react';
import { cn } from '../lib/utils';
import { MOTION_TIMING, MOTION_EASING } from '../animations/motionTokens';

export const EngineeringSnapshotSection: React.FC = () => {
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'ai-ml':
        return <Brain className="w-4 h-4 text-[#D49A46] group-hover:scale-110 transition-transform duration-200" aria-hidden="true" />;
      case 'engineering':
        return <Terminal className="w-4 h-4 text-[#D49A46] group-hover:scale-110 transition-transform duration-200" aria-hidden="true" />;
      case 'data':
        return <Database className="w-4 h-4 text-[#D49A46] group-hover:scale-110 transition-transform duration-200" aria-hidden="true" />;
      case 'core-cs':
        return <Cpu className="w-4 h-4 text-[#D49A46] group-hover:scale-110 transition-transform duration-200" aria-hidden="true" />;
      default:
        return <Layers className="w-4 h-4 text-[#D49A46] group-hover:scale-110 transition-transform duration-200" aria-hidden="true" />;
    }
  };

  return (
    <section
      id="snapshot"
      aria-label="Engineering Snapshot Section"
      className="py-20 md:py-28 border-b border-[#292720] bg-[#090907] relative scroll-mt-20"
    >
      <Container size="wide">
        {/* Section Heading: TECHNICAL PROFILE */}
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
              STRUCTURED CAPABILITY MATRIX
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase font-bold tracking-tight text-[#F2EBDD] leading-tight">
            TECHNICAL PROFILE
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#AAA398] font-normal leading-relaxed max-w-2xl">
            Core engineering capabilities organized across machine learning architectures, software engineering runtimes, data systems, and fundamental computer science theory.
          </p>
        </motion.div>

        {/* 4 Visual Categories Grid with Sequential Stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {engineeringSnapshotData.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 24, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: MOTION_TIMING.slow,
                delay: idx * 0.08,
                ease: MOTION_EASING.smooth,
              }}
              className={cn(
                'rounded-xs border border-[#292720] bg-[#11110E] p-6 flex flex-col justify-between',
                'hover:border-[#38352C] hover:bg-[#14130F] md:hover:-translate-y-1 transition-all duration-380',
                'hover:shadow-[0_12px_28px_rgba(0,0,0,0.4)]',
                'focus-within:border-[#D49A46]/60 focus-within:ring-1 focus-within:ring-[#D49A46]/30',
                'group relative overflow-hidden'
              )}
            >
              {/* Animated Top Accent Line */}
              <div
                className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#D49A46] via-[#E5BA70] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] origin-left pointer-events-none"
                aria-hidden="true"
              />

              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[11px] text-[#D49A46] tracking-wider uppercase font-medium group-hover:translate-x-0.5 transition-transform duration-200">
                    {category.code}
                  </span>
                  <div className="p-1.5 rounded-xs bg-[#171612] border border-[#292720] group-hover:border-[#D49A46]/40 transition-colors">
                    {getCategoryIcon(category.id)}
                  </div>
                </div>

                {/* Category Title */}
                <h3 className="font-display text-xl uppercase font-bold text-[#F2EBDD] tracking-wide mb-1 group-hover:text-[#FFFDF9] transition-colors">
                  {category.name}
                </h3>

                {/* Subtitle / Architectural Descriptor */}
                <p className="font-mono text-xs text-[#68645C] mb-6 leading-relaxed">
                  {category.subtitle}
                </p>

                {/* Structural Skill Roster */}
                <div className="pt-4 border-t border-[#292720]">
                  <ul role="list" className="space-y-2.5">
                    {category.skills.map((skill) => (
                      <li
                        key={skill}
                        className="flex items-center gap-2.5 text-xs sm:text-sm font-mono text-[#AAA398] group/item hover:text-[#F2EBDD] transition-colors"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-xs bg-[#292720] border border-[#38352C] group-hover/item:border-[#D49A46] group-hover/item:bg-[#D49A46] group-hover/item:scale-110 transition-all shrink-0"
                          aria-hidden="true"
                        />
                        <span className="tracking-wide">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Capability Evidence Footer */}
              <div className="mt-8 pt-4 border-t border-[#292720]/80">
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#D49A46] shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="font-mono text-[10px] text-[#68645C] uppercase tracking-wider leading-relaxed">
                    {category.evidence}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Structural Rigor Note */}
        <div className="mt-8 pt-4 border-t border-[#292720]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-[#68645C]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]/60" aria-hidden="true" />
            <span>MEASURED BY ARCHITECTURAL EXECUTION & CODE ARTIFACTS</span>
          </div>
          <div className="tracking-widest uppercase">
            0% ARBITRARY GAUGES · 100% FACTUAL STACK
          </div>
        </div>
      </Container>
    </section>
  );
};

