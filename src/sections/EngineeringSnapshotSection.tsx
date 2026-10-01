import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Container } from '../components/primitives/Container';
import {
  Code2,
  Brain,
  Sparkles,
  Eye,
  Server,
  Database,
  Wrench,
  CheckCircle,
} from 'lucide-react';

interface SkillCategory {
  id: string;
  name: string;
  code: string;
  icon: React.ReactNode;
  skills: string[];
  evidence: string;
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    name: 'LANGUAGES',
    code: '01',
    icon: <Code2 className="w-4 h-4 text-[#D49A46]" aria-hidden="true" />,
    skills: ['Python', 'JavaScript', 'SQL', 'HTML / CSS'],
    evidence: 'Core language across all AI pipelines, web services, and systems.',
  },
  {
    id: 'ai-ml',
    name: 'AI / ML',
    code: '02',
    icon: <Brain className="w-4 h-4 text-[#D49A46]" aria-hidden="true" />,
    skills: [
      'TensorFlow',
      'PyTorch',
      'Scikit-Learn',
      'Self-Supervised Learning (SSL)',
      'Deep Learning',
    ],
    evidence: 'EfficientNet-B0 pipeline, PyTorch transformers, and Aminobots ML staging.',
  },
  {
    id: 'generative-ai',
    name: 'GENERATIVE AI',
    code: '03',
    icon: <Sparkles className="w-4 h-4 text-[#D49A46]" aria-hidden="true" />,
    skills: [
      'Retrieval-Augmented Generation (RAG)',
      'Multi-Agent Orchestration',
      'Prompt Grounding & Safety',
      'Context Engineering',
    ],
    evidence: 'RAG knowledge assistant architectures and Microsoft GenAI certification.',
  },
  {
    id: 'computer-vision',
    name: 'COMPUTER VISION',
    code: '04',
    icon: <Eye className="w-4 h-4 text-[#D49A46]" aria-hidden="true" />,
    skills: [
      'STFT Log-Mel Spectrograms',
      'EfficientNet-B0 Backbone',
      'Grad-CAM (Explainable AI / Saliency)',
      'OpenCV',
    ],
    evidence: 'Acoustic-to-vision spectrogram conversion and visual diagnostic heatmaps.',
  },
  {
    id: 'backend',
    name: 'BACKEND',
    code: '05',
    icon: <Server className="w-4 h-4 text-[#D49A46]" aria-hidden="true" />,
    skills: [
      'Node.js',
      'Express.js',
      'RESTful API Architecture',
      'JWT Authentication',
      'Role-Based Access Control (RBAC)',
    ],
    evidence: 'Stateless auth gateways, protected endpoints, and async query dispatch.',
  },
  {
    id: 'databases',
    name: 'DATABASES',
    code: '06',
    icon: <Database className="w-4 h-4 text-[#D49A46]" aria-hidden="true" />,
    skills: [
      'MongoDB',
      'Mongoose ODM',
      'MySQL',
      'NoSQL Document Modeling',
    ],
    evidence: 'Multi-turn conversational dialogue storage and transactional orders.',
  },
  {
    id: 'tools-infrastructure',
    name: 'TOOLS / INFRASTRUCTURE',
    code: '07',
    icon: <Wrench className="w-4 h-4 text-[#D49A46]" aria-hidden="true" />,
    skills: [
      'Git & GitHub',
      'Postman',
      'Razorpay Payment Gateway (HMAC-SHA256)',
      'Audio Signal Processing (SciPy / Librosa)',
    ],
    evidence: 'Cryptographic payment verification, sensor filtering, and code registries.',
  },
];

export const EngineeringSnapshotSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const easeCurve = [0.16, 1, 0.3, 1] as [number, number, number, number];

  return (
    <section
      id="skills"
      aria-label="Technical Skills & Competencies"
      className="py-20 md:py-28 border-b border-[#292720] bg-transparent relative scroll-mt-20 overflow-hidden"
    >
      {/* Anchor alias for navigation links */}
      <span id="technical-profile" className="sr-only" aria-hidden="true" />

      <Container size="wide">
        {/* Section Header */}
        <div className="mb-12 sm:mb-14">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#D49A46] font-semibold">
              05. Technical Skills
            </span>
            <span className="text-[#4E4A42] text-xs font-mono" aria-hidden="true">·</span>
            <span className="font-mono text-xs uppercase tracking-wider text-[#888175]">
              Verified Competencies
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-[#F2EBDD]">
                Technical Skills
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#AAA398] max-w-2xl font-light">
                Grouped engineering competencies supported by evidence in deployed systems and repositories.
              </p>
            </div>

            <div className="shrink-0 font-mono text-[11px] text-[#6E6A62] uppercase tracking-wider">
              No arbitrary skill bars or fake percentages
            </div>
          </div>
        </div>

        {/* =========================================================================
            GROUPED SKILLS MATRIX (7 MANDATORY CATEGORIES)
            Minimal · Technical · Scannable · Credible
            Top: 4 Categories | Bottom: 3 Categories
            ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SKILL_CATEGORIES.map((category, index) => {
            const isWide = index >= 4;

            return (
              <motion.div
                key={category.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: index * 0.05, ease: easeCurve }}
                className={`p-6 rounded-sm bg-[#11100C] border border-[#24221C] hover:border-[#D49A46]/40 transition-colors duration-200 flex flex-col justify-between group ${
                  isWide && index === 4 ? 'lg:col-span-1' : ''
                } ${isWide && index === 5 ? 'lg:col-span-1' : ''} ${
                  isWide && index === 6 ? 'lg:col-span-2' : ''
                }`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#1F1E19]">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#D49A46]">
                        {category.code}
                      </span>
                      <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[#F2EBDD] group-hover:text-[#FFFDF9] transition-colors">
                        {category.name}
                      </h3>
                    </div>
                    <div className="p-1.5 rounded-xs bg-[#161511] border border-[#24221C]">
                      {category.icon}
                    </div>
                  </div>

                  {/* Scannable Skills List (No pill bubbles, clean unboxed text) */}
                  <ul className="space-y-2 mb-6">
                    {category.skills.map((skill) => (
                      <li
                        key={skill}
                        className="flex items-start gap-2.5 text-xs font-mono text-[#DCD6CA] group/item"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#D49A46] shrink-0 mt-1.5" />
                        <span className="group-hover/item:text-[#FFFDF9] transition-colors">
                          {skill}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Grounded Evidence Citation */}
                <div className="pt-3.5 border-t border-[#1F1E19]">
                  <div className="text-[11px] font-mono text-[#888175] leading-relaxed">
                    <span className="text-[#68645C] uppercase block text-[10px] tracking-wider mb-0.5">
                      Engineering Highlights
                    </span>
                    <span className="text-[#AAA398]">
                      {category.evidence}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>


      </Container>
    </section>
  );
};
