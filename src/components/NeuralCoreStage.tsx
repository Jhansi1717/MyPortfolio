import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Terminal, Activity, Layers, Sparkles, Compass } from 'lucide-react';
import { cn } from '../lib/utils';

interface NodeData {
  id: string;
  name: string;
  subtext: string;
  region: 'DATA' | 'MODELS' | 'SYSTEM' | 'OUTPUT';
  baseX: number; // 0 to 1
  baseY: number; // 0 to 1
  depth: number; // 0.6 to 1.4 for parallax
  radius: number;
  phase: number;
  speed: number;
  connections: number[]; // indices of target nodes
}

interface SignalPacket {
  fromNodeIndex: number;
  toNodeIndex: number;
  progress: number; // 0 to 1
  speed: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
}

const REGIONS = ['DATA', 'MODELS', 'SYSTEM', 'OUTPUT'] as const;
type RegionType = (typeof REGIONS)[number];

const REGION_META: Record<
  RegionType,
  { label: string; stage: string; desc: string; xRange: [number, number] }
> = {
  DATA: {
    label: 'DATA',
    stage: '01 / INGESTION',
    desc: 'Multi-modal audio spectrograms, textual tokens & structured state matrices.',
    xRange: [0.05, 0.28],
  },
  MODELS: {
    label: 'MODELS',
    stage: '02 / ARCHITECTURE',
    desc: 'Self-supervised representation, EfficientNet backbone & transformer attention.',
    xRange: [0.28, 0.54],
  },
  SYSTEM: {
    label: 'SYSTEM',
    stage: '03 / PIPELINE',
    desc: 'REST interfaces, JWT authentication gate & distributed state persistence.',
    xRange: [0.54, 0.78],
  },
  OUTPUT: {
    label: 'OUTPUT',
    stage: '04 / VALUE',
    desc: 'Real-time clinical screening XAI, conversational QA & order transactions.',
    xRange: [0.78, 0.96],
  },
};

