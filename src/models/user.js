import mongoose from "mongoose";
import Project from "./project";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  projects: [{ type: mongoose.Types.ObjectId, ref: Project }],
  isAdmin: { type: Boolean, default: false },
});

export default mongoose.model("User", userSchema);
