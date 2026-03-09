import app from "./src/app.js";
import mongoose from "mongoose";

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});