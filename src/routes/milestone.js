import { Router } from "express";
import { createMilestone, updateOneMilestone } from "../controllers/milestone";

const milestoneRouter = Router();

milestoneRouter.route("/").post(createMilestone).put(updateOneMilestone);

export default milestoneRouter;
