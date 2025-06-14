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
        className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-[90vh] flex relative ${
          selectedUser
            ? 'md:flex-row xl:flex-row'
            : 'md:flex-row'
        }`}
      >
        <div className="h-full overflow-y-auto flex-shrink-0 md:w-1/4 xl:w-1/5">
          <Sidebar />
        </div>
        <div className="h-full overflow-y-auto flex-grow md:w-2/4 xl:w-3/5">
          <ChatContainer />
        </div>
        {selectedUser && (
          <div className="h-full overflow-y-auto flex-shrink-0 md:w-1/4 xl:w-1/5">
            <RightSidebar />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;