import React, { useState } from 'react';
import { 
  Award, 
  Trophy, 
  ClipboardCheck, 
  Medal, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';
import ModuleContainer from '../../components/ui/ModuleContainer';
import { Link } from 'react-router-dom';
import { useAthlete } from '../../context/AthleteContext';

/**
 * =========================================================================
 * TEAMMATE INTEGRATION MODULE: ResultsModule
 * =========================================================================
 * Teammate Responsible: Match Results, Tournament Records & Badges Engine
 * 
 * Future Integration Guide:
 * - Render match scoreboard summaries, goals scored, sprint times, match MVPs.
 * - Generate verifiable certificate badges and scouting portfolio exports.
 * =========================================================================
 */
export const ResultsModule = () => {
  const { athlete } = useAthlete();
  const [activeTab, setActiveTab] = useState('Competitions');

  const TABS = [
    { id: 'Competitions', label: 'Competitions', icon: Trophy },
    { id: 'Assessments', label: 'Assessments', icon: ClipboardCheck },
    { id: 'Achievements', label: 'Achievements', icon: Medal }
  ];

  return (
    <ModuleContainer
      moduleName="ResultsModule.jsx"
      assignedTo="Results & Achievements Teammate"
      status="Ready for Integration"
      description="Competitive records archive, verified tournament results, and athlete badges."
    >
      <div className="space-y-6">

        {/* Tab Selector */}
        <div className="flex items-center gap-2 border-b border-dark-border/80 pb-3">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand-500 text-slate-950 shadow-glow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-dark-surface'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panes */}
        {activeTab === 'Competitions' && (
          <EmptyState
            icon={Trophy}
            title="No competition results recorded yet"
            description="Your results will appear here after you participate in assessments and competitions."
            actionText="Explore Upcoming Competitions"
            onActionClick={() => window.location.href = '/compete'}
          />
        )}

        {activeTab === 'Assessments' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-dark-surface border border-dark-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20">
                  <ClipboardCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Initial Baseline Assessment</h4>
                  <p className="text-xs text-slate-400">Sport: {athlete.sport} • Status: Initialized</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="volt" size="sm">Score: {athlete.readiness || 35}%</Badge>
                <Link to="/assessment">
                  <Button variant="outline" size="sm">Resume</Button>
                </Link>
              </div>
            </div>

            <EmptyState
              icon={ClipboardCheck}
              title="More assessment history will appear here"
              description="As you retake assessments each month, your performance delta and readiness curve will be archived here."
            />
          </div>
        )}

        {activeTab === 'Achievements' && (
          <EmptyState
            icon={Medal}
            title="No achievements unlocked yet"
            description="Complete milestones in your roadmap and participate in trials to unlock official SportPath AI verified badges."
            actionText="View Roadmap Milestones"
            onActionClick={() => window.location.href = '/roadmap'}
          />
        )}

      </div>
    </ModuleContainer>
  );
};

export default ResultsModule;
