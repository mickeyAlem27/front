import { useContext } from 'react';
import Sidebar from '../component/Sidebar';
import ChatContainer from '../component/ChatContainer';
import RightSidebar from '../component/RightSidebar';
import { ChatContext } from '../../context/ChatContext';

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);

  const getGridCols = () => 
    selectedUser 
      ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' 
      : 'md:grid-cols-2';

  return (
    <div className='border w-full h-screen sm:px-[15%] sm:py-[5%]'>
      <div 
        className={`
          backdrop-blur-xl 
          border-2 border-gray-600 
          rounded-2xl overflow-hidden 
          h-full grid grid-cols-1 relative 
          ${getGridCols()}
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