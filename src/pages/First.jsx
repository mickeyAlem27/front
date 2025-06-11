import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import assets from '../assets/assets';


const First = () => {
    // Load Jotform chatbot script dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jotfor.ms/agent/embedjs/019758665934714bb1c6833259ea4b35ee4f/embed.js?skipWelcome=1&maximizable=1';
    script.async = true;
    document.body.appendChild(script);});
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Navbar with higher z-index */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-white shadow-sm z-50 backdrop-blur-sm bg-opacity-80">
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
            aria-label="ChatApp Section"
          >
            ChatApp
          </button>
          
          {/* Feature Dropdown with proper z-index hierarchy */}
          <div className="relative group z-40">
            <button
              className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center"
              aria-label="Feature Section"
            >
              Features
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 -translate-y-2 z-50 border border-gray-100 overflow-hidden">
              <ul className="py-2">
                <li className="px-4 py-3 hover:bg-gray-50 transition-colors duration-150 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Real-Time Messaging
                </li>
                <li className="px-4 py-3 hover:bg-gray-50 transition-colors duration-150 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Multi-Media
                </li>
                <li className="px-4 py-3 hover:bg-gray-50 transition-colors duration-150 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Update Profile
                </li>
              </ul>
            </div>
          </div>
          
          <button
            className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            aria-label="About Section"
          >
            About
          </button>
        </div>
        
        <Link to="/login">
          <button
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
            aria-label="Login to ChatApp"
          >
            Login
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </button>
        </Link>
      </nav>

      {/* Hero Sections with adjusted z-index */}
      <div className="pt-24 relative z-10">
        {/* First Hero Section */}
        <div 
          className="relative min-h-[500px] flex items-center justify-center p-8 bg-cover bg-center"
          style={{ backgroundImage: `url(${assets.webfront})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>
          <div className="relative z-20 text-center text-white max-w-4xl px-4">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Connect Instantly with <span className="text-blue-300">ChatApp</span>
            </h1>
            <p className="text-xl mb-8 text-gray-100">
              Experience seamless real-time messaging with friends and colleagues. Share moments, exchange ideas, and stay connected like never before.
            </p>
            <Link
              to="/login"
              className="inline-block px-8 py-3 bg-white text-blue-600 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Start Chatting Now
            </Link>
          </div>
        </div>

        {/* Second Hero Section */}
        <div 
          className="relative min-h-[500px] flex items-center justify-center p-8 bg-cover bg-center"
          style={{ backgroundImage: `url(${assets.webfront2})` }}
        >
          <div className="absolute inset-0 bg-purple-900 bg-opacity-50 backdrop-blur-sm"></div>
          <div className="relative z-20 text-center text-white max-w-4xl px-4">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              More Than Just <span className="text-purple-300">Messages</span>
            </h1>
            <p className="text-xl mb-8 text-gray-100">
              Share photos, videos, and files effortlessly. Customize your profile and make every conversation uniquely yours.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/login"
                className="inline-block px-8 py-3 bg-white text-purple-600 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Join Now
              </Link>
              <button className="inline-block px-8 py-3 border-2 border-white text-white rounded-full font-medium hover:bg-white hover:bg-opacity-20 transition-colors duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="py-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white relative z-10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of happy users communicating effortlessly with ChatApp.
          </p>
          <Link
            to="/login"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Sign Up Free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default First;