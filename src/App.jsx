import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignInSide from './components/SignInSide';
import Dashboard from './pages/Dashboard';
import DashboardWelcome2 from './pages/DashboardWelcome2';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import Profile from './components/Profile';

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/signin" element={<SignInSide />} />
        <Route path="/dashboard/*" element={<Dashboard />} />{' '}
        <Route path="/" element={<SignInSide />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
