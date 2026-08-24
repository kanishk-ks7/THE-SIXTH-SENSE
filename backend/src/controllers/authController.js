import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { dbService } from '../services/dbService.js';
import { signToken } from '../config/jwt.js';
import { successResponse, errorResponse } from '../utils/response.js';

// Input Validation Schemas
export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please provide a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  sport: z.string().optional().default('football'),
  level: z.string().optional().default('Beginner')
});

export const loginSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  password: z.string().min(1, 'Password is required')
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters')
});

/**
 * Register a new Athlete
 * POST /api/auth/signup
 */
export const signup = async (req, res, next) => {
  try {
    const { name, email, password, sport, level } = req.body;
    const existing = await dbService.findUserByEmail(email);

    if (existing) {
      return errorResponse(res, 'An account with this email address already exists. Please log in.', 409);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await dbService.createUser({
      name,
      email,
      passwordHash,
      role: 'ATHLETE',
      sport,
      level
    });

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });

    const activeProfile = await dbService.getActiveUserSportProfile(user.id);

    return successResponse(res, {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      },
      profile: activeProfile,
      token
    }, 'Athlete registration successful!', 201);
  } catch (err) {
    next(err);
  }
};

/**
 * Login Athlete
 * POST /api/auth/login
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await dbService.findUserByEmail(email);

    if (!user) {
      return errorResponse(res, 'Invalid credentials. No account found with this email.', 401);
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return errorResponse(res, 'Invalid credentials. Incorrect password.', 401);
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });

    const activeProfile = await dbService.getActiveUserSportProfile(user.id);

    return successResponse(res, {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      profile: activeProfile,
      token
    }, 'Login successful!');
  } catch (err) {
    next(err);
  }
};

/**
 * Get current authenticated user details
 * GET /api/auth/me
 */
export const getMe = async (req, res, next) => {
  try {
    const user = await dbService.findUserById(req.user.userId);
    if (!user) {
      return errorResponse(res, 'User not found.', 404);
    }

    const activeProfile = await dbService.getActiveUserSportProfile(user.id);

    return successResponse(res, {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      },
      profile: activeProfile
    }, 'User profile retrieved');
  } catch (err) {
    next(err);
  }
};

/**
 * Change Athlete Password
 * POST /api/auth/change-password
 */
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await dbService.findUserById(req.user.userId);

    if (!user) {
      return errorResponse(res, 'User not found.', 404);
    }

    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
      return errorResponse(res, 'Current password does not match.', 400);
    }

    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash(newPassword, salt);
    await dbService.updateUserPassword(user.id, newHash);

    return successResponse(res, null, 'Password changed successfully!');
  } catch (err) {
    next(err);
  }
};

/**
 * Logout
 * POST /api/auth/logout
 */
export const logout = async (req, res) => {
  return successResponse(res, null, 'Logged out successfully');
};
