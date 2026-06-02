import { keyMappings } from "../configs";

export function registerKeyMappings() {
  Object.entries(keyMappings).forEach(([command, { key, description, handler }]) => {
    RegisterCommand(command, handler, true);
    RegisterKeyMapping(command, description, "keyboard", key);
  });
}
