import React, { useState } from 'react';
import { 
  Sparkles, 
  Target, 
  Award, 
  SlidersHorizontal, 
  Check, 
  RotateCcw, 
  ChevronDown,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { SPORTS_LIST, ONBOARDING_LEVELS } from '../../data/mockData';

const COMMON_WEAK_AREAS_BY_SPORT = {
  basketball: ['rules', 'ball-handling', 'shooting', 'spacing', 'defense'],
  football: ['first-touch', 'passing', 'rules', 'dribbling', 'positioning'],
  cricket: ['batting', 'rules', 'footwork', 'bowling', 'running-between-wickets'],
  athletics: ['sprint-mechanics', 'acceleration', 'rules', 'pacing', 'max-velocity'],
  tennis: ['grip', 'forehand', 'rules', 'crosscourt', 'serve'],
  badminton: ['footwork', 'rules', 'grip', 'drop-shot', 'smash'],
  volleyball: ['passing', 'rules', 'spiking', 'setting', 'rotation'],
  other: ['fundamentals', 'rules', 'techniques', 'strategy']
};

export const CoachDiagnosticsBar = ({
  sport,
  level,
  weakAreas,
  onUpdateSport,
  onUpdateLevel,
  onUpdateWeakAreas,
  onResetProgress,
  completedCount = 0
}) => {
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);

  const cleanSport = (sport || 'basketball').toLowerCase();
  const availableWeakOptions = COMMON_WEAK_AREAS_BY_SPORT[cleanSport] || COMMON_WEAK_AREAS_BY_SPORT.basketball;

  const toggleWeakArea = (areaKey) => {
    let updated;
    if (weakAreas.includes(areaKey)) {
      // Keep at least one
      if (weakAreas.length > 1) {
        updated = weakAreas.filter(a => a !== areaKey);
      } else {
        return;
      }
    } else {
      updated = [...weakAreas, areaKey];
    }
    onUpdateWeakAreas(updated);
  };

  const handleQuickPreset = (presetSport, presetLevel, presetWeakAreas) => {
    onUpdateSport(presetSport);
    onUpdateLevel(presetLevel);
    onUpdateWeakAreas(presetWeakAreas);
    setIsDiagnosticOpen(false);
  };

  return (
    <div className="rounded-3xl bg-gradient-to-r from-dark-surface via-dark-card to-dark-surface border border-dark-border p-5 sm:p-6 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        
        {/* Left: Coach Persona & Active Diagnostic State */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-brand-500/15 border border-brand-500/30 text-brand-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              AI Guided Coach Active
            </span>
            <Badge variant="volt" size="sm">
              Level: {level || 'Beginner'}
            </Badge>
            <span className="text-xs text-slate-400">
              Completed Lessons: <strong className="text-white">{completedCount}</strong>
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-white font-display flex items-center gap-2">
            <span>Personalized Learning Hub</span>
            <span className="text-brand-400 font-mono text-base font-normal">({sport || 'Basketball'})</span>
          </h1>

          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 pt-0.5">
            <span className="text-slate-400 flex items-center gap-1 font-semibold">
              <Target className="w-3.5 h-3.5 text-volt" />
              Assessment Identified Weak Areas:
            </span>
            {weakAreas && weakAreas.length > 0 ? (
              weakAreas.map((weak, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-lg bg-dark-bg border border-dark-border text-volt font-medium capitalize text-[11px]"
                >
                  {weak.replace(/-/g, ' ')}
                </span>
              ))
            ) : (
              <span className="text-slate-500">None identified yet</span>
            )}
          </div>
        </div>

        {/* Right: Actions & Quick Diagnostic Switcher */}
        <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
          <button
            type="button"
            onClick={() => setIsDiagnosticOpen(!isDiagnosticOpen)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-dark-bg/80 border border-dark-border hover:border-brand-500/50 text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-brand-400" />
            <span>Customize Coach Context</span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isDiagnosticOpen ? 'rotate-180' : ''}`} />
          </button>

          <Link to="/assessment">
            <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
              Retake Assessment
            </Button>
          </Link>
        </div>

      </div>

      {/* Expandable Coach Context & Diagnostic Tuning Panel */}
      {isDiagnosticOpen && (
        <div className="mt-5 pt-5 border-t border-dark-border/80 space-y-4 animate-fade-in">
          
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-brand-400" />
              <span>Diagnostic Personalization Controls (Test Any Scenario)</span>
            </h4>

            <button
              type="button"
              onClick={onResetProgress}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-rose-400 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Completed Lessons</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* 1. Sport Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Primary Sport</label>
              <select
                value={sport || 'Basketball'}
                onChange={(e) => onUpdateSport(e.target.value)}
                className="w-full bg-dark-bg border border-dark-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
              >
                {SPORTS_LIST.map((s) => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* 2. Level Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Athlete Level</label>
              <select
                value={level || 'Beginner'}
                onChange={(e) => onUpdateLevel(e.target.value)}
                className="w-full bg-dark-bg border border-dark-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
              >
                {ONBOARDING_LEVELS.map((lvl) => (
                  <option key={lvl.id} value={lvl.id}>{lvl.label}</option>
                ))}
              </select>
            </div>

            {/* 3. Quick Preset Button (Basketball Example from Spec) */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase">One-Click Test Case</label>
              <button
                type="button"
                onClick={() => handleQuickPreset('Basketball', 'Beginner', ['rules', 'ball-handling'])}
                className="w-full px-3 py-2 rounded-xl bg-brand-500/20 border border-brand-500/40 text-brand-300 hover:bg-brand-500/30 text-xs font-bold transition-all text-center truncate"
              >
                Load: Basketball + Beginner + Weaknesses
              </button>
            </div>

          </div>

          {/* Weak Areas Toggle Chips */}
          <div className="space-y-2 pt-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase">
              Toggle Active Assessment Weakness Tags for {sport}:
            </label>
            <div className="flex flex-wrap gap-2">
              {availableWeakOptions.map((area) => {
                const isActive = weakAreas.includes(area);
                return (
                  <button
                    key={area}
                    type="button"
                    onClick={() => toggleWeakArea(area)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-volt text-dark-bg shadow-glow-volt font-bold'
                        : 'bg-dark-bg border border-dark-border text-slate-400 hover:text-white'
                    }`}
                  >
                    {isActive && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    <span className="capitalize">{area.replace(/-/g, ' ')}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default CoachDiagnosticsBar;
