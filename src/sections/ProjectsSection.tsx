import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { SectionHeading } from '../components/primitives/SectionHeading';
import { Container } from '../components/primitives/Container';
import { ProjectCard } from '../components/projects/ProjectCard';
import { projectsData } from '../data/projectsData';

export const ProjectsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const easeCurve = [0.16, 1, 0.3, 1] as [number, number, number, number];

  const headerVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeCurve,
      },
    },
  };

  return (
    <section
      id="selected-work"
      aria-label="Selected Work Section"
      className="py-20 md:py-28 lg:py-32 border-b border-[#292720] scroll-mt-24 bg-transparent relative overflow-hidden"
    >
      {/* Target Anchor for both #selected-work and #projects */}
      <div id="projects" className="absolute -top-24 pointer-events-none" aria-hidden="true" />
      {/* Background Atmosphere - Subtle Project Visual Stage Depth */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D49A46]/[0.015] blur-[150px] rounded-full" />
      </div>

      <Container size="wide">
        {/* Animated Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={headerVariants}
        >
          <SectionHeading
            indexTag="02 / SELECTED WORK"
            title="SYSTEMS I BUILT"
            description="A small selection of AI and full-stack systems built from problem definition through implementation."
          />
        </motion.div>

        {/* Editorial Project Grid with Staggered Entrance */}
        <div className="flex flex-col gap-20 md:gap-28 lg:gap-32 mt-16 md:mt-24">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isFlagship={true}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
