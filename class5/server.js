import app from "./src/app.js";
import { connectToDB } from "./src/config/databse.js";

const port = process.env.PORT || 3000;

connectToDB();

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});