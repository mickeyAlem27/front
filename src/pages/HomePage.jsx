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
            ? 'grid-cols-1 sm:grid-cols-[250px_1fr] lg:grid-cols-[280px_1.5fr_280px] xl:grid-cols-[300px_2fr_300px]'
            : 'grid-cols-1 sm:grid-cols-[250px_1fr] lg:grid-cols-[280px_1fr]'
        }`}
      >
        <div className="overflow-y-auto sm:overflow-y-hidden">
          <Sidebar />
        </div>
        <div className="h-full">
          <ChatContainer />
        </div>
        <div className={`${selectedUser ? 'block' : 'hidden'} sm:block overflow-y-auto`}>
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default HomePage;