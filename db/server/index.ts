import "reflect-metadata";

import { CivilDataSource } from "./data-source";
import { registerEvents } from "./lib";

if (typeof __dirname === "undefined") {
  global.__dirname = GetResourcePath(GetCurrentResourceName()) + "/server/dist";
}

CivilDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("error during Data Source initialization", err);
  });

registerEvents();
