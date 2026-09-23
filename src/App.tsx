import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { LayoutShell } from './components/layout/LayoutShell';
import { HomePage } from './pages/HomePage';
import { ProjectCaseStudyPage } from './pages/ProjectCaseStudyPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Preloader } from './components/layout/Preloader';

// High-fidelity scroll cache supporting back/forward browser flow
const scrollCache = new Map<string, number>();

/**
 * Handles professional scroll restoration and hash anchor targeting
 */
function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Save scroll position for the current pathname
      scrollCache.set(window.location.pathname, window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // If there is an active hash target (e.g. /#experience)
    if (hash) {
      const targetId = hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return () => clearTimeout(timer);
      }
    }

    // Restore cached position if available, otherwise scroll to top
    const cachedY = scrollCache.get(pathname);
    const timer = setTimeout(() => {
      window.scrollTo({
        top: cachedY !== undefined ? cachedY : 0,
        behavior: 'auto',
      });
    }, 80);

    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  // Dynamic status to trigger alternating cinematic directions
  const isCaseStudy = location.pathname.startsWith('/projects/');

  const transitionVariants = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.25 } },
        exit: { opacity: 0, transition: { duration: 0.25 } },
      }
    : {
        initial: {
          opacity: 0,
          y: isCaseStudy ? 35 : -35,
          scale: isCaseStudy ? 0.98 : 1.0,
          clipPath: isCaseStudy
            ? 'inset(8% 8% 8% 8% round 4px)'
            : 'inset(0% 0% 0% 0%)',
        },
        animate: {
          opacity: 1,
          y: 0,
          scale: 1,
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          transition: {
            duration: 0.48, // Perfect middle of the requested 350-550ms range
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          },
        },
        exit: {
          opacity: 0,
          y: isCaseStudy ? 30 : -30,
          scale: isCaseStudy ? 1.0 : 0.98,
          clipPath: isCaseStudy
            ? 'inset(0% 0% 0% 0%)'
            : 'inset(8% 8% 8% 8% round 4px)',
          transition: {
            duration: 0.42,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          },
        },
      };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={transitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full min-h-screen bg-transparent"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<ProjectCaseStudyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  return (
    <BrowserRouter>
      <Preloader onComplete={() => setPreloaderComplete(true)} />
      <ScrollHandler />
      {preloaderComplete && (
        <LayoutShell>
          <AnimatedRoutes />
        </LayoutShell>
      )}
    </BrowserRouter>
  );
}
