import React, { useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
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
  X,
  Zap,
  Flame
} from 'lucide-react';
import { useAthlete } from '../../context/AthleteContext';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/profile', label: 'My Profile', icon: User },
  { path: '/roadmap', label: 'My Roadmap', icon: Milestone },
  { path: '/learn', label: 'Learn', icon: BookOpen },
  { path: '/train', label: 'Train', icon: Dumbbell },
  { path: '/compete', label: 'Compete', icon: Trophy },
  { path: '/progress', label: 'Progress', icon: TrendingUp },
  { path: '/results', label: 'Results', icon: Award },
  { path: '/settings', label: 'Settings', icon: Settings },
];

const BOTTOM_SHORTCUTS = [
  { path: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { path: '/roadmap', label: 'Roadmap', icon: Milestone },
  { path: '/train', label: 'Train', icon: Dumbbell },
  { path: '/compete', label: 'Compete', icon: Trophy },
  { path: '/profile', label: 'Profile', icon: User },
];

export const MobileNav = ({ isOpen, onClose }) => {
  const { athlete } = useAthlete();
  const location = useLocation();

  // Close drawer on route change
  useEffect(() => {
    onClose();
  }, [location.pathname]);

  return (
    <>
      {/* Mobile Slide-out Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-dark-bg/85 backdrop-blur-md transition-opacity"
            onClick={onClose}
          />

          {/* Drawer Menu Panel */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-dark-bg border-r border-dark-border p-6 shadow-2xl z-10 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 mb-4 border-b border-dark-border/60">
                <Link to="/" className="flex items-center gap-2.5" onClick={onClose}>
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 to-volt flex items-center justify-center shadow-glow-sm">
                    <Zap className="w-5 h-5 text-slate-950 fill-current" />
                  </div>
                  <div>
                    <span className="font-display font-black text-lg tracking-tight text-white">
                      SportPath<span className="text-brand-accent">.AI</span>
                    </span>
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-dark-surface"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1.5 overflow-y-auto max-h-[calc(100vh-220px)]">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-brand-500/20 text-brand-300 font-semibold border-l-4 border-brand-accent'
                            : 'text-slate-400 hover:text-white hover:bg-dark-surface'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Athlete Mini Tag */}
            <div className="pt-4 border-t border-dark-border/60">
              <div className="flex items-center justify-between p-3 rounded-xl bg-dark-surface border border-dark-border">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-300 flex items-center justify-center font-bold text-xs">
                    {athlete.name ? athlete.name.charAt(0).toUpperCase() : 'A'}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{athlete.name || 'Alex'}</p>
                    <p className="text-[10px] text-slate-400">{athlete.sport} • {athlete.level}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-volt">{athlete.readiness || 35}% Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Navigation Bar (Phone view) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-dark-bg/95 backdrop-blur-xl border-t border-dark-border/80 px-2 py-2 safe-area-pb">
        <div className="flex items-center justify-around">
          {BOTTOM_SHORTCUTS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                    isActive
                      ? 'text-brand-accent font-semibold scale-105'
                      : 'text-slate-400 hover:text-slate-200'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MobileNav;
