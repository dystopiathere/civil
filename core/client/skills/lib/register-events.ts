import { onPlayerSpawned } from "../events";

export function registerEvents() {
  on("playerSpawned", onPlayerSpawned);
}
