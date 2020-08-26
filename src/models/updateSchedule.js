import mongoose from "mongoose";

const updateScheduleSchema = new mongoose.Schema(
  {
    lastUpdate: { type: Date },
    nextUpdate: { type: Date, default: Date.now() },
    projectId: { type: mongoose.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("UpdateSchedule", updateScheduleSchema);
