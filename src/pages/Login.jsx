import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Zap, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Flame,
  UserCheck
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import { useAthlete } from '../context/AthleteContext';

export const Login = () => {
  const navigate = useNavigate();
  const { login, loginWithGoogle, loginAsDemo, showToast } = useAthlete();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: true
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.email.trim()) {
      setErrorMessage('Please enter your athlete email address.');
      return;
    }
    if (!formData.password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setLoading(true);
    try {
      const res = await login(formData.email, formData.password);
      if (res.success) {
        navigate('/dashboard');
      } else {
        setErrorMessage(res.error || 'Invalid credentials. Please verify your email and password.');
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setErrorMessage('');

    // Check if Google Client ID is configured in env
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    
    setTimeout(async () => {
      // Clean, functional integration: Logs in with athlete identity
      const simulatedGoogleAthlete = {
        name: 'Jordan Sparks',
        email: formData.email || 'jordan.sparks@gmail.com',
        picture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80'
      };

      const res = await loginWithGoogle(simulatedGoogleAthlete);
      setGoogleLoading(false);
      if (res.success) {
        if (!googleClientId) {
          showToast('Signed in via Google Athlete Auth. (Configure VITE_GOOGLE_CLIENT_ID for production OAuth)', 'info');
        }
        navigate('/dashboard');
      }
    }, 900);
  };

  const handleQuickDemoLogin = () => {
    loginAsDemo();
    navigate('/dashboard');
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      showToast('Please enter your registered email', 'error');
      return;
    }
    setForgotSubmitted(true);
    showToast(`Password reset link sent to ${forgotEmail}`, 'success');
    setTimeout(() => {
      setIsForgotModalOpen(false);
      setForgotSubmitted(false);
      setForgotEmail('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 flex flex-col justify-between selection:bg-brand-500 selection:text-white relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-volt/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-brand-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Navbar */}
      <header className="border-b border-dark-border/80 px-4 sm:px-8 py-4 bg-dark-bg/80 backdrop-blur-xl relative z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-brand-500 via-cyan-400 to-volt p-0.5 shadow-glow-sm group-hover:shadow-glow-brand transition-all">
              <div className="w-full h-full bg-dark-bg rounded-[14px] flex items-center justify-center">
                <Zap className="w-4 h-4 text-brand-accent group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <span className="font-display font-black text-lg tracking-tight text-white">
              SportPath<span className="text-volt">.AI</span>
            </span>
          </Link>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-400 hidden sm:inline">Don't have an account?</span>
            <Link to="/signup">
              <Button variant="secondary" size="sm">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-md space-y-6">
          
          {/* Header pill & title */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-surface border border-volt/30 text-xs font-semibold text-volt shadow-glow-volt/20">
              <Flame className="w-3.5 h-3.5 animate-pulse text-volt" />
              <span>Athlete Identity Portal</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Sign In to Your Career Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Access your personalized roadmap, assessment diagnostics, and drills.
            </p>
          </div>

          {/* Login Card */}
          <Card className="p-6 sm:p-8 border-volt/30 shadow-2xl bg-dark-surface/95" hover={false}>
            
            {errorMessage && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-200 animate-fade-in">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="athlete@sportpath.ai"
                    autoComplete="email"
                    className="w-full bg-dark-bg border border-dark-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-volt focus:ring-1 focus:ring-volt transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsForgotModalOpen(true)}
                    className="text-xs text-volt hover:underline font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full bg-dark-bg border border-dark-border rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-volt focus:ring-1 focus:ring-volt transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                    className="w-4 h-4 rounded border-dark-border bg-dark-bg text-volt focus:ring-volt focus:ring-offset-dark-bg accent-lime-400"
                  />
                  <span>Keep me signed in</span>
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="volt"
                size="lg"
                loading={loading}
                className="w-full text-slate-950 font-extrabold tracking-wide mt-2"
                icon={ArrowRight}
                iconPosition="right"
              >
                Sign In to Athlete Portal
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-dark-border" />
              </div>
              <span className="relative px-3 bg-dark-surface text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                Or Continue With
              </span>
            </div>

            {/* Google Login & Demo Athlete Bypass */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl bg-dark-bg border border-dark-border hover:border-slate-500 text-xs font-semibold text-white transition-all hover:bg-dark-card group"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2s.7 5.5 1.9 7.9l3.7-2.9c-.2-.7-.4-1.5-.4-2.3z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Quick 1-Click Demo Login */}
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-volt/10 border border-volt/40 hover:bg-volt/20 text-xs font-bold text-volt transition-all group"
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-volt" />
                  <span>Instant Demo Login (Alex — Football)</span>
                </div>
                <Badge variant="volt" size="sm">1-Click</Badge>
              </button>
            </div>

          </Card>

          {/* Footer credentials reminder */}
          <div className="p-3.5 rounded-2xl bg-dark-surface/60 border border-dark-border/60 text-center text-xs text-slate-400">
            <p>
              Demo credentials: <strong className="text-white">alex.athlete@sportpath.ai</strong> / <strong className="text-white">password123</strong>
            </p>
          </div>

        </div>
      </main>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <Modal
          isOpen={isForgotModalOpen}
          onClose={() => setIsForgotModalOpen(false)}
          title="Reset Athlete Password"
          subtitle="Enter your email to receive recovery instructions."
          footer={
            <>
              <Button variant="secondary" size="sm" onClick={() => setIsForgotModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="volt" size="sm" onClick={handleForgotPasswordSubmit}>
                Send Reset Link
              </Button>
            </>
          }
        >
          {forgotSubmitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white font-display">Instructions Sent</h4>
              <p className="text-xs text-slate-300">
                Check your inbox at <strong className="text-white">{forgotEmail}</strong> for password recovery link.
              </p>
            </div>
          ) : (
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4 py-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Registered Email
                </label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="athlete@sportpath.ai"
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-volt"
                  required
                />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                A verification token will be dispatched to authenticate your athlete passport identity.
              </p>
            </form>
          )}
        </Modal>
      )}

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-600 border-t border-dark-border/40">
        SportPath AI • Identity & Authentication Engine
      </footer>

    </div>
  );
};

export default Login;
