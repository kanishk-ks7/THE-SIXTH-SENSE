import { Router } from 'express';
import { getProfile, updateProfile, switchSport } from '../controllers/athleteController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.post('/switch-sport', authenticate, switchSport);

export default router;
