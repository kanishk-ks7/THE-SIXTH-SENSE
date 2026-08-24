import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  TrendingUp,
  Activity,
  Dumbbell,
  BookOpen,
  Flame,
  BarChart3,
  Calendar,
  Sparkles,
  Award,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../../components/ui/Card';
import ProgressBar from '../../components/ui/ProgressBar';
import Badge from '../../components/ui/Badge';
import ModuleContainer from '../../components/ui/ModuleContainer';
import { getProgressData } from '../../data/mockData';
import { useAthlete } from '../../context/AthleteContext';

/* =====================================================================
 * TEAMMATE INTEGRATION MODULE: ProgressModule (v2 — Dynamic + Chart)
 * =====================================================================
 * Reads athlete.sport + athlete.level from AthleteContext.
 * Resolves pillar scores, trajectory data, assessment summary, and
 * training info via getProgressData(sport, level).
 * Renders a pure-SVG performance trajectory chart (no external libs).
 * Assessment cycle: Every 2 Weeks (bi-weekly).
 * ===================================================================== */

// ─────────────────────────────────────────────
// Assessment cycle constants
// ─────────────────────────────────────────────
const CYCLE_LABEL = 'Every 2 Weeks';
const CURRENT_CYCLE = 'Jul 3 – Jul 16';
const NEXT_ASSESSMENT = 'Jul 17, 2026';
const CYCLE_STATUS = 'In Progress';

// ─────────────────────────────────────────────
// SVG Performance Trajectory Chart
// ─────────────────────────────────────────────
const TrajectoryChart = ({ data, targetReadiness }) => {
  const containerRef = useRef(null);
  const [dims, setDims] = useState({ width: 500, height: 240 });
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Responsive resize
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        if (width > 0) setDims({ width, height: Math.min(260, Math.max(200, width * 0.42)) });
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const pad = { top: 28, right: 24, bottom: 42, left: 44 };
  const chartW = dims.width - pad.left - pad.right;
  const chartH = dims.height - pad.top - pad.bottom;

  // Y scale: 0-100
  const yTicks = [0, 25, 50, 75, 100];
  const yScale = (v) => pad.top + chartH - (v / 100) * chartH;
  const xScale = (i) => pad.left + (i / (data.length - 1)) * chartW;

  // Build polyline strings
  const historicalPts = data.filter((d) => !d.isProjected);
  const projectedStart = historicalPts[historicalPts.length - 1];
  const projectedEnd = data.find((d) => d.isProjected);

  const histLine = historicalPts.map((d, i) => `${xScale(data.indexOf(d))},${yScale(d.score)}`).join(' ');

  // Gradient area under historical line
  const areaPath = historicalPts.length > 1
    ? `M${xScale(data.indexOf(historicalPts[0]))},${yScale(0)} ` +
      historicalPts.map((d) => `L${xScale(data.indexOf(d))},${yScale(d.score)}`).join(' ') +
      ` L${xScale(data.indexOf(historicalPts[historicalPts.length - 1]))},${yScale(0)} Z`
    : '';

  // Target readiness line
  const targetY = yScale(targetReadiness);

  return (
    <div ref={containerRef} className="w-full" style={{ minHeight: 200 }}>
      <svg
        width={dims.width}
        height={dims.height}
        viewBox={`0 0 ${dims.width} ${dims.height}`}
        className="overflow-visible select-none"
      >
        <defs>
          {/* Historical area gradient */}
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.02" />
          </linearGradient>
          {/* Glow filter for current dot */}
          <filter id="dotGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="dotGlowVolt">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grid lines */}
        {yTicks.map((tick) => (
          <g key={tick}>
            <line
              x1={pad.left}
              y1={yScale(tick)}
              x2={dims.width - pad.right}
              y2={yScale(tick)}
              stroke="#1E2D4A"
              strokeWidth="1"
              strokeDasharray={tick === 0 ? 'none' : '4,4'}
            />
            <text
              x={pad.left - 8}
              y={yScale(tick) + 4}
              textAnchor="end"
              className="fill-slate-500"
              fontSize="10"
              fontFamily="monospace"
            >
              {tick}%
            </text>
          </g>
        ))}

        {/* Target readiness dashed line */}
        <line
          x1={pad.left}
          y1={targetY}
          x2={dims.width - pad.right}
          y2={targetY}
          stroke="#CCFF00"
          strokeWidth="1"
          strokeDasharray="6,4"
          opacity="0.45"
        />
        <text
          x={dims.width - pad.right + 2}
          y={targetY - 4}
          className="fill-volt"
          fontSize="9"
          fontFamily="monospace"
        >
          Target
        </text>

        {/* Area under historical curve */}
        {areaPath && <path d={areaPath} fill="url(#areaGrad)" />}

        {/* Historical polyline */}
        <polyline
          points={histLine}
          fill="none"
          stroke="#06b6d4"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Projected dashed line */}
        {projectedStart && projectedEnd && (
          <line
            x1={xScale(data.indexOf(projectedStart))}
            y1={yScale(projectedStart.score)}
            x2={xScale(data.indexOf(projectedEnd))}
            y2={yScale(projectedEnd.score)}
            stroke="#CCFF00"
            strokeWidth="2"
            strokeDasharray="6,4"
            strokeLinecap="round"
          />
        )}

        {/* X-axis labels */}
        {data.map((d, i) => (
          <text
            key={i}
            x={xScale(i)}
            y={dims.height - 6}
            textAnchor="middle"
            className={d.isCurrent ? 'fill-brand-300 font-semibold' : d.isProjected ? 'fill-volt' : 'fill-slate-500'}
            fontSize="10"
            fontFamily="sans-serif"
          >
            {d.label}
          </text>
        ))}

        {/* Data points + hover areas */}
        {data.map((d, i) => {
          const cx = xScale(i);
          const cy = yScale(d.score);
          const isCurrent = d.isCurrent;
          const isProj = d.isProjected;
          return (
            <g key={i}>
              {/* Invisible hit area */}
              <circle
                cx={cx}
                cy={cy}
                r={16}
                fill="transparent"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{ cursor: 'pointer' }}
              />
              {/* Visible dot */}
              <circle
                cx={cx}
                cy={cy}
                r={isCurrent ? 6 : isProj ? 5 : 4}
                fill={isProj ? '#CCFF00' : '#06b6d4'}
                stroke={isProj ? '#65a30d' : '#0e7490'}
                strokeWidth="2"
                filter={isCurrent ? 'url(#dotGlow)' : isProj ? 'url(#dotGlowVolt)' : 'none'}
              />
            </g>
          );
        })}

        {/* Tooltip */}
        {hoveredIdx !== null && (() => {
          const d = data[hoveredIdx];
          const cx = xScale(hoveredIdx);
          const cy = yScale(d.score);
          const tooltipW = 100;
          const tooltipH = 42;
          // Keep tooltip within SVG bounds
          let tx = cx - tooltipW / 2;
          if (tx < pad.left) tx = pad.left;
          if (tx + tooltipW > dims.width - pad.right) tx = dims.width - pad.right - tooltipW;
          const ty = cy - tooltipH - 12;
          return (
            <g>
              <rect
                x={tx}
                y={ty}
                width={tooltipW}
                height={tooltipH}
                rx={8}
                fill="#131C31"
                stroke="#1E2D4A"
                strokeWidth="1"
              />
              <text x={tx + tooltipW / 2} y={ty + 16} textAnchor="middle" className="fill-slate-300" fontSize="10" fontFamily="sans-serif">
                {d.date} — {d.label}
              </text>
              <text x={tx + tooltipW / 2} y={ty + 32} textAnchor="middle" className="fill-white" fontSize="13" fontWeight="bold" fontFamily="monospace">
                {d.score}%
              </text>
            </g>
          );
        })()}
      </svg>
    </div>
  );
};

