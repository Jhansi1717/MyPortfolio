import React, { useEffect, useState, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { backgroundConfig } from '../../config/backgroundConfig';

/**
 * GlobalAmbientBackground
 * 
 * Single global animated background system across the entire portfolio.
 * 
 * 7 Layers:
 * 1. Base obsidian (#080806)
 * 2. Fine technical grid (112px desktop, 80px mobile, 26s slow drift)
 * 3. Amber orbit / contour lines (3 unsynchronized trajectories: 18s, 23s, 29s)
 * 4. Small nodes (12 desktop, 6 mobile, slow 4s & 5.5s pulse)
 * 5. Moving signal packet (smooth continuous 12s traversal along trajectory)
 * 6. Ambient warm lights (2 large soft radial lights: 14s & 21s)
 * 7. Subtle pointer parallax (desktop only: 1-5px) & bounded scroll response (max 12px)
 * 
 * Features:
 * - Section intensity scaling (Hero 100%, Selected Work 85%, Experience 70%, etc.)
 * - Tab visibility optimization (pauses CSS animations when tab is hidden)
 * - Complete prefers-reduced-motion support (instant static fallback)
 * - Pure GPU compositor execution with zero layout shifts
 */
export const GlobalAmbientBackground: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [currentIntensity, setCurrentIntensity] = useState<number>(
    backgroundConfig.sectionIntensity.hero ?? 1.0
  );

  const rafScrollId = useRef<number | null>(null);
  const rafMouseId = useRef<number | null>(null);

  // 1. Device viewport detection
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(typeof window !== 'undefined' && window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 2. Tab Visibility API: pause animations when document is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // 3. Section Intensity Tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = [
      'hero',
      'selected-work',
      'experience',
      'how-i-build',
      'technical-profile',
      'about',
      'education',
      'certifications',
      'resume',
      'contact',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const targetIntensity = backgroundConfig.sectionIntensity[id];
            if (typeof targetIntensity === 'number') {
              setCurrentIntensity(targetIntensity);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-30% 0px -40% 0px',
        threshold: [0.1, 0.25],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // 4. Subtle Pointer Parallax (Desktop Only, throttled via RAF)
  useEffect(() => {
    if (shouldReduceMotion || !isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafMouseId.current !== null) return;

      rafMouseId.current = window.requestAnimationFrame(() => {
        const { innerWidth, innerHeight } = window;
        const normX = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
        const normY = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1

        setMouseOffset({
          x: Math.max(-1, Math.min(1, normX)),
          y: Math.max(-1, Math.min(1, normY)),
        });
        rafMouseId.current = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafMouseId.current !== null) {
        window.cancelAnimationFrame(rafMouseId.current);
      }
    };
  }, [shouldReduceMotion, isDesktop]);

  // 5. Scroll Response Tracking (Bounded to 10-15px)
  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleScroll = () => {
      if (typeof window === 'undefined' || window.innerWidth < 768) return;
      if (rafScrollId.current !== null) return;

      rafScrollId.current = window.requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        rafScrollId.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafScrollId.current !== null) {
        window.cancelAnimationFrame(rafScrollId.current);
      }
    };
  }, [shouldReduceMotion]);

  // Parallax offsets (Desktop pointer)
  const isPointerActive = isDesktop && !shouldReduceMotion;
  const gridParallaxX = isPointerActive ? mouseOffset.x * backgroundConfig.parallax.gridMax : 0;
  const gridParallaxY = isPointerActive ? mouseOffset.y * backgroundConfig.parallax.gridMax : 0;

  const lightParallaxX = isPointerActive ? mouseOffset.x * backgroundConfig.parallax.lightMax : 0;
  const lightParallaxY = isPointerActive ? mouseOffset.y * backgroundConfig.parallax.lightMax : 0;

  const arcParallaxX = isPointerActive ? mouseOffset.x * backgroundConfig.parallax.arcsMax : 0;
  const arcParallaxY = isPointerActive ? mouseOffset.y * backgroundConfig.parallax.arcsMax : 0;

  const nodeParallaxX = isPointerActive ? mouseOffset.x * backgroundConfig.parallax.nodesMax : 0;
  const nodeParallaxY = isPointerActive ? mouseOffset.y * backgroundConfig.parallax.nodesMax : 0;

  // Scroll offset bounded
  const scrollOffset = shouldReduceMotion
    ? 0
    : Math.min(Math.round(scrollY * 0.015), backgroundConfig.parallax.scrollMax);

  // Arc paths for Layer 3 & Layer 5
  // Sweeping computational contour trajectories
  const trajectory1 = 'M 140,160 C 450,40 850,220 1350,110';
  const trajectory2 = 'M 80,480 C 400,340 760,620 1280,440';
  const trajectory3 = 'M 160,820 C 560,680 920,860 1380,720';

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none bg-[#080806] ${
        !isTabVisible ? 'bg-animation-paused' : ''
      }`}
    >
      {/* Dynamic Section Intensity Wrapper */}
      <div
        style={{
          opacity: currentIntensity,
          transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="w-full h-full relative"
      >
        {/* =========================================================================
            LAYER 6: AMBIENT WARM LIGHTS (2 Large Soft Highlights)
            Light 1 (14s cycle), Light 2 (21s cycle)
            ========================================================================= */}
        {/* Light 1: Upper Atmosphere (Top Right) */}
        <div
          style={{
            transform: `translate3d(${lightParallaxX}px, ${lightParallaxY + scrollOffset * 0.7}px, 0)`,
            transition: 'transform 0.25s ease-out',
          }}
          className="absolute top-[-5%] right-[-5%] sm:top-[4%] sm:right-[5%] w-[420px] h-[420px] sm:w-[880px] sm:h-[880px] rounded-full blur-[140px] sm:blur-[160px] pointer-events-none"
        >
          <div
            className="w-full h-full rounded-full animate-ambient-light-1"
            style={{
              background:
                'radial-gradient(circle, rgba(212, 154, 70, 0.032) 0%, rgba(212, 154, 70, 0.012) 50%, transparent 75%)',
            }}
          />
        </div>

        {/* Light 2: Center-Left Atmosphere */}
        <div
          style={{
            transform: `translate3d(${lightParallaxX * -1}px, ${lightParallaxY * -1 + scrollOffset}px, 0)`,
            transition: 'transform 0.25s ease-out',
          }}
          className="absolute top-[42%] left-[-8%] sm:top-[46%] sm:left-[4%] w-[450px] h-[450px] sm:w-[940px] sm:h-[940px] rounded-full blur-[150px] sm:blur-[180px] pointer-events-none"
        >
          <div
            className="w-full h-full rounded-full animate-ambient-light-2"
            style={{
              background:
                'radial-gradient(circle, rgba(201, 141, 59, 0.024) 0%, rgba(201, 141, 59, 0.008) 55%, transparent 80%)',
            }}
          />
        </div>

        {/* =========================================================================
            LAYER 2: FINE TECHNICAL GRID
            Generous spacing (112px desktop, 80px mobile), low opacity, 26s drift
            ========================================================================= */}
        <div
          style={{
            transform: `translate3d(${gridParallaxX}px, ${gridParallaxY + scrollOffset * 0.3}px, 0)`,
            transition: 'transform 0.3s ease-out',
          }}
          className="absolute inset-0 opacity-[0.06] sm:opacity-[0.08] pointer-events-none"
        >
          <div className="w-full h-full animate-ambient-grid">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                {/* Desktop Grid: 112px */}
                <pattern
                  id="global-tech-grid-desktop"
                  width={backgroundConfig.grid.cellSizeDesktop}
                  height={backgroundConfig.grid.cellSizeDesktop}
                  patternUnits="userSpaceOnUse"
                  className="hidden sm:block"
                >
                  <path
                    d={`M ${backgroundConfig.grid.cellSizeDesktop} 0 L 0 0 0 ${backgroundConfig.grid.cellSizeDesktop}`}
                    fill="none"
                    stroke={backgroundConfig.colors.gridLine}
                    strokeWidth={backgroundConfig.grid.strokeWidth}
                    strokeOpacity={backgroundConfig.grid.lineOpacityDesktop}
                  />
                </pattern>

                {/* Mobile Grid: 80px */}
                <pattern
                  id="global-tech-grid-mobile"
                  width={backgroundConfig.grid.cellSizeMobile}
                  height={backgroundConfig.grid.cellSizeMobile}
                  patternUnits="userSpaceOnUse"
                  className="block sm:hidden"
                >
                  <path
                    d={`M ${backgroundConfig.grid.cellSizeMobile} 0 L 0 0 0 ${backgroundConfig.grid.cellSizeMobile}`}
                    fill="none"
                    stroke={backgroundConfig.colors.gridLine}
                    strokeWidth={backgroundConfig.grid.strokeWidth}
                    strokeOpacity={backgroundConfig.grid.lineOpacityMobile}
                  />
                </pattern>
              </defs>

              <rect
                width="100%"
                height="100%"
                fill="url(#global-tech-grid-desktop)"
                className="hidden sm:block"
              />
              <rect
                width="100%"
                height="100%"
                fill="url(#global-tech-grid-mobile)"
                className="block sm:hidden"
              />
            </svg>
          </div>
        </div>

        {/* =========================================================================
            LAYER 3, 4 & 5: AMBER ORBIT CONTOURS, NODES & MOVING SIGNAL
            Unsynchronized trajectory drifts: Arc 1 (18s), Arc 2 (23s), Arc 3 (29s)
            Nodes: 12 Desktop / 6 Mobile (3-6s pulse)
            Signal: Continuous 12s packet traversal along Trajectory 1
            ========================================================================= */}
        <div
          style={{
            transform: `translate3d(${arcParallaxX}px, ${arcParallaxY + scrollOffset * 0.5}px, 0)`,
            transition: 'transform 0.25s ease-out',
          }}
          className="absolute inset-0 pointer-events-none"
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 900"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* LAYER 3: CONTOUR TRAJECTORIES */}
            {/* Trajectory 1 (Upper Quadrant, 18s drift) */}
            <g className="animate-ambient-arc-1">
              <path
                id="global-trajectory-1"
                d={trajectory1}
                stroke={backgroundConfig.colors.primaryAccent}
                strokeWidth={backgroundConfig.contours.strokeWidth}
                strokeDasharray="4 8"
                strokeOpacity={backgroundConfig.contours.opacityDesktop}
              />
            </g>

            {/* Trajectory 2 (Center Quadrant, 23s drift) */}
            <g className="animate-ambient-arc-2">
              <path
                d={trajectory2}
                stroke={backgroundConfig.colors.primaryAccent}
                strokeWidth={backgroundConfig.contours.strokeWidth}
                strokeDasharray="3 7"
                strokeOpacity={backgroundConfig.contours.opacityDesktop * 0.85}
              />
            </g>

            {/* Trajectory 3 (Lower Quadrant, 29s drift) */}
            <g className="animate-ambient-arc-3 hidden sm:block">
              <path
                d={trajectory3}
                stroke={backgroundConfig.colors.primaryAccent}
                strokeWidth={backgroundConfig.contours.strokeWidth}
                strokeDasharray="5 10"
                strokeOpacity={backgroundConfig.contours.opacityDesktop * 0.75}
              />
            </g>

            {/* LAYER 5: MOVING SIGNAL (Continuous 12s traversal along Trajectory 1) */}
            {!shouldReduceMotion && (
              <g>
                {/* Outer soft glow packet */}
                <circle
                  r={backgroundConfig.signal.glowRadius}
                  fill={backgroundConfig.colors.primaryAccent}
                  fillOpacity={backgroundConfig.signal.glowOpacity}
                >
                  <animateMotion
                    dur={backgroundConfig.signal.duration}
                    repeatCount="indefinite"
                    path={trajectory1}
                  />
                </circle>

                {/* Core signal node */}
                <circle
                  r={backgroundConfig.signal.radius}
                  fill={backgroundConfig.colors.primaryAccent}
                  fillOpacity={backgroundConfig.signal.opacity}
                >
                  <animateMotion
                    dur={backgroundConfig.signal.duration}
                    repeatCount="indefinite"
                    path={trajectory1}
                  />
                </circle>
              </g>
            )}

            {/* LAYER 4: SMALL NODES (12 on desktop, 6 on mobile) */}
            <g
              style={{
                transform: `translate3d(${nodeParallaxX - arcParallaxX}px, ${nodeParallaxY - arcParallaxY}px, 0)`,
                transition: 'transform 0.25s ease-out',
              }}
            >
              {/* Node 1 (Pulsing, 4s cycle) */}
              <circle
                cx="140"
                cy="160"
                r="2"
                fill={backgroundConfig.colors.primaryAccent}
                className="animate-ambient-node-1"
              />

              {/* Node 2 (Fixed quiet anchor) */}
              <circle
                cx="450"
                cy="40"
                r="1.75"
                fill={backgroundConfig.colors.primaryAccent}
                fillOpacity="0.10"
              />

              {/* Node 3 (Pulsing, 5.5s cycle) */}
              <circle
                cx="850"
                cy="220"
                r="2"
                fill={backgroundConfig.colors.primaryAccent}
                className="animate-ambient-node-2"
              />

              {/* Node 4 (End of trajectory 1) */}
              <circle
                cx="1350"
                cy="110"
                r="1.75"
                fill={backgroundConfig.colors.primaryAccent}
                fillOpacity="0.09"
              />

              {/* Node 5 (Mid trajectory 2) */}
              <circle
                cx="80"
                cy="480"
                r="1.75"
                fill={backgroundConfig.colors.primaryAccent}
                fillOpacity="0.08"
              />

              {/* Node 6 (Mid trajectory 2 peak) */}
              <circle
                cx="760"
                cy="620"
                r="2"
                fill={backgroundConfig.colors.primaryAccent}
                fillOpacity="0.11"
              />

              {/* Desktop-only Nodes (Nodes 7-12) */}
              <g className="hidden sm:inline">
                {/* Node 7 */}
                <circle
                  cx="1280"
                  cy="440"
                  r="1.75"
                  fill={backgroundConfig.colors.primaryAccent}
                  fillOpacity="0.09"
                />

                {/* Node 8 */}
                <circle
                  cx="160"
                  cy="820"
                  r="1.75"
                  fill={backgroundConfig.colors.primaryAccent}
                  fillOpacity="0.08"
                />

                {/* Node 9 */}
                <circle
                  cx="560"
                  cy="680"
                  r="1.5"
                  fill={backgroundConfig.colors.primaryAccent}
                  fillOpacity="0.07"
                />

                {/* Node 10 */}
                <circle
                  cx="920"
                  cy="860"
                  r="1.75"
                  fill={backgroundConfig.colors.primaryAccent}
                  fillOpacity="0.09"
                />

                {/* Node 11 */}
                <circle
                  cx="1380"
                  cy="720"
                  r="1.5"
                  fill={backgroundConfig.colors.primaryAccent}
                  fillOpacity="0.08"
                />

                {/* Node 12 */}
                <circle
                  cx="1120"
                  cy="320"
                  r="1.5"
                  fill={backgroundConfig.colors.primaryAccent}
                  fillOpacity="0.07"
                />

                {/* Subtle Fine Connector between Node 11 and Node 12 */}
                <line
                  x1="1120"
                  y1="320"
                  x2="1280"
                  y2="440"
                  stroke={backgroundConfig.colors.primaryAccent}
                  strokeWidth="0.65"
                  strokeDasharray="3 6"
                  strokeOpacity="0.04"
                />
              </g>
            </g>
          </svg>
        </div>

        {/* =========================================================================
            MONOLITHIC VIGNETTE
            Ensures center content, portraits, and code blocks read with pristine contrast
            ========================================================================= */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(8, 8, 6, 0.5) 100%)',
          }}
        />
      </div>
    </div>
  );
};
