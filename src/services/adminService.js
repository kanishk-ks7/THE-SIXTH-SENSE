import { apiClient } from './apiClient';

/**
 * Admin API Service (Protected with ADMIN Role Authorization)
 */
export const adminService = {
  /**
   * Get Admin dashboard summary KPIs and analytics
   */
  async getDashboardStats() {
    return apiClient('/admin/dashboard', {
      method: 'GET'
    });
  },

  /**
   * Get filtered roster of athletes
   */
  async getAthletes({ search = '', sport = '', level = '' } = {}) {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (sport && sport !== 'all') params.append('sport', sport);
    if (level && level !== 'all') params.append('level', level);

    const query = params.toString() ? `?${params.toString()}` : '';
    return apiClient(`/admin/athletes${query}`, {
      method: 'GET'
    });
  },

  /**
   * Get comprehensive dossier for a specific athlete
   */
  async getAthleteById(id) {
    return apiClient(`/admin/athletes/${id}`, {
      method: 'GET'
    });
  },

  /**
   * Get dynamic progress telemetry for a specific athlete
   */
  async getAthleteProgress(id, sport, level) {
    const params = new URLSearchParams();
    if (sport) params.append('sport', sport);
    if (level) params.append('level', level);
    const query = params.toString() ? `?${params.toString()}` : '';

    return apiClient(`/admin/athletes/${id}/progress${query}`, {
      method: 'GET'
    });
  },

  /**
   * Get performance trajectory records for a specific athlete
   */
  async getAthletePerformance(id, sport, level) {
    const params = new URLSearchParams();
    if (sport) params.append('sport', sport);
    if (level) params.append('level', level);
    const query = params.toString() ? `?${params.toString()}` : '';

    return apiClient(`/admin/athletes/${id}/performance${query}`, {
      method: 'GET'
    });
  },

  /**
   * Get assessment history for a specific athlete
   */
  async getAthleteAssessments(id, sport, level) {
    const params = new URLSearchParams();
    if (sport) params.append('sport', sport);
    if (level) params.append('level', level);
    const query = params.toString() ? `?${params.toString()}` : '';

    return apiClient(`/admin/athletes/${id}/assessments${query}`, {
      method: 'GET'
    });
  }
};
