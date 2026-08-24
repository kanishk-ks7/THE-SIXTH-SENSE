import React, { useState } from 'react';
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

/**
 * =========================================================================
 * ATHLETEX INTEGRATION MODULE: AssessmentModule
 * =========================================================================
 */
export const AssessmentModule = () => {
  const { athlete, updateProfile, updateWeakAreas, showToast } = useAthlete();
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const getIcon = (id) => {
    switch (id) {
      case 'skills': return Activity;
      case 'fitness': return Dumbbell;
      case 'knowledge': return BookOpen;
      case 'performance': return Award;
      default: return Layers;
    }
  };

  const handleSimulateAssessment = (assessment) => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      // Simulate improving readiness
      const newReadiness = Math.min((athlete.readiness || 35) + 15, 100);
      updateProfile({ readiness: newReadiness });

      // Update identified weak areas based on assessment pillar
      let diagnosedWeakAreas = ['rules', 'ball-handling'];
      if (assessment.id === 'knowledge') {
        diagnosedWeakAreas = ['rules', 'positioning', 'game-regulations'];
      } else if (assessment.id === 'skills') {
        diagnosedWeakAreas = ['ball-handling', 'first-touch', 'shooting'];
      } else if (assessment.id === 'fitness') {
        diagnosedWeakAreas = ['sprint-mechanics', 'acceleration', 'stamina'];
      } else if (assessment.id === 'performance') {
        diagnosedWeakAreas = ['strategy', 'tactics', 'spatial-iq'];
      }

      if (updateWeakAreas) {
        updateWeakAreas(diagnosedWeakAreas);
      }

      setSelectedAssessment(null);
      showToast(`${assessment.title} completed! Identified weak areas updated for your Learn Hub.`, 'success');
    }, 1200);
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
                    onClick={() => setSelectedAssessment(item)}
                  >
                    Start Assessment
                  </Button>
                </div>
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
                  onClick={() => handleSimulateAssessment(selectedAssessment)}
                >
                  Simulate Assessment Test
                </Button>
              </>
            }
          >
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-brand-500/10 border border-brand-500/30 text-xs text-brand-200 flex items-center gap-2">
                <Info className="w-4 h-4 flex-shrink-0 text-brand-400" />
                <span>
                  <strong>Assessment Module Prototype:</strong> Clicking "Simulate Assessment Test" will simulate score calculation and update the athlete's readiness score.
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white mb-2">Pillars Evaluated:</h4>
                <div className="space-y-2">
                  {selectedAssessment.items.map((crit, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-dark-bg/60 border border-dark-border text-xs">
                      <span className="text-slate-200">{crit}</span>
                      <span className="text-volt font-mono font-semibold">Ready</span>
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
