import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Database,
  Cpu,
  Server,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Terminal,
  Activity,
  Play,
  RotateCcw,
  Sliders,
  ExternalLink,
} from 'lucide-react';
import {
  systemsLabLayers,
  concreteProjectExamples,
  SystemLayer,
  SystemLayerNode,
  ConcreteProjectExample,
} from '../../data/systemsLabData';
import { Card } from '../primitives/Card';
import { Badge } from '../primitives/Badge';

export const SystemsLabVisualizer: React.FC = () => {
  const [selectedLayerId, setSelectedLayerId] = useState<'DATA' | 'MODEL' | 'SYSTEM' | 'PRODUCT'>('DATA');
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);
  const [activeProjectExampleId, setActiveProjectExampleId] = useState<string | null>(null);
  const [traceStepIndex, setTraceStepIndex] = useState<number>(0);
  const shouldReduceMotion = useReducedMotion();

  const currentLayer = systemsLabLayers.find((l) => l.id === selectedLayerId) || systemsLabLayers[0];
  const currentNode = currentLayer.nodes[selectedNodeIndex] || currentLayer.nodes[0];
  const activeExample = concreteProjectExamples.find((ex) => ex.id === activeProjectExampleId) || null;

  // When layer changes, reset selected node index
  const handleLayerSelect = (layerId: 'DATA' | 'MODEL' | 'SYSTEM' | 'PRODUCT') => {
    setSelectedLayerId(layerId);
    setSelectedNodeIndex(0);
    setActiveProjectExampleId(null);
  };

  // When project example is clicked, activate trace mode
  const handleProjectSelect = (projectId: string) => {
    if (activeProjectExampleId === projectId) {
      setActiveProjectExampleId(null);
      setTraceStepIndex(0);
    } else {
      setActiveProjectExampleId(projectId);
      setTraceStepIndex(0);
      const targetExample = concreteProjectExamples.find((p) => p.id === projectId);
      if (targetExample && targetExample.traceSteps.length > 0) {
        setSelectedLayerId(targetExample.traceSteps[0].layer);
      }
    }
  };

  const getLayerIcon = (id: string, className = 'w-4 h-4') => {
    switch (id) {
      case 'DATA':
        return <Database className={className} />;
      case 'MODEL':
        return <Cpu className={className} />;
      case 'SYSTEM':
        return <Server className={className} />;
      case 'PRODUCT':
        return <Sparkles className={className} />;
      default:
        return <Layers className={className} />;
    }
  };

  return (
    <div
      className="rounded-sm bg-[#11100C] border border-[#292720] overflow-hidden"
      id="systems-lab-exhibit"
      aria-label="Systems Lab Interactive Architecture Visualizer"
    >
      {/* Exhibit Header Bar */}
      <div className="px-5 sm:px-8 py-4 bg-[#171612] border-b border-[#292720] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#D49A46] animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E5BA70]">
              SYS_LAB // ARCHITECTURE_STRATA
            </span>
          </div>
          <span className="text-[#68645C] text-xs">|</span>
          <span className="font-mono text-[11px] text-[#AAA398]">
            4 INTERACTIVE LAYERS · 2 FACTUAL SYSTEM TRACES
          </span>
        </div>

        {/* Project Trace Mode Toggle Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#68645C]">
            TRACE EXAMPLE:
          </span>
          {concreteProjectExamples.map((ex) => {
            const isSelected = activeProjectExampleId === ex.id;
            return (
              <button
                key={ex.id}
                type="button"
                onClick={() => handleProjectSelect(ex.id)}
                className={`font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-xs border transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D49A46] ${
                  isSelected
                    ? 'bg-[#D49A46] text-[#090907] border-[#D49A46] font-bold shadow-[0_0_12px_rgba(212,154,70,0.3)]'
                    : 'bg-[#1E1D18] text-[#AAA398] hover:text-[#F2EBDD] border-[#292720] hover:border-[#68645C]'
                }`}
                aria-pressed={isSelected}
                aria-label={`Trace system pipeline for ${ex.title}`}
              >
                {ex.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Layer Navigation Tabs */}
      <div
        role="tablist"
        aria-label="Systems Architecture Layers"
        className="grid grid-cols-2 md:grid-cols-4 border-b border-[#292720] bg-[#14130F]"
      >
        {systemsLabLayers.map((layer) => {
          const isSelected = selectedLayerId === layer.id;
          const isHighlightedByTrace =
            activeExample && activeExample.traceSteps[traceStepIndex]?.layer === layer.id;

          return (
            <button
              key={layer.id}
              type="button"
              role="tab"
              id={`tab-${layer.id}`}
              aria-selected={isSelected}
              aria-controls={`panel-${layer.id}`}
              onClick={() => handleLayerSelect(layer.id)}
              className={`p-4 sm:p-5 text-left border-b-2 transition-all duration-300 cursor-pointer relative focus-visible:outline-2 focus-visible:outline-[#D49A46] ${
                isSelected
                  ? 'border-[#D49A46] bg-[#1C1A14] shadow-[inset_0_1px_0_0_rgba(212,154,70,0.4)]'
                  : isHighlightedByTrace
                  ? 'border-[#D49A46]/60 bg-[#171612]'
                  : 'border-transparent hover:bg-[#181712] hover:border-[#38352C] border-r border-r-[#292720]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-xs transition-colors duration-200 ${
                    isSelected
                      ? 'bg-[#D49A46] text-[#090907]'
                      : 'bg-[#1E1D18] text-[#888175] border border-[#292720]'
                  }`}
                >
                  LAYER {layer.number}
                </span>
                <div
                  className={`p-1 rounded-xs transition-transform duration-200 ${
                    isSelected ? 'text-[#D49A46] scale-110' : 'text-[#68645C]'
                  }`}
                >
                  {getLayerIcon(layer.id, 'w-3.5 h-3.5')}
                </div>
              </div>

              <div
                className={`font-display text-base sm:text-lg font-bold uppercase tracking-tight transition-colors duration-200 ${
                  isSelected ? 'text-[#F2EBDD]' : 'text-[#AAA398]'
                }`}
              >
                {layer.title}
              </div>

              <div className="font-mono text-[10px] text-[#888175] truncate mt-0.5">
                {layer.subtitle}
              </div>

              {/* Active illuminated top bar */}
              {isSelected && (
                <motion.div
                  layoutId="active-lab-tab-indicator"
                  className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#D49A46] via-[#E5BA70] to-[#D49A46] shadow-[0_0_10px_#D49A46]"
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1.0] }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage Area */}
      <div className="p-5 sm:p-8 md:p-10">
        {/* Active Project Trace Banner (When activated) */}
        {activeExample && (
          <div className="mb-8 p-4 sm:p-5 rounded-xs bg-[#171612] border border-[#D49A46]/60">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#292720]">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#D49A46] animate-pulse" />
                <span className="font-mono text-xs font-bold text-[#E5BA70] uppercase tracking-wider">
                  ACTIVE SYSTEM TRACE: {activeExample.title}
                </span>
                <span className="font-mono text-[10px] text-[#888175] hidden md:inline">
                  [{activeExample.category}]
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const nextIndex = (traceStepIndex + 1) % activeExample.traceSteps.length;
                    setTraceStepIndex(nextIndex);
                    setSelectedLayerId(activeExample.traceSteps[nextIndex].layer);
                  }}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-[#090907] bg-[#D49A46] hover:bg-[#E5BA70] font-bold px-3 py-1 rounded-xs transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D49A46]"
                >
                  <span>STEP THROUGH FLOW</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Step Sequence Pills */}
            <div className="flex flex-wrap items-center gap-2 mt-3 pt-1">
              {activeExample.traceSteps.map((step, sIdx) => {
                const isStepActive = sIdx === traceStepIndex;
                return (
                  <button
                    key={sIdx}
                    type="button"
                    onClick={() => {
                      setTraceStepIndex(sIdx);
                      setSelectedLayerId(step.layer);
                    }}
                    className={`inline-flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded-xs border transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D49A46] ${
                      isStepActive
                        ? 'bg-[#1E1D18] border-[#D49A46] text-[#F2EBDD] ring-1 ring-[#D49A46]'
                        : 'bg-[#11100C] border-[#292720] text-[#888175] hover:text-[#AAA398]'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isStepActive ? 'bg-[#D49A46]' : 'bg-[#4A473F]'
                      }`}
                    />
                    <span className="font-bold">{step.label}</span>
                    <span className="text-[10px] text-[#68645C]">({step.layer})</span>
                  </button>
                );
              })}
            </div>

            {/* Current Trace Step Detail */}
            <div className="mt-4 p-3.5 rounded-xs bg-[#11100C] border border-[#292720] flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#D49A46] block mb-0.5">
                  CURRENT STAGE EXECUTION
                </span>
                <p className="text-xs sm:text-sm text-[#DCD6CA]">
                  {activeExample.traceSteps[traceStepIndex]?.detail}
                </p>
              </div>
              <div className="shrink-0 font-mono text-[11px] text-[#E5BA70] px-2.5 py-1 rounded-xs bg-[#171612] border border-[#292720]">
                ARTIFACT: {activeExample.traceSteps[traceStepIndex]?.technicalArtifact}
              </div>
            </div>
          </div>
        )}

        {/* Central System Diagram (Desktop) & Progressive Vertical Interface (Mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Layer Pipeline Nodes (Central Schematic) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center justify-between pb-2 border-b border-[#292720]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#D49A46] font-bold">
                  {currentLayer.id} PIPELINE
                </span>
                <span className="text-[#68645C]">•</span>
                <span className="font-mono text-xs text-[#AAA398] uppercase">
                  {currentLayer.nodes.length} SEQUENTIAL STAGES
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#68645C] hidden sm:inline">
                CLICK ANY NODE TO INSPECT
              </span>
            </div>

            {/* Animated Vector Path on Desktop */}
            <div className="hidden md:block relative overflow-hidden py-1">
              <svg className="w-full h-4" preserveAspectRatio="none" aria-hidden="true">
                <line
                  x1="5%"
                  y1="50%"
                  x2="95%"
                  y2="50%"
                  stroke="#292720"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <motion.line
                  x1="5%"
                  y1="50%"
                  x2="95%"
                  y2="50%"
                  stroke="#D49A46"
                  strokeWidth="2"
                  initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: 'easeOut' }}
                  strokeOpacity={0.8}
                />
              </svg>
              {/* Traveling signal pulse */}
              {!shouldReduceMotion && (
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-8 h-[2px] bg-gradient-to-r from-transparent via-[#E5BA70] to-transparent pointer-events-none shadow-[0_0_8px_#D49A46]"
                  initial={{ left: '5%', opacity: 0 }}
                  animate={{
                    left: ['5%', '92%'],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    repeatDelay: 1,
                  }}
                />
              )}
            </div>

            {/* Nodes Grid (Desktop Horizontal / Mobile Vertical Progressive Flow) */}
            <div
              role="list"
              aria-label={`${currentLayer.title} Nodes`}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 relative"
            >
              {currentLayer.nodes.map((node, nIdx) => {
                const isNodeSelected = nIdx === selectedNodeIndex;
                const isFirst = nIdx === 0;
                const isLast = nIdx === currentLayer.nodes.length - 1;

                return (
                  <div key={node.id} className="relative flex flex-col">
                    <button
                      type="button"
                      onClick={() => setSelectedNodeIndex(nIdx)}
                      className={`w-full text-left p-4 rounded-xs border transition-all duration-300 cursor-pointer flex flex-col justify-between h-full relative focus-visible:outline-2 focus-visible:outline-[#D49A46] ${
                        isNodeSelected
                          ? 'bg-[#1E1D18] border-[#D49A46] shadow-[0_0_18px_rgba(212,154,70,0.22)] ring-1 ring-[#D49A46]/60 md:-translate-y-0.5'
                          : 'bg-[#11100C] border-[#24221C] hover:border-[#38352C] hover:bg-[#151410] md:hover:-translate-y-0.5'
                      }`}
                      aria-pressed={isNodeSelected}
                      aria-label={`Select ${node.name} stage`}
                    >
                      {/* Active Indicator Pip */}
                      {isNodeSelected && (
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#D49A46] rotate-45 shadow-[0_0_6px_#D49A46]" />
                      )}

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-xs transition-colors duration-200 ${
                              isNodeSelected
                                ? 'bg-[#D49A46] text-[#090907]'
                                : 'bg-[#171612] text-[#888175] border border-[#292720]'
                            }`}
                          >
                            {node.step}
                          </span>
                          <span className="font-mono text-[9px] text-[#68645C] uppercase">
                            {isFirst ? 'START' : isLast ? 'TARGET' : 'STEP'}
                          </span>
                        </div>

                        <div
                          className={`font-mono text-sm font-bold uppercase tracking-tight leading-snug transition-colors duration-200 ${
                            isNodeSelected ? 'text-[#F2EBDD]' : 'text-[#AAA398]'
                          }`}
                        >
                          {node.name}
                        </div>
                      </div>

                      <div className="mt-4 pt-2 border-t border-[#292720]/70 flex items-center justify-between">
                        <span className="font-mono text-[9px] text-[#68645C] uppercase">
                          {isNodeSelected ? 'INSPECTING' : 'CLICK'}
                        </span>
                        {isNodeSelected ? (
                          <CheckCircle className="w-3 h-3 text-[#D49A46]" />
                        ) : (
                          <ArrowRight className="w-3 h-3 text-[#4A473F] group-hover:translate-x-0.5 transition-transform" />
                        )}
                      </div>
                    </button>

                    {/* Mobile Downward Arrow Between Sequential Nodes */}
                    {!isLast && (
                      <div className="sm:hidden flex justify-center py-1 text-[#D49A46]/60">
                        ↓
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Layer Narrative Summary */}
            <div className="p-5 rounded-xs bg-[#171612] border border-[#292720]">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#D49A46] mb-2">
                <Terminal className="w-3.5 h-3.5" />
                <span>LAYER ROLE IN SYSTEM SYNTHESIS</span>
              </div>
              <p className="text-xs sm:text-sm text-[#DCD6CA] leading-relaxed font-light">
                {currentLayer.description}
              </p>
            </div>
          </div>

          {/* Right Column: Deep-Dive Node Inspection Console */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Card variant="surface" className="p-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#292720] mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-xs bg-[#1E1D18] border border-[#292720] text-[#D49A46]">
                    {getLayerIcon(currentLayer.id, 'w-4 h-4')}
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-[#68645C] block">
                      NODE INSPECTION
                    </span>
                    <span className="font-mono text-xs font-bold text-[#E5BA70] uppercase">
                      {currentLayer.id} // {currentNode.name}
                    </span>
                  </div>
                </div>

                <span className="font-mono text-xs text-[#D49A46] font-bold px-2 py-0.5 rounded-xs bg-[#171612] border border-[#292720]">
                  STAGE {currentNode.step}
                </span>
              </div>

              {/* Stage Description */}
              <div className="mb-6">
                <h4 className="font-display text-lg font-bold uppercase text-[#F2EBDD] mb-2">
                  {currentNode.name}
                </h4>
                <p className="text-xs sm:text-sm text-[#AAA398] leading-relaxed">
                  {currentNode.description}
                </p>
              </div>

              {/* Verified Real-World Implementations */}
              <div className="space-y-4 pt-4 border-t border-[#292720]">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#D49A46] flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>FACTUAL PROJECT APPLICATIONS</span>
                </div>

                {/* Respiratory Screening Application */}
                <div className="p-3.5 rounded-xs bg-[#11100C] border border-[#24221C]">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#E5BA70] mb-1">
                    01 // RESPIRATORY SCREENING
                  </div>
                  <p className="text-xs text-[#DCD6CA] leading-relaxed font-light">
                    {currentNode.verifiedApplication.respiratory}
                  </p>
                </div>

                {/* Mental Health QA Application */}
                <div className="p-3.5 rounded-xs bg-[#11100C] border border-[#24221C]">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#E5BA70] mb-1">
                    02 // MENTAL HEALTH QA
                  </div>
                  <p className="text-xs text-[#DCD6CA] leading-relaxed font-light">
                    {currentNode.verifiedApplication.mentalHealth}
                  </p>
                </div>
              </div>

              {/* Deployed Technologies for this node */}
              <div className="mt-5 pt-4 border-t border-[#292720]">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#68645C] mb-2">
                  ASSOCIATED TECHNOLOGIES & LIBRARIES
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {currentNode.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] text-[#AAA398] bg-[#171612] px-2 py-0.5 rounded-xs border border-[#292720]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Card>

            {/* Stepper Footer Controls */}
            <div className="flex items-center justify-between p-4 rounded-xs bg-[#171612] border border-[#292720]">
              <button
                type="button"
                onClick={() =>
                  setSelectedNodeIndex((prev) =>
                    prev > 0 ? prev - 1 : currentLayer.nodes.length - 1
                  )
                }
                className="font-mono text-xs text-[#AAA398] hover:text-[#F2EBDD] px-3 py-1.5 rounded-xs bg-[#1E1D18] border border-[#292720] hover:border-[#68645C] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D49A46]"
                aria-label="Previous pipeline node"
              >
                ← PREV NODE
              </button>

              <span className="font-mono text-[11px] text-[#888175]">
                {selectedNodeIndex + 1} OF {currentLayer.nodes.length}
              </span>

              <button
                type="button"
                onClick={() =>
                  setSelectedNodeIndex((prev) =>
                    prev < currentLayer.nodes.length - 1 ? prev + 1 : 0
                  )
                }
                className="font-mono text-xs text-[#090907] font-semibold bg-[#D49A46] hover:bg-[#E5BA70] px-3.5 py-1.5 rounded-xs transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D49A46]"
                aria-label="Next pipeline node"
              >
                NEXT NODE →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
