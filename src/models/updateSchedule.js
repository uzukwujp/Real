import mongoose from "mongoose";

const updateScheduleSchema = new mongoose.Schema(
  {
    nextUpdate: { type: Date, default: Date.now() },
    projectId: { type: mongoose.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

updateScheduleSchema.post("findOneAndUpdate", async function () {
  console.log(this.getQuery());
  const updateSchedule = await this.model.findOne(this.getQuery());
  console.log(updateSchedule);
  updateSchedule.lastUpdate = updateSchedule.nextUpdate;
});

export default mongoose.model("UpdateSchedule", updateScheduleSchema);
