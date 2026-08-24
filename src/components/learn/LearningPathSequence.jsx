import React from 'react';
import { 
  CheckCircle2, 
  Lock, 
  Play, 
  Sparkles, 
  BookOpen, 
  Target, 
  Compass, 
  Award,
  ChevronRight
} from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const STAGE_ICONS = {
  rules: BookOpen,
  fundamentals: Sparkles,
  techniques: Target,
  strategy: Compass,
  advanced: Award
};

export const LearningPathSequence = ({
  pathStages = [],
  onSelectLesson
}) => {
  return (
    <Card className="space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-dark-border/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
              Mastery Roadmap
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Sequential Progression</span>
          </div>
          <h3 className="text-lg font-bold text-white font-display">
            Official 5-Stage Learning Path
          </h3>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-volt" />
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-400 animate-ping" />
            <span className="text-brand-300 font-medium">Current</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
            <span>Locked</span>
          </div>
        </div>
      </div>

      {/* Path Sequence Stepper Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 pt-2">
        {pathStages.map((stage, idx) => {
          const Icon = STAGE_ICONS[stage.category] || Sparkles;
          const isCompleted = stage.status === 'completed';
          const isCurrent = stage.status === 'current';
          const isAvailable = stage.status === 'available';
          const isLocked = stage.status === 'locked';

          let borderClass = 'border-dark-border/80 bg-dark-bg/60';
          let iconBgClass = 'bg-dark-surface text-slate-500';
          let statusBadge = null;

          if (isCompleted) {
            borderClass = 'border-volt/40 bg-dark-surface/90 hover:border-volt';
            iconBgClass = 'bg-volt/20 text-volt';
            statusBadge = (
              <span className="flex items-center gap-1 text-[10px] font-bold text-volt">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Done
              </span>
            );
          } else if (isCurrent) {
            borderClass = 'border-brand-500 bg-brand-500/10 shadow-glow-sm hover:bg-brand-500/15';
            iconBgClass = 'bg-brand-500 text-dark-bg';
            statusBadge = (
              <span className="px-2 py-0.5 rounded-md bg-brand-500 text-dark-bg text-[10px] font-black uppercase tracking-wider">
                Current
              </span>
            );
          } else if (isAvailable) {
            borderClass = 'border-slate-700 bg-dark-surface/60 hover:border-slate-500';
            iconBgClass = 'bg-dark-surface text-slate-300';
            statusBadge = (
              <span className="text-[10px] text-slate-400 font-medium">Available</span>
            );
          } else {
            borderClass = 'border-dark-border/40 bg-dark-bg/40 opacity-70';
            iconBgClass = 'bg-dark-surface/40 text-slate-600';
            statusBadge = (
              <span className="flex items-center gap-1 text-[10px] text-slate-500">
                <Lock className="w-3 h-3" />
                Locked
              </span>
            );
          }

          return (
            <button
              key={stage.stageNumber}
              type="button"
              disabled={isLocked || !stage.lesson}
              onClick={() => stage.lesson && onSelectLesson(stage.lesson)}
              className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 group relative ${borderClass} ${
                isLocked ? 'cursor-not-allowed' : 'cursor-pointer hover:-translate-y-0.5'
              }`}
            >
              <div>
                {/* Stage Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className={`p-2 rounded-xl transition-transform ${iconBgClass} ${!isLocked ? 'group-hover:scale-105' : ''}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {statusBadge}
                </div>

                <div className="space-y-1 mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    Stage 0{stage.stageNumber}
                  </span>
                  <h4 className="text-sm font-bold text-white font-display group-hover:text-brand-300 transition-colors">
                    {stage.shortTitle}
                  </h4>
                </div>

                {stage.lesson && (
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {stage.lesson.title}
                  </p>
                )}
              </div>

              <div className="pt-3 mt-3 border-t border-dark-border/40 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">
                  {stage.lesson ? stage.lesson.duration : '10 mins'}
                </span>
                {!isLocked && (
                  <span className="text-brand-400 group-hover:text-brand-300 font-semibold flex items-center gap-0.5">
                    <span>{isCompleted ? 'Review' : 'Start'}</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

    </Card>
  );
};

export default LearningPathSequence;
