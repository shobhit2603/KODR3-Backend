import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { getAllSongs } from "../service/song.api";

const Home = () => {
  const { user, handleLogout } = useAuth();
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await getAllSongs();
        if (data.success) {
          setSongs(data.songs);
        }
      } catch (err) {
        console.error("Failed to fetch songs", err);
      }
    };
    fetchSongs();
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col font-sans">
      <header className="flex items-center justify-between p-4 bg-[#101010]/80 backdrop-blur-md sticky top-0 z-50 border-b border-[#282828] transition-all">
        <div className="flex items-center gap-2 text-2xl font-extrabold tracking-tight">
          <svg
            className="w-8 h-8 text-[#1ed760] drop-shadow-[0_0_8px_rgba(30,215,96,0.5)]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.54.6.301.96zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-1.2-.181-1.38-.781-.18-.6.18-1.2.78-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.54-1.02.72-1.56.42z" />
          </svg>
          Spotify
        </div>
        <div className="flex items-center gap-6">
          {user?.userType === "artist" && (
            <Link
              to="/upload"
              className="text-gray-300 hover:text-white font-bold flex items-center gap-1 transition-colors"
            >
              Upload Song
            </Link>
          )}
          {!user ? (
            <div className="flex items-center gap-4">
              <Link
                to="/register"
                className="text-gray-300 hover:text-white font-bold transition-colors"
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="bg-white text-black px-8 py-2.5 rounded-full font-bold hover:scale-105 active:scale-95 transition-all"
              >
                Log in
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div 
                className="w-10 h-10 bg-linear-to-br from-[#1ed760] to-[#3be477] text-black rounded-full flex items-center justify-center font-extrabold uppercase shadow-lg border border-[rgba(255,255,255,0.1)]" 
                title={user.email}
              >
                {user.email[0]}
              </div>
              <button 
                onClick={handleLogout}
                className="bg-transparent border border-[#727272] text-white px-6 py-2 rounded-full font-bold hover:border-white hover:scale-105 active:scale-95 transition-all"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-6">All Songs</h2>
        
        {songs.length === 0 ? (
          <p className="text-gray-400">No songs available.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {songs.map((song) => (
              <div
                key={song._id}
                className="bg-[#181818] p-4 rounded-xl hover:bg-[#282828] transition-colors group cursor-pointer"
              >
                <div className="relative w-full aspect-square mb-4 shadow-lg">
                  <img
                    src={song.posterUrl}
                    alt={song.title}
                    className="w-full h-full object-cover rounded shadow-[0_8px_24px_rgba(0,0,0,.5)]"
                  />
                  <div className="absolute right-2 bottom-2 bg-[#1ed760] text-black rounded-full p-3 shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <svg className="w-6 h-6 ml-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-bold text-base truncate mb-1">{song.title}</h3>
                <p className="text-sm text-gray-400 truncate">{song.artist}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
