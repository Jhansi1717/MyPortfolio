import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If user prefers reduced motion or has visited, complete immediately
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasVisited = typeof window !== 'undefined' && (sessionStorage.getItem('jhansi_portfolio_preloader_seen') === 'true' || sessionStorage.getItem('jhansi-portfolio-visited') === 'true');
    
    if (prefersReduced || hasVisited) {
      setLoading(false);
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem('jhansi_portfolio_preloader_seen', 'true');
      sessionStorage.setItem('jhansi-portfolio-visited', 'true');
      setTimeout(onComplete, 400); // Allow exit animation to finish
    }, 700);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#090907] select-none"
        >
          <div className="relative flex flex-col items-center">
            {/* Branded Mark Animation */}
            <div className="relative mb-8 h-12 w-32 overflow-hidden">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-2xl font-bold tracking-[0.3em] text-[#F2EBDD]"
              >
                JHANSI
              </motion.div>
            </div>

            {/* Geometric Assembly Line */}
            <div className="h-px w-48 bg-[#292720] relative">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-0 bg-[#D49A46] origin-left"
              />
            </div>

            {/* Subtext */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#AAA398]"
            >
              ENGINEERING INTELLIGENCE
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
