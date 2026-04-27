import { onPlayerSpawned } from "../events";
import { freeze } from "./freeze";

export function registerEvents() {
  on("playerSpawned", onPlayerSpawned);

  on("models:freeze", (state: boolean) => freeze(state));
}
