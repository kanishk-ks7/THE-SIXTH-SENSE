import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Users, 
  Search, 
  Filter, 
  TrendingUp, 
  Activity, 
  Award, 
  ChevronRight, 
  ArrowUpDown,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import LoadingState from '../../components/ui/LoadingState';
import EmptyState from '../../components/ui/EmptyState';
import { adminService } from '../../services/adminService';
import { SPORTS_LIST } from '../../data/mockData';

export const AdminAthletes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSport = searchParams.get('sport') || 'all';
  const initialLevel = searchParams.get('level') || 'all';

  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSport, setSelectedSport] = useState(initialSport);
  const [selectedLevel, setSelectedLevel] = useState(initialLevel);

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        setLoading(true);
        const response = await adminService.getAthletes({
          search,
          sport: selectedSport,
          level: selectedLevel
        });
        if (response?.data) {
          setAthletes(response.data);
        }
      } catch (err) {
        console.error('Error loading athletes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAthletes();
  }, [search, selectedSport, selectedLevel]);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedSport('all');
    setSelectedLevel('all');
    setSearchParams({});
  };

  return (
    <AdminLayout 
      title="Athlete Management Directory" 
      subtitle="Inspect individual progression metrics, performance trajectories, and assessment evaluations."
    >
      <div className="space-y-6">
        
        {/* Filter Controls Bar */}
        <Card className="p-4 border-dark-border bg-dark-surface/90 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search athlete by name or registered email..."
              className="w-full bg-dark-bg border border-dark-border rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-volt transition-colors"
            />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Sport Filter */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Sport:</span>
              <select
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                className="bg-dark-bg border border-dark-border rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-volt"
              >
                <option value="all">All Sports</option>
                {SPORTS_LIST.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Level:</span>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="bg-dark-bg border border-dark-border rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-volt"
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {(search || selectedSport !== 'all' || selectedLevel !== 'all') && (
              <Button
                variant="ghost"
                size="sm"
                icon={RotateCcw}
                onClick={handleResetFilters}
                className="text-xs text-slate-400 hover:text-white"
              >
                Reset
              </Button>
            )}
          </div>
        </Card>

        {/* Athletes Table Card */}
        <Card className="p-6 border-dark-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Registered Athletes ({athletes.length})
            </h3>
            <span className="text-xs text-slate-400">Showing dynamic performance indicators</span>
          </div>

          {loading ? (
            <LoadingState text="Loading athlete directory..." />
          ) : athletes.length === 0 ? (
            <EmptyState
              icon={Users}
              title="No athletes found"
              description="No athletes match the specified search query or filter criteria."
              actionText="Reset Filters"
              onActionClick={handleResetFilters}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-dark-border text-slate-400 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="pb-3 px-3">Athlete</th>
                    <th className="pb-3 px-3">Sport Discipline</th>
                    <th className="pb-3 px-3">Level & Position</th>
                    <th className="pb-3 px-3">Readiness</th>
                    <th className="pb-3 px-3">Latest Assessment</th>
                    <th className="pb-3 px-3">Joined</th>
                    <th className="pb-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-border/40">
                  {athletes.map(ath => (
                    <tr key={ath.id} className="hover:bg-dark-surface/60 transition-colors">
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-white text-sm">{ath.name}</div>
                        <div className="font-mono text-slate-400 text-[11px]">{ath.email}</div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="font-semibold text-white">{ath.selectedSport}</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <Badge variant="secondary" size="sm">{ath.difficultyLevel}</Badge>
                        <div className="text-[11px] text-slate-400 mt-1">{ath.position}</div>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 font-mono font-bold text-volt">
                            <span>{ath.overallProgress}%</span>
                            <span className="text-[10px] text-slate-500">/ 100</span>
                          </div>
                          <div className="w-20">
                            <ProgressBar progress={ath.overallProgress} color="volt" size="xs" />
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="font-mono text-white font-semibold">{ath.latestAssessmentScore}%</div>
                        <div className="text-[10px] text-slate-400">{ath.assessmentsCompleted} of 4 Completed</div>
                      </td>
                      <td className="py-3.5 px-3 text-slate-400 font-mono">
                        {ath.joinedDate}
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <Link to={`/admin/athletes/${ath.id}`}>
                          <Button variant="volt" size="sm" className="text-xs font-bold text-slate-950">
                            Inspect Dossier
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

      </div>
    </AdminLayout>
  );
};
export default AdminAthletes;
