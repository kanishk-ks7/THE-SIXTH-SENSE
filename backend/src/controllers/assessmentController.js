import { dbService } from '../services/dbService.js';
import { successResponse, errorResponse } from '../utils/response.js';

/**
 * Get all available assessments catalog
 * GET /api/assessments
 */
export const getAssessments = async (req, res, next) => {
  try {
    const assessments = await dbService.getAllAssessments();
    return successResponse(res, assessments, 'Assessments catalog retrieved');
  } catch (err) {
    next(err);
  }
};

/**
 * Get user assessment history (Filtered by Sport & Level)
 * GET /api/assessments/history?sport=Football&level=Beginner
 */
export const getAssessmentHistory = async (req, res, next) => {
  try {
    const userId = req.user?.userId || 'demo-user-1';
    const sport = req.query.sport || 'football';
    const level = req.query.level || 'Beginner';

    const history = await dbService.getAssessmentHistory(userId, sport, level);
    return successResponse(res, history, `Assessment history for ${sport} (${level})`);
  } catch (err) {
    next(err);
  }
};

/**
 * Submit assessment score and evaluation
 * POST /api/assessments/:slug/submit
 */
export const submitAssessment = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { slug } = req.params;
    const { sport, level, score, breakdown } = req.body;

    const result = await dbService.submitAssessment(
      userId,
      sport || 'football',
      level || 'Beginner',
      slug,
      { score, breakdown }
    );

    return successResponse(res, result, 'Assessment submitted successfully!');
  } catch (err) {
    next(err);
  }
};
