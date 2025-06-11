import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(isLogin ? "login" : "signup", {
        fullName,
        email,
        password,
        bio,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
  // Load Jotform chatbot script dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jotfor.ms/agent/embedjs/019758665934714bb1c6833259ea4b35ee4f/embed.js?skipWelcome=1&maximizable=1';
    script.async = true;
    document.body.appendChild(script)});
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 p-6">
      <div className="bg-[#1f1b38] bg-opacity-90 p-8 rounded-xl w-full max-w-md shadow-lg">
       <h2 className="text-3xl text-white font-semibold text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-6">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="w-full p-4 rounded-lg bg-[#2a233f] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-violet-400 transition-all"
                required={!isLogin}
              />
            </div>
          )}
          <div className="mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-4 rounded-lg bg-[#2a233f] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-violet-400 transition-all"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-4 rounded-lg bg-[#2a233f] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-violet-400 transition-all"
              required
            />
          </div>
          {!isLogin && (
            <div className="mb-6">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Bio"
                className="w-full p-4 rounded-lg bg-[#2a233f] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-violet-400 transition-all"
                required={!isLogin}
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full p-4 rounded-full bg-violet-600 text-white hover:bg-violet-700 focus:ring-4 focus:ring-violet-500 transition-all"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="text-gray-300 text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          
           <div>
         <p> <script
  src='https://cdn.jotfor.ms/agent/embedjs/019758665934714bb1c6833259ea4b35ee4f/embed.js?skipWelcome=1&maximizable=1'>
</script> </p>
          </div>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-violet-400 hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
        {isLogin && (
          <p className="text-gray-300 text-center mt-2">
            Forgot your password?{" "}
            <Link to="/forgot-password" className="text-violet-400 hover:underline">
              Reset it
            </Link>
          </p>
        )}
      </div>
      
    </div>
    
  );
};

export default LoginPage;
