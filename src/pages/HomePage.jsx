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
      : 'grid-cols-1 md:grid-cols-2';

  return (
    <div className="flex h-screen w-full px-4 py-6 sm:px-8 sm:py-8 md:px-16 md:py-12">
      {/* Main container with consistent padding */}
      <div
        className={`
          h-full w-full overflow-hidden rounded-2xl border-2 border-gray-600
          backdrop-blur-xl ${getGridCols()} grid relative
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