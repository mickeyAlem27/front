import { useContext, useEffect, useState } from 'react'; // Added useEffect for script loading
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');

  // Load Jotform chatbot script dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jotfor.ms/agent/embedjs/019758665934714bb1c6833259ea4b35ee4f/embed.js?skipWelcome=1&maximizable=1';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(isLogin ? 'login' : 'signup', {
        fullName,
        email,
        password,
        bio,
      });
      toast.success(isLogin ? 'Logged in successfully!' : 'Signed up successfully!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/bgImage.svg')] bg-contain p-4">
      <div className="bg-[#282142]/80 p-8 rounded-xl w-full max-w-md">
        <h2 className="text-2xl text-white font-bold text-center mb-6">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="w-full p-3 rounded-full bg-[#3a3558] text-white placeholder-gray-400 outline-none"
                required={!isLogin}
                aria-label="Full Name"
              />
            </div>
          )}
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 rounded-full bg-[#3a3558] text-white placeholder-gray-400 outline-none"
              required
              aria-label="Email"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 rounded-full bg-[#3a3558] text-white placeholder-gray-400 outline-none"
              required
              aria-label="Password"
            />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Bio"
                className="w-full p-3 rounded-lg bg-[#3a3558] text-white placeholder-gray-400 outline-none"
                required={!isLogin}
                aria-label="Bio"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full p-3 rounded-full bg-violet-600 text-white hover:bg-violet-700"
            aria-label={isLogin ? 'Login' : 'Sign Up'}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="text-gray-300 text-center mt-4">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-violet-400 hover:underline"
            aria-label={isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
        {isLogin && (
          <p className="text-gray-300 text-center mt-2">
            Forgot your password?{' '}
            <Link to="/forgot-password" className="text-violet-400 hover:underline">
              Reset it
            </Link>
          </p>
        )}
      </div>
      {/* Container for Jotform chatbot (optional, if script requires a target div) */}
      <div id="jotform-chatbot" className="fixed bottom-4 right-4 z-50"></div>
    </div>
  );
};

export default LoginPage;