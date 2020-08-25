import { Router } from "express";
import { createWorkPlan, updateWorkPlan } from "../controllers/workplan";
import auth from "../middlewares/auth";
import admin from "../middlewares/admin";

const workPlanRouter = Router();

workPlanRouter.route("/").post(auth, admin, createWorkPlan);

workPlanRouter.route("/:id").put(auth, admin, updateWorkPlan);

export default workPlanRouter;
