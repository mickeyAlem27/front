import React, { useEffect, useRef, useState, useContext } from 'react';
import assets from '../assets/assets';
import { formatMessageTime } from '../lib/utils';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

// Placeholder SVG icons (base64) for single and double checkmarks
const singleCheckIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzljYTViOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNiAxMkwxMCAxNiAxOCA4IiBmaWxsPSJub25lIiBzdHJva2U9IiM5Y2E1YjgiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==';
const doubleCheckIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzljYTViOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNiAxMmwxMCAxNiAxOCA4IiBmaWxsPSJub25lIiBzdHJva2U9IiM9Y2E1YjgiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik0xMCAxMkwxNCAxNiAyMiA4IiBmaWxsPSJub25lIiBzdHJva2U9IiM5Y2E1YjgiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==';

const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages, deleteMessage } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);

  const scrollEnd = useRef();
  const scrollStart = useRef();
  const messageContainerRef = useRef();
  const [input, setInput] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [deleteMenu, setDeleteMenu] = useState(null);

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
    setIsUserScrolling(false);
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
      setIsUserScrolling(false);
    };
    reader.readAsDataURL(file);
  };

  const handleReply = (message) => {
    setReplyingTo(message);
    setActiveMenu(null);
  };

  const cancelReply = () => {
    setReplyingTo(null);
  };

  const addEmoji = (emoji) => {
    setInput((prev) => prev + emoji);
  };

  const scrollToFirst = () => {
    if (scrollStart.current) {
      scrollStart.current.scrollIntoView({ behavior: 'smooth' });
      setIsUserScrolling(true);
    }
  };

  const scrollToLast = () => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: 'smooth' });
      setIsUserScrolling(false);
    }
  };

  const toggleMessageMenu = (messageId, e) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === messageId ? null : messageId);
    setDeleteMenu(null);
  };

  const toggleDeleteMenu = (messageId, e) => {
    e.stopPropagation();
    setDeleteMenu(deleteMenu === messageId ? null : messageId);
  };

  const handleDelete = async (messageId, deleteFor, e) => {
    e.stopPropagation();
    try {
      await deleteMessage(messageId, deleteFor);
      setActiveMenu(null);
      setDeleteMenu(null);
      toast.success(`Message deleted ${deleteFor === 'me' ? 'for you' : 'for everyone'}`);
    } catch (error) {
      toast.error("Failed to delete message");
    }
  };

  useEffect(() => {
    const container = messageContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setIsUserScrolling(!isAtBottom);
    };

    const handleTouchStart = () => {
      setIsUserScrolling(true);
    };

    container.addEventListener('scroll', handleScroll);
    container.addEventListener('touchstart', handleTouchStart);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser, getMessages]);

  useEffect(() => {
    if (!isUserScrolling && scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isUserScrolling]);

  return selectedUser ? (
    <div className="h-full overflow-y-auto relative bg-gray-900/80 backdrop-blur-lg bg-gradient-to-b from-gray-900/90 to-gray-800/90 text-white">
      {/* Header */}
      <div className="flex items-center gap-3 py-3 px-6 border-b border-gray-700/50 bg-gray-900/70 backdrop-blur-sm sticky top-0 z-10">
        <img src={selectedUser.profilePic || assets.avatar_icon} alt="" className="w-8 rounded-full border-2 border-gray-600" />
        <div className="flex-1">
          <p className="text-lg font-semibold text-white flex items-center gap-2">
            {selectedUser.fullName}
            {onlineUsers.includes(selectedUser._id) && <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>}
            {selectedUser.blocked && <span className="text-red-400 text-sm font-medium">Blocked</span>}
          </p>
        </div>
        <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} alt="" className="md:hidden w-6 cursor-pointer hover:opacity-80" />
      </div>

      {/* Scrollable Message Container */}
      <div
        ref={messageContainerRef}
        className="flex flex-col h-[calc(100%-130px)] p-6 pb-16 scroll-smooth overflow-y-auto"
      >
        <div ref={scrollStart} />

        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex items-end gap-3 mb-6 ${
              msg.senderId._id === authUser._id ? 'justify-end' : 'justify-start'
            } group relative`}
          >
            <div className="relative max-w-[70%] sm:max-w-[60%]">
              {msg.image ? (
                <div className="flex flex-col">
                  <img
                    src={msg.image}
                    alt=""
                    className="max-w-[200px] md:max-w-[250px] rounded-xl border border-gray-700/50 shadow-lg transition-transform hover:scale-105 cursor-pointer"
                    onClick={(e) => toggleMessageMenu(msg._id, e)}
                  />
                  <div
                    className={`flex items-center gap-1.5 text-xs text-gray-400 mt-2 ${
                      msg.senderId._id === authUser._id ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <span>{msg.seen ? 'Seen' : 'Sent'}</span>
                    <img
                      src={msg.seen ? doubleCheckIcon : singleCheckIcon}
                      alt={msg.seen ? 'Seen' : 'Sent'}
                      className="w-4 h-4 opacity-80"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col">
                  {msg.replyTo && (
                    <div className="bg-gray-700/30 p-3 rounded-t-xl border-l-4 border-violet-500 text-sm text-gray-300 mb-1">
                      <p className="font-medium">
                        Replying to {msg.replyTo.senderId._id === authUser._id ? 'You' : selectedUser.fullName}:
                      </p>
                      {msg.replyTo.image ? (
                        <img src={msg.replyTo.image} alt="" className="max-w-[100px] rounded mt-1" />
                      ) : (
                        <p className="truncate max-w-[200px] text-gray-400">{msg.replyTo.text}</p>
                      )}
                    </div>
                  )}
                  <p
                    className={`p-4 text-sm font-light rounded-xl break-words shadow-md transition-all duration-200 ${
                      msg.senderId._id === authUser._id
                        ? 'bg-violet-600/90 text-white rounded-br-none'
                        : 'bg-gray-700/50 text-gray-100 rounded-bl-none'
                    } hover:shadow-lg cursor-pointer`}
                    onClick={(e) => toggleMessageMenu(msg._id, e)}
                  >
                    {msg.text}
                  </p>
                  <div
                    className={`flex items-center gap-1.5 text-xs text-gray-400 mt-2 ${
                      msg.senderId._id === authUser._id ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <span>{msg.seen ? 'Seen' : 'Sent'}</span>
                    <img
                      src={msg.seen ? doubleCheckIcon : singleCheckIcon}
                      alt={msg.seen ? 'Seen' : 'Sent'}
                      className="w-4 h-4 opacity-80"
                    />
                  </div>
                </div>
              )}

              {!msg.isDeleted && activeMenu === msg._id && (
                <div
                  className={`absolute top-0 z-20 ${
                    msg.senderId._id === authUser._id ? 'right-0' : 'left-0'
                  } bg-gray-800/95 text-white text-sm rounded-lg shadow-2xl backdrop-blur-sm transition-all duration-200 ease-in-out transform ${
                    activeMenu === msg._id ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                  }`}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReply(msg);
                    }}
                    className="block px-4 py-2.5 hover:bg-violet-700/50 rounded-t-lg w-full text-left transition-colors"
                  >
                    Reply
                  </button>
                  {msg.senderId._id === authUser._id && (
                    <button
                      onClick={(e) => toggleDeleteMenu(msg._id, e)}
                      className="block px-4 py-2.5 hover:bg-violet-700/50 rounded-b-lg w-full text-left transition-colors"
                    >
                      Delete
                    </button>
                  )}
                  {msg.senderId._id === authUser._id && deleteMenu === msg._id && (
                    <div
                      className={`absolute right-0 mt-1 bg-gray-900/95 text-white text-xs rounded-lg shadow-2xl backdrop-blur-sm transition-all duration-200 ease-in-out z-30 transform ${
                        deleteMenu === msg._id ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                      }`}
                    >
                      <button
                        onClick={(e) => handleDelete(msg._id, 'me', e)}
                        className="block px-3 py-2 hover:bg-violet-600/50 rounded-t-lg w-full text-left transition-colors"
                      >
                        Delete for Me
                      </button>
                      <button
                        onClick={(e) => handleDelete(msg._id, 'everyone', e)}
                        className="block px-3 py-2 hover:bg-violet-600/50 rounded-b-lg w-full text-left transition-colors"
                      >
                        Delete for Everyone
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="text-center text-xs">
              <img
                src={
                  msg.senderId._id === authUser._id
                    ? authUser?.profilePic || assets.avatar_icon
                    : selectedUser?.profilePic || assets.avatar_icon
                }
                alt=""
                className="w-7 rounded-full border border-gray-600"
              />
              <p className="text-gray-500 mt-1">{formatMessageTime(msg.createdAt)}</p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      {/* Scroll Control Buttons */}
      <div className="absolute bottom-24 right-4 flex flex-col gap-2">
        <button
          onClick={scrollToFirst}
          className="p-2 bg-violet-600 text-white rounded-full hover:bg-violet-700 shadow-lg transition-all duration-200 hover:scale-105"
        >
          ↑
        </button>
        <button
          onClick={scrollToLast}
          className="p-2 bg-violet-600 text-white rounded-full hover:bg-violet-700 shadow-lg transition-all duration-200 hover:scale-105"
        >
          ↓
        </button>
      </div>

      {/* Message Input */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-4 p-4 bg-gray-900/70 backdrop-blur-sm border-t border-gray-700/50">
        <div className="flex-1 flex flex-col">
          {replyingTo && (
            <div className="bg-gray-700/30 p-3 rounded-t-xl border-l-4 border-violet-500 text-sm text-gray-300 flex flex-col">
              <div className="flex items-center">
                <p className="flex-1 truncate font-medium">
                  Replying to {replyingTo.senderId._id === authUser._id ? 'You' : selectedUser.fullName}: {replyingTo.text || 'Image'}
                </p>
                <button onClick={cancelReply} className="text-red-400 text-sm font-medium hover:text-red-500">Cancel</button>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              {['❤️', '👍', '😎', '🚀'].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => addEmoji(emoji)}
                  className="text-lg hover:bg-gray-600/50 p-1.5 rounded-full transition-colors"
                  disabled={selectedUser?.blocked}
                >
                  {emoji}
                </button>
              ))}
              <input
                type="file"
                id="image"
                accept="image/png, image/jpeg, image/gif"
                hidden
                onChange={handleSendImage}
                disabled={selectedUser?.blocked}
              />
              <label htmlFor="image">
                <img
                  src={assets.gallery_icon}
                  alt="Upload"
                  className={`w-5 cursor-pointer hover:opacity-80 ${selectedUser?.blocked ? "opacity-50" : ""}`}
                />
              </label>
            </div>
            <div className="flex-1 flex items-center bg-gray-800/50 px-4 rounded-full border border-gray-700/50 focus-within:border-violet-500 transition-colors">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage(e)}
                placeholder={
                  selectedUser?.blocked
                    ? "Cannot message a blocked user"
                    : replyingTo
                    ? "Type your reply..."
                    : "Send a message"
                }
                className="flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400 bg-transparent"
                disabled={selectedUser?.blocked}
              />
            </div>
            <img
              onClick={handleSendMessage}
              src={assets.send_button}
              alt="Send"
              className={`w-8 ${selectedUser?.blocked ? "opacity-50" : "cursor-pointer hover:scale-110 transition-transform"}`}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-4 text-gray-400 bg-gradient-to-b from-gray-900/90 to-gray-800/90 h-full backdrop-blur-lg">
      <video
        src={assets.Message}
        className="max-h-[250px] w-auto rounded-xl shadow-lg border border-gray-700/50"
        autoPlay
        loop
        muted
      >
        <source src={assets.Sample} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p className="text-lg font-semibold text-white">Start a conversation</p>
    </div>
  );
};

export default ChatContainer;