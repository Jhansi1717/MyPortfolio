import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import Markdown from 'react-markdown';
import {
  X,
  Send,
  RotateCcw,
  Sparkles,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Bot,
  User,
  CornerDownLeft,
  ChevronDown,
  Loader2,
} from 'lucide-react';
import { ChatMessage } from '../../types/copilot';

const SUGGESTED_QUESTIONS = [
  'What AI projects has Jhansi built?',
  'Explain the Respiratory AI project.',
  'What technologies does Jhansi use?',
  'Where can I find her code?',
  "What is Jhansi's CGPA?",
  'What was her internship role?',
];

export const AskJhansi: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastUserMessage, setLastUserMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  // Listen for open-ask-jhansi custom event from other UI triggers
  useEffect(() => {
    const handleOpenTrigger = () => setIsOpen(true);
    window.addEventListener('open-ask-jhansi', handleOpenTrigger);
    return () => window.removeEventListener('open-ask-jhansi', handleOpenTrigger);
  }, []);

  // Keyboard shortcut: Cmd+J / Ctrl+J toggles copilot, Esc closes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Intercept links inside markdown
  const handleInternalLink = (href: string) => {
    if (href.startsWith('#')) {
      const targetId = href.replace('#', '');
      if (location.pathname !== '/') {
        navigate(`/${href}`);
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      // On mobile screens, auto minimize or close panel to reveal section
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    } else if (href.startsWith('/projects')) {
      navigate(href);
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    setInput('');
    setErrorMessage(null);
    setLastUserMessage(query);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Prepare conversational history for server API
      const history = messages
        .filter((m) => !m.error)
        .map((m) => ({
          role: m.role,
          text: m.text,
        }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const failureText =
          data?.error || 'Unable to communicate with Gemini API. Please check server configuration.';
        setErrorMessage(failureText);
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            role: 'model',
            text: failureText,
            timestamp: Date.now(),
            error: true,
          },
        ]);
        return;
      }

      const replyText = data.text || "That information isn't included in Jhansi's portfolio.";

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'model',
          text: replyText,
          timestamp: Date.now(),
        },
      ]);
    } catch (err: any) {
      console.error('Copilot request failed:', err);
      const networkError = 'Network communication failure. Please check your connection and retry.';
      setErrorMessage(networkError);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'model',
          text: networkError,
          timestamp: Date.now(),
          error: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (!lastUserMessage) return;
    // Remove the trailing error message if present
    setMessages((prev) => {
      const copy = [...prev];
      if (copy.length > 0 && copy[copy.length - 1].error) {
        copy.pop();
      }
      return copy;
    });
    handleSendMessage(lastUserMessage);
  };

  const handleClearConversation = () => {
    setMessages([]);
    setErrorMessage(null);
    setLastUserMessage(null);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          id="ask-jhansi-trigger"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-full text-xs font-mono font-medium tracking-wider uppercase transition-all duration-300 shadow-xl border cursor-pointer ${
            isOpen
              ? 'bg-[#E5BA70] text-[#090907] border-[#E5BA70] shadow-[#E5BA70]/20'
              : 'bg-[#14130F] text-[#F2EBDD] border-[#38352A] hover:border-[#D49A46] hover:text-[#E5BA70] shadow-black/80'
          }`}
          aria-label="Open Jhansi AI Portfolio Assistant"
        >
          <div className="relative flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#D49A46]" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
            </span>
          </div>
          <div className="flex flex-col items-start leading-tight">
            <span className="font-bold">JHANSI AI</span>
            <span className="text-[9px] text-[#A39E93] tracking-normal lowercase font-sans">portfolio assistant</span>
          </div>
        </motion.button>
      </div>

      {/* Copilot Drawer / Bottom Sheet */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile devices */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 md:hidden"
            />

            {/* Main Panel Container */}
            <motion.aside
              id="ask-jhansi-panel"
              role="dialog"
              aria-label="Ask Jhansi AI Copilot"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40, x: 0 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, x: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40, x: 0 }}
              transition={shouldReduceMotion ? { duration: 0.2 } : { type: 'spring', damping: 25, stiffness: 280 }}
              className="fixed inset-x-0 bottom-0 max-h-[88vh] h-[85vh] md:h-[680px] md:max-h-[85vh] md:inset-x-auto md:right-6 md:bottom-20 md:w-[460px] bg-[#0E0D0A] border border-[#2D2A22] rounded-t-2xl md:rounded-xl shadow-2xl flex flex-col z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="px-5 py-4 border-b border-[#29271E] bg-[#14130F] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#24221A] border border-[#38352A] flex items-center justify-center text-[#E5BA70]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold tracking-wide text-[#F2EBDD]">
                        ASK JHANSI
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10B981]/10 text-[#34D399] border border-[#10B981]/30 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
                        GROUNDED
                      </span>
                    </div>
                    <p className="text-[11px] text-[#A39E93] font-mono">
                      Portfolio Knowledge Copilot
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {messages.length > 0 && (
                    <button
                      onClick={handleClearConversation}
                      title="Clear Conversation"
                      className="p-1.5 rounded text-[#A39E93] hover:text-[#F2EBDD] hover:bg-[#24221A] transition-colors cursor-pointer"
                      aria-label="Clear Conversation"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    title="Close Copilot"
                    className="p-1.5 rounded text-[#A39E93] hover:text-[#F2EBDD] hover:bg-[#24221A] transition-colors cursor-pointer"
                    aria-label="Close Ask Jhansi"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Security & Grounding Policy Notice */}
              <div className="px-4 py-2 bg-[#12110D] border-b border-[#222018] flex items-center justify-between text-[11px] text-[#8C867A] shrink-0 font-mono">
                <div className="flex items-center gap-1.5 truncate">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D49A46] shrink-0" />
                  <span className="truncate">Grounded strictly in approved portfolio data</span>
                </div>
                <span className="text-[10px] text-[#736F66] shrink-0">gemini-3.8-flash</span>
              </div>

              {/* Message Feed Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-sm selection:bg-[#D49A46]/20">
                {/* Empty State / Welcome Screen */}
                {messages.length === 0 && (
                  <div className="py-6 px-2 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-[#1F1D17] border border-[#38352A] flex items-center justify-center text-[#E5BA70] mb-3 shadow-inner">
                      <Bot className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm sm:text-base font-medium text-[#F2EBDD] mb-2 leading-relaxed">
                      Welcome. I’m Jhansi’s AI portfolio assistant. Ask me about his projects, skills, education, experience, or technical work.
                    </h3>
                    <p className="text-xs text-[#A39E93] max-w-xs mb-6 leading-relaxed">
                      Grounded strictly in verified portfolio data across AI systems, machine learning, and full-stack engineering.
                    </p>

                    <div className="w-full text-left">
                      <p className="text-[10px] uppercase font-mono tracking-wider text-[#736F66] mb-2 px-1">
                        SUGGESTED QUESTIONS
                      </p>
                      <div className="flex flex-col gap-2">
                        {SUGGESTED_QUESTIONS.map((q, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(q)}
                            className="w-full text-left px-3.5 py-2.5 rounded-lg bg-[#14130F] hover:bg-[#1E1C15] border border-[#26241C] hover:border-[#D49A46]/60 text-xs text-[#D6D0C4] hover:text-[#F2EBDD] transition-all duration-200 cursor-pointer flex items-center justify-between group"
                          >
                            <span className="truncate">{q}</span>
                            <CornerDownLeft className="w-3.5 h-3.5 text-[#736F66] group-hover:text-[#D49A46] shrink-0 ml-2 transition-colors" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Message Thread */}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.role === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] font-mono text-[#736F66]">
                      {msg.role === 'user' ? (
                        <>
                          <span>YOU</span>
                          <User className="w-3 h-3" />
                        </>
                      ) : (
                        <>
                          <Bot className="w-3 h-3 text-[#D49A46]" />
                          <span className="text-[#D49A46]">ASK JHANSI</span>
                        </>
                      )}
                    </div>

                    <div
                      className={`max-w-[88%] rounded-xl p-3.5 text-xs md:text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#1F1D17] text-[#F2EBDD] border border-[#38352A] rounded-tr-xs'
                          : msg.error
                          ? 'bg-[#261515] text-[#FCA5A5] border border-[#7F1D1D] rounded-tl-xs'
                          : 'bg-[#14130F] text-[#D6D0C4] border border-[#29271E] rounded-tl-xs shadow-sm'
                      }`}
                    >
                      {msg.role === 'user' ? (
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      ) : msg.error ? (
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                            <span>{msg.text}</span>
                          </div>
                          <button
                            onClick={handleRetry}
                            className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-950/60 hover:bg-red-900/60 border border-red-800 text-[11px] text-red-200 font-mono transition-colors cursor-pointer"
                          >
                            <RotateCcw className="w-3 h-3" /> Retry query
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Markdown
                            components={{
                              a: ({ href, children }) => {
                                if (!href) return <span>{children}</span>;
                                const isAnchor = href.startsWith('#');
                                const isInternalRoute =
                                  href.startsWith('/projects') || href.startsWith('/');
                                if (isAnchor || isInternalRoute) {
                                  return (
                                    <button
                                      onClick={() => handleInternalLink(href)}
                                      className="inline-flex items-center gap-1 font-mono text-[#E5BA70] underline underline-offset-2 hover:text-[#FFDF99] transition-colors cursor-pointer text-left"
                                    >
                                      {children}
                                    </button>
                                  );
                                }
                                return (
                                  <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 font-mono text-[#E5BA70] underline underline-offset-2 hover:text-[#FFDF99] transition-colors"
                                  >
                                    {children}
                                    <ExternalLink className="w-3 h-3 inline-block opacity-70" />
                                  </a>
                                );
                              },
                              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                              ul: ({ children }) => (
                                <ul className="list-disc pl-4 space-y-1 my-1.5">{children}</ul>
                              ),
                              ol: ({ children }) => (
                                <ol className="list-decimal pl-4 space-y-1 my-1.5">{children}</ol>
                              ),
                              li: ({ children }) => <li className="text-[#C4BEB1]">{children}</li>,
                              strong: ({ children }) => (
                                <strong className="font-semibold text-[#F2EBDD]">{children}</strong>
                              ),
                              code: ({ children }) => (
                                <code className="px-1.5 py-0.5 rounded bg-[#24221A] text-[#E5BA70] font-mono text-xs border border-[#38352A]">
                                  {children}
                                </code>
                              ),
                            }}
                          >
                            {msg.text}
                          </Markdown>

                          {/* Grounding Refusal indicator tag if refusal phrase detected */}
                          {msg.text.includes("isn't included in Jhansi's portfolio") && (
                            <div className="pt-2 border-t border-[#24221A] mt-2 flex items-center gap-1.5 text-[10px] font-mono text-[#A39E93]">
                              <ShieldCheck className="w-3 h-3 text-[#D49A46]" />
                              <span>Verified Portfolio Scope Limit</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] font-mono text-[#D49A46]">
                      <Bot className="w-3 h-3" />
                      <span>ASK JHANSI</span>
                    </div>
                    <div className="bg-[#14130F] border border-[#29271E] rounded-xl rounded-tl-xs p-3.5 flex items-center gap-2.5 text-xs text-[#A39E93]">
                      <Loader2 className="w-4 h-4 animate-spin text-[#D49A46]" />
                      <span>Consulting verified portfolio knowledge...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Bottom Quick Chips for Follow-up questions when chatting */}
              {messages.length > 0 && !isLoading && (
                <div className="px-3 py-1.5 bg-[#12110D] border-t border-[#222018] flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 text-[11px] font-mono">
                  <span className="text-[#736F66] shrink-0 text-[10px]">SUGGESTIONS:</span>
                  {SUGGESTED_QUESTIONS.slice(0, 3).map((sq, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(sq)}
                      className="shrink-0 px-2 py-1 rounded bg-[#1C1A14] hover:bg-[#25221B] text-[#A39E93] hover:text-[#E5BA70] border border-[#29271E] transition-colors whitespace-nowrap cursor-pointer"
                    >
                      {sq}
                    </button>
                  ))}
                </div>
              )}

              {/* Input Bar */}
              <div className="p-3 bg-[#14130F] border-t border-[#29271E] shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2 bg-[#0E0D0A] border border-[#38352A] focus-within:border-[#D49A46] rounded-lg px-3 py-1.5 transition-colors"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about projects, CGPA, internship..."
                    disabled={isLoading}
                    className="flex-1 bg-transparent text-xs md:text-sm text-[#F2EBDD] placeholder-[#736F66] outline-hidden disabled:opacity-50"
                  />

                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="p-1.5 rounded-md bg-[#E5BA70] text-[#090907] hover:bg-[#FFDF99] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer shrink-0"
                    aria-label="Send message"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
                <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-[#736F66] font-mono">
                  <span>Answers limited strictly to verified record</span>
                  <span className="hidden md:inline">Press Enter to send</span>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
