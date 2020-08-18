import mongoose from "mongoose";
import Stage from "./stage";

const workPlanSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  stages: [{ type: mongoose.Types.ObjectId, ref: "Stage", required: true }],
  progress: { type: Number },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

export default mongoose.model("Workplan", workPlanSchema);
