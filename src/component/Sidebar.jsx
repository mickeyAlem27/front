import { useContext, useState } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import assets from '../assets/assets';

const Sidebar = () => {
  const { users, setSelectedUser, searchUsers, addContact, unseenMessages } = useContext(ChatContext);
  const { authUser, onlineUsers, logout } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  console.log('Sidebar users:', users);

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
        console.error('Search error:', error.message);
        toast.error('Failed to search users');
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleAddContact = async (contactId) => {
    try {
      await addContact(contactId);
      setSearchQuery('');
      setSearchResults([]);
      toast.success('Contact added successfully');
      console.log('Contact added, fetching updated users...');
    } catch (error) {
      console.error('Add contact error:', error.message);
      toast.error('Failed to add contact');
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="flex h-full flex-col bg-gray-800/80 p-3">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Chats</h2>
        <Link to="/profile">
          <img
            src={authUser?.profilePic || assets.avatar_icon}
            alt="Profile"
            className="h-8 w-8 rounded-full sm:h-10 sm:w-10"
          />
        </Link>
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search users to add..."
        className="mb-3 w-full rounded-full bg-gray-700/50 p-3 text-sm text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-violet-600"
      />
      {searchResults.length > 0 && (
        <div className="mb-3">
          <h3 className="mb-2 text-xs text-gray-300">Search Results</h3>
          <ul className="space-y-2">
            {searchResults.map((user) => (
              <li
                key={user._id}
                className="flex items-center justify-between rounded-lg bg-gray-700/50 p-2"
              >
                <div className="flex items-center">
                  <img
                    src={user.profilePic || assets.avatar_icon}
                    alt={user.fullName}
                    className="mr-2 h-6 w-6 rounded-full sm:h-8 sm:w-8"
                  />
                  <span className="truncate text-sm text-white">{user.fullName}</span>
                </div>
                <button
                  onClick={() => handleAddContact(user._id)}
                  className="rounded-full bg-violet-600 px-2 py-1 text-xs text-white hover:bg-violet-700"
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex-1 overflow-y-auto">
        <h3 className="mb-2 text-xs text-gray-300">Your Contacts</h3>
        {users.length === 0 ? (
          <p className="text-xs text-gray-400">No contacts available</p>
        ) : (
          <ul className="space-y-2">
            {users.map((user) => (
              <li
                key={user._id}
                onClick={() => handleSelectUser(user)}
                className="flex cursor-pointer items-center rounded-lg bg-gray-700/50 p-2 hover:bg-gray-600/50"
              >
                <img
                  src={user.profilePic || assets.avatar_icon}
                  alt={user.fullName}
                  className="mr-2 h-6 w-6 rounded-full sm:h-8 sm:w-8"
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="truncate text-sm text-white">{user.fullName}</span>
                    {onlineUsers.includes(user._id) && (
                      <span className="ml-2 h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    )}
                    {unseenMessages[user._id] > 0 && (
                      <span className="ml-2 rounded-full bg-violet-600 px-2 py-1 text-xs text-white">
                        {unseenMessages[user._id]}
                      </span>
                    )}
                  </div>
                  <span className="block truncate text-xs text-gray-400">{user.email}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        onClick={logout}
        className="mt-3 w-full rounded-full bg-violet-600 p-2 text-xs text-white hover:bg-violet-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;