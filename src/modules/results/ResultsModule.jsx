import React, { useState } from 'react';
import { 
  Award, 
  Trophy, 
  ClipboardCheck, 
  Medal, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Calendar,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Edit3,
  PlusCircle,
  TrendingUp,
  FileText,
  Clock,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';
import Modal from '../../components/ui/Modal';
import ModuleContainer from '../../components/ui/ModuleContainer';
import { useAthlete } from '../../context/AthleteContext';

/**
 * =========================================================================
 * ATHLETE PORTAL MODULE: ResultsModule (Competitive Records Archive)
 * =========================================================================
 * Responsible for: Competition outcomes source of truth, verified match
 * records, pending result completion workflow, assessment curves, and badges.
 * =========================================================================
 */
export const ResultsModule = () => {
  const { athlete, competitionResults, logCompetitionResult, showToast } = useAthlete();
  const [activeTab, setActiveTab] = useState('Competitions');
  const [editingResult, setEditingResult] = useState(null);

  // Form state for logging/updating match outcome
  const [outcomeForm, setOutcomeForm] = useState({
    placement: '1st Place (Gold / Champion)',
    outcome: '',
    notes: '',
    status: 'completed'
  });

  const TABS = [
    { id: 'Competitions', label: 'Competitions', icon: Trophy },
    { id: 'Assessments', label: 'Assessments', icon: ClipboardCheck },
    { id: 'Achievements', label: 'Achievements', icon: Medal }
  ];

  const PLACEMENT_OPTIONS = [
    '1st Place (Gold / Champion)',
    '2nd Place (Silver)',
    '3rd Place (Bronze)',
    'Finalist / Runner-Up',
    'Semi-Finalist',
    'Selected / Scouted for Phase 2',
    'Top 8 / Quarter-Finalist',
    'Completed / Participant',
    'Personal Best Recorded'
  ];

  // Separate pending vs completed results
  const pendingResults = competitionResults.filter(r => r.status === 'pending');
  const completedResults = competitionResults.filter(r => r.status === 'completed');

  /**
   * Open outcome logging modal for a pending or completed item
   */
  const handleOpenOutcomeModal = (resultItem) => {
    setEditingResult(resultItem);
    setOutcomeForm({
      placement: resultItem.placement || '1st Place (Gold / Champion)',
      outcome: resultItem.outcome || '',
      notes: resultItem.notes || '',
      status: 'completed'
    });
  };

  /**
   * Save outcome entry to shared athlete context
   */
  const handleSaveOutcome = (e) => {
    e.preventDefault();
    if (!editingResult) return;

    const updatedItem = {
      ...editingResult,
      placement: outcomeForm.placement,
      outcome: outcomeForm.outcome || 'Match completed',
      notes: outcomeForm.notes,
      status: 'completed',
      recordedAt: new Date().toISOString()
    };

    logCompetitionResult(updatedItem);
    setEditingResult(null);
  };

  return (
    <ModuleContainer
      moduleName="ResultsModule.jsx"
      assignedTo="Results & Records Archive"
      status="Integrated & Live"
      description="Competitive records archive, tournament outcomes source of truth, and athlete badges."
    >
      <div className="space-y-6">

        {/* Tab Selector */}
        <div className="flex items-center gap-2 border-b border-dark-border/80 pb-3 overflow-x-auto scrollbar-none">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isTabActive = activeTab === tab.id;
            let badgeCount = null;
            if (tab.id === 'Competitions' && pendingResults.length > 0) {
              badgeCount = `${pendingResults.length} Pending`;
            }

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isTabActive
                    ? 'bg-brand-500 text-slate-950 shadow-glow-sm font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-dark-surface'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {badgeCount && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                    {badgeCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: COMPETITIONS (Primary Source of Truth) */}
        {activeTab === 'Competitions' && (
          <div className="space-y-6">

            {/* Performance Stats Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="p-4 bg-dark-surface/80 border-dark-border flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-500/15 text-brand-400 border border-brand-500/30 flex items-center justify-center">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Entries</p>
                  <p className="text-xl font-extrabold text-white font-mono">{competitionResults.length}</p>
                </div>
              </Card>

              <Card className="p-4 bg-dark-surface/80 border-dark-border flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-volt/15 text-volt border border-volt/30 flex items-center justify-center">
                  <Medal className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Podiums &amp; Selected</p>
                  <p className="text-xl font-extrabold text-white font-mono">{completedResults.length}</p>
                </div>
              </Card>

              <Card className="p-4 bg-dark-surface/80 border-dark-border flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Awaiting Outcome</p>
                  <p className="text-xl font-extrabold text-amber-300 font-mono">{pendingResults.length}</p>
                </div>
              </Card>
            </div>

            {/* Section A: Pending Results (Action Required) */}
            {pendingResults.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    Awaiting Match Outcome ({pendingResults.length})
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pendingResults.map((item) => (
                    <Card
                      key={item.id}
                      className="p-5 border-amber-500/40 bg-amber-500/5 flex flex-col justify-between space-y-4 hover:border-amber-500/60 transition-colors"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <Badge variant="amber" size="sm" dot={true}>
                            Result Pending
                          </Badge>
                          <span className="text-[11px] text-slate-400 font-medium">
                            {item.sport}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-base font-bold text-white font-display">
                            {item.eventName}
                          </h4>
                          <p className="text-xs text-amber-200/80 mt-0.5">
                            Event concluded &bull; Tap below to record your performance outcome.
                          </p>
                        </div>

                        <div className="text-xs text-slate-400 space-y-1 bg-dark-bg/60 p-3 rounded-xl border border-dark-border/60">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-volt flex-shrink-0" />
                            <span>{item.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
                            <span className="truncate">{item.location}</span>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="volt"
                        size="sm"
                        icon={PlusCircle}
                        className="w-full"
                        onClick={() => handleOpenOutcomeModal(item)}
                      >
                        Log Match Outcome
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Section B: Completed Official Archive */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Official Competitive Archive ({completedResults.length})
                  </h4>
                </div>

                <Link to="/events" className="text-xs text-brand-400 hover:underline font-semibold flex items-center gap-1">
                  <span>Explore Upcoming Events</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {completedResults.length === 0 && pendingResults.length === 0 ? (
                <EmptyState
                  icon={Trophy}
                  title="No competition records found"
                  description="Your tournament entries and scouted trials results will appear here once you participate in events."
                  actionText="Explore Upcoming Events"
                  onActionClick={() => window.location.href = '/events'}
                />
              ) : completedResults.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-dark-border rounded-2xl bg-dark-surface/40">
                  <p className="text-xs text-slate-400">Log the outcomes of your pending events above to populate your official competition archive.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {completedResults.map((res) => (
                    <Card
                      key={res.id}
                      className="p-5 border-dark-border hover:border-brand-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="volt" size="sm">
                            {res.placement || 'Completed Entry'}
                          </Badge>
                          <Badge variant="primary" size="sm">
                            {res.sport}
                          </Badge>
                          <span className="text-[11px] text-slate-400">
                            {res.date}
                          </span>
                        </div>

                        <h4 className="text-base font-bold text-white font-display">
                          {res.eventName}
                        </h4>

                        {res.outcome && (
                          <p className="text-xs font-semibold text-slate-200">
                            {res.outcome}
                          </p>
                        )}

                        {res.notes && (
                          <p className="text-xs text-slate-400 bg-dark-bg/60 p-2.5 rounded-xl border border-dark-border/40 leading-relaxed">
                            <strong className="text-slate-300">Notes:</strong> {res.notes}
                          </p>
                        )}

                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <MapPin className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
                          <span>{res.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0 self-end md:self-center">
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={Edit3}
                          onClick={() => handleOpenOutcomeModal(res)}
                        >
                          Edit Outcome
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: ASSESSMENTS (Intact & Preserved) */}
        {activeTab === 'Assessments' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-dark-surface border border-dark-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20">
                  <ClipboardCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-display">Initial Baseline Assessment</h4>
                  <p className="text-xs text-slate-400">Sport: {athlete.sport} &bull; Status: Initialized</p>
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
              title="Assessment history archive active"
              description="As you retake monthly multi-pillar assessments, your performance delta and readiness curve will be archived here."
              actionText="Take Next Assessment"
              onActionClick={() => window.location.href = '/assessment'}
            />
          </div>
        )}

        {/* TAB 3: ACHIEVEMENTS (Intact & Preserved) */}
        {activeTab === 'Achievements' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Card className="p-4 border-brand-500/30 bg-brand-500/5 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
                  <Medal className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white font-display">Genesis Athlete</h4>
                <p className="text-xs text-slate-400">Created athlete passport and verified sports metrics.</p>
                <Badge variant="primary" size="sm">Unlocked</Badge>
              </Card>

              <Card className="p-4 border-volt/30 bg-volt/5 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-volt/20 text-volt flex items-center justify-center">
                  <Trophy className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white font-display">Competition Pioneer</h4>
                <p className="text-xs text-slate-400">Registered and logged first verified tournament match.</p>
                <Badge variant="volt" size="sm">Unlocked</Badge>
              </Card>

              <Card className="p-4 border-dark-border opacity-70 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-dark-bg text-slate-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-300 font-display">State Squad Scouted</h4>
                <p className="text-xs text-slate-400">Complete selection trials with official scout endorsement.</p>
                <Badge variant="locked" size="sm">Locked</Badge>
              </Card>
            </div>

            <EmptyState
              icon={Medal}
              title="More achievement badges will unlock"
              description="Complete roadmap milestones and participate in trials to unlock official SportPath AI verified badges."
              actionText="View Roadmap Milestones"
              onActionClick={() => window.location.href = '/roadmap'}
            />
          </div>
        )}

        {/* Outcome Logging / Edit Modal */}
        {editingResult && (
          <Modal
            isOpen={!!editingResult}
            onClose={() => setEditingResult(null)}
            title="Log Competition Outcome"
            subtitle={editingResult.eventName}
            maxWidth="max-w-lg"
          >
            <form onSubmit={handleSaveOutcome} className="space-y-4 text-xs">
              
              {/* Event Info Brief */}
              <div className="p-3 rounded-xl bg-dark-bg border border-dark-border space-y-1 text-slate-300">
                <p><strong className="text-white">Sport:</strong> {editingResult.sport}</p>
                <p><strong className="text-white">Dates:</strong> {editingResult.date}</p>
                <p><strong className="text-white">Location:</strong> {editingResult.location}</p>
              </div>

              {/* Placement / Standing */}
              <div className="space-y-1.5">
                <label htmlFor="outcomePlacement" className="font-semibold text-slate-200">
                  Placement / Standing Achieved *
                </label>
                <select
                  id="outcomePlacement"
                  value={outcomeForm.placement}
                  onChange={(e) => setOutcomeForm(prev => ({ ...prev, placement: e.target.value }))}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-volt"
                >
                  {PLACEMENT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Match Stats / Score Details */}
              <div className="space-y-1.5">
                <label htmlFor="outcomeSummary" className="font-semibold text-slate-200">
                  Match Score, Stats &amp; Highlights *
                </label>
                <input
                  id="outcomeSummary"
                  type="text"
                  required
                  placeholder="e.g. Won final 3-1, 2 goals scored, match MVP"
                  value={outcomeForm.outcome}
                  onChange={(e) => setOutcomeForm(prev => ({ ...prev, outcome: e.target.value }))}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-volt"
                />
              </div>

              {/* Reflection Notes */}
              <div className="space-y-1.5">
                <label htmlFor="outcomeNotes" className="font-semibold text-slate-200">
                  Performance Reflection &amp; Coach Feedback
                </label>
                <textarea
                  id="outcomeNotes"
                  rows={3}
                  placeholder="Note tactical decisions, strengths demonstrated, and areas to sharpen..."
                  value={outcomeForm.notes}
                  onChange={(e) => setOutcomeForm(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-volt"
                />
              </div>

              {/* Footer Buttons */}
              <div className="pt-3 border-t border-dark-border/60 flex items-center justify-end gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setEditingResult(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant="volt"
                  size="sm"
                  type="submit"
                >
                  Save to Results Archive
                </Button>
              </div>

            </form>
          </Modal>
        )}

      </div>
    </ModuleContainer>
  );
};

export default ResultsModule;
