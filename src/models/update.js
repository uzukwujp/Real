import mongoose from "mongoose";

const updateSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  message: { type: String, required: true },
  updateSchedule: { type: mongoose.Types.ObjectId },
});

export default mongoose.model("Update", updateSchema);
