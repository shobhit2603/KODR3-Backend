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
      name: upload.name,
      duration: upload.duration,
      url: upload.url,
      fileId: upload.fileId,
    });
  } catch (error) {
    console.error("Error uploading song:", error);
    return res.status(500).json({
      error: "Failed to upload song",
      details: error.message,
    });
  }
}