export const NeuralCoreStage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeRegion, setActiveRegion] = useState<RegionType | null>(null);
  const [hoveredNode, setHoveredNode] = useState<NodeData | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [metrics, setMetrics] = useState({ signals: 8, nodes: 18, state: 'OPERATIONAL' });

  // Animation & Interaction tracking refs (avoiding re-renders inside animation loop)
  const animFrameId = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isHovering: false });
  const hoveredRegionRef = useRef<RegionType | null>(null);
  const hoveredNodeRef = useRef<NodeData | null>(null);

  // Update refs when state changes
  useEffect(() => {
    hoveredRegionRef.current = activeRegion;
  }, [activeRegion]);

  useEffect(() => {
    hoveredNodeRef.current = hoveredNode;
  }, [hoveredNode]);

  // Check user preference for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', listener);
    } else {
      mediaQuery.addListener(listener);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', listener);
      } else {
        mediaQuery.removeListener(listener);
      }
    };
  }, []);

  // Main Canvas & Simulation Lifecycle
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    // Define computational nodes across DATA -> MODELS -> SYSTEM -> OUTPUT
    const nodes: NodeData[] = [
      // 0..3: DATA Layer (Ingestion & Signals)
      {
        id: 'd-audio',
        name: 'Audio Spectral Stream',
        subtext: 'Lung sound waveforms & acoustic MFCCs',
        region: 'DATA',
        baseX: 0.12,
        baseY: 0.26,
        depth: 0.85,
        radius: 4.5,
        phase: 0.2,
        speed: 0.7,
        connections: [4, 5],
      },
      {
        id: 'd-text',
        name: 'Textual Context Tokens',
        subtext: 'Natural language queries & clinical metadata',
        region: 'DATA',
        baseX: 0.15,
        baseY: 0.5,
        depth: 1.1,
        radius: 5,
        phase: 1.4,
        speed: 0.9,
        connections: [5, 6, 7],
      },
      {
        id: 'd-struct',
        name: 'Relational Records',
        subtext: 'User authorizations & transaction events',
        region: 'DATA',
        baseX: 0.12,
        baseY: 0.74,
        depth: 0.9,
        radius: 4.5,
        phase: 2.1,
        speed: 0.8,
        connections: [7, 8],
      },
      {
        id: 'd-sensor',
        name: 'Feature Pre-Filter',
        subtext: 'Signal de-noising & normalization matrix',
        region: 'DATA',
        baseX: 0.22,
        baseY: 0.38,
        depth: 1.0,
        radius: 4,
        phase: 3.0,
        speed: 0.6,
        connections: [4, 6],
      },

      // 4..8: MODELS Layer (Neural Intelligence & Representations)
      {
        id: 'm-ssl',
        name: 'Self-Supervised Encoder',
        subtext: 'Unsupervised contrastive representation',
        region: 'MODELS',
        baseX: 0.36,
        baseY: 0.22,
        depth: 1.25,
        radius: 6,
        phase: 0.8,
        speed: 0.7,
        connections: [9, 10],
      },
      {
        id: 'm-effnet',
        name: 'EfficientNet-B0 Backbone',
        subtext: 'Deep spatial convolutional feature maps',
        region: 'MODELS',
        baseX: 0.44,
        baseY: 0.35,
        depth: 0.95,
        radius: 5.5,
        phase: 2.8,
        speed: 0.85,
        connections: [10, 11],
      },
      {
        id: 'm-trans',
        name: 'Transformer Attention',
        subtext: 'Multi-head self-attention NLP mechanism',
        region: 'MODELS',
        baseX: 0.38,
        baseY: 0.54,
        depth: 1.2,
        radius: 6.5,
        phase: 1.7,
        speed: 0.95,
        connections: [11, 12],
      },
      {
        id: 'm-xai',
        name: 'Explainable AI Engine',
        subtext: 'Attribution heatmaps & gradient weighting',
        region: 'MODELS',
        baseX: 0.46,
        baseY: 0.68,
        depth: 1.05,
        radius: 5,
        phase: 3.5,
        speed: 0.75,
        connections: [12, 13],
      },
      {
        id: 'm-latent',
        name: 'Latent Space Projection',
        subtext: 'High-dimensional cosine semantic vectors',
        region: 'MODELS',
        baseX: 0.35,
        baseY: 0.82,
        depth: 0.8,
        radius: 4.5,
        phase: 4.2,
        speed: 0.65,
        connections: [13, 14],
      },

      // 9..13: SYSTEM Layer (Runtime Architecture & Logic)
      {
        id: 's-router',
        name: 'Asynchronous Dispatcher',
        subtext: 'High-throughput event queue & job workers',
        region: 'SYSTEM',
        baseX: 0.62,
        baseY: 0.24,
        depth: 1.15,
        radius: 5,
        phase: 1.1,
        speed: 0.8,
        connections: [14, 15],
      },
      {
        id: 's-api',
        name: 'Express / REST Gateway',
        subtext: 'Deterministic endpoints & rate governance',
        region: 'SYSTEM',
        baseX: 0.68,
        baseY: 0.4,
        depth: 1.3,
        radius: 6,
        phase: 2.9,
        speed: 0.9,
        connections: [15, 16],
      },
      {
        id: 's-auth',
        name: 'JWT Security Mesh',
        subtext: 'Cryptographic identity & role permissions',
        region: 'SYSTEM',
        baseX: 0.61,
        baseY: 0.58,
        depth: 0.9,
        radius: 5.5,
        phase: 0.4,
        speed: 0.7,
        connections: [16, 17],
      },
      {
        id: 's-db',
        name: 'Persistent Store',
        subtext: 'Document clustering & transactional indexing',
        region: 'SYSTEM',
        baseX: 0.67,
        baseY: 0.75,
        depth: 1.05,
        radius: 5,
        phase: 3.8,
        speed: 0.85,
        connections: [17],
      },

      // 14..17: OUTPUT Layer (Product Delivery & Clinical Support)
      {
        id: 'o-diag',
        name: 'Clinical Screening Decision',
        subtext: 'Real-time respiratory diagnostic prediction',
        region: 'OUTPUT',
        baseX: 0.86,
        baseY: 0.28,
        depth: 1.2,
        radius: 6.5,
        phase: 1.5,
        speed: 0.9,
        connections: [],
      },
      {
        id: 'o-qa',
        name: 'Mental Health Response',
        subtext: 'Context-aware conversational intelligence',
        region: 'OUTPUT',
        baseX: 0.89,
        baseY: 0.48,
        depth: 1.35,
        radius: 7,
        phase: 2.6,
        speed: 1.0,
        connections: [],
      },
      {
        id: 'o-payment',
        name: 'Payment & Checkout Engine',
        subtext: 'Verified transactional settlement flow',
        region: 'OUTPUT',
        baseX: 0.85,
        baseY: 0.68,
        depth: 1.0,
        radius: 5.5,
        phase: 3.3,
        speed: 0.8,
        connections: [],
      },
      {
        id: 'o-telemetry',
        name: 'Real-Time Order Tracking',
        subtext: 'Live operational state delivery',
        region: 'OUTPUT',
        baseX: 0.88,
        baseY: 0.84,
        depth: 0.9,
        radius: 4.5,
        phase: 4.6,
        speed: 0.7,
        connections: [],
      },
    ];

    // Background ambient particles (subtle floating quanta)
    const particlesCount = 28;
    const particles: Particle[] = [];
    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0003,
        vy: (Math.random() - 0.5) * 0.0003,
        radius: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.25 + 0.08,
        baseAlpha: Math.random() * 0.25 + 0.08,
      });
    }

    // Active Signal Packets traversing network edges
    const activeSignals: SignalPacket[] = [];
    const maxSignals = 9;

    function spawnSignal() {
      if (activeSignals.length >= maxSignals) return;

      // Select a node with valid connections
      const candidates: number[] = [];
      nodes.forEach((n, idx) => {
        if (n.connections.length > 0) candidates.push(idx);
      });

      if (candidates.length === 0) return;
      const fromIdx = candidates[Math.floor(Math.random() * candidates.length)];
      const targetList = nodes[fromIdx].connections;
      const toIdx = targetList[Math.floor(Math.random() * targetList.length)];

      activeSignals.push({
        fromNodeIndex: fromIdx,
        toNodeIndex: toIdx,
        progress: 0,
        speed: 0.006 + Math.random() * 0.007,
        color: Math.random() > 0.3 ? '#D49A46' : '#E5BA70',
      });
    }

    // Populate initial signals
    for (let i = 0; i < 6; i++) {
      spawnSignal();
      if (activeSignals[i]) {
        activeSignals[i].progress = Math.random() * 0.8;
      }
    }

    // Size handling with DPI scaling
    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      // Cap DPR at 2 to balance crispness with GPU/CPU efficiency
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
      if (isReducedMotion) {
        renderStatic();
      }
    });

    resizeObserver.observe(container);

    // Mouse movement listener for smooth parallax & hover detection
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Normalized coordinates from -1 to 1 for parallax
      mouseRef.current.targetX = (x / width - 0.5) * 2;
      mouseRef.current.targetY = (y / height - 0.5) * 2;
      mouseRef.current.isHovering = true;

      // Hit-test nodes (with generous radius)
      let foundNode: NodeData | null = null;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const nx = n.baseX * width;
        const ny = n.baseY * height;
        const dist = Math.hypot(x - nx, y - ny);
        if (dist < n.radius + 18) {
          foundNode = n;
          break;
        }
      }

      setHoveredNode(foundNode);

      // Determine hovered region if not set by button
      if (!foundNode) {
        const normX = x / width;
        let detectedRegion: RegionType | null = null;
        for (const r of REGIONS) {
          const [minX, maxX] = REGION_META[r].xRange;
          if (normX >= minX && normX < maxX) {
            detectedRegion = r;
            break;
          }
        }
        setActiveRegion(detectedRegion);
      } else {
        setActiveRegion(foundNode.region);
      }
    };

    const handlePointerLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
      mouseRef.current.isHovering = false;
      setHoveredNode(null);
      setActiveRegion(null);
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', handlePointerLeave);

    // Static render function for prefers-reduced-motion
    function renderStatic() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle grid guides
      drawBackgroundGuides(ctx, width, height);

      // Draw static curved connections
      nodes.forEach((node) => {
        const x1 = node.baseX * width;
        const y1 = node.baseY * height;

        node.connections.forEach((targetIdx) => {
          const target = nodes[targetIdx];
          if (!target) return;
          const x2 = target.baseX * width;
          const y2 = target.baseY * height;

          drawCurvedEdge(ctx, x1, y1, x2, y2, false, false);
        });
      });

      // Draw static nodes
      nodes.forEach((node) => {
        const x = node.baseX * width;
        const y = node.baseY * height;
        drawNodeCircle(ctx, x, y, node, false, false, 0);
      });
    }

    // Helper: Draw curved Bézier edge between two nodes
    function drawCurvedEdge(
      c: CanvasRenderingContext2D,
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      isHighlighted: boolean,
      isDimmed: boolean
    ) {
      c.beginPath();
      c.moveTo(x1, y1);

      // S-curve with horizontal control tangents typical of computational pipelines
      const dx = x2 - x1;
      const cp1x = x1 + dx * 0.45;
      const cp1y = y1;
      const cp2x = x1 + dx * 0.55;
      const cp2y = y2;

      c.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y2);

      if (isHighlighted) {
        c.strokeStyle = 'rgba(212, 154, 70, 0.7)';
        c.lineWidth = 1.75;
      } else if (isDimmed) {
        c.strokeStyle = 'rgba(41, 39, 32, 0.3)';
        c.lineWidth = 0.8;
      } else {
        c.strokeStyle = 'rgba(41, 39, 32, 0.75)';
        c.lineWidth = 1.1;
      }
      c.stroke();
    }

    // Helper: Draw node circle with subtle concentric aura
    function drawNodeCircle(
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      node: NodeData,
      isHovered: boolean,
      isRegionActive: boolean,
      time: number
    ) {
      const r = node.radius;

      // Soft ambient breathing halo
      if (isHovered || isRegionActive) {
        const auraRadius = r * (isHovered ? 2.8 : 2.0) + Math.sin(time * 2 + node.phase) * 1.5;
        const grad = c.createRadialGradient(x, y, r * 0.6, x, y, auraRadius);
        grad.addColorStop(0, 'rgba(212, 154, 70, 0.35)');
        grad.addColorStop(1, 'rgba(212, 154, 70, 0)');
        c.fillStyle = grad;
        c.beginPath();
        c.arc(x, y, auraRadius, 0, Math.PI * 2);
        c.fill();
      }

      // Outer precision ring
      c.beginPath();
      c.arc(x, y, r + (isHovered ? 2.5 : 1.5), 0, Math.PI * 2);
      c.strokeStyle = isHovered
        ? '#E5BA70'
        : isRegionActive
        ? 'rgba(212, 154, 70, 0.7)'
        : 'rgba(41, 39, 32, 0.9)';
      c.lineWidth = isHovered ? 1.5 : 1;
      c.stroke();

      // Core body
      c.beginPath();
      c.arc(x, y, r, 0, Math.PI * 2);
      c.fillStyle = isHovered
        ? '#D49A46'
        : isRegionActive
        ? '#171612'
        : '#11110E';
      c.fill();

      // Center glowing point
      c.beginPath();
      c.arc(x, y, Math.max(r * 0.35, 1.5), 0, Math.PI * 2);
      c.fillStyle = isHovered
        ? '#090907'
        : isRegionActive
        ? '#E5BA70'
        : 'rgba(242, 235, 221, 0.65)';
      c.fill();
    }

    // Helper: Draw background technical coordinates & stage partitions
    function drawBackgroundGuides(c: CanvasRenderingContext2D, w: number, h: number) {
      c.save();

      // Partition boundaries between layers
      const bounds = [0.28, 0.54, 0.78];
      bounds.forEach((ratio) => {
        const bx = ratio * w;
        c.beginPath();
        c.setLineDash([2, 5]);
        c.moveTo(bx, 15);
        c.lineTo(bx, h - 15);
        c.strokeStyle = 'rgba(41, 39, 32, 0.45)';
        c.lineWidth = 1;
        c.stroke();
      });

      c.restore();
    }

    // Main animation loop
    let lastTime = performance.now();
    let spawnTimer = 0;

    const animate = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05); // seconds capped at 50ms
      lastTime = now;
      const time = now * 0.001; // in seconds

      // Smooth mouse lerp for subtle depth parallax
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle background structural partition lines
      drawBackgroundGuides(ctx, width, height);

      // 2. Update & Draw ambient floating particles
      ctx.save();
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around bounds
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;

        const px = p.x * width + mouseRef.current.x * 6;
        const py = p.y * height + mouseRef.current.y * 6;

        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 154, 70, ${p.alpha})`;
        ctx.fill();
      });
      ctx.restore();

      // Compute live animated positions for all nodes
      const computedPositions = nodes.map((n) => {
        // Very gentle vertical undulating sine wave
        const floatY = Math.sin(time * n.speed + n.phase) * 3.5;
        const floatX = Math.cos(time * (n.speed * 0.7) + n.phase) * 2;

        // Depth parallax based on mouse
        const parallaxX = mouseRef.current.x * (n.depth * 9);
        const parallaxY = mouseRef.current.y * (n.depth * 9);

        return {
          x: n.baseX * width + floatX + parallaxX,
          y: n.baseY * height + floatY + parallaxY,
        };
      });

      const currentRegion = hoveredRegionRef.current;
      const currentNode = hoveredNodeRef.current;

      // 3. Draw curved synaptic connections
      nodes.forEach((fromNode, fromIdx) => {
        const fromPos = computedPositions[fromIdx];

        fromNode.connections.forEach((toIdx) => {
          const toNode = nodes[toIdx];
          const toPos = computedPositions[toIdx];
          if (!toNode || !toPos) return;

          // Determine highlight / dim state
          const isEdgeActive =
            (currentNode && (currentNode.id === fromNode.id || currentNode.id === toNode.id)) ||
            (currentRegion && (fromNode.region === currentRegion || toNode.region === currentRegion));

          const isEdgeDimmed = currentRegion !== null && !isEdgeActive;

          drawCurvedEdge(ctx, fromPos.x, fromPos.y, toPos.x, toPos.y, !!isEdgeActive, isEdgeDimmed);
        });
      });

      // 4. Update and Draw Signal Pulses
      spawnTimer += dt;
      if (spawnTimer > 0.45) {
        spawnTimer = 0;
        spawnSignal();
      }

      for (let i = activeSignals.length - 1; i >= 0; i--) {
        const sig = activeSignals[i];
        sig.progress += sig.speed;

        if (sig.progress >= 1) {
          activeSignals.splice(i, 1);
          continue;
        }

        const p1 = computedPositions[sig.fromNodeIndex];
        const p2 = computedPositions[sig.toNodeIndex];
        if (!p1 || !p2) continue;

        // Compute point along cubic Bézier curve
        const t = sig.progress;
        const dx = p2.x - p1.x;
        const cp1x = p1.x + dx * 0.45;
        const cp1y = p1.y;
        const cp2x = p1.x + dx * 0.55;
        const cp2y = p2.y;

        // Cubic Bézier formula
        const u = 1 - t;
        const tt = t * t;
        const uu = u * u;
        const uuu = uu * u;
        const ttt = tt * t;

        const bx = uuu * p1.x + 3 * uu * t * cp1x + 3 * u * tt * cp2x + ttt * p2.x;
        const by = uuu * p1.y + 3 * uu * t * cp1y + 3 * u * tt * cp2y + ttt * p2.y;

        // Draw glowing signal packet
        ctx.beginPath();
        ctx.arc(bx, by, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = sig.color;
        ctx.shadowColor = 'rgba(212, 154, 70, 0.8)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 5. Draw Nodes
      nodes.forEach((node, idx) => {
        const pos = computedPositions[idx];
        const isHovered = currentNode?.id === node.id;
        const isRegionActive = currentRegion === node.region;

        drawNodeCircle(ctx, pos.x, pos.y, node, isHovered, isRegionActive, time);
      });

      animFrameId.current = requestAnimationFrame(animate);
    };

    // IntersectionObserver to pause animation when off-screen (saves battery, GPU & CPU)
    let isIntersecting = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting && !isReducedMotion) {
          lastTime = performance.now();
          if (!animFrameId.current) {
            animFrameId.current = requestAnimationFrame(animate);
          }
        } else if (!isIntersecting) {
          if (animFrameId.current) {
            cancelAnimationFrame(animFrameId.current);
            animFrameId.current = null;
          }
        }
      },
      { threshold: 0.05 }
    );

    intersectionObserver.observe(container);

    if (!isReducedMotion) {
      animFrameId.current = requestAnimationFrame(animate);
    } else {
      renderStatic();
    }

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [isReducedMotion]);

  // Direct tab selection for accessibility and touch devices
  const handleSelectRegion = useCallback((region: RegionType) => {
    setActiveRegion((prev) => (prev === region ? null : region));
    setHoveredNode(null);
  }, []);

  return (
    <div
      ref={containerRef}
      aria-label="Neural Systems Core - Interactive Computational Network"
      className="relative w-full aspect-square sm:aspect-4/3 lg:aspect-square min-h-[380px] sm:min-h-[430px] lg:min-h-[490px] rounded-xs border border-[#292720] bg-[#11110E] p-4 sm:p-5 flex flex-col justify-between overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.5)] select-none animate-hero-fade group"
    >
      {/* Subtle architectural background grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-60 pointer-events-none" />

      {/* Optical precision corner brackets */}
      <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#D49A46]" aria-hidden="true" />
      <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#D49A46]" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#D49A46]" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#D49A46]" aria-hidden="true" />

      {/* Top Architectural Header Bar */}
      <div className="relative z-20 flex items-center justify-between pb-3 border-b border-[#292720]/80">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#D49A46]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#E5BA70] font-medium">
            NEURAL SYSTEMS CORE
          </span>
          <span className="font-mono text-[10px] text-[#68645C] hidden sm:inline">
            // COMPUTATIONAL PIPELINE
          </span>
        </div>

        {/* System Architecture badge */}
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-[#AAA398]">
          <span className="px-2 py-0.5 rounded-xs bg-[#171612] border border-[#292720] text-[#E5BA70]">
            ARCHITECTURE VIEW
          </span>
        </div>
      </div>

      {/* Interactive Region Navigation Pills (DATA -> MODELS -> SYSTEM -> OUTPUT) */}
      <div className="relative z-20 flex items-center justify-between gap-1 sm:gap-2 my-2 py-1 px-1.5 rounded-xs bg-[#090907]/80 border border-[#292720]/80 backdrop-blur-xs">
        {REGIONS.map((r, i) => {
          const isSelected = activeRegion === r;
          return (
            <button
              key={r}
              onClick={() => handleSelectRegion(r)}
              onPointerEnter={() => setActiveRegion(r)}
              className={cn(
                'flex-1 py-1 px-1.5 sm:px-2 rounded-xs font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-all text-center flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap',
                'focus-visible:outline-2 focus-visible:outline-[#D49A46]',
                isSelected
                  ? 'bg-[#D49A46] text-[#090907] font-semibold shadow-[0_2px_10px_rgba(212,154,70,0.25)]'
                  : 'text-[#AAA398] hover:text-[#F2EBDD] hover:bg-[#171612]'
              )}
              aria-pressed={isSelected}
            >
              <span className={cn('text-[9px] opacity-60', isSelected && 'text-[#090907]')}>
                0{i + 1}
              </span>
              <span>{r}</span>
            </button>
          );
        })}
      </div>

      {/* Central Canvas Visual Stage */}
      <div className="relative z-10 flex-1 w-full h-full min-h-[200px] overflow-hidden my-1 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-crosshair"
          aria-hidden="true"
        />

        {/* Hover inspection tooltip overlay (when hovering a specific node) */}
        {hoveredNode && (
          <div
            className="absolute bottom-2 left-2 right-2 pointer-events-none z-30 p-2.5 sm:p-3 rounded-xs bg-[#090907]/92 border border-[#D49A46]/60 backdrop-blur-md transition-all animate-in fade-in duration-150 shadow-xl"
            role="status"
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-mono text-[10px] text-[#D49A46] uppercase tracking-widest font-semibold">
                NODE_ID: {hoveredNode.id.toUpperCase()} // [{hoveredNode.region}]
              </span>
              <span className="font-mono text-[9px] text-[#4ADE80] uppercase">
                ACTIVE
              </span>
            </div>
            <div className="font-display text-sm font-bold uppercase text-[#F2EBDD]">
              {hoveredNode.name}
            </div>
            <div className="font-mono text-xs text-[#AAA398] mt-0.5">
              {hoveredNode.subtext}
            </div>
          </div>
        )}

        {/* Region summary notice when a region is focused but no node is directly hovered */}
        {!hoveredNode && activeRegion && (
          <div
            className="absolute bottom-2 left-2 right-2 pointer-events-none z-30 p-2.5 rounded-xs bg-[#090907]/90 border border-[#292720] backdrop-blur-md transition-all animate-in fade-in duration-150"
            role="status"
          >
            <div className="flex items-center justify-between gap-2 mb-0.5">
              <span className="font-mono text-[10px] text-[#D49A46] uppercase tracking-widest font-semibold">
                PHASE: {REGION_META[activeRegion].stage}
              </span>
              <span className="font-mono text-[9px] text-[#AAA398]">STAGE_FOCUS</span>
            </div>
            <div className="font-mono text-xs text-[#AAA398]">
              {REGION_META[activeRegion].desc}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Telemetry Status Bar */}
      <div className="relative z-20 pt-2.5 border-t border-[#292720]/80 flex items-center justify-between gap-2 font-mono text-[10px] text-[#AAA398]">
        <div className="flex items-center gap-3 truncate">
          <span className="flex items-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
            <span className="text-[#F2EBDD]">FLOW:</span>
          </span>
          <span className="truncate text-[#68645C] hidden sm:inline">
            DATA → LEARNING → INTELLIGENCE → SYSTEM → PRODUCT
          </span>
          <span className="truncate text-[#68645C] sm:hidden">
            DATA → MODEL → SYS → PROD
          </span>
        </div>
        <div className="shrink-0 text-[#E5BA70] tracking-wider text-right">
          {isReducedMotion ? 'MOTION: STATIC SPEC' : 'SYNC: 60 FPS'}
        </div>
      </div>
    </div>
  );
};
