// import imagekit from "../config/imagekit.config.js";
import { uploadFile } from "../services/storage.service.js";
import { Song } from "../models/songs.model.js";

// export async function uploadSong(req, res) {
//   try {
//     const file = req.file;

//     if (!file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const songFile = file.buffer.toString("base64");

//     const upload = await imagekit.files.upload({
//       file: songFile,
//       fileName: file.originalname,
//       folder: "/songs",
//     });

//     return res.status(201).json({
//       message: "Song uploaded successfully",
//       details: upload,
//     });
//   } catch (error) {
//     console.error("Error uploading song:", error);
//     return res.status(500).json({
//       error: "Failed to upload song",
//       details: error.message,
//     });
//   }
// }

export async function uploadSong(req, res) {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const uploadResult = await uploadFile(file.buffer, file.originalname);

    const song = new Song({
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album,
      genre: req.body.genre,
      duration: req.body.duration,
      fileUrl: uploadResult.url,
      fileId: uploadResult.fileId,
    });

    await song.save();

    return res.status(201).json({
      message: "Song uploaded successfully",
      details: song,
    });
  } catch (error) {
    console.error("Error uploading song:", error);
    return res.status(500).json({
      error: "Failed to upload song",
      details: error.message,
    });
  }
}

export async function getAllSongs(req, res) {
  try {
    const songs = await Song.find();
    return res.status(200).json({
      message: "Songs fetched successfully",
      details: songs,
    });
  } catch (error) {
    console.error("Error fetching songs:", error);
    return res.status(500).json({
      error: "Failed to fetch songs",
      details: error.message,
    });
  }
}

export async function deleteSong(req, res) {
  try {
    const songId = req.params.id;
    await Song.findByIdAndDelete(songId);
    return res.status(200).json({
      message: "Song deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting song:", error);
    return res.status(500).json({
      error: "Failed to delete song",
      details: error.message,
    });
  }
}
