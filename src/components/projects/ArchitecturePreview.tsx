import React, { useState } from 'react';
import { ChevronRight, Layers, Terminal } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ProjectArchitecture } from '../../types/project';

export interface ArchitecturePreviewProps {
  architecture: ProjectArchitecture;
  projectNumber: string;
  isCardHovered?: boolean;
}

export const ArchitecturePreview: React.FC<ArchitecturePreviewProps> = ({
  architecture,
  projectNumber,
  isCardHovered = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="mt-6 pt-5 border-t border-[#292720]/80 transition-colors duration-300">
      {/* Header and Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          {/* Signal Indicator Dot */}
          <span
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              isCardHovered ? 'bg-[#D49A46] shadow-[0_0_6px_#D49A46]' : 'bg-[#D49A46]/60'
            }`}
          />
          <span
            className={`font-mono text-xs uppercase tracking-widest transition-colors duration-300 ${
              isCardHovered ? 'text-[#E5BA70]' : 'text-[#888175]'
            }`}
          >
            ARCHITECTURE SPECIFICATION
          </span>
          <span className="font-mono text-[10px] text-[#68645C] px-1.5 py-0.5 border border-[#292720] rounded-xs">
            SYS_{projectNumber}_FLOW
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[#AAA398] hover:text-[#D49A46] transition-colors focus-visible:outline-2 focus-visible:outline-[#D49A46] rounded-xs cursor-pointer py-1 px-1.5 self-start sm:self-auto"
          aria-expanded={isExpanded}
        >
          <Layers className="w-3.5 h-3.5 text-[#D49A46]" />
          <span>{isExpanded ? 'COLLAPSE PIPELINE' : 'VIEW PIPELINE FLOW'}</span>
          <ChevronRight
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isExpanded ? 'rotate-90 text-[#D49A46]' : 'text-[#68645C]'
            }`}
          />
        </button>
      </div>

      {/* Summary */}
      <p className="text-xs sm:text-sm text-[#AAA398] leading-relaxed mb-4 font-mono">
        {architecture.summary}
      </p>

      {/* Pipeline Inline Preview (Rest & Hover State) */}
      <div className="p-3.5 sm:p-4 rounded-xs bg-[#090907]/90 border border-[#24221C] transition-colors duration-300 group-hover:border-[#38352C] relative overflow-hidden">
        {/* Subtle traveling signal glow across top of preview box during hover */}
        {isCardHovered && !shouldReduceMotion && (
          <motion.div
            className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D49A46] to-transparent pointer-events-none opacity-80"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: 'easeInOut',
            }}
          />
        )}

        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 overflow-x-auto pb-1">
          {architecture.pipeline.map((node, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === architecture.pipeline.length - 1;

            return (
              <React.Fragment key={idx}>
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xs border transition-all duration-300 shrink-0 ${
                    isCardHovered
                      ? 'bg-[#191813] border-[#38352C] text-[#F2EBDD]'
                      : 'bg-[#14130F] border-[#24221C] text-[#AAA398]'
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] font-bold transition-colors ${
                      isCardHovered ? 'text-[#D49A46]' : 'text-[#68645C]'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <span className="font-mono text-xs whitespace-nowrap">{node}</span>
                </div>
                {!isLast && (
                  <div
                    className={`flex justify-center items-center shrink-0 rotate-90 lg:rotate-0 my-0.5 lg:my-0 transition-colors duration-300 ${
                      isCardHovered ? 'text-[#D49A46]' : 'text-[#4A473F]'
                    }`}
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Detailed highlights when expanded */}
        {isExpanded && architecture.keyHighlights && architecture.keyHighlights.length > 0 && (
          <div className="mt-4 pt-3 border-t border-[#1E1D18] animate-fadeIn">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#68645C] mb-2 flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-[#D49A46]" />
              <span>VERIFIED ARCHITECTURAL HIGHLIGHTS</span>
            </div>
            <ul className="space-y-1.5">
              {architecture.keyHighlights.map((hl, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[#AAA398]">
                  <span className="w-1 h-1 rounded-full bg-[#D49A46] mt-1.5 shrink-0" />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

