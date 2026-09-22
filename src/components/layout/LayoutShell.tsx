import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { AskJhansi } from '../copilot/AskJhansi';
import { CommandPalette } from '../CommandPalette';
import { CustomCursor } from '../CustomCursor';

export interface LayoutShellProps {
  children: React.ReactNode;
}

export const LayoutShell: React.FC<LayoutShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#090907] text-[#F2EBDD] flex flex-col selection:bg-[#D49A46]/20 selection:text-[#E5BA70]">
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
    </div>
  );
};
