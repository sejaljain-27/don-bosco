import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Onboarding } from './pages/Onboarding';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Timeline } from './pages/Timeline';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import { Domains } from './pages/Domains';
import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
  const [userProfile, setUserProfile] = useState({
    name: 'Sejal Jain',
    address: '123 Innovation Dr, Neo Bangalore',
    pastRole: 'Student',
    currentRole: 'Software Intern',
    futureRole: 'AI Architect'
  });

  const handleUpdateProfile = (newProfile) => {
    setUserProfile(prev => ({ ...prev, ...newProfile }));
  };

  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/onboarding" element={<Onboarding userProfile={userProfile} onUpdateProfile={handleUpdateProfile} />} />
          
          {/* Authenticated Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout userProfile={userProfile} onUpdateProfile={handleUpdateProfile} />}>
            <Route index element={<Navigate to="timeline" replace />} />
            <Route path="timeline" element={<Timeline />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
            <Route path="domains" element={<Domains />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}
