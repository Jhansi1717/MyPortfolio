import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  Mail,
  Linkedin,
  Github,
  FileText,
  ArrowUpRight,
  Copy,
  Check,
  Send,
  ExternalLink,
} from 'lucide-react';
import { Container } from '../components/primitives/Container';
import { authoritativeProfile, resumeConfig } from '../data/portfolioData';
import { EASE_CUSTOM, DURATION } from '../utils/motionTokens';

export const ContactSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [emailCopied, setEmailCopied] = useState(false);
  const [formState, setFormState] = useState<'initial' | 'draft_opened' | 'error'>('initial');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const emailAddress = authoritativeProfile.email; // jhansibhukya17@gmail.com
  const linkedinUrl = authoritativeProfile.linkedin.profileUrl; // https://www.linkedin.com/in/jhansibhukya/
  const githubUrl = authoritativeProfile.github.profileUrl; // https://github.com/Jhansi1717
  const resumeUrl = resumeConfig.filePath; // /resume/Jhansi_Bhukya_Resume.pdf

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(emailAddress);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    // 1. Validate fields
    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setFormState('error');
      return;
    }

    try {
      // 2. Compose mailto URL addressed to jhansibhukya17@gmail.com
      const subject = `Portfolio Inquiry from ${trimmedName}`;
      const body = `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`;

      const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // 4. Open the user's default email application with the draft
      window.location.href = mailtoUrl;

      // 6. Show clear status
      setFormState('draft_opened');
    } catch (err) {
      console.error('Failed to trigger email draft:', err);
      // 7. If email application cannot be opened, keep message available and display fallback
      setFormState('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      message: '',
    });
    setFormState('initial');
  };

  return (
    <section
      id="contact"
      aria-label="Contact and Direct Inquiries"
      className="py-20 md:py-28 border-b border-[#292720] bg-transparent relative scroll-mt-20 overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#D49A46]/[0.018] blur-[140px] rounded-full" />
      </div>

      <Container size="wide">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#D49A46] font-semibold">
              05. Contact
            </span>
            <span className="text-[#4E4A42] text-xs font-mono" aria-hidden="true">·</span>
            <span className="font-mono text-xs uppercase tracking-wider text-[#888175]">
              Get In Touch
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#F2EBDD]">
            Let's build something useful.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#AAA398] max-w-2xl font-light leading-relaxed">
            Open to AI/ML engineering, systems development, and software opportunities. Direct email outreach is preferred.
          </p>
        </div>

        {/* Compact CTA Ribbon */}
        <div className="mb-10 p-5 sm:p-6 rounded-sm bg-[#14130F] border border-[#24221C] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xs bg-[#1A1914] text-[#D49A46] border border-[#292720]">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="font-display text-sm font-bold uppercase text-[#F2EBDD]">
                Resume &amp; Background
              </div>
              <div className="font-mono text-xs text-[#888175]">
                PDF document with complete academic and engineering details
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D49A46] text-[#090907] font-mono text-xs uppercase font-bold tracking-wider rounded-xs hover:bg-[#E5BA70] transition-colors focus-visible:outline-2 focus-visible:outline-[#D49A46]"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>VIEW RESUME</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href={`mailto:${emailAddress}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#292720] bg-[#161511] text-[#E5BA70] hover:text-[#FFFDF9] hover:border-[#D49A46]/60 font-mono text-xs uppercase font-semibold tracking-wider rounded-xs transition-colors focus-visible:outline-2 focus-visible:outline-[#D49A46]"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>GET IN TOUCH</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT: Direct Contact Channels */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Direct Email Card */}
            <div className="p-6 rounded-sm bg-[#11100C] border border-[#292720] hover:border-[#D49A46]/40 transition-colors duration-200">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#D49A46]">
                  <Mail className="w-4 h-4 text-[#D49A46]" />
                  <span>EMAIL</span>
                </div>
                <span className="font-mono text-[11px] text-[#888175]">Primary</span>
              </div>

              <div className="mb-4">
                <a
                  href={`mailto:${emailAddress}`}
                  className="font-mono text-base sm:text-lg font-bold text-[#F2EBDD] hover:text-[#E5BA70] transition-colors break-all flex items-center gap-2 group/link"
                >
                  <span>{emailAddress}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#D49A46] shrink-0 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[#1F1E19]">
                <a
                  href={`mailto:${emailAddress}`}
                  className="inline-flex items-center justify-center gap-2 bg-[#D49A46] hover:bg-[#E5BA70] text-[#090907] font-mono text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xs transition-colors focus-visible:outline-2 focus-visible:outline-[#D49A46]"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Email</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center gap-2 bg-[#161511] hover:bg-[#1E1D18] text-[#AAA398] hover:text-[#F2EBDD] border border-[#292720] font-mono text-xs uppercase tracking-wider px-3.5 py-2 rounded-xs transition-colors focus-visible:outline-2 focus-visible:outline-[#D49A46] cursor-pointer"
                >
                  {emailCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#4ADE80]" />
                      <span className="text-[#4ADE80] font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#D49A46]" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Profiles: LinkedIn & GitHub */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xs bg-[#11100C] hover:bg-[#161511] border border-[#24221C] hover:border-[#D49A46]/60 transition-all duration-200 group flex items-center justify-between focus-visible:outline-2 focus-visible:outline-[#D49A46]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xs bg-[#191814] text-[#D49A46]">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-display text-xs sm:text-sm font-bold uppercase text-[#F2EBDD] group-hover:text-[#FFFDF9]">
                      LinkedIn
                    </div>
                    <div className="font-mono text-[11px] text-[#888175]">
                      in/jhansibhukya
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#888175] group-hover:text-[#D49A46] transition-colors" />
              </a>

              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xs bg-[#11100C] hover:bg-[#161511] border border-[#24221C] hover:border-[#D49A46]/60 transition-all duration-200 group flex items-center justify-between focus-visible:outline-2 focus-visible:outline-[#D49A46]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xs bg-[#191814] text-[#D49A46]">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-display text-xs sm:text-sm font-bold uppercase text-[#F2EBDD] group-hover:text-[#FFFDF9]">
                      GitHub
                    </div>
                    <div className="font-mono text-[11px] text-[#888175]">
                      @Jhansi1717
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#888175] group-hover:text-[#D49A46] transition-colors" />
              </a>
            </div>

          </div>

          {/* RIGHT: Quick Message Form */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-7 rounded-sm bg-[#11100C] border border-[#292720]">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#888175] mb-4 pb-3 border-b border-[#1F1E19]">
                SEND A MESSAGE
              </div>

              <AnimatePresence mode="wait">
                {formState === 'draft_opened' ? (
                  <motion.div
                    key="draft_opened"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-6 text-center"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#D49A46]/10 border border-[#D49A46]/30 flex items-center justify-center mx-auto mb-3 text-[#D49A46]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <h3 className="font-display text-base sm:text-lg font-bold uppercase text-[#F2EBDD] mb-1">
                      Email Draft Prepared
                    </h3>
                    <p className="text-xs text-[#AAA398] font-light max-w-sm mx-auto mb-4 leading-relaxed">
                      Email draft opened. Send it from your email app to complete delivery.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="font-mono text-xs uppercase font-semibold text-[#D49A46] hover:text-[#E5BA70] transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Start New Message</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-3.5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label
                          htmlFor="name"
                          className="block font-mono text-[10px] text-[#888175] uppercase tracking-wider mb-1"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Name"
                          className="w-full bg-[#090907] border border-[#24221C] rounded-xs px-3 py-2 text-xs sm:text-sm text-[#F2EBDD] font-light placeholder-[#5A574E] focus:outline-none focus:border-[#D49A46] transition-colors"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block font-mono text-[10px] text-[#888175] uppercase tracking-wider mb-1"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className="w-full bg-[#090907] border border-[#24221C] rounded-xs px-3 py-2 text-xs sm:text-sm text-[#F2EBDD] font-light placeholder-[#5A574E] focus:outline-none focus:border-[#D49A46] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block font-mono text-[10px] text-[#888175] uppercase tracking-wider mb-1"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Role opportunity, project discussion, or inquiry..."
                        className="w-full bg-[#090907] border border-[#24221C] rounded-xs px-3 py-2 text-xs sm:text-sm text-[#F2EBDD] font-light placeholder-[#5A574E] focus:outline-none focus:border-[#D49A46] transition-colors resize-none"
                      />
                    </div>

                    {formState === 'error' && (
                      <div className="p-3 rounded-xs bg-[#24130F] border border-[#7F1D1D] text-[#FCA5A5] text-xs font-mono space-y-1">
                        <div>Unable to open email client automatically.</div>
                        <div className="text-[#AAA398]">
                          Please send directly to:{' '}
                          <a href={`mailto:${emailAddress}`} className="text-[#D49A46] underline hover:text-[#E5BA70]">
                            {emailAddress}
                          </a>
                        </div>
                      </div>
                    )}

                    <div className="pt-1">
                      <button
                        type="submit"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#181712] hover:bg-[#222019] text-[#E5BA70] border border-[#D49A46]/50 hover:border-[#D49A46] font-mono text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-xs transition-colors focus-visible:outline-2 focus-visible:outline-[#D49A46] cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5 text-[#D49A46]" />
                        <span>Send Message</span>
                      </button>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};
