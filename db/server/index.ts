import { CivilDataSource } from "./data-source";
import { registerEvents } from "./lib";
import "reflect-metadata";

CivilDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("error during Data Source initialization", err);
  });

registerEvents();
