import React, { useEffect, useState } from 'react';
import { 
  Activity, 
  Dumbbell, 
  BookOpen, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Info,
  Layers
} from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import ModuleContainer from '../../components/ui/ModuleContainer';
import { Link } from 'react-router-dom';
import { ASSESSMENT_MODULES } from '../../data/mockData';
import { useAthlete } from '../../context/AthleteContext';
import { assessmentService } from '../../services/assessmentService';
import { calculateAssessmentScore, calculateReadiness } from '../../utils/assessmentEngine';
import { getAssessmentResults, saveAssessmentResult } from '../../utils/storage';

const SPORT_QUESTIONS = {
  football: {
    skills: ['Ball Control / Dribbling', 'Passing Accuracy', 'Shooting Mechanics', 'First Touch'],
    fitness: ['Aerobic Capacity', '20m Sprint Velocity', 'Agility T-Test', 'Core & Plank'],
    knowledge: ['Tactical Formations', 'Game Rules', 'Positioning', 'Decision Making'],
    performance: ['Decision Speed', 'Mental Resilience', 'Match Execution', 'Consistency Under Pressure']
  },
  cricket: {
    skills: ['Batting Technique', 'Bowling Accuracy', 'Fielding Technique', 'Shot Selection'],
    fitness: ['Match Endurance', 'Sprint Speed', 'Agility', 'Core Strength'],
    knowledge: ['Field Placements', 'Laws of Cricket', 'Game Strategy', 'Decision Making'],
    performance: ['Pressure Response', 'Match Awareness', 'Execution Quality', 'Consistency Under Pressure']
  }
};

const getQuestions = (assessment, sport) => {
  const sportQuestions = SPORT_QUESTIONS[(sport || 'football').toLowerCase()];
  return sportQuestions?.[assessment.id] || assessment.items;
};

/**
 * =========================================================================
 * ATHLETEX INTEGRATION MODULE: AssessmentModule
 * =========================================================================
 */
