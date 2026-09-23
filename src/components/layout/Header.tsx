import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Github, FileText, Sparkles, Search, Command } from 'lucide-react';
import { motion } from 'motion/react';
import { navigationItems, resumeConfig } from '../../data/portfolioData';
import { authoritativeProfile } from '../../data/profile';
import { useActiveSection } from '../../hooks/useActiveSection';
import { cn } from '../../lib/utils';
import { Link, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const sectionIds = navigationItems.map((item) => item.href.replace('#', ''));
  const activeSection = useActiveSection(sectionIds, 200);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let accumulatedDelta = 0;
    const threshold = 40; // Avoid jitter on minor scroll fluctuations

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Transparent at top, subtle translucent dark when scrolled past 20px
      setScrolled(currentScrollY > 20);

      const delta = currentScrollY - lastScrollY;
      
      // Track directional accumulation
      if ((delta > 0 && accumulatedDelta < 0) || (delta < 0 && accumulatedDelta > 0)) {
        accumulatedDelta = 0; // Reset accumulation on direction change
      }
      accumulatedDelta += delta;

      if (currentScrollY <= 20) {
        setVisible(true);
      } else if (accumulatedDelta > 160) { // Higher threshold for hiding
        // Scrolled down past threshold: hide navbar
        setVisible(false);
        accumulatedDelta = 0;
      } else if (accumulatedDelta < -80) { // Lower threshold for showing (more responsive)
        // Scrolled up past threshold: reveal navbar
        setVisible(true);
        accumulatedDelta = 0;
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const openCommandPalette = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  const openAskJhansi = () => {
    window.dispatchEvent(new CustomEvent('open-ask-jhansi'));
  };

  // If mobile menu is expanded, force visible to true to avoid layout hiding
  const isHeaderVisible = visible || mobileMenuOpen;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b select-none',
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full',
        scrolled
          ? 'bg-[#090907]/90 backdrop-blur-md border-[#292720]/90 py-3'
          : 'bg-transparent border-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 flex items-center justify-between">
        {/* Left: JHANSI Logo */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="group focus-visible:outline-2 focus-visible:outline-[#D49A46] rounded-xs shrink-0"
          aria-label="Jhansi - Home"
        >
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-lg sm:text-xl tracking-[0.12em] text-[#F2EBDD] group-hover:text-[#E5BA70] transition-colors">
              JHANSI
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46] group-hover:scale-125 transition-transform" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className={cn(
          "hidden lg:flex items-center gap-8 transition-opacity duration-500",
          !scrolled && "opacity-80"
        )}>
          <nav className="flex items-center gap-6" aria-label="Main Navigation">
            {navigationItems.map((item) => {
              const sectionTarget = item.href.replace('#', '');
              const isActive = isHomePage && activeSection === sectionTarget;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'font-mono text-[11px] uppercase tracking-[0.08em] font-medium transition-all relative group/nav',
                    isActive ? 'text-[#D49A46]' : 'text-[#AAA398] hover:text-[#F2EBDD]'
                  )}
                >
                  <span>{item.label}</span>
                  <span className={cn(
                    "absolute -bottom-1 left-0 right-0 h-px bg-[#D49A46] transform scale-x-0 group-hover/nav:scale-x-100 transition-transform duration-300 origin-left",
                    isActive && "scale-x-100"
                  )} />
                </a>
              );
            })}

            <a
              href={resumeConfig.filePath}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.08em] font-medium text-[#AAA398] hover:text-[#D49A46] transition-all relative group/nav"
            >
              <span>RESUME</span>
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#D49A46] transform scale-x-0 group-hover/nav:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          </nav>

          <div className="h-4 w-px bg-[#292720]" aria-hidden="true" />

          <div className="flex items-center gap-5">
            <a
              href={authoritativeProfile.github.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-[0.08em] font-medium uppercase text-[#AAA398] hover:text-[#F2EBDD] transition-colors flex items-center gap-2"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GITHUB</span>
            </a>

            <button
              onClick={openCommandPalette}
              className="text-[#AAA398] hover:text-[#D49A46] transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={openCommandPalette}
            className="p-2 text-[#AAA398] hover:text-[#F2EBDD] focus-visible:outline-2 focus-visible:outline-[#D49A46] rounded-xs border border-[#292720] bg-[#11110E] transition-colors"
            aria-label="Open Command Palette"
          >
            <Search className="w-4 h-4 text-[#D49A46]" />
          </button>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="p-2 text-[#AAA398] hover:text-[#F2EBDD] focus-visible:outline-2 focus-visible:outline-[#D49A46] rounded-xs border border-[#292720] bg-[#11110E] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#292720] bg-[#090907] px-6 py-6 transition-all max-h-[85vh] overflow-y-auto">
          <button
            onClick={() => {
              closeMobileMenu();
              openCommandPalette();
            }}
            className="w-full flex items-center justify-between p-3 mb-4 rounded-xs border border-[#292720] bg-[#14130F] text-[#AAA398] hover:text-[#F2EBDD] hover:border-[#D49A46]/50 font-mono text-xs"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-[#D49A46]" />
              <span>Search portfolio...</span>
            </span>
            <kbd className="text-[10px] bg-[#1C1B16] border border-[#292720] px-1.5 py-0.5 rounded-xs text-[#888175]">
              ⌘K
            </kbd>
          </button>

          <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
            {navigationItems.map((item) => {
              const sectionTarget = item.href.replace('#', '');
              const isActive = isHomePage && activeSection === sectionTarget;

              return (
                <a
                  key={item.label}
                  href={isHomePage ? item.href : `/${item.href}`}
                  onClick={closeMobileMenu}
                  className={cn(
                    'flex items-center justify-between font-display text-base font-bold uppercase tracking-wider py-3 border-b border-[#292720]/50 transition-colors',
                    isActive ? 'text-[#E5BA70]' : 'text-[#AAA398] hover:text-[#F2EBDD]'
                  )}
                >
                  <span className="flex items-center gap-2">
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" />}
                    <span>{item.label}</span>
                  </span>
                  <span className="font-mono text-xs text-[#D49A46]">{item.index}</span>
                </a>
              );
            })}
          </nav>

          {/* Compact Utilities */}
          <div className="pt-6">
            <div className="grid grid-cols-2 gap-2">
              <a
                href={authoritativeProfile.github.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 p-3 rounded-xs border border-[#292720] bg-[#11110E] hover:border-[#D49A46] hover:bg-[#171612] transition-colors text-[#AAA398] hover:text-[#E5BA70] font-mono text-xs uppercase"
              >
                <Github className="w-4 h-4 text-[#D49A46]" />
                <span>GitHub</span>
              </a>

              <a
                href={resumeConfig.filePath}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 p-3 rounded-xs border border-[#292720] bg-[#11110E] hover:border-[#D49A46] hover:bg-[#171612] transition-colors text-[#AAA398] hover:text-[#E5BA70] font-mono text-xs uppercase"
              >
                <FileText className="w-4 h-4 text-[#D49A46]" />
                <span>Resume</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

