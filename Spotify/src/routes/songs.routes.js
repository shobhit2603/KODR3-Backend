import { Router } from "express";
import {
  uploadSong,
//   deleteSong,
//   getAllSongs,
} from "../controllers/song.controller.js";
import multer from "multer";
import { checkArtist } from "../middleware/auth.middleware.js";

const upload = multer({ storage: multer.memoryStorage() });

const songsRouter = Router();

// POST /api/songs/
songsRouter.post("/", checkArtist, upload.single("song"), uploadSong);

//GET /api/songs
// songsRouter.get("/", getAllSongs);

// DELETE /api/songs/delete/:songId
// songsRouter.delete("/delete/:id", checkArtist, deleteSong);

export default songsRouter;