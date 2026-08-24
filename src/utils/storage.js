import { DEFAULT_DEMO_ATHLETE } from '../data/mockData';

const KEYS = {
  USERS: 'sportpath_users',
  SESSION: 'sportpath_session',
  PROFILES: 'sportpath_profiles',
  ATHLETE_PROFILE: 'athleteProfile', // Legacy key for backward-compatibility
  ONBOARDING_COMPLETED: 'onboardingCompleted',
  SELECTED_SPORT: 'selectedSport',
  SELECTED_LEVEL: 'selectedLevel',
  SAVED_EVENTS: 'savedEvents',
  THEME_MODE: 'sportpath_theme',
  COMPLETED_LESSONS: 'athletex_completed_lessons',
  IN_PROGRESS_LESSONS: 'athletex_inprogress_lessons',
  ATHLETE_WEAK_AREAS: 'athletex_weak_areas'
};

// Initial seed demo user
const INITIAL_DEMO_USER = {
  id: 'demo-user-1',
  name: 'Alex Johnson',
  email: 'alex.athlete@sportpath.ai',
  password: 'password123', // In demo/client-side storage
  sport: 'Football',
  provider: 'local',
  createdAt: '2026-08-01T10:00:00.000Z'
};

/**
 * Initialize default demo user in storage if users list is empty
 */
const initStorage = () => {
  try {
    const rawUsers = localStorage.getItem(KEYS.USERS);
    if (!rawUsers) {
      localStorage.setItem(KEYS.USERS, JSON.stringify([INITIAL_DEMO_USER]));
    }
    const rawProfiles = localStorage.getItem(KEYS.PROFILES);
    if (!rawProfiles) {
      const initialMap = {
        'demo-user-1': DEFAULT_DEMO_ATHLETE
      };
      localStorage.setItem(KEYS.PROFILES, JSON.stringify(initialMap));
    }
  } catch (e) {
    console.warn('Storage initialization warning:', e);
  }
};

// Run on module load
initStorage();

/**
 * Get all registered users
 */
export const getStoredUsers = () => {
  try {
    const raw = localStorage.getItem(KEYS.USERS);
    return raw ? JSON.parse(raw) : [INITIAL_DEMO_USER];
  } catch {
    return [INITIAL_DEMO_USER];
  }
};

/**
 * Save users list
 */
export const saveStoredUsers = (users) => {
  try {
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
  } catch (err) {
    console.error('Error saving users to localStorage:', err);
  }
};

/**
 * Get active session
 */
export const getCurrentSession = () => {
  try {
    const raw = localStorage.getItem(KEYS.SESSION);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Error reading session:', err);
  }
  // Default to demo user session if not set
  return {
    userId: 'demo-user-1',
    email: 'alex.athlete@sportpath.ai',
    token: 'demo-session-token-123'
  };
};

/**
 * Save active session
 */
export const setCurrentSession = (sessionData) => {
  try {
    if (!sessionData) {
      localStorage.removeItem(KEYS.SESSION);
    } else {
      localStorage.setItem(KEYS.SESSION, JSON.stringify(sessionData));
    }
  } catch (err) {
    console.error('Error writing session:', err);
  }
};

/**
 * Clear active session
 */
export const clearCurrentSession = () => {
  try {
    localStorage.removeItem(KEYS.SESSION);
  } catch (err) {
    console.error('Error clearing session:', err);
  }
};

/**
 * Get profile dictionary
 */
export const getStoredProfiles = () => {
  try {
    const raw = localStorage.getItem(KEYS.PROFILES);
    return raw ? JSON.parse(raw) : { 'demo-user-1': DEFAULT_DEMO_ATHLETE };
  } catch {
    return { 'demo-user-1': DEFAULT_DEMO_ATHLETE };
  }
};

/**
 * Get athlete profile for the active session or specific userId
 */
