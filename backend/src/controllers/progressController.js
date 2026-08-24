import { dbService } from '../services/dbService.js';
import { successResponse, errorResponse } from '../utils/response.js';

/**
 * Get comprehensive dynamic progress telemetry for active sport & level
 * GET /api/progress/telemetry?sport=Cricket&level=Beginner
 */
export const getProgressTelemetry = async (req, res, next) => {
  try {
    const userId = req.user?.userId || 'demo-user-1';
    const sport = req.query.sport || 'football';
    const level = req.query.level || 'Beginner';

    const telemetry = await dbService.getProgressTelemetry(userId, sport, level);
    return successResponse(res, telemetry, `Progress telemetry for ${sport} (${level})`);
  } catch (err) {
    next(err);
  }
};

/**
 * Get Performance Trajectory time series data
 * GET /api/progress/trajectory?sport=Cricket&level=Beginner
 */
export const getTrajectory = async (req, res, next) => {
  try {
    const userId = req.user?.userId || 'demo-user-1';
    const sport = req.query.sport || 'football';
    const level = req.query.level || 'Beginner';

    const trajectory = await dbService.getTrajectoryRecords(userId, sport, level);
    return successResponse(res, trajectory, `Performance trajectory for ${sport} (${level})`);
  } catch (err) {
    next(err);
  }
};

export const updateProgressTelemetry = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const telemetry = await dbService.updateProgressTelemetry(
      userId,
      req.body.sport || 'football',
      req.body.level || 'Beginner',
      req.body
    );
    return successResponse(res, telemetry, 'Progress telemetry updated successfully');
  } catch (err) {
    next(err);
  }
};

/**
 * Create a new Performance Trajectory snapshot
 * POST /api/progress/snapshot
 */
export const createSnapshot = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { sport, level, score, label, recordedDate } = req.body;

    if (score === undefined || score === null) {
      return errorResponse(res, 'Score is required for creating a trajectory snapshot.', 400);
    }

    const snapshot = await dbService.createTrajectorySnapshot(
      userId,
      sport || 'football',
      level || 'Beginner',
      { score, label, recordedDate }
    );

    return successResponse(res, snapshot, 'Performance snapshot recorded successfully', 201);
  } catch (err) {
    next(err);
  }
};
