import mongoose from "mongoose";

const updateScheduleSchema = new mongoose.Schema(
  {
    lastUpdate: { type: Date },
    nextUpdate: { type: Date },
    projectName: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("UpdateSchedule", updateScheduleSchema);
