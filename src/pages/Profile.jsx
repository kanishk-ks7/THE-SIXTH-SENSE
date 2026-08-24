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
  BookOpen,
  Phone,
  Mail,
  Camera,
  Layers,
  Zap,
  TrendingUp,
  Sliders,
  Check
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Card, { CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import ProgressBar from '../components/ui/ProgressBar';
import { useAthlete } from '../context/AthleteContext';
import { SPORTS_LIST, ONBOARDING_LEVELS, ONBOARDING_GOALS, AVATAR_PRESETS, SPORT_POSITIONS_MAP } from '../data/mockData';

const WEEKDAYS = [
  { id: 'Monday', label: 'Mon' },
  { id: 'Tuesday', label: 'Tue' },
  { id: 'Wednesday', label: 'Wed' },
  { id: 'Thursday', label: 'Thu' },
  { id: 'Friday', label: 'Fri' },
  { id: 'Saturday', label: 'Sat' },
  { id: 'Sunday', label: 'Sun' }
];

export const Profile = () => {
  const { athlete, updateProfile, showToast } = useAthlete();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeEditTab, setActiveEditTab] = useState('personal'); // 'personal' | 'sports' | 'physical' | 'training'
  const [isSaving, setIsSaving] = useState(false);

  const [editForm, setEditForm] = useState({
    name: athlete.name || 'Alex Johnson',
    email: athlete.email || 'alex.athlete@athletex.ai',
    phone: athlete.phone || '+44 7911 123456',
    gender: athlete.gender || 'Male',
    age: athlete.age || 17,
    location: athlete.location || 'Manchester, UK',
    sport: athlete.sport || 'Football',
    position: athlete.position || 'Forward / Winger',
    level: athlete.level || 'Beginner',
    height: athlete.height || '178 cm',
    weight: athlete.weight || '68 kg',
    personalBest: athlete.personalBest || '100m Sprint: 11.8s • 14 Goals Season',
    preferredTrainingDays: athlete.preferredTrainingDays || ['Monday', 'Wednesday', 'Friday', 'Saturday'],
    trainingHours: athlete.trainingHours || '4 hours/week',
    goal: athlete.goal || 'Improve performance',
    bio: athlete.bio || 'Passionate aspiring footballer striving to build strong technical fundamentals, agility, and tactical vision for high-school and academy selection.',
    sportsBackground: athlete.sportsBackground || 'School varsity team player for 2 seasons. Community tournament participant with 3 years of recreational play.',
    avatar: athlete.avatar || AVATAR_PRESETS[0].url,
    strengthsText: (athlete.strengths || ['Ball Control', 'Agility', 'Determination']).join(', '),
    focusAreasText: (athlete.focusAreas || ['Tactical Positioning', 'Stamina', 'Weak-foot shooting']).join(', ')
  });

  const openEditModal = (tab = 'personal') => {
    setEditForm({
      name: athlete.name || 'Alex Johnson',
      email: athlete.email || 'alex.athlete@athletex.ai',
      phone: athlete.phone || '+44 7911 123456',
      gender: athlete.gender || 'Male',
      age: athlete.age || 17,
      location: athlete.location || 'Manchester, UK',
      sport: athlete.sport || 'Football',
      position: athlete.position || 'Forward / Winger',
      level: athlete.level || 'Beginner',
      height: athlete.height || '178 cm',
      weight: athlete.weight || '68 kg',
      personalBest: athlete.personalBest || '100m Sprint: 11.8s • 14 Goals Season',
      preferredTrainingDays: athlete.preferredTrainingDays || ['Monday', 'Wednesday', 'Friday', 'Saturday'],
      trainingHours: athlete.trainingHours || '4 hours/week',
      goal: athlete.goal || 'Improve performance',
      bio: athlete.bio || 'Passionate aspiring footballer striving to build strong technical fundamentals, agility, and tactical vision.',
      sportsBackground: athlete.sportsBackground || 'School varsity athlete with 2 seasons of competitive play.',
      avatar: athlete.avatar || AVATAR_PRESETS[0].url,
      strengthsText: (athlete.strengths || ['Ball Control', 'Agility', 'Determination']).join(', '),
      focusAreasText: (athlete.focusAreas || ['Tactical Positioning', 'Stamina', 'Weak-foot shooting']).join(', ')
    });
    setActiveEditTab(tab);
    setIsEditModalOpen(true);
  };

  const handleAvatarFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('Image file size must be under 2MB', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm(prev => ({ ...prev, avatar: reader.result }));
        showToast('Profile photo updated!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleTrainingDay = (day) => {
    setEditForm(prev => {
      const current = prev.preferredTrainingDays || [];
      const updated = current.includes(day)
        ? current.filter(d => d !== day)
        : [...current, day];
      return { ...prev, preferredTrainingDays: updated };
    });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsSaving(true);

    const formattedStrengths = editForm.strengthsText
      ? editForm.strengthsText.split(',').map(s => s.trim()).filter(Boolean)
      : ['Ball Control', 'Agility', 'Determination'];

    const formattedFocusAreas = editForm.focusAreasText
      ? editForm.focusAreasText.split(',').map(s => s.trim()).filter(Boolean)
      : ['Tactical Positioning', 'Stamina', 'Weak-foot shooting'];

    setTimeout(() => {
      updateProfile({
        name: editForm.name,
        email: editForm.email,
        phone: editForm.phone,
        gender: editForm.gender,
        age: Number(editForm.age) || athlete.age || 17,
        location: editForm.location,
        sport: editForm.sport,
        position: editForm.position,
        level: editForm.level,
        height: editForm.height,
        weight: editForm.weight,
        personalBest: editForm.personalBest,
        preferredTrainingDays: editForm.preferredTrainingDays,
        trainingHours: editForm.trainingHours,
        goal: editForm.goal,
        bio: editForm.bio,
        sportsBackground: editForm.sportsBackground,
        avatar: editForm.avatar,
        strengths: formattedStrengths,
        focusAreas: formattedFocusAreas
      });
      setIsSaving(false);
      setIsEditModalOpen(false);
    }, 400);
  };

  const availablePositions = SPORT_POSITIONS_MAP[editForm.sport] || SPORT_POSITIONS_MAP.Football;

  return (
    <div className="space-y-8">
      
      {/* 1. Page Header */}
      <PageHeader
        title="Athlete Passport & Identity"
        subtitle="Manage your certified athletic credentials, performance benchmarks, and training trajectory."
        badge="Verified Athlete Passport v1.0"
        action={
          <Button
            variant="volt"
            size="md"
            icon={Edit3}
            onClick={() => openEditModal('personal')}
            className="text-slate-950 font-bold"
          >
            Edit Profile
          </Button>
        }
      />

      {/* 2. Hero Profile Banner Card */}
      <Card className="p-6 sm:p-8 border-volt/30 bg-gradient-to-r from-dark-surface via-dark-card to-dark-surface shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-volt/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
          
          {/* Avatar Section */}
          <div className="relative flex-shrink-0 group">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-volt via-lime-400 to-cyan-400 p-1 shadow-glow-volt">
              <div className="w-full h-full rounded-[22px] bg-dark-bg flex items-center justify-center overflow-hidden">
                {athlete.avatar ? (
                  <img src={athlete.avatar} alt={athlete.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl font-black text-volt font-display">
                    {athlete.name ? athlete.name.charAt(0) : 'A'}
                  </span>
                )}
              </div>
            </div>

            {/* Quick change button overlay */}
            <button
              type="button"
              onClick={() => openEditModal('personal')}
              className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-volt text-slate-950 shadow-lg hover:scale-110 transition-transform"
              title="Change Profile Photo"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* Core Info & Badges */}
          <div className="flex-1 text-center md:text-left space-y-2.5">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
              <h2 className="text-2xl sm:text-4xl font-black text-white font-display tracking-tight">
                {athlete.name || 'Alex Johnson'}
              </h2>
              <Badge variant="volt" size="md">
                {athlete.sport || 'Football'}
              </Badge>
              <Badge variant="primary" size="md">
                {athlete.level || 'Beginner'}
              </Badge>
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Passport</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              {athlete.bio || 'Passionate athlete focused on fundamental skill development, discipline, and match readiness.'}
            </p>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-volt" />
                <span>Position: <strong className="text-white">{athlete.position || 'Forward / Winger'}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Location: <strong className="text-white">{athlete.location || 'Manchester, UK'}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Commitment: <strong className="text-white">{athlete.trainingHours || '4 hours/week'}</strong></span>
              </div>
            </div>
          </div>

        </div>
      </Card>

      {/* 3. Four Core Structured Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card A: Personal Information */}
        <Card className="p-6 space-y-4 hover:border-slate-600 transition-all">
          <CardHeader className="pb-3 mb-0">
            <CardTitle>
              <User className="w-5 h-5 text-volt" />
              Personal Information
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => openEditModal('personal')}>
              Edit
            </Button>
          </CardHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-dark-bg/60 border border-dark-border">
              <span className="text-slate-400 block mb-1">Full Name</span>
              <span className="font-bold text-white text-sm">{athlete.name || 'Alex Johnson'}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-bg/60 border border-dark-border">
              <span className="text-slate-400 block mb-1">Gender</span>
              <span className="font-bold text-white text-sm">{athlete.gender || 'Male'}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-bg/60 border border-dark-border">
              <span className="text-slate-400 block mb-1">Age</span>
              <span className="font-bold text-white text-sm">{athlete.age || 17} years old</span>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-bg/60 border border-dark-border">
              <span className="text-slate-400 block mb-1">Location</span>
              <span className="font-bold text-white text-sm">{athlete.location || 'Manchester, UK'}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-bg/60 border border-dark-border">
              <span className="text-slate-400 block mb-1">Email Address</span>
              <span className="font-mono text-slate-200 text-xs truncate block">{athlete.email || 'alex.athlete@athletex.ai'}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-bg/60 border border-dark-border">
              <span className="text-slate-400 block mb-1">Phone Number</span>
              <span className="font-mono text-slate-200 text-xs">{athlete.phone || '+44 7911 123456'}</span>
            </div>
          </div>
        </Card>

        {/* Card B: Sports & Athletic Information */}
        <Card className="p-6 space-y-4 hover:border-slate-600 transition-all">
          <CardHeader className="pb-3 mb-0">
            <CardTitle>
              <Activity className="w-5 h-5 text-cyan-400" />
              Sports & Athletic Identity
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => openEditModal('sports')}>
              Edit
            </Button>
          </CardHeader>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-dark-bg/60 border border-dark-border">
              <span className="text-slate-400 block mb-1">Primary Sport</span>
              <span className="font-bold text-volt text-sm">{athlete.sport || 'Football'}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-bg/60 border border-dark-border sm:col-span-2">
              <span className="text-slate-400 block mb-1">Playing Position / Event</span>
              <span className="font-bold text-white text-sm">{athlete.position || 'Forward / Winger'}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-dark-bg/60 border border-dark-border space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Sports Background & Competitive History
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {athlete.sportsBackground || 'School varsity team player for 2 seasons. Community tournament participant with 3 years of recreational play.'}
            </p>
          </div>
        </Card>

        {/* Card C: Physical & Performance Metrics */}
        <Card className="p-6 space-y-4 hover:border-slate-600 transition-all">
          <CardHeader className="pb-3 mb-0">
            <CardTitle>
              <Flame className="w-5 h-5 text-volt" />
              Physical & Performance Metrics
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => openEditModal('physical')}>
              Edit
            </Button>
          </CardHeader>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-dark-bg/60 border border-dark-border">
              <span className="text-slate-400 block mb-1">Height</span>
              <span className="font-bold text-white text-base font-mono">{athlete.height || '178 cm'}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-bg/60 border border-dark-border">
              <span className="text-slate-400 block mb-1">Weight</span>
              <span className="font-bold text-white text-base font-mono">{athlete.weight || '68 kg'}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-bg/60 border border-dark-border col-span-2 sm:col-span-1">
              <span className="text-slate-400 block mb-1">Readiness Score</span>
              <span className="font-bold text-volt text-base font-mono">{athlete.readiness || 35}%</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-dark-bg/60 border border-dark-border space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-volt block">
              Personal Best / Key Milestone
            </span>
            <p className="text-xs font-semibold text-white">
              {athlete.personalBest || '100m Sprint: 11.8s • 14 Goals Season'}
            </p>
          </div>
        </Card>

        {/* Card D: Training & Goals */}
        <Card className="p-6 space-y-4 hover:border-slate-600 transition-all">
          <CardHeader className="pb-3 mb-0">
            <CardTitle>
              <Target className="w-5 h-5 text-amber-400" />
              Training & Career Goals
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => openEditModal('training')}>
              Edit
            </Button>
          </CardHeader>

          {/* Preferred Days interactive chips */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Preferred Training Days:
            </span>
            <div className="flex flex-wrap gap-2">
              {WEEKDAYS.map((d) => {
                const isSelected = (athlete.preferredTrainingDays || []).includes(d.id);
                return (
                  <span
                    key={d.id}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      isSelected
                        ? 'bg-volt text-slate-950 shadow-glow-volt/30'
                        : 'bg-dark-bg text-slate-400 border border-dark-border'
                    }`}
                  >
                    {d.label}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Primary Goal Pill */}
          <div className="p-3.5 rounded-xl bg-dark-bg/60 border border-brand-500/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">Primary Objective</span>
              <h4 className="text-sm font-bold text-white mt-0.5">{athlete.goal || 'Improve performance'}</h4>
            </div>
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          {/* Strengths & Focus areas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Strengths
              </span>
              <div className="flex flex-wrap gap-1">
                {(athlete.strengths || ['Ball Control', 'Agility', 'Determination']).map((s, i) => (
                  <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-dark-bg border border-volt/30 text-volt">
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Focus Areas
              </span>
              <div className="flex flex-wrap gap-1">
                {(athlete.focusAreas || ['Tactical Positioning', 'Stamina', 'Weak-foot shooting']).map((f, i) => (
                  <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-dark-bg border border-dark-border text-slate-300">
                    🎯 {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

      </div>

      {/* 4. Edit Profile Modal */}
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => !isSaving && setIsEditModalOpen(false)}
          title="Edit Athlete Profile"
          subtitle="Update your personal details, physical benchmarks, and training schedule."
          maxWidth="max-w-2xl"
          footer={
            <>
              <Button
                variant="secondary"
                size="sm"
                disabled={isSaving}
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="volt"
                size="sm"
                loading={isSaving}
                className="text-slate-950 font-bold"
                onClick={handleSaveProfile}
              >
                Save Profile Changes
              </Button>
            </>
          }
        >
          <div className="space-y-6">
            
            {/* Modal Navigation Tabs */}
            <div className="flex border-b border-dark-border pb-2 gap-2 overflow-x-auto text-xs font-semibold">
              {[
                { id: 'personal', label: '1. Personal Info' },
                { id: 'sports', label: '2. Sports & Position' },
                { id: 'physical', label: '3. Physical & Metrics' },
                { id: 'training', label: '4. Training & Goals' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveEditTab(tab.id)}
                  className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors ${
                    activeEditTab === tab.id
                      ? 'bg-volt text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-dark-bg'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              
              {/* TAB 1: PERSONAL INFO */}
              {activeEditTab === 'personal' && (
                <div className="space-y-4 animate-fade-in">
                  {/* Avatar Picker & File Upload */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Profile Picture / Athletic Avatar
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-dark-bg border border-volt/40 overflow-hidden flex-shrink-0">
                        {editForm.avatar ? (
                          <img src={editForm.avatar} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-bold text-volt">A</div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-dark-bg border border-dark-border hover:border-volt text-xs text-white transition-colors">
                          <Camera className="w-3.5 h-3.5 text-volt" />
                          <span>Upload Photo from Device</span>
                          <input type="file" accept="image/*" onChange={handleAvatarFileUpload} className="hidden" />
                        </label>
                        <p className="text-[11px] text-slate-400">Or pick a preset athletic avatar below:</p>
                      </div>
                    </div>

                    {/* Presets */}
                    <div className="flex gap-2 pt-3 overflow-x-auto">
                      {AVATAR_PRESETS.map((av) => (
                        <button
                          key={av.id}
                          type="button"
                          onClick={() => setEditForm({ ...editForm, avatar: av.url })}
                          className={`w-10 h-10 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                            editForm.avatar === av.url ? 'border-volt scale-105 shadow-glow-volt' : 'border-dark-border opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={av.url} alt={av.label} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full bg-dark-bg border border-dark-border rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-volt"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Gender</label>
                      <select
                        value={editForm.gender}
                        onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                        className="w-full bg-dark-bg border border-dark-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-volt"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-binary">Non-binary</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Age</label>
                      <input
                        type="number"
                        value={editForm.age}
                        onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                        min="10"
                        max="60"
                        className="w-full bg-dark-bg border border-dark-border rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-volt"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
                      <input
                        type="text"
                        value={editForm.location}
                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                        placeholder="e.g. Manchester, UK"
                        className="w-full bg-dark-bg border border-dark-border rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-volt"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="w-full bg-dark-bg border border-dark-border rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-volt"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        placeholder="+44 7911 123456"
                        className="w-full bg-dark-bg border border-dark-border rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-volt"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Short Athlete Bio</label>
                    <textarea
                      value={editForm.bio}
                      onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                      rows={2}
                      className="w-full bg-dark-bg border border-dark-border rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-volt"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: SPORTS & POSITION */}
              {activeEditTab === 'sports' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Sport</label>
                      <select
                        value={editForm.sport}
                        onChange={(e) => {
                          const newSport = e.target.value;
                          const posList = SPORT_POSITIONS_MAP[newSport] || [];
                          setEditForm({ 
                            ...editForm, 
                            sport: newSport, 
                            position: posList[0] || 'Athlete' 
                          });
                        }}
                        className="w-full bg-dark-bg border border-dark-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-volt"
                      >
                        {SPORTS_LIST.map((s) => (
                          <option key={s.id} value={s.name}>{s.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Playing Position / Event</label>
                      <select
                        value={editForm.position}
                        onChange={(e) => setEditForm({ ...editForm, position: e.target.value })}
                        className="w-full bg-dark-bg border border-dark-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-volt"
                      >
                        {availablePositions.map((pos) => (
                          <option key={pos} value={pos}>{pos}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Experience Level</label>
                    <div className="grid grid-cols-3 gap-2">
                      {ONBOARDING_LEVELS.map((lvl) => (
                        <button
                          key={lvl.id}
                          type="button"
                          onClick={() => setEditForm({ ...editForm, level: lvl.id })}
                          className={`p-3 rounded-xl border text-xs text-left transition-all ${
                            editForm.level === lvl.id
                              ? 'bg-volt/15 border-volt text-white shadow-glow-volt/20'
                              : 'bg-dark-bg border-dark-border text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <p className="font-bold text-white">{lvl.label}</p>
                          <p className="text-[10px] text-slate-400">{lvl.tagline}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Sports Background & History</label>
                    <textarea
                      value={editForm.sportsBackground}
                      onChange={(e) => setEditForm({ ...editForm, sportsBackground: e.target.value })}
                      rows={3}
                      placeholder="School varsity team, club experience, tournament history..."
                      className="w-full bg-dark-bg border border-dark-border rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-volt"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: PHYSICAL & METRICS */}
              {activeEditTab === 'physical' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Height (e.g. 178 cm, 5'10")</label>
                      <input
                        type="text"
                        value={editForm.height}
                        onChange={(e) => setEditForm({ ...editForm, height: e.target.value })}
                        placeholder="178 cm"
                        className="w-full bg-dark-bg border border-dark-border rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-volt"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Weight (e.g. 68 kg, 150 lbs)</label>
                      <input
                        type="text"
                        value={editForm.weight}
                        onChange={(e) => setEditForm({ ...editForm, weight: e.target.value })}
                        placeholder="68 kg"
                        className="w-full bg-dark-bg border border-dark-border rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-volt"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Personal Best Benchmark</label>
                    <input
                      type="text"
                      value={editForm.personalBest}
                      onChange={(e) => setEditForm({ ...editForm, personalBest: e.target.value })}
                      placeholder="e.g. 100m Sprint: 11.8s • 14 Goals Season"
                      className="w-full bg-dark-bg border border-dark-border rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-volt"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">Key physical achievement or verified match statistics.</p>
                  </div>
                </div>
              )}

              {/* TAB 4: TRAINING & GOALS */}
              {activeEditTab === 'training' && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Preferred Training Days (Click to toggle)
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                      {WEEKDAYS.map((d) => {
                        const isSelected = (editForm.preferredTrainingDays || []).includes(d.id);
                        return (
                          <button
                            key={d.id}
                            type="button"
                            onClick={() => toggleTrainingDay(d.id)}
                            className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                              isSelected
                                ? 'bg-volt text-slate-950 border-volt shadow-glow-volt/30 scale-105'
                                : 'bg-dark-bg text-slate-400 border-dark-border hover:border-slate-500'
                            }`}
                          >
                            {d.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Weekly Training Volume</label>
                      <select
                        value={editForm.trainingHours}
                        onChange={(e) => setEditForm({ ...editForm, trainingHours: e.target.value })}
                        className="w-full bg-dark-bg border border-dark-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-volt"
                      >
                        <option value="2-3 hours/week">2-3 hours/week</option>
                        <option value="4 hours/week">4 hours/week</option>
                        <option value="6-8 hours/week">6-8 hours/week</option>
                        <option value="10+ hours/week">10+ hours/week</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Athletic Goal</label>
                      <select
                        value={editForm.goal}
                        onChange={(e) => setEditForm({ ...editForm, goal: e.target.value })}
                        className="w-full bg-dark-bg border border-dark-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-volt"
                      >
                        {ONBOARDING_GOALS.map((g) => (
                          <option key={g.id} value={g.id}>{g.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Key Strengths (Comma separated)</label>
                    <input
                      type="text"
                      value={editForm.strengthsText}
                      onChange={(e) => setEditForm({ ...editForm, strengthsText: e.target.value })}
                      placeholder="Ball Control, Agility, Determination"
                      className="w-full bg-dark-bg border border-dark-border rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-volt"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Development Focus Areas (Comma separated)</label>
                    <input
                      type="text"
                      value={editForm.focusAreasText}
                      onChange={(e) => setEditForm({ ...editForm, focusAreasText: e.target.value })}
                      placeholder="Tactical Positioning, Stamina, Weak-foot shooting"
                      className="w-full bg-dark-bg border border-dark-border rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-volt"
                    />
                  </div>
                </div>
              )}

            </form>

          </div>
        </Modal>
      )}

    </div>
  );
};

export default Profile;
