import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAthleteProfile, saveAthleteProfile, resetDemoProfile, isOnboardingCompleted, getSavedEvents, toggleSaveEvent } from '../utils/storage';

const AthleteContext = createContext(null);

export const AthleteProvider = ({ children }) => {
  const [athlete, setAthlete] = useState(() => getAthleteProfile());
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => isOnboardingCompleted());
  const [savedEvents, setSavedEvents] = useState(() => getSavedEvents());
  const [theme, setTheme] = useState('dark');
  const [toastMessage, setToastMessage] = useState(null);

  // Keep body class synced with theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const updateProfile = (newData) => {
    const updated = saveAthleteProfile({ ...athlete, ...newData });
    setAthlete(updated);
    setHasCompletedOnboarding(true);
    showToast('Profile updated successfully!');
    return updated;
  };

  const resetToDemo = () => {
    const demo = resetDemoProfile();
    setAthlete(demo);
    setHasCompletedOnboarding(true);
    showToast('Reset to default demo athlete (Alex)!');
  };

  const handleToggleSaveEvent = (eventId) => {
    const updated = toggleSaveEvent(eventId);
    setSavedEvents(updated);
    const isSaved = updated.includes(eventId);
    showToast(isSaved ? 'Event saved to your list' : 'Event removed from saved list');
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  return (
    <AthleteContext.Provider
      value={{
        athlete,
        updateProfile,
        resetToDemo,
        hasCompletedOnboarding,
        setHasCompletedOnboarding,
        savedEvents,
        toggleSaveEvent: handleToggleSaveEvent,
        theme,
        toggleTheme,
        showToast
      }}
    >
      {children}
      
      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-dark-card border border-brand-500/50 text-white px-5 py-3 rounded-xl shadow-glow-brand animate-bounce">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-accent animate-ping" />
          <p className="text-sm font-medium">{toastMessage}</p>
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
