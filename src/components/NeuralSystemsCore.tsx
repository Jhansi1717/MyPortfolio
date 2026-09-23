import React, { useState, useEffect, useRef } from 'react';

type StageType = 'DATA' | 'MODELS' | 'SYSTEM' | 'OUTPUT';

const STAGES: StageType[] = ['DATA', 'MODELS', 'SYSTEM', 'OUTPUT'];

export const NeuralSystemsCore: React.FC = () => {
  const [activeStage, setActiveStage] = useState<StageType>('MODELS');
  const [hoveredStage, setHoveredStage] = useState<StageType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.01 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Canvas visual rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    // Node topology mapped to architectural layers: 0: DATA, 1: MODELS, 2: SYSTEM, 3: OUTPUT
    interface CoreNode {
      id: number;
      layer: number; // 0..3
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      radius: number;
      phase: number;
      speed: number;
      label: string;
    }

    interface CoreEdge {
      source: number;
      target: number;
      layerFrom: number;
      layerTo: number;
      weight: number;
    }

    interface CorePulse {
      edgeIdx: number;
      progress: number;
      speed: number;
    }

    const nodes: CoreNode[] = [];
    const edges: CoreEdge[] = [];
    const pulses: CorePulse[] = [];

    const initStage = (w: number, h: number) => {
      nodes.length = 0;
      edges.length = 0;
      pulses.length = 0;

      const layerXCoords = [w * 0.18, w * 0.40, w * 0.62, w * 0.84];
      const layerNodeCounts = [3, 4, 3, 2];
      const layerLabels = [
        ['AUDIO', 'TEXT', 'METRICS'],
        ['TRANSFORMER', 'CNN', 'EFFICIENTNET', 'ROBERTA'],
        ['REST GATEWAY', 'JWT AUTH', 'PIPELINE'],
        ['API RESPONSE', 'REPORT'],
      ];

      let id = 0;

      for (let l = 0; l < 4; l++) {
        const count = layerNodeCounts[l];
        const lx = layerXCoords[l];
        const stepY = (h * 0.72) / (count + 1);
        const startY = h * 0.14;

        for (let i = 0; i < count; i++) {
          const ny = startY + stepY * (i + 1) + (Math.random() - 0.5) * 12;
          const nx = lx + (Math.random() - 0.5) * 14;

          nodes.push({
            id: id++,
            layer: l,
            x: nx,
            y: ny,
            baseX: nx,
            baseY: ny,
            radius: l === 1 || l === 2 ? 3.5 : 2.5,
            phase: Math.random() * Math.PI * 2,
            speed: 0.01 + Math.random() * 0.015,
            label: layerLabels[l][i] || `L${l}_N${i}`,
          });
        }
      }

      // Build inter-layer connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes.length; j++) {
          if (nodes[j].layer === nodes[i].layer + 1) {
            const dx = nodes[i].baseX - nodes[j].baseX;
            const dy = nodes[i].baseY - nodes[j].baseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < w * 0.42) {
              edges.push({
                source: i,
                target: j,
                layerFrom: nodes[i].layer,
                layerTo: nodes[j].layer,
                weight: Math.max(0.2, 1 - dist / (w * 0.45)),
              });
            }
          }
        }
      }

      // Seed signal pulses
      for (let p = 0; p < 5; p++) {
        pulses.push({
          edgeIdx: Math.floor(Math.random() * edges.length),
          progress: Math.random(),
          speed: 0.004 + Math.random() * 0.006,
        });
      }
    };

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initStage(width, height);
    };

    if (!isVisible) return;

    handleResize();
    const ro = new ResizeObserver(() => handleResize());
    ro.observe(container);

    const currentHighlightedStage = hoveredStage || activeStage;
    const stageIndexMap: Record<StageType, number> = {
      DATA: 0,
      MODELS: 1,
      SYSTEM: 2,
      OUTPUT: 3,
    };
    const activeLayerIdx = stageIndexMap[currentHighlightedStage];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Subtle Background Architectural Grid Lines
      ctx.strokeStyle = 'rgba(212, 154, 70, 0.04)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.setLineDash([4, 12]);
      [0.25, 0.5, 0.75].forEach((ratio) => {
        ctx.moveTo(width * ratio, height * 0.05);
        ctx.lineTo(width * ratio, height * 0.95);
      });
      ctx.stroke();
      ctx.setLineDash([]);

      // 2. Animate and Render Nodes
      nodes.forEach((node) => {
        if (!prefersReducedMotion) {
          node.phase += node.speed;
          node.x = node.baseX + Math.sin(node.phase) * 3;
          node.y = node.baseY + Math.cos(node.phase * 0.8) * 3;
        }

        const isLayerActive = node.layer === activeLayerIdx;

        // Render connection lines
        edges.forEach((edge) => {
          if (edge.source === node.id) {
            const targetNode = nodes[edge.target];
            if (!targetNode) return;

            const isEdgeActive =
              edge.layerFrom === activeLayerIdx || edge.layerTo === activeLayerIdx;

            ctx.beginPath();
            // Draw smooth bezier curve for architectural aesthetic
            const midX = (node.x + targetNode.x) / 2;
            ctx.moveTo(node.x, node.y);
            ctx.bezierCurveTo(midX, node.y, midX, targetNode.y, targetNode.x, targetNode.y);

            ctx.strokeStyle = isEdgeActive
              ? 'rgba(212, 154, 70, 0.45)'
              : 'rgba(212, 154, 70, 0.12)';
            ctx.lineWidth = isEdgeActive ? 1.4 : 0.8;
            ctx.stroke();
          }
        });
      });

      // 3. Render Signal Pulses
      if (!prefersReducedMotion) {
        pulses.forEach((pulse) => {
          pulse.progress += pulse.speed;
          if (pulse.progress > 1) {
            pulse.progress = 0;
            pulse.edgeIdx = Math.floor(Math.random() * edges.length);
          }

          const edge = edges[pulse.edgeIdx];
          if (!edge) return;
          const nodeA = nodes[edge.source];
          const nodeB = nodes[edge.target];
          if (!nodeA || !nodeB) return;

          const midX = (nodeA.x + nodeB.x) / 2;
          const t = pulse.progress;
          // Cubic bezier calculation
          const px =
            (1 - t) * (1 - t) * (1 - t) * nodeA.x +
            3 * (1 - t) * (1 - t) * t * midX +
            3 * (1 - t) * t * t * midX +
            t * t * t * nodeB.x;
          const py =
            (1 - t) * (1 - t) * (1 - t) * nodeA.y +
            3 * (1 - t) * (1 - t) * t * nodeA.y +
            3 * (1 - t) * t * t * nodeB.y +
            t * t * t * nodeB.y;

          const pulseAlpha = Math.sin(t * Math.PI) * 0.85;

          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 235, 190, ${pulseAlpha})`;
          ctx.fill();
        });
      }

      // 4. Draw Node Points & Labels
      nodes.forEach((node) => {
        const isLayerActive = node.layer === activeLayerIdx;

        // Aura glow for active layer
        if (isLayerActive) {
          const glowGrad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 14);
          glowGrad.addColorStop(0, 'rgba(212, 154, 70, 0.35)');
          glowGrad.addColorStop(1, 'rgba(212, 154, 70, 0)');

          ctx.beginPath();
          ctx.arc(node.x, node.y, 14, 0, Math.PI * 2);
          ctx.fillStyle = glowGrad;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, isLayerActive ? node.radius + 1 : node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isLayerActive ? '#F2EBDD' : 'rgba(212, 154, 70, 0.7)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, isLayerActive ? node.radius + 2 : node.radius + 1, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(9, 9, 7, 0.9)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    if (isVisible) {
      render();
    }

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [activeStage, hoveredStage, prefersReducedMotion, isVisible]);

  return (
    <div className="w-full max-w-lg bg-[#11100C] border border-[#24221C] rounded-sm p-4 sm:p-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative group transition-all duration-300 hover:border-[#333027]">
      {/* Subtle top frame highlight */}
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#D49A46]/40 to-transparent" />

      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-[#201F19] mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D49A46]" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#F2EBDD] font-bold">
            NEURAL SYSTEMS CORE
          </span>
        </div>
        <span className="font-mono text-[10px] tracking-wider uppercase text-[#888175]">
          COMPUTATIONAL ARCHITECTURE
        </span>
      </div>

      {/* Interactive Stage Tabs */}
      <div className="grid grid-cols-4 gap-1.5 p-1 bg-[#161510] border border-[#24221C] rounded-xs mb-3">
        {STAGES.map((stg) => {
          const isSelected = activeStage === stg;
          return (
            <button
              key={stg}
              onClick={() => setActiveStage(stg)}
              onMouseEnter={() => setHoveredStage(stg)}
              onMouseLeave={() => setHoveredStage(null)}
              className={`font-mono text-[10px] uppercase tracking-wider py-1.5 px-2 rounded-xs transition-all cursor-pointer text-center truncate ${
                isSelected
                  ? 'bg-[#24221B] text-[#E5BA70] border border-[#3A362C] font-bold shadow-xs'
                  : 'text-[#888175] hover:text-[#DCD6CA] hover:bg-[#1A1913]'
              }`}
            >
              {stg}
            </button>
          );
        })}
      </div>

      {/* Visual Canvas Stage Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[220px] sm:h-[240px] bg-[#0C0B08] border border-[#1E1D17] rounded-xs overflow-hidden"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Stage Descriptor Overlay */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="font-mono text-[10px] tracking-wider text-[#D49A46] uppercase font-semibold">
            {activeStage} LAYER
          </span>
          <span className="font-mono text-[10px] text-[#6B655B]">
            HOVER TABS TO INSPECT
          </span>
        </div>
      </div>
    </div>
  );
};
