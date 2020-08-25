import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  avatar: { type: String },
  fullName: { type: String },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: Number, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

userSchema.methods.completeName = function completeName() {
  return (this.fullName = `${this.firstName} ${this.lastName}`);
};

userSchema.plugin(uniqueValidator);

export default mongoose.model("User", userSchema);
