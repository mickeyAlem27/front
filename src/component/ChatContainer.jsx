import React, { useEffect, useRef, useState, useContext } from 'react';
import assets from '../assets/assets';
import { formatMessageTime } from '../lib/utils';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages, deleteMessage } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);

  const scrollEnd = useRef();
  const [input, setInput] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    if (selectedUser?.blocked) {
      toast.error("Cannot send message to a blocked user");
      return;
    }
    await sendMessage({ text: input.trim(), replyTo: replyingTo?._id });
    setInput("");
    setReplyingTo(null);
  };

  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (selectedUser?.blocked) {
      toast.error("Cannot send message to a blocked user");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result, replyTo: replyingTo?._id });
      setReplyingTo(null);
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  const handleReply = (message) => {
    setReplyingTo(message);
  };

  const cancelReply = () => {
    setReplyingTo(null);
  };

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser, getMessages]);

  return selectedUser ? (
    <div className='h-full overflow-y-auto relative backdrop-blur-lg'>
      {/*-----------header---------------*/}
      <div className='flex items-center gap-2 sm:gap-3 py-2 sm:py-3 px-2 sm:px-4 border-b border-stone-500'>
        <img src={selectedUser.profilePic || assets.avatar_icon} alt="" className="w-6 sm:w-8 rounded-full" />
        <p className='flex-1 text-base sm:text-lg text-white flex items-center gap-1 sm:gap-2'>
          {selectedUser.fullName}
          {onlineUsers.includes(selectedUser._id) && <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500"></span>}
          {selectedUser.blocked && <span className="text-red-500 text-xs sm:text-sm">Blocked</span>}
        </p>
        <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} alt="" className='md:hidden w-5 sm:w-7' />
        <img src={assets.help_icon} alt="" className='max-md:hidden w-4 sm:w-5' />
      </div>

      {/*-----------chat area---------------*/}
      <div className='flex flex-col h-[calc(100%-110px)] sm:h-[calc(100%-120px)] overflow-y-auto p-2 sm:p-3 pb-4 sm:pb-6'>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-1 sm:gap-2 justify-end ${msg.senderId._id !== authUser._id ? 'flex-row-reverse' : ''}`}
          >
            <div className="relative group">
              {msg.image ? (
                <img src={msg.image} alt="" className='max-w-[150px] sm:max-w-[200px] md:max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-6 sm:mb-8' />
              ) : (
                <div className='mb-6 sm:mb-8'>
                  {msg.replyTo && (
                    <div className='bg-gray-700/50 p-1 sm:p-2 rounded-t-lg text-xs sm:text-sm text-gray-300'>
                      <p>
                        Replying to {msg.replyTo.senderId._id === authUser._id ? 'You' : selectedUser.fullName}:
                      </p>
                      {msg.replyTo.image ? (
                        <img src={msg.replyTo.image} alt="" className='max-w-[80px] sm:max-w-[100px] rounded mt-1' />
                      ) : (
                        <p className='truncate max-w-[150px] sm:max-w-[200px]'>{msg.replyTo.text}</p>
                      )}
                    </div>
                  )}
                  <p className={`p-1 sm:p-2 max-w-[150px] sm:max-w-[180px] md:max-w-[200px] text-xs sm:text-sm font-light rounded-lg break-all bg-violet-500/30
                    text-white ${msg.senderId._id === authUser._id ? 'rounded-br-none' : 'rounded-bl-none'}`}>
                    {msg.text}
                  </p>
                </div>
              )}
              {/* Hover menu for Reply/Delete */}
              {msg.senderId._id === authUser._id && !msg.isDeleted && (
                <div className='absolute top-0 right-0 bg-gray-800 text-white text-xs sm:text-sm rounded hidden group-hover:block'>
                  <button
                    onClick={() => handleReply(msg)}
                    className='block px-1 sm:px-2 py-1 hover:bg-gray-700'
                  >
                    Reply
                  </button>
                  <button
                    onClick={() => deleteMessage(msg._id)}
                    className='block px-1 sm:px-2 py-1 hover:bg-gray-700'
                  >
                    Delete
                  </button>
                </div>
              )}
              {msg.senderId._id !== authUser._id && !msg.isDeleted && (
                <div className='absolute top-0 left-0 bg-gray-800 text-white text-xs sm:text-sm rounded hidden group-hover:block'>
                  <button
                    onClick={() => handleReply(msg)}
                    className='block px-1 sm:px-2 py-1 hover:bg-gray-700'
                  >
                    Reply
                  </button>
                </div>
              )}
            </div>
            <div className="text-center text-xs sm:text-sm">
              <img
                src={msg.senderId._id === authUser._id ? authUser?.profilePic || assets.avatar_icon : selectedUser?.profilePic || assets.avatar_icon}
                alt=""
                className='w-6 sm:w-7 rounded-full'
              />
              <p className='text-gray-500'>{formatMessageTime(msg.createdAt)}</p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      {/*=============bottom area====================*/}
      <div className='absolute bottom-0 left-0 right-0 flex items-center gap-2 sm:gap-3 p-2 sm:p-3'>
        <div className='flex-1 flex flex-col'>
          {replyingTo && (
            <div className='bg-gray-700/50 p-1 sm:p-2 rounded-t-lg text-xs sm:text-sm text-gray-300 flex items-center'>
              <p className='flex-1 truncate'>
                Replying to {replyingTo.senderId._id === authUser._id ? 'You' : selectedUser.fullName}: {replyingTo.text || 'Image'}
              </p>
              <button onClick={cancelReply} className='text-red-500 text-xs sm:text-sm'>Cancel</button>
            </div>
          )}
          <div className="flex items-center bg-gray-100/12 px-2 sm:px-3 rounded-full">
            {/* Input */}
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onKeyDown={(e) => e.key === "Enter" ? handleSendMessage(e) : null}
              type="text"
              placeholder={
                selectedUser?.blocked
                  ? "Cannot message a blocked user"
                  : replyingTo
                  ? "Type your reply..."
                  : "Send a message"
              }
              className="flex-1 text-xs sm:text-sm p-2 sm:p-3 border-none rounded-lg outline-none text-white placeholder-gray-400"
              disabled={selectedUser?.blocked}
            />

            {/* Hidden file input */}
            <input
              onChange={handleSendImage}
              type="file"
              id="image"
              accept="image/png,image/jpeg"
              hidden
              disabled={selectedUser?.blocked}
            />

            {/* Image upload trigger */}
            <label
              htmlFor={typeof window !== "undefined" && !window.flutterImagePicker ? "image" : undefined}
              onClick={() => {
                if (typeof window !== "undefined" && typeof window.flutterImagePicker !== "undefined") {
                  window.flutterImagePicker.postMessage("pickImage");
                }
              }}
            >
              <img
                src={assets.gallery_icon}
                alt="Upload"
                className={`w-4 sm:w-5 mr-1 sm:mr-2 ${
                  selectedUser?.blocked ? "opacity-50" : "cursor-pointer"
                }`}
              />
            </label>
          </div>
        </div>

        {/* Send Button */}
        <img
          onClick={handleSendMessage}
          src={assets.send_button}
          alt=""
          className={`w-6 sm:w-7 ${selectedUser?.blocked ? 'opacity-50' : 'cursor-pointer'}`}
        />
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 md:min-w-[300px]'>
      <video
        src={assets.Message}
        alt=""
        className='max-w-[150px] sm:max-w-[200px] md:max-w-[250px] rounded-lg'
        autoPlay
        loop
        muted
        onError={(e) => console.error('Video failed to load:', e)}
      >
        <source src={assets.Sample} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p className='text-base sm:text-lg font-medium text-white'>Feel free to chat</p>
    </div>
  );
};

export default ChatContainer;
