import React, { useContext, useEffect, useState } from 'react';
import assets from '../assets/assets';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';

const RightSidebar = () => {
  const { selectedUser, messages, removeContact, blockUser, unblockUser } = useContext(ChatContext);
  const { onlineUsers } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([]);

  useEffect(() => {
    setMsgImages(messages.filter((msg) => msg.image).map((msg) => msg.image));
  }, [messages]);

  return selectedUser && (
    <div className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-auto ${selectedUser ? "md:block hidden" : ""}`}>
      <div className='pt-12 sm:pt-16 flex flex-col items-center gap-2 sm:gap-3 text-xs sm:text-sm font-light mx-auto'>
        <img src={selectedUser?.profilePic || assets.avatar_icon} alt="" className='w-16 sm:w-20 aspect-[1/1] rounded-full'/>
        <h1 className='px-6 sm:px-10 text-lg sm:text-xl font-medium mx-auto flex items-center gap-1 sm:gap-2'>
          {onlineUsers.includes(selectedUser._id) && <p className='w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500'></p>}
          {selectedUser.fullName}
        </h1>
        <p className='px-6 sm:px-10 mx-auto text-xs sm:text-sm'>{selectedUser.bio}</p>
        {selectedUser.blocked && (
          <span className='text-red-500 text-xs sm:text-sm'>Blocked</span>
        )}
        <button
          onClick={() => selectedUser.blocked ? unblockUser(selectedUser._id) : blockUser(selectedUser._id)}
          className='text-xs sm:text-sm text-red-500 cursor-pointer'
        >
          {selectedUser.blocked ? "Unblock User" : "Block User"}
        </button>
        <button
          onClick={() => removeContact(selectedUser._id)}
          className='text-xs sm:text-sm text-red-500 cursor-pointer'
        >
          Remove Contact
        </button>
      </div>
      <hr className="mx-4 sm:mx-5 my-2 sm:my-3 border-gray-600" />
      <p className='px-4 sm:px-5 text-xs sm:text-sm'>Media</p>
      <div className='mt-2 max-h-[180px] sm:max-h-[200px] overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 px-4 sm:px-5 opacity-80'>
        {msgImages.map((url, index) => (
          <div key={index} onClick={() => window.open(url)} className='cursor-pointer rounded'>
            <img src={url} alt="" className='h-full rounded-md'/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;