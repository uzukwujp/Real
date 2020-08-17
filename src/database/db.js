import mongoose from "mongoose";
class DbConnection {
  static async connect() {
    try {
      await mongoose.connect("mongodb://localhost/Real");
      return new DbConnection();
      console.log("connected to database successfully");
    } catch (error) {
      console.log(error);
    }
  }
}
export default DbConnection;
