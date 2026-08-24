import { Router } from 'express';
import { signup, login, getMe, changePassword, logout, signupSchema, loginSchema, changePasswordSchema } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);
router.get('/me', authenticate, getMe);
router.post('/change-password', authenticate, validate(changePasswordSchema), changePassword);
router.post('/logout', logout);

export default router;
