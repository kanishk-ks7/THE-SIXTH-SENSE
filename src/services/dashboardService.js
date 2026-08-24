import { apiClient } from './apiClient';

/**
 * Aggregated Dashboard Data Service
 */
export const dashboardService = {
  /**
   * Get complete aggregated dashboard dataset
   */
  async getDashboardData(sport, level) {
    const query = sport && level ? `?sport=${encodeURIComponent(sport)}&level=${encodeURIComponent(level)}` : '';
    return apiClient(`/dashboard${query}`, {
      method: 'GET'
    });
  }
};
