import mongoose from "mongoose";

const updateSchema = new mongoose.Schema(
  {
    projectName: { type: String, required: true },
    message: { type: String, required: true },
    lastUpdate: { type: Date },
    nextUpdate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Update", updateSchema);
