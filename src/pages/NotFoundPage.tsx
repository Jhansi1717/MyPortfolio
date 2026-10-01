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
          PAGE NOT FOUND // 404
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase text-[#F2EBDD] mb-4">
          PAGE NOT FOUND
        </h1>
        <p className="text-base text-[#AAA398] mb-8 max-w-md mx-auto leading-relaxed">
          The requested page could not be found. Please check the URL or return to projects.
        </p>
        <Link to="/">
          <Button variant="primary" size="md" icon={<ArrowLeft className="w-4 h-4" />} iconPosition="left">
            RETURN TO PROJECTS
          </Button>
        </Link>
      </Container>
    </div>
  );
};
