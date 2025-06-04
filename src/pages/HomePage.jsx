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
      ? 'grid-cols-1 sm:grid-cols-[250px_1fr_250px] lg:grid-cols-[300px_1.5fr_300px] xl:grid-cols-[350px_2fr_350px]'
      : 'grid-cols-1 sm:grid-cols-[250px_1fr] lg:grid-cols-[300px_1.5fr]';

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-gray-900">
      {/* Main container with viewport height and no overflow */}
      <div
        className={`
          flex h-full w-full flex-1 overflow-hidden rounded-xl border border-gray-700
          backdrop-blur-md ${getGridCols()} grid
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