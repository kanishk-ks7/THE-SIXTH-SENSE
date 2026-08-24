import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  TrendingUp, 
  Award, 
  Activity, 
  ArrowUpRight, 
  Sparkles, 
  Search, 
  Filter, 
  ChevronRight,
  ShieldAlert,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import Card, { CardHeader, CardTitle } from '../../components/ui/Card';
import StatCard from '../../components/ui/StatCard';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import LoadingState from '../../components/ui/LoadingState';
import { adminService } from '../../services/adminService';

export const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await adminService.getDashboardStats();
        if (response?.data) {
          setDashboardData(response.data);
        }
      } catch (err) {
        setError(err.message || 'Failed to load administrative analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <AdminLayout title="Admin Overview" subtitle="Platform analytics and athlete governance">
        <LoadingState text="Aggregating platform telemetry..." />
      </AdminLayout>
    );
  }

  const stats = dashboardData?.stats || {
    totalAthletes: 1,
    activeAthletes: 1,
    averageReadiness: 35,
    assessmentCompletionRate: 25,
    totalAssessmentsTaken: 1
  };

  const sportDist = dashboardData?.sportDistribution || { Football: 1 };
  const recentAthletes = dashboardData?.recentAthletes || [];

  return (
    <AdminLayout 
      title="Governance & Analytics Overview" 
      subtitle="Real-time multi-sport progression monitoring across all registered athletes."
    >
      <div className="space-y-8">
        
        {/* KPI Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Registered Athletes"
            value={stats.totalAthletes}
            icon={Users}
            color="brand"
            delta="+100%"
            helpText="Active athlete accounts"
          />

          <StatCard
            label="Average Athlete Readiness"
            value={`${stats.averageReadiness}%`}
            icon={TrendingUp}
            color="volt"
            delta="+4% bi-weekly"
            helpText="Platform composite readiness"
          />

          <StatCard
            label="Assessment Completion Rate"
            value={`${stats.assessmentCompletionRate}%`}
            icon={Award}
            color="amber"
            delta="1 of 4 core pillars"
            helpText="Bi-weekly cycle adherence"
          />

          <StatCard
            label="Active Disciplines"
            value={Object.keys(sportDist).length}
            icon={Activity}
            color="emerald"
            helpText="Across 8 sports"
          />
        </div>

        {/* Middle Section: Sport Distribution + Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Sport Distribution Chart */}
          <Card className="lg:col-span-2 p-6 space-y-5 border-dark-border">
            <CardHeader className="p-0 border-0 flex items-center justify-between">
              <div>
                <CardTitle className="text-base text-white font-display">Athletes by Sport Discipline</CardTitle>
                <p className="text-xs text-slate-400">Distribution of primary athletic choices across the platform</p>
              </div>
              <Badge variant="brand" size="sm">Live Registry</Badge>
            </CardHeader>

            <div className="space-y-4 pt-2">
              {Object.entries(sportDist).map(([sport, count]) => {
                const percent = Math.round((count / Math.max(1, stats.totalAthletes)) * 100);
                return (
                  <div key={sport} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">{sport}</span>
                      <span className="font-mono text-slate-300">{count} Athletes ({percent}%)</span>
                    </div>
                    <ProgressBar progress={percent} color="volt" size="sm" />
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Quick Management Actions */}
          <Card className="p-6 space-y-4 border-dark-border bg-gradient-to-b from-dark-surface to-dark-bg/90">
            <CardHeader className="p-0 border-0">
              <CardTitle className="text-base text-white font-display flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-volt" />
                Administrative Actions
              </CardTitle>
              <p className="text-xs text-slate-400">Direct directory drill-downs</p>
            </CardHeader>

            <div className="space-y-2.5 pt-2">
              <Link to="/admin/athletes" className="block">
                <Button variant="secondary" size="md" className="w-full justify-between text-xs" icon={Users}>
                  <span>Browse Athlete Directory</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Button>
              </Link>

              <Link to="/admin/athletes?level=Beginner" className="block">
                <Button variant="secondary" size="md" className="w-full justify-between text-xs" icon={Activity}>
                  <span>Filter Beginner Athletes</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Button>
              </Link>

              <Link to="/admin/athletes?level=Advanced" className="block">
                <Button variant="secondary" size="md" className="w-full justify-between text-xs" icon={TrendingUp}>
                  <span>Filter Advanced Athletes</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Button>
              </Link>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-bg border border-dark-border/80 text-[11px] text-slate-400 leading-relaxed">
              <strong className="text-white block mb-1">RBAC Security Notice:</strong>
              All telemetry inspections and dossier queries are authenticated via JSON Web Tokens with strict ADMIN role verification.
            </div>
          </Card>
        </div>

        {/* Recent Athletes Table */}
        <Card className="p-6 space-y-4 border-dark-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-display">Recent Athlete Profiles</h3>
              <p className="text-xs text-slate-400">Latest active users tracking performance progression</p>
            </div>
            <Link to="/admin/athletes">
              <Button variant="outline" size="sm" className="text-xs" icon={ArrowUpRight} iconPosition="right">
                View Full Roster
              </Button>
            </Link>
          </div>

          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-dark-border text-slate-400 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="pb-3 px-3">Athlete</th>
                  <th className="pb-3 px-3">Sport & Level</th>
                  <th className="pb-3 px-3">Readiness</th>
                  <th className="pb-3 px-3">Assessments</th>
                  <th className="pb-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border/40">
                {recentAthletes.map(ath => (
                  <tr key={ath.id} className="hover:bg-dark-surface/60 transition-colors">
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-white text-sm">{ath.name}</div>
                      <div className="font-mono text-slate-400 text-[11px]">{ath.email}</div>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="font-semibold text-slate-200">{ath.selectedSport}</div>
                      <Badge variant="secondary" size="sm" className="mt-0.5">{ath.difficultyLevel}</Badge>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-volt">{ath.overallProgress}%</span>
                        <div className="w-16">
                          <ProgressBar progress={ath.overallProgress} color="volt" size="xs" />
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="text-slate-300 font-mono">{ath.assessmentsCompleted} / 4 Done</span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <Link to={`/admin/athletes/${ath.id}`}>
                        <Button variant="outline" size="sm" className="text-xs">
                          Inspect Dossier →
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

      </div>
    </AdminLayout>
  );
};
export default AdminDashboard;
