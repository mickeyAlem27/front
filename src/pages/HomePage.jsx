import React, { useContext } from 'react';
import Sidebar from '../component/Sidebar';
import ChatContainer from '../component/ChatContainer';
import RightSidebar from '../component/RightSidebar';
import { ChatContext } from '../../context/ChatContext';

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/bgImage.svg')] bg-contain p-4">
      <div
        className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-[90vh] grid grid-cols-1 relative ${
          selectedUser
            ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]'
            : 'md:grid-cols-2'
        }`}
      >
        <div className="overflow-y-auto md:overflow-y-hidden">
          <Sidebar />
        </div>
        <div className="h-full">
          <ChatContainer />
        </div>
        <div className="hidden md:block overflow-y-auto">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default HomePage;