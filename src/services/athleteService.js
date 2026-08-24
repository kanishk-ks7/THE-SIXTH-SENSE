import { apiClient } from './apiClient';

/**
 * Athlete & Sport Profile Service
 */
export const athleteService = {
  /**
   * Get athlete profile (optionally for specific sport and level)
   */
  async getProfile(sport, level) {
    const query = sport && level ? `?sport=${encodeURIComponent(sport)}&level=${encodeURIComponent(level)}` : '';
    return apiClient(`/athlete/profile${query}`, {
      method: 'GET'
    });
  },

  /**
   * Update active athlete profile data
   */
  async updateProfile(profileData) {
    return apiClient('/athlete/profile', {
      method: 'PUT',
      body: profileData
    });
  },

  /**
   * Switch active Sport and Difficulty Level
   */
  async switchSport(sport, level) {
    return apiClient('/athlete/switch-sport', {
      method: 'POST',
      body: { sport, level }
    });
  },

  /**
   * Get sports catalog
   */
  async getSports() {
    return apiClient('/sports', {
      method: 'GET'
    });
  },

  /**
   * Get difficulty levels
   */
  async getDifficulties() {
    return apiClient('/difficulties', {
      method: 'GET'
    });
  }
};
