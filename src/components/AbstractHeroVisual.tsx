import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';

interface AbstractHeroVisualProps {
  scrollYProgress?: any;
}

export const AbstractHeroVisual: React.FC<AbstractHeroVisualProps> = ({ scrollYProgress }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Motion Values for pointer input (zero layout-thrashing, zero component re-renders!)
  const xRaw = useMotionValue(0);
  const yRaw = useMotionValue(0);

  // Smooth springs for sub-pixel organic glide
  const springConfig = { damping: 28, stiffness: 140 };
  const xSpring = useSpring(xRaw, springConfig);
  const ySpring = useSpring(yRaw, springConfig);

  // Pointer Parallax Offset Mappings (Responsive to user parameters)
  // Layer 1: Background Atmosphere (1-2px)
  const layer1X = useTransform(xSpring, [-1, 1], [-2, 2]);
  const layer1Y = useTransform(ySpring, [-1, 1], [-2, 2]);

  // Layer 2: Main Computational Network (4-6px)
  const layer2X = useTransform(xSpring, [-1, 1], [-5, 5]);
  const layer2Y = useTransform(ySpring, [-1, 1], [-5, 5]);

  // Layer 3: Foreground Fine Geometry / Light (7-10px)
  const layer3X = useTransform(xSpring, [-1, 1], [-9, 9]);
  const layer3Y = useTransform(ySpring, [-1, 1], [-9, 9]);

  // Scroll Parallax Offset Mappings (Foreground moves slightly faster)
  const activeScroll = scrollYProgress || useMotionValue(0);
  const layer1ScrollY = useTransform(activeScroll, [0, 1], [0, 0]);
  const layer2ScrollY = useTransform(activeScroll, [0, 1], [0, -18]);
  const layer3ScrollY = useTransform(activeScroll, [0, 1], [0, -38]);

  const [isVisibleInViewport, setIsVisibleInViewport] = useState(true);

  // IntersectionObserver to pause resource-heavy canvas updates outside the active viewport
  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisibleInViewport(entry.isIntersecting);
      },
      { threshold: 0.02 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Detect Mobile Viewports to disable pointer-based tracking
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (shouldReduceMotion) return () => window.removeEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768 || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      
      // Clamp inputs within bounds
      xRaw.set(Math.max(-1, Math.min(1, x)));
      yRaw.set(Math.max(-1, Math.min(1, y)));
    };

    const handleMouseLeave = () => {
      // Re-center smoothly when cursor exits visual field
      xRaw.set(0);
      yRaw.set(0);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [shouldReduceMotion, xRaw, yRaw]);

  // Network connection nodes logic for Layer 2 (Canvas)
  useEffect(() => {
    if (!isVisibleInViewport) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const nodesCount = isMobile ? 14 : 26;
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
    }> = [];

    // Initialize clean architectural network nodes
    for (let i = 0; i < nodesCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        radius: Math.random() * 1.4 + 0.8,
        baseAlpha: Math.random() * 0.35 + 0.15,
      });
    }

    let activeTime = 0;

    const render = () => {
      activeTime += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Draw network links
      const maxDistance = isMobile ? 80 : 110;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(212, 154, 70, ${lineAlpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Draw mathematical nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        if (!shouldReduceMotion) {
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < 0) n.x = width;
          if (n.x > width) n.x = 0;
          if (n.y < 0) n.y = height;
          if (n.y > height) n.y = 0;
        }

        const pulseAlpha = shouldReduceMotion
          ? n.baseAlpha
          : n.baseAlpha + Math.sin(activeTime * 1.5 + i) * 0.08;

        ctx.fillStyle = `rgba(242, 235, 221, ${pulseAlpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!shouldReduceMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [shouldReduceMotion, isMobile, isVisibleInViewport]);

  // Combined Pointer displacement styles
  const layer1Style = shouldReduceMotion || isMobile
    ? {}
    : { x: layer1X, y: layer1Y };

  const layer2Style = shouldReduceMotion || isMobile
    ? { y: layer2ScrollY }
    : { x: layer2X, y: useTransform(ySpring, (v) => layer2Y.get() + layer2ScrollY.get()) };

  const layer3Style = shouldReduceMotion || isMobile
    ? { y: layer3ScrollY }
    : { x: layer3X, y: useTransform(ySpring, (v) => layer3Y.get() + layer3ScrollY.get()) };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[460px] aspect-square mx-auto rounded-sm overflow-hidden border border-[#292720]/90 shadow-[0_16px_48px_rgba(0,0,0,0.65)] bg-[#090907] group select-none"
    >
      {/* ==========================================
          LAYER 1: BACKGROUND ATMOSPHERE (1-2px)
          ========================================== */}
      <motion.div
        style={layer1Style}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Soft, rotating ambient radial warmth */}
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background: 'radial-gradient(circle at 65% 35%, rgba(212, 154, 70, 0.16) 0%, rgba(14, 13, 10, 0.6) 60%, rgba(9, 9, 7, 0.98) 100%)',
          }}
        />
        
        {/* Fine background tech grid lines */}
        <div className="absolute inset-0 opacity-15 bg-tech-grid" />
      </motion.div>

      {/* ==========================================
          LAYER 2: COMPUTATIONAL ARTWORK (4-6px)
          ========================================== */}
      <motion.div
        style={layer2Style}
        className="absolute inset-0 pointer-events-none"
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block mix-blend-screen" />
      </motion.div>

      {/* ==========================================
          LAYER 3: FOREGROUND FINE GEOMETRY (7-10px)
          ========================================== */}
      <motion.div
        style={layer3Style}
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
      >
        {/* Fine architectural SVG alignments (crosshairs, coordinate labels) */}
        <svg className="absolute inset-0 w-full h-full text-[#D49A46]/20" viewBox="0 0 400 400" fill="none">
          {/* Central concentric alignment rings */}
          <circle cx="200" cy="200" r="140" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
          <circle cx="200" cy="200" r="80" stroke="currentColor" strokeWidth="0.75" />
          <circle cx="200" cy="200" r="20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />

          {/* Sub-pixel focus crosshairs */}
          <line x1="200" y1="30" x2="200" y2="370" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 6" />
          <line x1="30" y1="200" x2="370" y2="200" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 6" />

          {/* Precision Scope corner angles */}
          <path d="M 30,50 L 30,30 L 50,30" stroke="currentColor" strokeWidth="1" />
          <path d="M 370,50 L 370,30 L 350,30" stroke="currentColor" strokeWidth="1" />
          <path d="M 30,350 L 30,370 L 50,370" stroke="currentColor" strokeWidth="1" />
          <path d="M 370,350 L 370,370 L 350,370" stroke="currentColor" strokeWidth="1" />

          {/* Monospace calibration metrics */}
          <text x="45" y="48" className="font-mono text-[7px] fill-[#AAA398]/50 uppercase tracking-[0.2em]">SYS.L3_INIT</text>
          <text x="315" y="48" className="font-mono text-[7px] fill-[#D49A46]/40 uppercase tracking-[0.2em]">CBIT.SYS_09</text>
          <text x="45" y="362" className="font-mono text-[7px] fill-[#AAA398]/50 uppercase tracking-[0.2em]">LAT.17_N</text>
          <text x="315" y="362" className="font-mono text-[7px] fill-[#AAA398]/50 uppercase tracking-[0.2em]">LONG.78_E</text>
        </svg>

        {/* Diagonal dynamic optical shine lens reflection */}
        <div
          className="absolute inset-0 opacity-[0.25] mix-blend-color-dodge transition-opacity duration-500 group-hover:opacity-[0.4]"
          style={{
            background: 'linear-gradient(135deg, transparent 35%, rgba(255, 255, 255, 0.08) 50%, transparent 65%)',
          }}
        />
      </motion.div>

      {/* ==========================================
          FOREGROUND HOVER VIGNETTE & GRAIN OVERLAYS
          ========================================== */}
      {/* Hard vignette to lock geometric bounds */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,#090907_98%)]" />

      {/* Microscopic cinematic grain structure */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Clean outer frame border */}
      <div className="absolute inset-0 pointer-events-none rounded-sm border border-[#D49A46]/20 transition-all duration-700 group-hover:border-[#D49A46]/35" />
    </div>
  );
};
