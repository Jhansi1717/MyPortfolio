import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Github, ExternalLink, Activity } from 'lucide-react';
import { Project } from '../../types/project';
import { ArchitecturePreview } from './ArchitecturePreview';
import { Badge } from '../primitives/Badge';
import { useCardParallax } from '../../hooks/useCardParallax';
import { MOTION_TIMING, MOTION_EASING } from '../../animations/motionTokens';

export interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const { cardRef, state, reducedMotion, handlers } = useCardParallax();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 24, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: MOTION_TIMING.slow,
        delay: index * 0.08,
        ease: MOTION_EASING.smooth,
      }}
      {...handlers}
      className="group relative rounded-sm bg-[#11100C] border border-[#292720] transition-all duration-380 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:border-[#D49A46]/70 hover:shadow-[0_16px_36px_rgba(0,0,0,0.5)] md:hover:-translate-y-1.5 md:hover:scale-[1.008] overflow-hidden"
      id={`project-${project.slug}`}
      tabIndex={0}
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* Top Accent Line (Animates from Left to Right on hover/focus) */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] bg-[#292720] overflow-hidden rounded-t-sm z-20 pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-full h-full bg-gradient-to-r from-[#D49A46] via-[#E5BA70] to-[#D49A46] transform scale-x-0 group-hover:scale-x-100 group-focus-within:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] origin-left" />
      </div>

      {/* Subtle Mouse-Follow Amber Highlight (Desktop Only, Low Opacity) */}
      {!reducedMotion && !shouldReduceMotion && state.isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(400px circle at ${state.mouseX}px ${state.mouseY}px, rgba(212, 154, 70, 0.07), transparent 80%)`,
          }}
          aria-hidden="true"
        />
      )}

      <div
        className="p-6 sm:p-8 md:p-10 relative z-10 transition-transform duration-300"
        style={
          !reducedMotion && !shouldReduceMotion && state.isHovered
            ? {
                transform: `translate3d(${state.contentOffset.x}px, ${state.contentOffset.y}px, 0)`,
              }
            : undefined
        }
      >
        {/* Header: Project Number, Category, Status */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#292720]/80">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-3">
              {/* Project Number with subtle micro-elevation on hover */}
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#D49A46] px-2 py-0.5 rounded-xs bg-[#171612] border border-[#292720] group-hover:border-[#D49A46]/60 group-hover:-translate-y-0.5 transition-all duration-300">
                SYS_{project.number}
              </span>

              {/* Category */}
              <span className="font-mono text-xs uppercase tracking-wider text-[#AAA398]">
                {project.category}
              </span>

              {/* Status Badge if present */}
              {project.status && (
                <Badge variant="outline" size="sm">
                  {project.status}
                </Badge>
              )}
            </div>

            {/* Title */}
            <h3
              id={`project-title-${project.id}`}
              className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase text-[#F2EBDD] tracking-tight group-hover:text-[#FFFDF9] transition-colors mt-2"
            >
              {project.title}
            </h3>
          </div>

          {/* Action CTAs in Header on large screens */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-1">
            {/* [ GITHUB ] */}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#AAA398] hover:text-[#F2EBDD] bg-[#171612] hover:bg-[#1E1D18] border border-[#292720] hover:border-[#68645C] px-3.5 py-2.5 min-h-[44px] rounded-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D49A46]"
              aria-label={`View ${project.title} on GitHub`}
            >
              <Github className="w-3.5 h-3.5 text-[#D49A46] group-hover:rotate-6 transition-transform duration-200" />
              <span>[ GITHUB ]</span>
            </a>

            {/* [ CASE STUDY ] */}
            <Link
              to={project.caseStudyRoute}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#090907] bg-[#D49A46] hover:bg-[#E5BA70] px-4 py-2.5 min-h-[44px] rounded-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D49A46] shadow-sm hover:shadow-[0_0_12px_rgba(212,154,70,0.3)]"
              aria-label={`View Case Study for ${project.title}`}
            >
              <span>[ CASE STUDY ]</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-250" />
            </Link>

            {/* [ LIVE DEMO ] ONLY rendered if liveDemoUrl is non-null */}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#E5BA70] border border-[#D49A46]/40 hover:border-[#D49A46] bg-[#171612]/60 hover:bg-[#171612] px-3.5 py-2.5 min-h-[44px] rounded-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D49A46]"
              >
                <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200" />
                <span>[ LIVE DEMO ]</span>
              </a>
            )}
          </div>
        </div>

        {/* Project Description */}
        <div className="py-6 border-b border-[#292720]/60">
          <p className="text-sm sm:text-base text-[#DCD6CA] leading-relaxed font-light max-w-4xl">
            {project.description}
          </p>
        </div>

        {/* Architecture Preview Component */}
        <ArchitecturePreview
          architecture={project.architecture}
          projectNumber={project.number}
          isCardHovered={state.isHovered}
        />

        {/* Optional Metrics (Strictly rendered ONLY when metrics are present and non-null) */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-6 pt-5 border-t border-[#292720]/80">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-3.5 h-3.5 text-[#D49A46]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#68645C]">
                VERIFIED METRICS
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {project.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xs bg-[#171612] border border-[#292720] hover:border-[#38352C] transition-colors duration-200"
                >
                  <div className="font-mono text-[10px] uppercase text-[#68645C]">
                    {metric.label}
                  </div>
                  <div className="font-mono text-sm font-bold text-[#E5BA70] mt-0.5">
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies Pills */}
        <div className="mt-6 pt-5 border-t border-[#292720]/80 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] text-[#68645C] uppercase tracking-wider mr-2">
            STACK:
          </span>
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="default" size="sm">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

