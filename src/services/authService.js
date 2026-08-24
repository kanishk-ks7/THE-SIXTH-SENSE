import { apiClient } from './apiClient';

/**
 * Authentication Service (Athletex REST API)
 */
export const authService = {
  /**
   * Register a new Athlete account
   */
  async signup(credentials) {
    return apiClient('/auth/signup', {
      method: 'POST',
      body: credentials
    });
  },

  /**
   * Authenticate athlete with email and password
   */
  async login(email, password) {
    return apiClient('/auth/login', {
      method: 'POST',
      body: { email, password }
    });
  },

  /**
   * Fetch authenticated user details and active profile
   */
  async getMe() {
    return apiClient('/auth/me', {
      method: 'GET'
    });
  },

  /**
   * Change athlete password
   */
  async changePassword(currentPassword, newPassword) {
    return apiClient('/auth/change-password', {
      method: 'POST',
      body: { currentPassword, newPassword }
    });
  },

  /**
   * Log out athlete
   */
  async logout() {
    try {
      await apiClient('/auth/logout', { method: 'POST' });
    } catch (e) {
      // Ignore network errors on logout
    }
  }
};
