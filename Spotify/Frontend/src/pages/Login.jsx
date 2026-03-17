import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
    navigate("/");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#121212] relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#1ed760] opacity-20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[#3be477] opacity-10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="bg-[#181818] p-10 rounded-xl shadow-2xl w-full max-w-md border border-[#282828]">
        <div className="flex justify-center mb-8">
          <svg
            className="w-16 h-16 text-[#1ed760]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.54.6.301.96zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-1.2-.181-1.38-.781-.18-.6.18-1.2.78-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.54-1.02.72-1.56.42z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Log in to Spotify
        </h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-white text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com"
              className="w-full px-4 py-3 bg-[#121212] border border-[#727272] text-white rounded focus:outline-none focus:border-white transition-colors"
            />
          </div>
          <div>
            <label
              className="block text-white text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 bg-[#121212] border border-[#727272] text-white rounded focus:outline-none focus:border-white transition-colors"
            />
          </div>
          <button className="w-full bg-[#1ed760] text-black font-bold py-3.5 rounded-full hover:bg-[#3be477] hover:scale-105 transition-all mt-6 cursor-pointer">
            Log In
          </button>
        </form>
        <p className="mt-10 text-center text-gray-400 font-semibold">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-white hover:text-[#1ed760] hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
