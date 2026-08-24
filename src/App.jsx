import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AthleteProvider } from './context/AthleteContext';
import AppLayout from './components/layout/AppLayout';

// Pages
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Assessment from './pages/Assessment';
import Roadmap from './pages/Roadmap';
import Learn from './pages/Learn';
import Train from './pages/Train';
import Compete from './pages/Compete';
import Progress from './pages/Progress';
import Results from './pages/Results';
import Settings from './pages/Settings';

export const App = () => {
  return (
    <AthleteProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing & Onboarding */}
          <Route path="/" element={<Landing />} />
          <Route path="/onboarding" element={<Onboarding />} />

          {/* Main Authenticated / Athlete Portal Layout */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/train" element={<Train />} />
            <Route path="/compete" element={<Compete />} />
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
