import { Router } from "express";
import {
  createMilestone,
  updateOneMilestone,
  getOneMilestone,
} from "../controllers/milestone";
import auth from "../middlewares/auth";
import admin from "../middlewares/admin";

const milestoneRouter = Router();

milestoneRouter.route("/").post(auth, admin, createMilestone);

milestoneRouter
  .route("/:id")
  .put(auth, admin, updateOneMilestone)
  .get(auth, admin, getOneMilestone);

export default milestoneRouter;
