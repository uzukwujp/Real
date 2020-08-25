import mongoose from "mongoose";

const stageSchema = new mongoose.Schema({
  workPlanId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Workplan",
  },
  stageName: { type: String, required: true },
  projectId: { type: mongoose.Types.ObjectId, ref: "Project", required: true },
});

export default mongoose.model("Stage", stageSchema);
