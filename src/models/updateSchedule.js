import mongoose from "mongoose";

const updateScheduleSchema = new mongoose.Schema(
  {
    nextUpdate: { type: Date, default: Date.now() },
    projectId: { type: mongoose.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("UpdateSchedule", updateScheduleSchema);
