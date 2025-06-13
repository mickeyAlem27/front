import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login, isAuthenticated } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
    
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/home', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const success = await login(isLogin ? 'login' : 'signup', {
        fullName,
        email,
        password,
        bio,
      });
      
      if (success) {
        toast.success(isLogin ? 'Logged in successfully!' : 'Signed up successfully!');
        navigate('/home', { replace: true });
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 relative overflow-hidden">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900/80 z-50 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="relative w-20 h-20 mb-4">
              {/* Animated rhombus loader */}
              <div className="absolute inset-0 border-4 border-t-violet-500 border-r-indigo-500 border-b-purple-500 border-l-blue-500 rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-4 border-t-violet-400 border-r-indigo-400 border-b-purple-400 border-l-blue-400 rounded-full animate-spin-reverse"></div>
              <div className="absolute inset-4 border-4 border-t-violet-300 border-r-indigo-300 border-b-purple-300 border-l-blue-300 rounded-full animate-spin"></div>
            </div>
            <p className="text-white font-medium">Welcome back!</p>
          </div>
        </div>
      )}

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
              disabled={isLoading}
              className={`w-full p-3 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white 
              font-medium transition-all duration-300 transform shadow-lg
              ${isLoading ? 'opacity-70' : 'hover:from-violet-700 hover:to-indigo-700 hover:scale-[1.02] hover:shadow-violet-500/20'}`}
              aria-label={isLogin ? 'Login' : 'Sign Up'}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : isLogin ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </form>
        <div className="transition-all duration-700 delay-500">
          <p className="text-gray-300 text-center mt-4">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              disabled={isLoading}
              className="text-violet-400 hover:underline focus:outline-none disabled:opacity-50"
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
                className={`text-violet-400 hover:underline ${isLoading ? 'pointer-events-none' : 'animate-pulse'}`}
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