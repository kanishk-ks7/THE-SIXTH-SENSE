import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Activity, 
  Flame, 
  Clock, 
  Award, 
  Milestone, 
  Dumbbell, 
  Trophy, 
  ChevronRight, 
  CheckCircle2, 
  TrendingUp,
  ShieldCheck,
  MapPin,
  Calendar
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import StatCard from '../components/ui/StatCard';
import Card, { CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import { useAthlete } from '../context/AthleteContext';
import { ROADMAP_MILESTONES, TRAINING_DRILLS, COMPETITION_EVENTS } from '../data/mockData';

export const Dashboard = () => {
  const { athlete } = useAthlete();

  const nextStepMilestone = ROADMAP_MILESTONES.find(m => m.status === 'in-progress') || ROADMAP_MILESTONES[1];
  const todayDrill = TRAINING_DRILLS[0];
  const featuredEvent = COMPETITION_EVENTS[0];

  return (
    <div className="space-y-8">
      
      {/* 1. Welcome & Sport Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-dark-surface via-dark-card to-dark-surface border border-dark-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
              Personalized Dashboard
            </span>
            <span className="text-slate-600">•</span>
            <Badge variant="volt" size="sm">
              Active Season 2026
            </Badge>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            Welcome back, {athlete.name || 'Athlete'} 👋
          </h1>
          
          <p className="text-xs sm:text-sm text-slate-300">
            Primary Sport: <strong className="text-white">{athlete.sport || 'Football'}</strong> &nbsp;|&nbsp; 
            Level: <strong className="text-white">{athlete.level || 'Beginner'}</strong> &nbsp;|&nbsp;
            Goal: <strong className="text-brand-300">{athlete.goal || 'Improve performance'}</strong>
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 flex-shrink-0">
          <Link to="/profile">
            <Button variant="secondary" size="sm">
              View Profile
            </Button>
          </Link>
          <Link to="/assessment">
            <Button variant="volt" size="sm" icon={ArrowRight} iconPosition="right">
              Continue Journey
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Top Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Current Level"
          value={athlete.level || 'Beginner'}
          subtitle={`Sport: ${athlete.sport || 'Football'}`}
          icon={Award}
          color="cyan"
          actionText="View Profile"
          onActionClick={() => window.location.href = '/profile'}
        />

        <StatCard
          title="Readiness Score"
          value={`${athlete.readiness || 35}%`}
          subtitle="Baseline test pending"
          icon={Flame}
          color="volt"
          trend="+5% this week"
          actionText="Take Assessment"
          onActionClick={() => window.location.href = '/assessment'}
        />

        <StatCard
          title="Weekly Training"
          value={athlete.trainingHours || '4 hrs/week'}
          subtitle="4 sessions scheduled"
          icon={Clock}
          color="emerald"
          actionText="Open Schedule"
          onActionClick={() => window.location.href = '/train'}
        />
      </div>

      {/* 3. Your Next Best Action (Hero Recommendation Card) */}
      <Card className="relative overflow-hidden border-brand-500/50 p-6 sm:p-8 bg-gradient-to-r from-brand-950/40 via-dark-surface to-dark-card shadow-glow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-volt/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-brand-500/20 text-brand-accent">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-300">
                Your Next Recommended Action
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
              Complete your initial athlete assessment to generate your personalized roadmap.
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Evaluating your technical dexterity, physical endurance, tactical IQ, and match execution will unlock customized milestone tracking and position drills.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link to="/assessment">
              <Button variant="volt" size="lg" className="w-full sm:w-auto" icon={ArrowRight} iconPosition="right">
                Start Assessment
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* 4. Two-Column Mid Section: Roadmap Snapshot + Training Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Roadmap Milestone Preview (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
              <Milestone className="w-4 h-4 text-brand-400" />
              Career Roadmap Preview
            </h3>
            <Link to="/roadmap" className="text-xs text-brand-400 hover:text-brand-300 font-semibold flex items-center gap-1">
              <span>Full Roadmap</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">
                  Active Milestone (Stage 2 of 8)
                </span>
                <h4 className="text-lg font-bold text-white font-display">
                  {nextStepMilestone.title}
                </h4>
              </div>
              <Badge variant="primary" size="sm">In Progress</Badge>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {nextStepMilestone.description}
            </p>

            <ProgressBar value={nextStepMilestone.progress} size="md" color="brand" label="Stage Progress" />

            <div className="pt-3 border-t border-dark-border/40 flex items-center justify-between text-xs">
              <span className="text-slate-400">Next Stage: Foundation Building</span>
              <Link to="/roadmap" className="text-brand-400 hover:underline font-semibold">
                Explore All 8 Milestones →
              </Link>
            </div>
          </Card>
        </div>

        {/* Right Column: Today's Training Snapshot (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-volt" />
              Today's Workout
            </h3>
            <Link to="/train" className="text-xs text-volt hover:underline font-semibold flex items-center gap-1">
              <span>View Hub</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <Card className="p-6 space-y-4 border-volt/20">
            <div className="flex items-center justify-between">
              <Badge variant="volt" size="sm">{todayDrill.difficulty}</Badge>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {todayDrill.duration}
              </span>
            </div>

            <div>
              <h4 className="text-base font-bold text-white font-display">
                {todayDrill.title}
              </h4>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                {todayDrill.description}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-dark-bg/60 border border-dark-border flex items-center justify-between text-xs">
              <span className="text-slate-400">Focus Area:</span>
              <span className="font-semibold text-volt">{todayDrill.focus}</span>
            </div>

            <Link to="/train" className="block w-full">
              <Button variant="outline" size="sm" className="w-full">
                Open Training Drill
              </Button>
            </Link>
          </Card>
        </div>

      </div>

      {/* 5. Lower Grid: Upcoming Opportunities & Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Featured Competition Event (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              Upcoming Opportunities
            </h3>
            <Link to="/events" className="text-xs text-brand-400 hover:underline font-semibold">
              Browse All Events &rarr;
            </Link>
          </div>

          <Card className="p-5 flex flex-col justify-between hover:border-brand-500/40 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="primary" size="sm">{featuredEvent.type}</Badge>
                <Badge variant="emerald" size="sm">{featuredEvent.status}</Badge>
              </div>

              <h4 className="text-base font-bold text-white font-display">
                {featuredEvent.name}
              </h4>

              <div className="text-xs text-slate-400 space-y-1.5">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
                  <span>{featuredEvent.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-volt flex-shrink-0" />
                  <span>{featuredEvent.date}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-dark-border/40 flex items-center justify-between">
              <span className="text-xs text-slate-400">{featuredEvent.eligibility}</span>
              <Link to="/events">
                <Button variant="secondary" size="sm">
                  View Details
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Progress Snapshot (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-brand-400" />
              Progress Metrics Snapshot
            </h3>
            <Link to="/progress" className="text-xs text-brand-400 hover:underline font-semibold">
              Full Analytics →
            </Link>
          </div>

          <Card className="p-5 space-y-3.5">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Technical Skill</span>
                <span className="text-brand-400 font-mono">40%</span>
              </div>
              <ProgressBar value={40} size="sm" color="brand" showValue={false} />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Physical Fitness</span>
                <span className="text-volt font-mono">35%</span>
              </div>
              <ProgressBar value={35} size="sm" color="volt" showValue={false} />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-300">Tactical & Rules Knowledge</span>
                <span className="text-amber-400 font-mono">45%</span>
              </div>
              <ProgressBar value={45} size="sm" color="amber" showValue={false} />
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
