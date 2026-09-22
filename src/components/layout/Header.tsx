import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Github, FileText, Sparkles, Search, Command } from 'lucide-react';
import { navigationItems, resumeConfig } from '../../data/portfolioData';
import { authoritativeProfile } from '../../data/profile';
import { useActiveSection } from '../../hooks/useActiveSection';
import { cn } from '../../lib/utils';
import { Link, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const sectionIds = navigationItems.map((item) => item.href.replace('#', ''));
  const activeSection = useActiveSection(sectionIds, 200);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-colors duration-200 border-b',
        scrolled
          ? 'bg-[#090907]/95 backdrop-blur-md border-[#292720]'
          : 'bg-[#090907]/85 backdrop-blur-sm border-[#292720]/80'
      )}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 flex items-center justify-between h-16 md:h-18">
        {/* Left: JHANSI */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="group flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-[#D49A46] rounded-xs shrink-0"
          aria-label="Jhansi - Home"
        >
          <span className="font-display font-extrabold text-lg sm:text-xl tracking-[0.18em] uppercase text-[#F2EBDD] group-hover:text-[#E5BA70] transition-colors">
            JHANSI
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46] group-hover:scale-125 transition-transform" />
        </Link>

        {/* Desktop: Clean One-Line Navigation & Utility Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {/* Main Navigation */}
          <nav className="flex items-center gap-5 xl:gap-6" aria-label="Main Navigation">
            {navigationItems.map((item) => {
              const sectionTarget = item.href.replace('#', '');
              const isActive = isHomePage && activeSection === sectionTarget;

              return isHomePage ? (
                <a
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'font-mono text-xs uppercase tracking-[0.14em] transition-all py-1 px-1 relative select-none rounded-xs flex items-center gap-1.5 whitespace-nowrap',
                    'focus-visible:outline-2 focus-visible:outline-[#D49A46]',
                    isActive
                      ? 'text-[#E5BA70] font-medium'
                      : 'text-[#AAA398] hover:text-[#F2EBDD]'
                  )}
                >
                  {isActive && (
                    <span className="w-1 h-1 rounded-full bg-[#D49A46] inline-block" />
                  )}
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-1 right-1 h-[1.5px] bg-[#D49A46] rounded-full" />
                  )}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={`/${item.href}`}
                  className="font-mono text-xs uppercase tracking-[0.14em] text-[#AAA398] hover:text-[#F2EBDD] transition-colors py-1 px-1 select-none focus-visible:outline-2 focus-visible:outline-[#D49A46] rounded-xs whitespace-nowrap"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Hairline Divider */}
          <div className="h-4 w-px bg-[#292720]" aria-hidden="true" />

          {/* Utility Actions */}
          <div className="flex items-center gap-3 xl:gap-4 shrink-0" aria-label="Utility Actions">
            {/* GitHub */}
            <a
              href={authoritativeProfile.github.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-wider uppercase text-[#AAA398] hover:text-[#F2EBDD] transition-colors flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#D49A46] rounded-xs group px-2 py-1"
              aria-label="Jhansi's GitHub Profile"
            >
              <Github className="w-3.5 h-3.5 text-[#D49A46]" />
              <span>GitHub</span>
            </a>

            {/* Resume static link */}
            <a
              href={resumeConfig.filePath}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-wider uppercase text-[#AAA398] hover:text-[#E5BA70] transition-colors flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#D49A46] rounded-xs group px-2 py-1"
              aria-label="View Resume PDF"
            >
              <FileText className="w-3.5 h-3.5 text-[#D49A46]" />
              <span>Resume</span>
            </a>

            {/* Search command */}
            <button
              onClick={openCommandPalette}
              className="p-1.5 rounded-xs bg-[#14130F] hover:bg-[#1C1A14] border border-[#292720] hover:border-[#D49A46]/60 text-[#AAA398] hover:text-[#F2EBDD] transition-all cursor-pointer"
              aria-label="Search portfolio (Cmd + K)"
              title="Search (Cmd + K)"
            >
              <Search className="w-3.5 h-3.5 text-[#D49A46]" />
            </button>
          </div>
        </div>

        {/* Mobile menu trigger */}
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
          {/* Quick Command Trigger in Mobile Menu */}
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
                    isActive ? 'text-[#E5BA70] pl-2 border-l-2 border-l-[#D49A46]' : 'text-[#F2EBDD] hover:text-[#D49A46]'
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

          {/* Mobile Utility Links */}
          <div className="pt-6 space-y-3">
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

