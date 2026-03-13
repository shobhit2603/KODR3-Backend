import imagekit from "../config/imagekit.config.js";

export async function uploadSong(req, res) {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const songFile = file.buffer.toString("base64");

    const upload = await imagekit.files.upload({
      file: songFile,
      fileName: file.originalname,
      folder: "/songs",
    });

    return res.status(201).json({
      message: "Song uploaded successfully",
      details: upload,
    });
  } catch (error) {
    console.error("Error uploading song:", error);
    return res.status(500).json({
      error: "Failed to upload song",
      details: error.message,
    });
  }
}

// export async function deleteSong(req, res) {
//   try {
//     const songId = req.params.id;
//     await imagekit.files.delete(songId);

//     return res.status(200).json({ message: "Song deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting song:", error);
//     return res.status(500).json({
//       error: "Failed to delete song",
//       details: error.message,
//     });
//   }
// }

// export async function getAllSongs(req, res) {
//   try {
//     const files = await imagekit.files.list({
//       path: "/songs",
//     });

//     return res.status(200).json({
//       message: "Songs fetched successfully",
//       songs: files,
//     });
//   } catch (error) {
//     console.error("Error fetching songs:", error);
//     return res.status(500).json({
//       error: "Failed to fetch songs",
//       details: error.message,
//     });
//   }
// }