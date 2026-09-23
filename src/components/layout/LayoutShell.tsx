import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './Header';
import { Footer } from './Footer';
import { AskJhansi } from '../copilot/AskJhansi';
import { CommandPalette } from '../CommandPalette';
import { CustomCursor } from '../CustomCursor';
import { Preloader } from './Preloader';
import { GlobalAmbientBackground } from '../background/GlobalAmbientBackground';

export interface LayoutShellProps {
  children: React.ReactNode;
}

export const LayoutShell: React.FC<LayoutShellProps> = ({ children }) => {
  const [isPreloading, setIsPreloading] = useState(() => {
    if (typeof window !== 'undefined') {
      const isProjectRoute = window.location.pathname.startsWith('/projects/');
      if (isProjectRoute) return false;
      
      const hasSeen = sessionStorage.getItem('jhansi_portfolio_preloader_seen');
      return hasSeen !== 'true';
    }
    return true;
  });

  const handlePreloadComplete = () => {
    setIsPreloading(false);
  };

  return (
    <div className="min-h-screen bg-[#080806] text-[#F2EBDD] flex flex-col selection:bg-[#D49A46]/20 selection:text-[#E5BA70] relative">
      {/* Global Ambient Background System (Consistent across entire portfolio) */}
      <GlobalAmbientBackground />

      {/* Skip to Main Content Link for Keyboard & Screen Reader Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#D49A46] text-[#090907] font-mono text-xs uppercase font-bold rounded-xs shadow-lg focus:outline-none focus:ring-2 focus:ring-[#F2EBDD]"
      >
        Skip to main content
      </a>

      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Quick Navigation Command Palette */}
      <CommandPalette />

      <AnimatePresence mode="wait">
        {isPreloading ? (
          <Preloader key="preloader" onComplete={handlePreloadComplete} />
        ) : (
          <motion.div
            key="main-layout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col"
          >
            {/* Top sticky navigation */}
            <Header />

            {/* Main body content */}
            <main id="main-content" className="flex-1 pt-16 md:pt-20">
              {children}
            </main>

            {/* Persistent technical footer */}
            <Footer />

            {/* Global AI Portfolio Copilot */}
            <AskJhansi />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
