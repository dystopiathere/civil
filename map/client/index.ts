import { spawnPlayer } from "./lib";

on("onClientGameTypeStart", async () => {
  await spawnPlayer();
});
