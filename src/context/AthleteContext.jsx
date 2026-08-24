import React, { createContext, useContext, useState, useEffect } from 'react';
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
   saveAthleteWeakAreas
 } from '../utils/storage';

const AthleteContext = createContext(null);

export const AthleteProvider = ({ children }) => {
  const [session, setSession] = useState(() => getCurrentSession());
  const [athlete, setAthlete] = useState(() => getAthleteProfile(session?.userId));
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => isOnboardingCompleted());
  const [savedEvents, setSavedEvents] = useState(() => getSavedEvents());
  const [completedLessons, setCompletedLessons] = useState(() => getCompletedLessons(session?.userId));
  const [inProgressLessons, setInProgressLessons] = useState(() => getInProgressLessons(session?.userId));
  const [weakAreas, setWeakAreasState] = useState(() => getAthleteWeakAreas(session?.userId, athlete?.sport));
  const [theme, setTheme] = useState(() => getThemeMode());
  const [toastMessage, setToastMessage] = useState(null);

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

  // Sync profile when session changes
  const refreshUserData = (userId) => {
    const p = getAthleteProfile(userId);
    setAthlete(p);
  };

  /**
   * Update current athlete profile
   */
  const updateProfile = (newData) => {
    const updated = saveAthleteProfile({ ...athlete, ...newData }, athlete?.userId || session?.userId);
    setAthlete(updated);
    setHasCompletedOnboarding(true);
    showToast('Profile saved successfully!', 'success');
    return updated;
  };

  /**
   * Sign Up handler
   */
  const signup = async ({ name, email, password, sport }) => {
    const res = registerUser({ name, email, password, sport });
    if (res.success) {
      const activeSession = getCurrentSession();
      setSession(activeSession);
      setAthlete(res.profile);
      setHasCompletedOnboarding(true);
      showToast(`Welcome to SportPath AI, ${res.user.name}!`, 'success');
      return { success: true, user: res.user };
    } else {
      showToast(res.error || 'Signup failed', 'error');
      return { success: false, error: res.error };
    }
  };

  /**
   * Login handler
   */
  const login = async (email, password) => {
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
  const loginAsDemo = () => {
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
  const logout = () => {
    clearCurrentSession();
    setSession(null);
    showToast('Logged out successfully');
  };

  /**
   * Change password handler
   */
  const handlePasswordChange = async (currentPassword, newPassword) => {
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
   * Theme toggler
   */
  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  /**
   * Toast notification dispatch
   */
  const showToast = (msg, type = 'info') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  /**
   * Mark a lesson as completed
   */
  const markLessonComplete = (lessonId, lessonTitle = 'Lesson') => {
    const uid = session?.userId || athlete?.userId || 'demo-user-1';
    let updatedCompleted = [...completedLessons];
    if (!updatedCompleted.includes(lessonId)) {
      updatedCompleted.push(lessonId);
      saveCompletedLessons(updatedCompleted, uid);
      setCompletedLessons(updatedCompleted);

      // Remove from in-progress if present
      const updatedInProgress = { ...inProgressLessons };
      delete updatedInProgress[lessonId];
      saveInProgressLessons(updatedInProgress, uid);
      setInProgressLessons(updatedInProgress);

      // Slightly increase readiness score for learning effort
      const currentReadiness = athlete?.readiness || 35;
      if (currentReadiness < 98) {
        updateProfile({ readiness: Math.min(100, currentReadiness + 2) });
      }

      showToast(`Lesson Completed: ${lessonTitle}! Progression updated.`, 'success');
    }
  };

  /**
   * Start or update lesson progress
   */
  const startLessonProgress = (lessonId, percent = 45) => {
    const uid = session?.userId || athlete?.userId || 'demo-user-1';
    if (!completedLessons.includes(lessonId)) {
      const updated = {
        ...inProgressLessons,
        [lessonId]: {
          percent,
          lastWatched: 'Just now'
        }
      };
      saveInProgressLessons(updated, uid);
      setInProgressLessons(updated);
    }
  };

  /**
   * Update athlete identified weak areas
   */
  const updateWeakAreas = (newWeakAreas) => {
    const uid = session?.userId || athlete?.userId || 'demo-user-1';
    const cleanList = Array.isArray(newWeakAreas) ? newWeakAreas : [newWeakAreas];
    saveAthleteWeakAreas(cleanList, uid);
    setWeakAreasState(cleanList);
    showToast('Coach diagnostic weak areas updated.', 'info');
  };

  /**
   * Reset learning progression for testing/demo
   */
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
        changePassword: handlePasswordChange,
        deleteAccount: handleDeleteAccount,
        resetToDemo,
        hasCompletedOnboarding,
        setHasCompletedOnboarding,
        savedEvents,
        toggleSaveEvent: handleToggleSaveEvent,
        theme,
        toggleTheme,
        showToast,
        // Learning Hub State & Methods
        completedLessons,
        inProgressLessons,
        weakAreas,
        markLessonComplete,
        startLessonProgress,
        updateWeakAreas,
        resetLearningProgress
      }}
    >
      {children}
      
      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-dark-card border border-volt/50 text-white px-5 py-3.5 rounded-2xl shadow-glow-volt animate-bounce">
          <div className="w-2.5 h-2.5 rounded-full bg-volt animate-ping" />
          <p className="text-sm font-semibold tracking-wide text-white">{toastMessage.text}</p>
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

