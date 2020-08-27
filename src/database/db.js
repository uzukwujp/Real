import mongoose from "mongoose";

mongoose.set("useFindAndModify", false);
class DbConnection {
  static async connect() {
    try {
      await mongoose.connect("mongodb://localhost/Real", {
        useNewUrlParser: true,
      });
      return new DbConnection();
      console.log("connected to database successfully");
    } catch (error) {
      console.log(error);
    }
  }
}
export default DbConnection;
