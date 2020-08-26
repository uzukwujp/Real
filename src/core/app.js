import express from "express";
import cors from "cors";
import { json } from "body-parser";
import userRouter from "../routes/user";
import milestoneRouter from "../routes/milestone";
import projectRouter from "../routes/project";
import stageRouter from "../routes/stage";
import workPlanRouter from "../routes/workplan";
import { join } from "path";
import updateRouter from "../routes/update";
import updateScheduleRouter from "../routes/updateSchedule";

class AppCore {
  constructor(port) {
    this.app = express();
    this.app.listen(process.env.PORT || port);
    this.setMiddleWares();
  }

  setMiddleWares() {
    this.app.use(cors());
    this.app.use(json());
    this.app.get("/", (req, res) => {
      res.send("Welcome People!");
    });
    this.app.use("/api/users", userRouter);
    this.app.use("/api/milestones", milestoneRouter);
    this.app.use("/api/projects", projectRouter);
    this.app.use("/api/stages", stageRouter);
    this.app.use("/api/workplans", workPlanRouter);
    this.app.use("/api/updates", updateRouter);
    this.app.use("/api/updateschedules", updateScheduleRouter);
    this.app.use(express.static(join(__dirname, `../avatars`)));
  }
}

export default AppCore;
