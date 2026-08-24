import { Router } from 'express';
import { getProgressTelemetry, getTrajectory, updateProgressTelemetry, createSnapshot } from '../controllers/progressController.js';
import { optionalAuth, authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/telemetry', optionalAuth, getProgressTelemetry);
router.get('/trajectory', optionalAuth, getTrajectory);
router.put('/telemetry', authenticate, updateProgressTelemetry);
router.post('/snapshot', authenticate, createSnapshot);

export default router;
