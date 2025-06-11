import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import { Toaster } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import First from './pages/First';

const App = () => {
  const { authUser } = useContext(AuthContext);

  

  return (
    <div >
      <Toaster />
      <Routes>
        <Route path="/" element={<First />} />
        <Route path="/first" element={<First />} />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/home" /> : <LoginPage />}
        />
        <Route
          path="/home"
          element={<HomePage />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/forgot-password"
          element={authUser ? <Navigate to="/" /> : <ForgotPasswordPage />}
        />
        <Route
          path="/reset-password"
          element={authUser ? <Navigate to="/" /> : <ResetPasswordPage />}
        />
        {/* Fallback route for unmatched paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;