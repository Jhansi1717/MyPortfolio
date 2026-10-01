import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Play, Pause, RotateCcw, Check, Sparkles, Layers } from 'lucide-react';
import { ArchitecturePipelineStep } from '../../types/project';

export interface ArchitecturePipelineVisualProps {
  steps: ArchitecturePipelineStep[];
  projectTitle: string;
  projectNumber: string;
}

export const ArchitecturePipelineVisual: React.FC<ArchitecturePipelineVisualProps> = ({
  steps,
  projectTitle,
  projectNumber,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();

  const activeStep = steps[activeStepIndex] || steps[0];

  // Auto-play timer through pipeline stages
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setActiveStepIndex((prev) => {
        if (prev >= steps.length - 1) {
          setIsAutoPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, shouldReduceMotion ? 1400 : 2200);

    return () => clearInterval(timer);
  }, [isAutoPlaying, steps.length, shouldReduceMotion]);

  return (
    <div
      className="rounded-sm bg-[#11100C] border border-[#292720] overflow-hidden"
      aria-label={`${projectTitle} Architecture Pipeline Visualizer`}
    >
      {/* Visualizer Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 sm:px-6 py-3.5 bg-[#171612] border-b border-[#292720]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D49A46]" aria-hidden="true" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E5BA70]">
              PIPELINE TRACE
            </span>
          </div>
          <span className="text-[#4E4A42] text-xs font-mono">/</span>
          <span className="font-mono text-xs text-[#AAA398]">
            {steps.length} Verified Stages
          </span>
        </div>

        {/* Trace Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider px-3 py-1.5 rounded-xs bg-[#1E1D18] hover:bg-[#292720] border border-[#292720] text-[#F2EBDD] transition-colors focus-visible:outline-2 focus-visible:outline-[#D49A46] cursor-pointer"
            aria-label={isAutoPlaying ? 'Pause pipeline trace' : 'Auto-trace pipeline'}
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-3 h-3 text-[#D49A46]" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-[#D49A46]" />
                <span>Auto Trace</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setIsAutoPlaying(false);
              setActiveStepIndex(0);
            }}
            className="p-1.5 rounded-xs bg-[#1E1D18] hover:bg-[#292720] border border-[#292720] text-[#AAA398] hover:text-[#F2EBDD] transition-colors focus-visible:outline-2 focus-visible:outline-[#D49A46] cursor-pointer"
            aria-label="Reset trace to first stage"
            title="Reset trace to first stage"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Linear Pipeline Flow */}
      <div className="p-5 sm:p-7">
        <div className="font-mono text-[11px] uppercase tracking-wider text-[#888175] mb-4 flex items-center justify-between">
          <span>Click any stage to inspect inputs, outputs, and implementation details</span>
          <span className="text-[#D49A46]">
            Stage {activeStepIndex + 1} of {steps.length} Active
          </span>
        </div>

        {/* Desktop & Tablet Horizontal Pipeline */}
        <div className="overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-[#292720] scrollbar-track-transparent">
          <div className="flex items-center gap-2 min-w-max">
            {steps.map((step, idx) => {
              const isSelected = activeStepIndex === idx;
              const isLast = idx === steps.length - 1;

              return (
                <React.Fragment key={step.id}>
                  {/* Step Node Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setActiveStepIndex(idx);
                    }}
                    className={`text-left p-3.5 rounded-xs border transition-all duration-200 cursor-pointer min-w-[155px] sm:min-w-[170px] ${
                      isSelected
                        ? 'bg-[#1C1A14] border-[#D49A46] shadow-[0_0_12px_rgba(212,154,70,0.2)]'
                        : 'bg-[#14130F] border-[#292720] hover:border-[#4E4A42] hover:bg-[#181712]'
                    }`}
                    aria-pressed={isSelected}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className={`font-mono text-[10px] font-bold ${
                          isSelected ? 'text-[#D49A46]' : 'text-[#68645C]'
                        }`}
                      >
                        STAGE {step.step}
                      </span>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46] animate-pulse" />
                      )}
                    </div>
                    <div
                      className={`font-display text-xs sm:text-sm font-bold uppercase tracking-tight line-clamp-1 ${
                        isSelected ? 'text-[#FFFDF9]' : 'text-[#DCD6CA]'
                      }`}
                    >
                      {step.label}
                    </div>
                    <div className="font-mono text-[10px] text-[#888175] truncate mt-0.5">
                      {step.sublabel}
                    </div>
                  </button>

                  {/* Flow Arrow */}
                  {!isLast && (
                    <div className="flex items-center text-[#4E4A42] shrink-0 px-1" aria-hidden="true">
                      <ArrowRight
                        className={`w-4 h-4 transition-colors ${
                          activeStepIndex > idx ? 'text-[#D49A46]' : 'text-[#3E3B33]'
                        }`}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Detail Panel */}
        {activeStep && (
          <motion.div
            key={activeStep.id}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-6 p-5 sm:p-6 rounded-xs bg-[#161511] border border-[#2E2B23]"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#292720]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-xs bg-[#201F18] border border-[#3E3B33] text-[#D49A46]">
                  STAGE {activeStep.step}
                </span>
                <h3 className="font-display text-base sm:text-lg font-bold uppercase text-[#F2EBDD]">
                  {activeStep.label}
                </h3>
                <span className="hidden sm:inline font-mono text-xs text-[#888175]">
                  ({activeStep.sublabel})
                </span>
              </div>

              {/* Technologies in this stage */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#AAA398]">
                {activeStep.technologies.map((tech, i) => (
                  <span key={tech} className="inline-flex items-center gap-2">
                    {i > 0 && <span className="text-[#4E4A42]" aria-hidden="true">·</span>}
                    <span className="font-mono text-[11px] text-[#E5BA70]">{tech}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Implementation Explanation */}
            <p className="mt-4 text-sm sm:text-base text-[#DCD6CA] leading-relaxed font-light">
              {activeStep.detail}
            </p>

            {/* Input & Output Specifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 pt-4 border-t border-[#292720]/80">
              <div className="p-3.5 rounded-xs bg-[#11100C] border border-[#24221C]">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#888175] mb-1">
                  STAGE INPUT ARTIFACT
                </div>
                <div className="font-mono text-xs text-[#F2EBDD]">
                  {activeStep.input}
                </div>
              </div>

              <div className="p-3.5 rounded-xs bg-[#11100C] border border-[#24221C]">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#D49A46] mb-1">
                  STAGE OUTPUT ARTIFACT
                </div>
                <div className="font-mono text-xs text-[#E5BA70]">
                  {activeStep.output}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
