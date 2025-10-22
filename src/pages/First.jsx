import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import assets from '../assets/assets';


const First = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Load Jotform chatbot script dynamically
  useEffect(() => {
    setIsVisible(true);

    // Add smooth scrolling to the entire document
    document.documentElement.style.scrollBehavior = 'smooth';

    // Mouse movement effect for subtle parallax
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    // Scroll event for progress and animations
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;

      setScrollY(scrolled);
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    // Throttle scroll events for better performance
    let scrollTimeout;
    const throttledScroll = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(handleScroll, 16); // ~60fps
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', throttledScroll, { passive: true });

    // Load Jotform chatbot script dynamically
    const script = document.createElement('script');
    script.src = 'https://cdn.jotfor.ms/agent/embedjs/019758665934714bb1c6833259ea4b35ee4f/embed.js?skipWelcome=1&maximizable=1';
    script.async = true;
    document.body.appendChild(script);

    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.scroll-animate');
    animateElements.forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', throttledScroll);
      if (script.parentNode) {
        document.body.removeChild(script);
      }
      observer.disconnect();
      // Reset smooth scrolling on cleanup
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className={`absolute top-20 left-10 w-20 h-20 bg-blue-500 rounded-full opacity-10 animate-bounce-enhanced parallax-element`}
          style={{
            animationDelay: '0s',
            animationDuration: '3s',
            transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)`
          }}
        ></div>
        <div
          className={`absolute top-40 right-20 w-16 h-16 bg-purple-500 rounded-full opacity-10 animate-bounce-enhanced parallax-element`}
          style={{
            animationDelay: '1s',
            animationDuration: '4s',
            transform: `translate(${scrollY * -0.08}px, ${scrollY * 0.03}px)`
          }}
        ></div>
        <div
          className={`absolute bottom-40 left-20 w-12 h-12 bg-green-500 rounded-full opacity-10 animate-bounce-enhanced parallax-element`}
          style={{
            animationDelay: '2s',
            animationDuration: '3.5s',
            transform: `translate(${scrollY * 0.06}px, ${scrollY * -0.04}px)`
          }}
        ></div>
        <div
          className={`absolute bottom-20 right-10 w-24 h-24 bg-indigo-500 rounded-full opacity-10 animate-bounce-enhanced parallax-element`}
          style={{
            animationDelay: '0.5s',
            animationDuration: '4.5s',
            transform: `translate(${scrollY * -0.1}px, ${scrollY * 0.07}px)`
          }}
        ></div>
        <div
          className={`absolute top-1/2 left-1/4 w-8 h-8 bg-pink-500 rounded-full opacity-10 animate-float parallax-element`}
          style={{
            animationDelay: '3s',
            transform: `translate(${scrollY * 0.05}px, ${scrollY * -0.02}px)`
          }}
        ></div>
        <div
          className={`absolute top-1/3 right-1/4 w-10 h-10 bg-yellow-500 rounded-full opacity-10 animate-float parallax-element`}
          style={{
            animationDelay: '1.5s',
            transform: `translate(${scrollY * -0.03}px, ${scrollY * 0.08}px)`
          }}
        ></div>
      </div>

      {/* Modern Navbar with higher z-index */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-white shadow-md z-50 backdrop-blur-sm bg-opacity-95 navbar-blur">
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 rounded-lg text-white bg-gray-800 hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            aria-label="ChatApp Section"
          >
            ChatApp
          </button>

          {/* Feature Dropdown with proper z-index hierarchy */}
          <div className="relative group z-40">
            <button
              className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200 flex items-center transform hover:scale-105"
              aria-label="Feature Section"
            >
              Features
              <svg className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 -translate-y-2 scale-95 group-hover:scale-100 z-50 border border-gray-100 overflow-hidden">
              <ul className="py-2">
                <li className="px-4 py-3 hover:bg-gray-50 transition-colors duration-150 flex items-center transform hover:translate-x-2">
                  <svg className="w-5 h-5 mr-2 text-gray-600 transition-colors duration-200 hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Real-Time Messaging
                </li>
                <li className="px-4 py-3 hover:bg-gray-50 transition-colors duration-150 flex items-center transform hover:translate-x-2">
                  <svg className="w-5 h-5 mr-2 text-gray-600 transition-colors duration-200 hover:text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Multi-Media
                </li>
                <li className="px-4 py-3 hover:bg-gray-50 transition-colors duration-150 flex items-center transform hover:translate-x-2">
                  <svg className="w-5 h-5 mr-2 text-gray-600 transition-colors duration-200 hover:text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Update Profile
                </li>
              </ul>
            </div>
          </div>

          <button
            className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
            aria-label="About Section"
            onClick={() => {
              document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            About
          </button>
        </div>

        <Link to="/login">
          <button
            className="px-6 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition-all duration-300 flex items-center transform hover:scale-105 hover:shadow-lg"
            aria-label="Login to ChatApp"
          >
            Login
            <svg className="w-4 h-4 ml-2 transition-transform duration-200 hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </button>
        </Link>
      </nav>

      {/* Hero Sections with adjusted z-index */}
      <div className="pt-24 relative z-10">
        {/* First Hero Section */}
        <div
          className={`scroll-animate relative min-h-[500px] flex items-center justify-center p-8 bg-cover bg-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{
            backgroundImage: `url(${assets.webfront})`,
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
          }}
          role="img"
          aria-label="Background image showing people using ChatApp on various devices"
        >
          <div className="absolute inset-0 bg-gray-900 bg-opacity-40 backdrop-blur-sm"></div>
          <div className={`relative z-20 text-center text-white max-w-4xl px-4 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Connect Instantly with <span className="text-gray-200 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">ChatApp</span>
            </h1>

            <div className="selection:bg-amber-200 selection:text-slate-400">
            <p className="text-xl mb-8 text-gray-200">
              Experience seamless real-time messaging with friends and colleagues. Share moments, exchange ideas, and stay connected like never before.
            </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/login"
                className={`inline-block px-8 py-3 bg-white text-gray-800 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 smooth-hover ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: '500ms' }}
              >
                Start Chatting Now
              </Link>

              {/* Animated Statistics */}
              <div className={`flex space-x-6 text-white ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '700ms' }}>
                <div className="text-center">
                
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">99.9%</div>
                  <div className="text-sm text-gray-300">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">24/7</div>
                  <div className="text-sm text-gray-300">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Hero Section */}
        <div
          className={`scroll-animate relative min-h-[500px] flex items-center justify-center p-8 bg-cover bg-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{
            backgroundImage: `url(${assets.webfront2})`,
            transform: `translate(${mousePosition.x * -0.05}px, ${mousePosition.y * -0.05}px)`
          }}
          role="img"
          aria-label="Background image showing group of friends chatting and sharing media"
        >
          <div className="absolute inset-0 bg-gray-900 bg-opacity-40 backdrop-blur-sm"></div>
          <div className={`relative z-20 text-center text-white max-w-4xl px-4 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              More Than Just <span className="text-gray-200 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Messages</span>
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Share photos, videos, and files effortlessly. Customize your profile and make every conversation uniquely yours.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-x-4 gap-4">
              <Link
                to="/login"
                className={`inline-block px-8 py-3 bg-white text-gray-800 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 smooth-hover ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: '900ms' }}
              >
                Join Now
              </Link>
              <button
                className={`inline-block px-8 py-3 border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-gray-800 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 smooth-hover ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: '1000ms' }}
                onClick={() => {
                  document.querySelector('.group')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div
        id="about-section"
        className={`scroll-animate py-16 bg-gray-800 text-white relative z-10 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Ready to get started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
            Join thousands of happy users communicating effortlessly with ChatApp.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/login"
              className={`inline-block px-8 py-3 bg-white text-gray-800 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 smooth-hover ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '1200ms' }}
            >
              Sign Up Free
            </Link>

            {/* Additional Features Grid */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '1300ms' }}>
              <div className="text-center p-3 bg-gray-700 bg-opacity-50 rounded-lg hover:bg-opacity-70 transition-all duration-300 transform hover:scale-105 smooth-hover">
                <div className="text-2xl mb-1">💬</div>
                <div className="text-xs text-gray-300">Real-time Chat</div>
              </div>
              <div className="text-center p-3 bg-gray-700 bg-opacity-50 rounded-lg hover:bg-opacity-70 transition-all duration-300 transform hover:scale-105 smooth-hover">
                <div className="text-2xl mb-1">📁</div>
                <div className="text-xs text-gray-300">File Sharing</div>
              </div>
              <div className="text-center p-3 bg-gray-700 bg-opacity-50 rounded-lg hover:bg-opacity-70 transition-all duration-300 transform hover:scale-105 smooth-hover">
                <div className="text-2xl mb-1">🔒</div>
                <div className="text-xs text-gray-300">Secure</div>
              </div>
              <div className="text-center p-3 bg-gray-700 bg-opacity-50 rounded-lg hover:bg-opacity-70 transition-all duration-300 transform hover:scale-105 smooth-hover">
                <div className="text-2xl mb-1">⚡</div>
                <div className="text-xs text-gray-300">Fast</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Progress Indicator */}
      <div
        className="scroll-progress"
        style={{
          transform: `scaleX(${scrollProgress / 100})`,
          transformOrigin: 'left'
        }}
      ></div>

      {/* Scroll Indicator */}
      <div className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${scrollY > 100 ? 'scale-100' : 'scale-0'}`} style={{ transitionDelay: '1500ms' }}>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl smooth-hover"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default First;