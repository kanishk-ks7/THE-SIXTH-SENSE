import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Trophy, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  Info, 
  User, 
  Mail, 
  Phone, 
  Award, 
  Clock, 
  Sparkles,
  Building,
  FileCheck
} from 'lucide-react';
import { useAthlete } from '../context/AthleteContext';
import { COMPETITION_EVENTS } from '../data/mockData';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

export const DemoRegistration = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { athlete, registerForEvent, registeredEvents, showToast } = useAthlete();

  // Locate the target event
  const targetEvent = COMPETITION_EVENTS.find(e => e.id === eventId) || COMPETITION_EVENTS[0];
  const isAlreadyRegistered = registeredEvents.includes(targetEvent.id);

  // Form State prefilled from athlete context
  const [formData, setFormData] = useState({
    fullName: athlete?.name || 'Alex Johnson',
    email: athlete?.email || 'alex.athlete@athletex.ai',
    phone: athlete?.phone || '+44 7911 123456',
    age: athlete?.age || 17,
    gender: athlete?.gender || 'Male',
    sport: targetEvent?.sport || athlete?.sport || 'Football',
    position: athlete?.position || 'Forward / Winger',
    clubName: athlete?.sportsBackground ? 'North West Varsity Football' : 'St. Jude Academy Club',
    emergencyContactName: 'Sarah Johnson (Parent/Guardian)',
    emergencyContactPhone: '+44 7911 654321',
    medicalNotes: 'None / Full fitness cleared',
    agreedToTerms: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(isAlreadyRegistered);
  const [registrationRef, setRegistrationRef] = useState(
    () => `REG-2026-${Math.floor(1000 + Math.random() * 9000)}`
  );

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreedToTerms) {
      showToast('Please accept the event terms and athlete code of conduct.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      registerForEvent(targetEvent.id, formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      
      {/* Top Breadcrumb & Return Link */}
      <div className="flex items-center justify-between">
        <Link 
          to="/events" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Events Calendar</span>
        </Link>
      </div>

      <PageHeader
        title="Event Registration Portal"
        subtitle={`Official entry application for ${targetEvent.name}`}
        badge="Simulated Registration Engine"
        breadcrumbs={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Events', path: '/events' },
          { label: 'Registration' }
        ]}
      />

      {/* Demo Portal Disclaimer Alert */}
      <div className="p-4 rounded-2xl bg-volt/10 border border-volt/30 flex items-start gap-3.5 shadow-glow-volt/10">
        <ShieldCheck className="w-5 h-5 text-volt flex-shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed">
          <p className="font-bold text-white tracking-wide">
            Demo Registration Portal &bull; Simulated Competition Entry
          </p>
          <p className="text-slate-300 mt-0.5">
            This is an interactive demonstration portal. Submitting this form updates your client state, marks the event as <strong>Registered</strong> in your athlete calendar, and links it directly to your official Results Archive.
          </p>
        </div>
      </div>

      {isSubmitted ? (
        /* Confirmation View */
        <Card className="p-8 text-center space-y-6 max-w-2xl mx-auto border-volt/40 bg-dark-surface/90">
          <div className="w-16 h-16 rounded-3xl bg-volt/20 border border-volt/40 flex items-center justify-center text-volt mx-auto shadow-glow-volt">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <Badge variant="volt" size="md">
              Registration Confirmed
            </Badge>
            <h3 className="text-2xl font-black text-white font-display">
              You are Officially Registered!
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Your application has been received and verified. Your athlete profile has been linked to the official participant roster.
            </p>
          </div>

          {/* Reference Receipt Card */}
          <div className="p-4 rounded-2xl bg-dark-bg/80 border border-dark-border/80 text-left space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-dark-border/40">
              <span className="text-slate-400">Confirmation Code:</span>
              <span className="font-mono font-bold text-volt text-sm">{registrationRef}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Event:</span>
              <span className="font-bold text-white text-right">{targetEvent.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Athlete Name:</span>
              <span className="font-semibold text-slate-200">{formData.fullName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Sport / Category:</span>
              <span className="text-slate-200">{targetEvent.sport} &bull; {targetEvent.level}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Tournament Dates:</span>
              <span className="text-slate-200">{targetEvent.date}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Venue:</span>
              <span className="text-slate-200">{targetEvent.location}</span>
            </div>
          </div>

          {/* Navigation Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/events" className="w-full sm:w-auto">
              <Button variant="secondary" size="md" className="w-full">
                Return to Events
              </Button>
            </Link>
            <Link to="/results" className="w-full sm:w-auto">
              <Button variant="volt" size="md" className="w-full">
                View in Results Archive
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        /* Registration Form Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Event Summary (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Card className="p-5 space-y-4 sticky top-20 border-brand-500/30">
              <div className="flex items-center justify-between flex-wrap gap-1.5">
                <div className="flex items-center gap-1.5">
                  <Badge
                    variant={targetEvent.tier === 'National' ? 'amber' : targetEvent.tier === 'State' ? 'volt' : targetEvent.tier === 'District' ? 'primary' : 'default'}
                    size="sm"
                  >
                    {targetEvent.tier || 'District'} Tier
                  </Badge>
                  <Badge variant={targetEvent.type === 'Selection Trials' ? 'volt' : 'primary'} size="sm">
                    {targetEvent.type}
                  </Badge>
                </div>
                <Badge variant="emerald" size="sm">
                  {targetEvent.status}
                </Badge>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white font-display leading-snug">
                  {targetEvent.name}
                </h3>
                <p className="text-xs text-brand-300 font-semibold mt-1">
                  Organized by {targetEvent.organizer}
                </p>
              </div>

              {targetEvent.description && (
                <p className="text-xs text-slate-400 leading-relaxed">
                  {targetEvent.description}
                </p>
              )}

              <div className="space-y-2.5 pt-3 border-t border-dark-border/60 text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-volt flex-shrink-0" />
                  <span>{targetEvent.date}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-brand-400 flex-shrink-0" />
                  <span>{targetEvent.location}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Deadline: {targetEvent.registrationDeadline || 'Oct 01, 2026'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>Eligibility: {targetEvent.eligibility}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-dark-bg/60 border border-dark-border text-xs flex items-center justify-between">
                <span className="text-slate-400">Entry Fee:</span>
                <span className="font-bold text-white">{targetEvent.fee || 'Free Entry'}</span>
              </div>
            </Card>
          </div>

          {/* Right Column: Registration Form (8 cols) */}
          <div className="lg:col-span-8">
            <Card className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="border-b border-dark-border/60 pb-3">
                  <h4 className="text-sm font-bold text-white font-display">
                    Athlete Details
                  </h4>
                  <p className="text-xs text-slate-400">
                    Verify applicant identity and verified competition roster info.
                  </p>
                </div>

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="fullName" className="text-xs font-semibold text-slate-300">
                      Full Legal Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full bg-dark-bg border border-dark-border rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-slate-300">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-dark-bg border border-dark-border rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-xs font-semibold text-slate-300">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-dark-bg border border-dark-border rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Age & Position */}
                  <div className="space-y-1.5">
                    <label htmlFor="position" className="text-xs font-semibold text-slate-300">
                      Primary Playing Role / Position
                    </label>
                    <input
                      id="position"
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full bg-dark-bg border border-dark-border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                    />
                  </div>

                  {/* Club or School */}
                  <div className="sm:col-span-2 space-y-1.5">
                    <label htmlFor="clubName" className="text-xs font-semibold text-slate-300">
                      School, Club or Academy Name
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="clubName"
                        type="text"
                        name="clubName"
                        value={formData.clubName}
                        onChange={handleInputChange}
                        className="w-full bg-dark-bg border border-dark-border rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="space-y-1.5">
                    <label htmlFor="emergencyContactName" className="text-xs font-semibold text-slate-300">
                      Emergency Contact Name *
                    </label>
                    <input
                      id="emergencyContactName"
                      type="text"
                      name="emergencyContactName"
                      required
                      value={formData.emergencyContactName}
                      onChange={handleInputChange}
                      className="w-full bg-dark-bg border border-dark-border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="emergencyContactPhone" className="text-xs font-semibold text-slate-300">
                      Emergency Contact Phone *
                    </label>
                    <input
                      id="emergencyContactPhone"
                      type="tel"
                      name="emergencyContactPhone"
                      required
                      value={formData.emergencyContactPhone}
                      onChange={handleInputChange}
                      className="w-full bg-dark-bg border border-dark-border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                    />
                  </div>

                </div>

                {/* Terms Agreement Checkbox */}
                <div className="pt-3 border-t border-dark-border/60">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="agreedToTerms"
                      checked={formData.agreedToTerms}
                      onChange={handleInputChange}
                      className="mt-0.5 rounded border-dark-border text-volt focus:ring-volt focus:ring-offset-dark-bg"
                    />
                    <span className="text-xs text-slate-300 leading-snug">
                      I confirm that the applicant meets the eligibility standards and agree to the tournament regulations and sanctioning body code of ethics.
                    </span>
                  </label>
                </div>

                {/* Form Action Buttons */}
                <div className="pt-4 flex items-center justify-end gap-3">
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => navigate('/events')}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="volt"
                    size="md"
                    type="submit"
                    loading={isSubmitting}
                  >
                    Complete Registration
                  </Button>
                </div>

              </form>
            </Card>
          </div>

        </div>
      )}

    </div>
  );
};

export default DemoRegistration;
