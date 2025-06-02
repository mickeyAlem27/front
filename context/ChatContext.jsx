import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]); // Stores contacts only
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});
  const { socket, authUser } = useContext(AuthContext);

  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/messages/users", {
        headers: { token: localStorage.getItem("token") },
      });
      if (data.success) {
        setUsers(data.users); // Only contacts
        setUnseenMessages(data.unseenMessages);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchUnseenMessages = async () => {
    try {
      const { data } = await axios.get("/api/messages/unseen", {
        headers: { token: localStorage.getItem("token") },
      });
      if (data.success) {
        setUnseenMessages(data.unseenMessages);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const searchUsers = async (query) => {
    try {
      if (!query) return [];
      console.log("Searching users with query:", query);
      const { data } = await axios.get(`/api/users/search?query=${encodeURIComponent(query)}`, {
        headers: { token: localStorage.getItem("token") },
      });
      console.log("Search response:", data);
      if (data.success) {
        return data.users;
      } else {
        toast.error(data.message);
        return [];
      }
    } catch (error) {
      console.error("Search users error:", error.response?.status, error.message);
      toast.error("Failed to search users");
      return [];
    }
  };

  const addContact = async (contactId) => {
    try {
      const { data } = await axios.post("/api/users/add-contact", { contactId }, {
        headers: { token: localStorage.getItem("token") },
      });
      if (data.success) {
        await getUsers(); // Refresh contacts list
        return data.contacts;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeContact = async (contactId) => {
    try {
      const { data } = await axios.post("/api/users/remove-contact", { contactId }, {
        headers: { token: localStorage.getItem("token") },
      });
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
      toast.error(error.message);
    }
  };

  const blockUser = async (userId) => {
    try {
      const { data } = await axios.post("/api/users/block-user", { userId }, {
        headers: { token: localStorage.getItem("token") },
      });
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
      toast.error(error.message);
    }
  };

  const unblockUser = async (userId) => {
    try {
      const { data } = await axios.post("/api/users/unblock-user", { userId }, {
        headers: { token: localStorage.getItem("token") },
      });
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
      toast.error(error.message);
    }
  };

  const getMessages = async (userId) => {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`, {
        headers: { token: localStorage.getItem("token") },
      });
      if (data.success) {
        setMessages(data.messages);
        data.messages.forEach(async (msg) => {
          if (!msg.seen && msg.senderId._id !== authUser._id) {
            await axios.put(`/api/messages/mark/${msg._id}`, {}, {
              headers: { token: localStorage.getItem("token") },
            });
          }
        });
        setUnseenMessages((prev) => ({
          ...prev,
          [userId]: 0,
        }));
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sendMessage = async ({ text, image, replyTo }) => {
    try {
      const { data } = await axios.post(`/api/messages/send/${selectedUser._id}`, { text, image, replyTo }, {
        headers: { token: localStorage.getItem("token") },
      });
      if (data.success) {
        setMessages((prevMessages) => [...prevMessages, data.newMessage]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      const { data } = await axios.delete(`/api/messages/${messageId}`, {
        headers: { token: localStorage.getItem("token") },
      });
      if (data.success) {
        setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== messageId));
        toast.success("Message deleted successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const subscribeToMessages = () => {
    if (!socket) return;

    socket.on("newMessage", ({ message, senderId, receiverId }) => {
      if (selectedUser && senderId === selectedUser._id && receiverId === authUser._id) {
        setMessages((prevMessages) => [...prevMessages, message]);
        axios.put(`/api/messages/mark/${message._id}`, {}, {
          headers: { token: localStorage.getItem("token") },
        });
        setUnseenMessages((prev) => ({
          ...prev,
          [senderId]: 0,
        }));
      } else if (receiverId === authUser._id) {
        setUnseenMessages((prev) => ({
          ...prev,
          [senderId]: (prev[senderId] || 0) + 1,
        }));
        const sender = users.find((user) => user._id === senderId);
        toast(`${sender?.fullName || "Someone"} sent you a message`, {
          icon: "💬",
          style: {
            background: "#282142",
            color: "#fff",
          },
        });
      }
    });

    socket.on("messageDeleted", (messageId) => {
      setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== messageId));
    });
  };

  const unsubscribeFromMessages = () => {
    if (socket) {
      socket.off("newMessage");
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
      socket.on("connect", fetchUnseenMessages);
      return () => {
        socket.off("connect", fetchUnseenMessages);
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

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};
