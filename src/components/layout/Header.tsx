import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, Github, FileText, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { authoritativeProfile, resumeConfig } from '../../data/portfolioData';
import { useActiveSection } from '../../hooks/useActiveSection';
import { cn } from '../../lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { EASE_CUSTOM, DURATION } from '../../utils/motionTokens';

interface NavItem {
  label: string;
  href: string;
  targetId: string;
  index: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'WORK', href: '#selected-work', targetId: 'selected-work', index: '01' },
  { label: 'EXPERIENCE', href: '#experience', targetId: 'experience', index: '02' },
  { label: 'FOCUS', href: '#focus', targetId: 'focus', index: '03' },
  { label: 'ABOUT', href: '#about', targetId: 'about', index: '04' },
  { label: 'CONTACT', href: '#contact', targetId: 'contact', index: '05' },
];

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const isHomePage = location.pathname === '/';

  const sectionIds = NAV_ITEMS.map((item) => item.targetId);
  const activeSection = useActiveSection(sectionIds, 160);

  // Monitor scroll state for smooth compact glass transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // Smooth scroll handler taking header offset into account
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
    href: string
  ) => {
    if (isHomePage) {
      e.preventDefault();
      closeMobileMenu();

      const element = document.getElementById(targetId);
      if (element) {
        const headerOffset = 64;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: shouldReduceMotion ? 'auto' : 'smooth',
        });

        window.history.pushState(null, '', href);
      }
    } else {
      closeMobileMenu();
    }
  };

  return (
    <motion.header
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.COMPONENT, ease: EASE_CUSTOM }}
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300 select-none',
        scrolled
          ? 'bg-[#090907]/90 backdrop-blur-md border-b border-[#24221C] shadow-[0_4px_24px_rgba(0,0,0,0.6)] py-0'
          : 'bg-transparent border-b border-transparent py-2 sm:py-3'
      )}
    >
      <div className={cn(
        "max-w-7xl mx-auto px-5 sm:px-8 md:px-12 flex items-center justify-between transition-all duration-300",
        scrolled ? "h-14 sm:h-15" : "h-16 sm:h-20"
      )}>
        
        {/* BRAND IDENTITY */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="group focus-visible:outline-2 focus-visible:outline-[#D49A46] rounded-xs shrink-0 py-1"
          aria-label="Jhansi Bhukya - Home"
        >
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-base sm:text-lg tracking-[0.14em] text-[#F2EBDD] group-hover:text-[#E5BA70] transition-colors duration-200">
              JHANSI
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46] group-hover:scale-125 transition-transform duration-200" />
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav
          className="hidden lg:flex items-center gap-6 xl:gap-8"
          aria-label="Desktop Primary Navigation"
        >
          {/* Main Section Links */}
          <div className="flex items-center gap-5 xl:gap-7">
            {NAV_ITEMS.map((item) => {
              const isActive = isHomePage && activeSection === item.targetId;
              const linkHref = isHomePage ? item.href : `/${item.href}`;

              return (
                <a
                  key={item.label}
                  href={linkHref}
                  onClick={(e) => handleNavClick(e, item.targetId, item.href)}
                  className={cn(
                    'font-mono text-xs uppercase tracking-[0.08em] font-medium py-1.5 transition-all duration-200 relative group/nav focus-visible:outline-2 focus-visible:outline-[#D49A46] rounded-xs',
                    isActive
                      ? 'text-[#E5BA70] font-semibold'
                      : 'text-[#AAA398] hover:text-[#FFFDF9]'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="transition-transform duration-200 inline-block group-hover/nav:translate-y-[-0.5px]">{item.label}</span>
                  {/* Active underline indicator */}
                  <span
                    className={cn(
                      'absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-[#D49A46] transition-transform duration-250 origin-left',
                      isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover/nav:scale-x-100 group-hover/nav:opacity-75'
                    )}
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </div>

          {/* Elegant Vertical Divider */}
          <div className="w-px h-3.5 bg-[#292720]" aria-hidden="true" />

          {/* Priority Actions: RESUME & GITHUB */}
          <div className="flex items-center gap-3">
            {/* RESUME */}
            <a
              href={resumeConfig.filePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.08em] font-semibold text-[#E5BA70] hover:text-[#FFFDF9] bg-[#14130F] hover:bg-[#1A1914] border border-[#D49A46]/40 hover:border-[#D49A46] px-3 py-1.5 rounded-xs transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-[#D49A46]"
              aria-label="View verified PDF resume in new tab"
            >
              <FileText className="w-3.5 h-3.5 text-[#D49A46]" />
              <span>RESUME</span>
            </a>

            {/* GITHUB */}
            <a
              href={authoritativeProfile.github.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.08em] font-medium text-[#AAA398] hover:text-[#F2EBDD] bg-[#11100C] hover:bg-[#161511] border border-[#24221C] hover:border-[#4E4A42] px-3 py-1.5 rounded-xs transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-[#D49A46]"
              aria-label="View GitHub profile in new tab"
            >
              <Github className="w-3.5 h-3.5 text-[#D49A46]" />
              <span>GITHUB</span>
            </a>
          </div>
        </nav>

        {/* MOBILE MENU TOGGLE */}
        <div className="flex lg:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="w-11 h-11 flex items-center justify-center text-[#AAA398] hover:text-[#F2EBDD] focus-visible:outline-2 focus-visible:outline-[#D49A46] rounded-xs border border-[#24221C] bg-[#11100C] active:bg-[#171612] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* MOBILE NAVIGATION DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3, ease: EASE_CUSTOM }}
            className="lg:hidden border-b border-[#24221C] bg-[#090907]/95 backdrop-blur-md px-5 sm:px-8 py-5 shadow-2xl overflow-hidden"
          >
            <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
              {NAV_ITEMS.map((item) => {
                const isActive = isHomePage && activeSection === item.targetId;
                const linkHref = isHomePage ? item.href : `/${item.href}`;

                return (
                  <a
                    key={item.label}
                    href={linkHref}
                    onClick={(e) => handleNavClick(e, item.targetId, item.href)}
                    className={cn(
                      'flex items-center justify-between py-3 px-3 rounded-xs font-mono text-xs uppercase tracking-wider transition-colors min-h-[44px] focus-visible:outline-2 focus-visible:outline-[#D49A46]',
                      isActive
                        ? 'bg-[#14130F] text-[#E5BA70] font-bold border-l-2 border-[#D49A46]'
                        : 'text-[#AAA398] hover:text-[#F2EBDD] hover:bg-[#11100C]'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="flex items-center gap-2.5">
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" aria-hidden="true" />}
                      <span>{item.label}</span>
                    </span>
                    <span className="text-[10px] text-[#68645C] font-mono">{item.index}</span>
                  </a>
                );
              })}
            </nav>

            {/* Direct Action Buttons: RESUME & GITHUB */}
            <div className="pt-4 mt-3 border-t border-[#1F1E19] grid grid-cols-2 gap-3">
              <a
                href={resumeConfig.filePath}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 min-h-[44px] py-2.5 px-3 rounded-xs border border-[#D49A46]/50 bg-[#14130F] active:bg-[#1C1A14] text-[#E5BA70] font-mono text-xs font-semibold uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-[#D49A46]"
              >
                <FileText className="w-4 h-4 text-[#D49A46]" />
                <span>RESUME</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={authoritativeProfile.github.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 min-h-[44px] py-2.5 px-3 rounded-xs border border-[#24221C] bg-[#11100C] active:bg-[#171612] text-[#AAA398] hover:text-[#F2EBDD] font-mono text-xs font-medium uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-[#D49A46]"
              >
                <Github className="w-4 h-4 text-[#D49A46]" />
                <span>GITHUB</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
