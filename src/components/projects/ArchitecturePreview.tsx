import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ProjectArchitecture } from '../../types/project';

export interface ArchitecturePreviewProps {
  architecture: ProjectArchitecture;
  projectNumber: string;
  isCardHovered?: boolean;
  isMobileActive?: boolean;
}

export const ArchitecturePreview: React.FC<ArchitecturePreviewProps> = ({
  architecture,
  projectNumber,
  isCardHovered = false,
  isMobileActive = false,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const isInteractive = isCardHovered || isMobileActive;

  // The signal moves ONLY while the user interacts with the project (hover or tap)
  useEffect(() => {
    if (!isInteractive || shouldReduceMotion) {
      setActiveStepIndex(null);
      return;
    }

    let current = 0;
    setActiveStepIndex(0);

    const interval = setInterval(() => {
      current = (current + 1) % architecture.pipeline.length;
      setActiveStepIndex(current);
    }, 550);

    return () => clearInterval(interval);
  }, [isInteractive, shouldReduceMotion, architecture.pipeline.length]);

  return (
    <div className="w-full">
      {/* Header and Status Indicator */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          {/* Signal Indicator Dot */}
          <span
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              isInteractive ? 'bg-[#D49A46] shadow-[0_0_8px_#D49A46]' : 'bg-[#68645C]'
            }`}
            aria-hidden="true"
          />
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.10em] text-[#8E887D] font-medium">
            ARCHITECTURE PIPELINE
          </span>
        </div>

        <span className="font-mono text-[10px] text-[#68645C] tracking-[0.08em] uppercase">
          SYS_{projectNumber} // DATAFLOW
        </span>
      </div>

      {/* Pipeline Container with Controlled Horizontal Scroll on Small Screens */}
      <div className="p-3 sm:p-3.5 rounded-xs bg-[#11110E] border border-[#24221C] transition-colors duration-300 relative overflow-hidden">
        
        {/* Subtle traveling signal glow across top border during interaction */}
        {isInteractive && !shouldReduceMotion && (
          <motion.div
            className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D49A46] to-transparent pointer-events-none opacity-80"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: 'easeInOut',
            }}
          />
        )}

        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 pt-0.5 scrollbar-thin scrollbar-thumb-[#292720] scrollbar-track-transparent">
          {architecture.pipeline.map((node, idx) => {
            const isLast = idx === architecture.pipeline.length - 1;
            const isActiveNode = activeStepIndex === idx;

            return (
              <React.Fragment key={idx}>
                {/* Node Box */}
                <div
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xs border transition-all duration-300 shrink-0 ${
                    isActiveNode
                      ? 'bg-[#1E1B13] border-[#D49A46] text-[#F2EBDD] shadow-[0_0_10px_rgba(212,154,70,0.25)]'
                      : isInteractive
                      ? 'bg-[#14130F] border-[#2E2B23] text-[#AAA398]'
                      : 'bg-[#0E0D0A] border-[#201F19] text-[#787368]'
                  }`}
                >
                  <span
                    className={`font-mono text-[9px] sm:text-[10px] font-medium transition-colors ${
                      isActiveNode
                        ? 'text-[#D49A46]'
                        : isInteractive
                        ? 'text-[#8E887D]'
                        : 'text-[#55524B]'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <span className="font-mono text-[10px] sm:text-[11px] whitespace-nowrap font-medium tracking-[0.06em]">
                    {node}
                  </span>
                </div>

                {/* Arrow Connector */}
                {!isLast && (
                  <div
                    className={`flex items-center justify-center shrink-0 transition-colors duration-300 ${
                      isActiveNode || isInteractive ? 'text-[#D49A46]' : 'text-[#3A382F]'
                    }`}
                    aria-hidden="true"
                  >
                    <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
