import React from 'react';
import { HeroSection } from '../sections/HeroSection';
import { EngineeringSnapshotSection } from '../sections/EngineeringSnapshotSection';
import { ExperienceSection } from '../sections/ExperienceSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { SystemsLabSection } from '../sections/SystemsLabSection';
import { BuildActivitySection } from '../sections/BuildActivitySection';
import { AboutSection } from '../sections/AboutSection';
import { EducationSection } from '../sections/EducationSection';
import { CertificationsSection } from '../sections/CertificationsSection';
import { ResumeSection } from '../sections/ResumeSection';
import { ContactSection } from '../sections/ContactSection';
import { SectionReveal } from '../components/primitives/SectionReveal';

export const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <SectionReveal showLineReveal={false}>
        <EngineeringSnapshotSection />
      </SectionReveal>
      <SectionReveal showLineReveal={true}>
        <ExperienceSection />
      </SectionReveal>
      <SectionReveal showLineReveal={true}>
        <ProjectsSection />
      </SectionReveal>
      <SectionReveal showLineReveal={true}>
        <SystemsLabSection />
      </SectionReveal>
      <SectionReveal showLineReveal={true}>
        <BuildActivitySection />
      </SectionReveal>
      <SectionReveal showLineReveal={true}>
        <AboutSection />
      </SectionReveal>
      <SectionReveal showLineReveal={true}>
        <EducationSection />
      </SectionReveal>
      <SectionReveal showLineReveal={true}>
        <CertificationsSection />
      </SectionReveal>
      <SectionReveal showLineReveal={true}>
        <ResumeSection />
      </SectionReveal>
      <SectionReveal showLineReveal={true}>
        <ContactSection />
      </SectionReveal>
    </>
  );
};



