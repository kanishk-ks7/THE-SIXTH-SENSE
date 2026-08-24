import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAthlete } from '../../context/AthleteContext';

/**
 * Admin-Only Protected Route Guard
 * Enforces authentication and ADMIN role.
 * Rejects Athletes and redirects unauthenticated users to /admin/login.
 */
export const AdminRoute = ({ children }) => {
  const { isAuthenticated, userRole } = useAthlete();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (userRole !== 'ADMIN') {
    // Athlete attempting to access admin route -> Redirect to athlete dashboard
    return <Navigate to="/athlete/dashboard" replace />;
  }

  return children;
};

/**
 * Athlete Protected Route Guard
 * Prevents non-authenticated access and handles admin redirections.
 */
export const AthleteRoute = ({ children }) => {
  const { isAuthenticated, userRole } = useAthlete();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If an administrator lands on athlete root, allow or direct to admin
  return children;
};
