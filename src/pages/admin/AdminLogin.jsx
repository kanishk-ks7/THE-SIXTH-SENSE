import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAthlete } from '../../context/AthleteContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

export const AdminLogin = () => {
  const { loginAsAdmin } = useAthlete();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await loginAsAdmin(formData.email, formData.password);
      if (res.success) {
        navigate('/admin/dashboard');
      } else {
        setError(res.error || 'Admin verification failed.');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred during admin sign-in.');
    } finally {
      setLoading(false);
    }
  };

  const fillDefaultAdmin = () => {
    setFormData({
      email: 'admin@athletex.ai',
      password: 'adminPassword123'
    });
    setError(null);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 flex flex-col justify-between font-sans relative overflow-hidden">
      {/* Glow background elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-brand-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-volt/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-dark-border/80 px-4 sm:px-8 py-4 bg-dark-bg/80 backdrop-blur-xl relative z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 via-cyan-400 to-volt p-0.5 shadow-glow-sm">
              <div className="w-full h-full bg-dark-bg rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-volt" />
              </div>
            </div>
            <span className="font-display font-black text-lg tracking-tight text-white">
              Athletex<span className="text-volt">.Admin</span>
            </span>
          </Link>

          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-xs text-slate-400 hover:text-white">
              Athlete Portal →
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-md space-y-6">

          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-volt/10 border border-volt/30 text-volt text-[11px] font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Administrative Authorization</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Administrator Login
            </h1>
            <p className="text-xs text-slate-400">
              Sign in with your elevated system credentials to access the governance console.
            </p>
          </div>

          <Card className="p-6 sm:p-8 space-y-6 border-dark-border bg-dark-surface/90 shadow-2xl backdrop-blur-xl">
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="admin@athletex.ai"
                    className="w-full bg-dark-bg border border-dark-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-volt focus:ring-1 focus:ring-volt transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••••••"
                    className="w-full bg-dark-bg border border-dark-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-volt focus:ring-1 focus:ring-volt transition-colors"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="volt"
                size="lg"
                className="w-full font-bold text-slate-950 mt-2 shadow-glow-volt/20"
                disabled={loading}
                icon={ArrowRight}
                iconPosition="right"
              >
                {loading ? 'Authenticating Admin...' : 'Access Admin Dashboard'}
              </Button>
            </form>

            <div className="pt-4 border-t border-dark-border/60">
              <button
                type="button"
                onClick={fillDefaultAdmin}
                className="w-full py-2 px-3 rounded-xl bg-dark-bg border border-dark-border hover:border-volt/50 text-slate-300 hover:text-white text-xs font-medium transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-volt" />
                <span>Fill Development Admin Credentials</span>
              </button>
            </div>
          </Card>

          <p className="text-center text-[11px] text-slate-500">
            Note: Normal athletes cannot sign in through this interface. Access is strictly audited.
          </p>
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-slate-600 border-t border-dark-border/40">
        Athletex Platform Governance • Identity Verification Module
      </footer>
    </div>
  );
};
export default AdminLogin;
