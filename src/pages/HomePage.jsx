import React, { useContext } from 'react';
import Sidebar from '../component/Sidebar';
import ChatContainer from '../component/ChatContainer';
import RightSidebar from '../component/RightSidebar';
import { ChatContext } from '../../context/ChatContext';

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/bgImage.svg')] bg-cover bg-center p-2 sm:p-4">
      <div
        className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-[90vh] w-full max-w-[96rem] grid relative ${
          selectedUser
            ? 'grid-cols-[200px_1fr_200px] sm:grid-cols-[250px_1fr_250px] lg:grid-cols-[280px_1fr_280px]'
            : 'grid-cols-[200px_1fr] sm:grid-cols-[250px_1fr] lg:grid-cols-[280px_1fr]'
        }`}
      >
        <div className="h-full overflow-y-auto flex-shrink-0">
          <Sidebar />
        </div>
        <div className="h-full overflow-y-auto">
          <ChatContainer />
        </div>
        <div className={`${selectedUser ? 'block' : 'hidden'} h-full overflow-y-auto flex-shrink-0`}>
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default HomePage;