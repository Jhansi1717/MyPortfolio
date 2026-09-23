import React from 'react';
import { HeroSection } from '../sections/HeroSection';
import { EngineeringSnapshotSection } from '../sections/EngineeringSnapshotSection';
import { ExperienceSection } from '../sections/ExperienceSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { ResearchFocusSection } from '../sections/ResearchFocusSection';
import { AboutSection } from '../sections/AboutSection';
import { EducationSection } from '../sections/EducationSection';
import { CertificationsSection } from '../sections/CertificationsSection';
import { ResumeSection } from '../sections/ResumeSection';
import { ContactSection } from '../sections/ContactSection';
import { SectionReveal } from '../components/primitives/SectionReveal';

export const HomePage: React.FC = () => {
  return (
    <>
      {/* 01 / HERO */}
      <HeroSection />

      {/* 02 / SELECTED WORK */}
      <SectionReveal showLineReveal={true}>
        <ProjectsSection />
      </SectionReveal>

      {/* 03 / EXPERIENCE */}
      <SectionReveal showLineReveal={true}>
        <ExperienceSection />
      </SectionReveal>

      {/* 04 / HOW I BUILD */}
      <SectionReveal showLineReveal={true}>
        <ResearchFocusSection />
      </SectionReveal>

      {/* 05 / TECHNICAL PROFILE */}
      <SectionReveal showLineReveal={true}>
        <EngineeringSnapshotSection />
      </SectionReveal>

      {/* 06 / ABOUT */}
      <SectionReveal showLineReveal={true}>
        <AboutSection />
      </SectionReveal>

      {/* 07 / EDUCATION */}
      <SectionReveal showLineReveal={true}>
        <EducationSection />
      </SectionReveal>

      {/* 08 / CERTIFICATIONS */}
      <SectionReveal showLineReveal={true}>
        <CertificationsSection />
      </SectionReveal>

      {/* 09 / RESUME */}
      <SectionReveal showLineReveal={true}>
        <ResumeSection />
      </SectionReveal>

      {/* 10 / CONTACT */}
      <SectionReveal showLineReveal={true}>
        <ContactSection />
      </SectionReveal>
    </>
  );
};