export const getAthleteProfile = (targetUserId) => {
  try {
    const session = getCurrentSession();
    const uid = targetUserId || session?.userId || 'demo-user-1';
    const profiles = getStoredProfiles();
    
    if (profiles[uid]) {
      return { ...DEFAULT_DEMO_ATHLETE, ...profiles[uid] };
    }

    // Fallback to legacy key
    const rawLegacy = localStorage.getItem(KEYS.ATHLETE_PROFILE);
    if (rawLegacy) {
      const parsed = JSON.parse(rawLegacy);
      return { ...DEFAULT_DEMO_ATHLETE, ...parsed };
    }
  } catch (err) {
    console.warn('Error reading athleteProfile from localStorage:', err);
  }
  return DEFAULT_DEMO_ATHLETE;
};

/**
 * Save updated athlete profile and sync storage keys
 */
export const saveAthleteProfile = (profileData, targetUserId) => {
  try {
    const session = getCurrentSession();
    const uid = targetUserId || profileData?.userId || profileData?.id || session?.userId || 'demo-user-1';
    const profiles = getStoredProfiles();
    
    const existing = profiles[uid] || DEFAULT_DEMO_ATHLETE;
    const merged = { ...existing, ...profileData, id: uid, userId: uid };
    
    profiles[uid] = merged;
    localStorage.setItem(KEYS.PROFILES, JSON.stringify(profiles));

    // Also sync legacy single profile keys for external module interoperability
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
 * Register a new user account
 */
export const registerUser = ({ name, email, password, sport }) => {
  try {
    const users = getStoredUsers();
    const normalizedEmail = email.trim().toLowerCase();

    // Check duplicate email
    const existing = users.find(u => u.email.toLowerCase() === normalizedEmail);
    if (existing) {
      return {
        success: false,
        error: 'An account with this email already exists. Please log in.'
      };
    }

    const newUserId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newUser = {
      id: newUserId,
      name: name.trim(),
      email: normalizedEmail,
      password: password,
      sport: sport || 'Football',
      provider: 'local',
      createdAt: new Date().toISOString()
    };

    // Create initial athlete profile
    const initialProfile = {
      ...DEFAULT_DEMO_ATHLETE,
      id: newUserId,
      userId: newUserId,
      name: name.trim(),
      email: normalizedEmail,
      sport: sport || 'Football',
      level: 'Beginner',
      readiness: 25,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };

    users.push(newUser);
    saveStoredUsers(users);

    const profiles = getStoredProfiles();
    profiles[newUserId] = initialProfile;
    localStorage.setItem(KEYS.PROFILES, JSON.stringify(profiles));

    // Establish session
    const session = {
      userId: newUserId,
      email: normalizedEmail,
      name: newUser.name,
      token: `token_${newUserId}_${Date.now()}`
    };
    setCurrentSession(session);
    saveAthleteProfile(initialProfile, newUserId);

    return {
      success: true,
      user: newUser,
      profile: initialProfile
    };
  } catch (err) {
    console.error('Error during registration:', err);
    return { success: false, error: 'Registration failed. Please try again.' };
  }
};

/**
 * Authenticate user credentials
 */
export const authenticateUser = (email, password) => {
  try {
    const users = getStoredUsers();
    const normalizedEmail = email.trim().toLowerCase();

    // Check against demo user or registered accounts
    const user = users.find(u => u.email.toLowerCase() === normalizedEmail);
    
    // Support demo credentials fallback
    if (!user && (normalizedEmail === 'alex@sportpath.ai' || normalizedEmail === 'alex.athlete@sportpath.ai')) {
      const demoUser = INITIAL_DEMO_USER;
      const session = {
        userId: demoUser.id,
        email: demoUser.email,
        name: demoUser.name,
        token: 'demo-session-token'
      };
      setCurrentSession(session);
      return {
        success: true,
        user: demoUser,
        profile: getAthleteProfile(demoUser.id)
      };
    }

    if (!user) {
      return { success: false, error: 'No account found with this email address.' };
    }

    if (user.password !== password) {
      return { success: false, error: 'Incorrect password. Please verify and try again.' };
    }

    const session = {
      userId: user.id,
      email: user.email,
      name: user.name,
      token: `token_${user.id}_${Date.now()}`
    };
    setCurrentSession(session);

    const profile = getAthleteProfile(user.id);
    return {
      success: true,
      user,
      profile
    };
  } catch (err) {
    console.error('Authentication error:', err);
    return { success: false, error: 'Login failed due to an unexpected error.' };
  }
};

/**
 * Google Authentication Handler
 */
export const authenticateWithGoogle = (googleUserData) => {
  try {
    const users = getStoredUsers();
    const normalizedEmail = (googleUserData.email || 'google.athlete@sportpath.ai').trim().toLowerCase();
    
    let user = users.find(u => u.email.toLowerCase() === normalizedEmail);
    let newUserId;

    if (!user) {
      newUserId = `usr_g_${Date.now()}`;
      user = {
        id: newUserId,
        name: googleUserData.name || 'Google Athlete',
        email: normalizedEmail,
        avatar: googleUserData.picture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        provider: 'google',
        createdAt: new Date().toISOString()
      };
      users.push(user);
      saveStoredUsers(users);

      const initialProfile = {
        ...DEFAULT_DEMO_ATHLETE,
        id: newUserId,
        userId: newUserId,
        name: user.name,
        email: normalizedEmail,
        avatar: user.avatar,
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      };
      saveAthleteProfile(initialProfile, newUserId);
    }

    const session = {
      userId: user.id,
      email: user.email,
      name: user.name,
      token: `google_token_${user.id}_${Date.now()}`
    };
    setCurrentSession(session);

    return {
      success: true,
      user,
      profile: getAthleteProfile(user.id)
    };
  } catch (err) {
    console.error('Google Auth Error:', err);
    return { success: false, error: 'Google login failed.' };
  }
};

/**
 * Change password for active user
 */
export const changeUserPassword = (userId, currentPassword, newPassword) => {
  try {
    const users = getStoredUsers();
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return { success: false, error: 'User account not found.' };
    }

    if (users[userIndex].password && users[userIndex].password !== currentPassword) {
      return { success: false, error: 'Current password does not match.' };
    }

    users[userIndex].password = newPassword;
    saveStoredUsers(users);
    return { success: true };
  } catch (err) {
    console.error('Password change error:', err);
    return { success: false, error: 'Failed to update password.' };
  }
};

/**
 * Delete account and associated data
 */
export const deleteUserAccount = (userId) => {
  try {
    const users = getStoredUsers().filter(u => u.id !== userId);
    saveStoredUsers(users);

    const profiles = getStoredProfiles();
    delete profiles[userId];
    localStorage.setItem(KEYS.PROFILES, JSON.stringify(profiles));

    clearCurrentSession();
    return { success: true };
  } catch (err) {
    console.error('Account deletion error:', err);
    return { success: false, error: 'Failed to delete account.' };
  }
};

/**
 * Check if the onboarding has been completed
 */
export const isOnboardingCompleted = () => {
  try {
    const val = localStorage.getItem(KEYS.ONBOARDING_COMPLETED);
    if (val === 'true') return true;
    return !!localStorage.getItem(KEYS.ATHLETE_PROFILE);
  } catch {
    return false;
  }
};

/**
 * Reset athlete profile to default demo state (Alex Johnson)
 */
export const resetDemoProfile = () => {
  try {
    const profiles = getStoredProfiles();
    profiles['demo-user-1'] = DEFAULT_DEMO_ATHLETE;
    localStorage.setItem(KEYS.PROFILES, JSON.stringify(profiles));
    localStorage.setItem(KEYS.ATHLETE_PROFILE, JSON.stringify(DEFAULT_DEMO_ATHLETE));
    localStorage.setItem(KEYS.ONBOARDING_COMPLETED, 'true');
    localStorage.setItem(KEYS.SELECTED_SPORT, DEFAULT_DEMO_ATHLETE.sport);
    localStorage.setItem(KEYS.SELECTED_LEVEL, DEFAULT_DEMO_ATHLETE.level);
    
    // Set active session to demo
    setCurrentSession({
      userId: 'demo-user-1',
      email: DEFAULT_DEMO_ATHLETE.email,
      name: DEFAULT_DEMO_ATHLETE.name,
      token: 'demo-session-token'
    });

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

/**
 * Theme persistence
 */
export const getThemeMode = () => {
  try {
    return localStorage.getItem(KEYS.THEME_MODE) || 'dark';
  } catch {
    return 'dark';
  }
};

export const saveThemeMode = (theme) => {
  try {
    localStorage.setItem(KEYS.THEME_MODE, theme);
  } catch (err) {
    console.error('Error saving theme mode:', err);
  }
};

/**
 * Get athlete's completed lessons list
 */
export const getCompletedLessons = (targetUserId) => {
  try {
    const session = getCurrentSession();
    const uid = targetUserId || session?.userId || 'demo-user-1';
    const raw = localStorage.getItem(`${KEYS.COMPLETED_LESSONS}_${uid}`);
    if (raw) return JSON.parse(raw);
    
    // Check if stored inside athlete profile
    const profile = getAthleteProfile(uid);
    if (Array.isArray(profile?.completedLessons)) {
      return profile.completedLessons;
    }
  } catch (err) {
    console.warn('Error reading completed lessons:', err);
  }
  return [];
};

/**
 * Save athlete's completed lessons
 */
export const saveCompletedLessons = (completedList, targetUserId) => {
  try {
    const session = getCurrentSession();
    const uid = targetUserId || session?.userId || 'demo-user-1';
    localStorage.setItem(`${KEYS.COMPLETED_LESSONS}_${uid}`, JSON.stringify(completedList));
    
    // Also sync to profile
    const profile = getAthleteProfile(uid);
    saveAthleteProfile({ ...profile, completedLessons: completedList }, uid);
    return completedList;
  } catch (err) {
    console.error('Error saving completed lessons:', err);
    return completedList;
  }
};

/**
 * Get lessons in progress
 */
export const getInProgressLessons = (targetUserId) => {
  try {
    const session = getCurrentSession();
    const uid = targetUserId || session?.userId || 'demo-user-1';
    const raw = localStorage.getItem(`${KEYS.IN_PROGRESS_LESSONS}_${uid}`);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn('Error reading in-progress lessons:', err);
  }
  return {};
};

/**
 * Save in-progress lessons map
 */
export const saveInProgressLessons = (progressMap, targetUserId) => {
  try {
    const session = getCurrentSession();
    const uid = targetUserId || session?.userId || 'demo-user-1';
    localStorage.setItem(`${KEYS.IN_PROGRESS_LESSONS}_${uid}`, JSON.stringify(progressMap));
    return progressMap;
  } catch (err) {
    console.error('Error saving in-progress lessons:', err);
    return progressMap;
  }
};

/**
 * Get athlete's identified assessment weak areas
 */
export const getAthleteWeakAreas = (targetUserId, defaultSport = 'basketball') => {
  try {
    const session = getCurrentSession();
    const uid = targetUserId || session?.userId || 'demo-user-1';
    const raw = localStorage.getItem(`${KEYS.ATHLETE_WEAK_AREAS}_${uid}`);
    if (raw) return JSON.parse(raw);

    const profile = getAthleteProfile(uid);
    if (Array.isArray(profile?.weakAreas) && profile.weakAreas.length > 0) {
      return profile.weakAreas;
    }
    if (Array.isArray(profile?.focusAreas) && profile.focusAreas.length > 0) {
      return profile.focusAreas.map(f => f.toLowerCase().replace(/\s+/g, '-'));
    }
  } catch (err) {
    console.warn('Error reading weak areas:', err);
  }
  return ['rules', 'ball-handling'];
};

/**
 * Save athlete's weak areas
 */
export const saveAthleteWeakAreas = (weakAreasList, targetUserId) => {
  try {
    const session = getCurrentSession();
    const uid = targetUserId || session?.userId || 'demo-user-1';
    localStorage.setItem(`${KEYS.ATHLETE_WEAK_AREAS}_${uid}`, JSON.stringify(weakAreasList));
    
    // Sync to profile
    const profile = getAthleteProfile(uid);
    saveAthleteProfile({ ...profile, weakAreas: weakAreasList }, uid);
    return weakAreasList;
  } catch (err) {
    console.error('Error saving weak areas:', err);
    return weakAreasList;
  }
};


