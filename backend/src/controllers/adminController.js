import { dbService } from '../services/dbService.js';
import { successResponse, errorResponse } from '../utils/response.js';

/**
 * Get Admin Executive Dashboard KPIs & Analytics
 * GET /api/admin/dashboard
 */
export const getDashboardStats = async (req, res, next) => {
  try {
    const summary = await dbService.getAdminDashboardSummary();
    return successResponse(res, summary, 'Admin dashboard analytics retrieved');
  } catch (err) {
    next(err);
  }
};

/**
 * Get list of all registered athletes with progression metrics
 * GET /api/admin/athletes?search=alex&sport=football&level=Beginner
 */
export const getAthletes = async (req, res, next) => {
  try {
    const { search, sport, level } = req.query;
    const athletes = await dbService.getAdminAthletesList({ search, sport, level });
    return successResponse(res, athletes, `Retrieved ${athletes.length} athlete records`);
  } catch (err) {
    next(err);
  }
};

/**
 * Get detailed inspector dossier for a specific athlete
 * GET /api/admin/athletes/:id
 */
export const getAthleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const details = await dbService.getAthleteDetailById(id);

    if (!details) {
      return errorResponse(res, `Athlete with ID '${id}' not found.`, 404);
    }

    return successResponse(res, details, 'Athlete dossier retrieved successfully');
  } catch (err) {
    next(err);
  }
};

/**
 * Get dynamic progress telemetry for a specific athlete
 * GET /api/admin/athletes/:id/progress?sport=Football&level=Beginner
 */
export const getAthleteProgress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { sport, level } = req.query;

    const progress = await dbService.getAthleteProgressById(id, sport, level);
    if (!progress) {
      return errorResponse(res, `Athlete with ID '${id}' not found.`, 404);
    }

    return successResponse(res, progress, 'Athlete progress telemetry retrieved');
  } catch (err) {
    next(err);
  }
};

/**
 * Get historical performance trajectory time-series for a specific athlete
 * GET /api/admin/athletes/:id/performance?sport=Football&level=Beginner
 */
export const getAthletePerformance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { sport, level } = req.query;

    const trajectory = await dbService.getAthletePerformanceById(id, sport, level);
    if (!trajectory) {
      return errorResponse(res, `Athlete with ID '${id}' not found.`, 404);
    }

    return successResponse(res, trajectory, 'Athlete performance trajectory retrieved');
  } catch (err) {
    next(err);
  }
};

/**
 * Get assessment submission history for a specific athlete
 * GET /api/admin/athletes/:id/assessments?sport=Football&level=Beginner
 */
export const getAthleteAssessments = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { sport, level } = req.query;

    const assessments = await dbService.getAthleteAssessmentsById(id, sport, level);
    if (!assessments) {
      return errorResponse(res, `Athlete with ID '${id}' not found.`, 404);
    }

    return successResponse(res, assessments, 'Athlete assessment history retrieved');
  } catch (err) {
    next(err);
  }
};
