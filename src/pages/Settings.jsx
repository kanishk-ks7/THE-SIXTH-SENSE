import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Sliders,
  LogOut,
  Trash2,
  AlertTriangle,
  Flame,
  Check,
  ShieldCheck,
  Zap,
  KeyRound
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Card, { CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { useAthlete } from '../context/AthleteContext';

export const Settings = () => {
  const navigate = useNavigate();
  const { 
    athlete, 
    theme, 
    toggleTheme, 
    resetToDemo, 
    changePassword, 
    deleteAccount, 
    logout, 
    showToast 
  } = useAthlete();

  // Notification Toggles
  const [notifications, setNotifications] = useState({
    roadmapAlerts: true,
    dailyDrills: true,
    trialDeadlines: true,
    scoutViews: false
  });

  // Language & Privacy
  const [selectedLanguage, setSelectedLanguage] = useState('English (US)');
  const [profileVisibility, setProfileVisibility] = useState('public');

  // Password Change State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordUpdating, setIsPasswordUpdating] = useState(false);

  // Delete Account Confirmation Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleNotification = (key) => {
    setNotifications(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      showToast(`${key} preferences updated`, 'info');
      return updated;
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');

    if (!passwordForm.currentPassword) {
      setPasswordError('Please enter your current password.');
      return;
    }
    if (!passwordForm.newPassword) {
      setPasswordError('Please enter a new password.');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    setIsPasswordUpdating(true);
    const res = await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
    setIsPasswordUpdating(false);

    if (res.success) {
      setIsPasswordModalOpen(false);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } else {
      setPasswordError(res.error || 'Failed to update password.');
    }
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/login');
  };

  const handleDeleteAccountSubmit = async (e) => {
    e.preventDefault();
    if (deleteConfirmText.trim().toUpperCase() !== 'DELETE') {
      showToast('Please type DELETE to confirm account removal', 'error');
      return;
    }

    setIsDeleting(true);
    const res = await deleteAccount();
    setIsDeleting(false);

    if (res.success) {
      setIsDeleteModalOpen(false);
      navigate('/');
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <PageHeader
        title="Settings & Account Management"
        subtitle="Manage athlete authentication security, visual theme, notification triggers, and system controls."
        badge="System Hub v1.0"
        breadcrumbs={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Settings' }
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 Cols): Profile, Security, Preferences */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Account & Identity Overview */}
          <Card className="p-6 space-y-4 hover:border-slate-600 transition-all">
            <CardHeader className="pb-3 mb-0">
              <CardTitle>
                <User className="w-5 h-5 text-volt" />
                Athlete Identity & Account
              </CardTitle>
              <Badge variant="volt" size="sm">Active Account</Badge>
            </CardHeader>

            <div className="space-y-3 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-dark-bg/60 border border-dark-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-dark-surface border border-volt/40 overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {athlete.avatar ? (
                      <img src={athlete.avatar} alt={athlete.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-bold text-volt text-lg font-display">
                        {athlete.name ? athlete.name.charAt(0) : 'A'}
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{athlete.name || 'Alex Johnson'}</h4>
                    <p className="text-slate-400 font-mono text-[11px]">{athlete.email || 'alex.athlete@sportpath.ai'}</p>
                    <p className="text-[11px] text-volt mt-0.5">{athlete.sport} • {athlete.level} • {athlete.position || 'Forward'}</p>
                  </div>
                </div>

                <Link to="/profile">
                  <Button variant="outline" size="sm">
                    Manage Profile
                  </Button>
                </Link>
              </div>

              {/* Password & Security Card */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-dark-bg/60 border border-dark-border">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-slate-400" />
                    Account Password
                  </h4>
                  <p className="text-slate-400 mt-0.5 text-[11px]">
                    Update your login credentials to protect your athlete passport.
                  </p>
                </div>

                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={() => {
                    setPasswordError('');
                    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    setIsPasswordModalOpen(true);
                  }}
                >
                  Change Password
                </Button>
              </div>
            </div>
          </Card>

          {/* 2. Visual Theme & Display Preferences */}
          <Card className="p-6 space-y-4 hover:border-slate-600 transition-all">
            <CardHeader className="pb-3 mb-0">
              <CardTitle>
                <Sliders className="w-5 h-5 text-cyan-400" />
                Visual Theme & Locale
              </CardTitle>
              <Badge variant="primary" size="sm">UI Controls</Badge>
            </CardHeader>

            <div className="space-y-4 text-xs">
              
              {/* Theme Mode Selector */}
              <div className="p-4 rounded-2xl bg-dark-bg/60 border border-dark-border space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      {theme === 'dark' ? <Moon className="w-4 h-4 text-volt" /> : <Sun className="w-4 h-4 text-amber-400" />}
                      Appearance Theme
                    </h4>
                    <p className="text-slate-400 mt-0.5 text-[11px]">
                      Currently active: <strong className="text-white">{theme === 'dark' ? 'Athletic Dark Mode (Black + Neon Green)' : 'Clean Light Mode'}</strong>
                    </p>
                  </div>
                </div>

                {/* Theme Selector Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => theme !== 'dark' && toggleTheme()}
                    className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                      theme === 'dark'
                        ? 'bg-dark-surface border-volt text-white shadow-glow-volt/20'
                        : 'bg-dark-bg/40 border-dark-border text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Moon className="w-4 h-4 text-volt" />
                      <div>
                        <p className="font-bold text-xs">Dark Mode</p>
                        <p className="text-[10px] text-slate-400">Black + Neon Green</p>
                      </div>
                    </div>
                    {theme === 'dark' && <Check className="w-4 h-4 text-volt stroke-[3]" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => theme !== 'light' && toggleTheme()}
                    className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                      theme === 'light'
                        ? 'bg-slate-800 border-volt text-white shadow-glow-volt/20'
                        : 'bg-dark-bg/40 border-dark-border text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Sun className="w-4 h-4 text-amber-400" />
                      <div>
                        <p className="font-bold text-xs">Light Mode</p>
                        <p className="text-[10px] text-slate-400">Crisp High Contrast</p>
                      </div>
                    </div>
                    {theme === 'light' && <Check className="w-4 h-4 text-volt stroke-[3]" />}
                  </button>
                </div>
              </div>

              {/* Language Selector */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-dark-bg/60 border border-dark-border">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    Platform Language
                  </h4>
                  <p className="text-slate-400 mt-0.5 text-[11px]">Select your regional sport terminology dictionary</p>
                </div>
                <select
                  value={selectedLanguage}
                  onChange={(e) => {
                    setSelectedLanguage(e.target.value);
                    showToast(`Language updated to ${e.target.value}`);
                  }}
                  className="bg-dark-surface border border-dark-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-volt"
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

          {/* 3. Notifications & Scout Privacy */}
          <Card className="p-6 space-y-4 hover:border-slate-600 transition-all">
            <CardHeader className="pb-3 mb-0">
              <CardTitle>
                <Bell className="w-5 h-5 text-amber-400" />
                Notification & Privacy Controls
              </CardTitle>
              <Badge variant="amber" size="sm">Alerts</Badge>
            </CardHeader>

            <div className="space-y-3 text-xs">
              
              {/* Notification Item 1: Roadmap */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-dark-bg/60 border border-dark-border">
                <div>
                  <h4 className="text-xs font-bold text-white">Roadmap & Assessment Progression</h4>
                  <p className="text-slate-400 text-[11px]">Receive triggers when assessment diagnostics unlock new milestones</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleNotification('roadmapAlerts')}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    notifications.roadmapAlerts ? 'bg-volt justify-end' : 'bg-slate-700 justify-start'
                  }`}
                >
                  <span className="w-4 h-4 bg-slate-950 rounded-full shadow-md" />
                </button>
              </div>

              {/* Notification Item 2: Daily Drills */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-dark-bg/60 border border-dark-border">
                <div>
                  <h4 className="text-xs font-bold text-white">Daily Workout & Drill Reminders</h4>
                  <p className="text-slate-400 text-[11px]">Training consistency streak reminders on scheduled training days</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleNotification('dailyDrills')}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    notifications.dailyDrills ? 'bg-volt justify-end' : 'bg-slate-700 justify-start'
                  }`}
                >
                  <span className="w-4 h-4 bg-slate-950 rounded-full shadow-md" />
                </button>
              </div>

              {/* Notification Item 3: Trial Alerts */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-dark-bg/60 border border-dark-border">
                <div>
                  <h4 className="text-xs font-bold text-white">Competition & Selection Trial Deadlines</h4>
                  <p className="text-slate-400 text-[11px]">Alerts for upcoming verified trials closing registration in your region</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleNotification('trialDeadlines')}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    notifications.trialDeadlines ? 'bg-volt justify-end' : 'bg-slate-700 justify-start'
                  }`}
                >
                  <span className="w-4 h-4 bg-slate-950 rounded-full shadow-md" />
                </button>
              </div>

              {/* Profile Visibility */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-dark-bg/60 border border-dark-border mt-2">
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    Scout Radar Visibility
                  </h4>
                  <p className="text-slate-400 text-[11px]">Control who can discover your verified statistics passport</p>
                </div>
                <select
                  value={profileVisibility}
                  onChange={(e) => {
                    setProfileVisibility(e.target.value);
                    showToast(`Scout radar set to: ${e.target.value}`);
                  }}
                  className="bg-dark-surface border border-dark-border rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-volt"
                >
                  <option value="public">Public (All Certified Scouts)</option>
                  <option value="coaches">Affiliated Coaches Only</option>
                  <option value="private">Private (Restricted)</option>
                </select>
              </div>

            </div>
          </Card>

        </div>

        {/* Right Column (1 Col): Danger Zone & State Controls */}
        <div className="space-y-6">
          
          {/* Demo Reset Card */}
          <Card className="p-6 space-y-4 border-volt/30 shadow-glow-volt/10">
            <CardHeader className="pb-3 mb-0">
              <CardTitle>
                <RotateCcw className="w-5 h-5 text-volt" />
                Demo State Controls
              </CardTitle>
              <Badge variant="volt" size="sm">Prototype</Badge>
            </CardHeader>

            <p className="text-xs text-slate-300 leading-relaxed">
              Reset the active athlete profile to default demo state (<strong className="text-white">Alex Johnson, Football, Beginner, 4 hrs/wk, 35% Readiness</strong>).
            </p>

            <Button
              variant="volt"
              size="md"
              className="w-full text-slate-950 font-extrabold"
              icon={RotateCcw}
              onClick={resetToDemo}
            >
              Reset to Demo Athlete (Alex)
            </Button>
          </Card>

          {/* Account Actions & Danger Zone */}
          <Card className="p-6 space-y-4 border-red-500/30">
            <CardHeader className="pb-3 mb-0">
              <CardTitle>
                <AlertTriangle className="w-5 h-5 text-red-400" />
                Account Actions
              </CardTitle>
              <Badge variant="danger" size="sm">Danger Zone</Badge>
            </CardHeader>

            <div className="space-y-3">
              {/* Logout Button */}
              <Button
                variant="secondary"
                size="md"
                className="w-full flex items-center justify-center gap-2 text-slate-200 hover:text-white"
                icon={LogOut}
                onClick={handleLogoutClick}
              >
                Sign Out of Athlete Portal
              </Button>

              {/* Delete Account Trigger */}
              <Button
                variant="danger"
                size="md"
                className="w-full flex items-center justify-center gap-2 font-bold"
                icon={Trash2}
                onClick={() => {
                  setDeleteConfirmText('');
                  setIsDeleteModalOpen(true);
                }}
              >
                Delete Athlete Account
              </Button>
            </div>

            <p className="text-[11px] text-slate-500 text-center">
              Multi-user data stored securely in browser database.
            </p>
          </Card>

        </div>

      </div>

      {/* 5. Change Password Modal */}
      {isPasswordModalOpen && (
        <Modal
          isOpen={isPasswordModalOpen}
          onClose={() => !isPasswordUpdating && setIsPasswordModalOpen(false)}
          title="Change Account Password"
          subtitle="Enter your current password and choose a new secure password."
          maxWidth="max-w-md"
          footer={
            <>
              <Button
                variant="secondary"
                size="sm"
                disabled={isPasswordUpdating}
                onClick={() => setIsPasswordModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="volt"
                size="sm"
                loading={isPasswordUpdating}
                className="text-slate-950 font-bold"
                onClick={handlePasswordSubmit}
              >
                Update Password
              </Button>
            </>
          }
        >
          <form onSubmit={handlePasswordSubmit} className="space-y-4 py-1">
            {passwordError && (
              <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-xs text-red-300">
                {passwordError}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Current Password</label>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-dark-bg border border-dark-border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-volt"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">New Password (Min. 6 characters)</label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-dark-bg border border-dark-border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-volt"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Confirm New Password</label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-dark-bg border border-dark-border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-volt"
                required
              />
            </div>
          </form>
        </Modal>
      )}

      {/* 6. Delete Account Confirmation Modal */}
      {isDeleteModalOpen && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => !isDeleting && setIsDeleteModalOpen(false)}
          title="Delete Athlete Account?"
          subtitle="This action is permanent and cannot be undone."
          maxWidth="max-w-md"
          footer={
            <>
              <Button
                variant="secondary"
                size="sm"
                disabled={isDeleting}
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                loading={isDeleting}
                disabled={deleteConfirmText.trim().toUpperCase() !== 'DELETE'}
                onClick={handleDeleteAccountSubmit}
              >
                Permanently Delete
              </Button>
            </>
          }
        >
          <div className="space-y-4 py-2 text-xs">
            <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 leading-relaxed">
              <strong>Warning:</strong> Deleting your account will immediately wipe your athlete passport, assessment scores, completed training records, and registered trial bookmarks.
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">
                Type <span className="font-mono font-bold text-red-400">DELETE</span> to confirm:
              </label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="DELETE"
                className="w-full bg-dark-bg border border-red-500/50 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-400 font-mono"
              />
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};

export default Settings;
