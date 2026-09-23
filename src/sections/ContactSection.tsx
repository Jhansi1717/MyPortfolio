import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Mail, ArrowUpRight, Copy, Check, Loader2, MapPin } from 'lucide-react';
import { Container } from '../components/primitives/Container';
import { authoritativeProfile } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [emailCopied, setEmailCopied] = useState(false);
  const [formState, setFormState] = useState<'initial' | 'submitting' | 'success' | 'error'>('initial');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    'bot-field': '',
  });

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText('jhansibhukya17@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const encode = (data: Record<string, string>) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formState === 'submitting') return;

    setFormState('submitting');

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...formData }),
      });
      setFormState('success');
    } catch (error) {
      console.error('Form submission error:', error);
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
      'bot-field': '',
    });
    setFormState('initial');
  };

  const contactLinks = [
    {
      label: 'EMAIL',
      value: 'jhansibhukya17@gmail.com',
      href: 'mailto:jhansibhukya17@gmail.com',
      isEmail: true,
    },
    {
      label: 'GITHUB',
      value: 'github.com/Jhansi1717',
      href: authoritativeProfile.github.profileUrl,
      isExternal: true,
    },
    {
      label: 'LINKEDIN',
      value: 'linkedin.com/in/jhansibhukya/',
      href: authoritativeProfile.linkedin.profileUrl,
      isExternal: true,
    },
    {
      label: 'LEETCODE',
      value: 'leetcode.com/u/Jhansi_gopal/',
      href: authoritativeProfile.leetcode.profileUrl,
      isExternal: true,
    },
    {
      label: 'LOCATION',
      value: 'Hyderabad, India',
      isLocation: true,
    },
  ];

  const easeCurve = [0.16, 1, 0.3, 1] as [number, number, number, number];

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="py-20 md:py-28 lg:py-32 border-t border-[#292720] bg-transparent relative w-full overflow-hidden scroll-mt-24"
    >
      {/* Subtle Background Accent — Single Restrained Glow & Grid Line Behind Content */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute top-1/4 right-1/3 w-[360px] h-[360px] bg-[#D49A46]/[0.025] blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#292720] to-transparent" />
      </div>

      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start w-full">
          
          {/* =========================================================================
              LEFT COLUMN (~42%): Heading, Context, Compact Editorial Contact Rows
              ========================================================================= */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: easeCurve }}
            className="w-full min-w-0 lg:col-span-5 flex flex-col justify-start"
          >
            {/* 10 / CONTACT Tag */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" aria-hidden="true" />
              <span className="font-mono text-[11px] uppercase tracking-[0.10em] text-[#D49A46] font-semibold">
                10 / CONTACT
              </span>
            </div>

            {/* Display Heading */}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-bold uppercase tracking-[-0.02em] text-[#F2EBDD] leading-[1.12] mb-4 max-w-md">
              LET'S BUILD
              <br />
              SOMETHING USEFUL.
            </h2>

            {/* Supporting Copy */}
            <p className="font-body text-base sm:text-lg text-[#AAA398] font-normal leading-relaxed max-w-md mb-8 sm:mb-10">
              Open to professional opportunities in AI/ML engineering, software systems, and applied AI.
            </p>

            {/* Compact Editorial Rows */}
            <div className="border-t border-[#24221C] w-full">
              {contactLinks.map((item, index) => {
                const isClickable = !item.isLocation;

                const innerContent = (
                  <div className="flex items-center justify-between py-3.5 sm:py-4 border-b border-[#24221C] transition-colors group/row">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 min-w-0 pr-2">
                      <span className="font-mono text-[10px] text-[#68645C] uppercase tracking-[0.10em] font-medium w-20 shrink-0">
                        {item.label}
                      </span>
                      <span className="font-body text-sm text-[#AAA398] group-hover/row:text-[#F2EBDD] transition-colors truncate">
                        {item.value}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {item.isEmail && (
                        <button
                          type="button"
                          onClick={handleCopyEmail}
                          title="Copy email to clipboard"
                          aria-label="Copy email address"
                          className="p-1.5 rounded-xs text-[#8E887D] hover:text-[#D49A46] hover:bg-[#1C1B16] transition-colors"
                        >
                          {emailCopied ? (
                            <span className="flex items-center gap-1 font-mono text-[10px] text-[#4ADE80] uppercase">
                              <Check className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">COPIED</span>
                            </span>
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}

                      {isClickable && (
                        <span className="text-[#D49A46] text-sm transform group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 transition-transform">
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      )}

                      {item.isLocation && (
                        <MapPin className="w-3.5 h-3.5 text-[#68645C]" />
                      )}
                    </div>
                  </div>
                );

                if (isClickable) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.isExternal ? '_blank' : undefined}
                      rel={item.isExternal ? 'noopener noreferrer' : undefined}
                      className="block w-full focus-visible:outline-1 focus-visible:outline-[#D49A46]"
                    >
                      {innerContent}
                    </a>
                  );
                }

                return (
                  <div key={item.label} className="w-full">
                    {innerContent}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* =========================================================================
              RIGHT COLUMN (~58%): Clean Enclosed Contact Form
              ========================================================================= */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: easeCurve }}
            className="w-full min-w-0 lg:col-span-7"
          >
            <div className="w-full bg-[#11110E] border border-[#292720] rounded-xs p-6 sm:p-8 lg:p-10 box-border shadow-lg">
              <div className="font-mono text-[11px] text-[#8E887D] uppercase tracking-[0.10em] font-medium mb-6 flex items-center justify-between">
                <span>CONTACT FORM</span>
                <span className="text-[#68645C] text-[10px]">ALL FIELDS REQUIRED</span>
              </div>

              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: easeCurve }}
                    className="py-8 sm:py-12 flex flex-col items-start"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#D49A46]/10 border border-[#D49A46]/30 flex items-center justify-center mb-5 text-[#D49A46]">
                      <Check className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#F2EBDD] mb-3">
                      MESSAGE SENT
                    </h3>
                    <p className="font-body text-sm sm:text-base text-[#AAA398] font-normal leading-relaxed mb-8 max-w-md">
                      Thanks for reaching out. Your message has been received.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="font-mono text-xs uppercase font-semibold tracking-[0.06em] text-[#D49A46] hover:text-[#E5BA70] transition-colors flex items-center gap-2"
                    >
                      <span>SEND ANOTHER MESSAGE</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    name="contact"
                    method="POST"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full box-border"
                  >
                    <input type="hidden" name="form-name" value="contact" />
                    <p className="hidden">
                      <label>
                        Don't fill this out if you're human:{' '}
                        <input name="bot-field" value={formData['bot-field']} onChange={handleChange} />
                      </label>
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-6">
                      {/* Name Field */}
                      <div className="w-full min-w-0">
                        <label
                          htmlFor="name"
                          className="block font-mono text-[10px] text-[#8E887D] uppercase tracking-[0.10em] font-medium mb-2"
                        >
                          NAME
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className="w-full bg-[#090907] border border-[#292720] rounded-xs px-4 py-3 font-body text-sm text-[#F2EBDD] font-normal placeholder-[#787368] focus:outline-none focus:border-[#D49A46] focus:ring-1 focus:ring-[#D49A46] transition-colors box-border"
                        />
                      </div>

                      {/* Email Field */}
                      <div className="w-full min-w-0">
                        <label
                          htmlFor="email"
                          className="block font-mono text-[10px] text-[#8E887D] uppercase tracking-[0.10em] font-medium mb-2"
                        >
                          EMAIL
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className="w-full bg-[#090907] border border-[#292720] rounded-xs px-4 py-3 font-body text-sm text-[#F2EBDD] font-normal placeholder-[#787368] focus:outline-none focus:border-[#D49A46] focus:ring-1 focus:ring-[#D49A46] transition-colors box-border"
                        />
                      </div>
                    </div>

                    {/* Message Field */}
                    <div className="w-full min-w-0 mb-6">
                      <label
                        htmlFor="message"
                        className="block font-mono text-[10px] text-[#8E887D] uppercase tracking-[0.10em] font-medium mb-2"
                      >
                        MESSAGE
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project, opportunity, or idea"
                        className="w-full min-h-[150px] bg-[#090907] border border-[#292720] rounded-xs px-4 py-3 font-body text-sm text-[#F2EBDD] font-normal placeholder-[#787368] focus:outline-none focus:border-[#D49A46] focus:ring-1 focus:ring-[#D49A46] transition-colors resize-y box-border leading-relaxed"
                      />
                    </div>

                    {/* Action & Status */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                      <button
                        type="submit"
                        disabled={formState === 'submitting'}
                        className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 bg-[#D49A46] text-[#090907] font-mono text-xs uppercase font-semibold tracking-[0.06em] rounded-xs transition-all duration-200 hover:bg-[#E5BA70] hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {formState === 'submitting' ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>SENDING...</span>
                          </>
                        ) : (
                          <>
                            <span>SEND MESSAGE</span>
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </>
                        )}
                      </button>

                      {formState === 'error' && (
                        <p className="font-mono text-xs text-[#F87171] uppercase tracking-[0.08em]" role="alert">
                          MESSAGE COULD NOT BE SENT. Please try again.
                        </p>
                      )}
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </Container>

      {/* Accessible Live Region */}
      <div className="sr-only" aria-live="polite">
        {formState === 'submitting' && 'Sending message...'}
        {formState === 'success' && 'Message sent successfully.'}
        {formState === 'error' && 'Error sending message. Please try again.'}
      </div>
    </section>
  );
};
