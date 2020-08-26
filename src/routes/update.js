import { Router } from "express";
import { createUpdate, getOneUpdate } from "../controllers/update";
import auth from "../middlewares/auth";
import admin from "../middlewares/admin";

const updateRouter = Router();

updateRouter.route("/").post(auth, admin, createUpdate);
updateRouter.route("/:id").get(auth, getOneUpdate);

export default updateRouter;
