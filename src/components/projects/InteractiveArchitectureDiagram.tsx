import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  Cpu,
  CheckCircle,
} from 'lucide-react';
import { ArchitectureNode } from '../../types/project';

export interface InteractiveArchitectureDiagramProps {
  nodes: ArchitectureNode[];
  projectTitle: string;
  projectNumber: string;
}

export const InteractiveArchitectureDiagram: React.FC<InteractiveArchitectureDiagramProps> = ({
  nodes,
  projectTitle,
  projectNumber,
}) => {
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();

  const activeNode = nodes[activeNodeIndex] || nodes[0];

  // Simulation timer for auto-tracing through architecture
  React.useEffect(() => {
    if (!isSimulating) return;

    const timer = setInterval(() => {
      setActiveNodeIndex((prev) => {
        if (prev >= nodes.length - 1) {
          setIsSimulating(false);
          return 0;
        }
        return prev + 1;
      });
    }, shouldReduceMotion ? 1200 : 2000);

    return () => clearInterval(timer);
  }, [isSimulating, nodes.length, shouldReduceMotion]);

  const handleNext = () => {
    setActiveNodeIndex((prev) => (prev < nodes.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setActiveNodeIndex((prev) => (prev > 0 ? prev - 1 : nodes.length - 1));
  };

  return (
    <div
      className="rounded-sm bg-[#11100C] border border-[#292720] overflow-hidden"
      id="system-architecture-visualization"
      aria-label={`${projectTitle} System Architecture Visualization`}
    >
      {/* Visualizer Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 sm:px-6 py-4 bg-[#171612] border-b border-[#292720]">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#D49A46] animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E5BA70]">
              SYS_{projectNumber} // ARCHITECTURAL FLOW
            </span>
          </div>
          <span className="text-[#68645C] text-xs">|</span>
          <span className="font-mono text-[11px] text-[#AAA398]">
            {nodes.length} SEQUENTIAL STAGES
          </span>
        </div>

        {/* Trace Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsSimulating(!isSimulating)}
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider px-2.5 py-1.5 rounded-xs bg-[#1E1D18] hover:bg-[#292720] border border-[#292720] text-[#F2EBDD] transition-colors focus-visible:outline-2 focus-visible:outline-[#D49A46] cursor-pointer"
            aria-label={isSimulating ? 'Pause signal trace' : 'Play signal trace'}
          >
            {isSimulating ? (
              <>
                <Pause className="w-3 h-3 text-[#D49A46]" />
                <span>PAUSE TRACE</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-[#D49A46]" />
                <span>AUTO-TRACE</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setIsSimulating(false);
              setActiveNodeIndex(0);
            }}
            className="p-1.5 rounded-xs bg-[#1E1D18] hover:bg-[#292720] border border-[#292720] text-[#AAA398] hover:text-[#F2EBDD] transition-colors focus-visible:outline-2 focus-visible:outline-[#D49A46] cursor-pointer"
            aria-label="Reset trace to stage 1"
            title="Reset trace to stage 1"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Interactive Pipeline Diagram */}
      <div className="p-5 sm:p-8">
        <div className="font-mono text-[11px] uppercase tracking-widest text-[#68645C] mb-4 flex items-center justify-between">
          <span>INTERACTIVE EXECUTION PIPELINE (CLICK ANY NODE TO INSPECT)</span>
          <span className="hidden md:inline text-[10px] text-[#888175]">
            STAGE {activeNodeIndex + 1} OF {nodes.length} SELECTED
          </span>
        </div>

        {/* Desktop / Tablet Flow */}
        <div className="relative">
          {/* Path drawing connecting nodes */}
          <div className="hidden lg:block relative mb-6">
            <svg
              className="w-full h-10 overflow-visible"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <line
                x1="4%"
                y1="50%"
                x2="96%"
                y2="50%"
                stroke="#292720"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <motion.line
                x1="4%"
                y1="50%"
                x2={`${Math.max(4, Math.min(96, ((activeNodeIndex + 0.5) / nodes.length) * 100))}%`}
                y2="50%"
                stroke="#D49A46"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                animate={{
                  x2: `${Math.max(4, Math.min(96, ((activeNodeIndex + 0.5) / nodes.length) * 100))}%`,
                }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
                strokeOpacity={0.9}
              />
              {/* Dynamic Signal Pulse along the active path */}
              {!shouldReduceMotion && (
                <circle
                  cx={`${Math.max(4, Math.min(96, ((activeNodeIndex + 0.5) / nodes.length) * 100))}%`}
                  cy="50%"
                  r="4"
                  fill="#E5BA70"
                  className="animate-ping opacity-75"
                />
              )}
            </svg>
          </div>

          {/* Node Grid / Row with mobile scroll snap */}
          <div
            role="tablist"
            aria-label="Pipeline Stages"
            className="flex overflow-x-auto snap-x snap-mandatory pb-3 gap-2.5 sm:gap-3 lg:grid lg:grid-flow-col lg:auto-cols-fr scrollbar-none"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {nodes.map((node, idx) => {
              const isActive = idx === activeNodeIndex;
              const isPast = idx < activeNodeIndex;

              return (
                <div
                  key={node.id}
                  className="snap-start shrink-0 w-[220px] sm:w-[240px] lg:w-auto flex flex-col"
                >
                  <button
                    type="button"
                    role="tab"
                    id={`stage-tab-${node.id}`}
                    aria-selected={isActive}
                    aria-controls={`stage-panel-${node.id}`}
                    onClick={() => {
                      setIsSimulating(false);
                      setActiveNodeIndex(idx);
                    }}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xs border transition-all duration-200 cursor-pointer flex flex-col justify-between h-full relative focus-visible:outline-2 focus-visible:outline-[#D49A46] ${
                      isActive
                        ? 'bg-[#1E1D18] border-[#D49A46] shadow-[0_0_20px_rgba(212,154,70,0.22)] ring-1 ring-[#D49A46] scale-[1.02]'
                        : isPast
                        ? 'bg-[#151410] border-[#38352C] hover:border-[#D49A46]/60 hover:text-[#F2EBDD]'
                        : 'bg-[#11100C] border-[#24221C] hover:border-[#38352C] hover:text-[#F2EBDD]'
                    }`}
                  >
                    {/* Active Pip */}
                    {isActive && (
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#D49A46] rotate-45 shadow-[0_0_8px_#D49A46]" />
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-xs ${
                            isActive
                              ? 'bg-[#D49A46] text-[#090907]'
                              : 'bg-[#1E1D18] text-[#888175] border border-[#292720]'
                          }`}
                        >
                          {node.stageNumber}
                        </span>

                        <span className="font-mono text-[9px] uppercase tracking-wider text-[#68645C]">
                          {node.category}
                        </span>
                      </div>

                      <div
                        className={`font-mono text-xs sm:text-sm font-semibold tracking-tight uppercase leading-snug ${
                          isActive
                            ? 'text-[#F2EBDD]'
                            : 'text-[#AAA398] group-hover:text-[#F2EBDD]'
                        }`}
                      >
                        {node.name}
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#292720]/60 flex items-center justify-between">
                      <span className="font-mono text-[9px] text-[#68645C] uppercase">
                        {isActive ? 'INSPECTING' : 'CLICK TO VIEW'}
                      </span>
                      {isActive ? (
                        <CheckCircle className="w-3 h-3 text-[#D49A46]" />
                      ) : (
                        <ArrowRight className="w-2.5 h-2.5 text-[#4A473F]" />
                      )}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Deep-Dive Card */}
        <div
          id={`stage-panel-${activeNode.id}`}
          role="tabpanel"
          aria-labelledby={`stage-tab-${activeNode.id}`}
          className="mt-6 p-5 sm:p-6 rounded-xs bg-[#171612] border border-[#292720]"
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-[#292720]">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xs bg-[#1E1D18] border border-[#292720] text-[#D49A46] shrink-0 mt-0.5">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-[#D49A46]">
                    STAGE {activeNode.stageNumber}
                  </span>
                  <span className="text-[#68645C]">•</span>
                  <span className="font-mono text-xs text-[#AAA398] uppercase">
                    {activeNode.category}
                  </span>
                </div>
                <h4 className="font-display text-lg sm:text-xl font-bold uppercase text-[#F2EBDD]">
                  {activeNode.name}
                </h4>
              </div>
            </div>

            {/* Stepper Buttons */}
            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                type="button"
                onClick={handlePrev}
                className="font-mono text-xs text-[#AAA398] hover:text-[#F2EBDD] px-2.5 py-1 rounded-xs bg-[#1E1D18] border border-[#292720] hover:border-[#68645C] transition-colors focus-visible:outline-2 focus-visible:outline-[#D49A46] cursor-pointer"
                aria-label="Inspect previous stage"
              >
                ← PREV
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="font-mono text-xs text-[#090907] font-semibold bg-[#D49A46] hover:bg-[#E5BA70] px-3 py-1 rounded-xs transition-colors focus-visible:outline-2 focus-visible:outline-[#D49A46] cursor-pointer"
                aria-label="Inspect next stage"
              >
                NEXT →
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="mt-4 text-sm text-[#DCD6CA] leading-relaxed">
            {activeNode.description}
          </p>

          {/* I/O Specifications & Technologies */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5 pt-4 border-t border-[#292720]">
            {activeNode.input && (
              <div className="p-3 rounded-xs bg-[#11100C] border border-[#24221C]">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#68645C] mb-1">
                  INPUT DATA
                </div>
                <div className="font-mono text-xs text-[#E5BA70]">
                  {activeNode.input}
                </div>
              </div>
            )}

            {activeNode.output && (
              <div className="p-3 rounded-xs bg-[#11100C] border border-[#24221C]">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#68645C] mb-1">
                  OUTPUT / TRANSFORMATION
                </div>
                <div className="font-mono text-xs text-[#F2EBDD]">
                  {activeNode.output}
                </div>
              </div>
            )}

            {activeNode.technologies && activeNode.technologies.length > 0 && (
              <div className="p-3 rounded-xs bg-[#11100C] border border-[#24221C]">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#68645C] mb-1">
                  CORE TECH / LIBRARIES
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {activeNode.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] text-[#AAA398] bg-[#171612] px-1.5 py-0.5 rounded-xs border border-[#292720]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
