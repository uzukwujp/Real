import { Router } from "express";
import { signUp, signIn, uploadAvatar } from "../controllers/user";
import { uploadProfileImage } from "../middlewares/multer";
import auth from "../middlewares/auth";
const userRouter = Router();

userRouter.route("/signup").post(uploadProfileImage, signUp);
userRouter.route("/signin").post(signIn);
userRouter.route("/").put(auth, uploadProfileImage, uploadAvatar);

export default userRouter;
