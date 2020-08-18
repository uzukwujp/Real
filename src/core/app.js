import express from "express";
import cors from "cors";
import { json } from "body-parser";

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
  }
}

export default AppCore;
