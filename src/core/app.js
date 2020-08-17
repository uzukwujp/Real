import express from "express";

class AppCore {
  constructor(port) {
    this.app = express();
    this.app.listen(process.env.PORT || port);
    this.setMiddleWares();
  }

  setMiddleWares() {
    this.app.get("/", (req, res) => {
      res.send("Welcome People!");
    });
  }
}

export default AppCore;
