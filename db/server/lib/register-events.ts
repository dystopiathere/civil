import { onPlayerConnecting, onPlayerDropped, onPlayerJoining } from "../events";

export function registerEvents() {
  on("playerJoining", onPlayerJoining);
  on("playerConnecting", onPlayerConnecting);
  on("playerDropped", onPlayerDropped);
}
