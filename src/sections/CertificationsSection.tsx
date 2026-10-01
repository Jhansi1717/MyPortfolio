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
      aria-label="Professional Certifications"
      className="py-20 md:py-28 lg:py-32 border-b border-[#292720] scroll-mt-24 bg-transparent"
    >
      <Container size="wide">
        <SectionHeading
          indexTag="08 / CERTIFICATIONS"
          title="CERTIFICATIONS"
          description="Selected certifications in AI, GenAI, programming, databases, and cybersecurity."
        />

        {/* Featured Primary Accreditation */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-3.5 h-3.5 text-[#D49A46]" />
            <span className="font-mono text-xs font-bold text-[#E5BA70] uppercase tracking-wider">
              FEATURED CERTIFICATION
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
                ADDITIONAL CERTIFICATIONS ({supportingCerts.length})
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#888175] uppercase hidden sm:inline-block">
              CLICK TO VIEW DETAILS
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


