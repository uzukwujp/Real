import { Router } from "express";
import { createStage, updateStage } from "../controllers/stage";
import auth from "../middlewares/auth";
import admin from "../middlewares/admin";

const stageRouter = Router();

stageRouter.route("/").post(auth, admin, createStage);
stageRouter.route("/:id").put(auth, admin, updateStage);

export default stageRouter;
