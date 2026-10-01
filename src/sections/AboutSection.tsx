import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { Container } from '../components/primitives/Container';
import { tokens } from '../styles/tokens';

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Subtle scroll parallax bounded for depth
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const primaryShiftY = useTransform(scrollYProgress, [0, 1], [15, -15]);

  const easeCurve = [0.16, 1, 0.3, 1] as [number, number, number, number];

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="About Jhansi Bhukya"
      className={`${tokens.spacing.sectionPadding} bg-transparent border-b border-[#292720] overflow-hidden relative scroll-mt-24`}
    >
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">
          
          {/* =========================================================================
              LEFT: PRIMARY PORTRAIT COMPOSITION
              Primary: clip-path reveal + opacity + translateY (700-900ms)
              No face animation. Real <img> element.
              ========================================================================= */}
          <div className="lg:col-span-5 relative h-[380px] sm:h-[480px] md:h-[540px] flex items-center justify-center lg:justify-start">
            <div className="relative w-full max-w-[380px] aspect-[4/5]">
              
              {/* Background technical grid for depth */}
              <div
                className="absolute -inset-8 opacity-[0.03] bg-[linear-gradient(to_right,#888175_1px,transparent_1px),linear-gradient(to_bottom,#888175_1px,transparent_1px)] bg-[size:28px_28px] -z-10"
                aria-hidden="true"
              />

              {/* Primary Portrait: Dominant Focal Anchor with custom framing and crop */}
              <motion.div
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, y: 0, clipPath: 'inset(0% 0 0% 0)' }
                    : { opacity: 0, y: 20, clipPath: 'inset(8% 0 8% 0)' }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                  clipPath: 'inset(0% 0 0% 0)',
                }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.8,
                  ease: easeCurve,
                }}
                style={shouldReduceMotion ? {} : { y: primaryShiftY }}
                className="relative w-full h-full z-20"
              >
                <div className="w-full h-full p-[1px] bg-[#1C1B15] border border-[#D49A46]/35 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)] relative overflow-hidden group">
                  <img
                    src="/Jhansi_Profile_Primary.jpeg"
                    alt="Jhansi Bhukya - AI / ML Engineer"
                    className="w-full h-full object-cover object-[center_0%] scale-[1.0] grayscale-[10%] brightness-[92%] contrast-[105%] transition-transform duration-500 group-hover:scale-[1.1]"
                  />
                  {/* Subtle Cinematic Edge Vignette / Radial mask overlay for distinct framing */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(8,8,6,0.35)_100%)] pointer-events-none" />
                  {/* Subtle Light Tone overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_40%,rgba(212,154,70,0.04)_50%,transparent_60%)] pointer-events-none" />
                </div>
              </motion.div>

              {/* Corner Accent Framing */}
              <div
                className="absolute -right-3 -bottom-3 w-16 h-16 border-r border-b border-[#D49A46]/30 z-30 pointer-events-none hidden sm:block"
                aria-hidden="true"
              >
                <div className="absolute right-0 bottom-0 w-1.5 h-1.5 bg-[#D49A46]" />
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT: PERSONAL & TECHNICAL ABOUT NARRATIVE
              Tone: Personal, concise, engineering-driven.
              Zero repetition of technical profile, experience bullets, or resume.
              ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, ease: easeCurve }}
            >
              {/* Section Tag */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" aria-hidden="true" />
                <span className="font-mono text-xs tracking-[0.12em] text-[#D49A46] uppercase font-semibold">
                  06 / ABOUT
                </span>
                <div className="h-px w-12 bg-[#292720]" aria-hidden="true" />
              </div>

              {/* Overline: GET TO KNOW ME */}
              <div className="mb-3">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#8E887D] font-medium">
                  GET TO KNOW ME
                </span>
              </div>

              {/* Heading: Hi, I’m Jhansi Bhukya. */}
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F2EBDD] leading-[1.1] mb-8">
                Hi, I’m <span className="text-[#D49A46]">Jhansi Bhukya.</span>
              </h2>

              {/* Concise Personal Narrative */}
              <div className="space-y-6 max-w-2xl border-l border-[#292720] pl-6 sm:pl-8">
                <p className="font-body text-base sm:text-lg text-[#DCD6CA] font-normal leading-relaxed">
                  I build software at the intersection of applied machine learning and reliable system architecture. I design end-to-end workflows where data preprocessing, model inference, and user-facing applications work together.
                </p>

                <p className="font-body text-base sm:text-lg text-[#DCD6CA] font-normal leading-relaxed">
                  Based in Hyderabad, I work across machine learning, computer vision, and full-stack engineering, with a focus on turning models into usable software.
                </p>
              </div>

              {/* Focus Strip */}
              <div className="mt-10 pt-8 border-t border-[#292720] max-w-2xl">
                <div className="font-mono text-[11px] text-[#8E887D] uppercase tracking-[0.12em] font-semibold mb-3">
                  FOCUS
                </div>
                <div className="font-mono text-sm text-[#F2EBDD] tracking-[0.04em]">
                  MACHINE LEARNING · COMPUTER VISION · AI SYSTEMS · FULL-STACK ENGINEERING
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </Container>
    </section>
  );
};
