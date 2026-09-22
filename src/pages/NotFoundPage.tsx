import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Container } from '../components/primitives/Container';
import { Button } from '../components/primitives/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-32">
      <Container size="narrow" className="text-center">
        <div className="font-mono text-xs text-[#D49A46] uppercase tracking-widest mb-3">
          SYSTEM FAULT // 404
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase text-[#F2EBDD] mb-4">
          ENDPOINT DISCONNECTED
        </h1>
        <p className="text-base text-[#AAA398] mb-8 max-w-md mx-auto leading-relaxed">
          The requested route does not correspond to an active service node. Verify route parameters or return to apex.
        </p>
        <Link to="/">
          <Button variant="primary" size="md" icon={<ArrowLeft className="w-4 h-4" />} iconPosition="left">
            RETURN TO APEX
          </Button>
        </Link>
      </Container>
    </div>
  );
};
