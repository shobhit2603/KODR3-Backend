import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["user", "artist"],
    default: "user",
  },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
