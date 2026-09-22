import React from 'react';
import { SectionHeading } from '../components/primitives/SectionHeading';
import { Card } from '../components/primitives/Card';
import { Container } from '../components/primitives/Container';
import { Brain, Cpu, Workflow } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const conceptualCards = [
    {
      id: 'ai',
      code: 'PILLAR_01',
      title: 'AI',
      subtitle: 'Neural Architectures & Learning',
      specs: 'ML · CV · NLP · GenAI',
      icon: <Brain className="w-5 h-5 text-[#D49A46]" />,
      summary: 'Deep neural models, transformer architectures, and audio signal feature extraction engineered for precision.',
    },
    {
      id: 'engineering',
      code: 'PILLAR_02',
      title: 'ENGINEERING',
      subtitle: 'Robust System Runtimes',
      specs: 'Backend · APIs · Databases',
      icon: <Cpu className="w-5 h-5 text-[#D49A46]" />,
      summary: 'High-throughput RESTful endpoints, resilient state management, transactional persistence, and secure authentication.',
    },
    {
      id: 'building',
      code: 'PILLAR_03',
      title: 'BUILDING',
      subtitle: 'End-to-End Delivery Trajectory',
      specs: 'Research → Prototype → Product',
      icon: <Workflow className="w-5 h-5 text-[#D49A46]" />,
      summary: 'Bridging the chasm between experimental machine learning exploration and battle-tested production deployments.',
    },
  ];

  return (
    <section
      id="about"
      aria-label="About Section: Philosophy and Conceptual Pillars"
      className="py-20 md:py-28 border-b border-[#292720]"
    >
      <Container size="wide">
        <SectionHeading
          indexTag="06 // ABOUT"
          title="06 / ABOUT: INTELLIGENCE & SYSTEMS"
          description="Transforming theoretical breakthroughs in artificial intelligence into robust, production-grade software applications."
        />

        {/* Primary Statement Card */}
        <div className="mb-10">
          <Card
            variant="surface"
            className="p-6 sm:p-10 border border-[#292720] bg-[#14130F] relative overflow-hidden"
            id="about-narrative-card"
          >
            <div className="flex items-center gap-2 font-mono text-[11px] text-[#D49A46] uppercase tracking-widest pb-4 mb-6 border-b border-[#24221C]">
              <span className="w-2 h-2 rounded-full bg-[#D49A46]" />
              <span>CORE ARCHITECTURAL PERSPECTIVE // FOUNDATIONAL STATEMENT</span>
            </div>

            <p className="font-sans text-base sm:text-xl md:text-2xl text-[#F2EBDD] leading-relaxed font-light tracking-wide max-w-5xl">
              &ldquo;I’m a Computer Science and Engineering student specializing in Artificial Intelligence and Machine Learning. I enjoy building systems at the intersection of machine learning and software engineering, especially where intelligent models need to become reliable, usable products.&rdquo;
            </p>

            <div className="mt-8 pt-6 border-t border-[#24221C] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#888175]">
              <div className="flex items-center gap-3">
                <span className="text-[#DCD6CA] font-medium">JHANSI BHUKYA</span>
                <span>•</span>
                <span>CBIT HYDERABAD</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[#AAA398] uppercase">ACTIVE ENGINEERING RIGOR</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Three Conceptual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {conceptualCards.map((card) => (
            <Card
              key={card.id}
              variant="surface"
              className="p-6 sm:p-8 flex flex-col justify-between border border-[#24221C] hover:border-[#D49A46]/60 transition-all duration-200 group bg-[#11100C]"
              id={`about-card-${card.id}`}
            >
              <div>
                {/* Card Header & Code */}
                <div className="flex items-center justify-between pb-4 border-b border-[#201F19] mb-6">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xs bg-[#171612] border border-[#292720] text-[#D49A46]">
                      {card.icon}
                    </div>
                    <span className="font-mono text-[10px] text-[#888175] tracking-widest uppercase">
                      {card.code}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#68645C] group-hover:text-[#D49A46] transition-colors">
                    // ACTIVE
                  </span>
                </div>

                {/* Conceptual Card Title */}
                <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#F2EBDD] group-hover:text-[#E5BA70] transition-colors mb-2">
                  {card.title}
                </h3>

                <div className="font-mono text-xs text-[#888175] mb-4">
                  {card.subtitle}
                </div>

                {/* Primary Specs (Requested exact text) */}
                <div className="p-3.5 rounded-xs bg-[#171612] border border-[#24221C] mb-4">
                  <div className="font-mono text-[10px] uppercase text-[#68645C] tracking-wider mb-1">
                    KEY DOMAINS & CHANNELS
                  </div>
                  <div className="font-mono text-sm sm:text-base font-bold text-[#E5BA70] tracking-wide">
                    {card.specs}
                  </div>
                </div>

                <p className="text-xs text-[#AAA398] leading-relaxed font-light">
                  {card.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#201F19] flex items-center justify-between text-[10px] font-mono text-[#68645C]">
                <span>DISCIPLINE VERIFIED</span>
                <span className="text-[#D49A46]">SYS_PILLAR</span>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
