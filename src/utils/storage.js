import { DEFAULT_DEMO_ATHLETE } from '../data/mockData';

const KEYS = {
  ATHLETE_PROFILE: 'athleteProfile',
  ONBOARDING_COMPLETED: 'onboardingCompleted',
  SELECTED_SPORT: 'selectedSport',
  SELECTED_LEVEL: 'selectedLevel',
  SAVED_EVENTS: 'savedEvents',
  THEME_MODE: 'sportpath_theme'
};

/**
 * Get the current athlete profile from localStorage or fallback to default demo data
 */
export const getAthleteProfile = () => {
  try {
    const raw = localStorage.getItem(KEYS.ATHLETE_PROFILE);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Error reading athleteProfile from localStorage:', err);
  }
  return DEFAULT_DEMO_ATHLETE;
};

/**
 * Save updated athlete profile and sync secondary keys
 */
export const saveAthleteProfile = (profileData) => {
  try {
    const merged = { ...DEFAULT_DEMO_ATHLETE, ...profileData };
    localStorage.setItem(KEYS.ATHLETE_PROFILE, JSON.stringify(merged));
    localStorage.setItem(KEYS.ONBOARDING_COMPLETED, 'true');
    if (merged.sport) localStorage.setItem(KEYS.SELECTED_SPORT, merged.sport);
    if (merged.level) localStorage.setItem(KEYS.SELECTED_LEVEL, merged.level);
    return merged;
  } catch (err) {
    console.error('Error saving athlete profile to localStorage:', err);
    return profileData;
  }
};

/**
 * Check if the onboarding has been completed
 */
export const isOnboardingCompleted = () => {
  try {
    const val = localStorage.getItem(KEYS.ONBOARDING_COMPLETED);
    if (val === 'true') return true;
    // Check if profile exists
    return !!localStorage.getItem(KEYS.ATHLETE_PROFILE);
  } catch {
    return false;
  }
};

/**
 * Reset athlete profile to the default demo state (Alex, Football, Beginner)
 */
export const resetDemoProfile = () => {
  try {
    localStorage.setItem(KEYS.ATHLETE_PROFILE, JSON.stringify(DEFAULT_DEMO_ATHLETE));
    localStorage.setItem(KEYS.ONBOARDING_COMPLETED, 'true');
    localStorage.setItem(KEYS.SELECTED_SPORT, DEFAULT_DEMO_ATHLETE.sport);
    localStorage.setItem(KEYS.SELECTED_LEVEL, DEFAULT_DEMO_ATHLETE.level);
    return DEFAULT_DEMO_ATHLETE;
  } catch (err) {
    console.error('Error resetting demo profile:', err);
    return DEFAULT_DEMO_ATHLETE;
  }
};

/**
 * Get list of saved event IDs
 */
export const getSavedEvents = () => {
  try {
    const raw = localStorage.getItem(KEYS.SAVED_EVENTS);
    return raw ? JSON.parse(raw) : ['evt-2'];
  } catch {
    return ['evt-2'];
  }
};

/**
 * Toggle saving an event
 */
export const toggleSaveEvent = (eventId) => {
  try {
    const current = getSavedEvents();
    let updated;
    if (current.includes(eventId)) {
      updated = current.filter(id => id !== eventId);
    } else {
      updated = [...current, eventId];
    }
    localStorage.setItem(KEYS.SAVED_EVENTS, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error toggling saved event:', err);
    return [];
  }
};
