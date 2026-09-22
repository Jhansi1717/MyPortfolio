import { useState, useRef, useCallback, useEffect } from 'react';
import { DEPTH_LAYERS } from '../animations/motionTokens';

export interface CardParallaxState {
  isHovered: boolean;
  mouseX: number;
  mouseY: number;
  // Parallax offsets in pixels
  contentOffset: { x: number; y: number };
  visualOffset: { x: number; y: number };
}

export function useCardParallax() {
  const [state, setState] = useState<CardParallaxState>({
    isHovered: false,
    mouseX: 0,
    mouseY: 0,
    contentOffset: { x: 0, y: 0 },
    visualOffset: { x: 0, y: 0 },
  });

  const cardRef = useRef<HTMLDivElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const motionListener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', motionListener);

    // Check touch device
    const touchQuery = window.matchMedia('(pointer: coarse)');
    setIsTouch(touchQuery.matches);

    return () => {
      motionQuery.removeEventListener('change', motionListener);
    };
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reducedMotion || isTouch || e.pointerType === 'touch') return;

      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Normalized coordinates: -0.5 to 0.5
      const normX = x / rect.width - 0.5;
      const normY = y / rect.height - 0.5;

      setState({
        isHovered: true,
        mouseX: x,
        mouseY: y,
        contentOffset: {
          x: normX * DEPTH_LAYERS.content * 2,
          y: normY * DEPTH_LAYERS.content * 2,
        },
        visualOffset: {
          x: normX * DEPTH_LAYERS.visual * 2,
          y: normY * DEPTH_LAYERS.visual * 2,
        },
      });
    },
    [reducedMotion, isTouch]
  );

  const handlePointerEnter = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reducedMotion || isTouch || e.pointerType === 'touch') return;
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setState((prev) => ({
        ...prev,
        isHovered: true,
        mouseX: x,
        mouseY: y,
      }));
    },
    [reducedMotion, isTouch]
  );

  const handlePointerLeave = useCallback(() => {
    setState({
      isHovered: false,
      mouseX: 0,
      mouseY: 0,
      contentOffset: { x: 0, y: 0 },
      visualOffset: { x: 0, y: 0 },
    });
  }, []);

  return {
    cardRef,
    state,
    reducedMotion: reducedMotion || isTouch,
    handlers: {
      onPointerMove: handlePointerMove,
      onPointerEnter: handlePointerEnter,
      onPointerLeave: handlePointerLeave,
    },
  };
}
