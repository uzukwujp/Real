import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: Number, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  projects: [{ type: mongoose.Types.ObjectId, ref: "Project" }],
  isAdmin: { type: Boolean, default: false },
});

userSchema.plugin(uniqueValidator);

export default mongoose.model("User", userSchema);
