import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { LayoutShell } from './components/layout/LayoutShell';
import { HomePage } from './pages/HomePage';
import { EASE_CUSTOM, DURATION } from './utils/motionTokens';

// Route-level code splitting for non-homepage pages to optimize initial bundle size
const ProjectCaseStudyPage = React.lazy(() =>
  import('./pages/ProjectCaseStudyPage').then((module) => ({
    default: module.ProjectCaseStudyPage,
  }))
);

const NotFoundPage = React.lazy(() =>
  import('./pages/NotFoundPage').then((module) => ({
    default: module.NotFoundPage,
  }))
);

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
        }, 120);
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
    }, 60);

    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  const isCaseStudy = location.pathname.startsWith('/projects/');

  // Premium editorial route transition with clip-path / mask, opacity, and subtle translation (~450ms)
  const transitionVariants = shouldReduceMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
      }
    : isCaseStudy
    ? {
        initial: {
          opacity: 0,
          y: 16,
          clipPath: 'inset(3% 0% 0% 0%)',
        },
        animate: {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
          transition: {
            duration: 0.45,
            ease: EASE_CUSTOM,
          },
        },
        exit: {
          opacity: 0,
          y: -12,
          clipPath: 'inset(0% 0% 3% 0%)',
          transition: {
            duration: 0.35,
            ease: EASE_CUSTOM,
          },
        },
      }
    : {
        initial: {
          opacity: 0,
          y: 10,
        },
        animate: {
          opacity: 1,
          y: 0,
          transition: {
            duration: DURATION.COMPONENT,
            ease: EASE_CUSTOM,
          },
        },
        exit: {
          opacity: 0,
          y: -8,
          transition: {
            duration: DURATION.MICRO,
            ease: EASE_CUSTOM,
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
        className="w-full min-h-screen bg-[#090907]"
      >
        <React.Suspense
          fallback={
            <div className="min-h-screen bg-[#090907] flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-[#D49A46] border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/:slug" element={<ProjectCaseStudyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </React.Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollHandler />
      <LayoutShell>
        <AnimatedRoutes />
      </LayoutShell>
    </BrowserRouter>
  );
}
