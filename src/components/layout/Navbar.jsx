import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Zap, 
  Bell, 
  Settings, 
  User, 
  ChevronDown, 
  Flame, 
  Menu, 
  Sun, 
  Moon, 
  Sparkles, 
  LogOut, 
  ShieldCheck, 
  Milestone, 
  ClipboardCheck 
} from 'lucide-react';
import { useAthlete } from '../../context/AthleteContext';
import { SPORTS_LIST } from '../../data/mockData';
import Badge from '../ui/Badge';

export const Navbar = ({ onToggleMobileMenu }) => {
  const navigate = useNavigate();
  const { athlete, updateProfile, theme, toggleTheme, logout, isAuthenticated } = useAthlete();
  const [showSportMenu, setShowSportMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();

  const handleSportChange = (sportName) => {
    updateProfile({ sport: sportName });
    setShowSportMenu(false);
  };

  const handleLogout = () => {
    setShowUserMenu(false);
    logout();
    navigate('/login');
  };

  const notifications = [
    { id: 1, title: 'Roadmap Step Ready', desc: 'Complete your 4-pillar assessment to unlock Foundation stage.', time: '10m ago', unread: true },
    { id: 2, title: 'New Drill Added', desc: 'Agility Ladder footwork drill added to today’s training.', time: '2h ago', unread: false },
    { id: 3, title: 'Upcoming Trial Alert', desc: 'Metropolitan Youth Championship registration closes soon.', time: '1d ago', unread: false }
  ];

  return (
    <header className="sticky top-0 z-30 w-full bg-dark-bg/90 backdrop-blur-xl border-b border-dark-border/80 px-4 sm:px-6 py-3 transition-all duration-200">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left: Mobile Menu Button & Brand (mobile only) */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-dark-surface border border-dark-border/60 transition-colors"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo visible on mobile navbar */}
          <Link to="/dashboard" className="flex items-center gap-2 lg:hidden">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-500 to-volt flex items-center justify-center shadow-glow-sm">
              <Zap className="w-4 h-4 text-slate-950 fill-current" />
            </div>
            <span className="font-display font-extrabold text-base tracking-tight text-white">
              Athletex<span className="text-volt">.AI</span>
            </span>
          </Link>

          {/* Quick Sport Switcher Pill (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 relative">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Sport:</span>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowSportMenu(!showSportMenu)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-dark-surface border border-dark-border hover:border-volt/50 text-xs font-semibold text-slate-200 transition-all shadow-sm group"
              >
                <span className="w-2 h-2 rounded-full bg-volt animate-pulse" />
                <span>{athlete.sport || 'Football'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
              </button>

              {showSportMenu && (
                <div 
                  className="absolute left-0 mt-2 w-52 bg-dark-surface border border-dark-border rounded-2xl shadow-2xl p-1.5 z-40 animate-scale-up"
                  onMouseLeave={() => setShowSportMenu(false)}
                >
                  <p className="text-[10px] uppercase font-bold text-slate-400 px-3 py-1.5">Change Active Sport</p>
                  {SPORTS_LIST.map((sp) => (
                    <button
                      key={sp.id}
                      type="button"
                      onClick={() => handleSportChange(sp.name)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                        athlete.sport === sp.name
                          ? 'bg-volt/15 text-volt font-bold'
                          : 'text-slate-300 hover:bg-dark-card hover:text-white'
                      }`}
                    >
                      <span>{sp.name}</span>
                      {athlete.sport === sp.name && <span className="text-volt text-xs">●</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Action Icons & Athlete Mini Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Readiness Pill (Desktop) */}
          <Link to="/assessment" className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-dark-surface/80 border border-dark-border hover:border-volt/40 transition-colors text-xs">
            <Flame className="w-4 h-4 text-volt animate-pulse" />
            <span className="text-slate-400">Readiness:</span>
            <span className="font-mono font-bold text-white">{athlete.readiness || 35}%</span>
          </Link>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-dark-surface border border-dark-border/60 transition-colors"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-300" />}
          </button>

          {/* Notification Center */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-dark-surface border border-dark-border/60 transition-colors"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-volt animate-ping" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-volt" />
            </button>

            {showNotifications && (
              <div 
                className="absolute right-0 mt-2 w-80 bg-dark-surface border border-dark-border rounded-2xl shadow-2xl p-4 z-40 animate-scale-up"
                onMouseLeave={() => setShowNotifications(false)}
              >
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-dark-border/60">
                  <h4 className="text-sm font-bold text-white font-display">Notifications</h4>
                  <Badge variant="volt" size="sm">3 Updates</Badge>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2.5 rounded-xl bg-dark-bg/60 border border-dark-border/40 hover:border-slate-600 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-200">{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-snug">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Settings Shortcut */}
          <Link
            to="/settings"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-dark-surface border border-dark-border/60 transition-colors"
            title="Settings"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </Link>

          {/* User Profile Pill & Dropdown Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl bg-dark-surface hover:bg-dark-card border border-dark-border hover:border-volt/40 transition-all group"
            >
              <div className="relative w-7 h-7 rounded-lg overflow-hidden bg-volt/10 border border-volt/30 flex items-center justify-center flex-shrink-0">
                {athlete.avatar ? (
                  <img src={athlete.avatar} alt={athlete.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs font-bold text-volt font-display">
                    {athlete.name ? athlete.name.charAt(0).toUpperCase() : 'A'}
                  </span>
                )}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-200 group-hover:text-volt transition-colors leading-tight">
                  {athlete.name || 'Alex Johnson'}
                </p>
                <p className="text-[10px] font-medium text-slate-400 leading-tight">
                  {athlete.sport} • {athlete.level}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
            </button>

            {showUserMenu && (
              <div 
                className="absolute right-0 mt-2 w-64 bg-dark-surface border border-dark-border rounded-2xl shadow-2xl p-2 z-50 animate-scale-up"
                onMouseLeave={() => setShowUserMenu(false)}
              >
                {/* User Dropdown Header */}
                <div className="p-3 border-b border-dark-border/60 mb-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-dark-bg border border-volt/30 overflow-hidden flex items-center justify-center flex-shrink-0">
                      {athlete.avatar ? (
                        <img src={athlete.avatar} alt={athlete.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-bold text-volt text-sm">{athlete.name ? athlete.name.charAt(0) : 'A'}</span>
                      )}
                    </div>
                    <div className="truncate">
                      <h4 className="text-xs font-bold text-white truncate">{athlete.name || 'Alex Johnson'}</h4>
                      <p className="text-[10px] text-slate-400 truncate">{athlete.email || 'alex.athlete@athletex.ai'}</p>
                    </div>
                  </div>
                </div>

                {/* Dropdown Navigation Links */}
                <div className="space-y-1 text-xs">
                  <Link
                    to="/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-dark-card transition-colors"
                  >
                    <User className="w-4 h-4 text-volt" />
                    <span>My Athlete Passport</span>
                  </Link>

                  <Link
                    to="/assessment"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-dark-card transition-colors"
                  >
                    <ClipboardCheck className="w-4 h-4 text-cyan-400" />
                    <span>Take Assessment</span>
                  </Link>

                  <Link
                    to="/roadmap"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-dark-card transition-colors"
                  >
                    <Milestone className="w-4 h-4 text-amber-400" />
                    <span>Career Roadmap</span>
                  </Link>

                  <Link
                    to="/settings"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-dark-card transition-colors"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    <span>Account Settings</span>
                  </Link>

                  <div className="border-t border-dark-border/60 my-1" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4 text-red-400" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
