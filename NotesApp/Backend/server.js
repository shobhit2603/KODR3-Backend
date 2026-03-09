// server ko start karna
// server or db ko connect karna

import app from "./src/app.js";
import mongoose from "mongoose";

const port = 3000;

async function connectToDB() {
    await mongoose.connect("mongodb+srv://shobhit706_db_user:IT1tXtkZqo8K34DR@my-cluster.rcm7uv2.mongodb.net/NotesApp");
    console.log("Connected to DB");
}

await connectToDB();

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});