import express from "express";
import cors from "cors";
import { json } from "body-parser";
import userRouter from "../routes/user";
import milestoneRouter from "../routes/milestone";
import projectRouter from "../routes/project";
import stageRouter from "../routes/stage";

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
    this.app.use("/api/auth", userRouter);
    this.app.use("/api/milestones", milestoneRouter);
    this.app.use("/api/projects", projectRouter);
    this.app.use("/api/stages", stageRouter);
  }
}

export default AppCore;
