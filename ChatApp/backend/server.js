import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });

  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
