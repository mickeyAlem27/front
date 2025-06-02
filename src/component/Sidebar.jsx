import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import assets from "../assets/assets";

const Sidebar = () => {
  const { users, setSelectedUser, searchUsers, addContact, unseenMessages } = useContext(ChatContext);
  const { authUser, onlineUsers, logout } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Debug: Log users to check contact list
  console.log("Sidebar users:", users);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      try {
        const results = await searchUsers(query);
        const filteredResults = results.filter(
          (result) => !users.some((user) => user._id === result._id)
        );
        setSearchResults(filteredResults);
      } catch (error) {
        console.error("Search error:", error.message);
        toast.error("Failed to search users");
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleAddContact = async (contactId) => {
    try {
      await addContact(contactId);
      setSearchQuery("");
      setSearchResults([]);
      toast.success("Contact added successfully");
      // Debug: Log after adding contact
      console.log("Contact added, fetching updated users...");
    } catch (error) {
      console.error("Add contact error:", error.message);
      toast.error("Failed to add contact");
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="bg-[#282142]/80 p-2 sm:p-3 flex flex-col h-full min-w-[200px]">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base sm:text-lg text-white font-bold">Chats</h2>
        <Link to="/profile">
          <img
            src={authUser?.profilePic || assets.avatar_icon}
            alt="Profile"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
          />
        </Link>
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search users to add..."
        className="w-full p-2 sm:p-3 rounded-full bg-[#3a3558] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-violet-600 mb-3 text-xs sm:text-sm min-w-0"
      />
      {searchResults.length > 0 && (
        <div className="mb-3">
          <h3 className="text-gray-300 text-xs mb-2">Search Results</h3>
          <ul className="space-y-2">
            {searchResults.map((user) => (
              <li
                key={user._id}
                className="flex items-center justify-between p-2 bg-[#3a3558] rounded-lg min-w-0"
              >
                <div className="flex items-center min-w-0">
                  <img
                    src={user.profilePic || assets.avatar_icon}
                    alt={user.fullName}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full mr-2 flex-shrink-0"
                  />
                  <span className="text-white text-xs sm:text-sm truncate">{user.fullName}</span>
                </div>
                <button
                  onClick={() => handleAddContact(user._id)}
                  className="px-2 py-1 bg-violet-600 text-white text-xs rounded-full hover:bg-violet-700 transition flex-shrink-0"
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex-1 overflow-y-auto">
        <h3 className="text-gray-300 text-xs mb-2">Your Contacts</h3>
        {users.length === 0 ? (
          <p className="text-gray-400 text-xs">No contacts available</p>
        ) : (
          <ul className="space-y-2">
            {users.map((user) => (
              <li
                key={user._id}
                onClick={() => handleSelectUser(user)}
                className="flex items-center p-2 bg-[#3a3558] rounded-lg cursor-pointer hover:bg-[#4a4568] transition min-w-0"
              >
                <img
                  src={user.profilePic || assets.avatar_icon}
                  alt={user.fullName}
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full mr-2 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <span className="text-white text-xs sm:text-sm truncate">{user.fullName}</span>
                    {onlineUsers.includes(user._id) && (
                      <span className="ml-2 w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></span>
                    )}
                    {unseenMessages[user._id] > 0 && (
                      <span className="ml-2 bg-violet-600 text-white text-xs rounded-full px-2 py-1">
                        {unseenMessages[user._id]}
                      </span>
                    )}
                  </div>
                  <span className="text-gray-400 text-xs truncate">{user.email}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        onClick={logout}
        className="mt-3 w-full p-2 rounded-full bg-violet-600 text-white text-xs hover:bg-violet-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;