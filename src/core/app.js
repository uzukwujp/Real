import express from "express";
import cors from "cors";
import { json } from "body-parser";
import userRouter from "../routes/user";

class AppCore {
  constructor(port) {
    this.app = express();
    this.app.listen(process.env.PORT || port);
    this.setMiddleWares();
  }

  setMiddleWares() {
    this.app.use(cors());
    this.app.use(json());
    this.app.get("/", (req, res) => {
      res.send("Welcome People!");
    });
    this.app.use("/api/auth", userRouter);
  }
}

export default AppCore;
