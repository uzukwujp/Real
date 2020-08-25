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

mileStoneSchema.post("save", async function () {
  const projectId = this.projectId;

  const numberOfLineItems = Object.keys(this.mileStones).length;
  let lineItemsCompleted = 0;

  for (let item in this.mileStones) {
    if (this.mileStones[item] === "completed") {
      lineItemsCompleted++;
    }
  }

  console.log(numberOfLineItems, lineItemsCompleted);
  if (lineItemsCompleted === numberOfLineItems) {
    const count = await Stage.find({ projectId: projectId }).count();
    console.log(count);
    const increment = 100 / count;

    const workplan = await Workplan.findOne({ projectId: projectId });
    console.log(workplan);
    workplan.progress += increment;
  }
});

export default mongoose.model("Milestone", mileStoneSchema);
