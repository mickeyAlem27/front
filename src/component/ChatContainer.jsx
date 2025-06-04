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
  const [replyingTo, setReplyingTo] = useState(null); // Track message being replied to

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

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return selectedUser ? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>
      {/*-----------header---------------*/}
      <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
        <img src={selectedUser.profilePic || assets.avatar_icon} alt="" className="w-8 rounded-full" />
        <p className='flex-1 text-lg text-white flex items-center gap-2'>
          {selectedUser.fullName}
          {onlineUsers.includes(selectedUser._id) && <span className="w-2 h-2 rounded-full bg-green-500"></span>}
          {selectedUser.blocked && <span className="text-red-500 text-xs">Blocked</span>}
        </p>
        <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} alt="" className='md:hidden max-w-7' />
        <img src={assets.help_icon} alt="" className='max-md:hidden max-w-5' />
      </div>

      {/*-----------chat area---------------*/}
      <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 justify-end ${msg.senderId._id !== authUser._id ? 'flex-row-reverse' : ''}`}
          >
            <div className="relative group">
              {msg.image ? (
                <img src={msg.image} alt="" className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8' />
              ) : (
                <div className='mb-8'>
                  {msg.replyTo && (
                    <div className='bg-gray-700/50 p-2 rounded-t-lg text-xs text-gray-300'>
                      <p>
                        Replying to {msg.replyTo.senderId._id === authUser._id ? 'You' : selectedUser.fullName}:
                      </p>
                      {msg.replyTo.image ? (
                        <img src={msg.replyTo.image} alt="" className='max-w-[100px] rounded mt-1' />
                      ) : (
                        <p className='truncate max-w-[200px]'>{msg.replyTo.text}</p>
                      )}
                    </div>
                  )}
                  <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg break-all bg-violet-500/30
                    text-white ${msg.senderId._id === authUser._id ? 'rounded-br-none' : 'rounded-bl-none'}`}>
                    {msg.text}
                  </p>
                </div>
              )}
              {/* Hover menu for Reply/Delete */}
              {msg.senderId._id === authUser._id && !msg.isDeleted && (
                <div className='absolute top-0 right-0 bg-gray-800 text-white text-xs rounded hidden group-hover:block'>
                  <button
                    onClick={() => handleReply(msg)}
                    className='block px-2 py-1 hover:bg-gray-700'
                  >
                    Reply
                  </button>
                  <button
                    onClick={() => deleteMessage(msg._id)}
                    className='block px-2 py-1 hover:bg-gray-700'
                  >
                    Delete
                  </button>
                </div>
              )}
              {msg.senderId._id !== authUser._id && !msg.isDeleted && (
                <div className='absolute top-0 left-0 bg-gray-800 text-white text-xs rounded hidden group-hover:block'>
                  <button
                    onClick={() => handleReply(msg)}
                    className='block px-2 py-1 hover:bg-gray-700'
                  >
                    Reply
                  </button>
                </div>
              )}
            </div>
            <div className="text-center text-xs">
              <img
                src={msg.senderId._id === authUser._id ? authUser?.profilePic || assets.avatar_icon : selectedUser?.profilePic || assets.avatar_icon}
                alt=""
                className='w-7 rounded-full'
              />
              <p className='text-gray-500'>{formatMessageTime(msg.createdAt)}</p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      {/*=============bottom area====================*/}
      <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3'>
        <div className='flex-1 flex flex-col'>
          {replyingTo && (
            <div className='bg-gray-700/50 p-2 rounded-t-lg text-xs text-gray-300 flex items-center'>
              <p className='flex-1'>
                Replying to {replyingTo.senderId._id === authUser._id ? 'You' : selectedUser.fullName}: {replyingTo.text || 'Image'}
              </p>
              <button onClick={cancelReply} className='text-red-500'>Cancel</button>
            </div>
          )}
          <div className='flex items-center bg-gray-100/12 px-3 rounded-full'>
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onKeyDown={(e) => e.key === "Enter" ? handleSendMessage(e) : null}
              type="text"
              placeholder={selectedUser?.blocked ? "Cannot message a blocked user" : replyingTo ? "Type your reply..." : "Send a message"}
              className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400'
              disabled={selectedUser?.blocked}
            />
            <input onChange={handleSendImage} type="file" id='image' accept='image/png,image/jpeg' hidden disabled={selectedUser?.blocked} />
            <label htmlFor="image">
              <img src={assets.gallery_icon} alt="" className={`w-5 mr-2 ${selectedUser?.blocked ? 'opacity-50' : 'cursor-pointer'}`} />
            </label>
          </div>
        </div>
        <img
          onClick={handleSendMessage}
          src={assets.send_button}
          alt=""
          className={`w-7 ${selectedUser?.blocked ? 'opacity-50' : 'cursor-pointer'}`}
        />
      </div>
    </div>
  ) : (
   <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
  <video
    src={assets.Message}
    alt=""
    className='max-w-60 rounded-lg'
  
    autoPlay
    loop
    muted
    onError={(e) => console.error('Video failed to load:', e)}
  >
    <source src={assets.Sample} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  <p className='text-lg font-medium text-white'>Feel free to chat</p>
</div>
  );
};

export default ChatContainer;