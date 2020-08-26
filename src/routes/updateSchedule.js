import { Router } from "express";
import {
  createUpdateSchedule,
  getOneUpdateSchedule,
  updateOneUpdateSchedule,
} from "../controllers/updateSchedule";
import auth from "../middlewares/auth";
import admin from "../middlewares/admin";

const updateScheduleRouter = Router();

updateScheduleRouter.route("/").post(auth, admin, createUpdateSchedule);

updateScheduleRouter
  .route("/:projectId")
  .get(auth, getOneUpdateSchedule)
  .put(auth, admin, updateOneUpdateSchedule);

export default updateScheduleRouter;
