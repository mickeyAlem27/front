import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import assets from '../assets/assets';

const First = () => {
  // Load Jotform chatbot script, animation libraries, and Inter font dynamically
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

    // Inter font
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap';
    document.head.appendChild(fontLink);

    // Initialize GSAP animations
    const initGs = () => {
      if (window.gsap && window.ScrollTrigger) {
        window.gsap.registerPlugin(window.ScrollTrigger);

        // Scroll direction detection
        let lastScrollTop = 0;
        const detectScrollDirection = () => {
          const st = window.pageYOffset || document.documentElement.scrollTop;
          const direction = st > lastScrollTop ? 'down' : 'up';
          lastScrollTop = st <= 0 ? 0 : st;
          return direction;
        };

        window.addEventListener('scroll', () => {
          window.scrollDirection = detectScrollDirection();
        });

        // Hero Section 1 - Scroll Down
        window.gsap.fromTo(
          '.hero-section-1 .content',
          { x: -30, opacity: 0, scale: 0.97 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: 'power4.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: '.hero-section-1',
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
        window.gsap.to('.hero-section-1', {
          y: '20%',
          scale: 1.05,
          scrollTrigger: {
            trigger: '.hero-section-1',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });

        // Hero Section 1 - Scroll Up
        window.gsap.fromTo(
          '.hero-section-1 .content',
          { y: -15, opacity: 0.5 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power4.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: '.hero-section-1',
              start: 'bottom 80%',
              end: 'top 20%',
              onEnterBack: () => window.scrollDirection === 'up' && window.gsap.to('.hero-section-1 .content', {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: 'power4.out',
              }),
              onLeaveBack: () => window.gsap.to('.hero-section-1 .content', { y: -15, opacity: 0.5 }),
            },
          }
        );
        window.gsap.to('.hero-section-1', {
          y: '-20%',
          scale: 1,
          scrollTrigger: {
            trigger: '.hero-section-1',
            start: 'bottom top',
            end: 'top bottom',
            scrub: 0.5,
          },
        });

        // Hero Section 2 - Scroll Down
        window.gsap.fromTo(
          '.hero-section-2 .content',
          { x: 30, opacity: 0, scale: 0.97 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: 'power4.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: '.hero-section-2',
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
        window.gsap.fromTo(
          '.hero-section-2 .btn',
          { y: 15, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)',
            stagger: 0.1,
            scrollTrigger: {
              trigger: '.hero-section-2',
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
        window.gsap.to('.hero-section-2', {
          y: '20%',
          scale: 1.05,
          scrollTrigger: {
            trigger: '.hero-section-2',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });

        // Hero Section 2 - Scroll Up
        window.gsap.fromTo(
          '.hero-section-2 .content',
          { y: -15, opacity: 0.5 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power4.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: '.hero-section-2',
              start: 'bottom 80%',
              end: 'top 20%',
              onEnterBack: () => window.scrollDirection === 'up' && window.gsap.to('.hero-section-2 .content', {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: 'power4.out',
              }),
              onLeaveBack: () => window.gsap.to('.hero-section-2 .content', { y: -15, opacity: 0.5 }),
            },
          }
        );
        window.gsap.fromTo(
          '.hero-section-2 .btn',
          { y: -15, opacity: 0.5 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)',
            stagger: 0.1,
            scrollTrigger: {
              trigger: '.hero-section-2',
              start: 'bottom 80%',
              end: 'top 20%',
              onEnterBack: () => window.scrollDirection === 'up' && window.gsap.to('.hero-section-2 .btn', {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'elastic.out(1, 0.5)',
              }),
              onLeaveBack: () => window.gsap.to('.hero-section-2 .btn', { y: -15, opacity: 0.5 }),
            },
          }
        );
        window.gsap.to('.hero-section-2', {
          y: '-20%',
          scale: 1,
          scrollTrigger: {
            trigger: '.hero-section-2',
            start: 'bottom top',
            end: 'top bottom',
            scrub: 0.5,
          },
        });

        // Footer CTA - Scroll Down
        window.gsap.fromTo(
          '.footer-cta .content',
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            ease: 'power4.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: '.footer-cta',
              start: 'top 85%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Footer CTA - Scroll Up
        window.gsap.fromTo(
          '.footer-cta .content',
          { y: -15, opacity: 0.5 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power4.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: '.footer-cta',
              start: 'bottom 85%',
              end: 'top 20%',
              onEnterBack: () => window.scrollDirection === 'up' && window.gsap.to('.footer-cta .content', {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: 'power4.out',
              }),
              onLeaveBack: () => window.gsap.to('.footer-cta .content', { y: -15, opacity: 0.5 }),
            },
          }
        );

        // Feature dropdown items
        window.gsap.from('.feature-item', {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power4.out',
          delay: 0.2,
        });
      }
    };

    // Wait for GSAP scripts to load
    scrollTriggerScript.onload = initGs;

    // Cleanup
    return () => {
      document.body.removeChild(jotformScript);
      document.head.removeChild(animateCss);
      document.body.removeChild(gsapScript);
      document.body.removeChild(scrollTriggerScript);
      document.head.removeChild(fontLink);
    };
  }, []);

  // Toggle Jotform chatbot
  const toggleChatbot = () => {
    try {
      if (window.jfAgent && typeof window.jfAgent.toggle === 'function') {
        window.jfAgent.toggle();
      } else {
        const chatbot = document.querySelector('#jf-agent, .jf-agent, [id*="jotform"], [class*="jotform"]');
        if (chatbot) {
          const isHidden = chatbot.style.display === 'none' || getComputedStyle(chatbot).display === 'none';
          chatbot.style.display = isHidden ? 'block' : 'none';
          chatbot.style.position = chatbot.style.position || 'fixed';
          chatbot.style.bottom = chatbot.style.bottom || '20px';
          chatbot.style.right = chatbot.style.right || '20px';
          chatbot.style.zIndex = chatbot.style.zIndex || '1000';
        } else {
          console.warn('Jotform chatbot not found.');
        }
      }
    } catch (error) {
      console.error('Error toggling Jotform chatbot:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Modern Navbar */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-white shadow-sm z-50 backdrop-blur-sm bg-opacity-80">
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 transform text-sm lg:text-base"
            aria-label="ChatApp Section"
          >
            ChatApp
          </button>
          
          <div className="relative group z-40">
            <button
              className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200 flex items-center hover:scale-105 transform text-sm lg:text-base"
              aria-label="Feature Section"
            >
              Features
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 -translate-y-2 z-50 border border-gray-100 overflow-hidden">
              <ul className="py-2">
                <li className="px-4 py-3 hover:bg-gray-50 transition-colors duration-150 flex items-center feature-item text-sm lg:text-base">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Real-Time Messaging
                </li>
                <li className="px-4 py-3 hover:bg-gray-50 transition-colors duration-150 flex items-center feature-item text-sm lg:text-base">
                  <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Multi-Media
                </li>
                <li className="px-4 py-3 hover:bg-gray-50 transition-colors duration-150 flex items-center feature-item text-sm lg:text-base">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Update Profile
                </li>
              </ul>
            </div>
          </div>
          
          <button
            className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200 hover:scale-105 transform text-sm lg:text-base"
            aria-label="About Section"
          >
            About
          </button>
        </div>
        
        <Link to="/login">
          <button
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 transform flex items-center text-sm lg:text-base"
            aria-label="Login to ChatApp"
          >
            Login
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </button>
        </Link>
      </nav>

      {/* Hero Sections */}
      <div className="w-full">
        {/* First Hero Section */}
        <div 
          className="min-h-[300px] flex items-start justify-center p-6 bg-cover bg-center rounded-xl overflow-hidden hero-section-1 mb-12 z-10 block w-full border border-gray-200"
          style={{ backgroundImage: `url(${assets.webfront})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10 backdrop-blur-sm rounded-xl"></div>
          <div className="relative z-20 text-center text-white max-w-3xl mx-auto pt-8 overflow-visible">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2 leading-tight content">
              Connect Instantly with <span className="text-blue-400">ChatApp</span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-gray-100 leading-normal content">
              Experience seamless real-time messaging with friends and colleagues. Share moments, exchange ideas, and stay connected like never before.
            </p>
            <Link
              to="/login"
              className="inline-block px-6 py-2 bg-white text-blue-500 rounded-full font-medium hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 transform text-sm lg:text-base content"
            >
              Start Chatting Now
            </Link>
          </div>
        </div>

        {/* Second Hero Section */}
        <div 
          className="min-h-[300px] flex items-start justify-center p-6 bg-cover bg-center rounded-xl overflow-hidden hero-section-2 mb-12 z-9 block w-full border border-gray-200"
          style={{ backgroundImage: `url(${assets.webfront2})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 to-purple-700/20 backdrop-blur-sm rounded-xl"></div>
          <div className="relative z-20 text-center text-white max-w-3xl mx-auto pt-8 overflow-visible">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2 leading-tight content">
              More Than Just <span className="text-purple-400">Messages</span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-gray-100 leading-normal content">
              Share photos, videos, and files effortlessly. Customize your profile and make every conversation uniquely yours.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/login"
                className="inline-block px-6 py-2 bg-white text-purple-500 rounded-full font-medium hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 transform text-sm lg:text-base btn content"
              >
                Join Now
              </Link>
              <button 
                onClick={toggleChatbot}
                className="inline-block px-6 py-2 border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-all duration-200 hover:scale-105 transform text-sm lg:text-base btn content"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white z-8 block w-full footer-cta">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 content">Ready to get started?</h2>
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 max-w-2xl mx-auto leading-normal content">
            Join thousands of happy users communicating effortlessly with ChatApp.
          </p>
          <Link
            to="/login"
            className="inline-block px-6 py-2 bg-white text-blue-500 rounded-full font-medium hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 transform text-sm lg:text-base content"
          >
            Sign Up Free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default First;