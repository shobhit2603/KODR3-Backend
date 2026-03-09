// server create karna

import express from "express";
import morgan from "morgan";
import noteModel from "./models/note.model.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// server ko config karna
app.get("/", (req, res) => {
    res.send("Connected to server and DB");
});

// CRUD operations
app.post("/notes", async (req, res) => {
    const { title, description } = req.body;

    await noteModel.create({
        title: title,
        description: description
    })

    res.status(201).json({
        message: "Note created successfully",
        note: req.body.title
    })
});

app.get("/notes", async (req, res) => {
    const notes = await noteModel.find();

    res.status(200).json({
        message: "Notes fetched successfully",
        notes: notes
    })
});

app.delete("/notes/:id", async (req, res) => {
    await noteModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
        message: "Note deleted successfully",
        data: req.params.title
    })
});

app.patch("/notes/:id", async (req, res) => {
    const id = req.params.id;
    const { description } = req.body;

    await noteModel.findByIdAndUpdate(id, {
        description: description
    });

    res.status(200).json({
        message: "Note updated successfully",
        data: req.params.title
    });
});

// Task - Create a GET api for /notes/:id to fetch a single note by id
app.get("/notes/:id", async (req, res) => {
    const note = await noteModel.findById(req.params.id);

    res.status(200).json({
        message: "Note fetched successfully",
        note: note
    })
});

// Task - learn about CORS and implement it in your server
// Task - Learn difference between findOne and find in mongoose and implement findOne in your code 

export default app;