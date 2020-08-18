import mongoose from "mongoose";
import User from "./user";
import Update from "./update";
import Workplan from "./workplan";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  photos: [{ type: String }],
  updates: [{ type: mongoose.Types.ObjectId, ref: "Update" }],
  workPlan: { type: mongoose.Types.ObjectId, ref: "Workplan" },
  projectPlan: { type: String, required: true },
  progress: { type: mongoose.Types.ObjectId, ref: "Workplan" },
});

export default mongoose.model("Project", projectSchema);
