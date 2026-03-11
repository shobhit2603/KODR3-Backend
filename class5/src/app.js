import express from 'express';
import morgan from "morgan";
// import cors from "cors";
import authRouter from './routes/auth.routes.js';

const app = express();

app.use(express.json());
app.use(morgan("dev"));
// app.use(cors());

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
    res.send("Learning Authentication");
});

export default app;