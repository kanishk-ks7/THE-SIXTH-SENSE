import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AthleteProvider } from './context/AthleteContext';
import AppLayout from './components/layout/AppLayout';
import { AdminRoute } from './components/auth/ProtectedRoute';

// Public & Athlete Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Assessment from './pages/Assessment';
import Roadmap from './pages/Roadmap';
import Learn from './pages/Learn';
import Train from './pages/Train';
import Events from './pages/Events';
import DemoRegistration from './pages/DemoRegistration';
import Progress from './pages/Progress';
import Results from './pages/Results';
import Settings from './pages/Settings';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAthletes from './pages/admin/AdminAthletes';
import AdminAthleteDetail from './pages/admin/AdminAthleteDetail';

export const App = () => {
  return (
    <AthleteProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing, Auth & Onboarding */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/onboarding" element={<Onboarding />} />

          {/* Admin Routes (RBAC Protected) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/athletes" element={<AdminRoute><AdminAthletes /></AdminRoute>} />
          <Route path="/admin/athletes/:id" element={<AdminRoute><AdminAthleteDetail /></AdminRoute>} />

          {/* Dedicated /athlete/* Route Mappings */}
          <Route element={<AppLayout />}>
            <Route path="/athlete/dashboard" element={<Dashboard />} />
            <Route path="/athlete/profile" element={<Profile />} />
            <Route path="/athlete/progress" element={<Progress />} />
            <Route path="/athlete/performance" element={<Progress />} />
            <Route path="/athlete/assessments" element={<Assessment />} />

            {/* Standard Application Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/train" element={<Train />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/register/:eventId" element={<DemoRegistration />} />
            <Route path="/compete" element={<Navigate to="/events" replace />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/results" element={<Results />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AthleteProvider>
  );
};

export default App;
