const express = require("express");
const app = express();
const port = 3000;

const notes = [];

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/notes", (req, res) => {
    notes.push(req.body);
    console.log("Note received:", req.body);
    res.send("Note received");
});

app.get("/notes", (req, res) => {
    res.json(notes);
});

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});

module.exports = app;