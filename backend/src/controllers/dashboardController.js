import { dbService } from '../services/dbService.js';
import { successResponse } from '../utils/response.js';

/**
 * Get aggregated dashboard telemetry for athlete
 * GET /api/dashboard
 */
export const getDashboard = async (req, res, next) => {
  try {
    const userId = req.user?.userId || 'demo-user-1';
    const profile = await dbService.getActiveUserSportProfile(userId);
    const sport = req.query.sport || profile.sportId || 'football';
    const level = req.query.level || profile.difficultyLevelId || 'Beginner';

    const telemetry = await dbService.getProgressTelemetry(userId, sport, level);
    const history = await dbService.getAssessmentHistory(userId, sport, level);

    return successResponse(res, {
      profile,
      telemetry,
      assessments: history,
      activeSport: sport,
      activeLevel: level
    }, 'Dashboard data aggregated successfully');
  } catch (err) {
    next(err);
  }
};
