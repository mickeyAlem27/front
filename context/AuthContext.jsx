import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import io from "socket.io-client";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/check`, {
        headers: { token },
      });
      if (data.success) {
        setAuthUser(data.user);
      } else {
        localStorage.removeItem("token");
        setAuthUser(null);
      }
    } catch (error) {
      console.error("Check auth error:", error.message);
      localStorage.removeItem("token");
      setAuthUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (type, { fullName, email, password, bio }) => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/${type}`, {
        fullName,
        email,
        password,
        bio,
      });
      if (data.success) {
        localStorage.setItem("token", data.token);
        setAuthUser(data.userData);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("token");
      setAuthUser(null);
      setOnlineUsers([]);
      socket?.disconnect();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateProfile = async ({ fullName, bio, profilePic }) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/update-profile`,
        { fullName, bio, profilePic },
        { headers: { token: localStorage.getItem("token") } }
      );
      if (data.success) {
        setAuthUser(data.user);
        toast.success("Profile updated successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (authUser && token) {
      const newSocket = io(import.meta.env.VITE_BACKEND_URL, {
        query: { userId: authUser._id },
        transports: ["websocket"],
      });
      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => newSocket.disconnect();
    }
  }, [authUser]);

  const value = {
    authUser,
    login,
    logout,
    socket,
    onlineUsers,
    updateProfile,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};