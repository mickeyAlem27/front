import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import assets from '../assets/assets';

const First = () => {
  // Load Jotform chatbot script and animation libraries dynamically
  useEffect(() => {
    // Jotform script
    const jotformScript = document.createElement('script');
    jotformScript.src = 'https://cdn.jotfor.ms/agent/embedjs/019758665934714bb1c6833259ea4b35ee4f/embed.js?skipWelcome=1&maximizable=1';
    jotformScript.async = true;
    document.body.appendChild(jotformScript);

    // Animate.css
    const animateCss = document.createElement('link');
    animateCss.rel = 'stylesheet';
    animateCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
    document.head.appendChild(animateCss);

    // GSAP and ScrollTrigger
    const gsapScript = document.createElement('script');
    gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
    gsapScript.async = true;
    document.body.appendChild(gsapScript);

    const scrollTriggerScript = document.createElement('script');
    scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';
    scrollTriggerScript.async = true;
    document.body.appendChild(scrollTriggerScript);

    // Initialize GSAP animations once scripts are loaded
    const initGsap = () => {
      if (window.gsap && window.ScrollTrigger) {
        window.gsap.registerPlugin(window.ScrollTrigger);

        // Hero sections
        window.gsap.fromTo(
          '.hero-section-1',
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.hero-section-1',
              start: 'top 80%',
            },
          }
        );
        window.gsap.fromTo(
          '.hero-section-2',
          { x: 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.hero-section-2',
              start: 'top 80%',
            },
          }
        );

        // Footer CTA
        window.gsap.fromTo(
          '.footer-cta',
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: '.footer-cta',
              start: 'top 90%',
            },
          }
        );

        // Feature dropdown items
        window.gsap.from('.feature-item', {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.2,
        });
      }
    };

    // Wait for GSAP scripts to load
    scrollTriggerScript.onload = initGsap;

    // Cleanup
    return () => {
      document.body.removeChild(jotformScript);
      document.head.removeChild(animateCss);
      document.body.removeChild(gsapScript);
      document.body.removeChild(scrollTriggerScript);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Navbar with higher z-index and load animation */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-white shadow-sm z-50 backdrop-blur-sm bg-opacity-80 animate__animated animate__fadeInDown">
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg animate__animated animate__pulse animate__infinite animate__slow"
            aria-label="ChatApp Section"
          >
            ChatApp
          </button>
          
          {/* Feature Dropdown with proper z-index hierarchy */}
          <div className="relative group z-40">
            <button
              className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex items-center animate__animated animate__fadeIn"
              aria-label="Feature Section"
            >
              Features
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 -translate-y-2 z-50 border border-gray-100 overflow-hidden">
              <ul className="py-2">
                <li className="px-4 py-3 hover:bg-gray-50 transition-colors duration-150 flex items-center feature-item">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Real-Time Messaging
                </li>
                <li className="px-4 py-3 hover:bg-gray-50 transition-colors duration-150 flex items-center feature-item">
                  <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Multi-Media
                </li>
                <li className="px-4 py-3 hover:bg-gray-50 transition-colors duration-150 flex items-center feature-item">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Update Profile
                </li>
              </ul>
            </div>
          </div>
          
          <button
            className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 animate__animated animate__fadeIn"
            aria-label="About Section"
          >
            About
          </button>
        </div>
        
        <Link to="/login">
          <button
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center animate__animated animate__pulse animate__infinite animate__slow"
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
          className="relative min-h-[500px] flex items-center justify-center p-8 bg-cover bg-center hero-section-1"
          style={{ backgroundImage: `url(${assets.webfront})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>
          <div className="relative z-20 text-center text-white max-w-4xl px-4">
            <h1 className="text-5xl font-bold mb-6 leading-tight animate__animated animate__zoomIn">
              Connect Instantly with <span className="text-blue-300">ChatApp</span>
            </h1>
            <p className="text-xl mb-8 text-gray-100 animate__animated animate__zoomIn animate__delay-1s">
              Experience seamless real-time messaging with friends and colleagues. Share moments, exchange ideas, and stay connected like never before.
            </p>
            <Link
              to="/login"
              className="inline-block px-8 py-3 bg-white text-blue-600 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl animate__animated animate__pulse animate__infinite animate__slow"
            >
              Start Chatting Now
            </Link>
          </div>
        </div>

        {/* Second Hero Section */}
        <div 
          className="relative min-h-[500px] flex items-center justify-center p-8 bg-cover bg-center hero-section-2"
          style={{ backgroundImage: `url(${assets.webfront2})` }}
        >
          <div className="absolute inset-0 bg-purple-900 bg-opacity-50 backdrop-blur-sm"></div>
          <div className="relative z-20 text-center text-white max-w-4xl px-4">
            <h1 className="text-5xl font-bold mb-6 leading-tight animate__animated animate__zoomIn">
              More Than Just <span className="text-purple-300">Messages</span>
            </h1>
            <p className="text-xl mb-8 text-gray-100 animate__animated animate__zoomIn animate__delay-1s">
              Share photos, videos, and files effortlessly. Customize your profile and make every conversation uniquely yours.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/login"
                className="inline-block px-8 py-3 bg-white text-purple-600 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl animate__animated animate__pulse animate__infinite animate__slow"
              >
                Join Now
              </Link>
              <button className="inline-block px-8 py-3 border-2 border-white text-white rounded-full font-medium hover:bg-white hover:bg-opacity-20 transition-colors duration-300 animate__animated animate__pulse animate__infinite animate__slow">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="py-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white relative z-10 footer-cta">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 animate__animated animate__fadeInUp">Ready to get started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto animate__animated animate__fadeInUp animate__delay-1s">
            Join thousands of happy users communicating effortlessly with ChatApp.
          </p>
          <Link
            to="/login"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl animate__animated animate__pulse animate__infinite animate__slow"
          >
            Sign Up Free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default First;