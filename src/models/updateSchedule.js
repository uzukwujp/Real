import mongoose from "mongoose";
import { configureTransportObject, CreateMailOption } from "../utilities/email";
import config from "config";

const updateScheduleSchema = new mongoose.Schema(
  {
    nextUpdate: { type: Date, default: Date.now() },
    projectId: { type: mongoose.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

updateScheduleSchema.post("findOneAndUpdate", async function () {
  try {
    const transport = configureTransportObject(
      config.get("service"),
      config.get("email"),
      config.get("password")
    );

    const project = await this.model.findOne(this.getQuery()).populate({
      path: "projectId",
      model: "Project",
      populate: { path: "user", select: "email" },
    });

    console.log(project.projectId.user.email);

    const mailOption = CreateMailOption(
      "Realapi@gmail.com",
      `${project.projectId.user.email}`,
      "testing",
      "Welcome on board"
    );
    await transport.sendMail(mailOption);
    console.log("message sent");
  } catch (e) {
    console.log(e.message);
  }
});

export default mongoose.model("UpdateSchedule", updateScheduleSchema);
