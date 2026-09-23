import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Container } from '../components/primitives/Container';
import { SectionHeading } from '../components/primitives/SectionHeading';
import { Search, PenTool, Code, BarChart3, Rocket, RefreshCw } from 'lucide-react';

interface WorkflowStep {
  id: string;
  code: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 'understand',
    code: 'STEP // 01',
    title: 'UNDERSTAND',
    icon: <Search className="w-4 h-4 text-[#D49A46]" aria-hidden="true" />,
    description: 'Analyzing problem constraints, user requirements, and technical feasibility.',
  },
  {
    id: 'design',
    code: 'STEP // 02',
    title: 'DESIGN',
    icon: <PenTool className="w-4 h-4 text-[#D49A46]" aria-hidden="true" />,
    description: 'Architecting system schemas, UI/UX flows, and model selection.',
  },
  {
    id: 'build',
    code: 'STEP // 03',
    title: 'BUILD',
    icon: <Code className="w-4 h-4 text-[#D49A46]" aria-hidden="true" />,
    description: 'Implementing robust code across full-stack and ML pipelines.',
  },
  {
    id: 'evaluate',
    code: 'STEP // 04',
    title: 'EVALUATE',
    icon: <BarChart3 className="w-4 h-4 text-[#D49A46]" aria-hidden="true" />,
    description: 'Testing performance, accuracy, and edge-case reliability.',
  },
  {
    id: 'deploy',
    code: 'STEP // 05',
    title: 'DEPLOY',
    icon: <Rocket className="w-4 h-4 text-[#D49A46]" aria-hidden="true" />,
    description: 'Releasing to staging/production environments with monitoring.',
  },
  {
    id: 'iterate',
    code: 'STEP // 06',
    title: 'ITERATE',
    icon: <RefreshCw className="w-4 h-4 text-[#D49A46]" aria-hidden="true" />,
    description: 'Continuous improvement based on feedback and performance data.',
  },
];

const AI_PIPELINE = [
  'DATA',
  'REPRESENTATION',
  'MODEL',
  'EVALUATION',
  'SYSTEM',
  'PRODUCT'
];

export const ResearchFocusSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const xLeft = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="how-i-build"
      className="py-20 md:py-28 lg:py-32 border-b border-[#292720] bg-transparent relative scroll-mt-24 overflow-hidden"
    >
      {/* Engineering Process Subtle Geometric Accent */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <svg className="w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <line x1="10%" y1="0" x2="10%" y2="100%" stroke="#D49A46" strokeWidth="0.5" strokeDasharray="6 12" strokeOpacity="0.04" />
          <line x1="90%" y1="0" x2="90%" y2="100%" stroke="#D49A46" strokeWidth="0.5" strokeDasharray="6 12" strokeOpacity="0.04" />
        </svg>
      </div>
      <Container size="wide">
        <SectionHeading
          indexTag="04 / HOW I BUILD"
          title="HOW I BUILD"
          description="A systematic engineering workflow for building robust AI systems and scalable software."
        />

        {/* AI Pipeline Logic Flow */}
        <div className="mb-16 mt-12 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex items-center gap-4 min-w-max">
            {AI_PIPELINE.map((step, idx) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <span className="font-mono text-[10px] text-[#68645C] mb-2 uppercase tracking-widest">
                    {idx + 1}
                  </span>
                  <div className="px-6 py-3 border border-[#24221C] bg-[#0E0D0A] text-[#F2EBDD] font-mono text-[11px] uppercase tracking-widest font-bold">
                    {step}
                  </div>
                </div>
                {idx < AI_PIPELINE.length - 1 && (
                  <div className="w-8 h-px bg-[#24221C] mt-6" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Engineering Workflow Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {WORKFLOW_STEPS.map((step) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className="group p-8 border border-[#24221C] bg-[#0E0D0A] hover:bg-[#11100C] hover:border-[#D49A46]/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] text-[#D49A46] tracking-widest">
                  {step.code}
                </span>
                <div className="p-2 border border-[#24221C] group-hover:border-[#D49A46]/20 transition-colors">
                  {step.icon}
                </div>
              </div>
              <h3 className="font-display text-lg font-bold text-[#F2EBDD] mb-3 uppercase tracking-tight">
                {step.title}
              </h3>
              <p className="font-body text-sm sm:text-[15px] text-[#AAA398] leading-relaxed font-normal">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>

      {/* Background Watermark */}
      {!shouldReduceMotion && (
        <motion.div
          style={{ x: xLeft }}
          className="absolute -bottom-12 left-0 font-display font-black text-[12rem] text-[#F2EBDD] opacity-[0.015] whitespace-nowrap pointer-events-none select-none"
        >
          UNDERSTAND · DESIGN · BUILD · EVALUATE · DEPLOY · ITERATE
        </motion.div>
      )}
    </section>
  );
};
