import React, { useContext, useRef } from 'react';
import Sidebar from '../component/Sidebar';
import ChatContainer from '../component/ChatContainer';
import RightSidebar from '../component/RightSidebar';
import { ChatContext } from '../../context/ChatContext';

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);
  const scrollTopRef = useRef(null);
  const scrollBottomRef = useRef(null);

  const scrollToTop = () => {
    scrollTopRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    scrollBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[url('/bgImage.svg')] bg-contain p-4 relative">
      <div ref={scrollTopRef} />
      <div
        className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden grid grid-cols-1 ${
          selectedUser
            ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]'
            : 'md:grid-cols-2'
        } w-full max-w-[1400px] min-h-[80vh] max-h-[95vh] h-[90vh]`} // Responsive height
      >
        {/* Left Sidebar (Always visible) */}
        <div className="overflow-y-auto h-full flex flex-col">
          <Sidebar />
        </div>

        {/* Main Chat Container (Always visible) */}
        <div className="h-full flex flex-col overflow-hidden">
          <ChatContainer />
        </div>

        {/* Right Sidebar (Conditional) */}
        {selectedUser && (
          <div className="hidden md:block overflow-y-auto h-full flex flex-col">
            <RightSidebar />
          </div>
        )}
      </div>
      <div ref={scrollBottomRef} />

      {/* Scroll Buttons (Fixed) */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-10">
        <button
          onClick={scrollToTop}
          className="p-2 bg-violet-500 text-white rounded-full hover:bg-violet-600 text-sm"
        >
          ↑ Top
        </button>
        <button
          onClick={scrollToBottom}
          className="p-2 bg-violet-500 text-white rounded-full hover:bg-violet-600 text-sm"
        >
          ↓ Bottom
        </button>
      </div>
    </div>
  );
};

export default HomePage;