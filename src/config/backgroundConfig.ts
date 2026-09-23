/**
 * Global Ambient Background System Configuration
 * 
 * Centralized design tokens and motion parameters for the minimal,
 * continuous engineering atmospheric background across the entire portfolio.
 */
export const backgroundConfig = {
  // Layer 1: Base obsidian / near-black
  colors: {
    base: '#080806',
    surfaceFallback: '#090907',
    primaryAccent: '#D49A46', // Refined warm amber
    warmAccent: '#C98D3B',
    subtleIvory: '#F2EBDD',
    gridLine: '#D49A46',
  },

  // Layer 2: Fine Grid
  grid: {
    cellSizeDesktop: 112,
    cellSizeMobile: 80,
    lineOpacityDesktop: 0.028,
    lineOpacityMobile: 0.016,
    strokeWidth: 0.75,
    driftDuration: '26s',
  },

  // Layer 3: Amber Orbit / Contour Trajectories
  contours: {
    strokeWidth: 0.8,
    opacityDesktop: 0.055,
    opacityMobile: 0.028,
    arc1Duration: '18s',
    arc2Duration: '23s',
    arc3Duration: '29s',
  },

  // Layer 4: Small Nodes (Desktop max 12, Mobile max 6)
  nodes: {
    desktopCount: 12,
    mobileCount: 6,
    baseRadius: 1.75,
    opacity: 0.12,
    pulseDuration1: '4s',
    pulseDuration2: '5.5s',
  },

  // Layer 5: Moving Signal (Packet traversing trajectory)
  signal: {
    duration: '12s',
    radius: 2,
    glowRadius: 4.5,
    opacity: 0.55,
    glowOpacity: 0.15,
  },

  // Layer 6: Ambient Warm Lights (2 large, soft radial highlights)
  radialLights: {
    light1: {
      position: { top: '4%', right: '5%' },
      sizeDesktop: 880,
      sizeMobile: 420,
      opacityDesktop: 0.032,
      opacityMobile: 0.018,
      blur: 160,
      duration: '14s',
    },
    light2: {
      position: { top: '46%', left: '4%' },
      sizeDesktop: 940,
      sizeMobile: 450,
      opacityDesktop: 0.024,
      opacityMobile: 0.014,
      blur: 180,
      duration: '21s',
    },
  },

  // Layer 7: Parallax Mappings (Desktop pointer movement, max 1-5px)
  parallax: {
    gridMax: 1,
    lightMax: 2,
    arcsMax: 4,
    nodesMax: 5,
    scrollMax: 12,
  },

  // Section-specific intensity multipliers for smooth natural continuity
  sectionIntensity: {
    hero: 1.0,           // 100%
    'selected-work': 0.85, // 85%
    experience: 0.70,    // 70%
    'how-i-build': 0.90, // 90%
    'technical-profile': 0.65, // 65%
    about: 0.75,         // 75%
    education: 0.50,     // 50%
    certifications: 0.50, // 50%
    resume: 0.30,        // 30%
    contact: 0.70,       // 70%
  } as Record<string, number>,
} as const;
