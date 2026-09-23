import React from 'react';
import { SectionHeading } from '../components/primitives/SectionHeading';
import { Card } from '../components/primitives/Card';
import { Container } from '../components/primitives/Container';
import { GraduationCap, MapPin, Calendar, Award, BookOpen, CheckCircle2 } from 'lucide-react';

export const EducationSection: React.FC = () => {
  return (
    <section
      id="education"
      aria-label="Education Section"
      className="py-20 md:py-28 lg:py-32 border-b border-[#292720] scroll-mt-24 bg-transparent"
    >
      <Container size="wide">
        <SectionHeading
          indexTag="07 / EDUCATION"
          title="EDUCATION"
          description="Consistent high academic performance across computer science theory, advanced mathematics, and artificial intelligence specialization."
        />

        {/* Primary Academic Card: CBIT */}
        <Card
          variant="surface"
          className="p-6 sm:p-10 border border-[#292720] bg-[#14130F] mb-8 relative overflow-hidden"
          id="education-cbit-card"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Degree & Institution Details (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 font-mono text-[11px] text-[#D49A46] uppercase tracking-widest pb-3 mb-4 border-b border-[#24221C]">
                  <GraduationCap className="w-4 h-4 text-[#D49A46]" />
                  <span>PRIMARY ACADEMIC PROGRAMME</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-[#F2EBDD] mb-3">
                  Chaitanya Bharathi Institute of Technology
                </h3>

                <div className="font-mono text-base sm:text-lg font-medium text-[#E5BA70] mb-1">
                  B.E. Computer Science &amp; Engineering
                </div>

                <div className="font-mono text-xs sm:text-sm text-[#AAA398] mb-6">
                  Specialization: <span className="text-[#F2EBDD] font-medium">Artificial Intelligence &amp; Machine Learning</span>
                </div>

                {/* Metadata badges */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#888175] pt-4 border-t border-[#24221C]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#D49A46]" />
                    <span className="text-[#DCD6CA]">Expected: <strong className="text-[#F2EBDD]">May 2027</strong></span>
                  </div>
                  <span className="text-[#4A473E]">•</span>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#D49A46]" />
                    <span className="text-[#DCD6CA]">Location: <strong className="text-[#F2EBDD]">Hyderabad, Telangana</strong></span>
                  </div>
                </div>
              </div>

              {/* Coursework highlights */}
              <div className="mt-6 pt-4 border-t border-[#201F19] grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#AAA398]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" />
                  <span>Deep Learning &amp; Neural Architectures</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" />
                  <span>Data Structures &amp; Algorithmic Complexity</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" />
                  <span>Computer Vision &amp; NLP Systems</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" />
                  <span>Database Engineering &amp; Operating Systems</span>
                </div>
              </div>
            </div>

            {/* Prominent & Tasteful CGPA Display (5 cols) */}
            <div className="lg:col-span-5">
              <div className="p-6 sm:p-8 rounded-xs bg-[#11100C] border border-[#2D2A22] relative">
                {/* Subtle corner marker */}
                <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden pointer-events-none">
                  <div className="absolute transform rotate-45 bg-[#D49A46]/20 text-[8px] font-mono text-[#D49A46] font-bold py-0.5 right-[-24px] top-[6px] w-[70px] text-center">
                    CUMULATIVE
                  </div>
                </div>

                <div className="font-mono text-[10px] uppercase text-[#68645C] tracking-widest mb-2 flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-[#D49A46]" />
                  <span>ACADEMIC MERIT METRIC</span>
                </div>

                {/* Visually prominent 9.72 / 10 */}
                <div className="flex items-baseline gap-1 my-2">
                  <span className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#E5BA70]">
                    9.72
                  </span>
                  <span className="font-mono text-xl sm:text-2xl text-[#888175] font-light">
                    / 10
                  </span>
                </div>

                <div className="font-mono text-xs uppercase tracking-wider text-[#DCD6CA] font-semibold mt-1">
                  CGPA · ACADEMIC DISTINCTION
                </div>

                <p className="font-body text-sm text-[#AAA398] mt-3 leading-relaxed font-normal">
                  Continuous top-tier performance evaluated across theoretical coursework, system lab projects, and computational rigor at Chaitanya Bharathi Institute of Technology.
                </p>

                <div className="mt-4 pt-3 border-t border-[#201F19] flex items-center justify-between font-mono text-[10px] text-[#68645C]">
                  <span>SCALE: 10.00 MAXIMUM</span>
                  <span className="text-[#D49A46] font-semibold">VERIFIED TRANSCRIPT</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Prior Pre-Engineering Foundation (Rudrama Devi Junior College) */}
        <div className="p-5 sm:p-6 rounded-xs bg-[#11100C] border border-[#201F19] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase text-[#68645C] tracking-widest mb-1">
              PRE-ENGINEERING FOUNDATION // INTERMEDIATE (MPC)
            </div>
            <div className="font-mono text-sm sm:text-base font-bold text-[#F2EBDD]">
              Rudrama Devi Junior College
            </div>
            <div className="font-body text-sm text-[#AAA398] mt-0.5">
              Mathematics, Physics, Chemistry (MPC) · Hanamkonda, Telangana · 2021 – 2023
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <div className="font-mono text-xl font-bold text-[#E5BA70]">
                98.8% (IPE)
              </div>
              <div className="font-mono text-[10px] uppercase text-[#888175]">
                STATE BOARD (IPE) · 80 PERCENTILE IN JEE MAIN
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
