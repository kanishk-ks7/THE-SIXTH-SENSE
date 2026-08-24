import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Calendar, 
  Activity, 
  Flame, 
  Clock, 
  Target, 
  Edit3, 
  Award, 
  Trophy, 
  Medal, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Card, { CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import EmptyState from '../components/ui/EmptyState';
import { useAthlete } from '../context/AthleteContext';
import { SPORTS_LIST, ONBOARDING_LEVELS } from '../data/mockData';

export const Profile = () => {
  const { athlete, updateProfile } = useAthlete();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [editForm, setEditForm] = useState({
    name: athlete.name || 'Alex',
    age: athlete.age || 17,
    location: athlete.location || 'Manchester, UK',
    sport: athlete.sport || 'Football',
    level: athlete.level || 'Beginner',
    trainingHours: athlete.trainingHours || '4 hours/week',
    goal: athlete.goal || 'Improve performance',
    bio: athlete.bio || 'Aspiring athlete focused on building strong fundamentals.',
    sportsBackground: athlete.sportsBackground || 'School varsity athlete.'
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(editForm);
    setIsEditModalOpen(false);
  };

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <PageHeader
        title="Athlete Profile"
        subtitle="Manage your athletic passport, verified statistics, and career trajectory goals."
        badge="Verified Athlete v1.0"
        action={
          <Button
            variant="volt"
            size="md"
            icon={Edit3}
            onClick={() => {
              setEditForm({
                name: athlete.name || 'Alex',
                age: athlete.age || 17,
                location: athlete.location || 'Manchester, UK',
                sport: athlete.sport || 'Football',
                level: athlete.level || 'Beginner',
                trainingHours: athlete.trainingHours || '4 hours/week',
                goal: athlete.goal || 'Improve performance',
                bio: athlete.bio || 'Aspiring athlete focused on building strong fundamentals.',
                sportsBackground: athlete.sportsBackground || 'School varsity athlete.'
              });
              setIsEditModalOpen(true);
            }}
          >
            Edit Profile
          </Button>
        }
      />

      {/* Hero Profile Banner Card */}
      <Card className="p-6 sm:p-8 border-brand-500/30 bg-gradient-to-r from-dark-surface via-dark-card to-dark-surface">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-brand-500 via-cyan-400 to-volt p-1 shadow-glow-brand">
              <div className="w-full h-full rounded-[22px] bg-dark-bg flex items-center justify-center overflow-hidden">
                {athlete.avatar ? (
                  <img src={athlete.avatar} alt={athlete.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-black text-brand-accent font-display">
                    {athlete.name ? athlete.name.charAt(0) : 'A'}
                  </span>
                )}
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-volt text-slate-950 shadow-md">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          {/* Core Info */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                {athlete.name || 'Alex'}
              </h2>
              <Badge variant="primary" size="md">
                {athlete.sport || 'Football'}
              </Badge>
              <Badge variant="volt" size="md">
                {athlete.level || 'Beginner'}
              </Badge>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {athlete.bio}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-brand-400" />
                <span>Age: <strong className="text-slate-200">{athlete.age || 17}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-volt" />
                <span>Location: <strong className="text-slate-200">{athlete.location || 'Manchester, UK'}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Commitment: <strong className="text-slate-200">{athlete.trainingHours || '4 hours/week'}</strong></span>
              </div>
            </div>
          </div>

        </div>
      </Card>

      {/* Grid: Overview, Background, Goals, Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Athlete Overview */}
        <Card className="p-6 space-y-4">
          <CardHeader className="pb-3 mb-0">
            <CardTitle>
              <Activity className="w-5 h-5 text-brand-400" />
              Athlete Overview
            </CardTitle>
            <Badge variant="primary" size="sm">Attributes</Badge>
          </CardHeader>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-dark-bg/60 border border-dark-border">
              <span className="text-slate-400 block mb-1">Sport Category</span>
              <span className="font-bold text-white text-sm">{athlete.sport || 'Football'}</span>
            </div>
            <div className="p-3 rounded-xl bg-dark-bg/60 border border-dark-border">
              <span className="text-slate-400 block mb-1">Experience Class</span>
              <span className="font-bold text-white text-sm">{athlete.level || 'Beginner'}</span>
            </div>
            <div className="p-3 rounded-xl bg-dark-bg/60 border border-dark-border">
              <span className="text-slate-400 block mb-1">Weekly Volume</span>
              <span className="font-bold text-volt text-sm">{athlete.trainingHours || '4 hrs/wk'}</span>
            </div>
            <div className="p-3 rounded-xl bg-dark-bg/60 border border-dark-border">
              <span className="text-slate-400 block mb-1">Overall Readiness</span>
              <span className="font-bold text-brand-300 text-sm font-mono">{athlete.readiness || 35}%</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-dark-bg/60 border border-dark-border">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Key Strengths (Self-Reported)
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(athlete.strengths || ['Ball Control', 'Agility', 'Determination']).map((s, i) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-dark-surface border border-brand-500/30 text-brand-300 font-medium">
                  ✓ {s}
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* Sports Background */}
        <Card className="p-6 space-y-4">
          <CardHeader className="pb-3 mb-0">
            <CardTitle>
              <BookOpen className="w-5 h-5 text-volt" />
              Sports Background
            </CardTitle>
            <Badge variant="volt" size="sm">History</Badge>
          </CardHeader>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-dark-bg/60 p-4 rounded-xl border border-dark-border">
            {athlete.sportsBackground || 'School varsity athlete with 2 seasons of competitive play.'}
          </p>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Focus Development Areas:
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {(athlete.focusAreas || ['Tactical Positioning', 'Stamina', 'Shooting Mechanics']).map((f, i) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-dark-bg border border-dark-border text-slate-300">
                  🎯 {f}
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* Goals */}
        <Card className="p-6 space-y-4">
          <CardHeader className="pb-3 mb-0">
            <CardTitle>
              <Target className="w-5 h-5 text-amber-400" />
              Athletic Goals
            </CardTitle>
            <Badge variant="amber" size="sm">Target</Badge>
          </CardHeader>

          <div className="p-4 rounded-2xl bg-dark-bg/60 border border-brand-500/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">Primary Objective</span>
              <h4 className="text-base font-bold text-white font-display mt-0.5">{athlete.goal || 'Improve performance'}</h4>
            </div>
            <div className="p-2.5 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Your personalized training curriculum and milestone roadmap are calibrated to help you reach this target.
          </p>
        </Card>

        {/* Achievements Placeholder */}
        <Card className="p-6 space-y-4">
          <CardHeader className="pb-3 mb-0">
            <CardTitle>
              <Trophy className="w-5 h-5 text-amber-400" />
              Achievements
            </CardTitle>
            <Badge variant="locked" size="sm">0 Badges</Badge>
          </CardHeader>

          <EmptyState
            icon={Trophy}
            title="No achievements yet"
            description="Participate in assessments, complete training drills, and register for tournaments to unlock official medals."
          />
        </Card>

      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Athlete Profile"
          subtitle="Update your name, sport details, location, and bio."
          footer={
            <>
              <Button variant="secondary" size="sm" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="volt" size="sm" onClick={handleSaveProfile}>
                Save Changes
              </Button>
            </>
          }
        >
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Athlete Name</label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full bg-dark-bg border border-dark-border rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Age</label>
                <input
                  type="number"
                  value={editForm.age}
                  onChange={(e) => setEditForm({ ...editForm, age: Number(e.target.value) })}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Sport</label>
                <select
                  value={editForm.sport}
                  onChange={(e) => setEditForm({ ...editForm, sport: e.target.value })}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                >
                  {SPORTS_LIST.map((s) => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Level</label>
                <select
                  value={editForm.level}
                  onChange={(e) => setEditForm({ ...editForm, level: e.target.value })}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                >
                  {ONBOARDING_LEVELS.map((lvl) => (
                    <option key={lvl.id} value={lvl.id}>{lvl.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Bio / Aspirations</label>
              <textarea
                value={editForm.bio}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                rows={2}
                className="w-full bg-dark-bg border border-dark-border rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Sports Background</label>
              <textarea
                value={editForm.sportsBackground}
                onChange={(e) => setEditForm({ ...editForm, sportsBackground: e.target.value })}
                rows={2}
                className="w-full bg-dark-bg border border-dark-border rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
};

export default Profile;
