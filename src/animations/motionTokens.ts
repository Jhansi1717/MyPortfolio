/**
 * Centralized Motion Tokens & Motion Design System
 * Defines standard timings, easing curves, stagger ratios, and performance rules.
 */

// Timing Constants (in seconds for Motion / Framer Motion compatibility)
export const FAST = 0.2; // 200ms - micro-interactions, active press, toggles, icon shifts
export const MEDIUM = 0.35; // 350ms - card hover states, tabs, line transitions, dropdowns
export const SLOW = 0.6; // 600ms - page entrance, section reveals, modal entrance

export const MOTION_TIMING = {
  fast: FAST,
  medium: MEDIUM,
  slow: SLOW,
  FAST,
  MEDIUM,
  SLOW,
} as const;

// Stagger Delays (in seconds)
export const STAGGER = {
  fast: 0.04, // 40ms stagger for dense list items
  medium: 0.08, // 80ms stagger for cards / grid items
  slow: 0.12, // 120ms stagger for hero items / major features
} as const;

export const MOTION_STAGGER = STAGGER;

// Easing Curves (Cubic Bezier tuples for GPU acceleration)
export const EASING = {
  // Primary fluid curve for editorial and UI transitions
  easeOut: [0.16, 1, 0.3, 1] as const,
  // Smooth deceleration for micro-interactions
  smooth: [0.25, 0.1, 0.25, 1] as const,
  // Responsive spring-like curve for tactile buttons
  spring: [0.34, 1.56, 0.64, 1] as const,
  // Subtle deceleration
  gentle: [0.33, 1, 0.68, 1] as const,
  // Linear
  linear: [0, 0, 1, 1] as const,
} as const;

export const MOTION_EASING = EASING;

// Depth & Parallax Layer Ratios
export const DEPTH_LAYERS = {
  content: 1, // 1px subtle shift
  visual: 4, // 3-4px architecture/visual shift
  decoration: 7, // 6-7px ambient lighting/accent shift
} as const;
