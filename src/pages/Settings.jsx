import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Lock, 
  Globe, 
  Bell, 
  Moon, 
  Sun, 
  Shield, 
  RotateCcw, 
  CheckCircle2, 
  Eye, 
  Sliders
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Card, { CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useAthlete } from '../context/AthleteContext';
import { Link } from 'react-router-dom';

export const Settings = () => {
  const { athlete, theme, toggleTheme, resetToDemo, showToast } = useAthlete();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [trialAlerts, setTrialAlerts] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState('public');
  const [selectedLanguage, setSelectedLanguage] = useState('English (US)');

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <PageHeader
        title="Settings & System Preferences"
        subtitle="Manage your athlete account security, notification triggers, theme styling, and privacy."
        badge="System Hub"
        breadcrumbs={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Settings' }
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Account & Security */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Account Settings */}
          <Card className="p-6 space-y-4">
            <CardHeader className="pb-3 mb-0">
              <CardTitle>
                <User className="w-5 h-5 text-brand-400" />
                Account Settings
              </CardTitle>
              <Badge variant="primary" size="sm">Active User</Badge>
            </CardHeader>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-dark-bg/60 border border-dark-border">
                <div>
                  <h4 className="text-sm font-bold text-white">{athlete.name || 'Alex'}</h4>
                  <p className="text-slate-400">{athlete.sport} • {athlete.level} • {athlete.location}</p>
                </div>
                <Link to="/profile">
                  <Button variant="outline" size="sm">
                    Edit Profile Details
                  </Button>
                </Link>
              </div>

              {/* Password Placeholder */}
              <div className="p-3.5 rounded-xl bg-dark-bg/60 border border-dark-border flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-slate-400" />
                    Security & Password
                  </h4>
                  <p className="text-slate-400 mt-0.5">Password last updated 14 days ago</p>
                </div>
                <Button variant="secondary" size="sm" onClick={() => showToast('Password change modal ready for auth backend')}>
                  Change Password
                </Button>
              </div>
            </div>
          </Card>

          {/* 2. Preferences */}
          <Card className="p-6 space-y-4">
            <CardHeader className="pb-3 mb-0">
              <CardTitle>
                <Sliders className="w-5 h-5 text-volt" />
                Preferences & Notifications
              </CardTitle>
              <Badge variant="volt" size="sm">UI & Alerts</Badge>
            </CardHeader>

            <div className="space-y-4 text-xs">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-dark-bg/60 border border-dark-border">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    {theme === 'dark' ? <Moon className="w-4 h-4 text-brand-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
                    Visual Theme
                  </h4>
                  <p className="text-slate-400 mt-0.5">Currently active: {theme === 'dark' ? 'Sports Dark Mode' : 'Light Mode'}</p>
                </div>
                <Button variant="secondary" size="sm" onClick={toggleTheme}>
                  Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
                </Button>
              </div>

              {/* Notifications Toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-dark-bg/60 border border-dark-border">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Bell className="w-4 h-4 text-brand-400" />
                    Roadmap & Drill Reminders
                  </h4>
                  <p className="text-slate-400 mt-0.5">Receive daily notifications for training schedules</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setNotificationsEnabled(!notificationsEnabled);
                    showToast(notificationsEnabled ? 'Reminders disabled' : 'Reminders enabled');
                  }}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    notificationsEnabled ? 'bg-brand-500 justify-end' : 'bg-slate-700 justify-start'
                  }`}
                >
                  <span className="w-4 h-4 bg-white rounded-full shadow-md transform" />
                </button>
              </div>

              {/* Language Selector */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-dark-bg/60 border border-dark-border">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Globe className="w-4 h-4 text-brand-400" />
                    Language
                  </h4>
                  <p className="text-slate-400 mt-0.5">Platform locale and dictionary</p>
                </div>
                <select
                  value={selectedLanguage}
                  onChange={(e) => {
                    setSelectedLanguage(e.target.value);
                    showToast(`Language set to ${e.target.value}`);
                  }}
                  className="bg-dark-surface border border-dark-border rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="English (US)">English (US)</option>
                  <option value="Spanish (ES)">Spanish (ES)</option>
                  <option value="French (FR)">French (FR)</option>
                  <option value="German (DE)">German (DE)</option>
                  <option value="Hindi (IN)">Hindi (IN)</option>
                </select>
              </div>
            </div>
          </Card>

          {/* 3. Privacy */}
          <Card className="p-6 space-y-4">
            <CardHeader className="pb-3 mb-0">
              <CardTitle>
                <Shield className="w-5 h-5 text-emerald-400" />
                Privacy & Scout Visibility
              </CardTitle>
              <Badge variant="emerald" size="sm">Scout Controls</Badge>
            </CardHeader>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-dark-bg/60 border border-dark-border">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Eye className="w-4 h-4 text-emerald-400" />
                    Athlete Profile Visibility
                  </h4>
                  <p className="text-slate-400 mt-0.5">Allow certified academy scouts to view your performance radar</p>
                </div>
                <select
                  value={profileVisibility}
                  onChange={(e) => {
                    setProfileVisibility(e.target.value);
                    showToast(`Profile visibility updated: ${e.target.value}`);
                  }}
                  className="bg-dark-surface border border-dark-border rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="public">Public (Visible to Scouts)</option>
                  <option value="private">Private (Only You)</option>
                  <option value="coaches">Coaches Only</option>
                </select>
              </div>
            </div>
          </Card>

        </div>

        {/* Right Column: Demo Reset & Architecture Utilities */}
        <div className="space-y-6">
          <Card className="p-6 space-y-4 border-volt/30 shadow-glow-volt/10">
            <CardHeader className="pb-3 mb-0">
              <CardTitle>
                <RotateCcw className="w-5 h-5 text-volt" />
                Demo State Controls
              </CardTitle>
              <Badge variant="volt" size="sm">Prototype</Badge>
            </CardHeader>

            <p className="text-xs text-slate-300 leading-relaxed">
              Reset the application state to the default demonstration profile (<strong className="text-white">Alex, Football, Beginner, 4 hrs/wk, Improve performance, 35% readiness</strong>).
            </p>

            <Button
              variant="volt"
              size="md"
              className="w-full text-slate-950 font-bold"
              icon={RotateCcw}
              onClick={resetToDemo}
            >
              Reset to Demo Profile (Alex)
            </Button>

            <div className="pt-2 text-[11px] text-slate-500 text-center">
              Uses browser localStorage exclusively. Zero backend required.
            </div>
          </Card>

          <Card className="p-6 space-y-3 bg-dark-bg/60 border-dark-border text-xs">
            <h4 className="font-bold text-white font-display text-sm">
              College Project Architecture
            </h4>
            <p className="text-slate-400 leading-relaxed">
              This frontend prototype provides isolated module hooks across Assessment, Roadmap, Learn, Train, Compete, Progress, and Results for team members to plug in their respective engines.
            </p>
          </Card>
        </div>

      </div>

    </div>
  );
};

export default Settings;
