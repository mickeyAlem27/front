import { useContext } from 'react';
import Sidebar from '../component/Sidebar';
import ChatContainer from '../component/ChatContainer';
import RightSidebar from '../component/RightSidebar';
import { ChatContext } from '../../context/ChatContext';

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);

  // Simplified grid columns based on selectedUser
  const getGridCols = () =>
    selectedUser
      ? 'grid-cols-1 md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]'
      : 'grid-cols-1 md:grid-cols-[1fr_1.5fr]';

  return (
    <div className="flex min-h-screen w-full flex-col overflow-y-auto">
      {/* Main container with viewport height and scrollable */}
      <div
        className={`
          flex h-full w-full flex-1 overflow-visible rounded-none sm:rounded-2xl border-2 border-gray-600
          backdrop-blur-xl ${getGridCols()} grid max-w-screen-xl mx-auto px-2 sm:px-4
        `}
      >
        <Sidebar />
        <ChatContainer />
        <RightSidebar />
      </div>
    </div>
  );
};

export default HomePage;