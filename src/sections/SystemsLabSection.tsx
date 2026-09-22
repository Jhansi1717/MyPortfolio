import React from 'react';
import { SectionHeading } from '../components/primitives/SectionHeading';
import { Container } from '../components/primitives/Container';
import { SystemsLabVisualizer } from '../components/systemsLab/SystemsLabVisualizer';

export const SystemsLabSection: React.FC = () => {
  return (
    <section
      id="systems-lab"
      aria-label="Systems Lab: How models become real software systems"
      className="py-20 md:py-28 border-b border-[#292720]"
    >
      <Container size="wide">
        <SectionHeading
          indexTag="04 // SYSTEMS LAB"
          title="04 / SYSTEMS LAB: FROM MODELS TO RUNTIMES"
          description="Explore the end-to-end transformation from raw acoustic signals and user prompts into trained neural representations, resilient backend services, and verified clinical decision support."
        />

        <div className="mt-8">
          <SystemsLabVisualizer />
        </div>
      </Container>
    </section>
  );
};
