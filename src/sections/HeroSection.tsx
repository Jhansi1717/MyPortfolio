import React, { useRef } from 'react';
import { ArrowDown, FileText, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { Container } from '../components/primitives/Container';
import { resumeConfig } from '../data/portfolioData';
import { EASE_CUSTOM, DURATION } from '../utils/motionTokens';
import { HeroRoleSlider } from '../components/HeroRoleSlider';

export const HeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Desktop Pointer Parallax: Subtle, restrained and critically damped
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 70, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 70, damping: 30 });

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

  // Subtle Parallax (max 3px, calm and controlled)
  const portraitX = useTransform(springX, [-0.5, 0.5], [-3, 3]);
  const portraitY = useTransform(springY, [-0.5, 0.5], [-3, 3]);

  // Scroll-driven Hero -> Selected Work Transition
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Typography moves out with quiet purpose: -18px upward translation and smooth fade
  const textExitY = useTransform(scrollYProgress, [0, 0.75], [0, -18]);
  const textExitOpacity = useTransform(scrollYProgress, [0, 0.5, 0.85], [1, 0.88, 0.2]);

  // Portrait visual subtly shifts: -14px and slight scale down to 0.97
  const visualExitY = useTransform(scrollYProgress, [0, 1], [0, -14]);
  const visualExitScale = useTransform(scrollYProgress, [0, 0.85], [1, 0.97]);
  const visualExitOpacity = useTransform(scrollYProgress, [0, 0.6, 0.95], [1, 0.90, 0.25]);

  // Scroll indicator exit
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [0.7, 0]);

  // Environmental transition line connecting to Selected Work
  const transitionLineScaleY = useTransform(scrollYProgress, [0.35, 0.95], [0, 1]);
  const transitionLineOpacity = useTransform(scrollYProgress, [0.35, 0.7, 1], [0, 0.75, 0.3]);

  const handleScrollToProjects = (e?: React.MouseEvent<HTMLElement>) => {
    if (e) e.preventDefault();
    const projectsEl = document.getElementById('selected-work');
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Coordinated Entrance Choreography:
  // 1. Identity cue (0.00s)
  // 2. AI / ML ENGINEER (0.08s)
  // 3. Positioning statement (0.16s)
  // 4. Supporting focus (0.24s)
  // 5. CTA buttons (0.32s)
  // 6. Portrait settles (0.40s)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.02,
      },
    },
  };

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: DURATION.SECTION,
        ease: EASE_CUSTOM,
      },
    },
  };

  // Portrait settles gracefully in sequence at step 6 (delay 0.40s)
  const portraitVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.985 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        delay: 0.40,
        ease: EASE_CUSTOM,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-24 overflow-hidden bg-transparent"
    >
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-16 items-center">
          
          {/* =========================================================================
              LEFT COLUMN: IDENTITY HIERARCHY
              1. Name (JHANSI BHUKYA)
              2. Role (AI / ML ENGINEER)
              3. Main Statement (BUILDING INTELLIGENT SYSTEMS / FROM MODEL → PRODUCT.)
              4. Supporting Specialization
              5. CTAs (VIEW WORK, RESUME)
              ========================================================================= */}
          <motion.div
            style={shouldReduceMotion ? {} : { y: textExitY, opacity: textExitOpacity }}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="lg:col-span-7 z-10 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* 1. Name: JHANSI BHUKYA */}
            <motion.div variants={itemVariants} className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" aria-hidden="true" />
              <span className="font-mono text-xs sm:text-sm tracking-[0.16em] text-[#D49A46] uppercase font-semibold">
                JHANSI BHUKYA
              </span>
            </motion.div>

            {/* 2. Primary Role: Rotating professional role */}
            <motion.div variants={itemVariants} className="mb-6 sm:mb-7 w-full h-[65px] sm:h-[85px] md:h-[105px] lg:h-[110px] xl:h-[125px] relative">
              <HeroRoleSlider />
            </motion.div>

            {/* 3. Main Positioning Statement */}
            <motion.div variants={itemVariants} className="mb-6 sm:mb-7 max-w-[680px]">
              <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] text-[#F2EBDD] font-semibold leading-[1.16] tracking-tight uppercase">
                BUILDING INTELLIGENT SYSTEMS
              </p>
              <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] text-[#E5BA70] font-semibold leading-[1.16] tracking-tight uppercase mt-1 sm:mt-1.5">
                FROM MODEL → PRODUCT.
              </p>
            </motion.div>

            {/* 4. Supporting Specialization */}
            <motion.div variants={itemVariants} className="mb-8 sm:mb-10 max-w-[620px]">
              <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-x-2.5 gap-y-1 font-mono text-xs sm:text-sm text-[#AAA398] tracking-[0.06em] py-2 px-3.5 border border-[#24221C] bg-[#11100C]/70 rounded-xs">
                <span className="text-[#F2EBDD]">Computer Vision</span>
                <span className="text-[#D49A46]">•</span>
                <span className="text-[#F2EBDD]">Generative AI</span>
                <span className="text-[#D49A46]">•</span>
                <span className="text-[#F2EBDD]">RAG</span>
                <span className="text-[#D49A46]">•</span>
                <span className="text-[#F2EBDD]">AI Systems</span>
              </div>
            </motion.div>

            {/* 5. CTAs: VIEW WORK & RESUME */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              {/* Primary CTA: VIEW WORK */}
              <button
                onClick={handleScrollToProjects}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 bg-[#D49A46] text-[#090907] font-mono text-xs uppercase font-bold tracking-[0.08em] rounded-xs transition-all duration-200 hover:bg-[#E5BA70] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D49A46]"
                aria-label="View Selected Work"
              >
                <span>VIEW WORK</span>
                <ArrowDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
              </button>

              {/* Secondary CTA: RESUME */}
              <a
                href={resumeConfig.filePath}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 border border-[#2E2B22] bg-[#12110D] text-[#F2EBDD] font-mono text-xs uppercase font-semibold tracking-[0.08em] rounded-xs transition-all duration-200 hover:border-[#D49A46]/60 hover:text-[#E5BA70] hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-[#D49A46]"
                aria-label="Open Resume in new tab"
              >
                <FileText className="w-3.5 h-3.5 text-[#D49A46]" />
                <span>RESUME</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#AAA398] group-hover:text-[#E5BA70] transition-colors" />
              </a>
            </motion.div>
          </motion.div>

          {/* =========================================================================
              RIGHT COLUMN: EDITORIAL PORTRAIT & AURA
              ========================================================================= */}
          <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end w-full py-4 sm:py-6">
            
            {/* Ambient Warmth behind image */}
            <div 
              className="absolute w-[320px] sm:w-[400px] aspect-square rounded-full blur-[80px] sm:blur-[95px] bg-[#D49A46]/[0.025] pointer-events-none -z-10"
              aria-hidden="true"
            />

            {/* Outer Transition Wrapper: Subtle scroll shift into Selected Work */}
            <motion.div
              style={shouldReduceMotion ? {} : { 
                y: visualExitY,
                scale: visualExitScale,
                opacity: visualExitOpacity,
              }}
              className="relative w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[380px] xl:max-w-[400px] aspect-[4/5] z-10 p-2 sm:p-3"
            >
              {/* Inner Portrait Container with Choreographed Settle */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={portraitVariants}
                style={shouldReduceMotion ? {} : { 
                  x: portraitX, 
                  y: portraitY, 
                }}
                className="w-full h-full relative"
              >
                {/* Thin Refined Amber Frame */}
                <div className="relative w-full h-full p-[1px] bg-[#171612] border border-[#26241D] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] rounded-xs">
                  <div className="w-full h-full overflow-hidden [transform:scaleX(-1)]">
                    <img 
                      src="/Jhansi_Profile_Primary.jpeg" 
                      alt="Jhansi Bhukya — AI/ML Engineer"
                      className="w-full h-full object-cover object-[center_20%]"
                      loading="eager"
                      decoding="sync"
                    />
                  </div>
                  
                  {/* Subtle Cinematic Edge Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080806]/35 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Elegant Corner Framing Accents */}
                <div className="absolute top-0.5 left-0.5 w-3 h-3 border-t border-l border-[#D49A46]/45 pointer-events-none" aria-hidden="true" />
                <div className="absolute top-0.5 right-0.5 w-3 h-3 border-t border-r border-[#D49A46]/45 pointer-events-none" aria-hidden="true" />
                <div className="absolute bottom-0.5 left-0.5 w-3 h-3 border-b border-l border-[#D49A46]/45 pointer-events-none" aria-hidden="true" />
                <div className="absolute bottom-0.5 right-0.5 w-3 h-3 border-b border-r border-[#D49A46]/45 pointer-events-none" aria-hidden="true" />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </Container>

      {/* Subtle Scroll Cue at bottom */}
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

      {/* Environmental transition conduit to Selected Work */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 pointer-events-none overflow-hidden z-10" aria-hidden="true">
        <motion.div
          style={shouldReduceMotion ? {} : { scaleY: transitionLineScaleY, opacity: transitionLineOpacity }}
          className="w-full h-full bg-gradient-to-b from-[#D49A46]/0 via-[#D49A46]/50 to-[#D49A46] origin-top"
        />
      </div>
    </section>
  );
};
