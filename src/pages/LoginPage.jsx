import { useContext, useState, useEffect } from 'react';
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 relative overflow-hidden">
      {/* Animated rhombus background elements */}
      <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-violet-600/20 transform rotate-45 animate-float origin-center"></div>
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-indigo-600/20 transform rotate-45 animate-float-delay origin-center"></div>
      <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-purple-600/20 transform rotate-45 animate-float-delay-2 origin-center"></div>
      
      {/* Form container with entrance animation */}
      <div className={`
        bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl w-full max-w-md z-10 
        border border-gray-700/50 shadow-2xl
        transform transition-all duration-1000 ease-out
        ${mounted ? 'translate-x-0 opacity-100' : 'translate-x-[150%] opacity-0'}
      `}>
        <h2 className="text-2xl text-white font-bold text-center mb-6">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4 transition-all duration-700 delay-75">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="w-full p-3 rounded-lg bg-gray-700/80 text-white placeholder-gray-400 outline-none 
                focus:ring-2 focus:ring-violet-500 transition-all duration-300"
                required={!isLogin}
                aria-label="Full Name"
              />
            </div>
          )}
          <div className="mb-4 transition-all duration-700 delay-100">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-gray-700/80 text-white placeholder-gray-400 outline-none 
              focus:ring-2 focus:ring-violet-500 transition-all duration-300"
              required
              aria-label="Email"
            />
          </div>
          <div className="mb-4 transition-all duration-700 delay-150">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-gray-700/80 text-white placeholder-gray-400 outline-none 
              focus:ring-2 focus:ring-violet-500 transition-all duration-300"
              required
              aria-label="Password"
            />
          </div>
          {!isLogin && (
            <div className="mb-4 transition-all duration-700 delay-200">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Bio"
                className="w-full p-3 rounded-lg bg-gray-700/80 text-white placeholder-gray-400 outline-none 
                focus:ring-2 focus:ring-violet-500 transition-all duration-300"
                required={!isLogin}
                aria-label="Bio"
              />
            </div>
          )}
          <div className="transition-all duration-700 delay-300">
            <button
              type="submit"
              className="w-full p-3 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white 
              font-medium hover:from-violet-700 hover:to-indigo-700 transition-all duration-300 
              transform hover:scale-[1.02] shadow-lg hover:shadow-violet-500/20"
              aria-label={isLogin ? 'Login' : 'Sign Up'}
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </form>
        <div className="transition-all duration-700 delay-500">
          <p className="text-gray-300 text-center mt-4">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-violet-400 hover:underline focus:outline-none"
              aria-label={isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
          {isLogin && (
            <p className="text-gray-300 text-center mt-2">
              Forgot your password?{' '}
              <Link
                to="/forgot-password"
                className="text-violet-400 hover:underline animate-pulse"
              >
                Reset it
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;