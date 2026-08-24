/**
 * Standardized JSON API Response Helpers for Athletex
 */

export const successResponse = (res, data, message = 'Operation successful', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  });
};

export const errorResponse = (res, message = 'An error occurred', statusCode = 500, errors = null) => {
  const response = {
    success: false,
    error: message,
    timestamp: new Date().toISOString()
  };

  if (errors) {
    response.details = errors;
  }

  return res.status(statusCode).json(response);
};
