import { Router } from "express";
import { createStage } from "../controllers/stage";
import auth from "../middlewares/auth";

const stageRouter = Router();

stageRouter.route("/").post(auth, createStage);

export default stageRouter;
