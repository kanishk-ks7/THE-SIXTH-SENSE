import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Zap, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  User, 
  MapPin, 
  Calendar, 
  Target, 
  Clock, 
  Flame, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import { SPORTS_LIST, ONBOARDING_LEVELS, ONBOARDING_GOALS } from '../data/mockData';
import { useAthlete } from '../context/AthleteContext';

export const Onboarding = () => {
  const navigate = useNavigate();
  const { athlete, updateProfile } = useAthlete();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: athlete?.name || 'Alex',
    age: athlete?.age || 17,
    location: athlete?.location || 'Manchester, UK',
    sport: athlete?.sport || 'Football',
    level: athlete?.level || 'Beginner',
    trainingHours: athlete?.trainingHours || '4 hours/week',
    goal: athlete?.goal || 'Improve performance',
    readiness: 35
  });

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Save and navigate to dashboard
      updateProfile(formData);
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const stepsList = [
    { num: 1, label: 'Basic Info' },
    { num: 2, label: 'Select Sport' },
    { num: 3, label: 'Current Level' },
    { num: 4, label: 'Training & Goals' }
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 flex flex-col justify-between selection:bg-brand-500 selection:text-white">
      
      {/* Top Navbar */}
      <header className="border-b border-dark-border/80 px-4 sm:px-8 py-4 bg-dark-bg/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-500 to-volt flex items-center justify-center shadow-glow-sm">
              <Zap className="w-4 h-4 text-slate-950 fill-current" />
            </div>
            <span className="font-display font-black text-lg tracking-tight text-white">
              SportPath<span className="text-brand-accent">.AI</span>
            </span>
          </Link>

          <Link to="/dashboard" className="text-xs text-slate-400 hover:text-white transition-colors">
            Skip to Demo Dashboard →
          </Link>
        </div>
      </header>

      {/* Main Form Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl space-y-8">
          
          {/* Step Indicator */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-1">
              <span>Step {currentStep} of 4</span>
              <span className="text-brand-300 font-display font-bold">
                {stepsList[currentStep - 1].label}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {stepsList.map((st) => (
                <div
                  key={st.num}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    st.num <= currentStep
                      ? 'bg-gradient-to-r from-brand-500 to-cyan-400 shadow-glow-sm'
                      : 'bg-dark-surface border border-dark-border'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Card Body with Multi-step Content */}
          <Card className="p-6 sm:p-10 border-brand-500/20 shadow-2xl shadow-cyan-950/20" hover={false}>
            
            {/* STEP 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-2xl font-extrabold text-white font-display">
                    Step 1 — Basic Information
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Tell us your name, age, and where you train.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Full Name / Athlete Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex"
                        className="w-full bg-dark-bg border border-dark-border rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Age
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="number"
                          value={formData.age}
                          onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                          min="10"
                          max="40"
                          className="w-full bg-dark-bg border border-dark-border rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Location / City
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="e.g. Manchester, UK"
                          className="w-full bg-dark-bg border border-dark-border rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Select Sport */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-2xl font-extrabold text-white font-display">
                    Step 2 — Select Sport
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Choose your primary focus sport to customize your pathway.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {SPORTS_LIST.map((sp) => {
                    const isSelected = formData.sport === sp.name;
                    return (
                      <div
                        key={sp.id}
                        onClick={() => setFormData({ ...formData, sport: sp.name })}
                        className={`cursor-pointer p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                          isSelected
                            ? 'bg-brand-500/15 border-brand-accent text-white shadow-glow-sm scale-105'
                            : 'bg-dark-bg/60 border-dark-border text-slate-400 hover:text-slate-200 hover:border-slate-600'
                        }`}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm"
                          style={{ backgroundColor: `${sp.color}20`, color: sp.color }}
                        >
                          ●
                        </div>
                        <span className="text-xs font-bold font-display">{sp.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: Current Level */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-2xl font-extrabold text-white font-display">
                    Step 3 — Current Experience Level
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Select your current competitive stage.
                  </p>
                </div>

                <div className="space-y-3">
                  {ONBOARDING_LEVELS.map((lvl) => {
                    const isSelected = formData.level === lvl.id;
                    return (
                      <div
                        key={lvl.id}
                        onClick={() => setFormData({ ...formData, level: lvl.id })}
                        className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                          isSelected
                            ? 'bg-brand-500/15 border-brand-accent text-white shadow-glow-sm'
                            : 'bg-dark-bg/60 border-dark-border text-slate-300 hover:border-slate-600 hover:bg-dark-surface'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white font-display">{lvl.label}</h4>
                            <Badge variant={isSelected ? 'primary' : 'default'} size="sm">
                              {lvl.tagline}
                            </Badge>
                          </div>
                          <p className="text-xs text-slate-400 mt-1">{lvl.desc}</p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? 'border-brand-accent bg-brand-500 text-slate-950'
                              : 'border-slate-600'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 4: Training Information & Goal */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-2xl font-extrabold text-white font-display">
                    Step 4 — Training Information & Goal
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Define your weekly training commitment and primary milestone.
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Training Hours */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Training Hours Per Week
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['2-3 hours/week', '4 hours/week', '6-8 hours/week', '10+ hours/week'].map((hrs) => (
                        <button
                          key={hrs}
                          type="button"
                          onClick={() => setFormData({ ...formData, trainingHours: hrs })}
                          className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                            formData.trainingHours === hrs
                              ? 'bg-volt text-slate-950 font-bold border-volt shadow-glow-volt'
                              : 'bg-dark-bg border-dark-border text-slate-300 hover:border-slate-600'
                          }`}
                        >
                          {hrs}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Primary Goal */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Primary Athletic Goal
                    </label>
                    <div className="space-y-2">
                      {ONBOARDING_GOALS.map((g) => {
                        const isSelected = formData.goal === g.id;
                        return (
                          <div
                            key={g.id}
                            onClick={() => setFormData({ ...formData, goal: g.id })}
                            className={`cursor-pointer p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                              isSelected
                                ? 'bg-brand-500/15 border-brand-accent text-white shadow-glow-sm'
                                : 'bg-dark-bg/60 border-dark-border text-slate-300 hover:border-slate-600'
                            }`}
                          >
                            <div>
                              <p className="text-xs font-bold text-white">{g.title}</p>
                              <p className="text-[11px] text-slate-400">{g.desc}</p>
                            </div>
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                                isSelected
                                  ? 'border-brand-accent bg-brand-500 text-slate-950'
                                  : 'border-slate-600'
                              }`}
                            >
                              {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-8 mt-8 border-t border-dark-border/60">
              {currentStep > 1 ? (
                <Button
                  variant="secondary"
                  size="md"
                  icon={ArrowLeft}
                  onClick={handleBack}
                >
                  Back
                </Button>
              ) : (
                <div />
              )}

              <Button
                variant={currentStep === 4 ? 'volt' : 'primary'}
                size="md"
                icon={currentStep === 4 ? CheckCircle2 : ArrowRight}
                iconPosition="right"
                onClick={handleNext}
              >
                {currentStep === 4 ? 'Create My Athlete Profile' : 'Continue'}
              </Button>
            </div>

          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-600">
        SportPath AI • Athlete Setup Engine
      </footer>

    </div>
  );
};

export default Onboarding;
