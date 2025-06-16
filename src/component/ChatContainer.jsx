import React, { useEffect, useRef, useState, useContext } from 'react';
import assets from '../assets/assets';
import { formatMessageTime } from '../lib/utils';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

// Placeholder SVG icons (base64) for single and double checkmarks
const singleCheckIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzljYTViOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNiAxMkwxMCAxNiAxOCA4IiBmaWxsPSJub25lIiBzdHJva2U9IiM5Y2E1YjgiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==';
const doubleCheckIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzljYTViOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNiAxMkwxMCAxNiAxOCA4IiBmaWxsPSJub25lIiBzdHJva2U9IiM9Y2E1YjgiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik0xMCAxMkwxNCAxNiAyMiA4IiBmaWxsPSJub25lIiBzdHJva2U9IiM5Y2E1YjgiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==';

const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages, deleteMessage } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);

  const scrollEnd = useRef();
  const scrollStart = useRef();
  const messageContainerRef = useRef();
  const [input, setInput] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

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
    setIsUserScrolling(false); // Allow auto-scroll after sending a message
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
      setIsUserScrolling(false); // Allow auto-scroll after sending an image
    };
    reader.readAsDataURL(file);
  };

  const handleReply = (message) => setReplyingTo(message);
  const cancelReply = () => setReplyingTo(null);

  // Scroll to first message
  const scrollToFirst = () => {
    if (scrollStart.current) {
      scrollStart.current.scrollIntoView({ behavior: 'smooth' });
      setIsUserScrolling(true);
    }
  };

  // Scroll to last message
  const scrollToLast = () => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: 'smooth' });
      setIsUserScrolling(false);
    }
  };

  // Detect manual scrolling or touch to prevent auto-scroll
  useEffect(() => {
    const container = messageContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10; // 10px tolerance
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

  // Fetch messages when user is selected
  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
      // Do not reset isUserScrolling here to prevent auto-scroll after interaction
    }
  }, [selectedUser, getMessages]);

  // Auto-scroll to latest message if not manually scrolling
  useEffect(() => {
    if (!isUserScrolling && scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isUserScrolling]);

  return selectedUser ? (
    <div className="h-full overflow-y-auto relative backdrop-blur-lg">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 py-2 sm:py-3 px-4 sm:px-6 border-b border-stone-500">
        <img src={selectedUser.profilePic || assets.avatar_icon} alt="" className="w-6 sm:w-8 rounded-full" />
        <p className="flex-1 text-base sm:text-lg text-white flex items-center gap-1 sm:gap-2">
          {selectedUser.fullName}
          {onlineUsers.includes(selectedUser._id) && <span className="w-2 h-2 rounded-full bg-green-500"></span>}
          {selectedUser.blocked && <span className="text-red-500 text-xs sm:text-sm">Blocked</span>}
        </p>
        <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} alt="" className="md:hidden w-5 sm:w-7 cursor-pointer" />
      </div>

      {/* Scrollable Message Container */}
      <div
        ref={messageContainerRef}
        className="flex flex-col h-[calc(100%-110px)] sm:h-[calc(100%-120px)] overflow-y-auto p-4 sm:p-6 pb-16 sm:pb-12 scroll-smooth"
      >
        {/* Dummy div for scrolling to the top */}
        <div ref={scrollStart} />

        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex items-end gap-2 sm:gap-3 mb-4 ${
              msg.senderId._id === authUser._id ? 'justify-end flex-row-reverse' : 'justify-start flex-row'
            }`}
          >
            <div className="text-center text-xs sm:text-sm">
              <img
                src={
                  msg.senderId._id === authUser._id
                    ? authUser?.profilePic || assets.avatar_icon
                    : selectedUser?.profilePic || assets.avatar_icon
                }
                alt=""
                className="w-6 sm:w-7 rounded-full"
              />
              <p className="text-gray-500">{formatMessageTime(msg.createdAt)}</p>
            </div>
            <div className="relative group">
              {msg.image ? (
                <div className="flex flex-col">
                  <img
                    src={msg.image}
                    alt=""
                    className="max-w-[150px] sm:max-w-[200px] md:max-w-[230px] border border-gray-700 rounded-lg mb-2"
                  />
                  <div
                    className={`flex items-center gap-1 text-xs text-gray-300 mt-1 ${
                      msg.senderId._id === authUser._id ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <span>{msg.seen ? 'Seen' : 'Send'}</span>
                    <img
                      src={msg.seen ? doubleCheckIcon : singleCheckIcon}
                      alt={msg.seen ? 'Seen' : 'Send'}
                      className="w-4 h-4"
                      onError={() => console.error(`${msg.seen ? 'Double' : 'Single'} check icon failed to load`)}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col mb-8 sm:mb-10">
                  {msg.replyTo && (
                    <div className="bg-gray-700/50 p-2 sm:p-3 rounded-t-lg text-xs sm:text-sm text-gray-300">
                      <p>
                        Replying to {msg.replyTo.senderId._id === authUser._id ? 'You' : selectedUser.fullName}:
                      </p>
                      {msg.replyTo.image ? (
                        <img src={msg.replyTo.image} alt="" className="max-w-[100px] rounded mt-1" />
                      ) : (
                        <p className="truncate max-w-[200px]">{msg.replyTo.text}</p>
                      )}
                    </div>
                  )}
                  <p
                    className={`p-3 max-w-[200px] sm:max-w-[250px] text-sm font-light rounded-lg break-all bg-violet-500/30 text-white 
                      ${msg.senderId._id === authUser._id ? 'rounded-br-none' : 'rounded-bl-none'}`}
                  >
                    {msg.text}
                  </p>
                  <div
                    className={`flex items-center gap-1 text-xs text-gray-300 mt-1 ${
                      msg.senderId._id === authUser._id ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <span>{msg.seen ? 'Seen' : 'Send'}</span>
                    <img
                      src={msg.seen ? doubleCheckIcon : singleCheckIcon}
                      alt={msg.seen ? 'Seen' : 'Send'}
                      className="w-4 h-4"
                      onError={() => console.error(`${msg.seen ? 'Double' : 'Single'} check icon failed to load`)}
                    />
                  </div>
                </div>
              )}

              {!msg.isDeleted && (
                <div
                  className={`absolute top-0 ${
                    msg.senderId._id === authUser._id ? 'right-0' : 'left-0'
                  } bg-gray-800 text-white text-xs sm:text-sm rounded hidden group-hover:block`}
                >
                  <button onClick={() => handleReply(msg)} className="block px-3 py-1 hover:bg-gray-700">
                    Reply
                  </button>
                  {msg.senderId._id === authUser._id && (
                    <button onClick={() => deleteMessage(msg._id)} className="block px-3 py-1 hover:bg-gray-700">
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      {/* Scroll Control Buttons */}
      <div className="absolute bottom-20 right-4 flex flex-col gap-2">
        <button
          onClick={scrollToFirst}
          className="p-2 bg-violet-500 text-white rounded-full hover:bg-violet-600 text-sm"
        >
          ↑ Top
        </button>
        <button
          onClick={scrollToLast}
          className="p-2 bg-violet-500 text-white rounded-full hover:bg-violet-600 text-sm"
        >
          ↓ Bottom
        </button>
      </div>

      {/* Message Input */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
        <div className="flex-1 flex flex-col">
          {replyingTo && (
            <div className="bg-gray-700/50 p-3 rounded-t-lg text-sm text-gray-300 flex items-center">
              <p className="flex-1 truncate">
                Replying to {replyingTo.senderId._id === authUser._id ? 'You' : selectedUser.fullName}: {replyingTo.text || 'Image'}
              </p>
              <button onClick={cancelReply} className="text-red-500 text-sm">Cancel</button>
            </div>
          )}

          <div className="flex items-center bg-gray-100/12 px-4 rounded-full">
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

            <input
              type="file"
              id="image"
              accept="image/png, image/jpeg"
              hidden
              onChange={handleSendImage}
              disabled={selectedUser?.blocked}
            />

            <label htmlFor="image">
              <img
                src={assets.gallery_icon}
                alt="Upload"
                className={`w-5 mr-2 ${selectedUser?.blocked ? "opacity-50" : "cursor-pointer"}`}
              />
            </label>
          </div>
        </div>

        <img
          onClick={handleSendMessage}
          src={assets.send_button}
          alt="Send"
          className={`w-7 ${selectedUser?.blocked ? "opacity-50" : "cursor-pointer"}`}
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 md:min-w-[300px] h-full">
      <video
        src={assets.Message}
        className="max-h-[200px] sm:max-h-[250px] md:max-h-[300px] w-auto rounded-lg mx-auto"
        autoPlay
        loop
        muted
        onError={(e) => console.error('Video failed to load:', e)}
      >
        <source src={assets.Sample} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p className="text-lg font-medium text-white text-center">Feel free to chat</p>
    </div>
  );
};

export default ChatContainer;