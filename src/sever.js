import DbConnection from "./database/db";
import AppCore from "./core/app";

const main = () => {
  DbConnection.connect();
  const app = new AppCore(4000);
};

main();
