import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Users, 
  LayoutDashboard, 
  Activity, 
  LogOut, 
  ChevronRight,
  Sparkles,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { useAthlete } from '../../context/AthleteContext';
import Button from '../ui/Button';

export const AdminLayout = ({ children, title, subtitle }) => {
  const { logout, currentUser } = useAthlete();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Admin Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Athlete Directory', path: '/admin/athletes', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 flex flex-col font-sans">
      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-40 bg-dark-surface/90 backdrop-blur-xl border-b border-dark-border/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 via-cyan-400 to-volt p-0.5 shadow-glow-sm">
                <div className="w-full h-full bg-dark-bg rounded-[10px] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-volt" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-base tracking-tight text-white">
                    Athletex
                  </span>
                  <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-volt/20 text-volt border border-volt/30">
                    Admin
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">Governance & Analytics</p>
              </div>
            </Link>

            {/* Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1 ml-6 pl-6 border-l border-dark-border/60">
              {navItems.map(item => {
                const isActive = location.pathname === item.path || 
                  (item.path === '/admin/athletes' && location.pathname.startsWith('/admin/athletes'));
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-brand-500/15 text-volt border border-volt/30 shadow-glow-volt/10'
                        : 'text-slate-400 hover:text-white hover:bg-dark-card/60'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-dark-card border border-dark-border text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-medium">{currentUser?.email || 'admin@athletex.ai'}</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              icon={LogOut}
              onClick={handleLogout}
              className="text-xs"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-6">
        {(title || subtitle) && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-dark-border/60">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <Link to="/admin/dashboard" className="hover:text-volt transition-colors">Admin Portal</Link>
                <ChevronRight className="w-3 h-3 text-slate-600" />
                <span className="text-slate-200">{title}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
                {title}
              </h1>
              {subtitle && <p className="text-xs sm:text-sm text-slate-400 mt-1">{subtitle}</p>}
            </div>
          </div>
        )}

        {children}
      </main>

      {/* Admin Footer */}
      <footer className="border-t border-dark-border/40 py-4 px-8 text-center text-xs text-slate-600">
        Athletex Platform Governance • Administrator Console
      </footer>
    </div>
  );
};
