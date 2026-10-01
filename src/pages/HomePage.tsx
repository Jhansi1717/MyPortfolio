import React from 'react';
import { HeroSection } from '../sections/HeroSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { ExperienceSection } from '../sections/ExperienceSection';
import { FocusSection } from '../sections/FocusSection';
import { AboutSection } from '../sections/AboutSection';
import { EducationSection } from '../sections/EducationSection';
import { CertificationsSection } from '../sections/CertificationsSection';
import { ContactSection } from '../sections/ContactSection';
import { SectionReveal } from '../components/primitives/SectionReveal';

export const HomePage: React.FC = () => {
  return (
    <>
      {/* 0. HERO */}
      <HeroSection />

      {/* 1. SELECTED WORK */}
      <SectionReveal showLineReveal={true}>
        <ProjectsSection />
      </SectionReveal>

      {/* 2. EXPERIENCE */}
      <SectionReveal showLineReveal={true}>
        <ExperienceSection />
      </SectionReveal>

      {/* 3. FOCUS */}
      <SectionReveal showLineReveal={true}>
        <FocusSection />
      </SectionReveal>

      {/* 4. ABOUT */}
      <SectionReveal showLineReveal={true}>
        <AboutSection />
      </SectionReveal>

      {/* 5. EDUCATION */}
      <SectionReveal showLineReveal={true}>
        <EducationSection />
      </SectionReveal>

      {/* 6. CERTIFICATIONS */}
      <SectionReveal showLineReveal={true}>
        <CertificationsSection />
      </SectionReveal>

      {/* 7. CONTACT */}
      <SectionReveal showLineReveal={true}>
        <ContactSection />
      </SectionReveal>
    </>
  );
};
