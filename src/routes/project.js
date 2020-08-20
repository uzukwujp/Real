import { Router } from "express";
import { createProject, uploadPhotos } from "../controllers/project";
import { uploadProjectPhotos, uploadPlan } from "../middlewares/multer";
import auth from "../middlewares/auth";

const projectRouter = Router();

projectRouter.route("/").post(auth, uploadPlan, createProject);

projectRouter
  .route("/uploadphotos/:projectid")
  .put(auth, uploadProjectPhotos, uploadPhotos);

export default projectRouter;
