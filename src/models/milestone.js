import mongoose from "mongoose";

const mileStoneSchema = new mongoose.Schema(
  {
    projectName: { type: String, required: true },
    stageName: { type: String, required: true },
    mileStones: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { strict: false }
);

export default mongoose.model("Milestone", mileStoneSchema);
