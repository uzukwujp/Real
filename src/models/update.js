import mongoose from "mongoose";
import UpdateSchedule from "./updateSchedule";

const updateSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  message: { type: String, required: true },
  updateSchedule: { type: mongoose.Types.ObjectId, ref: "UpdateSchedule" },
});

export default mongoose.model("Update", updateSchema);
