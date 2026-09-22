import React from 'react';
import { SectionHeading } from '../components/primitives/SectionHeading';
import { Card } from '../components/primitives/Card';
import { Badge } from '../components/primitives/Badge';
import { Container } from '../components/primitives/Container';
import { skillCategoriesData } from '../data/portfolioData';

export const TechMatrixSection: React.FC = () => {
  return (
    <section id="skills" aria-label="Skills Section" className="py-20 md:py-28 border-b border-[#292720]">
      <Container size="wide">
        <SectionHeading
          indexTag="02 // SYSTEMS & ARCHITECTURE"
          title="ARCHITECTURAL MASTERY. PRECISION APPLIED."
          description="Synthesizing rigorous mathematical fundamentals, modern deep learning frameworks, and scalable distributed system designs."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategoriesData.map((category) => (
            <Card
              key={category.id}
              variant="surface"
              className="p-6 flex flex-col justify-between border border-[#292720] hover:border-[#38352C] transition-colors"
            >
              <div>
                <div className="font-mono text-xs text-[#D49A46] tracking-wider uppercase mb-2">
                  {category.code}
                </div>
                <h3 className="font-display text-lg uppercase font-bold text-[#F2EBDD] tracking-wide mb-2">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-xs text-[#AAA398] mb-5 leading-relaxed">
                    {category.description}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-[#292720]/60 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge key={skill} variant="default" size="sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
