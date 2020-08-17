import mongoose from "mongoose";

const mileStoneSchema = new mongoose.Schema(
  {
    projectName: { type: String, required: true },
    stageName: { type: String, required: true },
    mileStones: {},
  },
  { strict: false }
);

export default mongoose.model("Milestone", mileStoneSchema);
