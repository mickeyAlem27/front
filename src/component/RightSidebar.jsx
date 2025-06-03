
import React, { useEffect, useState, useContext } from 'react';
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

  return (
    selectedUser && (
      <div className="flex h-full flex-col bg-gray-800/10 text-white md:flex hidden">
        <div className="flex flex-col items-center gap-2 px-4 py-4 text-xs">
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            alt=""
            className="h-16 w-16 rounded-full"
          />
          <h1 className="flex items-center gap-2 px-4 text-xl font-medium">
            {onlineUsers.includes(selectedUser._id) && (
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
            )}
            {selectedUser.fullName}
          </h1>
          <p className="px-4 text-gray-300">{selectedUser.bio}</p>
          {selectedUser.blocked && <span className="text-xs text-red-500">Blocked</span>}
          <button
            onClick={() =>
              selectedUser.blocked ? unblockUser(selectedUser._id) : blockUser(selectedUser._id)
            }
            className="text-sm text-red-500 hover:underline"
          >
            {selectedUser.blocked ? 'Unblock User' : 'Block User'}
          </button>
          <button
            onClick={() => removeContact(selectedUser._id)}
            className="text-sm text-red-500 hover:underline"
          >
            Remove Contact
          </button>
        </div>
        <hr className="mx-4 border-gray-500" />
        <p className="px-4 py-2 text-xs font-medium text-gray-300">Media</p>
        <div className="grid grid-cols-2 gap-4 p-4 max-h-[50vh] overflow-y-auto">
          {msgImages.map((url, index) => (
            <div key={index} onClick={() => window.open(url)} className="cursor-pointer">
              <img src={url} alt="" className="h-full rounded-md" />
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default RightSidebar;
