import { errorResponse } from '../utils/response.js';

/**
 * Centralized Global Error Handler Middleware
 */
export const errorHandler = (err, req, res, next) => {
  console.error('Unhandled Application Error:', err);

  // Prisma Known Request Error handling
  if (err.code && err.code.startsWith('P')) {
    if (err.code === 'P2002') {
      const target = err.meta?.target ? ` on field (${err.meta.target})` : '';
      return errorResponse(res, `A record with this unique constraint${target} already exists.`, 409);
    }
    if (err.code === 'P2025') {
      return errorResponse(res, 'Record not found in the database.', 404);
    }
    return errorResponse(res, 'A database constraint violation occurred.', 400);
  }

  // Syntax or JSON parsing error
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return errorResponse(res, 'Invalid JSON payload received.', 400);
  }

  // Generic 500 Internal Server Error (never leak internal credentials or stack trace to client)
  const message = process.env.NODE_ENV === 'production' 
    ? 'An internal server error occurred. Please try again later.' 
    : (err.message || 'Internal Server Error');

  return errorResponse(res, message, err.statusCode || 500);
};

/**
 * 404 Route Not Found Middleware
 */
export const notFoundHandler = (req, res) => {
  return errorResponse(res, `API route not found: [${req.method}] ${req.originalUrl}`, 404);
};
