import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  ArrowRight, 
  UserCheck, 
  ClipboardCheck, 
  Milestone, 
  Dumbbell, 
  Trophy, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Flame,
  CheckCircle2,
  ChevronRight,
  Activity,
  Target,
  Menu,
  X,
  Compass,
  BarChart3,
  Award,
  Layers
} from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import TiltCard from '../components/ui/TiltCard';
import { SPORTS_LIST } from '../data/mockData';

// 60fps Smooth Number Counter Animation
const AnimatedNumber = ({ value = 94.8, duration = 1.4, decimals = 1, prefix = '', suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const targetVal = typeof value === 'number' ? value : parseFloat(value) || 0;
    let startTime = null;
    let frameId;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / (duration * 1000);
      const progress = Math.min(elapsed, 1);
      // Smooth ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = targetVal * eased;
      setDisplayValue(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(targetVal);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [value, duration]);

  return <span>{prefix}{displayValue.toFixed(decimals)}{suffix}</span>;
};

// Interactive Verified Status Widget for Card 1
const VerifiedBadgeWidget = () => {
  const [verifiedProgress, setVerifiedProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  return (
    <motion.div 
      className="mt-6 p-4 rounded-xl bg-[#05070B]/70 border border-white/[0.06] space-y-2.5"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onViewportEnter={() => {
        let startTime = null;
        let frameId;
        const step = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / 1000, 1);
          const current = Math.floor(progress * 100);
          setVerifiedProgress(current);
          if (progress < 1) {
            frameId = requestAnimationFrame(step);
          } else {
            setIsComplete(true);
          }
        };
        frameId = requestAnimationFrame(step);
      }}
    >
      <div className="flex justify-between text-xs text-slate-300 font-mono">
        <span>Athletic Passport Status</span>
        <div className="flex items-center gap-1.5 font-bold text-emerald-400">
          <motion.span
            animate={isComplete ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.35 }}
            className="inline-flex items-center"
          >
            {isComplete ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <span className="w-2 h-2 rounded-full bg-emerald-400/80 animate-pulse" />
            )}
          </motion.span>
          <span>{verifiedProgress}% Verified</span>
        </div>
      </div>
      <div className="flex gap-1.5">
        <span className="px-2 py-1 rounded bg-white/[0.05] text-[10px] font-mono text-slate-400">Biomechanics</span>
        <span className="px-2 py-1 rounded bg-white/[0.05] text-[10px] font-mono text-slate-400">Skill Radar</span>
        <span className="px-2 py-1 rounded bg-white/[0.05] text-[10px] font-mono text-slate-400">Match Log</span>
      </div>
    </motion.div>
  );
};

// Animated Career Roadmap Widget for Card 2
const CareerRoadmapWidget = () => {
  return (
    <div className="mt-6 p-4 rounded-xl bg-[#05070B]/70 border border-white/[0.06] space-y-2.5">
      <div className="flex justify-between text-xs text-slate-300 font-mono">
        <span>Career Path Progression</span>
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-volt font-bold"
        >
          Stage 3 of 5
        </motion.span>
      </div>
      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: '0%' }}
          whileInView={{ width: '65%' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="bg-gradient-to-r from-volt via-cyan-400 to-emerald-400 h-full rounded-full"
        />
      </div>
    </div>
  );
};

