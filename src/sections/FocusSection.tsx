import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Container } from '../components/primitives/Container';
import {
  Brain,
  Eye,
  Sparkles,
  Bot,
  Server,
  Cpu,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { EASE_CUSTOM, DURATION } from '../utils/motionTokens';

interface FocusDomain {
  id: string;
  number: string;
  title: string;
  tagline: string;
  icon: React.ReactNode;
  technologies: string[];
  appliedIn?: {
    label: string;
    route?: string;
  };
}

const FOCUS_DOMAINS: FocusDomain[] = [
  {
    id: 'ai-ml',
    number: '01',
    title: 'AI / MACHINE LEARNING',
    tagline: 'Deep learning backbones, feature conditioning, loss optimization, and robust evaluation metrics.',
    icon: <Brain className="w-4 h-4 text-[#D49A46]" aria-hidden="true" />,
    technologies: ['TensorFlow', 'PyTorch', 'Scikit-Learn', 'Feature Engineering'],
    appliedIn: {
      label: 'Respiratory AI & Aminobots',
      route: '/projects/respiratory-ai',
    },
  },
  {
    id: 'computer-vision',
    number: '02',
    title: 'COMPUTER VISION',
    tagline: 'STFT log-mel spectrogram transformations, EfficientNet-B0 backbones, and Grad-CAM XAI saliency.',
    icon: <Eye className="w-4 h-4 text-[#D49A46]" aria-hidden="true" />,
    technologies: ['EfficientNet-B0', 'STFT Spectrograms', 'Grad-CAM', 'OpenCV'],
    appliedIn: {
      label: 'AI Respiratory Screening System',
      route: '/projects/respiratory-ai',
    },
  },
  {
    id: 'generative-ai',
    number: '03',
    title: 'GENERATIVE AI',
    tagline: 'Transformer architectures, prompt engineering, structured JSON grounding, and context conditioning.',
    icon: <Sparkles className="w-4 h-4 text-[#D49A46]" aria-hidden="true" />,
    technologies: ['LLM APIs', 'Transformers', 'Structured Outputs', 'Context Conditioning'],
    appliedIn: {
      label: 'Grounded Assistant & Copilots',
    },
  },
  {
    id: 'rag-ai-agents',
    number: '04',
    title: 'RAG / AI AGENTS',
    tagline: 'Semantic retrieval indexing, tool-calling agent pipelines, and grounded hallucination verification.',
    icon: <Bot className="w-4 h-4 text-[#D49A46]" aria-hidden="true" />,
    technologies: ['Semantic Indexing', 'Context Retrieval', 'Tool Interfaces', 'Hallucination Guards'],
    appliedIn: {
      label: 'Retrieval & Verification Workflows',
    },
  },
  {
    id: 'software-engineering',
    number: '05',
    title: 'SOFTWARE ENGINEERING',
    tagline: 'Stateless API routing, reactive component architecture, database persistence, and secure RBAC.',
    icon: <Server className="w-4 h-4 text-[#D49A46]" aria-hidden="true" />,
    technologies: ['React 18', 'TypeScript', 'Node.js', 'Express', 'JWT / RBAC', 'MongoDB'],
    appliedIn: {
      label: 'SliceMind — Pizza Platform',
      route: '/projects/slicemind',
    },
  },
  {
    id: 'ai-systems',
    number: '06',
    title: 'AI SYSTEMS',
    tagline: 'Self-supervised representation learning, low-latency preprocessing, and automated screening reports.',
    icon: <Cpu className="w-4 h-4 text-[#D49A46]" aria-hidden="true" />,
    technologies: ['SSL Pre-training', 'Model-to-Product', 'Digital Signal Processing', 'Automated Reports'],
    appliedIn: {
      label: 'End-to-End Diagnostic Pipeline',
      route: '/projects/respiratory-ai',
    },
  },
];

const ENGINEERING_WORKFLOW = [
  'UNDERSTAND',
  'DESIGN',
  'BUILD',
  'EVALUATE',
  'DEPLOY',
  'ITERATE',
];

export const FocusSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="focus"
      aria-label="Engineering Focus and Capability Map"
      className="py-20 md:py-28 border-b border-[#292720] bg-transparent relative scroll-mt-20 overflow-hidden"
    >
      {/* Anchor aliases for navigation compatibility */}
      <span id="research-focus" className="sr-only" aria-hidden="true" />
      <span id="how-i-build" className="sr-only" aria-hidden="true" />
      <span id="skills" className="sr-only" aria-hidden="true" />

      {/* Atmospheric Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-[#D49A46]/[0.015] blur-[140px] rounded-full" />
      </div>

      <Container size="wide">
        {/* Coordinated Reveal Step 1: Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: DURATION.SECTION, ease: EASE_CUSTOM }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#D49A46] font-semibold">
              04 · FOCUS
            </span>
            <span className="text-[#4E4A42] text-xs font-mono" aria-hidden="true">·</span>
            <span className="font-mono text-xs uppercase tracking-wider text-[#888175]">
              Engineering Capability Map
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#F2EBDD]">
                FOCUS
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#AAA398] max-w-2xl font-light leading-relaxed">
                Core technical competencies and rigorous system architectures I design, evaluate, and bring from model to production.
              </p>
            </div>

            {/* Concise Engineering Workflow Strip */}
            <div className="p-4 rounded-xs bg-[#11100C] border border-[#24221C] shrink-0 shadow-sm">
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#888175] mb-2">
                Engineering Workflow
              </div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 font-mono text-[11px] sm:text-xs text-[#E5BA70] font-semibold">
                {ENGINEERING_WORKFLOW.map((step, idx) => (
                  <React.Fragment key={step}>
                    <span>{step}</span>
                    {idx < ENGINEERING_WORKFLOW.length - 1 && (
                      <ArrowRight className="w-3 h-3 text-[#5A564C]" aria-hidden="true" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Coordinated Reveal Step 2: Focus Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FOCUS_DOMAINS.map((domain, index) => (
            <motion.article
              key={domain.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: DURATION.SECTION, delay: 0.08 + index * 0.06, ease: EASE_CUSTOM }}
              className="p-6 sm:p-7 rounded-sm bg-[#11100C] border border-[#24221C] hover:border-[#D49A46]/40 transition-colors duration-200 flex flex-col justify-between group shadow-sm"
              aria-label={`${domain.title} capability domain`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-[#1F1E19]">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#D49A46]">
                      {domain.number}
                    </span>
                    <span className="text-[#3E3B33] text-xs font-mono" aria-hidden="true">/</span>
                    <span className="font-mono text-[11px] text-[#888175] uppercase tracking-wider">
                      Domain
                    </span>
                  </div>

                  <div className="p-2 rounded-xs bg-[#161511] border border-[#292720] group-hover:border-[#D49A46]/30 transition-colors">
                    {domain.icon}
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="font-display text-base sm:text-lg font-bold uppercase text-[#F2EBDD] tracking-tight mb-2 group-hover:text-[#FFFDF9] transition-colors">
                  {domain.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#AAA398] font-light leading-relaxed mb-5">
                  {domain.tagline}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap items-center gap-1.5 mb-6">
                  {domain.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-[#161511] border border-[#24221C] text-[11px] font-mono text-[#DCD6CA] rounded-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Applied In footer */}
              {domain.appliedIn && (
                <div className="pt-3.5 border-t border-[#1F1E19] flex items-center justify-between gap-2 text-xs font-mono">
                  <div className="text-[11px] truncate">
                    <span className="text-[#68645C] uppercase tracking-wider block text-[9px]">
                      Applied In
                    </span>
                    <span className="text-[#E5BA70] truncate block font-medium">
                      {domain.appliedIn.label}
                    </span>
                  </div>
                  {domain.appliedIn.route && (
                    <Link
                      to={domain.appliedIn.route}
                      className="shrink-0 p-1.5 rounded-xs bg-[#161511] hover:bg-[#1F1D17] border border-[#292720] hover:border-[#D49A46] text-[#AAA398] hover:text-[#E5BA70] transition-colors focus-visible:outline-2 focus-visible:outline-[#D49A46]"
                      aria-label={`View details for ${domain.appliedIn.label}`}
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
};
