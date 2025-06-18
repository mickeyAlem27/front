import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import { debounce } from "lodash";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});
  const { socket, authUser } = useContext(AuthContext);

  const getUsers = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/messages/users`, {
        headers: { token: localStorage.getItem("token") },
      });
      if (data.success) {
        // Map users to include lastMessageTime
        const usersWithLastMessageTime = await Promise.all(
          data.users.map(async (user) => {
            try {
              const { data: messageData } = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/messages/${user._id}`,
                { headers: { token: localStorage.getItem("token") } }
              );
              if (messageData.success && messageData.messages.length > 0) {
                const lastMessage = messageData.messages[messageData.messages.length - 1];
                return { ...user, lastMessageTime: lastMessage.createdAt };
              }
              return { ...user, lastMessageTime: null };
            } catch (error) {
              console.error(`Error fetching messages for user ${user._id}:`, error);
              return { ...user, lastMessageTime: null };
            }
          })
        );
        setUsers(usersWithLastMessageTime);
        setUnseenMessages(data.unseenMessages);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const fetchUnseenMessages = debounce(async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/messages/unseen`, {
        headers: { token: localStorage.getItem("token") },
      });
      if (data.success) {
        setUnseenMessages(data.unseenMessages);
      }
    } catch (error) {
      console.error("Fetch unseen error:", error.response?.data || error.message);
    }
  }, 1000);

  const searchUsers = async (query) => {
    if (!query) return [];
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/search?query=${encodeURIComponent(query)}`,
        { headers: { token: localStorage.getItem("token") } }
      );
      if (data.success) {
        return data.users;
      } else {
        toast.error(data.message);
        return [];
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to search users");
      return [];
    }
  };

  const addContact = async (contactId) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/add-contact`,
        { contactId },
        { headers: { token: localStorage.getItem("token") } }
      );
      if (data.success) {
        await getUsers();
        return data.contacts;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error adding contact:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const removeContact = async (contactId) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/remove-contact`,
        { contactId },
        { headers: { token: localStorage.getItem("token") } }
      );
      if (data.success) {
        setUsers(data.contacts);
        if (selectedUser?._id === contactId) {
          setSelectedUser(null);
        }
        await getUsers();
        toast.success("Contact removed successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error removing contact:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const blockUser = async (userId) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/block-user`,
        { userId },
        { headers: { token: localStorage.getItem("token") } }
      );
      if (data.success) {
        await getUsers();
        if (selectedUser?._id === userId) {
          setSelectedUser({ ...selectedUser, blocked: true });
        }
        toast.success("User blocked successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error blocking user:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const unblockUser = async (userId) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/unblock-user`,
        { userId },
        { headers: { token: localStorage.getItem("token") } }
      );
      if (data.success) {
        await getUsers();
        if (selectedUser?._id === userId) {
          setSelectedUser({ ...selectedUser, blocked: false });
        }
        toast.success("User unblocked successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error unblocking user:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const getMessages = async (userId) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/messages/${userId}`,
        { headers: { token: localStorage.getItem("token") } }
      );
      if (data.success) {
        setMessages(data.messages);
        for (const msg of data.messages) {
          if (!msg.seen && msg.senderId._id !== authUser._id) {
            try {
              await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/messages/mark/${msg._id}`,
                {},
                { headers: { token: localStorage.getItem("token") } }
              );
              console.log(`Marked message ${msg._id} as seen`);
            } catch (error) {
              console.error(`Failed to mark message ${msg._id} as seen:`, error.response?.data || error.message);
            }
          }
        }
        setUnseenMessages((prev) => ({
          ...prev,
          [userId]: 0,
        }));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const sendMessage = async ({ text, image, replyTo }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/messages/send/${selectedUser._id}`,
        { text, image, replyTo },
        { headers: { token: localStorage.getItem("token") } }
      );
      if (data.success) {
        setMessages((prevMessages) => [...prevMessages, data.newMessage]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const deleteMessage = async (messageId, deleteFor = 'me') => {
  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/messages/${messageId}?deleteFor=${deleteFor}`,
      { headers: { token: localStorage.getItem("token") } }
    );
    if (data.success) {
      setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== messageId));
      toast.success("Message deleted successfully");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error("Error deleting message:", error);
    toast.error(error.response?.data?.message || error.message);
  }
};

  const subscribeToMessages = () => {
    if (!socket) {
      console.warn("Socket not initialized");
      return;
    }

    socket.on("newMessage", ({ message, senderId, receiverId }) => {
      console.log("Received newMessage:", message._id, "from", senderId);
      if (selectedUser && senderId === selectedUser._id && receiverId === authUser._id) {
        setMessages((prevMessages) => [...prevMessages, message]);
        axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/messages/mark/${message._id}`,
          {},
          { headers: { token: localStorage.getItem("token") } }
        )
          .then(() => console.log(`Marked new message ${message._id} as seen`))
          .catch((error) => console.error("Error marking new message as seen:", error));
        setUnseenMessages((prev) => ({
          ...prev,
          [senderId]: 0,
        }));
      } else if (receiverId === authUser._id) {
        fetchUnseenMessages();
        const sender = users.find((user) => user._id === senderId);
        toast(`${sender?.fullName || "Someone"} sent you a message`, {
          icon: "💬",
          style: { background: "#282446", color: "white" },
        });
        // Update lastMessageTime for the sender
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === senderId ? { ...user, lastMessageTime: message.createdAt } : user
          )
        );
      }
    });

    socket.on("messageSeen", (updatedMessage) => {
      console.log("Received messageSeen:", updatedMessage._id, "seen:", updatedMessage.seen);
      setMessages((prevMessages) =>
        prevMessages.map((msg) => (msg._id === updatedMessage._id ? updatedMessage : msg))
      );
    });

    socket.on("messageDeleted", (messageId) => {
      console.log("Received messageDeleted:", messageId);
      setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== messageId));
    });
  };

  const unsubscribeFromMessages = () => {
    if (socket) {
      socket.off("newMessage");
      socket.off("messageSeen");
      socket.off("messageDeleted");
    }
  };

  useEffect(() => {
    if (authUser) {
      getUsers();
      fetchUnseenMessages();
    }
  }, [authUser]);

  useEffect(() => {
    if (socket) {
      subscribeToMessages();
      socket.on("connect", () => {
        console.log("Socket connected");
        fetchUnseenMessages();
      });
      return () => {
        socket.off("connect");
        unsubscribeFromMessages();
      };
    }
  }, [socket, selectedUser, authUser, users]);

  const value = {
    messages,
    users,
    selectedUser,
    getUsers,
    getMessages,
    sendMessage,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
    searchUsers,
    addContact,
    removeContact,
    blockUser,
    unblockUser,
    deleteMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};