// Scouting Progression Pathway for Section 9
const ScoutingProgressionPathway = () => {
  const stages = [
    { name: 'Grassroots Potential', short: 'Grassroots' },
    { name: 'Assessment', short: 'Assessment' },
    { name: 'Training', short: 'Training' },
    { name: 'Performance', short: 'Performance' },
    { name: 'State Selection', short: 'State' },
    { name: 'National Selection', short: 'National' }
  ];

  return (
    <div className="pt-4 border-t border-white/[0.08] space-y-2.5">
      <div className="flex items-center justify-between text-xs font-mono text-slate-400">
        <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          Scouting & Selection Pipeline
        </span>
        <span className="text-[10px] text-volt font-mono">Grassroots → National</span>
      </div>

      <div className="relative pt-2 pb-1">
        {/* Connecting progression line base track */}
        <div className="absolute top-[18px] left-3 right-3 h-[2px] bg-white/10 z-0" />
        
        {/* Animated drawing progression line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
          className="absolute top-[18px] left-3 right-3 h-[2px] bg-gradient-to-r from-cyan-400 via-brand-accent to-volt z-0 shadow-[0_0_8px_rgba(0,240,255,0.6)]"
        />

        {/* 6 Stage Nodes */}
        <div className="relative z-10 flex items-center justify-between">
          {stages.map((stage, idx) => (
            <motion.div
              key={stage.name}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: 0.2 + idx * 0.15, ease: 'easeOut' }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-[#090F1C] border border-white/25 flex items-center justify-center group-hover:border-volt group-hover:scale-110 group-hover:shadow-[0_0_12px_#CCFF00] transition-all">
                <span className={`w-2 h-2 rounded-full ${
                  idx <= 1 
                    ? 'bg-cyan-400 shadow-[0_0_6px_#00F0FF]' 
                    : idx <= 3 
                    ? 'bg-brand-400 shadow-[0_0_6px_#22D3EE]' 
                    : idx === 4 
                    ? 'bg-emerald-400 shadow-[0_0_6px_#10B981]' 
                    : 'bg-volt shadow-[0_0_8px_#CCFF00]'
                }`} />
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 group-hover:text-slate-200 mt-1.5 text-center hidden sm:block whitespace-nowrap transition-colors">
                {stage.short}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Landing = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSportId, setActiveSportId] = useState('football');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const steps = [
    {
      num: '01',
      title: 'Create Your Profile',
      desc: 'Set up your athletic identity, current sport, background, and career aspirations.',
      icon: UserCheck
    },
    {
      num: '02',
      title: 'Assess Your Level',
      desc: 'Evaluate 4 pillars: Technical Skills, Physical Fitness, Tactical IQ, and Performance.',
      icon: ClipboardCheck
    },
    {
      num: '03',
      title: 'Get Your Roadmap',
      desc: 'Receive an AI-driven, step-by-step career progression trajectory.',
      icon: Milestone
    },
    {
      num: '04',
      title: 'Learn & Train',
      desc: 'Access curated sports theory, drills, and structured daily routines.',
      icon: Dumbbell
    },
    {
      num: '05',
      title: 'Track & Compete',
      desc: 'Discover verified trials, tournaments, and log your competitive achievements.',
      icon: Trophy
    }
  ];

  const features = [
    {
      title: 'Personalized Athlete Profile',
      desc: 'A comprehensive digital athletic passport displaying verified statistics, physical metrics, and growth timeline.',
      icon: UserCheck,
      badge: 'Core Identity'
    },
    {
      title: 'Structured Career Roadmap',
      desc: 'Dynamic stage-by-stage progression from grassroots foundation to scouted competitive selections.',
      icon: Milestone,
      badge: 'AI Engine'
    },
    {
      title: 'Learning Resources',
      desc: 'Curated sports science, tactical masterclasses, rules breakdowns, and position-specific fundamentals.',
      icon: Activity,
      badge: 'Knowledge'
    },
    {
      title: 'Training Progress & Drills',
      desc: 'Adaptive training schedules, agility workouts, and consistency trackers aligned with your milestones.',
      icon: Dumbbell,
      badge: 'Conditioning'
    },
    {
      title: 'Competition Opportunities',
      desc: 'Curated calendar of verified tournaments, academy selection trials, and scouting showcases.',
      icon: Trophy,
      badge: 'Live Events'
    }
  ];

  const activeSportData = SPORTS_LIST.find(s => s.id === activeSportId) || SPORTS_LIST[0];

  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 selection:bg-volt selection:text-slate-950 relative overflow-x-hidden font-sans">
      
      {/* Background Ambient Grid & Radial Lighting */}
      <div className="fixed inset-0 sports-grid-pattern opacity-40 pointer-events-none z-0" />
      <div className="fixed top-0 left-1/4 w-[700px] h-[500px] bg-brand-500/10 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="fixed top-1/3 right-[-100px] w-[600px] h-[600px] bg-volt/5 rounded-full blur-[180px] pointer-events-none z-0" />
      <div className="fixed bottom-10 left-1/3 w-[800px] h-[400px] bg-cyan-500/5 rounded-full blur-[180px] pointer-events-none z-0" />

      {/* Top Navigation */}
      <header className={`sticky top-0 z-50 transition-all duration-300 px-4 sm:px-8 py-3.5 ${
        scrolled 
          ? 'bg-[#080C14]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.6)]' 
          : 'bg-transparent border-b border-white/[0.04]'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 via-cyan-400 to-volt p-[1.5px] shadow-glow-sm group-hover:shadow-glow-volt transition-all duration-300">
              <div className="w-full h-full bg-[#080C14] rounded-[10px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-volt group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-xl tracking-tight text-white leading-none">
                Athletex<span className="bg-gradient-to-r from-cyan-400 to-volt bg-clip-text text-transparent">.AI</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase mt-0.5">
                Sports Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/admin/login">
              <Button variant="outline" size="sm" icon={ShieldCheck} className="text-xs text-slate-300 border-white/15 hover:border-volt/50 hover:text-volt hover:bg-volt/5">
                Admin Portal
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-xs text-slate-300 hover:text-white">
                Log In
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="secondary" size="sm" className="text-xs text-slate-200 border-white/10 hover:border-cyan-400/50">
                Demo Portal
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="volt" size="sm" icon={ArrowRight} iconPosition="right" className="text-xs text-slate-950 font-black shadow-glow-volt-sm">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Link to="/signup">
              <Button variant="volt" size="sm" className="text-xs font-bold text-slate-950 py-1.5 px-3">
                Get Started
              </Button>
            </Link>
            <button 
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-dark-card border border-white/10 text-slate-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-white/10 mt-3.5 space-y-2 animate-fadeIn">
            <div className="grid grid-cols-2 gap-2">
              <Link to="/admin/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" icon={ShieldCheck} className="w-full text-xs">
                  Admin Portal
                </Button>
              </Link>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  Log In
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="secondary" size="sm" className="w-full text-xs">
                  Demo Portal
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="volt" size="sm" icon={ArrowRight} iconPosition="right" className="w-full text-xs font-bold text-slate-950">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 px-4 sm:px-8 z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headline, Description & CTAs */}
            <div className="lg:col-span-7 space-y-8 text-left">
              
              {/* Premium Pill Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-dark-surface/90 to-dark-card/90 border border-volt/30 shadow-[0_0_20px_-3px_rgba(204,255,0,0.25)] backdrop-blur-md hero-anim-badge">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-volt opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-volt"></span>
                </span>
                <Sparkles className="w-4 h-4 text-volt" />
                <span className="text-xs font-semibold text-slate-200 tracking-wide">
                  The Intelligent Sports Career Platform for Student Athletes
                </span>
              </div>

              {/* 1. HERO TEXT ANIMATION — Sequential 3 Lines */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white font-display leading-[1.08]">
                <span className="block hero-anim-line-1">
                  Find your path.
                </span>
                <span className="block bg-gradient-to-r from-cyan-300 via-brand-accent to-volt bg-clip-text text-transparent animate-glow-subtle hero-anim-line-2">
                  Build your skills.
                </span>
                <span className="block hero-anim-line-3">
                  Reach your potential.
                </span>
              </h1>

              {/* Subtitle Description */}
              <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed font-normal hero-anim-desc">
                An intelligent sports career companion that helps athletes understand where they are, what they should improve, and what opportunities they can pursue next.
              </p>

              {/* Dual Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 hero-anim-buttons">
                <Link to="/signup" className="w-full sm:w-auto">
                  <Button 
                    variant="volt" 
                    size="lg" 
                    className="w-full text-slate-950 font-black shadow-[0_0_25px_-2px_rgba(204,255,0,0.45)] hover:shadow-[0_0_35px_-2px_rgba(204,255,0,0.65)] hover:scale-105 transition-all duration-200" 
                    icon={ArrowRight} 
                    iconPosition="right"
                  >
                    Create Free Account
                  </Button>
                </Link>
                <Link to="/dashboard" className="w-full sm:w-auto">
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    className="w-full border-white/10 hover:border-cyan-400/50 hover:bg-dark-cardHover/80 text-white font-bold hover:scale-105 transition-all duration-200" 
                    icon={Activity}
                  >
                    Explore Platform Demo
                  </Button>
                </Link>
              </div>

              {/* 4. SUPPORTED SPORTS PILLS (Hover scale, glow & icon translation) */}
              <div className="pt-6 border-t border-white/[0.06] space-y-3 hero-anim-pills">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-volt" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Supported Sports:
                  </span>
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                  {SPORTS_LIST.slice(0, 7).map((s) => {
                    const isSelected = s.id === activeSportId;
                    return (
                      <motion.button
                        key={s.id}
                        type="button"
                        onClick={() => setActiveSportId(s.id)}
                        whileHover={{ scale: 1.06, y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer will-change-transform ${
                          isSelected
                            ? 'bg-gradient-to-r from-brand-500/20 to-volt/20 text-volt border border-volt/60 shadow-[0_0_16px_rgba(204,255,0,0.45)]'
                            : 'bg-dark-card/80 border border-white/[0.08] text-slate-300 hover:text-white hover:border-volt/50 hover:bg-dark-cardHover hover:shadow-glow-volt-sm'
                        }`}
                      >
                        <motion.span 
                          className="w-2 h-2 rounded-full inline-block" 
                          style={{ backgroundColor: s.color || '#00F0FF' }}
                          whileHover={{ x: 3 }}
                        />
                        {s.name}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* 2. HERO AI ATHLETE DASHBOARD (Number Counter, Progress Bar & Live Status) */}
            <div className="lg:col-span-5 relative hero-anim-card">
              
              {/* Outer Glowing Frame */}
              <div className="relative rounded-3xl p-1 bg-gradient-to-b from-white/15 via-cyan-500/20 to-volt/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
                
                {/* Main Hero Visual Surface */}
                <div className="relative rounded-[22px] overflow-hidden bg-[#0a101d] border border-white/10 aspect-[4/5] sm:aspect-[4/4.5] flex flex-col justify-end">
                  
                  {/* High Resolution Sports Photography Asset */}
                  <img
                    src="https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80"
                    alt="Professional Athlete Training"
                    className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.1] scale-105 transition-transform duration-700 hover:scale-100"
                    loading="eager"
                  />

                  {/* Dark Multi-layer Vignette & Sports Lighting Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/50 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#05070B]/70 via-transparent to-[#05070B]/30" />
                  <div className="absolute top-0 right-0 w-48 h-48 bg-volt/15 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

                  {/* Top Floating Badge: Live Sports Engine with Pulsing Indicator */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                    <div className="glass-panel px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2 shadow-lg">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                      </span>
                      <span className="text-[11px] font-mono font-bold text-slate-200 uppercase tracking-wider">
                        Live AI Diagnostic
                      </span>
                    </div>

                    <div className="glass-panel px-2.5 py-1 rounded-lg border border-white/10 text-[11px] font-mono font-bold text-volt">
                      {activeSportData.name} Pro
                    </div>
                  </div>

                  {/* Telemetry HUD Floating Card */}
                  <motion.div 
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-20 p-5 space-y-3.5 m-3 rounded-2xl glass-card-premium border border-white/15 shadow-2xl"
                  >
                    
                    {/* Athlete Performance Bar with Live Animated Counter 0 -> 94.8 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-volt/10 border border-volt/30 flex items-center justify-center text-volt">
                          <Activity className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white leading-none">Athletic Index Rating</div>
                          <div className="text-[10px] font-mono text-slate-400 mt-0.5">Physical · Technical · Tactical</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-mono font-black text-volt">
                          <AnimatedNumber value={94.8} decimals={1} duration={1.5} />
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono"> /100</span>
                      </div>
                    </div>

                    {/* Metric Progress Bar: Grows 0% -> 88% */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-[10px] font-mono text-slate-300">
                        <span>Career Milestone Alignment</span>
                        <span className="text-cyan-400 font-bold">State Selection Ready</span>
                      </div>
                      <div className="w-full bg-dark-bg/80 h-2.5 rounded-full overflow-hidden p-[1px] border border-white/10">
                        <motion.div 
                          initial={{ width: '0%' }}
                          animate={{ width: '88%' }}
                          transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="bg-gradient-to-r from-brand-500 via-cyan-400 to-volt h-full rounded-full shadow-[0_0_12px_rgba(0,240,255,0.6)]"
                        />
                      </div>
                    </div>

                    {/* Bottom Status Tags with Staggered Entrance */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-between"
                      >
                        <span className="text-[10px] text-slate-400">Verified Drills</span>
                        <span className="text-[11px] font-mono font-bold text-slate-200">128+</span>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-between"
                      >
                        <span className="text-[10px] text-slate-400">Scout Tier</span>
                        <span className="text-[11px] font-mono font-bold text-emerald-400">Tier 1</span>
                      </motion.div>
                    </div>

                  </motion.div>

                </div>
              </div>

              {/* 3. FLOATING ROADMAP CARD — Infinite Gentle 3.5s Float (0 -> -8px -> 0) */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="hidden sm:block absolute -bottom-6 -left-6 glass-card px-4 py-3 rounded-2xl border border-white/15 shadow-2xl z-30 animate-float-gentle"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Roadmap Generated</div>
                    <div className="text-[10px] text-slate-400 font-mono">5 Core Milestones Active</div>
                  </div>
                </div>
              </motion.div>

            </div>

          </div>

        </div>
      </section>

      {/* 5 & 6. HOW ATHLETEX WORKS (Scroll Reveal, 5 Cards Staggered 01->05 & Connecting Line Draw) */}
      <section className="py-24 px-4 sm:px-8 relative bg-gradient-to-b from-[#05070B] via-[#080E1B] to-[#05070B] border-y border-white/[0.06]">
        
        {/* Glow ambient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-brand-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          
          {/* Section Header with Viewport Entrance */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-3.5 max-w-2xl mx-auto"
          >
            <div className="inline-flex">
              <Badge variant="volt" size="md" className="font-mono uppercase tracking-wider">
                Step-by-Step Trajectory
              </Badge>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight">
              How Athletex Works
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              A continuous, structured cycle that turns raw athletic potential into certified competitive performance.
            </p>
          </motion.div>

          {/* Desktop Horizontal Progression Indicator */}
          <div className="relative">
            
            {/* Background connecting progression line base */}
            <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-[2px] bg-white/[0.06] -translate-y-1/2 z-0" />

            {/* 6. CONNECTING LINE: Animated drawing from 01 -> 02 -> 03 -> 04 -> 05 */}
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.3, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'left' }}
              className="hidden lg:block absolute top-1/2 left-8 right-8 h-[2px] bg-gradient-to-r from-brand-500 via-cyan-400 to-volt -translate-y-1/2 z-0 shadow-[0_0_12px_rgba(0,240,255,0.6)]" 
            />

            {/* 5. 5 Step Cards with Sequenced Staggered Entrance (01 -> 02 -> 03 -> 04 -> 05) */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 relative z-10">
              {steps.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.num}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.1 + idx * 0.14, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
                    className="relative p-6 rounded-2xl glass-card border border-white/[0.08] hover:border-volt/60 hover:bg-dark-cardHover/90 transition-all duration-300 flex flex-col justify-between group shadow-sport-card hover:shadow-glow-volt/20 will-change-transform"
                  >
                    <div>
                      {/* Step Number & Icon Header */}
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-xs font-mono font-black text-volt px-2.5 py-1 rounded-lg bg-volt/10 border border-volt/30">
                          {s.num}
                        </span>
                        <div className="p-2.5 rounded-xl bg-[#080C14] border border-white/10 text-slate-300 group-hover:text-volt group-hover:border-volt/40 group-hover:scale-110 transition-all duration-300">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Step Title & Description */}
                      <h3 className="text-base font-bold text-white font-display mb-2.5 group-hover:text-volt transition-colors">
                        {s.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>

                    {/* Step Card Bottom Visual Pulse Indicator */}
                    <div className="pt-5 mt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500 group-hover:text-slate-400">
                      <span>Phase {s.num}</span>
                      <div className="w-2 h-2 rounded-full bg-slate-700 group-hover:bg-volt group-hover:shadow-[0_0_8px_#CCFF00] transition-colors" />
                    </div>

                    {/* Step Arrow for Desktop */}
                    {idx < steps.length - 1 && (
                      <div className="hidden lg:flex items-center justify-center absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#080C14] border border-white/15 text-slate-400 z-20 group-hover:text-volt group-hover:border-volt/50 transition-colors">
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* 9. GRASSROOTS -> CERTIFIED SELECTION (Animated Pipeline Drawing) */}
      <section className="py-24 px-4 sm:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl overflow-hidden border border-white/15 bg-[#090F1C] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9)]"
          >
            
            {/* Background High-Impact Sports Action Photography */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1600&q=80"
                alt="Elite Athlete Development"
                className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.15]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#05070B] via-[#05070B]/85 to-[#05070B]/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-transparent to-[#05070B]/60" />
            </div>

            {/* Content Over Sports Image */}
            <div className="relative z-10 p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-bg/80 border border-brand-500/30 text-xs font-mono text-cyan-300">
                  <Award className="w-3.5 h-3.5 text-volt" />
                  <span>ATHLETIC PERFORMANCE CAMPAIGN</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight leading-tight">
                  From Grassroots Potential <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-brand-accent to-volt bg-clip-text text-transparent">
                    To Certified Selection.
                  </span>
                </h2>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                  Athletex provides standard-defining performance analytics, position mastery guides, and verified tournament discovery to ensure no talent goes unnoticed.
                </p>

                {/* Seamless Scouting & Progression Pipeline Indicator */}
                <ScoutingProgressionPathway />

                <div className="flex flex-wrap gap-4 pt-2">
                  <Link to="/signup">
                    <Button variant="volt" size="md" icon={ArrowRight} iconPosition="right" className="text-slate-950 font-black hover:scale-105 transition-transform">
                      Join The Platform
                    </Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button variant="secondary" size="md" className="text-white border-white/15 hover:scale-105 transition-transform">
                      View Athlete Demo
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Telemetry Stat Cards with Staggered Entrance */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <motion.div 
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-card-premium p-5 rounded-2xl border border-white/15 space-y-2 hover:border-volt/50 hover:shadow-glow-volt-sm transition-all duration-300"
                >
                  <div className="text-xs font-mono text-slate-400 uppercase">Precision Rating</div>
                  <div className="text-3xl font-black font-mono text-volt">
                    <AnimatedNumber value={98.4} decimals={1} suffix="%" />
                  </div>
                  <div className="text-[11px] text-slate-300">Milestone calibration accuracy based on age & position data.</div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-card-premium p-5 rounded-2xl border border-white/15 space-y-2 hover:border-cyan-400/50 hover:shadow-glow-cyan transition-all duration-300"
                >
                  <div className="text-xs font-mono text-slate-400 uppercase">Assessment Pillars</div>
                  <div className="text-3xl font-black font-mono text-cyan-400">4-Tier</div>
                  <div className="text-[11px] text-slate-300">Technical, Physical, Tactical IQ, and Real-match performance.</div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-card-premium p-5 rounded-2xl border border-white/15 space-y-2 sm:col-span-2 hover:border-emerald-400/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase">
                    <span>Scouting Pipeline</span>
                    <span className="text-emerald-400 font-bold">Active Verifications</span>
                  </div>
                  <div className="text-lg font-bold text-white font-display">State & National Selection Trials Ready</div>
                  <div className="text-[11px] text-slate-300">Direct integration with academy scouts and tournament registration engines.</div>
                </motion.div>

              </div>

            </div>

          </motion.div>

        </div>
      </section>

      {/* 7 & 8. CORE ARCHITECTURE BENTO CARDS (3D Tilt, Hover Glow, Icon Rise & Metric Progress Animation) */}
      <section className="py-24 px-4 sm:px-8 relative z-10">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-3.5 max-w-2xl mx-auto"
          >
            <div className="inline-flex">
              <Badge variant="primary" size="md" className="font-mono uppercase tracking-wider">
                Core Architecture
              </Badge>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight">
              Engineered for Aspiring Athletes
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Five interconnected pillars designed to guide athletic development from first practice to competitive trials.
            </p>
          </motion.div>

          {/* Asymmetric Bento-Style Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            
            {/* Feature 1: Large Flagship Bento Card (Personalized Athlete Profile) */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-3 h-full"
            >
              <TiltCard maxTilt={4.5} className="h-full">
                <div className="p-7 sm:p-8 h-full flex flex-col justify-between glass-card-premium border border-white/10 hover:border-cyan-400/60 transition-all duration-300 group rounded-2xl shadow-sport-card hover:shadow-glow-cyan">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 group-hover:scale-110 group-hover:bg-cyan-500/20 group-hover:-translate-y-1 transition-all duration-300">
                        <UserCheck className="w-6 h-6" />
                      </div>
                      <Badge variant="primary" size="sm" className="font-mono font-semibold">
                        {features[0].badge}
                      </Badge>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-3 group-hover:text-cyan-300 transition-colors">
                      {features[0].title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {features[0].desc}
                    </p>

                    {/* Animated Micro Metric Preview Widget */}
                    <VerifiedBadgeWidget />
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center gap-2 text-xs text-cyan-400 font-semibold group-hover:translate-x-2 transition-transform duration-200">
                    <span>Feature module preview</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* Feature 2: Large Flagship Bento Card (Structured Career Roadmap) */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-3 h-full"
            >
              <TiltCard maxTilt={4.5} className="h-full">
                <div className="p-7 sm:p-8 h-full flex flex-col justify-between glass-card-premium border border-white/10 hover:border-volt/60 transition-all duration-300 group rounded-2xl shadow-sport-card hover:shadow-glow-volt">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3.5 rounded-2xl bg-volt/10 text-volt border border-volt/25 group-hover:scale-110 group-hover:bg-volt/20 group-hover:-translate-y-1 transition-all duration-300">
                        <Milestone className="w-6 h-6" />
                      </div>
                      <Badge variant="volt" size="sm" className="font-mono font-semibold">
                        {features[1].badge}
                      </Badge>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-3 group-hover:text-volt transition-colors">
                      {features[1].title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {features[1].desc}
                    </p>

                    {/* Animated Micro Metric Preview Widget */}
                    <CareerRoadmapWidget />
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center gap-2 text-xs text-volt font-semibold group-hover:translate-x-2 transition-transform duration-200">
                    <span>Feature module preview</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* Feature 3: Complementary Row Card (Knowledge / Learning Resources) */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-2 h-full"
            >
              <TiltCard maxTilt={3.5} className="h-full">
                <div className="p-6 h-full flex flex-col justify-between glass-card border border-white/10 hover:border-brand-400/60 transition-all duration-300 group rounded-2xl shadow-sport-card hover:shadow-glow-brand">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="p-3 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300">
                        <Activity className="w-5 h-5" />
                      </div>
                      <Badge variant="primary" size="sm">{features[2].badge}</Badge>
                    </div>

                    <h3 className="text-lg font-bold text-white font-display mb-2 group-hover:text-brand-300 transition-colors">
                      {features[2].title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {features[2].desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-white/[0.06] flex items-center gap-1.5 text-xs text-brand-400 font-semibold group-hover:translate-x-2 transition-transform duration-200">
                    <span>Feature module preview</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* Feature 4: Complementary Row Card (Conditioning / Training Progress & Drills) */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.46, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-2 h-full"
            >
              <TiltCard maxTilt={3.5} className="h-full">
                <div className="p-6 h-full flex flex-col justify-between glass-card border border-white/10 hover:border-emerald-400/60 transition-all duration-300 group rounded-2xl shadow-sport-card hover:shadow-[0_0_24px_rgba(16,185,129,0.3)]">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300">
                        <Dumbbell className="w-5 h-5" />
                      </div>
                      <Badge variant="emerald" size="sm">{features[3].badge}</Badge>
                    </div>

                    <h3 className="text-lg font-bold text-white font-display mb-2 group-hover:text-emerald-300 transition-colors">
                      {features[3].title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {features[3].desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-white/[0.06] flex items-center gap-1.5 text-xs text-emerald-400 font-semibold group-hover:translate-x-2 transition-transform duration-200">
                    <span>Feature module preview</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* Feature 5: Complementary Row Card (Live Events / Competition Opportunities) */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-2 h-full"
            >
              <TiltCard maxTilt={3.5} className="h-full">
                <div className="p-6 h-full flex flex-col justify-between glass-card border border-white/10 hover:border-amber-400/60 transition-all duration-300 group rounded-2xl shadow-sport-card hover:shadow-[0_0_24px_rgba(245,158,11,0.3)]">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300">
                        <Trophy className="w-5 h-5" />
                      </div>
                      <Badge variant="amber" size="sm">{features[4].badge}</Badge>
                    </div>

                    <h3 className="text-lg font-bold text-white font-display mb-2 group-hover:text-amber-300 transition-colors">
                      {features[4].title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {features[4].desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-white/[0.06] flex items-center gap-1.5 text-xs text-amber-400 font-semibold group-hover:translate-x-2 transition-transform duration-200">
                    <span>Feature module preview</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </TiltCard>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 10. FINAL CTA SECTION (Breathing Ambient Radial Glow & Arrow Glide) */}
      <section className="py-24 px-4 sm:px-8 relative overflow-hidden border-t border-white/[0.08]">
        
        {/* Stadium Floodlight & Dark Gradient Backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1600&q=80"
            alt="Stadium Floodlight Atmosphere"
            className="w-full h-full object-cover object-center filter brightness-[0.25] contrast-[1.2]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/90 to-[#080E1B]/95" />
          
          {/* Continuous Gentle Breathing Radial Glow */}
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[300px] bg-volt/15 rounded-full blur-[140px] pointer-events-none animate-radial-breathe" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center space-y-8 relative z-10"
        >
          
          <div className="inline-flex p-3 rounded-2xl bg-volt/10 border border-volt/30 text-volt shadow-[0_0_20px_rgba(204,255,0,0.3)]">
            <Zap className="w-7 h-7" />
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-tight">
            Start your athletic roadmap today.
          </h2>

          <p className="text-base sm:text-xl text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
            “Your personalized path from aspiring athlete to competitive athlete.”
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup" className="w-full sm:w-auto">
              <Button 
                variant="volt" 
                size="lg" 
                className="w-full text-slate-950 font-black text-base px-8 py-4 shadow-[0_0_30px_rgba(204,255,0,0.5)] hover:shadow-[0_0_45px_rgba(204,255,0,0.75)] hover:scale-105 transition-all duration-300 group"
              >
                <span>Create My Athlete Profile</span>
                <ArrowRight className="w-5 h-5 ml-2.5 inline-block group-hover:translate-x-2 transition-transform duration-200" />
              </Button>
            </Link>
          </div>

        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-[#05070B] py-10 px-4 sm:px-8 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-brand-500 to-volt p-0.5">
              <div className="w-full h-full bg-[#05070B] rounded-[6px] flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-volt" />
              </div>
            </div>
            <span className="font-display font-bold text-slate-300 tracking-tight">
              Athletex<span className="text-volt">.AI</span>
            </span>
          </div>

          <p className="text-center sm:text-right text-slate-400 font-mono text-[11px]">
            © 2026 Athletex — Sports Career & Athlete Development Platform. All rights reserved.
          </p>

        </div>
      </footer>

    </div>
  );
};

export default Landing;
