import { Router } from 'express';
import { getAssessments, getAssessmentHistory, submitAssessment } from '../controllers/assessmentController.js';
import { optionalAuth, authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', getAssessments);
router.get('/history', optionalAuth, getAssessmentHistory);
router.post('/:slug/submit', authenticate, submitAssessment);

export default router;
