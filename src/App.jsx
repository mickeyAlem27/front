import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import { Toaster } from "react-hot-toast";
import { AuthContext } from '../context/AuthContext';

const App = () => {
  const { authUser, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[url('/bgImage.svg')] bg-contain">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-[url('/bgImage.svg')] bg-contain">
      <Toaster />
      <Routes>
        <Route
          path='/'
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path='/login'
          element={authUser ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path='/profile'
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path='/forgot-password'
          element={authUser ? <Navigate to="/" /> : <ForgotPasswordPage />}
        />
        <Route
          path='/reset-password'
          element={authUser ? <Navigate to="/" /> : <ResetPasswordPage />}
        />
      </Routes>
    </div>
  );
};

export default App;