import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ArchitecturePreview } from '../components/projects/ArchitecturePreview';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Github,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Cpu,
  Layers,
  ShieldAlert,
  GitBranch,
  Terminal,
} from 'lucide-react';
import { projectsData } from '../data/projectsData';
import { Container } from '../components/primitives/Container';
import { ArchitecturePipelineVisual } from '../components/projects/ArchitecturePipelineVisual';

const SECTION_NAV_ITEMS = [
  { id: 'problem', label: '01. Problem' },
  { id: 'approach', label: '02. Approach' },
  { id: 'architecture', label: '03. Architecture' },
  { id: 'engineering', label: '04. Engineering' },
  { id: 'model-ai', label: '05. Model / AI' },
  { id: 'evaluation', label: '06. Evaluation' },
  { id: 'result', label: '07. Result' },
  { id: 'tech-stack', label: '08. Tech Stack' },
  { id: 'links', label: '09. Links' },
];

export const ProjectCaseStudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const shouldReduceMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState<string>('problem');

  // Scroll to apex on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
  }, [slug, shouldReduceMotion]);

  const project = projectsData.find(
    (p) => p.slug === slug || (slug === 'slicemind' && p.slug === 'pizza-ordering') || (slug === 'pizza-ordering' && p.slug === 'slicemind')
  );

  // Monitor active scroll section for subnav highlighting
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;
      for (let i = SECTION_NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = SECTION_NAV_ITEMS[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!project) {
    return (
      <div className="py-24">
        <Container size="narrow" className="text-center">
          <div className="font-mono text-xs text-[#D49A46] uppercase tracking-widest mb-3">
            Error: 404 · Project Not Found
          </div>
          <h1 className="font-display text-3xl font-bold uppercase text-[#F2EBDD] mb-4">
            Project Not Found
          </h1>
          <p className="text-sm text-[#AAA398] mb-8 font-mono">
            The requested project route <code className="text-[#E5BA70]">/projects/{slug}</code> is not in the projects list.
          </p>
          <Link
            to="/#selected-work"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#090907] bg-[#D49A46] hover:bg-[#E5BA70] px-5 py-3 rounded-xs font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Selected Work</span>
          </Link>
        </Container>
      </div>
    );
  }

  const engineeringReasoning = project.engineeringReasoning || {
    problem: {
      title: 'Problem Definition & System Context',
      statement: project.caseStudy.problemStatement || '',
      context: project.caseStudy.problemContext || '',
      constraints: [] as string[],
    },
    architectureVisual: {
      summary: project.architecture.summary || '',
      pipelineSteps: [] as any[],
    },
    engineering: {
      title: 'Engineering Implementation',
      overview: 'System is designed with clean client-server boundaries, responsive state, and optimized runtime performance.',
      subsystems: [] as any[],
    },
    modelAI: {
      title: 'Model & Algorithmic Strategy',
      isApplicable: false,
      approach: 'Decoupled architectural modules and service patterns.',
      details: 'The system uses modern libraries and optimized models to perform fast, client-side or server-side computation.',
      specifications: [] as any[],
    },
    evaluation: {
      title: 'System Evaluation & Verification',
      methodology: 'Evaluated against structural integration tests, operational state cycles, and platform security standards.',
      criteria: [] as any[],
      factualNote: 'Technical parameters are grounded strictly in authenticated codebase configurations.',
    },
    result: {
      title: 'Documented Engineering Outcomes',
      measurableOutcomes: project.caseStudy.results?.verifiedOutcomes || [],
      disclaimer: project.caseStudy.results?.disclaimer || 'Public metrics are shown only where supported by project documentation.',
    },
    tradeoffs: [] as any[],
  };
  const relatedProjects = projectsData.filter((p) => p.id !== project.id);

  return (
    <motion.article
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1.0] }}
      className="py-10 md:py-16 border-b border-[#292720]"
      aria-labelledby="case-study-title"
    >
      <Container size="wide">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/#selected-work"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#AAA398] hover:text-[#D49A46] transition-colors focus-visible:outline-2 focus-visible:outline-[#D49A46] py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Selected Work</span>
          </Link>
        </div>

        {/* =========================================================================
            HEADER & VALUE PROPOSITION (ABOVE-THE-FOLD REFINEMENT)
            ========================================================================= */}
        <header className="pb-10 border-b border-[#292720]">
          {/* 1. PROJECT NUMBER + CATEGORY */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono mb-4 text-[#888175]">
            <span className="font-bold text-[#D49A46] tracking-widest uppercase">
              Project {project.number}
            </span>
            <span aria-hidden="true" className="text-[#3E3B33]">•</span>
            <span className="uppercase text-[#AAA398] tracking-wider">
              {project.category}
            </span>
            {project.status && (
              <>
                <span aria-hidden="true" className="text-[#3E3B33]">•</span>
                <span className="text-[#E5BA70] tracking-wider uppercase font-medium">
                  {project.status}
                </span>
              </>
            )}
          </div>

          {/* 2. PROJECT TITLE */}
          <h1
            id="case-study-title"
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-[#F2EBDD] tracking-tight leading-[1.08] mb-5"
          >
            {project.title}
          </h1>

          {/* 3. ONE-SENTENCE SUMMARY */}
          <p className="max-w-4xl text-base sm:text-xl text-[#DCD6CA] font-light leading-relaxed mb-8">
            {project.description}
          </p>

          {/* 4. AUTHENTIC PROJECT VISUAL */}
          <div className="relative w-full aspect-video md:aspect-[21/9] select-none overflow-hidden rounded-xs border border-[#24221C] bg-[#0E0D0A] shadow-2xl mb-6">
            {/* Technical grid layer for depth */}
            <div 
              className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#888175_1px,transparent_1px),linear-gradient(to_bottom,#888175_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none z-0" 
              aria-hidden="true" 
            />
            {/* The dominant architecture visual */}
            <ArchitecturePreview
              architecture={project.architecture}
              projectNumber={project.number}
            />
            {/* Soft gradient vignette map */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090907]/90 via-[#090907]/20 to-[#090907]/10 pointer-events-none" />
            
            {/* Interactive Corner Framing Accents */}
            <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-[#D49A46]/45 pointer-events-none" aria-hidden="true" />
            <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-[#D49A46]/45 pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-[#D49A46]/45 pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-[#D49A46]/45 pointer-events-none" aria-hidden="true" />
          </div>

          {/* 5. ACTION LINKS (LIVE DEMO, GITHUB, API DOCS) */}
          <div className="flex flex-wrap items-center gap-3.5 mb-10">
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="group/btn inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#090907] bg-[#D49A46] hover:bg-[#E5BA70] px-5 py-3 rounded-xs font-bold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-[#D49A46] shadow-[0_4px_16px_rgba(212,154,70,0.18)]"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-[2px] group-hover/btn:-translate-y-[2px]" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="group/btn inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#E5BA70] border border-[#D49A46]/60 hover:border-[#D49A46] hover:bg-[#D49A46]/10 px-4.5 py-3 rounded-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-[#D49A46]"
                aria-label={`View ${project.title} source code on GitHub`}
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-[2px] group-hover/btn:-translate-y-[2px]" />
              </a>
            )}

            {project.id === 'respiratory-ai' && project.apiDocsUrl && (
              <a
                href={project.apiDocsUrl}
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="group/btn inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#AAA398] border border-[#23211B] hover:border-[#8E887D] hover:bg-[#14130F] px-4.5 py-3 rounded-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-[#D49A46]"
              >
                <ExternalLink className="w-4 h-4" />
                <span>API Docs</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-[2px] group-hover/btn:-translate-y-[2px]" />
              </a>
            )}
          </div>

          {/* 6. 3 KEY ENGINEERING HIGHLIGHTS */}
          <div className="pt-8 border-t border-[#1E1D17]">
            <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#6E695F] mb-5 font-semibold">
              Key Engineering Highlights
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(project.architecture?.keyHighlights || []).map((highlight, idx) => (
                <div 
                  key={idx}
                  className="p-4 sm:p-5 rounded-sm bg-[#11110E] border border-[#201F19] hover:border-[#38352A] transition-colors duration-200 flex flex-col justify-between"
                >
                  <div className="font-mono text-xs font-bold text-[#D49A46] mb-2.5">
                    0{idx + 1}
                  </div>
                  <p className="font-body text-xs sm:text-[13px] text-[#C2BCB0] leading-relaxed font-light">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Sticky Jump Navigation Bar */}
        <nav
          className="sticky top-0 z-30 bg-[#090907]/95 backdrop-blur-md border-b border-[#292720] -mx-4 px-4 sm:mx-0 sm:px-0 py-3 mb-10 overflow-x-auto scrollbar-none"
          aria-label="Engineering Sections Navigation"
        >
          <div className="flex items-center gap-1 sm:gap-2 min-w-max">
            <span className="font-mono text-[10px] text-[#68645C] uppercase tracking-widest mr-2 hidden sm:inline">
              Jump to:
            </span>
            {SECTION_NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`font-mono text-xs uppercase tracking-wider px-3 py-1.5 rounded-xs transition-colors duration-150 ${
                    isActive
                      ? 'bg-[#1C1A14] text-[#E5BA70] border border-[#D49A46]/40 font-semibold'
                      : 'text-[#AAA398] hover:text-[#F2EBDD] hover:bg-[#14130F]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </nav>

        {/* =========================================================================
            STRUCTURED CASE STUDY BODY
            1. PROBLEM
            2. APPROACH
            3. SYSTEM ARCHITECTURE
            4. ENGINEERING
            5. MODEL / AI
            6. EVALUATION
            7. RESULT
            8. TECH STACK
            9. LINKS
            ========================================================================= */}
        <div className="space-y-16 md:space-y-24">
          {/* =======================================================================
              01. PROBLEM: What real problem does the system address?
              ======================================================================= */}
          <section id="problem" aria-labelledby="problem-heading" className="scroll-mt-20">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D49A46] mb-2">
              <span>01. Problem</span>
            </div>
            <h2
              id="problem-heading"
              className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#F2EBDD] tracking-tight mb-6"
            >
              {engineeringReasoning.problem.title}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 p-6 sm:p-8 rounded-sm bg-[#11100C] border border-[#292720]">
                <div className="font-mono text-xs uppercase tracking-wider text-[#888175] mb-2">
                  Real-World Problem Statement
                </div>
                <p className="text-sm sm:text-base text-[#DCD6CA] leading-relaxed font-light mb-6">
                  {engineeringReasoning.problem.statement}
                </p>

                <div className="font-mono text-xs uppercase tracking-wider text-[#888175] mb-2">
                  Operating &amp; System Context
                </div>
                <p className="text-sm sm:text-base text-[#AAA398] leading-relaxed font-light">
                  {engineeringReasoning.problem.context}
                </p>
              </div>

              {/* Engineering Constraints */}
              <div className="lg:col-span-4 p-6 sm:p-7 rounded-sm bg-[#14130F] border border-[#292720] flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-[#E5BA70] mb-4 pb-2 border-b border-[#292720]">
                    Verified Technical Constraints
                  </div>
                  <ul className="space-y-3">
                    {engineeringReasoning.problem.constraints?.map((constraint, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#AAA398] leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46] shrink-0 mt-1.5" />
                        <span>{constraint}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-3 border-t border-[#292720] text-[11px] font-mono text-[#68645C]">
                  Grounded in authentic project specifications
                </div>
              </div>
            </div>
          </section>

          {/* =======================================================================
              02. APPROACH: What is the actual AI/ML approach?
              ======================================================================= */}
          <section id="approach" aria-labelledby="approach-heading" className="scroll-mt-20">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D49A46] mb-2">
              <span>02. Approach</span>
            </div>
            <h2
              id="approach-heading"
              className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#F2EBDD] tracking-tight mb-3"
            >
              Technical Approach &amp; Solution Strategy
            </h2>
            <p className="text-sm sm:text-base text-[#AAA398] max-w-4xl mb-8 leading-relaxed font-light">
              {project.caseStudy.technicalApproach.overview}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {project.caseStudy.technicalApproach.components.map((comp, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-sm bg-[#11100C] border border-[#292720] flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-[10px] text-[#D49A46] uppercase tracking-wider mb-1 block">
                      Approach Component 0{idx + 1}
                    </span>
                    <h3 className="font-display text-base font-bold uppercase text-[#F2EBDD] mb-2.5">
                      {comp.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#AAA398] leading-relaxed font-light mb-4">
                      {comp.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#24221C] flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-[#E5BA70]">
                    {comp.technologies.map((t, i) => (
                      <span key={t} className="inline-flex items-center gap-1.5">
                        {i > 0 && <span className="text-[#4E4A42]" aria-hidden="true">·</span>}
                        <span>{t}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =======================================================================
              03. SYSTEM ARCHITECTURE: Technical pipeline diagram
              ======================================================================= */}
          <section id="architecture" aria-labelledby="arch-visual-heading" className="scroll-mt-20">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D49A46] mb-2">
              <span>03. System Architecture</span>
            </div>
            <h2
              id="arch-visual-heading"
              className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#F2EBDD] tracking-tight mb-3"
            >
              Execution Pipeline &amp; Dataflow Diagram
            </h2>
            <p className="text-sm sm:text-base text-[#AAA398] max-w-4xl mb-6 leading-relaxed font-light">
              {engineeringReasoning.architectureVisual.summary}
            </p>

            {/* Architecture Pipeline Visualizer Component */}
            <ArchitecturePipelineVisual
              steps={engineeringReasoning.architectureVisual.pipelineSteps}
              projectTitle={project.title}
              projectNumber={project.number}
            />
          </section>

          {/* =======================================================================
              04. ENGINEERING: What backend, APIs, preprocessing, etc. were implemented?
              ======================================================================= */}
          <section id="engineering" aria-labelledby="engineering-heading" className="scroll-mt-20">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D49A46] mb-2">
              <span>04. Engineering</span>
            </div>
            <h2
              id="engineering-heading"
              className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#F2EBDD] tracking-tight mb-3"
            >
              {engineeringReasoning.engineering.title}
            </h2>
            <p className="text-sm sm:text-base text-[#AAA398] max-w-4xl mb-8 leading-relaxed font-light">
              {engineeringReasoning.engineering.overview}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {engineeringReasoning.engineering.subsystems.map((subsystem, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-sm bg-[#11100C] border border-[#292720] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-[#D49A46]">
                        Subsystem 0{idx + 1}
                      </span>
                      <span className="font-mono text-[10px] text-[#888175] uppercase">
                        {subsystem.focus}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold uppercase text-[#F2EBDD] mb-3">
                      {subsystem.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#AAA398] leading-relaxed font-light mb-5">
                      {subsystem.implementation}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#24221C] flex flex-wrap items-center gap-2 text-xs font-mono text-[#E5BA70]">
                    {subsystem.technologies.map((t: string, i: number) => (
                      <span key={t} className="inline-flex items-center gap-2">
                        {i > 0 && <span className="text-[#4E4A42]" aria-hidden="true">·</span>}
                        <span>{t}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =======================================================================
              05. MODEL / AI: Actual models, representations, inference components
              ======================================================================= */}
          <section id="model-ai" aria-labelledby="model-heading" className="scroll-mt-20">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D49A46] mb-2">
              <span>05. Model &amp; AI Architecture</span>
            </div>
            <h2
              id="model-heading"
              className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#F2EBDD] tracking-tight mb-3"
            >
              {engineeringReasoning.modelAI.title}
            </h2>

            <div className="p-6 sm:p-8 rounded-sm bg-[#11100C] border border-[#292720] mb-6">
              <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-wider text-[#D49A46]">
                <Cpu className="w-4 h-4 text-[#D49A46]" />
                <span>Core Strategy: {engineeringReasoning.modelAI.approach}</span>
              </div>
              <p className="text-sm sm:text-base text-[#DCD6CA] leading-relaxed font-light mt-3">
                {engineeringReasoning.modelAI.details}
              </p>
            </div>

            {/* Detailed Model/System Specifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {engineeringReasoning.modelAI.specifications.map((spec, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xs bg-[#14130F] border border-[#292720]"
                >
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[#888175] mb-1">
                    {spec.label}
                  </div>
                  <div className="font-display text-sm sm:text-base font-bold uppercase text-[#E5BA70] mb-2">
                    {spec.value}
                  </div>
                  <p className="text-xs sm:text-sm text-[#AAA398] leading-relaxed font-light">
                    {spec.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* =======================================================================
              06. EVALUATION: Documented evaluation results only
              ======================================================================= */}
          <section id="evaluation" aria-labelledby="eval-heading" className="scroll-mt-20">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D49A46] mb-2">
              <span>06. Evaluation</span>
            </div>
            <h2
              id="eval-heading"
              className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#F2EBDD] tracking-tight mb-3"
            >
              {engineeringReasoning.evaluation.title}
            </h2>
            <p className="text-sm sm:text-base text-[#DCD6CA] max-w-4xl mb-6 leading-relaxed font-light">
              {engineeringReasoning.evaluation.methodology}
            </p>

            <div className="space-y-4 mb-6">
              {engineeringReasoning.evaluation.criteria.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-sm bg-[#11100C] border border-[#292720] grid grid-cols-1 md:grid-cols-12 gap-4 items-start"
                >
                  <div className="md:col-span-4">
                    <div className="font-mono text-[10px] text-[#D49A46] uppercase tracking-wider mb-1">
                      Aspect Evaluated
                    </div>
                    <h3 className="font-display text-base font-bold uppercase text-[#F2EBDD]">
                      {item.aspect}
                    </h3>
                  </div>

                  <div className="md:col-span-4">
                    <div className="font-mono text-[10px] text-[#888175] uppercase tracking-wider mb-1">
                      Validation Process
                    </div>
                    <p className="text-xs sm:text-sm text-[#AAA398] leading-relaxed font-light">
                      {item.validation}
                    </p>
                  </div>

                  <div className="md:col-span-4">
                    <div className="font-mono text-[10px] text-[#E5BA70] uppercase tracking-wider mb-1">
                      Evidence
                    </div>
                    <p className="text-xs sm:text-sm text-[#DCD6CA] leading-relaxed font-light">
                      {item.evidence}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Factual Disclaimer Banner */}
            <div className="p-4 sm:p-5 rounded-xs bg-[#14130F] border border-[#2E2B23] flex items-start gap-3">
              <ShieldAlert className="w-4 h-4 text-[#D49A46] shrink-0 mt-0.5" />
              <p className="text-xs text-[#AAA398] font-mono leading-relaxed">
                {engineeringReasoning.evaluation.factualNote}
              </p>
            </div>
          </section>

          {/* =======================================================================
              07. RESULT: Display measurable outcomes genuinely documented
              ======================================================================= */}
          <section id="result" aria-labelledby="results-heading" className="scroll-mt-20">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D49A46] mb-2">
              <span>07. Result</span>
            </div>
            <h2
              id="results-heading"
              className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#F2EBDD] tracking-tight mb-2"
            >
              {engineeringReasoning.result.title}
            </h2>
            <p className="text-xs font-mono uppercase text-[#888175] mb-6">
              Deliverables & implementation details
            </p>

            <div className="p-6 sm:p-8 rounded-sm bg-[#11100C] border border-[#292720]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {engineeringReasoning.result.measurableOutcomes.map((outcome, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xs bg-[#161511] border border-[#292720] flex items-start gap-3"
                  >
                    <CheckCircle className="w-4 h-4 text-[#D49A46] shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-[#F2EBDD] leading-relaxed">
                      {outcome}
                    </p>
                  </div>
                ))}
              </div>

              {/* Factual Disclaimer */}
              <div className="pt-4 border-t border-[#292720] flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-[#888175] shrink-0 mt-0.5" />
                <p className="text-xs text-[#888175] font-mono leading-relaxed">
                  {engineeringReasoning.result.disclaimer}
                </p>
              </div>
            </div>
          </section>

          {/* =======================================================================
              08. TECH STACK: Compact, unboxed list of technologies
              ======================================================================= */}
          <section id="tech-stack" aria-labelledby="tech-stack-heading" className="scroll-mt-20">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D49A46] mb-2">
              <span>08. Tech Stack</span>
            </div>
            <h2
              id="tech-stack-heading"
              className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#F2EBDD] tracking-tight mb-6"
            >
              Verified Technology Breakdown
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {project.caseStudy.technologyGroups.map((group, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-sm bg-[#11100C] border border-[#292720]"
                >
                  <div className="font-mono text-xs uppercase text-[#D49A46] font-bold mb-3 pb-2 border-b border-[#24221C]">
                    {group.groupName}
                  </div>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="font-mono text-xs text-[#DCD6CA] flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8E887D]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* =======================================================================
              09. LINKS: Valid Action Destinations (GitHub / Live Demo / Case Study)
              ======================================================================= */}
          <section id="links" aria-labelledby="links-heading" className="scroll-mt-20">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D49A46] mb-2">
              <span>09. Links</span>
            </div>
            <h2
              id="links-heading"
              className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#F2EBDD] tracking-tight mb-6"
            >
              Verified Repositories &amp; Actions
            </h2>

            <div className="p-6 sm:p-8 rounded-sm bg-[#11100C] border border-[#292720] flex flex-col xl:flex-row xl:items-center justify-between gap-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#AAA398] mb-1">
                    <Github className="w-4 h-4 text-[#D49A46]" />
                    <span>Source Repository</span>
                  </div>
                  <div className="font-mono text-xs sm:text-sm text-[#F2EBDD] break-all">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#D49A46] underline decoration-[#D49A46]/30">
                      {project.githubUrl}
                    </a>
                  </div>
                </div>

                {project.liveDemoUrl && (
                  <div>
                    <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#AAA398] mb-1">
                      <ExternalLink className="w-4 h-4 text-[#D49A46]" />
                      <span>Live Deployment Server</span>
                    </div>
                    <div className="font-mono text-xs sm:text-sm text-[#F2EBDD] break-all">
                      <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#D49A46] underline decoration-[#D49A46]/30">
                        {project.liveDemoUrl}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#090907] bg-[#D49A46] hover:bg-[#E5BA70] px-5 py-3 rounded-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-[#D49A46]"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Application</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#E5BA70] border border-[#D49A46]/60 hover:bg-[#D49A46]/10 px-4 py-3 rounded-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-[#D49A46]"
                    aria-label={`Open GitHub repository for ${project.title}`}
                  >
                    <Github className="w-4 h-4" />
                    <span>Open GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}

                {project.apiDocsUrl && (
                  <a
                    href={project.apiDocsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#AAA398] border border-[#23211B] hover:border-[#8E887D] hover:bg-[#14130F] px-4 py-3 rounded-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-[#D49A46]"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>API Docs</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </section>

          {/* =======================================================================
              EXPLORE OTHER FEATURED ARCHITECTURES
              ======================================================================= */}
          <section id="related-systems" aria-labelledby="related-heading" className="pt-10 border-t border-[#292720]">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D49A46] mb-2">
              <span>Related Systems</span>
            </div>
            <h2
              id="related-heading"
              className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#F2EBDD] tracking-tight mb-6"
            >
              Other Featured Architecture
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((relProj) => (
                <Link
                  key={relProj.id}
                  to={relProj.caseStudyRoute}
                  className="group p-6 sm:p-7 rounded-sm bg-[#11100C] border border-[#292720] hover:border-[#D49A46] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#D49A46] block"
                  aria-label={`Explore Project ${relProj.number}: ${relProj.title}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-[#D49A46] tracking-wider uppercase">
                      Project {relProj.number}
                    </span>
                    <span className="font-mono text-xs text-[#AAA398] group-hover:text-[#F2EBDD] flex items-center gap-1">
                      <span>View Engineering Detail</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold uppercase text-[#F2EBDD] group-hover:text-[#FFFDF9] transition-colors mb-2">
                    {relProj.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#AAA398] line-clamp-2 leading-relaxed font-light mb-4">
                    {relProj.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#24221C] text-[11px] font-mono text-[#888175]">
                    {relProj.technologies.slice(0, 4).map((tech, i) => (
                      <span key={tech} className="inline-flex items-center gap-2">
                        {i > 0 && <span className="text-[#4E4A42]" aria-hidden="true">·</span>}
                        <span>{tech}</span>
                      </span>
                    ))}
                    {relProj.technologies.length > 4 && (
                      <span className="text-[#68645C]">
                        +{relProj.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </motion.article>
  );
};
