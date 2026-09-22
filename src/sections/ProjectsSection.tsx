import React from 'react';
import { SectionHeading } from '../components/primitives/SectionHeading';
import { Container } from '../components/primitives/Container';
import { ProjectCard } from '../components/projects/ProjectCard';
import { projectsData } from '../data/projectsData';

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="projects"
      aria-label="Selected Systems Section"
      className="py-20 md:py-28 border-b border-[#292720]"
    >
      <Container size="wide">
        <SectionHeading
          indexTag="03 // SYSTEMS"
          title="03 / SELECTED SYSTEMS"
          description="Flagship engineering systems spanning clinical audio deep learning, transformer question-answering workflows, and resilient full-stack transactional architectures."
        />

        {/* Data-Driven Reusable Project Cards */}
        <div className="flex flex-col gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
