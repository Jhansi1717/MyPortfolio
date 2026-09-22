import React, { useState } from 'react';
import { SectionHeading } from '../components/primitives/SectionHeading';
import { Card } from '../components/primitives/Card';
import { Container } from '../components/primitives/Container';
import { ResumeModal } from '../components/ResumeModal';
import { resumeConfig } from '../data/portfolioData';
import { FileText, Download, Eye, ArrowUpRight, CheckCircle2, ShieldCheck, Terminal, AlertCircle } from 'lucide-react';

export const ResumeSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [downloadFeedback, setDownloadFeedback] = useState<string | null>(null);

  const handleDownload = async () => {
    try {
      // Check if file actually exists at configured path
      const checkRes = await fetch(resumeConfig.filePath, { method: 'HEAD' });
      if (checkRes.ok) {
        const link = document.createElement('a');
        link.href = resumeConfig.filePath;
        link.download = resumeConfig.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // If static PDF is not yet placed in public directory, open formatted printable view
        setIsModalOpen(true);
        setDownloadFeedback('Opening formatted printable dossier (asset configured at ' + resumeConfig.filePath + ')');
        setTimeout(() => setDownloadFeedback(null), 4000);
      }
    } catch {
      setIsModalOpen(true);
      setDownloadFeedback('Opening formatted printable dossier (asset configured at ' + resumeConfig.filePath + ')');
      setTimeout(() => setDownloadFeedback(null), 4000);
    }
  };

  return (
    <section
      id="resume"
      aria-label="Resume Section: Comprehensive Engineering Dossier"
      className="py-24 md:py-36 border-b border-[#292720] relative overflow-hidden bg-[#0C0C0A]"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#171612_1px,transparent_1px),linear-gradient(to_bottom,#171612_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <Container size="wide" className="relative z-10">
        <div className="font-mono text-xs font-bold text-[#D49A46] uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D49A46]" />
          <span>09 // RESUME & CURRICULUM VITAE</span>
        </div>

        {/* Large Editorial Layout Container */}
        <div className="p-8 sm:p-12 md:p-16 lg:p-20 rounded-xs bg-[#14130F] border border-[#292720] shadow-2xl">
          <div className="max-w-4xl">
            {/* Tagline / Subtitle */}
            <div className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#888175] mb-4">
              FORMAL ENGINEERING DOSSIER // VERIFIABLE SOURCE OF TRUTH
            </div>

            {/* Headline: Exactly as requested */}
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-[#F2EBDD] leading-[0.95] mb-8">
              WANT THE COMPLETE PICTURE?
            </h2>

            {/* Editorial Lead Narrative */}
            <p className="font-sans text-base sm:text-lg md:text-xl text-[#AAA398] font-light leading-relaxed mb-10 max-w-3xl">
              Access the complete academic record, deep neural architectures, full-stack production deployments, research vectors, and verified credentials in a unified technical document.
            </p>

            {/* Interactive Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 font-mono text-xs sm:text-sm text-[#090907] bg-[#D49A46] hover:bg-[#E5BA70] font-bold px-8 py-4 rounded-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg hover:shadow-[#D49A46]/20 active:translate-y-0.5 focus-visible:outline-2 focus-visible:outline-[#D49A46] min-h-[48px]"
                aria-label="View comprehensive interactive resume"
              >
                <Eye className="w-4 h-4" />
                <span>VIEW RESUME</span>
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center justify-center gap-2.5 font-mono text-xs sm:text-sm text-[#F2EBDD] hover:text-[#E5BA70] bg-[#11100C] hover:bg-[#1A1914] border border-[#2D2A22] hover:border-[#D49A46] font-bold px-8 py-4 rounded-xs uppercase tracking-wider transition-all duration-200 cursor-pointer active:translate-y-0.5 focus-visible:outline-2 focus-visible:outline-[#D49A46] min-h-[48px]"
                aria-label="Download curriculum vitae PDF document"
              >
                <Download className="w-4 h-4 text-[#D49A46]" />
                <span>DOWNLOAD PDF</span>
              </button>
            </div>

            {/* Download status / Fallback notification if triggered */}
            {downloadFeedback && (
              <div className="mb-8 p-3 rounded-xs bg-[#171612] border border-[#D49A46]/40 flex items-center gap-2.5 font-mono text-xs text-[#E5BA70] animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-[#D49A46] shrink-0" />
                <span>{downloadFeedback}</span>
              </div>
            )}

            {/* Metadata & Technical Specification Block */}
            <div className="pt-8 border-t border-[#24221C] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-xs bg-[#11100C] border border-[#201F19]">
                <div className="text-[10px] text-[#68645C] uppercase tracking-wider mb-1">
                  DOCUMENT TYPE
                </div>
                <div className="text-[#F2EBDD] font-bold">
                  {resumeConfig.fileFormat}
                </div>
              </div>

              <div className="p-3.5 rounded-xs bg-[#11100C] border border-[#201F19]">
                <div className="text-[10px] text-[#68645C] uppercase tracking-wider mb-1">
                  TARGET PATH
                </div>
                <div className="text-[#D49A46] font-bold truncate" title={resumeConfig.filePath}>
                  {resumeConfig.filePath}
                </div>
              </div>

              <div className="p-3.5 rounded-xs bg-[#11100C] border border-[#201F19]">
                <div className="text-[10px] text-[#68645C] uppercase tracking-wider mb-1">
                  ACADEMIC TERM
                </div>
                <div className="text-[#F2EBDD] font-bold">
                  B.E. CSE (AIML)
                </div>
              </div>

              <div className="p-3.5 rounded-xs bg-[#11100C] border border-[#201F19]">
                <div className="text-[10px] text-[#68645C] uppercase tracking-wider mb-1">
                  VERIFIED GRADE
                </div>
                <div className="text-[#E5BA70] font-bold">
                  9.72 / 10 CGPA
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Interactive In-Page Resume Modal */}
      <ResumeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