// ─────────────────────────────────────────────
// Delta indicator component
// ─────────────────────────────────────────────
const DeltaIndicator = ({ delta }) => {
  if (delta === 0) return <span className="text-slate-500 text-[11px] font-mono ml-2">—</span>;
  const isPositive = delta > 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-[11px] font-mono font-bold ml-2 ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
      {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
      {Math.abs(delta)}%
    </span>
  );
};

// ─────────────────────────────────────────────
// Main Module
// ─────────────────────────────────────────────
export const ProgressModule = () => {
  const { athlete } = useAthlete();

  const sport = athlete.sport || 'Football';
  const level = athlete.level || 'Beginner';

  // Resolve dynamic data from centralized lookup
  const data = useMemo(() => getProgressData(sport, level), [sport, level]);

  const metrics = [
    { label: 'Overall Readiness',          value: data.overallReadiness,              delta: null, icon: TrendingUp, color: 'brand' },
    { label: 'Technical Skill Progress',   value: data.technicalSkill.value,          delta: data.technicalSkill.delta, icon: Activity, color: 'emerald' },
    { label: 'Physical Fitness Progress',  value: data.physicalFitness.value,         delta: data.physicalFitness.delta, icon: Dumbbell, color: 'volt' },
    { label: 'Sport IQ & Knowledge',       value: data.sportIQ.value,                 delta: data.sportIQ.delta, icon: BookOpen, color: 'amber' },
    { label: 'Training Consistency',       value: data.trainingConsistency.value,      delta: data.trainingConsistency.delta, icon: Flame, color: 'brand' },
  ];

  const trainingOnTrack = data.cycleTrainingHours >= data.biWeeklyTargetHours * 0.6;

  return (
    <ModuleContainer
      moduleName="ProgressModule.jsx"
      assignedTo="Progress & Analytics Teammate"
      status="Integrated"
      description="Dynamic performance telemetry tracking 4 core athletic pillars with bi-weekly assessment cycle."
    >
      <div className="space-y-8">

        {/* ── Config Strip ── */}
        <div className="flex flex-wrap items-center gap-3 p-3.5 px-5 bg-dark-bg/60 border border-dark-border rounded-xl">
          <div className="flex items-center gap-2 text-xs">
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span className="text-slate-400">Sport:</span>
            <span className="font-bold text-white">{sport}</span>
          </div>
          <span className="text-dark-border">|</span>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Difficulty:</span>
            <span className="font-bold text-white">{level}</span>
          </div>
          <span className="text-dark-border">|</span>
          <div className="flex items-center gap-2 text-xs">
            <Calendar className="w-3.5 h-3.5 text-volt" />
            <span className="text-slate-400">Assessment Cycle:</span>
            <Badge variant="volt" size="sm">{CYCLE_LABEL}</Badge>
          </div>
        </div>

        {/* ── Two-Column: Pillar Breakdown + Trajectory Chart ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Pillar Progression Breakdown */}
          <Card className="p-6 space-y-6">
            <CardHeader className="pb-3 mb-0">
              <CardTitle>
                <Activity className="w-5 h-5 text-brand-400" />
                Pillar Progression Breakdown
              </CardTitle>
              <Badge variant="primary" size="sm">{sport} · {level}</Badge>
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
                      <div className="flex items-center">
                        <span className="font-mono font-bold text-white">{item.value}%</span>
                        {item.delta !== null && <DeltaIndicator delta={item.delta} />}
                      </div>
                    </div>
                    <ProgressBar value={item.value} size="md" color={item.color} showValue={false} />
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Performance Trajectory Chart */}
          <Card className="p-6 flex flex-col justify-between">
            <CardHeader className="pb-3 mb-0">
              <CardTitle>
                <BarChart3 className="w-5 h-5 text-volt" />
                Performance Trajectory
              </CardTitle>
              <Badge variant="volt" size="sm">{CYCLE_LABEL}</Badge>
            </CardHeader>

            {/* Real SVG Chart */}
            <div className="my-4 min-h-[200px]">
              <TrajectoryChart data={data.trajectoryData} targetReadiness={data.targetReadiness} />
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 mb-3">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-brand-500 rounded-full inline-block" /> Historical
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-volt rounded-full inline-block" style={{ borderTop: '2px dashed #CCFF00', height: 0 }} /> Projected
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-volt inline-block" /> Target: {data.targetReadiness}%
              </span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-dark-border/40 text-xs text-slate-400">
              <span>Next assessment: {NEXT_ASSESSMENT}</span>
              <span className="font-semibold text-brand-300">Target: {data.targetReadiness}% Readiness</span>
            </div>
          </Card>
        </div>

        {/* ── Bottom Stats Row ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* Training Summary */}
          <div className="p-5 rounded-2xl bg-dark-surface border border-dark-border">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Logged Training</p>
            <h4 className="text-2xl font-black text-white font-display mt-1">{data.cycleTrainingHours} Hours</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">This Cycle ({CURRENT_CYCLE})</p>
            <p className={`text-[11px] mt-1 ${trainingOnTrack ? 'text-emerald-400' : 'text-amber-400'}`}>
              ● {trainingOnTrack ? 'On track for bi-weekly goal' : 'Below bi-weekly target — keep pushing!'}
            </p>
          </div>

          {/* Assessment Summary */}
          <div className="p-5 rounded-2xl bg-dark-surface border border-dark-border">
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Assessment Summary</p>
              <Badge variant="volt" size="sm">{CYCLE_LABEL}</Badge>
            </div>
            <h4 className="text-2xl font-black text-white font-display mt-1">
              {data.assessmentsCompleted} of {data.assessmentsTotal} Completed
            </h4>
            <div className="mt-2 space-y-1">
              <p className="text-[11px] text-slate-400">
                <span className="text-slate-500">Current Cycle:</span>{' '}
                <span className="text-white font-semibold">{CURRENT_CYCLE}</span>
              </p>
              <p className="text-[11px] text-slate-400">
                <span className="text-slate-500">Next Assessment:</span>{' '}
                <span className="text-brand-300 font-semibold">{NEXT_ASSESSMENT}</span>
              </p>
              <p className="text-[11px]">
                <span className="text-slate-500">Status:</span>{' '}
                <span className="text-emerald-400 font-semibold">{CYCLE_STATUS}</span>
              </p>
            </div>
          </div>

          {/* Athlete Classification */}
          <div className="p-5 rounded-2xl bg-dark-surface border border-dark-border">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Athlete Classification</p>
            <h4 className="text-2xl font-black text-white font-display mt-1">{level}</h4>
            <p className="text-[11px] text-volt mt-1">● Pathway: {level === 'Advanced' ? 'Elite' : level === 'Intermediate' ? 'Development' : 'Foundation'}</p>
          </div>
        </div>

      </div>
    </ModuleContainer>
  );
};

export default ProgressModule;
