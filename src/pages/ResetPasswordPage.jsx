import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const ResetPasswordPage = () => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ''; // Get email from state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      console.log('Sending request to:', `${backendUrl}/api/users/reset-password`, { email, otp, newPassword });
      const { data } = await axios.post(`${backendUrl}/api/users/reset-password`, {
        email,
        otp,
        newPassword,
      });
      console.log('Response:', data);
      if (data.success) {
        toast.success(data.message);
        navigate('/login');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/bgImage.svg')] bg-contain p-4">
      <div className="bg-[#282142]/80 p-8 rounded-xl w-full max-w-md">
        <h2 className="text-2xl text-white font-bold text-center mb-6">Reset Password</h2>
        <p className="text-gray-300 text-center mb-4">
          Enter the 6-digit OTP sent to {email} and your new password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              className="w-full p-3 rounded-full bg-[#3a3558] text-white placeholder-gray-400 outline-none"
              maxLength="6"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full p-3 rounded-full bg-[#3a3558] text-white placeholder-gray-400 outline-none"
              minLength="6"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 rounded-full bg-violet-600 text-white hover:bg-violet-700"
          >
            Reset Password
          </button>
        </form>
        <p className="text-gray-300 text-center mt-4">
          Back to <Link to="/login" className="text-violet-400 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;