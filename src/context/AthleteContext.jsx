import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  getAthleteProfile, 
  saveAthleteProfile, 
  resetDemoProfile, 
  isOnboardingCompleted, 
  getSavedEvents, 
  toggleSaveEvent,
  registerUser,
  authenticateUser,
  authenticateWithGoogle,
  getCurrentSession,
  setCurrentSession,
  clearCurrentSession,
  changeUserPassword,
  deleteUserAccount,
  getThemeMode,
  saveThemeMode,
  getCompletedLessons,
  saveCompletedLessons,
  getInProgressLessons,
  saveInProgressLessons,
  getAthleteWeakAreas,
  saveAthleteWeakAreas,
  getRegisteredEvents,
  registerForEvent as registerEventStorage,
  unregisterFromEvent as unregisterEventStorage,
  getCompetitionResults,
  saveCompetitionResults,
  addOrUpdateCompetitionResult
} from '../utils/storage';
import { COMPETITION_EVENTS } from '../data/mockData';
import { authService } from '../services/authService';
import { athleteService } from '../services/athleteService';
import { progressService } from '../services/progressService';

const AthleteContext = createContext(null);

export const AthleteProvider = ({ children }) => {
  const [session, setSession] = useState(() => getCurrentSession());
  const [athlete, setAthlete] = useState(() => getAthleteProfile(session?.userId));
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => isOnboardingCompleted());
  const [savedEvents, setSavedEvents] = useState(() => getSavedEvents());
  const [registeredEvents, setRegisteredEvents] = useState(() => getRegisteredEvents(session?.userId));
  const [competitionResults, setCompetitionResults] = useState(() => getCompetitionResults(session?.userId));
  const [completedLessons, setCompletedLessons] = useState(() => getCompletedLessons(session?.userId));
  const [inProgressLessons, setInProgressLessons] = useState(() => getInProgressLessons(session?.userId));
  const [weakAreas, setWeakAreasState] = useState(() => getAthleteWeakAreas(session?.userId, athlete?.sport));
  const [theme, setTheme] = useState(() => getThemeMode());
  const [toastMessage, setToastMessage] = useState(null);
  const [isLoadingBackend, setIsLoadingBackend] = useState(false);

  // Sync theme with DOM and localStorage
  useEffect(() => {
    saveThemeMode(theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [theme]);

  // Initial fetch from backend if token exists
  useEffect(() => {
    const fetchBackendUser = async () => {
      if (session?.token) {
        try {
          setIsLoadingBackend(true);
          const response = await authService.getMe();
          if (response?.data?.profile) {
            setAthlete(prev => ({ ...prev, ...response.data.profile }));
          }
        } catch (e) {
          // Fallback to local profile
        } finally {
          setIsLoadingBackend(false);
        }
      }
    };
    fetchBackendUser();
  }, [session?.token]);

  /**
   * Show toast notification
   */
  const showToast = (text, type = 'info') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  /**
   * Update current athlete profile
   */
  const updateProfile = async (newData) => {
    try {
      // Attempt backend update
      const backendRes = await athleteService.updateProfile(newData).catch(() => null);
      const mergedData = backendRes?.data || { ...athlete, ...newData };
      
      const updated = saveAthleteProfile(mergedData, athlete?.userId || session?.userId);
      setAthlete(updated);
      setHasCompletedOnboarding(true);
      showToast('Profile saved successfully!', 'success');
      return updated;
    } catch (err) {
      const updated = saveAthleteProfile({ ...athlete, ...newData }, athlete?.userId || session?.userId);
      setAthlete(updated);
      setHasCompletedOnboarding(true);
      showToast('Profile saved!', 'success');
      return updated;
    }
  };

  /**
   * Switch sport and level dynamically
   */
  const switchSportAndLevel = async (sport, level) => {
    try {
      const res = await athleteService.switchSport(sport, level).catch(() => null);
      if (res?.data) {
        const updated = saveAthleteProfile({ ...athlete, sport, level, ...res.data }, session?.userId);
        setAthlete(updated);
        showToast(`Sport switched to ${sport} (${level})`, 'info');
        return updated;
      }
    } catch (e) {
      // Fallback
    }

    const updated = saveAthleteProfile({ ...athlete, sport, level }, session?.userId);
    setAthlete(updated);
    showToast(`Sport switched to ${sport} (${level})`, 'info');
    return updated;
  };

  /**
   * Sign Up handler (Backend REST API + Local fallback)
   */
  const signup = async ({ name, email, password, sport, level }) => {
    try {
      const res = await authService.signup({ name, email, password, sport, level });
      if (res?.success && res?.data) {
        const backendUser = res.data.user;
        const newSession = {
          userId: backendUser.id,
          email: backendUser.email,
          name: backendUser.name,
          token: res.data.token
        };
        setCurrentSession(newSession);
        setSession(newSession);

        const profileData = res.data.profile || { ...athlete, name, email, sport: sport || 'Football', level: level || 'Beginner' };
        saveAthleteProfile(profileData, backendUser.id);
        setAthlete(profileData);
        setHasCompletedOnboarding(true);

        showToast(`Welcome to Athletex, ${backendUser.name}!`, 'success');
        return { success: true, user: backendUser };
      }
    } catch (apiErr) {
      console.warn('Backend signup API call note, falling back to local engine:', apiErr.message);
    }

    // Local engine fallback
    const res = registerUser({ name, email, password, sport });
    if (res.success) {
      const activeSession = getCurrentSession();
      setSession(activeSession);
      setAthlete(res.profile);
      setHasCompletedOnboarding(true);
      showToast(`Welcome to Athletex, ${res.user.name}!`, 'success');
      return { success: true, user: res.user };
    } else {
      showToast(res.error || 'Signup failed', 'error');
      return { success: false, error: res.error };
    }
  };

  /**
   * Login handler (Backend REST API + Local fallback)
   */
  const login = async (email, password) => {
    try {
      const res = await authService.login(email, password);
      if (res?.success && res?.data) {
        const backendUser = res.data.user;
        const newSession = {
          userId: backendUser.id,
          email: backendUser.email,
          name: backendUser.name,
          token: res.data.token
        };
        setCurrentSession(newSession);
        setSession(newSession);

        const profileData = res.data.profile || getAthleteProfile(backendUser.id);
        saveAthleteProfile(profileData, backendUser.id);
        setAthlete(profileData);
        setHasCompletedOnboarding(true);

        showToast(`Welcome back, ${backendUser.name || 'Athlete'}!`, 'success');
        return { success: true, user: backendUser };
      }
    } catch (apiErr) {
      console.warn('Backend login API call note, falling back to local engine:', apiErr.message);
    }

    // Local engine fallback
    const res = authenticateUser(email, password);
    if (res.success) {
      const activeSession = getCurrentSession();
      setSession(activeSession);
      setAthlete(res.profile);
      setHasCompletedOnboarding(true);
      showToast(`Welcome back, ${res.user.name || 'Athlete'}!`, 'success');
      return { success: true, user: res.user };
    } else {
      showToast(res.error || 'Login failed', 'error');
      return { success: false, error: res.error };
    }
  };

  /**
   * Google Login handler
   */
  const loginWithGoogle = async (googleData) => {
    const res = authenticateWithGoogle(googleData);
    if (res.success) {
      const activeSession = getCurrentSession();
      setSession(activeSession);
      setAthlete(res.profile);
      setHasCompletedOnboarding(true);
      showToast(`Signed in with Google as ${res.user.name}`, 'success');
      return { success: true, user: res.user };
    } else {
      showToast(res.error || 'Google login failed', 'error');
      return { success: false, error: res.error };
    }
  };

  /**
   * Quick Demo Login handler
   */
  const loginAsDemo = async () => {
    try {
      const res = await authService.login('alex.athlete@athletex.ai', 'password123').catch(() => null);
      if (res?.data?.token) {
        const newSession = {
          userId: res.data.user.id,
          email: res.data.user.email,
          name: res.data.user.name,
          token: res.data.token
        };
        setCurrentSession(newSession);
        setSession(newSession);
      }
    } catch (e) {
      // Ignore
    }

    const demo = resetDemoProfile();
    const activeSession = getCurrentSession();
    setSession(activeSession);
    setAthlete(demo);
    setHasCompletedOnboarding(true);
    showToast('Logged in as Demo Athlete (Alex Johnson)!', 'success');
    return { success: true, profile: demo };
  };

  /**
   * Logout handler
   */
  const logout = async () => {
    await authService.logout().catch(() => {});
    clearCurrentSession();
    setSession(null);
    showToast('Logged out successfully');
  };

  /**
   * Change password handler
   */
  const handlePasswordChange = async (currentPassword, newPassword) => {
    try {
      await authService.changePassword(currentPassword, newPassword);
      showToast('Password changed successfully!', 'success');
      return { success: true };
    } catch (apiErr) {
      // Fallback
    }

    const uid = session?.userId || athlete?.userId || 'demo-user-1';
    const res = changeUserPassword(uid, currentPassword, newPassword);
    if (res.success) {
      showToast('Password changed successfully!', 'success');
      return { success: true };
    } else {
      showToast(res.error || 'Password update failed', 'error');
      return { success: false, error: res.error };
    }
  };

  /**
   * Delete account handler
   */
  const handleDeleteAccount = async () => {
    const uid = session?.userId || athlete?.userId || 'demo-user-1';
    const res = deleteUserAccount(uid);
    if (res.success) {
      setSession(null);
      const demo = getAthleteProfile('demo-user-1');
      setAthlete(demo);
      showToast('Your account and profile have been removed.', 'info');
      return { success: true };
    } else {
      showToast(res.error || 'Failed to delete account', 'error');
      return { success: false, error: res.error };
    }
  };

  /**
   * Reset to default demo athlete
   */
  const resetToDemo = () => {
    const demo = resetDemoProfile();
    setSession(getCurrentSession());
    setAthlete(demo);
    setHasCompletedOnboarding(true);
    showToast('Reset to default demo athlete (Alex Johnson)!', 'info');
  };

  /**
   * Toggle event bookmark
   */
  const handleToggleSaveEvent = (eventId) => {
    const updated = toggleSaveEvent(eventId);
    setSavedEvents(updated);
    const isSaved = updated.includes(eventId);
    showToast(isSaved ? 'Event saved to your competition calendar' : 'Event removed from saved list', 'info');
  };

  /**
   * Register athlete for an event
   */
  const handleRegisterForEvent = (eventId, registrationInfo) => {
    const uid = session?.userId || athlete?.userId || 'demo-user-1';
    const updated = registerEventStorage(eventId, uid);
    setRegisteredEvents(updated);
    
    const evt = COMPETITION_EVENTS.find(e => e.id === eventId);
    if (evt) {
      const isPast = evt.status === 'Completed' || (evt.startDate && new Date(evt.startDate) < new Date());
      if (isPast) {
        const currentResults = getCompetitionResults(uid);
        if (!currentResults.some(r => r.eventId === eventId)) {
          const pendingRes = {
            id: `res-${eventId}`,
            eventId: eventId,
            eventName: evt.name,
            sport: evt.sport,
            location: evt.location,
            date: evt.date,
            status: 'pending',
            placement: null,
            outcome: null,
            notes: '',
            recordedAt: new Date().toISOString()
          };
          const newResults = [pendingRes, ...currentResults];
          saveCompetitionResults(newResults, uid);
          setCompetitionResults(newResults);
        }
      }
      showToast(`Successfully registered for ${evt.name}!`, 'success');
    } else {
      showToast('Registration confirmed!', 'success');
    }
    return { success: true };
  };

  /**
   * Unregister athlete from an event
   */
  const handleUnregisterFromEvent = (eventId) => {
    const uid = session?.userId || athlete?.userId || 'demo-user-1';
    const updated = unregisterEventStorage(eventId, uid);
    setRegisteredEvents(updated);
    showToast('Registration removed from event', 'info');
    return updated;
  };

  /**
   * Log or update competition result outcome
   */
  const handleLogCompetitionResult = (resultData) => {
    const uid = session?.userId || athlete?.userId || 'demo-user-1';
    const updated = addOrUpdateCompetitionResult(resultData, uid);
    setCompetitionResults(updated);
    
    if (resultData.status === 'completed') {
      const currentReadiness = athlete?.readiness || 35;
      if (currentReadiness < 98) {
        updateProfile({ readiness: Math.min(100, currentReadiness + 3) });
      }
    }

    showToast('Competition outcome saved to your archive!', 'success');
    return updated;
  };

  /**
   * Sync past events to competition results
   */
  const syncPastEventsToResults = () => {
    const uid = session?.userId || athlete?.userId || 'demo-user-1';
    const currentResults = getCompetitionResults(uid);
    const now = new Date();
    let updatedResults = [...currentResults];
    let hasChanges = false;

    COMPETITION_EVENTS.forEach(evt => {
      const isBookmarked = savedEvents.includes(evt.id);
      const isRegistered = registeredEvents.includes(evt.id);
      
      if (isBookmarked || isRegistered) {
        const isPast = evt.status === 'Completed' || (evt.startDate && new Date(evt.startDate) < now);
        if (isPast) {
          const alreadyLogged = updatedResults.some(r => r.eventId === evt.id);
          if (!alreadyLogged) {
            hasChanges = true;
            updatedResults = [{
              id: `res-${evt.id}`,
              eventId: evt.id,
              eventName: evt.name,
              sport: evt.sport,
              location: evt.location,
              date: evt.date,
              status: 'pending',
              placement: null,
              outcome: null,
              notes: '',
              recordedAt: new Date().toISOString()
            }, ...updatedResults];
          }
        }
      }
    });

    if (hasChanges) {
      saveCompetitionResults(updatedResults, uid);
      setCompetitionResults(updatedResults);
    }
  };

  useEffect(() => {
    syncPastEventsToResults();
  }, [savedEvents, registeredEvents, session?.userId]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const markLessonComplete = (lessonId, lessonTitle = 'Lesson') => {
    const uid = session?.userId || athlete?.userId || 'demo-user-1';
    let updated = [...completedLessons];
    if (!updated.includes(lessonId)) {
      updated.push(lessonId);
      saveCompletedLessons(updated, uid);
      setCompletedLessons(updated);
      
      const newInProgress = { ...inProgressLessons };
      delete newInProgress[lessonId];
      saveInProgressLessons(newInProgress, uid);
      setInProgressLessons(newInProgress);

      const currentReadiness = athlete?.readiness || 35;
      if (currentReadiness < 98) {
        updateProfile({ readiness: Math.min(100, currentReadiness + 2) });
      }

      showToast(`Lesson Completed: ${lessonTitle}! Progression updated.`, 'success');
    }
  };

  const startLessonProgress = (lessonId, percent = 45) => {
    const uid = session?.userId || athlete?.userId || 'demo-user-1';
    if (!completedLessons.includes(lessonId)) {
      const updated = {
        ...inProgressLessons,
        [lessonId]: { percent, lastWatched: 'Just now' }
      };
      saveInProgressLessons(updated, uid);
      setInProgressLessons(updated);
    }
  };

  const updateWeakAreas = (newAreas) => {
    const uid = session?.userId || athlete?.userId || 'demo-user-1';
    const cleanAreas = Array.isArray(newAreas) ? newAreas : [newAreas];
    saveAthleteWeakAreas(cleanAreas, uid);
    setWeakAreasState(cleanAreas);
    showToast('Coach diagnostic weak areas updated.', 'info');
  };

  const resetLearningProgress = () => {
    const uid = session?.userId || athlete?.userId || 'demo-user-1';
    saveCompletedLessons([], uid);
    saveInProgressLessons({}, uid);
    setCompletedLessons([]);
    setInProgressLessons({});
    showToast('Learning progress reset for testing.', 'info');
  };

  const isAuthenticated = !!session;

  return (
    <AthleteContext.Provider
      value={{
        athlete,
        currentUser: session,
        isAuthenticated,
        signup,
        login,
        loginWithGoogle,
        loginAsDemo,
        logout,
        updateProfile,
        switchSportAndLevel,
        changePassword: handlePasswordChange,
        deleteAccount: handleDeleteAccount,
        resetToDemo,
        hasCompletedOnboarding,
        setHasCompletedOnboarding,
        savedEvents,
        toggleSaveEvent: handleToggleSaveEvent,
        registeredEvents,
        registerForEvent: handleRegisterForEvent,
        unregisterFromEvent: handleUnregisterFromEvent,
        competitionResults,
        logCompetitionResult: handleLogCompetitionResult,
        updateCompetitionResult: handleLogCompetitionResult,
        syncPastEventsToResults,
        theme,
        toggleTheme,
        showToast,
        completedLessons,
        inProgressLessons,
        weakAreas,
        markLessonComplete,
        startLessonProgress,
        updateWeakAreas,
        resetLearningProgress,
        isLoadingBackend
      }}
    >
      {children}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-dark-card border border-volt/50 text-white px-5 py-3.5 rounded-2xl shadow-glow-volt animate-bounce">
          <div className="w-2.5 h-2.5 rounded-full bg-volt animate-ping" />
          <p className="text-sm font-semibold tracking-wide text-white">
            {toastMessage.text}
          </p>
        </div>
      )}
    </AthleteContext.Provider>
  );
};

export const useAthlete = () => {
  const context = useContext(AthleteContext);
  if (!context) {
    throw new Error('useAthlete must be used within an AthleteProvider');
  }
  return context;
};

export default AthleteContext;
