import mongoose from "mongoose";

const workPlanSchema = new mongoose.Schema({
  projectId: { type: mongoose.Types.ObjectId, required: true, ref: "Project" },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

export default mongoose.model("Workplan", workPlanSchema);
