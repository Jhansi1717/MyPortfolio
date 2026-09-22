import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LayoutShell } from './components/layout/LayoutShell';
import { HomePage } from './pages/HomePage';
import { ProjectCaseStudyPage } from './pages/ProjectCaseStudyPage';
import { NotFoundPage } from './pages/NotFoundPage';

/**
 * Handles smooth scrolling to anchor hashes or route apex on route change
 */
function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 50);
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollHandler />
      <LayoutShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<ProjectCaseStudyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </LayoutShell>
    </BrowserRouter>
  );
}
