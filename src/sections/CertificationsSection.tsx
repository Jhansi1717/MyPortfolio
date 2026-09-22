import React, { useState } from 'react';
import { SectionHeading } from '../components/primitives/SectionHeading';
import { Container } from '../components/primitives/Container';
import { certificationsList, Certification } from '../data/certifications';
import { FeaturedCertificateCard } from '../components/certifications/FeaturedCertificateCard';
import { SupportingCertificateCard } from '../components/certifications/SupportingCertificateCard';
import { CertificateDetailModal } from '../components/certifications/CertificateDetailModal';
import { ShieldCheck, Award } from 'lucide-react';

export const CertificationsSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const featuredCert = certificationsList.find((c) => c.featured) || certificationsList[0];
  const supportingCerts = certificationsList.filter((c) => c.id !== featuredCert.id);

  const handleInspect = (cert: Certification) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCert(null), 250);
  };

  return (
    <section
      id="certifications"
      aria-label="Certifications Section: Verified Technical Credentials"
      className="py-20 md:py-28 border-b border-[#292720]"
    >
      <Container size="wide">
        <SectionHeading
          indexTag="08 // CERTIFICATIONS"
          title="08 / CERTIFICATIONS: TECHNICAL CREDENTIALS"
          description="Verified accreditations across artificial intelligence, autonomous agent architectures, algorithmic foundations, database systems, and cybersecurity auditing."
        />

        {/* Featured Primary Accreditation */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-3.5 h-3.5 text-[#D49A46]" />
            <span className="font-mono text-xs font-bold text-[#E5BA70] uppercase tracking-wider">
              PRIMARY SPECIALIZATION CREDENTIAL
            </span>
          </div>
          <FeaturedCertificateCard
            certification={featuredCert}
            onInspect={handleInspect}
          />
        </div>

        {/* Supporting Verified Credentials Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between pb-3 border-b border-[#24221C] mb-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D49A46]" />
              <span className="font-mono text-xs font-bold text-[#E5BA70] uppercase tracking-wider">
                SUPPORTING CREDENTIALS & ALGORITHMIC PROVING ({supportingCerts.length})
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#888175] uppercase hidden sm:inline-block">
              CLICK CARD TO EXPAND AUTHENTICATED BREAKDOWN
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {supportingCerts.map((cert, idx) => (
              <SupportingCertificateCard
                key={cert.id}
                certification={cert}
                index={idx}
                onInspect={handleInspect}
              />
            ))}
          </div>
        </div>

        {/* Factual Integrity Footer Note */}
        <div className="p-4 rounded-xs bg-[#11100C] border border-[#201F19] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[#68645C]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" />
            <span>
              SOURCE TRUTH: All credentials verified against respective issuing authorities (Oracle University, NPTEL / IIT Kharagpur, Microsoft, Infosys, GFG).
            </span>
          </div>
          <span className="text-[#888175] shrink-0">STRICT FACTUAL INTEGRITY</span>
        </div>

        {/* Certificate Detail Inspection Modal */}
        <CertificateDetailModal
          certification={selectedCert}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </Container>
    </section>
  );
};


