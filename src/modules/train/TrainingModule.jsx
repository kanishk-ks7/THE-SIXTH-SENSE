import React, { useState } from 'react';
import { 
  Dumbbell, 
  Flame, 
  Clock, 
  Calendar, 
  CheckCircle, 
  Play, 
  Target, 
  Plus,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import Modal from '../../components/ui/Modal';
import ModuleContainer from '../../components/ui/ModuleContainer';
import { TRAINING_DRILLS } from '../../data/mockData';
import { useAthlete } from '../../context/AthleteContext';

/**
 * =========================================================================
 * TEAMMATE INTEGRATION MODULE: TrainingModule
 * =========================================================================
 * Teammate Responsible: Workout Planner, Drill Generator & Session Tracker
 * 
 * Future Integration Guide:
 * - Generate AI-adaptive daily and weekly drill schedules.
 * - Log completed workout sets, reps, sprint times, and heart rate metrics.
 * - Sync training hours automatically with profile stats.
 * =========================================================================
 */
export const TrainingModule = () => {
  const { athlete, showToast } = useAthlete();
  const [selectedDrill, setSelectedDrill] = useState(null);
  const [completedDrills, setCompletedDrills] = useState(['td-1']);

  const handleToggleComplete = (id, title) => {
    if (completedDrills.includes(id)) {
      setCompletedDrills(prev => prev.filter(d => d !== id));
      showToast(`Drill marked as pending: ${title}`);
    } else {
      setCompletedDrills(prev => [...prev, id]);
      showToast(`Great work! Completed drill: ${title}`);
    }
  };

  const todayDrills = TRAINING_DRILLS.filter(d => d.category === "Today's Training");
  const weeklyDrills = TRAINING_DRILLS.filter(d => d.category === 'Weekly Training');
  const recommendedDrills = TRAINING_DRILLS.filter(d => d.category === 'Recommended Drills');

  return (
    <ModuleContainer
      moduleName="TrainingModule.jsx"
      assignedTo="Training Engine Teammate"
      status="Ready for Integration"
      description="Adaptive workout routines, high-intensity drills, and sports conditioning tracker."
    >
      <div className="space-y-8">

        {/* Training Summary Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-dark-surface border border-dark-border flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium">Weekly Target</p>
              <h4 className="text-xl font-bold text-white font-display mt-0.5">{athlete.trainingHours || '4 hrs/week'}</h4>
            </div>
            <div className="p-2.5 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20">
              <Target className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-dark-surface border border-dark-border flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium">Active Streak</p>
              <h4 className="text-xl font-bold text-white font-display mt-0.5">4 Days 🔥</h4>
            </div>
            <div className="p-2.5 rounded-xl bg-volt/10 text-volt border border-volt/20">
              <Flame className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-dark-surface border border-dark-border flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium">Drills Completed</p>
              <h4 className="text-xl font-bold text-white font-display mt-0.5">{completedDrills.length} of {TRAINING_DRILLS.length}</h4>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-dark-surface border border-dark-border flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium">Focus Area</p>
              <h4 className="text-xl font-bold text-white font-display mt-0.5">Agility & Touch</h4>
            </div>
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Dumbbell className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Section 1: Today's Training */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-volt animate-ping" />
              Today's Training Schedule
            </h3>
            <span className="text-xs text-slate-400">Scheduled: 35 mins total</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {todayDrills.map((drill) => {
              const isDone = completedDrills.includes(drill.id);
              return (
                <Card
                  key={drill.id}
                  className={`border transition-all ${
                    isDone ? 'border-emerald-500/40 bg-emerald-950/10' : 'hover:border-brand-500/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={isDone ? 'emerald' : 'volt'} size="sm">
                          {drill.difficulty}
                        </Badge>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {drill.duration}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white font-display">
                        {drill.title}
                      </h4>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleComplete(drill.id, drill.title)}
                      className={`p-2 rounded-xl border transition-all ${
                        isDone
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                          : 'bg-dark-bg text-slate-400 border-dark-border hover:text-white'
                      }`}
                      title={isDone ? 'Mark Incomplete' : 'Mark Complete'}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                    {drill.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-dark-border/40 text-xs">
                    <span className="text-slate-400">Target: {drill.focus}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDrill(drill)}
                    >
                      View Training
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Section 2: Weekly & Recommended Drills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Schedule */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white font-display">
              Weekly Training Program
            </h3>
            <div className="space-y-3">
              {weeklyDrills.map((drill) => (
                <div
                  key={drill.id}
                  className="p-4 rounded-2xl bg-dark-surface border border-dark-border hover:border-slate-600 transition-all flex items-center justify-between gap-3"
                >
                  <div>
                    <span className="text-[10px] font-bold text-brand-400 uppercase tracking-wider">
                      {drill.focus}
                    </span>
                    <h4 className="text-sm font-bold text-white">{drill.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{drill.duration} • {drill.calories}</p>
                  </div>
                  <Button variant="secondary" size="sm" onClick={() => setSelectedDrill(drill)}>
                    Details
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Drills */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white font-display">
              Recommended Technique Drills
            </h3>
            <div className="space-y-3">
              {recommendedDrills.map((drill) => (
                <div
                  key={drill.id}
                  className="p-4 rounded-2xl bg-dark-surface border border-dark-border hover:border-slate-600 transition-all flex items-center justify-between gap-3"
                >
                  <div>
                    <span className="text-[10px] font-bold text-volt uppercase tracking-wider">
                      {drill.focus}
                    </span>
                    <h4 className="text-sm font-bold text-white">{drill.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{drill.duration} • {drill.difficulty}</p>
                  </div>
                  <Button variant="secondary" size="sm" onClick={() => setSelectedDrill(drill)}>
                    Details
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Drill Modal */}
        {selectedDrill && (
          <Modal
            isOpen={!!selectedDrill}
            onClose={() => setSelectedDrill(null)}
            title={selectedDrill.title}
            subtitle={`${selectedDrill.difficulty} • Duration: ${selectedDrill.duration}`}
            footer={
              <Button
                variant={completedDrills.includes(selectedDrill.id) ? 'secondary' : 'volt'}
                size="sm"
                onClick={() => {
                  handleToggleComplete(selectedDrill.id, selectedDrill.title);
                  setSelectedDrill(null);
                }}
              >
                {completedDrills.includes(selectedDrill.id) ? 'Mark Incomplete' : 'Log Drill as Completed'}
              </Button>
            }
          >
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-dark-bg border border-dark-border grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Focus:</span>
                  <span className="font-semibold text-white">{selectedDrill.focus}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Est. Calorie Burn:</span>
                  <span className="font-semibold text-volt">{selectedDrill.calories || '120 kcal'}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Drill Instructions
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedDrill.description}
                </p>
              </div>

              {selectedDrill.equipment && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Equipment Required
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDrill.equipment.map((eq, i) => (
                      <Badge key={i} variant="primary" size="sm">{eq}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Modal>
        )}

      </div>
    </ModuleContainer>
  );
};

export default TrainingModule;
