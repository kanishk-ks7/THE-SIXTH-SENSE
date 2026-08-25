import React from 'react';
import { 
  Flame, 
  Sparkles, 
  Target, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Zap, 
  TrendingUp,
  ChevronRight
} from 'lucide-react';

const ICON_MAP = {
  Sparkles,
  Target,
  Award,
  BookOpen,
  Flame,
  Zap
};

export const MotivationWidget = ({ motivationStats }) => {
  if (!motivationStats) return null;

  const { streak, streakLabel, milestoneBadges, encouragingMessage } = motivationStats;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-dark-surface via-dark-card to-dark-surface border border-dark-border p-4 sm:p-5 shadow-lg">
      {/* Background Subtle Glow */}
      <div className="absolute top-0 right-1/4 w-72 h-32 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-48 h-20 bg-volt/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Left: Streak Counter & Dynamic Encouraging Message */}
        <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
          
          {/* Flame Streak Chip */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-gradient-to-br from-amber-500/20 via-orange-500/15 to-transparent border border-amber-500/30 text-amber-300 shadow-glow-sm flex-shrink-0">
            <div className="relative">
              <Flame className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
            </div>
            <div className="text-left leading-none">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/80 block mb-0.5">
                Active Streak
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-white font-display">
                {streakLabel}
              </span>
            </div>
          </div>

          {/* Encouraging Context Message */}
          <div className="space-y-0.5 min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-volt uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Momentum Coach</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 font-medium truncate sm:whitespace-normal">
              {encouragingMessage}
            </p>
          </div>
        </div>

        {/* Right: Milestone Badges Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 flex-shrink-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 hidden sm:inline-block mr-1">
            Milestones:
          </span>
          {milestoneBadges.map((badge) => {
            const IconComponent = ICON_MAP[badge.icon] || Award;
            const isEarned = badge.isEarned;

            return (
              <div
                key={badge.id}
                title={`${badge.title}: ${badge.description}`}
                className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-200 ${
                  isEarned
                    ? 'bg-volt/15 border-volt/40 text-volt shadow-glow-sm'
                    : 'bg-dark-bg/80 border-dark-border text-slate-400 opacity-60 hover:opacity-100 hover:border-slate-600'
                }`}
              >
                <div className={`p-1 rounded-lg ${isEarned ? 'bg-volt/20 text-volt' : 'bg-dark-surface text-slate-500'}`}>
                  <IconComponent className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] whitespace-nowrap font-medium text-slate-200">
                  {badge.title}
                </span>
                {isEarned && (
                  <CheckCircle2 className="w-3 h-3 text-volt flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default MotivationWidget;
