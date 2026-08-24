import { verifyToken } from '../config/jwt.js';
import { errorResponse } from '../utils/response.js';
import { dbService } from '../services/dbService.js';

/**
 * Authentication Middleware: Protects private endpoints using Bearer JWT
 */
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'Access denied. No authentication token provided.', 401);
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return errorResponse(res, 'Malformed authorization header.', 401);
    }

    // Verify token
    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return errorResponse(res, 'Session expired. Please log in again.', 401);
      }
      return errorResponse(res, 'Invalid authentication token.', 401);
    }

    // Retrieve user from database
    const user = await dbService.findUserById(decoded.userId);
    if (!user) {
      return errorResponse(res, 'User associated with this token no longer exists.', 401);
    }

    req.user = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role || 'ATHLETE'
    };

    next();
  } catch (err) {
    console.error('Auth Middleware Error:', err);
    return errorResponse(res, 'Internal authentication verification error.', 500);
  }
};

/**
 * Role-Based Access Control (RBAC) Authorization Middleware
 * @param  {...string} allowedRoles (e.g. 'ADMIN', 'ATHLETE')
 */
export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, 'Authentication required to access this resource.', 401);
    }

    const userRole = req.user.role || 'ATHLETE';
    if (!allowedRoles.includes(userRole)) {
      return errorResponse(res, `Forbidden: Access requires ${allowedRoles.join(' or ')} privileges.`, 403);
    }

    next();
  };
};

/**
 * Admin Only Guard Helper Middleware
 */
export const requireAdmin = requireRole('ADMIN');

/**
 * Optional Authentication Middleware: If token exists, attaches user, else continues
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      if (token) {
        try {
          const decoded = verifyToken(token);
          const user = await dbService.findUserById(decoded.userId);
          if (user) {
            req.user = {
              userId: user.id,
              email: user.email,
              name: user.name,
              role: user.role || 'ATHLETE'
            };
          }
        } catch (e) {
          // Ignore invalid optional tokens
        }
      }
    }
    next();
  } catch (err) {
    next();
  }
};
