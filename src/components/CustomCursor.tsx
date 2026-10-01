import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [isInteractive, setIsInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const requestRef = useRef<number | null>(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check touch screen or coarse pointer
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    setIsTouchDevice(isTouch);

    // Check reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    motionQuery.addEventListener('change', handleMotionChange);

    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if target or any parent is interactive
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractiveElement = Boolean(
          target.closest('a, button, input, textarea, select, [role="button"], [role="option"], [data-cursor-interactive="true"], .cursor-pointer')
        );
        setIsInteractive(isInteractiveElement);
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // High performance RAF loop modifying DOM styles directly without React re-renders
    const animate = () => {
      const ease = 0.35;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * ease;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * ease;

      const px = Math.round(currentPos.current.x * 10) / 10;
      const py = Math.round(currentPos.current.y * 10) / 10;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible]);

  // If touch device or reduced motion is enabled or cursor is outside viewport, don't render custom ring/dot
  if (isTouchDevice || prefersReducedMotion || !isVisible) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
    >
      {/* Small dot (center origin) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#E5BA70] transition-opacity duration-150"
        style={{
          opacity: isVisible ? (isInteractive ? 0 : 0.9) : 0,
        }}
      />

      {/* Subtle expanded ring when hovering interactive elements */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full border border-[#D49A46]/70 bg-[#D49A46]/10 transition-all duration-200 ease-out"
        style={{
          width: isInteractive ? '36px' : '0px',
          height: isInteractive ? '36px' : '0px',
          opacity: isInteractive ? 1 : 0,
        }}
      />
    </div>
  );
};
