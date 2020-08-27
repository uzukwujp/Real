import mongoose from "mongoose";
import Stage from "../models/stage";
import Workplan from "../models/workplan";

const mileStoneSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    stageId: { type: mongoose.Types.ObjectId, ref: "Stage", required: true },
    mileStones: {},
  },
  { strict: false }
);

mileStoneSchema.pre("save", async function () {
  const projectId = this.projectId;

  const numberOfLineItems = Object.keys(this.mileStones).length;
  let lineItemsCompleted = 0;

  for (let item in this.mileStones) {
    if (this.mileStones[item] === "completed") {
      lineItemsCompleted++;
    }
  }

  if (lineItemsCompleted === numberOfLineItems) {
    const count = await Stage.find({ projectId: projectId }).count();
    const increment = 100 / count;

    const workplan = await Workplan.findOne({ projectId: projectId });
    const progress = workplan.progress + increment;
    workplan.progress = progress;
    await workplan.save();
  }
});

export default mongoose.model("Milestone", mileStoneSchema);
