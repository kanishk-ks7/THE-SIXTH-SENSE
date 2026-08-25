import React from 'react';
import { 
  CheckCircle2, 
  Lock, 
  Play, 
  Sparkles, 
  Zap, 
  Clock, 
  ArrowRight,
  TrendingUp,
  Layers,
  ChevronRight
} from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

export const ProgressPathwayChart = ({ 
  chartData, 
  sport = 'Basketball',
  onSelectLesson 
}) => {
  if (!chartData) return null;

  const {
    overallPercent = 0,
    completedCount = 0,
    totalCount = 0,
    completedTopics = [],
    currentTopic = null,
    nextTopics = [],
    categoryBreakdown = []
  } = chartData;

  // SVG Circular Ring Calculation
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallPercent / 100) * circumference;

  return (
    <div className="rounded-3xl bg-dark-surface border border-dark-border p-5 sm:p-6 shadow-xl space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-dark-border/70">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-volt flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              Visual Curriculum Progress
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">{sport} Mastery Trajectory</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white font-display">
            Progress Chart & Topic Pathway
          </h3>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-volt" />
            <span className="text-slate-300 font-medium">{completedCount} Completed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-400 animate-ping" />
            <span className="text-brand-300 font-medium">1 Current</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
            <span className="text-slate-400">{nextTopics.length} Upcoming</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Radial Ring + Category Bars | Right Visual Topic Pathway */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left Column: Circular Progress Ring & Category Breakdown (5 Cols) */}
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center gap-6 p-4 rounded-2xl bg-dark-bg/60 border border-dark-border/60">
          
          {/* Circular SVG Ring */}
          <div className="relative flex items-center justify-center flex-shrink-0">
            <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 96 96">
              {/* Background Track */}
              <circle
                cx="48"
                cy="48"
                r={radius}
                className="text-dark-card stroke-current"
                strokeWidth="8"
                fill="transparent"
              />
              {/* Animated Value Ring */}
              <circle
                cx="48"
                cy="48"
                r={radius}
                className="text-volt stroke-current transition-all duration-1000 ease-out"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Inner Percentage Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black text-white font-display tracking-tight">
                {overallPercent}%
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Mastered
              </span>
            </div>
          </div>

          {/* Quick Metrics & Category Mini-Bars */}
          <div className="w-full space-y-3">
            <div className="flex items-center justify-between text-xs pb-1 border-b border-dark-border/40">
              <span className="text-slate-400">Total Curriculum:</span>
              <span className="font-bold text-white">{completedCount} of {totalCount} Topics</span>
            </div>

            {/* Category Mini-Bars */}
            <div className="space-y-2">
              {categoryBreakdown.slice(0, 4).map((cat) => (
                <div key={cat.category} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-300 truncate max-w-[130px] capitalize">
                      {cat.label.split('&')[0]}
                    </span>
                    <span className="font-mono text-slate-400 text-[10px]">
                      {cat.completed}/{cat.total}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-dark-card overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-brand-500 to-volt rounded-full transition-all duration-500"
                      style={{ width: `${cat.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Visual Topic Pathway (Completed -> Current -> Upcoming) (8 Cols) */}
        <div className="lg:col-span-8 space-y-3">
          
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Visual Learning Trajectory</span>
            <span className="text-slate-500 text-[11px]">Step-by-step roadmap</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* 1. Topics Completed Box */}
            <div className="p-3.5 rounded-2xl bg-dark-bg/80 border border-volt/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-volt flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Completed ({completedTopics.length})
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-volt/15 text-volt font-bold">
                    Done
                  </span>
                </div>

                {completedTopics.length > 0 ? (
                  <div className="space-y-2">
                    {completedTopics.slice(0, 2).map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => onSelectLesson && onSelectLesson(item)}
                        className="w-full text-left p-2 rounded-xl bg-dark-card/60 hover:bg-dark-card border border-dark-border/40 hover:border-volt/40 transition-all group"
                      >
                        <p className="text-xs font-bold text-white group-hover:text-volt truncate">
                          {item.title}
                        </p>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-2.5 h-2.5" />
                          {item.duration} • Review
                        </span>
                      </button>
                    ))}
                    {completedTopics.length > 2 && (
                      <span className="text-[10px] text-slate-500 italic block pl-1">
                        +{completedTopics.length - 2} more completed
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="p-3 text-center bg-dark-card/30 rounded-xl border border-dashed border-dark-border/60">
                    <p className="text-[11px] text-slate-400">No lessons completed yet.</p>
                  </div>
                )}
              </div>

              <div className="pt-2 mt-2 border-t border-dark-border/40 text-[10px] text-volt font-semibold">
                Foundation Set ✓
              </div>
            </div>

            {/* 2. Current Active Topic Box */}
            <div className="p-3.5 rounded-2xl bg-brand-500/10 border-2 border-brand-500/80 shadow-glow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/20 rounded-full blur-xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-300 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-brand-400 animate-bounce" />
                    Current Focus
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-brand-500 text-dark-bg font-black uppercase tracking-wider">
                    Active
                  </span>
                </div>

                {currentTopic ? (
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-xl bg-dark-card/90 border border-brand-500/40">
                      <span className="text-[10px] text-brand-300 font-mono font-bold uppercase block mb-0.5">
                        {currentTopic.category}
                      </span>
                      <h4 className="text-xs font-bold text-white leading-snug line-clamp-2">
                        {currentTopic.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1.5">
                        <Clock className="w-3 h-3" />
                        <span>{currentTopic.duration}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-300">All core topics complete!</p>
                )}
              </div>

              {currentTopic && (
                <button
                  type="button"
                  onClick={() => onSelectLesson && onSelectLesson(currentTopic)}
                  className="mt-3 w-full py-1.5 px-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-dark-bg text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start Current Topic</span>
                </button>
              )}
            </div>

            {/* 3. What's Coming Next Box */}
            <div className="p-3.5 rounded-2xl bg-dark-bg/60 border border-dark-border flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                    Up Next ({nextTopics.length})
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-dark-card border border-dark-border text-slate-400">
                    Locked
                  </span>
                </div>

                {nextTopics.length > 0 ? (
                  <div className="space-y-2">
                    {nextTopics.slice(0, 2).map((item, idx) => (
                      <div
                        key={item.id}
                        className="p-2 rounded-xl bg-dark-card/40 border border-dark-border/40 opacity-70"
                      >
                        <p className="text-xs font-medium text-slate-300 truncate">
                          {idx + 1}. {item.title}
                        </p>
                        <span className="text-[10px] text-slate-500 capitalize block mt-0.5">
                          {item.category} • {item.duration}
                        </span>
                      </div>
                    ))}
                    {nextTopics.length > 2 && (
                      <span className="text-[10px] text-slate-500 block pl-1">
                        +{nextTopics.length - 2} more upcoming
                      </span>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">No further topics pending.</p>
                )}
              </div>

              <div className="pt-2 mt-2 border-t border-dark-border/40 text-[10px] text-slate-500">
                Unlocks as you progress
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProgressPathwayChart;
