import React, { useState } from 'react';
import { SectionHeading } from '../components/primitives/SectionHeading';
import { Card } from '../components/primitives/Card';
import { Button } from '../components/primitives/Button';
import { Container } from '../components/primitives/Container';
import { profileData, socialLinks } from '../data/portfolioData';
import { Mail, Phone, MapPin, Copy, Check, Send } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section id="contact" aria-label="Contact Section" className="py-20 md:py-32">
      <Container size="wide">
        <SectionHeading
          indexTag="10 // CONTACT"
          title="10 / CONTACT: INITIALIZE TRANSMISSION"
          description="Open to ambitious AI/ML engineering roles, research collaboration, and scalable systems development."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Communication Channels */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Email Card */}
            <Card variant="surface" className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xs bg-[#171612] border border-[#292720] text-[#D49A46]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-mono text-xs uppercase text-[#68645C] tracking-wider">
                      PRIMARY DISPATCH
                    </div>
                    <a
                      href={`mailto:${profileData.contact.email}`}
                      className="font-mono text-sm sm:text-base text-[#F2EBDD] hover:text-[#E5BA70] transition-colors"
                    >
                      {profileData.contact.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(profileData.contact.email, 'email')}
                  aria-label="Copy email address"
                  className="p-2 text-[#AAA398] hover:text-[#F2EBDD] border border-[#292720] hover:border-[#D49A46] bg-[#171612] rounded-xs transition-colors"
                >
                  {copiedKey === 'email' ? (
                    <Check className="w-4 h-4 text-[#4ADE80]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </Card>

            {/* Phone Card */}
            <Card variant="surface" className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xs bg-[#171612] border border-[#292720] text-[#D49A46]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-mono text-xs uppercase text-[#68645C] tracking-wider">
                      TELEPHONE DISPATCH
                    </div>
                    <a
                      href={`tel:${profileData.contact.phone}`}
                      className="font-mono text-sm sm:text-base text-[#F2EBDD] hover:text-[#E5BA70] transition-colors"
                    >
                      {profileData.contact.phone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(profileData.contact.phone, 'phone')}
                  aria-label="Copy phone number"
                  className="p-2 text-[#AAA398] hover:text-[#F2EBDD] border border-[#292720] hover:border-[#D49A46] bg-[#171612] rounded-xs transition-colors"
                >
                  {copiedKey === 'phone' ? (
                    <Check className="w-4 h-4 text-[#4ADE80]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </Card>

            {/* Location Card */}
            <Card variant="surface" className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xs bg-[#171612] border border-[#292720] text-[#D49A46]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-mono text-xs uppercase text-[#68645C] tracking-wider">
                    OPERATIONAL LOCATION
                  </div>
                  <div className="font-mono text-sm sm:text-base text-[#F2EBDD]">
                    {profileData.contact.location}, India
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Direct Inquiry Dispatch Card */}
          <div className="lg:col-span-6">
            <Card variant="surface" className="p-6 sm:p-8">
              <div className="font-mono text-xs text-[#D49A46] uppercase tracking-widest mb-2">
                TRANSMISSION GATEWAY
              </div>
              <h3 className="font-display text-xl uppercase font-bold text-[#F2EBDD] mb-4">
                INITIATE DIRECT DIALOGUE
              </h3>
              <p className="text-sm text-[#AAA398] leading-relaxed mb-6">
                Click below to launch an email dispatch directly with pre-formatted transmission headers,
                or connect via verified professional networks.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`mailto:${profileData.contact.email}?subject=Transmission:%20Engineering%20Opportunity&body=Hello%20Jhansi,%0D%0A%0D%0AI%20reviewed%20your%20engineering%20portfolio%20and%20would%20like%20to%20connect%20regarding...`}
                  className="flex-1"
                >
                  <Button variant="primary" size="lg" className="w-full" icon={<Send className="w-4 h-4" />}>
                    SEND TRANSMISSION
                  </Button>
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-[#292720]/80">
                <div className="font-mono text-[11px] uppercase tracking-widest text-[#68645C] mb-3">
                  EXTERNAL PROFILES
                </div>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs px-3 py-1.5 rounded-xs border border-[#292720] bg-[#171612] text-[#AAA398] hover:text-[#F2EBDD] hover:border-[#D49A46]/60 transition-colors"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
};
