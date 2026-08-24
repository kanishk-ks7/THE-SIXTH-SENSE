/**
 * Athletex Unified API Client
 * Automatically attaches Bearer JWT authorization tokens and handles standardized responses.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const TOKEN_KEY = 'athletex_session';

export const getStoredAuthToken = () => {
  try {
    const session = localStorage.getItem(TOKEN_KEY);
    if (session) {
      const parsed = JSON.parse(session);
      return parsed.token || null;
    }
  } catch (e) {
    // Ignore error
  }
  return null;
};

export const apiClient = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const token = getStoredAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers
  };

  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage = data?.error || data?.message || `Request failed with status ${response.status}`;
      const error = new Error(errorMessage);
      error.status = response.status;
      error.details = data?.details;
      throw error;
    }

    return data;
  } catch (error) {
    // Return friendly error object or bubble
    throw error;
  }
};