export const AssessmentModule = () => {
  const { athlete, updateProfile, showToast } = useAthlete();
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startingAssessment, setStartingAssessment] = useState(null);
  const [answers, setAnswers] = useState({});
  const [assessmentResults, setAssessmentResults] = useState({});
  const sport = athlete.sport || 'Football';
  const level = athlete.level || 'Beginner';
  const userId = athlete.userId || athlete.id;

  useEffect(() => {
    let mounted = true;
    const loadHistory = async () => {
      const localResults = getAssessmentResults(userId, sport, level);
      if (mounted) setAssessmentResults(localResults);
      try {
        const response = await assessmentService.getHistory(sport, level);
        const remoteResults = (response?.data || []).reduce((results, result) => {
          if (result.status === 'COMPLETED') results[result.slug] = result;
          return results;
        }, {});
        if (mounted && Object.keys(remoteResults).length) setAssessmentResults(remoteResults);
      } catch (error) {
        console.warn('Assessment history unavailable; using local fallback.', error);
      }
    };
    loadHistory();
    return () => { mounted = false; };
  }, [userId, sport, level]);

  const getIcon = (id) => {
    switch (id) {
      case 'skills': return Activity;
      case 'fitness': return Dumbbell;
      case 'knowledge': return BookOpen;
      case 'performance': return Award;
      default: return Layers;
    }
  };

  const handleStartAssessment = (assessment) => {
    setStartingAssessment(assessment.id);
    showToast(`${assessment.title} started successfully!`, 'success');
    window.setTimeout(() => {
      setAnswers({});
      setSelectedAssessment(assessment);
      setStartingAssessment(null);
    }, 350);
  };

  const handleSubmitAssessment = async (assessment, answers) => {
    const score = calculateAssessmentScore(answers);
    if (!Object.keys(answers).length) {
      showToast('Enter a score for each assessment area before submitting.', 'error');
      return;
    }
    setIsSubmitting(true);
    const result = {
      slug: assessment.id,
      assessmentId: assessment.id,
      title: assessment.title,
      category: assessment.category,
      status: 'COMPLETED',
      score,
      completedAt: new Date().toISOString(),
      breakdown: answers
    };
    try {
      const response = await assessmentService.submitAssessment(assessment.id, {
        sport,
        level,
        score,
        breakdown: answers
      });
      const savedResult = response?.data || result;
      const nextResults = { ...assessmentResults, [assessment.id]: savedResult };
      setAssessmentResults(nextResults);
      const readiness = calculateReadiness(nextResults);
      await updateProfile({ readiness });
      setSelectedAssessment(null);
      showToast(`Assessment completed successfully. Score: ${score}/100`, 'success');
    } catch (error) {
      console.warn('Assessment submission failed:', error);
      if (error.status) {
        showToast('Unable to save your assessment. Please try again.', 'error');
        setIsSubmitting(false);
        return;
      }
      saveAssessmentResult(result, userId, sport, level);
      const nextResults = { ...assessmentResults, [assessment.id]: result };
      setAssessmentResults(nextResults);
      const readiness = calculateReadiness(nextResults);
      const updated = await updateProfile({ readiness });
      if (!updated) {
        showToast('Unable to save your assessment. Please try again.', 'error');
      } else {
        setSelectedAssessment(null);
        showToast(`Assessment completed successfully. Score: ${score}/100`, 'success');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModuleContainer
      moduleName="AssessmentModule.jsx"
      assignedTo="AI Assessment Teammate"
      status="Ready for Integration"
      description="4-pillar evaluation engine (Skills, Fitness, Knowledge, Performance) to compute athlete readiness."
    >
      <div className="space-y-6">
        
        {/* Assessment Grid: 4 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ASSESSMENT_MODULES.map((item) => {
            const Icon = getIcon(item.id);
            return (
              <Card
                key={item.id}
                className="relative overflow-hidden group hover:border-brand-500/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-display group-hover:text-brand-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs font-medium text-brand-400/80">
                        {item.category}
                      </p>
                    </div>
                  </div>
                  <Badge variant="primary" size="sm">
                    {item.badge}
                  </Badge>
                </div>

                <p className="text-sm text-slate-300 mb-5 leading-relaxed">
                  {item.description}
                </p>

                {/* Key Evaluation Items */}
                <div className="bg-dark-bg/60 rounded-xl p-3.5 border border-dark-border/60 mb-5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Evaluation Matrix:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {item.items.map((criterion, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
                        <span className="truncate">{criterion}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Row */}
                <div className="flex items-center justify-between pt-2 border-t border-dark-border/40">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Est. {item.estimatedTime}</span>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    icon={ArrowRight}
                    iconPosition="right"
                    loading={startingAssessment === item.id}
                    onClick={() => handleStartAssessment(item)}
                  >
                    {startingAssessment === item.id
                      ? 'Starting...'
                      : assessmentResults[item.id] ? 'Retake Assessment' : 'Start Assessment'}
                  </Button>
                </div>
                {assessmentResults[item.id] && (
                  <div className="mt-3 flex items-center justify-end gap-2 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-volt" />
                    <span className="text-slate-300">Completed</span>
                    <span className="font-mono font-bold text-volt">Score: {assessmentResults[item.id].score}/100</span>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Integration Callout Box */}
        <div className="p-5 rounded-2xl bg-dark-card/60 border border-dark-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-volt/10 text-volt border border-volt/20 flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">
                athletex Diagnostic & Learning Integration
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Completed assessment pillar diagnostics automatically populate your <strong className="text-volt">Personalized Learn Hub</strong> with targeted YouTube drills.
              </p>
            </div>
          </div>
          <Link to="/learn" className="flex-shrink-0">
            <Button variant="volt" size="sm" icon={ArrowRight} iconPosition="right">
              View Personalized Lessons
            </Button>
          </Link>
        </div>

        {/* Assessment Preview Modal */}
        {selectedAssessment && (
          <Modal
            isOpen={!!selectedAssessment}
            onClose={() => setSelectedAssessment(null)}
            title={selectedAssessment.title}
            subtitle={`${selectedAssessment.category} • Sport: ${athlete.sport || 'Football'}`}
            footer={
              <>
                <Button variant="secondary" size="sm" onClick={() => setSelectedAssessment(null)}>
                  Close
                </Button>
                <Button
                  variant="volt"
                  size="sm"
                  loading={isSimulating}
                  onClick={() => handleSubmitAssessment(selectedAssessment, answers)}
                >
                  {isSubmitting ? 'Saving assessment...' : 'Submit Assessment'}
                </Button>
              </>
            }
          >
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-brand-500/10 border border-brand-500/30 text-xs text-brand-200 flex items-center gap-2">
                <Info className="w-4 h-4 flex-shrink-0 text-brand-400" />
                <span>
                  Score each area from 0 to 100. Your assessment score is the average of the four responses.
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white mb-2">Pillars Evaluated:</h4>
                <div className="space-y-2">
                  {getQuestions(selectedAssessment, sport).map((crit, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-dark-bg/60 border border-dark-border text-xs">
                      <span className="text-slate-200">{crit}</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={answers[idx] ?? ''}
                        onChange={(event) => setAnswers(previous => ({ ...previous, [idx]: event.target.value }))}
                        placeholder="0-100"
                        className="w-20 bg-dark-surface border border-dark-border rounded-lg px-2 py-1 text-right text-volt font-mono focus:outline-none focus:border-volt"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Modal>
        )}

      </div>
    </ModuleContainer>
  );
};

export default AssessmentModule;
