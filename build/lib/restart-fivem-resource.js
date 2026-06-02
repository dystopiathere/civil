import { production } from "../constants.js";
import { sendRconCommand } from "./index.js";

const restartTimers = {};

export function restartFiveMResource(resourceName) {
  if (production) {
    return;
  }

  if (restartTimers[resourceName]) {
    clearTimeout(restartTimers[resourceName]);
  }

  restartTimers[resourceName] = setTimeout(() => {
    const targetResourceName = resourceName.replaceAll("-", "_");

    sendRconCommand("refresh");
    sendRconCommand(`restart ${targetResourceName}`);
  }, 300);
}
