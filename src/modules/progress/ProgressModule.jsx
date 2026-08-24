import React from 'react';
import { 
  TrendingUp, 
  Activity, 
  Dumbbell, 
  BookOpen, 
  Flame, 
  BarChart3, 
  Calendar, 
  Sparkles,
  Award
} from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../../components/ui/Card';
import ProgressBar from '../../components/ui/ProgressBar';
import Badge from '../../components/ui/Badge';
import ModuleContainer from '../../components/ui/ModuleContainer';
import { PROGRESS_METRICS } from '../../data/mockData';
import { useAthlete } from '../../context/AthleteContext';

/**
 * =========================================================================
 * TEAMMATE INTEGRATION MODULE: ProgressModule
 * =========================================================================
 * Teammate Responsible: Performance Analytics, Charting & Metrics Engine
 * 
 * Future Integration Guide:
 * - Integrate charting library (Recharts/Chart.js/Echarts).
 * - Render multi-axial radar chart for the 4 pillars (Skills, Fitness, IQ, Performance).
 * - Feed real-time workout telemetry and historical trendlines.
 * =========================================================================
 */
export const ProgressModule = () => {
  const { athlete } = useAthlete();

  const metrics = [
    { label: 'Overall Readiness', value: athlete.readiness || 35, icon: TrendingUp, color: 'brand' },
    { label: 'Technical Skill Progress', value: 40, icon: Activity, color: 'emerald' },
    { label: 'Physical Fitness Progress', value: 35, icon: Dumbbell, color: 'volt' },
    { label: 'Sport IQ & Knowledge', value: 45, icon: BookOpen, color: 'amber' },
    { label: 'Training Consistency', value: 80, icon: Flame, color: 'brand' }
  ];

  return (
    <ModuleContainer
      moduleName="ProgressModule.jsx"
      assignedTo="Progress & Analytics Teammate"
      status="Ready for Integration"
      description="Holistic performance telemetry tracking 4 core athletic pillars over time."
    >
      <div className="space-y-8">

        {/* Progress Breakdown Bars */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 space-y-6">
            <CardHeader className="pb-3 mb-0">
              <CardTitle>
                <Activity className="w-5 h-5 text-brand-400" />
                Pillar Progression Breakdown
              </CardTitle>
              <Badge variant="primary" size="sm">Baseline v1.0</Badge>
            </CardHeader>

            <div className="space-y-5">
              {metrics.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-slate-200 font-semibold">
                        <Icon className="w-4 h-4 text-brand-400" />
                        <span>{item.label}</span>
                      </div>
                      <span className="font-mono font-bold text-white">{item.value}%</span>
                    </div>
                    <ProgressBar value={item.value} size="md" color={item.color} showValue={false} />
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Performance Chart Placeholder Box */}
          <Card className="p-6 flex flex-col justify-between">
            <CardHeader className="pb-3 mb-0">
              <CardTitle>
                <BarChart3 className="w-5 h-5 text-volt" />
                Performance Trajectory
              </CardTitle>
              <Badge variant="volt" size="sm">Weekly</Badge>
            </CardHeader>

            {/* Empty Chart Placeholder Area */}
            <div className="my-6 min-h-[200px] border-2 border-dashed border-dark-border rounded-2xl bg-dark-bg/60 p-6 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-dark-card border border-dark-border flex items-center justify-center text-volt mb-3 shadow-glow-volt">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-200 font-display">
                Performance chart will appear here
              </h4>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Analytics module placeholder ready for teammate charting library integration (e.g. Recharts or Chart.js).
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-dark-border/40 text-xs text-slate-400">
              <span>Next snapshot: in 3 days</span>
              <span className="font-semibold text-brand-300">Target: 50% Readiness</span>
            </div>
          </Card>
        </div>

        {/* Training Consistency Mini Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-dark-surface border border-dark-border">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Logged Training</p>
            <h4 className="text-2xl font-black text-white font-display mt-1">16 Hours</h4>
            <p className="text-[11px] text-emerald-400 mt-1">● On track for monthly goal</p>
          </div>

          <div className="p-5 rounded-2xl bg-dark-surface border border-dark-border">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Assessments Taken</p>
            <h4 className="text-2xl font-black text-white font-display mt-1">1 of 4 Completed</h4>
            <p className="text-[11px] text-brand-400 mt-1">● 3 modules remaining</p>
          </div>

          <div className="p-5 rounded-2xl bg-dark-surface border border-dark-border">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Athlete Classification</p>
            <h4 className="text-2xl font-black text-white font-display mt-1">{athlete.level || 'Beginner'}</h4>
            <p className="text-[11px] text-volt mt-1">● Pathway: Foundation</p>
          </div>
        </div>

      </div>
    </ModuleContainer>
  );
};

export default ProgressModule;
