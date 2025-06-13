import React, { useContext } from 'react';
import Sidebar from '../component/Sidebar';
import ChatContainer from '../component/ChatContainer';
import RightSidebar from '../component/RightSidebar';
import { ChatContext } from '../../context/ChatContext';

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);

  return (
    <div className="min-h-screen flex flex-col bg-[url('/bgImage.svg')] bg-contain p-1 xs:p-2 sm:p-4 overflow-y-auto">
      <div className="flex-1 flex items-center justify-center w-full">
        <div
          className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-[90vh] w-full max-w-[1800px] grid grid-cols-1 relative transition-all duration-300 ${
            selectedUser
              ? 'xs:grid-cols-[1fr] sm:grid-cols-[0.8fr_2fr] md:grid-cols-[0.8fr_2fr_0.8fr] lg:grid-cols-[0.7fr_2.5fr_0.7fr] xl:grid-cols-[0.6fr_3fr_0.6fr]'
              : 'xs:grid-cols-[1fr] sm:grid-cols-[0.8fr_2fr] lg:grid-cols-[0.7fr_3fr]'
          }`}
        >
          {/* Sidebar - hidden on xs when chat is open */}
          <div className={`overflow-y-auto ${selectedUser ? 'hidden xs:block' : 'block'}`}>
            <Sidebar />
          </div>
          
          {/* Chat Container - always visible */}
          <div className="h-full overflow-y-auto">
            <ChatContainer />
          </div>
          
          {/* Right Sidebar - only visible when user is selected and on larger screens */}
          {selectedUser && (
            <div className="hidden md:block overflow-y-auto">
              <RightSidebar />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;