import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/request-password-reset', { email });
      if (data.success) {
        toast.success(data.message);
        navigate('/reset-password', { state: { email } }); // Pass email to reset page
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/bgImage.svg')] bg-contain p-4">
      <div className="bg-[#282142]/80 p-8 rounded-xl w-full max-w-md">
        <h2 className="text-2xl text-white font-bold text-center mb-6">Forgot Password</h2>
        <p className="text-gray-300 text-center mb-4">
          Enter your email to receive a one-time password (OTP).
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 rounded-full bg-[#3a3558] text-white placeholder-gray-400 outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 rounded-full bg-violet-600 text-white hover:bg-violet-700"
          >
            Send OTP
          </button>
        </form>
        <p className="text-gray-300 text-center mt-4">
          Remember your password? <Link to="/login" className="text-violet-400 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;