import mongoose from "mongoose";
import Milestone from "./milestone";

const stageSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  stageName: { type: String, required: true },
  milestone: { type: mongoose.Types.ObjectId, ref: Milestone, required: true },
});

export default mongoose.model("Stage", stageSchema);
