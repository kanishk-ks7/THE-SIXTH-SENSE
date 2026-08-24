import { Router } from 'express';
import {
  getDashboardStats,
  getAthletes,
  getAthleteById,
  getAthleteProgress,
  getAthletePerformance,
  getAthleteAssessments
} from '../controllers/adminController.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = Router();

// Enforce authentication AND ADMIN role on all /api/admin/* endpoints
router.use(authenticate, requireRole('ADMIN'));

router.get('/dashboard', getDashboardStats);
router.get('/athletes', getAthletes);
router.get('/athletes/:id', getAthleteById);
router.get('/athletes/:id/progress', getAthleteProgress);
router.get('/athletes/:id/performance', getAthletePerformance);
router.get('/athletes/:id/assessments', getAthleteAssessments);

export default router;
