/**
 * Athletex Unified API Client
 * Automatically attaches Bearer JWT authorization tokens and handles standardized responses.
 * Supports cloud production deployments, local LAN IPs, and development fallback.
 */

const resolveApiBaseUrl = () => {
  // Explicit environment variable takes precedence
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/+$/, '');
  }

  if (typeof window !== 'undefined' && window.location.hostname) {
    const host = window.location.hostname;
    
    // If deployed to cloud (e.g. Vercel, Netlify, AWS, custom domain)
    const isLocalhost = host === 'localhost' || host === '127.0.0.1';
    const isPrivateLanIp = host.match(/^10\.|^192\.168\.|^172\.(1[6-9]|2[0-9]|3[0-1])\./);

    if (!isLocalhost && !isPrivateLanIp) {
      // Cloud environment with relative /api proxy
      return '/api';
    }

    // Local LAN network device access
    if (isPrivateLanIp) {
      return `http://${host}:5000/api`;
    }
  }

  return 'http://localhost:5000/api';
};

const API_BASE_URL = resolveApiBaseUrl();
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
  const base = resolveApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${base}${cleanEndpoint}`;
  
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
    throw error;
  }
};
