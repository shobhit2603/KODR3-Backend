import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import songsRouter from "./routes/songs.routes.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello Auth!");
});

app.use("/api/auth", authRouter);
app.use("/api/songs", songsRouter);

export default app;
