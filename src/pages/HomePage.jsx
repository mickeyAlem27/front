import React, { useContext } from 'react';
import Sidebar from '../component/Sidebar';
import ChatContainer from '../component/ChatContainer';
import RightSidebar from '../component/RightSidebar';
import { ChatContext } from '../../context/ChatContext';

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);

  return (
    <div className="min-h-screen flex flex-col bg-[url('/bgImage.svg')] bg-contain p-2 sm:p-4 overflow-y-auto">
      <div className="flex-1 flex items-center justify-center w-full">
        <div
          className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-[90vh] w-full max-w-[1800px] grid grid-cols-1 relative transition-all duration-300 ${
            selectedUser
              ? 'md:grid-cols-[minmax(200px,0.8fr)_minmax(300px,2fr)_minmax(200px,0.8fr)] lg:grid-cols-[minmax(250px,0.7fr)_minmax(400px,2.5fr)_minmax(250px,0.7fr)] xl:grid-cols-[minmax(300px,0.6fr)_minmax(500px,3fr)_minmax(300px,0.6fr)]'
              : 'md:grid-cols-[minmax(200px,0.8fr)_minmax(300px,2fr)] lg:grid-cols-[minmax(250px,0.7fr)_minmax(400px,3fr)]'
          }`}
        >
          {/* Sidebar - Responsive in both directions */}
          <div className="overflow-x-hidden overflow-y-auto min-w-0">
            <Sidebar />
          </div>

          {/* Chat Container - Responsive in both directions */}
          <div className="h-full min-w-0 overflow-x-hidden overflow-y-auto">
            <ChatContainer />
          </div>

          {/* Right Sidebar - Responsive in both directions */}
          {selectedUser && (
            <div className="hidden md:block overflow-x-hidden overflow-y-auto min-w-0">
              <RightSidebar />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;