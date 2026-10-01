import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Container } from '../components/primitives/Container';
import {
  Eye,
  Sparkles,
  Cpu,
  Server,
  Database,
  ArrowUpRight,
  Compass,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface CapabilityDomain {
  id: string;
  number: string;
  title: string;
  tagline: string;
  icon: React.ReactNode;
  concepts: {
    category: string;
    items: string[];
  }[];
  appliedIn: {
    label: string;
    route?: string;
  };
}

const CAPABILITY_DOMAINS: CapabilityDomain[] = [
  {
    id: 'computer-vision',
    number: '01',
    title: 'COMPUTER VISION',
    tagline: 'Visual-acoustic representations, convolutional feature scaling, and interpretability mapping.',
    icon: <Eye className="w-4 h-4 text-[#D49A46]" aria-hidden="true" />,
    concepts: [
      {
        category: 'Acoustic-to-Vision Transformations',
        items: ['STFT Log-Mel Spectrograms', 'Mel Filterbanks', 'Time-Frequency Tensors'],
      },
      {
        category: 'Convolutional Architectures',
        items: ['EfficientNet-B0', 'Compound Scaling', 'Hierarchical Pattern Extraction'],
      },
      {
        category: 'Explainable AI (XAI)',
        items: ['Grad-CAM Saliency Maps', 'Frequency Harmonic Overlays', 'Visual Diagnostics'],
      },
    ],
    appliedIn: {
      label: 'AI-Powered Respiratory Screening System',
      route: '/projects/respiratory-ai',
    },
  },
  {
    id: 'generative-ai',
    number: '02',
    title: 'GENERATIVE AI',
    tagline: 'Retrieval-augmented architectures, multi-agent coordination, and contextual grounding.',
    icon: <Sparkles className="w-4 h-4 text-[#D49A46]" aria-hidden="true" />,
    concepts: [
      {
        category: 'Retrieval-Augmented Systems',
        items: ['RAG Pipeline Architecture', 'Context Retrieval', 'Semantic Indexing'],
      },
      {
        category: 'Agent Orchestration',
        items: ['Multi-Agent Task Routing', 'Grounded Verification', 'Tool Interfaces'],
      },
      {
        category: 'Prompt Engineering & Safety',
        items: ['Structured Grounding Directives', 'Strict Hallucination Constraints'],
      },
    ],
    appliedIn: {
      label: 'RAG Multi-Agent Assistant & Grounded Copilots',
    },
  },
  {
    id: 'ai-systems',
    number: '03',
    title: 'AI SYSTEMS',
    tagline: 'Self-supervised representation learning, feature extraction, and automated decision-support reporting.',
    icon: <Cpu className="w-4 h-4 text-[#D49A46]" aria-hidden="true" />,
    concepts: [
      {
        category: 'Representation Learning',
        items: ['Self-Supervised Learning (SSL)', 'Unlabelled Feature Pre-training'],
      },
      {
        category: 'Inference Pipelines',
        items: ['Model-to-Product Architecture', 'Low-Latency Preprocessing', 'Contextual Representations'],
      },
      {
        category: 'Decision-Support Systems',
        items: ['Automated Screening Reports', 'Structured JSON Contracts', 'Interpretability Layers'],
      },
    ],
    appliedIn: {
      label: 'AI-Powered Respiratory Screening System',
      route: '/projects/respiratory-ai',
    },
  },
  {
    id: 'backend-engineering',
    number: '04',
    title: 'BACKEND / SOFTWARE ENGINEERING',
    tagline: 'Stateless API routing, role-based authorization, and cryptographic transaction verification.',
    icon: <Server className="w-4 h-4 text-[#D49A46]" aria-hidden="true" />,
    concepts: [
      {
        category: 'API & Middleware Architecture',
        items: ['RESTful Routing', 'Node.js & Express Controllers', 'Request Validation'],
      },
      {
        category: 'Security & Access Control',
        items: ['Stateless JWT Authentication', 'Role-Based Access Control (RBAC)', 'bcrypt Hashing'],
      },
      {
        category: 'Cryptographic Integrity',
        items: ['Server-Side HMAC-SHA256 Signatures', 'Payment Handshake Verification'],
      },
      {
        category: 'Data Persistence',
        items: ['MongoDB Document Schemas', 'Mongoose ODM', 'Inventory Tracking'],
      },
    ],
    appliedIn: {
      label: 'SliceMind — Full-Stack Pizza Ordering Platform',
      route: '/projects/slicemind',
    },
  },
  {
    id: 'data-ml',
    number: '05',
    title: 'DATA / ML',
    tagline: 'Acoustic signal conditioning, exploratory data analysis, and mathematical preprocessing.',
    icon: <Database className="w-4 h-4 text-[#D49A46]" aria-hidden="true" />,
    concepts: [
      {
        category: 'Digital Signal Processing',
        items: ['Butterworth Bandpass Filtering (50–2000 Hz)', 'Acoustic Noise Isolation'],
      },
      {
        category: 'Data Science & Analysis',
        items: ['Exploratory Data Analysis (EDA)', 'NumPy & Pandas', 'Feature Conditioning'],
      },
      {
        category: 'Model Training & Evaluation',
        items: ['TensorFlow & PyTorch', 'Loss Optimization', 'Acoustic Anomaly Validation'],
      },
    ],
    appliedIn: {
      label: 'Aminobots Industry Internship & Applied Machine Learning',
    },
  },
];

export const ResearchFocusSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const easeCurve = [0.16, 1, 0.3, 1] as [number, number, number, number];

  return (
    <section
      id="focus"
      aria-label="AI and Engineering Focus"
      className="py-20 md:py-28 border-b border-[#292720] bg-transparent relative scroll-mt-20 overflow-hidden"
    >
      {/* Anchor aliases for navigation links */}
      <span id="research-focus" className="sr-only" aria-hidden="true" />
      <span id="how-i-build" className="sr-only" aria-hidden="true" />

      {/* Atmospheric Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-[#D49A46]/[0.015] blur-[140px] rounded-full" />
      </div>

      <Container size="wide">
        {/* Section Header */}
        <div className="mb-12 sm:mb-14">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#D49A46] font-semibold">
              03. Engineering Capability Map
            </span>
            <span className="text-[#4E4A42] text-xs font-mono" aria-hidden="true">·</span>
            <span className="font-mono text-xs uppercase tracking-wider text-[#888175]">
              Active Building Focus
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-[#F2EBDD]">
                Current Focus
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#AAA398] max-w-2xl font-light leading-relaxed">
                The technical domains and architectural layers I actively design, evaluate, and deploy.
              </p>
            </div>

            {/* Core Direction Thesis Card */}
            <div className="p-4 sm:p-5 rounded-xs bg-[#11100C] border border-[#24221C] max-w-md shrink-0">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#D49A46] mb-1.5">
                <Compass className="w-3.5 h-3.5 text-[#D49A46]" />
                <span>Engineering Thesis</span>
              </div>
              <p className="text-xs sm:text-sm text-[#DCD6CA] font-light leading-relaxed">
                Building at the convergence of perception models, generative agent workflows, and production backend infrastructure — from model → product.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            ENGINEERING CAPABILITY MAP
            A structured capability matrix (NOT a skill-cloud):
            Top row: Computer Vision · Generative AI · AI Systems
            Bottom row: Backend / Software Engineering · Data / ML
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CAPABILITY_DOMAINS.map((domain, index) => {
            const isWideBottom = index >= 3;

            return (
              <motion.article
                key={domain.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: easeCurve }}
                className={`p-6 sm:p-7 rounded-sm bg-[#11100C] border border-[#24221C] hover:border-[#D49A46]/40 transition-colors duration-300 flex flex-col justify-between group ${
                  isWideBottom && index === 3 ? 'lg:col-span-1 xl:col-span-1' : ''
                } ${isWideBottom && index === 4 ? 'lg:col-span-2 xl:col-span-2' : ''}`}
                aria-label={`${domain.title} capability area`}
              >
                <div>
                  {/* Top Index & Icon */}
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
                  <h3 className="font-display text-lg sm:text-xl font-bold uppercase text-[#F2EBDD] tracking-tight mb-2 group-hover:text-[#FFFDF9] transition-colors">
                    {domain.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#AAA398] font-light leading-relaxed mb-6">
                    {domain.tagline}
                  </p>

                  {/* Grouped Concepts */}
                  <div className="space-y-4 mb-6">
                    {domain.concepts.map((concept) => (
                      <div key={concept.category} className="space-y-1.5">
                        <div className="font-mono text-[10px] uppercase tracking-wider text-[#888175]">
                          {concept.category}
                        </div>
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-[#DCD6CA]">
                          {concept.items.map((item, i) => (
                            <span key={item} className="inline-flex items-center gap-2.5">
                              {i > 0 && <span className="text-[#3E3B33]" aria-hidden="true">·</span>}
                              <span>{item}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Applied Grounding Link / Badge */}
                <div className="pt-4 border-t border-[#1F1E19] flex items-center justify-between gap-3 text-xs font-mono">
                  <div className="text-[11px] text-[#888175] truncate">
                    <span className="text-[#68645C] uppercase tracking-wider block text-[10px]">
                      Applied In
                    </span>
                    <span className="text-[#E5BA70] truncate block">
                      {domain.appliedIn.label}
                    </span>
                  </div>

                  {domain.appliedIn.route && (
                    <Link
                      to={domain.appliedIn.route}
                      className="shrink-0 p-1.5 rounded-xs bg-[#161511] hover:bg-[#1F1D17] border border-[#292720] hover:border-[#D49A46] text-[#AAA398] hover:text-[#E5BA70] transition-colors focus-visible:outline-2 focus-visible:outline-[#D49A46]"
                      aria-label={`View project details for ${domain.appliedIn.label}`}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom Directional Takeaway */}
        <div className="mt-10 p-5 rounded-xs bg-[#11100C] border border-[#24221C] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-[#AAA398]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" aria-hidden="true" />
            <span className="text-[#E5BA70] uppercase tracking-wider font-semibold">
              Capability Principle:
            </span>
            <span className="text-[#AAA398]">
              No synthetic skill percentages or arbitrary tier ratings.
            </span>
          </div>
          <div className="text-[#68645C]">
            Verified through deployed architectures & authenticated repositories
          </div>
        </div>
      </Container>
    </section>
  );
};
