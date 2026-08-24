import { dbService } from '../services/dbService.js';
import { successResponse, errorResponse } from '../utils/response.js';

/**
 * Get athlete profile (Optionally filtered by sport and difficulty level)
 * GET /api/athlete/profile
 */
export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { sport, level } = req.query;

    let profile;
    if (sport && level) {
      profile = await dbService.getUserSportProfile(userId, sport, level);
    } else {
      profile = await dbService.getActiveUserSportProfile(userId);
    }

    return successResponse(res, profile, 'Athlete profile retrieved');
  } catch (err) {
    next(err);
  }
};

/**
 * Update athlete profile
 * PUT /api/athlete/profile
 */
export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const sport = req.body.sport || req.query.sport || 'football';
    const level = req.body.level || req.query.level || 'Beginner';

    const updated = await dbService.updateUserSportProfile(userId, sport, level, req.body);
    return successResponse(res, updated, 'Athlete profile updated successfully');
  } catch (err) {
    next(err);
  }
};

/**
 * Switch active Sport and Difficulty Level
 * POST /api/athlete/switch-sport
 */
export const switchSport = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { sport, level } = req.body;

    if (!sport || !level) {
      return errorResponse(res, 'Both sport and level are required to switch context.', 400);
    }

    const switchedProfile = await dbService.switchUserSportAndLevel(userId, sport, level);
    return successResponse(res, switchedProfile, `Switched athlete context to ${sport} (${level})`);
  } catch (err) {
    next(err);
  }
};
