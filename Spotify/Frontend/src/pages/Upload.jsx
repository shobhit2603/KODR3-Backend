import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { createSong } from "../service/song.api";

const Upload = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [songFile, setSongFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  if (user?.userType !== "artist" && !loading) {
    return <Navigate to="/" />;
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSongFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!songFile) {
      setError("Please select a song file.");
      return;
    }
    
    setError("");
    setUploading(true);
    
    try {
      await createSong({ songFile });
      alert("Song uploaded successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Failed to upload song. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col font-sans">
      <header className="flex items-center justify-between p-4 bg-[#101010] sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold hover:text-[#1ed760] transition-colors">
          <svg className="w-8 h-8 text-[#1ed760]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.54.6.301.96zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-1.2-.181-1.38-.781-.18-.6.18-1.2.78-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.54-1.02.72-1.56.42z" />
          </svg>
          Spotify
        </Link>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="bg-[#181818] p-8 rounded-xl shadow-2xl w-full max-w-lg border border-[#282828]">
          <h1 className="text-3xl font-bold text-center mb-2">Upload a Song</h1>
          <p className="text-center text-gray-400 mb-8 text-sm">
            Share your music with the world
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="border-2 border-dashed border-[#727272] rounded-lg p-8 flex flex-col items-center justify-center text-center transition-colors hover:border-[#1ed760] group cursor-pointer relative">
              <input
                type="file"
                accept="audio/mp3, audio/mpeg"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <svg className="w-12 h-12 text-gray-400 group-hover:text-[#1ed760] mb-3 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <p className="text-white font-semibold">
                {songFile ? songFile.name : "Choose a file or drag & drop it here"}
              </p>
              <p className="text-gray-400 text-xs mt-2">MP3 up to 10MB</p>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              disabled={uploading}
              className={`w-full font-bold py-3.5 rounded-full transition-all ${
                uploading 
                  ? "bg-gray-500 text-gray-300 cursor-not-allowed" 
                  : "bg-[#1ed760] text-black hover:bg-[#3be477] hover:scale-105"
              }`}
            >
              {uploading ? "Uploading..." : "Upload Song"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Upload;
