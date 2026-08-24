import { errorResponse } from '../utils/response.js';

/**
 * Validates request body, query, or params against a Zod schema
 * @param {import('zod').ZodSchema} schema
 * @param {'body' | 'query' | 'params'} source
 */
export const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    try {
      const validated = schema.parse(req[source]);
      req[source] = validated;
      next();
    } catch (err) {
      if (err.errors) {
        const errorMessages = err.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message
        }));
        return errorResponse(res, 'Validation error. Please check your inputs.', 400, errorMessages);
      }
      return errorResponse(res, 'Invalid request data.', 400);
    }
  };
};
