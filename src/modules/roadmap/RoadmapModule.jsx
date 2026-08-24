import React, { useState } from 'react';
import { 
  UserCheck, 
  ClipboardCheck, 
  Layers, 
  Crosshair, 
  Dumbbell, 
  Trophy, 
  Award, 
  Compass, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import ModuleContainer from '../../components/ui/ModuleContainer';
import { ROADMAP_MILESTONES } from '../../data/mockData';
import { useAthlete } from '../../context/AthleteContext';
import { Link } from 'react-router-dom';

/**
 * =========================================================================
 * TEAMMATE INTEGRATION MODULE: RoadmapModule
 * =========================================================================
 * Teammate Responsible: AI Career Roadmap & Recommendation Engine
 * 
 * Future Integration Guide:
 * - Generate customized milestone paths based on AI Assessment results.
 * - Dynamically calculate milestone unlock conditions (e.g. tests passed, hours logged).
 * - Stream personalized milestones from the backend API.
 * =========================================================================
 */
export const RoadmapModule = () => {
  const { athlete } = useAthlete();
  const [selectedMilestone, setSelectedMilestone] = useState(ROADMAP_MILESTONES[1]);

  const getMilestoneIcon = (iconName) => {
    switch (iconName) {
      case 'UserCheck': return UserCheck;
      case 'ClipboardCheck': return ClipboardCheck;
      case 'Layers': return Layers;
      case 'Crosshair': return Crosshair;
      case 'Dumbbell': return Dumbbell;
      case 'Trophy': return Trophy;
      case 'Award': return Award;
      case 'Compass': return Compass;
      default: return Sparkles;
    }
  };

  return (
    <ModuleContainer
      moduleName="RoadmapModule.jsx"
      assignedTo="AI Roadmap Teammate"
      status="Ready for Integration"
      description="Vertical milestone progression engine tracking the journey from novice to competitive athlete."
    >
      <div className="space-y-8">

        {/* Personalized Roadmap Banner Callout */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-900/40 via-dark-card to-dark-surface border border-brand-500/30 p-6 sm:p-8">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-brand-500/20 text-brand-accent">
                  <Sparkles className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-300">
                  AI Dynamic Pathway
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display">
                Personalized roadmap will appear here after assessment.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Your current pathway is tailored for <strong className="text-white">{athlete.sport || 'Football'}</strong> at the <strong className="text-white">{athlete.level || 'Beginner'}</strong> level. Complete your multi-pillar assessment to unlock the Foundation stage!
              </p>
            </div>

            <div className="flex-shrink-0">
              <Link to="/assessment">
                <Button variant="volt" size="md" icon={ArrowRight} iconPosition="right">
                  Complete Assessment
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Vertical Timeline & Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Vertical Roadmap Timeline (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between px-2 mb-2">
              <h3 className="text-base font-bold text-white font-display">
                Milestone Trajectory
              </h3>
              <span className="text-xs text-slate-400">
                Stage 2 of 8 Active
              </span>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-brand-500 before:to-dark-border">
              {ROADMAP_MILESTONES.map((item, index) => {
                const Icon = getMilestoneIcon(item.icon);
                const isSelected = selectedMilestone?.id === item.id;
                const isCompleted = item.status === 'completed';
                const isInProgress = item.status === 'in-progress';
                const isLocked = item.status === 'locked';

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedMilestone(item)}
                    className={`relative cursor-pointer transition-all duration-200 group`}
                  >
                    {/* Timeline Node Bullet */}
                    <div
                      className={`absolute -left-[29px] top-4 w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all ${
                        isCompleted
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-glow-sm'
                          : isInProgress
                          ? 'bg-brand-500 border-brand-accent text-slate-950 ring-4 ring-brand-500/20 shadow-glow-brand animate-pulse'
                          : 'bg-dark-bg border-slate-700 text-slate-600'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 font-bold" />
                      ) : isLocked ? (
                        <Lock className="w-3.5 h-3.5" />
                      ) : (
                        <span className="text-xs font-black">{item.id}</span>
                      )}
                    </div>

                    {/* Timeline Card */}
                    <div
                      className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                        isSelected
                          ? 'bg-dark-surface border-brand-500/60 shadow-lg shadow-cyan-950/30'
                          : 'bg-dark-surface/60 border-dark-border hover:border-slate-600 hover:bg-dark-surface/80'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2.5 rounded-xl border ${
                              isCompleted
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                : isInProgress
                                ? 'bg-brand-500/10 text-brand-400 border-brand-500/20'
                                : 'bg-slate-800/40 text-slate-500 border-slate-700/40'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                {item.stage}
                              </span>
                              {isInProgress && (
                                <Badge variant="volt" size="sm">
                                  Current Goal
                                </Badge>
                              )}
                            </div>
                            <h4 className="text-sm sm:text-base font-bold text-white font-display">
                              {item.title}
                            </h4>
                          </div>
                        </div>

                        <Badge
                          variant={isCompleted ? 'emerald' : isInProgress ? 'primary' : 'locked'}
                          size="sm"
                        >
                          {isCompleted ? 'Completed' : isInProgress ? 'In Progress' : 'Locked'}
                        </Badge>
                      </div>

                      <p className="text-xs text-slate-400 mt-2.5 line-clamp-2">
                        {item.description}
                      </p>

                      {isInProgress && (
                        <div className="mt-3 pt-3 border-t border-dark-border/40">
                          <ProgressBar value={item.progress} size="sm" color="brand" label="Stage Progress" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Milestone Inspector Drawer (Right 5 Cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-4">
              <Card className="p-6 border-brand-500/30 shadow-glow-sm">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-dark-border/60">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
                    Milestone Deep Dive
                  </span>
                  <Badge
                    variant={
                      selectedMilestone.status === 'completed'
                        ? 'emerald'
                        : selectedMilestone.status === 'in-progress'
                        ? 'primary'
                        : 'locked'
                    }
                  >
                    {selectedMilestone.status.toUpperCase()}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white font-display">
                      {selectedMilestone.title}
                    </h3>
                    <p className="text-xs text-brand-300 font-medium mt-0.5">
                      Stage: {selectedMilestone.stage}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {selectedMilestone.description}
                  </p>

                  <div className="p-3.5 rounded-xl bg-dark-bg/60 border border-dark-border/60 space-y-2">
                    <p className="text-[11px] font-bold uppercase text-slate-400">
                      Unlocking Criteria:
                    </p>
                    <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                      <li>Complete 4-pillar baseline assessment</li>
                      <li>Log at least {athlete.trainingHours || '4 hours/week'} training sessions</li>
                      <li>Achieve min 40% overall readiness score</li>
                    </ul>
                  </div>

                  <div className="pt-2">
                    {selectedMilestone.status === 'in-progress' ? (
                      <Link to="/assessment" className="w-full block">
                        <Button variant="primary" className="w-full" size="md">
                          Resume Current Stage
                        </Button>
                      </Link>
                    ) : selectedMilestone.status === 'locked' ? (
                      <Button variant="secondary" className="w-full" disabled size="md" icon={Lock}>
                        Stage Locked
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full" size="md" icon={CheckCircle2}>
                        Stage Verified & Completed
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </div>

        </div>

      </div>
    </ModuleContainer>
  );
};

export default RoadmapModule;
