import { apiClient } from './apiClient';

/**
 * Progress & Dynamic Telemetry Service (USER + SPORT + DIFFICULTY LEVEL)
 */
export const progressService = {
  /**
   * Fetch live dynamic progress metrics, 4 pillars, and bi-weekly cycle hours
   */
  async getProgressTelemetry(sport = 'Football', level = 'Beginner') {
    const query = `?sport=${encodeURIComponent(sport)}&level=${encodeURIComponent(level)}`;
    return apiClient(`/progress/telemetry${query}`, {
      method: 'GET'
    });
  },

  /**
   * Fetch historical and projected performance trajectory points
   */
  async getTrajectory(sport = 'Football', level = 'Beginner') {
    const query = `?sport=${encodeURIComponent(sport)}&level=${encodeURIComponent(level)}`;
    return apiClient(`/progress/trajectory${query}`, {
      method: 'GET'
    });
  },

  /**
   * Save a manual evaluation snapshot
   */
  async createSnapshot(snapshotData) {
    return apiClient('/progress/snapshot', {
      method: 'POST',
      body: snapshotData
    });
  }
};
