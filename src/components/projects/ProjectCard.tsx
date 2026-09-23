import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Github } from 'lucide-react';
import { Project } from '../../types/project';
import { ArchitecturePreview } from './ArchitecturePreview';
import { ProjectVisualStack } from './ProjectVisualStack';

export interface ProjectCardProps {
  project: Project;
  index: number;
  isFlagship?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  isFlagship = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileActive, setIsMobileActive] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Alternating columns on desktop for editorial rhythm
  const isVisualLeft = index % 2 === 0;

  const isRespiratory = project.id === 'respiratory-ai';

  // Verified structured fields matching exact prompt specifications
  const structuredFields = isRespiratory
    ? {
        problem:
          'Early pulmonary screening relies on detecting subtle acoustic anomalies (crackles, wheezes) in lung auscultation; traditional manual stethoscopy has high intra-observer variance and lacks objective interpretability at scale.',
        approach:
          'Converts acoustic lung audio into Log-Mel spectrograms, processed via Self-Supervised Learning representation models coupled with an EfficientNet-B0 convolutional neural network backbone.',
        engineering:
          'End-to-end signal processing with bandpass filtering and windowed STFT, paired with Grad-CAM visual saliency heatmaps for clinical attribution and automated diagnostic report synthesis.',
        stack: [
          'Python',
          'TensorFlow',
          'EfficientNet-B0',
          'Self-Supervised Learning',
          'Audio Signal Processing',
          'Explainable AI (XAI)',
        ],
      }
    : {
        problem:
          'Food ordering platforms require reliable coordination across shopping cart state, inventory validation, authenticated payments, and order fulfillment.',
        approach:
          'Responsive React client → Node.js / Express REST backend → JWT authentication → role-based authorization → MongoDB persistence.',
        engineering:
          'JWT authentication, Role-Based Access Control, Razorpay payment integration, shopping cart management, inventory handling, and order lifecycle tracking.',
        stack: [
          'FULL-STACK',
          'AUTHENTICATION',
          'RBAC',
          'PAYMENTS',
          'DATABASE',
          'ORDER MANAGEMENT',
        ],
      };

  const handleCardClick = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsMobileActive((prev) => !prev);
    }
  };

  const easeCurve = [0.16, 1, 0.3, 1] as [number, number, number, number];

  // Motion variants adhering to scroll reveal specifications:
  // Duration: 500-700ms (0.6s), Stagger: 70-100ms (0.08s)
  const containerVariants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: index * 0.1,
      },
    },
  };

  const labelVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeCurve },
    },
  };

  const titleVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeCurve },
    },
  };

  const visualVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 1, scale: 1, clipPath: 'inset(0% 0 0% 0)' }
      : { opacity: 0, scale: 0.985, clipPath: 'inset(8% 0 8% 0)' },
    visible: {
      opacity: 1,
      scale: 1,
      clipPath: 'inset(0% 0 0% 0)',
      transition: { duration: 0.75, ease: easeCurve },
    },
  };

  const descriptionVariants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.55, ease: easeCurve },
    },
  };

  const problemVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: easeCurve },
    },
  };

  const architectureVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeCurve },
    },
  };

  const technologyVariants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.55, ease: easeCurve },
    },
  };

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={containerVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      className={`group relative rounded-xs transition-colors duration-500 overflow-hidden ${
        isFlagship
          ? 'bg-[#0D0C09] border border-[#2E2B22] hover:border-[#D49A46]/50 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.8)]'
          : 'bg-[#0A0A08] border border-[#24221C] hover:border-[#38352C] shadow-[0_20px_50px_rgba(0,0,0,0.6)]'
      }`}
      id={`project-${project.slug}`}
      tabIndex={0}
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* Subtle Flagship Ambient Backing */}
      {isFlagship && (
        <div
          className="absolute -top-32 -right-32 w-96 h-96 bg-[#D49A46]/[0.025] blur-[100px] rounded-full pointer-events-none -z-10"
          aria-hidden="true"
        />
      )}

      {/* Main Container */}
      <div
        className={`p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 ${
          isFlagship ? 'border-t-2 border-t-[#D49A46]/70' : ''
        }`}
      >
        {/* =========================================================================
            MOBILE-ONLY HEADER BLOCK (< lg)
            Strictly follows stack: project label → title → description → visual
            ========================================================================= */}
        <div className="lg:hidden mb-6">
          {/* Project Label */}
          <motion.div variants={labelVariants} className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs font-semibold text-[#D49A46] tracking-[0.12em] uppercase">
              {project.number} / {project.category}
            </span>
          </motion.div>

          {/* Project Title */}
          <motion.h3
            variants={titleVariants}
            className="font-display font-bold uppercase text-[#F2EBDD] tracking-[-0.02em] leading-[1.1] text-2xl sm:text-3xl mb-3 transition-transform duration-300 group-hover:translate-x-[2.5px]"
          >
            {project.title}
          </motion.h3>

          {/* Short Description */}
          <motion.p
            variants={descriptionVariants}
            className="font-body text-sm sm:text-base text-[#AAA398] font-normal leading-[1.65]"
          >
            {project.description}
          </motion.p>
        </div>

        {/* =========================================================================
            DESKTOP / RESPONSIVE GRID LAYOUT
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-center">
          
          {/* =========================================================================
              VISUAL COLUMN
              Desktop: Balanced 6-column large visual
              Hover: Visual translateY -3 to -5px
              ========================================================================= */}
          <div
            className={`w-full lg:col-span-6 ${
              isVisualLeft ? 'lg:order-1' : 'lg:order-2'
            }`}
          >
            <motion.div
              variants={visualVariants}
              className="transition-transform duration-300 group-hover:-translate-y-[3px]"
            >
              <ProjectVisualStack
                projectId={project.id}
                isHovered={isHovered}
                isMobileActive={isMobileActive}
              />
            </motion.div>
          </div>

          {/* =========================================================================
              CONTENT COLUMN
              Desktop: Balanced 6-column structured story
              Mobile: Story follows directly after visual
              ========================================================================= */}
          <div
            className={`w-full flex flex-col justify-center lg:col-span-6 ${
              isVisualLeft ? 'lg:order-2' : 'lg:order-1'
            }`}
          >
            {/* Desktop Header Block (hidden on mobile to prevent duplicate rendering) */}
            <div className="hidden lg:block">
              {/* Header Metadata: Number + Category */}
              <motion.div variants={labelVariants} className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs font-semibold text-[#D49A46] tracking-[0.12em] uppercase">
                  {project.number}
                </span>
                <div className="h-px w-6 bg-[#292720]" aria-hidden="true" />
                <span className="font-mono text-[11px] uppercase tracking-[0.10em] text-[#8E887D] font-medium">
                  {project.category}
                </span>
              </motion.div>

              {/* Project Title with Subtle 2-3px Shift on Hover */}
              <motion.h3
                variants={titleVariants}
                id={`project-title-${project.id}`}
                className="font-display font-bold uppercase text-[#F2EBDD] tracking-[-0.02em] leading-[1.08] mb-4 text-2xl sm:text-3xl lg:text-[2.25rem] xl:text-[2.5rem] transition-transform duration-300 group-hover:translate-x-[2px]"
              >
                {project.title}
              </motion.h3>

              {/* Short Description */}
              <motion.p
                variants={descriptionVariants}
                className="font-body text-sm sm:text-base text-[#AAA398] font-normal leading-[1.65] mb-6"
              >
                {project.description}
              </motion.p>
            </div>

            {/* Short Structured Story: THE PROBLEM / APPROACH / ENGINEERING */}
            <motion.div
              variants={problemVariants}
              className="space-y-3.5 mb-6 pt-5 pb-6 border-y border-[#201F19]"
            >
              {/* The Problem */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 items-baseline">
                <span className="sm:col-span-3 font-mono text-[10px] uppercase tracking-[0.10em] text-[#8E887D] font-medium">
                  THE PROBLEM
                </span>
                <p className="sm:col-span-9 font-body text-xs sm:text-[13px] text-[#C2BCB0] leading-relaxed">
                  {structuredFields.problem}
                </p>
              </div>

              {/* Approach */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 items-baseline">
                <span className="sm:col-span-3 font-mono text-[10px] uppercase tracking-[0.10em] text-[#D49A46] font-medium">
                  APPROACH
                </span>
                <p className="sm:col-span-9 font-body text-xs sm:text-[13px] text-[#C2BCB0] leading-relaxed">
                  {structuredFields.approach}
                </p>
              </div>

              {/* Engineering */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 items-baseline">
                <span className="sm:col-span-3 font-mono text-[10px] uppercase tracking-[0.10em] text-[#8E887D] font-medium">
                  ENGINEERING
                </span>
                <p className="sm:col-span-9 font-body text-xs sm:text-[13px] text-[#C2BCB0] leading-relaxed">
                  {structuredFields.engineering}
                </p>
              </div>
            </motion.div>

            {/* Interactive Architecture Pipeline Trace */}
            <motion.div variants={architectureVariants} className="mb-6">
              <ArchitecturePreview
                architecture={project.architecture}
                projectNumber={project.number}
                isCardHovered={isHovered}
                isMobileActive={isMobileActive}
              />
            </motion.div>

            {/* Action Footer: Technical Tags + Links */}
            <motion.div
              variants={technologyVariants}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-2"
            >
              {/* Compact Technical Metadata Tags */}
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#68645C] mr-1">
                  STACK:
                </span>
                {structuredFields.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#8E887D] px-2 py-0.5 border border-[#24221C] rounded-xs bg-[#11110E]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* CTAs: GitHub + Case Study with Arrow hover translateX 3-4px */}
              <div className="flex items-center gap-4 shrink-0">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#AAA398] hover:text-[#F2EBDD] transition-colors py-2 focus-visible:outline-2 focus-visible:outline-[#D49A46]"
                  aria-label={`View source code for ${project.title} on GitHub`}
                >
                  <Github className="w-3.5 h-3.5 text-[#D49A46]" />
                  <span>GITHUB</span>
                </a>

                <Link
                  to={project.caseStudyRoute}
                  className="group/btn inline-flex items-center justify-center gap-2 bg-[#D49A46] hover:bg-[#E5BA70] text-[#090907] font-mono text-[11px] font-bold uppercase tracking-[0.08em] px-5 py-2.5 rounded-xs transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#D49A46]"
                  aria-label={`View full case study for ${project.title}`}
                >
                  <span>VIEW CASE STUDY</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-[3px] group-hover/btn:-translate-y-[2px]" />
                </Link>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </motion.article>
  );
};
