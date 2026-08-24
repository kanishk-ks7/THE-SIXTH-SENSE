import { apiClient } from './apiClient';

/**
 * Assessment Catalog and Submission Service (USER + SPORT + DIFFICULTY LEVEL)
 */
export const assessmentService = {
  /**
   * Get all 4 core assessments catalog
   */
  async getAssessments() {
    return apiClient('/assessments', {
      method: 'GET'
    });
  },

  /**
   * Get assessment submission history for active sport and difficulty level
   */
  async getHistory(sport = 'Football', level = 'Beginner') {
    const query = `?sport=${encodeURIComponent(sport)}&level=${encodeURIComponent(level)}`;
    return apiClient(`/assessments/history${query}`, {
      method: 'GET'
    });
  },

  /**
   * Submit an assessment attempt
   */
  async submitAssessment(slug, data) {
    return apiClient(`/assessments/${slug}/submit`, {
      method: 'POST',
      body: data
    });
  }
};
