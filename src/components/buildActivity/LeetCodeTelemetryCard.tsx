import React, { useState, useEffect } from 'react';
import {
  Code,
  ArrowUpRight,
  ArrowRight,
  ShieldAlert,
  CheckCircle,
  Hash,
  Award,
  Layers,
} from 'lucide-react';
import { LeetCodeTelemetryResponse } from '../../types/buildActivity';
import { Card } from '../primitives/Card';

export interface LeetCodeTelemetryCardProps {
  simulateLoading?: boolean;
  simulateUnavailable?: boolean;
}

export const LeetCodeTelemetryCard: React.FC<LeetCodeTelemetryCardProps> = ({
  simulateLoading = false,
  simulateUnavailable = false,
}) => {
  const [data, setData] = useState<LeetCodeTelemetryResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchLeetCode = async () => {
    setIsLoading(true);

    if (simulateLoading) {
      return;
    }

    if (simulateUnavailable) {
      setIsLoading(false);
      setData({
        status: 'unavailable',
        username: 'Jhansi_gopal',
        profileUrl: 'https://leetcode.com/u/Jhansi_gopal/',
        liveData: null,
      });
      return;
    }

    try {
      const response = await fetch('/api/leetcode');
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const json: LeetCodeTelemetryResponse = await response.json();
      setData(json);
    } catch (err) {
      console.warn('Unable to load live LeetCode data:', err);
      setData({
        status: 'unavailable',
        username: 'Jhansi_gopal',
        profileUrl: 'https://leetcode.com/u/Jhansi_gopal/',
        liveData: null,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeetCode();
  }, [simulateLoading, simulateUnavailable]);

  const profileUrl = 'https://leetcode.com/u/Jhansi_gopal/';

  // Loading Skeleton
  if (isLoading || simulateLoading) {
    return (
      <Card variant="surface" className="p-6 md:p-8 h-full flex flex-col justify-between" id="leetcode-telemetry-loading">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-[#1E1D18] rounded w-36" />
          <div className="h-7 bg-[#1E1D18] rounded w-48" />
          <div className="h-16 bg-[#14130F] rounded border border-[#24221C]" />
          <div className="h-24 bg-[#14130F] rounded border border-[#24221C]" />
        </div>
      </Card>
    );
  }

  const liveData = data?.liveData;
  const isLive = data?.status === 'success' && liveData !== null && liveData !== undefined;

  // Fallback Minimal View when live data is unavailable
  // Strictly adhering to: "Otherwise simply provide: LeetCode / View Profile →"
  if (!isLive) {
    return (
      <Card
        variant="surface"
        className="p-6 md:p-8 h-full flex flex-col justify-between"
        id="leetcode-telemetry-card"
        aria-label="LeetCode Algorithmic Problem Solving Profile"
      >
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#292720] mb-6">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#E5BA70] uppercase tracking-wider">
                LEETCODE TELEMETRY
              </span>
              <span className="text-[#68645C]">•</span>
              <span className="font-mono text-[11px] text-[#888175]">
                @Jhansi_gopal
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#68645C] uppercase">
              STATUS: PROFILE READY
            </span>
          </div>

          <div className="font-mono text-xs text-[#D49A46] uppercase tracking-widest mb-1">
            ALGORITHMIC PRACTICE
          </div>

          <h3 className="font-display text-3xl font-bold uppercase text-[#F2EBDD] tracking-tight mb-3">
            LeetCode
          </h3>

          <p className="text-xs sm:text-sm text-[#AAA398] leading-relaxed mb-6 font-light">
            Continuous algorithmic discipline focusing on data structures, computational graph traversal, dynamic programming, and complexity optimization.
          </p>

          <div className="p-4 rounded-xs bg-[#14130F] border border-[#24221C] mb-6">
            <div className="font-mono text-[11px] text-[#888175] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D49A46]" />
              <span>Direct profile inspection available on official platform</span>
            </div>
          </div>
        </div>

        <div>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-between w-full font-mono text-xs text-[#090907] bg-[#D49A46] hover:bg-[#E5BA70] font-bold px-4 py-3 rounded-xs transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D49A46]"
            aria-label="View Jhansi Gopal's profile on LeetCode"
          >
            <span>View Profile</span>
            <span className="text-sm">→</span>
          </a>
        </div>
      </Card>
    );
  }

  // Live Verified Telemetry View
  const { solved, ranking } = liveData;

  return (
    <Card
      variant="surface"
      className="p-6 md:p-8 h-full flex flex-col justify-between"
      id="leetcode-telemetry-card"
      aria-label="LeetCode Algorithmic Problem Solving Telemetry"
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#292720] mb-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#E5BA70] uppercase tracking-wider">
              LEETCODE TELEMETRY
            </span>
            <span className="text-[#68645C]">•</span>
            <span className="font-mono text-[11px] text-[#AAA398]">
              @{data.username}
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-xs bg-[#171612] border border-[#292720]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[10px] uppercase text-[#DCD6CA]">
              LIVE VERIFIED
            </span>
          </div>
        </div>

        <div className="font-mono text-xs text-[#D49A46] uppercase tracking-widest mb-1">
          ALGORITHMIC PRACTICE
        </div>

        <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#F2EBDD] tracking-tight mb-2">
          LeetCode
        </h3>

        <p className="text-xs text-[#AAA398] leading-relaxed mb-6 font-light">
          Verified solution submissions across fundamental data structures, computational reasoning, and algorithm optimization.
        </p>

        {/* Aggregate Solved Metric Block */}
        <div className="p-4 rounded-xs bg-[#14130F] border border-[#24221C] mb-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#68645C]">
              VERIFIED PROBLEMS SOLVED
            </span>
            <span className="font-mono text-xs text-[#D49A46]">
              COMPUTED LIVE
            </span>
          </div>
          <div className="font-mono text-3xl sm:text-4xl font-bold text-[#F2EBDD] mt-1">
            {solved.all.toString().padStart(2, '0')}
          </div>
        </div>

        {/* Solved by Difficulty Breakdown */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="p-3 rounded-xs bg-[#14130F] border border-[#24221C]">
            <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400 block mb-1">
              EASY
            </span>
            <span className="font-mono text-lg font-bold text-[#F2EBDD]">
              {solved.easy}
            </span>
          </div>

          <div className="p-3 rounded-xs bg-[#14130F] border border-[#24221C]">
            <span className="font-mono text-[9px] uppercase tracking-wider text-amber-400 block mb-1">
              MEDIUM
            </span>
            <span className="font-mono text-lg font-bold text-[#F2EBDD]">
              {solved.medium}
            </span>
          </div>

          <div className="p-3 rounded-xs bg-[#14130F] border border-[#24221C]">
            <span className="font-mono text-[9px] uppercase tracking-wider text-rose-400 block mb-1">
              HARD
            </span>
            <span className="font-mono text-lg font-bold text-[#F2EBDD]">
              {solved.hard}
            </span>
          </div>
        </div>

        {/* Global Ranking if available */}
        {ranking && (
          <div className="p-3 rounded-xs bg-[#14130F] border border-[#24221C] mb-6 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#68645C]">
              GLOBAL RANKING
            </span>
            <span className="font-mono text-xs font-bold text-[#D49A46]">
              #{ranking.toLocaleString()}
            </span>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-between w-full font-mono text-xs text-[#090907] bg-[#D49A46] hover:bg-[#E5BA70] font-bold px-4 py-3 rounded-xs transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D49A46]"
          aria-label="View Jhansi Gopal's profile on LeetCode in new tab"
        >
          <span>View Profile</span>
          <span className="text-sm">→</span>
        </a>
      </div>
    </Card>
  );
};
