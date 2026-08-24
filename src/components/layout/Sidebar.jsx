import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Milestone,
  BookOpen,
  Dumbbell,
  Trophy,
  TrendingUp,
  Award,
  Settings,
  Zap,
  Sparkles,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { useAthlete } from '../../context/AthleteContext';
import ProgressBar from '../ui/ProgressBar';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/profile', label: 'My Profile', icon: User },
  { path: '/roadmap', label: 'My Roadmap', icon: Milestone, badge: 'Active' },
  { path: '/learn', label: 'Learn', icon: BookOpen },
  { path: '/train', label: 'Train', icon: Dumbbell },
  { path: '/compete', label: 'Compete', icon: Trophy, badge: 'New' },
  { path: '/progress', label: 'Progress', icon: TrendingUp },
  { path: '/results', label: 'Results', icon: Award },
];

export const Sidebar = () => {
  const { athlete } = useAthlete();

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-dark-bg border-r border-dark-border/80 p-4 select-none z-20">
      
      {/* Brand Header */}
      <div className="px-3 py-2 mb-6">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-500 via-cyan-400 to-volt p-0.5 shadow-glow-sm group-hover:shadow-glow-brand transition-all duration-300">
            <div className="w-full h-full bg-dark-bg rounded-[14px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-brand-accent group-hover:scale-110 transition-transform duration-200" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-lg tracking-tight text-white">
                SportPath
              </span>
              <span className="text-xs font-black px-1.5 py-0.5 rounded-md bg-brand-500/20 text-brand-accent border border-brand-500/30">
                AI
              </span>
            </div>
            <p className="text-[10px] font-medium text-slate-400 tracking-wide uppercase">
              Career Engine
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Athlete Portal
        </div>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-500/20 to-transparent text-white font-semibold border-l-4 border-brand-accent shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-dark-surface/60'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-slate-400 group-hover:text-brand-400 transition-colors" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                  item.badge === 'New' 
                    ? 'bg-volt/20 text-volt border border-volt/30' 
                    : 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                }`}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}

        <div className="pt-4 pb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Preferences
        </div>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
              isActive
                ? 'bg-gradient-to-r from-brand-500/20 to-transparent text-white font-semibold border-l-4 border-brand-accent'
                : 'text-slate-400 hover:text-slate-200 hover:bg-dark-surface/60'
            }`
          }
        >
          <Settings className="w-4 h-4 text-slate-400 group-hover:text-brand-400 transition-colors" />
          <span>Settings</span>
        </NavLink>
      </nav>

      {/* Bottom Athlete Readiness Widget */}
      <div className="mt-auto pt-4 border-t border-dark-border/60">
        <div className="p-3.5 rounded-2xl bg-dark-surface/90 border border-dark-border relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-volt animate-ping" />
              <span className="text-xs font-bold text-slate-200">Readiness Score</span>
            </div>
            <span className="text-xs font-mono font-bold text-volt">
              {athlete.readiness || 35}%
            </span>
          </div>
          <ProgressBar value={athlete.readiness || 35} size="sm" color="volt" showValue={false} />
          
          <Link
            to="/assessment"
            className="mt-3 flex items-center justify-between text-[11px] font-semibold text-brand-400 hover:text-brand-300 transition-colors group"
          >
            <span>Take Assessment</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;
