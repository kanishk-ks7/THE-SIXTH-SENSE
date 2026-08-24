import { dbService } from '../services/dbService.js';
import { successResponse, errorResponse } from '../utils/response.js';

/**
 * Get all available sports
 * GET /api/sports
 */
export const getSports = async (req, res, next) => {
  try {
    const sports = await dbService.getAllSports();
    return successResponse(res, sports, 'Sports catalog retrieved');
  } catch (err) {
    next(err);
  }
};

/**
 * Get sport by ID or slug
 * GET /api/sports/:id
 */
export const getSportById = async (req, res, next) => {
  try {
    const sport = await dbService.getSportById(req.params.id);
    if (!sport) {
      return errorResponse(res, `Sport with ID '${req.params.id}' not found.`, 404);
    }
    return successResponse(res, sport, 'Sport details retrieved');
  } catch (err) {
    next(err);
  }
};

/**
 * Get all difficulty levels
 * GET /api/difficulties
 */
export const getDifficulties = async (req, res, next) => {
  try {
    const difficulties = await dbService.getAllDifficultyLevels();
    return successResponse(res, difficulties, 'Difficulty levels retrieved');
  } catch (err) {
    next(err);
  }
};
