import { Router } from "express";
import {
  createProject,
  uploadPhotos,
  updateOneProject,
  deleteOneProject,
  getAllClientsProjects,
  getAllProjects,
  getOneProjectDetails,
} from "../controllers/project";
import { uploadProjectPhotos, uploadPlan } from "../middlewares/multer";
import auth from "../middlewares/auth";
import admin from "../middlewares/admin";

const projectRouter = Router();

projectRouter
  .route("/")
  .post(auth, uploadPlan, createProject)
  .get(auth, admin, getAllProjects);
projectRouter.route("/allclientsprojects").get(auth, getAllClientsProjects);

projectRouter
  .route("/uploadphotos/:projectid")
  .put(auth, admin, uploadProjectPhotos, uploadPhotos);
projectRouter
  .route("/:projectId")
  .put(auth, updateOneProject)
  .delete(auth, admin, deleteOneProject)
  .get(auth, getOneProjectDetails);

export default projectRouter;
