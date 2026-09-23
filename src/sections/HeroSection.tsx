import React, { useRef } from 'react';
import { ArrowDown, Download } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { Container } from '../components/primitives/Container';
import { HeroRoleSlider } from '../components/HeroRoleSlider';
import { resumeConfig } from '../data/portfolioData';

export const HeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Desktop Pointer Parallax state (Window width >= 1024px)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 45, damping: 24 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 24 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (shouldReduceMotion || typeof window === 'undefined' || window.innerWidth < 1024) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Parallax Mappings according to exact specifications:
  // Background: 1–2px
  const bgX = useTransform(springX, [-0.5, 0.5], [-1.5, 1.5]);
  const bgY = useTransform(springY, [-0.5, 0.5], [-1.5, 1.5]);

  // Portrait: 4–6px (max rotation: 1 degree)
  const portraitX = useTransform(springX, [-0.5, 0.5], [-5, 5]);
  const portraitY = useTransform(springY, [-0.5, 0.5], [-5, 5]);
  const portraitRotate = useTransform(springX, [-0.5, 0.5], [-1, 1]);

  // Frame: 5–7px
  const frameX = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const frameY = useTransform(springY, [-0.5, 0.5], [-6, 6]);

  // Arc / Geometry: 7–9px
  const arcX = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const arcY = useTransform(springY, [-0.5, 0.5], [-8, 8]);

  // Subtle Scroll-linked Motion (Portrait moves max 15px, background 8px, text subtle fade)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const portraitScrollY = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const bgScrollY = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const textScrollOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.88]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.12], [0.65, 0]);

  const handleScrollToProjects = (e?: React.MouseEvent<HTMLElement>) => {
    if (e) e.preventDefault();
    const projectsEl = document.getElementById('selected-work');
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Coordinated staggered entrance for text (1.2–1.5s total duration)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.11,
        delayChildren: 0.08,
      },
    },
  };

  // Entrance variants: opacity 0 -> 1, translateY 16px -> 0
  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] lg:min-h-screen flex items-center pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-24 overflow-hidden bg-transparent"
    >
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 xl:gap-16 items-center">
          
          {/* =========================================================================
              LEFT COLUMN (~55%): TEXT HIERARCHY
              Priority:
              1. AI/ML ENGINEER (Dominant Visual Anchor)
              2. JHANSI BHUKYA
              3. AI SYSTEMS BUILDER · FULL-STACK ENGINEER
              4. Value Statement
              5. Supporting Copy
              6. CTA
              ========================================================================= */}
          <motion.div
            style={shouldReduceMotion ? {} : { opacity: textScrollOpacity }}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="lg:col-span-7 z-10 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* 1. Identity Cue & Location */}
            <motion.div variants={itemVariants} className="flex items-center gap-2.5 mb-4 sm:mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" aria-hidden="true" />
              <h1 className="font-mono text-xs sm:text-sm tracking-[0.09em] text-[#D49A46] uppercase font-medium leading-[1.3]">
                JHANSI BHUKYA // HYDERABAD, INDIA
              </h1>
            </motion.div>

            {/* 2. Role Animation (Dominant Visual Anchor with quiet 'I AM AN' label above) */}
            <motion.div variants={itemVariants} className="mb-4 sm:mb-5 w-full">
              <HeroRoleSlider />
            </motion.div>

            {/* 3. Permanent Positioning Line */}
            <motion.div variants={itemVariants} className="mb-5 sm:mb-6">
              <div className="font-mono text-xs sm:text-sm md:text-[0.92rem] tracking-[0.08em] text-[#AAA398] uppercase font-medium leading-[1.3]">
                AI SYSTEMS BUILDER &nbsp;·&nbsp; FULL-STACK ENGINEER
              </div>
            </motion.div>

            {/* 4. Main Value Statement (Editorial Line Structure & Balanced Wrap) */}
            <motion.div variants={itemVariants} className="mb-6 sm:mb-7 max-w-[700px]">
              <p className="font-display text-[1.75rem] sm:text-[2.05rem] md:text-[2.35rem] lg:text-[2.65rem] xl:text-[2.95rem] 2xl:text-[3.2rem] text-[#F2EBDD] font-semibold leading-[1.14] tracking-[-0.02em] [text-wrap:balance]">
                I design and engineer intelligent systems{' '}
                <span className="lg:block">that turn complex problems into usable products.</span>
              </p>
            </motion.div>

            {/* 5. Supporting Copy (Comfortable Body Typography: Inter, 17–19px desktop) */}
            <motion.div variants={itemVariants} className="mb-8 sm:mb-10 max-w-[620px]">
              <p className="font-body text-base sm:text-[1.05rem] lg:text-[1.12rem] xl:text-[1.18rem] text-[#AAA398] font-normal leading-[1.65] tracking-normal">
                Computer Science &amp; Engineering (AI &amp; ML) student building systems across 
                machine learning, computer vision, and full-stack engineering.
              </p>
            </motion.div>

            {/* 6. Action CTAs with Micro-Interactions */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              {/* Primary: VIEW SELECTED WORK */}
              <button
                onClick={handleScrollToProjects}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 bg-[#D49A46] text-[#090907] font-mono text-xs uppercase font-semibold tracking-[0.06em] rounded-xs transition-all duration-300 hover:bg-[#E5BA70] hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D49A46]"
                aria-label="View Selected Work"
              >
                <span>VIEW SELECTED WORK</span>
                <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* Secondary: DOWNLOAD RESUME */}
              <a
                href={resumeConfig.filePath}
                download={resumeConfig.fileName}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 border border-[#2E2B22] text-[#F2EBDD] font-mono text-xs uppercase font-semibold tracking-[0.06em] rounded-xs transition-all duration-300 hover:border-[#D49A46]/60 hover:text-[#E5BA70] hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#D49A46]"
                aria-label="Download Resume PDF"
              >
                <Download className="w-3.5 h-3.5 text-[#D49A46] transition-transform duration-300 group-hover:translate-y-0.5" />
                <span>DOWNLOAD RESUME</span>
              </a>
            </motion.div>
          </motion.div>

          {/* =========================================================================
              RIGHT COLUMN (~45%): EDITORIAL PORTRAIT VISUAL
              Refinements:
              - Thinner amber frame with elegant corner marks and more negative space
              - Scaled, lower-opacity background arc geometry placed farther behind
              - Slow ambient amber light (8-12s duration) positioned strictly behind container
              - Pointer parallax (desktop) & subtle scroll shift (max 15px)
              - Mirrored portrait: scaleX(-1) orienting gaze toward content
              ========================================================================= */}
          <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end w-full py-4 sm:py-6">
            
            {/* 1. Background Arc Geometry — Enlarged, lower opacity (atmospheric only) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={shouldReduceMotion ? {} : { x: arcX, y: arcY, translateY: bgScrollY }}
              className="absolute inset-0 flex items-center justify-center opacity-[0.06] sm:opacity-[0.07] pointer-events-none -z-20"
              aria-hidden="true"
            >
              <div className="w-[135%] aspect-square border border-[#D49A46] rounded-full scale-110" />
              <div className="absolute w-[95%] aspect-square border border-[#D49A46]/80 rounded-full" />
              <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-[#D49A46]/60 to-transparent" />
            </motion.div>

            {/* 2. Slow Ambient Amber Light Behind Portrait (8–12s duration, strictly behind image) */}
            <div 
              className="absolute w-[360px] sm:w-[440px] aspect-square rounded-full blur-[80px] sm:blur-[95px] bg-[#D49A46]/[0.026] pointer-events-none -z-10 animate-hero-portrait-light"
              aria-hidden="true"
            />

            {/* 3. Portrait Container: Enters opacity 0->1, y 20->0, scale 0.985->1 over 800ms, then stops */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={shouldReduceMotion ? {} : { 
                x: portraitX, 
                y: portraitY, 
                rotate: portraitRotate,
                translateY: portraitScrollY 
              }}
              className="relative w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[380px] xl:max-w-[400px] aspect-[4/5] z-10 p-2 sm:p-3"
            >
              {/* Thin Refined Amber Frame */}
              <div className="relative w-full h-full p-[1px] bg-[#171612] border border-[#26241D] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
                {/* 
                  CSS Transform Mirroring: scaleX(-1)
                  Directs gaze toward the typography hierarchy on the left.
                  Source JPEG asset remains 100% untouched.
                */}
                <div className="w-full h-full overflow-hidden [transform:scaleX(-1)]">
                  <img 
                    src="/Jhansi_Profile_Primary.jpeg" 
                    alt="Jhansi Bhukya"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Subtle Cinematic Edge Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080806]/35 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Elegant Corner Marks (Lower opacity, refined visual weight) */}
              <div className="absolute top-0.5 left-0.5 w-3 h-3 border-t border-l border-[#D49A46]/45 pointer-events-none" aria-hidden="true" />
              <div className="absolute top-0.5 right-0.5 w-3 h-3 border-t border-r border-[#D49A46]/45 pointer-events-none" aria-hidden="true" />
              <div className="absolute bottom-0.5 left-0.5 w-3 h-3 border-b border-l border-[#D49A46]/45 pointer-events-none" aria-hidden="true" />
              <div className="absolute bottom-0.5 right-0.5 w-3 h-3 border-b border-r border-[#D49A46]/45 pointer-events-none" aria-hidden="true" />

              {/* Fine Framing Accents (Parallax mapped to frame) */}
              <motion.div 
                style={shouldReduceMotion ? {} : { x: frameX, y: frameY }}
                className="absolute bottom-6 -left-4 w-16 h-px bg-[#D49A46]/30 z-20 pointer-events-none hidden sm:block"
                aria-hidden="true"
              />
              <motion.div 
                style={shouldReduceMotion ? {} : { x: frameX, y: frameY }}
                className="absolute top-1/4 -right-4 w-px h-24 bg-gradient-to-b from-transparent via-[#D49A46]/25 to-transparent z-20 pointer-events-none hidden sm:block"
                aria-hidden="true"
              />
            </motion.div>
          </div>

        </div>
      </Container>

      {/* =========================================================================
          SCROLL INDICATOR
          Subtle, elegant scroll cue at bottom of Hero
          ========================================================================= */}
      <motion.div
        style={shouldReduceMotion ? {} : { opacity: scrollIndicatorOpacity }}
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none select-none z-10"
        aria-hidden="true"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#6E6A62]">
          SCROLL TO EXPLORE
        </span>
        <div className="w-px h-5 bg-gradient-to-b from-[#D49A46]/45 via-[#D49A46]/15 to-transparent" />
      </motion.div>
    </section>
  );
};
