import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export interface ProjectVisualStackProps {
  projectId: string;
  isHovered: boolean;
  isMobileActive?: boolean;
}

export const ProjectVisualStack: React.FC<ProjectVisualStackProps> = ({
  projectId,
  isHovered,
  isMobileActive = false,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const isActive = isHovered || isMobileActive;

  if (projectId === 'respiratory-ai') {
    return (
      <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] select-none group/visual">
        {/* Layer 1: Base Acoustic Signal Processing & Spectrogram Schematic */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : isActive
              ? { x: -3, y: -3 }
              : { x: 0, y: 0 }
          }
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full rounded-xs bg-[#0E0D0A] border border-[#24221C] overflow-hidden p-4 sm:p-5 flex flex-col justify-between transition-colors duration-300 group-hover/visual:border-[#38352C]"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-[#201F19] pb-2.5">
            <div className="flex items-center gap-2">
              <span
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                  isActive ? 'bg-[#D49A46]' : 'bg-[#68645C]'
                }`}
              />
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[#8E887D]">
                SYS_01 // MEL-SPECTROGRAM &amp; SSL INFERENCE
              </span>
            </div>
            <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-[#55524B]">
              44.1 kHz // STFT
            </span>
          </div>

          {/* Central Waveform & Spectrogram Schematic */}
          <div className="my-auto py-2">
            <svg
              className="w-full h-24 sm:h-32 text-[#D49A46]"
              viewBox="0 0 340 120"
              fill="none"
              preserveAspectRatio="none"
            >
              {/* Grid Lines */}
              <line x1="0" y1="20" x2="340" y2="20" stroke="#1F1D17" strokeWidth="0.75" />
              <line x1="0" y1="60" x2="340" y2="60" stroke="#1F1D17" strokeWidth="0.75" />
              <line x1="0" y1="100" x2="340" y2="100" stroke="#1F1D17" strokeWidth="0.75" />

              {/* Spectral Heatmap Columns */}
              <rect x="20" y="25" width="22" height="70" fill="#D49A46" fillOpacity="0.08" />
              <rect x="50" y="35" width="22" height="60" fill="#D49A46" fillOpacity="0.14" />
              <rect x="80" y="20" width="26" height="75" fill="#D49A46" fillOpacity="0.22" />
              <rect x="115" y="40" width="20" height="55" fill="#D49A46" fillOpacity="0.12" />
              <rect x="145" y="15" width="28" height="80" fill="#D49A46" fillOpacity="0.30" />
              <rect x="180" y="30" width="24" height="65" fill="#D49A46" fillOpacity="0.18" />
              <rect x="215" y="20" width="30" height="75" fill="#D49A46" fillOpacity="0.25" />
              <rect x="255" y="45" width="22" height="50" fill="#D49A46" fillOpacity="0.10" />
              <rect x="285" y="25" width="25" height="70" fill="#D49A46" fillOpacity="0.16" />

              {/* Primary Frequency Waveform */}
              <path
                d="M 10 60 Q 30 15 50 60 T 90 60 T 130 95 T 170 20 T 210 60 T 250 100 T 290 40 T 330 60"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                className="transition-all duration-300"
              />
              <path
                d="M 10 60 Q 30 35 50 60 T 90 60 T 130 80 T 170 40 T 210 60 T 250 85 T 290 50 T 330 60"
                stroke="#E5BA70"
                strokeWidth="0.75"
                strokeOpacity="0.5"
                strokeLinecap="round"
              />

              {/* Active Audio Sample Node */}
              <circle cx="170" cy="20" r="3" fill="#D49A46" />
              <line x1="170" y1="20" x2="170" y2="105" stroke="#D49A46" strokeWidth="0.75" strokeDasharray="2 2" strokeOpacity="0.7" />
            </svg>
          </div>

          {/* Footer Metadata */}
          <div className="flex items-center justify-between pt-2 border-t border-[#1C1B15] font-mono text-[8px] sm:text-[9px] text-[#68645C]">
            <span>FEATURE MAP: 1280 (EFFICIENTNET-B0)</span>
            <span className="text-[#D49A46]">SSL_REPRESENTATION // ACTIVE</span>
          </div>
        </motion.div>

        {/* Layer 2: Editorial Floating Inspector Pane (XAI Saliency & Attribution) */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : isActive
              ? { x: 4, y: 4 }
              : { x: 0, y: 0 }
          }
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -bottom-3 -right-2 sm:-bottom-4 sm:-right-4 w-[65%] sm:w-[58%] rounded-xs bg-[#14130F]/95 border border-[#2E2B23] p-3 shadow-xl backdrop-blur-xs transition-colors duration-300 group-hover/visual:border-[#D49A46]/40"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-[8px] sm:text-[9px] text-[#AAA398] uppercase font-medium tracking-wide">
              XAI ATTRIBUTION
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] text-[#D49A46] font-bold">
              GRAD-CAM 94.2%
            </span>
          </div>
          <div className="h-1 w-full bg-[#201F19] rounded-full overflow-hidden mb-2">
            <div className="h-full bg-[#D49A46] w-[94.2%]" />
          </div>
          <p className="font-mono text-[8px] sm:text-[9px] text-[#787368] leading-tight">
            Localized adventitious sound regions identified on spectrogram
          </p>
        </motion.div>

        {/* Corner Framing Markers */}
        <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t border-l border-[#D49A46]/40 pointer-events-none" />
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t border-r border-[#D49A46]/40 pointer-events-none" />
      </div>
    );
  }

  // Project 02: Full-Stack Pizza Ordering Platform (Editorial Decoupled Architecture)
  return (
    <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] select-none group/visual">
      {/* Layer 1: Base Architectural Schematic & Decoupled Pipeline */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : isActive
            ? { x: -3, y: -3 }
            : { x: 0, y: 0 }
        }
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full h-full rounded-xs bg-[#0E0D0A] border border-[#24221C] overflow-hidden p-4 sm:p-5 flex flex-col justify-between transition-colors duration-300 group-hover/visual:border-[#38352C]"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-[#201F19] pb-2.5">
          <div className="flex items-center gap-2">
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                isActive ? 'bg-[#D49A46]' : 'bg-[#68645C]'
              }`}
            />
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[#8E887D]">
              SYS_02 // DECOUPLED FULL-STACK ENGINE
            </span>
          </div>
          <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-[#55524B]">
            REACT · EXPRESS · MONGODB
          </span>
        </div>

        {/* Central Architectural Schematic */}
        <div className="my-auto py-2">
          <svg
            className="w-full h-24 sm:h-32 text-[#D49A46]"
            viewBox="0 0 340 120"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* Background Grid Guidelines */}
            <line x1="0" y1="20" x2="340" y2="20" stroke="#1A1914" strokeWidth="0.75" />
            <line x1="0" y1="60" x2="340" y2="60" stroke="#1A1914" strokeWidth="0.75" />
            <line x1="0" y1="100" x2="340" y2="100" stroke="#1A1914" strokeWidth="0.75" />

            {/* Architecture Node 1: Client Application (Cart & Context) */}
            <rect x="12" y="22" width="82" height="42" rx="2" fill="#14130F" stroke="#2B2821" strokeWidth="1" />
            <rect x="12" y="22" width="82" height="12" rx="2" fill="#1C1B16" />
            <text x="18" y="31" fill="#D49A46" fontSize="7" fontFamily="IBM Plex Mono" fontWeight="600">CLIENT (REACT)</text>
            <text x="18" y="44" fill="#AAA398" fontSize="6.5" fontFamily="IBM Plex Mono">CART CONTEXT</text>
            <text x="18" y="55" fill="#68645C" fontSize="6" fontFamily="IBM Plex Mono">JWT SESSION</text>

            {/* Path 1: Client -> REST Gateway */}
            <path d="M 94 43 L 126 43" stroke="#D49A46" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.8" />
            <polygon points="126,43 121,40 121,46" fill="#D49A46" />

            {/* Architecture Node 2: REST Gateway & Auth / RBAC */}
            <rect x="128" y="16" width="94" height="54" rx="2" fill="#14130F" stroke="#3D372B" strokeWidth="1" />
            <rect x="128" y="16" width="94" height="12" rx="2" fill="#24211A" />
            <text x="134" y="25" fill="#F2EBDD" fontSize="7" fontFamily="IBM Plex Mono" fontWeight="600">EXPRESS REST API</text>
            <text x="134" y="38" fill="#D49A46" fontSize="6.5" fontFamily="IBM Plex Mono">AUTH &amp; RBAC GATE</text>
            <text x="134" y="49" fill="#AAA398" fontSize="6" fontFamily="IBM Plex Mono">BEARER TOKEN CHECK</text>
            <text x="134" y="60" fill="#68645C" fontSize="6" fontFamily="IBM Plex Mono">ROLE: USER / ADMIN</text>

            {/* Path 2: API -> Persistence & Payment */}
            <path d="M 222 36 L 248 28" stroke="#D49A46" strokeWidth="0.85" />
            <polygon points="248,28 243,26 244,32" fill="#D49A46" />
            <path d="M 222 50 L 248 58" stroke="#D49A46" strokeWidth="0.85" />
            <polygon points="248,58 244,54 243,60" fill="#D49A46" />

            {/* Architecture Node 3A: MongoDB */}
            <rect x="250" y="14" width="78" height="28" rx="2" fill="#14130F" stroke="#2B2821" strokeWidth="1" />
            <text x="256" y="24" fill="#D49A46" fontSize="7" fontFamily="IBM Plex Mono" fontWeight="600">MONGODB</text>
            <text x="256" y="35" fill="#8E887D" fontSize="6" fontFamily="IBM Plex Mono">USERS · ORDERS</text>

            {/* Architecture Node 3B: Razorpay Payment Gateway */}
            <rect x="250" y="46" width="78" height="28" rx="2" fill="#14130F" stroke="#2B2821" strokeWidth="1" />
            <text x="256" y="56" fill="#F2EBDD" fontSize="7" fontFamily="IBM Plex Mono" fontWeight="600">RAZORPAY</text>
            <text x="256" y="67" fill="#8E887D" fontSize="6" fontFamily="IBM Plex Mono">HMAC SIGNATURE</text>

            {/* Bottom Track: Order State Machine Flow */}
            <line x1="16" y1="92" x2="324" y2="92" stroke="#2E2B22" strokeWidth="1" />
            
            {/* Step 1: Placed */}
            <circle cx="34" cy="92" r="3" fill="#D49A46" />
            <text x="34" y="103" textAnchor="middle" fill="#AAA398" fontSize="6" fontFamily="IBM Plex Mono">PLACED</text>
            
            {/* Step 2: Confirmed */}
            <circle cx="102" cy="92" r="3" fill="#D49A46" />
            <text x="102" y="103" textAnchor="middle" fill="#D49A46" fontSize="6" fontFamily="IBM Plex Mono">CONFIRMED</text>

            {/* Step 3: Baking */}
            <circle cx="170" cy="92" r="3" fill="#68645C" />
            <text x="170" y="103" textAnchor="middle" fill="#8E887D" fontSize="6" fontFamily="IBM Plex Mono">BAKING</text>

            {/* Step 4: Out for Delivery */}
            <circle cx="238" cy="92" r="3" fill="#68645C" />
            <text x="238" y="103" textAnchor="middle" fill="#8E887D" fontSize="6" fontFamily="IBM Plex Mono">DISPATCHED</text>

            {/* Step 5: Delivered */}
            <circle cx="306" cy="92" r="3" fill="#68645C" />
            <text x="306" y="103" textAnchor="middle" fill="#8E887D" fontSize="6" fontFamily="IBM Plex Mono">DELIVERED</text>
          </svg>
        </div>

        {/* Footer Metadata */}
        <div className="flex items-center justify-between pt-2 border-t border-[#1C1B15] font-mono text-[8px] sm:text-[9px] text-[#68645C]">
          <span>PIPELINE: CLIENT → API → AUTH/RBAC → DB → PAYMENT → ORDER</span>
          <span className="text-[#D49A46]">HMAC_SHA256 // VERIFIED</span>
        </div>
      </motion.div>

      {/* Layer 2: Editorial Floating Inspector Pane (Cryptographic Security & RBAC Enforcement) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : isActive
            ? { x: 4, y: 4 }
            : { x: 0, y: 0 }
        }
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -bottom-3 -right-2 sm:-bottom-4 sm:-right-4 w-[72%] sm:w-[64%] rounded-xs bg-[#14130F]/95 border border-[#2E2B23] p-3 shadow-xl backdrop-blur-xs transition-colors duration-300 group-hover/visual:border-[#D49A46]/40"
      >
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-mono text-[8px] sm:text-[9px] text-[#AAA398] uppercase font-medium tracking-wide">
            TRANSACTION INTEGRITY
          </span>
          <span className="font-mono text-[8px] sm:text-[9px] text-[#D49A46] font-bold">
            HMAC SHA-256
          </span>
        </div>
        <div className="h-1 w-full bg-[#201F19] rounded-full overflow-hidden mb-2">
          <div className="h-full bg-[#D49A46] w-full" />
        </div>
        <p className="font-mono text-[8px] sm:text-[9px] text-[#787368] leading-tight">
          Server-side cryptographic signature validation enforces tamper-proof checkout transitions
        </p>
      </motion.div>

      {/* Corner Framing Markers */}
      <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t border-l border-[#D49A46]/40 pointer-events-none" />
      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t border-r border-[#D49A46]/40 pointer-events-none" />
    </div>
  );
};
