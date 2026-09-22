import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  FolderGit2,
  Briefcase,
  Layers,
  User,
  GraduationCap,
  Award,
  FileText,
  Github,
  Linkedin,
  Code2,
  Mail,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  CornerDownLeft,
  X,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { authoritativeProfile } from '../data/profile';

export interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'External' | 'AI & Tools';
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  keywords: string[];
  shortcut?: string;
}

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle navigation helpers
  const handleScrollToSection = (sectionId: string) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleExternalLink = (url: string) => {
    setIsOpen(false);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleOpenAskJhansi = () => {
    setIsOpen(false);
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('open-ask-jhansi'));
    }, 50);
  };

  const handleOpenResume = () => {
    setIsOpen(false);
    handleScrollToSection('resume');
  };

  // The comprehensive commands specified by user
  const commands: CommandItem[] = useMemo(
    () => [
      {
        id: 'projects',
        title: 'Projects',
        category: 'Navigation',
        description: 'Flagship deep learning & full-stack systems',
        icon: <FolderGit2 className="w-4 h-4 text-[#D49A46]" />,
        action: () => handleScrollToSection('projects'),
        keywords: ['projects', 'respiratory', 'mental health', 'pizza', 'code', 'portfolio', 'efficientnet', 'rag'],
        shortcut: '03',
      },
      {
        id: 'experience',
        title: 'Experience',
        category: 'Navigation',
        description: 'Data Science Intern at Aminobots',
        icon: <Briefcase className="w-4 h-4 text-[#D49A46]" />,
        action: () => handleScrollToSection('experience'),
        keywords: ['experience', 'work', 'internship', 'aminobots', 'data science', 'role', 'jobs', 'history'],
        shortcut: '02',
      },
      {
        id: 'systems-lab',
        title: 'Systems Lab',
        category: 'Navigation',
        description: 'Interactive neural pipelines & architecture diagrams',
        icon: <Layers className="w-4 h-4 text-[#D49A46]" />,
        action: () => handleScrollToSection('systems-lab'),
        keywords: ['systems lab', 'architecture', 'interactive', 'neural', 'pipeline', 'spectrogram', 'ssl'],
        shortcut: '04',
      },
      {
        id: 'about',
        title: 'About',
        category: 'Navigation',
        description: 'Core engineering philosophy, biography & technical focus',
        icon: <User className="w-4 h-4 text-[#D49A46]" />,
        action: () => handleScrollToSection('about'),
        keywords: ['about', 'bio', 'biography', 'profile', 'jhansi', 'philosophy', 'background'],
        shortcut: '06',
      },
      {
        id: 'education',
        title: 'Education',
        category: 'Navigation',
        description: 'B.E. CSE (AIML) at CBIT — 9.72 / 10 CGPA',
        icon: <GraduationCap className="w-4 h-4 text-[#D49A46]" />,
        action: () => handleScrollToSection('education'),
        keywords: ['education', 'degree', 'cbit', 'cgpa', 'grade', 'university', 'college', 'academic'],
        shortcut: '07',
      },
      {
        id: 'certifications',
        title: 'Certifications',
        category: 'Navigation',
        description: 'Stanford, DeepLearning.AI & AWS certified credentials',
        icon: <Award className="w-4 h-4 text-[#D49A46]" />,
        action: () => handleScrollToSection('certifications'),
        keywords: ['certifications', 'stanford', 'deeplearning.ai', 'aws', 'credentials', 'courses', 'certificates'],
        shortcut: '08',
      },
      {
        id: 'resume',
        title: 'Resume',
        category: 'Navigation',
        description: 'Formal curriculum vitae & engineering dossier',
        icon: <FileText className="w-4 h-4 text-[#D49A46]" />,
        action: handleOpenResume,
        keywords: ['resume', 'cv', 'curriculum vitae', 'pdf', 'download', 'dossier', 'printable'],
        shortcut: '09',
      },
      {
        id: 'github',
        title: 'GitHub',
        category: 'External',
        description: `Explore public repositories @${authoritativeProfile.github.username}`,
        icon: <Github className="w-4 h-4 text-[#AAA398]" />,
        action: () => handleExternalLink(authoritativeProfile.github.profileUrl),
        keywords: ['github', 'git', 'repo', 'repository', 'code', 'open source'],
        shortcut: '↗',
      },
      {
        id: 'linkedin',
        title: 'LinkedIn',
        category: 'External',
        description: `Connect on professional network @${authoritativeProfile.linkedin.username}`,
        icon: <Linkedin className="w-4 h-4 text-[#AAA398]" />,
        action: () => handleExternalLink(authoritativeProfile.linkedin.profileUrl),
        keywords: ['linkedin', 'social', 'network', 'profile', 'connect'],
        shortcut: '↗',
      },
      {
        id: 'leetcode',
        title: 'LeetCode',
        category: 'External',
        description: `Algorithmic problem solving & DSA @${authoritativeProfile.leetcode.username}`,
        icon: <Code2 className="w-4 h-4 text-[#AAA398]" />,
        action: () => handleExternalLink(authoritativeProfile.leetcode.profileUrl),
        keywords: ['leetcode', 'dsa', 'algorithms', 'data structures', 'problem solving', 'competitive'],
        shortcut: '↗',
      },
      {
        id: 'contact',
        title: 'Contact',
        category: 'Navigation',
        description: 'Get in touch for engineering roles & collaborations',
        icon: <Mail className="w-4 h-4 text-[#D49A46]" />,
        action: () => handleScrollToSection('contact'),
        keywords: ['contact', 'email', 'message', 'hire', 'phone', 'location', 'reach out'],
        shortcut: '10',
      },
      {
        id: 'ask-jhansi',
        title: 'Ask Jhansi',
        category: 'AI & Tools',
        description: 'AI Portfolio Copilot powered by Gemini',
        icon: <Sparkles className="w-4 h-4 text-[#E5BA70]" />,
        action: handleOpenAskJhansi,
        keywords: ['ask jhansi', 'ai', 'copilot', 'assistant', 'chat', 'gemini', 'questions', 'bot'],
        shortcut: 'AI',
      },
    ],
    [location.pathname]
  );

  // Filter commands by search query
  const filteredCommands = useMemo(() => {
    if (!searchQuery.trim()) return commands;
    const query = searchQuery.toLowerCase().trim();
    return commands.filter((cmd) => {
      const matchTitle = cmd.title.toLowerCase().includes(query);
      const matchDescription = cmd.description?.toLowerCase().includes(query);
      const matchKeywords = cmd.keywords.some((kw) => kw.toLowerCase().includes(query));
      const matchCategory = cmd.category.toLowerCase().includes(query);
      return matchTitle || matchDescription || matchKeywords || matchCategory;
    });
  }, [commands, searchQuery]);

  // Reset selected index when filtered list changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCommands]);

  // Global keyboard shortcut: Cmd+K / Ctrl+K opens Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Listen for custom trigger event
  useEffect(() => {
    const handleOpenTrigger = () => {
      setIsOpen(true);
    };
    window.addEventListener('open-command-palette', handleOpenTrigger);
    return () => window.removeEventListener('open-command-palette', handleOpenTrigger);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle arrow keys and Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      id="command-palette-backdrop"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#090907]/80 backdrop-blur-md transition-opacity duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOpen(false);
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div
        id="command-palette-modal"
        className="w-full max-w-2xl bg-[#11110E] border border-[#2D2A22] rounded-xs shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col text-[#F2EBDD] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#292720] bg-[#14130F] gap-3">
          <Search className="w-4 h-4 text-[#D49A46] shrink-0" />
          <input
            ref={inputRef}
            id="command-palette-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search portfolio..."
            className="flex-1 bg-transparent border-none text-sm sm:text-base font-sans text-[#F2EBDD] placeholder:text-[#68645C] focus:outline-none"
            autoComplete="off"
            spellCheck="false"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 text-[#68645C] hover:text-[#F2EBDD] transition-colors rounded-xs"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] text-[#888175] bg-[#1C1B16] border border-[#292720] px-1.5 py-0.5 rounded-xs">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          id="command-palette-list"
          className="max-h-[60vh] sm:max-h-96 overflow-y-auto p-2 space-y-1 divide-y divide-[#201F19]/40"
          role="listbox"
        >
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-[#68645C] font-mono text-xs">
              <p>No commands matching &quot;{searchQuery}&quot;</p>
              <p className="text-[11px] text-[#4A473F] mt-1">
                Try searching for &quot;Projects&quot;, &quot;Resume&quot;, &quot;Experience&quot;, or &quot;Ask Jhansi&quot;
              </p>
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  data-index={idx}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2.5 rounded-xs text-left cursor-pointer transition-all duration-150',
                    isSelected
                      ? 'bg-[#1C1A14] text-[#F2EBDD] border-l-2 border-[#D49A46] pl-2.5'
                      : 'hover:bg-[#151410] text-[#AAA398]'
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div
                      className={cn(
                        'p-2 rounded-xs border transition-colors shrink-0',
                        isSelected
                          ? 'bg-[#24211A] border-[#D49A46]/40 text-[#E5BA70]'
                          : 'bg-[#14130F] border-[#292720] text-[#AAA398]'
                      )}
                    >
                      {cmd.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            'font-medium text-xs sm:text-sm tracking-wide',
                            isSelected ? 'text-[#F2EBDD]' : 'text-[#D5CFC4]'
                          )}
                        >
                          {cmd.title}
                        </span>
                        <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded-xs bg-[#171612] text-[#68645C] border border-[#24221C]">
                          {cmd.category}
                        </span>
                      </div>
                      {cmd.description && (
                        <p className="text-[11px] text-[#68645C] truncate mt-0.5 font-light">
                          {cmd.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {cmd.shortcut && (
                      <span className="font-mono text-[10px] text-[#888175] px-1.5 py-0.5 rounded-xs bg-[#14130F] border border-[#24221C]">
                        {cmd.shortcut}
                      </span>
                    )}
                    {isSelected && (
                      <CornerDownLeft className="w-3.5 h-3.5 text-[#D49A46] shrink-0" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Command Palette Footer */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-[#292720] bg-[#0E0E0B] font-mono text-[10px] text-[#68645C]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-[#171612] border border-[#24221C] rounded-xs text-[#AAA398]">↑</kbd>
              <kbd className="px-1 py-0.5 bg-[#171612] border border-[#24221C] rounded-xs text-[#AAA398]">↓</kbd>
              <span className="ml-1">Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-[#171612] border border-[#24221C] rounded-xs text-[#AAA398]">↵</kbd>
              <span className="ml-1">Select</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-[#171612] border border-[#24221C] rounded-xs text-[#AAA398]">ESC</kbd>
              <span className="ml-1">Close</span>
            </span>
          </div>

          <div className="flex items-center gap-1 text-[#888175]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" />
            <span>QUICK NAVIGATION</span>
          </div>
        </div>
      </div>
    </div>
  );
};
