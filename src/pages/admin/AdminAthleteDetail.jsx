import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  ArrowLeft, 
  TrendingUp, 
  Activity, 
  Dumbbell, 
  BookOpen, 
  Flame, 
  Award, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Calendar,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import Card, { CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import LoadingState from '../../components/ui/LoadingState';
import { adminService } from '../../services/adminService';

// SVG Performance Trajectory Chart Component for Admin Inspector
const AdminTrajectoryChart = ({ data = [], targetReadiness = 50 }) => {
  const containerRef = useRef(null);
  const [dims, setDims] = useState({ width: 500, height: 220 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setDims({ width: entry.contentRect.width, height: 220 });
        }
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!data || data.length === 0) return null;

  const pad = { top: 24, right: 24, bottom: 36, left: 40 };
  const chartW = dims.width - pad.left - pad.right;
  const chartH = dims.height - pad.top - pad.bottom;

  const yTicks = [0, 25, 50, 75, 100];
  const yScale = (v) => pad.top + chartH - (v / 100) * chartH;
  const xScale = (i) => pad.left + (i / Math.max(1, data.length - 1)) * chartW;

  const historicalPts = data.filter(d => !d.isProjected);
  const histLine = historicalPts.map((d, i) => `${xScale(data.indexOf(d))},${yScale(d.score)}`).join(' ');

  const projectedStart = historicalPts[historicalPts.length - 1];
  const projectedEnd = data.find(d => d.isProjected);

  return (
    <div ref={containerRef} className="w-full relative">
      <svg width="100%" height={dims.height} className="overflow-visible select-none">
        <defs>
          <linearGradient id="adminAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {yTicks.map(t => (
          <g key={t}>
            <line x1={pad.left} y1={yScale(t)} x2={dims.width - pad.right} y2={yScale(t)} stroke="#1E2D4A" strokeWidth="1" strokeDasharray="3,3" />
            <text x={pad.left - 8} y={yScale(t) + 4} textAnchor="end" className="fill-slate-500" fontSize="10" fontFamily="monospace">{t}%</text>
          </g>
        ))}

        {/* Target baseline */}
        {targetReadiness && (
          <line x1={pad.left} y1={yScale(targetReadiness)} x2={dims.width - pad.right} y2={yScale(targetReadiness)} stroke="#CCFF00" strokeWidth="1.5" strokeDasharray="5,5" strokeOpacity="0.6" />
        )}

        {/* Historical Line */}
        {historicalPts.length > 1 && (
          <polyline fill="none" stroke="#00F0FF" strokeWidth="2.5" points={histLine} strokeLinecap="round" strokeLinejoin="round" />
        )}

        {/* Projected Line */}
        {projectedStart && projectedEnd && (
          <line 
            x1={xScale(data.indexOf(projectedStart))} 
            y1={yScale(projectedStart.score)} 
            x2={xScale(data.indexOf(projectedEnd))} 
            y2={yScale(projectedEnd.score)} 
            stroke="#CCFF00" 
            strokeWidth="2" 
            strokeDasharray="5,4" 
          />
        )}

        {/* Points */}
        {data.map((d, i) => {
          const cx = xScale(i);
          const cy = yScale(d.score);
          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r={d.isCurrent ? 6 : 4} fill={d.isProjected ? '#CCFF00' : '#00F0FF'} stroke="#0A0F1D" strokeWidth="2" />
              <text x={cx} y={dims.height - 10} textAnchor="middle" className="fill-slate-400" fontSize="10">{d.recordedDate || d.date}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const AdminAthleteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [athleteDossier, setAthleteDossier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDossier = async () => {
      try {
        setLoading(true);
        const res = await adminService.getAthleteById(id);
        if (res?.data) {
          setAthleteDossier(res.data);
        } else {
          setError('Athlete dossier not found');
        }
      } catch (err) {
        setError(err.message || 'Failed to load athlete details');
      } finally {
        setLoading(false);
      }
    };

    fetchDossier();
  }, [id]);

  if (loading) {
    return (
      <AdminLayout title="Athlete Inspector" subtitle="Loading athlete dossier...">
        <LoadingState text="Retrieving dynamic telemetry records..." />
      </AdminLayout>
    );
  }

  if (error || !athleteDossier) {
    return (
      <AdminLayout title="Athlete Not Found">
        <Card className="p-8 text-center space-y-4">
          <p className="text-sm text-slate-300">{error || 'Unable to locate athlete record.'}</p>
          <Link to="/admin/athletes">
            <Button variant="secondary" size="sm" icon={ArrowLeft}>
              Back to Athlete Directory
            </Button>
          </Link>
        </Card>
      </AdminLayout>
    );
  }

  const { athlete, profile, telemetry, trajectory, assessments } = athleteDossier;

  return (
    <AdminLayout 
      title={`Athlete Dossier: ${athlete.name}`} 
      subtitle={`Verified Athlete Passport ID: ${athlete.id} • ${profile.sportName || profile.sportId} (${profile.levelName || profile.difficultyLevelId})`}
    >
      <div className="space-y-6">

        {/* Top Header Card */}
        <Card className="p-6 border-dark-border bg-gradient-to-r from-dark-surface via-dark-card to-dark-surface">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-500 to-volt p-0.5 shadow-glow-sm shrink-0">
                <div className="w-full h-full bg-dark-bg rounded-[14px] flex items-center justify-center font-display font-black text-2xl text-volt">
                  {athlete.name.charAt(0)}
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl font-bold text-white">{athlete.name}</h2>
                  <Badge variant="volt" size="sm">Active Athlete</Badge>
                  <Badge variant="brand" size="sm">{profile.sportName || profile.sportId}</Badge>
                  <Badge variant="secondary" size="sm">{profile.levelName || profile.difficultyLevelId}</Badge>
                </div>
                <p className="text-xs text-slate-400 font-mono">{athlete.email}</p>
                <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {profile.location || 'Location not provided'}
                  </span>
                  <span>Position: <strong className="text-slate-200">{profile.position || 'Athlete'}</strong></span>
                  <span>Training: <strong className="text-slate-200">{profile.trainingHours || 'Not provided'}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-dark-border pt-4 md:pt-0 md:pl-6">
              <div className="text-center">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Overall Readiness</span>
                <span className="text-3xl font-mono font-black text-volt">{telemetry.overallReadiness}%</span>
              </div>
              <div className="text-center">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Bi-Weekly Target</span>
                <span className="text-3xl font-mono font-black text-cyan-400">{telemetry.targetReadiness}%</span>
              </div>
            </div>
          </div>
        </Card>

        {/* 2-Column: 4 Pillars + Trajectory */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* 4 Pillars */}
          <Card className="p-6 space-y-5 border-dark-border">
            <div className="flex items-center justify-between border-b border-dark-border/60 pb-3">
              <CardTitle className="text-base text-white font-display">4 Core Performance Pillars</CardTitle>
              <Badge variant="secondary" size="sm">Bi-Weekly Cadence</Badge>
            </div>

            <div className="space-y-4">
              {telemetry.pillars.map((pillar, idx) => (
                <div key={idx} className="space-y-1.5 p-3 rounded-xl bg-dark-bg/60 border border-dark-border/80">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">{pillar.pillarName}</span>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="font-bold text-white">{pillar.value}%</span>
                      {pillar.delta !== 0 && (
                        <span className={`text-[11px] font-bold ${pillar.delta > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {pillar.delta > 0 ? `+${pillar.delta}%` : `${pillar.delta}%`}
                        </span>
                      )}
                    </div>
                  </div>
                  <ProgressBar progress={pillar.value} color="volt" size="sm" />
                </div>
              ))}
            </div>
          </Card>

          {/* Performance Trajectory */}
          <Card className="p-6 space-y-4 border-dark-border">
            <div className="flex items-center justify-between border-b border-dark-border/60 pb-3">
              <CardTitle className="text-base text-white font-display">Performance Trajectory Curve</CardTitle>
              <span className="text-xs text-slate-400 font-mono">Historical & Projected</span>
            </div>

            <AdminTrajectoryChart 
              data={trajectory} 
              targetReadiness={telemetry.targetReadiness} 
            />

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-dark-border/60">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                Historical Performance
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-volt" />
                Projected Trajectory
              </span>
            </div>
          </Card>
        </div>

        {/* Assessments Record */}
        <Card className="p-6 space-y-4 border-dark-border">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base text-white font-display">Assessment History & Submissions</CardTitle>
            <span className="text-xs text-slate-400">{telemetry.assessmentsCompleted} of 4 Completed</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {assessments.map((a, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-dark-bg border border-dark-border space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant={a.status === 'COMPLETED' ? 'success' : 'secondary'} size="sm">
                    {a.status}
                  </Badge>
                  {a.score !== null && (
                    <span className="font-mono font-bold text-volt text-sm">{a.score}%</span>
                  )}
                </div>
                <h4 className="font-bold text-white text-xs">{a.title}</h4>
                <p className="text-[11px] text-slate-500">
                  {a.completedAt ? `Completed on ${new Date(a.completedAt).toLocaleDateString()}` : 'Evaluation pending'}
                </p>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </AdminLayout>
  );
};
export default AdminAthleteDetail;
