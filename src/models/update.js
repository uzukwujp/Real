import mongoose from "mongoose";

const updateSchema = new mongoose.Schema({
  projectId: { type: mongoose.Types.ObjectId, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date },
});

export default mongoose.model("Update", updateSchema);
