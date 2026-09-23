import React, { useEffect, useRef, useState } from 'react';

interface Node {
  id: number;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  layer: number; // 0: input/latent, 1: transformer/hidden, 2: projection/output
  phase: number;
  pulseSpeed: number;
  isFocal?: boolean;
}

interface Edge {
  source: number;
  target: number;
  weight: number;
  length: number;
}

interface Pulse {
  edgeIndex: number;
  progress: number;
  speed: number;
  intensity: number;
}

export const AmbientNetworkVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0.5,
    y: 0.5,
    targetX: 0.5,
    targetY: 0.5,
  });

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

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Node & Edge Graph Configuration
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const pulses: Pulse[] = [];
    const particlePoints: { x: number; y: number; vx: number; vy: number; alpha: number; size: number }[] = [];

    // Layout topology: multi-cluster neural network topology with organic latent distribution
    const initializeGraph = (w: number, h: number) => {
      nodes.length = 0;
      edges.length = 0;
      pulses.length = 0;
      particlePoints.length = 0;

      const numLayers = 4;
      const nodesPerLayer = [4, 6, 5, 3];
      let idCounter = 0;

      // Coordinate anchors
      const paddingX = w * 0.12;
      const usableW = w - paddingX * 2;
      const usableH = h * 0.8;
      const startY = h * 0.1;

      for (let l = 0; l < numLayers; l++) {
        const count = nodesPerLayer[l];
        const layerX = paddingX + (usableW / (numLayers - 1)) * l;

        for (let i = 0; i < count; i++) {
          const stepY = usableH / (count + 1);
          const jitterX = (Math.random() - 0.5) * (usableW * 0.12);
          const jitterY = (Math.random() - 0.5) * 28;
          const nodeY = startY + stepY * (i + 1) + jitterY;
          const nodeX = layerX + jitterX;

          const isFocal = (l === 1 && i === 2) || (l === 2 && i === 1) || (l === 0 && i === 1) || (l === 3 && i === 1);

          nodes.push({
            id: idCounter++,
            x: nodeX,
            y: nodeY,
            baseX: nodeX,
            baseY: nodeY,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            radius: isFocal ? 3.5 : 2.0 + Math.random() * 1.2,
            layer: l,
            phase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.008 + Math.random() * 0.012,
            isFocal,
          });
        }
      }

      // Connect layers with forward and intra-cluster synaptic edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeA = nodes[i];
          const nodeB = nodes[j];
          const layerDiff = Math.abs(nodeA.layer - nodeB.layer);
          const dx = nodeA.baseX - nodeB.baseX;
          const dy = nodeA.baseY - nodeB.baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connect forward layers or close adjacent nodes
          if (
            (layerDiff === 1 && dist < w * 0.42 && Math.random() > 0.18) ||
            (layerDiff === 0 && dist < h * 0.32 && Math.random() > 0.4) ||
            (layerDiff === 2 && dist < w * 0.55 && Math.random() > 0.75)
          ) {
            edges.push({
              source: i,
              target: j,
              weight: Math.max(0.2, 1 - dist / (w * 0.55)),
              length: dist,
            });
          }
        }
      }

      // Pre-seed ambient pulses
      for (let k = 0; k < 6; k++) {
        pulses.push({
          edgeIndex: Math.floor(Math.random() * edges.length),
          progress: Math.random(),
          speed: 0.003 + Math.random() * 0.005,
          intensity: 0.6 + Math.random() * 0.4,
        });
      }

      // Ambient micro-particles
      for (let p = 0; p < 18; p++) {
        particlePoints.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          alpha: 0.15 + Math.random() * 0.35,
          size: 1 + Math.random() * 1.5,
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
      initializeGraph(width, height);
    };

    if (!isVisible) return;

    handleResize();

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Check mobile or touch
    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;

    // Mouse movement handler with smooth dampening (disabled on mobile)
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile || prefersReducedMotion) return;
      const rect = container.getBoundingClientRect();
      const clientX = (e.clientX - rect.left) / rect.width;
      const clientY = (e.clientY - rect.top) / rect.height;
      mouseRef.current.targetX = Math.max(0, Math.min(1, clientX));
      mouseRef.current.targetY = Math.max(0, Math.min(1, clientY));
    };

    if (!isMobile && !prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    let time = 0;

    const render = () => {
      time += 0.016;

      // Mouse easing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const mxOffset = (isMobile || prefersReducedMotion) ? 0 : (mouseRef.current.x - 0.5) * 24;
      const myOffset = (isMobile || prefersReducedMotion) ? 0 : (mouseRef.current.y - 0.5) * 24;

      ctx.clearRect(0, 0, width, height);

      // 1. Faint Geometric Coordinates & Subtle Grid Latent References
      ctx.save();
      ctx.strokeStyle = 'rgba(212, 154, 70, 0.04)';
      ctx.lineWidth = 1;

      // Horizontal reference lines
      const gridSteps = 4;
      for (let g = 1; g < gridSteps; g++) {
        const gy = (height / gridSteps) * g;
        ctx.beginPath();
        ctx.setLineDash([4, 12]);
        ctx.moveTo(width * 0.05, gy);
        ctx.lineTo(width * 0.95, gy);
        ctx.stroke();
      }

      // Minimalist crosshair marks at lattice nodes
      const crosshairs = [
        { x: width * 0.25, y: height * 0.28 },
        { x: width * 0.75, y: height * 0.32 },
        { x: width * 0.5, y: height * 0.72 },
      ];
      ctx.strokeStyle = 'rgba(229, 186, 112, 0.12)';
      ctx.setLineDash([]);
      crosshairs.forEach((ch) => {
        const sz = 4;
        ctx.beginPath();
        ctx.moveTo(ch.x - sz, ch.y);
        ctx.lineTo(ch.x + sz, ch.y);
        ctx.moveTo(ch.x, ch.y - sz);
        ctx.lineTo(ch.x, ch.y + sz);
        ctx.stroke();
      });
      ctx.restore();

      // 2. Update Node Positions with organic breathing and parallax
      nodes.forEach((node) => {
        if (!prefersReducedMotion) {
          node.phase += node.pulseSpeed;
          const driftX = Math.sin(node.phase + node.id) * 6;
          const driftY = Math.cos(node.phase * 0.8 + node.id) * 6;
          // Depth factor based on layer
          const depth = (node.layer + 1) / 4;
          node.x = node.baseX + driftX + mxOffset * depth;
          node.y = node.baseY + driftY + myOffset * depth;
        } else {
          node.x = node.baseX;
          node.y = node.baseY;
        }
      });

      // 3. Render Synaptic Connecting Edges
      edges.forEach((edge) => {
        const nodeA = nodes[edge.source];
        const nodeB = nodes[edge.target];
        if (!nodeA || !nodeB) return;

        const alpha = Math.min(0.22, 0.08 + edge.weight * 0.12);

        ctx.beginPath();
        ctx.moveTo(nodeA.x, nodeA.y);
        ctx.lineTo(nodeB.x, nodeB.y);
        ctx.strokeStyle = `rgba(212, 154, 70, ${alpha})`;
        ctx.lineWidth = edge.weight > 0.6 ? 1.2 : 0.8;
        ctx.stroke();
      });

      // 4. Render Occasional Signal Pulses
      if (!prefersReducedMotion) {
        pulses.forEach((pulse, idx) => {
          pulse.progress += pulse.speed;
          if (pulse.progress > 1) {
            pulse.progress = 0;
            pulse.edgeIndex = Math.floor(Math.random() * edges.length);
            pulse.speed = 0.003 + Math.random() * 0.006;
          }

          const edge = edges[pulse.edgeIndex];
          if (!edge) return;
          const nodeA = nodes[edge.source];
          const nodeB = nodes[edge.target];
          if (!nodeA || !nodeB) return;

          const px = nodeA.x + (nodeB.x - nodeA.x) * pulse.progress;
          const py = nodeA.y + (nodeB.y - nodeA.y) * pulse.progress;

          // Pulse glow gradient
          const pulseAlpha = Math.sin(pulse.progress * Math.PI) * pulse.intensity;
          const pulseGrad = ctx.createRadialGradient(px, py, 0, px, py, 6);
          pulseGrad.addColorStop(0, `rgba(255, 223, 153, ${pulseAlpha * 0.9})`);
          pulseGrad.addColorStop(0.5, `rgba(212, 154, 70, ${pulseAlpha * 0.4})`);
          pulseGrad.addColorStop(1, 'rgba(212, 154, 70, 0)');

          ctx.beginPath();
          ctx.arc(px, py, 6, 0, Math.PI * 2);
          ctx.fillStyle = pulseGrad;
          ctx.fill();

          // Small core particle
          ctx.beginPath();
          ctx.arc(px, py, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 245, 230, ${pulseAlpha})`;
          ctx.fill();
        });
      }

      // 5. Render Micro Particles
      if (!prefersReducedMotion) {
        particlePoints.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          ctx.beginPath();
          ctx.arc(p.x + mxOffset * 0.2, p.y + myOffset * 0.2, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(229, 186, 112, ${p.alpha * 0.4})`;
          ctx.fill();
        });
      }

      // 6. Render Nodes with subtle aura halos
      nodes.forEach((node) => {
        const breathe = prefersReducedMotion ? 1 : 0.85 + Math.sin(node.phase) * 0.15;
        const currentRadius = node.radius * breathe;

        // Focal Node Amber Glow Halo
        if (node.isFocal) {
          const glowGrad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 18);
          glowGrad.addColorStop(0, 'rgba(212, 154, 70, 0.28)');
          glowGrad.addColorStop(0.5, 'rgba(212, 154, 70, 0.08)');
          glowGrad.addColorStop(1, 'rgba(212, 154, 70, 0)');

          ctx.beginPath();
          ctx.arc(node.x, node.y, 18, 0, Math.PI * 2);
          ctx.fillStyle = glowGrad;
          ctx.fill();

          // Thin outer orbital ring
          ctx.beginPath();
          ctx.arc(node.x, node.y, 7, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(229, 186, 112, 0.25)';
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }

        // Inner solid core node
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = node.isFocal ? '#F2EBDD' : '#D49A46';
        ctx.fill();

        // Node outline
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius + 1.2, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(9, 9, 7, 0.8)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    if (prefersReducedMotion) {
      render();
    } else if (isVisible) {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
    };
  }, [prefersReducedMotion, isVisible]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] lg:h-[540px] flex items-center justify-center select-none pointer-events-none"
      aria-hidden="true"
    >
      {/* Subtle radial backdrop soft warm luminescence */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,154,70,0.06)_0%,_transparent_70%)] pointer-events-none" />

      {/* Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="relative z-10 w-full h-full block"
      />
    </div>
  );
};
