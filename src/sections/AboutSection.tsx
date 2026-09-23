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
  const secondaryShiftY = useTransform(scrollYProgress, [0, 1], [25, -25]);

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
              LEFT: DUAL PORTRAIT COMPOSITION (REAL PHOTOGRAPHS)
              Primary: clip-path reveal + opacity + translateY (700-900ms)
              Secondary: opacity + translateX (Stagger: 120ms, 700-900ms)
              No face animation. Real <img> elements.
              ========================================================================= */}
          <div className="lg:col-span-5 relative h-[380px] sm:h-[480px] md:h-[540px] flex items-center justify-center lg:justify-start">
            <div className="relative w-full max-w-[380px] aspect-[4/5]">
              
              {/* Background technical grid for depth */}
              <div
                className="absolute -inset-8 opacity-[0.03] bg-[linear-gradient(to_right,#888175_1px,transparent_1px),linear-gradient(to_bottom,#888175_1px,transparent_1px)] bg-[size:28px_28px] -z-10"
                aria-hidden="true"
              />

              {/* Secondary Portrait: Editorial Offset
                  Reveal: opacity + translateX, Stagger: 120ms, Duration: 800ms */}
              <motion.div
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -22 }
                }
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.8,
                  delay: 0.12,
                  ease: easeCurve,
                }}
                style={shouldReduceMotion ? {} : { y: secondaryShiftY }}
                className="absolute left-0 top-6 sm:top-8 w-[72%] aspect-[4/5] z-10"
              >
                <div className="w-full h-full p-[1px] bg-[#1E1C16] border border-[#2B2820] shadow-2xl overflow-hidden group">
                  <img
                    src="/Jhansi_Profile_Secondary.jpeg"
                    alt="Jhansi Bhukya - Working on systems engineering"
                    className="w-full h-full object-cover grayscale-[0.25] transition-transform duration-500 group-hover:scale-[1.015]"
                  />
                  <div className="absolute inset-0 bg-[#080806]/20 pointer-events-none" />
                </div>
              </motion.div>

              {/* Primary Portrait: Dominant Focal Anchor
                  Reveal: clip-path reveal + opacity + translateY, Duration: 800ms */}
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
                className="relative ml-auto w-[78%] aspect-[4/5] z-20"
              >
                <div className="w-full h-full p-[1px] bg-[#1C1B15] border border-[#D49A46]/35 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)] relative overflow-hidden group">
                  <img
                    src="/Jhansi_Profile_Primary.jpeg"
                    alt="Jhansi Bhukya - AI and Full-Stack Engineer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
                  />
                  {/* Subtle Light Tone */}
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
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F2EBDD] leading-[1.1] mb-4">
                Hi, I’m{' '}
                <span className="text-[#D49A46]">Jhansi Bhukya.</span>
              </h2>

              {/* Subtitle Identity */}
              <div className="font-mono text-xs sm:text-sm tracking-[0.08em] text-[#AAA398] uppercase mb-8 font-medium">
                AI SYSTEMS BUILDER &nbsp;·&nbsp; FULL-STACK ENGINEER
              </div>

              {/* Concise Personal Narrative */}
              <div className="space-y-5 max-w-2xl border-l border-[#292720] pl-6 sm:pl-8">
                <p className="font-body text-base sm:text-lg text-[#DCD6CA] font-normal leading-relaxed">
                  I build software at the intersection of applied machine learning and reliable system architecture. Rather than treating models as isolated experiments, I design end-to-end workflows where data preprocessing, model inference, and client interfaces reinforce each other.
                </p>

                <p className="font-body text-sm sm:text-base text-[#AAA398] leading-relaxed font-normal">
                  Based in Hyderabad, India, I enjoy solving problems that demand precision — from analyzing respiratory acoustic signals through spectrograms to architecting authenticated full-stack applications.
                </p>

                <p className="font-body text-sm sm:text-base text-[#8E887D] leading-relaxed font-normal">
                  When I am not writing code or reading model architecture papers, I invest time into core data structures, algorithmic challenges, and exploring scalable software patterns.
                </p>
              </div>

              {/* Core Philosophy Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 pt-8 border-t border-[#292720] max-w-2xl">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D49A46] mt-2 shrink-0" aria-hidden="true" />
                  <div>
                    <div className="font-mono text-xs font-bold text-[#F2EBDD] uppercase tracking-wider">
                      SYSTEMS-FIRST MINDSET
                    </div>
                    <p className="font-body text-xs text-[#8E887D] mt-1 leading-normal">
                      Every model requires scalable pipelines, testing, and responsive interfaces to provide true utility.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D49A46] mt-2 shrink-0" aria-hidden="true" />
                  <div>
                    <div className="font-mono text-xs font-bold text-[#F2EBDD] uppercase tracking-wider">
                      CLEAR EXPLAINABILITY
                    </div>
                    <p className="font-body text-xs text-[#8E887D] mt-1 leading-normal">
                      Deep learning decisions should be transparent, verifiable, and backed by attribution tools.
                    </p>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </Container>
    </section>
  );
};
