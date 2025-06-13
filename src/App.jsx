import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import First from './pages/First';

const App = () => {
  const { authUser } = useContext(AuthContext);

  return (
    <div className="app">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<First />} />
        <Route path="/first" element={<First />} />
        <Route 
          path="/login" 
          element={authUser ? <Navigate to="/home" replace /> : <LoginPage />} 
        />
        <Route 
          path="/forgot-password" 
          element={authUser ? <Navigate to="/home" replace /> : <ForgotPasswordPage />} 
        />
        <Route 
          path="/reset-password" 
          element={authUser ? <Navigate to="/home" replace /> : <ResetPasswordPage />} 
        />

        {/* Protected routes */}
        <Route 
          path="/home" 
          element={authUser ? <HomePage /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/profile" 
          element={authUser ? <ProfilePage /> : <Navigate to="/login" replace />} 
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;