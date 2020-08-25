import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  location: { type: String },
  photos: [{ type: String }],
  projectPlan: { type: String, required: true },
});

projectSchema.plugin(uniqueValidator);

export default mongoose.model("Project", projectSchema);
