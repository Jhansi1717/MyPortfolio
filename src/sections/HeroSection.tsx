import React, { useState } from 'react';
import { ArrowDown, Download, Eye, FileText, ArrowUpRight } from 'lucide-react';
import { Button } from '../components/primitives/Button';
import { Container } from '../components/primitives/Container';
import { NeuralCoreStage } from '../components/NeuralCoreStage';
import { ResumeModal } from '../components/ResumeModal';
import { resumeConfig } from '../data/portfolioData';

export const HeroSection: React.FC = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const projectsEl = document.getElementById('projects');
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section
        id="hero"
        aria-label="Hero Section - Jhansi Bhukya"
        className="relative pt-8 sm:pt-12 md:pt-16 pb-16 md:pb-24 border-b border-[#292720] overflow-hidden"
      >
        <Container size="wide">
          {/* Two-column layout: Left = Text & Actions, Right = Neural Systems Core Visual Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
            {/* Left Column: Hero Text & Actions */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Name & Location Identification */}
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <span className="w-2 h-2 rounded-full bg-[#D49A46]" aria-hidden="true" />
                <span className="font-mono text-xs sm:text-sm tracking-[0.25em] text-[#D49A46] uppercase font-semibold">
                  JHANSI BHUKYA // HYDERABAD, INDIA
                </span>
              </div>

              {/* Primary Title: Editorial Display Typography */}
              <div>
                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold uppercase tracking-tight text-[#F2EBDD] leading-[0.94]">
                  AI/ML
                  <br />
                  ENGINEER
                </h1>
              </div>

              {/* Secondary Title */}
              <div className="mt-3 sm:mt-4">
                <div className="font-display text-sm sm:text-base md:text-lg uppercase tracking-wider text-[#E5BA70] font-semibold">
                  AI SYSTEMS BUILDER &nbsp;·&nbsp; FULL-STACK ENGINEER
                </div>
              </div>

              {/* Hero Statement without tacky decorative quotes */}
              <div className="mt-5 sm:mt-6 pl-4 border-l-2 border-[#D49A46]">
                <p className="font-display text-lg sm:text-xl md:text-2xl text-[#F2EBDD] font-normal leading-snug">
                  I design and engineer intelligent systems that turn complex problems into usable products.
                </p>
              </div>

              {/* Supporting Copy */}
              <div className="mt-4 sm:mt-5">
                <p className="text-sm sm:text-base text-[#AAA398] font-normal leading-relaxed max-w-xl">
                  Computer Science &amp; Engineering (AI &amp; ML) student building systems across
                  machine learning, computer vision, NLP, generative AI, and full-stack engineering.
                </p>
              </div>

              {/* Actions / CTA Buttons */}
              <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3.5">
                <a href="#projects" onClick={handleScrollToProjects}>
                  <Button
                    variant="primary"
                    size="lg"
                    icon={<ArrowDown className="w-4 h-4" />}
                    className="shadow-[0_4px_20px_rgba(212,154,70,0.18)]"
                  >
                    VIEW SELECTED WORK
                  </Button>
                </a>

                <a
                  href={resumeConfig.filePath}
                  download={resumeConfig.fileName}
                  className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-[#F2EBDD] hover:text-[#E5BA70] bg-[#14130F] hover:bg-[#1C1B16] border border-[#2D2A22] hover:border-[#D49A46] font-bold px-5 py-3 rounded-xs uppercase tracking-wider transition-all duration-200 cursor-pointer min-h-[44px]"
                  aria-label="Download Jhansi Bhukya Resume PDF"
                >
                  <Download className="w-4 h-4 text-[#D49A46]" />
                  <span>DOWNLOAD RESUME</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsResumeModalOpen(true)}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-[#888175] hover:text-[#E5BA70] px-3 py-2 transition-colors cursor-pointer"
                  aria-label="Inspect Full Resume Dossier"
                >
                  <Eye className="w-3.5 h-3.5 text-[#D49A46]" />
                  <span>VIEW DOSSIER</span>
                </button>
              </div>

              {/* Subtle Credibility Strip underneath CTAs */}
              <div className="mt-8 sm:mt-10 pt-5 border-t border-[#24221C]">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                  <div className="p-2.5 rounded-xs bg-[#11100C] border border-[#201F19] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" />
                    <span className="text-[#DCD6CA] font-medium truncate">CBIT · 9.72/10 CGPA</span>
                  </div>

                  <div className="p-2.5 rounded-xs bg-[#11100C] border border-[#201F19] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" />
                    <span className="text-[#DCD6CA] font-medium truncate">DATA SCIENCE INTERN · AMINOBOTS</span>
                  </div>

                  <div className="p-2.5 rounded-xs bg-[#11100C] border border-[#201F19] flex items-center gap-2 sm:col-span-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" />
                    <span className="text-[#AAA398] truncate">ML · CV · NLP</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Neural Systems Core Visual Stage */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <NeuralCoreStage />
            </div>
          </div>
        </Container>
      </section>

      {/* Resume Document Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </>
  );
};
