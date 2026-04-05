import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ApplicationPage from './pages/ApplicationPage';
import Onboarding from './pages/Onboarding';
import ConfirmationScreen from './pages/ConfirmationScreen';
import './styles/global.css';

function AppRoutes() {
  const [applicationData] = useState(null);

  const handleCompleteOnboarding = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/onboarding"
        element={
          <ProtectedRoute>
            <Onboarding onComplete={handleCompleteOnboarding} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/application/:applicationId"
        element={
          <ProtectedRoute>
            <ApplicationPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/confirmation"
        element={
          <ProtectedRoute>
            <ConfirmationScreen applicationData={applicationData} />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <Navbar />
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
