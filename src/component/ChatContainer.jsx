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
    if (input.trim() === '') return;
    if (selectedUser?.blocked) {
      toast.error('Cannot send message to a blocked user');
      return;
    }
    await sendMessage({ text: input.trim(), replyTo: replyingTo?._id });
    setInput('');
    setReplyingTo(null);
  };

  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    if (selectedUser?.blocked) {
      toast.error('Cannot send message to a blocked user');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result, replyTo: replyingTo?._id });
      setReplyingTo(null);
      e.target.value = '';
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
      scrollEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return selectedUser ? (
    <div className="relative flex h-full flex-col overflow-y-auto bg-gray-800/50">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-500 px-4 py-3">
        <img
          src={selectedUser.profilePic || assets.avatar_icon}
          alt=""
          className="h-8 w-8 rounded-full"
        />
        <p className="flex flex-1 items-center gap-2 text-lg text-white">
          {selectedUser.fullName}
          {onlineUsers.includes(selectedUser._id) && (
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
          )}
          {selectedUser.blocked && <span className="text-xs text-red-500">Blocked</span>}
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt=""
          className="h-6 w-6 md:hidden"
        />
        <img src={assets.help_icon} alt="" className="h-5 w-5 max-md:hidden" />
      </div>
{/* Chat Area */}
<div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4 sm:p-6">
  {messages.map((msg, index) => (
    <div
      key={index}
      className={`flex items-end gap-3 ${
        msg.senderId._id === authUser._id ? 'justify-end' : 'justify-start'
      } max-w-full`}
    >
      <div className="group relative flex flex-col">
        {msg.image ? (
          <img
            src={msg.image}
            alt=""
            className="w-full max-w-[70%] sm:max-w-[50%] md:max-w-[40%] lg:max-w-[30%] rounded-xl border border-gray-600 mb-4"
          />
        ) : (
          <div className="mb-4">
            {msg.replyTo && (
              <div className="rounded-t-lg bg-gray-700/60 p-2.5 text-xs text-gray-300 max-w-full sm:max-w-[70%]">
                <p>
                  Replying to{' '}
                  {msg.replyTo.senderId._id === authUser._id
                    ? 'You'
                    : selectedUser.fullName}
                  :
                </p>
                {msg.replyTo.image ? (
                  <img src={msg.replyTo.image} alt="" className="mt-1 w-full max-w-[100px] rounded" />
                ) : (
                  <p className="w-full max-w-[90%] truncate">{msg.replyTo.text}</p>
                )}
              </div>
            )}
            <p
              className={`w-full max-w-[70%] sm:max-w-[60%] md:max-w-[50%] lg:max-w-[40%] break-words rounded-xl p-3 text-sm text-white ${
                msg.senderId._id === authUser._id
                  ? 'bg-violet-600/40 rounded-br-none'
                  : 'bg-gray-700/60 rounded-bl-none'
              }`}
            >
              {msg.text}
            </p>
          </div>
        )}
        {/* Hover Menu */}
        {msg.senderId._id === authUser._id && !msg.isDeleted && (
          <div className="absolute right-0 top-0 hidden rounded bg-gray-800 text-xs text-white group-hover:block">
            <button
              onClick={() => handleReply(msg)}
              className="block px-2 py-1 hover:bg-gray-700"
            >
              Reply
            </button>
            <button
              onClick={() => deleteMessage(msg._id)}
              className="block px-2 py-1 hover:bg-gray-700"
            >
              Delete
            </button>
          </div>
        )}
        {msg.senderId._id !== authUser._id && !msg.isDeleted && (
          <div className="absolute left-0 top-0 hidden rounded bg-gray-800 text-xs text-white group-hover:block">
            <button
              onClick={() => handleReply(msg)}
              className="block px-2 py-1 hover:bg-gray-700"
            >
              Reply
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center text-center text-xs">
        <img
          src={
            msg.senderId._id === authUser._id
              ? authUser?.profilePic || assets.avatar_icon
              : selectedUser?.profilePic || assets.avatar_icon
          }
          alt=""
          className="h-6 w-6 sm:h-7 sm:w-7 rounded-full"
        />
        <p className="text-gray-400 mt-1">{formatMessageTime(msg.createdAt)}</p>
      </div>
    </div>
  ))}
  <div ref={scrollEnd}></div>
</div>
      {/* Bottom Input Area */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3">
        <div className="flex flex-1 flex-col">
          {replyingTo && (
            <div className="flex items-center rounded-t-lg bg-gray-700/50 p-2 text-xs text-gray-300">
              <p className="flex-1">
                Replying to{' '}
                {replyingTo.senderId._id === authUser._id ? 'You' : selectedUser.fullName}:{' '}
                {replyingTo.text || 'Image'}
              </p>
              <button onClick={cancelReply} className="text-red-500">
                Cancel
              </button>
            </div>
          )}
          <div className="flex items-center rounded-full bg-gray-100/10 px-3">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onKeyDown={(e) => (e.key === 'Enter' ? handleSendMessage(e) : null)}
              type="text"
              placeholder={
                selectedUser?.blocked
                  ? 'Cannot message a blocked user'
                  : replyingTo
                    ? 'Type your reply...'
                    : 'Send a message'
              }
              className="flex-1 rounded-lg border-none bg-transparent p-3 text-sm text-white placeholder-gray-400 outline-none"
              disabled={selectedUser?.blocked}
            />
            <input
              onChange={handleSendImage}
              type="file"
              id="image"
              accept="image/png,image/jpeg"
              hidden
              disabled={selectedUser?.blocked}
            />
            <label htmlFor="image">
              <img
                src={assets.gallery_icon}
                alt=""
                className={`mr-2 h-5 w-5 ${selectedUser?.blocked ? 'opacity-50' : 'cursor-pointer'}`}
              />
            </label>
          </div>
        </div>
        <img
          onClick={handleSendMessage}
          src={assets.send_button}
          alt=""
          className={`h-7 w-7 ${selectedUser?.blocked ? 'opacity-50' : 'cursor-pointer'}`}
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 bg-white/10 text-gray-500 md:flex">
      <video
        src={assets.Message}
        className="max-w-[240px] rounded-lg"
        autoPlay
        loop
        muted
        onError={(e) => console.error('Video failed to load:', e)}
      >
        <source src={assets.Sample} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p className="text-lg font-medium text-white">Feel free to chat</p>
    </div>
  );
};

export default ChatContainer;