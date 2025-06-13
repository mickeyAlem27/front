import React, { useContext, useRef, useState, useEffect } from 'react';
import Sidebar from '../component/Sidebar';
import ChatContainer from '../component/ChatContainer';
import RightSidebar from '../component/RightSidebar';
import { ChatContext } from '../../context/ChatContext';
import { FiChevronUp, FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import { AuthContext } from '../../context/AuthContext';

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);
  const { authUser } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const scrollTopRef = useRef(null);
  const scrollBottomRef = useRef(null);

  // Responsive layout adjustments
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth < 768;
  

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-close sidebars on mobile when selecting a chat
  useEffect(() => {
    if (selectedUser && isMobile) {
      setIsMobileMenuOpen(false);
      setShowRightSidebar(false);
    }
  }, [selectedUser, isMobile]);

  const scrollToTop = () => scrollTopRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToBottom = () => scrollBottomRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      {/* Mobile Header */}
      <header className="md:hidden flex justify-between items-center p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          {authUser?.fullName || 'Chat App'}
        </h1>
        
        <button 
          onClick={() => setShowRightSidebar(!showRightSidebar)}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
        >
          <FiMenu size={24} />
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Always visible on desktop, toggleable on mobile */}
        <div 
          className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-80 lg:w-96 bg-white dark:bg-gray-800 border-r dark:border-gray-700 overflow-y-auto transition-all duration-300 z-20 absolute md:relative h-[calc(100vh-64px)] md:h-auto`}
        >
          <Sidebar />
        </div>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div ref={scrollTopRef} />
          <div className="flex-1 overflow-y-auto">
            <ChatContainer />
          </div>
          <div ref={scrollBottomRef} />
        </main>

        {/* Right Sidebar - Hidden on mobile by default */}
        <div 
          className={`${showRightSidebar ? 'block' : 'hidden'} md:block w-full md:w-80 lg:w-96 bg-white dark:bg-gray-800 border-l dark:border-gray-700 overflow-y-auto transition-all duration-300 z-20 absolute md:relative right-0 h-[calc(100vh-64px)] md:h-auto`}
        >
          <RightSidebar />
        </div>
      </div>

      {/* Scroll Control Buttons - Only show on desktop */}
      {!isMobile && (
        <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-10">
          <button
            onClick={scrollToTop}
            className="p-3 bg-violet-600 text-white rounded-full hover:bg-violet-700 shadow-lg transition-all"
            aria-label="Scroll to top"
          >
            <FiChevronUp size={20} />
          </button>
          <button
            onClick={scrollToBottom}
            className="p-3 bg-violet-600 text-white rounded-full hover:bg-violet-700 shadow-lg transition-all"
            aria-label="Scroll to bottom"
          >
            <FiChevronDown size={20} />
          </button>
        </div>
      )}

      {/* Mobile Navigation Footer */}
      {isMobile && (
        <div className="md:hidden flex justify-around items-center p-2 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className={`p-3 rounded-full ${isMobileMenuOpen ? 'bg-violet-100 dark:bg-violet-900' : ''}`}
          >
            <FiMenu size={20} />
          </button>
          <button 
            onClick={() => setShowRightSidebar(true)}
            className={`p-3 rounded-full ${showRightSidebar ? 'bg-violet-100 dark:bg-violet-900' : ''}`}
          >
            <FiMenu size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;