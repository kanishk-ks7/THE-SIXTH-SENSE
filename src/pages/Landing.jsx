import React from 'react';
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
  Activity
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import { SPORTS_LIST } from '../data/mockData';

export const Landing = () => {
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

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 selection:bg-brand-500 selection:text-white">
      
      {/* Top Navigation */}
      <nav className="border-b border-dark-border/80 bg-dark-bg/80 backdrop-blur-xl sticky top-0 z-40 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-500 via-cyan-400 to-volt p-0.5 shadow-glow-sm">
              <div className="w-full h-full bg-dark-bg rounded-[14px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-brand-accent" />
              </div>
            </div>
            <span className="font-display font-extrabold text-xl tracking-tight text-white">
              Athletex<span className="text-brand-accent">.AI</span>
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Log In
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="secondary" size="sm">
                Demo Portal
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="volt" size="sm" icon={ArrowRight} iconPosition="right" className="text-slate-950 font-bold">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 px-4 sm:px-8">
        {/* Glow ambient backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-volt/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark-surface/90 border border-volt/30 text-xs font-semibold text-volt shadow-glow-volt/20">
            <Sparkles className="w-4 h-4 text-volt animate-pulse" />
            <span>The Intelligent Sports Career Platform for Student Athletes</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white font-display leading-[1.1]">
            Find your path. <br />
            <span className="bg-gradient-to-r from-brand-accent via-cyan-300 to-volt bg-clip-text text-transparent">
              Build your skills.
            </span> <br />
            Reach your potential.
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            An intelligent sports career companion that helps athletes understand where they are, what they should improve, and what opportunities they can pursue next.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/signup" className="w-full sm:w-auto">
              <Button variant="volt" size="lg" className="w-full text-slate-950 font-extrabold" icon={ArrowRight} iconPosition="right">
                Create Free Account
              </Button>
            </Link>
            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full" icon={Activity}>
                Explore Platform Demo
              </Button>
            </Link>
          </div>

          {/* Quick Sports Pill Carousel */}
          <div className="pt-10 flex items-center justify-center gap-2 flex-wrap text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Supported Sports:</span>
            {SPORTS_LIST.slice(0, 7).map((s) => (
              <span key={s.id} className="px-3 py-1 rounded-lg bg-dark-surface/80 border border-dark-border text-slate-300">
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How Athletex Works Section (5 Steps) */}
      <section className="py-20 px-4 sm:px-8 bg-dark-surface/40 border-y border-dark-border/80 relative">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <Badge variant="volt" size="md">Step-by-Step Trajectory</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              How Athletex Works
            </h2>
            <p className="text-sm text-slate-400">
              A continuous, structured cycle that turns raw athletic potential into certified competitive performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 relative">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.num}
                  className="relative p-6 rounded-2xl bg-dark-surface/90 border border-dark-border hover:border-brand-500/50 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-black text-brand-accent px-2 py-1 rounded-md bg-brand-500/10 border border-brand-500/20">
                        {s.num}
                      </span>
                      <div className="p-2 rounded-xl bg-dark-bg border border-dark-border text-slate-400 group-hover:text-brand-300 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white font-display mb-2">
                      {s.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>

                  {idx < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                      <ChevronRight className="w-5 h-5 text-brand-500/40" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <Badge variant="primary" size="md">Core Architecture</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Engineered for Aspiring Athletes
            </h2>
            <p className="text-sm text-slate-400">
              Five interconnected pillars designed to guide athletic development from first practice to competitive trials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <Card
                  key={i}
                  className="p-6 flex flex-col justify-between hover:border-brand-500/50 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <Badge variant="primary" size="sm">{f.badge}</Badge>
                    </div>

                    <h3 className="text-lg font-bold text-white font-display mb-2 group-hover:text-brand-300 transition-colors">
                      {f.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-dark-border/40 flex items-center gap-1 text-xs text-brand-400 font-semibold group-hover:translate-x-1 transition-transform">
                    <span>Feature module preview</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-16 px-4 sm:px-8 border-t border-dark-border/80 bg-gradient-to-b from-dark-surface to-dark-bg">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            Start your athletic roadmap today.
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            “Your personalized path from aspiring athlete to competitive athlete.”
          </p>
          <div className="pt-2">
            <Link to="/signup">
              <Button variant="volt" size="lg" icon={ArrowRight} iconPosition="right" className="text-slate-950 font-extrabold">
                Create My Athlete Profile
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-border/60 py-8 px-4 text-center text-xs text-slate-500">
        <p>© 2026 Athletex — Sports Career & Athlete Development Platform. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default Landing;
