import React, { useEffect } from 'react';
import { X, Printer, Download, GraduationCap, Briefcase, Award, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';
import { profileData, educationData, projectsData, skillCategoriesData, certificationsData, internshipExperienceData } from '../data/portfolioData';

export interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#090907]/90 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#11110E] border border-[#292720] rounded-xs shadow-2xl flex flex-col overflow-hidden text-[#F2EBDD]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#292720] bg-[#171612]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#D49A46] uppercase tracking-widest">
              DOCUMENT SPECIFICATION // RESUME_SOURCE_OF_TRUTH
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase px-3 py-1.5 border border-[#292720] hover:border-[#D49A46] hover:text-[#E5BA70] bg-[#11110E] rounded-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT / SAVE PDF</span>
            </button>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-1.5 text-[#AAA398] hover:text-[#F2EBDD] hover:border-[#D49A46] border border-[#292720] bg-[#11110E] rounded-xs transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Resume Sheet */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 print:p-0 print:overflow-visible">
          {/* Resume Header */}
          <div className="text-center pb-6 border-b border-[#292720]">
            <h2 id="resume-modal-title" className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-wider text-[#F2EBDD]">
              {profileData.name}
            </h2>
            <div className="font-mono text-sm text-[#D49A46] mt-2 tracking-wide">
              AI/ML ENGINEER &nbsp;|&nbsp; FULL-STACK DEVELOPER
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#AAA398] mt-3">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#D49A46]" /> {profileData.contact.phone}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#D49A46]" /> {profileData.contact.email}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D49A46]" /> {profileData.contact.location}
              </span>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#D49A46] mb-2 pb-1 border-b border-[#292720]">
              PROFESSIONAL SUMMARY
            </div>
            <p className="text-sm text-[#AAA398] leading-relaxed">
              {profileData.summary}
            </p>
          </div>

          {/* Education */}
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#D49A46] mb-3 pb-1 border-b border-[#292720]">
              EDUCATION
            </div>
            <div className="space-y-4">
              {educationData.map((edu) => (
                <div key={edu.id} className="flex flex-col sm:flex-row justify-between gap-1 text-sm">
                  <div>
                    <div className="font-bold text-[#F2EBDD]">{edu.institution}</div>
                    <div className="text-[#AAA398] text-xs sm:text-sm">{edu.degree}</div>
                    <div className="text-[#E5BA70] font-mono text-xs mt-0.5">{edu.cgpaOrGrade}</div>
                  </div>
                  <div className="font-mono text-xs text-[#68645C] sm:text-right shrink-0">
                    <div>{edu.location}</div>
                    <div>{edu.period}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Experience */}
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#D49A46] mb-3 pb-1 border-b border-[#292720]">
              EXPERIENCE
            </div>
            <div className="text-sm">
              <div className="flex flex-col sm:flex-row justify-between gap-1">
                <div>
                  <div className="font-bold text-[#F2EBDD]">{internshipExperienceData.role}</div>
                  <div className="font-mono text-xs text-[#E5BA70] font-semibold">{internshipExperienceData.company}</div>
                </div>
                <div className="font-mono text-xs text-[#68645C] sm:text-right shrink-0">
                  <div>{internshipExperienceData.location}</div>
                  <div>{internshipExperienceData.period}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {internshipExperienceData.focusLabels.map((lbl) => (
                  <span key={lbl} className="text-[11px] font-mono px-2 py-0.5 rounded-xs bg-[#171612] border border-[#292720] text-[#AAA398]">
                    {lbl}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Projects */}
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#D49A46] mb-3 pb-1 border-b border-[#292720]">
              ENGINEERING PROJECTS
            </div>
            <div className="space-y-4">
              {projectsData.map((proj) => (
                <div key={proj.id} className="text-sm">
                  <div className="font-bold text-[#F2EBDD]">{proj.title}</div>
                  <div className="font-mono text-xs text-[#D49A46] mb-1.5">{proj.category}</div>
                  <ul className="space-y-1">
                    {proj.bullets.map((b, i) => (
                      <li key={i} className="text-xs text-[#AAA398] flex items-start gap-2">
                        <span className="text-[#D49A46] mt-0.5">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#D49A46] mb-3 pb-1 border-b border-[#292720]">
              TECHNICAL SKILLS
            </div>
            <div className="space-y-2 text-xs">
              {skillCategoriesData.map((cat) => (
                <div key={cat.id} className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
                  <span className="sm:col-span-4 font-mono uppercase text-[#F2EBDD] font-medium">
                    {cat.name}:
                  </span>
                  <span className="sm:col-span-8 text-[#AAA398]">
                    {cat.skills.join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#D49A46] mb-3 pb-1 border-b border-[#292720]">
              CERTIFICATIONS
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {certificationsData.map((cert) => (
                <div key={cert.id} className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#D49A46] shrink-0" />
                  <span className="text-[#F2EBDD]">{cert.title}</span>
                  <span className="text-[#68645C]">({cert.issuer})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
