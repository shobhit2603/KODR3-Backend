import express from 'express';
import morgan from 'morgan';

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("Hello Shobhit!");
});

const notes = [];

// Adding a new note to the notes array and returning a success message - POST request
app.post("/notes", (req, res) => {
    notes.push(req.body);
    console.log(notes);
    res.status(201).json({ message: "Note added successfully" });
});

// Deleting a note from the notes array and returning a success message - DELETE request
app.delete("/notes/:id", (req, res) => {
    const id = req.params.id;
    delete notes[id];
    res.status(200).json({ message: "Note deleted successfully" });
});

// Updating a note in the notes array and returning a success message - PATCH request

// If you want to update the entire note, you can use a PUT request instead of PATCH. 

// The main difference between the two is that PATCH is used for partial updates, while PUT is used for complete replacements of a resource.

app.patch("/notes/:id", (req, res) => {
    const id = req.params.id;
    const { description } = req.body;
    notes[id].description = description;
    res.status(200).json({ message: "Note updated successfully" });
});

// Retrieving all notes from the notes array and returning them in the response - GET request
app.get("/notes", (req, res) => {
    res.status(200).json({
        message: "Notes retrieved successfully",
        notes: notes
    })
});

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});