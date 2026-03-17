import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const [userType, setUserType] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleRegister } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ email, password, userType });
    navigate("/");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#121212] overflow-hidden relative">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#1ed760] opacity-20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[#3be477] opacity-10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="bg-[#181818]/80 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md border border-[#282828] z-10 transition-all">
        <div className="flex justify-center mb-6">
          <svg className="w-16 h-16 text-[#1ed760]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.54.6.301.96zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-1.2-.181-1.38-.781-.18-.6.18-1.2.78-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.54-1.02.72-1.56.42z" />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-center text-white mb-8 tracking-tight">
          Sign up to loop
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="email">
              Email address
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="name@domain.com"
              className="w-full px-4 py-3 bg-[#121212] border border-[#727272] text-white rounded focus:outline-none focus:border-[#1ed760] transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-3 bg-[#121212] border border-[#727272] text-white rounded focus:outline-none focus:border-[#1ed760] transition-colors"
              required
            />
          </div>

          <div className="mt-2">
            <span className="block text-white text-sm font-semibold mb-3">I'm joining as a</span>
            <div className="flex gap-4">
              <label className={`flex-1 flex justify-center items-center py-3 rounded-full border-2 cursor-pointer transition-all ${userType === 'user' ? 'border-[#1ed760] bg-[#1ed760]/10 text-[#1ed760]' : 'border-[#727272] text-white hover:border-white'}`}>
                <input
                  onChange={(e) => setUserType(e.target.value)}
                  type="radio"
                  name="userType"
                  value="user"
                  className="hidden"
                  checked={userType === "user"}
                />
                <span className="font-bold">User</span>
              </label>
              <label className={`flex-1 flex justify-center items-center py-3 rounded-full border-2 cursor-pointer transition-all ${userType === 'artist' ? 'border-[#1ed760] bg-[#1ed760]/10 text-[#1ed760]' : 'border-[#727272] text-white hover:border-white'}`}>
                <input
                  onChange={(e) => setUserType(e.target.value)}
                  type="radio"
                  name="userType"
                  value="artist"
                  className="hidden"
                  checked={userType === "artist"}
                />
                <span className="font-bold">Artist</span>
              </label>
            </div>
          </div>

          <button className="w-full bg-[#1ed760] text-black font-extrabold py-3.5 rounded-full hover:bg-[#3be477] hover:scale-[1.02] active:scale-95 transition-all mt-6 shadow-[0_0_15px_rgba(30,215,96,0.2)]">
            Sign up
          </button>
        </form>
        <p className="mt-8 text-center text-gray-400 font-semibold">
          Already have an account?{" "}
          <Link to="/login" className="text-white hover:text-[#1ed760] hover:underline transition-colors">
            Log in here
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
