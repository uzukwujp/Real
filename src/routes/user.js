import { Router } from "express";
import { signUp, signIn } from "../controllers/user";
const userRouter = Router();

userRouter.route("/signup").post(signUp);
userRouter.route("/signin").post(signIn);

export default userRouter;
